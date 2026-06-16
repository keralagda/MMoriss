'use client'

import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GetQuoteModal } from '@/components/resort'
import Link from 'next/link'
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Star,
  Sparkles,
  Waves,
  UtensilsCrossed,
  Heart,
  Calendar,
  Users,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Send,
  Sun,
  Moon,
  Palmtree,
  Ship,
  Flower2,
  Mountain,
  Globe
} from 'lucide-react'

// Language Context
type Language = 'en' | 'ml'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.accommodations': 'Accommodations',
    'nav.experiences': 'Experiences',
    'nav.ayurveda': 'Ayurveda',
    'nav.dining': 'Dining',
    'nav.gallery': 'Gallery',
    'nav.book': 'Book Your Stay',
    
    // Hero
    'hero.welcome': "Welcome to God's Own Country",
    'hero.title': 'Munroe Morris',
    'hero.tagline': 'Where Backwaters Meet Luxury',
    'hero.houseboats': 'Houseboats',
    'hero.ayurveda': 'Ayurveda',
    'hero.ghats': 'Western Ghats',
    'hero.cta': 'Explore Kerala Paradise',
    'hero.tour': 'Virtual Tour',
    'hero.scroll': 'Scroll',
    
    // About
    'about.label': 'Our Heritage',
    'about.title': "A Jewel in Kerala's Crown",
    'about.p1': "Nestled amidst the serene backwaters of Kerala, Munroe Morris represents the perfect harmony of traditional Kerala architecture and contemporary luxury. Our resort is named after Colonel John Munro, whose legacy is intertwined with this beautiful land.",
    'about.p2': "Experience the warmth of Kerala hospitality, where every guest is treated as family. From the moment you arrive, you'll be embraced by the tranquil beauty of swaying coconut palms, pristine waters, and the gentle rhythm of village life.",
    'about.villas': 'Luxury Villas',
    'about.guests': 'Happy Guests',
    'about.rating': 'Rating',
    'about.established': 'Est. 2009',
    'about.location': 'Kerala, India',
    
    // Accommodations
    'accommodations.label': 'Accommodations',
    'accommodations.title': 'Your Home in Paradise',
    'accommodations.subtitle': "Each villa is designed to reflect Kerala's rich heritage while providing modern comforts for an unforgettable stay.",
    'accommodations.from': 'Starting from',
    'accommodations.night': '/night',
    'accommodations.guests': 'Guests',
    'accommodations.details': 'View Details',
    
    // Villa names
    'villa.backwater.name': 'Backwater Villa',
    'villa.backwater.desc': 'Traditional Kerala architecture with modern amenities overlooking the serene backwaters',
    'villa.coconut.name': 'Coconut Grove Suite',
    'villa.coconut.desc': "Nestled among swaying coconut palms with authentic Kerala decor",
    'villa.heritage.name': 'Heritage Nalukettu',
    'villa.heritage.desc': 'Traditional Kerala courtyard house with wooden architecture',
    
    // Features
    'feature.deck': 'Private Deck',
    'feature.canoe': 'Canoe Ride',
    'feature.sunset': 'Sunset View',
    'feature.garden': 'Garden View',
    'feature.bath': 'Outdoor Bath',
    'feature.birds': 'Bird Watching',
    'feature.courtyard': 'Courtyard',
    'feature.wood': 'Wood Carvings',
    'feature.heritage': 'Heritage Style',
    
    // Experiences
    'experiences.label': 'Kerala Experiences',
    'experiences.title': "Discover God's Own Country",
    'experiences.subtitle': "From serene backwaters to ancient healing traditions, experience the authentic soul of Kerala.",
    'exp.houseboat.name': 'Houseboat Cruise',
    'exp.houseboat.desc': 'Drift through the enchanting backwaters on a traditional Kettuvallam houseboat',
    'exp.ayurveda.name': 'Ayurveda Wellness',
    'exp.ayurveda.desc': 'Rejuvenate with authentic Ayurvedic treatments and therapies',
    'exp.village.name': 'Village Life Experience',
    'exp.village.desc': "Immerse yourself in Kerala's rich culture and traditions",
    
    // Ayurveda section
    'ayurveda.label': 'Ayurveda & Wellness',
    'ayurveda.title': 'Ancient Healing, Modern Comfort',
    'ayurveda.p1': "Kerala is the birthplace of Ayurveda, the 5000-year-old science of life. Our wellness center offers authentic treatments passed down through generations, using traditional herbs and oils sourced from Kerala's pristine forests.",
    'ayurveda.panchakarma': 'Panchakarma',
    'ayurveda.panchakarmaDesc': 'Complete detoxification program',
    'ayurveda.shirodhara': 'Shirodhara',
    'ayurveda.shirodharaDesc': 'Meditative oil therapy',
    'ayurveda.abhyanga': 'Abhyanga',
    'ayurveda.abhyangaDesc': 'Full body massage',
    'ayurveda.nasyam': 'Nasyam',
    'ayurveda.nasyamDesc': 'Nasal treatment therapy',
    'ayurveda.book': 'Book Wellness Package',
    'ayurveda.certified': 'Certified',
    'ayurveda.center': 'Ayurveda Center',
    
    // Dining
    'dining.label': 'Kerala Cuisine',
    'dining.title': 'Flavors of Kerala',
    'dining.p1': 'Savor the authentic tastes of Kerala, from traditional Sadya served on banana leaves to fresh Karimeen (Pearl Spot) caught from the backwaters. Our chefs use recipes passed down through generations.',
    'dining.restaurant': 'The Backwater Restaurant',
    'dining.restaurantDesc': 'Traditional Kerala Sadya & Seafood specialties',
    'dining.lounge': 'Sunset Chai Lounge',
    'dining.loungeDesc': 'Fresh chai & local snacks with backwater views',
    'dining.cooking': 'Cooking Classes',
    'dining.cookingDesc': 'Learn to make authentic Kerala dishes',
    'dining.menu': 'View Our Menu',
    
    // Gallery
    'gallery.label': 'Gallery',
    'gallery.title': 'Moments in Kerala',
    
    // Contact
    'contact.label': 'Get in Touch',
    'contact.title': 'Plan Your Kerala Escape',
    'contact.subtitle': 'Our team is ready to help you plan an unforgettable Kerala experience. We speak English, Malayalam, Hindi, and more.',
    'contact.firstname': 'First Name',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.checkin': 'Check-in',
    'contact.checkout': 'Check-out',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell us about your dream Kerala vacation...',
    'contact.send': 'Send Inquiry',
    'contact.info': 'Contact Information',
    'contact.location': 'Location',
    'contact.locationValue': 'Munroe Island, Kollam District\nKerala 691502, India',
    'contact.phoneValue': '+91 474 XXXXXXX\n+91 XXXXX XXXXX (WhatsApp)',
    'contact.emailValue': 'reservations@munroemorris.com',
    'contact.reception': 'Reception',
    'contact.receptionValue': '24 Hours, 7 Days a Week',
    'contact.newsletter': 'Stay Connected',
    'contact.newsletterDesc': 'Subscribe for Kerala travel tips and exclusive offers.',
    'contact.reach': 'How to Reach',
    'contact.airport1': 'Trivandrum Airport: 90 km (2 hours)',
    'contact.railway': 'Kollam Railway Station: 25 km (45 min)',
    'contact.airport2': 'Kochi Airport: 160 km (4 hours)',
    
    // Footer
    'footer.tagline': "Experience the magic of Kerala's backwaters in luxury. Your journey to God's Own Country begins here.",
    'footer.quickLinks': 'Quick Links',
    'footer.experiences': 'Experiences',
    'footer.contact': 'Contact',
    'footer.backwater': 'Backwater Cruise',
    'footer.therapy': 'Ayurveda Therapy',
    'footer.tour': 'Village Tour',
    'footer.kathakali': 'Kathakali Show',
    'footer.cooking': 'Cooking Class',
    'footer.birds': 'Bird Watching',
    'footer.copyright': '© 2024 Munroe Morris Service Villa. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms',
    'footer.cookies': 'Cookie Policy',
  },
  ml: {
    // Navigation
    'nav.about': 'ഞങ്ങളേക്കുറിച്ച്',
    'nav.accommodations': 'താമസം',
    'nav.experiences': 'അനുഭവങ്ങൾ',
    'nav.ayurveda': 'ആയുർവേദം',
    'nav.dining': 'ഭക്ഷണം',
    'nav.gallery': 'ഗാലറി',
    'nav.book': 'ബുക്ക് ചെയ്യുക',
    
    // Hero
    'hero.welcome': 'ദൈവത്തിന്റെ സ്വന്തം നാട്ടിലേക്ക് സ്വാഗതം',
    'hero.title': 'മുൻറോ മോറിസ്',
    'hero.tagline': 'ബാക്ക്‌വാട്ടേഴ്‌സ് ആഡംബരത്തെ കണ്ടുമുട്ടുന്ന സ്ഥലം',
    'hero.houseboats': 'ഹൗസ്ബോട്ടുകൾ',
    'hero.ayurveda': 'ആയുർവേദം',
    'hero.ghats': 'പശ്ചിമഘട്ടം',
    'hero.cta': 'കേരള പറുദീസ കണ്ടെത്തുക',
    'hero.tour': 'വിർച്വൽ ടൂർ',
    'hero.scroll': 'സ്ക്രോൾ ചെയ്യുക',
    
    // About
    'about.label': 'ഞങ്ങളുടെ പൈതൃകം',
    'about.title': 'കേരളത്തിന്റെ കിരീടത്തിലെ രത്നം',
    'about.p1': 'കേരളത്തിലെ ശാന്തമായ ബാക്ക്‌വാട്ടറുകൾക്കിടയിൽ, മുൻറോ മോറിസ് പരമ്പരാഗത കേരള വാസ്തുവിദ്യയുടെയും ആധുനിക ആഡംബരത്തിന്റെയും തികഞ്ഞ സന്തുലിതാവസ്ഥ പ്രതിനിധീകരിക്കുന്നു.',
    'about.p2': 'ഓരോ അതിഥിയെയും കുടുംബാംഗമായി കണക്കാക്കുന്ന കേരള ആതിഥ്യത്തിന്റെ ആർദ്രത അനുഭവിക്കുക.',
    'about.villas': 'ആഡംബര വില്ലകൾ',
    'about.guests': 'സന്തുഷ്ട അതിഥികൾ',
    'about.rating': 'റേറ്റിംഗ്',
    'about.established': 'സ്ഥാപിച്ചത് 2009',
    'about.location': 'കേരളം, ഇന്ത്യ',
    
    // Accommodations
    'accommodations.label': 'താമസ സൗകര്യങ്ങൾ',
    'accommodations.title': 'പറുദീസയിലെ നിങ്ങളുടെ വീട്',
    'accommodations.subtitle': 'ഓരോ വില്ലയും കേരളത്തിന്റെ സമ്പന്നമായ പൈതൃകം പ്രതിഫലിപ്പിക്കുന്നു.',
    'accommodations.from': 'ആരംഭ വില',
    'accommodations.night': '/രാത്രി',
    'accommodations.guests': 'അതിഥികൾ',
    'accommodations.details': 'വിശദാംശങ്ങൾ കാണുക',
    
    // Villa names
    'villa.backwater.name': 'ബാക്ക്‌വാട്ടർ വില്ല',
    'villa.backwater.desc': 'ബാക്ക്‌വാട്ടറുകളുടെ കാഴ്ചയോടെ പരമ്പരാഗത കേരള വാസ്തുവിദ്യ',
    'villa.coconut.name': 'തെങ്ങ് തോപ്പ് സ്യൂട്ട്',
    'villa.coconut.desc': 'തെങ്ങിൻ തോപ്പുകൾക്കിടയിൽ സ്ഥിതി ചെയ്യുന്ന സ്യൂട്ട്',
    'villa.heritage.name': 'ഹെറിറ്റേജ് നാലുകെട്ട്',
    'villa.heritage.desc': 'തടി വാസ്തുവിദ്യയുള്ള പരമ്പരാഗത കേരള വീട്',
    
    // Features
    'feature.deck': 'സ്വകാര്യ ഡെക്ക്',
    'feature.canoe': 'വഞ്ചി സവാരി',
    'feature.sunset': 'സൂര്യാസ്ത കാഴ്ച',
    'feature.garden': 'പൂന്തോട്ട കാഴ്ച',
    'feature.bath': 'ഔട്ട്ഡോർ ബാത്ത്',
    'feature.birds': 'പക്ഷി നിരീക്ഷണം',
    'feature.courtyard': 'മുറ്റം',
    'feature.wood': 'മരം കൊത്തുപണി',
    'feature.heritage': 'ഹെറിറ്റേജ് ശൈലി',
    
    // Experiences
    'experiences.label': 'കേരള അനുഭവങ്ങൾ',
    'experiences.title': 'ദൈവത്തിന്റെ സ്വന്തം നാട് കണ്ടെത്തുക',
    'experiences.subtitle': 'ശാന്തമായ ബാക്ക്‌വാട്ടറുകൾ മുതൽ പുരാതന ചികിത്സാ പാരമ്പര്യങ്ങൾ വരെ.',
    'exp.houseboat.name': 'ഹൗസ്ബോട്ട് യാത്ര',
    'exp.houseboat.desc': 'പരമ്പരാഗത കെട്ടുവള്ളത്തിൽ ബാക്ക്‌വാട്ടർ യാത്ര',
    'exp.ayurveda.name': 'ആയുർവേദ വെൽനസ്',
    'exp.ayurveda.desc': 'യഥാർത്ഥ ആയുർവേദ ചികിത്സകൾ',
    'exp.village.name': 'ഗ്രാമീണ ജീവിത അനുഭവം',
    'exp.village.desc': 'കേരളത്തിന്റെ സമ്പന്നമായ സംസ്കാരം',
    
    // Ayurveda section
    'ayurveda.label': 'ആയുർവേദവും വെൽനസും',
    'ayurveda.title': 'പുരാതന ചികിത്സ, ആധുനിക സൗകര്യം',
    'ayurveda.p1': 'കേരളം ആയുർവേദത്തിന്റെ ജന്മസ്ഥലമാണ്. ഞങ്ങളുടെ വെൽനസ് സെന്റർ തലമുറകളായി കൈമാറ്റം ചെയ്യപ്പെടുന്ന യഥാർത്ഥ ചികിത്സകൾ വാഗ്ദാനം ചെയ്യുന്നു.',
    'ayurveda.panchakarma': 'പഞ്ചകർമ്മം',
    'ayurveda.panchakarmaDesc': 'പൂർണ്ണ ഡിറ്റോക്സ് പ്രോഗ്രാം',
    'ayurveda.shirodhara': 'ശിരോധാര',
    'ayurveda.shirodharaDesc': 'ധ്യാന എണ്ണ തെറാപ്പി',
    'ayurveda.abhyanga': 'അഭ്യംഗ',
    'ayurveda.abhyangaDesc': 'ശരീര മസാജ്',
    'ayurveda.nasyam': 'നസ്യം',
    'ayurveda.nasyamDesc': 'മൂക്ക് ചികിത്സ',
    'ayurveda.book': 'വെൽനസ് പാക്കേജ് ബുക്ക് ചെയ്യുക',
    'ayurveda.certified': 'സർട്ടിഫൈഡ്',
    'ayurveda.center': 'ആയുർവേദ സെന്റർ',
    
    // Dining
    'dining.label': 'കേരള പാചകം',
    'dining.title': 'കേരളത്തിന്റെ രുചികൾ',
    'dining.p1': 'വാഴയിലയിൽ വിളമ്പുന്ന പരമ്പരാഗത സദ്യ മുതൽ ബാക്ക്‌വാട്ടറിൽ നിന്ന് പിടിക്കുന്ന കരിമീൻ വരെ ആസ്വദിക്കുക.',
    'dining.restaurant': 'ബാക്ക്‌വാട്ടർ റസ്റ്റോറന്റ്',
    'dining.restaurantDesc': 'പരമ്പരാഗത കേരള സദ്യയും സീഫുഡും',
    'dining.lounge': 'സൂര്യാസ്ത ചായ ലൗഞ്ച്',
    'dining.loungeDesc': 'ബാക്ക്‌വാട്ടർ കാഴ്ചയോടെ ചായയും പലഹാരവും',
    'dining.cooking': 'പാചക ക്ലാസുകൾ',
    'dining.cookingDesc': 'യഥാർത്ഥ കേരള വിഭവങ്ങൾ പഠിക്കുക',
    'dining.menu': 'മെനു കാണുക',
    
    // Gallery
    'gallery.label': 'ഗാലറി',
    'gallery.title': 'കേരളത്തിലെ നിമിഷങ്ങൾ',
    
    // Contact
    'contact.label': 'ബന്ധപ്പെടുക',
    'contact.title': 'നിങ്ങളുടെ കേരള യാത്ര ആസൂത്രണം ചെയ്യുക',
    'contact.subtitle': 'ഞങ്ങളുടെ ടീം നിങ്ങളെ സഹായിക്കാൻ തയ്യാറാണ്. ഞങ്ങൾ ഇംഗ്ലീഷ്, മലയാളം, ഹിന്ദി സംസാരിക്കുന്നു.',
    'contact.firstname': 'പേര്',
    'contact.phone': 'ഫോൺ',
    'contact.email': 'ഇമെയിൽ',
    'contact.checkin': 'ചെക്ക്-ഇൻ',
    'contact.checkout': 'ചെക്ക്-ഔട്ട്',
    'contact.message': 'സന്ദേശം',
    'contact.messagePlaceholder': 'നിങ്ങളുടെ സ്വപ്ന കേരള അവധിക്കാലത്തെക്കുറിച്ച് പറയുക...',
    'contact.send': 'അന്വേഷണം അയയ്ക്കുക',
    'contact.info': 'ബന്ധപ്പെടൽ വിവരങ്ങൾ',
    'contact.location': 'സ്ഥാനം',
    'contact.locationValue': 'മുൻറോ ദ്വീപ്, കൊല്ലം ജില്ല\nകേരളം 691502, ഇന്ത്യ',
    'contact.phoneValue': '+91 474 XXXXXXX\n+91 XXXXX XXXXX (വാട്ട്‌സ്ആപ്പ്)',
    'contact.emailValue': 'reservations@munroemorris.com',
    'contact.reception': 'റിസപ്ഷൻ',
    'contact.receptionValue': '24 മണിക്കൂർ, ആഴ്ചയിൽ 7 ദിവസം',
    'contact.newsletter': 'ബന്ധം നിലനിർത്തുക',
    'contact.newsletterDesc': 'കേരള യാത്രാ നുറുങ്ങുകൾക്കും പ്രത്യേക ഓഫറുകൾക്കുമായി സബ്‌സ്ക്രൈബ് ചെയ്യുക.',
    'contact.reach': 'എങ്ങനെ എത്താം',
    'contact.airport1': 'തിരുവനന്തപുരം എയർപ്പോർട്ട്: 90 കി.മീ (2 മണിക്കൂർ)',
    'contact.railway': 'കൊല്ലം റെയിൽവേ സ്റ്റേഷൻ: 25 കി.മീ (45 മിനിറ്റ്)',
    'contact.airport2': 'കൊച്ചി എയർപ്പോർട്ട്: 160 കി.മീ (4 മണിക്കൂർ)',
    
    // Footer
    'footer.tagline': 'ആഡംബരത്തിൽ കേരളത്തിന്റെ ബാക്ക്‌വാട്ടറുകളുടെ മാജിക്ക് അനുഭവിക്കുക.',
    'footer.quickLinks': 'ദ്രുത ലിങ്കുകൾ',
    'footer.experiences': 'അനുഭവങ്ങൾ',
    'footer.contact': 'ബന്ധപ്പെടുക',
    'footer.backwater': 'ബാക്ക്‌വാട്ടർ ക്രൂസ്',
    'footer.therapy': 'ആയുർവേദ തെറാപ്പി',
    'footer.tour': 'വില്ലേജ് ടൂർ',
    'footer.kathakali': 'കഥകളി',
    'footer.cooking': 'പാചക ക്ലാസ്',
    'footer.birds': 'പക്ഷി നിരീക്ഷണം',
    'footer.copyright': '© 2024 മുൻറോ മോറിസ് റിസോർട്ട്. എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു.',
    'footer.privacy': 'സ്വകാര്യതാ നയം',
    'footer.terms': 'നിബന്ധനകൾ',
    'footer.cookies': 'കുക്കി നയം',
  }
}

