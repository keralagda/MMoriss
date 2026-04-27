'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

export type Language = 'en' | 'ml'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

// Translations - abbreviated for file size, full version in main page
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.accommodations': 'Accommodations',
    'nav.experiences': 'Experiences',
    'nav.ayurveda': 'Ayurveda',
    'nav.dining': 'Dining',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.book': 'Book Your Stay',
    'hero.title': 'Munroe Morris',
    'footer.copyright': '© 2024 Munroe Morris Resort. All rights reserved.',
    'footer.tagline': "Experience the magic of Kerala's backwaters in luxury.",
    'footer.quickLinks': 'Quick Links',
    'footer.experiences': 'Experiences',
    'footer.follow': 'Follow Us',
  },
  ml: {
    'nav.home': 'ഹോം',
    'nav.about': 'ഞങ്ങളേക്കുറിച്ച്',
    'nav.accommodations': 'താമസം',
    'nav.experiences': 'അനുഭവങ്ങൾ',
    'nav.ayurveda': 'ആയുർവേദം',
    'nav.dining': 'ഭക്ഷണം',
    'nav.gallery': 'ഗാലറി',
    'nav.contact': 'ബന്ധപ്പെടുക',
    'nav.book': 'ബുക്ക് ചെയ്യുക',
    'hero.title': 'മുൻറോ മോറിസ്',
    'footer.copyright': '© 2024 മുൻറോ മോറിസ് റിസോർട്ട്. എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു.',
    'footer.tagline': 'ആഡംബരത്തിൽ കേരളത്തിന്റെ ബാക്ക്‌വാട്ടറുകളുടെ മാജിക്ക് അനുഭവിക്കുക.',
    'footer.quickLinks': 'ദ്രുത ലിങ്കുകൾ',
    'footer.experiences': 'അനുഭവങ്ങൾ',
    'footer.follow': 'ഞങ്ങളെ പിന്തുടരുക',
  }
}

// Language Provider Component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Language | null
    if (storedLang) {
      Promise.resolve().then(() => setLang(storedLang))
    }
  }, [])

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  const t = (key: string): string => {
    return translations[lang][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook to use language context
export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLang must be used within a LanguageProvider')
  }
  return context
}

export { translations }
