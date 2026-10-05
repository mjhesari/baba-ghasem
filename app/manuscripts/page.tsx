import type { Metadata } from "next";
import Link from "next/link";

import { ArchiveSheet } from "@/components/manuscripts/archive-sheet";
import { PageIntro } from "@/components/ui/editorial";
import { getManuscripts } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";
import { getPoem } from "@/lib/poems";

export const metadata: Metadata = pageMeta({
  title: "دست‌نوشته‌ها",
  description: "آرشیو برگ‌های دست‌نویس بابا قاسم. هر تصویر واقعی، وقتی به دفتر برسد، همین‌جا می‌نشیند.",
  path: "/manuscripts",
});

export default function ManuscriptsPage() {
  const items = getManuscripts();

  return (
    <>
      <PageIntro
        kicker="آرشیو"
        title="دست‌نوشته‌ها"
        lede="برگ‌ها را مثل یک آرشیو آرام نگاه می‌کنیم. تا وقتی اسکن واقعی نرسیده، قاب‌ها خالی می‌مانند و چیزی را به‌جای خط او نشان نمی‌دهیم."
      />
      <ul className="mx-auto grid max-w-6xl gap-20 px-5 pb-24 sm:px-8 md:grid-cols-2 md:gap-x-16 md:gap-y-24">
        {items.map((item) => {
          const poem = item.poemSlug ? getPoem(item.poemSlug) : undefined;
          return (
            <li key={item.slug} id={item.slug} className="scroll-mt-28">
              <ArchiveSheet title={item.title} image={item.image} imageAlt={item.imageAlt} />
              <div className="mt-6 max-w-md">
                {item.dateLabel ? <p className="text-sm text-gold">{item.dateLabel}</p> : null}
                <h2 className="mt-2 font-serif text-3xl text-ink">{item.title}</h2>
                <p className="mt-4 leading-8 text-brown">{item.description}</p>
                {poem ? (
                  <p className="mt-4">
                    <Link
                      href={`/poems/${poem.slug}`}
                      className="text-sm underline decoration-line underline-offset-[6px] transition-colors hover:decoration-gold"
                    >
                      شعر مرتبط: {poem.title}
                    </Link>
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
