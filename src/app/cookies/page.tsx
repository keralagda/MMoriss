'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  LanguageProvider, useLang, Navigation, Footer, PageHero 
} from '@/components/resort'
import { Cookie, Settings, Mail, Clock, ArrowRight, Check, X, Info } from 'lucide-react'

function CookiesContent() {
  const { t } = useLang()
  const contentRef = useRef<HTMLDivElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" })
  const [expandedCookie, setExpandedCookie] = useState<string | null>(null)

  const cookieTypes = [
    {
      id: 'essential',
      name: 'Essential Cookies',
      description: 'Required for the website to function properly. These cookies cannot be disabled.',
      required: true,
      examples: [
        { name: 'session_id', purpose: 'Maintains your login session', duration: 'Session' },
        { name: 'csrf_token', purpose: 'Prevents cross-site request forgery', duration: 'Session' },
        { name: 'preferences', purpose: 'Stores your theme and language preferences', duration: '1 year' }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website so we can improve the experience.',
      required: false,
      examples: [
        { name: '_ga', purpose: 'Google Analytics - distinguishes users', duration: '2 years' },
        { name: '_gid', purpose: 'Google Analytics - distinguishes users', duration: '24 hours' },
        { name: '_gat', purpose: 'Google Analytics - throttles requests', duration: '1 minute' }
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track the effectiveness of marketing campaigns.',
      required: false,
      examples: [
        { name: '_fbp', purpose: 'Facebook Pixel - tracks conversions', duration: '3 months' },
        { name: 'fr', purpose: 'Facebook - delivers targeted ads', duration: '3 months' },
        { name: 'ads_prefs', purpose: 'Stores ad preferences', duration: '1 year' }
      ]
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization, such as remembering your preferences.',
      required: false,
      examples: [
        { name: 'language', purpose: 'Remembers your language preference', duration: '1 year' },
        { name: 'currency', purpose: 'Remembers your currency preference', duration: '30 days' },
        { name: 'recent_viewed', purpose: 'Tracks recently viewed rooms', duration: '7 days' }
      ]
    }
  ]

  const sections = [
    {
      title: 'What Are Cookies?',
      content: 'Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners about how visitors use their site.'
    },
    {
      title: 'How We Use Cookies',
      content: 'We use cookies to enhance your browsing experience, analyze site traffic, personalize content, and improve our services. The cookies we use fall into the categories described below.'
    },
    {
      title: 'Third-Party Cookies',
      content: 'Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. The third-party services we use include Google Analytics, Facebook Pixel, and payment processors. Each third-party has its own privacy and cookie policies.'
    },
    {
      title: 'Managing Cookies',
      content: 'You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and some features may no longer function properly.'
    },
    {
      title: 'Browser Settings',
      content: 'Most browsers allow you to manage cookie settings. You can set your browser to refuse cookies or delete certain cookies. Here\'s how to manage cookies in popular browsers: Chrome (Settings > Privacy and Security > Cookies), Firefox (Options > Privacy & Security), Safari (Preferences > Privacy), Edge (Settings > Cookies and Site Permissions).'
    },
    {
      title: 'Updates to This Policy',
      content: 'We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date.'
    }
  ]

  const highlights = [
    { icon: <Cookie className="h-5 w-5" />, text: 'Transparent Cookie Usage' },
    { icon: <Settings className="h-5 w-5" />, text: 'User Control' },
    { icon: <Check className="h-5 w-5" />, text: 'GDPR Compliant' },
    { icon: <Info className="h-5 w-5" />, text: 'Clear Explanations' }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <PageHero 
        titleKey="nav.cookies"
        subtitleKey="cookies.subtitle"
        imageSrc="/images/gallery-3.png"
        breadcrumbs={[{ name: 'Cookie Policy', href: '/cookies' }]}
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
              This Cookie Policy explains how Munroe Morris Resort uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
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

          {/* Cookie Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="font-serif text-3xl text-foreground mb-8">
              Types of Cookies We Use
            </h2>
            <div className="space-y-4">
              {cookieTypes.map((cookieType, index) => (
                <motion.div
                  key={cookieType.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="skeuo-card overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCookie(expandedCookie === cookieType.id ? null : cookieType.id)}
                    className="w-full p-6 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        cookieType.required ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Cookie className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-foreground">
                          {cookieType.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {cookieType.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {cookieType.required && (
                        <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                          Required
                        </span>
                      )}
                      {expandedCookie === cookieType.id ? (
                        <X className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ArrowRight className="h-5 w-5 text-muted-foreground transform rotate-90" />
                      )}
                    </div>
                  </button>
                  
                  {expandedCookie === cookieType.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border"
                    >
                      <div className="p-6 pt-0">
                        <table className="w-full mt-4">
                          <thead>
                            <tr className="text-left text-sm text-muted-foreground">
                              <th className="pb-2">Cookie Name</th>
                              <th className="pb-2">Purpose</th>
                              <th className="pb-2">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cookieType.examples.map((example) => (
                              <tr key={example.name} className="border-t border-border">
                                <td className="py-3 text-sm font-mono text-primary">{example.name}</td>
                                <td className="py-3 text-sm text-muted-foreground">{example.purpose}</td>
                                <td className="py-3 text-sm text-muted-foreground">{example.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="skeuo-card p-6 lg:p-8"
              >
                <h2 className="font-serif text-2xl text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.content}
                </p>
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
              Questions About Cookies?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions about our use of cookies or this Cookie Policy, please contact our privacy team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="skeuo-button px-8 py-6">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
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

export default function CookiesPage() {
  return (
    <LanguageProvider>
      <CookiesContent />
    </LanguageProvider>
  )
}
