/**
 * Riya Sharma — Portfolio
 * React · Tailwind CSS (v3 or v4) · Framer Motion · lucide-react
 *
 * Self-contained: theming is driven by the token objects below, so no Tailwind
 * config or dark-mode variant setup is required. Screenshots are read from
 * /public/images — drop a file at a project's `screens[].src` path and it
 * replaces that project's cover art automatically.
 */
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Copy,
  Database,
  Globe,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Lock,
  Mail,
  MapPin,
  Monitor,
  Moon,
  Navigation,
  Plug,
  RotateCw,
  ScanText,
  Smartphone,
  Stethoscope,
  Sun,
  Trophy,
  Watch,
  Wifi,
  Wrench,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────── */
/* Content                                                                   */
/* ────────────────────────────────────────────────────────────────────────── */

const PROFILE = {
  name: "Riya Sharma",
  role: "React Native & React.js Engineer",
  experience: "3+ years experience",
  company: "Eleven Bay · SAS Techstudio",
  tenure: "Apr 2023 – Present",
  location: "India · Open to relocation",
  summary:
    "I design, build and ship production mobile and web applications across healthcare, corporate wellness, CRM and business operations. I've delivered 3 React Native apps to the App Store and Play Store and 4 production React.js web apps, and I'm currently leading frontend development on a TypeScript employee-health platform built on Zustand, TanStack React Query and React Navigation.",
  email: "riya.sharma.aboutme@gmail.com",
  linkedin: "https://www.linkedin.com/in/riyaa-sharmaa/",
  coreStack: ["React Native CLI", "TypeScript", "Zustand", "TanStack Query", "MMKV", "Apple Health / Health Connect"],
};

const STATS = [
  { value: "3", label: "Mobile Apps Shipped", detail: "App Store & Play Store, full release pipeline", icon: Smartphone },
  { value: "4", label: "Production Web Apps", detail: "Healthcare, CRM & business operations", icon: Globe },
  { value: "1st", suffix: "Place", label: "SAS Tech Hackathon 2024", detail: "Out of 5+ competing teams", icon: Trophy },
];

const PROJECTS = [
  {
    id: "aiqa",
    title: "Aiqa Corporate App",
    subtitle: "Employee Health & Wellness Platform",
    type: "mobile",
    icon: HeartPulse,
    badge: "Launching soon",
    description:
      "Leading frontend on a corporate health companion: OTP auth, a multi-section Health Risk Assessment with dynamic scoring, annual health-check booking, wearable sync and an in-app AI chat assistant.",
    highlights: [
      "React Navigation (native stack + bottom tabs), domain-scoped Zustand stores and TanStack React Query caching",
      "Strict TypeScript and design-token standard — no hardcoded colours, spacing or `any` types",
      "Reusable modal, skeleton-loading and progress-indicator system adopted on every screen",
    ],
    tech: ["React Native CLI", "TypeScript", "Zustand", "TanStack Query", "React Navigation", "Apple Health / Health Connect"],
    screens: [
      { src: "/images/aiqa-intro.jpg", alt: "Aiqa onboarding — Smarter care starts here" },
      { src: "/images/aiqa-home.jpg", alt: "Aiqa home dashboard with services and plan benefits" },
      { src: "/images/aiqa-ai-coach.jpg", alt: "Aiqa AI health coach conversation" },
    ],
  },
  {
    id: "telehealth",
    title: "Healthcare Services, Claims & Telemedicine Platform",
    subtitle: "Customer-Facing Healthcare App",
    type: "mobile",
    icon: Stethoscope,
    description:
      "A customer-facing healthcare app for benefit access, telemedicine consultations, audio/video calls, lab bookings and coupon management.",
    highlights: [
      "End-to-end claims and reimbursement system with multi-step workflows, document uploads and approval flows",
      "API-driven form auto-population to cut manual input across the user journey",
    ],
    tech: ["React Native", "Audio / Video Calls", "React Hook Form", "Zod", "REST APIs"],
    screens: [
      { src: "/images/telehealth-doctor.jpg", alt: "Doctor profile with video and audio consultation booking" },
      { src: "/images/telehealth-lab-tests.jpg", alt: "Diagnostics hub for booking lab tests at home" },
      { src: "/images/telehealth-pharmacy.jpg", alt: "Pharmacy ordering from a doctor's prescription" },
      { src: "/images/telehealth-specialists.jpg", alt: "Online consultation across medical specialities" },
    ],
  },
  {
    id: "crm",
    title: "CRM Sales Management App",
    subtitle: "Field Sales Activity Tracker",
    type: "mobile",
    icon: MapPin,
    description: "A CRM app for field sales teams covering lead management, meeting tracking and customer engagement workflows.",
    highlights: [
      "Live location tracking to monitor on-site client meetings and real-time field activity",
      "Push notifications and deep linking for real-time engagement",
    ],
    tech: ["React Native", "Live Location Tracking", "FCM Push", "Deep Linking"],
    screens: [{ src: "/images/crm-home.png", alt: "CRM field sales app home screen" }],
  },
  {
    id: "business-ops",
    title: "Business Operations & Management Platform",
    subtitle: "Care, Reseller & Doctor Management",
    type: "web",
    icon: LayoutDashboard,
    url: "ops-console.app/care-management",
    description:
      "Care Management, Reseller Management and Doctor Management panels covering onboarding, appointments, prescriptions, claims and customer service.",
    highlights: ["Responsive, workflow-driven interfaces for complex operational requirements, built with backend and stakeholder teams"],
    tech: ["React.js", "React Native", "Role-Based Panels", "REST APIs"],
    screens: [{ src: "/images/business-ops-web.png", alt: "Care management operations panel" }],
  },
  {
    id: "ocr-vision",
    title: "AI Vision & OCR Processing Platform",
    subtitle: "SAS Tech Hackathon 2024",
    type: "web",
    icon: ScanText,
    badge: "1st place",
    url: "ocr-vision.app/extract",
    description:
      "Won 1st place among 5+ teams with a facial-recognition module that scores image similarity and an OCR extraction system for the reseller claims workflow.",
    highlights: ["OCR extraction wired into reseller claims to reduce manual data entry"],
    tech: ["React.js", "OCR", "Facial Recognition"],
    screens: [{ src: "/images/ocr-web.png", alt: "OCR platform document extraction dashboard" }],
  },
];

const EXPERIENCE = {
  role: "React Native & React.js Developer",
  company: "Eleven Bay | SAS Techstudio",
  period: "Apr 2023 – Present",
  summary:
    "Full-stack mobile and web development across healthcare, corporate wellness, CRM and business-operations platforms — end-to-end ownership from design to production.",
  highlights: [
    "Owned the complete release pipeline for 3 React Native apps — build generation, code signing, testing and production rollouts on iOS and Android.",
    "Built a shared component library (buttons, cards, modals, skeleton loaders, progress indicators) reused across every screen.",
    "Connected Apple Health / Health Connect and synced steps, heart rate and sleep telemetry to backend APIs for real-time health insights.",
    "Implemented multi-step forms, document uploads, API-driven auto-fill and OTP authentication with React Hook Form and Zod.",
    "Integrated Firebase — FCM push notifications, Analytics and Crashlytics — to improve engagement tracking and production stability.",
    "Managed complex data flows with Redux, Zustand and Context API, standardising error handling and loading states.",
  ],
};

