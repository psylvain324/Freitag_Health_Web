import { Link } from "wouter";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, Shield, Zap, Building2, FileCheck, Users, Percent, Star, TrendingDown, DollarSign, Phone } from "lucide-react";
import PartnerLogosCarousel from "@/components/PartnerLogosCarousel";
import SiteFooter from "@/components/SiteFooter";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kZPzsDhWDb22iMS22PFEjY/hero-family-fB7arRPKGWvZ5ovof4YDLG.webp";

const BENEFITS = [
  {
    icon: Percent,
    title: "Dramatically lower premiums",
    description: "Healthy individuals routinely save 40–60% compared to standard ACA marketplace rates. Your good health is finally rewarded.",
  },
  {
    icon: Shield,
    title: "Comprehensive coverage",
    description: "Doctor visits, hospital stays, prescriptions, preventive care, mental health — all the coverage you expect from a major carrier.",
  },
  {
    icon: Building2,
    title: "Nationwide provider networks",
    description: "Access the same broad PPO and HMO networks offered by top carriers. Keep your doctors and hospitals.",
  },
  {
    icon: Zap,
    title: "Fast, simple enrollment",
    description: "Our streamlined application takes minutes, not hours. Most applicants receive a decision within 24–48 hours.",
  },
  {
    icon: Users,
    title: "Expert guidance included",
    description: "Licensed advisors walk you through every option at no cost to you. We're paid by the carriers, not by you.",
  },
  {
    icon: FileCheck,
    title: "No-cost plan comparison",
    description: "Compare quotes from 50+ carriers side-by-side. Our service is completely free — you'll never pay a broker fee.",
  },
];

const STEPS = [
  { num: "01", title: "Share your details", desc: "Answer a few simple health and lifestyle questions. It takes less than 3 minutes." },
  { num: "02", title: "Get underwritten", desc: "Freitag matches your health profile against 50+ carriers for the best rates." },
  { num: "03", title: "Compare plans", desc: "Review personalized quotes side-by-side with clear coverage breakdowns." },
  { num: "04", title: "Enroll & save", desc: "Choose your plan and enroll. Our licensed advisors handle all the paperwork for you." },
];

const TESTIMONIALS = [
  { quote: "I was paying $1,100/month for my family through the marketplace. After working with Freitag, we're down to $480. Same Blue Cross network, same doctors. I wish I'd known about this years ago.", name: "Patricia M.", location: "Austin, TX", saved: "$7,440/yr saved" },
  { quote: "As a self-employed consultant, health insurance was my biggest expense. The Freitag team found me a Cigna plan that cut my premium nearly in half. The whole process took about 20 minutes.", name: "Robert K.", location: "Denver, CO", saved: "$5,280/yr saved" },
  { quote: "I was skeptical at first — how could the same coverage cost so much less? But my Freitag advisor explained everything clearly. My UnitedHealthcare plan has better coverage than before, at 45% less.", name: "Michelle L.", location: "Seattle, WA", saved: "$4,920/yr saved" },
];

const FAQ_ITEMS = [
  { q: "What is medically underwritten health insurance?", a: "Medically underwritten health insurance evaluates your individual health status, medical history, and lifestyle to determine your premium. Unlike ACA marketplace plans that use community rating (everyone pays the same), underwritten plans reward healthy individuals with significantly lower rates — often 40–60% less." },
  { q: "Who qualifies for medically underwritten plans?", a: "Generally, individuals and families in good health who don't have significant pre-existing conditions. If you're relatively healthy, exercise regularly, and don't use tobacco, you're likely to qualify for excellent rates. Freitag advisors can quickly assess your eligibility at no cost." },
  { q: "Are these plans ACA-compliant?", a: "Medically underwritten plans operate outside the ACA marketplace. While they may not include all ACA essential health benefits, they offer comprehensive coverage including doctor visits, hospital stays, prescriptions, and preventive care. Many plans also include dental and vision. Your advisor will explain exactly what's covered." },
  { q: "Which insurance companies offer these plans?", a: "Freitag works with all major carriers including UnitedHealthcare, Blue Cross Blue Shield, Aetna, Cigna, Humana, Kaiser Permanente, Anthem, and many more. This means you get access to the same trusted networks and brand-name coverage — just at a lower price." },
  { q: "How much can I actually save?", a: "Savings vary based on your age, location, health status, and chosen plan. On average, Freitag clients save $4,800 per year compared to standard marketplace rates. Some families save over $7,000 annually. Get a free quote to see your personalized savings estimate." },
  { q: "Is there any cost to use your service?", a: "Absolutely not. Freitag's service is 100% free to you. We're compensated by the insurance carriers when you enroll, so there's never a broker fee or hidden charge. You'll pay the same premium (or less) as going directly to the carrier." },
];

