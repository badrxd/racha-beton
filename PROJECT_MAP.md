# PROJECT_MAP — RACHA BÉTON

## TECH_STACK
- **Frontend Framework**: React 19 (`react` ^19.0.1) + TypeScript (`typescript` ^7.0.2)
- **Build Tool**: Vite 8 (`vite` ^8.3.0)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` ^4.3.3) with CSS-first `@theme` tokens (Warm Architectural Stone `#F6F4F0` & Charcoal `#1C1B19` + Terracotta `#B85D2B`)
- **Typography**: `Outfit` (Display), `Plus Jakarta Sans` (Body)
- **Icons & Motion**: `lucide-react` ^0.546.0, `motion` ^12.23.24 (compositor-only, `<= 200ms`)
- **Test Runner**: Node built-in `node:test` + `tsx` (zero-dependency unit & data integrity tests)

## SYSTEM_FLOW
```
[Visitor / Googlebot Arrival (Pre-rendered Static HTML · Routes: / | /travaux)]
        │
        ├──▶ [Top Bar (3-Zone): RACHA BÉTON | Services · Processus · Contact | Devis gratuit]
        │
        ├──▶ [HOME PAGE (/ -> dist/index.html)]
        │       ├─ Hero Split ("Voir nos réalisations" -> /travaux) + Proof Strip
        │       ├─ Services Bento (01–07 + per-service "Voir les photos (N)" -> /travaux)
        │       ├─ Process & Materials Charcoal Band (6 Steps <-> 7 Materials)
        │       └─ Contact & Free Quote Conversion (Direct Phone/WhatsApp + Validated Quote Form)
        │
        └──▶ [DEDICATED PAGE (/travaux -> dist/travaux/index.html): Ce que nous avons réalisé & ce que nous ferons pour vous]
                ├─ Return Home link + 7-Type Selector Bar
                ├─ Full-Width Modern Photo Gallery (4-col grid, lazy loading, progressive batching for 30+ photos, Lightbox filmstrip)
                └─ Full-Width Planned Client Execution Band + Quote CTA (returns to Home /#contact with pre-selected service)
```

## MODULES
- `index.html`: SEO `<title>`, `<meta name="description">`, OpenGraph, Twitter Cards, and Schema.org `HomeAndConstructionBusiness` JSON-LD.
- `public/robots.txt`: Search engine crawl directives (`Allow: /`).
- `src/entry-server.tsx`: SSR entry exporting `render(path)` using `react-dom/server` (`renderToString`).
- `scripts/prerender.mjs`: Post-build SSG generator producing pre-rendered HTML for `dist/index.html` and `dist/travaux/index.html`, plus `dist/sitemap.xml` and canonical tags.
- `src/main.tsx`: Uses `hydrateRoot` when `#root` contains pre-rendered HTML, falling back to `createRoot` in dev.
- `src/data/site.json`: Dynamic WhatsApp/phone/zone contact details and top-level image links (`images.hero`).
- `src/data/catalog.json`: Dynamic Spécialités (`services`, including optional `photos[]`) and per-type photo galleries (`jobScopes[].photos` supporting external image URLs).
- `src/data/content.ts`: Typed facade exposing `CONTACT_INFO`, `SITE_IMAGES`, `SERVICES`, `JOB_SCOPES`, and `getServicePhotos()` from JSON.
- `src/data/media.ts`: Built-in 13-image asset registry and `getMediaSrc()` resolver supporting both built-in keys and external `https://...` links.
- `src/utils/whatsapp.ts`: Form validation logic, phone normalization, and structured French WhatsApp message/URL builder.
- `src/components/Navbar.tsx`: 3-zone top bar (`Services · Processus · Contact`) + responsive mobile drawer.
- `src/components/HeroSection.tsx`: Split architectural hero with direct `Voir nos réalisations` link to `/travaux` and 4-column proof strip.
- `src/components/ServicesBento.tsx`: Asymmetric bento grid for all 7 services, motif selector, Avant/Après comparison, per-service `Voir les photos` links, and bottom callout to `/travaux`.
- `src/components/JobTypeShowcase.tsx`: Dedicated page (`/travaux`) with scalable 4-column photo gallery (batch load-more, Lightbox filmstrip) and planned client execution steps.
- `src/components/ProcessSection.tsx`: Technical methodology and materials switcher.
- `src/components/ContactSection.tsx`: Direct phone/WhatsApp panel + validated quote request workflow.
- `src/components/Footer.tsx`: Quiet footer with navigation mirror (`/`, `/travaux`) and contact details.
- `src/components/SafeImage.tsx`: Zero-broken-image wrapper with styled fallback state.
- `tests/verify.ts`: Automated tests validating lean JSON data exports, 7-service catalog & job scope photo arrays, WhatsApp inquiry encoding, and form validation.

## PENDING & ORPHANS
- None.
