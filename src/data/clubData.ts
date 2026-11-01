export interface Program {
  id: string;
  code: string;
  name: string;
  name_am: string;
  description: string;
  topics: string[];
  outcomes: string[];
  prerequisites: string;
  iconName: 'code' | 'cpu' | 'rocket' | 'flask-conical';
  badge: string;
  duration: string;
  level: string;
  equipment: string[];
  accepting: boolean;
  active: boolean;
  sort_order: number;
}

export interface SiteSettings {
  hero_title: string;
  hero_highlight: string;
  hero_amharic: string;
  hero_text: string;
  contact_email: string;
  contact_phone: string;
  contact_telegram: string;
  contact_location: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  published: boolean;
}

export interface ApplicationRecord {
  id: string;
  referenceNumber: string;
  email: string;
  fullName: string;
  fatherName: string;
  grandfatherName?: string;
  dob: string;
  gender: string;
  phone: string;
  language: string;
  country?: string;
  region: string;
  city: string;
  educationStatus: string;
  institution: string;
  fieldOrGrade: string;
  computerAccess: string;
  experienceLevel: string;
  programCode: string;
  programName: string;
  coverLetterAmharic: string;
  documentType: string;
  fileName?: string;
  status: 'submitted' | 'under_review' | 'info_required' | 'accepted' | 'waitlisted' | 'rejected' | 'enrolled';
  submittedAt: string;
  updatedAt: string;
  notes?: string;
  cohort?: string;
  nextSteps?: string;
}

