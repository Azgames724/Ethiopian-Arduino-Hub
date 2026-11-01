import React from 'react';
import { ShieldCheck, Lock, Eye, Trash2, UserCheck, AlertTriangle } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
  lang: 'en' | 'am';
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate, lang }) => {
  const sections = [
    {
      icon: ShieldCheck,
      title: "What we collect",
      content: "Only what we need to assess your application and enroll you: your name, date of birth, contact details, education background, program choice, cover letter, and one identification document. We do not ask for your national ID number unless strictly required for adult verification."
    },
    {
      icon: UserCheck,
      title: "Why we collect identification",
      content: "An ID confirms that the applicant is a real person and, for students, their current enrollment. A school ID is preferred; a national ID or Kebele ID is only used where needed for verification."
    },
    {
      icon: Lock,
      title: "How documents are protected",
      content: "Documents are stored in private, encrypted storage. They are never publicly accessible. Only authorized EAH administrators, the assigned reviewer, and you can view them, through links that expire within minutes."
    },
    {
      icon: Eye,
      title: "Who can see your application",
      content: "Authorized EAH staff and reviewers assigned to your application. Internal review notes are never shared publicly."
    },
    {
      icon: AlertTriangle,
      title: "Applicants under 18",
      content: "A parent or guardian must provide their name, phone number, and consent before an application from a minor is accepted."
    },
    {
      icon: Trash2,
      title: "Retention and deletion",
      content: "Identification documents for rejected or withdrawn applications are deleted within 12 months. Records of enrolled students are kept for the duration of enrollment plus 3 years. You may request deletion at any time by contacting info@ethiopianarduinohub.org."
    }
  ];

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-semibold uppercase tracking-wider">
            <span>Legal & Data Security</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Privacy Policy & Terms
          </h1>
          <p className="text-base text-neutral-400 leading-relaxed">
            How Ethiopian Arduino Hub (EAH) collects, protects, processes, and retains applicant and student information.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div 
                key={idx} 
                className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 hover:border-neutral-700 transition"
              >
                <div className="h-10 w-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">{sec.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {sec.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Terms Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h3 className="font-display text-xl font-bold text-white">Program Terms</h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Submitting an application does not guarantee acceptance into an Ethiopian Arduino Hub cohort. Admission is subject to available laboratory capacity, safety guidelines, and application assessment. Providing false or misleading information may result in immediate rejection or dismissal from any active program.
          </p>
          <div className="pt-2 text-xs text-neutral-500">
            Last updated: October 2026. For questions regarding your personal data, contact <a href="mailto:info@ethiopianarduinohub.org" className="text-emerald-400 hover:underline">info@ethiopianarduinohub.org</a>.
          </div>
        </div>

      </div>
    </div>
  );
};
