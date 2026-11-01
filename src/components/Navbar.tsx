import React, { useState } from 'react';
import { Menu, X, ArrowRight, ExternalLink, Globe, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  lang: 'en' | 'am';
  setLang: (lang: 'en' | 'am') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: lang === 'am' ? 'ስለ እኛ' : 'About', path: '/about' },
    { name: lang === 'am' ? 'ፕሮግራሞች' : 'Programs', path: '/programs' },
    { name: lang === 'am' ? 'የማመልከቻ ሁኔታ' : 'Application Status', path: '/status' },
    { name: lang === 'am' ? 'አድራሻ' : 'Contact', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo / Brand */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1 transition"
            aria-label="Ethiopian Arduino Hub — Home"
          >
            <div className="relative flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-neutral-900 border border-neutral-700/80 p-1.5 group-hover:border-emerald-500/60 transition shadow-inner">
              <img 
                src="/assets/eah-logo-wide.png" 
                alt="EAH Logo" 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  // Fallback if image fails to render
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="sr-only">EAH</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-emerald-400 transition">
                  Ethiopian Arduino Hub
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                  EAH
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-medium ethiopic-text">
                ኢትዮጵያን አርዱዪኖ ሀብ
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-neutral-800 text-emerald-400 font-semibold shadow-sm border border-neutral-700'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition"
              title="Toggle English / Amharic"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'en' ? 'አማርኛ' : 'English'}</span>
            </button>

            {/* Apply Button */}
            <button
              onClick={() => handleNav('/apply')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] transition active:scale-95 cursor-pointer"
            >
              <span>{lang === 'am' ? 'አመልክት' : 'Apply to Join'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
              className="p-2 text-xs font-medium text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-lg"
            >
              {lang === 'en' ? 'አማ' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                {link.name}
              </button>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => handleNav('/apply')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-base font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow"
            >
              <span>{lang === 'am' ? 'አመልክት' : 'Apply to Join EAH'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
