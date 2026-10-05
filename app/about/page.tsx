import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageIntro, JsonLd } from "@/components/ui/editorial";
import { getLifeEvents, getPlaces } from "@/lib/content";
import { pageMeta, personJsonLd } from "@/lib/metadata";
import { getPoem } from "@/lib/poems";

export const metadata: Metadata = pageMeta({
  title: "زندگی شاعر",
  description: "روایت زندگی بابا قاسم، به خط زمان خانواده. تاریخ‌ها و عکس‌ها وقتی آماده شوند به این صفحه می‌آیند.",
  path: "/about",
});

export default function AboutPage() {
  const events = getLifeEvents();
  const places = getPlaces();

  return (
    <>
      <JsonLd data={personJsonLd()} />
      <PageIntro
        kicker="روایت"
        title="زندگی شاعر"
        lede="این صفحه زندگی‌نامهٔ آماده نیست. خط زمانی است برای تاریخ‌ها، عکس‌ها و خاطره‌هایی که خانواده کم‌کم کنار هم می‌گذارد."
      />

      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-8" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" className="font-serif text-3xl text-ink md:text-4xl">
          خط زمان
        </h2>
        <ol className="timeline mt-10">
          {events.map((event) => {
            const poem = event.poemSlug ? getPoem(event.poemSlug) : undefined;
            return (
              <li key={event.slug}>
                <p className="text-sm text-gold">{event.yearLabel}</p>
                <h3 className="mt-2 font-serif text-3xl leading-snug text-ink">{event.title}</h3>
                <p className="mt-4 max-w-xl leading-[2] text-brown">{event.body}</p>
                {event.sample ? (
                  <p className="mt-3 text-xs text-gold">جایگاه خالی · در انتظار روایت خانواده</p>
                ) : null}
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.imageAlt ?? event.title}
                    width={720}
                    height={480}
                    className="mt-6 h-auto w-full max-w-md"
                  />
                ) : null}
                {poem ? (
                  <p className="mt-4">
                    <Link
                      href={`/poems/${poem.slug}`}
                      className="text-sm underline decoration-line underline-offset-[6px] hover:decoration-gold"
                    >
                      شعر مرتبط: {poem.title}
                    </Link>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>

      <section
        id="places"
        className="mx-auto max-w-3xl scroll-mt-28 border-t border-line px-5 py-16 sm:px-8 md:py-20"
        aria-labelledby="places-heading"
      >
        <h2 id="places-heading" className="font-serif text-3xl text-ink md:text-4xl">
          ردپای شاعر
        </h2>
        <p className="mt-5 max-w-xl leading-[2] text-brown">
          مکان‌هایی که در زندگی او مهم بوده‌اند. تا وقتی نامشان از خانواده نرسد، این‌جا فقط جای
          خالی‌شان را نگه می‌داریم.
        </p>
        <ul className="mt-10 border-t border-line">
          {places.map((place) => (
            <li key={place.slug} className="border-b border-line py-8">
              <h3 className="font-serif text-2xl text-ink">{place.name}</h3>
              <p className="mt-3 max-w-xl leading-8 text-brown">{place.note}</p>
              {place.placeholder ? (
                <p className="mt-3 text-xs text-gold">جایگاه خالی</p>
              ) : null}
              {place.poemSlugs?.length ? (
                <ul className="mt-4 space-y-2">
                  {place.poemSlugs.map((slug) => {
                    const poem = getPoem(slug);
                    if (!poem) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/poems/${poem.slug}`}
                          className="text-sm underline decoration-line underline-offset-[6px] hover:decoration-gold"
                        >
                          {poem.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
