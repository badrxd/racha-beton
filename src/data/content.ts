import catalogData from './catalog.json' with { type: 'json' };
import siteData from './site.json' with { type: 'json' };

export type ImageKey =
  | 'hero'
  | 'beton-imprime'
  | 'beton-lisse'
  | 'beton-desactive'
  | 'beton-cire'
  | 'resine-epoxy'
  | 'renovation-tlemis'
  | 'pool-wood'
  | 'descente-garage'
  | 'beton-cire-stairs'
  | 'descente-garage-pave'
  | 'tlemis-bejmat'
  | 'beton-lisse-terrace';

export type ServiceId =
  | 'beton-imprime'
  | 'beton-lisse'
  | 'beton-desactive'
  | 'beton-cire'
  | 'resine-epoxy'
  | 'renovation-tlemis'
  | 'descente-garage';

export interface ServiceItem {
  id: ServiceId;
  index: string;
  imageKey: ImageKey | string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  photos?: JobPhotoItem[];
}

export interface JobPhotoItem {
  url: string;
  title: string;
  spec: string;
}

export interface JobScopeItem {
  serviceId: ServiceId;
  completedSummary: string;
  photos: JobPhotoItem[];
  upcomingSteps: string[];
  idealSpaces: string;
}

export const CONTACT_INFO = siteData.contactInfo;
export const SITE_IMAGES = siteData.images;

export const SERVICES = catalogData.services as ServiceItem[];
export const JOB_SCOPES = catalogData.jobScopes as JobScopeItem[];

export function getServicePhotos(serviceId: ServiceId): JobPhotoItem[] {
  const service = SERVICES.find((item) => item.id === serviceId);
  const scope = JOB_SCOPES.find((item) => item.serviceId === serviceId);
  return [...(service?.photos ?? []), ...(scope?.photos ?? [])].filter(
    (photo) => Boolean(photo.url),
  );
}
