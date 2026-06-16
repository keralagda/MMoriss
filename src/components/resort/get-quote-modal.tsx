'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Mail, Phone, Users, MessageSquare, CheckCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GetQuoteModalProps {
  isOpen: boolean
  onClose: () => void
  roomType?: string
}

export function GetQuoteModal({ isOpen, onClose, roomType = '' }: GetQuoteModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [message, setMessage] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // 1. Fetch Admin WhatsApp configurations
      let whatsappNumber = '+91 98765 43210'
      let whatsappTemplate = 'Hello Munroe Morris, I would like to request a quote.\n\nName: {{name}}\nEmail: {{email}}\nPhone: {{phone}}\nRoom/Villa: {{roomType}}\nCheck-In: {{checkIn}}\nCheck-Out: {{checkOut}}\nGuests: {{guests}}\nMessage: {{message}}'

      try {
        const settingsRes = await fetch('/api/settings')
        if (settingsRes.ok) {
          const settings = await settingsRes.json()
          if (settings.whatsapp_number) whatsappNumber = settings.whatsapp_number
          if (settings.whatsapp_template) whatsappTemplate = settings.whatsapp_template
        }
      } catch (settingsErr) {
        console.error('Failed to load WhatsApp settings:', settingsErr)
      }

      // 2. Format the WhatsApp message template
      let formattedMsg = whatsappTemplate
        .replace(/{{name}}/g, name || '')
        .replace(/{{email}}/g, email || '')
        .replace(/{{phone}}/g, phone || '')
        .replace(/{{roomType}}/g, roomType || 'Not specified')
        .replace(/{{checkIn}}/g, checkIn || 'Not specified')
        .replace(/{{checkOut}}/g, checkOut || 'Not specified')
        .replace(/{{guests}}/g, guests || '2')
        .replace(/{{message}}/g, message || '')

      // 3. Save Inquiry to the database (SSoT)
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          checkIn: checkIn || null,
          checkOut: checkOut || null,
          guests: guests ? parseInt(guests) : null,
          roomType: roomType || null,
          message
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit quote request')

      // 4. Redirect to WhatsApp
      const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '')
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedMsg)}`, '_blank')

      setSuccess(true)
      // Reset form
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-lg overflow-hidden skeuo-panel rounded-2xl bg-[#F0F2F5] border border-white/60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/60 hover:bg-white border border-black/5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all active:scale-95 shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-black/5 bg-gradient-to-br from-primary/5 to-gold-dark/5">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Sparkles className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Inquire & Request Quote</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                {roomType ? `Quote for ${roomType}` : 'Request a Custom Quote'}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Let us know your travel dates, and our concierge will curate a personalized quote for your stay.
              </p>
            </div>

            {/* Modal Body / Form */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {success ? (
                <div className="text-center py-8 space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">Quote Request Received!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Thank you for your inquiry. Our reservations team will review your request and send a tailored proposal to your email shortly.
                  </p>
                  <Button onClick={onClose} className="skeuo-button py-4 px-6 text-xs font-medium">
                    Close Window
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rajesh Kumar"
                        className="skeuo-input pl-9 pr-4 py-2 w-full text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="skeuo-input pl-9 pr-4 py-2 w-full text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="skeuo-input pl-9 pr-4 py-2 w-full text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Check-In</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="skeuo-input pl-9 pr-4 py-2 w-full text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Check-Out</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="skeuo-input pl-9 pr-4 py-2 w-full text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground font-serif">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="skeuo-input pl-9 pr-4 py-2 w-full text-xs appearance-none bg-transparent"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground font-serif font-medium">Special Requests / Message</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Mention any requirements, e.g. airport transfer, dietary restrictions..."
                        className="skeuo-input pl-9 pr-4 py-2 w-full text-xs resize-none"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-xs text-red-500 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full skeuo-button py-5 text-xs font-semibold mt-2"
                  >
                    {loading ? 'Submitting Inquiry...' : 'Submit Quote Request'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