// Language Provider Component
function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Language | null
    if (storedLang) {
      // Use microtask to avoid synchronous setState warning
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
function useLang() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLang must be used within a LanguageProvider')
  }
  return context
}

// Theme Toggle Component
function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  // Initialize theme - dark is default
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  // Handle mount and localStorage initialization
  useEffect(() => {
    // Initialize from localStorage - this is a valid pattern for SSR hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light') {
      document.documentElement.classList.add('light')
      setTheme('light')
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

  // Avoid hydration mismatch
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
function LanguageToggle() {
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
function Navigation() {
  const { t } = useLang()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logo, setLogo] = useState('')
  const [siteName, setSiteName] = useState('')
  const [user, setUser] = useState<{ id: string; email: string; role: 'admin' | 'guest'; name: string } | null>(null)

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        window.location.href = '/'
      }
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

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

    // Fetch session on mount
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.user) {
          setUser(data.user)
        }
      })
      .catch(err => console.error('Failed to load session:', err))

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.accommodations'), href: '#accommodations' },
    { name: t('nav.experiences'), href: '#experiences' },
    { name: t('nav.ayurveda'), href: '#ayurveda' },
    { name: t('nav.dining'), href: '#dining' },
    { name: t('nav.gallery'), href: '#gallery' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'skeuo-panel py-2'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
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
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  {siteName || t('hero.title')}
                </span>
                <p className={`text-xs tracking-widest uppercase ${
                  isScrolled ? 'text-muted-foreground' : 'text-white/70'
                }`}>
                  Kerala · India
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                    isScrolled ? 'text-foreground' : 'text-white/90'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageToggle />
              <ThemeToggle />

              {user ? (
                <>
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                      isScrolled ? 'text-foreground' : 'text-white/90'
                    }`}
                  >
                    {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                      isScrolled ? 'text-foreground' : 'text-white/90'
                    }`}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary ${
                    isScrolled ? 'text-foreground' : 'text-white/90'
                  }`}
                >
                  Sign In
                </Link>
              )}

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
                  isScrolled ? 'text-foreground' : 'text-white'
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
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              {user ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <Link
                      href={user.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
                    >
                      {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        handleLogout()
                      }}
                      className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-2xl text-foreground hover:text-primary transition-colors"
                  >
                    Sign In
                  </Link>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 2) * 0.1 }}
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

// Hero Section
function HeroSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/birds-view.jpg"
          alt="Munroe Morris Service Villa Kerala"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-6"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="flex items-center justify-center gap-2"
          >
            <Palmtree className="h-6 w-6 text-primary" />
            <span className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
              {t('hero.welcome')}
            </span>
            <Palmtree className="h-6 w-6 text-primary" />
          </motion.div>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-semibold leading-tight">
            {t('hero.title')}
          </h1>
          
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-white/90 italic max-w-2xl mx-auto">
            {t('hero.tagline')}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 text-sm mt-4">
            <span className="flex items-center gap-1">
              <Ship className="h-4 w-4" /> {t('hero.houseboats')}
            </span>
            <span className="text-primary">•</span>
            <span className="flex items-center gap-1">
              <Flower2 className="h-4 w-4" /> {t('hero.ayurveda')}
            </span>
            <span className="text-primary">•</span>
            <span className="flex items-center gap-1">
              <Mountain className="h-4 w-4" /> {t('hero.ghats')}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button
              size="lg"
              className="skeuo-button px-8 py-6 text-lg tracking-wide"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 rounded-xl text-lg tracking-wide"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              {t('hero.tour')}
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/70"
          >
            <span className="text-xs tracking-[0.2em] uppercase">{t('hero.scroll')}</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// About Section
function AboutSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                {t('about.label')}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                {t('about.title').split(' ').slice(0, -2).join(' ')}
                <span className="gold-metallic"> {t('about.title').split(' ').slice(-2).join(' ')}</span>
              </h2>
            </div>
            <div className="divider-gold w-24" />
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="skeuo-card p-4 text-center">
                <p className="font-serif text-3xl gold-metallic">25</p>
                <p className="text-xs text-muted-foreground mt-1">{t('about.villas')}</p>
              </div>
              <div className="skeuo-card p-4 text-center">
                <p className="font-serif text-3xl gold-metallic">500+</p>
                <p className="text-xs text-muted-foreground mt-1">{t('about.guests')}</p>
              </div>
              <div className="skeuo-card p-4 text-center">
                <p className="font-serif text-3xl gold-metallic">4.9</p>
                <p className="text-xs text-muted-foreground mt-1">{t('about.rating')} ★</p>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="skeuo-card p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <img
                  src="/images/gallery-1.png"
                  alt="Munroe Morris Service Villa Kerala"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 skeuo-button p-6 animate-float">
              <p className="font-serif text-xl">{t('about.established')}</p>
              <p className="text-xs opacity-80 mt-1">{t('about.location')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Accommodations Section
function AccommodationsSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [villas, setVillas] = useState<any[]>([])
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [quoteRoomType, setQuoteRoomType] = useState('')

  const fallbackVillas = [
    {
      id: 'backwater',
      name: 'Backwater Villa',
      slug: 'backwater-villa',
      description: 'Traditional Kerala architecture with modern amenities overlooking the serene backwaters',
      image: "/images/room-collage.jpg",
      size: "120 m²",
      guests: 2,
      features: ['Private Deck', 'Canoe Ride', 'Sunset View']
    },
    {
      id: 'coconut',
      name: 'Coconut Grove Suite',
      slug: 'coconut-grove-suite',
      description: "Nestled among swaying coconut palms with authentic Kerala decor",
      image: "/images/room-collage-2.jpg",
      size: "95 m²",
      guests: 2,
      features: ['Garden View', 'Outdoor Bath', 'Bird Watching']
    },
    {
      id: 'heritage',
      name: 'Heritage Nalukettu',
      slug: 'heritage-nalukettu',
      description: 'Traditional Kerala courtyard house with wooden architecture',
      image: "/images/exterior-interior-collage.jpg",
      size: "150 m²",
      guests: 4,
      features: ['Courtyard', 'Wood Carvings', 'Heritage Style']
    }
  ]

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          const activeRooms = data.filter((r: any) => r.active).map((r: any) => ({
            id: r.id,
            name: r.name,
            slug: r.slug,
            description: r.description,
            image: r.images[0] || '/images/placeholder.png',
            size: r.size,
            guests: r.maxGuests,
            features: r.features
          }))
          setVillas(activeRooms)
        } else {
          setVillas(fallbackVillas)
        }
      })
      .catch(err => {
        console.error('Failed to load database rooms, using static fallback:', err)
        setVillas(fallbackVillas)
      })
  }, [])

  const handleGetQuote = (roomName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setQuoteRoomType(roomName)
    setIsQuoteOpen(true)
  }

  return (
    <section id="accommodations" className="py-24 lg:py-32 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            {t('accommodations.label')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mt-4 leading-tight">
            {t('accommodations.title').split(' ').slice(0, -1).join(' ')}
            <span className="gold-metallic"> {t('accommodations.title').split(' ').slice(-1)}</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            {t('accommodations.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.map((room, index) => (
            <motion.div
              key={room.id || room.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="skeuo-card group overflow-hidden cursor-pointer"
              onClick={() => window.location.href = `/accommodations/${room.slug}`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] bg-primary/95 text-white font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                    Concierge Booking
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
                  {room.name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{room.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(room.features) && room.features.map((feature: string) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 skeuo-inset text-muted-foreground rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="flex items-center gap-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BedDouble className="h-4 w-4" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{room.guests} {t('accommodations.guests')}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    onClick={(e) => handleGetQuote(room.name, e)}
                    className="w-full skeuo-button py-2.5 font-medium tracking-wide text-sm"
                  >
                    Get Quote
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-primary hover:text-primary hover:bg-primary/5"
                  >
                    {t('accommodations.details')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <GetQuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        roomType={quoteRoomType}
      />
    </section>
  )
}

// Experiences Section
function ExperiencesSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      icon: <Ship className="h-8 w-8" />,
      titleKey: 'exp.houseboat.name',
      descKey: 'exp.houseboat.desc',
      image: "/images/experience-1.png"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      titleKey: 'exp.ayurveda.name',
      descKey: 'exp.ayurveda.desc',
      image: "/images/spa.png"
    },
    {
      icon: <Mountain className="h-8 w-8" />,
      titleKey: 'exp.village.name',
      descKey: 'exp.village.desc',
      image: "/images/indoor-activity.jpg"
    }
  ]

  return (
    <section id="experiences" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            {t('experiences.label')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mt-4 leading-tight">
            {t('experiences.title')}
          </h2>
          <p className="text-muted-foreground text-lg mt-6">
            {t('experiences.subtitle')}
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="skeuo-card group relative overflow-hidden"
            >
              <div className="relative aspect-[3/4]">
                <img
                  src={exp.image}
                  alt={t(exp.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-primary mb-3">{exp.icon}</div>
                  <h3 className="font-serif text-2xl">{t(exp.titleKey)}</h3>
                  <p className="text-white/70 text-sm mt-2">{t(exp.descKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Ayurveda Section
function AyurvedaSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="ayurveda" className="py-24 lg:py-32 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium flex items-center gap-2">
                <Flower2 className="h-4 w-4" />
                {t('ayurveda.label')}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                {t('ayurveda.title').split(',')[0]},
                <span className="gold-metallic"> {t('ayurveda.title').split(',')[1]}</span>
              </h2>
            </div>
            <div className="divider-gold w-24" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('ayurveda.p1')}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="skeuo-card p-4">
                <h4 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <Flower2 className="h-5 w-5 text-primary" />
                  {t('ayurveda.panchakarma')}
                </h4>
                <p className="text-muted-foreground text-sm mt-1">{t('ayurveda.panchakarmaDesc')}</p>
              </div>
              <div className="skeuo-card p-4">
                <h4 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {t('ayurveda.shirodhara')}
                </h4>
                <p className="text-muted-foreground text-sm mt-1">{t('ayurveda.shirodharaDesc')}</p>
              </div>
              <div className="skeuo-card p-4">
                <h4 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  {t('ayurveda.abhyanga')}
                </h4>
                <p className="text-muted-foreground text-sm mt-1">{t('ayurveda.abhyangaDesc')}</p>
              </div>
              <div className="skeuo-card p-4">
                <h4 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <Waves className="h-5 w-5 text-primary" />
                  {t('ayurveda.nasyam')}
                </h4>
                <p className="text-muted-foreground text-sm mt-1">{t('ayurveda.nasyamDesc')}</p>
              </div>
            </div>

            <Button className="skeuo-button px-8 py-6 text-lg tracking-wide mt-4">
              {t('ayurveda.book')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="skeuo-card p-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <img
                  src="/images/spa.png"
                  alt="Ayurveda Spa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 skeuo-button p-6 animate-pulse-glow">
              <p className="font-serif text-xl">{t('ayurveda.certified')}</p>
              <p className="text-xs opacity-80">{t('ayurveda.center')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Dining Section
function DiningSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="dining" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="skeuo-card p-2">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img
                  src="/images/dining.png"
                  alt="Kerala Cuisine"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-primary rounded-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-primary rounded-xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                {t('dining.label')}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight">
                {t('dining.title').split(' ').slice(0, -1).join(' ')}
                <span className="gold-metallic"> {t('dining.title').split(' ').slice(-1)}</span>
              </h2>
            </div>
            <div className="divider-gold w-24" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('dining.p1')}
            </p>

            <div className="space-y-4 pt-4">
              <div className="skeuo-card flex items-start gap-4 p-4">
                <div className="skeuo-button p-3 rounded-xl">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-foreground">{t('dining.restaurant')}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{t('dining.restaurantDesc')}</p>
                </div>
              </div>
              <div className="skeuo-card flex items-start gap-4 p-4">
                <div className="skeuo-button p-3 rounded-xl">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-foreground">{t('dining.lounge')}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{t('dining.loungeDesc')}</p>
                </div>
              </div>
              <div className="skeuo-card flex items-start gap-4 p-4">
                <div className="skeuo-button p-3 rounded-xl">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-foreground">{t('dining.cooking')}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{t('dining.cookingDesc')}</p>
                </div>
              </div>
            </div>

            <Button className="skeuo-button px-8 py-6 text-lg tracking-wide mt-4">
              {t('dining.menu')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Gallery Section
function GallerySection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    { src: "/images/birds-view.jpg", alt: "Aerial Birds Eye View" },
    { src: "/images/front-exterior.jpg", alt: "Resort Front Exterior" },
    { src: "/images/room-collage.jpg", alt: "Backwater Villa Interior" },
    { src: "/images/room-collage-2.jpg", alt: "Coconut Grove Suite Interior" },
    { src: "/images/exterior-interior-collage.jpg", alt: "Heritage Nalukettu Courtyard" },
    { src: "/images/indoor-activity.jpg", alt: "Guest Indoor Activities" },
    { src: "/images/grill-area.jpg", alt: "Outdoor Barbecue Area" },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section id="gallery" className="py-24 lg:py-32 skeuo-inset mx-4 lg:mx-8 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            {t('gallery.label')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mt-4 leading-tight">
            {t('gallery.title')}
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="skeuo-card p-2 relative aspect-[21/9] overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover rounded-xl"
              />
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 skeuo-button p-3 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 skeuo-button p-3 rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`skeuo-card p-1 aspect-video overflow-hidden transition-all ${
                index === currentIndex ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [settings, setSettings] = useState<Record<string, string>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setSettings(data)
      })
      .catch(err => console.error('Failed to load settings in ContactSection:', err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          checkIn: checkIn || null,
          checkOut: checkOut || null,
          guests: 1,
          roomType: 'General Inquiry',
          message
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry')

      setSuccess(true)
      setName('')
      setEmail('')
      setPhone('')
      setCheckIn('')
      setCheckOut('')
      setMessage('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
                {t('contact.label')}
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight">
                {t('contact.title').split(' ').slice(0, -1).join(' ')}
                <span className="gold-metallic"> {t('contact.title').split(' ').slice(-1)}</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">{t('contact.subtitle')}</p>

            {success ? (
              <div className="skeuo-card p-6 text-center space-y-4">
                <p className="text-green-500 font-medium">Your inquiry has been submitted successfully!</p>
                <p className="text-sm text-muted-foreground">Our reservations team will reach out to you shortly.</p>
                <Button onClick={() => setSuccess(false)} className="skeuo-button py-2 px-4 text-xs font-medium">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">{t('contact.firstname')}</label>
                    <Input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="..."
                      className="skeuo-input mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">{t('contact.phone')}</label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="skeuo-input mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">{t('contact.email')}</label>
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="skeuo-input mt-1.5"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">{t('contact.checkin')}</label>
                    <Input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="skeuo-input mt-1.5"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">{t('contact.checkout')}</label>
                    <Input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="skeuo-input mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">{t('contact.message')}</label>
                  <Textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t('contact.messagePlaceholder')}
                    className="skeuo-input mt-1.5 min-h-[120px]"
                  />
                </div>

                {error && (
                  <div className="text-xs text-red-500 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                    {error}
                  </div>
                )}

                <Button type="submit" disabled={loading} className="skeuo-button w-full py-6 text-lg tracking-wide">
                  {loading ? 'Sending Inquiry...' : t('contact.send')}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="skeuo-card p-8 space-y-6">
              <h3 className="font-serif text-2xl text-foreground">{t('contact.info')}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{t('contact.location')}</p>
                    <p className="text-muted-foreground text-sm mt-1 whitespace-pre-line">
                      {settings.resort_address || t('contact.locationValue')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{t('contact.phone')}</p>
                    <p className="text-muted-foreground text-sm mt-1 whitespace-pre-line">
                      {settings.resort_phone || t('contact.phoneValue')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{t('contact.email')}</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {settings.resort_email || t('contact.emailValue')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">{t('contact.reception')}</p>
                    <p className="text-muted-foreground text-sm mt-1">{t('contact.receptionValue')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="skeuo-card p-8 space-y-4">
              <h3 className="font-serif text-2xl text-foreground">{t('contact.newsletter')}</h3>
              <p className="text-muted-foreground text-sm">{t('contact.newsletterDesc')}</p>
              <div className="flex gap-2">
                <Input placeholder="email" className="skeuo-input flex-1" />
                <Button className="skeuo-button px-4">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* How to Reach */}
            <div className="skeuo-card p-8">
              <h3 className="font-serif text-xl text-foreground mb-4">{t('contact.reach')}</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✈</span> {t('contact.airport1')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">🚂</span> {t('contact.railway')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">🚗</span> {t('contact.airport2')}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [testimonials, setTestimonials] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) {
          setTestimonials(data)
        }
      })
      .catch(err => console.error('Failed to load testimonials:', err))
  }, [])

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-primary text-sm tracking-[0.3em] uppercase font-medium">
            Guest Testimonials
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-foreground mt-4 leading-tight">
            What Our <span className="gold-metallic">Guests Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="skeuo-card p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
                  ))}
                </div>
                <h4 className="font-serif text-lg text-foreground italic">
                  "{review.title}"
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="font-medium text-foreground text-sm">
                  {review.guest?.firstName} {review.guest?.lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const { t } = useLang()
  const [settings, setSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setSettings(data)
      })
      .catch(err => console.error('Failed to load settings in Footer:', err))
  }, [])

  const quickLinks = [
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.accommodations'), href: '/accommodations' },
    { name: t('nav.ayurveda'), href: '/spa' },
    { name: t('hero.houseboats'), href: '/experiences#houseboat' },
    { name: t('nav.dining'), href: '/dining' },
    { name: t('nav.gallery'), href: '/gallery' },
  ]

  const experiences = [
    { name: t('footer.backwater'), href: '/experiences#houseboat' },
    { name: t('footer.therapy'), href: '/spa' },
    { name: t('footer.tour'), href: '/experiences#village' },
    { name: t('footer.kathakali'), href: '/experiences#kathakali' },
    { name: t('footer.cooking'), href: '/dining#cooking' },
    { name: t('footer.birds'), href: '/experiences#nature' },
  ]

  return (
    <footer className="skeuo-panel py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {settings.brand_logo ? (
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg bg-background/30 backdrop-blur-sm border border-primary/20">
                  <img src={settings.brand_logo} alt="Logo" className="w-full h-full object-contain p-1.5" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                  <Flower2 className="h-6 w-6 text-primary-foreground" />
                </div>
              )}
              <div>
                <h3 className="font-serif text-2xl text-foreground">{settings.site_name || t('hero.title')}</h3>
                <p className="text-xs text-muted-foreground">Kerala, India</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="skeuo-inset p-2 rounded-lg hover:bg-primary/20 transition-colors">
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="skeuo-inset p-2 rounded-lg hover:bg-primary/20 transition-colors">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="skeuo-inset p-2 rounded-lg hover:bg-primary/20 transition-colors">
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="skeuo-inset p-2 rounded-lg hover:bg-primary/20 transition-colors">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">{t('footer.experiences')}</h4>
            <ul className="space-y-2">
              {experiences.map((service) => (
                <li key={service.name}>
                  <a href={service.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg text-foreground mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {settings.resort_address || 'Munroe Island, Kollam'}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                {settings.resort_phone || '+91 474 XXXXXXX'}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${settings.resort_email || 'info@munroemorris.com'}`} className="hover:text-primary transition-colors">
                  {settings.resort_email || 'info@munroemorris.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider-gold mt-12 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/50 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground/50">
            <a href="/privacy" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
            <a href="/terms" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
            <a href="/cookies" className="hover:text-primary transition-colors">{t('footer.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Helper function for useInView
function useInView(ref: React.RefObject<Element>, options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
      }
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, options])

  return isInView
}

// PlayCircle icon component
function PlayCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  )
}

// Main Page Component
export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen flex flex-col leather-texture">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <AccommodationsSection />
        <ExperiencesSection />
        <AyurvedaSection />
        <DiningSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
