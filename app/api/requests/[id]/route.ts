import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Protected endpoint to fetch a single request
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const { data: requestData, error } = await supabaseAdmin
      .from("Request")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !requestData) {
      return NextResponse.json(
        { error: "Заявката не е намерена" },
        { status: 404 }
      );
    }

    return NextResponse.json(requestData);
  } catch (error) {
    console.error("Error fetching request:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на заявката" },
      { status: 500 }
    );
  }
}

// PUT - Protected endpoint to update a request
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Check if request exists
    const { data: existingRequest } = await supabaseAdmin
      .from("Request")
      .select("id")
      .eq("id", id)
      .single();

    if (!existingRequest) {
      return NextResponse.json(
        { error: "Заявката не е намерена" },
        { status: 404 }
      );
    }

    const { data: updatedRequest, error } = await supabaseAdmin
      .from("Request")
      .update({
        clientName: body.clientName,
        clientPhone: body.clientPhone,
        clientEmail: body.clientEmail || null,
        productId: body.productId || null,
        productName: body.productName,
        quantity: body.quantity,
        unit: body.unit,
        status: body.status,
        dueDate: body.dueDate,
        notes: body.notes || null,
        internalNotes: body.internalNotes || null,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating request:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на заявката" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на заявката" },
      { status: 500 }
    );
  }
}

// DELETE - Protected endpoint to delete a request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if request exists
    const { data: existingRequest } = await supabaseAdmin
      .from("Request")
      .select("id")
      .eq("id", id)
      .single();

    if (!existingRequest) {
      return NextResponse.json(
        { error: "Заявката не е намерена" },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin
      .from("Request")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting request:", error);
      return NextResponse.json(
        { error: "Грешка при изтриване на заявката" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting request:", error);
    return NextResponse.json(
      { error: "Грешка при изтриване на заявката" },
      { status: 500 }
    );
  }
}

// PATCH - Protected endpoint for quick status updates
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const { data: updatedRequest, error } = await supabaseAdmin
      .from("Request")
      .update({
        ...body,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error patching request:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на заявката" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error("Error patching request:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на заявката" },
      { status: 500 }
    );
  }
}
