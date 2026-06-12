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
  guestId: string
  guest: { firstName: string; lastName: string; email: string; phone: string }
  roomId: string
  room: { name: string; price: number }
  checkIn: Date
  checkOut: Date
  adults: number
  children: number
  totalPrice: number
  depositPaid: number
  status: string
  paymentStatus: string
  specialRequests?: string
  notes?: string
  createdAt: Date
}

interface Guest {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface Room {
  id: string
  name: string
  price: number
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

// Booking Detail Modal
function BookingDetailModal({ 
  booking, 
  onClose,
  onEdit,
  onStatusChange,
  onDelete
}: { 
  booking: Booking | null
  onClose: () => void 
  onEdit: (booking: Booking) => void
  onStatusChange: (booking: Booking, status: string) => void
  onDelete: (id: string) => void
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
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Status */}
          <div className="flex flex-wrap items-center gap-4">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusColors[booking.status]?.bg || 'bg-gray-500/10'} ${statusColors[booking.status]?.text || 'text-gray-500'}`}>
              <StatusIcon className="h-4 w-4" />
              {booking.status.replace('_', ' ')}
            </span>
            <span className="text-sm text-muted-foreground">
              Payment Status: <strong className="text-foreground capitalize">{booking.paymentStatus.replace('_', ' ')}</strong>
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
              <div>
                <p className="text-xs text-muted-foreground">Deposit Paid</p>
                <p className="text-foreground font-semibold">₹{Number(booking.depositPaid).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Additional notes */}
          {booking.specialRequests && (
            <div className="skeuo-inset p-4 rounded-xl">
              <h3 className="font-medium text-foreground mb-1 font-serif text-sm">Special Requests</h3>
              <p className="text-foreground text-sm whitespace-pre-line">{booking.specialRequests}</p>
            </div>
          )}

          {booking.notes && (
            <div className="skeuo-inset p-4 rounded-xl">
              <h3 className="font-medium text-foreground mb-1 font-serif text-sm">Staff Notes</h3>
              <p className="text-foreground text-sm whitespace-pre-line">{booking.notes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/20">
          <div className="flex gap-2">
            {booking.status !== 'cancelled' && (
              <Button 
                variant="outline" 
                onClick={() => onStatusChange(booking, 'cancelled')}
                className="border-red-500/50 text-red-500 hover:bg-red-500/10 text-xs py-4 px-4"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Booking
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                onDelete(booking.id)
                onClose()
              }}
              className="border-red-600/30 text-red-600 hover:bg-red-600/10 text-xs py-4 px-3"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {booking.status === 'pending' && (
              <Button 
                onClick={() => onStatusChange(booking, 'confirmed')} 
                variant="outline" 
                className="text-xs border-green-500/40 text-green-600 hover:bg-green-500/10 py-4 px-4"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm
              </Button>
            )}
            {booking.status === 'confirmed' && (
              <Button 
                onClick={() => onStatusChange(booking, 'checked_in')} 
                variant="outline" 
                className="text-xs border-blue-500/40 text-blue-600 hover:bg-blue-500/10 py-4 px-4"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Check In
              </Button>
            )}
            {booking.status === 'checked_in' && (
              <Button 
                onClick={() => onStatusChange(booking, 'checked_out')} 
                variant="outline" 
                className="text-xs border-gray-500/40 text-gray-600 hover:bg-gray-500/10 py-4 px-4"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Check Out
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                onEdit(booking)
                onClose()
              }}
              className="text-xs py-4 px-4"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button onClick={onClose} className="skeuo-button text-xs py-4 px-6">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Booking Create/Edit Form Modal
function BookingFormModal({
  booking,
  guests,
  rooms,
  onClose,
  onSave
}: {
  booking: Booking | null
  guests: Guest[]
  rooms: Room[]
  onClose: () => void
  onSave: (data: any) => void
}) {
  const [guestId, setGuestId] = useState(booking?.guestId || '')
  const [roomId, setRoomId] = useState(booking?.roomId || '')
  const [checkIn, setCheckIn] = useState(booking ? new Date(booking.checkIn).toISOString().split('T')[0] : '')
  const [checkOut, setCheckOut] = useState(booking ? new Date(booking.checkOut).toISOString().split('T')[0] : '')
  const [adults, setAdults] = useState(booking?.adults?.toString() || '1')
  const [children, setChildren] = useState(booking?.children?.toString() || '0')
  const [totalPrice, setTotalPrice] = useState(booking?.totalPrice?.toString() || '')
  const [depositPaid, setDepositPaid] = useState(booking?.depositPaid?.toString() || '0')
  const [status, setStatus] = useState(booking?.status || 'pending')
  const [paymentStatus, setPaymentStatus] = useState(booking?.paymentStatus || 'pending')
  const [specialRequests, setSpecialRequests] = useState(booking?.specialRequests || '')
  const [notes, setNotes] = useState(booking?.notes || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auto calculate total price when roomId, checkIn, checkOut changes
  useEffect(() => {
    if (!checkIn || !checkOut || !roomId) return
    const room = rooms.find(r => r.id === roomId)
    if (!room) return
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = end.getTime() - start.getTime()
    if (diff > 0) {
      const nights = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
      const calculated = Number(room.price) * nights
      setTotalPrice(calculated.toString())
    }
  }, [checkIn, checkOut, roomId, rooms])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestId || !roomId || !checkIn || !checkOut) {
      alert('Please fill out all required fields')
      return
    }
    
    setIsSubmitting(true)
    const payload = {
      id: booking?.id,
      guestId,
      roomId,
      checkIn,
      checkOut,
      adults: parseInt(adults) || 1,
      children: parseInt(children) || 0,
      totalPrice: parseFloat(totalPrice) || 0,
      depositPaid: parseFloat(depositPaid) || 0,
      status,
      paymentStatus,
      specialRequests,
      notes
    }

    try {
      await onSave(payload)
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <h2 className="font-serif text-2xl text-foreground">
            {booking ? 'Edit Booking' : 'New Booking'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Guest selection */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Guest *
                </label>
                <select
                  value={guestId}
                  onChange={(e) => setGuestId(e.target.value)}
                  className="w-full px-3 py-2.5 skeuo-inset rounded-xl text-sm text-foreground bg-transparent focus:outline-none"
                  required
                >
                  <option value="" disabled className="text-muted-foreground">Select Guest</option>
                  {guests.map(g => (
                    <option key={g.id} value={g.id} className="text-foreground bg-[#F0F2F5]">
                      {g.firstName} {g.lastName} ({g.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Selection */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Room/Villa *
                </label>
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full px-3 py-2.5 skeuo-inset rounded-xl text-sm text-foreground bg-transparent focus:outline-none"
                  required
                >
                  <option value="" disabled className="text-muted-foreground">Select Room</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.id} className="text-foreground bg-[#F0F2F5]">
                      {r.name} (₹{Number(r.price).toLocaleString()}/night)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Check In Date */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Check-In Date *
                </label>
                <Input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2 skeuo-inset rounded-xl text-sm bg-transparent"
                  required
                />
              </div>

              {/* Check Out Date */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Check-Out Date *
                </label>
                <Input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2 skeuo-inset rounded-xl text-sm bg-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Adults */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Adults
                </label>
                <Input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="w-full px-3 py-2 skeuo-inset rounded-xl text-sm bg-transparent"
                />
              </div>

              {/* Children */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Children
                </label>
                <Input
                  type="number"
                  min="0"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  className="w-full px-3 py-2 skeuo-inset rounded-xl text-sm bg-transparent"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2.5 skeuo-inset rounded-xl text-sm text-foreground bg-transparent focus:outline-none"
                >
                  <option value="pending" className="text-foreground bg-[#F0F2F5]">Pending</option>
                  <option value="confirmed" className="text-foreground bg-[#F0F2F5]">Confirmed</option>
                  <option value="checked_in" className="text-foreground bg-[#F0F2F5]">Checked In</option>
                  <option value="checked_out" className="text-foreground bg-[#F0F2F5]">Checked Out</option>
                  <option value="cancelled" className="text-foreground bg-[#F0F2F5]">Cancelled</option>
                </select>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2.5 skeuo-inset rounded-xl text-sm text-foreground bg-transparent focus:outline-none"
                >
                  <option value="pending" className="text-foreground bg-[#F0F2F5]">Pending</option>
                  <option value="deposit_paid" className="text-foreground bg-[#F0F2F5]">Deposit Paid</option>
                  <option value="paid" className="text-foreground bg-[#F0F2F5]">Paid</option>
                  <option value="refunded" className="text-foreground bg-[#F0F2F5]">Refunded</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Total Price */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Total Price (₹)
                </label>
                <Input
                  type="number"
                  min="0"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  className="w-full px-3 py-2 skeuo-inset rounded-xl text-sm bg-transparent"
                />
              </div>

              {/* Deposit Paid */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Deposit Paid (₹)
                </label>
                <Input
                  type="number"
                  min="0"
                  value={depositPaid}
                  onChange={(e) => setDepositPaid(e.target.value)}
                  className="w-full px-3 py-2 skeuo-inset rounded-xl text-sm bg-transparent"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Special Requests
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 skeuo-inset rounded-xl text-sm text-foreground bg-transparent focus:outline-none resize-none"
              />
            </div>

            {/* Staff Notes */}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Staff Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 skeuo-inset rounded-xl text-sm text-foreground bg-transparent focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="p-6 border-t border-border flex justify-between gap-4 bg-white/20">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setGuestId('')
                setRoomId('')
                setCheckIn('')
                setCheckOut('')
                setAdults('1')
                setChildren('0')
                setTotalPrice('')
                setDepositPaid('0')
                setStatus('pending')
                setPaymentStatus('pending')
                setSpecialRequests('')
                setNotes('')
              }}
              className="text-xs text-muted-foreground hover:bg-black/5"
            >
              Reset
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="text-xs">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="skeuo-button text-xs py-4 px-6">
                {isSubmitting ? 'Saving...' : 'Save Booking'}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function BookingsPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [guests, setGuests] = useState<Guest[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  
  // State for Booking Form Modal
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedBookingForForm, setSelectedBookingForForm] = useState<Booking | null>(null)

  const fetchBookings = () => {
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
  }

  useEffect(() => {
    setMounted(true)
    fetchBookings()

    // Fetch guests list for form selection
    fetch('/api/guests')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) setGuests(data)
      })
      .catch(err => console.error('Failed to fetch guests:', err))

    // Fetch rooms list for form selection
    fetch('/api/rooms')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) setRooms(data)
      })
      .catch(err => console.error('Failed to fetch rooms:', err))
  }, [])

  const handleStatusChange = async (booking: Booking, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await res.json()
      if (data.success) {
        setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: newStatus } : b))
        if (selectedBooking && selectedBooking.id === booking.id) {
          setSelectedBooking(prev => prev ? { ...prev, status: newStatus } : null)
        }
      } else {
        alert(data.error || 'Failed to update status')
      }
    } catch (err) {
      console.error(err)
      alert('Error updating status')
    }
  }

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        setBookings(prev => prev.filter(b => b.id !== id))
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking(null)
        }
      } else {
        alert(data.error || 'Failed to delete booking')
      }
    } catch (err) {
      console.error(err)
      alert('Error deleting booking')
    }
  }

  const handleSaveBooking = async (payload: any) => {
    const isEdit = !!payload.id
    const url = isEdit ? `/api/bookings/${payload.id}` : '/api/bookings'
    const method = isEdit ? 'PATCH' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.success) {
        if (isEdit) {
          setBookings(prev => prev.map(b => b.id === data.booking.id ? data.booking : b))
        } else {
          setBookings(prev => [data.booking, ...prev])
        }
        setIsFormOpen(false)
        setSelectedBookingForForm(null)
      } else {
        alert(data.error || 'Failed to save booking')
      }
    } catch (err) {
      console.error(err)
      alert('Error saving booking')
    }
  }

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
          <Button 
            onClick={() => {
              setSelectedBookingForForm(null)
              setIsFormOpen(true)
            }} 
            className="skeuo-button"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Booking
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
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${statusColors[booking.status]?.bg || 'bg-gray-500/10'} ${statusColors[booking.status]?.text || 'text-gray-500'}`}>
                        <StatusIcon className="h-3 w-3" />
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">₹{Number(booking.totalPrice).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground capitalize">{booking.paymentStatus.replace('_', ' ')}</p>
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
                        <button 
                          onClick={() => {
                            setSelectedBookingForForm(booking)
                            setIsFormOpen(true)
                          }}
                          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                          title="Edit Booking"
                        >
                          <Edit className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button 
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                          title="Delete Booking"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
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
            onEdit={(b) => {
              setSelectedBookingForForm(b)
              setIsFormOpen(true)
            }}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteBooking}
          />
        )}
      </AnimatePresence>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <BookingFormModal
            booking={selectedBookingForForm}
            guests={guests}
            rooms={rooms}
            onClose={() => {
              setIsFormOpen(false)
              setSelectedBookingForForm(null)
            }}
            onSave={handleSaveBooking}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
