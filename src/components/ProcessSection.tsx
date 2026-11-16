import { useState } from 'react';

const PROCESS_STEPS = [
  {
    step: '01.',
    title: 'Préparation du sol',
    detail:
      'Nivellement, compactage soigné, coffrage et mise en place d’un treillis soudé selon l’usage.',
  },
  {
    step: '02.',
    title: 'Coulage du béton',
    detail:
      'Mise en place du béton dosé (ciment, sable, gravier, eau, adjuvants) tiré à la règle.',
  },
  {
    step: '03.',
    title: 'Application du durcisseur',
    detail:
      'Saupoudrage du durcisseur coloré sur béton frais puis lissage mécanique homogène.',
  },
  {
    step: '04.',
    title: 'Agent démoulant',
    detail:
      'Application du démoulant en poudre pour faciliter l’empreinte nette et nuancer les reliefs.',
  },
  {
    step: '05.',
    title: 'Impression des motifs',
    detail:
      'Pose et tassage des moules en polyuréthane (pierre, pavé, ardoise, bois, brique ou dalle).',
  },
  {
    step: '06.',
    title: 'Protection finale (Sealer)',
    detail:
      'Lavage, découpe des joints et application de la résine de protection mate ou brillante anti-UV.',
  },
];

const CORE_MATERIALS = [
  {
    step: '01.',
    title: 'Béton de base structurant',
    detail:
      'Mélange dosé de ciment, sable, gravier calibré, eau et adjuvants selon la charge prévue.',
  },
  {
    step: '02.',
    title: 'Durcisseur coloré de surface',
    detail:
      'Apporte la teinte architecturale dans la masse de surface et renforce la résistance à l’abrasion.',
  },
  {
    step: '03.',
    title: 'Agent démoulant en poudre',
    detail:
      'Évite l’adhérence des moules sur le béton frais et crée une patine minérale naturelle.',
  },
  {
    step: '04.',
    title: 'Moules d’impression haute précision',
    detail:
      'Matrices souples et rigides reproduisant fidèlement pierre naturelle, pavé, ardoise ou bois.',
  },
  {
    step: '05.',
    title: 'Produit de cure',
    detail:
      'Régule l’évaporation de l’eau après coulage pour optimiser la prise et prévenir les fissures.',
  },
  {
    step: '06.',
    title: 'Résine de protection (Sealer)',
    detail:
      'Vernis acrylique ou polyuréthane (brillant ou mat) barrant la route à l’eau, aux taches et aux UV.',
  },
  {
    step: '07.',
    title: 'Finitions & Joints de découpe',
    detail:
      'Sciage précis des joints de retrait et nettoyage final pour une durabilité pluriannuelle.',
  },
];

export function ProcessSection() {
  const [activeTab, setActiveTab] = useState<'steps' | 'materials'>('steps');

  const items = activeTab === 'steps' ? PROCESS_STEPS : CORE_MATERIALS;

  return (
    <section id="process" className="py-16 sm:py-24 bg-[#1C1B19] text-[#F6F4F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#E08A5A] mb-2">
              Méthodologie &amp; Matériaux
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Une exécution rigoureuse du terrassement au vernis final
            </h2>
            <p className="text-base text-[#D6D0C6] leading-relaxed">
              Chaque chantier suit un protocole technique précis pour garantir adhérence, teinte
              stable et résistance durable aux intempéries.
            </p>
          </div>

          <div
            className="inline-flex items-center gap-1 p-1 bg-[#2A2825] border border-[#3E3A35] rounded-lg self-start lg:self-auto"
            role="tablist"
            aria-label="Méthodologie et matériaux"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'steps'}
              onClick={() => setActiveTab('steps')}
              className={`px-4 py-2 min-h-[40px] text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B] ${
                activeTab === 'steps'
                  ? 'bg-[#B85D2B] text-white'
                  : 'text-[#D6D0C6] hover:text-white'
              }`}
            >
              6 Étapes de réalisation
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'materials'}
              onClick={() => setActiveTab('materials')}
              className={`px-4 py-2 min-h-[40px] text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B] ${
                activeTab === 'materials'
                  ? 'bg-[#B85D2B] text-white'
                  : 'text-[#D6D0C6] hover:text-white'
              }`}
            >
              7 Matériaux clés
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-xl bg-[#2A2825] border border-[#3E3A35] flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-sm font-bold text-[#E08A5A] tabular-nums block mb-2">
                  {item.step}
                </span>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#D6D0C6] leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
