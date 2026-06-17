'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { 
  MapPin, Phone, Mail, Clock, Send, Check, 
  Plane, Train, Car, MessageCircle
} from 'lucide-react'

function ContactContent() {
  const { t } = useLang()
  const formRef = useRef<HTMLFormElement>(null)
  const formInView = useInView(formRef, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Dynamic settings states
  const [email, setEmail] = useState('reservations@munroemorris.com')
  const [phone, setPhone] = useState('+91 474 XXXXXXX')
  const [whatsapp, setWhatsapp] = useState('+91 75610 11230')
  const [address, setAddress] = useState('Munroe Island, Kollam District\nKerala 691502, India')

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          if (data.contact_email) setEmail(data.contact_email)
          else if (data.resort_email) setEmail(data.resort_email)

          if (data.contact_phone) setPhone(data.contact_phone)
          else if (data.resort_phone) setPhone(data.resort_phone)

          if (data.whatsapp_number) setWhatsapp(data.whatsapp_number)

          if (data.address) setAddress(data.address)
          else if (data.resort_address) setAddress(data.resort_address)
        }
      })
      .catch(err => console.error('Failed to load contact settings:', err))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Location',
      details: address.split('\n')
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Phone',
      details: [phone, `${whatsapp} (WhatsApp)`]
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email',
      details: [email]
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Reception',
      details: ['24 Hours, 7 Days a Week']
    }
  ]

  const travelInfo = [
    {
      icon: <Plane className="h-6 w-6" />,
      title: 'Trivandrum Airport',
      distance: '90 km',
      time: '2 hours'
    },
    {
      icon: <Train className="h-6 w-6" />,
      title: 'Kollam Railway Station',
      distance: '25 km',
      time: '45 minutes'
    },
    {
      icon: <Plane className="h-6 w-6" />,
      title: 'Kochi Airport',
      distance: '160 km',
      time: '4 hours'
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: 'Kollam Bus Station',
      distance: '25 km',
      time: '45 minutes'
    }
  ]

  const roomTypes = [
    'Backwater Villa',
    'Coconut Grove Suite',
    'Heritage Nalukettu',
    'Luxury Houseboat',
    'Pool Villa',
    'Royal Suite'
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.contact"
        subtitleKey="contact.subtitle"
        imageSrc="/images/gallery-4.png"
        breadcrumbs={[{ name: 'Contact', href: '/contact' }]}
      />

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="skeuo-card p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {info.icon}
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl text-foreground mb-2">
                {t('contact.form')}
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our reservations team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('contact.firstname')} *
                    </label>
                    <Input className="skeuo-input" placeholder="John" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('contact.lastname')}
                    </label>
                    <Input className="skeuo-input" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('contact.email')} *
                    </label>
                    <Input type="email" className="skeuo-input" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('contact.phone')} *
                    </label>
                    <Input type="tel" className="skeuo-input" placeholder="+1 234 567 8900" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('contact.checkin')} *
                    </label>
                    <Input type="date" className="skeuo-input" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('contact.checkout')} *
                    </label>
                    <Input type="date" className="skeuo-input" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('contact.roomType')}
                    </label>
                    <select className="skeuo-input w-full">
                      <option value="">Select room type</option>
                      {roomTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t('contact.guests')}
                    </label>
                    <select className="skeuo-input w-full">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {t('contact.message')}
                  </label>
                  <Textarea 
                    className="skeuo-input min-h-[120px]" 
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full skeuo-button py-6 text-lg"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Inquiry Sent!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      {t('contact.send')}
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Map & Travel Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="skeuo-card overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">Munroe Island, Kollam, Kerala</p>
                  </div>
                </div>
              </div>

              {/* How to Reach */}
              <div>
                <h3 className="font-serif text-2xl text-foreground mb-6">
                  {t('contact.reach')}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {travelInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="skeuo-card p-4 flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.title}</p>
                        <p className="text-sm text-muted-foreground">{info.distance} · {info.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="skeuo-inset p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <MessageCircle className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-lg text-foreground">Quick Response</h4>
                    <p className="text-muted-foreground text-sm">Chat with us on WhatsApp for instant assistance</p>
                  </div>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    Chat Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function ContactPage() {
  return (
    <LanguageProvider>
      <ContactContent />
    </LanguageProvider>
  )
}
