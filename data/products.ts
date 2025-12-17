// Продуктови данни за Градински Център Екзотик

export interface Product {
  id: string;
  name: string;
  category: "ryazan-tsvyat" | "saksiyni-rasteniya" | "sezonni-tsvetya" | "hrasti-darveta";
  subcategory?: string;
  origin: "Колумбия" | "Кения" | "Гърция" | "Нидерландия" | "Турция" | "България";
  price: number;
  priceUnit: "лв/стрък" | "лв/букет" | "лв/саксия" | "лв";
  description: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
  characteristics?: string[];
}

export const products: Product[] = [
  // Рязан цвят от Колумбия
  {
    id: "rose-red-colombia",
    name: "Червени Рози",
    category: "ryazan-tsvyat",
    subcategory: "kolumbiya",
    origin: "Колумбия",
    price: 4.50,
    priceUnit: "лв/стрък",
    description: "Класически червени рози първо качество от Колумбия. Дълги стъбла (60-70см), големи глави.",
    image: "/images/products/rose-red-colombia.jpg",
    inStock: true,
    featured: true,
    characteristics: ["Дължина 60-70см", "Студена верига", "Свежест 10-14 дни"],
  },
  {
    id: "rose-white-colombia",
    name: "Бели Рози",
    category: "ryazan-tsvyat",
    subcategory: "kolumbiya",
    origin: "Колумбия",
    price: 4.20,
    priceUnit: "лв/стрък",
    description: "Елегантни бели рози от колумбийски ферми. Идеални за сватби и специални събития.",
    image: "/images/products/rose-white-colombia.jpg",
    inStock: true,
    featured: true,
    characteristics: ["Дължина 60-70см", "Чисто бели", "Свежест 10-14 дни"],
  },
  {
    id: "carnation-mix-colombia",
    name: "Карнации Микс",
    category: "ryazan-tsvyat",
    subcategory: "kolumbiya",
    origin: "Колумбия",
    price: 2.80,
    priceUnit: "лв/стрък",
    description: "Разноцветни карнации с дълготрайна свежест. Различни цветове.",
    image: "/images/products/carnation-mix-colombia.jpg",
    inStock: true,
    characteristics: ["Дълготрайни", "Различни цветове", "Свежест 14-21 дни"],
  },

  // Рязан цвят от Кения
  {
    id: "rose-pink-kenya",
    name: "Розови Рози",
    category: "ryazan-tsvyat",
    subcategory: "keniya",
    origin: "Кения",
    price: 4.00,
    priceUnit: "лв/стрък",
    description: "Нежни розови рози от кенийски плантации. Високо качество и свежест.",
    image: "/images/products/rose-pink-kenya.jpg",
    inStock: true,
    featured: true,
    characteristics: ["Дължина 60см", "Нежен цвят", "Свежест 10-12 дни"],
  },
  {
    id: "alstroemeria-kenya",
    name: "Алстромерия",
    category: "ryazan-tsvyat",
    subcategory: "keniya",
    origin: "Кения",
    price: 3.50,
    priceUnit: "лв/стрък",
    description: "Екзотична алстромерия с дълъг живот. Идеална за букети.",
    image: "/images/products/alstroemeria-kenya.jpg",
    inStock: true,
    characteristics: ["Тропически вид", "Многоцветни", "Свежест 14-18 дни"],
  },

  // Рязан цвят от Нидерландия
  {
    id: "tulip-red-netherlands",
    name: "Лалета Червени",
    category: "ryazan-tsvyat",
    subcategory: "niderlandiya",
    origin: "Нидерландия",
    price: 3.20,
    priceUnit: "лв/стрък",
    description: "Класически холандски лалета. Пролетна свежест през цялата година.",
    image: "/images/products/tulip-red-netherlands.jpg",
    inStock: true,
    featured: true,
    characteristics: ["Холандско качество", "Ярък цвят", "Свежест 7-10 дни"],
  },
  {
    id: "tulip-yellow-netherlands",
    name: "Лалета Жълти",
    category: "ryazan-tsvyat",
    subcategory: "niderlandiya",
    origin: "Нидерландия",
    price: 3.20,
    priceUnit: "лв/стрък",
    description: "Слънчеви жълти лалета от Холандия. Символ на пролетта.",
    image: "/images/products/tulip-yellow-netherlands.jpg",
    inStock: true,
    characteristics: ["Холандско качество", "Весел цвят", "Свежест 7-10 дни"],
  },
  {
    id: "gerbera-netherlands",
    name: "Гербери Микс",
    category: "ryazan-tsvyat",
    subcategory: "niderlandiya",
    origin: "Нидерландия",
    price: 3.80,
    priceUnit: "лв/стрък",
    description: "Цветни гербери с големи глави. Радостни и дълготрайни.",
    image: "/images/products/gerbera-netherlands.jpg",
    inStock: true,
    characteristics: ["Големи глави", "Весели цветове", "Свежест 10-14 дни"],
  },

  // Саксийни растения - Орхидеи
  {
    id: "orchid-phalaenopsis-white",
    name: "Орхидея Фаленопсис Бяла",
    category: "saksiyni-rasteniya",
    subcategory: "stayni",
    origin: "Нидерландия",
    price: 45.00,
    priceUnit: "лв/саксия",
    description: "Елегантна бяла орхидея в декоративна саксия. Дългоцветяща.",
    image: "/images/products/orchid-phalaenopsis-white.jpg",
    inStock: true,
    featured: true,
    characteristics: ["2-3 стрелки", "Лесна поддръжка", "Цъфти 2-3 месеца"],
  },
  {
    id: "orchid-phalaenopsis-pink",
    name: "Орхидея Фаленопсис Розова",
    category: "saksiyni-rasteniya",
    subcategory: "stayni",
    origin: "Нидерландия",
    price: 45.00,
    priceUnit: "лв/саксия",
    description: "Нежна розова орхидея, идеална за подарък.",
    image: "/images/products/orchid-phalaenopsis-pink.jpg",
    inStock: true,
    characteristics: ["2-3 стрелки", "Лесна поддръжка", "Цъфти 2-3 месеца"],
  },

  // Саксийни растения - Зелени
  {
    id: "monstera-deliciosa",
    name: "Монстера Деликатна",
    category: "saksiyni-rasteniya",
    subcategory: "stayni",
    origin: "Нидерландия",
    price: 38.00,
    priceUnit: "лв/саксия",
    description: "Тропично растение с характерни резени листа. Модерен избор.",
    image: "/images/products/monstera-deliciosa.jpg",
    inStock: true,
    featured: true,
    characteristics: ["Голямо растение", "Лесна поддръжка", "Пречиства въздуха"],
  },
  {
    id: "ficus-lyrata",
    name: "Фикус Лирата",
    category: "saksiyni-rasteniya",
    subcategory: "stayni",
    origin: "Нидерландия",
    price: 42.00,
    priceUnit: "лв/саксия",
    description: "Декоративен фикус с големи листа. Модерно интериорно растение.",
    image: "/images/products/ficus-lyrata.jpg",
    inStock: true,
    characteristics: ["Големи листа", "Внушителен вид", "Предпочита светлина"],
  },
  {
    id: "sansevieria-trifasciata",
    name: "Сансевиерия (Змийско растение)",
    category: "saksiyni-rasteniya",
    subcategory: "stayni",
    origin: "Нидерландия",
    price: 25.00,
    priceUnit: "лв/саксия",
    description: "Много издръжливо растение, идеално за начинаещи. Пречиства въздуха.",
    image: "/images/products/sansevieria-trifasciata.jpg",
    inStock: true,
    characteristics: ["Много издръжлива", "Минимална поддръжка", "Пречиства въздуха"],
  },

  // Средиземноморски от Гърция
  {
    id: "olive-tree-greece",
    name: "Маслиново Дърво",
    category: "hrasti-darveta",
    origin: "Гърция",
    price: 120.00,
    priceUnit: "лв",
    description: "Автентично средиземноморско маслиново дърво в саксия. Символ на дълголетие.",
    image: "/images/products/olive-tree-greece.jpg",
    inStock: true,
    characteristics: ["Средиземноморски вид", "Издръжливо", "За двор или тераса"],
  },
  {
    id: "lavender-greece",
    name: "Лавандула Гръцка",
    category: "sezonni-tsvetya",
    origin: "Гърция",
    price: 18.00,
    priceUnit: "лв/саксия",
    description: "Ароматна средиземноморска лавандула в саксия.",
    image: "/images/products/lavender-greece.jpg",
    inStock: true,
    characteristics: ["Силен аромат", "Цъфти лятото", "Медоносна"],
  },

  // Сезонни от Турция
  {
    id: "geranium-turkey",
    name: "Мушкато Микс",
    category: "sezonni-tsvetya",
    origin: "Турция",
    price: 12.00,
    priceUnit: "лв/саксия",
    description: "Цветно мушкато за балкони и градини. Дългоцветящо.",
    image: "/images/products/geranium-turkey.jpg",
    inStock: true,
    characteristics: ["Дългоцветящо", "За балкон", "Лесна поддръжка"],
  },
  {
    id: "petunia-turkey",
    name: "Петуния Каскада",
    category: "sezonni-tsvetya",
    origin: "Турция",
    price: 8.00,
    priceUnit: "лв/саксия",
    description: "Каскадна петуния с обилно цъфтене. Идеална за висящи саксии.",
    image: "/images/products/petunia-turkey.jpg",
    inStock: true,
    characteristics: ["Каскаден растеж", "Обилно цъфтене", "За висящи саксии"],
  },

  // Български продукти
  {
    id: "rose-damascena-bulgaria",
    name: "Роза Дамасцена (Българска)",
    category: "hrasti-darveta",
    origin: "България",
    price: 35.00,
    priceUnit: "лв",
    description: "Автентична българска маслодайна роза. Символ на България.",
    image: "/images/products/rose-damascena-bulgaria.jpg",
    inStock: true,
    featured: true,
    characteristics: ["Българско наследство", "Силен аромат", "Маслодайна"],
  },
  {
    id: "lavender-bulgaria",
    name: "Лавандула Българска",
    category: "sezonni-tsvetya",
    origin: "България",
    price: 15.00,
    priceUnit: "лв/саксия",
    description: "Българска лавандула с интензивен аромат. От родопските полета.",
    image: "/images/products/lavender-bulgaria.jpg",
    inStock: true,
    characteristics: ["Български сорт", "Силен аромат", "Медоносна"],
  },
  {
    id: "rose-bush-bulgaria",
    name: "Розов Храст (Микс)",
    category: "hrasti-darveta",
    origin: "България",
    price: 28.00,
    priceUnit: "лв",
    description: "Градински розов храст, български сортове. Различни цветове.",
    image: "/images/products/rose-bush-bulgaria.jpg",
    inStock: true,
    characteristics: ["Градински сорт", "Издръжлив", "Цъфти май-октомври"],
  },
];

// Помощни функции
export function getProductsByCategory(category: Product["category"]) {
  return products.filter((p) => p.category === category);
}

export function getProductsByOrigin(origin: Product["origin"]) {
  return products.filter((p) => p.origin === origin);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getInStockProducts() {
  return products.filter((p) => p.inStock);
}