export const SITE_SETTINGS: SiteSettings = {
  hero_title: "Build the future",
  hero_highlight: "with your own hands.",
  hero_amharic: "ወጣቶችን በተግባራዊ ቴክኖሎጂ ክህሎት እናበቃለን።",
  hero_text: "EAH is a learning community helping young Ethiopians gain practical skills in web development, robotics and artificial intelligence — no previous experience needed.",
  contact_email: "info@ethiopianarduinohub.org",
  contact_phone: "+251 92 243 5966 | +251 90 053 7291 | +251 99 853 3834",
  contact_telegram: "BLACKBOY_2427",
  contact_location: "Addis Ababa, Ethiopia"
};

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: "78b41bdd-238d-4a14-af6c-06b36c079e4a",
    code: "web",
    name: "Web Development",
    name_am: "የድር ልማት",
    description: "Build real websites and web apps from the ground up — from your first HTML page to a working full-stack project.",
    topics: [
      "HTML & Semantic Structure",
      "CSS & Responsive Layouts",
      "Modern JavaScript & DOM",
      "Responsive Web Design",
      "Frontend Frameworks",
      "Backend Development Fundamentals & APIs"
    ],
    outcomes: [
      "Build and publish responsive websites",
      "Write interactive JavaScript programs",
      "Understand how frontends communicate with servers",
      "Ship a complete portfolio project to share with employers"
    ],
    prerequisites: "No prior coding experience required. Basic familiarity with using a computer and browsing the web is helpful.",
    iconName: "code",
    badge: "Most Popular",
    duration: "12 Weeks",
    level: "Beginner to Intermediate",
    equipment: ["Laptops/PC access provided during lab hours", "VS Code environment", "Cloud hosting access"],
    accepting: true,
    active: true,
    sort_order: 1
  },
  {
    id: "a67bb2a4-7738-4994-ad79-6b0be1dff659",
    code: "robotics",
    name: "Robotics & Embedded Systems",
    name_am: "ሮቦቲክስ እና ኢምቤድድ ሲስተምስ",
    description: "Learn electronics and Arduino by building circuits, sensors, and robots that interact with the physical world.",
    topics: [
      "Arduino Microcontroller Programming",
      "Electronics Fundamentals & Circuit Law",
      "Sensors (Ultrasonic, Temp, IR, Motion)",
      "Actuators & DC/Servo Motors",
      "Autonomous Line Tracking & Obstacle Avoidance",
      "Practical Embedded Systems Projects for Ethiopian Agriculture & Industry"
    ],
    outcomes: [
      "Read and build schematic circuits safely",
      "Program Arduino microcontrollers in C/C++",
      "Integrate diverse physical sensors and motors",
      "Design and present a working autonomous robot project"
    ],
    prerequisites: "No prior experience required. Curiosity about how physical hardware and electronics work is essential.",
    iconName: "cpu",
    badge: "Core Track",
    duration: "14 Weeks",
    level: "Beginner Friendly",
    equipment: ["EAH Arduino Starter Kit", "Breadboards, resistors, LEDs", "Ultrasonic sensors & motor drivers"],
    accepting: true,
    active: true,
    sort_order: 2
  },
  {
    id: "5d374a50-4b5b-4f9b-a67c-216db7d75bf8",
    code: "airspace",
    name: "Space Science",
    name_am: "ስፔስ ሳይንስ",
    description: "Explore the universe through astronomy, space technology, satellite systems, and scientific research. This department introduces students to the mysteries of space, planetary science, rocket technology, and satellite communication while encouraging scientific curiosity, innovation, and hands-on projects.",
    topics: [
      "Astronomy and Space Exploration",
      "Planetary Science & Solar System",
      "Satellite Technology & CubeSats",
      "Rocket Science Fundamentals & Aerodynamics",
      "Space Robotics & Telemetry",
      "Satellite Communication & Ground Stations",
      "Earth Observation & Remote Sensing",
      "Space Research and Innovation"
    ],
    outcomes: [
      "Understand the solar system and celestial dynamics",
      "Explore the fundamentals of modern space science",
      "Learn how satellites operate and transmit telemetry",
      "Understand basic rocket and spacecraft principles",
      "Explore robotics applications in extreme planetary conditions",
      "Develop scientific research and problem-solving skills",
      "Design space-related STEM projects for Ethiopian innovation"
    ],
    prerequisites: "Open to secondary school and university students with curiosity in physics, astronomy, and aerospace.",
    iconName: "rocket",
    badge: "Cutting Edge",
    duration: "10 Weeks",
    level: "All Levels Welcome",
    equipment: ["Telescopes & optics kits", "CanSat / CubeSat simulator hardware", "Satellite telemetry software"],
    accepting: true,
    active: true,
    sort_order: 3
  },
  {
    id: "892cfc5b-cab9-411e-abf0-86f62b0f01e1",
    code: "chem",
    name: "Chemical Factory & Science Lab",
    name_am: "ኬሚካል ፋክትሪይ",
    description: "Discover the science behind chemical reactions, materials, and industrial processes. This department introduces students to chemistry fundamentals, laboratory science, environmental chemistry, and chemical engineering concepts. Students will explore how chemistry is applied in manufacturing, agriculture, pharmaceuticals, and sustainable industrial development through safe, practical, and project-based learning.",
    topics: [
      "Fundamentals of Chemistry & Molecular Bonds",
      "Chemical Reactions & Stoichiometry",
      "Laboratory Science, Safety & Proper Equipment",
      "Organic and Inorganic Chemistry Basics",
      "Industrial Chemistry & Manufacturing Pathways",
      "Materials Science & Polymers",
      "Environmental Chemistry & Water Quality Analysis",
      "Chemical Engineering Fundamentals",
      "Green Chemistry and Sustainability for Local Agriculture"
    ],
    outcomes: [
      "Understand atoms, molecules, and chemical reactions",
      "Learn basic laboratory techniques and safety procedures",
      "Explore the chemistry of everyday materials and fertilizers",
      "Understand chemical processes used in modern industries",
      "Study water quality testing and environmental solutions",
      "Explore polymers and sustainable recycling materials",
      "Develop rigorous scientific observation and lab notebook skills",
      "Complete safe, supervised practical chemistry experiments"
    ],
    prerequisites: "Enthusiasm for science, materials, and hands-on experiments. Safety orientation is conducted on Day 1.",
    iconName: "flask-conical",
    badge: "Applied Science",
    duration: "10 Weeks",
    level: "Beginner to Intermediate",
    equipment: ["Laboratory glassware & testing reagents", "Digital pH meters & water testing sensors", "Safety goggles, lab coats, and PPE"],
    accepting: true,
    active: true,
    sort_order: 4
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "774ced9b-e913-45ef-a396-348b9c208611",
    title: "Official Notice: Qualification Results & Orientation Schedule",
    body: `We are pleased to announce that applicants who successfully completed the evaluation phase have officially qualified for admission into the Ethiopian Arduino Hub Science and Technology programs.

Your dedication, problem-solving mindset, and demonstrated curiosity have earned you placement in our hands-on laboratory cohorts.

Qualified students will commence practical coursework across our four departments:
• Department of Web Technologies & Software Systems
• Department of Robotics & Microcontroller Hardware
• Department of Space Science & Satellite Engineering
• Department of Applied Chemistry & Materials

Notice to Admitted Students: All qualified candidates must verify their placement using the Application Status portal and confirm their registration via the official communication channel. Detailed schedules regarding technical orientation and lab workstation assignments have been issued.

Ethiopian Arduino Hub (EAH)
Science, Engineering & Applied Innovation`,
    date: "November 1, 2026",
    published: true
  }
];

