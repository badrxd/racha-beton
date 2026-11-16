import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { CONTACT_INFO, SERVICES, type ServiceId } from '../data/content';
import {
  buildWhatsAppInquiryUrl,
  formatQuoteMessage,
  validateQuoteInput,
  type QuoteFormInput,
} from '../utils/whatsapp';

interface ContactSectionProps {
  preselectedServiceId: ServiceId;
}

export function ContactSection({ preselectedServiceId }: ContactSectionProps) {
  const [formData, setFormData] = useState<QuoteFormInput>({
    fullName: '',
    phone: '',
    city: '',
    serviceId: preselectedServiceId,
    surfaceArea: '',
    notes: '',
  });
  const [hasError, setHasError] = useState(false);
  const [missingFields, setMissingFields] = useState<Array<'fullName' | 'phone' | 'city'>>([]);
  const [preparedInquiry, setPreparedInquiry] = useState<{
    whatsappUrl: string;
    summaryText: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
  }, [preselectedServiceId]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateQuoteInput(formData);

    if (!validation.valid) {
      setHasError(true);
      setMissingFields(validation.missingFields);
      return;
    }

    setHasError(false);
    setMissingFields([]);
    setCopied(false);
    setPreparedInquiry({
      whatsappUrl: buildWhatsAppInquiryUrl(formData),
      summaryText: formatQuoteMessage(formData),
    });
  };

  const handleCopy = async () => {
    if (!preparedInquiry) return;
    try {
      await navigator.clipboard.writeText(preparedInquiry.summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-semibold text-[#B85D2B] mb-2">
                Contact &amp; Devis gratuit
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B19] mb-4">
                Parlons de votre projet de sol
              </h2>
              <p className="text-base text-[#57534E] leading-relaxed">
                Décrivez votre surface et votre ville : réponse directe par téléphone ou WhatsApp
                avec estimation claire.
              </p>
            </div>

            <div className="bg-white border border-[#DCD6CC] rounded-xl p-6 space-y-6">
              <h3 className="font-display text-lg font-bold text-[#1C1B19]">Contact direct</h3>

              <div className="space-y-4">
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="flex items-center justify-between gap-4 py-3 border-b border-[#DCD6CC] group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B]"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#B85D2B] shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-xs text-[#57534E]">Téléphone</span>
                      <span
                        className="font-display text-base font-semibold text-[#1C1B19] group-hover:text-[#B85D2B] transition-colors tabular-nums"
                        dir="ltr"
                      >
                        {CONTACT_INFO.phoneDisplay}
                      </span>
                    </div>
                  </div>
                </a>

                <div className="flex items-center justify-between gap-4 py-2 border-b border-[#DCD6CC]">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-[#B85D2B] shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-xs text-[#57534E]">WhatsApp direct</span>
                      <span
                        className="font-display text-base font-semibold text-[#1C1B19] tabular-nums"
                        dir="ltr"
                      >
                        {CONTACT_INFO.phoneDisplay}
                      </span>
                    </div>
                  </div>
                  <a
                    href={CONTACT_INFO.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 min-h-[38px] inline-flex items-center text-xs font-semibold text-white bg-[#1C1B19] hover:bg-[#B85D2B] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    Ouvrir WhatsApp
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <MapPin className="w-5 h-5 text-[#B85D2B] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="block text-xs text-[#57534E]">Zones d’intervention</span>
                    <span className="text-sm font-medium text-[#1C1B19]">
                      {CONTACT_INFO.zones}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Validated Free Quote Request Form */}
          <div className="lg:col-span-7 bg-white border border-[#DCD6CC] rounded-xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold text-[#1C1B19] mb-6">
              Demande de devis gratuit
            </h3>

            {preparedInquiry ? (
              <div className="space-y-5">
                <div className="p-4 rounded-lg bg-[#ECE8E1] border border-[#DCD6CC] flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#B85D2B] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-display text-base font-bold text-[#1C1B19]">
                      Votre demande est prête à être envoyée
                    </p>
                    <p className="text-sm text-[#57534E] mt-1">
                      Cliquez ci-dessous pour ouvrir la conversation WhatsApp pré-remplie, ou
                      copiez le récapitulatif.
                    </p>
                  </div>
                </div>

                <pre className="p-4 rounded-lg bg-[#F6F4F0] border border-[#DCD6CC] text-sm text-[#1C1B19] whitespace-pre-wrap font-sans leading-relaxed">
                  {preparedInquiry.summaryText}
                </pre>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={preparedInquiry.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#B85D2B] hover:bg-[#9A4B20] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Envoyer via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] text-sm font-semibold text-[#1C1B19] bg-[#ECE8E1] hover:bg-[#DCD6CC] rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#B85D2B]" aria-hidden="true" />
                    ) : (
                      <Copy className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>{copied ? 'Copié' : 'Copier le texte'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreparedInquiry(null)}
                    className="px-4 py-3 min-h-[44px] text-sm font-medium text-[#57534E] hover:text-[#1C1B19] transition-colors whitespace-nowrap shrink-0"
                  >
                    Modifier la demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {hasError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-[#B85D2B]/10 border border-[#B85D2B]/40 flex items-center gap-2.5 text-sm text-[#1C1B19]"
                  >
                    <AlertCircle className="w-4 h-4 text-[#B85D2B] shrink-0" aria-hidden="true" />
                    <span>
                      Veuillez renseigner votre nom, un numéro valide, votre ville et le service
                      souhaité.
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-semibold text-[#1C1B19] mb-1.5"
                    >
                      Nom complet *
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ex. Karim El Amrani"
                      aria-invalid={missingFields.includes('fullName')}
                      className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border bg-[#F6F4F0] text-sm text-[#1C1B19] placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#B85D2B] ${
                        missingFields.includes('fullName')
                          ? 'border-[#B85D2B]'
                          : 'border-[#DCD6CC]'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-semibold text-[#1C1B19] mb-1.5"
                    >
                      Téléphone / WhatsApp *
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex. 06 60 19 84 13"
                      aria-invalid={missingFields.includes('phone')}
                      className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border bg-[#F6F4F0] text-sm text-[#1C1B19] placeholder:text-[#78716C] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#B85D2B] ${
                        missingFields.includes('phone')
                          ? 'border-[#B85D2B]'
                          : 'border-[#DCD6CC]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label
                      htmlFor="quote-city"
                      className="block text-xs font-semibold text-[#1C1B19] mb-1.5"
                    >
                      Ville / Quartier *
                    </label>
                    <input
                      id="quote-city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ex. Casablanca, Benslimane..."
                      aria-invalid={missingFields.includes('city')}
                      className={`w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border bg-[#F6F4F0] text-sm text-[#1C1B19] placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#B85D2B] ${
                        missingFields.includes('city')
                          ? 'border-[#B85D2B]'
                          : 'border-[#DCD6CC]'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="quote-service"
                      className="block text-xs font-semibold text-[#1C1B19] mb-1.5"
                    >
                      Prestation souhaitée
                    </label>
                    <select
                      id="quote-service"
                      value={formData.serviceId}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceId: e.target.value as ServiceId })
                      }
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border border-[#DCD6CC] bg-[#F6F4F0] text-sm text-[#1C1B19] focus:outline-none focus:ring-2 focus:ring-[#B85D2B]"
                    >
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-surface"
                      className="block text-xs font-semibold text-[#1C1B19] mb-1.5"
                    >
                      Surface estimée (m²)
                    </label>
                    <input
                      id="quote-surface"
                      type="number"
                      min="1"
                      value={formData.surfaceArea}
                      onChange={(e) => setFormData({ ...formData, surfaceArea: e.target.value })}
                      placeholder="Ex. 120"
                      className="w-full px-3.5 py-2.5 min-h-[44px] rounded-lg border border-[#DCD6CC] bg-[#F6F4F0] text-sm text-[#1C1B19] placeholder:text-[#78716C] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#B85D2B]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-notes"
                    className="block text-xs font-semibold text-[#1C1B19] mb-1.5"
                  >
                    Précisions (motif, état du sol, délai)
                  </label>
                  <textarea
                    id="quote-notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Allée de villa, descente de garage, béton ciré ou rénovation de pavés..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#DCD6CC] bg-[#F6F4F0] text-sm text-[#1C1B19] placeholder:text-[#78716C] focus:outline-none focus:ring-2 focus:ring-[#B85D2B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#B85D2B] hover:bg-[#9A4B20] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1B19]"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Préparer la demande sur WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
