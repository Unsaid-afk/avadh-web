import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const contactInfo = {
  phone: "8401772172",
  email: "jaiswalsales2014@outlook.com",
  location: "Tejgadh, Gujarat",
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">JS</span>
              </div>
              <span className="font-semibold text-lg">Jaiswal Sales</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted partner for sales and distribution in Tejgadh and beyond. 
              Delivering reliability since 2014.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-phone"
              >
                <Phone className="h-4 w-4" />
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-footer-email"
              >
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {contactInfo.location}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              &copy; {currentYear} Jaiswal Sales. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Made with care in Tejgadh, India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
