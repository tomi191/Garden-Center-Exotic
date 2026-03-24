import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.enum(["varna", "nova-zagora"]),
  inquiryType: z.enum(["general", "b2b", "delivery", "plant-care", "complaint"]),
  message: z.string().min(10),
});

const inquiryLabels: Record<string, string> = {
  general: "Обща информация",
  b2b: "B2B услуги",
  delivery: "Доставка",
  "plant-care": "Грижи за растения",
  complaint: "Оплакване",
};

const locationLabels: Record<string, string> = {
  varna: "Варна",
  "nova-zagora": "Нова Загора",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const locationLabel = locationLabels[data.location] || data.location;
    const inquiryLabel = inquiryLabels[data.inquiryType] || data.inquiryType;

    // Send email notification to admin
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        replyTo: data.email,
        subject: `Ново запитване: ${inquiryLabel} от ${data.name}`,
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
              .info { background: white; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #D4A853; }
              .message-box { background: white; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #e5e7eb; }
              .label { color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
              .footer { text-align: center; padding: 16px; color: #999; font-size: 11px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Ново запитване от сайта</h1>
              </div>
              <div class="content">
                <div class="info">
                  <p style="margin:0"><strong>${data.name}</strong></p>
                  <p style="margin:4px 0"><a href="mailto:${data.email}">${data.email}</a></p>
                  ${data.phone ? `<p style="margin:4px 0"><a href="tel:${data.phone}">${data.phone}</a></p>` : ""}
                </div>
                <div style="display:flex;gap:16px;margin:16px 0">
                  <div style="flex:1;background:white;padding:12px;border-radius:8px;text-align:center">
                    <div class="label">Тема</div>
                    <strong>${inquiryLabel}</strong>
                  </div>
                  <div style="flex:1;background:white;padding:12px;border-radius:8px;text-align:center">
                    <div class="label">Локация</div>
                    <strong>${locationLabel}</strong>
                  </div>
                </div>
                <div class="message-box">
                  <div class="label">Съобщение</div>
                  <p style="margin:8px 0 0;white-space:pre-wrap">${data.message}</p>
                </div>
                <p style="font-size:12px;color:#999;text-align:center;margin-top:20px">
                  Можете да отговорите директно на този имейл.
                </p>
              </div>
              <div class="footer">
                Exotic Flowers &copy; ${new Date().getFullYear()} | exoticflowers.bg
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send contact email:", emailError);
      // Don't fail the request if email fails - data is still received
    }

    return NextResponse.json({
      success: true,
      message: "Запитването е изпратено успешно!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Моля, попълнете всички задължителни полета" },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Грешка при изпращане. Моля, опитайте отново." },
      { status: 500 }
    );
  }
}
