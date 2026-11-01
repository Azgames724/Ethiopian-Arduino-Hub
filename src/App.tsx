import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ApplyPage } from './pages/ApplyPage';
import { StatusPage } from './pages/StatusPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname;
    if (path === '/about' || path === '/programs' || path === '/apply' || path === '/status' || path === '/contact' || path === '/privacy') {
      return path;
    }
    return '/';
  });

  const [routeParams, setRouteParams] = useState<{ programCode?: string; referenceNumber?: string }>({});
  const [lang, setLang] = useState<'en' | 'am'>('en');

  // Handle browser back and forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      if (['/about', '/programs', '/apply', '/status', '/contact', '/privacy'].includes(p)) {
        setCurrentPath(p);
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string, params?: { programCode?: string; referenceNumber?: string }) => {
    setCurrentPath(path);
    if (params) {
      setRouteParams(params);
    } else {
      setRouteParams({});
    }

    try {
      window.history.pushState({}, '', path);
    } catch {
      // In sandbox if pushState restricted
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950">
      {/* Announcement bar on top */}
      <AnnouncementBanner />

      {/* Main navigation */}
      <Navbar 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        lang={lang} 
        setLang={setLang} 
      />

      {/* Active Page View */}
      <main className="flex-1">
        {currentPath === '/about' && (
          <AboutPage onNavigate={handleNavigate} lang={lang} />
        )}
        {currentPath === '/programs' && (
          <ProgramsPage onNavigate={handleNavigate} lang={lang} />
        )}
        {currentPath === '/apply' && (
          <ApplyPage 
            initialProgramCode={routeParams.programCode} 
            onNavigate={handleNavigate} 
            lang={lang} 
          />
        )}
        {currentPath === '/status' && (
          <StatusPage 
            initialReference={routeParams.referenceNumber} 
            onNavigate={handleNavigate} 
            lang={lang} 
          />
        )}
        {currentPath === '/contact' && (
          <ContactPage lang={lang} />
        )}
        {currentPath === '/privacy' && (
          <PrivacyPage onNavigate={handleNavigate} lang={lang} />
        )}
        {currentPath === '/' && (
          <HomePage onNavigate={handleNavigate} lang={lang} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} lang={lang} />
    </div>
  );
}
