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
  onUpdateStatus,
  onUpdateNotes,
  whatsappTemplate
}: {
  inquiry: Inquiry | null
  onClose: () => void
  onUpdateStatus: (id: string, status: Inquiry['status']) => void
  onUpdateNotes: (id: string, notes: string) => void
  whatsappTemplate: string
}) {
  const [localNotes, setLocalNotes] = useState(inquiry?.notes || '')
  const [savingNotes, setSavingNotes] = useState(false)

  if (!inquiry) return null
  const StatusIcon = statusConfig[inquiry.status].icon

  const handleSaveNotes = async () => {
    setSavingNotes(true)
    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: localNotes })
      })
      if (!res.ok) throw new Error('Failed to save notes')
      onUpdateNotes(inquiry.id, localNotes)
      alert('Notes saved successfully')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSavingNotes(false)
    }
  }

  const handleWhatsAppClick = () => {
    if (!inquiry.phone) {
      alert('No phone number available for this inquiry.')
      return
    }

    const checkInStr = inquiry.checkIn ? new Date(inquiry.checkIn).toLocaleDateString() : 'N/A'
    const checkOutStr = inquiry.checkOut ? new Date(inquiry.checkOut).toLocaleDateString() : 'N/A'
    const roomTypeStr = inquiry.roomType || 'Accommodation'

    const defaultTemplate = "Hello *{{name}}*, thank you for your inquiry for a *{{roomType}}* from *{{checkIn}}* to *{{checkOut}}*. We would love to share a custom quote with you."
    const templateToUse = whatsappTemplate || defaultTemplate

    const message = templateToUse
      .replace(/\{\{name\}\}/g, inquiry.name)
      .replace(/\{\{roomType\}\}/g, roomTypeStr)
      .replace(/\{\{checkIn\}\}/g, checkInStr)
      .replace(/\{\{checkOut\}\}/g, checkOutStr)

    const cleanPhone = inquiry.phone.replace(/[^0-9+]/g, '')
    const waUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(message)}`
    
    // Automatically mark status as 'responded'
    onUpdateStatus(inquiry.id, 'responded')
    window.open(waUrl, '_blank')
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
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-br from-primary/5 to-gold-dark/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground font-medium">
              {inquiry.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="font-serif text-xl text-foreground font-semibold">{inquiry.name}</h2>
              <p className="text-xs text-muted-foreground">{inquiry.email}</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig[inquiry.status].bg} ${statusConfig[inquiry.status].text}`}>
            <StatusIcon className="h-4 w-4" />
            {statusConfig[inquiry.status].label}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="skeuo-inset p-4 rounded-xl">
              <p className="text-[10px] uppercase font-semibold text-muted-foreground mb-1">Email</p>
              <p className="text-sm text-foreground select-all">{inquiry.email}</p>
            </div>
            <div className="skeuo-inset p-4 rounded-xl">
              <p className="text-[10px] uppercase font-semibold text-muted-foreground mb-1">Phone</p>
              <p className="text-sm text-foreground select-all">{inquiry.phone || 'Not Provided'}</p>
            </div>
          </div>

          {/* Booking Details */}
          {(inquiry.checkIn || inquiry.roomType) && (
            <div className="skeuo-inset p-4 rounded-xl bg-white/40">
              <p className="text-xs font-semibold text-muted-foreground mb-3 font-serif">Booking Request Details</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                {inquiry.checkIn && (
                  <div>
                    <p className="text-muted-foreground">Check-in</p>
                    <p className="font-bold text-foreground mt-0.5">{new Date(inquiry.checkIn).toLocaleDateString()}</p>
                  </div>
                )}
                {inquiry.checkOut && (
                  <div>
                    <p className="text-muted-foreground">Check-out</p>
                    <p className="font-bold text-foreground mt-0.5">{new Date(inquiry.checkOut).toLocaleDateString()}</p>
                  </div>
                )}
                {inquiry.guests !== null && inquiry.guests > 0 && (
                  <div>
                    <p className="text-muted-foreground">Guests</p>
                    <p className="font-bold text-foreground mt-0.5">{inquiry.guests}</p>
                  </div>
                )}
                {inquiry.roomType && (
                  <div>
                    <p className="text-muted-foreground">Room Type</p>
                    <p className="font-bold text-foreground mt-0.5">{inquiry.roomType}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message */}
          <div className="skeuo-inset p-4 rounded-xl">
            <p className="text-[10px] uppercase font-semibold text-muted-foreground mb-2">Message</p>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase font-semibold text-muted-foreground">Internal Notes</p>
              <button 
                onClick={handleSaveNotes} 
                disabled={savingNotes}
                className="text-xs text-primary font-medium hover:underline"
              >
                {savingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
            <textarea
              placeholder="Add internal notes about communication status, quoted rate..."
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              className="w-full p-4 skeuo-inset rounded-xl text-xs text-foreground placeholder:text-muted-foreground resize-none h-20 focus:outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex items-center justify-between bg-white/20">
          <p className="text-[10px] text-muted-foreground">
            Received {new Date(inquiry.createdAt).toLocaleDateString()}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="text-xs py-4 px-4" onClick={() => onUpdateStatus(inquiry.id, 'archived')}>
              Archive
            </Button>
            {inquiry.phone && (
              <Button 
                onClick={handleWhatsAppClick}
                className="skeuo-button text-xs py-4 px-5 bg-green-600 hover:bg-green-700 flex items-center gap-1.5"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Quote
              </Button>
            )}
            <Button 
              className="skeuo-button text-xs py-4 px-5"
              onClick={() => onUpdateStatus(inquiry.id, 'responded')}
            >
              Mark Responded
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function InquiriesPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [whatsappTemplate, setWhatsappTemplate] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  useEffect(() => {
    setMounted(true)
    
    // Fetch inquiries and settings
    Promise.all([
      fetch('/api/inquiries').then(res => res.json()),
      fetch('/api/settings').then(res => res.json())
    ]).then(([inqData, settingsData]) => {
      if (inqData && !inqData.error) {
        setInquiries(inqData)
      }
      if (settingsData && settingsData.whatsapp_template) {
        setWhatsappTemplate(settingsData.whatsapp_template)
      }
      setLoading(false)
    }).catch(err => {
      console.error('Failed to load inquiries data:', err)
      setLoading(false)
    })
  }, [])

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.message && inq.message.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (!res.ok) throw new Error('Failed to update status')
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i))
      setSelectedInquiry(null)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const updateNotes = (id: string, notes: string) => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, notes } : i))
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, notes })
    }
  }

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading inquiries...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Inquiries & Quotes</h1>
          <p className="text-muted-foreground mt-1">Manage contact submissions and send custom quotes directly.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`h-5 w-5 ${config.text}`} />
                </div>
                <div>
                  <p className="text-2xl font-serif font-semibold text-foreground leading-tight">{count}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{config.label}</p>
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
            placeholder="Search inquiries by name, email, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 skeuo-inset rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Inquiries List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        {filteredInquiries.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground skeuo-card">
            No inquiries matches your search.
          </div>
        ) : (
          filteredInquiries.map((inquiry, index) => {
            const StatusIcon = statusConfig[inquiry.status].icon
            const initials = inquiry.name.split(' ').map(n => n[0]).join('').substring(0, 2)
            return (
              <motion.div
                key={inquiry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedInquiry(inquiry)}
                className="skeuo-card p-4 cursor-pointer hover:bg-primary/5 transition-colors border border-white/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground text-sm font-medium shrink-0">
                    {initials}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground">{inquiry.name}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${statusConfig[inquiry.status].bg} ${statusConfig[inquiry.status].text}`}>
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig[inquiry.status].label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{inquiry.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
                      <span>{inquiry.email}</span>
                      {inquiry.roomType && <span className="bg-white/60 px-1.5 py-0.5 rounded text-[9px] border border-black/5 font-semibold text-primary">{inquiry.roomType}</span>}
                      <span>{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <InquiryDetailModal
            inquiry={selectedInquiry}
            onClose={() => setSelectedInquiry(null)}
            onUpdateStatus={updateStatus}
            onUpdateNotes={updateNotes}
            whatsappTemplate={whatsappTemplate}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
