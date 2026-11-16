import { CONTACT_INFO } from '../data/content';
import type { ActivePage } from './Navbar';

interface FooterProps {
  onNavigate: (page: ActivePage, sectionHash?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#DCD6CC] bg-[#ECE8E1]/60 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', '#top');
              }}
              className="font-display text-lg font-bold tracking-tight text-[#1C1B19]"
            >
              {CONTACT_INFO.brandName}
            </a>
            <p className="text-sm text-[#57534E] mt-1">
              Revêtements extérieurs et rénovation de sols au Maroc.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#57534E]">
            <a
              href="/#services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', '#services');
              }}
              className="hover:text-[#1C1B19] transition-colors"
            >
              Services
            </a>
            <a
              href="/travaux"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('works', '/travaux');
              }}
              className="hover:text-[#1C1B19] transition-colors"
            >
              Réalisations
            </a>
            <a
              href="/#process"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', '#process');
              }}
              className="hover:text-[#1C1B19] transition-colors"
            >
              Processus
            </a>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home', '#contact');
              }}
              className="hover:text-[#1C1B19] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-[#DCD6CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#57534E]">
          <span>© 2026 {CONTACT_INFO.brandName}. Tous droits réservés.</span>
          <a
            href={CONTACT_INFO.phoneHref}
            className="font-medium text-[#1C1B19] hover:text-[#B85D2B] transition-colors tabular-nums"
          >
            {CONTACT_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </footer>
  );
}
