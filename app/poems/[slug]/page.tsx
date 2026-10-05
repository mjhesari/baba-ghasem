import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PoemActions } from "@/components/poems/poem-actions";
import { PoemPager } from "@/components/poems/poem-pager";
import { PoemText } from "@/components/poems/poem-text";
import { JsonLd, Ornament } from "@/components/ui/editorial";
import { getManuscript } from "@/lib/content";
import { poemJsonLd, poemMeta } from "@/lib/metadata";
import { getAdjacentPoems, getPoem, getPoems, poemPlainText } from "@/lib/poems";
import { site } from "@/lib/site";

type PoemPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPoems().map((poem) => ({ slug: poem.slug }));
}

export async function generateMetadata({ params }: PoemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const poem = getPoem(slug);
  if (!poem) return { title: "شعر پیدا نشد" };
  return poemMeta(poem);
}

export default async function PoemPage({ params }: PoemPageProps) {
  const { slug } = await params;
  const poem = getPoem(slug);
  if (!poem) notFound();

  const { prev, next } = getAdjacentPoems(poem.slug);
  const manuscript = poem.manuscriptSlug ? getManuscript(poem.manuscriptSlug) : undefined;
  const text = poemPlainText(poem);
  const details = [
    poem.dateLabel,
    poem.sample ? "نمونهٔ حروف‌چینی" : undefined,
  ].filter((item): item is string => Boolean(item));

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
      {poem.sample ? null : <JsonLd data={poemJsonLd(poem, text)} />}
      <header>
        <p className="text-sm text-gold">{[poem.form, ...poem.themes].join(" · ")}</p>
        <h1 className="mt-4 font-serif text-[2.7rem] leading-[1.3] text-balance text-ink sm:text-5xl md:text-6xl">
          {poem.title}
        </h1>
        {details.length > 0 ? <p className="mt-5 text-sm text-muted">{details.join(" · ")}</p> : null}
      </header>
      <Ornament className="mt-10" />
      <PoemText poem={poem} />
      <p className="mt-14 font-serif text-lg text-brown">{site.name}</p>
      {manuscript ? (
        <p className="no-print mt-6">
          <Link
            href={`/manuscripts#${manuscript.slug}`}
            className="text-sm underline decoration-line underline-offset-[6px] transition-colors hover:decoration-gold"
          >
            دست‌نوشتهٔ مرتبط
          </Link>
        </p>
      ) : null}
      <PoemActions title={poem.title} />
      <PoemPager prev={prev} next={next} />
    </article>
  );
}
