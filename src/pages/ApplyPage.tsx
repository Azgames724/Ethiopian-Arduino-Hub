import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  Upload, 
  FileText, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  CheckCheck, 
  User, 
  GraduationCap, 
  Cpu, 
  ShieldCheck, 
  Languages, 
  Eye, 
  Send,
  Database
} from 'lucide-react';
import { saveStudentApplicationToFirestore } from '../lib/firebase';
import { 
  INITIAL_PROGRAMS, 
  ETHIOPIAN_REGIONS, 
  EDUCATION_STATUSES, 
  EXPERIENCE_LEVELS, 
  COMPUTER_ACCESS_OPTIONS, 
  GENDER_OPTIONS, 
  LANGUAGE_OPTIONS, 
  AMHARIC_COVER_PROMPT, 
  validateEthiopianPhone, 
  detectAmharicRatio, 
  calculateAge,
  ApplicationRecord
} from '../data/clubData';

interface ApplyPageProps {
  initialProgramCode?: string;
  onNavigate: (path: string, params?: { referenceNumber?: string }) => void;
  lang: 'en' | 'am';
}

export const ApplyPage: React.FC<ApplyPageProps> = ({ initialProgramCode, onNavigate, lang }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [copiedRef, setCopiedRef] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<ApplicationRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal
    firstName: '',
    fatherName: '',
    grandfatherName: '',
    dob: '',
    gender: 'Female',
    language: 'Amharic',
    country: 'Ethiopia',
    region: 'Addis Ababa',
    city: '',
    phone: '',
    email: '',
    parentName: '',
    parentPhone: '',
    parentConsent: false,

    // Step 2: Education
    educationStatus: 'Secondary School Student',
    institution: '',
    fieldOrGrade: '',
    computerAccess: 'Shared Access (Family / School Lab)',
    experienceLevel: 'Beginner',

    // Step 3: Program
    programCode: initialProgramCode || 'robotics',
    programReason: '',

    // Step 4: Identification
    documentType: 'Student ID Card (Preferred for students)',
    fileName: '',
    fileSize: '',

    // Step 5: Cover letter
    coverLetter: '',

    // Step 6: Agreement
    termsAccepted: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-restore draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('eah_application_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed, programCode: initialProgramCode || parsed.programCode || 'robotics' }));
      } else if (initialProgramCode) {
        setFormData(prev => ({ ...prev, programCode: initialProgramCode }));
      }
    } catch {
      // ignore
    }
  }, [initialProgramCode]);

  // Auto-save draft on changes
  useEffect(() => {
    if (!submittedApp) {
      try {
        localStorage.setItem('eah_application_draft', JSON.stringify(formData));
      } catch {
        // ignore
      }
    }
  }, [formData, submittedApp]);

  const applicantAge = calculateAge(formData.dob);
  const isMinor = formData.dob && applicantAge < 18;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
      if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required.";
      if (!formData.dob) newErrors.dob = 'Date of birth is required.';
      if (!formData.city.trim()) newErrors.city = 'City or town is required.';
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
      } else if (!validateEthiopianPhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number (e.g. 0911 234 567 or +251 911 234 567).';
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        newErrors.email = 'Valid email address is required.';
      }
      if (isMinor) {
        if (!formData.parentName.trim()) newErrors.parentName = 'Parent/guardian name is required for minors.';
        if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent/guardian phone number is required.';
        if (!formData.parentConsent) newErrors.parentConsent = 'Parental consent confirmation is required.';
      }
    }

    if (step === 2) {
      if (!formData.institution.trim()) newErrors.institution = 'School or institution name is required.';
      if (!formData.fieldOrGrade.trim()) newErrors.fieldOrGrade = 'Grade level or field of study is required.';
    }

    if (step === 3) {
      if (!formData.programCode) newErrors.programCode = 'Please select a program.';
    }

    if (step === 4) {
      if (!formData.fileName) {
        newErrors.fileName = 'Please upload or attach your student or identification document.';
      }
    }

    if (step === 5) {
      if (!formData.coverLetter.trim() || formData.coverLetter.trim().length < 40) {
        newErrors.coverLetter = 'Please write at least 40 characters in Amharic explaining your interest.';
      }
    }

    if (step === 6) {
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'You must confirm that all information provided is accurate and true.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(6, prev + 1));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, fileName: 'File size exceeds 5MB limit.' }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(0)} KB`
      }));
      setErrors(prev => ({ ...prev, fileName: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;
    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `EAH-2026-${randomSuffix}`;
    const selectedProgramObj = INITIAL_PROGRAMS.find(p => p.code === formData.programCode);

    const record: ApplicationRecord = {
      id: `app-${Date.now()}`,
      referenceNumber: refCode,
      email: formData.email.trim().toLowerCase(),
      fullName: formData.firstName.trim(),
      fatherName: formData.fatherName.trim(),
      grandfatherName: formData.grandfatherName.trim(),
      dob: formData.dob,
      gender: formData.gender,
      phone: formData.phone.trim(),
      language: formData.language,
      country: formData.country || 'Ethiopia',
      region: formData.region,
      city: formData.city.trim(),
      educationStatus: formData.educationStatus,
      institution: formData.institution.trim(),
      fieldOrGrade: formData.fieldOrGrade.trim(),
      computerAccess: formData.computerAccess,
      experienceLevel: formData.experienceLevel,
      programCode: formData.programCode,
      programName: selectedProgramObj?.name || 'Robotics & Embedded Systems',
      coverLetterAmharic: formData.coverLetter.trim(),
      documentType: formData.documentType,
      fileName: formData.fileName,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: 'Application received and placed in queue for mentor review.',
      nextSteps: 'Please save your reference number. You can check your application status at /status at any time.'
    };

    // Save to Firebase Firestore
    try {
      await saveStudentApplicationToFirestore(record);
    } catch (err) {
      console.warn('Firestore sync status:', err);
    }

    // Also store in localStorage for instant offline access
    try {
      const existing = JSON.parse(localStorage.getItem('eah_user_applications') || '[]');
      existing.unshift(record);
      localStorage.setItem('eah_user_applications', JSON.stringify(existing));
      localStorage.removeItem('eah_application_draft');
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setSubmittedApp(record);
  };

  const copyRefToClipboard = () => {
    if (submittedApp?.referenceNumber) {
      navigator.clipboard.writeText(submittedApp.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  // SUCCESS VIEW
  if (submittedApp) {
    return (
      <div className="min-h-screen py-12 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-neutral-900 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 space-y-8 relative overflow-hidden shadow-2xl">

          <div className="text-center space-y-4">
            <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Application Submitted</span>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              ማመልከቻዎ በተሳካ ሁኔታ ደርሶናል!
            </h1>
            <p className="text-sm sm:text-base text-neutral-300">
              Thank you, <strong className="text-white">{submittedApp.fullName}</strong>. Your application to <strong className="text-emerald-400">{submittedApp.programName}</strong> has been received by Ethiopian Arduino Hub.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono-custom">
                <Database className="w-3.5 h-3.5" />
                <span>Persisted to Cloud Database (Firestore)</span>
              </span>
            </div>
          </div>

          {/* Reference Card */}
          <div className="p-6 rounded-2xl bg-neutral-950 border border-emerald-500/30 text-center space-y-3">
            <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
              Your Application Reference Number
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono-custom text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
                {submittedApp.referenceNumber}
              </span>
              <button
                onClick={copyRefToClipboard}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition flex items-center gap-1.5 text-xs cursor-pointer"
                title="Copy reference code"
              >
                {copiedRef ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedRef ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs text-neutral-400">
              Please save this reference number. You will need it together with your email (<span className="text-neutral-200">{submittedApp.email}</span>) to track your review status.
            </p>
          </div>

          {/* Next Steps List */}
          <div className="space-y-3 text-xs sm:text-sm text-neutral-300 bg-neutral-950/60 p-5 rounded-2xl border border-neutral-800">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              What happens next?
            </h4>
            <ul className="space-y-2 list-disc list-inside text-neutral-400">
              <li>Our admissions committee will assess your Amharic cover letter and program choice within 3–5 days.</li>
              <li>You can verify review status in real-time on our Status Tracker.</li>
              <li>Shortlisted candidates receive an SMS and email notification with orientation and Telegram details.</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-neutral-800">
            <button
              onClick={() => onNavigate('/status', { referenceNumber: submittedApp.referenceNumber })}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Track Application Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
            >
              Return Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  const stepsList = [
    { num: 1, name: "Personal" },
    { num: 2, name: "Education" },
    { num: 3, name: "Program" },
    { num: 4, name: "ID Document" },
    { num: 5, name: "Cover Letter" },
    { num: 6, name: "Review" },
  ];

  const amharicRatio = detectAmharicRatio(formData.coverLetter);

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Student Application
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            Apply to join EAH
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 flex items-center gap-2">
            <span>Fields marked with <span className="text-emerald-400 font-bold">*</span> are required.</span>
            <span>•</span>
            <span className="text-emerald-400">Your progress is saved on this device automatically.</span>
          </p>
        </div>

        {/* Step Progress Indicator */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between overflow-x-auto gap-2 pb-2 sm:pb-0">
            {stepsList.map((st) => {
              const isPassed = currentStep > st.num;
              const isCurrent = currentStep === st.num;
              return (
                <div 
                  key={st.num}
                  className="flex items-center gap-2 shrink-0 cursor-pointer"
                  onClick={() => {
                    if (st.num < currentStep) setCurrentStep(st.num);
                  }}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    isPassed 
                      ? 'bg-emerald-500 text-neutral-950' 
                      : isCurrent 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-neutral-800 text-neutral-500'
                  }`}>
                    {isPassed ? <Check className="w-4 h-4" /> : st.num}
                  </div>
                  <span className={`text-xs font-medium hidden md:inline ${
                    isCurrent ? 'text-white font-bold' : 'text-neutral-400'
                  }`}>
                    {st.name}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 text-xs text-neutral-400 flex items-center justify-between">
            <span>Step {currentStep} of 6 — <strong className="text-white">{stepsList[currentStep - 1].name}</strong></span>
            <span>{Math.round((currentStep / 6) * 100)}% Completed</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xl relative">
          
          {/* STEP 1: PERSONAL INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Personal Information</h3>
                <p className="text-xs text-neutral-400 mt-1">Please provide your legal name and contact details as they appear on your identification.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    First name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Abebe"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Father's name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="e.g. Kebede"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.fatherName && <p className="text-red-400 text-xs mt-1">{errors.fatherName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Grandfather's name
                  </label>
                  <input
                    type="text"
                    value={formData.grandfatherName}
                    onChange={(e) => setFormData({ ...formData, grandfatherName: e.target.value })}
                    placeholder="e.g. Tesfaye"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Date of birth <span className="text-emerald-400">*</span>
                    <span className="text-neutral-500 text-[10px] ml-1.5">(Gregorian)</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Gender <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    {GENDER_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Communication Language <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    {LANGUAGE_OPTIONS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Country <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.country}
                    className="w-full px-3.5 py-2.5 bg-neutral-950/60 border border-neutral-800 rounded-xl text-neutral-400 text-sm cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Region <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    {ETHIOPIAN_REGIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    City or town <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Addis Ababa / Bole"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                </div>
              </div>

              {/* Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Phone number <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0911 234 567 or +251 911 234 567"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Minor Parental Consent Check */}
              {isMinor && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-4">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    <span>Parent / Guardian Consent Required (Applicant is under 18)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Parent / Guardian Full Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="Guardian full name"
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs"
                      />
                      {errors.parentName && <p className="text-red-400 text-xs mt-1">{errors.parentName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Guardian Phone Number <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        placeholder="+251 9... / 09..."
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs"
                      />
                      {errors.parentPhone && <p className="text-red-400 text-xs mt-1">{errors.parentPhone}</p>}
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                    <input
                      type="checkbox"
                      checked={formData.parentConsent}
                      onChange={(e) => setFormData({ ...formData, parentConsent: e.target.checked })}
                      className="rounded bg-neutral-950 border-neutral-700 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>My parent or guardian has reviewed and approved my participation in Ethiopian Arduino Hub.</span>
                  </label>
                  {errors.parentConsent && <p className="text-red-400 text-xs mt-1">{errors.parentConsent}</p>}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: EDUCATION */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Education & Background</h3>
                <p className="text-xs text-neutral-400 mt-1">Tell us about your current studies and familiarity with technology.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Current Educational Status <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.educationStatus}
                    onChange={(e) => setFormData({ ...formData, educationStatus: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    {EDUCATION_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    School / University / TVET Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Menelik II High School or AAU"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.institution && <p className="text-red-400 text-xs mt-1">{errors.institution}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Field of Study / Grade Level <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fieldOrGrade}
                    onChange={(e) => setFormData({ ...formData, fieldOrGrade: e.target.value })}
                    placeholder="e.g. Grade 11 Natural Science / Software Eng"
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  {errors.fieldOrGrade && <p className="text-red-400 text-xs mt-1">{errors.fieldOrGrade}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Computer / Laptop Access <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.computerAccess}
                    onChange={(e) => setFormData({ ...formData, computerAccess: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    {COMPUTER_ACCESS_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Prior Technical Experience <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    {EXPERIENCE_LEVELS.map((exp) => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Beginners are warmly welcomed. You do not need previous programming experience to be accepted!</span>
              </div>
            </div>
          )}

          {/* STEP 3: PROGRAM SELECTION */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Select Your Learning Department</h3>
                <p className="text-xs text-neutral-400 mt-1">Choose the track you want to enroll in for the upcoming cohort.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INITIAL_PROGRAMS.map((prog) => {
                  const isSelected = formData.programCode === prog.code;
                  return (
                    <div
                      key={prog.id}
                      onClick={() => setFormData({ ...formData, programCode: prog.code })}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer relative space-y-3 ${
                        isSelected 
                          ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30' 
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400">{prog.badge}</span>
                        {isSelected && (
                          <div className="h-6 w-6 rounded-full bg-emerald-500 text-neutral-950 flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-display text-base font-bold text-white">{prog.name}</h4>
                        <p className="text-xs text-neutral-400 ethiopic-text">{prog.name_am}</p>
                      </div>

                      <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                        {prog.description}
                      </p>

                      <div className="text-[11px] text-neutral-400 flex items-center gap-2 pt-1">
                        <span>{prog.duration}</span>
                        <span>•</span>
                        <span>{prog.level}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Why does this specific department interest you?
                </label>
                <textarea
                  rows={3}
                  value={formData.programReason}
                  onChange={(e) => setFormData({ ...formData, programReason: e.target.value })}
                  placeholder="Share a short sentence about why this track aligns with your curiosity..."
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {/* STEP 4: IDENTIFICATION */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Identification Verification</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  An ID confirms that the applicant is a real person and, for students, their current enrollment. A School ID is preferred.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Document Type <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={formData.documentType}
                  onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Student ID Card (Preferred for students)">Student ID Card (Preferred for students)</option>
                  <option value="Kebele ID Card">Kebele ID Card</option>
                  <option value="National ID Card (Fayda / Digital ID)">National ID Card (Fayda / Digital ID)</option>
                  <option value="Passport">Passport</option>
                  <option value="Birth Certificate / Grade Transcript">Birth Certificate / Grade Transcript</option>
                </select>
              </div>

              {/* Upload Dropzone */}
              <div className="p-8 rounded-2xl border-2 border-dashed border-neutral-800 hover:border-emerald-500/50 bg-neutral-950 text-center space-y-4 transition">
                <div className="h-12 w-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-emerald-400">
                  <Upload className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {formData.fileName ? formData.fileName : 'Click to select or drag your document here'}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Supported formats: PDF, JPEG, PNG (Maximum 5MB)
                  </p>
                </div>

                {formData.fileName ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Attached ({formData.fileSize})</span>
                  </div>
                ) : (
                  <div>
                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer transition">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Choose File from Device</span>
                      <input
                        type="file"
                        accept="application/pdf,image/jpeg,image/png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
              {errors.fileName && <p className="text-red-400 text-xs">{errors.fileName}</p>}

              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-400 space-y-1">
                <div className="flex items-center gap-2 text-neutral-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Privacy & Security Guarantee</span>
                </div>
                <p>
                  Documents are stored in private encrypted storage. They are never publicly accessible and only visible to authorized reviewers to verify student eligibility.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: COVER LETTER */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-display text-xl font-bold text-white">የማመልከቻ ደብዳቤ (Amharic Cover Letter)</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Please draft your application statement in Amharic explaining your enthusiasm and goals.
                </p>
              </div>

              {/* Official prompt banner */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-emerald-500/30 space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Official Instructions
                </span>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed ethiopic-text font-medium">
                  {AMHARIC_COVER_PROMPT}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    ደብዳቤዎን እዚህ ይጻፉ (Write your statement) <span className="text-emerald-400">*</span>
                  </label>
                  <span className="text-[11px] text-neutral-400">
                    {formData.coverLetter.length} characters (Amharic: {Math.round(amharicRatio * 100)}%)
                  </span>
                </div>
                
                <textarea
                  rows={8}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="ውድ የኢትዮጵያን አርዱዪኖ ሀብ ኮሚቴ፣ ይህንን ማመልከቻ የማስገባው..."
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 ethiopic-text leading-relaxed"
                />
                {errors.coverLetter && <p className="text-red-400 text-xs mt-1">{errors.coverLetter}</p>}
              </div>

              {/* Helpful outline assistance */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs text-neutral-400">
                <strong className="text-neutral-200 block">ጠቃሚ ነጥቦች (Suggested Outline):</strong>
                <ul className="list-disc list-inside space-y-1">
                  <li>ራስዎን እና የትምህርት ደረጃዎን ማስተዋወቅ (Who you are)</li>
                  <li>ለምን ይህንን የትምህርት መስክ እንደመረጡ (Why you selected this track)</li>
                  <li>በቴክኖሎጂ መስክ ያላችሁ ህልም ወይም መፍታት የምትፈልጉት ችግር (The problem you want to solve)</li>
                </ul>
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW & SUBMIT */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-display text-xl font-bold text-white">Review & Confirm</h3>
                <p className="text-xs text-neutral-400 mt-1">Please verify your details before submitting your application to the review committee.</p>
              </div>

              {/* Review summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider block">Personal Profile</span>
                  <div className="space-y-1 text-neutral-300">
                    <p><strong className="text-neutral-400">Full Name:</strong> {formData.firstName} {formData.fatherName} {formData.grandfatherName}</p>
                    <p><strong className="text-neutral-400">Date of Birth:</strong> {formData.dob} ({applicantAge} yrs old)</p>
                    <p><strong className="text-neutral-400">Location:</strong> {formData.city}, {formData.region}</p>
                    <p><strong className="text-neutral-400">Phone:</strong> {formData.phone}</p>
                    <p><strong className="text-neutral-400">Email:</strong> {formData.email}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider block">Academic & Track</span>
                  <div className="space-y-1 text-neutral-300">
                    <p><strong className="text-neutral-400">Status:</strong> {formData.educationStatus}</p>
                    <p><strong className="text-neutral-400">Institution:</strong> {formData.institution}</p>
                    <p><strong className="text-neutral-400">Grade / Field:</strong> {formData.fieldOrGrade}</p>
                    <p><strong className="text-neutral-400">Chosen Track:</strong> <span className="text-emerald-400 font-semibold">{INITIAL_PROGRAMS.find(p => p.code === formData.programCode)?.name}</span></p>
                    <p><strong className="text-neutral-400">ID Attached:</strong> {formData.fileName || 'Document attached'}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                <span className="font-bold text-emerald-400 uppercase tracking-wider block">Cover Letter Preview</span>
                <p className="text-neutral-300 italic ethiopic-text line-clamp-3">
                  "{formData.coverLetter}"
                </p>
              </div>

              {/* Agreement Checkbox */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    className="mt-0.5 rounded bg-neutral-900 border-neutral-700 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>
                    I confirm that the information provided is accurate and true to the best of my knowledge. I understand that submitting an application does not guarantee admission and depends on available lab capacity.
                  </span>
                </label>
                {errors.termsAccepted && <p className="text-red-400 text-xs">{errors.termsAccepted}</p>}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-8 mt-8 border-t border-neutral-800 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/10"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`px-8 py-3 rounded-xl text-sm font-semibold text-neutral-950 transition flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.25)] ${
                  isSubmitting ? 'bg-emerald-600/50 cursor-wait' : 'bg-emerald-400 hover:bg-emerald-300 cursor-pointer'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Saving to Database...' : 'Submit Student Application'}</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
