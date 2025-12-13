import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Store, Package, MapPinned } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "B2B Distribution",
    description:
      "Comprehensive business-to-business distribution services with reliable logistics, timely deliveries, and competitive pricing for all your wholesale needs.",
  },
  {
    icon: Store,
    title: "Retail Sales Management",
    description:
      "End-to-end retail sales solutions including inventory management, merchandising support, and sales team training to maximize your market presence.",
  },
  {
    icon: Package,
    title: "Logistics & Supply Chain",
    description:
      "Strategic consulting services to optimize your supply chain operations, reduce costs, and improve efficiency across your distribution network.",
  },
  {
    icon: MapPinned,
    title: "Local Market Penetration",
    description:
      "Leverage our deep understanding of local markets and established relationships to successfully introduce and grow your products in new regions.",
  },
];

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-16 sm:py-24 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge className="mb-4" variant="secondary">
            Our Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Comprehensive Distribution Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From logistics to market penetration, we offer end-to-end services to help 
            your business grow and succeed in competitive markets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`relative group cursor-pointer transition-all duration-500 overflow-visible ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${hoveredIndex === index ? "-translate-y-2" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                    hoveredIndex === index
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <service.icon
                    className={`h-8 w-8 transition-transform duration-300 ${
                      hoveredIndex === index ? "rotate-6 scale-110" : ""
                    }`}
                  />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
              <div
                className={`absolute inset-0 rounded-lg border-2 border-accent/0 transition-all duration-300 pointer-events-none ${
                  hoveredIndex === index ? "border-accent/50" : ""
                }`}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
