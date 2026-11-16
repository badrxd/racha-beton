# RACHA BÉTON — Showcase & Contact Website

A trilingual (French, Arabic, English) architectural showcase and client contact website for **RACHA BÉTON**, presenting their full range of exterior/interior decorative concrete installations, epoxy flooring, and floor renovation services across Casablanca, Benslimane, and surrounding regions in Morocco.

## User Review & Critical Decisions

> [!IMPORTANT]
> All core scope and design preferences were confirmed during discovery. Please review the architectural plan below and confirm to begin implementation.

- **Confirmed Decision 1 — Trilingual Experience (FR / AR / EN)**: Full interface support in French (default), Arabic (with automatic `dir="rtl"` layout mirroring), and English.
- **Confirmed Decision 2 — Warm Architectural Stone & Charcoal Aesthetic**: Limestone plaster background (`#F6F4F0`), deep charcoal structural surfaces (`#1C1B19`), and warm terracotta-bronze accents (`#B85D2B`) tailored to decorative concrete craftsmanship.
- **Confirmed Decision 3 — Multi-Channel Contact & Free Quote Flow**: Direct click-to-call (`+212 660-198413`), one-tap WhatsApp launch, and an interactive validated quote request form (`Devis gratuit`) that composes a structured WhatsApp inquiry with a local confirmation summary fallback.
- **Confirmed Decision 4 — Equal Service Prominence**: All five service pillars from RACHA BÉTON's portfolio (*Béton Imprimé*, *Béton Lissé*, *Béton Désactivé*, *Résine Époxy*, and *Rénovation & Tlemis*) receive equal architectural weight alongside the technical process and material breakdown.
- **Planned Deliverable Note — Memory Foundation & Clean Imagery**: Upon approval, execution will also produce `PROJECT_MAP.md` (documenting `TECH_STACK` and `SYSTEM_FLOW`) and generate clean, high-resolution architectural concrete imagery without mobile social-media UI chrome.

---

## 1. Overview & Core Concept

- **What It Does**: Serves as the digital storefront and project gallery for RACHA BÉTON, enabling homeowners, villa developers, and commercial property managers to inspect concrete finishes, understand the 6-step installation methodology, browse filtered project photography in a full-resolution lightbox, and request a free quote via WhatsApp, phone, or web form.
- **Target Audience / Persona**: Property owners, architects, and contractors in Casablanca, Benslimane, and nearby Moroccan cities seeking durable decorative concrete paving, poolside decking, industrial/residential epoxy floors, or restoration (*Tlemis*) of existing *pavés*, *bejmat*, and *kijmat*.
- **Key Value**: Replaces fragmented social-media posts with a cohesive, credible showcase that bridges visual inspection directly to instant quote conversion.

---

## 2. User Experience & Visual Design

### Key User Flows

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. Arrival & Language Selection                                         │
│    Visitor lands on Hero Split -> switches FR / AR (RTL) / EN           │
│    Sees Casablanca/Benslimane coverage + primary "Devis gratuit" CTA    │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 2. Service & Pattern Exploration                                        │
│    Reviews 5 numbered services (01–05) -> inspects Béton Imprimé motifs │
│    (Pierre naturelle, Pavé, Ardoise, Bois, Brique, Dalle) & Avant/Après │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 3. Visual Proof & Process Inspection                                    │
│    Filters Realizations gallery by specialty -> opens Lightbox viewer   │
│    Checks 6 Execution Steps & 7 Core Materials                          │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│ 4. Direct Contact & Quote Submission                                    │
│    Calls +212 660-198413 / opens WhatsApp directly, OR completes        │
│    validated Quote Form -> launches pre-filled WhatsApp + local receipt │
└─────────────────────────────────────────────────────────────────────────┘
```

### Visual Identity & Theme

- **Aesthetic Direction**: Warm architectural stone & charcoal monograph—grounded, tactile, and free of generic SaaS embellishments or decorative pill clutter.
- **Color Palette (60-30-10 Discipline)**:
  - *60% Dominant Neutral Canvas*: `--background: #F6F4F0` (warm limestone plaster) and `#FFFFFF` light gallery cards.
  - *30% Structural Surfaces & Ink*: `--surface: #ECE8E1`, subtle 1px hairline borders (`#DCD6CC`), deep architectural charcoal (`#1C1B19` for primary headings and the technical process band), and muted slate-stone secondary copy (`#57534E`).
  - *10% Focused Accent*: `--primary: #B85D2B` (kiln-fired terracotta / sealed concrete bronze) reserved strictly for primary CTAs, active tabs, and focus rings, paired with clear WCAG AA contrast (`#FFFFFF` on `#B85D2B`).
