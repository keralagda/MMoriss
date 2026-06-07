'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Flower2 } from 'lucide-react'
import { useLang } from './language-context'

interface PageHeroProps {
  titleKey: string
  subtitleKey?: string
  imageSrc: string
  breadcrumbs?: { name: string; href: string }[]
}

export function PageHero({ titleKey, subtitleKey, imageSrc, breadcrumbs }: PageHeroProps) {
  const { t } = useLang()

  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt={t(titleKey)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Breadcrumbs */}
        {breadcrumbs && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <nav className="flex items-center gap-2 text-white/70 text-sm">
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  <span className="text-primary">/</span>
                  <span className={index === breadcrumbs.length - 1 ? 'text-primary' : 'hover:text-primary transition-colors'}>
                    {crumb.name}
                  </span>
                </span>
              ))}
            </nav>
          </motion.div>
        )}

        {/* Decorative element */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-4"
        >
          <Flower2 className="h-8 w-8 text-primary" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight"
        >
          {t(titleKey)}
        </motion.h1>

        {/* Subtitle */}
        {subtitleKey && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-xl sm:text-2xl text-white/80 italic mt-4 max-w-2xl"
          >
            {t(subtitleKey)}
          </motion.p>
        )}

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 100 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="divider-gold mt-8"
        />
      </div>
    </section>
  )
}
