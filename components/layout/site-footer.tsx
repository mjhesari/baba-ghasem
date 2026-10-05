import Link from "next/link";

import { Mark } from "@/components/brand/logo";
import { navItems, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="no-print mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-16">
        <div className="flex items-center gap-4">
          <Mark size={64} />
          <div>
            <p className="font-serif text-3xl text-ink">{site.title}</p>
            <p className="mt-2 max-w-md font-serif text-xl leading-[1.9] text-brown">{site.tagline}</p>
          </div>
        </div>
        <nav aria-label="پایین صفحه" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="mt-10 max-w-xl text-sm leading-8 text-muted">
          نسخهٔ نخست این دفتر است. شعرها، تاریخ‌ها و تصویرها به‌تدریج از دست‌نوشته‌ها و حافظهٔ
          خانواده به این‌جا می‌آیند.
        </p>
      </div>
    </footer>
  );
}
