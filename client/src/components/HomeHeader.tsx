import { Link } from "wouter";
import { motion } from "framer-motion";

/** Minimal header for the home landing page - logo only, top left */
export default function HomeHeader({
  overlay,
}: {
  /** When true, use transparent bg and light text for dark hero backgrounds */
  overlay?: boolean;
}) {
  return (
    <header
      className={
        overlay
          ? "fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm border-b border-white/10"
          : "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50"
      }
    >
      <div className="container flex items-center h-16 md:h-20">
        <Link href="/">
          <motion.div
            className={`flex items-center gap-3 shrink-0 h-10 md:h-12 ${overlay ? "text-white" : ""}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src="/images/F_Insurance.png"
              alt=""
              className={`h-full w-auto max-h-full object-contain object-left ${overlay ? "brightness-0 invert opacity-95" : ""}`}
            />
            <span
              style={{ marginLeft: "-0.95em" }}
              className={`text-xl md:text-2xl whitespace-nowrap font-semibold ${overlay ? "text-white" : "header-logo-text"}`}
            >
              reitag Health Insurance
            </span>
          </motion.div>
        </Link>
      </div>
    </header>
  );
}
