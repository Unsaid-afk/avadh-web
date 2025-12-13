import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Reliable Sales and Distribution in Tejgadh and Beyond.";

  useEffect(() => {
    setIsVisible(true);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Est. 2014 - Tejgadh, Gujarat
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-primary">Jaiswal</span>{" "}
            <span>Sales</span>
          </h1>

          <div className="h-20 sm:h-16 mb-8 flex items-center justify-center">
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl">
              {typedText}
              <span className="inline-block w-0.5 h-6 sm:h-8 bg-accent ml-1 animate-blink" />
            </p>
          </div>

          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Your trusted partner for B2B distribution, retail sales management, and logistics 
            solutions across Tejgadh and surrounding regions.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-accent text-accent-foreground border-accent-border animate-pulse-glow"
              data-testid="button-inquire-now"
            >
              Inquire Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToAbout}
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
          </div>
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          aria-label="Scroll to about section"
          data-testid="button-scroll-down"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </button>
      </div>
    </section>
  );
}
