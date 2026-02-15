import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "8-ми Март 2026 - Пролетни букети за Деня на жената | Exotic Flowers Варна",
  description:
    "Пролетни букети от свежи лалета, фрезии, зюмбюли и рози от Еквадор за 8-ми Март. Директен внос от Нидерландия и Еквадор. Приоритетно обслужване при заявка до 5 март. Exotic Flowers Варна.",
  keywords: [
    "8 март 2026",
    "ден на жената",
    "пролетни цветя варна",
    "лалета варна",
    "букет за 8 март",
    "фрезии",
    "зюмбюли",
    "нарциси",
    "пролетни букети",
    "рози от еквадор",
    "цветя за 8 март",
    "подарък за жената",
    "exotic flowers варна",
    "цветарски магазин варна",
    "лалета от нидерландия",
  ],
  openGraph: {
    title: "8-ми Март 2026 - Пролетни букети за Деня на жената | Exotic Flowers",
    description:
      "Пролетни букети от свежи лалета, фрезии и рози от Еквадор за 8-ми Март. Заявка до 5 март = приоритетно обслужване.",
    url: `${SITE_CONFIG.url}/den-na-zhenata`,
    siteName: "Exotic Flowers",
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/march8/march8-hero.png`,
        width: 1200,
        height: 630,
        alt: "8-ми Март 2026 - Пролетни букети - Exotic Flowers Варна",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "8-ми Март 2026 - Пролетни букети за Деня на жената",
    description:
      "Пролетни букети от свежи лалета, фрезии и рози от Еквадор. Заявка до 5 март = приоритет.",
    images: [`${SITE_CONFIG.url}/images/march8/march8-hero.png`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/den-na-zhenata`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "8-ми Март 2026 - Пролетни букети за Деня на жената",
  description:
    "Пролетни букети от свежи лалета, фрезии, зюмбюли и рози от Еквадор за Международния ден на жената. Директен внос. Приоритетно обслужване при заявка до 5 март.",
  startDate: "2026-03-08",
  endDate: "2026-03-08",
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
    image: "https://exoticflowers.bg/images/march8/march8-hero.png",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Франга дере 27А",
      addressLocality: "Варна",
      postalCode: "9010",
      addressCountry: "BG",
    },
  },
  image: "https://exoticflowers.bg/images/march8/march8-hero.png",
  offers: {
    "@type": "Offer",
    name: "Пролетни букети за 8-ми Март",
    description: "Лалета, фрезии, зюмбюли и рози от Еквадор. Директен внос.",
    availability: "https://schema.org/InStock",
    priceCurrency: "BGN",
  },
};

export default function March8Layout({
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
