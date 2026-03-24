import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL, OWNER_EMAIL } from "@/lib/resend";

// PATCH - Update message status or reply
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

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (body.status) {
      updates.status = body.status;
    }

    if (body.admin_reply) {
      updates.admin_reply = body.admin_reply;
      updates.status = "replied";
      updates.replied_at = new Date().toISOString();
      updates.replied_by = session.user?.name || session.user?.email || "Admin";

      // Get the original message to find the customer email
      const { data: message } = await supabaseAdmin
        .from("contact_messages")
        .select("name, email, message, inquiry_type")
        .eq("id", id)
        .single();

      if (message) {
        // Send reply email to customer
        try {
          await resend.emails.send({
            from: FROM_EMAIL,
            to: message.email,
            replyTo: OWNER_EMAIL,
            subject: `Отговор на вашето запитване - Градински Център Екзотик`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #2D5A3D 0%, #1E3D29 100%); padding: 24px; text-align: center; border-radius: 12px 12px 0 0; }
                  .header h1 { color: white; margin: 0; font-size: 20px; }
                  .content { background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; }
                  .original { background: #f0f0f0; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 3px solid #ccc; font-size: 14px; color: #666; }
                  .reply { background: white; padding: 20px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #2D5A3D; }
                  .footer { text-align: center; padding: 16px; color: #999; font-size: 11px; }
                  .contact { background: #E8F5E9; padding: 16px; border-radius: 8px; text-align: center; margin-top: 20px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Градински Център Екзотик</h1>
                  </div>
                  <div class="content">
                    <p>Здравейте, <strong>${message.name}</strong>!</p>
                    <p>Благодарим ви за запитването. Ето нашият отговор:</p>

                    <div class="reply">
                      <p style="margin:0;white-space:pre-wrap">${body.admin_reply}</p>
                    </div>

                    <div class="original">
                      <strong>Вашето запитване:</strong><br>
                      <p style="margin:8px 0 0;white-space:pre-wrap">${message.message}</p>
                    </div>

                    <div class="contact">
                      <p style="margin:0;font-size:14px;">Имате допълнителни въпроси?</p>
                      <p style="margin:4px 0 0;">
                        <strong>Телефон:</strong> <a href="tel:+359895670370">089 567 0370</a> |
                        <strong>Viber:</strong> <a href="viber://chat?number=%2B359895670370">+359895670370</a>
                      </p>
                    </div>
                  </div>
                  <div class="footer">
                    <p>Градински Център Екзотик &copy; ${new Date().getFullYear()}</p>
                    <p>Варна: ул. Франга дере 27А | Нова Загора: ул. Г.С. Раковски 19</p>
                    <p><a href="https://www.exoticflowers.bg">www.exoticflowers.bg</a></p>
                  </div>
                </div>
              </body>
              </html>
            `,
          });
        } catch (emailError) {
          console.error("Failed to send reply email:", emailError);
          return NextResponse.json(
            { error: "Отговорът е записан, но имейлът не можа да бъде изпратен." },
            { status: 207 }
          );
        }
      }
    }

    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Грешка при обновяване" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Грешка" }, { status: 500 });
  }
}

// DELETE - Delete a message
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

    const { error } = await supabaseAdmin
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: "Грешка при изтриване" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Грешка" }, { status: 500 });
  }
}
