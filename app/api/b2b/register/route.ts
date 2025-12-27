import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hashPassword } from "@/lib/b2b-auth";
import { z } from "zod";

// Validation schema
const registerSchema = z.object({
  company_name: z.string().min(2, "Името на фирмата е задължително"),
  eik: z.string().length(9, "ЕИК трябва да бъде 9 цифри").or(z.string().length(13, "БУЛСТАТ трябва да бъде 13 цифри")),
  mol: z.string().min(2, "МОЛ е задължително"),
  email: z.string().email("Невалиден имейл адрес"),
  phone: z.string().min(10, "Телефонът трябва да бъде поне 10 символа"),
  address: z.string().optional(),
  city: z.string().optional(),
  password: z.string().min(6, "Паролата трябва да бъде поне 6 символа"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { error: firstError?.message || "Невалидни данни" },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if email already exists
    const { data: existingEmail } = await supabaseAdmin
      .from("b2b_companies")
      .select("id")
      .eq("email", data.email)
      .single();

    if (existingEmail) {
      return NextResponse.json(
        { error: "Този имейл адрес вече е регистриран" },
        { status: 400 }
      );
    }

    // Check if EIK already exists
    const { data: existingEik } = await supabaseAdmin
      .from("b2b_companies")
      .select("id")
      .eq("eik", data.eik)
      .single();

    if (existingEik) {
      return NextResponse.json(
        { error: "Фирма с този ЕИК вече е регистрирана" },
        { status: 400 }
      );
    }

    // Hash password
    const password_hash = await hashPassword(data.password);

    // Create company record
    const { data: company, error } = await supabaseAdmin
      .from("b2b_companies")
      .insert({
        company_name: data.company_name,
        eik: data.eik,
        mol: data.mol,
        email: data.email,
        phone: data.phone,
        address: data.address || null,
        city: data.city || null,
        password_hash,
        status: "pending",
        discount_percent: 10, // Default Silver tier discount
        payment_terms: 0,
        credit_limit: 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating B2B company:", error);
      return NextResponse.json(
        { error: "Грешка при създаване на акаунта. Моля, опитайте отново." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Регистрацията е успешна! Ще получите известие след одобрение.",
      company: {
        id: company.id,
        company_name: company.company_name,
        email: company.email,
        status: company.status,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Възникна грешка. Моля, опитайте отново." },
      { status: 500 }
    );
  }
}
