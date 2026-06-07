'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Search, Plus, Edit, Trash2, ToggleRight, ToggleLeft,
  Clock, Tag, Sparkles, Droplets, Heart, Wind, Leaf, Award
} from 'lucide-react'

interface SpaTreatment {
  id: string
  name: string
  sanskrit: string
  description: string
  duration: string
  price: number
  benefits: string[]
  images: string[]
  active: boolean
  featured: boolean
  sortOrder: number
}

interface WellnessPackage {
  id: string
  name: string
  description: string
  duration: string
  treatments: string[]
  price: number
  active: boolean
  featured: boolean
  sortOrder: number
}

const mockTreatments: SpaTreatment[] = [
  { id: '1', name: 'Panchakarma', sanskrit: 'പഞ്ചകർമ്മം', description: 'Complete detoxification program', duration: '21-28 Days', price: 95000, benefits: ['Deep detoxification', 'Restored balance', 'Enhanced immunity', 'Mental clarity'], images: ['/images/spa.png'], active: true, featured: true, sortOrder: 1 },
  { id: '2', name: 'Shirodhara', sanskrit: 'ശിരോധാര', description: 'Meditative oil therapy', duration: '45-60 Minutes', price: 5000, benefits: ['Deep relaxation', 'Better sleep', 'Mental clarity', 'Stress relief'], images: ['/images/gallery-1.png'], active: true, featured: true, sortOrder: 2 },
  { id: '3', name: 'Abhyanga', sanskrit: 'അഭ്യംഗ', description: 'Full body massage', duration: '60-90 Minutes', price: 4000, benefits: ['Improved circulation', 'Skin nourishment', 'Fatigue relief', 'Muscle relaxation'], images: ['/images/gallery-2.png'], active: true, featured: false, sortOrder: 3 },
  { id: '4', name: 'Nasyam', sanskrit: 'നസ്യം', description: 'Nasal treatment therapy', duration: '30-45 Minutes', price: 3500, benefits: ['Sinus relief', 'Improved breathing', 'Mental clarity', 'Headache relief'], images: ['/images/gallery-3.png'], active: true, featured: false, sortOrder: 4 },
  { id: '5', name: 'Udvarthanam', sanskrit: 'ഉദ്വർത്ഥനം', description: 'Herbal powder massage', duration: '60 Minutes', price: 4500, benefits: ['Weight reduction', 'Skin toning', 'Cellulite reduction', 'Metabolism boost'], images: ['/images/gallery-4.png'], active: true, featured: false, sortOrder: 5 },
  { id: '6', name: 'Pizhichil', sanskrit: 'പിഴിച്ചിൽ', description: 'Oil bath therapy', duration: '60-90 Minutes', price: 6000, benefits: ['Deep rejuvenation', 'Joint health', 'Neurological benefits', 'Skin nourishment'], images: ['/images/gallery-5.png'], active: true, featured: true, sortOrder: 6 },
]

const mockPackages: WellnessPackage[] = [
  { id: '1', name: 'Rejuvenation Package', description: '7 days of revitalizing treatments for body and mind', duration: '7 Days', treatments: ['Abhyanga', 'Shirodhara', 'Herbal Bath', 'Yoga'], price: 45000, active: true, featured: true, sortOrder: 1 },
  { id: '2', name: 'Detox Package', description: '14 days of deep cleansing and purification', duration: '14 Days', treatments: ['Panchakarma Prep', 'Abhyanga', 'Nasyam', 'Specialized Diet'], price: 95000, active: true, featured: true, sortOrder: 2 },
  { id: '3', name: 'Stress Relief Package', description: '5 days focused on relaxation and mental wellness', duration: '5 Days', treatments: ['Shirodhara', 'Head Massage', 'Yoga', 'Meditation'], price: 28000, active: true, featured: false, sortOrder: 3 },
  { id: '4', name: 'Weight Management', description: '21 days of targeted treatments and diet', duration: '21 Days', treatments: ['Udvarthanam', 'Herbal Steam', 'Specialized Diet', 'Yoga'], price: 150000, active: true, featured: false, sortOrder: 4 },
]

export default function SpaPage() {
  const [mounted, setMounted] = useState(false)
  const [treatments, setTreatments] = useState<SpaTreatment[]>(mockTreatments)
  const [packages, setPackages] = useState<WellnessPackage[]>(mockPackages)
  const [activeTab, setActiveTab] = useState<'treatments' | 'packages'>('treatments')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => { Promise.resolve().then(() => setMounted(true)) }, [])

  const toggleTreatmentActive = (id: string) => {
    setTreatments(treatments.map(t => t.id === id ? { ...t, active: !t.active } : t))
  }

  const togglePackageActive = (id: string) => {
    setPackages(packages.map(p => p.id === id ? { ...p, active: !p.active } : p))
  }

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Spa & Wellness</h1>
          <p className="text-muted-foreground mt-1">Manage treatments and wellness packages</p>
        </div>
        <Button className="skeuo-button">
          <Plus className="h-4 w-4 mr-2" />
          Add {activeTab === 'treatments' ? 'Treatment' : 'Package'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('treatments')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'treatments' ? 'skeuo-button text-primary-foreground' : 'skeuo-inset text-muted-foreground hover:text-foreground'
          }`}
        >
          Treatments
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === 'packages' ? 'skeuo-button text-primary-foreground' : 'skeuo-inset text-muted-foreground hover:text-foreground'
          }`}
        >
          Wellness Packages
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 skeuo-inset rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {activeTab === 'treatments' ? (
        /* Treatments Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`skeuo-card overflow-hidden ${!treatment.active ? 'opacity-60' : ''}`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={treatment.images[0]} alt={treatment.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-primary text-sm">{treatment.sanskrit}</p>
                  <h3 className="font-serif text-xl text-white">{treatment.name}</h3>
                </div>
                {treatment.featured && (
                  <span className="absolute top-4 right-4 text-xs px-2 py-1 bg-primary text-primary-foreground rounded-full">Featured</span>
                )}
              </div>
              
              <div className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground">{treatment.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {treatment.duration}</span>
                  <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> ₹{treatment.price.toLocaleString()}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {treatment.benefits.slice(0, 3).map((benefit) => (
                    <span key={benefit} className="text-xs px-2 py-0.5 skeuo-inset text-muted-foreground rounded-full">{benefit}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <button onClick={() => toggleTreatmentActive(treatment.id)} className="p-1.5 rounded hover:bg-primary/10">
                    {treatment.active ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                  </button>
                  <Button variant="ghost" size="sm" className="ml-auto"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Packages Grid */
        <div className="grid md:grid-cols-2 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`skeuo-card p-6 ${!pkg.active ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-xl text-foreground">{pkg.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{pkg.description}</p>
                </div>
                <span className="text-xs px-2 py-1 skeuo-inset text-muted-foreground rounded-full">{pkg.duration}</span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-xs font-medium text-foreground">Included Treatments:</p>
                <div className="grid grid-cols-2 gap-2">
                  {pkg.treatments.map((tr) => (
                    <div key={tr} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span>{tr}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="font-serif text-xl gold-metallic">₹{pkg.price.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => togglePackageActive(pkg.id)} className="p-1.5 rounded hover:bg-primary/10">
                    {pkg.active ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                  </button>
                  <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
