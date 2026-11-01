import React from 'react';
import { Send, Mail, Phone, MapPin, ShieldCheck, Heart, Terminal, Sparkles } from 'lucide-react';
import { SITE_SETTINGS } from '../data/clubData';

interface FooterProps {
  onNavigate: (path: string) => void;
  lang: 'en' | 'am';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 border border-neutral-800 p-1.5 flex items-center justify-center">
                <img 
                  src="/assets/eah-logo-wide.png" 
                  alt="EAH Logo" 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">Ethiopian Arduino Hub</h3>
                <p className="text-sm text-neutral-400 font-medium ethiopic-text">ኢትዮጵያን አርዱዪኖ ሀብ</p>
              </div>
            </div>
            
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Practical technology skills for young Ethiopians. Learn web development, robotics, space science, and applied innovation through hands-on building.
            </p>

            <div className="pt-2">
              <a
                href={`https://t.me/${SITE_SETTINGS.contact_telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-900/40 rounded-lg transition"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>Join Official Telegram Channel</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              {lang === 'am' ? 'የትምህርት መስኮች' : 'Learning Tracks'}
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <button 
                  onClick={() => onNavigate('/programs')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/programs')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Robotics & Embedded Systems
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/programs')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Space Science
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/programs')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Chemical Factory & Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Student Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              {lang === 'am' ? 'የተማሪዎች አገልግሎት' : 'Student Portal'}
            </h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <button 
                  onClick={() => onNavigate('/about')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  About EAH
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/apply')} 
                  className="hover:text-emerald-400 transition cursor-pointer font-medium text-emerald-400"
                >
                  Apply to Join EAH
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/status')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Check Application Status
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('/privacy')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              {lang === 'am' ? 'አድራሻ' : 'Official Contact'}
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{SITE_SETTINGS.contact_location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <a href={`mailto:${SITE_SETTINGS.contact_email}`} className="hover:text-emerald-400 break-all">
                  {SITE_SETTINGS.contact_email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>+251 92 243 5966</span>
              </li>
              <li className="flex items-start gap-2">
                <Send className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <a href={`https://t.me/${SITE_SETTINGS.contact_telegram}`} target="_blank" rel="noreferrer" className="hover:text-emerald-400 font-mono-custom">
                  @{SITE_SETTINGS.contact_telegram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 Ethiopian Arduino Hub (EAH). Academic & Technology Learning Community.</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('/privacy')} 
              className="hover:text-neutral-400 transition"
            >
              Privacy Policy & Terms
            </button>
            <span>•</span>
            <span className="text-neutral-400">
              Practical Technology & Engineering Education • Addis Ababa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
