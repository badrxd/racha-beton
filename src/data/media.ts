import type { ImageKey } from './content';

import heroStampedVilla from '../assets/images/hero_stamped_villa_1794783608010.jpg';
import serviceBetonImprime from '../assets/images/service_beton_imprime_1794783608053.jpg';
import serviceBetonLisse from '../assets/images/service_beton_lisse_1794783608820.jpg';
import serviceBetonDesactive from '../assets/images/service_beton_desactive_1794783608052.jpg';
import serviceBetonCire from '../assets/images/service_beton_cire_1794785542957.jpg';
import serviceResineEpoxy from '../assets/images/service_resine_epoxy_1794783609076.jpg';
import serviceRenovationTlemis from '../assets/images/service_renovation_tlemis_1794783610195.jpg';
import galleryPoolWood from '../assets/images/gallery_pool_wood_concrete_1794783609907.jpg';
import galleryDescenteGarage from '../assets/images/gallery_descente_garage_1794785541287.jpg';
import extraBetonCireStairs from '../assets/images/extra_beton_cire_stairs_1794786011307.jpg';
import extraDescenteGaragePave from '../assets/images/extra_descente_garage_pave_1794786011829.jpg';
import extraTlemisBejmat from '../assets/images/extra_tlemis_bejmat_1794786011595.jpg';
import extraBetonLisseTerrace from '../assets/images/extra_beton_lisse_terrace_1794786011678.jpg';

export const MEDIA_ASSETS: Record<ImageKey, string> = {
  hero: heroStampedVilla,
  'beton-imprime': serviceBetonImprime,
  'beton-lisse': serviceBetonLisse,
  'beton-desactive': serviceBetonDesactive,
  'beton-cire': serviceBetonCire,
  'resine-epoxy': serviceResineEpoxy,
  'renovation-tlemis': serviceRenovationTlemis,
  'pool-wood': galleryPoolWood,
  'descente-garage': galleryDescenteGarage,
  'beton-cire-stairs': extraBetonCireStairs,
  'descente-garage-pave': extraDescenteGaragePave,
  'tlemis-bejmat': extraTlemisBejmat,
  'beton-lisse-terrace': extraBetonLisseTerrace,
};

export function getMediaSrc(imageKeyOrUrl: string): string {
  return MEDIA_ASSETS[imageKeyOrUrl as ImageKey] ?? imageKeyOrUrl;
}
