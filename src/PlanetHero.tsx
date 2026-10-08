import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Decorative, genuinely 3D orbital mark. The opaque dark core writes to the
 * depth buffer, so the letter planes actually disappear behind the sphere.
 * No flat CSS masking is used for the occlusion.
 */
export function PlanetHero() {
  const host = useRef<HTMLDivElement>(null);
  const scrollSection = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = host.current;
    const section = scrollSection.current;
    if (!node || !section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(max-width: 767px)');
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !coarse.matches, powerPreference: 'low-power' });
    } catch {
      node.classList.add('planet-fallback');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse.matches ? 1.5 : 2));
    renderer.setClearColor(0x140e20, 0);
    node.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    const globe = new THREE.Group();
    scene.add(globe);

    const coreGeo = new THREE.SphereGeometry(2.18, 72, 48);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x140e20, depthWrite: true });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.renderOrder = 0;
    globe.add(core);

    const sphereWireGeo = new THREE.SphereGeometry(2.188, 40, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x9860e6, wireframe: true, transparent: true, opacity: 0.24,
      depthWrite: false, depthTest: true
    });
    const wire = new THREE.Mesh(sphereWireGeo, wireMat);
    wire.rotation.z = -0.21;
    wire.renderOrder = 1;
    globe.add(wire);

    const latMat = new THREE.LineBasicMaterial({ color: 0xdab6ff, transparent: true, opacity: 0.44, depthWrite: false });
    const lineGeometries: THREE.BufferGeometry[] = [];
    const latLines: THREE.Line[] = [];
    for (let i = -4; i <= 4; i++) {
      const latitude = i * Math.PI / 12;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 160; j++) {
        const t = j / 160 * Math.PI * 2;
        pts.push(new THREE.Vector3(2.205 * Math.cos(latitude) * Math.cos(t), 2.205 * Math.sin(latitude), 2.205 * Math.cos(latitude) * Math.sin(t)));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      lineGeometries.push(geo);
      const line = new THREE.Line(geo, latMat);
      line.renderOrder = 2;
      latLines.push(line);
      globe.add(line);
    }

    const glowGeo = new THREE.SphereGeometry(2.31, 48, 32);
    const glowMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.BackSide,
      uniforms: { glowColor: { value: new THREE.Color('#b16cff') } },
      vertexShader: 'varying vec3 vNormal; varying vec3 vEye; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vNormal = normalize(normalMatrix * normal); vEye = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'uniform vec3 glowColor; varying vec3 vNormal; varying vec3 vEye; void main(){ float rim = pow(1.0 - abs(dot(normalize(vNormal), normalize(vEye))), 2.4); gl_FragColor = vec4(glowColor, rim * 0.28); }'
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.renderOrder = -1;
    globe.add(glow);

    const letters = 'LEMMA'.split('');
    const letterObjects: THREE.Mesh[] = [];
    const textures: THREE.CanvasTexture[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const geometries: THREE.PlaneGeometry[] = [];
    for (const letter of letters) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 320;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;
      ctx.clearRect(0, 0, 256, 320);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '800 228px Arial, sans-serif';
      ctx.fillStyle = '#f4eafb';
      ctx.shadowColor = '#b16cff';
      ctx.shadowBlur = 16;
      ctx.fillText(letter, 128, 166);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide, alphaTest: 0.1 });
      const geometry = new THREE.PlaneGeometry(0.75, 0.94);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.renderOrder = 3;
      globe.add(mesh);
      letterObjects.push(mesh);
      textures.push(texture);
      materials.push(material);
      geometries.push(geometry);
    }

    let frame = 0;
    let lastProgress = -1;
    let inView = true;
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { rootMargin: '120px' });
    observer.observe(section);

    const resize = () => {
      const w = node.clientWidth;
      const h = node.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      const scale = Math.min(1.04, visibleWidth / 5.3);
      globe.scale.setScalar(scale);
      globe.position.x = w < 720 ? 0 : Math.min(1.1, visibleWidth * 0.12);
      globe.position.y = w < 720 ? 0 : -0.12;
      lastProgress = -1;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(node);
    resize();

    const update = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      if (progress === lastProgress && !inView) return;
      lastProgress = progress;
      // The letters travel around the upper latitude of the actual sphere.
      // Positive Z is the visible hemisphere; negative Z is behind the core.
      const angle = -0.2 + progress * Math.PI * 1.65;
      letterObjects.forEach((mesh, i) => {
        const a = angle + (i - 2) * 0.235;
        const radius = 2.46;
        mesh.position.set(Math.sin(a) * radius, 1.04 + 0.10 * Math.cos(a), Math.cos(a) * radius);
        mesh.rotation.set(0, a, -0.10 * Math.sin(a));
      });
      globe.rotation.y = progress * 0.20;
      wire.rotation.y = progress * 0.42;
      renderer.render(scene, camera);
    };
    const onScroll = () => { if (!reduced.matches && inView) update(); };
    const onMotion = () => { update(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    reduced.addEventListener('change', onMotion);
    update();
    // No continuous render loop: render only on resize and scroll.
    const onResize = () => update();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      reduced.removeEventListener('change', onMotion);
      coreGeo.dispose(); coreMat.dispose(); sphereWireGeo.dispose(); wireMat.dispose();
      latMat.dispose(); lineGeometries.forEach(g => g.dispose());
      glowGeo.dispose(); glowMat.dispose();
      geometries.forEach(g => g.dispose());
      textures.forEach(t => t.dispose());
      materials.forEach(m => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <section ref={scrollSection} className="planet-scroll-scene" aria-label="Lemma Studio">
    <div className="planet-sticky">
      <div className="planet-canvas" ref={host} aria-hidden="true"><span className="planet-fallback-label">LEMMA</span></div>
      <div className="planet-content container">
        <p className="eyebrow">CREATIVE · WEB · SOCIAL</p>
        <h1>Ideas shaped into <em>impact.</em></h1>
        <p className="lead">Distinctive websites, graphic design and social creative for ambitious businesses.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="/work">View Work ↗</a>
          <a className="btn btn-outline" href="/contact">Get a Quote</a>
        </div>
        <span className="planet-scroll-cue" aria-hidden="true">SCROLL TO EXPLORE <span>↓</span></span>
      </div>
    </div>
  </section>;
}
