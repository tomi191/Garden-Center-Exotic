import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Свети Валентин 2025 - Premium Рози от Еквадор | Exotic Flowers Варна",
  description:
    "Изненадайте любимия човек този Свети Валентин с premium рози от Еквадор. Директен внос, без посредници. Приоритетно обслужване при заявка до 12 февруари. Exotic Flowers Варна.",
  keywords: [
    "свети валентин 2025",
    "свети валентин рози",
    "рози за валентин варна",
    "букет за свети валентин",
    "червени рози варна",
    "цветя за любимата",
    "романтичен подарък варна",
    "рози от еквадор",
    "premium рози варна",
    "луксозни рози",
    "доставка цветя варна",
    "14 февруари 2025",
    "exotic flowers варна",
    "цветарски магазин варна",
  ],
  openGraph: {
    title: "Свети Валентин 2025 - Premium Рози от Еквадор | Exotic Flowers",
    description:
      "Premium рози от Еквадор за Свети Валентин. Директен внос, без посредници. Заявка до 12 февруари = приоритетно обслужване.",
    url: `${SITE_CONFIG.url}/sv-valentin`,
    siteName: "Exotic Flowers",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/valentine/valentine-hero-new.png`,
        width: 1200,
        height: 630,
        alt: "Свети Валентин 2025 - Premium рози от Еквадор - Exotic Flowers Варна",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Свети Валентин 2025 - Premium Рози от Еквадор",
    description:
      "Premium рози от Еквадор за Свети Валентин. Директен внос. Заявка до 12 февруари = приоритет.",
    images: [`${SITE_CONFIG.url}/images/valentine/valentine-hero-new.png`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/sv-valentin`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Свети Валентин 2025 - Premium Рози от Еквадор",
  description: "Premium рози от Еквадор за Свети Валентин. Директен внос, без посредници. Приоритетно обслужване при заявка до 12 февруари.",
  startDate: "2025-02-14",
  endDate: "2025-02-14",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Exotic Flowers Варна",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Франга дере 27А",
      addressLocality: "Варна",
      postalCode: "9010",
      addressCountry: "BG",
    },
  },
  organizer: {
    "@type": "LocalBusiness",
    name: "Exotic Flowers",
    url: "https://exoticflowers.bg",
    telephone: "+359895670370",
    image: "https://exoticflowers.bg/images/valentine/valentine-hero-new.png",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Франга дере 27А",
      addressLocality: "Варна",
      postalCode: "9010",
      addressCountry: "BG",
    },
  },
  image: "https://exoticflowers.bg/images/valentine/valentine-hero-new.png",
  offers: {
    "@type": "Offer",
    name: "Premium рози от Еквадор",
    description: "Директен внос, без посредници",
    availability: "https://schema.org/InStock",
    priceCurrency: "BGN",
  },
};

export default function ValentineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
