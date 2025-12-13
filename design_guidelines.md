# Jaiswal Sales Website Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from premium B2B service platforms (Stripe, Linear) with emphasis on trust-building and professional presentation. Ultra-modern flat design with sophisticated animation system.

## Core Design Principles

### Dual Theme System
**Light Mode**
- Background: Crisp White (#FFFFFF) and light gray (#F5F5F5)
- Text: Dark Gray (#2C3E50) / Black for maximum readability
- Card backgrounds: White with subtle shadows
- Feel: Airy, professional, trustworthy

**Dark Mode**
- Background: Deep slate blue (#0F172A) / Soft black (#1A1A2E)
- Text: Pure White (#FFFFFF) / Light gray (#E2E8F0)
- Card backgrounds: Elevated dark surfaces (#1E293B)
- Feel: Premium, high-tech, modern

**Theme Toggle**: Prominent toggle switch in top-right header with smooth transition animation (300ms ease-in-out)

### Color Palette
- **Primary Brand**: Deep Teal (#004D40)
- **Accent/CTA**: Muted Gold/Amber (#F59E0B)
- **Neutral Grays**: Tailwind slate scale
- **Success/Trust**: Emerald tones for verification badges

## Typography
- **Font Family**: Inter or Poppins (Google Fonts)
- **Hierarchy**: 
  - Hero Headline: text-5xl/text-6xl, font-bold
  - Section Headers: text-3xl/text-4xl, font-semibold
  - Body Text: text-base/text-lg, font-normal
  - Small Print: text-sm, font-medium

## Layout System
**Spacing**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
**Containers**: max-w-7xl with generous horizontal padding (px-6 to px-12)
**Section Padding**: py-16 mobile, py-24 desktop

## Animation Framework

### Background Network Graphic
- Continuous slow-motion abstract connection nodes/lines
- Subtle parallax movement (20-30% scroll speed)
- SVG-based with low opacity (0.1 light mode, 0.05 dark mode)
- Positioned absolutely behind content

### Micro-Animations
- **Buttons**: Scale on hover (1.05), shadow lift, 200ms transition
- **Cards**: Lift effect (translateY(-8px)), shadow enhancement on hover
- **Icons**: Color shift + rotation (5-10deg) on hover
- **Form Inputs**: Border glow animation on focus

### Parallax Elements
- Hero background: Slow upward drift
- Service cards: Staggered reveal on scroll
- Contact section: Subtle depth layering

## Component Library

### Hero Section
- Full viewport height (min-h-screen)
- Animated tagline with typewriter reveal effect (2s duration)
- Gold CTA button with glow effect
- Network graphic background with continuous animation
- Theme toggle positioned top-right

### About Us Section
- Two-column layout (60/40 split)
- Left: Owner image placeholder (rounded-2xl, shadow-2xl, max-w-md)
- Right: Story text with "Est. 2014" badge
- Subtle parallax on image

### Services Grid
- Four-column desktop (grid-cols-4), single column mobile
- Each card: Icon top, title, description
- Hover state: Icon color transition to accent gold, card lift
- Icons: 64px size, transition duration 300ms
- Services: B2B Distribution, Retail Sales Management, Logistics & Supply Chain Consulting, Local Market Penetration

### Contact Section (Critical Anchor)
- Prominent heading: "Get in Touch with Jaiswal Sales"
- Two-column layout: Form (left) + Contact Info (right)
- **Contact Details** (clickable/copyable with copy-to-clipboard functionality):
  - Owner: Jatin Jaiswal (text-xl, font-semibold)
  - Phone: 8401772172 (tel: link with phone icon)
  - Personal Email: jatinjaiswal1977@gmail.com (mailto: link)
  - Firm Email: jaiswalsales2014@outlook.com (mailto: link)
- Map Integration: Embedded iframe for Tejgadh with styled border
- Inquiry Form: Name, Email, Phone, Message fields with validation states

### Footer
- Three-column layout: Quick Links, Contact Summary, Copyright
- Minimal padding (py-8)
- Border-top separator

## Images
**Hero Section**: Abstract business/distribution imagery showing professional supply chain operations or modern warehouse facilities (wide panoramic, 1920x800, subtle overlay for text readability)
**About Section**: Professional headshot placeholder for Jatin Jaiswal (square format, 400x400)
**Services Icons**: Use Heroicons for service category representation

## Accessibility
- WCAG AA contrast ratios in both themes
- Focus states with visible outlines (ring-2 ring-offset-2)
- Keyboard navigation fully supported
- ARIA labels on all interactive elements

## Responsive Breakpoints
- Mobile: <768px (single column, stacked layout)
- Tablet: 768px-1024px (two-column grids)
- Desktop: >1024px (full multi-column layouts)