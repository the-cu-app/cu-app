"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Zap, Code2 } from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 finux-glass border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">FinUX.dev</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Platform
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <Button variant="outline" size="sm" onClick={onGetStarted}>
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by AI Governance</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
              The Credit Union
              <br />
              <span className="text-primary">Operating System</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty leading-relaxed">
              Build, customize, and deploy white-labeled financial applications with AI-powered governance. The complete
              platform for modern Credit Unions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={onGetStarted} className="group">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 animate-scale-in">
            <div className="relative finux-shadow rounded-2xl overflow-hidden border border-border/50">
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <Code2 className="w-20 h-20 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">CU OS Platform Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              A complete operating system designed specifically for Credit Unions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 finux-shadow border border-border/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Builder</h3>
              <p className="text-muted-foreground leading-relaxed">
                Visual builder with AI assistance that understands financial regulations and governance rules
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 finux-shadow border border-border/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Governance First</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI modifications are constrained by your governance rules, ensuring compliance at every step
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 finux-shadow border border-border/50 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deploy Anywhere</h3>
              <p className="text-muted-foreground leading-relaxed">
                Export as white-labeled Flutter apps or deploy directly to web with one click
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-center finux-shadow">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready to transform your Credit Union?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join the future of financial technology with CU OS
            </p>
            <Button size="lg" variant="secondary" onClick={onGetStarted} className="group">
              Start Building Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">FinUX.dev</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 FinUX.dev. Powered by CU OS.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
