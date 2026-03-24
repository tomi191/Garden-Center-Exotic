import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Single blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !post) {
      return NextResponse.json({ error: "Статията не е намерена" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на статията" },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Неоторизиран достъп" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const { data: existing } = await supabaseAdmin
      .from("blog_posts")
      .select("id, status")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "Статията не е намерена" }, { status: 404 });
    }

    const now = new Date().toISOString();
    const wasPublished = existing.status === "published";
    const isPublishing = body.status === "published" && !wasPublished;

    const updateData: Record<string, unknown> = {
      ...body,
      updated_at: now,
    };

    if (isPublishing) {
      updateData.published_at = now;
    }

    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating blog post:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на статията" },
        { status: 500 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на статията" },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Неоторизиран достъп" }, { status: 401 });
    }

    const { id } = await params;

    const { data: existing } = await supabaseAdmin
      .from("blog_posts")
      .select("id")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "Статията не е намерена" }, { status: 404 });
    }

    const { error } = await supabaseAdmin
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting blog post:", error);
      return NextResponse.json(
        { error: "Грешка при изтриване на статията" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Грешка при изтриване на статията" },
      { status: 500 }
    );
  }
}

// PATCH - Quick update (toggle status, featured, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Неоторизиран достъп" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    // If publishing, set published_at
    if (body.status === "published") {
      const { data: existing } = await supabaseAdmin
        .from("blog_posts")
        .select("published_at")
        .eq("id", id)
        .single();

      if (existing && !existing.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error patching blog post:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на статията" },
        { status: 500 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error patching blog post:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на статията" },
      { status: 500 }
    );
  }
}
