import type { Poem } from "@/lib/types";
import { cn, toFaDigits } from "@/lib/utils";

export function PoemText({ poem, className }: { poem: Poem; className?: string }) {
  const classical = poem.form !== "شعر آزاد";

  return (
    <div className={cn("poem-text", className)}>
      {poem.stanzas.map((lines, index) => {
        const number = toFaDigits(index + 1);

        if (classical && lines.length === 2) {
          return (
            <div
              key={`${poem.slug}-${index}`}
              className="mt-10 md:mt-9 md:grid md:grid-cols-[1.75rem_1fr] md:gap-5"
            >
              <span className="mb-2 hidden pt-3 font-sans text-xs text-gold md:block" aria-hidden>
                {number}
              </span>
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-12">
                <p className="font-serif text-[1.45rem] leading-[2.2] text-ink md:flex-1 md:text-[1.65rem]">
                  {lines[0]}
                </p>
                <p className="ps-7 font-serif text-[1.45rem] leading-[2.2] text-ink md:flex-1 md:ps-0 md:text-end md:text-[1.65rem]">
                  {lines[1]}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div key={`${poem.slug}-${index}`} className="mt-10 space-y-1 md:mt-12">
            {lines.map((line, lineIndex) => (
              <p
                key={`${poem.slug}-${index}-${lineIndex}`}
                className="font-serif text-[1.5rem] leading-[2.25] text-ink md:text-[1.8rem]"
              >
                {line}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}
