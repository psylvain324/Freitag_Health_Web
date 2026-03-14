import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Heart,
  DollarSign,
  Users,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Star,
  Phone,
  Clock,
  BadgeCheck,
  Stethoscope,
  FileText,
  TrendingDown,
} from "lucide-react";

// ─── Image URLs ───
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kZPzsDhWDb22iMS22PFEjY/hero-family-fB7arRPKGWvZ5ovof4YDLG.webp";
const HOW_IT_WORKS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kZPzsDhWDb22iMS22PFEjY/how-it-works-bg-7Hn8ExZETKGYnJgzNB7XyG.webp";
const TESTIMONIAL_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kZPzsDhWDb22iMS22PFEjY/testimonial-person1-Aa7zD2HLgSRnCVsoUJZwem.webp";
const TESTIMONIAL_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kZPzsDhWDb22iMS22PFEjY/testimonial-person2-hgLiutcNqdzJq89woQFWUB.webp";
const TESTIMONIAL_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kZPzsDhWDb22iMS22PFEjY/testimonial-person3-agsC3hPLpmXFThS68TyAx4.webp";

// ─── Animated Counter ───
function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref} className="font-serif">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── FAQ Item ───
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[oklch(0.90_0.01_85)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-sans text-lg font-medium text-[oklch(0.22_0.03_65)] pr-4 group-hover:text-[oklch(0.30_0.06_160)] transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[oklch(0.55_0.01_65)] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 pb-6" : "max-h-0"}`}
      >
        <p className="font-sans text-[oklch(0.45_0.02_65)] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

// ─── Section Wrapper with Scroll Animation ───
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Carrier Logos (SVG text placeholders for real carrier names) ───
const CARRIERS = [
  "UnitedHealthcare",
  "Blue Cross Blue Shield",
  "Aetna",
  "Cigna",
  "Humana",
  "Kaiser Permanente",
  "Anthem",
  "Molina",
];

// ─── Main Component ───
export default function HealthInsuranceLanding() {
  return (
    <div className="min-h-screen bg-[oklch(0.98_0.008_85)] overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════
          NAVIGATION
      ═══════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[oklch(0.98_0.008_85)]/90 backdrop-blur-md border-b border-[oklch(0.90_0.01_85)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2">
              <Shield className="w-7 h-7 text-[oklch(0.30_0.06_160)]" />
              <span className="font-serif text-xl sm:text-2xl text-[oklch(0.30_0.06_160)]">
                HealthSave
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="font-sans text-sm font-medium text-[oklch(0.45_0.02_65)] hover:text-[oklch(0.30_0.06_160)] transition-colors">
                How It Works
              </a>
              <a href="#carriers" className="font-sans text-sm font-medium text-[oklch(0.45_0.02_65)] hover:text-[oklch(0.30_0.06_160)] transition-colors">
                Carriers
              </a>
              <a href="#benefits" className="font-sans text-sm font-medium text-[oklch(0.45_0.02_65)] hover:text-[oklch(0.30_0.06_160)] transition-colors">
                Benefits
              </a>
              <a href="#faq" className="font-sans text-sm font-medium text-[oklch(0.45_0.02_65)] hover:text-[oklch(0.30_0.06_160)] transition-colors">
                FAQ
              </a>
            </div>
            <a
              href="#get-quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[oklch(0.65_0.16_30)] hover:bg-[oklch(0.58_0.18_30)] text-white font-sans font-medium text-sm rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[oklch(0.65_0.16_30)]/20"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[oklch(0.94_0.02_145)] rounded-full mb-6">
                <TrendingDown className="w-4 h-4 text-[oklch(0.30_0.06_160)]" />
                <span className="font-sans text-sm font-medium text-[oklch(0.30_0.06_160)]">
                  Save up to 60% on premiums
                </span>
              </div>
              <h1 className="font-serif text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] leading-[1.08] text-[oklch(0.22_0.03_65)] mb-6">
                Smarter Health Insurance Starts With{" "}
                <em className="text-[oklch(0.30_0.06_160)] not-italic">Medical Underwriting</em>
              </h1>
              <p className="font-sans text-lg sm:text-xl text-[oklch(0.45_0.02_65)] leading-relaxed mb-8 max-w-lg">
                Healthy individuals and families deserve rates that reflect their well-being. Compare medically underwritten plans from every top carrier — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#get-quote"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[oklch(0.65_0.16_30)] hover:bg-[oklch(0.58_0.18_30)] text-white font-sans font-semibold text-base rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-[oklch(0.65_0.16_30)]/25 hover:-translate-y-0.5"
                >
                  Compare Plans Free
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="tel:+18005551234"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[oklch(0.85_0.01_85)] hover:border-[oklch(0.30_0.06_160)] text-[oklch(0.30_0.06_160)] font-sans font-semibold text-base rounded-full transition-all duration-200 bg-transparent"
                >
                  <Phone className="w-5 h-5" />
                  Talk to an Advisor
                </a>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[oklch(0.75_0.15_85)] text-[oklch(0.75_0.15_85)]" />
                    ))}
                  </div>
                  <span className="font-sans text-sm text-[oklch(0.45_0.02_65)]">4.9/5 rating</span>
                </div>
                <div className="w-px h-5 bg-[oklch(0.85_0.01_85)]" />
                <span className="font-sans text-sm text-[oklch(0.45_0.02_65)]">
                  <strong className="text-[oklch(0.30_0.06_160)]">10,000+</strong> families served
                </span>
                <div className="w-px h-5 bg-[oklch(0.85_0.01_85)] hidden sm:block" />
                <span className="font-sans text-sm text-[oklch(0.45_0.02_65)] hidden sm:inline">
                  Licensed in <strong className="text-[oklch(0.30_0.06_160)]">all 50 states</strong>
                </span>
              </div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[oklch(0.30_0.06_160)]/10">
                <img
                  src={HERO_IMAGE}
                  alt="Happy family enjoying time together"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                {/* Floating stat card */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[oklch(0.94_0.02_145)] flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-[oklch(0.30_0.06_160)]" />
                    </div>
                    <div>
                      <p className="font-serif text-2xl text-[oklch(0.30_0.06_160)]">$4,800</p>
                      <p className="font-sans text-xs text-[oklch(0.55_0.01_65)]">Avg. annual savings</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[oklch(0.65_0.16_30)]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[oklch(0.88_0.04_145)]/40 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[oklch(0.30_0.06_160)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: 60, suffix: "%", label: "Average premium savings" },
              { value: 50, suffix: "+", label: "Top-rated carriers" },
              { value: 10000, suffix: "+", label: "Families covered" },
              { value: 98, suffix: "%", label: "Customer satisfaction" },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="font-sans text-sm sm:text-base text-[oklch(0.80_0.02_145)]">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHAT IS MEDICAL UNDERWRITING
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 section-accented relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[oklch(0.65_0.16_30)] mb-4 block">
                Why Pay More?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[oklch(0.22_0.03_65)] leading-tight mb-6">
                Medically underwritten plans reward your good health
              </h2>
              <p className="font-sans text-lg text-[oklch(0.45_0.02_65)] leading-relaxed mb-8">
                Unlike standard marketplace plans that charge everyone the same rate regardless of health status, medically underwritten policies evaluate your individual health profile. If you're healthy, you qualify for significantly lower premiums — often 40-60% less than ACA marketplace rates.
              </p>
              <div className="space-y-4">
                {[
                  "Personalized rates based on your actual health",
                  "Same comprehensive coverage from top carriers",
                  "Ideal for individuals, families & self-employed",
                  "Plans available in all 50 states",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[oklch(0.30_0.06_160)] mt-0.5 shrink-0" />
                    <span className="font-sans text-[oklch(0.35_0.02_65)]">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl shadow-[oklch(0.30_0.06_160)]/5 border border-[oklch(0.92_0.01_85)]">
                <h3 className="font-serif text-2xl text-[oklch(0.22_0.03_65)] mb-8">
                  See the difference
                </h3>
                <div className="space-y-6">
                  {/* Standard plan */}
                  <div className="p-5 rounded-xl bg-[oklch(0.97_0.005_85)] border border-[oklch(0.92_0.01_85)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans text-sm font-medium text-[oklch(0.55_0.01_65)]">Standard ACA Plan</span>
                      <span className="font-sans text-xs px-2.5 py-1 bg-[oklch(0.92_0.01_85)] rounded-full text-[oklch(0.55_0.01_65)]">Typical rate</span>
                    </div>
                    <p className="font-serif text-3xl text-[oklch(0.45_0.02_65)]">$850<span className="font-sans text-base text-[oklch(0.55_0.01_65)]">/mo</span></p>
                  </div>
                  {/* Underwritten plan */}
                  <div className="p-5 rounded-xl bg-[oklch(0.94_0.02_145)]/50 border-2 border-[oklch(0.30_0.06_160)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans text-sm font-medium text-[oklch(0.30_0.06_160)]">Medically Underwritten</span>
                      <span className="font-sans text-xs px-2.5 py-1 bg-[oklch(0.30_0.06_160)] rounded-full text-white">Your rate</span>
                    </div>
                    <p className="font-serif text-3xl text-[oklch(0.30_0.06_160)]">$340<span className="font-sans text-base text-[oklch(0.40_0.06_160)]">/mo</span></p>
                  </div>
                  {/* Savings callout */}
                  <div className="flex items-center justify-center gap-2 py-3 px-4 bg-[oklch(0.65_0.16_30)]/10 rounded-xl">
                    <TrendingDown className="w-5 h-5 text-[oklch(0.65_0.16_30)]" />
                    <span className="font-sans font-semibold text-[oklch(0.65_0.16_30)]">
                      You save $6,120 per year
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        className="py-20 sm:py-28 relative"
        style={{
          backgroundImage: `url(${HOW_IT_WORKS_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for readability — light watercolor bg so use dark text */}
        <div className="absolute inset-0 bg-[oklch(0.98_0.008_85)]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[oklch(0.65_0.16_30)] mb-4 block">
                How It Works
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[oklch(0.22_0.03_65)] leading-tight max-w-2xl mx-auto">
                From quote to coverage in four simple steps
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FileText,
                step: "01",
                title: "Share your details",
                desc: "Answer a few simple health and lifestyle questions. It takes less than 3 minutes.",
              },
              {
                icon: Stethoscope,
                step: "02",
                title: "Get underwritten",
                desc: "Our system matches your health profile against 50+ carriers for the best rates.",
              },
              {
                icon: Users,
                step: "03",
                title: "Compare plans",
                desc: "Review personalized quotes side-by-side with clear coverage breakdowns.",
              },
              {
                icon: BadgeCheck,
                step: "04",
                title: "Enroll & save",
                desc: "Choose your plan and enroll. Our advisors handle all the paperwork for you.",
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-[oklch(0.30_0.06_160)]/5 border border-white/60 h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[oklch(0.94_0.02_145)] flex items-center justify-center group-hover:bg-[oklch(0.30_0.06_160)] transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-[oklch(0.30_0.06_160)] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="font-serif text-3xl text-[oklch(0.85_0.01_85)]">{item.step}</span>
                  </div>
                  <h3 className="font-serif text-xl text-[oklch(0.22_0.03_65)] mb-3">{item.title}</h3>
                  <p className="font-sans text-[oklch(0.45_0.02_65)] leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CARRIER LOGOS
      ═══════════════════════════════════════════════════════ */}
      <section id="carriers" className="py-20 sm:py-24 section-accented relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[oklch(0.65_0.16_30)] mb-4 block">
                Trusted Carriers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[oklch(0.22_0.03_65)] leading-tight max-w-2xl mx-auto mb-4">
                Plans from every major health insurance company
              </h2>
              <p className="font-sans text-lg text-[oklch(0.45_0.02_65)] max-w-xl mx-auto">
                We partner with all the top-rated carriers on the marketplace so you always get the best rate.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {CARRIERS.map((carrier, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-20 sm:h-24 bg-white rounded-xl border border-[oklch(0.92_0.01_85)] hover:border-[oklch(0.30_0.06_160)]/30 hover:shadow-md transition-all duration-200 px-4"
                >
                  <span className="font-sans font-semibold text-sm sm:text-base text-[oklch(0.40_0.06_160)] text-center leading-tight">
                    {carrier}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BENEFITS
      ═══════════════════════════════════════════════════════ */}
      <section id="benefits" className="py-20 sm:py-28 bg-[oklch(0.96_0.012_85)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[oklch(0.65_0.16_30)] mb-4 block">
                Why Choose Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[oklch(0.22_0.03_65)] leading-tight max-w-2xl mx-auto">
                Everything you need, nothing you don't
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Dramatically lower premiums",
                desc: "Healthy individuals routinely save 40-60% compared to standard ACA marketplace rates. Your good health is finally rewarded.",
              },
              {
                icon: Shield,
                title: "Comprehensive coverage",
                desc: "Doctor visits, hospital stays, prescriptions, preventive care, mental health — all the coverage you expect from a major carrier.",
              },
              {
                icon: Heart,
                title: "Nationwide provider networks",
                desc: "Access the same broad PPO and HMO networks offered by top carriers. Keep your doctors and hospitals.",
              },
              {
                icon: Clock,
                title: "Fast, simple enrollment",
                desc: "Our streamlined application takes minutes, not hours. Most applicants receive a decision within 24-48 hours.",
              },
              {
                icon: Users,
                title: "Expert guidance included",
                desc: "Licensed advisors walk you through every option at no cost to you. We're paid by the carriers, not by you.",
              },
              {
                icon: BadgeCheck,
                title: "No-cost plan comparison",
                desc: "Compare quotes from 50+ carriers side-by-side. Our service is completely free — you'll never pay a broker fee.",
              },
            ].map((benefit, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-[oklch(0.92_0.01_85)] h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-[oklch(0.94_0.02_145)] flex items-center justify-center mb-6 group-hover:bg-[oklch(0.30_0.06_160)] transition-colors duration-300">
                    <benefit.icon className="w-7 h-7 text-[oklch(0.30_0.06_160)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-xl text-[oklch(0.22_0.03_65)] mb-3">{benefit.title}</h3>
                  <p className="font-sans text-[oklch(0.45_0.02_65)] leading-relaxed">{benefit.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 section-accented">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[oklch(0.65_0.16_30)] mb-4 block">
                Real Stories
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[oklch(0.22_0.03_65)] leading-tight">
                Hear from families who switched
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: TESTIMONIAL_1,
                name: "Patricia M.",
                location: "Austin, TX",
                quote: "I was paying $1,100/month for my family through the marketplace. After switching to a medically underwritten plan, we're down to $480. Same Blue Cross network, same doctors. I wish I'd known about this years ago.",
                savings: "$7,440/yr saved",
              },
              {
                img: TESTIMONIAL_2,
                name: "Robert K.",
                location: "Denver, CO",
                quote: "As a self-employed consultant, health insurance was my biggest expense. The team here found me a Cigna plan that cut my premium nearly in half. The whole process took about 20 minutes.",
                savings: "$5,280/yr saved",
              },
              {
                img: TESTIMONIAL_3,
                name: "Michelle L.",
                location: "Seattle, WA",
                quote: "I was skeptical at first — how could the same coverage cost so much less? But the advisor explained everything clearly. My UnitedHealthcare plan has better coverage than what I had before, at 45% less.",
                savings: "$4,920/yr saved",
              },
            ].map((testimonial, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-[oklch(0.92_0.01_85)] h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[oklch(0.75_0.15_85)] text-[oklch(0.75_0.15_85)]" />
                    ))}
                  </div>
                  <p className="font-sans text-[oklch(0.35_0.02_65)] leading-relaxed mb-6 flex-1 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4 pt-5 border-t border-[oklch(0.92_0.01_85)]">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-sans font-semibold text-[oklch(0.22_0.03_65)]">{testimonial.name}</p>
                      <p className="font-sans text-sm text-[oklch(0.55_0.01_65)]">{testimonial.location}</p>
                    </div>
                    <span className="font-sans text-xs font-semibold px-3 py-1.5 bg-[oklch(0.94_0.02_145)] text-[oklch(0.30_0.06_160)] rounded-full">
                      {testimonial.savings}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════ */}
      <section id="faq" className="py-20 sm:py-28 bg-[oklch(0.96_0.012_85)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="font-sans text-sm font-semibold tracking-widest uppercase text-[oklch(0.65_0.16_30)] mb-4 block">
                Common Questions
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[oklch(0.22_0.03_65)] leading-tight">
                Frequently asked questions
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[oklch(0.92_0.01_85)]">
              <FAQItem
                question="What is medically underwritten health insurance?"
                answer="Medically underwritten health insurance evaluates your individual health status, medical history, and lifestyle to determine your premium. Unlike ACA marketplace plans that use community rating (everyone pays the same), underwritten plans reward healthy individuals with significantly lower rates — often 40-60% less."
              />
              <FAQItem
                question="Who qualifies for medically underwritten plans?"
                answer="Generally, individuals and families in good health who don't have significant pre-existing conditions. If you're relatively healthy, exercise regularly, and don't use tobacco, you're likely to qualify for excellent rates. Our advisors can quickly assess your eligibility at no cost."
              />
              <FAQItem
                question="Are these plans ACA-compliant?"
                answer="Medically underwritten plans operate outside the ACA marketplace. While they may not include all ACA essential health benefits, they offer comprehensive coverage including doctor visits, hospital stays, prescriptions, and preventive care. Many plans also include dental and vision. Your advisor will explain exactly what's covered."
              />
              <FAQItem
                question="Which insurance companies offer these plans?"
                answer="We work with all major carriers including UnitedHealthcare, Blue Cross Blue Shield, Aetna, Cigna, Humana, Kaiser Permanente, Anthem, and many more. This means you get access to the same trusted networks and brand-name coverage — just at a lower price."
              />
              <FAQItem
                question="How much can I actually save?"
                answer="Savings vary based on your age, location, health status, and chosen plan. On average, our clients save $4,800 per year compared to standard marketplace rates. Some families save over $7,000 annually. Get a free quote to see your personalized savings estimate."
              />
              <FAQItem
                question="Is there any cost to use your service?"
                answer="Absolutely not. Our service is 100% free to you. We're compensated by the insurance carriers when you enroll, so there's never a broker fee or hidden charge. You'll pay the same premium (or less) as going directly to the carrier."
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <section id="get-quote" className="py-20 sm:py-28 bg-[oklch(0.30_0.06_160)] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[oklch(0.35_0.07_160)] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[oklch(0.25_0.05_160)] rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl opacity-50" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Clock className="w-4 h-4 text-[oklch(0.80_0.02_145)]" />
              <span className="font-sans text-sm text-[oklch(0.80_0.02_145)]">
                Free quotes in under 3 minutes
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Ready to stop overpaying for health insurance?
            </h2>
            <p className="font-sans text-lg sm:text-xl text-[oklch(0.80_0.02_145)] leading-relaxed mb-10 max-w-xl mx-auto">
              Join thousands of families who are saving an average of $4,800 per year with medically underwritten health insurance plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[oklch(0.65_0.16_30)] hover:bg-[oklch(0.58_0.18_30)] text-white font-sans font-semibold text-lg rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-[oklch(0.65_0.16_30)]/30 hover:-translate-y-0.5"
              >
                Get Your Free Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:+18005551234"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/30 hover:border-white/60 text-white font-sans font-semibold text-lg rounded-full transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                Call (800) 555-1234
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className="py-12 sm:py-16 bg-[oklch(0.22_0.03_65)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-[oklch(0.65_0.16_30)]" />
                <span className="font-serif text-xl text-white">HealthSave</span>
              </div>
              <p className="font-sans text-sm text-[oklch(0.60_0.01_85)] leading-relaxed">
                Helping healthy Americans find affordable health insurance through medically underwritten plans from top carriers.
              </p>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-white mb-4">Plans</h4>
              <div className="space-y-2.5">
                {["Individual Plans", "Family Plans", "Self-Employed", "Short-Term Plans"].map((link) => (
                  <a key={link} href="#" className="block font-sans text-sm text-[oklch(0.60_0.01_85)] hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-white mb-4">Resources</h4>
              <div className="space-y-2.5">
                {["Insurance Guide", "FAQ", "Blog", "Savings Calculator"].map((link) => (
                  <a key={link} href="#" className="block font-sans text-sm text-[oklch(0.60_0.01_85)] hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-sans font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2.5">
                <a href="tel:+18005551234" className="block font-sans text-sm text-[oklch(0.60_0.01_85)] hover:text-white transition-colors">
                  (800) 555-1234
                </a>
                <a href="mailto:help@healthsave.com" className="block font-sans text-sm text-[oklch(0.60_0.01_85)] hover:text-white transition-colors">
                  help@healthsave.com
                </a>
                <p className="font-sans text-sm text-[oklch(0.60_0.01_85)]">
                  Mon-Fri 8am-8pm EST
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-[oklch(0.35_0.02_65)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-sans text-xs text-[oklch(0.50_0.01_85)]">
                &copy; {new Date().getFullYear()} HealthSave. All rights reserved. Licensed insurance agency.
              </p>
              <div className="flex items-center gap-6">
                {["Privacy Policy", "Terms of Service", "Disclosures"].map((link) => (
                  <a key={link} href="#" className="font-sans text-xs text-[oklch(0.50_0.01_85)] hover:text-white transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
