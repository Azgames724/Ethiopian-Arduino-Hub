import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Send, 
  FileText, 
  User, 
  Check, 
  ShieldCheck,
  RefreshCw,
  Database
} from 'lucide-react';
import { getApplicationFromFirestore } from '../lib/firebase';
import { 
  DEMO_APPLICATIONS, 
  STATUS_LABELS, 
  ApplicationRecord 
} from '../data/clubData';

interface StatusPageProps {
  initialReference?: string;
  onNavigate: (path: string) => void;
  lang: 'en' | 'am';
}

export const StatusPage: React.FC<StatusPageProps> = ({ initialReference, onNavigate, lang }) => {
  const [refInput, setRefInput] = useState(initialReference || '');
  const [emailInput, setEmailInput] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<ApplicationRecord | null>(null);
  const [searchError, setSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-search if initialReference provided
  useEffect(() => {
    if (initialReference) {
      setRefInput(initialReference);
      handleSearch(initialReference, '');
    }
  }, [initialReference]);

  function maskEmail(email: string): string {
    if (!email || !email.includes('@')) return '***@***.com';
    const [user, domain] = email.split('@');
    if (user.length <= 2) return `${user[0]}***@${domain}`;
    return `${user.slice(0, 2)}***@${domain}`;
  }

  const handleSearch = async (overrideRef?: string, overrideEmail?: string) => {
    const targetRef = (overrideRef !== undefined ? overrideRef : refInput).trim().toUpperCase();
    const targetEmail = (overrideEmail !== undefined ? overrideEmail : emailInput).trim().toLowerCase();

    if (!targetRef) {
      setSearchError('Please enter your Application Reference Number.');
      return;
    }

    if (!targetEmail) {
      setSearchError('To protect student privacy and secrets, please provide the email used in your application.');
      return;
    }

    setSearchError('');
    setIsLoading(true);
    setSearched(true);

    // 1. Query Firebase Firestore
    try {
      const firestoreApp = await getApplicationFromFirestore(targetRef, targetEmail);
      if (firestoreApp) {
        setResult(firestoreApp);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.warn('Firestore lookup check:', e);
    }

    // 2. Check user submitted apps in localStorage
    try {
      const userApps: ApplicationRecord[] = JSON.parse(localStorage.getItem('eah_user_applications') || '[]');
      const matchInUser = userApps.find(app => 
        app.referenceNumber.toUpperCase() === targetRef && 
        (!targetEmail || app.email.toLowerCase() === targetEmail)
      );
      if (matchInUser) {
        setResult(matchInUser);
        setIsLoading(false);
        return;
      }
    } catch {
      // ignore
    }

    // 3. Check demo applications
    const matchInDemo = DEMO_APPLICATIONS.find(app => 
      app.referenceNumber.toUpperCase() === targetRef &&
      (!targetEmail || app.email.toLowerCase() === targetEmail)
    );

    if (matchInDemo) {
      setResult(matchInDemo);
    } else {
      setResult(null);
    }
    setIsLoading(false);
  };

  const loadDemo = (demo: ApplicationRecord) => {
    setRefInput(demo.referenceNumber);
    setEmailInput(demo.email);
    setSearchError('');
    setSearched(true);
    setResult(demo);
  };

  const getTimelineStep = (status: string) => {
    switch (status) {
      case 'submitted': return 1;
      case 'under_review': return 2;
      case 'info_required': return 2;
      case 'accepted': return 4;
      case 'waitlisted': return 3;
      case 'enrolled': return 5;
      case 'rejected': return 4;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold">
            <Clock className="w-4 h-4" />
            <span>Student Status Portal</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Check your application
          </h1>

          <p className="text-base text-neutral-300">
            Track your review progress, department decisions, and cohort orientation details in real time.
          </p>
        </div>

        {/* Search Box Form */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Reference number <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={refInput}
                    onChange={(e) => setRefInput(e.target.value)}
                    placeholder="e.g. EAH-2026-7842"
                    className="w-full pl-10 pr-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white font-mono-custom text-sm focus:outline-none focus:border-emerald-500 uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Email used in your application <span className="text-emerald-400">*</span> <span className="text-neutral-500 text-[10px]">(Required to verify identity)</span>
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-3.5 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {searchError && (
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{searchError}</span>
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              {/* Demo quick links */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 flex-wrap">
                <span className="text-neutral-500">Try sample IDs:</span>
                <button
                  type="button"
                  onClick={() => loadDemo(DEMO_APPLICATIONS[0])}
                  className="underline hover:text-emerald-400 cursor-pointer font-mono-custom"
                >
                  EAH-2026-7842 (Admitted)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => loadDemo(DEMO_APPLICATIONS[1])}
                  className="underline hover:text-emerald-400 cursor-pointer font-mono-custom"
                >
                  EAH-2026-3190 (In Review)
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-neutral-950 transition shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 text-sm ${
                  isLoading ? 'bg-emerald-600/50 cursor-wait' : 'bg-emerald-400 hover:bg-emerald-300 cursor-pointer'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>{isLoading ? 'Searching...' : 'Check Status'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* RESULTS SECTION */}
        {searched && result && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 space-y-8 animate-fade-in relative overflow-hidden shadow-2xl">

            {/* Profile Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono-custom text-xs font-bold text-neutral-400 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                    {result.referenceNumber}
                  </span>
                  <span className="text-xs text-neutral-500">• {maskEmail(result.email)}</span>
                  <span className="text-xs text-neutral-500">• Applied {new Date(result.submittedAt).toLocaleDateString()}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono-custom px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified & Confidential</span>
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white">
                  {result.fullName} {result.fatherName}
                </h2>
                <p className="text-sm text-emerald-400 font-semibold">
                  Track: {result.programName}
                </p>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${STATUS_LABELS[result.status]?.color}`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span>{STATUS_LABELS[result.status]?.label}</span>
                </span>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Application Progress Timeline
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { step: 1, label: "Submitted", desc: "Form & ID received" },
                  { step: 2, label: "Under Review", desc: "Mentor evaluation" },
                  { step: 3, label: "Decision", desc: "Cohort selection" },
                  { step: 4, label: "Orientation", desc: "Lab & Telegram onboarding" },
                ].map((s) => {
                  const currentStepNum = getTimelineStep(result.status);
                  const isDone = currentStepNum >= s.step;
                  const isCurrent = currentStepNum === s.step;
                  return (
                    <div 
                      key={s.step} 
                      className={`p-3.5 rounded-xl border transition ${
                        isDone 
                          ? 'bg-neutral-950 border-emerald-500/40 text-neutral-200' 
                          : 'bg-neutral-950/40 border-neutral-800 text-neutral-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold font-mono-custom">Step 0{s.step}</span>
                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <div className={`text-xs font-semibold ${isDone ? 'text-white' : 'text-neutral-500'}`}>
                        {s.label}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {s.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Committee Notes / Cohort Assignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Review Committee Notes
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {result.notes || "Your application is currently with the academic reviewers."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Assigned Cohort / Details
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 font-medium">
                  {result.cohort ? (
                    <span className="text-white font-semibold">{result.cohort}</span>
                  ) : (
                    "To be determined upon completion of review"
                  )}
                </p>
                {result.nextSteps && (
                  <p className="text-xs text-neutral-400 pt-1">
                    <strong className="text-neutral-300">Action:</strong> {result.nextSteps}
                  </p>
                )}
              </div>
            </div>

            {/* Direct Action for Accepted Students */}
            {result.status === 'accepted' && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2 justify-center sm:justify-start">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Join the Official Qualified Students Group</span>
                  </h4>
                  <p className="text-xs text-neutral-300">
                    Connect with your fellow cohort members and receive the lab orientation packet.
                  </p>
                </div>
                <a
                  href="https://t.me/BLACKBOY_2427"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-400 hover:bg-emerald-300 text-neutral-950 transition flex items-center gap-2 shrink-0 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open Telegram Channel</span>
                </a>
              </div>
            )}

            {/* Refresh / Print info */}
            <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-800">
              <span>Last updated: {new Date(result.updatedAt).toLocaleString()}</span>
              <button
                onClick={() => handleSearch()}
                className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh Status</span>
              </button>
            </div>

          </div>
        )}

        {searched && !result && (
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-12 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">No Application Found</h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
              We couldn't find an application matching reference <strong className="text-white">"{refInput}"</strong>. Please verify the code or check the email used during submission.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/apply')}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-400 text-neutral-950 hover:bg-emerald-300 transition"
              >
                Submit a New Application
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
