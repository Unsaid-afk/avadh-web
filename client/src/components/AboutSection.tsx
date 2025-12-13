import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Building2, Calendar, MapPin, Award } from "lucide-react";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Calendar, label: "Years of Experience", value: "10+" },
    { icon: Building2, label: "Business Partners", value: "200+" },
    { icon: MapPin, label: "Regions Served", value: "15+" },
    { icon: Award, label: "Products Distributed", value: "500+" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl" />
                <Card className="absolute inset-4 flex items-center justify-center overflow-visible">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary">JJ</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2" data-testid="text-owner-name">Jatin Jaiswal</h3>
                    <p className="text-muted-foreground">Founder & Owner</p>
                  </div>
                </Card>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <Badge className="mb-4" variant="secondary">
              About Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              A Legacy of Trust Since{" "}
              <span className="text-primary">2014</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded by Jatin Jaiswal in Tejgadh, Jaiswal Sales has grown from a small 
              local distribution operation to a trusted name in sales and distribution 
              across Gujarat. Our commitment to reliability, quality service, and 
              building lasting partnerships has been the cornerstone of our success.
            </p>
            <p className="text-muted-foreground mb-8">
              We specialize in B2B distribution, retail sales management, and logistics 
              consulting, helping businesses of all sizes streamline their supply chains 
              and reach their target markets efficiently. Our deep understanding of local 
              markets and established network ensures your products reach the right 
              customers at the right time.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-4 rounded-lg bg-muted/50 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <stat.icon className="h-6 w-6 text-primary mb-2" />
                  <p className="text-2xl font-bold" data-testid={`text-stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