export const ETHIOPIAN_REGIONS = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Central Ethiopia",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "South Ethiopia",
  "South West Ethiopia Peoples",
  "Tigray"
];

export const EDUCATION_STATUSES = [
  "Secondary School Student",
  "TVET Student",
  "University Student",
  "Graduate",
  "Other"
];

export const EXPERIENCE_LEVELS = [
  "Beginner",
  "Some Experience",
  "Experienced"
];

export const COMPUTER_ACCESS_OPTIONS = [
  "Yes (Own Laptop/PC)",
  "No (Need Lab Access)",
  "Shared Access (Family / School Lab)"
];

export const GENDER_OPTIONS = [
  "Female",
  "Male",
  "Prefer not to say"
];

export const LANGUAGE_OPTIONS = [
  "Amharic",
  "English",
  "Afaan Oromo",
  "Tigrinya",
  "Other"
];

export const STATUS_LABELS: Record<string, { label: string; color: string; desc: string }> = {
  submitted: {
    label: "Submitted",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    desc: "Your application has been received and queued for committee review."
  },
  under_review: {
    label: "Under Review",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    desc: "Our admissions committee and department leads are evaluating your application."
  },
  info_required: {
    label: "Additional Information Required",
    color: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    desc: "Please review the notes and provide required verification documentation."
  },
  accepted: {
    label: "Admitted / Qualified",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    desc: "Congratulations. You have been officially admitted to the upcoming cohort."
  },
  waitlisted: {
    label: "Waitlisted",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    desc: "You are on the priority waitlist for the upcoming cohort."
  },
  enrolled: {
    label: "Enrolled & Active",
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    desc: "Student is currently enrolled and active in scheduled laboratory coursework."
  },
  rejected: {
    label: "Not Selected",
    color: "bg-neutral-800 text-neutral-400 border-neutral-700",
    desc: "Application cycle completed. We encourage you to reapply for subsequent sessions."
  }
};

