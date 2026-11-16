import { CONTACT_INFO, SERVICES, type ServiceId } from '../data/content';

export interface QuoteFormInput {
  fullName: string;
  phone: string;
  city: string;
  serviceId: ServiceId;
  surfaceArea: string;
  notes: string;
}

export interface QuoteValidationResult {
  valid: boolean;
  missingFields: Array<'fullName' | 'phone' | 'city'>;
}

export function validateQuoteInput(input: QuoteFormInput): QuoteValidationResult {
  const missingFields: Array<'fullName' | 'phone' | 'city'> = [];

  if (input.fullName.trim().length < 2) {
    missingFields.push('fullName');
  }

  const digitsOnly = input.phone.replace(/[^\d]/g, '');
  if (digitsOnly.length < 8) {
    missingFields.push('phone');
  }

  if (input.city.trim().length < 2) {
    missingFields.push('city');
  }

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}

export function formatQuoteMessage(input: QuoteFormInput): string {
  const service = SERVICES.find((item) => item.id === input.serviceId);
  const serviceTitle = service ? service.title : input.serviceId;
  const cleanSurface = input.surfaceArea.trim();
  const cleanNotes = input.notes.trim();

  const lines = [
    'Bonjour RACHA BÉTON, je souhaite demander un devis gratuit :',
    `- Nom : ${input.fullName.trim()}`,
    `- Téléphone : ${input.phone.trim()}`,
    `- Ville : ${input.city.trim()}`,
    `- Prestation : ${serviceTitle}`,
    cleanSurface ? `- Surface estimée : ${cleanSurface} m²` : null,
    cleanNotes ? `- Détails : ${cleanNotes}` : null,
  ];
  return lines.filter(Boolean).join('\n');
}

export function buildWhatsAppInquiryUrl(input: QuoteFormInput): string {
  const message = formatQuoteMessage(input);
  return `${CONTACT_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}
