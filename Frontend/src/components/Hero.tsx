import { useEffect, useState } from "react";
import { Upload, Sparkles, Droplets, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import acneImg from "@/assets/acne.png";
import heroImg from "@/assets/dry.png";
import wrinklesImg from "@/assets/wrinkles.png";
import ProjectSummaryModal from "./ProjectSummaryModal";

const images = [
  acneImg,
  heroImg,
  wrinklesImg,
];

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const floatingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
    },
  }),
  floating: {
    y: [0, -15, 0],
    transition: {
      duration: 4 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleGetStartedClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      onGetStarted();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background to-accent">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 items-center gap-10 relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
          >
            <span className="mr-2">✨</span>
            AI-Powered Skin Analysis
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold leading-tight"
          >
            Your Smart
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Skincare Advisor
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg"
          >
            Upload your face image and get instant AI-powered skin analysis with personalized recommendations.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={handleGetStartedClick} className="flex gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
                <Upload size={18} /> Get Started
                <ArrowRight size={18} />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                onClick={() => setIsSummaryOpen(true)}
                className="border-slate-200 hover:bg-slate-50"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT PHONE MOCKUP */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >

          {/* Floating Cards */}
          <motion.div
            custom={0}
            variants={floatingVariants}
            initial="hidden"
            animate={["visible", "floating"]}
            className="absolute -left-6 top-10 bg-card shadow-lg p-3 rounded-xl w-40 border border-primary/10"
          >
            <motion.div
              className="flex items-center gap-2 text-sm"
              whileHover={{ x: 5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="text-primary" size={16} />
              </motion.div>
              AI detects acne instantly
            </motion.div>
          </motion.div>

          <motion.div
            custom={1}
            variants={floatingVariants}
            initial="hidden"
            animate={["visible", "floating"]}
            className="absolute -right-6 bottom-10 bg-card shadow-lg p-3 rounded-xl w-44 border border-primary/10"
          >
            <motion.div
              className="flex items-center gap-2 text-sm"
              whileHover={{ x: 5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Droplets className="text-primary" size={16} />
              </motion.div>
              Personalized skincare tips
            </motion.div>
          </motion.div>

          <motion.div
            custom={2}
            variants={floatingVariants}
            initial="hidden"
            animate={["visible", "floating"]}
            className="absolute top-0 right-10 bg-card shadow-lg p-3 rounded-xl w-40 border border-primary/10"
          >
            <motion.div
              className="flex items-center gap-2 text-sm"
              whileHover={{ x: 5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <ShieldCheck className="text-secondary" size={16} />
              </motion.div>
              Dermatology-level AI
            </motion.div>
          </motion.div>

          {/* PHONE */}
          <motion.div
            className="relative w-[280px] h-[560px] bg-black rounded-[40px] p-3 shadow-2xl"
            whileHover={{ y: -10, boxShadow: "0 50px 80px rgba(0, 0, 0, 0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >

            {/* Screen */}
            <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">

              <motion.img
                key={index}
                src={images[index]}
                alt="skin analysis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full h-full object-cover"
              />

              {/* Glow overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>

        </motion.div>
      </div>
      <ProjectSummaryModal isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} />
    </section>
  );
};
