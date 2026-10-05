import type { Metadata } from "next";
import Image from "next/image";

import { PageIntro } from "@/components/ui/editorial";
import { getMemories } from "@/lib/content";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "خاطرات",
  description: "خاطرات خانواده از بابا قاسم. هر جمله، با نام و نسبت کسی که آن را به یاد دارد.",
  path: "/memories",
});

export default function MemoriesPage() {
  const memories = getMemories();

  return (
    <>
      <PageIntro
        kicker="خانه"
        title="از زبان خانواده"
        lede="این‌جا جای جمله‌هایی است که شعر نیستند، ولی بدون آن‌ها دفتر ناقص می‌ماند."
      />
      {memories.length === 0 ? (
        <p className="mx-auto max-w-3xl px-5 pb-24 text-lg leading-[2] text-brown sm:px-8">
          خاطره‌ها هنوز نوشته نشده‌اند. هر کدام از ما جمله‌ای داریم که فقط مال این خانه است.
        </p>
      ) : (
        <ol className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
          {memories.map((memory) => (
            <li key={memory.slug} className="border-t border-line py-14">
              {memory.sample ? (
                <p className="text-xs text-gold">نمونه · در انتظار خاطرهٔ خانواده</p>
              ) : null}
              <blockquote className="mt-5 font-serif text-[1.7rem] leading-[2.15] text-ink md:text-[2rem]">
                {memory.text}
              </blockquote>
              <footer className="mt-8 text-sm text-brown">
                <span className="text-ink">{memory.name}</span>
                <span className="mx-2 text-gold" aria-hidden>
                  ·
                </span>
                <span>{memory.relation}</span>
              </footer>
              {memory.image ? (
                <Image
                  src={memory.image}
                  alt={memory.imageAlt ?? memory.name}
                  width={640}
                  height={480}
                  className="mt-8 h-auto w-full max-w-sm"
                />
              ) : null}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
