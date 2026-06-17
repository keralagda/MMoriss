'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Shield, ArrowRight, Sparkles, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLoginPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Auto-filled admin credentials
  const [email, setEmail] = useState('admin@resort.com')
  const [password, setPassword] = useState('admin123')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMsg(null)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'admin' })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid admin credentials')

      setSuccessMsg('Login successful! Redirecting to Admin Console...')
      setTimeout(() => {
        // Fetch redirect URL from search parameters or default to /admin
        const params = new URLSearchParams(window.location.search)
        const redirectUrl = params.get('redirect') || '/admin'
        window.location.href = redirectUrl
      }, 1500)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
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
            <Shield className="h-8 w-8" />
          </motion.div>
          <h2 className="font-serif text-3xl text-foreground font-semibold">Munroe Morris</h2>
          <p className="text-muted-foreground text-sm mt-1">Admin Control Console</p>
        </div>

        {/* Credentials box helper */}
        <div className="skeuo-card p-5 bg-[#EDEFF2] border border-white/40 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Auto-Filled Credentials
          </p>
          <p className="text-xs text-muted-foreground">
            The login details below are auto-filled for quick access. Simply submit the form to proceed.
          </p>
        </div>

        {/* Form Box */}
        <div className="skeuo-card p-8 bg-[#F0F2F5] border border-white/60">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@resort.com"
                    className="skeuo-input pl-9 pr-4 py-2.5 w-full text-sm"
                  />
                </div>
              </div>

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
            </div>

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
                  Log In to Admin Console
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
