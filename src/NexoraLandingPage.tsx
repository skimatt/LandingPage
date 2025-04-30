import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Menu,
  X,
  Instagram,
  ChevronRight,
  Monitor,
  Database,
  Brain,
  Sparkles,
  MessageSquare,
  Shield,
  Plus,
  Lightbulb,
  Mic,
  Send,
  Zap,
  Code,
  Cpu,
} from "lucide-react";
import ParticlesBg from "particles-bg";
import debounce from "lodash/debounce";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const avatarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const NexoraLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    about: false,
    testimonials: false,
    cta: false,
  });
  const [activeSection, setActiveSection] = useState("hero");

  // Refs for sections
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // Scroll Hook for Parallax
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(heroScroll, [0, 1], [0, -50]);
  const yDescription = useTransform(heroScroll, [0, 1], [0, -30]);
  const yButton = useTransform(heroScroll, [0, 1], [0, -20]);

  const { scrollYProgress: featuresScroll } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"],
  });
  const featuresBg = useTransform(
    featuresScroll,
    [0, 1],
    ["rgba(17, 24, 39, 0.9)", "rgba(59, 130, 246, 0.2)"]
  );

  // Debounced Scroll Handler
  const handleScroll = debounce(() => {
    const currentScrollY = window.scrollY;
    setScrollPosition(currentScrollY);
    if (isMenuOpen) setIsMenuOpen(false);

    const sections = [
      { id: "hero", ref: heroRef },
      { id: "features", ref: featuresRef },
      { id: "about", ref: aboutRef },
      { id: "testimonials", ref: testimonialsRef },
      { id: "cta", ref: ctaRef },
    ];

    for (const section of sections) {
      if (!section.ref.current) continue;
      const rect = section.ref.current.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        setActiveSection(section.id);
        break;
      }
    }
  }, 50);

  // Scroll and Intersection Observer
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [isMenuOpen, handleScroll]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "-50px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id && entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    const sections = [
      { id: "hero", ref: heroRef },
      { id: "features", ref: featuresRef },
      { id: "about", ref: aboutRef },
      { id: "testimonials", ref: testimonialsRef },
      { id: "cta", ref: ctaRef },
    ];

    sections.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) observer.unobserve(section.ref.current);
      });
    };
  }, []);

  const navLinks = [
    { href: "#hero", label: "Beranda" },
    { href: "#features", label: "Fitur" },
    { href: "#about", label: "Tentang" },
    { href: "#testimonials", label: "Testimoni" },
  ];

  const features = [
    {
      icon: <Brain className="text-blue-400" />,
      title: "Pemrosesan Bahasa Alami",
      description: "Memahami bahasa manusia untuk komunikasi yang lebih baik.",
    },
    {
      icon: <Database className="text-purple-400" />,
      title: "Basis Pengetahuan",
      description: "Akses informasi luas untuk jawaban yang relevan.",
    },
    {
      icon: <Monitor className="text-green-400" />,
      title: "Antarmuka Intuitif",
      description: "Desain yang ramah pengguna untuk interaksi yang mudah.",
    },
    {
      icon: <MessageSquare className="text-yellow-400" />,
      title: "Percakapan Natural",
      description: "Berbincang dengan AI yang memahami konteks.",
    },
    {
      icon: <Sparkles className="text-pink-400" />,
      title: "Asisten Kreatif",
      description: "Mendukung penulisan dan ide-ide kreatif.",
    },
    {
      icon: <Shield className="text-red-400" />,
      title: "Keamanan Data",
      description: "Melindungi data Anda dengan teknologi terkini.",
    },
    {
      icon: <Zap className="text-yellow-400" />,
      title: "Respons Cepat",
      description: "Dapatkan jawaban instan untuk pertanyaan Anda.",
    },
    {
      icon: <Code className="text-blue-400" />,
      title: "Dukungan Coding",
      description: "Bantu untuk menulis dan memahami kode program.",
    },
    {
      icon: <Cpu className="text-purple-400" />,
      title: "Pembelajaran Mesin",
      description: "Memanfaatkan teknologi machine learning terkini.",
    },
  ];

  const testimonials = [
    {
      name: "Nurul Iman",
      role: "Mahasiswa",
      quote:
        "Nexora AI sangat membantu untuk tugas kuliah saya! Kemampuannya dalam memahami konteks pertanyaan sungguh menakjubkan.",
      avatar: "N",
    },
    {
      name: "Muhammad Azhiv",
      role: "Desainer Grafis",
      quote:
        "Inspirasi desain jadi lebih mudah dengan Nexora. Saya selalu menemukan ide kreatif baru setiap kali menggunakannya.",
      avatar: "M",
    },
    {
      name: "Siti Rahma",
      role: "Content Creator",
      quote:
        "Efisiensi kerja saya meningkat drastis sejak menggunakan Nexora AI. Sangat direkomendasikan untuk semua content creator!",
      avatar: "S",
    },
    {
      name: "Budi Santoso",
      role: "Pengusaha",
      quote:
        "Nexora membantu bisnis saya berkembang dengan memberikan insight berharga. Teknologi AI yang benar-benar bermanfaat.",
      avatar: "B",
    },
  ];

  const suggestions = [
    "Apa itu Nexora AI?",
    "Bagaimana cara kerja AI ini?",
    "Bisa bantu buat ide kreatif?",
    "Apa fitur unggulan Nexora?",
    "Ceritakan tentang machine learning",
    "Buatkan saya puisi tentang teknologi",
  ];

  const handleSuggestionClick = (suggestion) => {
    setChatInput(suggestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      window.open("https://nexora2-5.vercel.app/", "_blank");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative overflow-hidden">
      {/* Particle Background */}
      <ParticlesBg
        type="cobweb"
        bg={{ position: "absolute", zIndex: 0 }}
        num={30} // Reduced particle count
        color="#ffffff"
      />
      {/* Animated Stars */}
      <div className="fixed inset-0 z-0">
        {Array(50) // Reduced star count
          .fill(0)
          .map((_, i) => {
            const size = Math.random() * 2;
            const animationDuration = 3 + Math.random() * 7;
            const opacity = Math.random() * 0.7;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: size,
                  height: size,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity,
                  willChange: "opacity, transform",
                }}
                animate={{
                  opacity: [opacity, opacity * 0.5, opacity],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: animationDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: scrollPosition > 20 ? 0.8 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollPosition > 20
            ? "bg-gray-900/80 backdrop-blur-md py-2 shadow-lg shadow-blue-500/10"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center group"
            >
              <a
                href="#hero"
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              >
                Nexora AI
              </a>
              <motion.div
                className="ml-2 h-2 w-2 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            <div className="hidden md:flex ml-10 space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ y: -2, color: "#60a5fa" }}
                  className={`relative px-2 py-1 text-gray-300 transition-colors duration-300 ${
                    activeSection === link.href.substring(1) ? "text-white" : ""
                  }`}
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: activeSection === link.href.substring(1) ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <motion.a
                href="https://nexora2-5.vercel.app/"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Coba Sekarang
                  <ChevronRight size={16} className="ml-1" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white focus:outline-none"
                aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
            >
              <div className="px-4 space-y-3 py-3">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className={`block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 ${
                      activeSection === link.href.substring(1)
                        ? "bg-blue-900/20 text-blue-300 border-l-2 border-blue-400"
                        : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="https://nexora2-5.vercel.app/"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  className="block px-3 py-2 text-white bg-gradient-to-r from-blue-500/90 to-purple-500/90 rounded-lg mt-2 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Coba Sekarang
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={heroRef}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible.hero ? "visible" : "hidden"}
        className="pt-28 pb-20 md:pt-40 md:pb-32 relative"
        style={{ position: "relative" }}
      >
        <motion.div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              style={{ y: yTitle }}
              variants={textRevealVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            >
              Nexora AI
            </motion.h1>
            <motion.p
              style={{ y: yDescription }}
              variants={textRevealVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Solusi AI inovatif untuk bekerja lebih cerdas dan berkreasi lebih
              mudah.
            </motion.p>
            <motion.div
              style={{ y: yButton }}
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
            >
              <motion.a
                href="https://nexora2-5.vercel.app/"
                target="_blank"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(96, 165, 250, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-lg inline-flex items-center justify-center relative overflow-hidden"
              >
                <span className="relative z-10">Coba Sekarang</span>
                <ChevronRight size={20} className="ml-2 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="mt-16 max-w-3xl mx-auto"
            >
              <motion.div
                className="relative h-12 mb-6 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <motion.div
                  className="absolute w-full flex space-x-3"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[...suggestions, ...suggestions].map((suggestion, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex-shrink-0 px-4 py-2 bg-gray-800/50 rounded-full text-gray-300 hover:text-white cursor-pointer border border-gray-700 hover:border-blue-500 transition-all"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700 backdrop-blur-md shadow-xl shadow-blue-900/10"
                whileHover={{ borderColor: "rgba(96, 165, 250, 0.5)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col space-y-4">
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      N
                    </div>
                    <div className="ml-3 bg-gray-700/50 rounded-2xl rounded-tl-none py-2 px-4 max-w-md">
                      <p className="text-white">
                        Halo! Saya Nexora AI. Ada yang bisa saya bantu hari ini?
                      </p>
                    </div>
                  </motion.div>
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center space-x-3 bg-gray-700/30 rounded-xl p-2 border border-gray-700"
                  >
                    <div className="flex items-center space-x-2">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        <Plus size={20} />
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        <Lightbulb size={20} />
                      </motion.button>
                    </div>
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Tanyakan apa saja"
                      className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 py-2"
                    />
                    <div className="flex items-center space-x-2">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        <Mic size={20} />
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.2 }}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        <Send size={20} />
                      </motion.button>
                    </div>
                  </form>
                  <p className="text-gray-500 text-sm text-center">
                    Nexora dapat membuat kesalahan. Periksa info penting.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        ref={featuresRef}
        style={{ background: featuresBg, position: "relative" }}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible.features ? "visible" : "hidden"}
        className="py-24 relative"
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-blue-900/10 to-gray-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={textRevealVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Fitur Unggulan Nexora AI
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Temukan kemampuan Nexora AI yang memudahkan hidup Anda.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 20px rgba(96, 165, 250, 0.3)",
                }}
                className="bg-gray-800/20 p-6 rounded-xl border border-gray-700 backdrop-blur-sm relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  variants={iconVariants}
                  whileHover={{ scale: 1.2 }}
                  className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-4 relative z-10"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-300 relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        ref={aboutRef}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible.about ? "visible" : "hidden"}
        className="py-24 relative"
        style={{ position: "relative" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/5 to-gray-900 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={containerVariants}>
              <motion.h2
                variants={textRevealVariants}
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              >
                Tentang Nexora AI
              </motion.h2>
              {[
                "Nexora AI adalah proyek kecerdasan buatan oleh Rahmat Mulia, seorang mahasiswa yang bersemangat membawa teknologi AI ke kehidupan sehari-hari.",
                "Masih dalam pengembangan, Nexora AI dirancang untuk menjadi alat yang membantu dan mudah digunakan untuk semua pengguna.",
                "Kami terus meningkatkan Nexora untuk memberikan dampak positif melalui teknologi AI inovatif.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  variants={textRevealVariants}
                  className="text-lg text-gray-300 mb-6"
                >
                  {text}
                </motion.p>
              ))}
              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <motion.div
                  className="flex items-center space-x-2 bg-blue-900/20 px-4 py-2 rounded-full border border-blue-800/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span>Berbasis Teknologi AI Modern</span>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-2 bg-purple-900/20 px-4 py-2 rounded-full border border-purple-800/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-3 h-3 bg-purple-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span>Dikembangkan di Indonesia</span>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur opacity-70"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative bg-gray-800/40 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm">
                <motion.div
                  className="aspect-w-16 aspect-h-9 mb-8"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.div
                    className="w-full h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(96, 165, 250, 0.5)",
                    }}
                  >
                    <span className="text-6xl font-bold text-white tracking-wider">
                      Nexora
                    </span>
                  </motion.div>
                </motion.div>
                <div className="space-y-4">
                  {[
                    "Dibuat oleh Mahasiswa untuk Dunia",
                    "Berbasis Teknologi AI Modern",
                    "Masih Terus Dikembangkan",
                    "Fokus pada Kemudahan Pengguna",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <p className="ml-3 text-gray-300">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        ref={testimonialsRef}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible.testimonials ? "visible" : "hidden"}
        className="py-24 relative"
        style={{ position: "relative" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-blue-900/10 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={textRevealVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Apa Kata Pengguna
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Dengar pendapat dari mereka yang telah mencoba Nexora AI.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 20px rgba(96, 165, 250, 0.3)",
                }}
                className="bg-gray-800/20 p-6 rounded-xl border border-gray-700 backdrop-blur-sm relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="flex items-start relative z-10">
                  <motion.div
                    variants={avatarVariants}
                    className="flex-shrink-0"
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.avatar}
                    </div>
                  </motion.div>
                  <div className="ml-4">
                    <div className="flex items-center mb-1">
                      <h4 className="text-lg font-medium">
                        {testimonial.name}
                      </h4>
                      <div className="ml-2 flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <motion.svg
                              key={i}
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              whileHover={{ scale: 1.2 }}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                          ))}
                      </div>
                    </div>
                    <p className="text-gray-400">{testimonial.role}</p>
                    <p className="text-gray-300 mt-2">{testimonial.quote}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        id="cta"
        ref={ctaRef}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible.cta ? "visible" : "hidden"}
        className="py-24 bg-gradient-to-b from-gray-900 to-blue-900/20 relative"
        style={{ position: "relative" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="bg-gray-800/30 rounded-2xl p-8 md:p-12 border border-gray-700 backdrop-blur-sm sticky top-20"
            variants={itemVariants}
          >
            <div className="text-center">
              <motion.h2
                variants={textRevealVariants}
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              >
                Coba Nexora AI Sekarang
              </motion.h2>
              <motion.p
                variants={textRevealVariants}
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Rasakan bagaimana Nexora AI membantu Anda belajar, bekerja, dan
                berkreasi.
              </motion.p>
              <motion.a
                href="https://nexora2-5.vercel.app/"
                target="_blank"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(96, 165, 250, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-lg inline-flex items-center justify-center relative overflow-hidden"
              >
                <span className="relative z-10">Coba Sekarang</span>
                <ChevronRight size={20} className="ml-2 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>
            {/* Floating Particles */}
            {Array(5) // Reduced particle count
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-400/50"
                  style={{
                    width: 5 + Math.random() * 5,
                    height: 5 + Math.random() * 5,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <div className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Nexora AI
              </div>
              <p className="text-gray-400 mb-4">
                Kecerdasan buatan inovatif oleh Rahmat Mulia.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.instagram.com/skimatt_/"
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-400 hover:text-blue-400"
                  aria-label="Ikuti kami di Instagram"
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium mb-4">Produk</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Fitur
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium mb-4">Perusahaan</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Tentang
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/6282239434989?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20Anda"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Kontak
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
          <motion.div
            className="mt-12 pt-8 border-t border-gray-800 text-center"
            variants={itemVariants}
          >
            <p className="text-gray-400">
              © {new Date().getFullYear()} Nexora AI oleh Rahmat Mulia. Semua
              hak dilindungi.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default NexoraLandingPage;
