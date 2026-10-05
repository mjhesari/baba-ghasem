import type { MediaItem } from "@/lib/types";

/**
 * Set `src` to a file in `public/audio` or `public/images` when a real
 * recording, film, or photograph exists.
 */
export const mediaItems: MediaItem[] = [
  {
    slug: "sedaye-shaer",
    kind: "audio",
    title: "صدای شاعر",
    description: "اگر خوانشی با صدای خود او مانده باشد، همین‌جا شنیده می‌شود.",
  },
  {
    slug: "khanesh",
    kind: "audio",
    title: "خوانش یک شعر",
    description: "صدای یکی از اعضای خانواده، یا هر خوانشی که بخواهید کنار شعر بماند.",
  },
  {
    slug: "film",
    kind: "video",
    title: "تصویر متحرک",
    description: "جایی برای یک فیلم کوتاه، مصاحبه، یا لحظه‌ای از خانه.",
  },
];
