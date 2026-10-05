import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/ui/editorial";
import { pageMeta } from "@/lib/metadata";
import { searchPoems } from "@/lib/poems";
import { toFaDigits } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "جستجو",
  description: "جستجو در عنوان، متن، قالب و سال شعرهای دیوان بابا قاسم.",
  path: "/search",
});

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = one(params.q)?.trim() ?? "";
  const hits = query ? searchPoems(query) : [];

  return (
    <>
      <PageIntro
        kicker="دیوان"
        title="جستجو"
        lede="کلمه‌ای از یک بیت، عنوان شعر، نام قالب، یا سال را بنویس."
      />
      <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <form key={query} action="/search" role="search">
          <label htmlFor="q" className="text-sm text-gold">
            واژه
          </label>
          <div className="mt-3 flex items-end gap-4 border-b border-line">
            <input
              id="q"
              name="q"
              defaultValue={query}
              placeholder="مثلاً نان، غزل، بهار"
              className="w-full bg-transparent py-4 font-serif text-3xl text-ink placeholder:text-muted/50"
            />
            <button type="submit" className="mb-4 shrink-0 cursor-pointer text-sm text-ink">
              بگرد
            </button>
          </div>
        </form>

        <div className="mt-12">
          {!query ? (
            <p className="leading-8 text-brown">دفتر باز است. هر واژه‌ای که یادت هست کافی است.</p>
          ) : hits.length === 0 ? (
            <p className="leading-8 text-brown">در دیوان چیزی با این واژه پیدا نشد.</p>
          ) : (
            <>
              <p className="text-sm text-muted">{toFaDigits(hits.length)} شعر</p>
              <ol className="mt-4 border-t border-line">
                {hits.map((hit) => (
                  <li key={hit.poem.slug} className="border-b border-line">
                    <Link href={`/poems/${hit.poem.slug}`} className="group block py-6">
                      <span className="text-sm text-gold">{hit.poem.form}</span>
                      <span className="mt-2 block font-serif text-3xl leading-snug text-ink transition-colors group-hover:text-burgundy">
                        {hit.poem.title}
                      </span>
                      <span className="mt-3 block leading-8 text-brown">{hit.snippet}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </>
  );
}
