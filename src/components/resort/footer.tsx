'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { useLang } from './language-context'

const defaultFooterLinks = [
  { name: 'nav.about', href: '/about' },
  { name: 'nav.accommodations', href: '/accommodations' },
  { name: 'nav.experiences', href: '/experiences' },
  { name: 'nav.ayurveda', href: '/spa' },
  { name: 'nav.dining', href: '/dining' },
  { name: 'nav.gallery', href: '/gallery' },
]

export function Footer() {
  const { t } = useLang()
  const [quickLinks, setQuickLinks] = useState<{ name: string; href: string }[]>(defaultFooterLinks)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.footer_menu) {
          try {
            setQuickLinks(JSON.parse(data.footer_menu))
          } catch (e) {
            console.error('Failed to parse footer_menu settings:', e)
            setQuickLinks(defaultFooterLinks)
          }
        }
      })
      .catch(() => setQuickLinks(defaultFooterLinks))
  }, [])

  const experiences = [
    { name: 'Houseboat Cruise', href: '/experiences#houseboat' },
    { name: 'Ayurveda Therapy', href: '/spa' },
    { name: 'Village Tour', href: '/experiences#village' },
    { name: 'Kathakali Show', href: '/experiences#kathakali' },
    { name: 'Cooking Class', href: '/dining#cooking' },
    { name: 'Bird Watching', href: '/experiences#nature' },
  ]

  const socialLinks = [
    { icon: <MapPin className="h-5 w-5" />, href: 'https://maps.app.goo.gl/x9yYME3FYTTjk3Wy7', label: 'Google Maps' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/munroemorrisservicevilla/', label: 'Instagram' },
    { icon: <Facebook className="h-5 w-5" />, href: 'https://www.facebook.com/munroemorrisservicevilla', label: 'Facebook' },
    { icon: <Youtube className="h-5 w-5" />, href: 'https://www.youtube.com/@MunroeMorrisVilla', label: 'YouTube' },
  ]

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="inline-block">
              <h3 className="font-serif text-2xl gold-metallic">{t('hero.title')}</h3>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 skeuo-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-serif text-lg text-foreground">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Experiences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-serif text-lg text-foreground">{t('footer.experiences')}</h4>
            <ul className="space-y-2">
              {experiences.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-serif text-lg text-foreground">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Munroe Island, Kollam District<br />
                  Kerala 691502, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  +91 474 XXXXXXX
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t('footer.terms')}
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
