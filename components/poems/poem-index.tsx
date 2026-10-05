import Link from "next/link";

import type { Poem } from "@/lib/types";
import { toFaDigits } from "@/lib/utils";

export function PoemIndex({
  poems,
  numbered = true,
}: {
  poems: Poem[];
  numbered?: boolean;
}) {
  if (poems.length === 0) {
    return <p className="text-brown leading-8">در این دسته هنوز شعری نیست.</p>;
  }

  return (
    <ol className="border-t border-line">
      {poems.map((poem, index) => (
        <li key={poem.slug} className="border-b border-line">
          <Link
            href={`/poems/${poem.slug}`}
            className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 py-5"
          >
            {numbered ? (
              <span className="w-8 text-sm text-gold">{toFaDigits(index + 1)}</span>
            ) : (
              <span />
            )}
            <span className="font-serif text-[1.65rem] leading-snug text-ink transition-colors duration-300 group-hover:text-burgundy sm:text-3xl">
              {poem.title}
            </span>
            <span className="text-sm text-muted">{poem.form}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
