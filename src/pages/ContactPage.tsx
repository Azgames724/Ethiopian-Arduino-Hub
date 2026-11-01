import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Building 
} from 'lucide-react';
import { SITE_SETTINGS } from '../data/clubData';

interface ContactPageProps {
  lang: 'en' | 'am';
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Application Status Question',
    referenceNumber: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold">
            <Mail className="w-4 h-4" />
            <span>Contact EAH</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            We'd love to hear from you
          </h1>

          <p className="text-base text-neutral-300">
            For application questions, please include your reference number. Our team responds promptly.
          </p>
        </div>

        {/* Telegram Priority Callout */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-neutral-900 to-teal-950 border border-emerald-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">

          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Send className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Direct Chat</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                Message us on Telegram
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                Fastest way to reach the team — ask about programs, requirements, or your application.
              </p>
            </div>
          </div>

          <a
            href={`https://t.me/${SITE_SETTINGS.contact_telegram}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-400 hover:bg-emerald-300 text-neutral-950 transition flex items-center gap-2 shrink-0 shadow-lg cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Text us on Telegram (@{SITE_SETTINGS.contact_telegram})</span>
          </a>
        </div>

        {/* Contact Info & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Info cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 hover:border-neutral-700 transition">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-950 text-emerald-400 border border-neutral-800">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Email</h4>
                  <p className="text-base font-bold text-white mt-0.5">
                    <a href={`mailto:${SITE_SETTINGS.contact_email}`} className="hover:text-emerald-400 transition">
                      {SITE_SETTINGS.contact_email}
                    </a>
                  </p>
                </div>
              </div>
              <p className="text-xs text-neutral-400 pt-1">
                For official correspondence, partnerships, and documentation.
              </p>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 hover:border-neutral-700 transition">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-950 text-emerald-400 border border-neutral-800">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Phone Lines</h4>
                  <div className="text-sm font-bold text-white mt-0.5 space-y-0.5">
                    <p>+251 92 243 5966</p>
                    <p>+251 90 053 7291</p>
                    <p>+251 99 853 3834</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-neutral-400 pt-1">
                Available Monday – Saturday, 8:30 AM – 6:00 PM (EAT).
              </p>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 hover:border-neutral-700 transition">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-950 text-emerald-400 border border-neutral-800">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Location</h4>
                  <p className="text-base font-bold text-white mt-0.5">
                    {SITE_SETTINGS.contact_location}
                  </p>
                </div>
              </div>
              <p className="text-xs text-neutral-400 pt-1">
                Laboratories and workshops conducted in Addis Ababa, Ethiopia.
              </p>
            </div>

          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Send an inquiry</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Fill out this form and an EAH mentor will get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-neutral-950 border border-emerald-500/40 text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white">መልእክትዎ ደርሶናል! (Message Sent)</h4>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. We have received your inquiry and will follow up with you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', category: 'Application Status Question', referenceNumber: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 text-neutral-300 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Your Full Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Dawit Haile"
                        className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Email Address <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Phone or Telegram Username
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+251 9... or @username"
                        className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Application Status Question">Application Status Question</option>
                        <option value="Program & Curriculum Inquiry">Program & Curriculum Inquiry</option>
                        <option value="Hardware Kits & Lab Access">Hardware Kits & Lab Access</option>
                        <option value="Partnership / Sponsorship">Partnership / School Collaboration</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Application Reference Number <span className="text-neutral-500 text-[10px]">(If already applied)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.referenceNumber}
                      onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                      placeholder="e.g. EAH-2026-7842"
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 font-mono-custom uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Your Message <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we assist you?"
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to EAH</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
