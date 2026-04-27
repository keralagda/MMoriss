'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Search, Mail, Phone, Calendar, Users, MessageCircle,
  Eye, Check, X, Clock, MoreVertical, ArrowRight, Filter
} from 'lucide-react'

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  checkIn: Date | null
  checkOut: Date | null
  guests: number
  roomType: string
  message: string
  status: 'new' | 'read' | 'responded' | 'archived'
  notes: string
  createdAt: Date
}

const statusConfig = {
  new: { label: 'New', bg: 'bg-blue-500/10', text: 'text-blue-500', icon: Mail },
  read: { label: 'Read', bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: Eye },
  responded: { label: 'Responded', bg: 'bg-green-500/10', text: 'text-green-500', icon: Check },
  archived: { label: 'Archived', bg: 'bg-gray-500/10', text: 'text-gray-500', icon: Clock },
}

const mockInquiries: Inquiry[] = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+91 98765 43210', checkIn: new Date('2024-02-15'), checkOut: new Date('2024-02-18'), guests: 2, roomType: 'Backwater Villa', message: 'Looking for a romantic getaway with my wife. Interested in the houseboat experience.', status: 'new', notes: '', createdAt: new Date('2024-01-20T10:30:00') },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+1 234 567 8900', checkIn: new Date('2024-02-20'), checkOut: new Date('2024-02-25'), guests: 4, roomType: 'Heritage Nalukettu', message: 'Family trip with 2 children. Need vegetarian food options.', status: 'read', notes: 'Asked about airport pickup', createdAt: new Date('2024-01-19T14:45:00') },
  { id: '3', name: 'Amit Patel', email: 'amit@email.com', phone: '+91 98765 12345', checkIn: null, checkOut: null, guests: 0, roomType: '', message: 'Interested in the 14-day Panchakarma treatment. What is the cost and availability in March?', status: 'responded', notes: 'Sent treatment details', createdAt: new Date('2024-01-18T09:15:00') },
  { id: '4', name: 'Emily Chen', email: 'emily@email.com', phone: '+65 1234 5678', checkIn: new Date('2024-03-01'), checkOut: new Date('2024-03-05'), guests: 2, roomType: 'Pool Villa', message: 'Honeymoon package inquiry. Would like to include spa treatments.', status: 'responded', notes: 'Quoted honeymoon package', createdAt: new Date('2024-01-17T16:20:00') },
  { id: '5', name: 'Mohammed Ali', email: 'mohammed@email.com', phone: '+971 50 123 4567', checkIn: new Date('2024-01-10'), checkOut: new Date('2024-01-12'), guests: 2, roomType: 'Luxury Houseboat', message: 'Need halal food options for our stay.', status: 'archived', notes: 'Booking cancelled', createdAt: new Date('2024-01-05T11:00:00') },
  { id: '6', name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 99887 76543', checkIn: new Date('2024-02-10'), checkOut: new Date('2024-02-12'), guests: 6, roomType: 'Royal Suite', message: 'Corporate retreat for 6 people. Need conference facilities.', status: 'new', notes: '', createdAt: new Date('2024-01-20T08:00:00') },
]

// Inquiry Detail Modal
function InquiryDetailModal({
  inquiry,
  onClose,
  onUpdateStatus
}: {
  inquiry: Inquiry | null
  onClose: () => void
  onUpdateStatus: (id: string, status: Inquiry['status']) => void
}) {
  if (!inquiry) return null
  const StatusIcon = statusConfig[inquiry.status].icon

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
        className="w-full max-w-2xl skeuo-panel rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground font-medium">
              {inquiry.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="font-serif text-xl text-foreground">{inquiry.name}</h2>
              <p className="text-sm text-muted-foreground">{inquiry.email}</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConfig[inquiry.status].bg} ${statusConfig[inquiry.status].text}`}>
            <StatusIcon className="h-4 w-4" />
            {statusConfig[inquiry.status].label}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="skeuo-inset p-4 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="text-foreground">{inquiry.email}</p>
            </div>
            <div className="skeuo-inset p-4 rounded-xl">
              <p className="text-xs text-muted-foreground mb-1">Phone</p>
              <p className="text-foreground">{inquiry.phone}</p>
            </div>
          </div>

          {/* Booking Details */}
          {(inquiry.checkIn || inquiry.roomType) && (
            <div className="skeuo-inset p-4 rounded-xl">
              <p className="text-xs text-muted-foreground mb-3">Booking Details</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {inquiry.checkIn && (
                  <div>
                    <p className="text-xs text-muted-foreground">Check-in</p>
                    <p className="text-foreground">{inquiry.checkIn.toLocaleDateString()}</p>
                  </div>
                )}
                {inquiry.checkOut && (
                  <div>
                    <p className="text-xs text-muted-foreground">Check-out</p>
                    <p className="text-foreground">{inquiry.checkOut.toLocaleDateString()}</p>
                  </div>
                )}
                {inquiry.guests > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">Guests</p>
                    <p className="text-foreground">{inquiry.guests}</p>
                  </div>
                )}
                {inquiry.roomType && (
                  <div>
                    <p className="text-xs text-muted-foreground">Room Type</p>
                    <p className="text-foreground">{inquiry.roomType}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          <div className="skeuo-inset p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-2">Message</p>
            <p className="text-foreground">{inquiry.message}</p>
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Internal Notes</p>
            <textarea
              placeholder="Add notes..."
              defaultValue={inquiry.notes}
              className="w-full p-4 skeuo-inset rounded-xl text-foreground placeholder:text-muted-foreground resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Received {inquiry.createdAt.toLocaleDateString()} at {inquiry.createdAt.toLocaleTimeString()}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onUpdateStatus(inquiry.id, 'archived')}>
              Archive
            </Button>
            <Button className="skeuo-button">
              Reply
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function InquiriesPage() {
  const [mounted, setMounted] = useState(false)
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  useEffect(() => { Promise.resolve().then(() => setMounted(true)) }, [])

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateStatus = (id: string, status: Inquiry['status']) => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i))
    setSelectedInquiry(null)
  }

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Inquiries</h1>
          <p className="text-muted-foreground mt-1">Manage contact form submissions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = inquiries.filter(i => i.status === key).length
          const Icon = config.icon
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
              className={`skeuo-card p-4 text-left transition-all ${statusFilter === key ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${config.text}`} />
                </div>
                <div>
                  <p className="text-2xl font-serif font-semibold text-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 skeuo-inset rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Inquiries List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {filteredInquiries.map((inquiry, index) => {
          const StatusIcon = statusConfig[inquiry.status].icon
          return (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedInquiry(inquiry)}
              className="skeuo-card p-4 cursor-pointer hover:bg-primary/5 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground text-sm font-medium flex-shrink-0">
                  {inquiry.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-foreground">{inquiry.name}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${statusConfig[inquiry.status].bg} ${statusConfig[inquiry.status].text}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig[inquiry.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{inquiry.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{inquiry.email}</span>
                    {inquiry.checkIn && <span>{inquiry.checkIn.toLocaleDateString()}</span>}
                    <span>{inquiry.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <InquiryDetailModal
            inquiry={selectedInquiry}
            onClose={() => setSelectedInquiry(null)}
            onUpdateStatus={updateStatus}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
