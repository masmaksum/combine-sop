import { useState } from "react";
import { useTheme } from "next-themes";
import { Menu, X, LayoutGrid, List, Moon, Sun } from "lucide-react";

interface CRINavbarProps {
  viewMode: "card" | "diagram";
  onViewModeChange: (mode: "card" | "diagram") => void;
}

const navLinks = [
  { label: "Ringkasan", href: "#ringkasan" },
  { label: "Semua SOP", href: "#semua-sop" },
  { label: "Terintegrasi", href: "#terintegrasi" },
  { label: "Aktor & Dokumen", href: "#aktor-dokumen" },
  { label: "Pembaruan 2025", href: "#pembaruan-2025" },
  { label: "FAQ", href: "#faq" },
];

export default function CRINavbar({ viewMode, onViewModeChange }: CRINavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              C
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight">Combine Resource Institution</div>
              <div className="text-[0.65rem] font-mono text-muted-foreground tracking-wider uppercase">Workflow SOP</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* View toggle + mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              title={theme === "dark" ? "Mode terang" : "Mode gelap"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="hidden sm:flex items-center bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => onViewModeChange("card")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  viewMode === "card"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 inline mr-1" />
                Kartu
              </button>
              <button
                onClick={() => onViewModeChange("diagram")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  viewMode === "diagram"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-3.5 h-3.5 inline mr-1" />
                Diagram
              </button>
            </div>

            <button
              className="lg:hidden p-2 rounded-md hover:bg-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden py-3 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
