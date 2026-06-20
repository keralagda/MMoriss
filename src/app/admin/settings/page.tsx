'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Save, RefreshCw, Bell, Globe, CreditCard, Shield, Mail,
  Phone, MapPin, Clock, Users, Flower2, Palette, Upload, Trash2,
  Layout, Plus, ArrowUp, ArrowDown
} from 'lucide-react'

const tabs = [
  { id: 'general', name: 'General', icon: Globe },
  { id: 'branding', name: 'Branding', icon: Palette },
  { id: 'contact', name: 'Contact', icon: Phone },
  { id: 'navigation', name: 'Header & Footer', icon: Layout },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'payments', name: 'Payments', icon: CreditCard },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'database', name: 'Database', icon: RefreshCw },
]

const defaultHeaderLinks = [
  { name: 'nav.about', href: '/about' },
  { name: 'nav.accommodations', href: '/accommodations' },
  { name: 'nav.experiences', href: '/experiences' },
  { 
    name: 'nav.dining', 
    href: '/dining',
    subItems: [
      { name: 'nav.diningOverview', href: '/dining' },
      { name: 'nav.diningMenu', href: '/menu' }
    ]
  },
  { name: 'nav.gallery', href: '/gallery' },
  { name: 'nav.contact', href: '/contact' }
]

