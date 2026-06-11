'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, Phone, Shield, ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Tab = 'guest-login' | 'guest-signup' | 'admin-login'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Tab>('guest-login')
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  // Clear messages on tab change
  useEffect(() => {
    setError(null)
    setSuccessMsg(null)
  }, [activeTab])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMsg(null)

    try {
      if (activeTab === 'guest-signup') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, firstName, lastName, phone })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to sign up')
        
        setSuccessMsg('Registration successful! Logging you in...')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1500)
      } else {
        const role = activeTab === 'admin-login' ? 'admin' : 'guest'
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, role })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Invalid credentials')

        setSuccessMsg('Login successful! Redirecting...')
        setTimeout(() => {
          if (role === 'admin') {
            window.location.href = '/admin'
          } else {
            window.location.href = '/dashboard'
          }
        }, 1500)
      }
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleTestCredentialClick = (testEmail: string, testPass: string, tab: Tab) => {
    setActiveTab(tab)
    setEmail(testEmail)
    setPassword(testPass)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col justify-center items-center p-4 py-12 relative overflow-hidden">
      {/* Background decorations for Skeuomorphic depth */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-primary/10 to-gold-dark/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-gold-dark/10 to-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md z-10 space-y-8">
        
        {/* Logo/Branding */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-3 rounded-2xl skeuo-card mb-3 text-primary"
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>
          <h2 className="font-serif text-3xl text-foreground font-semibold">Munroe Morris</h2>
          <p className="text-muted-foreground text-sm mt-1">Exquisite Backwater Sanctuary</p>
        </div>

        {/* Credentials box helper */}
        <div className="skeuo-card p-5 bg-[#EDEFF2] border border-white/40 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-primary" /> Test Sandbox Credentials
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              onClick={() => handleTestCredentialClick('admin@resort.com', 'admin123', 'admin-login')}
              className="p-2 text-left bg-white/50 hover:bg-white/80 border border-black/5 rounded-lg transition-all active:scale-[0.98] shadow-sm flex flex-col justify-between"
            >
              <span className="font-semibold text-primary">Admin Access</span>
              <span className="text-muted-foreground mt-1 text-[11px] truncate">admin@resort.com</span>
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded mt-1.5 self-start">admin123</span>
            </button>
            <button
              onClick={() => handleTestCredentialClick('rajesh@email.com', 'guest123', 'guest-login')}
              className="p-2 text-left bg-white/50 hover:bg-white/80 border border-black/5 rounded-lg transition-all active:scale-[0.98] shadow-sm flex flex-col justify-between"
            >
              <span className="font-semibold text-primary font-serif">Guest Access</span>
              <span className="text-muted-foreground mt-1 text-[11px] truncate">rajesh@email.com</span>
              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded mt-1.5 self-start">guest123</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex p-1.5 skeuo-inset rounded-2xl bg-[#E6EAF0]">
          {(['guest-login', 'guest-signup', 'admin-login'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition-all ${
                activeTab === tab
                  ? 'bg-[#F0F2F5] text-primary shadow-[2px_2px_8px_rgba(0,0,0,0.08),-2px_-2px_8px_rgba(255,255,255,0.9)] border-t border-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'guest-login' && 'Guest Log In'}
              {tab === 'guest-signup' && 'Sign Up'}
              {tab === 'admin-login' && 'Admin Portal'}
            </button>
          ))}
        </div>

        {/* Form Box */}
        <div className="skeuo-card p-8 bg-[#F0F2F5] border border-white/60">
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                {activeTab === 'guest-signup' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Rajesh"
                          className="skeuo-input pl-9 pr-4 py-2.5 w-full text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Kumar"
                          className="skeuo-input pl-9 pr-4 py-2.5 w-full text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="skeuo-input pl-9 pr-4 py-2.5 w-full text-sm"
                    />
                  </div>
                </div>

                {activeTab === 'guest-signup' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Phone Number (Optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="skeuo-input pl-9 pr-4 py-2.5 w-full text-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="skeuo-input pl-9 pr-4 py-2.5 w-full text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Error Message */}
            {error && (
              <div className="text-xs text-red-500 bg-red-500/5 border border-red-500/10 p-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="text-xs text-green-600 bg-green-500/5 border border-green-500/10 p-3 rounded-xl flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                {successMsg}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 skeuo-button font-medium flex items-center justify-center gap-2 group text-sm"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {activeTab === 'guest-login' && 'Log In to Sanctuary'}
                  {activeTab === 'guest-signup' && 'Create Sanctuary Account'}
                  {activeTab === 'admin-login' && 'Log In to Admin Console'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </div>

      </div>
    </div>
  )
}
