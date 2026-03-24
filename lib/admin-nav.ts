import {
  LayoutDashboard,
  MessageSquare,
  ClipboardList,
  Warehouse,
  Building2,
  ShoppingBag,
  Package,
  PlusCircle,
  BookOpen,
  Users,
  Settings,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { title: "Табло", href: "/admin", icon: LayoutDashboard },
  { title: "Съобщения", href: "/admin/messages", icon: MessageSquare },
  { title: "Заявки", href: "/admin/requests", icon: ClipboardList },
  { title: "Склад", href: "/admin/stock", icon: Warehouse },
  { title: "B2B Компании", href: "/admin/b2b", icon: Building2 },
  { title: "B2B Заявки", href: "/admin/b2b/orders", icon: ShoppingBag },
  { title: "Всички Продукти", href: "/admin/products", icon: Package },
  { title: "Добави Продукт", href: "/admin/products/new", icon: PlusCircle },
  { title: "Блог", href: "/admin/blog", icon: BookOpen },
  { title: "Потребители", href: "/admin/users", icon: Users },
  { title: "Настройки", href: "/admin/settings", icon: Settings },
] as const;
