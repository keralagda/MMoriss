'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search, Plus, Edit, Trash2, Image, X, Upload,
  Grid, LayoutGrid, Check, Star
} from 'lucide-react'

interface GalleryImage {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  featured: boolean
  active: boolean
  sortOrder: number
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'resort', name: 'Service Villa' },
  { id: 'backwaters', name: 'Backwaters' },
  { id: 'culture', name: 'Culture' },
  { id: 'wellness', name: 'Wellness' },
  { id: 'cuisine', name: 'Cuisine' }
]

const mockImages: GalleryImage[] = [
  { id: '1', title: 'Sunrise over the Backwaters', description: 'The golden hour paints the waters in magical hues', category: 'backwaters', imageUrl: '/images/birds-view.jpg', featured: true, active: true, sortOrder: 1 },
  { id: '2', title: 'Heritage Villa', description: 'Traditional Kerala architecture meets modern comfort', category: 'resort', imageUrl: '/images/room-collage.jpg', featured: false, active: true, sortOrder: 2 },
  { id: '3', title: 'Kathakali Performance', description: 'The ancient art form of Kerala', category: 'culture', imageUrl: '/images/gallery-2.png', featured: true, active: true, sortOrder: 3 },
  { id: '4', title: 'Pool Villa', description: 'Private plunge pool with garden views', category: 'resort', imageUrl: '/images/front-exterior.jpg', featured: false, active: true, sortOrder: 4 },
  { id: '5', title: 'Ayurveda Treatment', description: 'Authentic healing therapies', category: 'wellness', imageUrl: '/images/birds-view.jpg', featured: false, active: true, sortOrder: 5 },
  { id: '6', title: 'Houseboat at Sunset', description: 'Cruising through paradise', category: 'backwaters', imageUrl: '/images/gallery-5.png', featured: true, active: true, sortOrder: 6 },
  { id: '7', title: 'Kerala Sadya', description: 'Traditional feast on banana leaf', category: 'cuisine', imageUrl: '/images/gallery-6.png', featured: false, active: true, sortOrder: 7 },
  { id: '8', title: 'Backwater Villa', description: 'Serene views from your room', category: 'resort', imageUrl: '/images/room-collage.jpg', featured: false, active: true, sortOrder: 8 },
  { id: '9', title: 'Coconut Grove Suite', description: 'Amongst the coconut palms', category: 'resort', imageUrl: '/images/room-collage-2.jpg', featured: false, active: true, sortOrder: 9 },
  { id: '10', title: 'Heritage Nalukettu', description: 'Traditional courtyard house', category: 'resort', imageUrl: '/images/exterior-interior-collage.jpg', featured: false, active: true, sortOrder: 10 },
  { id: '11', title: 'Houseboat Experience', description: 'Floating through the backwaters', category: 'backwaters', imageUrl: '/images/experience-1.png', featured: false, active: true, sortOrder: 11 },
  { id: '12', title: 'Village Tour', description: 'Experiencing local life', category: 'culture', imageUrl: '/images/indoor-activity.jpg', featured: false, active: true, sortOrder: 12 },
  { id: '13', title: 'Spa Interior', description: 'Tranquil wellness space', category: 'wellness', imageUrl: '/images/spa.png', featured: false, active: true, sortOrder: 13 },
  { id: '14', title: 'Karimeen Pollichathu', description: 'Signature Kerala dish', category: 'cuisine', imageUrl: '/images/dining-1.png', featured: false, active: true, sortOrder: 14 },
  { id: '15', title: 'Traditional Breakfast', description: 'Appam and stew', category: 'cuisine', imageUrl: '/images/dining-2.png', featured: false, active: true, sortOrder: 15 },
]

// Image Detail Modal
function ImageDetailModal({
  image,
  onClose
}: {
  image: GalleryImage | null
  onClose: () => void
}) {
  if (!image) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20">
        <X className="h-6 w-6" />
      </button>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-5xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.imageUrl} alt={image.title} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
        <div className="text-center mt-4">
          <h3 className="text-xl font-serif text-white">{image.title}</h3>
          <p className="text-white/70">{image.description}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">{image.category}</span>
            {image.featured && <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full">Featured</span>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>(mockImages)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => { Promise.resolve().then(() => setMounted(true)) }, [])

  const filteredImages = images.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || img.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const toggleFeatured = (id: string) => {
    setImages(images.map(img => img.id === id ? { ...img, featured: !img.featured } : img))
  }

  const toggleActive = (id: string) => {
    setImages(images.map(img => img.id === id ? { ...img, active: !img.active } : img))
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Gallery</h1>
          <p className="text-muted-foreground mt-1">Manage images and media</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <span className="text-sm text-muted-foreground">{selectedIds.length} selected</span>
          )}
          <Button className="skeuo-button">
            <Upload className="h-4 w-4 mr-2" />
            Upload Images
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 skeuo-inset rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id ? 'skeuo-button text-primary-foreground' : 'skeuo-inset text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="skeuo-card p-4"><p className="text-sm text-muted-foreground">Total Images</p><p className="text-2xl font-serif font-semibold text-foreground">{images.length}</p></div>
        <div className="skeuo-card p-4"><p className="text-sm text-muted-foreground">Featured</p><p className="text-2xl font-serif font-semibold text-foreground">{images.filter(i => i.featured).length}</p></div>
        <div className="skeuo-card p-4"><p className="text-sm text-muted-foreground">Active</p><p className="text-2xl font-serif font-semibold text-foreground">{images.filter(i => i.active).length}</p></div>
        <div className="skeuo-card p-4"><p className="text-sm text-muted-foreground">Categories</p><p className="text-2xl font-serif font-semibold text-foreground">{categories.length - 1}</p></div>
      </div>

      {/* Gallery Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.02 }}
              className={`relative group cursor-pointer skeuo-card overflow-hidden ${!image.active ? 'opacity-60' : ''} ${
                selectedIds.includes(image.id) ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="aspect-square overflow-hidden" onClick={() => setSelectedImage(image)}>
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium line-clamp-1">{image.title}</p>
                  <p className="text-white/70 text-xs">{image.category}</p>
                </div>
              </div>

              {/* Selection Checkbox */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleSelect(image.id) }}
                className={`absolute top-2 left-2 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                  selectedIds.includes(image.id) ? 'bg-primary text-primary-foreground' : 'bg-black/50 text-white opacity-0 group-hover:opacity-100'
                }`}
              >
                {selectedIds.includes(image.id) && <Check className="h-4 w-4" />}
              </button>

              {/* Featured Badge */}
              {image.featured && (
                <span className="absolute top-2 right-2 p-1 bg-yellow-500 rounded-lg text-white">
                  <Star className="h-3 w-3 fill-current" />
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Image Detail Modal */}
      <AnimatePresence>
        {selectedImage && <ImageDetailModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
      </AnimatePresence>
    </div>
  )
}
