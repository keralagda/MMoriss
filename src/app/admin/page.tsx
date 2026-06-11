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
function RecentBookings({ bookings }: { bookings: any[] }) {
  const statusColors: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
    confirmed: { bg: 'bg-green-500/10', text: 'text-green-500', icon: CheckCircle },
    pending: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: Clock },
    checked_in: { bg: 'bg-blue-500/10', text: 'text-blue-500', icon: CheckCircle },
    checked_out: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', icon: CheckCircle },
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
        <Button variant="ghost" size="sm" className="text-primary" onClick={() => window.location.href = '/admin/bookings'}>
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
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No bookings recorded yet
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const status = statusColors[booking.status] || { bg: 'bg-muted', text: 'text-muted-foreground', icon: Clock }
                const StatusIcon = status.icon
                const guestName = booking.guest ? `${booking.guest.firstName} ${booking.guest.lastName}` : 'Guest'
                const roomName = booking.room ? booking.room.name : 'Unknown Room'
                const checkInDate = new Date(booking.checkIn).toLocaleDateString()
                return (
                  <tr key={booking.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{booking.confirmationCode || booking.id}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{guestName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{roomName}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{checkInDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.bg} ${status.text}`}>
                        <StatusIcon className="h-3 w-3" />
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">₹{Number(booking.totalPrice).toLocaleString('en-IN')}</td>
                  </tr>
                )
              })
            )}
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
function RecentReviews({ reviews }: { reviews: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="skeuo-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-foreground">Recent Reviews</h3>
        <Button variant="ghost" size="sm" className="text-primary" onClick={() => window.location.href = '/admin/guests'}>
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No reviews submitted yet</p>
        ) : (
          reviews.map((review, index) => {
            const guestName = review.guest ? `${review.guest.firstName} ${review.guest.lastName.charAt(0)}.` : 'Guest'
            const dateStr = new Date(review.createdAt).toLocaleDateString()
            return (
              <div key={review.id || index} className="p-4 skeuo-inset rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {guestName.charAt(0)}
                    </div>
                    <span className="font-medium text-foreground">{guestName}</span>
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
                <p className="text-xs text-muted-foreground/50 mt-2">{dateStr}</p>
              </div>
            )
          })
        )}
      </div>
    </motion.div>
  )
}

// Quick Actions
function QuickActions() {
  const actions = [
    { name: 'Bookings List', icon: Calendar, color: 'bg-primary', link: '/admin/bookings' },
    { name: 'Guest Profiles', icon: Users, color: 'bg-blue-500', link: '/admin/guests' },
    { name: 'Inquiries/Quotes', icon: TrendingUp, color: 'bg-green-500', link: '/admin/inquiries' },
    { name: 'Email Settings', icon: AlertCircle, color: 'bg-purple-500', link: '/admin/settings' },
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
            onClick={() => window.location.href = action.link}
            className="flex items-center gap-3 p-4 skeuo-inset rounded-xl hover:bg-primary/5 transition-colors text-left"
          >
            <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center shrink-0`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground leading-tight">{action.name}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// Room Status
function RoomStatus({ rooms }: { rooms: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="skeuo-card p-6"
    >
      <h3 className="font-serif text-xl text-foreground mb-4">Room Status Today</h3>
      <div className="space-y-4">
        {rooms.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No rooms loaded</p>
        ) : (
          rooms.map((room) => (
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
          ))
        )}
      </div>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState<any>({
    stats: {
      totalBookings: 0,
      totalGuests: 0,
      occupancyRate: '0%',
      totalRevenue: '₹0.0L'
    },
    recentBookings: [],
    recentReviews: [],
    roomStatus: []
  })

  useEffect(() => {
    setMounted(true)
    fetch('/api/admin/dashboard')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load dashboard data')
        return res.json()
      })
      .then(data => {
        setDashboardData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 skeuo-card max-w-xl mx-auto mt-12 text-center">
        <h2 className="text-red-500 font-serif text-xl mb-4">Error Loading Dashboard</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4 skeuo-button">Retry</Button>
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
          <Button className="skeuo-button" onClick={() => window.print()}>
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={dashboardData.stats.totalBookings.toString()}
          change="+12.5%"
          changeType="up"
          icon={Calendar}
          color="bg-primary"
        />
        <StatCard
          title="Active Guests"
          value={dashboardData.stats.totalGuests.toString()}
          change="+8.2%"
          changeType="up"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Room Occupancy"
          value={dashboardData.stats.occupancyRate}
          change="-2.4%"
          changeType="down"
          icon={BedDouble}
          color="bg-green-500"
        />
        <StatCard
          title="Revenue"
          value={dashboardData.stats.totalRevenue}
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
          <RecentBookings bookings={dashboardData.recentBookings} />
          <OccupancyChart />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
          <RoomStatus rooms={dashboardData.roomStatus} />
        </div>
      </div>

      {/* Bottom Row */}
      <RecentReviews reviews={dashboardData.recentReviews} />
    </div>
  )
}
