import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export type NavItem = {
  href: string;
  label: string;
  sectionId: string;
};

type PageHeaderProps = {
  navItems: NavItem[];
  ctaHref: string;
  ctaLabel: string;
};

function NavLink({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
        isActive ? "text-accent font-semibold" : "text-foreground/80 hover:text-accent"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-1 left-4 right-4 h-0.5 bg-accent origin-left rounded-full transition-transform duration-300 ease-out ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </a>
  );
}

export default function PageHeader({ navItems, ctaHref, ctaLabel }: PageHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.sectionId);
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const sorted = intersecting.sort(
          (a, b) =>
            (a.boundingClientRect?.top ?? 0) - (b.boundingClientRect?.top ?? 0)
        );
        setActiveSection(sorted[0].target.id);
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [navItems.map((n) => n.sectionId).join(",")]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const headerHeight = scrolled ? "h-12 md:h-14" : "h-14 md:h-16";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: "#ffffff",
        boxShadow: scrolled
          ? "0 10px 40px -10px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.05)"
          : "0 1px 3px rgb(0 0 0 / 0.04)",
      }}
      transition={{
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="fixed top-0 left-0 right-0 z-50 rounded-b-xl"
    >
      <div className={`container flex items-center justify-between transition-[height] duration-300 ${headerHeight}`}>
        <Link href="/">
          <motion.div
            className="flex items-center gap-2.5 shrink-0 h-8 md:h-9"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="/images/F_Insurance.png" alt="" className="h-full w-auto object-contain object-left" />
            <span style={{ marginLeft: "-0.95em" }} className="header-logo-text text-lg md:text-xl whitespace-nowrap">
              reitag Health Insurance
            </span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.sectionId}
              href={item.href}
              label={item.label}
              isActive={activeSection === item.sectionId}
            />
          ))}
        </nav>

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
          <Link href={ctaHref} className="no-underline [&>*]:text-white">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-200 shadow-sm cursor-pointer"
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </Link>

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

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-14 md:hidden bg-background/80 backdrop-blur-sm z-40"
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
                {navItems.map((item) => (
                  <a
                    key={item.sectionId}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 px-4 text-base font-medium rounded-lg transition-colors ${
                      activeSection === item.sectionId
                        ? "text-accent font-semibold bg-accent/10"
                        : "text-foreground/90 hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <Link href={ctaHref} onClick={() => setMobileOpen(false)} className="block no-underline [&>*]:text-white">
                  <span className="flex items-center justify-center gap-2 py-3 px-4 mt-4 rounded-xl bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors cursor-pointer">
                    {ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
