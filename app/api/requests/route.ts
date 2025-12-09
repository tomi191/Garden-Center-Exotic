import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { z } from "zod";

// Validation schema for creating/updating requests
const requestSchema = z.object({
  clientName: z.string().min(1, "Името на клиента е задължително"),
  clientPhone: z.string().min(1, "Телефонът е задължителен"),
  clientEmail: z.string().email("Невалиден имейл").optional().or(z.literal("")),
  productId: z.string().optional().nullable(),
  productName: z.string().min(1, "Продуктът е задължителен"),
  quantity: z.number().positive("Количеството трябва да е положително число"),
  unit: z.string().min(1, "Единицата е задължителна"),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
  dueDate: z.string().min(1, "Датата е задължителна"),
  notes: z.string().optional().nullable(),
  internalNotes: z.string().optional().nullable(),
});

// GET - Protected endpoint to fetch all requests (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query = supabaseAdmin.from("Request").select("*");

    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    if (search) {
      query = query.or(`clientName.ilike.%${search}%,productName.ilike.%${search}%`);
    }

    const { data: requests, error } = await query.order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error);
      return NextResponse.json(
        { error: "Грешка при зареждане на заявките" },
        { status: 500 }
      );
    }

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на заявките" },
      { status: 500 }
    );
  }
}

// POST - Protected endpoint to create a new request
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = requestSchema.parse(body);

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
        status: validated.status,
        dueDate: validated.dueDate,
        notes: validated.notes || null,
        internalNotes: validated.internalNotes || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating request:", error);
      return NextResponse.json(
        { error: "Грешка при създаване на заявката" },
        { status: 500 }
      );
    }

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Невалидни данни", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Грешка при създаване на заявката" },
      { status: 500 }
    );
  }
}
