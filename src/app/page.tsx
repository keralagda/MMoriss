'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Star,
  Sparkles,
  Waves,
  UtensilsCrossed,
  Heart,
  Calendar,
  Users,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Send,
  Sun,
  Moon,
  Palmtree,
  Ship,
  Flower2,
  Mountain
} from 'lucide-react'

// Theme Toggle Component
function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  // Initialize theme - dark is default
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  // Handle mount and localStorage initialization
  useEffect(() => {
    // Initialize from localStorage - this is a valid pattern for SSR hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light') {
      document.documentElement.classList.add('light')
      setTheme('light')
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    } else {
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }
  }

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Toggle theme">
        <div className="theme-toggle-knob">
          <Moon className="h-4 w-4 text-primary-foreground" />
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-knob">
        {theme === 'dark' ? (
          <Moon className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Sun className="h-4 w-4 text-primary-foreground" />
        )}
      </div>
    </button>
  )
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Accommodations', href: '#accommodations' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Ayurveda', href: '#ayurveda' },
    { name: 'Dining', href: '#dining' },
    { name: 'Gallery', href: '#gallery' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'skeuo-panel py-2'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center shadow-lg">
                <Flower2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className={`font-serif text-xl sm:text-2xl font-semibold tracking-wide transition-colors duration-300 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  Munroe Morris
                </span>
                <p className={`text-xs tracking-widest uppercase ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/70'
                }`}>
                  Kerala · India
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                    isScrolled ? 'text-foreground' : 'text-white/90'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <Button className="skeuo-button px-6 py-2.5 font-medium tracking-wide">
                Book Your Stay
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 transition-colors duration-300 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 skeuo-panel lg:hidden pt-24"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                <Button className="skeuo-button px-8 py-3 font-medium tracking-wide">
                  Book Your Stay
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Hero Section
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/hero.png"
          alt="Munroe Morris Resort Kerala"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-6"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex items-center justify-center gap-2"
          >
            <Palmtree className="h-6 w-6 text-primary" />
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Welcome to God's Own Country
            </span>
            <Palmtree className="h-6 w-6 text-primary" />
          </motion.div>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-semibold leading-tight">
            Munroe Morris
          </h1>
          
          <p className="font-malayalam text-lg sm:text-xl text-primary mb-2">
            മുൻറോ മോറിസ് റിസോർട്ട്
          </p>
          
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-white/90 italic max-w-2xl mx-auto">
            Where Backwaters Meet Luxury
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm mt-4">
            <span className="flex items-center gap-1">
              <Ship className="h-4 w-4" /> Houseboats
            </span>
            <span className="text-primary">•</span>
            <span className="flex items-center gap-1">
              <Flower2 className="h-4 w-4" /> Ayurveda
            </span>
            <span className="text-primary">•</span>
            <span className="flex items-center gap-1">
              <Mountain className="h-4 w-4" /> Western Ghats
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              size="lg"
              className="skeuo-button px-8 py-6 text-lg tracking-wide"
            >
              Explore Kerala Paradise
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 rounded-xl text-lg tracking-wide"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Virtual Tour
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/70"
          >
            <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// About Section
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                Our Heritage
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                A Jewel in
                <span className="gold-metallic"> Kerala's Crown</span>
              </h2>
            </div>
            <div className="divider-gold w-24" />
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Nestled amidst the serene backwaters of Kerala, Munroe Morris 
                represents the perfect harmony of traditional Kerala architecture 
                and contemporary luxury. Our resort is named after Colonel John Munro, 
                whose legacy is intertwined with this beautiful land.
              </p>
              <p>
                Experience the warmth of Kerala hospitality, where every guest is 
                treated as family. From the moment you arrive, you'll be embraced 
                by the tranquil beauty of swaying coconut palms, pristine waters, 
                and the gentle rhythm of village life.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="skeuo-card p-4 text-center">
                <p className="font-serif text-3xl gold-metallic">25</p>
                <p className="text-xs text-muted-foreground mt-1">Luxury Villas</p>
              </div>
              <div className="skeuo-card p-4 text-center">
                <p className="font-serif text-3xl gold-metallic">500+</p>
                <p className="text-xs text-muted-foreground mt-1">Happy Guests</p>
              </div>
              <div className="skeuo-card p-4 text-center">
                <p className="font-serif text-3xl gold-metallic">4.9</p>
                <p className="text-xs text-muted-foreground mt-1">Rating ★</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="skeuo-card p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <img
                  src="/images/gallery-1.png"
                  alt="Munroe Morris Resort Kerala"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 skeuo-button p-6 animate-float">
              <p className="font-serif text-xl">Est. 2009</p>
              <p className="text-xs opacity-80 mt-1">Kerala, India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Accommodations Section
function AccommodationsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const accommodations = [
    {
      name: "Backwater Villa",
      malayalamName: "ബാക്ക്‌വാട്ടർ വില്ല",
      description: "Traditional Kerala architecture with modern amenities overlooking the serene backwaters",
      image: "/images/villa-1.png",
      price: "₹15,000",
      size: "120 m²",
      guests: 2,
      features: ["Private Deck", "Canoe Ride", "Sunset View"]
    },
    {
      name: "Coconut Grove Suite",
      malayalamName: "തെങ്ങ് തോപ്പ് സ്യൂട്ട്",
      description: "Nestled among swaying coconut palms with authentic Kerala decor",
      image: "/images/villa-2.png",
      price: "₹12,000",
      size: "95 m²",
      guests: 2,
      features: ["Garden View", "Outdoor Bath", "Bird Watching"]
    },
    {
      name: "Heritage Nalukettu",
      malayalamName: "ഹെറിറ്റേജ് നാലുകെട്ട്",
      description: "Traditional Kerala courtyard house with wooden architecture",
      image: "/images/villa-3.png",
      price: "₹18,000",
      size: "150 m²",
      guests: 4,
      features: ["Courtyard", "Wood Carvings", "Heritage Style"]
    }
  ]

  return (
    <section id="accommodations" className="py-24 lg:py-32 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            Accommodations
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mt-4 leading-tight">
            Your Home in
            <span className="gold-metallic"> Paradise</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            Each villa is designed to reflect Kerala's rich heritage while providing 
            modern comforts for an unforgettable stay.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((room, index) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="skeuo-card group overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/80 text-sm">Starting from</p>
                  <p className="font-serif text-2xl text-white">{room.price}<span className="text-sm">/night</span></p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                    {room.name}
                  </h3>
                  <p className="font-malayalam text-sm text-primary">{room.malayalamName}</p>
                </div>
                <p className="text-muted-foreground text-sm">{room.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 skeuo-inset text-muted-foreground rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="flex items-center gap-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BedDouble className="h-4 w-4" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{room.guests} Guests</span>
                  </div>
                </div>

                {/* Button */}
                <Button
                  variant="ghost"
                  className="w-full justify-between text-primary hover:text-primary hover:bg-primary/5 mt-2"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Experiences Section
function ExperiencesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      icon: <Ship className="h-8 w-8" />,
      title: "Houseboat Cruise",
      malayalamTitle: "ഹൗസ്ബോട്ട് ക്രൂസ്",
      description: "Drift through the enchanting backwaters on a traditional Kettuvallam houseboat",
      image: "/images/experience-1.png"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Ayurveda Wellness",
      malayalamTitle: "ആയുർവേദ വെൽനസ്",
      description: "Rejuvenate with authentic Ayurvedic treatments and therapies",
      image: "/images/spa.png"
    },
    {
      icon: <Mountain className="h-8 w-8" />,
      title: "Village Life Experience",
      malayalamTitle: "ഗ്രാമീണ ജീവിതം",
      description: "Immerse yourself in Kerala's rich culture and traditions",
      image: "/images/experience-3.png"
    }
  ]

  return (
    <section id="experiences" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            Kerala Experiences
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mt-4 leading-tight">
            Discover
            <span className="gold-metallic"> God's Own Country</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            From serene backwaters to ancient healing traditions, 
            experience the authentic soul of Kerala.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="skeuo-card group relative overflow-hidden"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-primary mb-3">{exp.icon}</div>
                  <h3 className="font-serif text-2xl">{exp.title}</h3>
                  <p className="font-malayalam text-xs text-primary/80">{exp.malayalamTitle}</p>
                  <p className="text-white/70 text-sm mt-2">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Ayurveda Section
function AyurvedaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="ayurveda" className="py-24 lg:py-32 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium flex items-center gap-2">
                <Flower2 className="h-4 w-4" />
                Ayurveda & Wellness
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                Ancient Healing,
                <span className="gold-metallic"> Modern Comfort</span>
              </h2>
              <p className="font-malayalam text-lg text-primary">ആയുർവേദം</p>
            </div>
            <div className="divider-gold w-24" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Kerala is the birthplace of Ayurveda, the 5000-year-old science of life. 
              Our wellness center offers authentic treatments passed down through generations, 
              using traditional herbs and oils sourced from Kerala's pristine forests.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="skeuo-card p-4">
                <h4 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <Flower2 className="h-5 w-5 text-primary" />
                  Panchakarma
                </h4>
                <p className="text-muted-foreground text-sm mt-1">
                  Complete detoxification program
                </p>
              </div>
              <div className="skeuo-card p-4">
                <h4 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Shirodhara
                </h4>
                <p className="text-muted-foreground text-sm mt-1">
                  Meditative oil therapy
                </p>
              </div>
              <div className="skeuo-card p-4">
                <h4 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Abhyanga
                </h4>
                <p className="text-muted-foreground text-sm mt-1">
                  Full body massage
                </p>
              </div>
              <div className="skeuo-card p-4">
                <h4 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <Waves className="h-5 w-5 text-primary" />
                  Nasyam
                </h4>
                <p className="text-muted-foreground text-sm mt-1">
                  Nasal treatment therapy
                </p>
              </div>
            </div>

            <Button
              className="skeuo-button px-8 py-6 text-lg tracking-wide mt-4"
            >
              Book Wellness Package
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="skeuo-card p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <img
                  src="/images/spa.png"
                  alt="Ayurveda Spa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 skeuo-button p-6 animate-pulse-glow">
              <p className="font-serif text-xl">Certified</p>
              <p className="text-xs opacity-80">Ayurveda Center</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Dining Section
function DiningSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="dining" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="skeuo-card p-2">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img
                  src="/images/dining.png"
                  alt="Kerala Cuisine"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-primary rounded-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary rounded-xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                Kerala Cuisine
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                Flavors of
                <span className="gold-metallic"> Kerala</span>
              </h2>
              <p className="font-malayalam text-lg text-primary">കേരള പാചകം</p>
            </div>
            <div className="divider-gold w-24" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Savor the authentic tastes of Kerala, from traditional Sadya served 
              on banana leaves to fresh Karimeen (Pearl Spot) caught from the backwaters. 
              Our chefs use recipes passed down through generations.
            </p>

            <div className="space-y-4 pt-4">
              <div className="skeuo-card flex items-start gap-4 p-4">
                <div className="skeuo-button p-3 rounded-xl">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-foreground">The Backwater Restaurant</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Traditional Kerala Sadya & Seafood specialties
                  </p>
                </div>
              </div>
              <div className="skeuo-card flex items-start gap-4 p-4">
                <div className="skeuo-button p-3 rounded-xl">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-foreground">Sunset Chai Lounge</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Fresh chai & local snacks with backwater views
                  </p>
                </div>
              </div>
              <div className="skeuo-card flex items-start gap-4 p-4">
                <div className="skeuo-button p-3 rounded-xl">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-foreground">Cooking Classes</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Learn to make authentic Kerala dishes
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="skeuo-button px-8 py-6 text-lg tracking-wide mt-4"
            >
              View Our Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Gallery Section
function GallerySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    { src: "/images/gallery-1.png", alt: "Resort Entrance" },
    { src: "/images/gallery-2.png", alt: "Evening Views" },
    { src: "/images/gallery-3.png", alt: "Private Dining" },
    { src: "/images/gallery-4.png", alt: "Aerial View" },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section id="gallery" className="py-24 lg:py-32 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            Gallery
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mt-4 leading-tight">
            Moments in
            <span className="gold-metallic"> Kerala</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="skeuo-card p-2 relative aspect-[21/9] overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover rounded-xl"
              />
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 skeuo-button p-3 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 skeuo-button p-3 rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`skeuo-card p-1 aspect-video overflow-hidden transition-all ${
                index === currentIndex ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                Get in Touch
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
                Plan Your
                <span className="gold-metallic"> Kerala Escape</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Our team is ready to help you plan an unforgettable Kerala experience. 
              We speak English, Malayalam, Hindi, and more.
            </p>

            <form className="space-y-4 pt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <Input 
                    placeholder="Your name" 
                    className="skeuo-input mt-1.5"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <Input 
                    placeholder="+91 XXXXX XXXXX" 
                    className="skeuo-input mt-1.5"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="skeuo-input mt-1.5"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Check-in</label>
                  <Input 
                    type="date" 
                    className="skeuo-input mt-1.5"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Check-out</label>
                  <Input 
                    type="date" 
                    className="skeuo-input mt-1.5"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea 
                  placeholder="Tell us about your dream Kerala vacation..." 
                  className="skeuo-input mt-1.5 min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                className="skeuo-button w-full py-6 text-lg tracking-wide"
              >
                Send Inquiry
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="skeuo-card p-8 space-y-6">
              <h3 className="font-serif text-2xl text-foreground">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Munroe Island, Kollam District<br />
                      Kerala 691502, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      +91 474 XXXXXXX<br />
                      +91 XXXXX XXXXX (WhatsApp)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      reservations@munroemorris.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Reception</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      24 Hours, 7 Days a Week
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="skeuo-card p-8 space-y-4">
              <h3 className="font-serif text-2xl text-foreground">Stay Connected</h3>
              <p className="text-muted-foreground text-sm">
                Subscribe for Kerala travel tips and exclusive offers.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  className="skeuo-input flex-1"
                />
                <Button className="skeuo-button px-4">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* How to Reach */}
            <div className="skeuo-card p-8">
              <h3 className="font-serif text-xl text-foreground mb-4">How to Reach</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✈</span> Trivandrum Airport: 90 km (2 hours)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">🚂</span> Kollam Railway Station: 25 km (45 min)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">🚗</span> Kochi Airport: 160 km (4 hours)
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="skeuo-panel py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                <Flower2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-foreground">Munroe Morris</h3>
                <p className="text-xs text-muted-foreground">Kerala, India</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the magic of Kerala's backwaters in luxury. 
              Your journey to God's Own Country begins here.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="skeuo-inset p-2 rounded-lg hover:bg-primary/20 transition-colors">
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="skeuo-inset p-2 rounded-lg hover:bg-primary/20 transition-colors">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="skeuo-inset p-2 rounded-lg hover:bg-primary/20 transition-colors">
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="skeuo-inset p-2 rounded-lg hover:bg-primary/20 transition-colors">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Accommodations', 'Ayurveda', 'Houseboats', 'Dining', 'Gallery'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Experiences</h4>
            <ul className="space-y-2">
              {['Backwater Cruise', 'Ayurveda Therapy', 'Village Tour', 'Kathakali Show', 'Cooking Class', 'Bird Watching'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Munroe Island, Kollam
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +91 474 XXXXXXX
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                info@munroemorris.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider-gold mt-12 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/50 text-sm">
            © 2024 Munroe Morris Resort. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground/50">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Helper function for useInView
function useInView(ref: React.RefObject<Element>, options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
      }
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, options])

  return isInView
}

// PlayCircle icon component
function PlayCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col leather-texture">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <AccommodationsSection />
      <ExperiencesSection />
      <AyurvedaSection />
      <DiningSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