- **Typography & Hierarchy (2+1 Font Discipline)**:
  - *Display & Brand*: `Outfit` (`clamp(2.25rem, 4vw, 3.75rem)` hero display, `tracking-tight`, `text-wrap: balance` to prevent orphan words).
  - *Body Prose*: `Plus Jakarta Sans` (15–16px, `1.6` line-height) paired with `Noto Sans Arabic` automatically when Arabic (`AR`) mode is active.
  - *Numerals*: `tabular-nums` applied to phone numbers, project dimensions, step indices (`01.`–`06.`), and service metrics.
- **Top Bar & Layout Rhythm**:
  - **Strict 3-Zone Top Bar**: Single-line `RACHA BÉTON` wordmark — 4 concise single-line nav links (`Services`, `Réalisations`, `Processus`, `Contact`) — 1 primary CTA (`Devis gratuit`). The `FR / AR / EN` switcher sits cleanly in the Hero toolbar and Footer to preserve header restraint.
  - **Asymmetric Composition**: `items-stretch` 2-column Hero split with a full-width 4-metric proof strip directly below; asymmetric Bento showcase for the 5 services; single-elevation hairline-bordered cards without nested boxes or thick left accent bars.
- **Interactive Feedback & Motion**:
  - Compositor-only transitions (`transform`, `opacity`) settling within `180ms` (`cubic-bezier(0.16, 1, 0.3, 1)`), respecting `prefers-reduced-motion`.
  - Instant client-side filtering transitions, smooth RTL/LTR document direction switching, keyboard-accessible (`ESC`) fullscreen gallery lightbox, and explicit inline form validation with non-intrusive submission confirmation.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Client-Side Trilingual Dictionary (`FR / AR / EN`) vs. Multi-Route Subpages**
  - *Chosen Approach*: Single-page React state localization dictionary toggling `document.documentElement.lang` and `dir` (`ltr` / `rtl`) instantaneously.
  - *Why*: Zero page-reload friction for visitors switching between French, Arabic, and English, and keeps all contact/quote flows one scroll away.
  - *Alternatives Considered*: Separate URL routes (`/fr`, `/ar`, `/en`) — adds routing boilerplate without user benefit for a single-business showcase.

- **Decision 2 — Static Client-Side Architecture + WhatsApp/Phone Conversion vs. Custom Backend Database**
  - *Chosen Approach*: Pure static SPA (Simplicity First) where the Quote Form validates inputs client-side and generates a structured, pre-filled `wa.me/212660198413` WhatsApp message alongside an on-screen copyable confirmation card.
  - *Why*: RACHA BÉTON already conducts customer quotes via WhatsApp (`+212 660-198413`); eliminating an unnecessary backend server or database prevents hosting/auth complexity and ensures immediate delivery straight to the business owner's phone.
  - *Alternatives Considered*: Express + SQLite/Firestore lead inbox — rejected per Simplicity First and scope restraint, since no admin dashboard was requested.

- **Decision 3 — Bespoke Architectural Showcase Imagery vs. Cropped Phone Screenshots**
  - *Chosen Approach*: Generate clean, high-resolution architectural concrete and floor-renovation images matching every service and motif shown in the uploaded Facebook screenshots (*Béton Imprimé* fan cobblestones/compass rose/poolside wood deck, *Béton Lissé*, *Béton Désactivé*, *Résine Époxy*, and *Pavé/Bejmat Tlemis* renovation).
  - *Why*: The uploaded images contain mobile phone status bars and Facebook UI chrome; bespoke clean photography ensures a trustworthy, production-grade presentation.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Temporal Awareness & Stack Baseline (November 2026)

