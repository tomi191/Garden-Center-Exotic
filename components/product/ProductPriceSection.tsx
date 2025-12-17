"use client";

import Link from "next/link";
import { Phone, Check, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettings } from "@/components/providers/SettingsProvider";
import { LOCATIONS } from "@/lib/constants";

interface ProductPriceSectionProps {
  product: {
    name: string;
    price: number;
    priceUnit?: string;
    inStock: boolean;
  };
}

export function ProductPriceSection({ product }: ProductPriceSectionProps) {
  const { settings } = useSettings();
  const hidePrices = settings.hidePrices;
  const priceEur = (product.price / 1.9558).toFixed(2);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex items-end justify-between mb-4">
        <div>
          {hidePrices ? (
            <>
              <span className="text-sm text-[var(--color-gray-400)] font-medium uppercase tracking-wide">
                Цена при запитване
              </span>
              <div className="flex items-center gap-2 mt-2 text-[var(--color-primary)]">
                <MessageCircle className="w-5 h-5" />
                <span className="text-lg font-medium">Свържете се с нас</span>
              </div>
            </>
          ) : (
            <>
              <span className="text-sm text-[var(--color-gray-400)] font-medium uppercase tracking-wide">Цена</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl font-bold text-[var(--color-primary)]">
                  {product.price.toFixed(2)}
                </span>
                <span className="text-lg text-[var(--color-gray-500)]">лв</span>
              </div>
              <span className="text-sm text-[var(--color-gray-400)]">
                {priceEur} € / {product.priceUnit?.replace("лв/", "") || "бр"}
              </span>
            </>
          )}
        </div>
        {product.inStock ? (
          <span className="flex items-center gap-2 text-green-600 font-medium">
            <Check className="w-5 h-5" />
            В наличност
          </span>
        ) : (
          <span className="text-[var(--color-secondary)] font-medium">Изчерпан</span>
        )}
      </div>

      {/* CTA бутони */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`} className="flex-1">
          <Button size="lg" className="w-full rounded-full">
            <Phone className="w-5 h-5 mr-2" />
            Обади се
          </Button>
        </a>
        <a
          href={`https://wa.me/359895670370?text=${encodeURIComponent(`Здравейте! Интересувам се от ${product.name}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" size="lg" className="w-full rounded-full bg-[#25D366] border-[#25D366] text-white hover:bg-[#128C7E] hover:border-[#128C7E]">
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>
        </a>
      </div>
      <Link href="/kontakti" className="block mt-3">
        <Button variant="outline" size="lg" className="w-full rounded-full">
          <ShoppingBag className="w-5 h-5 mr-2" />
          {hidePrices ? "Запитване за цена" : "Направи запитване"}
        </Button>
      </Link>
    </div>
  );
}
