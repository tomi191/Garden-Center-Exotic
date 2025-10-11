export const SITE_CONFIG = {
  name: "Garden Center Exotic",
  nameBg: "Градински Център Екзотик",
  description: "Висококачествени цветя първо качество от Еквадор, Холандия, Турция и България. 27 години опит във Варна и Нова Загора.",
  url: "https://gardenexotic.bg",
  founded: 1998,
  ogImage: "/images/og-image.jpg",
  yearsInBusiness: new Date().getFullYear() - 1998,
} as const;

export const IMPORT_COUNTRIES = [
  { name: "Ecuador", nameBg: "Еквадор", flag: "🇪🇨", products: "Рязан цвят" },
  { name: "Holland", nameBg: "Холандия", flag: "🇳🇱", products: "Саксийни растения, рязан цвят" },
  { name: "Turkey", nameBg: "Турция", flag: "🇹🇷", products: "Различни растения" },
  { name: "Bulgaria", nameBg: "България", flag: "🇧🇬", products: "Рози, лавандула, сезонни цветя" },
] as const;

export const LOCATIONS = {
  varna: {
    name: "Варна",
    address: "ул. Франга дере 27А (над Вятърна мелница)",
    city: "Варна",
    postalCode: "9010",
    country: "България",
    phone: "+359 52 XXX XXX",
    email: "varna@gardenexotic.bg",
    hours: {
      weekdays: "9:00 - 18:00",
      saturday: "9:00 - 16:00",
      sunday: "Почивен ден",
    },
    coordinates: {
      lat: 43.2141,
      lng: 27.9147,
    },
  },
  novaZagora: {
    name: "Нова Загора",
    address: "На магистрала Тракия (София-Бургас)",
    city: "Нова Загора",
    postalCode: "8900",
    country: "България",
    phone: "+359 XXX XXX XXX",
    email: "novazagora@gardenexotic.bg",
    hours: {
      weekdays: "9:00 - 18:00",
      saturday: "9:00 - 16:00",
      sunday: "Почивен ден",
    },
    coordinates: {
      lat: 42.4833,
      lng: 26.0167,
    },
  },
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/gardenexotic",
  instagram: "https://instagram.com/gardenexotic",
  whatsapp: "https://wa.me/359XXXXXXXXX",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Начало" },
  { href: "/za-nas", label: "За Нас" },
  { href: "/produkti", label: "Продукти" },
  { href: "/uslugi", label: "Услуги" },
  { href: "/grizhi", label: "Грижи за Растенията" },
  { href: "/blog", label: "Блог" },
  { href: "/lokacii", label: "Локации" },
  { href: "/kontakti", label: "Контакти" },
] as const;

export const TRUST_SIGNALS = [
  {
    icon: "Calendar",
    title: "От 1998 г.",
    description: `${new Date().getFullYear() - 1998} години опит`,
  },
  {
    icon: "Warehouse",
    title: "Оранжерии",
    description: "Студена верига (Cold Chain)",
  },
  {
    icon: "GraduationCap",
    title: "Експертен екип",
    description: "Хортикултурни специалисти",
  },
  {
    icon: "MapPin",
    title: "2 локации",
    description: "Варна и Нова Загора",
  },
  {
    icon: "Globe",
    title: "Световно качество",
    description: "Внос от Еквадор, Холандия",
  },
  {
    icon: "Award",
    title: "100% Гаранция",
    description: "Свежест и качество",
  },
] as const;

export const PRODUCT_CATEGORIES = [
  {
    slug: "saksiyni-rasteniya",
    name: "Саксийни Растения",
    description: "Стайни и външни растения",
    subcategories: [
      { slug: "stayni", name: "Стайни Растения" },
      { slug: "vanshni", name: "Външни Растения" },
    ],
  },
  {
    slug: "ryazan-tsvyat",
    name: "Рязан Цвят",
    description: "Първо качество от световни доставчици",
    subcategories: [
      { slug: "kolumbiya", name: "От Колумбия" },
      { slug: "keniya", name: "От Кения" },
      { slug: "gartsiya", name: "От Гърция" },
      { slug: "niderlandiya", name: "От Нидерландия" },
      { slug: "turtsiya", name: "От Турция" },
      { slug: "balgariya", name: "От България" },
    ],
  },
  {
    slug: "sezonni-tsvetya",
    name: "Сезонни Цветя",
    description: "По сезони",
  },
  {
    slug: "hrasti-darveta",
    name: "Храсти и Дървета",
    description: "За градината",
  },
] as const;
