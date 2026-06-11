'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Users,
  Calendar,
  Star,
  MoreVertical,
  X,
  Download
} from 'lucide-react'

interface Guest {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  city: string
  country: string
  notes: string
  totalBookings: number
  totalSpent: number
  lastVisit: Date
  createdAt: Date
}

// Mock data
const mockGuests: Guest[] = [
  { id: '1', firstName: 'Rajesh', lastName: 'Kumar', email: 'rajesh@email.com', phone: '+91 98765 43210', nationality: 'Indian', city: 'Mumbai', country: 'India', notes: 'Prefers backwater view rooms', totalBookings: 3, totalSpent: 145000, lastVisit: new Date('2024-01-15'), createdAt: new Date('2023-06-10') },
  { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@email.com', phone: '+1 234 567 8900', nationality: 'American', city: 'New York', country: 'USA', notes: 'Vegetarian, allergic to nuts', totalBookings: 2, totalSpent: 98000, lastVisit: new Date('2024-01-16'), createdAt: new Date('2023-08-15') },
  { id: '3', firstName: 'Amit', lastName: 'Patel', email: 'amit@email.com', phone: '+91 98765 12345', nationality: 'Indian', city: 'Bangalore', country: 'India', notes: 'VIP guest - always upgrade', totalBookings: 5, totalSpent: 325000, lastVisit: new Date('2024-01-17'), createdAt: new Date('2022-12-01') },
  { id: '4', firstName: 'Emily', lastName: 'Chen', email: 'emily@email.com', phone: '+65 1234 5678', nationality: 'Singaporean', city: 'Singapore', country: 'Singapore', notes: 'Honeymoon couple', totalBookings: 1, totalSpent: 36000, lastVisit: new Date('2024-01-18'), createdAt: new Date('2024-01-10') },
  { id: '5', firstName: 'Mohammed', lastName: 'Ali', email: 'mohammed@email.com', phone: '+971 50 123 4567', nationality: 'Emirati', city: 'Dubai', country: 'UAE', notes: 'Prefers halal food', totalBookings: 2, totalSpent: 185000, lastVisit: new Date('2023-12-20'), createdAt: new Date('2023-03-15') },
  { id: '6', firstName: 'Priya', lastName: 'Sharma', email: 'priya@email.com', phone: '+91 99887 76543', nationality: 'Indian', city: 'Delhi', country: 'India', notes: '', totalBookings: 1, totalSpent: 18000, lastVisit: new Date('2023-11-10'), createdAt: new Date('2023-10-20') },
]

// Guest Detail Modal
function GuestDetailModal({
  guest,
  onClose
}: {
  guest: Guest | null
  onClose: () => void
}) {
  if (!guest) return null

  const lastVisitStr = new Date(guest.lastVisit).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl skeuo-panel rounded-2xl overflow-hidden bg-[#F0F2F5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground text-xl font-serif">
              {guest.firstName.charAt(0)}{guest.lastName.charAt(0)}
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground font-semibold">{guest.firstName} {guest.lastName}</h2>
              <p className="text-muted-foreground text-sm">{guest.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="skeuo-inset p-4 rounded-xl text-center">
              <p className="text-2xl font-serif font-semibold text-foreground">{guest.totalBookings}</p>
              <p className="text-xs text-muted-foreground">Bookings</p>
            </div>
            <div className="skeuo-inset p-4 rounded-xl text-center">
              <p className="text-2xl font-serif font-semibold gold-metallic">₹{(guest.totalSpent / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </div>
            <div className="skeuo-inset p-4 rounded-xl text-center">
              <p className="text-2xl font-serif font-semibold text-foreground">{lastVisitStr}</p>
              <p className="text-xs text-muted-foreground">Last Visit</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="skeuo-inset p-4 rounded-xl space-y-3">
            <h3 className="font-medium text-foreground font-serif">Contact Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{guest.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{guest.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{guest.city}, {guest.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{guest.nationality}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {guest.notes && (
            <div className="skeuo-inset p-4 rounded-xl">
              <h3 className="font-medium text-foreground mb-2 font-serif">Notes</h3>
              <p className="text-sm text-muted-foreground">{guest.notes}</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border flex items-center justify-between bg-white/20">
          <Button variant="outline" className="border-red-500/50 text-red-500 text-xs py-4 px-4">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Guest
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="text-xs py-4 px-4">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button className="skeuo-button text-xs py-4 px-5">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function GuestsPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [guests, setGuests] = useState<Guest[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)

  useEffect(() => {
    setMounted(true)
    fetch('/api/guests')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && !data.error) {
          const mapped = data.map((g: any) => {
            const totalBookings = g.bookings ? g.bookings.length : 0
            const totalSpent = g.bookings ? g.bookings.reduce((sum: number, b: any) => {
              if (['confirmed', 'checked_in', 'checked_out'].includes(b.status)) {
                return sum + Number(b.totalPrice)
              }
              return sum
            }, 0) : 0
            
            let lastVisit = g.createdAt
            if (g.bookings && g.bookings.length > 0) {
              const visits = g.bookings.map((b: any) => new Date(b.checkIn).getTime())
              lastVisit = new Date(Math.max(...visits))
            }

            return {
              id: g.id,
              firstName: g.firstName,
              lastName: g.lastName,
              email: g.email,
              phone: g.phone || 'N/A',
              nationality: g.nationality || 'N/A',
              city: g.city || 'N/A',
              country: g.country || 'N/A',
              notes: g.notes || '',
              totalBookings,
              totalSpent,
              lastVisit,
              createdAt: new Date(g.createdAt)
            }
          })
          setGuests(mapped)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load guests:', err)
        setLoading(false)
      })
  }, [])

  const filteredGuests = guests.filter(guest =>
    guest.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.phone.includes(searchQuery)
  )

  if (!mounted || loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-muted-foreground">Loading guests...</div></div>
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Guests</h1>
          <p className="text-muted-foreground mt-1">Manage guest profiles and history</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="skeuo-button">
            <Plus className="h-4 w-4 mr-2" />
            Add Guest
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search guests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 skeuo-inset rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="skeuo-card p-4">
          <p className="text-sm text-muted-foreground">Total Guests</p>
          <p className="text-2xl font-serif font-semibold text-foreground">{guests.length}</p>
        </div>
        <div className="skeuo-card p-4">
          <p className="text-sm text-muted-foreground">New This Month</p>
          <p className="text-2xl font-serif font-semibold text-foreground">24</p>
        </div>
        <div className="skeuo-card p-4">
          <p className="text-sm text-muted-foreground">Repeat Guests</p>
          <p className="text-2xl font-serif font-semibold text-foreground">18</p>
        </div>
        <div className="skeuo-card p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-serif font-semibold gold-metallic">₹8.07L</p>
        </div>
      </div>

      {/* Guests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="skeuo-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Guest</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Contact</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Location</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Bookings</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Total Spent</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Last Visit</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredGuests.map((guest) => (
                <tr key={guest.id} className="hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => setSelectedGuest(guest)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground text-sm font-medium">
                        {guest.firstName.charAt(0)}{guest.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{guest.firstName} {guest.lastName}</p>
                        <p className="text-xs text-muted-foreground">{guest.nationality}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{guest.email}</p>
                    <p className="text-xs text-muted-foreground">{guest.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{guest.city}, {guest.country}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 skeuo-inset rounded-full text-xs text-muted-foreground">
                      {guest.totalBookings} bookings
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">₹{guest.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{guest.lastVisit.toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors" onClick={(e) => { e.stopPropagation(); setSelectedGuest(guest) }}>
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 transition-colors">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedGuest && <GuestDetailModal guest={selectedGuest} onClose={() => setSelectedGuest(null)} />}
      </AnimatePresence>
    </div>
  )
}