export const DEMO_APPLICATIONS: ApplicationRecord[] = [
  {
    id: "demo-1",
    referenceNumber: "EAH-2026-7842",
    email: "yared.t@gmail.com",
    fullName: "Yared",
    fatherName: "Tadesse",
    grandfatherName: "Bekele",
    dob: "2006-04-15",
    gender: "Male",
    phone: "+251911234567",
    language: "Amharic",
    region: "Addis Ababa",
    city: "Bole, Addis Ababa",
    educationStatus: "Secondary School Student",
    institution: "Menelik II High School",
    fieldOrGrade: "Grade 11 - Natural Science",
    computerAccess: "Shared Access (Family / School Lab)",
    experienceLevel: "Beginner",
    programCode: "robotics",
    programName: "Robotics & Embedded Systems",
    coverLetterAmharic: "ውድ የኢትዮጵያን አርዱዪኖ ሀብ ኮሚቴ፣ የሮቦቲክስ እና ኤሌክትሮኒክስ ትምህርትን ለመማር ከፍተኛ ጉጉት አለኝ። በሀገራችን ለእርሻ ስራ እና ለፋብሪካዎች የሚጠቅሙ አውቶሜትድ መሳሪያዎችን የመስራት ህልም አለኝ። እድሉን ብታገኙኝ በትጋት እማራለሁ።",
    documentType: "Student ID Card",
    status: "accepted",
    submittedAt: "2026-10-24T10:15:00Z",
    updatedAt: "2026-11-01T12:00:00Z",
    cohort: "Cohort 2026-B (Starting Nov 15)",
    notes: "Outstanding motivation and clear interest in practical hardware applications. Welcome to EAH Robotics!",
    nextSteps: "Join the official Telegram cohort group via @BLACKBOY_2427. Bring your Student ID to orientation."
  },
  {
    id: "demo-2",
    referenceNumber: "EAH-2026-3190",
    email: "selamawit.k@gmail.com",
    fullName: "Selamawit",
    fatherName: "Kassahun",
    grandfatherName: "Mulugeta",
    dob: "2005-09-20",
    gender: "Female",
    phone: "+251922435966",
    language: "Amharic",
    region: "Addis Ababa",
    city: "Arada, Addis Ababa",
    educationStatus: "University Student",
    institution: "Addis Ababa Science & Technology University (AASTU)",
    fieldOrGrade: "Software Engineering - 2nd Year",
    computerAccess: "Yes (Own Laptop/PC)",
    experienceLevel: "Some Experience",
    programCode: "web",
    programName: "Web Development",
    coverLetterAmharic: "ሰላም፣ በድረ-ገጽ ልማት እና ፉል-ስታክ ዌብ ቴክኖሎጂዎች ላይ ክህሎቴን ማሳደግ እፈልጋለሁ። የተጠቃሚዎችን ችግር የሚፈቱ ዲጂታል ሲስተሞችን የመገንባት ፍላጎት አለኝ።",
    documentType: "University ID",
    status: "under_review",
    submittedAt: "2026-10-29T14:30:00Z",
    updatedAt: "2026-10-30T09:20:00Z",
    notes: "Application under assessment by Web Development department leads.",
    nextSteps: "Review stage 2 in progress. You will receive an SMS and email notification upon final decision."
  },
  {
    id: "demo-3",
    referenceNumber: "EAH-2026-9041",
    email: "amanuel.g@gmail.com",
    fullName: "Amanuel",
    fatherName: "Girma",
    grandfatherName: "Worku",
    dob: "2004-12-05",
    gender: "Male",
    phone: "+251900537291",
    language: "Amharic",
    region: "Oromia",
    city: "Bishoftu",
    educationStatus: "TVET Student",
    institution: "Bishoftu Polytechnic College",
    fieldOrGrade: "Electronics & Electrical Tech",
    computerAccess: "Yes (Own Laptop/PC)",
    experienceLevel: "Some Experience",
    programCode: "airspace",
    programName: "Space Science",
    coverLetterAmharic: "የስፔስ ሳይንስ፣ የሳተላይት ኮሙዩኒኬሽን እና ሮኬት ቴክኖሎጂ እጅግ የሚስበኝ መስክ ነው። በሀገራችን ስፔስ ኢኒሼቲቭ ውስጥ አስተዋጽኦ የማድረግ ትልቅ አላማ አለኝ።",
    documentType: "National ID / Kebele ID",
    status: "accepted",
    submittedAt: "2026-10-25T11:00:00Z",
    updatedAt: "2026-11-01T12:10:00Z",
    cohort: "Cohort 2026-B Space Science",
    notes: "Strong background in basic electrical theory. Qualified for Space Science track.",
    nextSteps: "Prepare for online and hands-on laboratory orientation on Sunday, Nov 15."
  }
];

export const AMHARIC_COVER_PROMPT = 
  "ውድ አመልካች፣ ወደ ኢትዮጵያን አርዱዪኖ ሀብ (EAH) ለመቀላቀል ያለዎትን ፍላጎት፣ ለምን የመረጡትን የትምህርት ፕሮግራም መማር እንደሚፈልጉ፣ ያላችሁትን ልምድ እና ወደፊት ለማሳካት የምትፈልጉትን ግብ የሚገልጽ መደበኛ የማመልከቻ ደብዳቤ በአማርኛ ያቅርቡ።";

export function validateEthiopianPhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-()]/g, '');
  return /^(\+251|251|0)?[79]\d{8}$/.test(clean) || /^\+[1-9]\d{6,14}$/.test(clean);
}

export function detectAmharicRatio(text: string): number {
  if (!text) return 0;
  const letters = text.match(/\p{L}/gu) ?? [];
  if (!letters.length) return 0;
  const ethiopic = text.match(/[\u1200-\u137F\u1380-\u139F\u2D80-\u2DDF]/g) ?? [];
  return ethiopic.length / letters.length;
}

export function calculateAge(dobString: string): number {
  if (!dobString) return 0;
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
