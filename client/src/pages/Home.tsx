import { NetworkBackground } from "@/components/NetworkBackground";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <NetworkBackground />
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
