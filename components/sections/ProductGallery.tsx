"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { products, Product } from "@/data/products";
import { Filter, Grid3x3, List } from "lucide-react";

const origins = ["Всички", "Колумбия", "Кения", "Гърция", "Нидерландия", "Турция", "България"] as const;
const categories = [
  { value: "all", label: "Всички" },
  { value: "ryazan-tsvyat", label: "Рязан Цвят" },
  { value: "saksiyni-rasteniya", label: "Саксийни" },
  { value: "sezonni-tsvetya", label: "Сезонни" },
  { value: "hrasti-darveta", label: "Храсти" },
] as const;

export function ProductGallery() {
  const [selectedOrigin, setSelectedOrigin] = useState<typeof origins[number]>("Всички");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  // Филтриране на продуктите
  const filteredProducts = products.filter((product) => {
    // Филтър по произход
    if (selectedOrigin !== "Всички" && product.origin !== selectedOrigin) {
      return false;
    }

    // Филтър по категория
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }

    // Филтър по наличност
    if (showOnlyInStock && !product.inStock) {
      return false;
    }

    return true;
  });

  return (
    <Section className="bg-white py-16">
      <Container>
        {/* Заглавие и описание */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Нашата Продуктова Гама</h2>
          <p className="text-base text-[var(--color-gray-600)]">
            {filteredProducts.length} {filteredProducts.length === 1 ? "продукт" : "продукта"} на разположение
          </p>
        </motion.div>

        {/* Филтри */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          {/* Филтър по категория */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="font-semibold text-[var(--color-foreground)]">Категория:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === cat.value
                      ? "bg-[var(--color-primary)] text-white shadow-lg"
                      : "bg-[var(--color-light)] text-[var(--color-gray-700)] hover:bg-[var(--color-primary)]/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Филтър по произход */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Grid3x3 className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="font-semibold text-[var(--color-foreground)]">Произход:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {origins.map((origin) => (
                <button
                  key={origin}
                  onClick={() => setSelectedOrigin(origin)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedOrigin === origin
                      ? "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-lg"
                      : "bg-[var(--color-light)] text-[var(--color-gray-700)] hover:bg-[var(--color-primary)]/10"
                  }`}
                >
                  {origin}
                </button>
              ))}
            </div>
          </div>

          {/* Филтър само налични */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyInStock}
                onChange={(e) => setShowOnlyInStock(e.target.checked)}
                className="w-5 h-5 text-[var(--color-primary)] border-[var(--color-border)] rounded focus:ring-[var(--color-primary)]"
              />
              <span className="font-medium text-[var(--color-foreground)]">
                Покажи само налични продукти
              </span>
            </label>
          </div>
        </motion.div>

        {/* Продуктова решетка */}
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-[var(--color-light)] rounded-full flex items-center justify-center">
              <List className="w-10 h-10 text-[var(--color-gray-400)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
              Няма намерени продукти
            </h3>
            <p className="text-[var(--color-gray-600)]">
              Опитайте да промените филтрите или да изчистите избора си.
            </p>
          </motion.div>
        )}

        {/* Информационно съобщение */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--color-gray-700)]">
            Не намирате това, което търсите?{" "}
            <a href="/kontakti" className="text-[var(--color-primary)] font-semibold hover:underline">
              Свържете се с нас
            </a>{" "}
            за специални поръчки и консултация.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
