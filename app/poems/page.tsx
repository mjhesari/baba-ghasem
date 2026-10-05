import type { Metadata } from "next";

import { PoemFilters } from "@/components/poems/poem-filters";
import { PoemIndex } from "@/components/poems/poem-index";
import { PageIntro } from "@/components/ui/editorial";
import { pageMeta } from "@/lib/metadata";
import { filterPoems, getPoems } from "@/lib/poems";
import { poemForms, poemThemes, type PoemForm, type PoemTheme } from "@/lib/types";

export const metadata: Metadata = pageMeta({
  title: "اشعار",
  description: "فهرست دیوان بابا قاسم؛ غزل، قصیده، رباعی، دوبیتی و شعر آزاد.",
  path: "/poems",
});

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function asForm(value: string | undefined): PoemForm | undefined {
  return value && (poemForms as readonly string[]).includes(value) ? (value as PoemForm) : undefined;
}

function asTheme(value: string | undefined): PoemTheme | undefined {
  return value && (poemThemes as readonly string[]).includes(value)
    ? (value as PoemTheme)
    : undefined;
}

export default async function PoemsPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string | string[]; theme?: string | string[] }>;
}) {
  const params = await searchParams;
  const form = asForm(one(params.form));
  const theme = asTheme(one(params.theme));
  const poems = form || theme ? filterPoems(form, theme) : getPoems();
  const hasSamples = getPoems().some((poem) => poem.sample);

  return (
    <>
      <PageIntro
        kicker="دیوان"
        title="اشعار"
        lede="فهرست دفتر، به ترتیب برگ‌ها. قالب و حال‌وهوا را می‌توان کنار گذاشت یا با هم خواند."
      />
      <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <PoemFilters form={form} theme={theme} />
        {hasSamples ? (
          <p className="mt-10 max-w-xl text-sm leading-8 text-muted">
            شعرهایی که در صفحهٔ خودشان «نمونهٔ حروف‌چینی» دارند، جای خالی شعر اصلی‌اند. هر متنی که
            از خانواده برسد، جایگزینشان می‌شود.
          </p>
        ) : null}
        <div className="mt-10">
          <PoemIndex poems={poems} />
        </div>
      </div>
    </>
  );
}
