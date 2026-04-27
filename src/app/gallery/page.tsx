'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

function GalleryContent() {
  const { t } = useLang()
  const galleryRef = useRef<HTMLDivElement>(null)
  const galleryInView = useInView(galleryRef, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'resort', name: 'Resort' },
    { id: 'backwaters', name: 'Backwaters' },
    { id: 'culture', name: 'Culture' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'cuisine', name: 'Cuisine' }
  ]

  const images = [
    { id: 1, src: '/images/hero.png', category: 'backwaters', title: 'Sunrise over the Backwaters', desc: 'The golden hour paints the waters in magical hues' },
    { id: 2, src: '/images/gallery-1.png', category: 'resort', title: 'Heritage Villa', desc: 'Traditional Kerala architecture meets modern comfort' },
    { id: 3, src: '/images/gallery-2.png', category: 'culture', title: 'Kathakali Performance', desc: 'The ancient art form of Kerala' },
    { id: 4, src: '/images/gallery-3.png', category: 'resort', title: 'Pool Villa', desc: 'Private plunge pool with garden views' },
    { id: 5, src: '/images/gallery-4.png', category: 'wellness', title: 'Ayurveda Treatment', desc: 'Authentic healing therapies' },
    { id: 6, src: '/images/gallery-5.png', category: 'backwaters', title: 'Houseboat at Sunset', desc: 'Cruising through paradise' },
    { id: 7, src: '/images/gallery-6.png', category: 'cuisine', title: 'Kerala Sadya', desc: 'Traditional feast on banana leaf' },
    { id: 8, src: '/images/villa-1.png', category: 'resort', title: 'Backwater Villa', desc: 'Serene views from your room' },
    { id: 9, src: '/images/villa-2.png', category: 'resort', title: 'Coconut Grove Suite', desc: 'Amongst the coconut palms' },
    { id: 10, src: '/images/villa-3.png', category: 'resort', title: 'Heritage Nalukettu', desc: 'Traditional courtyard house' },
    { id: 11, src: '/images/experience-1.png', category: 'backwaters', title: 'Houseboat Experience', desc: 'Floating through the backwaters' },
    { id: 12, src: '/images/experience-3.png', category: 'culture', title: 'Village Tour', desc: 'Experiencing local life' },
    { id: 13, src: '/images/spa.png', category: 'wellness', title: 'Spa Interior', desc: 'Tranquil wellness space' },
    { id: 14, src: '/images/dining-1.png', category: 'cuisine', title: 'Karimeen Pollichathu', desc: 'Signature Kerala dish' },
    { id: 15, src: '/images/dining-2.png', category: 'cuisine', title: 'Traditional Breakfast', desc: 'Appam and stew' },
  ]

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter)

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
    if (direction === 'prev') {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
      setSelectedImage(filteredImages[newIndex].id)
    } else {
      const newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
      setSelectedImage(filteredImages[newIndex].id)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.gallery"
        subtitleKey="gallery.subtitle"
        imageSrc="/images/gallery-1.png"
        breadcrumbs={[{ name: 'Gallery', href: '/gallery' }]}
      />

      {/* Filter Tabs */}
      <section className="py-8 bg-background sticky top-20 z-30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === category.id
                    ? 'skeuo-button text-primary-foreground'
                    : 'skeuo-inset text-muted-foreground hover:text-primary'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={galleryRef} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`relative group cursor-pointer ${
                    index % 5 === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className={`skeuo-card overflow-hidden ${
                    index % 5 === 0 ? 'aspect-square' : 'aspect-[4/3]'
                  }`}>
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center text-white">
                        <ZoomIn className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="font-serif text-lg text-white">{image.title}</h4>
                      <p className="text-white/80 text-sm">{image.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            {(() => {
              const image = images.find(img => img.id === selectedImage)
              if (!image) return null
              return (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="max-w-5xl max-h-[90vh] p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                  <div className="text-center mt-4">
                    <h4 className="font-serif text-xl text-white">{image.title}</h4>
                    <p className="text-white/70">{image.desc}</p>
                  </div>
                </motion.div>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl text-foreground mb-4">
            Experience It in Person
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            These images capture just a glimpse of the Munroe Morris experience. Come and create your own memories.
          </p>
          <Button className="skeuo-button px-8 py-6 text-lg">
            Book Your Stay
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function GalleryPage() {
  return (
    <LanguageProvider>
      <GalleryContent />
    </LanguageProvider>
  )
}
