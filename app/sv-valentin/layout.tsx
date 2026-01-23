import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Свети Валентин 2025 - Ексклузивни Рози | Екзотик Флауърс",
  description:
    "Изненадайте любимия човек този Свети Валентин с ексклузивни рози от Колумбия и Еквадор. Дължина до 90см. Приоритетно обслужване при ранна заявка. Варна и Нова Загора.",
  keywords: [
    "свети валентин",
    "валентин цветя",
    "рози за валентин",
    "букет за валентин",
    "червени рози варна",
    "цветя за любимата",
    "романтичен подарък",
    "рози от еквадор",
    "рози от колумбия",
    "доставка цветя варна",
    "14 февруари",
  ],
  openGraph: {
    title: "Свети Валентин 2025 - Ексклузивни Рози | Екзотик Флауърс",
    description:
      "Изненадайте любимия човек този Свети Валентин с ексклузивни рози от Колумбия и Еквадор. Дължина до 90см.",
    url: `${SITE_CONFIG.url}/sv-valentin`,
    siteName: SITE_CONFIG.nameBg,
    locale: "bg_BG",
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og-valentine.jpg`,
        width: 1200,
        height: 630,
        alt: "Свети Валентин - Екзотик Флауърс",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Свети Валентин 2025 - Ексклузивни Рози",
    description:
      "Изненадайте любимия човек с ексклузивни рози от Колумбия и Еквадор. Дължина до 90см.",
    images: [`${SITE_CONFIG.url}/images/og-valentine.jpg`],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/sv-valentin`,
  },
};

export default function ValentineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
