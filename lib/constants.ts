export const SITE_CONFIG = {
  name: "Garden Center Exotic",
  nameBg: "Градински Център Екзотик",
  description: "Директен вносител на отрязани цветя и растения от 1998 г. Премиум рози от Еквадор, орхидеи, екзотични растения. Студена верига за максимална свежест. Варна и Нова Загора.",
  url: "https://www.exoticflowers.bg",
  founded: 1998,
  ogImage: "/images/og-image.jpg",
  yearsInBusiness: new Date().getFullYear() - 1998,
  rating: 4.9,
  reviewCount: 54,
} as const;

export const IMPORT_COUNTRIES = [
  { name: "Ecuador", nameBg: "Еквадор", flag: "🇪🇨", products: "Премиум рози, екзотични цветя" },
  { name: "Colombia", nameBg: "Колумбия", flag: "🇨🇴", products: "Рози, хризантеми, екзотични" },
  { name: "Kenya", nameBg: "Кения", flag: "🇰🇪", products: "Рози, хризантеми, хиперикум" },
  { name: "Netherlands", nameBg: "Нидерландия", flag: "🇳🇱", products: "Лалета, саксийни растения" },
  { name: "Turkey", nameBg: "Турция", flag: "🇹🇷", products: "Рози, сезонни цветя" },
  { name: "Greece", nameBg: "Гърция", flag: "🇬🇷", products: "Маслини, средиземноморски" },
  { name: "Bulgaria", nameBg: "България", flag: "🇧🇬", products: "Рози, разсади, сезонни" },
] as const;

export const LOCATIONS = {
  varna: {
    name: "Варна",
    type: "Централен склад и шоурум",
    address: "ул. Франга дере 27А",
    landmark: "Над Вятърна мелница, ж.к. Изгрев",
    city: "Варна",
    postalCode: "9010",
    country: "България",
    phone: "089 567 0370",
    email: "exoticbg@abv.bg",
    rating: 4.9,
    reviewCount: 23,
    hours: {
      weekdays: "09:00 - 18:00",
      saturday: "Почивен ден",
      sunday: "Почивен ден",
    },
    coordinates: {
      lat: 43.230888,
      lng: 27.9083517,
    },
    parking: true,
  },
  novaZagora: {
    name: "Нова Загора",
    type: "Магазин и склад",
    address: "ул. Г.С. Раковски 19",
    landmark: "На главния път, лесен достъп от магистрала Тракия",
    city: "Нова Загора",
    postalCode: "8900",
    country: "България",
    phone: "088 830 6000",
    email: "exoticbg@abv.bg",
    rating: 4.3,
    reviewCount: 31,
    hours: {
      weekdays: "09:00 - 18:00",
      saturday: "Почивен ден",
      sunday: "Почивен ден",
    },
    coordinates: {
      lat: 42.4833,
      lng: 26.0167,
    },
    parking: true,
  },
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=100028020589420",
  instagram: "https://www.instagram.com/gardencentarexotic",
  whatsapp: "https://wa.me/359895670370",
} as const;

export const NAV_LINKS = [
  { href: "/za-nas", label: "За Нас" },
  { href: "/produkti", label: "Продукти" },
  { href: "/sveji-dostavki", label: "Свежи Доставки" },
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
    description: `${new Date().getFullYear() - 1998}+ години опит`,
  },
  {
    icon: "Snowflake",
    title: "Студена верига",
    description: "Гарантирана свежест",
  },
  {
    icon: "Plane",
    title: "Директен внос",
    description: "Без посредници",
  },
  {
    icon: "MapPin",
    title: "2 локации",
    description: "Варна и Нова Загора",
  },
  {
    icon: "Star",
    title: "4.9/5 звезди",
    description: "54+ отзива",
  },
  {
    icon: "Truck",
    title: "Експрес доставка",
    description: "До 3 часа",
  },
] as const;

export const PRODUCT_CATEGORIES = [
  {
    slug: "ryazan-tsvyat",
    name: "Отрязани Цветя",
    description: "Премиум качество, над 2 седмици свежест",
    image: "/images/categories/cut-flowers.png",
    subcategories: [
      { slug: "rozi", name: "Рози от Еквадор" },
      { slug: "laleta", name: "Лалета" },
      { slug: "ekzotichni", name: "Екзотични цветя" },
      { slug: "sezonni", name: "Сезонни цветя" },
    ],
  },
  {
    slug: "saksiyni-rasteniya",
    name: "Саксийни Растения",
    description: "Стайни и външни, с гаранция за качество",
    image: "/images/categories/potted-plants.png",
    subcategories: [
      { slug: "orhidei", name: "Орхидеи" },
      { slug: "kaktusi", name: "Кактуси и сукуленти" },
      { slug: "tropicheski", name: "Тропически растения" },
      { slug: "dekorativni", name: "Декоративни листни" },
    ],
  },
  {
    slug: "gradinski",
    name: "Градински Растения",
    description: "Храсти, дървета и сезонни разсади",
    image: "/images/categories/garden-plants.png",
    subcategories: [
      { slug: "hrasti", name: "Декоративни храсти" },
      { slug: "darveta", name: "Градински дървета" },
      { slug: "razsadi", name: "Сезонни разсади" },
    ],
  },
  {
    slug: "aksessoari",
    name: "Аксесоари",
    description: "Почви, торове, саксии и инструменти",
    image: "/images/categories/accessories.png",
    subcategories: [
      { slug: "pochvi", name: "Почвени смеси" },
      { slug: "torove", name: "Торове и препарати" },
      { slug: "saksii", name: "Саксии" },
    ],
  },
] as const;

export const SERVICES = [
  {
    slug: "buketi",
    name: "Букети и аранжировки",
    description: "Индивидуални букети за всеки повод - рождени дни, годишнини, корпоративни подаръци",
    priceRange: "25 - 200+ лв",
    icon: "Flower2",
  },
  {
    slug: "dostavka",
    name: "Доставка",
    description: "Експресна доставка до 3 часа. Безплатна доставка за поръчки над 50 лв",
    priceRange: "Безплатна над 50 лв",
    icon: "Truck",
  },
  {
    slug: "abonament",
    name: "Цветен абонамент",
    description: "Седмична смяна на свежи цветя за офиси, хотели, ресторанти. Вази под наем",
    priceRange: "По договор",
    icon: "Calendar",
  },
  {
    slug: "ozelenyavane",
    name: "Озеленяване",
    description: "Професионално озеленяване на офиси и градини с консултация от хортикултурни специалисти",
    priceRange: "По проект",
    icon: "TreeDeciduous",
  },
  {
    slug: "b2b",
    name: "Търговия на едро",
    description: "За флористи, хотели, ресторанти и дистрибутори. Специални цени и редовни доставки",
    priceRange: "Преференциални",
    icon: "Building2",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Мария К.",
    location: "Варна",
    rating: 5,
    text: "Най-добрият склад за цветя във Варна! Невероятна свежест - цветята издържат над 2 седмици.",
    date: "2024",
  },
  {
    name: "Георги П.",
    location: "Варна",
    rating: 5,
    text: "Висококачествени растения на отлични цени. Персоналът се отнася страхотно с клиентите.",
    date: "2024",
  },
  {
    name: "Елена Д.",
    location: "Нова Загора",
    rating: 5,
    text: "Професионално отношение и компетентни съвети. Над 25 години традиция и експертиза.",
    date: "2024",
  },
  {
    name: "Стефан М.",
    location: "Варна",
    rating: 5,
    text: "Богат избор от растения, винаги имат свежи цветя. Познават перфектно всеки вид растение.",
    date: "2024",
  },
] as const;
