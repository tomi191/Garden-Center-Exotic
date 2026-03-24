import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// DELETE - Delete admin user (auth required)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
    }

    const { id } = await params;

    // Cannot delete yourself
    if (session.user.id === id) {
      return NextResponse.json(
        { error: "Не можете да изтриете собствения си акаунт" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("User")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json(
        { error: "Грешка при изтриване на потребителя" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Потребителят е изтрит успешно" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Грешка при изтриване на потребителя" },
      { status: 500 }
    );
  }
}

// PATCH - Update user (auth required)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updates: Record<string, string> = {};
    if (body.name) updates.name = body.name;
    if (body.email) updates.email = body.email;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Няма данни за обновяване" },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabaseAdmin
      .from("User")
      .update(updates)
      .eq("id", id)
      .select("id, email, name, role, createdAt")
      .single();

    if (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на потребителя" },
        { status: 500 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на потребителя" },
      { status: 500 }
    );
  }
}
