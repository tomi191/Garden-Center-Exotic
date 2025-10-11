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
