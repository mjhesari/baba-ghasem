# دست‌نوشته‌ها

برگ‌ها در `content/manuscripts.ts` هستند. صفحهٔ `/manuscripts` آن‌ها را نشان می‌دهد. بزرگ‌نمایی در `components/manuscripts/archive-sheet.tsx` است.

## گذاشتن اسکن واقعی

1. فایل تصویر را در `public/images/manuscripts/` بگذار. مثلاً `barg-1.jpg`.
2. همان برگ را در `content/manuscripts.ts` این‌طور کامل کن:

```ts
{
  slug: "barg-1",
  title: "برگ نخست",
  dateLabel: "۱۳۴۸",
  description: "توضیح کوتاه برگ، با تاریخ اگر معلوم است.",
  image: "/images/manuscripts/barg-1.jpg",
  imageAlt: "دست‌نوشتهٔ شعر چراغ",
  poemSlug: "cheragh",
  placeholder: false,
}
```

مسیر `image` از ریشهٔ `public` است، پس با `/` شروع می‌شود و کلمهٔ `public` داخل مسیر نیست.

`imageAlt` بگوید در تصویر چه هست. اگر برگ واقعاً خط شاعر است، همان را بنویس.

`poemSlug` باید با `slug` یک شعر در `content/poems.ts` یکی باشد. آن وقت زیر برگ پیوند «شعر مرتبط» می‌آید، و در صفحهٔ شعر هم پیوند «دست‌نوشتهٔ مرتبط» به `/manuscripts#barg-1`.

## قاب خالی

اگر `image` نباشد، یک قاب کاغذی نشان داده می‌شود با این جمله که عکس یا خط واقعی نیست. تصویر ساخته‌شده را به‌جای دست‌خط شاعر نگذار.

برگ تازه‌ای که هنوز اسکن ندارد می‌تواند `placeholder: true` بماند و `image` نداشته باشد.

## برگ تازه

یک شیء جدید به آرایهٔ `manuscripts` اضافه کن. `slug` یکتا باشد. شناسهٔ همان `slug` روی صفحه است تا پیوند از صفحهٔ شعر به همان برگ برسد.
