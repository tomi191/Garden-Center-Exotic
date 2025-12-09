import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { z } from "zod";

// Validation schema for public request (customer submitting from catalog)
const publicRequestSchema = z.object({
  clientName: z.string().min(1, "Името е задължително"),
  clientPhone: z.string().min(1, "Телефонът е задължителен"),
  clientEmail: z.string().email("Невалиден имейл").optional().or(z.literal("")),
  productId: z.string().optional().nullable(),
  productName: z.string().min(1, "Продуктът е задължителен"),
  quantity: z.number().positive("Количеството трябва да е положително число"),
  unit: z.string().min(1, "Единицата е задължителна"),
  notes: z.string().optional().nullable(),
});

// POST - Public endpoint for customers to submit requests from catalog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = publicRequestSchema.parse(body);

    // Generate unique ID
    const id = `req${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    const { data: newRequest, error } = await supabaseAdmin
      .from("Request")
      .insert({
        id,
        clientName: validated.clientName,
        clientPhone: validated.clientPhone,
        clientEmail: validated.clientEmail || null,
        productId: validated.productId || null,
        productName: validated.productName,
        quantity: validated.quantity,
        unit: validated.unit,
        status: "pending",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Default 7 days from now
        notes: validated.notes || null,
        internalNotes: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating public request:", error);
      return NextResponse.json(
        { error: "Грешка при изпращане на заявката" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Заявката е изпратена успешно! Ще се свържем с вас скоро.",
      requestId: newRequest.id,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating public request:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Моля, попълнете всички задължителни полета", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Грешка при изпращане на заявката" },
      { status: 500 }
    );
  }
}
