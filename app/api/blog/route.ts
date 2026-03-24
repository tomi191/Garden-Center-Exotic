import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { generateSlug } from "@/lib/content-engine/utils/slug-generator";

// GET - List blog posts (public for published, all for authenticated)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let query = supabaseAdmin.from("blog_posts").select("*");

    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    const { data: posts, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
      return NextResponse.json(
        { error: "Грешка при зареждане на статиите" },
        { status: 500 }
      );
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на статиите" },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post (authenticated)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Неоторизиран достъп" }, { status: 401 });
    }

    const body = await request.json();

    // Generate slug if not provided
    let slug = body.slug || generateSlug(body.title);

    // Check slug uniqueness
    const { data: existing } = await supabaseAdmin
      .from("blog_posts")
      .select("slug")
      .eq("slug", slug)
      .single();

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const now = new Date().toISOString();
    const isPublished = body.status === "published";

    const { data: post, error } = await supabaseAdmin
      .from("blog_posts")
      .insert({
        title: body.title,
        slug,
        excerpt: body.excerpt || null,
        content: body.content,
        meta_title: body.meta_title || body.title,
        meta_description: body.meta_description || null,
        category: body.category || "Общи",
        author: body.author || "Градински Център Екзотик",
        image: body.image || null,
        featured: body.featured || false,
        status: body.status || "draft",
        tags: body.tags || [],
        keywords: body.keywords || [],
        word_count: body.word_count || 0,
        reading_time: body.reading_time || 0,
        content_type: body.content_type || "tofu",
        ai_model: body.ai_model || null,
        created_at: now,
        updated_at: now,
        published_at: isPublished ? now : null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating blog post:", error);
      return NextResponse.json(
        { error: "Грешка при създаване на статията" },
        { status: 500 }
      );
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Грешка при създаване на статията" },
      { status: 500 }
    );
  }
}
