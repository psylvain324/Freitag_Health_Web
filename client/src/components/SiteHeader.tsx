import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/#about", label: "About" },
  { href: "/#benefits", label: "Why Join" },
  { href: "/#testimonials", label: "Success Stories" },
  { href: "/#contact", label: "Contact" },
];

function NavLink({
  href,
  label,
  index,
  onClick,
}: {
  href: string;
  label: string;
  index: number;
  onClick?: () => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className="group relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-300"
    >
      {label}
      <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out rounded-full" />
    </motion.a>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    handleScroll(); // init
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: scrolled ? "hsl(var(--background) / 0.92)" : "hsl(var(--background) / 1)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        boxShadow: scrolled ? "0 4px 20px -4px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.03)" : "0 1px 3px rgb(0 0 0 / 0.04)",
        borderBottomWidth: scrolled ? 1 : 0,
        borderBottomColor: scrolled ? "hsl(var(--border) / 0.5)" : "hsl(var(--border) / 0)",
      }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="fixed top-0 left-0 right-0 z-50 rounded-b-xl border-b"
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-3 shrink-0 h-10 md:h-12"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/images/F_Insurance.png"
              alt=""
              className="h-full w-auto max-h-full object-contain object-left"
            />
            <span style={{marginLeft: '-0.95em'}} className="header-logo-text text-xl md:text-2xl whitespace-nowrap">
              reitag Health Insurance
            </span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <NavLink key={item.href} {...item} index={i} />
          ))}
        </nav>

        {/* Social icons (between Contact and button) + CTA + Mobile Menu */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:flex items-center gap-1" aria-label="Social links">
            <motion.a href="#" aria-label="LinkedIn" className="p-1.5 rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <img src="/images/LinkedIn_Logo.webp" alt="" className="h-5 w-5 object-contain" />
            </motion.a>
            <motion.a href="#" aria-label="Instagram" className="p-1.5 rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <img src="/images/Instagram_Logo.jpeg" alt="" className="h-5 w-5 object-contain rounded-sm" />
            </motion.a>
            <motion.a href="#" aria-label="Facebook" className="p-1.5 rounded-lg text-foreground/70 hover:text-accent hover:bg-accent/10 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <img src="/images/Facebook_Icon.png" alt="" className="h-5 w-5 object-contain" />
            </motion.a>
          </div>
          <motion.a
            href="/apply"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 shadow-sm"
          >
            Start Application
            <ArrowRight className="w-4 h-4" />
          </motion.a> 

          <motion.button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-foreground/80 hover:bg-accent/10 hover:text-accent transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 md:hidden bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              key="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden absolute left-0 right-0 top-full bg-background/95 backdrop-blur-xl border-t border-border/50 overflow-hidden z-50 shadow-lg"
            >
              <div className="container py-4 space-y-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="block py-3 px-4 text-base font-medium rounded-lg text-foreground/90 hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-center gap-2 py-3 px-4 mt-4 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
                >
                  Start Application
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
