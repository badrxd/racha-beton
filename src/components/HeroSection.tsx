import { ArrowRight, Images, MessageCircle, Phone } from 'lucide-react';
import { CONTACT_INFO, SERVICES, SITE_IMAGES } from '../data/content';
import { getMediaSrc } from '../data/media';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onOpenWorksPage: () => void;
}

export function HeroSection({ onOpenWorksPage }: HeroSectionProps) {
  const proofMetrics = [
    { value: String(SERVICES.length), label: 'Spécialités maîtrisées' },
    { value: '6', label: 'Motifs d’impression sur mesure' },
    { value: 'UV & Pluie', label: 'Résine protectrice intégrée' },
    { value: CONTACT_INFO.phoneDisplay, label: 'Ligne directe & WhatsApp' },
  ];

  return (
    <section id="top" className="pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#DCD6CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split 2-column hero with matched height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#57534E] mb-6">
                Casablanca · Benslimane &amp; environs, Maroc
              </p>

              <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-[#1C1B19] mb-5">
                La beauté de la pierre, la force du béton architectural.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#57534E] max-w-xl mb-8">
                {CONTACT_INFO.brandName} conçoit, coule et rénove vos sols extérieurs et
                intérieurs : béton imprimé, béton lissé, béton désactivé, béton ciré,
                résine époxy, descente de garage et tlemis.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#B85D2B] hover:bg-[#9A4B20] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1B19]"
              >
                <span>Demander un devis gratuit</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="/travaux"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenWorksPage();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-[#1C1B19] bg-white border border-[#DCD6CC] hover:border-[#1C1B19] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B]"
              >
                <Images className="w-4 h-4 text-[#B85D2B]" aria-hidden="true" />
                <span>Voir nos réalisations</span>
              </a>

              <a
                href={CONTACT_INFO.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] text-sm font-semibold text-[#1C1B19] hover:text-[#B85D2B] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B]"
              >
                <MessageCircle className="w-4 h-4 text-[#B85D2B]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-3 py-3 min-h-[44px] text-sm font-medium text-[#57534E] hover:text-[#1C1B19] transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B]"
              >
                <Phone className="w-4 h-4 text-[#B85D2B]" aria-hidden="true" />
                <span dir="ltr">{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] rounded-xl overflow-hidden border border-[#DCD6CC] bg-[#ECE8E1]">
              <SafeImage
                src={getMediaSrc(SITE_IMAGES.hero)}
                alt="Allée de villa marocaine en béton imprimé réalisée par RACHA BÉTON"
                fallbackTitle={CONTACT_INFO.brandName}
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Proof Strip */}
        <div className="mt-10 pt-8 border-t border-[#DCD6CC] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {proofMetrics.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#1C1B19] tabular-nums">
                {metric.value}
              </div>
              <p className="text-xs sm:text-sm text-[#57534E]">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
