import { Link } from "wouter";
import { Linkedin, Instagram, Facebook } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-navy py-5">
      <div className="container">
        <div className="flex flex-nowrap items-center justify-between gap-4 text-xs text-white/50 min-w-0">
          <span className="shrink-0 whitespace-nowrap">&copy; 2026 Freitag Health Insurance. All rights reserved.</span>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="hover:text-white transition whitespace-nowrap">Home</Link>
            <Link href="/join" className="hover:text-white transition whitespace-nowrap">Join Our Team</Link>
          </div>
          <div className="flex items-center gap-2 shrink-0" aria-label="Social links">
            <a href="#" aria-label="LinkedIn" className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Instagram" className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
