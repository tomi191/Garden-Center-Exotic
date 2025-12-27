"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Search, Filter, Package, ShoppingCart, Plus, Minus, Check,
  Truck, Percent, ChevronDown, X
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  origin: string;
  price: number;
  priceUnit: string;
  description: string;
  image: string;
  inStock: boolean;
  characteristics?: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

const categoryNames: Record<string, string> = {
  "ryazan-tsvyat": "Отрязани цветя",
  "saksiyni-rasteniya": "Саксийни растения",
  "sezonni-tsvetya": "Сезонни цветя",
  "hrasti-darveta": "Храсти и дървета",
};

const originNames: Record<string, string> = {
  "Ecuador": "Еквадор",
  "Colombia": "Колумбия",
  "Kenya": "Кения",
  "Netherlands": "Холандия",
  "Turkey": "Турция",
  "Greece": "Гърция",
  "Bulgaria": "България",
};

export default function B2BCatalogPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [origin, setOrigin] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const user = session?.user as { discount_percent?: number; tier?: string };
  const discountPercent = user?.discount_percent || 0;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?inStock=true");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    const matchesOrigin = origin === "all" || product.origin === origin;
    return matchesSearch && matchesCategory && matchesOrigin;
  });

  const getDiscountedPrice = (price: number) => {
    return price * (1 - discountPercent / 100);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} добавено в количката`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = getDiscountedPrice(item.product.price);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const origins = [...new Set(products.map((p) => p.origin))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">B2B Каталог</h1>
          <p className="text-gray-500 mt-1">
            Всички цени са с {discountPercent}% отстъпка за вашето ниво
          </p>
        </div>

        {/* Cart Button */}
        <Button
          onClick={() => setShowCart(true)}
          className="relative rounded-full"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Количка
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {getCartItemCount()}
            </span>
          )}
        </Button>
      </div>

      {/* Discount Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-lg">Вашата отстъпка: {discountPercent}%</p>
              <p className="text-white/80 text-sm">
                Ниво: {user?.tier?.toUpperCase() || "Silver"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            <span className="text-sm">Безплатна доставка над 100 лв</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Търси продукти..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
            />
          </div>

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20 min-w-[180px]"
          >
            <option value="all">Всички категории</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryNames[cat] || cat}
              </option>
            ))}
          </select>

          {/* Origin Filter */}
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20 min-w-[150px]"
          >
            <option value="all">Всички произходи</option>
            {origins.map((org) => (
              <option key={org} value={org}>
                {originNames[org] || org}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Зареждане на продукти...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Няма намерени продукти</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const originalPrice = product.price;
            const discountedPrice = getDiscountedPrice(originalPrice);
            const cartItem = cart.find((item) => item.product.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={product.image || "/images/products/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {discountPercent > 0 && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      -{discountPercent}%
                    </div>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 text-xs font-medium rounded-full">
                    {originNames[product.origin] || product.origin}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-[var(--color-primary)] font-medium mb-1">
                    {categoryNames[product.category] || product.category}
                  </p>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Prices */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-[var(--color-primary)]">
                      {discountedPrice.toFixed(2)} лв
                    </span>
                    {discountPercent > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        {originalPrice.toFixed(2)} лв
                      </span>
                    )}
                    <span className="text-xs text-gray-500">/{product.priceUnit?.replace("лв/", "")}</span>
                  </div>

                  {/* Add to Cart */}
                  {cartItem ? (
                    <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full rounded-lg"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Добави
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowCart(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                Количка ({getCartItemCount()})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Количката е празна</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const discountedPrice = getDiscountedPrice(item.product.price);
                    return (
                      <div
                        key={item.product.id}
                        className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.product.image || "/images/products/placeholder.jpg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-[var(--color-primary)] font-semibold">
                            {discountedPrice.toFixed(2)} лв
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded bg-white border"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded bg-white border"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-auto text-red-500 text-xs hover:underline"
                            >
                              Премахни
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Общо:</span>
                  <span className="text-2xl font-bold text-[var(--color-primary)]">
                    {getCartTotal().toFixed(2)} лв
                  </span>
                </div>
                <Button
                  className="w-full rounded-xl py-3"
                  onClick={() => {
                    toast.success("Поръчката е изпратена! Ще се свържем с вас.");
                    setCart([]);
                    setShowCart(false);
                  }}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Изпрати поръчка
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Ще се свържем с вас за потвърждение
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
