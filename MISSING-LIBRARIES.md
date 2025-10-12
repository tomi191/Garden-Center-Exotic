# Липсващи библиотеки за модерен Next.js сайт 2025

## 🚀 Критични за добавяне

### 1. Analytics & Performance
```bash
npm install @vercel/analytics @vercel/speed-insights
```
**Защо:** Проследяване на посетители и performance metrics

### 2. Image Optimization
```bash
npm install sharp
```
**Защо:** Автоматична оптимизация на изображения, по-бързо зареждане

### 3. Dark Mode
```bash
npm install next-themes
```
**Защо:** Модерен dark mode с localStorage persistence

### 4. SEO
```bash
npm install next-sitemap
```
**Защо:** Автоматично генериране на sitemap.xml и robots.txt

## 🎨 UI/UX подобрения

### 5. Notifications
```bash
npm install react-hot-toast sonner
```
**Защо:** Модерни toast notifications за feedback

### 6. Carousel/Slider
```bash
npm install embla-carousel-react
```
**Защо:** Модерен carousel за products gallery

### 7. Animations
```bash
npm install react-intersection-observer
```
**Защо:** По-добър контрол на scroll animations, по-малко ре-renders

### 8. Form улучшения
```bash
npm install @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-toast
```
**Защо:** По-добри form елементи с accessibility

## 📊 Допълнителни (опционални)

### 9. Content Management
```bash
npm install contentlayer next-contentlayer
```
**Защо:** За блог posts с MDX

### 10. Icons
```bash
npm install @iconify/react
```
**Защо:** Достъп до 200,000+ икони

### 11. Animations улучшения
```bash
npm install @formkit/auto-animate
```
**Защо:** Автоматични smooth transitions

### 12. Image Gallery
```bash
npm install yet-another-react-lightbox
```
**Защо:** Модерна lightbox за product images

## 📝 Препоръчителни Next.js 15 подобрения

### 13. Използвай Next.js Image компонент
Замени всички `<img>` с `<Image>` от `next/image`

### 14. Metadata API
Използвай новия Metadata API навсякъде

### 15. Server Components
Направи повече компоненти Server Components за по-добър performance

## 🔧 Package.json след добавянето:

```json
{
  "dependencies": {
    // Съществуващи...
    "@vercel/analytics": "^1.3.1",
    "@vercel/speed-insights": "^1.1.0",
    "next-themes": "^0.4.4",
    "react-hot-toast": "^2.4.1",
    "embla-carousel-react": "^8.5.1",
    "react-intersection-observer": "^9.13.1",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    // Съществуващи...
    "next-sitemap": "^4.2.3"
  }
}
```

## ⚡ Инструкции за внедряване

1. **Инсталирай всички наведнъж:**
```bash
npm install @vercel/analytics @vercel/speed-insights next-themes react-hot-toast embla-carousel-react react-intersection-observer sharp next-sitemap
```

2. **Конфигурирай в layout.tsx:**
```tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

3. **Добави Toaster за notifications:**
```tsx
import { Toaster } from 'react-hot-toast';

// В layout или app
<Toaster position="top-right" />
```
