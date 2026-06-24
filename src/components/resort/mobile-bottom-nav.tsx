'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BedDouble, Phone, MessageSquare, Menu } from 'lucide-react'

export function MobileBottomNav() {
  const pathname = usePathname()
  const [whatsappNumber, setWhatsappNumber] = useState('+91 98765 43210')

  useEffect(() => {
    // Fetch WhatsApp number from dynamic settings
    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.whatsapp_number) {
          setWhatsappNumber(data.whatsapp_number)
        }
      })
      .catch((err) => console.error('Failed to load settings in bottom nav:', err))
  }, [])

  const handleWhatsApp = () => {
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '')
    const msg = 'Hello Munroe Morris, I would like to make a general inquiry.'
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Villas', href: '/accommodations', icon: BedDouble },
    { name: 'Inquire', onClick: handleWhatsApp, icon: MessageSquare, highlight: true },
    { name: 'Menu', href: '/menu', icon: Menu },
    { name: 'Contact', href: '/contact', icon: Phone },
  ]

  // Hide bottom navigation on admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-4 pt-2 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none">
      <nav className="flex items-center justify-around h-16 max-w-md mx-auto rounded-2xl skeuo-panel bg-card/90 backdrop-blur-md border border-white/10 shadow-2xl pointer-events-auto px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = item.href ? pathname === item.href : false

          if (item.highlight) {
            return (
              <button
                key={index}
                onClick={item.onClick}
                className="relative -top-5 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-gold-dark text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
                aria-label={item.name}
              >
                <Icon className="h-6 w-6" />
                <span className="text-[10px] font-medium absolute -bottom-6 text-foreground tracking-wider font-sans">
                  {item.name}
                </span>
              </button>
            )
          }

          return item.href ? (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all duration-300 ${
                isActive
                  ? 'text-primary scale-105 font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] tracking-wide font-sans">{item.name}</span>
            </Link>
          ) : (
            <button
              key={index}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center flex-1 h-full py-1 text-center text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <Icon className="h-5 w-5 mb-0.5" />
              <span className="text-[10px] tracking-wide font-sans">{item.name}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
