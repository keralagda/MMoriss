'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { 
  Sparkles, Droplets, Heart, Wind, Leaf, ArrowRight, Clock,
  Award, Users, Calendar, Check
} from 'lucide-react'

function SpaContent() {
  const { t } = useLang()
  const treatmentsRef = useRef<HTMLDivElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)
  const treatmentsInView = useInView(treatmentsRef, { once: true, margin: "-100px" })
  const packagesInView = useInView(packagesRef, { once: true, margin: "-100px" })

  const treatments = [
    {
      id: 'panchakarma',
      name: 'Panchakarma',
      sanskrit: 'പഞ്ചകർമ്മം',
      description: 'Complete detoxification program',
      longDescription: 'The ultimate Ayurvedic cleansing program that removes toxins and restores balance. This comprehensive treatment includes five therapeutic procedures: Vamana, Virechana, Basti, Nasya, and Raktamokshana.',
      duration: '21-28 Days',
      image: '/images/spa.png',
      benefits: ['Deep detoxification', 'Restored balance', 'Enhanced immunity', 'Mental clarity']
    },
    {
      id: 'shirodhara',
      name: 'Shirodhara',
      sanskrit: 'ശിരോധാര',
      description: 'Meditative oil therapy',
      longDescription: 'A deeply relaxing treatment where warm herbal oil flows continuously over the forehead (third eye area). This therapy calms the nervous system, improves sleep, and promotes mental clarity.',
      duration: '45-60 Minutes',
      image: '/images/gallery-1.png',
      benefits: ['Deep relaxation', 'Better sleep', 'Mental clarity', 'Stress relief']
    },
    {
      id: 'abhyanga',
      name: 'Abhyanga',
      sanskrit: 'അഭ്യംഗ',
      description: 'Full body massage',
      longDescription: 'Traditional full-body massage using warm herbal oils selected based on your body constitution (dosha). Performed by two therapists working in synchronized movements.',
      duration: '60-90 Minutes',
      image: '/images/gallery-2.png',
      benefits: ['Improved circulation', 'Skin nourishment', 'Fatigue relief', 'Muscle relaxation']
    },
    {
      id: 'nasyam',
      name: 'Nasyam',
      sanskrit: 'നസ്യം',
      description: 'Nasal treatment therapy',
      longDescription: 'Therapeutic treatment for the head, neck, and respiratory system. Herbal oils or powders are administered through the nasal passage to clear sinuses and enhance mental functions.',
      duration: '30-45 Minutes',
      image: '/images/gallery-3.png',
      benefits: ['Sinus relief', 'Improved breathing', 'Mental clarity', 'Headache relief']
    },
    {
      id: 'udvarthanam',
      name: 'Udvarthanam',
      sanskrit: 'ഉദ്വർത്ഥനം',
      description: 'Herbal powder massage',
      longDescription: 'A unique massage using special herbal powders instead of oils. Excellent for weight reduction, improving skin texture, and reducing cellulite through upward strokes.',
      duration: '60 Minutes',
      image: '/images/gallery-4.png',
      benefits: ['Weight reduction', 'Skin toning', 'Cellulite reduction', 'Metabolism boost']
    },
    {
      id: 'pizhichil',
      name: 'Pizhichil',
      sanskrit: 'പിഴിച്ചിൽ',
      description: 'Oil bath therapy',
      longDescription: 'Known as the "treatment for kings," this luxurious therapy combines oil massage with a continuous stream of warm medicated oil. Excellent for neurological conditions and overall rejuvenation.',
      duration: '60-90 Minutes',
      image: '/images/gallery-5.png',
      benefits: ['Deep rejuvenation', 'Joint health', 'Neurological benefits', 'Skin nourishment']
    }
  ]

  const packages = [
    {
      name: 'Rejuvenation Package',
      description: '7 days of revitalizing treatments for body and mind',
      duration: '7 Days',
      treatments: ['Abhyanga', 'Shirodhara', 'Herbal Bath', 'Yoga'],
      price: 'From ₹45,000'
    },
    {
      name: 'Detox Package',
      description: '14 days of deep cleansing and purification',
      duration: '14 Days',
      treatments: ['Panchakarma Prep', 'Abhyanga', 'Nasyam', 'Specialized Diet'],
      price: 'From ₹95,000'
    },
    {
      name: 'Stress Relief Package',
      description: '5 days focused on relaxation and mental wellness',
      duration: '5 Days',
      treatments: ['Shirodhara', 'Head Massage', 'Yoga', 'Meditation'],
      price: 'From ₹28,000'
    },
    {
      name: 'Weight Management',
      description: '21 days of targeted treatments and diet',
      duration: '21 Days',
      treatments: ['Udvarthanam', 'Herbal Steam', 'Specialized Diet', 'Yoga'],
      price: 'From ₹1,50,000'
    }
  ]

  const doshas = [
    { name: 'Vata', element: 'Air & Space', description: 'Governs movement and creativity' },
    { name: 'Pitta', element: 'Fire & Water', description: 'Governs transformation and metabolism' },
    { name: 'Kapha', element: 'Earth & Water', description: 'Governs structure and stability' }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.ayurveda"
        subtitleKey="ayurveda.p1"
        imageSrc="/images/spa.png"
        breadcrumbs={[{ name: 'Ayurveda', href: '/spa' }]}
      />

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium mb-4">
            {t('ayurveda.label')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mb-6">
            Ancient Healing, <span className="gold-metallic">Modern Comfort</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Kerala is the birthplace of Ayurveda, the 5000-year-old science of life. Our certified wellness center offers authentic treatments passed down through generations.
          </p>
        </div>
      </section>

      {/* Doshas Section */}
      <section className="py-16 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-serif text-2xl text-foreground text-center mb-8">Understanding Your Dosha</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {doshas.map((dosha, index) => (
              <motion.div
                key={dosha.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="skeuo-card p-6 text-center"
              >
                <h4 className="font-serif text-xl gold-metallic mb-2">{dosha.name}</h4>
                <p className="text-primary text-sm mb-2">{dosha.element}</p>
                <p className="text-muted-foreground text-sm">{dosha.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section ref={treatmentsRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={treatmentsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="font-serif text-3xl text-foreground mb-4">Our Treatments</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each treatment is personalized based on your unique constitution and health goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                animate={treatmentsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="skeuo-card overflow-hidden group"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={treatment.image}
                    alt={treatment.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-primary text-sm">{treatment.sanskrit}</p>
                    <h4 className="font-serif text-2xl text-white">{treatment.name}</h4>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground">{treatment.longDescription}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{treatment.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {treatment.benefits.slice(0, 3).map((benefit) => (
                      <span
                        key={benefit}
                        className="text-xs px-2 py-1 skeuo-inset text-muted-foreground rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full text-primary hover:text-primary hover:bg-primary/5"
                  >
                    Book Treatment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Packages */}
      <section ref={packagesRef} className="py-24 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="font-serif text-3xl text-foreground mb-4">Wellness Packages</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed for transformative healing experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                animate={packagesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="skeuo-card p-8"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-serif text-xl text-foreground">{pkg.name}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{pkg.description}</p>
                  </div>
                  <span className="skeuo-inset px-3 py-1 rounded-full text-xs text-muted-foreground">
                    {pkg.duration}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm font-medium text-foreground">Included Treatments:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {pkg.treatments.map((tr) => (
                      <div key={tr} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{tr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <p className="font-serif text-xl gold-metallic">{pkg.price}</p>
                  <Button className="skeuo-button">
                    Enquire Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification & Team */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Certified Center</p>
                <p className="text-xs text-muted-foreground">Kerala Ayurveda Dept.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Expert Team</p>
                <p className="text-xs text-muted-foreground">15+ Practitioners</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Free Consultation</p>
                <p className="text-xs text-muted-foreground">With booking</p>
              </div>
            </div>
          </div>

          <Button className="skeuo-button px-8 py-6 text-lg">
            Book Wellness Package
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function SpaPage() {
  return (
    <LanguageProvider>
      <SpaContent />
    </LanguageProvider>
  )
}
