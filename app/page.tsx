import Link from "next/link";

import { Hero } from "@/components/home/hero";
import { Reveal } from "@/components/motion/reveal";
import { PoemIndex } from "@/components/poems/poem-index";
import { PoemText } from "@/components/poems/poem-text";
import { Ornament } from "@/components/ui/editorial";
import { getMemories } from "@/lib/content";
import { getPoemOfDay, getPoems } from "@/lib/poems";
import { site } from "@/lib/site";
import { todayLabel } from "@/lib/utils";

export const revalidate = 86400;

export default function HomePage() {
  const poem = getPoemOfDay();
  const preview = getPoems().slice(0, 5);
  const memory = getMemories()[0];
  const today = todayLabel();

  return (
    <>
      <Hero />

      <section className="border-y border-line bg-paper-deep px-5 py-20 sm:px-8 md:py-28" aria-labelledby="today-heading">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-sm text-gold">شعر امروز</p>
          <p className="mt-2 text-center text-sm text-muted">{today}</p>
          <h2
            id="today-heading"
            className="mt-8 text-center font-serif text-4xl leading-snug text-balance text-ink md:text-5xl"
          >
            {poem.title}
          </h2>
          <Ornament className="mt-7" />
          <PoemText poem={poem} />
          <p className="mt-12 text-center font-serif text-lg text-brown">{site.name}</p>
          {poem.sample ? (
            <p className="mt-3 text-center text-xs text-gold">نمونهٔ حروف‌چینی</p>
          ) : null}
          <p className="mt-8 text-center">
            <Link
              href={`/poems/${poem.slug}`}
              className="text-sm underline decoration-line underline-offset-[6px] transition-colors hover:decoration-gold"
            >
              خواندن شعر کامل
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 md:py-28" aria-labelledby="contents-heading">
        <Reveal>
          <h2 id="contents-heading" className="font-serif text-4xl text-ink md:text-5xl">
            از دفتر
          </h2>
          <p className="mt-5 max-w-md text-lg leading-[2] text-brown">
            چند برگ از دیوان. بقیهٔ فهرست، پشت همین صفحه است.
          </p>
          <div className="mt-10">
            <PoemIndex poems={preview} />
          </div>
          <p className="mt-8">
            <Link
              href="/poems"
              className="text-sm underline decoration-line underline-offset-[6px] transition-colors hover:decoration-gold"
            >
              فهرست کامل دیوان
            </Link>
          </p>
        </Reveal>
      </section>

      <section className="border-t border-line" aria-label="راه‌های دیگر دفتر">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <article className="border-b border-line px-5 py-16 sm:px-8 md:border-e md:border-b-0 md:px-12 md:py-24">
            <h2 className="font-serif text-4xl text-ink">دست‌نوشته‌ها</h2>
            <p className="mt-5 max-w-sm text-lg leading-[2] text-brown">
              برگ‌هایی که هنوز خط او را دارند، آرام‌تر از هر نسخه‌اند.
            </p>
            <p className="mt-8">
              <Link
                href="/manuscripts"
                className="text-sm underline decoration-line underline-offset-[6px] transition-colors hover:decoration-gold"
              >
                دیدن آرشیو
              </Link>
            </p>
          </article>
          <article className="px-5 py-16 sm:px-8 md:px-12 md:py-24">
            <h2 className="font-serif text-4xl text-ink">از زبان خانواده</h2>
            <p className="mt-5 max-w-sm text-lg leading-[2] text-brown">
              جمله‌هایی که در هیچ دیوانی چاپ نمی‌شوند، ولی خانه با آن‌ها مانده است.
            </p>
            <p className="mt-8">
              <Link
                href="/memories"
                className="text-sm underline decoration-line underline-offset-[6px] transition-colors hover:decoration-gold"
              >
                خواندن خاطره‌ها
              </Link>
            </p>
          </article>
        </div>
      </section>

      {memory ? (
        <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8 md:py-28" aria-labelledby="memory-heading">
          <Reveal>
            <h2 id="memory-heading" className="text-sm text-gold">
              خاطره‌ای از خانه
            </h2>
            <blockquote className="mt-6 font-serif text-[1.7rem] leading-[2.15] text-ink md:text-[2.05rem]">
              {memory.text}
            </blockquote>
            <p className="mt-8 text-sm text-brown">{memory.name}</p>
            {memory.sample ? (
              <p className="mt-2 text-xs text-gold">نمونه · در انتظار خاطرهٔ خانواده</p>
            ) : null}
          </Reveal>
        </section>
      ) : null}
    </>
  );
}
