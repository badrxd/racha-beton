import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from 'lucide-react';
import {
  getServicePhotos,
  JOB_SCOPES,
  SERVICES,
  type ServiceId,
} from '../data/content';
import { getMediaSrc } from '../data/media';
import { SafeImage } from './SafeImage';

const GALLERY_BATCH_SIZE = 12;

interface JobTypeShowcaseProps {
  initialServiceId?: ServiceId;
  onBackHome: () => void;
  onSelectService: (serviceId: ServiceId) => void;
}

export function JobTypeShowcase({
  initialServiceId = SERVICES[0].id,
  onBackHome,
  onSelectService,
}: JobTypeShowcaseProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>(initialServiceId);
  const [visibleCount, setVisibleCount] = useState<number>(GALLERY_BATCH_SIZE);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    setSelectedServiceId(initialServiceId);
    setVisibleCount(GALLERY_BATCH_SIZE);
    setPreviewIndex(null);
  }, [initialServiceId]);

  const selectedService =
    SERVICES.find((service) => service.id === selectedServiceId) ?? SERVICES[0];
  const selectedScope =
    JOB_SCOPES.find((scope) => scope.serviceId === selectedServiceId) ?? JOB_SCOPES[0];

  const photos = getServicePhotos(selectedService.id);
  const visiblePhotos = photos.slice(0, visibleCount);
  const remainingCount = Math.max(0, photos.length - visiblePhotos.length);
  const activePhoto =
    previewIndex !== null && photos[previewIndex] ? photos[previewIndex] : null;

  useEffect(() => {
    if (previewIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewIndex(null);
      } else if (event.key === 'ArrowRight') {
        setPreviewIndex((prev) =>
          prev === null ? null : (prev + 1) % photos.length,
        );
      } else if (event.key === 'ArrowLeft') {
        setPreviewIndex((prev) =>
          prev === null ? null : (prev - 1 + photos.length) % photos.length,
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previewIndex, photos.length]);

  const handleSelectType = (serviceId: ServiceId) => {
    setSelectedServiceId(serviceId);
    setVisibleCount(GALLERY_BATCH_SIZE);
    setPreviewIndex(null);
  };

  return (
    <section className="py-10 sm:py-16 min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#57534E] hover:text-[#1C1B19] transition-colors mb-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D2B]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Retour à l’accueil</span>
          </button>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-[#B85D2B] mb-2">
              Page travaux par spécialité
            </p>
            <h1 className="font-display text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.12] tracking-tight text-[#1C1B19] mb-4">
              Ce que nous avons réalisé et ce que nous ferons pour vous
            </h1>
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
              Sélectionnez un type de revêtement pour consulter la galerie photo de nos chantiers
              livrés ainsi que notre intervention détaillée sur votre futur projet.
            </p>
          </div>
        </div>

        {/* Job Type Selector Bar */}
        <div
          className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#DCD6CC]"
          role="group"
          aria-label="Sélectionner une spécialité"
        >
          {SERVICES.map((service) => {
            const active = service.id === selectedService.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => handleSelectType(service.id)}
                aria-pressed={active}
                className={`px-4 py-2.5 min-h-[40px] text-xs sm:text-sm font-semibold rounded-lg border transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B] ${
                  active
                    ? 'bg-[#1C1B19] text-white border-[#1C1B19]'
                    : 'bg-white text-[#57534E] border-[#DCD6CC] hover:text-[#1C1B19] hover:border-[#1C1B19]'
                }`}
              >
                <span className="tabular-nums me-1.5 opacity-75">{service.index}</span>
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Full-Width Modern Architectural Photo Gallery (Built for 30+ photos per specialty) */}
        <div className="space-y-6">
          <div>
            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1C1B19]">
                Travaux déjà réalisés
              </h2>
              <span className="text-xs font-semibold text-[#B85D2B] tabular-nums">
                {photos.length} photos
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#57534E] mt-1">
              {selectedScope.completedSummary}
            </p>
          </div>

          {/* Photo-First Bento / 4-Column Responsive Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {visiblePhotos.map((photo, index) => {
              const isFeatureTile = visiblePhotos.length >= 4 && index === 0;
              return (
                <button
                  key={`${selectedService.id}-${index}`}
                  type="button"
                  onClick={() => setPreviewIndex(index)}
                  className={`group relative rounded-xl overflow-hidden border border-[#DCD6CC] hover:border-[#1C1B19] bg-[#ECE8E1] text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B] ${
                    isFeatureTile ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-[4/3]'
                  }`}
                >
                  <SafeImage
                    src={getMediaSrc(photo.url)}
                    alt={photo.title}
                    fallbackTitle={photo.title}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />

                  {/* Measured contrast scrim for legible overlay typography */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden="true"
                  />

                  <span className="absolute top-3 end-3 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#1C1B19]/75 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150">
                    <Expand className="w-4 h-4" aria-hidden="true" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                    <p className="text-[11px] sm:text-xs text-white/80 mb-0.5 truncate">
                      {photo.spec}
                    </p>
                    <h3 className="font-display text-xs sm:text-sm md:text-base font-semibold text-white leading-snug line-clamp-1">
                      {photo.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progressive Batch Controls for 30+ Photo Galleries */}
          {remainingCount > 0 && (
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + GALLERY_BATCH_SIZE)}
                className="px-5 py-2.5 min-h-[42px] text-sm font-semibold text-white bg-[#1C1B19] hover:bg-[#B85D2B] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Afficher plus ({Math.min(GALLERY_BATCH_SIZE, remainingCount)} sur{' '}
                {remainingCount} restantes)
              </button>
              <button
                type="button"
                onClick={() => setVisibleCount(photos.length)}
                className="px-4 py-2.5 min-h-[42px] text-sm font-semibold text-[#1C1B19] bg-white border border-[#DCD6CC] hover:border-[#1C1B19] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                Tout afficher ({photos.length})
              </button>
            </div>
          )}
        </div>

        {/* Full-Width Planned Client Execution Scope */}
        <div className="bg-white border border-[#DCD6CC] rounded-xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-6 border-b border-[#DCD6CC]">
            <div>
              <span className="text-xs font-semibold text-[#B85D2B] block mb-1">
                {selectedService.index} {selectedService.title}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1C1B19]">
                Ce que nous ferons sur votre chantier
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onSelectService(selectedService.id)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#B85D2B] hover:bg-[#9A4B20] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 self-start lg:self-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1B19]"
            >
              <span>Choisir ce type pour un devis</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {selectedScope.upcomingSteps.map((stepText, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-[#B85D2B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm sm:text-base text-[#1C1B19]/90 leading-relaxed">
                  {stepText}
                </span>
              </li>
            ))}
          </ol>

          <div className="pt-5 border-t border-[#DCD6CC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
            <span className="font-semibold text-[#57534E]">Espaces recommandés</span>
            <span className="font-medium text-[#1C1B19]">{selectedScope.idealSpaces}</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal with Thumbnail Strip */}
      {activePhoto && previewIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#1C1B19]/95 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setPreviewIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden border border-[#DCD6CC]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#DCD6CC]">
              <div className="flex items-center gap-2 text-xs text-[#57534E] truncate">
                <span className="font-semibold text-[#B85D2B]">{selectedService.title}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {previewIndex + 1} / {photos.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewIndex(null)}
                aria-label="Fermer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#DCD6CC] text-[#1C1B19] hover:bg-[#ECE8E1] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative bg-[#1C1B19] aspect-[16/10] max-h-[58vh] w-full flex items-center justify-center">
              <SafeImage
                src={getMediaSrc(activePhoto.url)}
                alt={activePhoto.title}
                fallbackTitle={activePhoto.title}
                className="w-full h-full object-contain"
              />

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewIndex(
                        (previewIndex - 1 + photos.length) % photos.length,
                      )
                    }
                    aria-label="Précédent"
                    className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-[#1C1B19]/80 text-white border border-white/20 flex items-center justify-center hover:bg-[#B85D2B] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewIndex((previewIndex + 1) % photos.length)
                    }
                    aria-label="Suivant"
                    className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-[#1C1B19]/80 text-white border border-white/20 flex items-center justify-center hover:bg-[#B85D2B] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="px-5 py-4 border-t border-[#DCD6CC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold text-[#1C1B19]">
                {activePhoto.title}
              </h3>
              <p className="text-xs font-medium text-[#57534E] whitespace-nowrap shrink-0">
                {activePhoto.spec}
              </p>
            </div>

            {photos.length > 1 && (
              <div className="px-5 py-3 bg-[#F6F4F0] border-t border-[#DCD6CC] flex items-center gap-2 overflow-x-auto">
                {photos.map((thumb, idx) => {
                  const isSelected = idx === previewIndex;
                  return (
                    <button
                      key={`thumb-${idx}`}
                      type="button"
                      onClick={() => setPreviewIndex(idx)}
                      aria-label={thumb.title}
                      className={`w-16 h-12 rounded-md overflow-hidden border-2 shrink-0 transition-opacity ${
                        isSelected
                          ? 'border-[#B85D2B] opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <SafeImage
                        src={getMediaSrc(thumb.url)}
                        alt={thumb.title}
                        fallbackTitle={thumb.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
