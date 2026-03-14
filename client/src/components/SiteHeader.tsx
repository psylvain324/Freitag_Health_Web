import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: "#ffffff",
        boxShadow: scrolled
          ? "0 12px 48px -12px rgb(0 0 0 / 0.18), 0 6px 16px -6px rgb(0 0 0 / 0.08)"
          : "0 2px 10px rgb(0 0 0 / 0.06), 0 1px 4px rgb(0 0 0 / 0.04)",
      }}
      transition={{
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="fixed top-0 left-0 right-0 z-50 rounded-b-xl"
    >
      <div className="container flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-2.5 shrink-0 h-9 md:h-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/images/F_Insurance.png"
              alt=""
              className="h-full w-auto max-h-full object-contain object-left"
            />
            <span style={{ marginLeft: "-0.95em" }} className="header-logo-text text-lg md:text-xl whitespace-nowrap">
              reitag Health Insurance
            </span>
          </motion.div>
        </Link>

        {/* Social icons */}
        <div className="flex items-center gap-1" aria-label="Social links">
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
      </div>
    </motion.header>
  );
}
