'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { 
  Ship, Sparkles, Mountain, ArrowRight, Clock, Tag,
  Music, Sun, TreeDeciduous, ChefHat, Flower2, Camera
} from 'lucide-react'

function ExperiencesContent() {
  const { t } = useLang()
  const experiencesRef = useRef<HTMLDivElement>(null)
  const experiencesInView = useInView(experiencesRef, { once: true, margin: "-100px" })

  const experiences = [
    {
      id: 'houseboat',
      icon: <Ship className="h-8 w-8" />,
      title: 'Houseboat Cruise',
      description: 'Drift through the enchanting backwaters on a traditional Kettuvallam houseboat',
      longDescription: 'Experience the magic of Kerala\'s backwaters aboard a traditional Kettuvallam houseboat. These converted rice barges feature comfortable bedrooms, a dining area, and an open deck for viewing the passing scenery. Your private chef will prepare authentic Kerala cuisine as you drift past villages, paddy fields, and coconut groves.',
      image: '/images/experience-1.png',
      duration: 'Full Day / Overnight',
      price: 'From ₹25,000/couple',
      highlights: ['Private chef', 'Sunset views', 'Village life', 'Traditional cuisine'],
      minPeople: 2,
      maxPeople: 10,
      perHeadPrice: 12500
    },
    {
      id: 'ayurveda',
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Ayurveda Wellness',
      description: 'Rejuvenate with authentic Ayurvedic treatments and therapies',
      longDescription: 'Kerala is the birthplace of Ayurveda, the 5000-year-old science of life. Our certified Ayurveda center offers a range of treatments from relaxing massages to comprehensive healing programs. All therapies are administered by trained practitioners using traditional herbal oils and medicines.',
      image: '/images/spa.png',
      duration: '1-21 Days Programs',
      price: 'From ₹5,000/session',
      highlights: ['Certified practitioners', 'Traditional herbs', 'Holistic healing', 'Custom programs'],
      minPeople: 1,
      maxPeople: 1,
      perHeadPrice: 5000
    },
    {
      id: 'village',
      icon: <Mountain className="h-8 w-8" />,
      title: 'Village Life Experience',
      description: "Immerse yourself in Kerala's rich culture and traditions",
      longDescription: 'Step into the authentic Kerala village life with our guided tours. Visit local coir making units, watch traditional fishing techniques, learn about paddy cultivation, and interact with local artisans. Experience the simplicity and warmth of rural Kerala.',
      image: '/images/experience-3.png',
      duration: 'Half Day',
      price: 'From ₹2,500/person',
      highlights: ['Coir making', 'Fishing demo', 'Paddy fields', 'Local artisans'],
      minPeople: 2,
      maxPeople: 15,
      perHeadPrice: 2500
    },
    {
      id: 'kathakali',
      icon: <Music className="h-8 w-8" />,
      title: 'Kathakali Performance',
      description: 'Witness the ancient art form of Kerala\'s classical dance-drama',
      longDescription: 'Kathakali is a 300-year-old classical dance form that combines dance, drama, music, and elaborate costumes. Watch skilled performers bring ancient epics to life through intricate hand gestures, expressive eye movements, and powerful storytelling.',
      image: '/images/gallery-2.png',
      duration: '2-3 Hours',
      price: 'From ₹1,500/person',
      highlights: ['Traditional makeup', 'Classical music', 'Epic stories', 'Photo opportunity'],
      minPeople: 4,
      maxPeople: 50,
      perHeadPrice: 1500
    },
    {
      id: 'canoe',
      icon: <Sun className="h-8 w-8" />,
      title: 'Sunset Canoe Ride',
      description: 'Paddle through narrow canals as the sun sets over the backwaters',
      longDescription: 'Experience the magical transition from day to night on the backwaters. Our guided canoe rides take you through narrow canals where larger boats cannot go, offering intimate views of village life and stunning sunset vistas.',
      image: '/images/gallery-5.png',
      duration: '2 Hours',
      price: 'From ₹1,000/person',
      highlights: ['Narrow canals', 'Sunset views', 'Bird watching', 'Village glimpses'],
      minPeople: 1,
      maxPeople: 4,
      perHeadPrice: 1000
    },
    {
      id: 'spice',
      icon: <TreeDeciduous className="h-8 w-8" />,
      title: 'Spice Plantation Tour',
      description: 'Explore the aromatic spice gardens of the Western Ghats',
      longDescription: 'Journey to the lush Western Ghats to discover the spices that made Kerala famous. Walk through cardamom, pepper, cinnamon, and vanilla plantations while learning about cultivation and traditional uses. The tour includes a traditional Kerala lunch and spice shopping.',
      image: '/images/gallery-6.png',
      duration: 'Full Day',
      price: 'From ₹3,500/person',
      highlights: ['Cardamom fields', 'Pepper vines', 'Traditional lunch', 'Spice shopping'],
      minPeople: 2,
      maxPeople: 12,
      perHeadPrice: 3500
    },
    {
      id: 'cooking',
      icon: <ChefHat className="h-8 w-8" />,
      title: 'Kerala Cooking Class',
      description: 'Learn to prepare authentic Kerala dishes with our master chefs',
      longDescription: 'Join our chefs for a hands-on cooking experience and learn the secrets of Kerala cuisine. From grinding fresh spices to perfecting the art of seafood preparation, you\'ll take home recipes and skills to recreate the flavors of Kerala.',
      image: '/images/gallery-1.png',
      duration: '3 Hours',
      price: 'From ₹2,000/person',
      highlights: ['Fresh spices', 'Seafood prep', 'Recipe booklet', 'Meal included'],
      minPeople: 2,
      maxPeople: 8,
      perHeadPrice: 2000
    },
    {
      id: 'yoga',
      icon: <Flower2 className="h-8 w-8" />,
      title: 'Yoga & Meditation',
      description: 'Find inner peace with traditional yoga and meditation sessions',
      longDescription: 'Start your day with yoga sessions overlooking the serene backwaters. Our certified instructors guide you through traditional Hatha yoga practices, pranayama (breathing exercises), and meditation techniques passed down through generations.',
      image: '/images/spa.png',
      duration: '1-2 Hours',
      price: 'Complimentary for guests',
      highlights: ['Hatha yoga', 'Pranayama', 'Backwater views', 'All levels welcome'],
      minPeople: 1,
      maxPeople: 20,
      perHeadPrice: 0
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.experiences"
        subtitleKey="experiences.subtitle"
        imageSrc="/images/experience-1.png"
        breadcrumbs={[{ name: 'Experiences', href: '/experiences' }]}
      />

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4">
            {t('experiences.label')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
            Discover <span className="gold-metallic">God&apos;s Own Country</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From serene backwaters to ancient healing traditions, experience the authentic soul of Kerala through our carefully curated activities and excursions.
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section ref={experiencesRef} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                id={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={experiencesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="skeuo-card overflow-hidden group"
              >
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 md:bg-gradient-to-l" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {exp.icon}
                      </div>
                      <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    {/* Duration & Price */}
                    <div className="flex flex-col gap-2.5 mb-4">
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <Tag className="h-4 w-4" />
                          <span>{exp.price}</span>
                        </div>
                      </div>
                      
                      {/* Capacity and Per-Head Price Panel */}
                      <div className="text-xs text-muted-foreground space-y-1 bg-black/5 p-2.5 rounded-lg border border-black/5">
                        <div className="flex justify-between">
                          <span>Group Size:</span>
                          <span className="font-medium text-foreground">
                            {exp.minPeople} - {exp.maxPeople} guests
                          </span>
                        </div>
                        {exp.perHeadPrice > 0 && (
                          <div className="flex justify-between">
                            <span>Per Head Rate:</span>
                            <span className="font-medium text-primary">
                              ₹{exp.perHeadPrice.toLocaleString()}/person
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs px-2 py-1 skeuo-inset text-muted-foreground rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      className="self-start text-primary hover:text-primary hover:bg-primary/5"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Experience CTA */}
      <section className="py-24 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Camera className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
            Create Your Own Experience
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Looking for something special? Our concierge team can create bespoke experiences tailored to your interests. From private temple tours to exclusive fishing expeditions, we&apos;ll craft the perfect Kerala adventure.
          </p>
          <Button className="skeuo-button px-8 py-6 text-lg">
            Request Custom Experience
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function ExperiencesPage() {
  return (
    <LanguageProvider>
      <ExperiencesContent />
    </LanguageProvider>
  )
}
