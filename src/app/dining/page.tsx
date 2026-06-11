'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { 
  UtensilsCrossed, Coffee, Clock, MapPin, ArrowRight, Leaf,
  ChefHat, Wine, Users, Star
} from 'lucide-react'

const fallbackDishes = [
  {
    name: 'Karimeen Pollichathu',
    description: 'Pearl spot fish marinated with spices and wrapped in banana leaf',
    image: '/images/dining-1.png',
    price: '₹650',
    veg: false
  },
  {
    name: 'Kerala Sadya',
    description: 'Traditional vegetarian feast with 24+ dishes served on banana leaf',
    image: '/images/dining-2.png',
    price: '₹750',
    veg: true
  },
  {
    name: 'Appam & Stew',
    description: 'Fermented rice pancakes with creamy vegetable or meat stew',
    image: '/images/dining-3.png',
    price: '₹350',
    veg: true
  },
  {
    name: 'Chemmeen Curry',
    description: 'Kerala-style prawn curry with coconut milk and kokum',
    image: '/images/dining-4.png',
    price: '₹550',
    veg: false
  },
  {
    name: 'Puttu & Kadala',
    description: 'Steamed rice cake with black chickpea curry - a breakfast favorite',
    image: '/images/gallery-1.png',
    price: '₹250',
    veg: true
  },
  {
    name: 'Palada Payasam',
    description: 'Traditional rice flake dessert in sweetened milk',
    image: '/images/gallery-2.png',
    price: '₹200',
    veg: true
  }
]

const fallbackVenues = [
  {
    name: 'The Backwater Restaurant',
    description: 'Our main restaurant offers panoramic views of the backwaters while you enjoy authentic Kerala cuisine prepared with locally sourced ingredients.',
    image: '/images/gallery-3.png',
    cuisine: 'Kerala & International',
    capacity: '80 guests',
    timing: '7:00 AM - 10:00 PM'
  },
  {
    name: 'Sunset Chai Lounge',
    description: 'Relax with fresh chai and local snacks while watching the sun set over the backwaters. The perfect spot for afternoon relaxation.',
    image: '/images/gallery-4.png',
    cuisine: 'Snacks & Beverages',
    capacity: '40 guests',
    timing: '3:00 PM - 7:00 PM'
  },
  {
    name: 'Private Dining Pavilion',
    description: 'For special occasions, reserve our private dining pavilion for an intimate dining experience with personalized menu and butler service.',
    image: '/images/gallery-5.png',
    cuisine: 'Custom Menu',
    capacity: '12 guests',
    timing: 'By Reservation'
  }
]

function DiningContent() {
  const { t } = useLang()
  const menuRef = useRef<HTMLDivElement>(null)
  const venuesRef = useRef<HTMLDivElement>(null)
  const menuInView = useInView(menuRef, { once: true, margin: "-100px" })
  const venuesInView = useInView(venuesRef, { once: true, margin: "-100px" })

  const [venues, setVenues] = useState<any[]>([])
  const [signatureDishes, setSignatureDishes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dining')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          if (data.venues && data.venues.length > 0) {
            setVenues(data.venues.map((v: any) => {
              let img = '/images/gallery-3.png'
              try {
                const parsedImgs = JSON.parse(v.images)
                if (Array.isArray(parsedImgs) && parsedImgs.length > 0) {
                  img = parsedImgs[0]
                }
              } catch (e) {}
              return {
                name: v.name,
                description: v.description,
                image: img,
                cuisine: v.cuisine,
                capacity: v.capacity,
                timing: v.timing
              }
            }))
          } else {
            setVenues(fallbackVenues)
          }

          if (data.dishes && data.dishes.length > 0) {
            setSignatureDishes(data.dishes.map((d: any) => ({
              name: d.name,
              description: d.description,
              image: d.imageUrl || '/images/dining-1.png',
              price: `₹${Number(d.price).toLocaleString()}`,
              veg: d.veg
            })))
          } else {
            setSignatureDishes(fallbackDishes)
          }
        } else {
          setVenues(fallbackVenues)
          setSignatureDishes(fallbackDishes)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load dining database records, falling back:', err)
        setVenues(fallbackVenues)
        setSignatureDishes(fallbackDishes)
        setLoading(false)
      })
  }, [])

  const dietaryOptions = [
    { name: 'Vegetarian', icon: <Leaf className="h-5 w-5" /> },
    { name: 'Vegan', icon: <Leaf className="h-5 w-5" /> },
    { name: 'Gluten-Free', icon: <Leaf className="h-5 w-5" /> },
    { name: 'Jain Options', icon: <Leaf className="h-5 w-5" /> }
  ]


  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.dining"
        subtitleKey="dining.p1"
        imageSrc="/images/gallery-3.png"
        breadcrumbs={[{ name: 'Dining', href: '/dining' }]}
      />

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4">
            {t('dining.label')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
            Flavors of <span className="gold-metallic">Kerala</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Savor the authentic tastes of Kerala, from traditional Sadya served on banana leaves to fresh Karimeen caught from the backwaters. Our chefs use recipes passed down through generations.
          </p>
        </div>
      </section>

      {/* Venues */}
      <section ref={venuesRef} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={venuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="font-serif text-3xl text-foreground mb-4">Our Venues</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our distinctive dining venues, each offering a unique atmosphere and culinary experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <motion.div
                key={venue.name}
                initial={{ opacity: 0, y: 30 }}
                animate={venuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="skeuo-card overflow-hidden group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h4 className="font-serif text-xl text-foreground">{venue.name}</h4>
                  <p className="text-muted-foreground text-sm">{venue.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <UtensilsCrossed className="h-4 w-4 text-primary" />
                      <span>{venue.cuisine}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{venue.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{venue.timing}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section ref={menuRef} className="py-24 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={menuInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="font-serif text-3xl text-foreground mb-4">Signature Dishes</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most beloved dishes, crafted with love using traditional recipes and the freshest local ingredients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {signatureDishes.map((dish, index) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 20 }}
                animate={menuInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="skeuo-card p-4 flex gap-4 group"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {dish.veg && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full border border-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-lg text-foreground">{dish.name}</h4>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{dish.description}</p>
                  <p className="text-primary font-medium mt-2">{dish.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="skeuo-button px-8 py-6">
              View Full Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Dietary Options */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-serif text-2xl text-foreground mb-6">Dietary Accommodations</h3>
          <p className="text-muted-foreground mb-8">
            We cater to various dietary requirements. Please inform our staff of any allergies or preferences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {dietaryOptions.map((option) => (
              <div key={option.name} className="skeuo-card px-6 py-3 flex items-center gap-2">
                <span className="text-primary">{option.icon}</span>
                <span className="text-foreground">{option.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cooking Class CTA */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <ChefHat className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
            Kerala Cooking Classes
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn to prepare authentic Kerala dishes with our master chefs. Take home recipes and skills to recreate the flavors of Kerala in your own kitchen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="skeuo-button px-8 py-6 text-lg">
              Book Cooking Class
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-muted-foreground text-sm">
              3 hours · From ₹2,000/person
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function DiningPage() {
  return (
    <LanguageProvider>
      <DiningContent />
    </LanguageProvider>
  )
}
