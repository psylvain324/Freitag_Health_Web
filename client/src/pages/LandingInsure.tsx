import { Link } from "wouter";
import { ArrowRight, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

const RECRUITMENT_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/joVpfAwXfksykrvCYRdrqC/recruitment-hero-gsrsTdfejYax8RhANf6hdi.webp";
const INSURANCE_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/joVpfAwXfksykrvCYRdrqC/insurance-hero-PCdMVjsBEDnpHBBH6MDjmE.webp";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <header className="bg-navy py-3 shadow-[0_2px_10px_rgba(0,0,0,0.15),0_1px_4px_rgba(0,0,0,0.1)]">
        <div className="container flex items-center justify-center">
          <Link href="/">
            <div className="flex items-center gap-2.5 shrink-0 h-9 md:h-10">
              <img
                src="/images/F_Insurance.png"
                alt=""
                className="h-full w-auto max-h-full object-contain object-left brightness-0 invert opacity-95"
              />
              <span style={{ marginLeft: "-0.95em" }} className="text-lg md:text-xl whitespace-nowrap text-white font-semibold">
                reitag Health Insurance
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy leading-tight mb-6"
          >
            Freitag Health Insurance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-navy-light max-w-2xl mx-auto leading-relaxed"
          >
            Providing the best health insurance plans at the best prices for you and your family. Based in sunny Tampa, FL.
          </motion.p>
        </div>
      </section>

      {/* Landing Page Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Recruitment Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/careers">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={RECRUITMENT_HERO}
                      alt="Join our team"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center">
                        <Users className="w-5 h-5 text-navy" />
                      </div>
                      <span className="text-gold font-semibold text-sm uppercase tracking-wider">Careers</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                      Join Our Team
                    </h2>
                    <p className="text-white/80 mb-4">
                      Start your career in health insurance with unlimited earning potential.
                    </p>
                    <div className="flex items-center gap-2 text-gold group-hover:gap-3 transition-all duration-300">
                      <span className="font-semibold">Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Insurance Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/insurance">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={INSURANCE_HERO}
                      alt="Get covered"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-navy" />
                      </div>
                      <span className="text-gold font-semibold text-sm uppercase tracking-wider">Insurance</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                      Get Covered Today
                    </h2>
                    <p className="text-white/80 mb-4">
                      Find the perfect health insurance plan for you and your family.
                    </p>
                    <div className="flex items-center gap-2 text-gold group-hover:gap-3 transition-all duration-300">
                      <span className="font-semibold">Get a Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-8">
        <div className="container text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Freitag Health Insurance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
