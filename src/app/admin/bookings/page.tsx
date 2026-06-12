'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Users,
  IndianRupee,
  Download,
  X
} from 'lucide-react'

interface Booking {
  id: string
  confirmationCode: string
  guest: { firstName: string; lastName: string; email: string; phone: string }
  room: { name: string }
  checkIn: Date
  checkOut: Date
  adults: number
  children: number
  totalPrice: number
  status: string
  paymentStatus: string
  createdAt: Date
}

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'checked_in', label: 'Checked In' },
  { value: 'checked_out', label: 'Checked Out' },
  { value: 'cancelled', label: 'Cancelled' },
]

const statusColors: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
  confirmed: { bg: 'bg-green-500/10', text: 'text-green-500', icon: CheckCircle },
  pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: Clock },
  checked_in: { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: CheckCircle },
  checked_out: { bg: 'bg-gray-500/10', text: 'text-gray-500', icon: CheckCircle },
  cancelled: { bg: 'bg-red-500/10', text: 'text-red-500', icon: XCircle },
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    confirmationCode: 'BK001',
    guest: { firstName: 'Rajesh', lastName: 'Kumar', email: 'rajesh@email.com', phone: '+91 98765 43210' },
    room: { name: 'Backwater Villa' },
    checkIn: new Date('2024-01-15'),
    checkOut: new Date('2024-01-18'),
    adults: 2,
    children: 0,
    totalPrice: 45000,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '2',
    confirmationCode: 'BK002',
    guest: { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@email.com', phone: '+1 234 567 8900' },
    room: { name: 'Heritage Nalukettu' },
    checkIn: new Date('2024-01-16'),
    checkOut: new Date('2024-01-19'),
    adults: 4,
    children: 1,
    totalPrice: 54000,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date('2024-01-11')
  },
  {
    id: '3',
    confirmationCode: 'BK003',
    guest: { firstName: 'Amit', lastName: 'Patel', email: 'amit@email.com', phone: '+91 98765 12345' },
    room: { name: 'Pool Villa' },
    checkIn: new Date('2024-01-17'),
    checkOut: new Date('2024-01-20'),
    adults: 2,
    children: 0,
    totalPrice: 75000,
    status: 'checked_in',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-12')
  },
  {
    id: '4',
    confirmationCode: 'BK004',
    guest: { firstName: 'Emily', lastName: 'Chen', email: 'emily@email.com', phone: '+65 1234 5678' },
    room: { name: 'Coconut Grove Suite' },
    checkIn: new Date('2024-01-18'),
    checkOut: new Date('2024-01-21'),
    adults: 2,
    children: 0,
    totalPrice: 36000,
    status: 'checked_out',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-13')
  },
  {
    id: '5',
    confirmationCode: 'BK005',
    guest: { firstName: 'Mohammed', lastName: 'Ali', email: 'mohammed@email.com', phone: '+971 50 123 4567' },
    room: { name: 'Luxury Houseboat' },
    checkIn: new Date('2024-01-19'),
    checkOut: new Date('2024-01-20'),
    adults: 2,
    children: 0,
    totalPrice: 35000,
    status: 'cancelled',
    paymentStatus: 'refunded',
    createdAt: new Date('2024-01-14')
  },
]

// Booking Detail Modal
function BookingDetailModal({ 
  booking, 
  onClose 
}: { 
  booking: Booking | null
  onClose: () => void 
}) {
  if (!booking) return null

  const StatusIcon = statusColors[booking.status]?.icon || Clock
  const checkInStr = new Date(booking.checkIn).toLocaleDateString()
  const checkOutStr = new Date(booking.checkOut).toLocaleDateString()
  const createdStr = new Date(booking.createdAt).toLocaleDateString()

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
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl text-foreground">Booking {booking.confirmationCode}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Created on {createdStr}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center gap-4">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusColors[booking.status].bg} ${statusColors[booking.status].text}`}>
              <StatusIcon className="h-4 w-4" />
              {booking.status.replace('_', ' ')}
            </span>
            <span className="text-sm text-muted-foreground">
              Payment: {booking.paymentStatus}
            </span>
          </div>

          {/* Guest Info */}
          <div className="skeuo-inset p-4 rounded-xl">
            <h3 className="font-medium text-foreground mb-3 font-serif">Guest Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-foreground">{booking.guest?.firstName} {booking.guest?.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-foreground">{booking.guest?.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-foreground">{booking.guest?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Guests</p>
                <p className="text-foreground">{booking.adults} Adults, {booking.children} Children</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="skeuo-inset p-4 rounded-xl">
            <h3 className="font-medium text-foreground mb-3 font-serif">Booking Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Room</p>
                <p className="text-foreground">{booking.room?.name || 'Unknown Room'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Check-in</p>
                <p className="text-foreground">{checkInStr}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Check-out</p>
                <p className="text-foreground">{checkOutStr}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Price</p>
                <p className="text-foreground font-semibold">₹{Number(booking.totalPrice).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex justify-end gap-4 bg-white/20">
          <Button onClick={onClose} variant="outline" className="text-xs py-4 px-6">
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function BookingsPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    setMounted(true)
    fetch('/api/bookings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && !data.error) {
          setBookings(data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch bookings:', err)
        setLoading(false)
      })
  }, [])

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.confirmationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.guest && (
        booking.guest.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.guest.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.guest.email.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading bookings...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage reservations and check-ins</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by code, guest name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 skeuo-inset rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 skeuo-inset rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusOptions.slice(1).map((status) => {
          const count = bookings.filter(b => b.status === status.value).length
          const StatusIcon = statusColors[status.value]?.icon || Clock
          return (
            <button
              key={status.value}
              onClick={() => setStatusFilter(status.value === statusFilter ? 'all' : status.value)}
              className={`p-4 skeuo-card rounded-xl text-left transition-all ${
                statusFilter === status.value ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${statusColors[status.value]?.bg || 'bg-gray-500/10'} flex items-center justify-center`}>
                  <StatusIcon className={`h-5 w-5 ${statusColors[status.value]?.text || 'text-gray-500'}`} />
                </div>
                <div>
                  <p className="text-2xl font-serif font-semibold text-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground">{status.label}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="skeuo-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Booking</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Guest</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Room</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Dates</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Amount</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.map((booking) => {
                const StatusIcon = statusColors[booking.status]?.icon || Clock
                const guestName = booking.guest ? `${booking.guest.firstName} ${booking.guest.lastName}` : 'Guest'
                const guestEmail = booking.guest ? booking.guest.email : ''
                const roomName = booking.room ? booking.room.name : 'Unknown Room'
                const checkInDate = new Date(booking.checkIn).toLocaleDateString()
                const checkOutDate = new Date(booking.checkOut).toLocaleDateString()
                const createdDate = new Date(booking.createdAt).toLocaleDateString()
                return (
                  <tr key={booking.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{booking.confirmationCode}</p>
                      <p className="text-xs text-muted-foreground">
                        {createdDate}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground">{guestName}</p>
                      <p className="text-xs text-muted-foreground">{guestEmail}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground">{roomName}</p>
                      <p className="text-xs text-muted-foreground">{booking.adults + booking.children} guests</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground">{checkInDate}</p>
                      <p className="text-xs text-muted-foreground">to {checkOutDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusColors[booking.status].bg} ${statusColors[booking.status].text}`}>
                        <StatusIcon className="h-3 w-3" />
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">₹{Number(booking.totalPrice).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{booking.paymentStatus}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="skeuo-button">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </motion.div>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <BookingDetailModal
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
