import React, { useState } from 'react';
import { Bell, ArrowRight, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { INITIAL_ANNOUNCEMENTS } from '../data/clubData';

export const AnnouncementBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const announcement = INITIAL_ANNOUNCEMENTS[0];

  if (!announcement || !announcement.published) return null;

  return (
    <>
      <div className="bg-neutral-900/90 border-b border-neutral-800 px-4 py-2 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Official Bulletin
            </span>
            <p className="text-neutral-300 truncate font-medium">
              <span className="text-white font-semibold">{announcement.title}</span> — Cohort 2026-B evaluation complete.
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="shrink-0 flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
          >
            <span>View Notice</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-neutral-900 border border-emerald-500/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Official Announcement</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-0.5">{announcement.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 overflow-y-auto space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {announcement.body}
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-neutral-400">
                Published on <span className="text-neutral-200 font-medium">{announcement.date}</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="https://t.me/BLACKBOY_2427"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Join Official Telegram</span>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
