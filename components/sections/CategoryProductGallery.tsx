"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Search, X, Check, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string | null;
  origin: string;
  price: number;
  priceUnit: string;
  description: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
  characteristics?: string[];
}

interface CategoryProductGalleryProps {
  products: Product[];
  categoryName: string;
}

const origins = [
  { id: "all", label: "Всички" },
  { id: "Еквадор", label: "Еквадор" },
  { id: "Колумбия", label: "Колумбия" },
  { id: "Кения", label: "Кения" },
  { id: "Нидерландия", label: "Нидерландия" },
  { id: "Турция", label: "Турция" },
  { id: "Гърция", label: "Гърция" },
  { id: "България", label: "България" },
];

const sortOptions = [
  { id: "default", label: "По подразбиране" },
  { id: "price-asc", label: "Цена: ниска → висока" },
  { id: "price-desc", label: "Цена: висока → ниска" },
  { id: "name-asc", label: "Име: А → Я" },
];

export function CategoryProductGallery({ products, categoryName }: CategoryProductGalleryProps) {
  const [selectedOrigin, setSelectedOrigin] = useState<string>("all");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique origins from products
  const availableOrigins = origins.filter(
    origin => origin.id === "all" || products.some(p => p.origin === origin.id)
  );

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      if (selectedOrigin !== "all" && product.origin !== selectedOrigin) return false;
      if (showOnlyInStock && !product.inStock) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name, "bg");
        default:
          return 0;
      }
    });

  const hasActiveFilters = selectedOrigin !== "all" || showOnlyInStock || searchQuery;

  const clearFilters = () => {
    setSelectedOrigin("all");
    setShowOnlyInStock(false);
    setSearchQuery("");
    setSortBy("default");
  };

  return (
    <div className="w-full">
      {/* Search & Filter Bar - Sticky */}
      <div className="sticky top-20 z-30 bg-[var(--color-background)]/95 backdrop-blur-md border-b border-[var(--color-gray-200)] py-4">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
              <input
                type="text"
                placeholder={`Търсене в ${categoryName}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-transparent focus:border-[var(--color-primary)] outline-none shadow-sm transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4">
              {/* Origin Pills */}
              <div className="flex items-center gap-2">
                {availableOrigins.slice(0, 5).map(origin => (
                  <button
                    key={origin.id}
                    onClick={() => setSelectedOrigin(origin.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedOrigin === origin.id
                        ? "bg-[var(--color-primary)] text-white shadow-md"
                        : "bg-white text-[var(--color-gray-600)] hover:bg-[var(--color-gray-100)] border border-[var(--color-gray-200)]"
                    }`}
                  >
                    {origin.label}
                  </button>
                ))}
              </div>

              {/* In Stock Toggle */}
              <button
                onClick={() => setShowOnlyInStock(!showOnlyInStock)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  showOnlyInStock
                    ? "bg-[var(--color-secondary-light)] text-[var(--color-secondary)] border-[var(--color-secondary)]"
                    : "bg-white text-[var(--color-gray-600)] border-[var(--color-gray-200)] hover:border-[var(--color-gray-400)]"
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  showOnlyInStock ? "bg-[var(--color-secondary)] border-[var(--color-secondary)]" : "border-[var(--color-gray-300)] bg-white"
                }`}>
                  {showOnlyInStock && <Check className="w-3 h-3 text-white" />}
                </div>
                Само налични
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="md:hidden w-full flex items-center justify-center gap-2 rounded-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Филтри
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-[var(--color-secondary)] rounded-full" />
              )}
            </Button>
          </div>

          {/* Mobile Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 space-y-4">
                  {/* Origin Filter */}
                  <div>
                    <p className="text-xs font-bold text-[var(--color-gray-500)] uppercase tracking-wider mb-2">Произход</p>
                    <div className="flex flex-wrap gap-2">
                      {availableOrigins.map(origin => (
                        <button
                          key={origin.id}
                          onClick={() => setSelectedOrigin(origin.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            selectedOrigin === origin.id
                              ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                              : "bg-white border-[var(--color-gray-200)] text-[var(--color-gray-600)]"
                          }`}
                        >
                          {origin.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* In Stock */}
                  <button
                    onClick={() => setShowOnlyInStock(!showOnlyInStock)}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      showOnlyInStock ? "bg-[var(--color-primary)] border-[var(--color-primary)]" : "border-[var(--color-gray-300)] bg-white"
                    }`}>
                      {showOnlyInStock && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="font-medium text-[var(--color-gray-700)]">Само налични</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>

      <Container className="py-6 pb-16 md:pb-20">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-lg md:text-xl font-bold text-[var(--color-primary-dark)]">
              {categoryName}
              <span className="text-[var(--color-gray-400)] font-sans text-sm font-normal ml-2">
                ({filteredProducts.length})
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
              >
                <X className="w-4 h-4" /> Изчисти
              </button>
            )}

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="hidden sm:block px-4 py-2 rounded-full bg-white border border-[var(--color-gray-200)] text-sm font-medium text-[var(--color-gray-700)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 md:py-16 bg-white rounded-xl md:rounded-2xl border border-dashed border-[var(--color-gray-300)]">
            <div className="w-12 h-12 bg-[var(--color-gray-100)] rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-[var(--color-gray-400)]" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-[var(--color-gray-700)] mb-1.5">
              Няма намерени продукти
            </h3>
            <p className="text-xs md:text-sm text-[var(--color-gray-500)] mb-4">
              Опитайте с други критерии за търсене или изчистете филтрите.
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters} className="rounded-full">
              Изчисти всички филтри
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
