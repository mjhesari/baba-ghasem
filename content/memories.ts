import type { Memory } from "@/lib/types";

/**
 * Sample voices, so the page has a shape.
 * Replace them with words from the family and set `sample` to false.
 * Add a photo only when the file is a real family picture.
 */
export const memories: Memory[] = [
  {
    slug: "pish-az-khab",
    name: "یکی از نوه‌ها",
    relation: "نمونه",
    sample: true,
    text: "پیش از خواب چراغ را کم می‌کرد و چند بیت را آهسته می‌خواند. هنوز آن صدا از خود شعر روشن‌تر است.",
  },
  {
    slug: "sobh-e-hayat",
    name: "یکی از فرزندان",
    relation: "نمونه",
    sample: true,
    text: "صبح‌ها پیش از چای، مداد را کنار نعلبکی می‌گذاشت. انگار شعر را هم مثل نان، اول برای خانه می‌شکست.",
  },
];
