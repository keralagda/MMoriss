'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Save, RefreshCw, Bell, Globe, CreditCard, Shield, Mail,
  Phone, MapPin, Clock, Users, Flower2
} from 'lucide-react'

const tabs = [
  { id: 'general', name: 'General', icon: Globe },
  { id: 'contact', name: 'Contact', icon: Phone },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'payments', name: 'Payments', icon: CreditCard },
  { id: 'security', name: 'Security', icon: Shield },
]

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)

  // General Settings
  const [siteName, setSiteName] = useState('Munroe Morris Service Villa')
  const [siteTagline, setSiteTagline] = useState('Where Backwaters Meet Luxury')
  const [siteDescription, setSiteDescription] = useState('Experience the magic of Kerala\'s backwaters in luxury. Your journey to God\'s Own Country begins here.')
  const [defaultLanguage, setDefaultLanguage] = useState('en')

  // Contact Settings
  const [contactEmail, setContactEmail] = useState('reservations@munroemorris.com')
  const [contactPhone, setContactPhone] = useState('+91 474 XXXXXXX')
  const [whatsappNumber, setWhatsappNumber] = useState('+91 XXXXX XXXXX')
  const [address, setAddress] = useState('Munroe Island, Kollam District\nKerala 691502, India')

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [bookingAlerts, setBookingAlerts] = useState(true)
  const [inquiryAlerts, setInquiryAlerts] = useState(true)

  // Payment Settings
  const [currency, setCurrency] = useState('INR')
  const [depositPercentage, setDepositPercentage] = useState('25')
  const [cancellationDays, setCancellationDays] = useState('30')

  useEffect(() => { Promise.resolve().then(() => setMounted(true)) }, [])

  const handleSave = async () => {
    setSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSaving(false)
  }

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse text-muted-foreground">Loading...</div></div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage website configuration</p>
        </div>
        <Button className="skeuo-button" onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="skeuo-card p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'skeuo-button text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="skeuo-card p-6">
                <h2 className="font-serif text-xl text-foreground mb-6">General Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Site Name</label>
                    <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="skeuo-input" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Tagline</label>
                    <Input value={siteTagline} onChange={(e) => setSiteTagline(e.target.value)} className="skeuo-input" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Site Description</label>
                    <Textarea value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} className="skeuo-input min-h-[100px]" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Default Language</label>
                    <select
                      value={defaultLanguage}
                      onChange={(e) => setDefaultLanguage(e.target.value)}
                      className="w-full skeuo-input px-4 py-3 rounded-xl"
                    >
                      <option value="en">English</option>
                      <option value="ml">Malayalam</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Logo</label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center">
                        <Flower2 className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <Button variant="outline">Upload New Logo</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="skeuo-card p-6">
                <h2 className="font-serif text-xl text-foreground mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Contact Email</label>
                      <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="skeuo-input" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
                      <Input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="skeuo-input" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">WhatsApp Number</label>
                    <Input type="tel" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className="skeuo-input" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Address</label>
                    <Textarea value={address} onChange={(e) => setAddress(e.target.value)} className="skeuo-input min-h-[100px]" />
                  </div>

                  <div className="skeuo-inset p-4 rounded-xl">
                    <h3 className="text-sm font-medium text-foreground mb-4">How to Reach</h3>
                    <div className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input placeholder="Airport name" className="skeuo-input" />
                        <Input placeholder="Distance (e.g., 90 km)" className="skeuo-input" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input placeholder="Railway station" className="skeuo-input" />
                        <Input placeholder="Distance (e.g., 25 km)" className="skeuo-input" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="skeuo-card p-6">
                <h2 className="font-serif text-xl text-foreground mb-6">Notification Settings</h2>
                
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', desc: 'Receive email alerts for important events', value: emailNotifications, onChange: setEmailNotifications },
                    { label: 'SMS Notifications', desc: 'Receive SMS alerts for urgent matters', value: smsNotifications, onChange: setSmsNotifications },
                    { label: 'New Booking Alerts', desc: 'Get notified when a new booking is made', value: bookingAlerts, onChange: setBookingAlerts },
                    { label: 'New Inquiry Alerts', desc: 'Get notified when a new inquiry is received', value: inquiryAlerts, onChange: setInquiryAlerts },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between p-4 skeuo-inset rounded-xl">
                      <div>
                        <p className="font-medium text-foreground">{setting.label}</p>
                        <p className="text-sm text-muted-foreground">{setting.desc}</p>
                      </div>
                      <button
                        onClick={() => setting.onChange(!setting.value)}
                        className={`w-12 h-6 rounded-full transition-colors ${setting.value ? 'bg-primary' : 'bg-muted'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${setting.value ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'payments' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="skeuo-card p-6">
                <h2 className="font-serif text-xl text-foreground mb-6">Payment Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full skeuo-input px-4 py-3 rounded-xl">
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Deposit Percentage</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" value={depositPercentage} onChange={(e) => setDepositPercentage(e.target.value)} className="skeuo-input w-24" />
                      <span className="text-muted-foreground">% of total booking value</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Free Cancellation Period</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" value={cancellationDays} onChange={(e) => setCancellationDays(e.target.value)} className="skeuo-input w-24" />
                      <span className="text-muted-foreground">days before arrival</span>
                    </div>
                  </div>

                  <div className="skeuo-inset p-4 rounded-xl">
                    <h3 className="text-sm font-medium text-foreground mb-4">Payment Gateways</h3>
                    <div className="space-y-3">
                      {['Razorpay', 'PayPal', 'Stripe'].map((gateway) => (
                        <div key={gateway} className="flex items-center justify-between">
                          <span className="text-muted-foreground">{gateway}</span>
                          <button className="text-primary text-sm">Configure</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="skeuo-card p-6">
                <h2 className="font-serif text-xl text-foreground mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-4">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Current Password</label>
                        <Input type="password" className="skeuo-input" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">New Password</label>
                        <Input type="password" className="skeuo-input" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Confirm New Password</label>
                        <Input type="password" className="skeuo-input" />
                      </div>
                      <Button variant="outline">Update Password</Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h3 className="text-sm font-medium text-foreground mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 skeuo-inset rounded-xl max-w-md">
                      <div>
                        <p className="font-medium text-foreground">Enable 2FA</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h3 className="text-sm font-medium text-foreground mb-4">Active Sessions</h3>
                    <div className="space-y-3 max-w-md">
                      <div className="p-4 skeuo-inset rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Chrome on Windows</p>
                          <p className="text-xs text-muted-foreground">Current session</p>
                        </div>
                        <span className="text-xs text-green-500">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
