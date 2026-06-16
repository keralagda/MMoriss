'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Layout,
  Type,
  Image as ImageIcon,
  Square,
  Layers,
  Settings,
  Eye,
  Save,
  Undo,
  Redo,
  Monitor,
  Tablet,
  Smartphone,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  GripVertical,
  PanelLeftClose,
  PanelRightClose,
  Ship,
  Mountain,
  Flower2,
  Palmtree,
  UtensilsCrossed,
  Star,
  Sparkles,
  Users,
  BedDouble,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

// Types
interface Section {
  id: string
  type: string
  name: string
  visible: boolean
  props: Record<string, unknown>
}

interface Widget {
  id: string
  type: string
  name: string
  icon: React.ElementType
  category: string
  defaultProps: Record<string, unknown>
}

// Widget definitions
const widgets: Widget[] = [
  // Pre-built Sections
  { id: 'hero-section', type: 'hero-section', name: 'Hero Section', icon: Mountain, category: 'prebuilt', defaultProps: {} },
  { id: 'about-section', type: 'about-section', name: 'About Section', icon: Users, category: 'prebuilt', defaultProps: {} },
  { id: 'accommodations-section', type: 'accommodations-section', name: 'Accommodations', icon: BedDouble, category: 'prebuilt', defaultProps: {} },
  { id: 'experiences-section', type: 'experiences-section', name: 'Experiences', icon: Ship, category: 'prebuilt', defaultProps: {} },
  { id: 'ayurveda-section', type: 'ayurveda-section', name: 'Ayurveda/Spa', icon: Flower2, category: 'prebuilt', defaultProps: {} },
  { id: 'dining-section', type: 'dining-section', name: 'Dining', icon: UtensilsCrossed, category: 'prebuilt', defaultProps: {} },
  { id: 'gallery-section', type: 'gallery-section', name: 'Gallery', icon: ImageIcon, category: 'prebuilt', defaultProps: {} },
  { id: 'contact-section', type: 'contact-section', name: 'Contact Form', icon: Mail, category: 'prebuilt', defaultProps: {} },
  { id: 'testimonials-section', type: 'testimonials-section', name: 'Testimonials', icon: Star, category: 'prebuilt', defaultProps: {} },
  { id: 'cta-section', type: 'cta-section', name: 'Call to Action', icon: Sparkles, category: 'prebuilt', defaultProps: {} },
  
  // Layout
  { id: 'section', type: 'section', name: 'Section', icon: Square, category: 'layout', defaultProps: { padding: 'py-24', bg: 'bg-background' } },
  { id: 'container', type: 'container', name: 'Container', icon: Layers, category: 'layout', defaultProps: { maxWidth: 'max-w-7xl', centered: true } },
  { id: 'columns', type: 'columns', name: 'Columns', icon: Layout, category: 'layout', defaultProps: { columns: 2, gap: 'gap-8' } },
  
  // Content
  { id: 'heading', type: 'heading', name: 'Heading', icon: Type, category: 'content', defaultProps: { text: 'Heading', level: 'h2', align: 'center' } },
  { id: 'text', type: 'text', name: 'Text Block', icon: Type, category: 'content', defaultProps: { text: 'Your text here...', align: 'left' } },
  { id: 'image', type: 'image', name: 'Image', icon: ImageIcon, category: 'content', defaultProps: { src: '/images/placeholder.png', alt: 'Image' } },
  { id: 'button', type: 'button', name: 'Button', icon: Square, category: 'content', defaultProps: { text: 'Click Here', style: 'primary' } },
]

// Sample landing page sections for Munroe Morris Service Villa
const defaultSections: Section[] = [
  {
    id: 'hero-1',
    type: 'hero-section',
    name: 'Hero Section',
    visible: true,
    props: {
      title: 'Munroe Morris',
      tagline: 'Where Backwaters Meet Luxury',
      ctaText: 'Explore Kerala Paradise',
      bgImage: '/images/hero.png'
    }
  },
  {
    id: 'about-1',
    type: 'about-section',
    name: 'About Section',
    visible: true,
    props: {
      title: "A Jewel in Kerala's Crown",
      description: 'Nestled amidst the serene backwaters of Munroe Island, Kollam...',
      image: '/images/gallery-1.png'
    }
  },
  {
    id: 'accommodations-1',
    type: 'accommodations-section',
    name: 'Accommodations',
    visible: true,
    props: {}
  },
  {
    id: 'experiences-1',
    type: 'experiences-section',
    name: 'Experiences',
    visible: true,
    props: {}
  },
  {
    id: 'ayurveda-1',
    type: 'ayurveda-section',
    name: 'Ayurveda & Wellness',
    visible: true,
    props: {}
  },
  {
    id: 'dining-1',
    type: 'dining-section',
    name: 'Dining',
    visible: true,
    props: {}
  },
  {
    id: 'gallery-1',
    type: 'gallery-section',
    name: 'Gallery',
    visible: true,
    props: {}
  },
  {
    id: 'contact-1',
    type: 'contact-section',
    name: 'Contact',
    visible: true,
    props: {}
  }
]

