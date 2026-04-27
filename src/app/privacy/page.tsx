'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { Shield, Mail, Clock, ArrowRight, Check } from 'lucide-react'

function PrivacyContent() {
  const { t } = useLang()
  const contentRef = useRef<HTMLDivElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" })

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you make a reservation or contact us, we collect personal information including your name, email address, phone number, postal address, and payment details. This information is necessary to process your booking and provide our services.'
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'When you visit our website, we automatically collect certain information about your device, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.'
        },
        {
          subtitle: 'Cookies and Tracking Technologies',
          text: 'We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookie preferences through your browser settings. See our Cookie Policy for more details.'
        }
      ]
    },
    {
      title: '2. How We Use Your Information',
      content: [
        {
          subtitle: 'Service Delivery',
          text: 'We use your personal information to process reservations, communicate with you about your booking, provide customer support, and deliver the services you have requested.'
        },
        {
          subtitle: 'Marketing Communications',
          text: 'With your consent, we may send you promotional emails about special offers, events, and news. You can opt out of marketing communications at any time.'
        },
        {
          subtitle: 'Legal Compliance',
          text: 'We may use your information to comply with legal obligations, respond to lawful requests, and protect our rights, privacy, safety, or property.'
        }
      ]
    },
    {
      title: '3. Information Sharing',
      content: [
        {
          subtitle: 'Third-Party Service Providers',
          text: 'We share your information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering our services. These providers are bound by confidentiality obligations.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any change in ownership.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law or in response to valid requests by public authorities.'
        }
      ]
    },
    {
      title: '4. Data Security',
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.'
        },
        {
          subtitle: 'Data Retention',
          text: 'We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements.'
        }
      ]
    },
    {
      title: '5. Your Rights',
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access and correct your personal information. Contact us at privacy@munroemorris.com to request access or corrections.'
        },
        {
          subtitle: 'Deletion',
          text: 'You may request the deletion of your personal information, subject to certain exceptions such as ongoing legal obligations or legitimate business purposes.'
        },
        {
          subtitle: 'Opt-Out Rights',
          text: 'You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.'
        }
      ]
    },
    {
      title: '6. International Transfers',
      content: [
        {
          subtitle: 'Cross-Border Data',
          text: 'Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.'
        }
      ]
    },
    {
      title: '7. Children\'s Privacy',
      content: [
        {
          subtitle: 'Age Restrictions',
          text: 'Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware of such collection, we will take steps to delete the information.'
        }
      ]
    },
    {
      title: '8. Changes to This Policy',
      content: [
        {
          subtitle: 'Policy Updates',
          text: 'We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.'
        }
      ]
    }
  ]

  const highlights = [
    { icon: <Shield className="h-5 w-5" />, text: '256-bit SSL Encryption' },
    { icon: <Check className="h-5 w-5" />, text: 'GDPR Compliant' },
    { icon: <Shield className="h-5 w-5" />, text: 'Secure Payment Processing' },
    { icon: <Check className="h-5 w-5" />, text: 'Data Protection Act Compliant' }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.privacy"
        subtitleKey="privacy.subtitle"
        imageSrc="/images/gallery-2.png"
        breadcrumbs={[{ name: 'Privacy Policy', href: '/privacy' }]}
      />

      {/* Security Highlights */}
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
              At Munroe Morris Resort, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make reservations, or use our services.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Last Updated: January 1, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>privacy@munroemorris.com</span>
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
              Questions About Your Privacy?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about our Privacy Policy or how we handle your personal information, please contact our Data Protection Officer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="skeuo-button px-8 py-6">
                <Mail className="mr-2 h-5 w-5" />
                Contact DPO
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <span className="text-muted-foreground text-sm">
                privacy@munroemorris.com
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function PrivacyPage() {
  return (
    <LanguageProvider>
      <PrivacyContent />
    </LanguageProvider>
  )
}
