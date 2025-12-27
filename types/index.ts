export interface Plant {
  id: string;
  name: string;
  nameLatin: string;
  category: string;
  subcategory?: string;
  description: string;
  origin: "ecuador" | "holland" | "turkey" | "bulgaria";
  availability: "in-stock" | "seasonal" | "pre-order";
  price?: number;
  image: string;
  care: PlantCare;
}

export interface PlantCare {
  light: "full-sun" | "partial-shade" | "full-shade" | "bright-indirect";
  water: "low" | "moderate" | "high";
  difficulty: 1 | 2 | 3 | 4 | 5;
  temperature: {
    min: number;
    max: number;
  };
  detailedInstructions: {
    watering: string;
    light: string;
    soil: string;
    fertilizer: string;
    commonProblems: Array<{
      symptom: string;
      cause: string;
      solution: string;
    }>;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  category: "seasonal" | "care-tips" | "projects";
  image: string;
  keywords: string[];
}

export interface Location {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  location: "varna" | "nova-zagora";
  inquiryType: "general" | "b2b" | "delivery" | "plant-care" | "complaint";
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  customerType: "b2c" | "b2b";
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "products" | "delivery" | "plant-care" | "payment" | "b2b" | "returns";
}

// ==================== B2B Types ====================

export type B2BCompanyStatus = "pending" | "approved" | "rejected" | "suspended";
export type B2BTier = "silver" | "gold" | "platinum";
export type B2BOrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface B2BCompany {
  id: string;
  company_name: string;
  eik: string;
  mol: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  password_hash?: string;

  // Status & Tier
  status: B2BCompanyStatus;
  tier?: B2BTier;
  discount_percent: number;

  // Payment terms
  payment_terms: number; // Days (0 = immediate, 30, 60)
  credit_limit: number;

  // Meta
  notes?: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface B2BRegisterFormData {
  company_name: string;
  eik: string;
  mol: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  password: string;
  confirm_password: string;
  accept_terms: boolean;
}

export interface B2BOrder {
  id: string;
  company_id: string;
  order_number: string;
  status: B2BOrderStatus;

  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  total: number;

  delivery_date?: string;
  delivery_address?: string;
  notes?: string;

  created_at: string;

  // Relations
  company?: B2BCompany;
  items?: B2BOrderItem[];
}

export interface B2BOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface B2BSession {
  id: string;
  company_id: string;
  company_name: string;
  email: string;
  tier: B2BTier;
  discount_percent: number;
}
