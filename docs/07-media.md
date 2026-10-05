# صدا و تصویر

فهرست رسانه‌ها در `content/media.ts` است. صفحهٔ `/media` آن را به دو بخش تقسیم می‌کند: هر مورد با `kind: "audio"` در «صدای شاعر» می‌آید، و `video` یا `photo` در «تصویر و فیلم».

پخش‌کننده در `components/media/audio-player.tsx` است. اگر `src` خالی باشد، همان ردیف می‌ماند و می‌گوید فایل هنوز به آرشیو اضافه نشده است.

## صوت

فایل را در `public/audio/` بگذار:

```ts
{
  slug: "sedaye-shaer",
  kind: "audio",
  title: "صدای شاعر",
  description: "خوانش شعر چراغ، با صدای خود او.",
  src: "/audio/cheragh.mp3",
  poemSlug: "cheragh",
}
```

`src` از ریشهٔ سایت است: `/audio/cheragh.mp3`.

## فیلم

```ts
{
  slug: "film-khaneh",
  kind: "video",
  title: "حیاط خانه",
  description: "چند دقیقه از حیاط.",
  src: "/videos/hayat.mp4",
}
```

فایل ویدئو را مثلاً در `public/videos/` بگذار و مسیر را در `src` بنویس. صفحه فقط وقتی `src` باشد عنصر ویدئو را نشان می‌دهد.

## عکس

```ts
{
  slug: "aks-ghadimi",
  kind: "photo",
  title: "عکس قدیمی",
  description: "توضیح کوتاه.",
  image: "/images/author/aks.jpg",
  imageAlt: "توضیح تصویر برای کسی که عکس را نمی‌بیند",
}
```

`poemSlug` در هر سه نوع اختیاری است و زیر مورد، پیوند شعر مرتبط می‌سازد.

نمونهٔ صوتی نساز و به‌جای صدای شاعر نگذار. تا وقتی فایل واقعی نیست، `src` را خالی بگذار.
