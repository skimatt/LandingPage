import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

const NexoraLandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Fitur" },
    { href: "#about", label: "Tentang" },
  ];

  const features = [
    {
      icon: <Brain size={24} />,
      title: "Pemrosesan Bahasa Alami",
      description:
        "Memahami bahasa manusia dengan lebih baik untuk membantu komunikasi dan menyelesaikan tugas.",
    },
    {
      icon: <Database size={24} />,
      title: "Basis Pengetahuan",
      description:
        "Mengakses informasi yang luas untuk memberikan jawaban yang membantu dan relevan.",
    },
    {
      icon: <Monitor size={24} />,
      title: "Antarmuka Intuitif",
      description:
        "Desain yang mudah digunakan, membuat interaksi dengan AI jadi lebih sederhana.",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Percakapan Natural",
      description:
        "Berbincang dengan AI yang bisa memahami konteks dan menjawab secara alami.",
    },
    {
      icon: <Sparkles size={24} />,
      title: "Asisten Kreatif",
      description:
        "Membantu dalam menulis, membuat ide, hingga mendukung proyek kreatif lainnya.",
    },
    {
      icon: <Shield size={24} />,
      title: "Keamanan Data",
      description:
        "Menjaga data dan interaksi Anda tetap aman dengan teknologi terkini.",
    },
  ];

  const testimonials = [
    {
      name: "Nurul Iman",
      role: "Mahasiswa",
      quote:
        "Nexora AI membantu saya memahami konsep sulit saat belajar. Sangat berguna untuk tugas kuliah.",
    },
    {
      name: "Muhammad Azhiv",
      role: "Desainer Grafis",
      quote:
        "AI ini cukup membantu saat saya butuh inspirasi untuk proyek desain. Mudah digunakan.",
    },
    {
      name: "Elon Musk",
      role: "Pengusaha",
      quote:
        "Proyek menarik dari seorang mahasiswa. Nexora punya potensi untuk berkembang lebih jauh.",
    },
  ];

  const suggestions = [
    "Apa itu Nexora AI?",
    "Bagaimana cara kerja AI ini?",
    "Bisa bantu buat ide kreatif?",
    "Apa fitur unggulan Nexora?",
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setChatInput(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      window.location.href = "https://nexora2-5.vercel.app/";
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-inter">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollPosition > 20
            ? "bg-black/95 backdrop-blur-md py-2"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <a href="/" className="text-2xl font-bold">
                Nexora AI
              </a>
            </motion.div>

            <div className="hidden md:flex ml-10 space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.a
                href="https://nexora2-5.vercel.app/"
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 rounded-full text-black bg-white hover:bg-gray-200 transition-colors font-medium"
              >
                Coba Sekarang
              </motion.a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
                aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-gray-300 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://nexora2-5.vercel.app/"
                  className="block px-3 py-2 text-white bg-white/10 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Coba Sekarang
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-28 pb-20 md:pt-40 md:pb-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1),_black)]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Nexora AI
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Nexora AI adalah solusi AI inovatif yang dirancang untuk membantu
              Anda bekerja lebih cerdas dan berkreasi lebih mudah.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
            >
              <motion.a
                href="https://nexora2-5.vercel.app/"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition-all font-medium text-lg inline-flex items-center justify-center"
              >
                Coba Sekarang <ChevronRight size={20} className="ml-2" />
              </motion.a>
            </motion.div>

            {/* Chat Input Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 max-w-3xl mx-auto"
            >
              {/* Suggestions Carousel */}
              <div className="overflow-hidden mb-4">
                <motion.div
                  className="flex space-x-4"
                  animate={{ x: ["0%", "-100%"] }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 15,
                      ease: "linear",
                    },
                  }}
                >
                  {[...suggestions, ...suggestions].map((suggestion, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex-shrink-0 px-4 py-2 bg-gray-800/50 rounded-full text-gray-300 hover:text-white cursor-pointer border border-gray-700 hover:border-white/50 transition-all"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Chat Input */}
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-white">
                    <Plus size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <Lightbulb size={20} />
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Tanyakan apa saja"
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                  />
                  <button className="text-gray-400 hover:text-white">
                    <Mic size={20} />
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="text-gray-400 hover:text-white"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2 text-center">
                  Nexora dapat membuat kesalahan. Periksa info penting.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fitur Unggulan Nexora AI
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Temukan berbagai kemampuan Nexora AI yang dirancang untuk
              mendukung kebutuhan Anda.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-white/50 transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-white/5 to-black z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tentang Nexora AI
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Nexora AI adalah proyek kecerdasan buatan yang sedang
                dikembangkan oleh Rahmat Mulia, seorang mahasiswa yang
                bersemangat untuk membawa teknologi AI ke kehidupan sehari-hari.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                Meskipun masih dalam tahap pengembangan, Nexora AI dirancang
                untuk menjadi alat yang membantu dan mudah digunakan, dengan
                fokus pada kebutuhan pengguna dari berbagai latar belakang.
              </p>
              <p className="text-lg text-gray-300">
                Kami terus bekerja untuk meningkatkan kemampuan Nexora, dengan
                harapan dapat memberikan dampak positif melalui teknologi AI
                yang inovatif.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-white/10 rounded-lg blur opacity-75" />
              <div className="relative bg-black p-6 rounded-lg border border-gray-800">
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <motion.div
                    className="w-full h-64 bg-white/10 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-6xl font-bold">Nexora</span>
                  </motion.div>
                </div>
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
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
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
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apa Kata Pengguna
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Dengar pendapat dari mereka yang telah mencoba Nexora AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/30 p-6 rounded-xl border border-gray-800"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    {/* Ikon orang SVG */}
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.121 17.804A9 9 0 0112 15c2.152 0 4.127.76 5.879 2.021M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-2xl p-8 md:p-12 border border-gray-800 backdrop-blur-sm"
          >
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Coba Nexora AI Sekarang
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Rasakan sendiri bagaimana Nexora AI dapat membantu Anda dalam
                belajar, bekerja, atau berkreasi.
              </p>
              <motion.a
                href="https://nexora2-5.vercel.app/"
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-full bg-white text-black hover:bg-gray-200 font-medium text-lg inline-flex items-center justify-center"
              >
                Coba Sekarang <ChevronRight size={20} className="ml-2" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">Nexora AI</div>
              <p className="text-gray-400 mb-4">
                Kecerdasan buatan inovatif diciptakan oleh Rahmat Mulia, seorang
                mahasiswa.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/skimatt_/"
                  className="text-gray-400 hover:text-white"
                  aria-label="Ikuti kami di Instagram"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Produk</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white"
                  >
                    Fitur
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Perusahaan</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    Tentang
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/6282239434989?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20Anda
"
                    className="text-gray-400 hover:text-white"
                  >
                    Kontak
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Nexora AI oleh Rahmat Mulia. Semua
              hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NexoraLandingPage;
