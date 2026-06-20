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
    'nav.diningOverview': 'Overview',
    'nav.diningMenu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.book': 'Get Quote',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
    'nav.cookies': 'Cookie Policy',
    'hero.title': 'Munroe Morris',
    'footer.copyright': '© 2024 Munroe Morris Service Villa. All rights reserved.',
    'footer.tagline': "Experience the magic of Kerala's backwaters in luxury.",
    'footer.quickLinks': 'Quick Links',
    'footer.experiences': 'Experiences',
    'footer.follow': 'Follow Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms',
    'footer.cookies': 'Cookies',
    'privacy.subtitle': 'Your privacy is important to us',
    'terms.subtitle': 'Terms and conditions for using our services',
    'cookies.subtitle': 'How we use cookies on our website',
  },
  ml: {
    'nav.home': 'ഹോം',
    'nav.about': 'ഞങ്ങളേക്കുറിച്ച്',
    'nav.accommodations': 'താമസം',
    'nav.experiences': 'അനുഭവങ്ങൾ',
    'nav.ayurveda': 'ആയുർവേദം',
    'nav.dining': 'ഭക്ഷണം',
    'nav.diningOverview': 'വിവരണം',
    'nav.diningMenu': 'മെനു',
    'nav.gallery': 'ഗാലറി',
    'nav.contact': 'ബന്ധപ്പെടുക',
    'nav.book': 'ക്വോട്ട് ലഭിക്കുക',
    'nav.privacy': 'സ്വകാര്യതാ നയം',
    'nav.terms': 'നിബന്ധനകൾ',
    'nav.cookies': 'കുക്കി നയം',
    'hero.title': 'മുൻറോ മോറിസ്',
    'footer.copyright': '© 2024 മുൻറോ മോറിസ് സർവീസ് വില്ല. എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു.',
    'footer.tagline': 'ആഡംബരത്തിൽ കേരളത്തിന്റെ ബാക്ക്‌വാട്ടറുകളുടെ മാജിക്ക് അനുഭവിക്കുക.',
    'footer.quickLinks': 'ദ്രുത ലിങ്കുകൾ',
    'footer.experiences': 'അനുഭവങ്ങൾ',
    'footer.follow': 'ഞങ്ങളെ പിന്തുടരുക',
    'footer.privacy': 'സ്വകാര്യതാ നയം',
    'footer.terms': 'നിബന്ധനകൾ',
    'footer.cookies': 'കുക്കികൾ',
    'privacy.subtitle': 'നിങ്ങളുടെ സ്വകാര്യത ഞങ്ങൾക്ക് പ്രധാനമാണ്',
    'terms.subtitle': 'ഞങ്ങളുടെ സേവനങ്ങൾ ഉപയോഗിക്കുന്നതിനുള്ള നിബന്ധനകൾ',
    'cookies.subtitle': 'ഞങ്ങളുടെ വെബ്സൈറ്റിൽ കുക്കികൾ എങ്ങനെ ഉപയോഗിക്കുന്നു',
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
