'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, Navigation, Footer, GetQuoteModal 
} from '@/components/resort'
import { 
  BedDouble, Users, ArrowRight, Check, Wifi, Wind, 
  Coffee, Shield, Tv, Bath, Eye, Sparkles, ChevronLeft
} from 'lucide-react'

interface RoomDetails {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  price: number
  size: string
  maxGuests: number
  beds: string
  view: string
  features: string[]
  amenities: string[]
  images: string[]
}

function RoomDetailsContent() {
  const params = useParams()
  const slug = params?.slug as string

  const [room, setRoom] = useState<RoomDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<string>('')

  useEffect(() => {
    if (!slug) return

    fetch(`/api/rooms/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Room details not found')
        return res.json()
      })
      .then((data) => {
        setRoom(data)
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0])
        }
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [slug])

  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="h-5 w-5" />,
    'Air Conditioning': <Wind className="h-5 w-5" />,
    'Mini Bar': <Coffee className="h-5 w-5" />,
    'In-room Safe': <Shield className="h-5 w-5" />,
    'Smart TV': <Tv className="h-5 w-5" />,
    'Tea Maker': <Coffee className="h-5 w-5" />,
    'Private Chef': <Coffee className="h-5 w-5" />,
    'Private Dining': <Coffee className="h-5 w-5" />,
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex flex-col justify-between">
        <Navigation />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="animate-pulse text-muted-foreground text-sm font-serif">Curating villa details...</div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !room) {
    return (
      <main className="min-h-screen bg-background flex flex-col justify-between">
        <Navigation />
        <div className="flex-grow flex flex-col items-center justify-center py-20 text-center px-4">
          <h2 className="font-serif text-3xl text-foreground mb-4">Villa Not Found</h2>
          <p className="text-muted-foreground mb-6">We could not locate the details for this accommodation.</p>
          <Button onClick={() => window.location.href = '/accommodations'} className="skeuo-button py-4 px-6">
            Back to Accommodations
          </Button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <button 
          onClick={() => window.location.href = '/accommodations'}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-semibold"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Accommodations
        </button>
      </div>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column: Images Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden skeuo-card bg-muted">
                <img 
                  src={activeImage || '/images/placeholder.png'} 
                  alt={room.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {room.images && room.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {room.images.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`relative aspect-[4/3] w-24 rounded-lg overflow-hidden shrink-0 transition-all ${
                        activeImage === imgUrl ? 'ring-2 ring-primary scale-95 shadow-inner' : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`${room.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details & Booking CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-1.5 mb-2">
                  <Sparkles className="h-4 w-4" /> Accommodation Sanctuary
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-semibold leading-tight">
                  {room.name}
                </h1>
                <p className="text-muted-foreground text-sm mt-2">{room.view} • {room.size}</p>
              </div>

              <div className="divider-gold" />

              <div className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {room.longDescription || room.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="skeuo-inset p-4 rounded-xl bg-[#E6EAF0]">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Dimensions</span>
                  <p className="font-serif font-bold text-foreground mt-0.5">{room.size}</p>
                </div>
                <div className="skeuo-inset p-4 rounded-xl bg-[#E6EAF0]">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Capacity</span>
                  <p className="font-serif font-bold text-foreground mt-0.5">{room.maxGuests} Guests</p>
                </div>
                <div className="skeuo-inset p-4 rounded-xl bg-[#E6EAF0]">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Bedding Setup</span>
                  <p className="font-serif font-bold text-foreground mt-0.5">{room.beds}</p>
                </div>
                <div className="skeuo-inset p-4 rounded-xl bg-[#E6EAF0]">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Vibe View</span>
                  <p className="font-serif font-bold text-foreground mt-0.5">{room.view}</p>
                </div>
              </div>

              {/* Room Rules & Policies */}
              <div className="skeuo-card p-5 border border-white/60 space-y-3 bg-[#E6EAF0]/20">
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
                  <Shield className="h-4 w-4" /> Guest Rules & Policies
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Couples allowed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Age 18+ only</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>KYC documents required</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>No pet policy</span>
                  </div>
                </div>
              </div>

              {/* CTA Booking Button */}
              <div className="skeuo-card p-6 border border-white/60 bg-gradient-to-br from-primary/5 to-gold-dark/5 space-y-4">
                <div className="text-center md:text-left">
                  <span className="text-xs text-muted-foreground font-serif">Pricing Policy</span>
                  <h3 className="font-serif text-xl font-bold text-foreground mt-0.5">Exclusive Concierge Quoting</h3>
                  <p className="text-xs text-muted-foreground/80 mt-1">
                    To maintain flexibility and arrange special packages, we offer customized price proposals based on check-in dates and extra amenities.
                  </p>
                </div>
                <Button 
                  onClick={() => setIsQuoteOpen(true)}
                  className="w-full skeuo-button py-6 text-sm font-semibold flex items-center justify-center gap-2 group"
                >
                  Request Customized Quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

            </div>

          </div>

          <div className="grid lg:grid-cols-12 gap-12 mt-16 pt-12 border-t border-border">
            
            {/* Features */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-foreground">Signature Features</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-foreground">Room Conveniences</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="text-primary/70 shrink-0">
                      {amenityIcons[amenity] || <Check className="h-4 w-4" />}
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <GetQuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        roomType={room.name}
      />

      <Footer />
    </main>
  )
}

export default function RoomDetailsPage() {
  return (
    <LanguageProvider>
      <RoomDetailsContent />
    </LanguageProvider>
  )
}
