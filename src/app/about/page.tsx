'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { 
  Flower2, Award, Users, Leaf, Heart, Star, ArrowRight, 
  Clock, MapPin, Phone
} from 'lucide-react'

function AboutContent() {
  const { t } = useLang()
  const storyRef = useRef<HTMLDivElement>(null)
  const philosophyRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const awardsRef = useRef<HTMLDivElement>(null)

  const storyInView = useInView(storyRef, { once: true, margin: "-100px" })
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-100px" })
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" })
  const awardsInView = useInView(awardsRef, { once: true, margin: "-100px" })

  const stats = [
    { value: '25', label: 'Luxury Villas' },
    { value: '500+', label: 'Happy Guests' },
    { value: '4.9', label: 'Rating' },
    { value: '15', label: 'Years' },
  ]

  const philosophy = [
    {
      icon: <Flower2 className="h-8 w-8" />,
      title: 'Heritage',
      description: 'Preserving Kerala\'s rich cultural traditions through architecture, cuisine, and authentic experiences that celebrate our roots.'
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Sustainability',
      description: 'Eco-friendly practices that protect the backwaters and support local communities for future generations.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Wellness',
      description: 'Ayurvedic healing and holistic wellness programs for complete rejuvenation of mind, body, and soul.'
    }
  ]

  const awards = [
    { title: 'Best Heritage Service Villa', org: 'Kerala Tourism Awards 2023' },
    { title: 'Excellence in Sustainable Tourism', org: 'Green Globe 2022' },
    { title: 'Top 10 Ayurveda Destinations', org: 'Travel + Leisure 2023' },
    { title: 'Best Eco Service Villa', org: 'World Travel Awards 2022' },
  ]

  const team = [
    { name: 'Rajesh Nair', role: 'General Manager', image: '/images/team-1.png' },
    { name: 'Dr. Lakshmi Menon', role: 'Chief Ayurveda Physician', image: '/images/team-2.png' },
    { name: 'Chef Thomas Kutty', role: 'Executive Chef', image: '/images/team-3.png' },
    { name: 'Anita Krishnan', role: 'Guest Relations', image: '/images/team-4.png' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.about"
        subtitleKey="about.label"
        imageSrc="/images/gallery-1.png"
        breadcrumbs={[{ name: 'About', href: '/about' }]}
      />

      {/* Story Section */}
      <section ref={storyRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                  Our Story
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
                  A Legacy of <span className="gold-metallic">Kerala Hospitality</span>
                </h2>
              </div>
              <div className="divider-gold w-24" />
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Munroe Morris Service Villa was born from a dream to share the authentic essence of Kerala with the world. Named after Colonel John Munro, the British administrator who played a pivotal role in the development of this region, our service villa stands as a tribute to the rich history and natural beauty of Munroe Island, Kollam.
                </p>
                <p>
                  Founded in 2009, we began as a small heritage property with just 5 traditional Kerala cottages. Today, we have grown into a premier luxury destination while maintaining our commitment to authentic experiences and sustainable tourism.
                </p>
                <p>
                  Every corner of our service villa tells a story - from the traditional Nalukettu architecture to the hand-carved wooden furniture crafted by local artisans. We take pride in preserving Kerala&apos;s cultural heritage while providing world-class amenities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="skeuo-card p-2">
                <img
                  src="/images/gallery-2.png"
                  alt="Munroe Morris Heritage"
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 skeuo-button p-6 animate-float">
                <p className="font-serif text-xl">Est. 2009</p>
                <p className="text-xs opacity-80 mt-1">Kerala, India</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-4xl sm:text-5xl gold-metallic">{stat.value}</p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Our Philosophy
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mt-4 leading-tight">
              The Three Pillars of <span className="gold-metallic">Munroe Morris</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-6">
              At Munroe Morris, we believe that true luxury lies in authentic experiences. Our philosophy is rooted in these core values.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="skeuo-card p-8 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 lg:py-32 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Our Team
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mt-4 leading-tight">
              Meet the <span className="gold-metallic">People Behind</span> the Experience
            </h2>
            <p className="text-muted-foreground text-lg mt-6">
              Our dedicated team of 75+ staff members are locals who bring authentic Kerala hospitality to every interaction.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="skeuo-card overflow-hidden group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-serif text-lg text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section ref={awardsRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={awardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              Recognition
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-foreground mt-4 leading-tight">
              Awards & <span className="gold-metallic">Accolades</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={awardsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="skeuo-card p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-foreground">{award.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">{award.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
            Ready to Experience Munroe Morris?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you plan your perfect Kerala getaway. Our team is ready to assist you in creating unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="skeuo-button px-8 py-6 text-lg">
              Book Your Stay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg">
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function AboutPage() {
  return (
    <LanguageProvider>
      <AboutContent />
    </LanguageProvider>
  )
}
