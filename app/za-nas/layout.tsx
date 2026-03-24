import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "За Нас",
  description: `${SITE_CONFIG.nameBg} - Директен вносител на премиум цветя от 1998 г. Над ${SITE_CONFIG.yearsInBusiness} години опит, внос от 6 държави, студена верига за максимална свежест. Варна и Нова Загора.`,
  openGraph: {
    title: `За Нас | ${SITE_CONFIG.nameBg}`,
    description: "Директен вносител на премиум цветя от Еквадор, Холандия и Турция от 1998 г.",
    type: "website",
    images: [`${SITE_CONFIG.url}/images/og-image.jpg`],
  },
};

export default function ZaNasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
