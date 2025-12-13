import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">JS</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">Jaiswal Sales</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b">
          <nav className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="justify-start"
                onClick={() => scrollToSection(item.href)}
                data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
