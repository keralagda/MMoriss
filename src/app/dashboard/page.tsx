'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Calendar, Star, FileText, CheckCircle2, Clock, XCircle, User, Phone, Mail, Globe, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Room {
  name: string
  images: string
}

interface Booking {
  id: string
  confirmationCode: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  totalPrice: string
  status: string
  room: Room
}

export default function GuestDashboard() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  
  // Review form states
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewSuccess, setReviewSuccess] = useState(false)
  const [reviewError, setReviewError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    
    // Fetch session
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.user) {
          window.location.href = '/login'
          return
        }
        setSession(data.user)
        
        // Fetch guest bookings
        return fetch('/api/bookings')
      })
      .then(res => {
        if (res) return res.json()
      })
      .then(bookingsData => {
        if (bookingsData && !bookingsData.error) {
          setBookings(bookingsData)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Dashboard initialization error:", err)
        setLoading(false)
      })
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/login'
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setReviewLoading(true)
    setReviewError(null)
    setReviewSuccess(false)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, title, comment })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit review')
      
      setReviewSuccess(true)
      setTitle('')
      setComment('')
      setRating(5)
    } catch (err: any) {
      setReviewError(err.message)
    } finally {
      setReviewLoading(false)
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm font-serif">Opening Sanctuary gates...</div>
      </div>
    )
  }

  const statusIcons: Record<string, { bg: string; text: string; icon: any }> = {
    pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: Clock },
    confirmed: { bg: 'bg-green-500/10', text: 'text-green-500', icon: CheckCircle2 },
    checked_in: { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: CheckCircle2 },
    checked_out: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', icon: CheckCircle2 },
    cancelled: { bg: 'bg-red-500/10', text: 'text-red-500', icon: XCircle },
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-foreground font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 skeuo-card p-6 border border-white/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground font-serif text-lg font-semibold">
              {session?.name ? session.name.charAt(0) : 'G'}
            </div>
            <div>
              <h1 className="font-serif text-2xl text-foreground font-semibold">Welcome, {session?.name}</h1>
              <p className="text-muted-foreground text-xs">Guest Account Dashboard • {session?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="ghost" className="skeuo-button text-xs self-start sm:self-auto gap-1.5 py-5">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Card & Review Submission */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Profile Info */}
            <div className="skeuo-card p-6 border border-white/60 space-y-4">
              <h2 className="font-serif text-lg text-foreground font-semibold flex items-center gap-2 border-b border-border pb-2">
                <User className="h-5 w-5 text-primary" /> Profile details
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary/70 shrink-0" />
                  <span className="truncate">{session?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4 text-primary/70 shrink-0" />
                  <span>Role: Registered Guest</span>
                </div>
              </div>
            </div>

            {/* Submit Review */}
            <div className="skeuo-card p-6 border border-white/60 space-y-4">
              <h2 className="font-serif text-lg text-foreground font-semibold flex items-center gap-2 border-b border-border pb-2">
                <Sparkles className="h-5 w-5 text-primary" /> Share your experience
              </h2>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Rating</label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= rating ? 'text-primary fill-primary' : 'text-muted'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground font-serif">Review Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., An unforgettable stay"
                    className="skeuo-input px-3.5 py-2.5 w-full text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground font-serif">Your comments</label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe your room, service, or backwater activities..."
                    className="skeuo-input px-3.5 py-2.5 w-full text-xs resize-none"
                  />
                </div>

                {reviewError && (
                  <div className="text-xs text-red-500 bg-red-500/5 p-3 rounded-lg">
                    {reviewError}
                  </div>
                )}

                {reviewSuccess && (
                  <div className="text-xs text-green-600 bg-green-500/5 p-3 rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Review submitted! It will appear sitewide once approved.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={reviewLoading}
                  className="w-full skeuo-button py-5 text-xs font-semibold"
                >
                  {reviewLoading ? 'Submitting...' : 'Submit Testimonial'}
                </Button>
              </form>
            </div>

          </div>

          {/* Right Column: Bookings History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="skeuo-card p-6 border border-white/60">
              <h2 className="font-serif text-lg text-foreground font-semibold flex items-center gap-2 border-b border-border pb-3 mb-6">
                <Calendar className="h-5 w-5 text-primary" /> Your sanctuary reservations
              </h2>

              {bookings.length === 0 ? (
                <div className="text-center py-12 skeuo-inset rounded-2xl bg-[#E6EAF0]">
                  <p className="text-sm text-muted-foreground font-serif">No reservations found.</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Ready to book? Explore our villas to request a quote.</p>
                  <Button
                    onClick={() => window.location.href = '/accommodations'}
                    className="mt-4 skeuo-button text-xs py-4 px-6"
                  >
                    View Accommodations
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((booking) => {
                    const status = statusIcons[booking.status] || { bg: 'bg-muted', text: 'text-muted-foreground', icon: Clock }
                    const StatusIcon = status.icon
                    const checkInDate = new Date(booking.checkIn).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                    const checkOutDate = new Date(booking.checkOut).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                    
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={booking.id}
                        className="skeuo-inset p-5 rounded-2xl bg-[#E6EAF0] flex flex-col md:flex-row md:items-center justify-between gap-4 border border-black/5"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold bg-white/60 px-2 py-0.5 rounded border border-black/5">
                              Code: {booking.confirmationCode}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${status.bg} ${status.text}`}>
                              <StatusIcon className="h-3 w-3 shrink-0" />
                              {booking.status.replace('_', ' ')}
                            </span>
                          </div>
                          
                          <div className="space-y-0.5">
                            <h3 className="font-serif font-bold text-foreground">{booking.room?.name || 'Unknown Room'}</h3>
                            <p className="text-xs text-muted-foreground">
                              {checkInDate} to {checkOutDate}
                            </p>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            {booking.adults} Adults {booking.children > 0 && `• ${booking.children} Children`}
                          </div>
                        </div>

                        <div className="flex md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 border-black/5 pt-3 md:pt-0 shrink-0">
                          <span className="text-xs text-muted-foreground md:mb-1">Total amount</span>
                          <span className="font-serif font-semibold text-lg text-primary">
                            ₹{Number(booking.totalPrice).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
