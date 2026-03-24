import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

// PATCH - Update own profile / change password (auth required)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
    }

    const body = await request.json();
    const { name, currentPassword, newPassword } = body;

    // If changing password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Моля, въведете текущата парола" },
          { status: 400 }
        );
      }

      // Fetch current user with password
      const { data: user, error: fetchError } = await supabaseAdmin
        .from("User")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (fetchError || !user) {
        return NextResponse.json(
          { error: "Потребителят не е намерен" },
          { status: 404 }
        );
      }

      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json(
          { error: "Невалидна текуща парола" },
          { status: 400 }
        );
      }

      // Hash new password and update
      const hash = await bcrypt.hash(newPassword, 12);
      const { error: updateError } = await supabaseAdmin
        .from("User")
        .update({ password: hash })
        .eq("id", session.user.id);

      if (updateError) {
        console.error("Error updating password:", updateError);
        return NextResponse.json(
          { error: "Грешка при промяна на паролата" },
          { status: 500 }
        );
      }
    }

    // If changing name
    if (name) {
      const { error: updateError } = await supabaseAdmin
        .from("User")
        .update({ name })
        .eq("id", session.user.id);

      if (updateError) {
        console.error("Error updating name:", updateError);
        return NextResponse.json(
          { error: "Грешка при обновяване на името" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: "Профилът е обновен успешно" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на профила" },
      { status: 500 }
    );
  }
}
