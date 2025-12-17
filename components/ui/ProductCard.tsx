"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Phone, ShoppingBag } from "lucide-react";
import { ProductRequestModal } from "@/components/catalog/ProductRequestModal";
import { LOCATIONS } from "@/lib/constants";

interface Product {
  id: string;
  name: string;
  slug?: string;
  category: string;
  subcategory?: string | null;
  origin?: string;
  price: number;
  priceUnit?: string;
  description?: string;
  image: string;
  inStock?: boolean;
  featured?: boolean;
  characteristics?: string[];
}

interface ProductCardProps {
  product: Product;
  index?: number;
  eurRate?: number;
  disableLink?: boolean;
}

export function ProductCard({ product, index = 0, eurRate = 1.9558, disableLink = false }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const priceEur = (product.price / eurRate).toFixed(2);
  const productUrl = product.slug ? `/produkti/produkt/${product.slug}` : null;

  const handleCardClick = () => {
    if (!disableLink && productUrl) {
      router.push(productUrl);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        className="h-full"
      >
        <div
          className={`group relative h-full flex flex-col ${!disableLink && productUrl ? 'cursor-pointer' : ''}`}
          onClick={handleCardClick}
          role={!disableLink && productUrl ? "link" : undefined}
        >
          {/* Background Card with Organic Shape/Border Radius */}
          <div className="absolute inset-0 bg-white rounded-[2rem] shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.02]" />

          {/* Image Container with Organic Clip Path or Soft Radius */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[2rem] rounded-b-[1rem] mx-3 mt-3">
            <div className="absolute inset-0 bg-gray-100 animate-pulse" /> {/* Placeholder */}
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Badges - Floating Glass Effect */}
            {product.origin && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-white/50">
                  <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                  <span className="text-xs font-bold tracking-wide text-[var(--color-primary)] uppercase">
                    {product.origin}
                  </span>
                </div>
              </div>
            )}

            {product.inStock === false && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1.5 bg-[var(--color-secondary)]/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-sm">
                  Изчерпан
                </span>
              </div>
            )}

            {/* Quick Action Buttons - Appears on Hover */}
            <div className="absolute bottom-4 right-4 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
              <button
                onClick={(e) => { e.stopPropagation(); window.location.href = `tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`; }}
                className="flex items-center justify-center w-12 h-12 bg-white text-[var(--color-primary)] rounded-full shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                title="Обади се"
              >
                <Phone className="w-5 h-5" />
              </button>
              {product.inStock !== false && (
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsModalOpen(true); }}
                  className="flex items-center justify-center w-12 h-12 bg-[var(--color-primary)] text-white rounded-full shadow-lg hover:bg-[var(--color-primary-dark)] transition-colors"
                  title="Изпрати заявка"
                >
                  <ShoppingBag className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6 flex-grow flex flex-col">
            <div className="mb-1">
               <span className="text-xs font-semibold text-[var(--color-secondary)] tracking-wider uppercase">
                 {product.category === 'ryazan-tsvyat' ? 'Рязан Цвят' :
                  product.category === 'saksiyni-rasteniya' ? 'Саксийни' : 'Градински'}
               </span>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-[var(--color-gray-900)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-sm text-[var(--color-gray-600)] mb-4 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Divider */}
            <div className="w-full h-px bg-[var(--color-gray-100)] mb-4" />

            <div className="mt-auto flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-[var(--color-gray-400)] font-medium uppercase tracking-wide">Цена</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-2xl font-bold text-[var(--color-primary)]">
                    {product.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-[var(--color-gray-500)]">
                    лв
                  </span>
                </div>
                {product.priceUnit && (
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-sm font-semibold text-gray-600">
                      {priceEur}
                    </span>
                    <span className="text-xs text-gray-400">
                      € / {product.priceUnit.replace('лв/', '')}
                    </span>
                  </div>
                )}
              </div>

              {/* Order Button */}
              {product.inStock !== false ? (
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsModalOpen(true); }}
                  className="px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-full hover:bg-[var(--color-primary-dark)] transition-colors shadow-sm"
                >
                  Поръчай
                </button>
              ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-full">
                  Няма наличност
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Request Modal */}
      <ProductRequestModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eurRate={eurRate}
      />
    </>
  );
}
