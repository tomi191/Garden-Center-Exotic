"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Filter, Search, X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const PRODUCTS_PER_PAGE = 100; // Show all products by default (64 currently), paginate only when we have more

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

interface ProductGalleryProps {
  initialProducts: Product[];
}

const origins = [
  { id: "all", label: "Всички" },
  { id: "Колумбия", label: "Колумбия" },
  { id: "Кения", label: "Кения" },
  { id: "Гърция", label: "Гърция" },
  { id: "Нидерландия", label: "Нидерландия" },
  { id: "България", label: "България" },
];

const categories = [
  { id: "all", label: "Всички Категории" },
  { id: "ryazan-tsvyat", label: "Отрязан Цвят" },
  { id: "saksiyni-rasteniya", label: "Саксийни" },
  { id: "sezonni-tsvetya", label: "Сезонни" },
  { id: "hrasti-darveta", label: "Храсти & Дървета" },
];

export function ProductGallery({ initialProducts }: ProductGalleryProps) {
  const [selectedOrigin, setSelectedOrigin] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // Mobile toggle
  const [isDesktop, setIsDesktop] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE); // Pagination state

  // Handle window resize safely
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter Logic with useMemo for performance
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (selectedOrigin !== "all" && product.origin !== selectedOrigin) return false;
      if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
      if (showOnlyInStock && !product.inStock) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [initialProducts, selectedOrigin, selectedCategory, showOnlyInStock, searchQuery]);

  // Visible products (paginated)
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMoreProducts = visibleCount < filteredProducts.length;

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + PRODUCTS_PER_PAGE);
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [selectedOrigin, selectedCategory, showOnlyInStock, searchQuery]);

  const clearFilters = useCallback(() => {
    setSelectedOrigin("all");
    setSelectedCategory("all");
    setShowOnlyInStock(false);
    setSearchQuery("");
  }, []);

  return (
    <div className="w-full">
      {/* Search & Filter Bar - Sticky */}
      <div className="sticky top-20 z-30 bg-[var(--color-background)]/95 backdrop-blur-md border-y border-[var(--color-gray-200)] py-4 mb-8">
        <Container>
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
             {/* Search */}
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                <input 
                  type="text"
                  placeholder="Търсене на продукти..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-transparent focus:border-[var(--color-primary)] outline-none shadow-sm transition-all"
                />
             </div>

             {/* Filter Toggle (Mobile) */}
             <div className="flex items-center gap-3 w-full md:w-auto">
                <Button 
                   variant="outline" 
                   className="md:hidden w-full flex items-center justify-center gap-2 rounded-full"
                   onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                   <Filter className="w-4 h-4" />
                   Филтри
                </Button>
                
                {/* Desktop Quick Filters */}
                <div className="hidden md:flex items-center gap-2">
                   {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === cat.id 
                            ? "bg-[var(--color-primary-dark)] text-white shadow-md" 
                            : "bg-white text-[var(--color-gray-600)] hover:bg-[var(--color-gray-100)]"
                        }`}
                      >
                        {cat.label}
                      </button>
                   ))}
                </div>
             </div>
           </div>

           {/* Expanded Filters Area */}
           <AnimatePresence>
             {(isFiltersOpen || isDesktop) && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden md:block hidden pt-6 border-t border-[var(--color-gray-100)] mt-4"
                >
                  <div className="flex flex-wrap items-center gap-6">
                     {/* Origin Filter */}
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[var(--color-gray-500)] uppercase tracking-wider">Произход:</span>
                        <div className="flex flex-wrap gap-2">
                          {origins.map(origin => (
                            <button
                              key={origin.id}
                              onClick={() => setSelectedOrigin(origin.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                                selectedOrigin === origin.id
                                  ? "bg-[var(--color-secondary-light)] text-[var(--color-secondary)] border-[var(--color-secondary)]"
                                  : "bg-transparent border-[var(--color-gray-200)] text-[var(--color-gray-600)] hover:border-[var(--color-gray-400)]"
                              }`}
                            >
                              {origin.label}
                            </button>
                          ))}
                        </div>
                     </div>

                     {/* Stock Filter */}
                     <div className="flex items-center gap-2 ml-auto cursor-pointer" onClick={() => setShowOnlyInStock(!showOnlyInStock)}>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showOnlyInStock ? 'bg-[var(--color-primary)] border-[var(--color-primary)]' : 'border-[var(--color-gray-300)] bg-white'}`}>
                           {showOnlyInStock && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className="text-sm font-medium text-[var(--color-gray-700)]">Само налични</span>
                     </div>
                  </div>
                </motion.div>
             )}
           </AnimatePresence>
        </Container>
      </div>

      <Container className="pb-16 md:pb-20">
        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
           <h2 className="font-serif text-lg md:text-xl font-bold text-[var(--color-primary-dark)]">
             Резултати <span className="text-[var(--color-gray-400)] font-sans text-sm font-normal">({filteredProducts.length})</span>
           </h2>
           {(selectedCategory !== 'all' || selectedOrigin !== 'all' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
              >
                <X className="w-3.5 h-3.5" /> Изчисти филтрите
              </button>
           )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8">
           {visibleProducts.map((product, index) => (
             <ProductCard key={product.id} product={product} index={index} />
           ))}
        </div>

        {/* Load More Button */}
        {hasMoreProducts && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              className="rounded-full px-8 flex items-center gap-2 hover:bg-[var(--color-primary)] hover:text-white transition-all"
            >
              Зареди още ({filteredProducts.length - visibleCount} останали)
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        )}

        {filteredProducts.length === 0 && (
           <div className="text-center py-12 md:py-16 bg-white rounded-xl md:rounded-2xl border border-dashed border-[var(--color-gray-300)]">
              <div className="w-12 h-12 bg-[var(--color-gray-100)] rounded-full flex items-center justify-center mx-auto mb-3">
                 <Search className="w-6 h-6 text-[var(--color-gray-400)]" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-[var(--color-gray-700)] mb-1.5">Няма намерени продукти</h3>
              <p className="text-xs md:text-sm text-[var(--color-gray-500)]">Опитайте с други критерии за търсене.</p>
              <Button variant="outline" size="sm" className="mt-4 rounded-full" onClick={clearFilters}>Изчисти всички филтри</Button>
           </div>
        )}
      </Container>
    </div>
  );
}