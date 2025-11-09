"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Check } from "lucide-react"

interface MarketingSiteProps {
  onSignUp: () => void
}

export function MarketingSite({ onSignUp }: MarketingSiteProps) {
  const features = [
    {
      title: "Visual Builder",
      description: "Drag-and-drop interface with AI assistance",
      items: ["Component library", "Real-time preview", "AI suggestions", "Custom branding"],
    },
    {
      title: "AI Governance",
      description: "Intelligent compliance and rule enforcement",
      items: ["Regulatory compliance", "Custom rules engine", "Audit trails", "Risk management"],
    },
    {
      title: "Deployment",
      description: "Multiple deployment options",
      items: ["Flutter mobile apps", "Web applications", "White-label branding", "One-click deploy"],
    },
    {
      title: "Integration Hub",
      description: "Connect with your existing systems",
      items: ["Core banking APIs", "Payment processors", "Identity verification", "Analytics"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
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
            <Button onClick={onSignUp}>
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-primary/5">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            All Features of <span className="text-primary">CU OS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty leading-relaxed">
            A comprehensive platform that combines visual building, AI governance, and seamless deployment for Credit
            Unions ready to innovate.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 finux-shadow border border-border/50 hover:border-primary/50 transition-all"
              >
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">How It Works</h2>

          <div className="grid md:grid-cols-5 gap-4 md:gap-2">
            {[
              { step: "1", title: "Sign Up", desc: "Create your CU account" },
              { step: "2", title: "Visual Builder", desc: "Design your app" },
              { step: "3", title: "AI Assistance", desc: "Get smart suggestions" },
              { step: "4", title: "Customize", desc: "Brand & configure" },
              { step: "5", title: "Deploy", desc: "Launch your app" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-center finux-shadow">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">Start Building Today</h2>
            <p className="text-lg text-primary-foreground/90 mb-8">Join Credit Unions already using CU OS</p>
            <Button size="lg" variant="secondary" onClick={onSignUp} className="group">
              Create Your Account
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
