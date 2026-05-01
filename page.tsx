'use client'

import React from "react"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAppStore, useStoreHydration } from '@/lib/store'

export default function LoginPage() {
  const router = useRouter()
  const hydrated = useStoreHydration()
  const { login, fetchUser, token, healthProfile } = useAppStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const validatedRef = useRef(false)

  // Only redirect after validating token with the server (never trust persisted auth state alone)
  useEffect(() => {
    if (!hydrated || validatedRef.current) return
    const t = token ?? (typeof window !== 'undefined' ? localStorage.getItem('healthai_token') : null)
    if (!t) return
    validatedRef.current = true
    fetchUser().then((ok) => {
      if (ok) {
        const { healthProfile: profile } = useAppStore.getState()
        router.replace(profile ? '/dashboard' : '/onboarding')
      }
    })
  }, [hydrated, token, fetchUser, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setError('Please enter your email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setIsLoading(true)
    try {
      const success = await login(trimmedEmail, password)
      if (success) {
        const ok = await fetchUser()
        const { healthProfile: profile } = useAppStore.getState()
        router.replace(ok && profile ? '/dashboard' : '/onboarding')
      } else {
        setError('Invalid email or password. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">Health-Ai</span>
        </Link>
        <Link href="/signup">
          <Button variant="ghost" size="sm">
            Create Account
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-border/50 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="font-heading text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Log in to continue your health journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    className="pl-10"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError('') }}
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
