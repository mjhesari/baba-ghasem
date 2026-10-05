# از کجا تغییر بدهیم

برای عوض کردن محتوا، ظاهر را دست نزن. برای عوض کردن ظاهر، متن شعر را در کامپوننت تکرار نکن. هر کدام یک جا دارد.

## محتوا

| می‌خواهی عوض کنی | فایل |
| --- | --- |
| شعرها | `content/poems.ts` |
| دست‌نوشته‌ها | `content/manuscripts.ts` |
| خاطرات | `content/memories.ts` |
| خط زمان زندگی | `content/life-events.ts` |
| مکان‌ها | `content/places.ts` |
| صدا، فیلم، عکس آرشیو | `content/media.ts` |
| شکل این داده‌ها و دسته‌ها | `lib/types.ts` |

فایل تصویر و صوت را در `public/` بگذار، بعد فقط مسیرش را در فایل محتوا بنویس. خود فایل را داخل `content/` کپی نکن.

| نوع فایل | پوشه |
| --- | --- |
| اسکن دست‌نوشته | `public/images/manuscripts/` |
| عکس شاعر یا زندگی | `public/images/author/` |
| عکس خاطره | `public/images/memories/` |
| صوت | `public/audio/` |

## نام سایت و منو

| می‌خواهی عوض کنی | فایل |
| --- | --- |
| نام شاعر، عنوان سایت، جملهٔ زیر نام، توضیح | `lib/site.ts` در شیء `site` |
| آیتم‌های منو و پاورقی | `lib/site.ts` در `navItems` |
| نشانی اصلی سایت | متغیر محیطی `NEXT_PUBLIC_SITE_URL` |

## منطق، نه متن

| می‌خواهی عوض کنی | فایل |
| --- | --- |
| شعر امروز، جستجو، شعر قبلی و بعدی | `lib/poems.ts` |
| عنوان، توضیح، canonical و دادهٔ ساخت‌یافته | `lib/metadata.ts` |
| نقشهٔ سایت | `app/sitemap.ts` |
| robots | `app/robots.ts` |

## ظاهر

| می‌خواهی عوض کنی | فایل |
| --- | --- |
| رنگ‌ها، بافت کاغذ، فاصلهٔ بیت، چاپ | `app/globals.css` |
| فونت‌ها و زبان صفحه | `app/layout.tsx` |
| منو و فهرست موبایل | `components/layout/site-header.tsx` |
| پاورقی | `components/layout/site-footer.tsx` |
| قهرمان صفحهٔ خانه | `components/home/hero.tsx` |
| بقیهٔ خانه | `app/page.tsx` |
| حروف‌چینی بیت | `components/poems/poem-text.tsx` |
| فهرست شعرها | `components/poems/poem-index.tsx` |
| پالایش قالب و حال‌وهوا | `components/poems/poem-filters.tsx` |
| اشتراک، کپی پیوند، چاپ | `components/poems/poem-actions.tsx` |
| قاب و بزرگ‌نمایی دست‌نوشته | `components/manuscripts/archive-sheet.tsx` |
| پخش صوت | `components/media/audio-player.tsx` |
| عنوان بالای صفحه‌های داخلی | `components/ui/editorial.tsx` در `PageIntro` |
| حرکت صفحه | `app/template.tsx` و `components/motion/reveal.tsx` |

## صفحهٔ هر بخش

اگر متن معرفی بالای یک صفحه را می‌خواهی عوض کنی، همان `page.tsx` را باز کن:

- `app/page.tsx`
- `app/poems/page.tsx`
- `app/poems/[slug]/page.tsx`
- `app/manuscripts/page.tsx`
- `app/about/page.tsx`
- `app/memories/page.tsx`
- `app/media/page.tsx`
- `app/search/page.tsx`
- `app/not-found.tsx`

بعد از تغییر محتوا، در حالت توسعه صفحه خودش تازه می‌شود. برای دیدن نتیجهٔ ساخت:

```bash
npm run dev
```