const EDUCATION = [
  { title: "BSc (Hons) Computer Science", detail: "Birmingham City University, UK · 2:1", period: "2018 – 2021", icon: GraduationCap },
  { title: "Be10x Certification", detail: "Professional certification", period: "Certificate", icon: Award },
];

const SKILLS = [
  { category: "Mobile", icon: Smartphone, items: ["React Native CLI", "Android Studio", "Xcode", "App Store & Play Store releases", "Reanimated", "react-native-svg"] },
  { category: "Frontend", icon: Code2, items: ["React.js", "TypeScript", "JavaScript (ES6+)", "NativeWind / Tailwind CSS", "HTML5 & CSS3", "Responsive Design"] },
  { category: "State Management", icon: Database, items: ["Zustand", "TanStack React Query", "Redux", "Context API"] },
  { category: "Wearables & Native", icon: Watch, items: ["Apple Health / Health Connect", "Native Modules", "MMKV (encrypted storage)"] },
  { category: "APIs & Data", icon: Plug, items: ["REST APIs", "Axios", "Firebase Auth", "FCM / APNs", "Analytics & Crashlytics"] },
  { category: "Forms & Validation", icon: ClipboardCheck, items: ["React Hook Form", "Zod", "Multi-step Forms"] },
  { category: "Navigation & UX", icon: Navigation, items: ["React Navigation", "Deep Linking", "Component Libraries", "Figma"] },
  { category: "Tooling & Delivery", icon: Wrench, items: ["Git / GitHub / Bitbucket", "Jira", "Postman", "Performance Optimisation", "Agile / Scrum"] },
];

const DISCLAIMER =
  "Screenshots reflect production systems engineered during my tenure at Eleven Bay / SAS Techstudio; the Aiqa Corporate App is pre-release. Trademarks belong to the respective brand owners.";

/* ────────────────────────────────────────────────────────────────────────── */
/* Design tokens                                                             */
/* ────────────────────────────────────────────────────────────────────────── */

const THEME_T = "transition-colors duration-500 ease-in-out";

const THEMES = {
  dark: {
    pageHex: "#030712",
    canvas: "bg-[#030712]",
    panel: "bg-[#0b0f19]/80 backdrop-blur-md",
    border: "border-[#1f2937]/50",
    borderHex: "#1f2937",
    heading: "text-slate-100",
    sub: "text-slate-400",
    muted: "text-slate-500",
    accent: "#14b8a6",
    accentRgb: "20,184,166",
    indigo: "#6366f1",
    indigoRgb: "99,102,241",
    chip: "bg-white/[0.03] text-slate-300",
    hover: "hover:bg-white/[0.025]",
    cta: "bg-slate-100 text-slate-900 hover:bg-white",
    ghost: "text-slate-200 hover:bg-white/[0.04]",
    gridLine: "rgba(148,163,184,0.055)",
    glowAlpha: 0.14,
    chromeBg: "bg-[#0b0f19]",
    addressBg: "bg-white/[0.04]",
    screenHex: "#0b0f19",
    skeletonBase: "bg-[#0e1422]",
    skeletonBlock: "bg-white/[0.06]",
    shimmer: "rgba(255,255,255,0.06)",
    rope: "rgba(148,163,184,0.16)",
    ropeDash: "rgba(148,163,184,0.26)",
    figure: "#e2e8f0",
    figureEye: "#0f172a",
    peakFill: "#1e293b",
    peakStroke: "rgba(148,163,184,0.22)",
    track: "bg-slate-900",
  },
  light: {
    pageHex: "#f8fafc",
    canvas: "bg-[#f8fafc]",
    panel: "bg-white/80 backdrop-blur-md",
    border: "border-[#e2e8f0]",
    borderHex: "#e2e8f0",
    heading: "text-slate-900",
    sub: "text-slate-600",
    muted: "text-slate-400",
    accent: "#0d9488",
    accentRgb: "13,148,136",
    indigo: "#4f46e5",
    indigoRgb: "79,70,229",
    chip: "bg-slate-900/[0.035] text-slate-700",
    hover: "hover:bg-slate-900/[0.02]",
    cta: "bg-slate-900 text-white hover:bg-slate-800",
    ghost: "text-slate-700 hover:bg-slate-900/[0.035]",
    gridLine: "rgba(15,23,42,0.045)",
    glowAlpha: 0.1,
    chromeBg: "bg-white",
    addressBg: "bg-slate-100",
    screenHex: "#f1f5f9",
    skeletonBase: "bg-slate-100",
    skeletonBlock: "bg-slate-200/90",
    shimmer: "rgba(255,255,255,0.75)",
    rope: "rgba(15,23,42,0.12)",
    ropeDash: "rgba(15,23,42,0.22)",
    figure: "#334155",
    figureEye: "#f8fafc",
    peakFill: "#cbd5e1",
    peakStroke: "rgba(15,23,42,0.18)",
    track: "bg-slate-200",
  },
};

const ThemeContext = createContext(THEMES.dark);
const useT = () => useContext(ThemeContext);
const rgba = (rgb, a) => `rgba(${rgb},${a})`;

const EASE = [0.22, 1, 0.36, 1];
const FRAME_T = { duration: 0.75, ease: [0.65, 0, 0.35, 1] };
const SCREEN_T = {
  scale: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 },
  opacity: { duration: 0.45, ease: EASE },
};
const SHOT_MS = 3200;
const CHROME_H = 40;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };

/* ────────────────────────────────────────────────────────────────────────── */
/* Hooks & primitives                                                        */
/* ────────────────────────────────────────────────────────────────────────── */

const THEME_KEY = "rs-portfolio-theme";

function useThemeMode() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch {
      /* storage unavailable — theme simply won't persist */
    }
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.style.colorScheme = mode;
    root.style.backgroundColor = THEMES[mode].pageHex;
    root.style.transition = "background-color 500ms ease-in-out";
  }, [mode]);

  return [mode, () => setMode((m) => (m === "dark" ? "light" : "dark"))];
}

