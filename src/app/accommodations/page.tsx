'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { 
  BedDouble, Users, ArrowRight, X, Check, Wifi, Wind, 
  Coffee, Shield, Tv, Bath, Eye, Heart
} from 'lucide-react'

const fallbackVillas = [
  {
    id: 'backwater',
    name: 'Backwater Villa',
    description: 'Traditional Kerala architecture with modern amenities overlooking the serene backwaters',
    longDescription: 'Wake up to the gentle sound of water and the sight of fishing boats gliding past your window. Our Backwater Villas offer an immersive experience of Kerala\'s famous waterways, featuring traditional wooden architecture with modern comforts. Each villa has a private deck where you can watch the sunset paint the waters in golden hues.',
    image: '/images/villa-1.png',
    price: '₹15,000',
    size: '120 m²',
    guests: 2,
    beds: '1 King Bed',
    view: 'Backwater View',
    features: ['Private Deck', 'Canoe Ride', 'Sunset View', 'Outdoor Bath'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker']
  },
  {
    id: 'coconut',
    name: 'Coconut Grove Suite',
    description: 'Nestled among swaying coconut palms with authentic Kerala decor',
    longDescription: 'Surrounded by towering coconut palms that sway in the gentle breeze, these suites offer a true tropical retreat. The interiors feature bamboo furniture and coconut wood accents, celebrating the versatile tree that Kerala is famous for. Enjoy your morning chai on the private balcony as birds sing in the grove.',
    image: '/images/villa-2.png',
    price: '₹12,000',
    size: '95 m²',
    guests: 2,
    beds: '1 King Bed',
    view: 'Garden View',
    features: ['Garden View', 'Outdoor Bath', 'Bird Watching', 'Private Balcony'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker']
  },
  {
    id: 'heritage',
    name: 'Heritage Nalukettu',
    description: 'Traditional Kerala courtyard house with wooden architecture',
    longDescription: 'Experience authentic Kerala living in our Heritage Nalukettu villas. These traditional courtyard houses feature intricate wood carvings, a central open courtyard (nadumuttam), and architecture that has been perfected over centuries. The natural ventilation and earthy tones create a cool, serene atmosphere.',
    image: '/images/villa-3.png',
    price: '₹18,000',
    size: '150 m²',
    guests: 4,
    beds: '2 Queen Beds',
    view: 'Courtyard View',
    features: ['Courtyard', 'Wood Carvings', 'Heritage Style', 'Rain Shower'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker']
  },
  {
    id: 'houseboat',
    name: 'Luxury Houseboat',
    description: 'Floating villa on the backwaters with complete privacy',
    longDescription: 'For the ultimate Kerala experience, stay on our luxury houseboat. These converted traditional Kettuvallams feature air-conditioned bedrooms, a private chef, and 360-degree views of the backwaters. Drift through the waterways and experience life on the water.',
    image: '/images/experience-1.png',
    price: '₹35,000',
    size: '200 m²',
    guests: 2,
    beds: '1 King Bed',
    view: '360° Backwater View',
    features: ['Private Chef', 'Butler Service', '360° View', 'Sun Deck'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Private Dining']
  },
  {
    id: 'pool',
    name: 'Pool Villa',
    description: 'Private plunge pool with garden views',
    longDescription: 'Our Pool Villas offer the perfect blend of luxury and privacy. Each villa features a private plunge pool surrounded by tropical gardens, an outdoor shower, and a spacious deck for sunbathing. The interiors blend modern luxury with traditional Kerala aesthetics.',
    image: '/images/gallery-3.png',
    price: '₹25,000',
    size: '180 m²',
    guests: 2,
    beds: '1 King Bed',
    view: 'Pool & Garden View',
    features: ['Private Pool', 'Garden View', 'Outdoor Shower', 'Sun Deck'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Tea Maker']
  },
  {
    id: 'royal',
    name: 'Royal Suite',
    description: 'Ultimate luxury with panoramic backwater views',
    longDescription: 'Our most exclusive accommodation, the Royal Suite offers unparalleled luxury with panoramic views of the backwaters. Features include a private infinity pool, personal butler service, spa treatment room, and a dining pavilion. Inspired by the royal palaces of Kerala, every detail speaks of opulence.',
    image: '/images/gallery-4.png',
    price: '₹50,000',
    size: '250 m²',
    guests: 4,
    beds: '1 King Bed + Living Area',
    view: 'Panoramic Backwater View',
    features: ['Private Pool', 'Butler Service', 'Spa Room', 'Dining Pavilion'],
    amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'In-room Safe', 'Smart TV', 'Private Chef']
  }
]

function AccommodationsContent() {
  const { t } = useLang()
  const cardsRef = useRef<HTMLDivElement>(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: "-100px" })
  const [villas, setVillas] = useState<any[]>([])
  const [selectedVilla, setSelectedVilla] = useState<any | null>(null)

  useEffect(() => {
    // Fetch dynamic rooms from the database
    fetch('/api/rooms')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          const activeRooms = data.filter((r: any) => r.active).map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            longDescription: r.longDescription || r.description,
            image: r.images[0] || '/images/placeholder.png',
            price: `₹${r.price.toLocaleString()}`,
            size: r.size,
            guests: r.maxGuests,
            beds: r.beds,
            view: r.view,
            features: r.features,
            amenities: r.amenities
          }))
          setVillas(activeRooms)
        } else {
          setVillas(fallbackVillas)
        }
      })
      .catch(err => {
        console.error('Failed to load database rooms, using static fallback:', err)
        setVillas(fallbackVillas)
      })
  }, [])

  const amenityIcons: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="h-4 w-4" />,
    'Air Conditioning': <Wind className="h-4 w-4" />,
    'Mini Bar': <Coffee className="h-4 w-4" />,
    'In-room Safe': <Shield className="h-4 w-4" />,
    'Smart TV': <Tv className="h-4 w-4" />,
    'Tea Maker': <Coffee className="h-4 w-4" />,
    'Private Chef': <Coffee className="h-4 w-4" />,
    'Private Dining': <Coffee className="h-4 w-4" />,
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.accommodations"
        subtitleKey="accommodations.subtitle"
        imageSrc="/images/villa-1.png"
        breadcrumbs={[{ name: 'Accommodations', href: '/accommodations' }]}
      />

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4">
            {t('accommodations.label')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
            Your Home in <span className="gold-metallic">Paradise</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Each villa is designed to reflect Kerala&apos;s rich heritage while providing modern comforts for an unforgettable stay. Choose from our range of accommodations, each offering a unique perspective on Kerala&apos;s natural beauty.
          </p>
        </div>
      </section>

      {/* Villa Cards */}
      <section ref={cardsRef} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((villa, index) => (
              <motion.div
                key={villa.id}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="skeuo-card group overflow-hidden cursor-pointer"
                onClick={() => setSelectedVilla(villa)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={villa.image}
                    alt={villa.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/80 text-sm">Starting from</p>
                    <p className="font-serif text-2xl text-white">{villa.price}<span className="text-sm">/night</span></p>
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                    {villa.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{villa.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {villa.features.slice(0, 3).map((feature) => (
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
                      <Eye className="h-4 w-4" />
                      <span>{villa.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{villa.guests} Guests</span>
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

      {/* Villa Detail Modal */}
      <AnimatePresence>
        {selectedVilla && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedVilla(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto skeuo-panel rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVilla(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative aspect-square md:aspect-auto">
                  <img
                    src={selectedVilla.image}
                    alt={selectedVilla.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-3xl text-foreground">{selectedVilla.name}</h2>
                    <p className="text-2xl gold-metallic font-serif mt-2">
                      {selectedVilla.price}<span className="text-base text-muted-foreground">/night</span>
                    </p>
                  </div>

                  <p className="text-muted-foreground">{selectedVilla.longDescription}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="skeuo-inset p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground">Size</p>
                      <p className="font-medium text-foreground">{selectedVilla.size}</p>
                    </div>
                    <div className="skeuo-inset p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground">Guests</p>
                      <p className="font-medium text-foreground">{selectedVilla.guests} People</p>
                    </div>
                    <div className="skeuo-inset p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground">Bedding</p>
                      <p className="font-medium text-foreground">{selectedVilla.beds}</p>
                    </div>
                    <div className="skeuo-inset p-4 rounded-lg">
                      <p className="text-xs text-muted-foreground">View</p>
                      <p className="font-medium text-foreground">{selectedVilla.view}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVilla.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-3 py-1.5 skeuo-card text-foreground rounded-full flex items-center gap-1"
                        >
                          <Check className="h-3 w-3 text-primary" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Amenities</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedVilla.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          {amenityIcons[amenity]}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full skeuo-button py-6 text-lg">
                    Book This Villa
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our reservations team is available 24/7 to help you find the perfect accommodation for your Kerala getaway.
          </p>
          <Button className="skeuo-button px-8 py-6 text-lg">
            Contact Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function AccommodationsPage() {
  return (
    <LanguageProvider>
      <AccommodationsContent />
    </LanguageProvider>
  )
}
