import Link from "next/link";

import type { Poem } from "@/lib/types";

export function PoemPager({ prev, next }: { prev?: Poem; next?: Poem }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="شعرهای همسایه" className="no-print mt-4 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
      {prev ? (
        <Link href={`/poems/${prev.slug}`} className="group block">
          <span className="text-xs text-muted">شعر قبلی</span>
          <span className="mt-2 block font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-burgundy">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/poems/${next.slug}`} className="group block sm:text-end">
          <span className="text-xs text-muted">شعر بعدی</span>
          <span className="mt-2 block font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-burgundy">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
