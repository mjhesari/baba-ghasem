import Link from "next/link";

import { Mark } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 md:py-36">
      <Mark className="h-20" />
      <p className="mt-8 text-sm text-gold">برگ گم‌شده</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.35] text-ink">این صفحه در دفتر نیست.</h1>
      <p className="mt-6 max-w-md text-lg leading-[2] text-brown">
        شاید نشانی عوض شده، یا این برگ هنوز نوشته نشده است.
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="text-sm underline decoration-line underline-offset-[6px] transition-colors hover:decoration-gold"
        >
          بازگشت به خانه
        </Link>
      </p>
    </div>
  );
}
