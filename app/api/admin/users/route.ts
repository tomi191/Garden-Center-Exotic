import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email("Невалиден имейл адрес"),
  name: z.string().min(2, "Името трябва да е поне 2 символа"),
  password: z.string().min(6, "Паролата трябва да е поне 6 символа"),
});

// GET - List all admin users (auth required)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
    }

    const { data: users, error } = await supabaseAdmin
      .from("User")
      .select("id, email, name, role, createdAt");

    if (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json(
        { error: "Грешка при зареждане на потребителите" },
        { status: 500 }
      );
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на потребителите" },
      { status: 500 }
    );
  }
}

// POST - Create new admin user (auth required)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
    }

    const body = await request.json();

    const validation = createUserSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Невалидни данни";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { email, name, password } = validation.data;

    // Check email uniqueness
    const { data: existing } = await supabaseAdmin
      .from("User")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Потребител с този имейл вече съществува" },
        { status: 409 }
      );
    }

    // Hash password
    const hash = await bcrypt.hash(password, 12);

    const { data: user, error } = await supabaseAdmin
      .from("User")
      .insert({
        email,
        name,
        password: hash,
        role: "admin",
      })
      .select("id, email, name, role, createdAt")
      .single();

    if (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Грешка при създаване на потребителя" },
        { status: 500 }
      );
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Грешка при създаване на потребителя" },
      { status: 500 }
    );
  }
}