export default function InsureHome() {
  return (
    <div className="min-h-screen bg-background/96 text-foreground relative overflow-x-hidden">
      {/* Side accent bars - teal/green accents on both sides */}
      <div className="fixed inset-y-0 left-0 w-1.5 bg-gradient-to-b from-transparent via-[oklch(0.35_0.12_165)]/70 to-transparent z-0 pointer-events-none" aria-hidden />
      <div className="fixed inset-y-0 right-0 w-1.5 bg-gradient-to-b from-transparent via-[oklch(0.35_0.12_165)]/70 to-transparent z-0 pointer-events-none" aria-hidden />
      <PageHeader
        navItems={[
          { href: "/insure#how-it-works", label: "How It Works", sectionId: "how-it-works" },
          { href: "/insure#carriers", label: "Plans We Offer", sectionId: "carriers" },
          { href: "/insure#why-choose", label: "Why Freitag", sectionId: "why-choose" },
          { href: "/insure#faq", label: "FAQ", sectionId: "faq" },
        ]}
        ctaHref="/apply"
        ctaLabel="Start Application"
      />

      {/* Hero - healthsave-style layout */}
      <section id="hero" className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                <TrendingDown className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">
                  Save up to 60% on premiums
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Smarter Health Insurance Starts With{" "}
                <span className="text-accent">Medical Underwriting</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
                Healthy individuals and families deserve rates that reflect their well-being. Freitag Health Insurance compares medically underwritten plans from every top carrier — all in one place.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Interested in a career in health insurance?{" "}
                <Link href="/join" className="text-accent font-medium hover:underline">
                  Join Our Team →
                </Link>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/apply">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto cursor-pointer">
                    Start Application
                  </Button>
                </Link>
                <a href="tel:727-249-3807">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Phone className="w-4 h-4 mr-2 inline" />
                    Talk to an Advisor
                  </Button>
                </a>
              </div>
              {/* Trust badges with stars - all on same line */}
              <div className="flex flex-nowrap items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">4.9/5 rating</span>
                </div>
                <div className="w-px h-5 bg-border shrink-0" />
                <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
                  <strong className="text-[oklch(0.30_0.06_160)]">10,000+</strong> families served
                </span>
                <div className="w-px h-5 bg-border shrink-0" />
                <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
                  Licensed in <strong className="text-[oklch(0.30_0.06_160)]">all 50 states</strong>
                </span>
              </div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative order-first lg:order-last"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-accent/10">
                <img
                  src={HERO_IMAGE}
                  alt="Happy family enjoying time together"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[oklch(0.94_0.02_145)] flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-[oklch(0.30_0.06_160)]" />
                    </div>
                    <div>
                      <p className="font-serif text-2xl text-[oklch(0.30_0.06_160)]">$4,800</p>
                      <p className="text-xs text-[oklch(0.55_0.01_65)]">Avg. annual savings</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Stats bar - healthsave-style dark teal section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="py-12 sm:py-16 bg-[oklch(0.30_0.06_160)]"
      >
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: "60%", label: "Average premium savings" },
              { value: "50+", label: "Top-rated carriers" },
              { value: "10,000+", label: "Families covered" },
              { value: "98%", label: "Customer satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-2">{stat.value}</p>
                <p className="font-sans text-sm sm:text-base text-[oklch(0.80_0.02_145)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <hr className="border-t border-border/60 w-full max-w-2xl mx-auto my-5 md:my-6" aria-hidden />

      {/* Why Pay More - healthsave-style two-column layout */}
      <section className="section-padding section-accented">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <span className="text-sm font-semibold tracking-widest uppercase text-accent mb-4 block">
                Why Pay More?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                Medically underwritten plans reward your good health
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Unlike standard marketplace plans that charge everyone the same rate regardless of health status, medically underwritten policies evaluate your individual health profile. If you&apos;re healthy, you qualify for significantly lower premiums — often 40–60% less than ACA marketplace rates.
              </p>
              <div className="space-y-4">
                {[
                  "Personalized rates based on your actual health",
                  "Same comprehensive coverage from top carriers",
                  "Ideal for individuals, families & self-employed",
                  "Plans available in all 50 states",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: See the difference card */}
            <div className="rounded-2xl p-8 sm:p-10 shadow-xl border border-border bg-card">
              <h3 className="text-2xl font-bold mb-8">See the difference</h3>
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Standard ACA Plan</span>
                    <span className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground">Typical rate</span>
                  </div>
                  <p className="text-3xl font-bold">$850<span className="text-base font-normal text-muted-foreground">/mo</span></p>
                </div>
                <div className="p-5 rounded-xl bg-accent/5 border-2 border-accent">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-accent">Medically Underwritten</span>
                    <span className="text-xs px-2.5 py-1 bg-accent text-accent-foreground rounded-full">Your rate</span>
                  </div>
                  <p className="text-3xl font-bold text-accent">$340<span className="text-base font-normal text-accent/80">/mo</span></p>
                </div>
                <div className="flex items-center justify-center gap-2 py-3 px-4 bg-accent/10 rounded-xl">
                  <TrendingDown className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-accent">You save $6,120 per year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-border/60 w-full max-w-2xl mx-auto my-5 md:my-6" aria-hidden />

      {/* How It Works */}
      <section id="how-it-works" className="section-padding bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">From quote to coverage in four simple steps</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <Card key={i} className="border-border shadow-md bg-card">
                <CardHeader>
                  <p className="text-3xl font-bold text-accent mb-2">{step.num}</p>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-border/60 w-full max-w-2xl mx-auto my-5 md:my-6" aria-hidden />

      {/* Insurance Plans We Offer - enhanced styling (uses section-accented treatment) */}
      <section id="carriers" className="section-padding section-accented">
        <div className="container relative">
          <div className="flex justify-center mb-6">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[oklch(0.45_0.12_165)]">Trusted Carriers</span>
          </div>
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Insurance Plans We Offer</h2>
            <p className="text-xl text-muted-foreground/90 tracking-wide">
              Plans from every major health insurance company
            </p>
          </div>
          <div className="max-w-2xl mx-auto mb-8 space-y-5">
            <p className="text-center text-muted-foreground/90 leading-relaxed">
              Freitag partners with top-rated carriers so you always get the best rate. We compare plans from UnitedHealthcare, Aetna, Cigna, Humana, Kaiser Permanente, Anthem, and dozens more — giving you access to the same nationwide networks and brand-name coverage you expect.
            </p>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[oklch(0.94_0.04_165)]/80 border border-[oklch(0.55_0.12_165)]/30">
                <TrendingDown className="w-4 h-4 text-[oklch(0.45_0.12_165)]" />
                <span className="font-semibold text-[oklch(0.35_0.10_165)]">Often 40–60% less</span>
              </div>
            </div>
            <p className="text-center text-muted-foreground/80 text-sm">
              Our licensed advisors help you find the right plan for your health profile, at no cost to you.
            </p>
          </div>
        </div>
        <div className="relative border-y border-[oklch(0.55_0.12_165)]/20">
          <PartnerLogosCarousel />
        </div>
        <div className="container relative">
          <div className="flex justify-center mt-10">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[oklch(0.45_0.12_165)]/60 to-transparent" aria-hidden />
          </div>
        </div>
      </section>

      <hr className="border-t border-border/60 w-full max-w-2xl mx-auto my-5 md:my-6" aria-hidden />

      {/* Why Choose Freitag - alternating: plain */}
      <section id="why-choose" className="section-padding section-alt">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Freitag</h2>
            <p className="text-xl text-muted-foreground">Everything you need, nothing you don&apos;t</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((b, i) => (
              <Card key={i} className="border-border shadow-md bg-card hover:border-accent/40 hover:shadow-lg transition-all">
                <CardHeader>
                  <b.icon className="w-10 h-10 text-accent mb-4" />
                  <CardTitle className="text-lg">{b.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{b.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-border/60 w-full max-w-2xl mx-auto my-8 md:my-10" aria-hidden />

      {/* Testimonials - alternating: accented */}
      <section className="section-padding section-accented">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Stories</h2>
            <p className="text-xl text-muted-foreground">Hear from families who switched</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i} className="border-border shadow-md bg-card">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                  <p className="text-sm text-accent font-medium mt-1">{t.saved}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-border/60 w-full max-w-2xl mx-auto my-8 md:my-10" aria-hidden />

      {/* FAQ - alternating: plain */}
      <section id="faq" className="section-padding pb-8 md:pb-10 bg-background">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Questions</h2>
            <p className="text-xl text-muted-foreground">Frequently asked questions</p>
          </div>
          <Accordion type="single" collapsible className="w-full [&_[data-slot=accordion-trigger]]:text-lg [&_[data-slot=accordion-trigger]]:py-5 [&_[data-slot=accordion-content]]:text-lg [&_[data-slot=accordion-content]>div]:pb-5 [&_[data-slot=accordion-content]>div]:leading-relaxed">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <hr className="border-t border-border/60 w-full max-w-2xl mx-auto my-6 md:my-8" aria-hidden />

      {/* CTA */}
      <section className="section-padding bg-gradient-to-b from-background via-accent/[0.08] to-background border-t border-border/40">
        <div className="container text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-4">Free quotes in under 3 minutes</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to stop overpaying for health insurance?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of families who are saving an average of $4,800 per year with medically underwritten health insurance plans from Freitag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto cursor-pointer">
                Start Application
              </Button>
            </Link>
            <a href="tel:727-249-3807">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Call (727) 249-3807
              </Button>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
