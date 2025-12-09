import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Existing products data (from data/products.ts)
const existingProducts = [
  {
    id: "rose-red-colombia",
    name: "Червени Рози",
    category: "ryazan-tsvyat",
    subcategory: "kolumbiya",
    origin: "Колумбия",
    price: 4.50,
    priceUnit: "лв/стрък",
    description: "Класически червени рози първо качество от Колумбия. Дълги стъбла (60-70см), големи глави.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1561359934-84d7e5a9855f?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1551897373-41ec64e6d284?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
    characteristics: ["Дълготрайни", "Различни цветове", "Свежест 14-21 дни"],
  },
  {
    id: "rose-pink-kenya",
    name: "Розови Рози",
    category: "ryazan-tsvyat",
    subcategory: "keniya",
    origin: "Кения",
    price: 4.00,
    priceUnit: "лв/стрък",
    description: "Нежни розови рози от кенийски плантации. Високо качество и свежест.",
    image: "https://images.unsplash.com/photo-1572097662698-8f4b67b4b06a?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1601985705806-5b1790d0cc9e?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
    characteristics: ["Тропически вид", "Многоцветни", "Свежест 14-18 дни"],
  },
  {
    id: "tulip-red-netherlands",
    name: "Лалета Червени",
    category: "ryazan-tsvyat",
    subcategory: "niderlandiya",
    origin: "Нидерландия",
    price: 3.20,
    priceUnit: "лв/стрък",
    description: "Класически холандски лалета. Пролетна свежест през цялата година.",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
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
    image: "https://images.unsplash.com/photo-1587814213271-7a66ceb0193c?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
    characteristics: ["Големи глави", "Весели цветове", "Свежест 10-14 дни"],
  },
  {
    id: "orchid-phalaenopsis-white",
    name: "Орхидея Фаленопсис Бяла",
    category: "saksiyni-rasteniya",
    subcategory: "stayni",
    origin: "Нидерландия",
    price: 45.00,
    priceUnit: "лв/саксия",
    description: "Елегантна бяла орхидея в декоративна саксия. Дългоцветяща.",
    image: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1532188363366-3a0ac90c3b96?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
    characteristics: ["2-3 стрелки", "Лесна поддръжка", "Цъфти 2-3 месеца"],
  },
  {
    id: "monstera-deliciosa",
    name: "Монстера Деликатна",
    category: "saksiyni-rasteniya",
    subcategory: "stayni",
    origin: "Нидерландия",
    price: 38.00,
    priceUnit: "лв/саксия",
    description: "Тропично растение с характерни резени листа. Модерен избор.",
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
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
    image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
    characteristics: ["Много издръжлива", "Минимална поддръжка", "Пречиства въздуха"],
  },
  {
    id: "olive-tree-greece",
    name: "Маслиново Дърво",
    category: "hrasti-darveta",
    origin: "Гърция",
    price: 120.00,
    priceUnit: "лв",
    description: "Автентично средиземноморско маслиново дърво в саксия. Символ на дълголетие.",
    image: "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
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
    image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
    characteristics: ["Силен аромат", "Цъфти лятото", "Медоносна"],
  },
  {
    id: "geranium-turkey",
    name: "Мушкато Микс",
    category: "sezonni-tsvetya",
    origin: "Турция",
    price: 12.00,
    priceUnit: "лв/саксия",
    description: "Цветно мушкато за балкони и градини. Дългоцветящо.",
    image: "https://images.unsplash.com/photo-1593691509545-38c86c65d3ad?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
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
    image: "https://images.unsplash.com/photo-1592577474990-2389e56bbcae?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
    characteristics: ["Каскаден растеж", "Обилно цъфтене", "За висящи саксии"],
  },
  {
    id: "rose-damascena-bulgaria",
    name: "Роза Дамасцена (Българска)",
    category: "hrasti-darveta",
    origin: "България",
    price: 35.00,
    priceUnit: "лв",
    description: "Автентична българска маслодайна роза. Символ на България.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
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
    image: "https://images.unsplash.com/photo-1455582916367-25f75bfc6710?q=80&w=800&auto=format&fit=crop",
    inStock: true,
    featured: false,
    characteristics: ["Градински сорт", "Издръжлив", "Цъфти май-октомври"],
  },
];

async function main() {
  console.log("🌱 Starting seed...");

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@gardenexotic.bg";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Administrator",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);

  // Seed products
  let created = 0;
  let skipped = 0;

  for (const product of existingProducts) {
    const existingProduct = await prisma.product.findUnique({
      where: { slug: product.id },
    });

    if (existingProduct) {
      skipped++;
      continue;
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.id,
        category: product.category,
        subcategory: product.subcategory || null,
        origin: product.origin,
        price: product.price,
        priceUnit: product.priceUnit,
        description: product.description,
        image: product.image,
        inStock: product.inStock,
        featured: product.featured || false,
        characteristics: product.characteristics || [],
      },
    });

    created++;
  }

  console.log(`✅ Products: ${created} created, ${skipped} skipped (already exist)`);
  console.log("🌱 Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
