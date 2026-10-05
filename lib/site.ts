export const site = {
  name: "بابا قاسم",
  title: "دیوان بابا قاسم",
  description:
    "آرشیو خانوادگی شعرها، دست‌نوشته‌ها و خاطرات بابا قاسم. دفتری برای خواندن میراثی که کلماتش مانده است.",
  tagline: "کلمات می‌مانند، حتی وقتی شاعر نیست.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fa_IR",
} as const;

export const navItems = [
  { href: "/", label: "خانه" },
  { href: "/poems", label: "اشعار" },
  { href: "/manuscripts", label: "دست‌نوشته‌ها" },
  { href: "/about", label: "زندگی شاعر" },
  { href: "/memories", label: "خاطرات" },
  { href: "/media", label: "صدا و تصویر" },
  { href: "/search", label: "جستجو" },
] as const;
