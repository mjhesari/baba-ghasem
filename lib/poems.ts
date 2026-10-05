import { poems } from "@/content/poems";
import type { Poem, PoemTheme } from "@/lib/types";
import { normalizeText } from "@/lib/utils";

export function getPoems() {
  return poems;
}

export function getPoem(slug: string) {
  return poems.find((poem) => poem.slug === slug);
}

export function poemPlainText(poem: Poem) {
  return poem.stanzas.flat().join("\n");
}

export function poemExcerpt(poem: Poem) {
  if (poem.excerpt) return poem.excerpt;
  return poem.stanzas[0]?.join(" ") ?? poem.title;
}

export function getPoemOfDay(now = new Date()) {
  const realFeatured = poems.filter((poem) => poem.featured && !poem.sample);
  const featured = poems.filter((poem) => poem.featured);
  const real = poems.filter((poem) => !poem.sample);
  const pool = realFeatured.length
    ? realFeatured
    : featured.length
      ? featured
      : real.length
        ? real
        : poems;
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return pool[day % pool.length];
}

export function getAdjacentPoems(slug: string) {
  const index = poems.findIndex((poem) => poem.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? poems[index - 1] : undefined,
    next: index < poems.length - 1 ? poems[index + 1] : undefined,
  };
}

export function filterPoems(form?: string, theme?: string) {
  return poems.filter((poem) => {
    const formOk = !form || poem.form === form;
    const themeOk = !theme || poem.themes.includes(theme as PoemTheme);
    return formOk && themeOk;
  });
}

export type PoemSearchHit = {
  poem: Poem;
  snippet: string;
};

export function searchPoems(query: string): PoemSearchHit[] {
  const needle = normalizeText(query);
  if (!needle) return [];

  return poems.flatMap((poem) => {
    const lines = poem.stanzas.flat();
    const haystacks = [
      poem.title,
      poem.form,
      poem.dateLabel ?? "",
      poem.year ? String(poem.year) : "",
      ...poem.themes,
      ...lines,
    ];
    const matched = haystacks.some((value) => normalizeText(value).includes(needle));
    if (!matched) return [];

    const line = lines.find((value) => normalizeText(value).includes(needle));
    return [
      {
        poem,
        snippet: line ?? poemExcerpt(poem),
      },
    ];
  });
}
