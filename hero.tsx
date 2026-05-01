import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Shield, TrendingUp, Apple, Carrot, Salad } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Nutrition</span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="text-balance">Your Personal Path to</span>
              <span className="block text-primary"> Healthier Living</span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Get AI-powered personalized diet plans based on your health profile, predict disease risks, 
              and track your nutrition journey with Indian cuisine options tailored just for you.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="gap-2 text-base">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="text-base bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>AI-Analyzed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Personalized Plans</span>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative flex flex-1 items-center justify-center">
            <div className="relative">
              {/* Main Circle */}
              <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-primary/10 md:h-96 md:w-96">
                <div className="flex h-56 w-56 items-center justify-center rounded-full bg-primary/20 md:h-72 md:w-72">
                  <div className="flex h-40 w-40 items-center justify-center rounded-full bg-primary md:h-48 md:w-48">
                    <Salad className="h-20 w-20 text-primary-foreground md:h-24 md:w-24" />
                  </div>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -left-4 top-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-lg md:h-16 md:w-16">
                <Apple className="h-7 w-7 text-destructive md:h-8 md:w-8" />
              </div>
              <div className="absolute -right-4 top-16 flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-lg md:h-16 md:w-16">
                <Carrot className="h-7 w-7 text-chart-3 md:h-8 md:w-8" />
              </div>
              <div className="absolute -bottom-2 left-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-lg md:h-16 md:w-16">
                <TrendingUp className="h-7 w-7 text-primary md:h-8 md:w-8" />
              </div>
              <div className="absolute -bottom-2 right-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-card shadow-lg md:h-16 md:w-16">
                <Shield className="h-7 w-7 text-accent md:h-8 md:w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
