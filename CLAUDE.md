# CLAUDE.md - Project Context for AI Assistants

## Project Overview

**Garden Center Exotic (Градински Център Екзотик)** - A Bulgarian garden center and flower shop website with two physical locations in Varna and Nova Zagora. The business has been operating since 1998 and specializes in premium imported flowers from Ecuador, Holland, and Turkey.

**Live URL:** https://gardenexotic.bg
**Language:** Bulgarian (bg-BG)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS custom properties
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Image Generation:** OpenRouter API with Gemini 2.5 Flash Image model

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (admin)/           # Admin panel routes
│   ├── produkti/          # Products pages with [slug] routing
│   ├── uslugi/            # Services page
│   ├── grizhi/            # Plant care guide
│   ├── blog/              # Blog section
│   ├── lokacii/           # Locations page with maps
│   ├── kontakti/          # Contact page
│   ├── za-nas/            # About us page
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Header, Footer, etc.
│   ├── sections/          # Page sections (Hero, CTA, etc.)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── constants.ts       # Site config, locations, services
│   ├── products.ts        # Product utilities
│   └── supabase.ts        # Supabase client
├── data/
│   ├── products.ts        # Product data
│   └── blog.ts            # Blog posts data
├── public/images/         # Static images
│   ├── backgrounds/       # Hero background images
│   ├── products/          # Product images
│   ├── categories/        # Category images
│   ├── services/          # Service images
│   └── care/              # Plant care images
└── scripts/               # Image generation scripts
```

## Design System

### CSS Variables (defined in globals.css)

```css
--color-primary: #2D5A3D        /* Dark green */
--color-primary-dark: #1E3D29   /* Darker green */
--color-primary-light: #E8F5E9  /* Light green bg */
--color-secondary: #D4A853      /* Gold/amber */
--color-secondary-dark: #B8923F /* Darker gold */
--color-secondary-light: #FFF8E7 /* Light gold bg */
--color-accent: #E8F5E9         /* Accent green */
--color-light: #FAFAF5          /* Light background */
--color-foreground: #1a1a1a     /* Text color */
--color-gray-600: #6B7280       /* Gray text */
--color-gray-700: #4B5563       /* Darker gray */
--color-border: #E5E7EB         /* Border color */
--color-error: #DC2626          /* Error red */
```

### Typography

- **Headings:** Playfair Display (serif) - `font-serif`
- **Body:** Inter (sans-serif) - default

### Hero Section Pattern

All main pages follow this consistent hero pattern:

```tsx
<section className="relative min-h-[70vh] flex items-center">
  {/* Background Image */}
  <div className="absolute inset-0">
    <Image
      src="/images/backgrounds/[page]-bg.png"
      alt="..."
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
  </div>

  <Container className="relative z-10 py-20">
    <div className="max-w-2xl">
      {/* Uppercase subtitle */}
      <span className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4">
        Subtitle Text
      </span>

      {/* Main heading - white with drop shadow */}
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 leading-tight drop-shadow-lg">
        Page Title
      </h1>

      {/* Description */}
      <p className="!text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
        Description text...
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full px-6">
          Primary CTA
        </Button>
        <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-6">
          Secondary CTA
        </Button>
      </div>
    </div>
  </Container>
</section>
```

### Section Header Pattern

```tsx
<div className="text-center mb-12 md:mb-16">
  <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-2 block">
    Section Subtitle
  </span>
  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
    Section Title
  </h2>
  <p className="text-[var(--color-gray-600)] max-w-2xl mx-auto">
    Section description text
  </p>
</div>
```

## Important Patterns

### Text Visibility on Images
- Use `!text-white` (important flag) to override Tailwind's text color
- Use `drop-shadow-lg` or `drop-shadow-md` for text visibility on images

### Buttons
- Primary: `bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full`
- Outline on dark: `border-white/40 text-white hover:bg-white/10 rounded-full`

### Cards
- Background: `bg-[var(--color-light)]` or `bg-white`
- Border: `border border-[var(--color-border)]`
- Shadow: `shadow-lg` or `shadow-xl`
- Rounded: `rounded-xl` or `rounded-[2rem]`

## Image Generation

Hero images are generated using OpenRouter API with Gemini 2.5 Flash Image model. Scripts are located in `/scripts/`:

```javascript
// Example: scripts/generate-[page]-hero.mjs
const OPENROUTER_API_KEY = 'sk-or-v1-...';
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'google/gemini-2.5-flash-image',
    messages: [{ role: 'user', content: prompt }]
  })
});
```

## Locations Data

Real coordinates from Google Maps:

**Varna (Варна):**
- Address: ул. Франга дере 27А, жк. Изгрев/Приморски
- Coordinates: `43.230888, 27.9083517`
- Phone: 089 567 0370

**Nova Zagora (Нова Загора):**
- Address: ул. Г.С. Раковски 19
- Coordinates: `42.4833, 26.0167`
- Phone: 088 830 6000

## Google Maps Integration

Free Google Maps embed (no API key required):

```tsx
const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
```

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Generate images
node scripts/generate-[page]-hero.mjs
```

## Key Files

- `lib/constants.ts` - All site configuration, locations, services, navigation
- `data/products.ts` - Product catalog data
- `data/blog.ts` - Blog posts
- `components/ui/Map.tsx` - Google Maps embed component
- `app/layout.tsx` - Root layout with Header/Footer

## Notes for AI Assistants

1. **Language:** All user-facing content is in Bulgarian
2. **Styling:** Always use CSS variables for colors (`var(--color-primary)`)
3. **Images:** Prefer local images in `/public/images/` over external URLs
4. **Hero sections:** Follow the established pattern for consistency
5. **Text on images:** Always use `!text-white` and `drop-shadow-*` classes
6. **Buttons:** Use `rounded-full` for pill-shaped buttons
7. **Section headers:** Include uppercase subtitle + serif heading + description
