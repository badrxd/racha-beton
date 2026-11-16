import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

export type ActivePage = 'home' | 'works';

interface NavbarProps {
  onNavigate: (page: ActivePage, sectionHash?: string) => void;
}

const NAV_LINKS: Array<{ label: string; page: ActivePage; href: string; hash: string }> = [
  { label: 'Services', page: 'home', href: '/#services', hash: '#services' },
  { label: 'Processus', page: 'home', href: '/#process', hash: '#process' },
  { label: 'Contact', page: 'home', href: '/#contact', hash: '#contact' },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (page: ActivePage, hash: string) => {
    setMobileOpen(false);
    onNavigate(page, hash);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F4F0]/95 backdrop-blur-sm border-b border-[#DCD6CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home', '#top');
          }}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#1C1B19] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D2B]"
        >
          {CONTACT_INFO.brandName}
        </a>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.page, link.hash);
              }}
              className="hover:text-[#1C1B19] hover:underline underline-offset-4 decoration-[#B85D2B] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85D2B]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home', '#contact');
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 min-h-[40px] text-xs font-semibold text-white bg-[#B85D2B] hover:bg-[#9A4B20] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1B19]"
          >
            Devis gratuit
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#DCD6CC] text-[#1C1B19] hover:bg-[#ECE8E1] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85D2B]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#DCD6CC] bg-[#F6F4F0] px-4 py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.page, link.hash);
              }}
              className="block py-2.5 px-3 text-sm font-medium text-[#1C1B19] rounded-lg hover:bg-[#ECE8E1] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home', '#contact');
            }}
            className="block w-full text-center py-2.5 px-4 text-sm font-semibold text-white bg-[#B85D2B] hover:bg-[#9A4B20] rounded-lg transition-colors"
          >
            Devis gratuit
          </a>
        </div>
      )}
    </header>
  );
}
