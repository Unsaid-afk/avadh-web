import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Copy,
  Check,
  Send,
  Building2,
} from "lucide-react";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const contactInfo = {
  owner: "Jatin Jaiswal",
  phone: "8401772172",
  personalEmail: "jatinjaiswal1977@gmail.com",
  firmEmail: "jaiswalsales2014@outlook.com",
  location: "Tejgadh, Gujarat, India",
};

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const response = await apiRequest("POST", "/api/inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

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

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      title: "Copied!",
      description: `${field} copied to clipboard.`,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const onSubmit = (data: InsertInquiry) => {
    mutation.mutate(data);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Badge className="mb-4" variant="secondary">
            Contact Us
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get in Touch with Jaiswal Sales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to streamline your distribution? Contact us today for a consultation 
            and discover how we can help your business grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <Card
            className={`transition-all duration-700 delay-100 overflow-visible ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Send an Inquiry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Your phone number"
                              {...field}
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your requirements..."
                            className="min-h-[120px] resize-none"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground border-accent-border"
                    disabled={mutation.isPending}
                    data-testid="button-submit-inquiry"
                  >
                    {mutation.isPending ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg className="h-4 w-4" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                        </span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <Card className="overflow-visible">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Owner</p>
                      <p className="font-semibold" data-testid="text-contact-owner">
                        {contactInfo.owner}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="font-semibold hover:text-primary transition-colors"
                        data-testid="link-phone"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(contactInfo.phone, "Phone")}
                    data-testid="button-copy-phone"
                  >
                    {copiedField === "Phone" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Personal Email</p>
                      <a
                        href={`mailto:${contactInfo.personalEmail}`}
                        className="font-semibold hover:text-primary transition-colors block truncate"
                        data-testid="link-personal-email"
                      >
                        {contactInfo.personalEmail}
                      </a>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(contactInfo.personalEmail, "Personal Email")
                    }
                    data-testid="button-copy-personal-email"
                    className="flex-shrink-0"
                  >
                    {copiedField === "Personal Email" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">Firm Email</p>
                      <a
                        href={`mailto:${contactInfo.firmEmail}`}
                        className="font-semibold hover:text-accent transition-colors block truncate"
                        data-testid="link-firm-email"
                      >
                        {contactInfo.firmEmail}
                      </a>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      copyToClipboard(contactInfo.firmEmail, "Firm Email")
                    }
                    data-testid="button-copy-firm-email"
                    className="flex-shrink-0"
                  >
                    {copiedField === "Firm Email" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold" data-testid="text-location">
                      {contactInfo.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-visible">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-5 w-5 text-primary" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="rounded-lg overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14729.89!2d73.95!3d22.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4b!2sTejgadh%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Tejgadh Location Map"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
