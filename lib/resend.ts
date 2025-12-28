import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@exoticflowers.bg";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gardenexotic.bg";

// Email Templates

export function getB2BRegistrationEmail(companyName: string, mol: string) {
  return {
    subject: `Нова B2B регистрация: ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2D5A3D 0%, #1E3D29 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4A853; }
          .btn { display: inline-block; background: #D4A853; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Exotic Flowers B2B</h1>
          </div>
          <div class="content">
            <h2>Нова B2B регистрация!</h2>
            <p>Получихте нова заявка за B2B партньорство.</p>

            <div class="info-box">
              <p><strong>Фирма:</strong> ${companyName}</p>
              <p><strong>МОЛ:</strong> ${mol}</p>
            </div>

            <p>Влезте в админ панела, за да прегледате и одобрите заявката.</p>

            <p style="text-align: center; margin-top: 30px;">
              <a href="https://gardenexotic.bg/admin/b2b" class="btn">Към B2B панела</a>
            </p>
          </div>
          <div class="footer">
            <p>Exotic Flowers &copy; ${new Date().getFullYear()}</p>
            <p>Телефон: 089 567 0370</p>
            <p>Варна | Нова Загора</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function getB2BApprovalEmail(companyName: string, tier: string, discount: number) {
  return {
    subject: `Вашата B2B регистрация е одобрена - Exotic Flowers`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2D5A3D 0%, #1E3D29 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; }
          .success-box { background: #E8F5E9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .tier-badge { display: inline-block; background: #D4A853; color: white; padding: 8px 20px; border-radius: 20px; font-weight: 600; margin: 10px 0; }
          .discount { font-size: 36px; font-weight: bold; color: #2D5A3D; }
          .btn { display: inline-block; background: #D4A853; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Exotic Flowers B2B</h1>
          </div>
          <div class="content">
            <div class="success-box">
              <h2 style="color: #2D5A3D; margin-top: 0;">Поздравления!</h2>
              <p>Вашата B2B регистрация за <strong>${companyName}</strong> беше одобрена.</p>
              <span class="tier-badge">${tier.toUpperCase()} партньор</span>
              <p class="discount">-${discount}%</p>
              <p>отстъпка на всички продукти</p>
            </div>

            <p>Вече имате достъп до:</p>
            <ul>
              <li>Преференциални B2B цени</li>
              <li>Пълен каталог на едро</li>
              <li>Бързо поръчване</li>
              <li>История на заявките</li>
            </ul>

            <p style="text-align: center; margin-top: 30px;">
              <a href="https://gardenexotic.bg/b2b/katalog" class="btn">Влез в B2B портала</a>
            </p>
          </div>
          <div class="footer">
            <p>Exotic Flowers &copy; ${new Date().getFullYear()}</p>
            <p>Телефон: 089 567 0370</p>
            <p>Варна | Нова Загора</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function getOrderConfirmationEmail(
  companyName: string,
  orderNumber: string,
  items: Array<{ product_name: string; quantity: number; total_price: number }>,
  total: number,
  discount: number
) {
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.product_name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${item.total_price.toFixed(2)} лв</td>
      </tr>
    `
    )
    .join("");

  return {
    subject: `Заявка ${orderNumber} - Exotic Flowers B2B`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2D5A3D 0%, #1E3D29 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; }
          .order-number { background: #D4A853; color: white; padding: 10px 20px; border-radius: 8px; display: inline-block; font-size: 18px; font-weight: 600; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; border-radius: 8px; overflow: hidden; }
          th { background: #2D5A3D; color: white; padding: 12px; text-align: left; }
          .total-row { background: #E8F5E9; font-weight: bold; }
          .discount-row { color: #2D5A3D; }
          .btn { display: inline-block; background: #D4A853; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Exotic Flowers B2B</h1>
          </div>
          <div class="content">
            <p style="text-align: center;">
              <span class="order-number">Заявка ${orderNumber}</span>
            </p>

            <p>Здравейте,</p>
            <p>Получихме вашата B2B заявка за <strong>${companyName}</strong>.</p>

            <table>
              <thead>
                <tr>
                  <th>Продукт</th>
                  <th style="text-align: center;">Количество</th>
                  <th style="text-align: right;">Цена</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr class="discount-row">
                  <td colspan="2" style="padding: 12px; text-align: right;">Отстъпка (${discount}%):</td>
                  <td style="padding: 12px; text-align: right;">-${((total / (1 - discount / 100)) * (discount / 100)).toFixed(2)} лв</td>
                </tr>
                <tr class="total-row">
                  <td colspan="2" style="padding: 12px; text-align: right;">ОБЩО:</td>
                  <td style="padding: 12px; text-align: right; font-size: 18px;">${total.toFixed(2)} лв</td>
                </tr>
              </tbody>
            </table>

            <p>Ще се свържем с вас за потвърждение на заявката.</p>

            <p style="text-align: center; margin-top: 30px;">
              <a href="https://gardenexotic.bg/b2b/zayavki" class="btn">Виж заявките</a>
            </p>
          </div>
          <div class="footer">
            <p>Exotic Flowers &copy; ${new Date().getFullYear()}</p>
            <p>Телефон: 089 567 0370</p>
            <p>Варна | Нова Загора</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function getOrderStatusEmail(
  companyName: string,
  orderNumber: string,
  status: string,
  trackingNumber?: string
) {
  const statusLabels: Record<string, { label: string; color: string; message: string }> = {
    confirmed: { label: "Потвърдена", color: "#3B82F6", message: "Вашата заявка беше потвърдена и скоро ще започнем обработката." },
    processing: { label: "В обработка", color: "#8B5CF6", message: "Започнахме да подготвяме вашата поръчка." },
    shipped: { label: "Изпратена", color: "#6366F1", message: "Вашата поръчка беше изпратена!" },
    delivered: { label: "Доставена", color: "#22C55E", message: "Поръчката беше успешно доставена. Благодарим ви!" },
    cancelled: { label: "Отказана", color: "#EF4444", message: "За съжаление, вашата заявка беше отказана. Свържете се с нас за повече информация." },
  };

  const statusInfo = statusLabels[status] || { label: status, color: "#666", message: "" };

  return {
    subject: `Заявка ${orderNumber}: ${statusInfo.label} - Exotic Flowers`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2D5A3D 0%, #1E3D29 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; }
          .status-badge { display: inline-block; background: ${statusInfo.color}; color: white; padding: 10px 25px; border-radius: 25px; font-size: 18px; font-weight: 600; }
          .tracking-box { background: #E8F5E9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .btn { display: inline-block; background: #D4A853; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Exotic Flowers B2B</h1>
          </div>
          <div class="content">
            <p style="text-align: center;">
              <span class="status-badge">${statusInfo.label}</span>
            </p>

            <h2 style="text-align: center;">Заявка ${orderNumber}</h2>

            <p>Здравейте,</p>
            <p>${statusInfo.message}</p>

            ${trackingNumber ? `
            <div class="tracking-box">
              <p style="margin: 0;"><strong>Номер за проследяване:</strong></p>
              <p style="font-size: 24px; font-weight: bold; color: #2D5A3D; margin: 10px 0;">${trackingNumber}</p>
            </div>
            ` : ""}

            <p style="text-align: center; margin-top: 30px;">
              <a href="https://gardenexotic.bg/b2b/zayavki" class="btn">Виж детайли</a>
            </p>
          </div>
          <div class="footer">
            <p>Exotic Flowers &copy; ${new Date().getFullYear()}</p>
            <p>Телефон: 089 567 0370</p>
            <p>Варна | Нова Загора</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}
