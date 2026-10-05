import type { Manuscript } from "@/lib/types";

/**
 * Empty mounts. Drop a real scan in `public/images/manuscripts`
 * and set `image`, `imageAlt`, and `placeholder: false`.
 * Never point `image` at a generated picture of handwriting.
 */
export const manuscripts: Manuscript[] = [
  {
    slug: "barg-1",
    title: "برگ نخست",
    description:
      "این قاب خالی است. تصویر واقعی دست‌نوشته، وقتی از میان کاغذهای خانواده بیرون بیاید، همین‌جا می‌نشیند.",
    poemSlug: "cheragh",
    placeholder: true,
  },
  {
    slug: "barg-2",
    title: "حاشیهٔ دفتر",
    description:
      "جای برگی که هنوز اسکن نشده. تاریخ، توضیح و شعر مرتبط را کنار همان تصویر واقعی بنویسید.",
    placeholder: true,
  },
];
