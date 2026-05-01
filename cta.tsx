import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart } from 'lucide-react'

export function CTA() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-secondary p-8 md:p-12 lg:p-16">
          {/* Background Decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Start Your Health Journey Today</span>
            </div>

            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Ready to Transform Your
              <span className="text-primary"> Nutrition & Health?</span>
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of users who have improved their health with personalized AI-powered nutrition plans.
              Get started for free today.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="gap-2 text-base">
                  Create Free Account
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-base bg-transparent">
                  Already have an account? Log in
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. Start your journey to better health today.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
