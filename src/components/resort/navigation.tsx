'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  Flower2
} from 'lucide-react'
import { useLang } from './language-context'

// Theme Toggle Component
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    // Use microtask to avoid synchronous setState warning
    Promise.resolve().then(() => setMounted(true))
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light') {
      document.documentElement.classList.add('light')
      Promise.resolve().then(() => setTheme('light'))
    }
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    } else {
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }
  }

  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Toggle theme">
        <div className="theme-toggle-knob">
          <Moon className="h-4 w-4 text-primary-foreground" />
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-knob">
        {theme === 'dark' ? (
          <Moon className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Sun className="h-4 w-4 text-primary-foreground" />
        )}
      </div>
    </button>
  )
}

// Language Toggle Component
export function LanguageToggle() {
  const { lang, setLang } = useLang()
  
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'ml' : 'en')}
      className="flex items-center gap-2 px-3 py-1.5 skeuo-inset rounded-lg hover:bg-primary/10 transition-colors"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium text-foreground">
        {lang === 'en' ? 'ML' : 'EN'}
      </span>
    </button>
  )
}

// Navigation Component
interface NavigationProps {
  isTransparent?: boolean
}

export function Navigation({ isTransparent = false }: NavigationProps) {
  const { t } = useLang()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logo, setLogo] = useState('')
  const [siteName, setSiteName] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Fetch dynamic branding settings
    fetch('/api/settings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          if (data.brand_logo) setLogo(data.brand_logo)
          if (data.site_name) setSiteName(data.site_name)
        }
      })
      .catch(err => console.error('Failed to load branding settings:', err))

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.accommodations'), href: '/accommodations' },
    { name: t('nav.experiences'), href: '/experiences' },
    { name: t('nav.ayurveda'), href: '/spa' },
    { name: t('nav.dining'), href: '/dining' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  const shouldHaveBackground = isScrolled || !isTransparent

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          shouldHaveBackground
            ? 'skeuo-panel py-2'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              {logo ? (
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg bg-background/30 backdrop-blur-sm border border-primary/20">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain p-1.5" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center shadow-lg">
                  <Flower2 className="h-6 w-6 text-primary-foreground" />
                </div>
              )}
              <div>
                <span className={`font-serif text-xl sm:text-2xl font-semibold tracking-wide transition-colors duration-300 ${
                  shouldHaveBackground ? 'text-foreground' : 'text-white'
                }`}>
                  {siteName || t('hero.title')}
                </span>
                <p className={`text-xs tracking-widest uppercase ${
                  shouldHaveBackground ? 'text-muted-foreground' : 'text-white/70'
                }`}>
                  Kerala · India
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                    shouldHaveBackground ? 'text-foreground' : 'text-white/90'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageToggle />
              <ThemeToggle />
              <Button className="skeuo-button px-6 py-2.5 font-medium tracking-wide">
                {t('nav.book')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <LanguageToggle />
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 transition-colors duration-300 ${
                  shouldHaveBackground ? 'text-foreground' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 skeuo-panel lg:hidden pt-24"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-4"
              >
                <Button className="skeuo-button px-8 py-3 font-medium tracking-wide">
                  {t('nav.book')}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
