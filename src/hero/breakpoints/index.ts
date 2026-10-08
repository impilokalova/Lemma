import {mobileHero} from './mobile/config';
import {tabletHero} from './tablet/config';
import {desktopHero} from './desktop/config';
export type HeroLayout={minWidth:number;maxWidth:number;globeWidth:number;horizonRatio:number;wordmarkGap:number};
export function getHeroLayout(width:number):HeroLayout{return width<600?mobileHero:width<1024?tabletHero:desktopHero;}
