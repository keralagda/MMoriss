'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { 
  UtensilsCrossed, Leaf, Coffee, ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

interface Dish {
  id: string
  name: string
  description: string
  price: number
  veg: boolean
  imageUrl: string | null
}

function MenuContent() {
  const { t } = useLang()
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'veg' | 'nonveg'>('all')

  useEffect(() => {
    fetch('/api/dishes')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) {
          setDishes(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load menu dishes:', err)
        setLoading(false)
      })
  }, [])

  const filteredDishes = dishes.filter(dish => {
    if (filter === 'veg') return dish.veg
    if (filter === 'nonveg') return !dish.veg
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <PageHero 
        title="Our Culinary Menu" 
        subtitle="Savor the Authentic Flavors of Kerala"
        bgImage="/images/dining-2.png"
      />

      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Back Link and Filter Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <Button variant="ghost" className="self-start text-muted-foreground hover:text-foreground" asChild>
            <Link href="/dining">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dining Venues
            </Link>
          </Button>

          <div className="flex items-center gap-2 px-2 py-1.5 skeuo-inset rounded-2xl self-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 text-sm font-medium rounded-xl transition-all ${
                filter === 'all' ? 'skeuo-button text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilter('veg')}
              className={`px-5 py-2 text-sm font-medium rounded-xl flex items-center gap-2 transition-all ${
                filter === 'veg' ? 'skeuo-button text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Leaf className="h-4 w-4 text-green-500" />
              Pure Veg
            </button>
            <button
              onClick={() => setFilter('nonveg')}
              className={`px-5 py-2 text-sm font-medium rounded-xl transition-all ${
                filter === 'nonveg' ? 'skeuo-button text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Non-Veg
            </button>
          </div>
        </div>

        {/* Menu Parchment */}
        <div className="skeuo-inset p-2 rounded-3xl bg-amber-50/5">
          <div className="bg-[#FAF6EE] text-[#2C2416] p-8 md:p-16 rounded-2xl border-4 border-double border-[#C5A880]/30 shadow-2xl relative overflow-hidden">
            {/* Skeuomorphic corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#C5A880]/40 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#C5A880]/40 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#C5A880]/40 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#C5A880]/40 rounded-br-lg" />

            <div className="text-center max-w-xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-2 mb-3">
                <UtensilsCrossed className="h-6 w-6 text-[#C5A880]" />
                <span className="text-[#C5A880] text-sm tracking-[0.2em] uppercase font-medium">Carte Du Jour</span>
                <Coffee className="h-6 w-6 text-[#C5A880]" />
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-semibold border-b border-[#C5A880]/20 pb-4">
                Signature Delicacies
              </h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="animate-spin h-8 w-8 border-2 border-[#C5A880] border-t-transparent rounded-full" />
                <p className="font-serif text-[#C5A880] italic">Preparing the menu...</p>
              </div>
            ) : filteredDishes.length === 0 ? (
              <div className="text-center py-20 text-[#C5A880]/80 italic font-serif">
                No items available in this category.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                {filteredDishes.map((dish) => (
                  <motion.div 
                    layout
                    key={dish.id} 
                    className="flex gap-4 items-start border-b border-dashed border-[#C5A880]/10 pb-6"
                  >
                    {dish.imageUrl && (
                      <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg border border-[#C5A880]/20 flex-shrink-0 bg-white">
                        <img 
                          src={dish.imageUrl} 
                          alt={dish.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-serif text-lg font-semibold flex items-center gap-2">
                          {dish.name}
                          {dish.veg ? (
                            <span className="inline-flex items-center justify-center p-0.5 border border-green-600 rounded bg-green-50">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center p-0.5 border border-red-600 rounded bg-red-50">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            </span>
                          )}
                        </h3>
                        <span className="font-semibold text-primary">₹{dish.price}</span>
                      </div>
                      <p className="text-sm mt-1 text-[#2C2416]/70 leading-relaxed font-sans">
                        {dish.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen flex flex-col leather-texture">
        <Navigation />
        <MenuContent />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
