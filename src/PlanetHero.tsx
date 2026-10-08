import {getHeroLayout} from './hero/breakpoints';
import {useEffect,useRef} from 'react';
import * as THREE from 'three';
import {Link} from 'react-router-dom';

// Simplified, hand-drawn continental contours. Decorative, not geographic boundaries.
const coasts:number[][][]=[
 [[-168,64],[-148,69],[-130,60],[-123,49],[-125,40],[-117,33],[-110,30],[-105,24],[-97,19],[-89,21],[-83,25],[-80,30],[-66,45],[-55,52],[-60,61],[-83,62],[-95,72],[-115,73],[-135,69],[-150,61],[-168,64]],
 [[-81,12],[-76,4],[-80,-4],[-77,-12],[-70,-18],[-72,-31],[-68,-42],[-72,-54],[-63,-55],[-51,-32],[-43,-23],[-35,-9],[-50,2],[-60,9],[-71,12],[-81,12]],
 [[-11,36],[-17,29],[-17,18],[-16,10],[-8,4],[9,4],[15,-2],[12,-15],[19,-27],[18,-35],[29,-34],[35,-25],[43,-12],[51,11],[44,18],[35,31],[26,32],[10,37],[-1,36],[-11,36]],
 [[-12,36],[-10,43],[-4,43],[0,50],[10,55],[23,57],[30,70],[45,70],[59,64],[74,56],[92,55],[112,48],[128,48],[143,42],[140,35],[121,22],[112,8],[103,1],[98,15],[85,22],[75,10],[66,24],[57,26],[47,41],[35,43],[27,38],[17,40],[10,36],[0,37],[-12,36]],
 [[113,-11],[124,-14],[137,-13],[146,-18],[153,-28],[145,-38],[131,-35],[116,-30],[113,-11]],
 [[47,-13],[50,-17],[49,-25],[44,-26],[43,-16],[47,-13]],
 [[-9,59],[-6,55],[-3,53],[1,54],[-3,59],[-9,59]]
];
const geoPoint=(lon:number,lat:number,r:number)=>{const a=THREE.MathUtils.degToRad(lon),b=THREE.MathUtils.degToRad(lat);return new THREE.Vector3(r*Math.cos(b)*Math.sin(a),r*Math.sin(b),r*Math.cos(b)*Math.cos(a));};

