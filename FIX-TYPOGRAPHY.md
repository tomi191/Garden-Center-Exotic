
# Typography Fix Report

## Текущи проблеми

### Големи текстове (трябва да се намалят):

1. **Описания под заглавия** - `text-xl` → `text-base` или `text-lg`
2. **Card заглавия** - `text-2xl` → `text-lg` или `text-xl`
3. **Статистики цифри** - `text-3xl/4xl` → `text-2xl/3xl`
4. **Hero описания** - `text-lg/xl` → `text-base/lg`

## Web Typography Standards 2025

```
body: 16px (1rem)
small: 14px (0.875rem)
base: 16px (1rem)
lg: 18px (1.125rem)
xl: 20px (1.25rem) - MAX за описания
2xl: 24px (1.5rem) - MAX за h3
3xl: 30px (1.875rem) - MAX за h2
4xl: 36px (2.25rem) - MAX за h1
```

## Препоръчани корекции по компоненти:

### Hero.tsx
- Заглавие: `text-3xl md:text-4xl lg:text-5xl` → `text-2xl md:text-3xl lg:text-4xl`
- Описание: `text-lg md:text-xl` → `text-base md:text-lg`
- Stats: `text-3xl` → `text-2xl`

### Описания (всички секции)
- От: `text-xl`
- На: `text-base` или `text-lg`

### Card заглавия
- От: `text-xl` или `text-2xl`
- На: `text-lg` или `text-xl` (макс)

### Stats/Numbers
- От: `text-3xl` или `text-4xl`
- На: `text-2xl` или `text-3xl` (макс)
