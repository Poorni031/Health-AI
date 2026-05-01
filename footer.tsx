import Link from 'next/link'
import { Leaf, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">Health-Ai</span>
          </Link>

          {/* Links - match header: How It Works, Login, Get Started */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Log In
            </Link>
            <Link href="/signup" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
              Get Started
            </Link>
          </nav>

          {/* Tagline */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-destructive" />
            <span>for your health</span>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Health-Ai. Personalized nutrition and disease risk insight for a healthier life.
          </p>
        </div>
      </div>
    </footer>
  )
}