function useClock() {
  const format = () =>
    new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).replace(/\s?[AP]M$/, "");
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function LinkedInMark({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function SectionLabel({ index, title, hint }) {
  const t = useT();
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="flex items-baseline gap-3">
        <span className={`font-mono text-[11px] ${THEME_T}`} style={{ color: t.accent }}>
          {index}
        </span>
        <span className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${t.heading} ${THEME_T}`}>{title}</span>
      </h2>
      {hint && <span className={`font-mono text-[11px] ${t.muted} ${THEME_T}`}>{hint}</span>}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Header                                                                    */
/* ────────────────────────────────────────────────────────────────────────── */

function ThemeToggle({ mode, onToggle }) {
  const t = useT();
  const dark = mode === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={onToggle}
      className={`relative flex h-8 w-[60px] shrink-0 cursor-pointer items-center rounded-full border p-1 outline-none focus-visible:ring-2 ${t.border} ${t.panel} ${THEME_T}`}
      style={{ "--tw-ring-color": rgba(t.accentRgb, 0.5) }}
    >
      <Sun className={`absolute left-2 h-3.5 w-3.5 ${t.muted} ${THEME_T}`} aria-hidden />
      <Moon className={`absolute right-2 h-3.5 w-3.5 ${t.muted} ${THEME_T}`} aria-hidden />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`relative z-10 grid h-6 w-6 place-items-center rounded-full shadow-md ${dark ? "ml-auto" : ""}`}
        style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.indigo})`, boxShadow: `0 0 14px ${rgba(t.accentRgb, 0.45)}` }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            initial={{ rotate: -120, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 120, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid place-items-center text-white"
          >
            {dark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}

function EmailActions() {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <a
        href={`mailto:${PROFILE.email}`}
        className={`group inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-medium shadow-sm ${t.cta} ${THEME_T}`}
      >
        <Mail className="h-4 w-4 shrink-0" />
        <span className="break-all">{PROFILE.email}</span>
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border ${t.border} ${t.panel} ${t.ghost} ${THEME_T}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {copied ? <Check className="h-4 w-4" style={{ color: t.accent }} /> : <Copy className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </button>
      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noreferrer"
        className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-medium ${t.border} ${t.panel} ${t.ghost} ${THEME_T}`}
      >
        <LinkedInMark />
        LinkedIn
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

function Header({ mode, onToggleTheme }) {
  const t = useT();
  return (
    <motion.header variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="flex items-center justify-between gap-4">
        <div
          className={`inline-flex min-w-0 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest ${t.border} ${t.panel} ${t.muted} ${THEME_T}`}
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full opacity-60" style={{ background: t.accent }} />
            <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: t.accent }} />
          </span>
          <span className="truncate">
            sys.init <span className="opacity-50">/</span> portfolio.v3 <span className="opacity-50">·</span>{" "}
            <span style={{ color: t.accent }}>online</span>
          </span>
        </div>
        <ThemeToggle mode={mode} onToggle={onToggleTheme} />
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className={`mt-12 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl xl:text-7xl ${t.heading} ${THEME_T}`}
      >
        {PROFILE.name}
      </motion.h1>
      <motion.p
        variants={fadeUp}
        className="mt-3 w-fit bg-clip-text text-xl font-medium tracking-tight text-transparent sm:text-2xl"
        style={{ backgroundImage: `linear-gradient(90deg, ${t.accent}, ${t.indigo})` }}
      >
        {PROFILE.role}
      </motion.p>

      <motion.ul variants={fadeUp} className="mt-5 flex flex-wrap gap-2">
        {[
          { icon: Briefcase, text: PROFILE.experience },
          { icon: Building2, text: `${PROFILE.company} · ${PROFILE.tenure}` },
          { icon: MapPin, text: PROFILE.location },
        ].map(({ icon: Icon, text }) => (
          <li
            key={text}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${t.border} ${t.chip} ${THEME_T}`}
          >
            <Icon className="h-3.5 w-3.5" style={{ color: t.accent }} />
            {text}
          </li>
        ))}
      </motion.ul>

      <motion.p variants={fadeUp} className={`mt-6 max-w-2xl text-[15px] leading-relaxed ${t.sub} ${THEME_T}`}>
        {PROFILE.summary}
      </motion.p>

      <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center gap-2">
        <span className={`mr-1 font-mono text-[11px] uppercase tracking-widest ${t.muted} ${THEME_T}`}>Core stack</span>
        {PROFILE.coreStack.map((tech) => (
          <span
            key={tech}
            className={`rounded-md border px-2 py-1 font-mono text-[11px] ${THEME_T}`}
            style={{ borderColor: rgba(t.accentRgb, 0.3), background: rgba(t.accentRgb, 0.07), color: t.accent }}
          >
            {tech}
          </span>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8">
        <EmailActions />
      </motion.div>

      <motion.ul variants={stagger} className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </motion.ul>
    </motion.header>
  );
}

function StatCard({ stat }) {
  const t = useT();
  const Icon = stat.icon;
  return (
    <motion.li
      variants={fadeUp}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`group relative overflow-hidden rounded-2xl border p-5 ${t.border} ${t.panel} ${THEME_T}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: rgba(t.accentRgb, 0.22) }}
      />
      <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: rgba(t.accentRgb, 0.1), color: t.accent }}>
        <Icon className="h-4 w-4" />
      </span>
      <p className={`mt-5 flex items-baseline gap-1.5 text-3xl font-semibold tracking-tight ${t.heading} ${THEME_T}`}>
        {stat.value}
        {stat.suffix && <span className={`text-base font-medium ${t.sub}`}>{stat.suffix}</span>}
      </p>
      <p className={`mt-1 text-sm font-medium ${t.heading} ${THEME_T}`}>{stat.label}</p>
      <p className={`mt-0.5 text-xs ${t.muted} ${THEME_T}`}>{stat.detail}</p>
    </motion.li>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Project matrix                                                            */
/* ────────────────────────────────────────────────────────────────────────── */

function ProjectItem({ project, index, active, onSelect }) {
  const t = useT();
  const TypeIcon = project.type === "web" ? Monitor : Smartphone;

  return (
    <motion.li variants={fadeUp}>
      <button
        type="button"
        aria-pressed={active}
        onMouseEnter={() => onSelect(project.id)}
        onFocus={() => onSelect(project.id)}
        onClick={() => onSelect(project.id)}
        className={`group relative w-full cursor-pointer rounded-2xl border p-5 text-left outline-none sm:p-6 ${t.border} ${t.panel} ${t.hover} ${THEME_T}`}
      >
        {active && (
          <motion.span
            layoutId="project-active-frame"
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-2xl border"
            style={{
              borderColor: rgba(t.accentRgb, 0.55),
              background: `linear-gradient(135deg, ${rgba(t.accentRgb, 0.07)}, ${rgba(t.indigoRgb, 0.04)} 55%, transparent)`,
              boxShadow: `0 0 0 3px ${rgba(t.accentRgb, 0.06)}, 0 24px 60px -34px ${rgba(t.accentRgb, 0.75)}`,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          />
        )}

        <div className="relative flex items-start gap-4 sm:gap-5">
          <span
            className={`pt-1 font-mono text-xs transition-colors duration-500 ${active ? "" : t.muted}`}
            style={active ? { color: t.accent } : undefined}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className={`text-base font-semibold tracking-tight sm:text-lg ${t.heading} ${THEME_T}`}>{project.title}</h3>
              <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center">
                {project.badge && (
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                    style={{ background: rgba(t.indigoRgb, 0.12), color: t.indigo }}
                  >
                    {project.badge}
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${t.border} ${t.muted} ${THEME_T}`}
                >
                  <TypeIcon className="h-3 w-3" />
                  {project.type}
                </span>
              </div>
            </div>
            <p
              className={`mt-1 font-mono text-[11px] uppercase tracking-[0.14em] ${active ? "" : t.muted} ${THEME_T}`}
              style={active ? { color: t.accent } : undefined}
            >
              {project.subtitle}
            </p>
            <p className={`mt-3 text-sm leading-relaxed ${t.sub} ${THEME_T}`}>{project.description}</p>
            {project.highlights?.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {project.highlights.map((point) => (
                  <li key={point} className={`flex gap-2.5 text-[13px] leading-relaxed ${t.sub} ${THEME_T}`}>
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: t.accent }} />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li key={tech} className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] ${t.border} ${t.chip} ${THEME_T}`}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <ArrowUpRight
            className={`mt-1 hidden h-4 w-4 shrink-0 transition-all duration-300 sm:block ${
              active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60"
            }`}
            style={{ color: t.accent }}
          />
        </div>
      </button>
    </motion.li>
  );
}

function ProjectMatrix({ activeId, onSelect }) {
  return (
    <section aria-labelledby="work-heading">
      <div id="work-heading">
        <SectionLabel
          index="02"
          title="Production Systems"
          hint={
            <>
              <span className="hidden lg:inline">hover to preview →</span>
              <span className="lg:hidden">tap to preview ↑</span>
            </>
          }
        />
      </div>
      <LayoutGroup id="projects">
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-5 space-y-3"
        >
          {PROJECTS.map((project, i) => (
            <ProjectItem key={project.id} project={project} index={i} active={project.id === activeId} onSelect={onSelect} />
          ))}
        </motion.ul>
      </LayoutGroup>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Skills & contact                                                          */
/* ────────────────────────────────────────────────────────────────────────── */

function ExperienceSection() {
  const t = useT();
  return (
    <section aria-labelledby="experience-heading">
      <div id="experience-heading">
        <SectionLabel index="03" title="Experience" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`mt-5 rounded-2xl border p-5 sm:p-6 ${t.border} ${t.panel} ${THEME_T}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className={`text-base font-semibold tracking-tight sm:text-lg ${t.heading} ${THEME_T}`}>{EXPERIENCE.role}</h3>
            <p className="mt-0.5 text-sm font-medium" style={{ color: t.accent }}>
              {EXPERIENCE.company}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] ${t.border} ${t.chip} ${THEME_T}`}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            {EXPERIENCE.period}
          </span>
        </div>
        <p className={`mt-3 text-sm leading-relaxed ${t.sub} ${THEME_T}`}>{EXPERIENCE.summary}</p>
        <ul className="mt-4 space-y-2">
          {EXPERIENCE.highlights.map((point) => (
            <li key={point} className={`flex gap-2.5 text-[13px] leading-relaxed ${t.sub} ${THEME_T}`}>
              <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full" style={{ background: t.accent }} />
              {point}
            </li>
          ))}
        </ul>
      </motion.div>

      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {EDUCATION.map(({ title, detail, period, icon: Icon }) => (
          <li key={title} className={`flex items-start gap-3 rounded-2xl border p-4 ${t.border} ${t.panel} ${THEME_T}`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: rgba(t.indigoRgb, 0.1), color: t.indigo }}>
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className={`text-sm font-semibold ${t.heading} ${THEME_T}`}>{title}</p>
              <p className={`mt-0.5 text-xs ${t.sub} ${THEME_T}`}>{detail}</p>
              <p className={`mt-1 font-mono text-[10.5px] ${t.muted} ${THEME_T}`}>{period}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SkillGrid() {
  const t = useT();
  return (
    <section aria-labelledby="skills-heading">
      <div id="skills-heading">
        <SectionLabel index="04" title="Technical Stack" />
      </div>
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-5 grid gap-3 sm:grid-cols-2"
      >
        {SKILLS.map(({ category, icon: Icon, items }) => (
          <motion.li key={category} variants={fadeUp} className={`rounded-2xl border p-5 ${t.border} ${t.panel} ${THEME_T}`}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: rgba(t.indigoRgb, 0.1), color: t.indigo }}>
                <Icon className="h-4 w-4" />
              </span>
              <h3 className={`text-sm font-semibold ${t.heading} ${THEME_T}`}>{category}</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className={`group inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium ${t.border} ${t.chip} ${THEME_T}`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                    style={{ background: t.accent, boxShadow: `0 0 6px ${rgba(t.accentRgb, 0.6)}` }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

function ContactPanel() {
  const t = useT();
  return (
    <motion.section
      aria-labelledby="contact-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 ${t.border} ${t.panel} ${THEME_T}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${rgba(t.indigoRgb, 0.2)}, transparent 70%)` }}
      />
      <p className={`relative font-mono text-[11px] uppercase tracking-widest ${t.muted} ${THEME_T}`}>
        <span style={{ color: t.accent }}>05</span> · Contact
      </p>
      <h2 id="contact-heading" className={`relative mt-3 text-2xl font-semibold tracking-tight sm:text-3xl ${t.heading} ${THEME_T}`}>
        Let&apos;s engineer together.
      </h2>
      <p className={`relative mt-2 max-w-lg text-sm leading-relaxed ${t.sub} ${THEME_T}`}>
        Building a product that needs to feel genuinely native on every screen? I&apos;d love to hear about it.
      </p>
      <div className="relative mt-6">
        <EmailActions />
      </div>
    </motion.section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Device emulator                                                           */
/* ────────────────────────────────────────────────────────────────────────── */

function Skeleton({ variant }) {
  const t = useT();
  const block = `${t.skeletonBlock} rounded-lg`;
  return (
    <motion.div
      aria-hidden
      className={`absolute inset-0 overflow-hidden ${t.skeletonBase}`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {variant === "web" ? (
        <div className="flex h-full animate-pulse gap-3 p-3">
          <div className="flex w-1/5 flex-col gap-2 pt-1">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={`${block} h-2.5`} style={{ width: `${90 - i * 8}%` }} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className={`${block} h-5 w-1/2`} />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className={`${block} h-14`} />
              ))}
            </div>
            <div className={`${block} flex-1 rounded-xl`} />
          </div>
        </div>
      ) : (
        <div className="flex h-full animate-pulse flex-col gap-3 px-5 pt-16">
          <div className={`${block} h-2.5 w-20 rounded-full`} />
          <div className={`${block} h-6 w-40`} />
          <div className={`${block} mt-2 h-36 rounded-2xl`} />
          <div className="grid grid-cols-4 gap-2.5">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={`${block} aspect-square rounded-xl`} />
            ))}
          </div>
          <div className={`${block} h-24 rounded-2xl`} />
          <div className={`${block} mb-9 mt-auto h-12 rounded-2xl`} />
        </div>
      )}
      <motion.div
        className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12"
        style={{ background: `linear-gradient(90deg, transparent, ${t.shimmer}, transparent)` }}
        animate={{ x: ["0%", "400%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/** Shown when a project's screenshot hasn't been added to /public/images yet. */
function CoverArt({ project }) {
  const Icon = project.icon;
  const web = project.type === "web";
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#070b14] px-6 text-center">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 25% 20%, rgba(20,184,166,0.28), transparent 55%), radial-gradient(circle at 80% 85%, rgba(99,102,241,0.3), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 75%)",
        }}
      />
      <motion.div
        className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-teal-300 backdrop-blur"
        style={{ boxShadow: "0 0 40px rgba(20,184,166,0.35)" }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
      <p className="relative mt-5 font-mono text-[10px] uppercase tracking-widest text-teal-300/80">{project.subtitle}</p>
      <p className={`relative mt-2 font-semibold tracking-tight text-white ${web ? "text-xl" : "text-lg"}`}>{project.title}</p>
      <ul className="relative mt-4 flex max-w-sm flex-wrap justify-center gap-1.5">
        {project.tech.map((tech) => (
          <li key={tech} className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-slate-300">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Screen({ screen, project }) {
  const [status, setStatus] = useState("loading");
  // Cached images can settle before React attaches onLoad/onError — check once on mount.
  const imgRef = useCallback((node) => {
    if (node?.complete) setStatus(node.naturalWidth > 0 ? "loaded" : "error");
  }, []);
  const loaded = status === "loaded";

  return (
    <motion.div className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
      <AnimatePresence>{status === "loading" && <Skeleton key="skeleton" variant={project.type} />}</AnimatePresence>
      {status === "error" ? (
        <motion.div className="h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <CoverArt project={project} />
        </motion.div>
      ) : (
        <motion.img
          ref={imgRef}
          src={screen.src}
          alt={screen.alt}
          draggable={false}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className="h-full w-full select-none object-cover object-top"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={SCREEN_T}
        />
      )}
    </motion.div>
  );
}

function PhoneOverlays() {
  const time = useClock();
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {/* Status bar */}
      <div className="absolute inset-x-0 top-0 grid h-12 grid-cols-[1fr_104px_1fr] items-center pt-1 text-[13px] font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]">
        <span className="text-center tabular-nums">{time}</span>
        <span />
        <span className="flex items-center justify-center gap-1.5">
          <svg viewBox="0 0 18 12" className="h-[10px] w-[16px]" fill="currentColor" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={i * 4.7} y={9 - i * 3} width="3" height={3 + i * 3} rx="0.8" />
            ))}
          </svg>
          <Wifi className="h-3.5 w-3.5" strokeWidth={2.6} />
          <span className="relative flex h-[11px] w-[23px] items-center rounded-[3.5px] border border-white/55 p-[1.5px]">
            <span className="h-full w-[82%] rounded-[1.5px] bg-white" />
            <span className="absolute -right-[3px] top-1/2 h-1 w-[1.5px] -translate-y-1/2 rounded-r bg-white/55" />
          </span>
        </span>
      </div>
      {/* Dynamic Island */}
      <div className="absolute left-1/2 top-[11px] h-[28px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 h-[5px] w-28 -translate-x-1/2 rounded-full bg-white/75" />
      {/* Glass reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.06]" />
    </motion.div>
  );
}

function BrowserChrome({ url }) {
  const t = useT();
  return (
    <motion.div
      className={`absolute inset-x-0 top-0 z-20 flex items-center gap-3 border-b px-3.5 ${t.chromeBg} ${t.border} ${THEME_T}`}
      style={{ height: CHROME_H }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.45, ease: EASE } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
    >
      <div className="flex shrink-0 gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className={`hidden shrink-0 items-center gap-1 sm:flex ${t.muted}`} aria-hidden>
        <ChevronLeft className="h-3.5 w-3.5" />
        <ChevronRight className="h-3.5 w-3.5 opacity-50" />
      </div>
      <div
        className={`mx-auto flex h-6 min-w-0 max-w-[72%] flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 font-mono text-[10.5px] ${t.addressBg} ${t.sub} ${THEME_T}`}
      >
        <Lock className="h-3 w-3 shrink-0" style={{ color: t.accent }} />
        <span className="truncate">{url}</span>
      </div>
      <RotateCw className={`h-3.5 w-3.5 shrink-0 ${t.muted}`} aria-hidden />
    </motion.div>
  );
}

const PHONE_SKIN = "linear-gradient(145deg,#3b3e46 0%,#1b1d22 28%,#0e0f12 62%,#2d3037 100%)";

function DeviceStage({ project }) {
  const t = useT();
  const wrapRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(360);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    setContainerWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isWeb = project.type === "web";
  const width = isWeb ? Math.min(containerWidth, 620) : Math.min(containerWidth, 300);
  const height = isWeb ? Math.round(width * 0.66) : Math.round(width * 2.07);

  // Screenshot carousel — index is scoped to the active project so switching restarts at 0.
  const count = project.screens.length;
  const [shot, setShot] = useState({ id: project.id, index: 0 });
  const index = shot.id === project.id ? shot.index : 0;
  const advance = () => setShot({ id: project.id, index: (index + 1) % count });

  useEffect(() => {
    if (count < 2) return undefined;
    const id = setTimeout(() => setShot({ id: project.id, index: (index + 1) % count }), SHOT_MS);
    return () => clearTimeout(id);
  }, [project.id, index, count]);

  useEffect(() => {
    project.screens.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, [project]);

  const screen = project.screens[index];

  return (
    <div className="flex flex-col items-center">
      <div ref={wrapRef} className="relative flex w-full justify-center">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          animate={{ backgroundColor: rgba(isWeb ? t.indigoRgb : t.accentRgb, t.glowAlpha * 2) }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          className="relative"
          initial={false}
          animate={{ width, height }}
          transition={FRAME_T}
          role="region"
          aria-label={`${project.title} preview (${isWeb ? "web browser" : "iPhone"})`}
        >
          <AnimatePresence>
            {!isWeb && (
              <motion.div
                key="hardware"
                aria-hidden
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.35 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <span className="absolute -left-[3px] top-[18%] h-7 w-[3px] rounded-l-sm bg-[#2a2d34]" />
                <span className="absolute -left-[3px] top-[26%] h-12 w-[3px] rounded-l-sm bg-[#2a2d34]" />
                <span className="absolute -left-[3px] top-[35%] h-12 w-[3px] rounded-l-sm bg-[#2a2d34]" />
                <span className="absolute -right-[3px] top-[28%] h-20 w-[3px] rounded-r-sm bg-[#2a2d34]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chassis */}
          <motion.div
            className="relative h-full w-full overflow-hidden"
            initial={false}
            animate={{ borderRadius: isWeb ? 14 : 52, padding: isWeb ? 1 : 11 }}
            transition={FRAME_T}
            style={{
              boxShadow: isWeb
                ? `0 40px 80px -30px rgba(2,6,23,0.55), 0 0 0 1px ${rgba(t.indigoRgb, 0.08)}`
                : "inset 0 0 0 1px rgba(255,255,255,0.09), 0 0 0 1px rgba(0,0,0,0.6), 0 50px 100px -30px rgba(2,6,23,0.8)",
            }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{ background: PHONE_SKIN }}
              initial={false}
              animate={{ opacity: isWeb ? 0 : 1 }}
              transition={FRAME_T}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0"
              style={{ background: t.borderHex }}
              initial={false}
              animate={{ opacity: isWeb ? 1 : 0 }}
              transition={FRAME_T}
            />

            {/* Screen */}
            <motion.div
              className="relative h-full w-full overflow-hidden"
              initial={false}
              animate={{ borderRadius: isWeb ? 13 : 41 }}
              transition={FRAME_T}
              style={{ background: t.screenHex }}
            >
              <AnimatePresence initial={false}>{isWeb && <BrowserChrome key="chrome" url={project.url} />}</AnimatePresence>

              <motion.div
                className="absolute inset-x-0 bottom-0 overflow-hidden"
                initial={false}
                animate={{ top: isWeb ? CHROME_H : 0 }}
                transition={FRAME_T}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={project.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={SCREEN_T}
                  >
                    <button
                      type="button"
                      onClick={advance}
                      disabled={count < 2}
                      aria-label={count > 1 ? `Screenshot ${index + 1} of ${count}. Show next` : screen.alt}
                      className="absolute inset-0 cursor-pointer outline-none disabled:cursor-default"
                    >
                      <AnimatePresence initial={false}>
                        <Screen key={screen.src} screen={screen} project={project} />
                      </AnimatePresence>
                    </button>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <AnimatePresence>{!isWeb && <PhoneOverlays key="phone-ui" />}</AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Caption */}
      <div className={`mt-7 flex items-center gap-2.5 font-mono text-[11px] ${t.muted} ${THEME_T}`}>
        {isWeb ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
        <span>
          previewing <span style={{ color: t.accent }}>./{project.id}</span>
        </span>
        {count > 1 && (
          <span className="flex items-center gap-1" aria-hidden>
            <span className="opacity-50">·</span>
            {project.screens.map((s, i) => (
              <span
                key={s.src}
                className="h-1 rounded-full transition-all duration-500"
                style={{ width: i === index ? 12 : 4, background: i === index ? t.accent : rgba(t.accentRgb, 0.25) }}
              />
            ))}
          </span>
        )}
      </div>

      <p className={`mt-4 max-w-[380px] text-center font-mono text-[10.5px] leading-relaxed ${t.muted} ${THEME_T}`}>
        <span className={`${t.sub} ${THEME_T}`}>Disclaimer:</span> {DISCLAIMER}
      </p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Scroll climber                                                            */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * She climbs as the visitor scrolls down and plants herself at the telescope once the
 * spring-smoothed progress reaches `summitAt`. Scrolling back up turns her to face the viewer.
 */
const CLIMBER = {
  summitAt: 0.9, // smoothProgress at which she reaches the plateau
  climb: 0.85, // fraction of the climb track that ends on the plateau
  cycles: 14, // hand-over-hand cycles across the full page
  minVelocity: 0.004, // spring velocity (progress/s) below which she's considered still
  settleMs: 160, // how long after the last movement the climbing shake stops
  mobileSummitAt: 0.95, // mobile: fraction across the top bar where she switches to the telescope
};
const MOBILE_SPRITE_W = 24;
const CLIMB_SPRING = { stiffness: 80, damping: 25, restDelta: 0.001 };
const SUMMIT_TEXT = "Looking forward to the next adventure. Let's engineer together.";

// Centre of the 3rem gap between col-span-7 and col-span-5 in a max-w-[1400px] px-6 12-column grid.
const GUTTER_CENTER = "calc(50% - min(100%, 1400px) / 2 + 21rem + (min(100%, 1400px) - 36rem) * 0.5833333)";
const PEAK_TOP = 112;
const PEAK_H = 26;
const APEX_Y = PEAK_TOP + 2;
const TRACK_TOP = PEAK_TOP + PEAK_H;
const TRACK_BOTTOM = 40;
const HAIR = "#fb7185";

const legPath = (hipX, kneeX, footX, footY) => `M${hipX} 27 L${kneeX} ${(27 + footY) / 2 - 1} L${footX} ${footY}`;

function useLimbs(phase) {
  const s = useTransform(phase, Math.sin);
  const leftLeg = useTransform(s, (v) => legPath(14.5, 10, 15, 42 + 3 * v));
  const rightLeg = useTransform(s, (v) => legPath(17.5, 22, 17, 42 - 3 * v));
  const sway = useTransform(phase, (v) => Math.sin(v / 2) * 4);
  const ponytail = useTransform(phase, (v) => {
    const swing = Math.sin(v / 2) * 2;
    return `M18.6 6.8 Q${22 + swing} 9 ${20.5 + swing} 14.5`;
  });
  return { s, leftLeg, rightLeg, sway, ponytail };
}

/** Moving up the rope: back to the viewer, reaching hand over hand. */
function ClimbingFigure({ phase }) {
  const t = useT();
  const { s, leftLeg, rightLeg, sway, ponytail } = useLimbs(phase);
  const leftArm = useTransform(s, (v) => {
    const y = 6 - 4 * v;
    return `M13.5 15 Q9.5 ${(15 + y) / 2} 15 ${y}`;
  });
  const rightArm = useTransform(s, (v) => {
    const y = 6 + 4 * v;
    return `M18.5 15 Q22.5 ${(15 + y) / 2} 17 ${y}`;
  });

  return (
    <motion.svg
      viewBox="0 0 32 48"
      className="h-12 w-8 overflow-visible"
      style={{ rotate: sway, originY: 0.1, filter: `drop-shadow(0 0 6px ${rgba(t.accentRgb, 0.5)})` }}
    >
      <g fill="none" stroke={t.figure} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d={leftLeg} />
        <motion.path d={rightLeg} />
        <path d="M16 13V27" />
        <motion.path d={leftArm} />
        <motion.path d={rightArm} />
      </g>
      <rect x="12.5" y="14.5" width="7" height="9" rx="2" fill={t.accent} />
      <circle cx="16" cy="9" r="3.6" fill={t.figure} />
      <path d="M12.6 8.6 Q16 4 19.4 8.6" fill="none" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
      <motion.path d={ponytail} fill="none" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
    </motion.svg>
  );
}

/** Moving down the rope: turned to face the viewer, gazing back up at the peak. */
function ReminiscingFigure({ phase }) {
  const t = useT();
  const { s, leftLeg, rightLeg, sway, ponytail } = useLimbs(phase);
  const leftArm = useTransform(s, (v) => `M13.5 15 Q11.5 ${9 + v} 15 ${3 + 1.5 * v}`);
  const rightArm = useTransform(s, (v) => `M18.5 15 Q20.5 ${9 - v} 17 ${3 - 1.5 * v}`);

  return (
    <div className="relative">
      <motion.svg
        viewBox="0 0 32 48"
        className="h-12 w-8 overflow-visible"
        style={{ rotate: sway, originY: 0.1, filter: `drop-shadow(0 0 6px ${rgba(t.accentRgb, 0.45)})` }}
      >
        <g fill="none" stroke={t.figure} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d={leftLeg} />
          <motion.path d={rightLeg} />
          <path d="M16 13.5V27" />
          <motion.path d={leftArm} />
          <motion.path d={rightArm} />
        </g>
        <path d="M14 14.5 L14.6 22M18 14.5 L17.4 22" stroke={t.accent} strokeWidth="1.4" strokeLinecap="round" />
        <motion.path d={ponytail} fill="none" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="16" cy="10" r="3.6" fill={t.figure} />
        <path d="M12.6 9.4 Q16 4.8 19.4 9.4" fill="none" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="14.8" cy="9.4" r="0.6" fill={t.figureEye} />
        <circle cx="17.2" cy="9.4" r="0.6" fill={t.figureEye} />
      </motion.svg>
      <motion.span
        className="absolute -left-2.5 -top-3 flex items-end gap-[2px]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        <motion.span
          className={`grid h-3.5 w-3.5 place-items-center rounded-full border text-[7px] leading-none ${t.panel} ${t.border}`}
          style={{ color: t.accent }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
        <span className="mb-[1px] h-1 w-1 rounded-full" style={{ background: rgba(t.accentRgb, 0.5) }} />
      </motion.span>
    </div>
  );
}

/** Summit: standing still, eye to a small telescope, looking out to what's next. */
function TelescopeFigure() {
  const t = useT();
  return (
    <svg viewBox="0 0 48 44" className="h-11 w-12 overflow-visible" style={{ filter: `drop-shadow(0 0 6px ${rgba(t.accentRgb, 0.5)})` }}>
      <motion.path
        d="M43 6.2 L60 -1 L60 13 Z"
        fill={t.accent}
        initial={{ opacity: 0.08 }}
        animate={{ opacity: [0.08, 0.3, 0.08] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <path d="M31 11 L26.5 43.5M31 11 L35.5 43.5M31 11 V43.5" stroke={t.figure} strokeOpacity="0.55" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M21 14.5 L40 7.4" stroke={t.figure} strokeWidth="3.4" strokeLinecap="round" />
      <path d="M38.5 7.9 L42.6 6.4" stroke={t.accent} strokeWidth="4.4" strokeLinecap="round" />
      <g fill="none" stroke={t.figure} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 29 L12 43.5M15 29 L18 43.5" />
        <path d="M16 16.5 L15 29" />
        <path d="M16 19 L21 18.5 L24.5 13.4" />
        <path d="M16 20 L23.5 21 L28.5 11.6" />
      </g>
      <rect x="10.4" y="16.6" width="4.6" height="9" rx="1.8" fill={t.accent} />
      <path d="M15.6 10.4 Q11 11 11.6 15.6" fill="none" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="17.6" cy="12" r="3.4" fill={t.figure} />
      <path d="M14.5 11.2 Q16.8 7.4 21 10" fill="none" stroke={HAIR} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function SummitBurst() {
  const t = useT();
  return (
    <span className="absolute left-1/2" style={{ top: APEX_Y }}>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{ background: i % 2 ? t.indigo : t.accent, boxShadow: `0 0 6px ${t.accent}` }}
            initial={{ x: -2, y: -2, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * 24 - 2, y: Math.sin(angle) * 24 - 2, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          />
        );
      })}
    </span>
  );
}

const turn = {
  initial: { opacity: 0, rotateY: -90 },
  animate: { opacity: 1, rotateY: 0, transition: { duration: 0.18, ease: EASE } },
  exit: { opacity: 0, rotateY: 90, transition: { duration: 0.14 } },
};

/** Shared by both layouts: raw scroll → damped spring, plus the moving/direction gait state. */
function useClimberPhysics(targetRef) {
  // 1. Raw scroll progress across the whole page container.
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });

  // 2. Damped spring: gives her weight and irons out jerky trackpad / wheel input.
  const smoothProgress = useSpring(scrollYProgress, CLIMB_SPRING);
  const phase = useTransform(smoothProgress, (v) => v * CLIMBER.cycles * Math.PI * 2);

  // 4. Gait, driven by the spring (not raw scroll) so it matches what's on screen.
  const [gait, setGait] = useState({ moving: false, up: true });
  const settleTimer = useRef(undefined);

  useMotionValueEvent(smoothProgress, "change", () => {
    const velocity = smoothProgress.getVelocity();
    if (Math.abs(velocity) < CLIMBER.minVelocity) return;
    const up = velocity > 0;
    setGait((g) => (g.moving && g.up === up ? g : { moving: true, up }));
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setGait((g) => ({ ...g, moving: false })), CLIMBER.settleMs);
  });
  useEffect(() => () => clearTimeout(settleTimer.current), []);

  return { smoothProgress, phase, gait };
}

function useThreshold(value, threshold) {
  const [past, setPast] = useState(() => value.get() >= threshold);
  useMotionValueEvent(value, "change", (v) => setPast(v >= threshold));
  return past;
}

/** Climbing (moving forward) or reminiscing (moving back), with a micro-shake while in motion. */
function ClimberSprite({ gait, phase }) {
  return (
    <motion.div
      animate={gait.moving ? { x: [0, -0.8, 0.8, -0.4, 0], rotate: [0, -1.5, 1.5, -0.6, 0] } : { x: 0, rotate: 0 }}
      transition={gait.moving ? { duration: 0.3, repeat: Infinity, ease: "easeInOut" } : { duration: 0.25 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={gait.up ? "up" : "down"} {...turn}>
          {gait.up ? <ClimbingFigure phase={phase} /> : <ReminiscingFigure phase={phase} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function ScrollClimber({ targetRef }) {
  const physics = useClimberPhysics(targetRef);
  return (
    <>
      <DesktopRail {...physics} />
      <MobileTrack {...physics} />
    </>
  );
}

/** lg and up: vertical rope in the column gap. */
function DesktopRail({ smoothProgress, phase, gait }) {
  const t = useT();

  // 3. 0% → 85% of the climb track. The track is sized so 85% lands exactly on the summit
  //    plateau; applied as an upward translate so it stays on the compositor.
  const climberY = useTransform(smoothProgress, [0, CLIMBER.summitAt], ["0%", `${CLIMBER.climb * 100}%`]);
  const lift = useTransform(climberY, (v) => `-${v}`);
  const trailScale = useTransform(smoothProgress, [0, CLIMBER.summitAt], [0, CLIMBER.climb]);
  const ropeOffset = useTransform(smoothProgress, [0, 1], [0, -240]);
  const summit = useThreshold(smoothProgress, CLIMBER.summitAt);

  const trailGradient = `linear-gradient(0deg, ${t.indigo}, ${t.accent})`;
  const trailGlow = `0 0 12px ${rgba(t.accentRgb, 0.6)}, 0 0 2px ${rgba(t.accentRgb, 0.9)}`;
  const trackSpan = `calc((100vh - ${TRACK_TOP + TRACK_BOTTOM}px) / ${CLIMBER.climb})`;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 z-10 hidden w-12 -translate-x-1/2 lg:block"
      style={{ left: GUTTER_CENTER }}
    >
      {/* Peak */}
      <svg viewBox="0 0 44 26" className="absolute left-1/2 w-11 -translate-x-1/2 overflow-visible" style={{ top: PEAK_TOP, height: PEAK_H }}>
        <path d="M0 26 L15 8 L22 2 L27 7 L33 4 L44 26Z" fill={t.peakFill} fillOpacity="0.7" />
        <motion.path
          d="M0 26 L15 8 L22 2 L27 7 L33 4 L44 26"
          fill="none"
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={false}
          animate={{ stroke: summit ? t.accent : t.peakStroke }}
          transition={{ duration: 0.6 }}
        />
        <path d="M19 4.6 L22 2 L25 5 L22 4.2Z" fill={t.figure} fillOpacity="0.6" />
      </svg>

      {/* Rope: apex → base */}
      <svg className="absolute left-1/2 w-2 -translate-x-1/2 overflow-visible" style={{ top: APEX_Y, bottom: TRACK_BOTTOM, height: `calc(100% - ${APEX_Y + TRACK_BOTTOM}px)` }}>
        <line x1="4" x2="4" y1="0" y2="100%" stroke={t.rope} strokeWidth="2" />
        <motion.line
          x1="4"
          x2="4"
          y1="0"
          y2="100%"
          stroke={t.ropeDash}
          strokeWidth="2"
          strokeDasharray="1.5 5"
          strokeLinecap="round"
          style={{ strokeDashoffset: ropeOffset }}
        />
      </svg>

      {/* Final stretch from plateau to apex, lit on arrival */}
      <motion.div
        className="absolute left-1/2 w-[2px] -translate-x-1/2"
        style={{ top: APEX_Y, height: TRACK_TOP - APEX_Y, background: t.accent, boxShadow: trailGlow }}
        initial={false}
        animate={{ opacity: summit ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Climb track: its bottom is the base, 85% of its height is the plateau. */}
      <div className="absolute inset-x-0" style={{ bottom: TRACK_BOTTOM, height: trackSpan }}>
        <motion.div
          className="absolute bottom-0 left-1/2 h-full w-[2px] -translate-x-1/2 rounded-full"
          style={{ scaleY: trailScale, originY: 1, background: trailGradient, boxShadow: trailGlow }}
        />

        <AnimatePresence>
          {!summit && (
            <motion.div
              key="traveller"
              className="absolute inset-0"
              style={{ y: lift }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.25 } }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[80%]" style={{ perspective: 400 }}>
                <ClimberSprite gait={gait} phase={phase} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summit */}
      <AnimatePresence>
        {summit && (
          <motion.div key="summit" className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.25 } }}>
            <motion.span
              className="absolute left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
              style={{ top: APEX_Y, background: rgba(t.accentRgb, 0.3) }}
              animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <SummitBurst />
            <motion.div
              className="absolute left-1/2"
              style={{ top: APEX_Y - 44, x: "-50%" }}
              initial={{ opacity: 0, y: 14, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <TelescopeFigure />
            </motion.div>
            <motion.p
              className="absolute font-mono text-[10px] leading-[14px] tracking-[0.14em]"
              style={{
                top: TRACK_TOP + 14,
                left: "calc(50% + 7px)",
                maxHeight: `calc(100vh - ${TRACK_TOP + 80}px)`,
                writingMode: "vertical-lr",
                color: t.accent,
                textShadow: `0 0 10px ${rgba(t.accentRgb, 0.45)}`,
              }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            >
              {SUMMIT_TEXT}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Below lg: a thin bar pinned to the top of the viewport that she traverses left → right. */
function MobileTrack({ smoothProgress, phase, gait }) {
  const t = useT();
  // Translate % is relative to the lane, which is inset by the sprite width so she never clips the edge.
  const x = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const summit = useThreshold(smoothProgress, CLIMBER.mobileSummitAt);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-40 h-12 overflow-hidden lg:hidden">
      <div className={`relative h-1 w-full ${t.track} ${THEME_T}`}>
        <motion.div
          className="absolute inset-0"
          style={{
            scaleX: smoothProgress,
            originX: 0,
            background: `linear-gradient(90deg, ${t.accent}, ${t.indigo})`,
            boxShadow: `0 0 10px ${rgba(t.accentRgb, 0.6)}`,
          }}
        />
      </div>

      <div className="absolute left-1 top-0 h-full" style={{ width: `calc(100% - ${MOBILE_SPRITE_W + 8}px)` }}>
        <motion.div className="absolute inset-0" style={{ x }}>
          <AnimatePresence mode="wait" initial={false}>
            {summit ? (
              <motion.div
                key="telescope"
                className="absolute left-0 top-1.5"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="h-[27px] w-[29px]">
                  <div className="origin-top-left scale-[0.6]">
                    <TelescopeFigure />
                  </div>
                </div>
                <span className="absolute left-0 top-[26px] h-[2px] w-[30px] rounded-full" style={{ background: t.accent, boxShadow: `0 0 6px ${t.accent}` }} />
              </motion.div>
            ) : (
              <motion.div
                key="traverse"
                className="absolute left-0 top-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                style={{ width: MOBILE_SPRITE_W, perspective: 400 }}
              >
                <div className="origin-top-left scale-[0.66]">
                  <ClimberSprite gait={gait} phase={phase} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Backdrop                                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

function Backdrop() {
  const t = useT();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 25%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 25%, transparent 80%)",
        }}
      />
      <div
        className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full blur-[140px] transition-colors duration-500"
        style={{ background: rgba(t.accentRgb, t.glowAlpha) }}
      />
      <div
        className="absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full blur-[150px] transition-colors duration-500"
        style={{ background: rgba(t.indigoRgb, t.glowAlpha) }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Page                                                                      */
/* ────────────────────────────────────────────────────────────────────────── */

export default function Portfolio() {
  const [mode, toggleMode] = useThemeMode();
  const t = THEMES[mode];
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const activeProject = PROJECTS.find((p) => p.id === activeId);
  const pageRef = useRef(null);

  return (
    <ThemeContext.Provider value={t}>
      <MotionConfig reducedMotion="user">
        <div ref={pageRef} className={`relative min-h-screen overflow-x-clip font-sans antialiased ${t.canvas} ${THEME_T}`}>
          <Backdrop />
          <ScrollClimber targetRef={pageRef} />

          <main className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-12 px-6 py-12 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <Header mode={mode} onToggleTheme={toggleMode} />
            </div>

            <aside className="lg:sticky lg:top-12 lg:col-span-5 lg:col-start-8 lg:row-span-5 lg:row-start-1">
              <DeviceStage project={activeProject} />
            </aside>

            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
              <ProjectMatrix activeId={activeId} onSelect={setActiveId} />
            </div>

            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-3">
              <ExperienceSection />
            </div>

            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-4">
              <SkillGrid />
            </div>

            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-5">
              <ContactPanel />
              <footer className={`mt-10 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] ${t.muted} ${THEME_T}`}>
                <span>
                  © {new Date().getFullYear()} {PROFILE.name}
                </span>
                <span>React · Tailwind CSS · Framer Motion</span>
              </footer>
            </div>
          </main>
        </div>
      </MotionConfig>
    </ThemeContext.Provider>
  );
}
