'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  BedDouble,
  Users,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Star,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical
} from 'lucide-react'

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  color 
}: { 
  title: string
  value: string
  change: string
  changeType: 'up' | 'down' | 'neutral'
  icon: React.ElementType
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="skeuo-card p-6"
    >
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <button className="p-1 rounded-lg hover:bg-primary/10 transition-colors">
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-serif font-semibold text-foreground mt-1">{value}</p>
        <div className="flex items-center gap-1 mt-2">
          {changeType === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : changeType === 'down' ? (
            <TrendingDown className="h-4 w-4 text-red-500" />
          ) : null}
          <span className={`text-sm ${
            changeType === 'up' ? 'text-green-500' : 
            changeType === 'down' ? 'text-red-500' : 
            'text-muted-foreground'
          }`}>
            {change}
          </span>
          <span className="text-sm text-muted-foreground">vs last month</span>
        </div>
      </div>
    </motion.div>
  )
}

// Recent Bookings Table
function RecentBookings() {
  const bookings = [
    { id: 'BK001', guest: 'Rajesh Kumar', room: 'Backwater Villa', checkIn: '2024-01-15', status: 'confirmed', amount: '₹45,000' },
    { id: 'BK002', guest: 'Sarah Johnson', room: 'Heritage Nalukettu', checkIn: '2024-01-16', status: 'pending', amount: '₹54,000' },
    { id: 'BK003', guest: 'Amit Patel', room: 'Pool Villa', checkIn: '2024-01-17', status: 'confirmed', amount: '₹75,000' },
    { id: 'BK004', guest: 'Emily Chen', room: 'Coconut Grove Suite', checkIn: '2024-01-18', status: 'checked_in', amount: '₹36,000' },
    { id: 'BK005', guest: 'Mohammed Ali', room: 'Luxury Houseboat', checkIn: '2024-01-19', status: 'cancelled', amount: '₹0' },
  ]

  const statusColors: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
    confirmed: { bg: 'bg-green-500/10', text: 'text-green-500', icon: CheckCircle },
    pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: Clock },
    checked_in: { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: CheckCircle },
    cancelled: { bg: 'bg-red-500/10', text: 'text-red-500', icon: XCircle },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="skeuo-card overflow-hidden"
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="font-serif text-xl text-foreground">Recent Bookings</h3>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Booking ID</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Guest</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Room</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Check-in</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-3">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.map((booking) => {
              const status = statusColors[booking.status]
              const StatusIcon = status.icon
              return (
                <tr key={booking.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{booking.guest}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{booking.room}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{booking.checkIn}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.bg} ${status.text}`}>
                      <StatusIcon className="h-3 w-3" />
                      {booking.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{booking.amount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

// Occupancy Chart
function OccupancyChart() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const occupancy = [65, 72, 68, 85, 92, 88, 78]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="skeuo-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-foreground">Room Occupancy</h3>
        <span className="text-sm text-muted-foreground">This Week</span>
      </div>
      <div className="flex items-end justify-between h-48 gap-2">
        {occupancy.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-muted rounded-t-lg relative" style={{ height: '100%' }}>
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all duration-500"
                style={{ height: `${value}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{days[index]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Average Occupancy</p>
          <p className="text-2xl font-serif font-semibold text-foreground">78.3%</p>
        </div>
        <div className="flex items-center gap-1 text-green-500">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm">+5.2% from last week</span>
        </div>
      </div>
    </motion.div>
  )
}

// Recent Reviews
function RecentReviews() {
  const reviews = [
    { guest: 'Sarah J.', rating: 5, comment: 'Absolutely magical experience! The backwater views are stunning.', date: '2 hours ago' },
    { guest: 'Rajesh K.', rating: 4, comment: 'Great Ayurveda treatments. Will definitely come back.', date: '5 hours ago' },
    { guest: 'Emily C.', rating: 5, comment: 'The staff was incredibly helpful and the food was amazing!', date: '1 day ago' },
    { guest: 'Mohammed A.', rating: 5, comment: 'Perfect getaway. The houseboat experience was unforgettable.', date: '2 days ago' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="skeuo-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-foreground">Recent Reviews</h3>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 skeuo-inset rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground text-sm font-medium">
                  {review.guest.charAt(0)}
                </div>
                <span className="font-medium text-foreground">{review.guest}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
            <p className="text-xs text-muted-foreground/50 mt-2">{review.date}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Quick Actions
function QuickActions() {
  const actions = [
    { name: 'New Booking', icon: Calendar, color: 'bg-primary' },
    { name: 'Add Guest', icon: Users, color: 'bg-blue-500' },
    { name: 'View Reports', icon: TrendingUp, color: 'bg-green-500' },
    { name: 'Send Email', icon: AlertCircle, color: 'bg-purple-500' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="skeuo-card p-6"
    >
      <h3 className="font-serif text-xl text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.name}
            className="flex items-center gap-3 p-4 skeuo-inset rounded-xl hover:bg-primary/5 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">{action.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// Room Status
function RoomStatus() {
  const rooms = [
    { name: 'Backwater Villa', total: 8, occupied: 6, available: 2 },
    { name: 'Coconut Grove Suite', total: 6, occupied: 4, available: 2 },
    { name: 'Heritage Nalukettu', total: 4, occupied: 4, available: 0 },
    { name: 'Pool Villa', total: 5, occupied: 3, available: 2 },
    { name: 'Luxury Houseboat', total: 2, occupied: 1, available: 1 },
    { name: 'Royal Suite', total: 2, occupied: 0, available: 2 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="skeuo-card p-6"
    >
      <h3 className="font-serif text-xl text-foreground mb-4">Room Status Today</h3>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">{room.name}</span>
              <span className="text-xs text-muted-foreground">
                {room.occupied}/{room.total} occupied
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-gold-dark rounded-full transition-all duration-500"
                style={{ width: `${(room.occupied / room.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true))
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="skeuo-inset px-4 py-2 rounded-xl text-sm text-foreground">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <Button className="skeuo-button">
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value="156"
          change="+12.5%"
          changeType="up"
          icon={Calendar}
          color="bg-primary"
        />
        <StatCard
          title="Active Guests"
          value="48"
          change="+8.2%"
          changeType="up"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Room Occupancy"
          value="78%"
          change="-2.4%"
          changeType="down"
          icon={BedDouble}
          color="bg-green-500"
        />
        <StatCard
          title="Revenue"
          value="₹24.5L"
          change="+18.7%"
          changeType="up"
          icon={IndianRupee}
          color="bg-purple-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - 2 spans */}
        <div className="lg:col-span-2 space-y-6">
          <RecentBookings />
          <OccupancyChart />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
          <RoomStatus />
        </div>
      </div>

      {/* Bottom Row */}
      <RecentReviews />
    </div>
  )
}
