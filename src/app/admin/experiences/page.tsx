'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Search, Plus, Edit, Trash2, ToggleRight, ToggleLeft,
  Clock, Tag, Ship, Sparkles, Mountain, Music, Sun, TreeDeciduous, ChefHat, Flower2, Camera
} from 'lucide-react'

interface Experience {
  id: string
  name: string
  description: string
  duration: string
  price: number
  priceType: string
  highlights: string[]
  images: string[]
  active: boolean
  featured: boolean
  sortOrder: number
  minPeople?: number
  maxPeople?: number
  perHeadPrice?: number
}

const iconMap: Record<string, React.ElementType> = {
  houseboat: Ship,
  ayurveda: Sparkles,
  village: Mountain,
  kathakali: Music,
  canoe: Sun,
  spice: TreeDeciduous,
  cooking: ChefHat,
  yoga: Flower2,
}

const mockExperiences: Experience[] = [
  { id: '1', name: 'Houseboat Cruise', description: 'Drift through the enchanting backwaters on a traditional Kettuvallam houseboat', duration: 'Full Day / Overnight', price: 25000, priceType: 'per_couple', highlights: ['Private chef', 'Sunset views', 'Village life', 'Traditional cuisine'], images: ['/images/experience-1.png'], active: true, featured: true, sortOrder: 1, minPeople: 2, maxPeople: 10, perHeadPrice: 12500 },
  { id: '2', name: 'Ayurveda Wellness', description: 'Rejuvenate with authentic Ayurvedic treatments and therapies', duration: '1-21 Days Programs', price: 5000, priceType: 'per_session', highlights: ['Certified practitioners', 'Traditional herbs', 'Holistic healing', 'Custom programs'], images: ['/images/spa.png'], active: true, featured: true, sortOrder: 2, minPeople: 1, maxPeople: 1, perHeadPrice: 5000 },
  { id: '3', name: 'Village Life Experience', description: "Immerse yourself in Kerala's rich culture and traditions", duration: 'Half Day', price: 2500, priceType: 'per_person', highlights: ['Coir making', 'Fishing demo', 'Paddy fields', 'Local artisans'], images: ['/images/indoor-activity.jpg'], active: true, featured: false, sortOrder: 3, minPeople: 2, maxPeople: 15, perHeadPrice: 2500 },
  { id: '4', name: 'Kathakali Performance', description: "Witness the ancient art form of Kerala's classical dance-drama", duration: '2-3 Hours', price: 1500, priceType: 'per_person', highlights: ['Traditional makeup', 'Classical music', 'Epic stories', 'Photo opportunity'], images: ['/images/gallery-2.png'], active: true, featured: false, sortOrder: 4, minPeople: 4, maxPeople: 50, perHeadPrice: 1500 },
  { id: '5', name: 'Sunset Canoe Ride', description: 'Paddle through narrow canals as the sun sets over the backwaters', duration: '2 Hours', price: 1000, priceType: 'per_person', highlights: ['Narrow canals', 'Sunset views', 'Bird watching', 'Village glimpses'], images: ['/images/gallery-5.png'], active: true, featured: false, sortOrder: 5, minPeople: 1, maxPeople: 4, perHeadPrice: 1000 },
  { id: '6', name: 'Spice Plantation Tour', description: 'Explore the aromatic spice gardens of the Western Ghats', duration: 'Full Day', price: 3500, priceType: 'per_person', highlights: ['Cardamom fields', 'Pepper vines', 'Traditional lunch', 'Spice shopping'], images: ['/images/gallery-6.png'], active: true, featured: false, sortOrder: 6, minPeople: 2, maxPeople: 12, perHeadPrice: 3500 },
  { id: '7', name: 'Kerala Cooking Class', description: 'Learn to prepare authentic Kerala dishes with our master chefs', duration: '3 Hours', price: 2000, priceType: 'per_person', highlights: ['Fresh spices', 'Seafood prep', 'Recipe booklet', 'Meal included'], images: ['/images/gallery-1.png'], active: true, featured: true, sortOrder: 7, minPeople: 2, maxPeople: 8, perHeadPrice: 2000 },
  { id: '8', name: 'Yoga & Meditation', description: 'Find inner peace with traditional yoga and meditation sessions', duration: '1-2 Hours', price: 0, priceType: 'complimentary', highlights: ['Hatha yoga', 'Pranayama', 'Backwater views', 'All levels welcome'], images: ['/images/spa.png'], active: true, featured: false, sortOrder: 8, minPeople: 1, maxPeople: 20, perHeadPrice: 0 },
]

export default function ExperiencesPage() {
  const [mounted, setMounted] = useState(false)
  const [experiences, setExperiences] = useState<Experience[]>(mockExperiences)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => { Promise.resolve().then(() => setMounted(true)) }, [])

  const filteredExperiences = experiences.filter(exp =>
    exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleActive = (id: string) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, active: !e.active } : e))
  }

  const toggleFeatured = (id: string) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, featured: !e.featured } : e))
  }

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Experiences</h1>
          <p className="text-muted-foreground mt-1">Manage activities and excursions</p>
        </div>
        <Button className="skeuo-button">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search experiences..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 skeuo-inset rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredExperiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`skeuo-card overflow-hidden ${!exp.active ? 'opacity-60' : ''}`}
          >
            <div className="flex">
              {/* Image */}
              <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
                <img src={exp.images[0]} alt={exp.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Content */}
              <div className="flex-1 p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-lg text-foreground">{exp.name}</h3>
                  <div className="flex gap-1">
                    {exp.featured && (
                      <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Featured</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{exp.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {exp.duration}</span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" /> 
                    {exp.price === 0 ? 'Complimentary' : `From ₹${exp.price.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => toggleActive(exp.id)}
                    className="p-1.5 rounded hover:bg-primary/10 transition-colors"
                    title={exp.active ? 'Deactivate' : 'Activate'}
                  >
                    {exp.active ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                  </button>
                  <button
                    onClick={() => toggleFeatured(exp.id)}
                    className={`p-1.5 rounded transition-colors ${exp.featured ? 'text-primary' : 'text-muted-foreground'}`}
                    title={exp.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                  <Button variant="ghost" size="sm" className="ml-auto"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Star icon component
function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
