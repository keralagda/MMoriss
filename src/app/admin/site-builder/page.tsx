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
}

// Section Preview Component
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
      
    case 'accommodations-section':
      return (
        <div className="py-16 px-4 skeuo-inset mx-4 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Accommodations</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                Your Home in <span className="gold-metallic">Paradise</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Backwater Villa', price: '₹15,000', image: '/images/villa-1.png' },
                { name: 'Coconut Grove Suite', price: '₹12,000', image: '/images/villa-2.png' },
                { name: 'Heritage Nalukettu', price: '₹18,000', image: '/images/villa-3.png' }
              ].map((villa, i) => (
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
      
    case 'experiences-section':
      return (
        <div className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Kerala Experiences</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                Discover <span className="gold-metallic">God&apos;s Own Country</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Ship, name: 'Houseboat Cruise', desc: 'Drift through enchanting backwaters', image: '/images/experience-1.png' },
                { icon: Sparkles, name: 'Ayurveda Wellness', desc: 'Authentic healing traditions', image: '/images/spa.png' },
                { icon: Mountain, name: 'Village Experience', desc: 'Immerse in Kerala culture', image: '/images/experience-3.png' }
              ].map((exp, i) => (
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
      
    case 'ayurveda-section':
      return (
        <div className="py-16 px-4 skeuo-inset mx-4 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img src="/images/spa.png" alt="Ayurveda" className="rounded-2xl w-full aspect-square object-cover" />
              </div>
              <div className="space-y-4">
                <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Ayurveda & Wellness</p>
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground leading-tight">
                  Ancient Healing, <span className="gold-metallic">Modern Comfort</span>
                </h2>
                <p className="text-muted-foreground text-base">
                  Kerala is the birthplace of Ayurveda. Our wellness center offers authentic treatments using traditional herbs and oils sourced from Kerala.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['Panchakarma', 'Shirodhara', 'Abhyanga', 'Nasyam'].map((treatment, i) => (
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
      
    case 'dining-section':
      return (
        <div className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Kerala Cuisine</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                Flavors of <span className="gold-metallic">Kerala</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Backwater Restaurant', desc: 'Traditional Kerala Sadya & Seafood', image: '/images/dining-1.png' },
                { name: 'Sunset Chai Lounge', desc: 'Fresh chai & local snacks', image: '/images/dining-2.png' },
                { name: 'Cooking Classes', desc: 'Learn authentic Kerala dishes', image: '/images/dining-3.png' }
              ].map((item, i) => (
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
      
    case 'gallery-section':
      return (
        <div className="py-16 px-4 skeuo-inset mx-4 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Gallery</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                Moments in <span className="gold-metallic">Kerala</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['/images/gallery-1.png', '/images/gallery-2.png', '/images/gallery-3.png', '/images/gallery-4.png'].map((img, i) => (
                <div key={i} className={`skeuo-card overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover aspect-square" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )
      
    case 'contact-section':
      return (
        <div className="py-16 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Get in Touch</p>
                <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
                  Plan Your <span className="gold-metallic">Kerala Escape</span>
                </h2>
                <p className="text-muted-foreground text-base">
                  Our team is ready to help you plan an unforgettable experience in Munroe Island, Kollam.
                </p>
                <div className="space-y-3">
                  <div className="skeuo-card p-3 flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Location</p>
                      <p className="text-muted-foreground text-xs">Munroe Island, Kollam, Kerala 691502</p>
                    </div>
                  </div>
                  <div className="skeuo-card p-3 flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Phone</p>
                      <p className="text-muted-foreground text-xs">+91 474 XXXXXXX</p>
                    </div>
                  </div>
                  <div className="skeuo-card p-3 flex items-center gap-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-foreground text-sm">Email</p>
                      <p className="text-muted-foreground text-xs">reservations@munroemorris.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="skeuo-card p-5">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="First Name" className="skeuo-input w-full text-sm" />
                    <input type="text" placeholder="Last Name" className="skeuo-input w-full text-sm" />
                  </div>
                  <input type="email" placeholder="Email" className="skeuo-input w-full text-sm" />
                  <input type="tel" placeholder="Phone" className="skeuo-input w-full text-sm" />
                  <textarea placeholder="Your message..." className="skeuo-input w-full h-24 text-sm" />
                  <button className="w-full skeuo-button py-2 font-medium text-sm">Send Inquiry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      
    case 'testimonials-section':
      return (
        <div className="py-16 px-4 skeuo-inset mx-4 rounded-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Testimonials</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-foreground mt-3">
                What Our <span className="gold-metallic">Guests Say</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'Sarah J.', rating: 5, comment: 'Absolutely magical! The backwater views are stunning.' },
                { name: 'Rajesh K.', rating: 5, comment: 'Great Ayurveda treatments. Will definitely come back.' },
                { name: 'Emily C.', rating: 5, comment: 'The staff was incredibly helpful and the food amazing!' }
              ].map((review, i) => (
                <div key={i} className="skeuo-card p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`h-3 w-3 ${j < review.rating ? 'text-primary fill-primary' : 'text-muted'}`} />
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
      
    case 'cta-section':
      return (
        <div className="py-16 px-4 bg-gradient-to-r from-primary/20 to-gold-dark/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl lg:text-4xl text-foreground">
              Ready to Experience <span className="gold-metallic">Kerala</span>?
            </h2>
            <p className="text-muted-foreground text-base mt-3">
              Book your stay at Munroe Morris Service Villa and create unforgettable memories.
            </p>
            <button className="mt-6 skeuo-button px-6 py-3 text-base">
              Book Your Stay
            </button>
          </div>
        </div>
      )
      
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
    desktop: '100%',
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

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true))
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
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    localStorage.setItem('site-builder-sections', JSON.stringify(sections))
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
                    onClick={() => setSelectedId(section.id)}
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
            onSelect={setSelectedId}
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
    </div>
  )
}
