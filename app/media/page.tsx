import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AudioPlayer } from "@/components/media/audio-player";
import { PageIntro } from "@/components/ui/editorial";
import { getMedia } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";
import { getPoem } from "@/lib/poems";

export const metadata: Metadata = pageMeta({
  title: "صدا و تصویر",
  description: "جایی برای صدای بابا قاسم، خوانش شعرها، فیلم و عکس‌های قدیمی خانواده.",
  path: "/media",
});

export default function MediaPage() {
  const items = getMedia();
  const audio = items.filter((item) => item.kind === "audio");
  const rest = items.filter((item) => item.kind !== "audio");

  return (
    <>
      <PageIntro
        kicker="آرشیو"
        title="صدا و تصویر"
        lede="صدا، اگر مانده باشد، از کاغذ روشن‌تر است. این صفحه برای خوانش، فیلم، مصاحبه و عکس‌های قدیمی آماده است."
      />
      <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <section aria-labelledby="audio-heading">
          <h2 id="audio-heading" className="font-serif text-3xl text-ink">
            صدای شاعر
          </h2>
          <div className="mt-6 border-t border-line">
            {audio.length === 0 ? (
              <p className="py-8 leading-8 text-brown">هنوز صدایی در آرشیو نیست.</p>
            ) : (
              audio.map((item) => (
                <AudioPlayer
                  key={item.slug}
                  src={item.src}
                  title={item.title}
                  description={item.description}
                />
              ))
            )}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="picture-heading">
          <h2 id="picture-heading" className="font-serif text-3xl text-ink">
            تصویر و فیلم
          </h2>
          <ul className="mt-6 border-t border-line">
            {rest.map((item) => {
              const poem = item.poemSlug ? getPoem(item.poemSlug) : undefined;
              return (
                <li key={item.slug} className="border-b border-line py-8">
                  <p className="text-xs text-gold">{item.kind === "video" ? "فیلم" : "عکس"}</p>
                  <h3 className="mt-2 font-serif text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 max-w-xl leading-8 text-brown">{item.description}</p>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      width={960}
                      height={640}
                      className="mt-6 h-auto w-full"
                    />
                  ) : (
                    <p className="mt-4 text-sm text-muted">فایل هنوز به آرشیو اضافه نشده است.</p>
                  )}
                  {item.src && item.kind === "video" ? (
                    <video className="mt-6 w-full" controls preload="none" src={item.src}>
                      <track kind="captions" />
                    </video>
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
          </ul>
        </section>
      </div>
    </>
  );
}