const defaultFooterLinks = [
  { name: 'nav.about', href: '/about' },
  { name: 'nav.accommodations', href: '/accommodations' },
  { name: 'nav.experiences', href: '/experiences' },
  { name: 'nav.ayurveda', href: '/spa' },
  { name: 'nav.dining', href: '/dining' },
  { name: 'nav.gallery', href: '/gallery' }
]

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  // General Settings
  const [siteName, setSiteName] = useState('Munroe Morris Service Villa')
  const [siteTagline, setSiteTagline] = useState('Where Backwaters Meet Luxury')
  const [siteDescription, setSiteDescription] = useState('Experience the magic of Kerala\'s backwaters in luxury. Your journey to God\'s Own Country begins here.')
  const [defaultLanguage, setDefaultLanguage] = useState('en')

  // Branding Settings
  const [brandLogo, setBrandLogo] = useState('')
  const [brandFavicon, setBrandFavicon] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#c5a880')
  const [secondaryColor, setSecondaryColor] = useState('#1c1c1c')

  // Contact Settings
  const [contactEmail, setContactEmail] = useState('munroemorrisklm@gmail.com')
  const [contactPhone, setContactPhone] = useState('+91 474 XXXXXXX')
  const [whatsappNumber, setWhatsappNumber] = useState('+91 XXXXX XXXXX')
  const [address, setAddress] = useState('Manakkadavu, Munroe Island, Kerala 691502')

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [bookingAlerts, setBookingAlerts] = useState(true)
  const [inquiryAlerts, setInquiryAlerts] = useState(true)

  // SMTP Settings & Templates
  const [smtpUser, setSmtpUser] = useState('')
  const [smtpPass, setSmtpPass] = useState('')
  const [welcomeEmailSubject, setWelcomeEmailSubject] = useState('')
  const [welcomeEmailBody, setWelcomeEmailBody] = useState('')
  const [whatsappTemplate, setWhatsappTemplate] = useState('')
  const [testingEmail, setTestingEmail] = useState(false)
  const [testEmailStatus, setTestEmailStatus] = useState<string | null>(null)

  // Navigation state
  const [headerLinks, setHeaderLinks] = useState<{ name: string; href: string; subItems?: { name: string; href: string }[] }[]>([])
  const [footerLinks, setFooterLinks] = useState<{ name: string; href: string }[]>([])

  // Payment Settings
  const [currency, setCurrency] = useState('INR')
  const [depositPercentage, setDepositPercentage] = useState('25')
  const [cancellationDays, setCancellationDays] = useState('30')

  // Database Reset Settings
  const [resetMode, setResetMode] = useState<'full' | 'partial'>('partial')
  const [resetSelections, setResetSelections] = useState({
    bookings: true,
    guests: false,
    rooms: false,
    experiences: false,
    spa: false,
    dining: false,
    gallery: false,
    inquiries: true,
    reviews: true,
    settings: false,
  })
  const [resettingDb, setResettingDb] = useState(false)
  const [resetDbStatus, setResetDbStatus] = useState<string | null>(null)

  const handleResetDb = async () => {
    const confirmMsg = resetMode === 'full' 
      ? 'WARNING: This will delete ALL records in the database (Rooms, Guests, Bookings, Spa, Settings, Experiences, Dining, etc.) and restore the default seeded dataset. Are you absolutely sure?'
      : 'Are you sure you want to reset the selected tables? Note: Resetting Rooms or Guests will also clear related Bookings.'
    
    if (!confirm(confirmMsg)) return

    setResettingDb(true)
    setResetDbStatus(null)
    try {
      const res = await fetch('/api/admin/reset-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: resetMode,
          selections: resetSelections
        })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setResetDbStatus('Database successfully reset and re-seeded!')
        alert('Database successfully reset!')
      } else {
        setResetDbStatus(`Failed: ${data.error || 'Unknown error'}`)
        alert(`Failed to reset database: ${data.error || 'Unknown error'}`)
      }
    } catch (err: any) {
      setResetDbStatus(`Error: ${err.message}`)
      alert(`Error resetting database: ${err.message}`)
    } finally {
      setResettingDb(false)
    }
  }

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          if (data.site_name) setSiteName(data.site_name)
          if (data.site_tagline) setSiteTagline(data.site_tagline)
          if (data.site_description) setSiteDescription(data.site_description)
          if (data.default_language) setDefaultLanguage(data.default_language)
          if (data.contact_email) setContactEmail(data.contact_email)
          if (data.contact_phone) setContactPhone(data.contact_phone)
          if (data.whatsapp_number) setWhatsappNumber(data.whatsapp_number)
          if (data.address) setAddress(data.address)
          if (data.currency) setCurrency(data.currency)
          if (data.deposit_percentage) setDepositPercentage(data.deposit_percentage)
          if (data.cancellation_days) setCancellationDays(data.cancellation_days)
          // Branding Settings
          if (data.brand_logo) setBrandLogo(data.brand_logo)
          if (data.brand_favicon) setBrandFavicon(data.brand_favicon)
          if (data.primary_color) setPrimaryColor(data.primary_color)
          if (data.secondary_color) setSecondaryColor(data.secondary_color)
          // Notifications
          if (data.email_notifications) setEmailNotifications(data.email_notifications === 'true')
          if (data.sms_notifications) setSmsNotifications(data.sms_notifications === 'true')
          if (data.booking_alerts) setBookingAlerts(data.booking_alerts === 'true')
          if (data.inquiry_alerts) setInquiryAlerts(data.inquiry_alerts === 'true')
          // SMTP Setup
          if (data.smtp_user) setSmtpUser(data.smtp_user)
          if (data.smtp_pass) setSmtpPass(data.smtp_pass)
          if (data.welcome_email_subject) setWelcomeEmailSubject(data.welcome_email_subject)
          if (data.welcome_email_body) setWelcomeEmailBody(data.welcome_email_body)
          if (data.whatsapp_template) setWhatsappTemplate(data.whatsapp_template)
          
          // Navigation menus
          if (data.header_menu) {
            try {
              setHeaderLinks(JSON.parse(data.header_menu))
            } catch (e) {
              setHeaderLinks(defaultHeaderLinks)
            }
          } else {
            setHeaderLinks(defaultHeaderLinks)
          }

          if (data.footer_menu) {
            try {
              setFooterLinks(JSON.parse(data.footer_menu))
            } catch (e) {
              setFooterLinks(defaultFooterLinks)
            }
          } else {
            setFooterLinks(defaultFooterLinks)
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err)
      } finally {
        setLoading(false)
        setMounted(true)
        const params = new URLSearchParams(window.location.search)
        const tab = params.get('tab')
        if (tab && tabs.some(t => t.id === tab)) {
          setActiveTab(tab)
        }
      }
    }
    loadSettings()
  }, [])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        if (type === 'logo') {
          setBrandLogo(base64String)
        } else {
          setBrandFavicon(base64String)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSendTestEmail = async () => {
    if (!smtpUser) {
      alert('Please enter a Gmail address in the SMTP Setup first.')
      return
    }
    setTestingEmail(true)
    setTestEmailStatus(null)
    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: smtpUser })
      })
      const data = await res.json()
      if (res.ok) {
        setTestEmailStatus('Test email sent successfully!')
      } else {
        setTestEmailStatus(`Failed: ${data.error || 'Unknown error'}`)
      }
    } catch (err: any) {
      setTestEmailStatus(`Error: ${err.message}`)
    } finally {
      setTestingEmail(false)
    }
  }

  // Header Links Helpers
  const addHeaderLink = () => {
    setHeaderLinks([...headerLinks, { name: 'New Link', href: '/' }])
  }

  const removeHeaderLink = (index: number) => {
    setHeaderLinks(headerLinks.filter((_, i) => i !== index))
  }

  const updateHeaderLink = (index: number, fields: Partial<{ name: string; href: string; subItems?: { name: string; href: string }[] }>) => {
    const updated = [...headerLinks]
    updated[index] = { ...updated[index], ...fields }
    setHeaderLinks(updated)
  }

  const moveHeaderLink = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === headerLinks.length - 1) return
    
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const updated = [...headerLinks]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setHeaderLinks(updated)
  }

  const addSubItem = (parentIndex: number) => {
    const parent = headerLinks[parentIndex]
    const subItems = parent.subItems ? [...parent.subItems] : []
    subItems.push({ name: 'Sub Link', href: '/' })
    updateHeaderLink(parentIndex, { subItems })
  }

  const removeSubItem = (parentIndex: number, subIndex: number) => {
    const parent = headerLinks[parentIndex]
    if (!parent.subItems) return
    const subItems = parent.subItems.filter((_, i) => i !== subIndex)
    updateHeaderLink(parentIndex, { subItems: subItems.length > 0 ? subItems : undefined })
  }

  const updateSubItem = (parentIndex: number, subIndex: number, fields: Partial<{ name: string; href: string }>) => {
    const parent = headerLinks[parentIndex]
    if (!parent.subItems) return
    const subItems = [...parent.subItems]
    subItems[subIndex] = { ...subItems[subIndex], ...fields }
    updateHeaderLink(parentIndex, { subItems })
  }

  const moveSubItem = (parentIndex: number, subIndex: number, direction: 'up' | 'down') => {
    const parent = headerLinks[parentIndex]
    if (!parent.subItems) return
    const subItems = [...parent.subItems]
    if (direction === 'up' && subIndex === 0) return
    if (direction === 'down' && subIndex === subItems.length - 1) return

    const targetIndex = direction === 'up' ? subIndex - 1 : subIndex + 1
    const temp = subItems[subIndex]
    subItems[subIndex] = subItems[targetIndex]
    subItems[targetIndex] = temp
    updateHeaderLink(parentIndex, { subItems })
  }

  // Footer Links Helpers
  const addFooterLink = () => {
    setFooterLinks([...footerLinks, { name: 'New Link', href: '/' }])
  }

  const removeFooterLink = (index: number) => {
    setFooterLinks(footerLinks.filter((_, i) => i !== index))
  }

  const updateFooterLink = (index: number, fields: Partial<{ name: string; href: string }>) => {
    const updated = [...footerLinks]
    updated[index] = { ...updated[index], ...fields }
    setFooterLinks(updated)
  }

  const moveFooterLink = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === footerLinks.length - 1) return

    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const updated = [...footerLinks]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setFooterLinks(updated)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          site_name: siteName,
          site_tagline: siteTagline,
          site_description: siteDescription,
          default_language: defaultLanguage,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          whatsapp_number: whatsappNumber,
          address: address,
          currency: currency,
          deposit_percentage: depositPercentage,
          cancellation_days: cancellationDays,
          brand_logo: brandLogo,
          brand_favicon: brandFavicon,
          primary_color: primaryColor,
          secondary_color: secondaryColor,
          email_notifications: String(emailNotifications),
          sms_notifications: String(smsNotifications),
          booking_alerts: String(bookingAlerts),
          inquiry_alerts: String(inquiryAlerts),
          smtp_user: smtpUser,
          smtp_pass: smtpPass,
          welcome_email_subject: welcomeEmailSubject,
          welcome_email_body: welcomeEmailBody,
          whatsapp_template: whatsappTemplate,
          header_menu: JSON.stringify(headerLinks),
          footer_menu: JSON.stringify(footerLinks),
        }),
      })
      if (!res.ok) {
        throw new Error('Failed to save settings')
      }
    } catch (err) {
      console.error('Failed to save settings:', err)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
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
                      <div className="w-16 h-16 rounded-xl skeuo-inset flex items-center justify-center overflow-hidden bg-muted/20 relative">
                        {brandLogo ? (
                          <img src={brandLogo} alt="Logo" className="w-full h-full object-contain p-1.5" />
                        ) : (
                          <Flower2 className="h-8 w-8 text-primary" />
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium skeuo-button text-primary-foreground">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload New Logo
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleLogoUpload(e, 'logo')}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'branding' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="skeuo-card p-6">
                <h2 className="font-serif text-xl text-foreground mb-6">Branding Management</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column: Color & Logo Forms */}
                  <div className="space-y-6">
                    {/* Logo Upload */}
                    <div className="skeuo-inset p-4 rounded-xl space-y-4">
                      <h3 className="text-sm font-medium text-foreground">Brand Logo</h3>
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 skeuo-inset rounded-xl flex items-center justify-center overflow-hidden bg-muted/20 relative">
                          {brandLogo ? (
                            <img src={brandLogo} alt="Brand Logo" className="w-full h-full object-contain p-2" />
                          ) : (
                            <Flower2 className="h-12 w-12 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="cursor-pointer">
                            <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium skeuo-button text-primary-foreground">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Logo
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleLogoUpload(e, 'logo')}
                            />
                          </label>
                          {brandLogo && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:bg-red-500/10 block"
                              onClick={() => setBrandLogo('')}
                            >
                              <Trash2 className="h-4 w-4 mr-1 inline" />
                              Remove
                            </Button>
                          )}
                          <p className="text-xs text-muted-foreground">Supported: PNG, JPEG, SVG. Max size 2MB.</p>
                        </div>
                      </div>
                    </div>

                    {/* Favicon Upload */}
                    <div className="skeuo-inset p-4 rounded-xl space-y-4">
                      <h3 className="text-sm font-medium text-foreground">Favicon (Browser Icon)</h3>
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 skeuo-inset rounded-lg flex items-center justify-center overflow-hidden bg-muted/20 relative">
                          {brandFavicon ? (
                            <img src={brandFavicon} alt="Favicon" className="w-full h-full object-contain p-1" />
                          ) : (
                            <Globe className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="cursor-pointer">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium skeuo-button text-primary-foreground">
                              <Upload className="h-3.5 w-3.5 mr-1.5" />
                              Upload Favicon
                            </span>
                            <input
                              type="file"
                              accept="image/x-icon,image/png"
                              className="hidden"
                              onChange={(e) => handleLogoUpload(e, 'favicon')}
                            />
                          </label>
                          {brandFavicon && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:bg-red-500/10 block text-xs"
                              onClick={() => setBrandFavicon('')}
                            >
                              Remove
                            </Button>
                          )}
                          <p className="text-xs text-muted-foreground">Supported: ICO, PNG. Preferred size 32x32px.</p>
                        </div>
                      </div>
                    </div>

                    {/* Brand Colors */}
                    <div className="skeuo-inset p-4 rounded-xl space-y-4">
                      <h3 className="text-sm font-medium text-foreground">Color Palette</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-muted-foreground mb-1.5 block">Primary Accent</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="w-10 h-10 border-0 rounded-lg cursor-pointer skeuo-card p-0.5"
                            />
                            <Input
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="skeuo-input text-xs font-mono uppercase"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground mb-1.5 block">Secondary Dark</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={secondaryColor}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="w-10 h-10 border-0 rounded-lg cursor-pointer skeuo-card p-0.5"
                            />
                            <Input
                              value={secondaryColor}
                              onChange={(e) => setSecondaryColor(e.target.value)}
                              className="skeuo-input text-xs font-mono uppercase"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Branding Preview Card */}
                  <div className="space-y-6">
                    <div className="skeuo-inset p-4 rounded-xl space-y-4">
                      <h3 className="text-sm font-medium text-foreground">Live Branding Preview</h3>
                      
                      {/* Mini Mock Dashboard Widget Card */}
                      <div className="rounded-xl border border-border overflow-hidden bg-background shadow-lg relative aspect-[4/3] flex flex-col justify-between p-4">
                        {/* Header bar */}
                        <div className="flex items-center justify-between pb-2 border-b border-border">
                          <div className="flex items-center gap-1.5">
                            {brandLogo ? (
                              <img src={brandLogo} alt="Preview Logo" className="h-5 w-auto object-contain" />
                            ) : (
                              <Flower2 className="h-5 w-5" style={{ color: primaryColor }} />
                            )}
                            <span className="text-xs font-serif font-bold text-foreground">Munroe Morris</span>
                          </div>
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                        </div>

                        {/* Banner preview */}
                        <div className="flex-1 my-3 rounded-lg relative overflow-hidden flex flex-col justify-end p-3" style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}90)` }}>
                          <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm text-white">
                            <Globe className="h-2.5 w-2.5" />
                            <span>Verified</span>
                          </div>
                          <div>
                            <h4 className="font-serif text-sm text-white leading-tight">Welcome to Luxury</h4>
                            <p className="text-[9px] text-white/70 line-clamp-1">Experience backwaters like never before.</p>
                          </div>
                        </div>

                        {/* Interactive items */}
                        <div className="flex gap-2">
                          <button className="flex-1 py-1.5 rounded-lg text-[10px] font-medium text-white transition-all text-center" style={{ backgroundColor: primaryColor }}>
                            Primary Button
                          </button>
                          <button className="flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all text-center border border-border text-foreground hover:bg-muted/10">
                            Secondary
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          The preview reflects how your logo and primary color palette will dynamically customize the header, banners, and primary CTA buttons of the booking system.
                        </p>
                      </div>
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

          {activeTab === 'navigation' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Header Navigation Menu Builder */}
              <div className="skeuo-card p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/5">
                  <div>
                    <h2 className="font-serif text-xl text-foreground font-semibold">Header Navigation Menu</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Customize the links in the main header navigation (supports translation keys like <code>nav.about</code> or custom labels).</p>
                  </div>
                  <Button onClick={addHeaderLink} className="skeuo-button py-2 px-4 text-xs font-semibold flex items-center gap-1.5">
                    <Plus className="h-4 w-4" /> Add Link
                  </Button>
                </div>

                <div className="space-y-4">
                  {headerLinks.length === 0 ? (
                    <div className="text-center py-8 text-xs text-muted-foreground skeuo-inset rounded-xl">
                      No navigation links configured. Click "Add Link" to get started.
                    </div>
                  ) : (
                    headerLinks.map((link, idx) => (
                      <div key={idx} className="p-4 skeuo-inset rounded-xl space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-semibold text-muted-foreground block mb-1">Link Label (or Translation Key)</label>
                              <Input 
                                value={link.name} 
                                onChange={(e) => updateHeaderLink(idx, { name: e.target.value })}
                                className="skeuo-input text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold text-muted-foreground block mb-1">URL Path / Destination</label>
                              <Input 
                                value={link.href} 
                                onChange={(e) => updateHeaderLink(idx, { href: e.target.value })}
                                className="skeuo-input text-xs"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={idx === 0}
                              onClick={() => moveHeaderLink(idx, 'up')}
                              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-black/5 active:scale-95"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={idx === headerLinks.length - 1}
                              onClick={() => moveHeaderLink(idx, 'down')}
                              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-black/5 active:scale-95"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeHeaderLink(idx)}
                              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10 active:scale-95"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Dropdown Options */}
                        <div className="border-t border-black/5 pt-3 mt-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox"
                                id={`has-submenu-${idx}`}
                                checked={!!link.subItems}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    updateHeaderLink(idx, { subItems: [{ name: 'Sub Link', href: '/' }] })
                                  } else {
                                    updateHeaderLink(idx, { subItems: undefined })
                                  }
                                }}
                                className="rounded border-gray-300 text-primary focus:ring-primary h-3.5 w-3.5"
                              />
                              <label htmlFor={`has-submenu-${idx}`} className="text-xs font-medium text-foreground cursor-pointer select-none">
                                Enable Dropdown Sub-menu
                              </label>
                            </div>
                            
                            {link.subItems && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => addSubItem(idx)}
                                className="text-[10px] font-semibold text-primary hover:text-primary-dark p-0 h-auto"
                              >
                                <Plus className="h-3 w-3 mr-1 inline" /> Add Sub-Link
                              </Button>
                            )}
                          </div>

                          {/* SubItems Render */}
                          {link.subItems && (
                            <div className="ml-6 pl-4 border-l-2 border-primary/20 space-y-3">
                              {link.subItems.map((sub, sIdx) => (
                                <div key={sIdx} className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between bg-black/5 p-3 rounded-lg">
                                  <div className="flex-1 grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="text-[9px] font-semibold text-muted-foreground block mb-0.5">Sub-Link Label</label>
                                      <Input 
                                        value={sub.name} 
                                        onChange={(e) => updateSubItem(idx, sIdx, { name: e.target.value })}
                                        className="skeuo-input text-[11px] h-8 py-1"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[9px] font-semibold text-muted-foreground block mb-0.5">Sub-Link URL</label>
                                      <Input 
                                        value={sub.href} 
                                        onChange={(e) => updateSubItem(idx, sIdx, { href: e.target.value })}
                                        className="skeuo-input text-[11px] h-8 py-1"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      disabled={sIdx === 0}
                                      onClick={() => moveSubItem(idx, sIdx, 'up')}
                                      className="h-7 w-7 text-muted-foreground hover:bg-black/5"
                                    >
                                      <ArrowUp className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      disabled={sIdx === link.subItems!.length - 1}
                                      onClick={() => moveSubItem(idx, sIdx, 'down')}
                                      className="h-7 w-7 text-muted-foreground hover:bg-black/5"
                                    >
                                      <ArrowDown className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeSubItem(idx, sIdx)}
                                      className="h-7 w-7 text-red-500 hover:bg-red-500/10"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Footer Navigation Menu Builder */}
              <div className="skeuo-card p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/5">
                  <div>
                    <h2 className="font-serif text-xl text-foreground font-semibold">Footer Quick Links Menu</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">Customize the links in the footer quick links section.</p>
                  </div>
                  <Button onClick={addFooterLink} className="skeuo-button py-2 px-4 text-xs font-semibold flex items-center gap-1.5">
                    <Plus className="h-4 w-4" /> Add Link
                  </Button>
                </div>

                <div className="space-y-4">
                  {footerLinks.length === 0 ? (
                    <div className="text-center py-8 text-xs text-muted-foreground skeuo-inset rounded-xl">
                      No footer links configured. Click "Add Link" to get started.
                    </div>
                  ) : (
                    footerLinks.map((link, idx) => (
                      <div key={idx} className="p-4 skeuo-inset rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-semibold text-muted-foreground block mb-1">Link Label (or Translation Key)</label>
                            <Input 
                              value={link.name} 
                              onChange={(e) => updateFooterLink(idx, { name: e.target.value })}
                              className="skeuo-input text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-muted-foreground block mb-1">URL Path / Destination</label>
                            <Input 
                              value={link.href} 
                              onChange={(e) => updateFooterLink(idx, { href: e.target.value })}
                              className="skeuo-input text-xs"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={idx === 0}
                            onClick={() => moveFooterLink(idx, 'up')}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-black/5 active:scale-95"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={idx === footerLinks.length - 1}
                            onClick={() => moveFooterLink(idx, 'down')}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-black/5 active:scale-95"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFooterLink(idx)}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10 active:scale-95"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
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
                        type="button"
                        onClick={() => setting.onChange(!setting.value)}
                        className={`w-12 h-6 rounded-full transition-colors ${setting.value ? 'bg-primary' : 'bg-muted'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${setting.value ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SMTP Setup Card */}
              <div className="skeuo-card p-6 space-y-4">
                <h2 className="font-serif text-xl text-foreground">Gmail SMTP Setup</h2>
                <p className="text-xs text-muted-foreground">Configure the resort transactional sender Gmail credentials.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Gmail Address</label>
                    <Input 
                      type="email" 
                      value={smtpUser} 
                      onChange={(e) => setSmtpUser(e.target.value)} 
                      placeholder="resort@gmail.com" 
                      className="skeuo-input text-xs" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Gmail App Password</label>
                    <Input 
                      type="password" 
                      value={smtpPass} 
                      onChange={(e) => setSmtpPass(e.target.value)} 
                      placeholder="xxxx xxxx xxxx xxxx" 
                      className="skeuo-input text-xs" 
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <Button 
                    type="button"
                    onClick={handleSendTestEmail} 
                    disabled={testingEmail}
                    className="skeuo-button text-xs py-4 px-5"
                  >
                    {testingEmail ? 'Sending Test...' : 'Send Test Email'}
                  </Button>
                  {testEmailStatus && (
                    <span className="text-xs font-semibold text-primary">{testEmailStatus}</span>
                  )}
                </div>
              </div>

              {/* Welcome Email Template Card */}
              <div className="skeuo-card p-6 space-y-4">
                <h2 className="font-serif text-xl text-foreground">Welcome Email Template</h2>
                <p className="text-xs text-muted-foreground">Customize the email sent to newly registered guests (Supports {"{{name}}"}).</p>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Subject Line</label>
                  <Input 
                    value={welcomeEmailSubject} 
                    onChange={(e) => setWelcomeEmailSubject(e.target.value)} 
                    placeholder="Welcome to Munroe Morris Resort!" 
                    className="skeuo-input text-xs" 
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Email Body</label>
                  <Textarea 
                    rows={6}
                    value={welcomeEmailBody} 
                    onChange={(e) => setWelcomeEmailBody(e.target.value)} 
                    placeholder="Dear {{name}},\n\nWelcome..." 
                    className="skeuo-input text-xs resize-none" 
                  />
                </div>
              </div>

              {/* WhatsApp Template Card */}
              <div className="skeuo-card p-6 space-y-4">
                <h2 className="font-serif text-xl text-foreground">WhatsApp Template Configuration</h2>
                <p className="text-xs text-muted-foreground">Pre-fill the WhatsApp chat template for contacting inquiries (Supports {"{{name}}, {{roomType}}, {{checkIn}}, {{checkOut}}"}).</p>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Inquiry Response Template</label>
                  <Textarea 
                    rows={4}
                    value={whatsappTemplate} 
                    onChange={(e) => setWhatsappTemplate(e.target.value)} 
                    placeholder="Hello *{{name}}*, thank you for inquiring for a *{{roomType}}* from *{{checkIn}}* to *{{checkOut}}*. We will get back to you shortly." 
                    className="skeuo-input text-xs resize-none" 
                  />
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

          {activeTab === 'database' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="skeuo-card p-6">
                <h2 className="font-serif text-xl text-foreground mb-4">Database Operations</h2>
                <p className="text-xs text-muted-foreground mb-6">
                  Reset the database back to default seeded values or partially clear specific tables.
                </p>

                <div className="space-y-6">
                  {/* Mode Selector */}
                  <div className="flex gap-4 p-1 skeuo-inset rounded-xl max-w-sm">
                    <button
                      type="button"
                      onClick={() => setResetMode('partial')}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                        resetMode === 'partial'
                          ? 'skeuo-button text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Partial Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setResetMode('full')}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                        resetMode === 'full'
                          ? 'skeuo-button bg-red-600 hover:bg-red-700 text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Full Reset
                    </button>
                  </div>

                  {resetMode === 'full' ? (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-700 rounded-xl space-y-2 text-xs">
                      <p className="font-bold">⚠️ CRITICAL WARNING</p>
                      <p>
                        A Full Reset will purge ALL tables in the database. This includes: Rooms, Guests, Bookings, Experiences, Spa Treatments, Dining, Gallery Images, Reviews, and Contact Inquiries.
                      </p>
                      <p>
                        All records will be restored to the initial default system demo seeds. This action is irreversible.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 rounded-xl text-xs">
                        Select tables to clear and restore to initial seeded datasets. Clearing <strong>Rooms</strong> or <strong>Guests</strong> will automatically drop related <strong>Bookings</strong> due to relational database integrity requirements.
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { id: 'bookings', label: 'Bookings & Reservations' },
                          { id: 'guests', label: 'Guests & Profiles' },
                          { id: 'rooms', label: 'Rooms & Villas' },
                          { id: 'experiences', label: 'Experiences / Activities' },
                          { id: 'spa', label: 'Spa Treatments & Packages' },
                          { id: 'dining', label: 'Dining Venues & Dishes' },
                          { id: 'gallery', label: 'Gallery Images' },
                          { id: 'inquiries', label: 'Contact Inquiries' },
                          { id: 'reviews', label: 'Reviews & Testimonials' },
                          { id: 'settings', label: 'System Settings' },
                        ].map((item) => (
                          <label
                            key={item.id}
                            className="flex items-center gap-3 p-3 skeuo-inset rounded-xl cursor-pointer hover:bg-primary/5 transition-all text-xs"
                          >
                            <input
                              type="checkbox"
                              checked={(resetSelections as any)[item.id]}
                              onChange={(e) =>
                                setResetSelections((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.checked,
                                }))
                              }
                              className="rounded border-border text-primary focus:ring-primary/20 h-4 w-4"
                            />
                            <div>
                              <p className="font-semibold text-foreground">{item.label}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <Button
                      type="button"
                      onClick={handleResetDb}
                      disabled={resettingDb}
                      className={`skeuo-button text-xs py-4 px-6 ${
                        resetMode === 'full' ? 'bg-red-600 hover:bg-red-700 text-white' : ''
                      }`}
                    >
                      {resettingDb ? 'Resetting Database...' : 'Execute Database Reset'}
                    </Button>
                    {resetDbStatus && (
                      <span className="text-xs font-semibold text-primary">{resetDbStatus}</span>
                    )}
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
