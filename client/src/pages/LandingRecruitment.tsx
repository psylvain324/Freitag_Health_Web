import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/joVpfAwXfksykrvCYRdrqC/freitag_logo_hires_1022d117.png";
const TAMPA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/QAp5dBwcR69Bs4yRELPLtH/tampa_skyline_hero_f0df03fc.webp";
const MAIN_CTA_URL = "/apply";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const checkpoints = [
  "Top producer in one of the highest-producing offices in the nation",
  "Direct access to a leader invested in your growth",
  "Proven mentorship and training programs",
  "National network with industry connections",
];

export default function LandingRecruitment() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <header className="bg-navy py-4">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img
              src={LOGO_URL}
              alt="Freitag Health Insurance"
              className="h-12 object-contain brightness-0 invert"
            />
          </Link>
          <a href={MAIN_CTA_URL}>
            <Button className="bg-gold hover:bg-gold-dark text-navy font-semibold rounded-full">
              Join Our Team
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
      </header>

      {/* Hero - My Story */}
      <section className="relative py-16 md:py-24 bg-cream overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="order-2 md:order-1"
            >
              <span className="text-gold font-semibold text-sm uppercase tracking-wider mb-4 block">
                My Story
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-navy leading-tight mb-6">
                From Agent to Leader — Why I Build Teams
              </h1>
              <p className="text-navy-light text-lg leading-relaxed mb-6">
                I started in this industry like many of you: curious, driven, and
                ready to make a difference. What I found was more than a job —
                it was a career with unlimited potential and a community that
                lifts each other up.
              </p>
              <p className="text-navy-light text-lg leading-relaxed mb-8">
                Today, I'm committed to helping the next generation discover that
                same opportunity. When you join my team, you're not just another
                agent — you're a partner in building something meaningful.
              </p>
              <a href={MAIN_CTA_URL}>
                <Button
                  size="lg"
                  className="bg-periwinkle hover:bg-periwinkle-light text-white font-bold rounded-full px-8 py-6"
                >
                  Start Your Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 md:order-2 relative overflow-hidden rounded-2xl shadow-xl"
            >
              <img
                src="/images/Steph_FG.avif"
                alt="Stephanie Freitag"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl shadow-xl"
            >
              <img
                src="/images/Team_Home_1.avif"
                alt="Team collaboration"
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-6">
                Why Work With Me
              </h2>
              <p className="text-navy-light text-lg leading-relaxed mb-6">
                Stephanie Freitag has been one of the highest producers in one
                of the highest-producing offices in the country. When you join
                her team, you work directly with a proven leader who is invested
                in your success.
              </p>
              <ul className="space-y-3">
                {checkpoints.map((item, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={i * 0.5}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-periwinkle mt-0.5 shrink-0" />
                    <span className="text-navy-light">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tampa Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src={TAMPA_IMG}
            alt="Tampa, Florida skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="relative z-10 container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="text-gold font-semibold">Tampa, Florida</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Based in the Sunshine State
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Our headquarters are in beautiful Tampa, FL — but our team works
              nationwide. Whether you're local or remote, you'll have the
              support and resources to build an incredible career.
            </p>
            <a href={MAIN_CTA_URL}>
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-dark text-navy font-bold rounded-full px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Start Your Journey Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
              Ready to Change Your Life?
            </h2>
            <p className="text-navy-light text-lg mb-8 leading-relaxed">
              Take the first step toward a rewarding career in health insurance.
              Schedule a free 30-minute career screening call with our team and
              discover if this opportunity is right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={MAIN_CTA_URL}>
                <Button
                  size="lg"
                  className="bg-periwinkle hover:bg-periwinkle-light text-white font-bold rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Schedule a Career Call
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-navy-light text-sm">
              <a
                href="tel:7272493807"
                className="flex items-center gap-2 hover:text-periwinkle transition-colors"
              >
                <Phone className="w-4 h-4" />
                727-249-3807
              </a>
              <span className="hidden sm:inline text-white/30">|</span>
              <a
                href="mailto:ssfreitaginsurance@gmail.com"
                className="flex items-center gap-2 hover:text-periwinkle transition-colors"
              >
                <Mail className="w-4 h-4" />
                ssfreitaginsurance@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-8">
        <div className="container text-center">
          <img
            src={LOGO_URL}
            alt="Freitag Health Insurance"
            className="h-10 object-contain brightness-0 invert mx-auto mb-4"
          />
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Freitag Health Insurance. All
            rights reserved.
          </p>
          <p className="text-white/35 text-xs mt-2">
            5701 E Hillsborough Ave #1120, Tampa, FL 33610
          </p>
        </div>
      </footer>
    </div>
  );
}
