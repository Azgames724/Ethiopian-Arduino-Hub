import React, { useState } from 'react';
import { 
  ArrowRight, 
  Code, 
  Cpu, 
  Rocket, 
  FlaskConical, 
  CheckCircle2, 
  Users, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  FileText, 
  Search, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { INITIAL_PROGRAMS, SITE_SETTINGS, Program } from '../data/clubData';

interface HomePageProps {
  onNavigate: (path: string, params?: { programCode?: string }) => void;
  lang: 'en' | 'am';
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, lang }) => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return Code;
      case 'cpu': return Cpu;
      case 'rocket': return Rocket;
      case 'flask-conical': return FlaskConical;
      default: return Layers;
    }
  };

  const steps = [
    {
      num: "01",
      title: "Apply online",
      title_am: "በኦንላይን ያመልክቱ",
      desc: "Fill in your details, choose a program and write your Amharic cover letter. Form progress saves automatically.",
      actionText: "Start Application",
      actionPath: "/apply"
    },
    {
      num: "02",
      title: "Get reviewed",
      title_am: "ማመልከቻዎ ይመረመራል",
      desc: "Our mentors and department leads review every application carefully and fairly based on genuine curiosity.",
      actionText: "Review Criteria",
      actionPath: "/privacy"
    },
    {
      num: "03",
      title: "Track status",
      title_am: "ሁኔታውን ይከታተሉ",
      desc: "Use your unique reference number (e.g. EAH-2026-XXXX) to check your progress at any time.",
      actionText: "Check Status Now",
      actionPath: "/status"
    },
    {
      num: "04",
      title: "Start learning",
      title_am: "መማር ይጀምሩ",
      desc: "Accepted students receive an official orientation packet, join the Telegram cohort, and begin hands-on building.",
      actionText: "Learn About Cohorts",
      actionPath: "/about"
    }
  ];

  return (
    <div className="min-h-screen space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 lg:pb-20 border-b border-neutral-800/80">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono-custom tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-neutral-400 font-semibold uppercase">EAH Technology Community</span>
                <span className="text-neutral-600">|</span>
                <span className="text-emerald-400">Addis Ababa</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                {SITE_SETTINGS.hero_title}{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent block mt-1">
                  {SITE_SETTINGS.hero_highlight}
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-semibold text-emerald-400 ethiopic-text tracking-wide">
                {SITE_SETTINGS.hero_amharic}
              </p>

              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
                {SITE_SETTINGS.hero_text}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('/apply')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] active:scale-95 cursor-pointer text-sm"
                >
                  <span>Apply to Join EAH</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/programs')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition cursor-pointer text-sm"
                >
                  <span>Explore Programs</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700 font-mono-custom">
                    4 Tracks
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Open to complete beginners</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Hardware & lab kits provided</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Real Ethiopian community impact</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual / Interactive Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
                {/* Hero image */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-950">
                  <img
                    src="/assets/hero.jpg"
                    alt="Ethiopian Arduino Hub students building projects"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/90 text-neutral-950 rounded-md">
                      Makers at Work
                    </span>
                    <p className="text-sm font-medium text-white mt-1 drop-shadow">
                      Hands-on electronics, robotics, and coding lab in Addis Ababa
                    </p>
                  </div>
                </div>

                {/* Quick stats grid below image */}
                <div className="p-5 grid grid-cols-3 gap-2 text-center bg-neutral-950/90 border-t border-neutral-800">
                  <div className="p-2">
                    <div className="text-xl font-extrabold text-white font-display">4</div>
                    <div className="text-[11px] text-neutral-400">Core Tracks</div>
                  </div>
                  <div className="p-2 border-x border-neutral-800">
                    <div className="text-xl font-extrabold text-emerald-400 font-display">100%</div>
                    <div className="text-[11px] text-neutral-400">Practical Labs</div>
                  </div>
                  <div className="p-2">
                    <div className="text-xl font-extrabold text-white font-display">2026</div>
                    <div className="text-[11px] text-neutral-400">New Cohort</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Mission</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              Turning curiosity into real skills — one circuit, one line of code at a time.
            </h2>
            
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              We believe every young Ethiopian deserves access to hands-on technology education. Our programs focus on building real projects, mentorship and community.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Choose Your Path</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">Learning Programs</h2>
            <p className="text-sm text-neutral-400 mt-1">
              Each program is hands-on and project-based. Complete beginners are warmly welcomed.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/programs')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer self-start sm:self-auto"
          >
            <span>View all program syllabi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_PROGRAMS.map((prog) => {
            const Icon = getProgramIcon(prog.iconName);
            return (
              <div
                key={prog.id}
                className="group relative rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-emerald-500/40 text-emerald-400 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {prog.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-emerald-300 transition">
                      {prog.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-medium ethiopic-text mt-0.5">
                      {prog.name_am}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-bold block mb-1.5">
                      Key Topics
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.topics.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800">
                          {t}
                        </span>
                      ))}
                      {prog.topics.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                          +{prog.topics.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">
                    {prog.duration}
                  </span>
                  <button
                    onClick={() => onNavigate('/apply', { programCode: prog.code })}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    <span>Apply</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How the application works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Admissions Workflow</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">How the application works</h2>
          <p className="text-sm text-neutral-400">
            A transparent, fair 4-step admission journey designed with student convenience in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div 
              key={i} 
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4 hover:border-neutral-700 transition"
            >
              <div className="space-y-3">
                <span className="font-mono-custom text-3xl font-extrabold text-emerald-400/80">
                  {st.num}
                </span>
                <div>
                  <h3 className="font-bold text-white text-lg">{st.title}</h3>
                  <p className="text-xs text-emerald-400 font-medium ethiopic-text mt-0.5">{st.title_am}</p>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={() => onNavigate(st.actionPath)}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{st.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ready to start banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900 border border-emerald-500/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Student Portal</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">Ready to start?</h3>
            <p className="text-sm text-neutral-300 max-w-md">
              The application takes about 20–30 minutes. All questions are easy to answer and beginner friendly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('/apply')}
              className="px-6 py-3.5 rounded-xl font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
            >
              <span>Apply to Join EAH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/status')}
              className="px-5 py-3.5 rounded-xl font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
            >
              <span>Check Status</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
