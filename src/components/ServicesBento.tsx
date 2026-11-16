import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Images } from 'lucide-react';
import { getServicePhotos, SERVICES, type ServiceId } from '../data/content';
import { getMediaSrc } from '../data/media';
import { SafeImage } from './SafeImage';

interface ServicesBentoProps {
  onSelectService: (serviceId: ServiceId) => void;
  onOpenWorksPage: (serviceId?: ServiceId) => void;
}

const MOTIFS = [
  {
    id: 'pierre-naturelle',
    label: 'Pierre naturelle',
    textureNote: 'Relief organique irrégulier idéal pour terrasses et abords de jardin.',
    swatchHex: '#9A8F80',
  },
  {
    id: 'pave',
    label: 'Pavé éventail',
    textureNote: 'Courbes européennes classiques adaptées aux allées carrossables.',
    swatchHex: '#5A524C',
  },
  {
    id: 'ardoise',
    label: 'Ardoise',
    textureNote: 'Dalles géométriques à grain minéral fin en gris anthracite ou sable.',
    swatchHex: '#3F4246',
  },
  {
    id: 'bois',
    label: 'Effet Bois',
    textureNote: 'Lames texturées imputrescibles conçues pour les plages de piscine.',
    swatchHex: '#8C7A68',
  },
  {
    id: 'brique',
    label: 'Brique',
    textureNote: 'Appareillage traditionnel chaleureux pour entrées et bordures.',
    swatchHex: '#9C4B34',
  },
  {
    id: 'dalle',
    label: 'Grande Dalle',
    textureNote: 'Trame contemporaine épurée pour esplanades et espaces commerciaux.',
    swatchHex: '#B6A896',
  },
];

export function ServicesBento({ onSelectService, onOpenWorksPage }: ServicesBentoProps) {
  const [activeMotifId, setActiveMotifId] = useState<string>(MOTIFS[0].id);
  const [renovationView, setRenovationView] = useState<'after' | 'before'>('after');

  const activeMotif = MOTIFS.find((m) => m.id === activeMotifId) ?? MOTIFS[0];

  return (
    <section id="services" className="py-16 sm:py-24 border-b border-[#DCD6CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold text-[#B85D2B] mb-2">Savoir-faire complet</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B19] mb-4">
            Sept spécialités pour aménager et réhabiliter vos sols
          </h2>
          <p className="text-base text-[#57534E] leading-relaxed">
            De la création complète sur dalle neuve à la remise à neuf de vos anciens pavés et
            bejmat sans tout casser.
          </p>
        </div>

        {/* Spécialités in Asymmetric Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {SERVICES.map((service) => {
            const isStamped = service.id === 'beton-imprime';
            const isRenovation = service.id === 'renovation-tlemis';
            const spanClass = isStamped
              ? 'md:col-span-2 lg:col-span-4'
              : isRenovation
                ? 'lg:col-span-4'
                : 'lg:col-span-2';

            return (
              <article
                key={service.id}
                className={`${spanClass} bg-white border border-[#DCD6CC] rounded-xl overflow-hidden flex flex-col`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#ECE8E1] relative">
                  <SafeImage
                    src={getMediaSrc(service.imageKey)}
                    alt={service.title}
                    fallbackTitle={service.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isRenovation && renovationView === 'before'
                        ? 'grayscale-[65%] contrast-[0.82] brightness-[0.86] sepia-[20%]'
                        : ''
                    }`}
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-display text-xl font-bold text-[#1C1B19]">
                        <span className="text-[#B85D2B] tabular-nums me-2">{service.index}</span>
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm font-medium text-[#1C1B19]/85 mb-2">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-[#57534E] leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#57534E]">
                      {service.highlights.map((point) => (
                        <li key={point} className="flex items-baseline gap-2">
                          <span className="text-[#B85D2B] font-bold" aria-hidden="true">
                            ·
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive 6-Motif Explorer for Béton Imprimé */}
                  {isStamped && (
                    <div className="pt-5 border-t border-[#DCD6CC]">
                      <p className="text-xs font-semibold text-[#1C1B19] mb-3">
                        Motifs disponibles pour le béton imprimé
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {MOTIFS.map((motif) => {
                          const selected = motif.id === activeMotif.id;
                          return (
                            <button
                              key={motif.id}
                              type="button"
                              onClick={() => setActiveMotifId(motif.id)}
                              aria-pressed={selected}
                              className={`inline-flex items-center gap-2 px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B] ${
                                selected
                                  ? 'bg-[#1C1B19] text-white'
                                  : 'bg-[#ECE8E1] text-[#57534E] hover:text-[#1C1B19]'
                              }`}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-sm shrink-0"
                                style={{ backgroundColor: motif.swatchHex }}
                                aria-hidden="true"
                              />
                              <span>{motif.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs text-[#57534E] leading-relaxed">
                        {activeMotif.textureNote}
                      </p>
                    </div>
                  )}

                  {/* Interactive Avant / Après Finish Toggle for Rénovation & Tlemis */}
                  {isRenovation && (
                    <div className="pt-5 border-t border-[#DCD6CC]">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                        <span className="text-xs font-semibold text-[#1C1B19]">
                          Aperçu finition Tlemis
                        </span>
                        <div className="inline-flex items-center gap-1 p-1 bg-[#ECE8E1] rounded-lg">
                          <button
                            type="button"
                            onClick={() => setRenovationView('before')}
                            aria-pressed={renovationView === 'before'}
                            className={`px-3 py-1 min-h-[32px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                              renovationView === 'before'
                                ? 'bg-[#1C1B19] text-white'
                                : 'text-[#57534E] hover:text-[#1C1B19]'
                            }`}
                          >
                            Avant traitement
                          </button>
                          <button
                            type="button"
                            onClick={() => setRenovationView('after')}
                            aria-pressed={renovationView === 'after'}
                            className={`px-3 py-1 min-h-[32px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                              renovationView === 'after'
                                ? 'bg-[#B85D2B] text-white'
                                : 'text-[#57534E] hover:text-[#1C1B19]'
                            }`}
                          >
                            Après Tlemis &amp; vernis
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#57534E] leading-relaxed">
                        {renovationView === 'before'
                          ? 'Surface ternie par les intempéries et dépôts incrustés.'
                          : 'Nettoyage en profondeur, couleurs ravivées et vernis protecteur.'}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#DCD6CC] flex flex-wrap items-center justify-between gap-4">
                    <a
                      href="#contact"
                      onClick={() => onSelectService(service.id)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B85D2B] hover:text-[#9A4B20] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D2B]"
                    >
                      <span>Demander un devis pour ce service</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>

                    <a
                      href="/travaux"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenWorksPage(service.id);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#1C1B19] hover:text-[#B85D2B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D2B]"
                    >
                      <Images className="w-4 h-4 text-[#B85D2B]" aria-hidden="true" />
                      <span>
                        Voir les photos ({getServicePhotos(service.id).length})
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-[#DCD6CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-[#57534E]">
            Consultez toutes nos photos de chantiers livrés et les étapes prévues pour votre
            projet selon chaque type de revêtement.
          </p>
          <a
            href="/travaux"
            onClick={(e) => {
              e.preventDefault();
              onOpenWorksPage();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[42px] text-sm font-semibold text-white bg-[#1C1B19] hover:bg-[#B85D2B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B]"
          >
            <span>Voir toutes nos réalisations par spécialité</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