export function PlanetHero(){
 const mount=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=mount.current;
  if(!node)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}
  catch{node.classList.add('planet-fallback');return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
  renderer.setClearColor(0x000000,0);
  renderer.domElement.setAttribute('aria-hidden','true');
  node.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(36,1,0.1,100);
  camera.position.set(0,0,12);
  const planet=new THREE.Group();scene.add(planet);
  const radius=4.4;
  const sphereGeo=new THREE.SphereGeometry(radius,96,64);
  const sphereMat=new THREE.MeshPhongMaterial({color:0x09051b,emissive:0x110728,emissiveIntensity:0.42,shininess:100,specular:0x452185});
  planet.add(new THREE.Mesh(sphereGeo,sphereMat));
  const atmosphereGeo=new THREE.SphereGeometry(radius+0.025,96,64);
  const atmosphereMat=new THREE.ShaderMaterial({
   transparent:true,depthWrite:false,
   uniforms:{glow:{value:new THREE.Color('#9a64ff')}},
   vertexShader:'varying vec3 vNormal;varying vec3 vView;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vNormal=normalize(normalMatrix*normal);vView=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
   fragmentShader:'uniform vec3 glow;varying vec3 vNormal;varying vec3 vView;void main(){float rim=pow(1.-abs(dot(normalize(vNormal),normalize(vView))),3.0);gl_FragColor=vec4(glow,rim*.96);}'
  });
  planet.add(new THREE.Mesh(atmosphereGeo,atmosphereMat));
  const outlineMaterial=new THREE.LineBasicMaterial({color:0xa98bff,transparent:true,opacity:0.94,depthTest:true});
  const halosMaterial=new THREE.LineBasicMaterial({color:0x9e65ff,transparent:true,opacity:0.16,depthTest:true});
  const lines:THREE.BufferGeometry[]=[];
  for(const contour of coasts){
   const coords:THREE.Vector3[]=[];
   for(let i=0;i<contour.length-1;i++){
    const [a,b]=[contour[i],contour[i+1]];
    for(let step=0;step<8;step++){const t=step/8;coords.push(geoPoint(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,radius+0.055));}
   }
   coords.push(geoPoint(contour[contour.length-1][0],contour[contour.length-1][1],radius+0.055));
   const geometry=new THREE.BufferGeometry().setFromPoints(coords);lines.push(geometry);
   planet.add(new THREE.Line(geometry,outlineMaterial));
   const haloGeo=new THREE.BufferGeometry().setFromPoints(coords.map(p=>p.clone().multiplyScalar(1.003)));lines.push(haloGeo);
   planet.add(new THREE.Line(haloGeo,halosMaterial));
  }
  const light=new THREE.PointLight(0xa06bff,32,40);light.position.set(-5,7,8);scene.add(light);
  scene.add(new THREE.AmbientLight(0x7050b5,0.8));
  let raf=0,visible=true,disposed=false;
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:0});
  observer.observe(node);
  const clock=new THREE.Clock();
  const resize=()=>{
   const w=node.clientWidth,h=node.clientHeight;
   if(!w||!h)return;
   renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();
   const visibleHeight=2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.position.z;
   const visibleWidth=visibleHeight*camera.aspect;
   const layout=getHeroLayout(w);
   const desiredDiameter=visibleWidth*layout.globeWidth;
   const scale=Math.max(.55,Math.min(1.38,desiredDiameter/(radius*2)));
   planet.scale.setScalar(scale);
   // Place the globe below the viewport so only its top hemisphere is framed.
   planet.position.set(0,(.5-layout.horizonRatio)*visibleHeight-radius*scale,0);
   // Tie the wordmark to the globe's actual projected horizon, not viewport percentages.
   const projected=new THREE.Vector3(0,planet.position.y+radius*scale,0).project(camera);
   const horizonPx=(1-projected.y)*h/2;
   node.parentElement?.style.setProperty('--planet-horizon',`${horizonPx}px`);
   node.parentElement?.style.setProperty('--wordmark-gap',`${layout.wordmarkGap}px`);
  };
  const ro=new ResizeObserver(resize);ro.observe(node);resize();
  const animate=()=>{
   if(disposed)return;
   const delta=Math.min(clock.getDelta(),.05);
   if(!reduce.matches&&visible)planet.rotation.y+=delta*.055;
   renderer.render(scene,camera);
   raf=requestAnimationFrame(animate);
  };
  planet.rotation.y=-.3;animate();
  return()=>{disposed=true;cancelAnimationFrame(raf);observer.disconnect();ro.disconnect();sphereGeo.dispose();sphereMat.dispose();atmosphereGeo.dispose();atmosphereMat.dispose();outlineMaterial.dispose();halosMaterial.dispose();lines.forEach(g=>g.dispose());renderer.dispose();renderer.domElement.remove();};
 },[]);
 return <section className="galaxy-hero">
  <div className="galaxy-sky" aria-hidden="true"><div className="galaxy-nebula galaxy-nebula-left"/><div className="galaxy-nebula galaxy-nebula-right"/><div className="galaxy-stars galaxy-stars-a"/><div className="galaxy-stars galaxy-stars-b"/></div>
  <div className="galaxy-earth" ref={mount} aria-hidden="true"/>
  <div className="galaxy-brand" aria-label="LEMMA">
   {'LEMMA'.split('').map((letter,i)=><span key={i} style={{'--letter-index':i} as React.CSSProperties}>{letter}</span>)}
  </div>
  <div className="galaxy-hero-bottom container">
   <div className="galaxy-hero-copy"><p className="eyebrow">CREATIVE · WEB · SOCIAL</p><h1>Ideas shaped into <em>impact.</em></h1><p>Websites, design and social creative for businesses ready to stand out.</p><div className="hero-actions"><Link className="btn btn-primary" to="/work">Explore Our Work ↗</Link><Link className="btn btn-outline" to="/contact">Start a Project</Link></div></div>
  </div>
 </section>;
}