| Layer | Technology | Workspace Version | Latest Stable (Nov 2026) | Role |
| :--- | :--- | :--- | :--- | :--- |
| UI Framework | React | `19.0.1` | `19.3.x` | Component architecture & state |
| Build Tool | Vite | `8.3.0` | `8.3.x` | Fast Rolldown-powered bundling |
| Styling | Tailwind CSS (`@tailwindcss/vite`) | `4.3.3` | `4.3.x` | CSS-first `@theme` tokens & RTL utilities |
| Motion & Icons | Motion / Lucide React | `12.23.24` / `0.546.0` | Current | Compositor micro-interactions & affordance icons |
| Language | TypeScript | `7.0.2` | Current | Strict typed localization & domain data |

### System & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────┐
│ App Root (Locale Context: 'fr' | 'ar' | 'en', dir: 'ltr' | 'rtl')       │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐   ┌─────────────────────────────────────┐  │
│  │ Trilingual Dictionary   │   │ Domain Catalog (Static Typed Data)  │  │
│  │ (FR / AR / EN copy)     │   │ 5 Services · 6 Motifs · Gallery ·   │  │
│  └────────────┬────────────┘   │ 6 Steps · 7 Materials · Contact     │  │
│               │                └──────────────────┬──────────────────┘  │
│               ▼                                   ▼                     │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Top Navigation Bar (3-Zone Contract: Brand · 4 Links · 1 CTA)     │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────┐  ┌─────────────────────────────────────────┐  │
│  │ Hero Split &         │  │ Services Bento (01–05)                  │  │
│  │ FR/AR/EN Switcher    │  │ + Interactive Motif & Avant/Après Views │  │
│  └──────────────────────┘  └─────────────────────────────────────────┘  │
│  ┌──────────────────────┐  ┌─────────────────────────────────────────┐  │
│  │ Filterable Gallery   │  │ Process & Materials Band                │  │
│  │ + Fullscreen Lightbox│  │ (6 Execution Steps · 7 Core Materials)  │  │
│  └──────────────────────┘  └─────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Contact & Free Quote Section (Direct Phone/WhatsApp + Validated   │  │
│  │ Quote Form -> WhatsApp Deep-Link & Copyable Receipt)              │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Interactive State Mapping

- **Locale State (`locale`: `'fr' | 'ar' | 'en'`)**: Syncs `<html lang>` and `<html dir>` (`rtl` for Arabic, `ltr` otherwise); controls all UI copy, service descriptions, and form validation messages.
- **Service Exploration State**:
  - *Pattern Inspector (`activeMotif`)*: Cycles through the 6 *Béton Imprimé* motifs (*Pierre naturelle*, *Pavé*, *Ardoise*, *Bois*, *Brique*, *Dalle*) with visual finish details.
  - *Renovation View Toggle (`renovationView`: `'after' | 'before'`)*: Lets visitors compare untreated/weathered stone vs. deep-cleaned, sealed *Tlemis* finishes.
- **Gallery & Lightbox State (`activeCategory`, `selectedProjectId`)**:
  - Segmented filter buttons filter gallery cards immediately on click.
  - Clicking any card opens a modal Lightbox displaying the full image, category, city (*Casablanca*, *Benslimane*, *Mohammedia*, *Bouskoura*), surface notes, and keyboard `ESC` / close button dismissal.
- **Process Tab State (`processTab`: `'steps' | 'materials'`)**: Switches cleanly between the 6 installation stages and the 7 material components without vertical page bloat.
- **Quote Form State (`formData`, `errors`, `submittedSummary`)**:
  - Validates required fields (`fullName`, Moroccan/international `phone`, `city`, `serviceType`, optional `surfaceArea` & `notes`).
  - On submit, opens a pre-formatted `https://wa.me/212660198413?text=...` inquiry link in a safe anchor/action and renders an inline confirmation receipt with a one-click copy-text fallback.
