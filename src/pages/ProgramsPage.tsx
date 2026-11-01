import React, { useState } from 'react';
import { 
  Code, 
  Cpu, 
  Rocket, 
  FlaskConical, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Layers, 
  Search,
  BookOpen,
  Wrench,
  ShieldCheck,
  X
} from 'lucide-react';
import { INITIAL_PROGRAMS, Program } from '../data/clubData';

interface ProgramsPageProps {
  onNavigate: (path: string, params?: { programCode?: string }) => void;
  lang: 'en' | 'am';
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onNavigate, lang }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'hardware' | 'software' | 'space' | 'chemistry'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailModalProgram, setDetailModalProgram] = useState<Program | null>(null);

  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return Code;
      case 'cpu': return Cpu;
      case 'rocket': return Rocket;
      case 'flask-conical': return FlaskConical;
      default: return Layers;
    }
  };

  const filteredPrograms = INITIAL_PROGRAMS.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name_am.includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'hardware') return p.code === 'robotics';
    if (activeFilter === 'software') return p.code === 'web';
    if (activeFilter === 'space') return p.code === 'airspace';
    if (activeFilter === 'chemistry') return p.code === 'chem';

    return true;
  });

  return (
    <div className="min-h-screen py-10 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Learning Programs</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Choose your learning path
          </h1>

          <p className="text-lg text-emerald-400 font-medium ethiopic-text">
            የትምህርት መስኮችን ይምረጡ — ተግባራዊ እና ፕሮጀክት ተኮር
          </p>

          <p className="text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Each program is hands-on and project-based. Complete beginners are welcome across all departments.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Programs' },
              { id: 'hardware', label: 'Robotics & Hardware' },
              { id: 'software', label: 'Web & Software' },
              { id: 'space', label: 'Space Science' },
              { id: 'chemistry', label: 'Chemical Factory' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-emerald-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPrograms.map((prog) => {
            const Icon = getProgramIcon(prog.iconName);
            return (
              <div 
                key={prog.id}
                className="relative rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition duration-300 group shadow-lg"
              >
                <div className="space-y-6">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-emerald-400 group-hover:scale-105 transition">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                          Department {prog.sort_order}
                        </span>
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition">
                          {prog.name}
                        </h2>
                        <p className="text-xs text-neutral-400 font-medium ethiopic-text mt-0.5">
                          {prog.name_am}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {prog.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Key Syllabus Topics */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                      Core Curriculum Topics
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {prog.topics.map((t, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-neutral-950 text-neutral-300 border border-neutral-800/80">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Outcomes */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                      What You Will Build & Achieve
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {prog.outcomes.slice(0, 3).map((out, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prerequisites */}
                  {prog.prerequisites && (
                    <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-400">
                      <strong className="text-neutral-200">Prerequisites:</strong> {prog.prerequisites}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 mt-8 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      {prog.duration}
                    </span>
                    <span>•</span>
                    <span>{prog.level}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDetailModalProgram(prog)}
                      className="px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition cursor-pointer"
                    >
                      View Full Syllabus
                    </button>
                    <button
                      onClick={() => onNavigate('/apply', { programCode: prog.code })}
                      className="px-4 py-2 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition shadow-md shadow-emerald-500/10 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Program Syllabus Modal */}
        {detailModalProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Department Details</span>
                  <h3 className="font-display text-2xl font-bold text-white mt-0.5">{detailModalProgram.name}</h3>
                  <p className="text-xs text-neutral-400 ethiopic-text mt-0.5">{detailModalProgram.name_am}</p>
                </div>
                <button
                  onClick={() => setDetailModalProgram(null)}
                  className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
                <p>{detailModalProgram.description}</p>
                
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-emerald-400 mb-2">Complete Course Modules</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {detailModalProgram.topics.map((t, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-emerald-400 mb-2">Equipment & Lab Access</h4>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                    {detailModalProgram.equipment.map((eq, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Wrench className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-emerald-400 mb-2">Target Learning Outcomes</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    {detailModalProgram.outcomes.map((out, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => setDetailModalProgram(null)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const code = detailModalProgram.code;
                    setDetailModalProgram(null);
                    onNavigate('/apply', { programCode: code });
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Apply for {detailModalProgram.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
