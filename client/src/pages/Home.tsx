import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Users, Shield, Phone } from "lucide-react";
import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";

const TAMPA_SKYLINE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/joVpfAwXfksykrvCYRdrqC/tampa-skyline-56zmoZaofPxvTMLiTAEr8M.webp";
const RECRUITMENT_HERO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/joVpfAwXfksykrvCYRdrqC/recruitment-hero-gsrsTdfejYax8RhANf6hdi.webp";
const INSURANCE_HERO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/joVpfAwXfksykrvCYRdrqC/insurance-hero-PCdMVjsBEDnpHBBH6MDjmE.webp";

const STATS = [
  { value: "100+", label: "Families Helped" },
  { value: "12+", label: "Team Members" },
  { value: "6+", label: "Years in Business" },
  { value: "Free", label: "Quote to Compare" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background/96 text-foreground">
      <SiteHeader />

      {/* Hero - careers-style full-viewport with Tampa skyline */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 md:pt-28">
        <div className="absolute inset-0">
          <img
            src={TAMPA_SKYLINE}
            alt="Tampa skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75" />
        </div>

        <div className="relative z-10 container text-center -mt-6 md:-mt-8">
          {/* Eyebrow with decorative accents */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400/50" />
              <span className="text-amber-200/90 font-medium text-xs sm:text-sm uppercase tracking-[0.3em]">
                Tampa, FL & Nationwide
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400/50" />
            </div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          </motion.div>

          {/* Headline - gradient shimmer effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5 max-w-2xl mx-auto [filter:drop-shadow(0_2px_12px_rgba(0,0,0,0.35))]"
          >
            <h1 className="hero-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold leading-[1.5] tracking-tight">
              Build a Career You Love.
              <br />
              <span className="tracking-wide">Get the Coverage Your Family Deserves.</span>
            </h1>
          </motion.div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-light tracking-wide max-w-lg mx-auto mb-2"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            Join one of the fastest-growing health insurance teams in the country, or find the perfect plan for you and your family.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm sm:text-base text-amber-200/80 font-light tracking-wider mb-8"
          >
            No experience needed · No obligation to compare
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/join">
                <Button
                  size="default"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold rounded-full px-8 py-6 text-base min-w-[15.5rem] h-[3.75rem] sm:min-w-[16rem] sm:h-[3.75rem] inline-flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 w-4 h-4 shrink-0" />
                  Join Our Team
                </Button>
              </Link>
              <Link href="/insure">
                <Button
                  size="default"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold rounded-full px-8 py-6 text-base min-w-[15.5rem] h-[3.75rem] sm:min-w-[16rem] sm:h-[3.75rem] inline-flex items-center justify-center"
                >
                  Get Covered Today
                  <ArrowRight className="ml-2 w-4 h-4 shrink-0" />
                </Button>
              </Link>
            </div>
            <a
              href="tel:727-249-3807"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call 727-249-3807
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats section - outside hero */}
      <section className="py-12 md:py-16 bg-muted/40 border-y border-border/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto"
          >
            {STATS.map(({ value, label }, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Two-path cards - Join Our Team | Get Covered Today */}
      <section className="section-padding section-accented">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Join Our Team */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="group rounded-2xl shadow-lg hover:shadow-xl border border-border/50 transition-all duration-500 overflow-hidden">
                {/* Careers + icon - above image */}
                <div className="flex items-center gap-3 px-4 pt-4 pb-2 bg-gradient-to-b from-white via-[oklch(0.99_0.012_165)]/2 to-white border-b border-[oklch(0.94_0.02_165)]/8">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <span className="text-accent font-semibold text-sm uppercase tracking-wider">Careers</span>
                </div>
                {/* Image with white text overlay inside */}
                <Link href="/join">
                  <div className="relative overflow-hidden aspect-[4/3] block">
                    <img
                      src={RECRUITMENT_HERO}
                      alt="Join our team"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Join Our Team
                      </h2>
                      <p className="text-white/90">
                        Start your career in health insurance with unlimited earning potential.
                      </p>
                    </div>
                  </div>
                </Link>
                {/* Learn More - below image */}
                <Link href="/join" className="flex items-center gap-2 px-6 py-4 bg-gradient-to-b from-white via-[oklch(0.99_0.012_165)]/2 to-white border-t border-[oklch(0.94_0.02_165)]/8 hover:via-[oklch(0.99_0.012_165)]/10 transition-colors group-hover:gap-3">
                  <span className="font-semibold text-accent">Learn More</span>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              </div>
            </motion.div>

            {/* Get Covered Today */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="group rounded-2xl shadow-lg hover:shadow-xl border border-border/50 transition-all duration-500 overflow-hidden">
                {/* Insurance + icon - above image */}
                <div className="flex items-center gap-3 px-4 pt-4 pb-2 bg-gradient-to-b from-white via-[oklch(0.99_0.012_165)]/2 to-white border-b border-[oklch(0.94_0.02_165)]/8">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <span className="text-accent font-semibold text-sm uppercase tracking-wider">Insurance</span>
                </div>
                {/* Image with white text overlay inside */}
                <Link href="/insure">
                  <div className="relative overflow-hidden aspect-[4/3] block">
                    <img
                      src={INSURANCE_HERO}
                      alt="Get covered"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Get Covered Today
                      </h2>
                      <p className="text-white/90">
                        Find the perfect health insurance plan for you and your family.
                      </p>
                    </div>
                  </div>
                </Link>
                {/* Get a Quote - below image */}
                <Link href="/insure" className="flex items-center gap-2 px-6 py-4 bg-gradient-to-b from-white via-[oklch(0.99_0.012_165)]/2 to-white border-t border-[oklch(0.94_0.02_165)]/8 hover:via-[oklch(0.99_0.012_165)]/10 transition-colors group-hover:gap-3">
                  <span className="font-semibold text-accent">Get a Quote</span>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
