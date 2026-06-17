'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { FileText, Mail, Clock, ArrowRight, Scale, AlertCircle } from 'lucide-react'

function TermsContent() {
  const { t } = useLang()
  const contentRef = useRef<HTMLDivElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" })

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: [
        {
          subtitle: 'Agreement to Terms',
          text: 'By accessing or using the Munroe Morris Service Villa website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.'
        },
        {
          subtitle: 'Modifications',
          text: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the new terms.'
        }
      ]
    },
    {
      title: '2. Reservations and Bookings',
      content: [
        {
          subtitle: 'Making Reservations',
          text: 'All reservations are subject to availability and confirmation. A valid credit card is required to guarantee your booking. By making a reservation, you warrant that you are at least 18 years of age and have the authority to make the booking.'
        },
        {
          subtitle: 'Payment Terms',
          text: 'A deposit of 25% of the total booking value is required at the time of booking. The remaining balance is due 14 days prior to arrival. For bookings made within 14 days of arrival, full payment is required at the time of booking.'
        },
        {
          subtitle: 'Cancellation Policy',
          text: 'Cancellations made 30 or more days before arrival: full refund minus a 10% processing fee. Cancellations made 15-29 days before arrival: 50% refund. Cancellations made less than 15 days before arrival: no refund. No-shows will be charged the full amount.'
        },
        {
          subtitle: 'Modifications',
          text: 'Date changes are subject to availability and may incur a modification fee. Requests for changes should be made at least 7 days before the original arrival date.'
        }
      ]
    },
    {
      title: '3. Check-in and Check-out',
      content: [
        {
          subtitle: 'Check-in Time',
          text: 'Standard check-in time is 2:00 PM. Early check-in may be available upon request and is subject to availability. Additional charges may apply for early check-in.'
        },
        {
          subtitle: 'Check-out Time',
          text: 'Standard check-out time is 11:00 AM. Late check-out may be available upon request and is subject to availability. Additional charges may apply for late check-out.'
        },
        {
          subtitle: 'Identification',
          text: 'Valid government-issued identification is required at check-in. The name on the identification must match the name on the reservation.'
        }
      ]
    },
    {
      title: '4. Guest Responsibilities',
      content: [
        {
          subtitle: 'Conduct',
          text: 'Guests are expected to conduct themselves in a manner that respects other guests, staff, and the property. We reserve the right to refuse service or ask guests to leave without refund if their behavior is disruptive or inappropriate.'
        },
        {
          subtitle: 'Property Damage',
          text: 'Guests are responsible for any damage to resort property caused by themselves or their guests during their stay. Repair costs will be charged to the credit card on file.'
        },
        {
          subtitle: 'Personal Belongings',
          text: 'Munroe Morris Service Villa is not responsible for lost, stolen, or damaged personal belongings. We recommend using the in-room safe for valuables and purchasing travel insurance.'
        }
      ]
    },
    {
      title: '5. Prohibited Activities',
      content: [
        {
          subtitle: 'Smoking Policy',
          text: 'All indoor areas are non-smoking. Smoking is permitted only in designated outdoor areas. A cleaning fee of ₹5,000 will be charged for violations of this policy.'
        },
        {
          subtitle: 'Pets',
          text: 'Pets are not permitted on resort premises, with the exception of registered service animals. Prior approval is required for service animals.'
        },
        {
          subtitle: 'Illegal Activities',
          text: 'Illegal activities are strictly prohibited on resort property. Violators will be reported to authorities and asked to leave immediately without refund.'
        }
      ]
    },
    {
      title: '6. Services and Amenities',
      content: [
        {
          subtitle: 'Availability',
          text: 'While we strive to provide all advertised services and amenities, some may be unavailable due to weather, maintenance, or other circumstances beyond our control. We are not liable for such unavailability.'
        },
        {
          subtitle: 'Third-Party Services',
          text: 'Some services and activities are provided by third-party vendors. Munroe Morris Service Villa is not responsible for the quality, safety, or availability of these third-party services.'
        },
        {
          subtitle: 'Special Requests',
          text: 'We will make reasonable efforts to accommodate special requests, but cannot guarantee their fulfillment. Special requests are not part of the booking contract.'
        }
      ]
    },
    {
      title: '7. Intellectual Property',
      content: [
        {
          subtitle: 'Website Content',
          text: 'All content on our website, including text, images, logos, and design, is the property of Munroe Morris Service Villa and is protected by copyright laws. Unauthorized use is prohibited.'
        },
        {
          subtitle: 'User Content',
          text: 'By submitting reviews, photos, or other content, you grant us a non-exclusive, royalty-free license to use, reproduce, and display such content for marketing purposes.'
        }
      ]
    },
    {
      title: '8. Limitation of Liability',
      content: [
        {
          subtitle: 'Maximum Liability',
          text: 'Our maximum liability for any claims arising from your stay or use of our services shall not exceed the total amount paid for your booking.'
        },
        {
          subtitle: 'Indirect Damages',
          text: 'We are not liable for any indirect, incidental, special, or consequential damages, including but not limited to lost profits, travel expenses, or emotional distress.'
        },
        {
          subtitle: 'Force Majeure',
          text: 'We are not liable for any failure to perform our obligations due to events beyond our control, including natural disasters, government actions, pandemics, or infrastructure failures.'
        }
      ]
    },
    {
      title: '9. Dispute Resolution',
      content: [
        {
          subtitle: 'Governing Law',
          text: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Kollam District, Kerala.'
        },
        {
          subtitle: 'Arbitration',
          text: 'Before initiating legal proceedings, parties agree to attempt to resolve disputes through good-faith negotiation. Unresolved disputes may be submitted to binding arbitration in accordance with Indian arbitration laws.'
        }
      ]
    }
  ]

  const highlights = [
    { icon: <Scale className="h-5 w-5" />, text: 'Fair Booking Terms' },
    { icon: <FileText className="h-5 w-5" />, text: 'Clear Policies' },
    { icon: <AlertCircle className="h-5 w-5" />, text: 'Transparent Fees' },
    { icon: <Scale className="h-5 w-5" />, text: 'Consumer Protection' }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.terms"
        subtitleKey="terms.subtitle"
        imageSrc="/images/gallery-4.png"
        breadcrumbs={[{ name: 'Terms of Service', href: '/terms' }]}
      />

      {/* Highlights */}
      <section className="py-8 bg-primary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <span className="text-primary">{item.icon}</span>
                <span className="text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              Welcome to Munroe Morris Service Villa. These Terms of Service govern your use of our website, booking services, and stay at our property. Please read these terms carefully before making a reservation.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Last Updated: January 1, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>legal@munroemorris.com</span>
              </div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className="skeuo-card p-6 lg:p-8"
              >
                <h2 className="font-serif text-2xl text-foreground mb-6">
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="font-medium text-foreground mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 skeuo-inset p-8 rounded-2xl text-center"
          >
            <h3 className="font-serif text-2xl text-foreground mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions about these Terms of Service or need clarification on any policy, please contact our reservations team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="skeuo-button px-8 py-6">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <span className="text-muted-foreground text-sm">
                munroemorrisklm@gmail.com
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function TermsPage() {
  return (
    <LanguageProvider>
      <TermsContent />
    </LanguageProvider>
  )
}
