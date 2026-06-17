import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BedDouble,
  CheckCircle2,
  Droplet,
  Flower2,
  HeartPulse,
  Leaf,
  Moon,
  ShieldCheck,
  Smile,
  Sparkles,
  Sun,
  UserCheck,
  AlertTriangle,
  Repeat,
  Clock3,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-skincare.jpg";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardHoverVariants = {
  rest: { y: 0, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" },
  hover: {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const detailVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const categories = [
  {
    id: "morning",
    title: "Morning Skincare Routine",
    icon: Sun,
    description: "Begin each day with calm, clean, protective skincare.",
    accent: "from-[#EAF7F1] to-[#E0F1EA]",
  },
  {
    id: "night",
    title: "Night Skincare Routine",
    icon: Moon,
    description: "Restore and recharge your skin while you sleep.",
    accent: "from-[#F9EFF5] to-[#F4E7F0]",
  },
  {
    id: "dry",
    title: "Dry Skin Care Tips",
    icon: Droplet,
    description: "Hydrate, soothe, and seal to keep dryness away.",
    accent: "from-[#F8F1EC] to-[#F4E7D8]",
  },
  {
    id: "oily",
    title: "Oily Skin Care Tips",
    icon: Leaf,
    description: "Balance excess shine without stripping or stressing skin.",
    accent: "from-[#EFF8F6] to-[#DFF3EE]",
  },
  {
    id: "sensitive",
    title: "Sensitive Skin Care Tips",
    icon: Flower2,
    description: "Choose gentle rituals that respect sensitive skin.",
    accent: "from-[#FFF4F6] to-[#F8E8ED]",
  },
  {
    id: "acne",
    title: "Acne Prevention Tips",
    icon: Sparkles,
    description: "Improve clarity with smart habits and targeted care.",
    accent: "from-[#F5F8FF] to-[#E6EEFB]",
  },
  {
    id: "habits",
    title: "Healthy Skin Habits",
    icon: HeartPulse,
    description: "Small daily choices with high-impact skincare benefits.",
    accent: "from-[#F2F9F4] to-[#E8F4EB]",
  },
  {
    id: "relaxation",
    title: "Facial Relaxation Exercises",
    icon: Smile,
    description: "Gentle face exercises to ease tension and boost radiance.",
    accent: "from-[#F7F1FF] to-[#EFE5FB]",
  },
];

const details: Record<
  string,
  {
    title: string;
    subtitle: string;
    mustDos: string[];
    avoid: string[];
  }
> = {
  morning: {
    title: "Morning Skincare Routine",
    subtitle: "Start your day with hydration and protection for a fresh glow.",
    mustDos: [
      "Cleanse with a gentle foam or balm",
      "Apply a lightweight moisturizer",
      "Use broad-spectrum sunscreen",
      "Refresh with a mist or hydrating toner",
    ],
    avoid: ["Skipping sunscreen", "Using overly harsh toners", "Overloading on products"],
  },
  night: {
    title: "Night Skincare Routine",
    subtitle: "Let your skin repair naturally with calming evening care.",
    mustDos: [
      "Remove makeup and impurities",
      "Use a nourishing cleanser",
      "Apply serum or treatment",
      "Lock in moisture before bed",
    ],
    avoid: ["Sleeping with makeup", "Using strong exfoliants nightly", "Neglecting moisturizer"],
  },
  dry: {
    title: "Dry Skin Care Tips",
    subtitle: "Simple habits to maintain moisture and protect your skin.",
    mustDos: [
      "Use gentle face cleansing",
      "Keep your skin moisturized",
      "Avoid hot water",
      "Protect skin from weather",
    ],
    avoid: ["Harsh scrubbing", "Over-washing your face", "Sleeping with makeup"],
  },
  oily: {
    title: "Oily Skin Care Tips",
    subtitle: "Keep shine balanced while preserving your skin barrier.",
    mustDos: [
      "Cleanse twice daily with a mild gel cleanser",
      "Use oil-free moisturizer",
      "Apply sunscreen made for oily skin",
      "Use gentle exfoliation once or twice a week",
    ],
    avoid: ["Skipping moisturizer", "Heavy creams", "Squeezing blemishes"],
  },
  sensitive: {
    title: "Sensitive Skin Care Tips",
    subtitle: "Reduce irritation with nourishing, low-reactivity care.",
    mustDos: [
      "Choose fragrance-free formulas",
      "Pat your skin dry gently",
      "Use calming serums",
      "Protect skin from sun and wind",
    ],
    avoid: ["Strong acids", "Fragrance-heavy products", "Too many active ingredients"],
  },
  acne: {
    title: "Acne Prevention Tips",
    subtitle: "Build a routine that supports clear, healthy skin.",
    mustDos: [
      "Cleanse gently morning and night",
      "Use acne-safe moisturizers",
      "Incorporate calming treatments",
      "Keep makeup brushes clean",
    ],
    avoid: ["Touching blemishes", "Sleeping in makeup", "Skipping sunscreen"],
  },
  habits: {
    title: "Healthy Skin Habits",
    subtitle: "Daily lifestyle choices that support your best skin.",
    mustDos: [
      "Drink enough water",
      "Sleep at least 7 hours",
      "Wash pillowcases regularly",
      "Manage stress with rest", 
    ],
    avoid: ["Touching your face", "Skipping cleansing", "Poor hydration"],
  },
  relaxation: {
    title: "Facial Relaxation Exercises",
    subtitle: "Gentle movement to relieve tension and refresh your skin.",
    mustDos: [
      "Massage your jawline softly",
      "Practice deep, calming breaths",
      "Lift your cheek muscles gently",
      "Finish with a cooling facial touch",
    ],
    avoid: ["Pushing too hard", "Using nails on skin", "Skipping hydration after massage"],
  },
};

const routines = [
  {
    title: "Morning",
    color: "bg-emerald-50 text-emerald-700",
    steps: [
      "Clean face gently",
      "Moisturize",
      "Apply sunscreen",
    ],
  },
  {
    title: "Night",
    color: "bg-slate-50 text-slate-700",
    steps: [
      "Remove dirt/makeup",
      "Clean face",
      "Moisturize",
      "Sleep properly",
    ],
  },
];

const lifestyle = [
  { title: "Drink enough water", icon: Droplet },
  { title: "Sleep well", icon: BedDouble },
  { title: "Clean pillowcases", icon: Repeat },
  { title: "Avoid touching face", icon: UserCheck },
  { title: "Manage stress", icon: HeartPulse },
  { title: "Maintain hygiene", icon: ShieldCheck },
];

const SkincareTips = () => {
  const [activeCategory, setActiveCategory] = useState("dry");

  const activeDetail = useMemo(() => details[activeCategory], [activeCategory]);

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    document.getElementById("detail-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-[#FDFDFB] to-[#F3F7F3] px-4 py-20 md:py-28">
        <motion.div
          className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(189,227,210,0.4),_transparent_55%)]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="container mx-auto relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 max-w-2xl"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-soft"
              >
                Premium AI skincare guidance
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
              >
                Healthy Skin Starts With Good Habits
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
              >
                Discover routines and lifestyle habits designed to nurture your skin daily. Our advisor combines expert skincare guidance with a premium, clinical aesthetic.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                    className="rounded-full bg-primary text-primary-foreground shadow-soft shadow-primary/20 hover:bg-primary/95"
                  >
                    Explore Tips
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" className="rounded-full border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50">
                    View Daily Routine
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                  className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur-xl"
                >
                  <p className="text-sm font-medium text-slate-500">Trusted by dermatology enthusiasts</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Clinically-inspired skincare steps</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                  className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur-xl"
                >
                  <p className="text-sm font-medium text-slate-500">Tailored for every skin journey</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Personalized habits + routines</p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_30px_80px_rgba(103,116,129,0.12)] backdrop-blur-xl"
            >
              <motion.div
                className="absolute inset-x-6 top-6 h-20 rounded-3xl bg-gradient-to-r from-[#FEF7F5] to-[#F4F4FF] blur-2xl opacity-70"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.img
                src={heroImage}
                alt="Skincare routine"
                className="relative h-[420px] w-full rounded-[1.75rem] object-cover shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 grid gap-4 sm:grid-cols-2"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Daily glow</p>
                  <p className="mt-2 text-sm text-slate-700">Lightweight routines that feel luxurious every morning.</p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Dermatologist-inspired</p>
                  <p className="mt-2 text-sm text-slate-700">Evidence-backed tips for balanced, healthy skin.</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="categories" className="container mx-auto px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500"
          >
            Skincare Tips & Daily Routines
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Explore categories crafted for your skin type and lifestyle.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-xl text-base leading-8 text-slate-600"
          >
            Every routine is designed to feel effortless, elegant, and supportive of long-term skin health.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                type="button"
                onClick={() => handleCategorySelect(category.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)" }}
                className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-6 text-left shadow-soft transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 backdrop-blur-sm`}
              >
                <motion.div
                  className={`absolute inset-x-0 top-0 h-28 rounded-[2rem] bg-gradient-to-br ${category.accent} opacity-70`}
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileHover={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ originY: 0 }}
                />
                <div className="relative z-10 space-y-5">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/90 text-primary shadow-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{category.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{category.description}</p>
                  </div>
                  <motion.div
                    className="mt-2 flex items-center gap-2 text-sm font-medium text-primary"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Read More</span>
                    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </div>
                <motion.div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-primary via-secondary to-[#D0F3E8]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.button>
            );
          })}
        </div>
      </section>

      <section id="detail-section" className="container mx-auto px-4 pb-16 sm:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={detailVariants}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-soft backdrop-blur-xl"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-sm text-slate-500"
              >
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Expert-backed guidance</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-3xl font-semibold text-slate-900"
              >
                {activeDetail.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 max-w-2xl text-base leading-8 text-slate-600"
              >
                {activeDetail.subtitle}
              </motion.p>

              <motion.div
                className="mt-10 grid gap-6 md:grid-cols-2"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div className="rounded-[1.75rem] bg-emerald-50/80 p-6 shadow-sm ring-1 ring-emerald-100">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 text-emerald-700"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Things You Should Do</h3>
                  </motion.div>
                  <motion.ul
                    className="mt-6 grid gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {activeDetail.mustDos.map((item) => (
                      <motion.li
                        key={item}
                        variants={itemVariants}
                        className="flex items-start gap-3 text-sm leading-7 text-slate-700 group"
                      >
                        <motion.span
                          className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.4 }}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </motion.span>
                        <motion.span
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item}
                        </motion.span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>

                <motion.div className="rounded-[1.75rem] bg-rose-50/80 p-6 shadow-sm ring-1 ring-rose-100">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-3 text-rose-700"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Things To Avoid</h3>
                  </motion.div>
                  <motion.ul
                    className="mt-6 grid gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {activeDetail.avoid.map((item) => (
                      <motion.li
                        key={item}
                        variants={itemVariants}
                        className="flex items-start gap-3 text-sm leading-7 text-slate-700 group"
                      >
                        <motion.span
                          className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white shadow-sm flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: -360 }}
                          transition={{ duration: 0.4 }}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </motion.span>
                        <motion.span
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item}
                        </motion.span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-soft backdrop-blur-xl"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-sm text-slate-500"
              >
                <Clock3 className="h-5 w-5 text-secondary" />
                <span>Daily Routine Timeline</span>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-2xl font-semibold text-slate-900"
              >
                Consistent steps for glowing skin
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-3 text-sm leading-7 text-slate-600"
              >
                A simple, elegant ritual for mornings and evenings that supports your skin barrier and confidence.
              </motion.p>

              <motion.div
                className="mt-8 space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {routines.map((routine, idx) => (
                  <motion.div
                    key={routine.title}
                    variants={itemVariants}
                    className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-6 shadow-sm overflow-hidden"
                    whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${routine.color}`}
                    >
                      {routine.title}
                    </motion.div>
                    <motion.div
                      className="mt-6 space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {routine.steps.map((step, stepIdx) => (
                        <motion.div
                          key={step}
                          variants={itemVariants}
                          className="flex items-start gap-4 group"
                          whileHover={{ x: 4 }}
                        >
                          <motion.div
                            className="mt-1 flex h-10 w-10 items-center justify-center rounded-3xl bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 flex-shrink-0"
                            whileHover={{ scale: 1.15, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <span className="font-semibold text-sm">{stepIdx + 1}</span>
                          </motion.div>
                          <motion.p
                            className="text-sm leading-7 text-slate-700"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {step}
                          </motion.p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500"
          >
            Healthy Skin Lifestyle
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Support your skincare with everyday wellness.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-xl text-base leading-8 text-slate-600"
          >
            Routine care is most effective when paired with mindful habits that protect skin from the inside out.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {lifestyle.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-soft backdrop-blur-xl group"
              >
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-sm"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <motion.h3
                  className="mt-5 text-lg font-semibold text-slate-900"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="mt-3 text-sm leading-7 text-slate-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                >
                  Keep this habit consistent for a healthier-looking skin glow.
                </motion.p>

                {/* Animated underline on hover */}
                <motion.div
                  className="mt-4 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
};

export default SkincareTips;
