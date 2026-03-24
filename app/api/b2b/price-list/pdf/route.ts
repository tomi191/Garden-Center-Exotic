import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Extend jsPDF type for autoTable plugin
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: {
      head?: string[][];
      body?: (string | number)[][];
      startY?: number;
      theme?: string;
      headStyles?: Record<string, unknown>;
      styles?: Record<string, unknown>;
      columnStyles?: Record<number, Record<string, unknown>>;
      margin?: { left?: number; right?: number };
      didDrawPage?: (data: { pageNumber: number }) => void;
    }) => jsPDF;
    lastAutoTable?: { finalY: number };
  }
}

const b2bCategoryLabels: Record<string, string> = {
  saksiya: "Саксия",
  "ryazan-tsvyat": "Рязан цвят",
  kashpi: "Кашпи",
  pochva: "Почва",
};

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch products with B2B prices
    const { data: products, error } = await supabaseAdmin
      .from("Product")
      .select("id, name, price, priceUnit, b2b_price, b2b_category, inStock")
      .not("b2b_price", "is", null)
      .order("b2b_category", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Грешка при зареждане на продуктите" },
        { status: 500 }
      );
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "Няма продукти с B2B цени" },
        { status: 400 }
      );
    }

    // Group products by B2B category
    const groupedProducts: Record<string, typeof products> = {};
    for (const product of products) {
      const category = product.b2b_category || "other";
      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }
      groupedProducts[category].push(product);
    }

    // Create PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(24);
    doc.setTextColor(45, 90, 61); // Primary green
    doc.text("Exotic Flowers", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text("B2B Ценоразпис", pageWidth / 2, 30, { align: "center" });

    // Date
    const today = new Date();
    const dateStr = today.toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.setFontSize(10);
    doc.text(`Дата: ${dateStr}`, pageWidth / 2, 38, { align: "center" });

    let startY = 50;

    // Categories in order
    const categoryOrder = ["saksiya", "ryazan-tsvyat", "kashpi", "pochva", "other"];

    for (const category of categoryOrder) {
      const categoryProducts = groupedProducts[category];
      if (!categoryProducts || categoryProducts.length === 0) continue;

      // Category header
      const categoryLabel = b2bCategoryLabels[category] || "Други";

      doc.setFontSize(14);
      doc.setTextColor(45, 90, 61);
      doc.text(categoryLabel, 14, startY);
      startY += 5;

      // Product table
      const tableData = categoryProducts.map((p) => [
        p.name,
        p.inStock ? "Да" : "Не",
        `${p.b2b_price?.toFixed(2)} ${p.priceUnit}`,
      ]);

      doc.autoTable({
        head: [["Продукт", "Наличен", "B2B Цена"]],
        body: tableData,
        startY: startY,
        theme: "striped",
        headStyles: {
          fillColor: [45, 90, 61],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: {
          fontSize: 10,
          cellPadding: 4,
        },
        columnStyles: {
          0: { cellWidth: 100 },
          1: { cellWidth: 30, halign: "center" },
          2: { cellWidth: 40, halign: "right" },
        },
        margin: { left: 14, right: 14 },
        didDrawPage: (data) => {
          // Footer on each page
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          doc.text(
            `Exotic Flowers - B2B Ценоразпис | Страница ${data.pageNumber}`,
            pageWidth / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: "center" }
          );
          doc.text(
            "Тел: 089 567 0370 | exoticflowers.bg",
            pageWidth / 2,
            doc.internal.pageSize.getHeight() - 6,
            { align: "center" }
          );
        },
      });

      startY = (doc.lastAutoTable?.finalY || startY) + 15;

      // Check if we need a new page
      if (startY > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        startY = 20;
      }
    }

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="B2B-Cenorazpis-${today.toISOString().split("T")[0]}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Грешка при генериране на PDF" },
      { status: 500 }
    );
  }
}
