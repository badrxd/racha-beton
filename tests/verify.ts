import assert from 'node:assert/strict';
import test from 'node:test';
import catalogJson from '../src/data/catalog.json' with { type: 'json' };
import siteJson from '../src/data/site.json' with { type: 'json' };
import {
  CONTACT_INFO,
  getServicePhotos,
  JOB_SCOPES,
  SERVICES,
  SITE_IMAGES,
} from '../src/data/content.ts';
import {
  buildWhatsAppInquiryUrl,
  formatQuoteMessage,
  validateQuoteInput,
} from '../src/utils/whatsapp.ts';

test('JSON data sources expose only contact/WhatsApp info, image links, and Spécialités catalog', () => {
  assert.deepEqual(CONTACT_INFO, siteJson.contactInfo);
  assert.deepEqual(SITE_IMAGES, siteJson.images);
  assert.equal('copy' in siteJson, false, 'site.json should not store static UI copy');
  assert.equal(
    'galleryProjects' in catalogJson,
    false,
    'catalog.json should not store removed galleryProjects',
  );
  assert.equal('motifs' in catalogJson, false, 'catalog.json should not store static motifs');
  assert.equal(
    'processSteps' in catalogJson,
    false,
    'catalog.json should not store static processSteps',
  );
  assert.equal(
    'coreMaterials' in catalogJson,
    false,
    'catalog.json should not store static coreMaterials',
  );
  assert.equal(SERVICES.length, catalogJson.services.length);
  assert.equal(JOB_SCOPES.length, catalogJson.jobScopes.length);
});

test('all seven specialties including béton ciré and descente de garage have job scopes and photos without cities', () => {
  assert.equal(SERVICES.length, 7);
  assert.equal(JOB_SCOPES.length, 7);

  const serviceIds = new Set(SERVICES.map((s) => s.id));
  assert.ok(serviceIds.has('beton-cire'));
  assert.ok(serviceIds.has('descente-garage'));

  for (const service of SERVICES) {
    assert.ok(service.title.length > 0);
    assert.ok(service.imageKey.length > 0);
    assert.equal(service.highlights.length, 3);
    const scope = JOB_SCOPES.find((item) => item.serviceId === service.id);
    assert.ok(scope, `Missing job scope for ${service.id}`);
    const mergedPhotos = getServicePhotos(service.id);
    assert.ok(mergedPhotos.length >= 1, `Missing photos for ${service.id}`);
    for (const photo of mergedPhotos) {
      assert.ok(photo.url.length > 0 && photo.title.length > 0 && photo.spec.length > 0);
      assert.equal('city' in photo, false, 'Gallery photos must not include city');
    }
    assert.ok(!/(Casablanca|Benslimane|Mohammedia|Bouskoura)/i.test(scope.completedSummary));
    assert.ok(scope.upcomingSteps.length >= 4);
  }
});

test('quote validation catches missing or invalid fields and accepts valid Moroccan inquiries', () => {
  const invalid = validateQuoteInput({
    fullName: 'A',
    phone: '123',
    city: '',
    serviceId: 'beton-imprime',
    surfaceArea: '',
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.deepEqual(invalid.missingFields, ['fullName', 'phone', 'city']);

  const valid = validateQuoteInput({
    fullName: 'Karim El Amrani',
    phone: '+212 660-198413',
    city: 'Casablanca',
    serviceId: 'beton-cire',
    surfaceArea: '120',
    notes: 'Salon en béton ciré',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.missingFields.length, 0);
});

test('WhatsApp inquiry builder encodes French quote summary for new specialties', () => {
  const sample = {
    fullName: 'Salma Berrada',
    phone: '0660198413',
    city: 'Benslimane',
    serviceId: 'descente-garage' as const,
    surfaceArea: '45',
    notes: 'Rampe sous-sol rainurée',
  };

  const url = buildWhatsAppInquiryUrl(sample);
  assert.ok(url.startsWith(`${CONTACT_INFO.whatsappBaseUrl}?text=`));
  assert.ok(decodeURIComponent(url).includes('Descente de garage'));
  assert.ok(decodeURIComponent(url).includes('Benslimane'));

  const msg = formatQuoteMessage(sample);
  assert.ok(msg.includes('Bonjour RACHA BÉTON'));
  assert.ok(msg.includes('45 m²'));
});
