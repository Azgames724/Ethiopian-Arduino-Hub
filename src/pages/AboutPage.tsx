import React, { useState } from 'react';
import { 
  Cpu, 
  Users, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  BookOpen, 
  GraduationCap, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Laptop,
  Flame,
  Award
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  lang: 'en' | 'am';
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, lang }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const pillars = [
    {
      icon: Cpu,
      title: "Learn by building",
      title_am: "በመስራት መማር",
      desc: "Every lesson leads to something you can hold, run or publish. We skip endless theoretical slides and put microcontrollers, sensors, code editors, and real components straight into your hands.",
      accent: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400"
    },
    {
      icon: Users,
      title: "Community first",
      title_am: "ማህበረሰብ ቀዳሚ",
      desc: "Peers and mentors support each other through every project. You will never struggle through bugs or circuit wiring alone — our collaborative labs and Telegram channels connect you with passionate young makers.",
      accent: "from-blue-500/20 to-indigo-500/10",
      border: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      icon: Compass,
      title: "Solve local problems",
      title_am: "የሀገር ውስጥ ችግሮችን መፍታት",
      desc: "We encourage projects that make a difference in Ethiopian communities. From smart irrigation for local farmers to healthcare telemetry and solar energy trackers, technology is built for impact.",
      accent: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30",
      iconColor: "text-amber-400"
    }
  ];

  const targetAudiences = [
    {
      title: "Secondary School Students",
      badge: "Grades 9 — 12",
      desc: "Kickstart your STEM journey early. Build circuits, code your first games, and explore space and robotics before university entrance.",
      icon: GraduationCap
    },
    {
      title: "TVET & Polytechnic Students",
      badge: "Technical & Vocational",
      desc: "Bridge mechanical and electrical theory with hands-on microcontroller automation, sensor calibration, and industrial IoT skills.",
      icon: Layers
    },
    {
      title: "University Students & Grads",
      badge: "Degree & Diploma",
      desc: "Complement academic lectures with real production-grade web systems, embedded hardware builds, and aerospace innovation.",
      icon: Laptop
    },
    {
      title: "Curious Beginners of Any Background",
      badge: "Zero Experience Needed",
      desc: "Never written code or touched an Arduino before? Our tracks start with basic logic and build up step-by-step with warm mentor guidance.",
      icon: Sparkles
    }
  ];

  const faqs = [
    {
      q: "Do I need my own personal laptop to apply and participate?",
      a: "No! While having your own laptop is advantageous, it is not a prerequisite. Ethiopian Arduino Hub provides workstation computers during scheduled lab sessions and hands-on hardware starter kits for all students."
    },
    {
      q: "How much does it cost to join Ethiopian Arduino Hub?",
      a: "Our core programs are structured to be accessible to young Ethiopian talents. Admission is based on enthusiasm, dedication, and your Amharic cover letter rather than financial barriers. Hardware kits are used collaboratively in the lab."
    },
    {
      q: "Where do physical classes and workshops take place?",
      a: "Workshops and laboratory sessions take place at our learning facility in Addis Ababa, Ethiopia, alongside scheduled remote mentorship and active cohort discussion groups on Telegram."
    },
    {
      q: "What is the Amharic cover letter requirement in the application?",
      a: "We ask every applicant to write a short statement in Amharic explaining why they want to join, their curiosity, and what problem they hope to solve. We care about your honest passion, not flowery words!"
    },
    {
      q: "Will I receive a certificate or portfolio upon graduation?",
      a: "Yes! Every student who successfully finishes their cohort and presents their capstone project receives an official Ethiopian Arduino Hub Certificate of Completion and a publicly verifiable project showcase."
    }
  ];

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Hero Section */}
        <div className="relative text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono-custom tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="uppercase font-semibold text-neutral-300">About Ethiopian Arduino Hub</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            A home for young <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">Ethiopian makers</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-emerald-400 ethiopic-text tracking-wide">
            ኢትዮጵያን አርዱዪኖ ሀብ — ተግባራዊ የቴክኖሎጂ ትምህርት ማህበረሰብ
          </p>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
            <strong className="text-white font-semibold">Ethiopian Arduino Hub (EAH)</strong> is a technology learning community focused on helping young people develop practical, job-ready skills. We started around Arduino and electronics and have grown to include web development and artificial intelligence.
          </p>

          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 text-sm text-neutral-300 max-w-xl mx-auto">
            Our programs are designed for secondary school, TVET and university students, graduates and anyone curious — including complete beginners.
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/apply')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] cursor-pointer text-sm"
            >
              <span>Apply to Join EAH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/programs')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition cursor-pointer text-sm"
            >
              <span>Explore Programs</span>
            </button>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400">Our Core Principles</h2>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">How we build future leaders</h3>
            <p className="text-sm text-neutral-400">Three foundational commitments guide every workshop, lesson, and cohort at EAH.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className={`relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b ${pillar.accent} to-neutral-900/90 border ${pillar.border} transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-neutral-950/80 border border-neutral-700 flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                    </div>

                    <div>
                      <h4 className="font-display text-xl font-bold text-white">{pillar.title}</h4>
                      <p className="text-xs text-emerald-400/90 font-medium ethiopic-text mt-0.5">{pillar.title_am}</p>
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center text-xs font-semibold text-neutral-400">
                    <span className="flex items-center gap-1.5 text-white">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      100% Practical
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Who is EAH for? */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Inclusive Education</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">Who can join Ethiopian Arduino Hub?</h3>
            <p className="text-sm text-neutral-400 mt-2">
              Technology belongs to everyone. Our doors are open regardless of your formal academic track or whether you have previous tech exposure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudiences.map((aud, i) => {
              const Icon = aud.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 hover:border-neutral-700 transition">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-neutral-900 text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {aud.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base">{aud.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{aud.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Journey Roadmap */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Student Roadmap</span>
            <h3 className="font-display text-2xl sm:text-4xl font-bold text-white">From first circuit to shipped project</h3>
            <p className="text-sm text-neutral-400">Every cohort follows a structured, supportive project-based curriculum.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { step: "01", title: "Orientation & Safety", desc: "Understand lab safety, microcontroller architecture, electronic components, and development tools." },
              { step: "02", title: "Core Labs & Coding", desc: "Build weekly interactive exercises: blinking LEDs, sensor telemetry, responsive HTML/CSS, or chemical formulas." },
              { step: "03", title: "Community Problem Capstone", desc: "Form a 2-3 student team to tackle a genuine Ethiopian challenge (agriculture, health, clean water, education)." },
              { step: "04", title: "Demo Day & Certification", desc: "Present your working invention to mentors, peers, and industry guests. Receive your EAH Certificate." },
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 relative space-y-3">
                <span className="font-mono-custom text-3xl font-extrabold text-neutral-700">
                  {st.step}
                </span>
                <h4 className="font-bold text-white text-base">{st.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Student FAQs */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Got Questions?</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-xl border border-neutral-800 bg-neutral-900/70 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-emerald-400 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-neutral-900 to-teal-950 border border-emerald-500/30 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-white max-w-xl mx-auto">
            Ready to build the future with your own hands?
          </h3>
          <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto">
            The application takes about 20–30 minutes. Your progress is saved automatically on this device so you can complete it at your own pace.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/apply')}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition shadow-xl shadow-emerald-500/20 cursor-pointer"
            >
              <span>Apply to Join EAH</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('/status')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition cursor-pointer"
            >
              <span>Track Existing Application</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
