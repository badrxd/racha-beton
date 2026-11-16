/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { JobTypeShowcase } from './components/JobTypeShowcase';
import { Navbar, type ActivePage } from './components/Navbar';
import { ProcessSection } from './components/ProcessSection';
import { ServicesBento } from './components/ServicesBento';
import type { ServiceId } from './data/content';

const HOME_TITLE = 'RACHA BÉTON — Béton Imprimé, Résine Époxy & Sols';
const WORKS_TITLE = 'Nos Travaux par Spécialité — RACHA BÉTON';

function resolvePageFromLocation(initialPath?: string): ActivePage {
  if (initialPath) {
    return initialPath.startsWith('/travaux') ? 'works' : 'home';
  }
  if (typeof window !== 'undefined') {
    if (
      window.location.pathname.startsWith('/travaux') ||
      window.location.hash === '#/travaux'
    ) {
      return 'works';
    }
  }
  return 'home';
}

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps) {
  const [activePage, setActivePage] = useState<ActivePage>(() =>
    resolvePageFromLocation(initialPath),
  );
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('beton-imprime');
  const [worksServiceId, setWorksServiceId] = useState<ServiceId>('beton-imprime');

  useEffect(() => {
    document.title = activePage === 'works' ? WORKS_TITLE : HOME_TITLE;
  }, [activePage]);

  useEffect(() => {
    const syncFromLocation = () => {
      setActivePage(resolvePageFromLocation());
    };
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  const handleNavigate = (page: ActivePage, sectionHash?: string) => {
    setActivePage(page);

    if (page === 'works') {
      if (window.location.pathname !== '/travaux') {
        window.history.pushState(null, '', '/travaux');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetHash = sectionHash && sectionHash !== '/travaux' && sectionHash !== '#/travaux'
      ? sectionHash
      : '#top';
    const nextUrl = targetHash === '#top' ? '/' : `/${targetHash}`;
    window.history.pushState(null, '', nextUrl);
    window.requestAnimationFrame(() => {
      if (targetHash === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.querySelector(targetHash)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  const handleOpenWorksPage = (serviceId?: ServiceId) => {
    if (serviceId) {
      setWorksServiceId(serviceId);
    }
    handleNavigate('works', '/travaux');
  };

  const handleSelectServiceForQuote = (serviceId: ServiceId) => {
    setSelectedServiceId(serviceId);
    handleNavigate('home', '#contact');
  };

  return (
    <div className="min-h-screen bg-[#F6F4F0] text-[#1C1B19]">
      <Navbar onNavigate={handleNavigate} />
      <main>
        {activePage === 'works' ? (
          <JobTypeShowcase
            initialServiceId={worksServiceId}
            onBackHome={() => handleNavigate('home', '#top')}
            onSelectService={handleSelectServiceForQuote}
          />
        ) : (
          <>
            <HeroSection onOpenWorksPage={() => handleOpenWorksPage()} />
            <ServicesBento
              onSelectService={setSelectedServiceId}
              onOpenWorksPage={handleOpenWorksPage}
            />
            <ProcessSection />
            <ContactSection preselectedServiceId={selectedServiceId} />
          </>
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
