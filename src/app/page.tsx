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
  Send
} from 'lucide-react'

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
    { name: 'Dining', href: '#dining' },
    { name: 'Spa', href: '#spa' },
    { name: 'Gallery', href: '#gallery' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <span className={`font-serif text-2xl sm:text-3xl font-semibold tracking-wide transition-colors duration-300 ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                Munroe Morris
              </span>
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

            {/* Book Now Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                className="btn-luxury bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-none font-medium tracking-wide transition-all duration-300"
              >
                Book Your Stay
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
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
              >
                <Button className="btn-luxury bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-none font-medium tracking-wide">
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
          alt="Munroe Morris Resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
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
          <p className="text-white/80 text-sm sm:text-base tracking-[0.3em] uppercase font-medium">
            Welcome to Paradise
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-semibold leading-tight">
            Munroe Morris
          </h1>
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-white/90 italic max-w-2xl mx-auto">
            Where Luxury Meets Nature
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              size="lg"
              className="btn-luxury bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-none text-lg tracking-wide"
            >
              Discover Our Resort
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white/50 text-white hover:bg-white/10 px-8 py-6 rounded-none text-lg tracking-wide"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Video
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
                Our Story
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                A Sanctuary of
                <span className="text-gold-gradient"> Elegance</span>
              </h2>
            </div>
            <div className="divider-gold w-24" />
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Nestled in the heart of a pristine tropical paradise, Munroe Morris 
                represents the pinnacle of luxury hospitality. Our resort is a harmonious 
                blend of traditional craftsmanship and contemporary elegance.
              </p>
              <p>
                Every detail has been thoughtfully curated to create an atmosphere of 
                refined sophistication. From the moment you arrive, you will be enveloped 
                in an ambiance of warmth, exclusivity, and unparalleled service.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-6">
              <div className="text-center">
                <p className="font-serif text-4xl text-primary">25</p>
                <p className="text-sm text-muted-foreground mt-1">Luxury Villas</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-4xl text-primary">15</p>
                <p className="text-sm text-muted-foreground mt-1">Years of Excellence</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-4xl text-primary">5</p>
                <p className="text-sm text-muted-foreground mt-1">Star Rating</p>
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
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/images/gallery-1.png"
                alt="Munroe Morris Resort"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-primary p-8 text-primary-foreground">
              <p className="font-serif text-2xl">Since 2009</p>
              <p className="text-sm opacity-80 mt-1">Creating Memories</p>
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
      name: "Overwater Villa",
      description: "Perched above crystal-clear waters with glass floor panels",
      image: "/images/villa-1.png",
      price: "$1,200",
      size: "120 m²",
      guests: 2,
      features: ["Private Pool", "Glass Floor", "Butler Service"]
    },
    {
      name: "Beachfront Bungalow",
      description: "Steps away from pristine white sand beaches",
      image: "/images/villa-2.png",
      price: "$890",
      size: "95 m²",
      guests: 2,
      features: ["Ocean View", "Outdoor Shower", "Garden"]
    },
    {
      name: "Garden Suite",
      description: "Surrounded by lush tropical vegetation",
      image: "/images/villa-3.png",
      price: "$650",
      size: "75 m²",
      guests: 2,
      features: ["Private Terrace", "Garden View", "Spa Bath"]
    }
  ]

  return (
    <section id="accommodations" className="py-24 lg:py-32 bg-muted/30">
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
            Your Private
            <span className="text-gold-gradient"> Paradise</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            Each of our villas and suites offers a unique blend of luxury and natural beauty,
            designed to provide an unforgettable experience.
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
              className="group bg-card border border-border overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
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
                <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                  {room.name}
                </h3>
                <p className="text-muted-foreground">{room.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 bg-muted text-muted-foreground"
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
      icon: <Waves className="h-8 w-8" />,
      title: "Sunset Sailing",
      description: "Cruise the turquoise waters as the sun paints the sky in golden hues",
      image: "/images/experience-1.png"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Snorkeling Adventure",
      description: "Discover vibrant coral reefs and exotic marine life",
      image: "/images/experience-2.png"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Wellness Retreat",
      description: "Find inner peace with beachside yoga and meditation",
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
            Experiences
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mt-4 leading-tight">
            Curated
            <span className="text-gold-gradient"> Moments</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            Immerse yourself in a world of unforgettable experiences, 
            each crafted to create lasting memories.
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
              className="group relative overflow-hidden"
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
                  <h3 className="font-serif text-2xl mb-2">{exp.title}</h3>
                  <p className="text-white/70 text-sm">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
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
    <section id="dining" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src="/images/dining.png"
                alt="Fine Dining"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 border border-primary" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-primary" />
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
                Culinary Excellence
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                A Journey for
                <span className="text-gold-gradient"> Your Palate</span>
              </h2>
            </div>
            <div className="divider-gold w-24" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our award-winning restaurants offer a symphony of flavors, blending local 
              ingredients with international culinary techniques. From beachside dining 
              to intimate private experiences, every meal is a celebration.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-foreground">The Ocean Terrace</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    International cuisine with panoramic ocean views
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-foreground">Sunset Bar</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Handcrafted cocktails and light bites by the beach
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-foreground">Private Dining</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Bespoke culinary experiences in exclusive settings
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="btn-luxury bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-none text-lg tracking-wide mt-4"
            >
              View Our Menus
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Spa Section
function SpaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="spa" className="py-24 lg:py-32 bg-background">
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
                Wellness & Spa
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                Restore Your
                <span className="text-gold-gradient"> Inner Balance</span>
              </h2>
            </div>
            <div className="divider-gold w-24" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our world-class spa offers a sanctuary of serenity, where ancient healing 
              traditions meet modern wellness practices. Surrender to the expertise of 
              our therapists and emerge renewed.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-muted/50 border border-border">
                <h4 className="font-serif text-lg text-foreground">Signature Treatments</h4>
                <p className="text-muted-foreground text-sm mt-1">Unique therapies inspired by local traditions</p>
              </div>
              <div className="p-4 bg-muted/50 border border-border">
                <h4 className="font-serif text-lg text-foreground">Hydrotherapy</h4>
                <p className="text-muted-foreground text-sm mt-1">Healing waters and thermal experiences</p>
              </div>
              <div className="p-4 bg-muted/50 border border-border">
                <h4 className="font-serif text-lg text-foreground">Yoga & Meditation</h4>
                <p className="text-muted-foreground text-sm mt-1">Daily sessions with expert instructors</p>
              </div>
              <div className="p-4 bg-muted/50 border border-border">
                <h4 className="font-serif text-lg text-foreground">Fitness Center</h4>
                <p className="text-muted-foreground text-sm mt-1">State-of-the-art equipment and trainers</p>
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
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/images/spa.png"
                alt="Spa & Wellness"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary p-6 text-primary-foreground">
              <p className="font-serif text-xl">Award Winning</p>
              <p className="text-sm opacity-80">Spa of the Year 2024</p>
            </div>
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
    { src: "/images/gallery-2.png", alt: "Beach Bar" },
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
    <section id="gallery" className="py-24 lg:py-32 bg-muted/30">
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
            Moments of
            <span className="text-gold-gradient"> Beauty</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[21/9] overflow-hidden"
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
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30'
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
              className={`relative aspect-video overflow-hidden transition-all ${
                index === currentIndex ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
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
                <span className="text-gold-gradient"> Escape</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Our dedicated reservations team is available to assist you in creating 
              your perfect getaway.
            </p>

            <form className="space-y-4 pt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <Input 
                    placeholder="John" 
                    className="mt-1.5 bg-muted/50 border-border rounded-none focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <Input 
                    placeholder="Doe" 
                    className="mt-1.5 bg-muted/50 border-border rounded-none focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="mt-1.5 bg-muted/50 border-border rounded-none focus:ring-primary"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Check-in Date</label>
                  <Input 
                    type="date" 
                    className="mt-1.5 bg-muted/50 border-border rounded-none focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Check-out Date</label>
                  <Input 
                    type="date" 
                    className="mt-1.5 bg-muted/50 border-border rounded-none focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea 
                  placeholder="Tell us about your dream vacation..." 
                  className="mt-1.5 bg-muted/50 border-border rounded-none focus:ring-primary min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                className="btn-luxury w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-none text-lg tracking-wide"
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
            className="space-y-8"
          >
            <div className="bg-muted/50 p-8 border border-border space-y-6">
              <h3 className="font-serif text-2xl text-foreground">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Paradise Island, Tropical Coast<br />
                      Maldives 00000
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      +1 (555) 123-4567
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
                    <p className="font-medium text-foreground">Reservations</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-primary p-8 text-primary-foreground space-y-4">
              <h3 className="font-serif text-2xl">Stay Inspired</h3>
              <p className="text-sm opacity-90">
                Subscribe to our newsletter for exclusive offers and travel inspiration.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 rounded-none"
                />
                <Button
                  variant="secondary"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-none px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
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
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-3xl">Munroe Morris</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              A sanctuary of luxury and natural beauty, where every moment 
              is crafted to create lasting memories.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-background/10 hover:bg-background/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 hover:bg-background/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 hover:bg-background/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Accommodations', 'Dining', 'Experiences', 'Spa & Wellness', 'Gallery'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {['Airport Transfer', 'Concierge', 'Private Events', 'Wedding Planning', 'Business Center', 'Babysitting'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Paradise Island, Maldives
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                info@munroemorris.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2024 Munroe Morris Resort. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background transition-colors">Cookie Policy</a>
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
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <AccommodationsSection />
      <ExperiencesSection />
      <DiningSection />
      <SpaSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