// Widget Panel Component
function WidgetPanel({ 
  onAddWidget, 
  isCollapsed, 
  onToggle 
}: { 
  onAddWidget: (widget: Widget) => void
  isCollapsed: boolean
  onToggle: () => void
}) {
  const [expandedCategory, setExpandedCategory] = useState<string>('prebuilt')
  
  const categories = [
    { id: 'prebuilt', name: 'Pre-built Sections', icon: Layers },
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'content', name: 'Content', icon: Type },
  ]

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 48 : 280 }}
      className="h-full skeuo-panel border-r border-border flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && <h2 className="font-serif text-lg text-foreground">Widgets</h2>}
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
        >
          {isCollapsed ? <PanelRightClose className="h-4 w-4 text-muted-foreground" /> : <PanelLeftClose className="h-4 w-4 text-muted-foreground" />}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="space-y-1">
              <button
                onClick={() => setExpandedCategory(expandedCategory === category.id ? '' : category.id)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </div>
                <motion.span
                  animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                  className="text-xs"
                >
                  ▼
                </motion.span>
              </button>
              
              <AnimatePresence>
                {expandedCategory === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pl-2 overflow-hidden"
                  >
                    {widgets
                      .filter(w => w.category === category.id)
                      .map((widget) => (
                        <motion.button
                          key={widget.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onAddWidget(widget)}
                          className="flex items-center gap-3 w-full px-3 py-2.5 my-1 skeuo-inset rounded-lg text-sm text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
                        >
                          <widget.icon className="h-4 w-4 text-primary" />
                          {widget.name}
                          <Plus className="h-3 w-3 ml-auto text-muted-foreground" />
                        </motion.button>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}// Section Preview Component
function SectionPreview({ section }: { section: Section }) {
  switch (section.type) {
    case 'hero-section':
      return (
        <div className="relative h-[500px] bg-gradient-to-b from-kerala-green/20 to-background overflow-hidden">
          <img 
            src={(section.props.bgImage as string) || '/images/hero.png'}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <div className="flex items-center gap-2 mb-4">
              <Palmtree className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm tracking-[0.2em] uppercase">Welcome to God&apos;s Own Country</span>
              <Palmtree className="h-5 w-5 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white font-semibold">
              {(section.props.title as string) || 'Munroe Morris'}
            </h1>
            <p className="font-display text-lg md:text-xl text-white/90 italic mt-4">
              {(section.props.tagline as string) || 'Where Backwaters Meet Luxury'}
            </p>
            <button className="mt-6 px-6 py-3 skeuo-button text-base">
              {(section.props.ctaText as string) || 'Explore Kerala Paradise'}
            </button>
          </div>
        </div>
      )
      
    case 'about-section':
      return (
        <div className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Our Heritage</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground leading-tight">
                A Jewel in <span className="gold-metallic">Kerala&apos;s Crown</span>
              </h2>
              <div className="divider-gold w-20" />
              <p className="text-muted-foreground text-base">
                {(section.props.description as string) || 'Nestled amidst the serene backwaters of Munroe Island, Kollam, Munroe Morris represents the perfect harmony of traditional Kerala architecture and contemporary luxury.'}
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="skeuo-card p-3 text-center">
                  <p className="font-serif text-2xl gold-metallic">25</p>
                  <p className="text-xs text-muted-foreground mt-1">Service Villas</p>
                </div>
                <div className="skeuo-card p-3 text-center">
                  <p className="font-serif text-2xl gold-metallic">500+</p>
                  <p className="text-xs text-muted-foreground mt-1">Happy Guests</p>
                </div>
                <div className="skeuo-card p-3 text-center">
                  <p className="font-serif text-2xl gold-metallic">4.9</p>
                  <p className="text-xs text-muted-foreground mt-1">Rating ★</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="skeuo-card p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={(section.props.image as string) || '/images/gallery-1.png'}
                    alt="About"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-3 -left-3 skeuo-button p-4">
                <p className="font-serif text-lg">Est. 2009</p>
                <p className="text-xs opacity-80 mt-1">Munroe Island, Kollam</p>
              </div>
            </div>
          </div>
        </div>
      )
      
    case 'accommodations-section': {
      const title = (section.props.title as string) || 'Your Home in Paradise'
      const subtitle = (section.props.subtitle as string) || 'Accommodations'
      const villas = [
        {
          name: (section.props.villa1Name as string) || 'Backwater Villa',
          price: (section.props.villa1Price as string) || '₹15,000',
          image: (section.props.villa1Image as string) || '/images/villa-1.png'
        },
        {
          name: (section.props.villa2Name as string) || 'Coconut Grove Suite',
          price: (section.props.villa2Price as string) || '₹12,000',
          image: (section.props.villa2Image as string) || '/images/villa-2.png'
        },
        {
          name: (section.props.villa3Name as string) || 'Heritage Nalukettu',
          price: (section.props.villa3Price as string) || '₹18,000',
          image: (section.props.villa3Image as string) || '/images/villa-3.png'
        }
      ]
      return (
        <div className="py-16 px-4 skeuo-inset mx-4 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium font-serif">
                {subtitle}
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                {title}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {villas.map((villa, i) => (
                <div key={i} className="skeuo-card overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <img src={villa.image} alt={villa.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white/80 text-xs">Starting from</p>
                      <p className="font-serif text-xl text-white">{villa.price}<span className="text-xs">/night</span></p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-foreground">{villa.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1">Traditional Kerala architecture with modern amenities</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
      
    case 'experiences-section': {
      const title = (section.props.title as string) || "Discover God's Own Country"
      const subtitle = (section.props.subtitle as string) || 'Kerala Experiences'
      const experiences = [
        {
          icon: Ship,
          name: (section.props.exp1Name as string) || 'Houseboat Cruise',
          desc: (section.props.exp1Desc as string) || 'Drift through enchanting backwaters',
          image: (section.props.exp1Image as string) || '/images/experience-1.png'
        },
        {
          icon: Sparkles,
          name: (section.props.exp2Name as string) || 'Ayurveda Wellness',
          desc: (section.props.exp2Desc as string) || 'Authentic healing traditions',
          image: (section.props.exp2Image as string) || '/images/spa.png'
        },
        {
          icon: Mountain,
          name: (section.props.exp3Name as string) || 'Village Experience',
          desc: (section.props.exp3Desc as string) || 'Immerse in Kerala culture',
          image: (section.props.exp3Image as string) || '/images/experience-3.png'
        }
      ]
      return (
        <div className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
                {subtitle}
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                {title}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {experiences.map((exp, i) => (
                <div key={i} className="group skeuo-card overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <img src={exp.image} alt={exp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <exp.icon className="h-4 w-4 text-primary" />
                        <h3 className="font-serif text-lg text-white">{exp.name}</h3>
                      </div>
                      <p className="text-white/80 text-xs">{exp.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
      
    case 'ayurveda-section': {
      const title = (section.props.title as string) || 'Ancient Healing, Modern Comfort'
      const subtitle = (section.props.subtitle as string) || 'Ayurveda & Wellness'
      const description = (section.props.description as string) || 'Kerala is the birthplace of Ayurveda. Our wellness center offers authentic treatments using traditional herbs and oils sourced from Kerala.'
      const image = (section.props.image as string) || '/images/spa.png'
      const treatments = [
        (section.props.treatment1 as string) || 'Panchakarma',
        (section.props.treatment2 as string) || 'Shirodhara',
        (section.props.treatment3 as string) || 'Abhyanga',
        (section.props.treatment4 as string) || 'Nasyam'
      ]
      return (
        <div className="py-16 px-4 skeuo-inset mx-4 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img src={image} alt="Ayurveda" className="rounded-2xl w-full aspect-square object-cover" />
              </div>
              <div className="space-y-4">
                <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
                  {subtitle}
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground leading-tight">
                  {title}
                </h2>
                <p className="text-muted-foreground text-base">
                  {description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {treatments.map((treatment, i) => (
                    <div key={i} className="skeuo-card p-3">
                      <p className="font-medium text-foreground text-sm">{treatment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
      
    case 'dining-section': {
      const title = (section.props.title as string) || 'Flavors of Kerala'
      const subtitle = (section.props.subtitle as string) || 'Kerala Cuisine'
      const diningItems = [
        {
          name: (section.props.dining1Name as string) || 'Backwater Restaurant',
          desc: (section.props.dining1Desc as string) || 'Traditional Kerala Sadya & Seafood',
          image: (section.props.dining1Image as string) || '/images/dining-1.png'
        },
        {
          name: (section.props.dining2Name as string) || 'Sunset Chai Lounge',
          desc: (section.props.dining2Desc as string) || 'Fresh chai & local snacks',
          image: (section.props.dining2Image as string) || '/images/dining-2.png'
        },
        {
          name: (section.props.dining3Name as string) || 'Cooking Classes',
          desc: (section.props.dining3Desc as string) || 'Learn authentic Kerala dishes',
          image: (section.props.dining3Image as string) || '/images/dining-3.png'
        }
      ]
      return (
        <div className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
                {subtitle}
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                {title}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {diningItems.map((item, i) => (
                <div key={i} className="skeuo-card overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg text-foreground">{item.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
      
    case 'gallery-section': {
      const title = (section.props.title as string) || 'Moments in Kerala'
      const subtitle = (section.props.subtitle as string) || 'Gallery'
      const images = [
        (section.props.image1 as string) || '/images/gallery-1.png',
        (section.props.image2 as string) || '/images/gallery-2.png',
        (section.props.image3 as string) || '/images/gallery-3.png',
        (section.props.image4 as string) || '/images/gallery-4.png'
      ]
      return (
        <div className="py-16 px-4 skeuo-inset mx-4 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
                {subtitle}
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                {title}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div key={i} className={`skeuo-card overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover aspect-square animate-pulse-slow" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
      
    case 'contact-section': {
      const title = (section.props.title as string) || 'Plan Your Kerala Escape'
      const subtitle = (section.props.subtitle as string) || 'Get in Touch'
      const description = (section.props.description as string) || 'Our team is ready to help you plan an unforgettable experience in Munroe Island, Kollam.'
      const location = (section.props.location as string) || 'Munroe Island, Kollam, Kerala 691502'
      const phone = (section.props.phone as string) || '+91 474 XXXXXXX'
      const email = (section.props.email as string) || 'reservations@munroemorris.com'
      return (
        <div className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">
                  {subtitle}
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
                  {title}
                </h2>
                <p className="text-muted-foreground text-base">
                  {description}
                </p>
                <div className="space-y-3">
                  <div className="skeuo-card p-3 flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Location</p>
                      <p className="text-muted-foreground text-xs">{location}</p>
                    </div>
                  </div>
                  <div className="skeuo-card p-3 flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Phone</p>
                      <p className="text-muted-foreground text-xs">{phone}</p>
                    </div>
                  </div>
                  <div className="skeuo-card p-3 flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Email</p>
                      <p className="text-muted-foreground text-xs">{email}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skeuo-card p-5">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="First Name" className="skeuo-input w-full text-sm" disabled />
                    <input type="text" placeholder="Last Name" className="skeuo-input w-full text-sm" disabled />
                  </div>
                  <input type="email" placeholder="Email" className="skeuo-input w-full text-sm" disabled />
                  <input type="tel" placeholder="Phone" className="skeuo-input w-full text-sm" disabled />
                  <textarea placeholder="Your message..." className="skeuo-input w-full h-24 text-sm" disabled />
                  <button className="w-full skeuo-button py-2 font-medium text-sm" disabled>Send Inquiry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
      
    case 'testimonials-section': {
      const title = (section.props.title as string) || 'What Our Guests Say'
      const subtitle = (section.props.subtitle as string) || 'Testimonials'
      const reviews = [
        {
          name: (section.props.testimonial1Name as string) || 'Sarah J.',
          rating: Number(section.props.testimonial1Rating) || 5,
          comment: (section.props.testimonial1Comment as string) || 'Absolutely magical! The backwater views are stunning.'
        },
        {
          name: (section.props.testimonial2Name as string) || 'Rajesh K.',
          rating: Number(section.props.testimonial2Rating) || 5,
          comment: (section.props.testimonial2Comment as string) || 'Great Ayurveda treatments. Will definitely come back.'
        },
        {
          name: (section.props.testimonial3Name as string) || 'Emily C.',
          rating: Number(section.props.testimonial3Rating) || 5,
          comment: (section.props.testimonial3Comment as string) || 'The staff was incredibly helpful and the food amazing!'
        }
      ]
      return (
        <div className="py-16 px-4 skeuo-inset mx-4 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium font-serif">
                {subtitle}
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                {title}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {reviews.map((review, i) => (
                <div key={i} className="skeuo-card p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`h-3 w-3 ${j < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs mb-2">&quot;{review.comment}&quot;</p>
                  <p className="font-medium text-foreground text-sm">{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
      
    case 'cta-section':
      return (
        <div className="py-16 px-4 bg-gradient-to-r from-primary/20 to-gold-dark/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
              {(section.props.title as string) || 'Ready to Experience Kerala?'}
            </h2>
            <p className="text-muted-foreground text-base mt-3">
              {(section.props.description as string) || 'Book your stay at Munroe Morris Service Villa and create unforgettable memories.'}
            </p>
            <button className="mt-6 skeuo-button px-6 py-3 text-base">
              {(section.props.ctaText as string) || 'Book Your Stay'}
            </button>
          </div>
        </div>
      )

    case 'section': {
      const padding = (section.props.padding as string) || 'py-24'
      const bg = (section.props.bg as string) || 'bg-background'
      return (
        <div className={`${padding} ${bg} border border-dashed border-primary/20 m-2 rounded-xl`}>
          <div className="text-center text-xs text-primary/70 uppercase tracking-widest font-mono mb-2">Layout: Section</div>
          <div className="px-4 text-center text-sm text-muted-foreground italic">
            Background: {bg} | Padding: {padding}
          </div>
        </div>
      )
    }

    case 'container': {
      const maxWidth = (section.props.maxWidth as string) || 'max-w-7xl'
      const centered = section.props.centered !== false
      return (
        <div className={`${centered ? 'mx-auto' : ''} ${maxWidth} border border-dotted border-foreground/35 p-4 m-2 rounded-lg`}>
          <div className="text-center text-xs text-primary/70 uppercase tracking-widest font-mono mb-1">Layout: Container</div>
          <div className="text-center text-sm text-muted-foreground">Max Width: {maxWidth} | Centered: {centered ? 'Yes' : 'No'}</div>
        </div>
      )
    }

    case 'columns': {
      const cols = Number(section.props.columns) || 2
      const gap = (section.props.gap as string) || 'gap-8'
      return (
        <div className="p-4 m-2 border border-dashed border-foreground/20 rounded-lg">
          <div className="text-center text-xs text-primary/70 uppercase tracking-widest font-mono mb-3">Layout: Columns ({cols})</div>
          <div className={`grid ${gap}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            {[...Array(cols)].map((_, i) => (
              <div key={i} className="skeuo-inset p-4 text-center text-xs text-muted-foreground rounded">
                Column {i + 1} ({gap})
              </div>
            ))}
          </div>
        </div>
      )
    }

    case 'heading': {
      const text = (section.props.text as string) || 'Heading'
      const level = (section.props.level as string) || 'h2'
      const align = (section.props.align as string) || 'center'
      const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'
      
      const HeadingTag = (level === 'h1' || level === 'h3' || level === 'h4') ? level : 'h2'
      
      return (
        <div className="p-4">
          <HeadingTag className={`font-serif text-foreground font-semibold ${alignClass} ${
            level === 'h1' ? 'text-4xl md:text-5xl' : 
            level === 'h2' ? 'text-3xl md:text-4xl' :
            level === 'h3' ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
            {text}
          </HeadingTag>
        </div>
      )
    }

    case 'text': {
      const text = (section.props.text as string) || 'Your text here...'
      const align = (section.props.align as string) || 'left'
      const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : align === 'justify' ? 'text-justify' : 'text-center'
      return (
        <div className="p-4">
          <p className={`text-muted-foreground text-base leading-relaxed ${alignClass}`}>
            {text}
          </p>
        </div>
      )
    }

    case 'image': {
      const src = (section.props.src as string) || '/images/placeholder.png'
      const alt = (section.props.alt as string) || 'Image'
      return (
        <div className="p-4 flex justify-center">
          <div className="skeuo-card p-2 max-w-md w-full">
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
              <img src={src} alt={alt} className="w-full h-full object-cover" />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">{alt}</p>
          </div>
        </div>
      )
    }

    case 'button': {
      const text = (section.props.text as string) || 'Click Here'
      const style = (section.props.style as string) || 'primary'
      const buttonStyle = 
        style === 'secondary' ? 'skeuo-inset text-foreground' : 
        style === 'outline' ? 'border border-primary text-primary bg-transparent hover:bg-primary/10 shadow-none' : 
        style === 'link' ? 'underline text-primary bg-transparent shadow-none hover:text-primary/80' : 
        'skeuo-button'
      return (
        <div className="p-4 flex justify-center">
          <button className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${buttonStyle}`}>
            {text}
          </button>
        </div>
      )
    }
      
    default:
      return (
        <div className="p-6 bg-muted/20 border-2 border-dashed border-muted-foreground/30 rounded-xl m-4 text-center">
          <p className="text-muted-foreground">{section.name || 'Empty Section'}</p>
        </div>
      )
  }
}

// Canvas Preview Component
function CanvasPreview({ 
  sections, 
  selectedId, 
  onSelect,
  viewport
}: { 
  sections: Section[]
  selectedId: string | null
  onSelect: (id: string) => void
  viewport: 'desktop' | 'tablet' | 'mobile'
}) {
  const viewportWidths = {
    desktop: '1200px', // Compact but not very squeezed
    tablet: '768px',
    mobile: '375px'
  }

  return (
    <div className="flex-1 bg-muted/20 overflow-auto p-6">
      <div 
        className="mx-auto bg-background rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
        style={{ maxWidth: viewportWidths[viewport] }}
      >
        <div className="min-h-[600px]">
          {sections.filter(s => s.visible).map((section) => (
            <div
              key={section.id}
              onClick={() => onSelect(section.id)}
              className={`relative cursor-pointer transition-all ${
                selectedId === section.id 
                  ? 'ring-2 ring-primary ring-offset-2' 
                  : 'hover:ring-2 hover:ring-primary/30'
              }`}
            >
              {/* Section Type Label */}
              <div className={`absolute top-2 left-2 z-10 px-2 py-1 rounded text-xs font-medium transition-opacity ${
                selectedId === section.id ? 'opacity-100' : 'opacity-0'
              } bg-primary text-primary-foreground`}>
                {section.name}
              </div>
              
              {/* Section Content Preview */}
              <SectionPreview section={section} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Settings Panel Component
function SettingsPanel({ 
  section, 
  onUpdate, 
  isCollapsed,
  onToggle
}: { 
  section: Section | null
  onUpdate: (id: string, props: Record<string, unknown>) => void
  isCollapsed: boolean
  onToggle: () => void
}) {
  if (!section) {
    return (
      <motion.div 
        initial={false}
        animate={{ width: isCollapsed ? 48 : 300 }}
        className="h-full skeuo-panel border-l border-border flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && <h2 className="font-serif text-lg text-foreground">Settings</h2>}
          <button 
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center text-muted-foreground">
              <Settings className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Select a section to edit</p>
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 48 : 300 }}
      className="h-full skeuo-panel border-l border-border flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && <h2 className="font-serif text-lg text-foreground">{section.name}</h2>}
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
        >
          <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Section Settings */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Section Name</label>
              <Input 
                value={section.name}
                onChange={(e) => onUpdate(section.id, { name: e.target.value })}
                className="skeuo-input"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="visible" 
                checked={section.visible}
                onChange={(e) => onUpdate(section.id, { visible: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="visible" className="text-sm text-foreground">Visible on page</label>
            </div>
            
            <div className="divider-gold" />
            
            {/* Type-specific settings */}
            {section.type === 'hero-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Tagline</label>
                  <Input 
                    value={(section.props.tagline as string) || ''}
                    onChange={(e) => onUpdate(section.id, { tagline: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">CTA Text</label>
                  <Input 
                    value={(section.props.ctaText as string) || ''}
                    onChange={(e) => onUpdate(section.id, { ctaText: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Background Image</label>
                  <Input 
                    value={(section.props.bgImage as string) || ''}
                    onChange={(e) => onUpdate(section.id, { bgImage: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
              </>
            )}
            
            {section.type === 'about-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <Textarea 
                    value={(section.props.description as string) || ''}
                    onChange={(e) => onUpdate(section.id, { description: e.target.value })}
                    className="skeuo-input min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Image</label>
                  <Input 
                    value={(section.props.image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { image: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
              </>
            )}

            {section.type === 'accommodations-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Subtitle</label>
                  <Input 
                    value={(section.props.subtitle as string) || ''}
                    onChange={(e) => onUpdate(section.id, { subtitle: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Villa 1</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.villa1Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { villa1Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Price</label>
                  <Input 
                    value={(section.props.villa1Price as string) || ''}
                    onChange={(e) => onUpdate(section.id, { villa1Price: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Image URL</label>
                  <Input 
                    value={(section.props.villa1Image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { villa1Image: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>

                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Villa 2</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.villa2Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { villa2Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Price</label>
                  <Input 
                    value={(section.props.villa2Price as string) || ''}
                    onChange={(e) => onUpdate(section.id, { villa2Price: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Image URL</label>
                  <Input 
                    value={(section.props.villa2Image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { villa2Image: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>

                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Villa 3</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.villa3Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { villa3Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Price</label>
                  <Input 
                    value={(section.props.villa3Price as string) || ''}
                    onChange={(e) => onUpdate(section.id, { villa3Price: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Image URL</label>
                  <Input 
                    value={(section.props.villa3Image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { villa3Image: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
              </>
            )}

            {section.type === 'experiences-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Subtitle</label>
                  <Input 
                    value={(section.props.subtitle as string) || ''}
                    onChange={(e) => onUpdate(section.id, { subtitle: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Experience 1</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.exp1Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { exp1Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Description</label>
                  <Input 
                    value={(section.props.exp1Desc as string) || ''}
                    onChange={(e) => onUpdate(section.id, { exp1Desc: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Image URL</label>
                  <Input 
                    value={(section.props.exp1Image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { exp1Image: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>

                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Experience 2</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.exp2Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { exp2Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Description</label>
                  <Input 
                    value={(section.props.exp2Desc as string) || ''}
                    onChange={(e) => onUpdate(section.id, { exp2Desc: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Image URL</label>
                  <Input 
                    value={(section.props.exp2Image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { exp2Image: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>

                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Experience 3</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.exp3Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { exp3Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Description</label>
                  <Input 
                    value={(section.props.exp3Desc as string) || ''}
                    onChange={(e) => onUpdate(section.id, { exp3Desc: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Image URL</label>
                  <Input 
                    value={(section.props.exp3Image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { exp3Image: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
              </>
            )}

            {section.type === 'ayurveda-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Subtitle</label>
                  <Input 
                    value={(section.props.subtitle as string) || ''}
                    onChange={(e) => onUpdate(section.id, { subtitle: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <Textarea 
                    value={(section.props.description as string) || ''}
                    onChange={(e) => onUpdate(section.id, { description: e.target.value })}
                    className="skeuo-input min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Image URL</label>
                  <Input 
                    value={(section.props.image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { image: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Treatments</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-foreground block mb-1">Treatment 1</label>
                    <Input 
                      value={(section.props.treatment1 as string) || ''}
                      onChange={(e) => onUpdate(section.id, { treatment1: e.target.value })}
                      className="skeuo-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground block mb-1">Treatment 2</label>
                    <Input 
                      value={(section.props.treatment2 as string) || ''}
                      onChange={(e) => onUpdate(section.id, { treatment2: e.target.value })}
                      className="skeuo-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground block mb-1">Treatment 3</label>
                    <Input 
                      value={(section.props.treatment3 as string) || ''}
                      onChange={(e) => onUpdate(section.id, { treatment3: e.target.value })}
                      className="skeuo-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground block mb-1">Treatment 4</label>
                    <Input 
                      value={(section.props.treatment4 as string) || ''}
                      onChange={(e) => onUpdate(section.id, { treatment4: e.target.value })}
                      className="skeuo-input text-xs"
                    />
                  </div>
                </div>
              </>
            )}

            {section.type === 'dining-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Subtitle</label>
                  <Input 
                    value={(section.props.subtitle as string) || ''}
                    onChange={(e) => onUpdate(section.id, { subtitle: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Dining Item 1</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.dining1Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { dining1Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Description</label>
                  <Input 
                    value={(section.props.dining1Desc as string) || ''}
                    onChange={(e) => onUpdate(section.id, { dining1Desc: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Image URL</label>
                  <Input 
                    value={(section.props.dining1Image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { dining1Image: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>

                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Dining Item 2</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.dining2Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { dining2Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Description</label>
                  <Input 
                    value={(section.props.dining2Desc as string) || ''}
                    onChange={(e) => onUpdate(section.id, { dining2Desc: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Image URL</label>
                  <Input 
                    value={(section.props.dining2Image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { dining2Image: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>

                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Dining Item 3</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.dining3Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { dining3Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Description</label>
                  <Input 
                    value={(section.props.dining3Desc as string) || ''}
                    onChange={(e) => onUpdate(section.id, { dining3Desc: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Image URL</label>
                  <Input 
                    value={(section.props.dining3Image as string) || ''}
                    onChange={(e) => onUpdate(section.id, { dining3Image: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
              </>
            )}

            {section.type === 'gallery-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Subtitle</label>
                  <Input 
                    value={(section.props.subtitle as string) || ''}
                    onChange={(e) => onUpdate(section.id, { subtitle: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Images</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-foreground block mb-1">Image 1 URL</label>
                    <Input 
                      value={(section.props.image1 as string) || ''}
                      onChange={(e) => onUpdate(section.id, { image1: e.target.value })}
                      className="skeuo-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground block mb-1">Image 2 URL</label>
                    <Input 
                      value={(section.props.image2 as string) || ''}
                      onChange={(e) => onUpdate(section.id, { image2: e.target.value })}
                      className="skeuo-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground block mb-1">Image 3 URL</label>
                    <Input 
                      value={(section.props.image3 as string) || ''}
                      onChange={(e) => onUpdate(section.id, { image3: e.target.value })}
                      className="skeuo-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground block mb-1">Image 4 URL</label>
                    <Input 
                      value={(section.props.image4 as string) || ''}
                      onChange={(e) => onUpdate(section.id, { image4: e.target.value })}
                      className="skeuo-input text-xs"
                    />
                  </div>
                </div>
              </>
            )}

            {section.type === 'contact-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Subtitle</label>
                  <Input 
                    value={(section.props.subtitle as string) || ''}
                    onChange={(e) => onUpdate(section.id, { subtitle: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <Textarea 
                    value={(section.props.description as string) || ''}
                    onChange={(e) => onUpdate(section.id, { description: e.target.value })}
                    className="skeuo-input min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Location Address</label>
                  <Input 
                    value={(section.props.location as string) || ''}
                    onChange={(e) => onUpdate(section.id, { location: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Phone</label>
                  <Input 
                    value={(section.props.phone as string) || ''}
                    onChange={(e) => onUpdate(section.id, { phone: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                  <Input 
                    value={(section.props.email as string) || ''}
                    onChange={(e) => onUpdate(section.id, { email: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
              </>
            )}

            {section.type === 'testimonials-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Subtitle</label>
                  <Input 
                    value={(section.props.subtitle as string) || ''}
                    onChange={(e) => onUpdate(section.id, { subtitle: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Testimonial 1</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.testimonial1Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { testimonial1Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Rating (1-5)</label>
                  <input 
                    type="number"
                    min="1"
                    max="5"
                    value={Number(section.props.testimonial1Rating) || 5}
                    onChange={(e) => onUpdate(section.id, { testimonial1Rating: Number(e.target.value) })}
                    className="skeuo-input bg-background w-full text-xs p-2 rounded-lg"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Comment</label>
                  <Input 
                    value={(section.props.testimonial1Comment as string) || ''}
                    onChange={(e) => onUpdate(section.id, { testimonial1Comment: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>

                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Testimonial 2</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.testimonial2Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { testimonial2Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Rating (1-5)</label>
                  <input 
                    type="number"
                    min="1"
                    max="5"
                    value={Number(section.props.testimonial2Rating) || 5}
                    onChange={(e) => onUpdate(section.id, { testimonial2Rating: Number(e.target.value) })}
                    className="skeuo-input bg-background w-full text-xs p-2 rounded-lg"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Comment</label>
                  <Input 
                    value={(section.props.testimonial2Comment as string) || ''}
                    onChange={(e) => onUpdate(section.id, { testimonial2Comment: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>

                <div className="divider-gold my-2" />
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">Testimonial 3</h4>
                <div>
                  <label className="text-xs text-foreground block mb-1">Name</label>
                  <Input 
                    value={(section.props.testimonial3Name as string) || ''}
                    onChange={(e) => onUpdate(section.id, { testimonial3Name: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Rating (1-5)</label>
                  <input 
                    type="number"
                    min="1"
                    max="5"
                    value={Number(section.props.testimonial3Rating) || 5}
                    onChange={(e) => onUpdate(section.id, { testimonial3Rating: Number(e.target.value) })}
                    className="skeuo-input bg-background w-full text-xs p-2 rounded-lg"
                  />
                </div>
                <div className="mt-2">
                  <label className="text-xs text-foreground block mb-1">Comment</label>
                  <Input 
                    value={(section.props.testimonial3Comment as string) || ''}
                    onChange={(e) => onUpdate(section.id, { testimonial3Comment: e.target.value })}
                    className="skeuo-input text-xs"
                  />
                </div>
              </>
            )}

            {section.type === 'cta-section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Title</label>
                  <Input 
                    value={(section.props.title as string) || ''}
                    onChange={(e) => onUpdate(section.id, { title: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                  <Textarea 
                    value={(section.props.description as string) || ''}
                    onChange={(e) => onUpdate(section.id, { description: e.target.value })}
                    className="skeuo-input min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">CTA Button Text</label>
                  <Input 
                    value={(section.props.ctaText as string) || ''}
                    onChange={(e) => onUpdate(section.id, { ctaText: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
              </>
            )}

            {section.type === 'section' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Padding</label>
                  <select 
                    value={(section.props.padding as string) || 'py-24'}
                    onChange={(e) => onUpdate(section.id, { padding: e.target.value })}
                    className="skeuo-input bg-background w-full text-sm p-2 rounded-lg"
                  >
                    <option value="py-8">Extra Small (py-8)</option>
                    <option value="py-12">Small (py-12)</option>
                    <option value="py-16">Medium (py-16)</option>
                    <option value="py-24">Large (py-24)</option>
                    <option value="py-32">Extra Large (py-32)</option>
                  </select>
                </div>
                <div className="mt-2">
                  <label className="text-sm font-medium text-foreground block mb-2">Background Theme</label>
                  <select 
                    value={(section.props.bg as string) || 'bg-background'}
                    onChange={(e) => onUpdate(section.id, { bg: e.target.value })}
                    className="skeuo-input bg-background w-full text-sm p-2 rounded-lg"
                  >
                    <option value="bg-background">Default Background</option>
                    <option value="bg-muted/30">Muted Light Gray</option>
                    <option value="bg-primary/5">Very Soft Green</option>
                    <option value="bg-primary/10">Soft Green Accent</option>
                    <option value="bg-gold-dark/5">Soft Gold Accent</option>
                  </select>
                </div>
              </>
            )}

            {section.type === 'container' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Max Width</label>
                  <select 
                    value={(section.props.maxWidth as string) || 'max-w-7xl'}
                    onChange={(e) => onUpdate(section.id, { maxWidth: e.target.value })}
                    className="skeuo-input bg-background w-full text-sm p-2 rounded-lg"
                  >
                    <option value="max-w-4xl">Narrow (max-w-4xl)</option>
                    <option value="max-w-6xl">Medium (max-w-6xl)</option>
                    <option value="max-w-7xl">Default Wide (max-w-7xl)</option>
                    <option value="max-w-full">Full Width (max-w-full)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="container-centered" 
                    checked={section.props.centered !== false}
                    onChange={(e) => onUpdate(section.id, { centered: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="container-centered" className="text-sm text-foreground">Centered margin (mx-auto)</label>
                </div>
              </>
            )}

            {section.type === 'columns' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Columns</label>
                  <select 
                    value={Number(section.props.columns) || 2}
                    onChange={(e) => onUpdate(section.id, { columns: Number(e.target.value) })}
                    className="skeuo-input bg-background w-full text-sm p-2 rounded-lg"
                  >
                    <option value={1}>1 Column</option>
                    <option value={2}>2 Columns</option>
                    <option value={3}>3 Columns</option>
                    <option value={4}>4 Columns</option>
                  </select>
                </div>
                <div className="mt-2">
                  <label className="text-sm font-medium text-foreground block mb-2">Gap Size</label>
                  <select 
                    value={(section.props.gap as string) || 'gap-8'}
                    onChange={(e) => onUpdate(section.id, { gap: e.target.value })}
                    className="skeuo-input bg-background w-full text-sm p-2 rounded-lg"
                  >
                    <option value="gap-4">Small (gap-4)</option>
                    <option value="gap-6">Medium (gap-6)</option>
                    <option value="gap-8">Large (gap-8)</option>
                    <option value="gap-12">Extra Large (gap-12)</option>
                  </select>
                </div>
              </>
            )}

            {section.type === 'heading' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Text</label>
                  <Input 
                    value={(section.props.text as string) || ''}
                    onChange={(e) => onUpdate(section.id, { text: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Level</label>
                  <select 
                    value={(section.props.level as string) || 'h2'}
                    onChange={(e) => onUpdate(section.id, { level: e.target.value })}
                    className="skeuo-input bg-background w-full text-sm p-2 rounded-lg"
                  >
                    <option value="h1">Heading 1 (Hero size)</option>
                    <option value="h2">Heading 2 (Section size)</option>
                    <option value="h3">Heading 3 (Card size)</option>
                    <option value="h4">Heading 4 (Sub size)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Alignment</label>
                  <select 
                    value={(section.props.align as string) || 'center'}
                    onChange={(e) => onUpdate(section.id, { align: e.target.value })}
                    className="skeuo-input bg-background w-full text-sm p-2 rounded-lg"
                  >
                    <option value="left">Left Align</option>
                    <option value="center">Center Align</option>
                    <option value="right">Right Align</option>
                  </select>
                </div>
              </>
            )}

            {section.type === 'text' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Content</label>
                  <Textarea 
                    value={(section.props.text as string) || ''}
                    onChange={(e) => onUpdate(section.id, { text: e.target.value })}
                    className="skeuo-input min-h-[120px]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Alignment</label>
                  <select 
                    value={(section.props.align as string) || 'left'}
                    onChange={(e) => onUpdate(section.id, { align: e.target.value })}
                    className="skeuo-input bg-background w-full text-sm p-2 rounded-lg"
                  >
                    <option value="left">Left Align</option>
                    <option value="center">Center Align</option>
                    <option value="right">Right Align</option>
                    <option value="justify">Justified</option>
                  </select>
                </div>
              </>
            )}

            {section.type === 'image' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Image URL</label>
                  <Input 
                    value={(section.props.src as string) || ''}
                    onChange={(e) => onUpdate(section.id, { src: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Alt Text</label>
                  <Input 
                    value={(section.props.alt as string) || ''}
                    onChange={(e) => onUpdate(section.id, { alt: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
              </>
            )}

            {section.type === 'button' && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Text</label>
                  <Input 
                    value={(section.props.text as string) || ''}
                    onChange={(e) => onUpdate(section.id, { text: e.target.value })}
                    className="skeuo-input"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Style Variant</label>
                  <select 
                    value={(section.props.style as string) || 'primary'}
                    onChange={(e) => onUpdate(section.id, { style: e.target.value })}
                    className="skeuo-input bg-background w-full text-sm p-2 rounded-lg"
                  >
                    <option value="primary">Primary (Metallic Gold)</option>
                    <option value="secondary">Secondary (Inlaid Skeuo)</option>
                    <option value="outline">Outline (Gold Border)</option>
                    <option value="link">Link Style (Clean Underline)</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Main Component
export default function SiteBuilder() {
  const [sections, setSections] = useState<Section[]>(defaultSections)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(true)
  const [history, setHistory] = useState<Section[][]>([defaultSections])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Menu Manager States
  const [isMenuManagerOpen, setIsMenuManagerOpen] = useState(false)
  const [dishes, setDishes] = useState<any[]>([])
  const [dishesLoading, setDishesLoading] = useState(false)
  const [editingDish, setEditingDish] = useState<any | null>(null)
  const [dishName, setDishName] = useState('')
  const [dishDesc, setDishDesc] = useState('')
  const [dishPrice, setDishPrice] = useState('')
  const [dishVeg, setDishVeg] = useState(true)
  const [dishImageUrl, setDishImageUrl] = useState('')

  const fetchDishes = async () => {
    setDishesLoading(true)
    try {
      const res = await fetch('/api/dishes')
      if (res.ok) {
        const data = await res.json()
        setDishes(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setDishesLoading(false)
    }
  }

  useEffect(() => {
    if (isMenuManagerOpen) {
      fetchDishes()
    }
  }, [isMenuManagerOpen])

  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dishName || !dishPrice) {
      alert('Name and Price are required!')
      return
    }

    const payload = {
      name: dishName,
      description: dishDesc,
      price: Number(dishPrice),
      veg: dishVeg,
      imageUrl: dishImageUrl,
    }

    try {
      let res
      if (editingDish) {
        res = await fetch(`/api/dishes/${editingDish.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      } else {
        res = await fetch('/api/dishes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      }

      if (res.ok) {
        fetchDishes()
        setEditingDish(null)
        setDishName('')
        setDishDesc('')
        setDishPrice('')
        setDishVeg(true)
        setDishImageUrl('')
      } else {
        alert('Failed to save dish')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteDish = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dish?')) return
    try {
      const res = await fetch(`/api/dishes/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchDishes()
        if (editingDish?.id === id) {
          setEditingDish(null)
          setDishName('')
          setDishDesc('')
          setDishPrice('')
          setDishVeg(true)
          setDishImageUrl('')
        }
      } else {
        alert('Failed to delete dish')
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    Promise.resolve().then(async () => {
      setMounted(true)
      
      let loadedSections: Section[] | null = null
      
      // Try loading from Database settings first
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const settings = await res.json()
          if (settings.site_builder_sections) {
            const parsed = JSON.parse(settings.site_builder_sections)
            if (Array.isArray(parsed) && parsed.length > 0) {
              loadedSections = parsed
            }
          }
        }
      } catch (err) {
        console.error('Failed to load site-builder sections from Database settings', err)
      }
      
      // Fallback to localStorage
      if (!loadedSections) {
        const saved = localStorage.getItem('site-builder-sections')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            if (Array.isArray(parsed) && parsed.length > 0) {
              loadedSections = parsed
            }
          } catch (e) {
            console.error('Failed to load site-builder sections from localStorage', e)
          }
        }
      }
      
      if (loadedSections) {
        setSections(loadedSections)
        setHistory([loadedSections])
        setHistoryIndex(0)
      }
    })
  }, [])

  // Save to history for undo/redo
  const saveToHistory = useCallback((newSections: Section[]) => {
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newSections])
    setHistoryIndex(prev => prev + 1)
  }, [historyIndex])

  // Add widget/section
  const handleAddWidget = useCallback((widget: Widget) => {
    const newSection: Section = {
      id: `${widget.id}-${Date.now()}`,
      type: widget.type,
      name: widget.name,
      visible: true,
      props: { ...widget.defaultProps }
    }
    
    setSections(prev => {
      const newSections = [...prev, newSection]
      saveToHistory(newSections)
      return newSections
    })
    setSelectedId(newSection.id)
    setRightCollapsed(false)
  }, [saveToHistory])

  // Update section props
  const handleUpdateSection = useCallback((id: string, props: Record<string, unknown>) => {
    setSections(prev => {
      const newSections = prev.map(s => {
        if (s.id === id) {
          if ('name' in props) {
            return { ...s, name: props.name as string, props: { ...s.props, ...props } }
          }
          if ('visible' in props) {
            return { ...s, visible: props.visible as boolean }
          }
          return { ...s, props: { ...s.props, ...props } }
        }
        return s
      })
      saveToHistory(newSections)
      return newSections
    })
  }, [saveToHistory])

  // Toggle section visibility
  const handleToggleVisibility = useCallback((id: string) => {
    setSections(prev => prev.map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    ))
  }, [])

  // Move section
  const handleMoveSection = useCallback((id: string, direction: 'up' | 'down') => {
    setSections(prev => {
      const index = prev.findIndex(s => s.id === id)
      if (index === -1) return prev
      
      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= prev.length) return prev
      
      const newSections = [...prev]
      const temp = newSections[index]
      newSections[index] = newSections[newIndex]
      newSections[newIndex] = temp
      
      saveToHistory(newSections)
      return newSections
    })
  }, [saveToHistory])

  // Delete section
  const handleDeleteSection = useCallback((id: string) => {
    setSections(prev => {
      const newSections = prev.filter(s => s.id !== id)
      saveToHistory(newSections)
      return newSections
    })
    if (selectedId === id) setSelectedId(null)
  }, [selectedId, saveToHistory])

  // Undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1)
      setSections(history[historyIndex - 1])
    }
  }, [historyIndex, history])

  // Redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1)
      setSections(history[historyIndex + 1])
    }
  }, [historyIndex, history])

  // Save
  const handleSave = useCallback(async () => {
    setIsSaving(true)
    try {
      // Save to Database settings
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          site_builder_sections: JSON.stringify(sections)
        })
      })
      
      if (!res.ok) {
        throw new Error('Failed to save to database settings')
      }
      
      // Also save to localStorage as fallback
      localStorage.setItem('site-builder-sections', JSON.stringify(sections))
      alert('Site builder layout successfully saved!')
    } catch (err: any) {
      console.error('Save error:', err)
      alert(`Failed to save settings: ${err.message || 'Unknown error'}`)
    } finally {
      setIsSaving(false)
    }
  }, [sections])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-pulse text-muted-foreground">Loading Site Builder...</div>
      </div>
    )
  }

  const selectedSection = sections.find(s => s.id === selectedId) || null

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Toolbar */}
      <div className="skeuo-panel border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-xl text-foreground">Visual Site Builder</h1>
            <div className="flex items-center gap-1 px-2 py-1 skeuo-inset rounded-lg">
              <button 
                onClick={() => setViewport('desktop')}
                className={`p-2 rounded-lg transition-colors ${viewport === 'desktop' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewport('tablet')}
                className={`p-2 rounded-lg transition-colors ${viewport === 'tablet' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewport('mobile')}
                className={`p-2 rounded-lg transition-colors ${viewport === 'mobile' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className="text-muted-foreground"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRedo}
              disabled={historyIndex === history.length - 1}
              className="text-muted-foreground"
            >
              <Redo className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsMenuManagerOpen(true)}
              className="text-muted-foreground border-primary/20 hover:bg-primary/5 mr-2"
            >
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              Menu Manager
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button 
              className="skeuo-button"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Widgets */}
        <WidgetPanel 
          onAddWidget={handleAddWidget} 
          isCollapsed={leftCollapsed}
          onToggle={() => setLeftCollapsed(!leftCollapsed)}
        />
        
        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Section Navigator */}
          <div className="skeuo-panel border-b border-border px-4 py-3 overflow-x-auto">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Sections:</span>
              <AnimatePresence mode="popLayout">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => {
                      setSelectedId(section.id)
                      setRightCollapsed(false)
                    }}
                    className={`relative group px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedId === section.id 
                        ? 'skeuo-button text-primary-foreground' 
                        : 'skeuo-inset text-muted-foreground hover:text-foreground'
                    } ${!section.visible ? 'opacity-50' : ''}`}
                  >
                    {index + 1}. {section.name}
                    {/* Action buttons */}
                    <div className="absolute -right-1 -top-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveSection(section.id, 'up'); }}
                        className="p-1 rounded bg-primary text-primary-foreground"
                      >
                        <ArrowUp className="h-2 w-2" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveSection(section.id, 'down'); }}
                        className="p-1 rounded bg-primary text-primary-foreground"
                      >
                        <ArrowDown className="h-2 w-2" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleVisibility(section.id); }}
                        className="p-1 rounded bg-muted text-foreground"
                      >
                        <Eye className="h-2 w-2" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteSection(section.id); }}
                        className="p-1 rounded bg-red-500 text-white"
                      >
                        <Trash2 className="h-2 w-2" />
                      </button>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Canvas Preview */}
          <CanvasPreview 
            sections={sections}
            selectedId={selectedId}
            onSelect={(id) => {
              setSelectedId(id)
              setRightCollapsed(false)
            }}
            viewport={viewport}
          />
        </div>
        
        {/* Right Panel - Settings */}
        <SettingsPanel 
          section={selectedSection}
          onUpdate={handleUpdateSection}
          isCollapsed={rightCollapsed}
          onToggle={() => setRightCollapsed(!rightCollapsed)}
        />
      </div>

      {/* Menu Manager Overlay Modal */}
      {isMenuManagerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background skeuo-panel rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl border border-border">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="font-serif text-2xl text-foreground">Dining Menu Manager</h2>
                  <p className="text-xs text-muted-foreground">Manage dishes shown on the separate /menu page</p>
                </div>
              </div>
              <button 
                onClick={() => setIsMenuManagerOpen(false)}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors font-semibold text-lg text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 grid md:grid-cols-2 gap-8">
              {/* Form Side */}
              <form onSubmit={handleSaveDish} className="space-y-4 skeuo-panel p-5 bg-muted/10 rounded-xl self-start">
                <h3 className="font-serif text-lg font-medium text-foreground">
                  {editingDish ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>
                
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Dish Name</label>
                  <Input 
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    placeholder="e.g., Karimeen Pollichathu"
                    className="skeuo-input"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Description</label>
                  <Textarea 
                    value={dishDesc}
                    onChange={(e) => setDishDesc(e.target.value)}
                    placeholder="Brief description of the recipe/ingredients..."
                    className="skeuo-input min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Price (INR)</label>
                    <Input 
                      type="number"
                      value={dishPrice}
                      onChange={(e) => setDishPrice(e.target.value)}
                      placeholder="e.g., 650"
                      className="skeuo-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Dietary Status</label>
                    <div className="flex items-center gap-2 mt-2">
                      <input 
                        type="checkbox" 
                        id="dishVeg" 
                        checked={dishVeg}
                        onChange={(e) => setDishVeg(e.target.checked)}
                        className="rounded border-border text-primary focus:ring-primary h-4 w-4"
                      />
                      <label htmlFor="dishVeg" className="text-sm font-medium flex items-center gap-1.5 cursor-pointer">
                        <Leaf className="h-4 w-4 text-green-500" /> Veg
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Image URL</label>
                  <Input 
                    value={dishImageUrl}
                    onChange={(e) => setDishImageUrl(e.target.value)}
                    placeholder="e.g., /images/dining-1.png"
                    className="skeuo-input"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="submit" className="skeuo-button flex-1">
                    {editingDish ? 'Update Dish' : 'Add Item'}
                  </Button>
                  {editingDish && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => {
                        setEditingDish(null)
                        setDishName('')
                        setDishDesc('')
                        setDishPrice('')
                        setDishVeg(true)
                        setDishImageUrl('')
                      }}
                      className="text-muted-foreground"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>

              {/* List Side */}
              <div className="space-y-4 flex flex-col min-h-[300px]">
                <h3 className="font-serif text-lg font-medium text-foreground">Active Menu Items ({dishes.length})</h3>
                
                {dishesLoading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : dishes.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-xl p-8 text-center text-muted-foreground italic">
                    No dishes found in database. Add one to get started!
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[50vh]">
                    {dishes.map((dish) => (
                      <div key={dish.id} className="skeuo-card p-4 flex gap-4 items-center justify-between border border-border/40">
                        <div className="flex items-center gap-3 min-w-0">
                          {dish.imageUrl ? (
                            <img src={dish.imageUrl} alt={dish.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                              <UtensilsCrossed className="h-5 w-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground truncate flex items-center gap-1.5">
                              {dish.name}
                              {dish.veg ? (
                                <span className="inline-flex items-center justify-center p-0.5 border border-green-600 rounded bg-green-50 scale-75">
                                  <span className="w-1 h-1 rounded-full bg-green-600" />
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center p-0.5 border border-red-600 rounded bg-red-50 scale-75">
                                  <span className="w-1 h-1 rounded-full bg-red-600" />
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{dish.description}</p>
                            <p className="text-xs font-semibold text-primary mt-0.5">₹{dish.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => {
                              setEditingDish(dish)
                              setDishName(dish.name)
                              setDishDesc(dish.description || '')
                              setDishPrice(String(dish.price))
                              setDishVeg(dish.veg)
                              setDishImageUrl(dish.imageUrl || '')
                            }}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteDish(dish.id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
