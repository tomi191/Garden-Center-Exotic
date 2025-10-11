"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Check, MapPin, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="h-full group overflow-hidden hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-0">
          {/* Снимка на продукта */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Badge за произход */}
            <div className="absolute top-3 left-3">
              <div className="flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
                <span className="text-xs font-semibold text-[var(--color-foreground)]">
                  {product.origin}
                </span>
              </div>
            </div>

            {/* Badge за наличност */}
            {!product.inStock && (
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                  Изчерпан
                </span>
              </div>
            )}

            {/* Badge за featured продукти */}
            {product.featured && (
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-xs font-bold rounded-full shadow-lg">
                  Препоръчан
                </span>
              </div>
            )}
          </div>

          {/* Информация за продукта */}
          <div className="p-5">
            {/* Име на продукта */}
            <h3 className="text-xl font-bold mb-2 text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Описание */}
            <p className="text-sm text-[var(--color-gray-600)] mb-4 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Характеристики */}
            {product.characteristics && product.characteristics.length > 0 && (
              <div className="mb-4 space-y-1">
                {product.characteristics.slice(0, 3).map((char, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-gray-600)]">
                    <Check className="w-3 h-3 text-[var(--color-primary)] flex-shrink-0" />
                    <span className="line-clamp-1">{char}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Цена и CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
              <div>
                <div className="text-2xl font-bold text-[var(--color-primary)]">
                  {product.price.toFixed(2)} лв
                </div>
                <div className="text-xs text-[var(--color-gray-500)]">
                  {product.priceUnit}
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                className="inline-flex items-center gap-2"
                disabled={!product.inStock}
              >
                {product.inStock ? (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline">Запитване</span>
                  </>
                ) : (
                  <>
                    <Info className="w-4 h-4" />
                    <span className="hidden sm:inline">Уведоми ме</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
