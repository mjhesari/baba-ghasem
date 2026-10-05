import type { Metadata } from "next";

import { poemExcerpt } from "@/lib/poems";
import { site } from "@/lib/site";
import type { Poem } from "@/lib/types";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      locale: site.locale,
      type: "website",
      siteName: site.title,
    },
  };
}

export function poemMeta(poem: Poem): Metadata {
  const description = poemExcerpt(poem);
  const path = `/poems/${poem.slug}`;

  return {
    title: poem.title,
    description,
    alternates: { canonical: path },
    robots: poem.sample
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: poem.title,
      description,
      url: path,
      locale: site.locale,
      type: "article",
      siteName: site.title,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    description: site.description,
    inLanguage: "fa",
    url: site.url,
    logo: `${site.url}/logo.png`,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/search?q={query}`,
      "query-input": "required name=query",
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    description: site.description,
    knowsLanguage: "fa",
    url: `${site.url}/about`,
  };
}

export function poemJsonLd(poem: Poem, text: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: poem.title,
    headline: poem.title,
    inLanguage: "fa",
    genre: [poem.form, ...poem.themes],
    text,
    url: `${site.url}/poems/${poem.slug}`,
    author: {
      "@type": "Person",
      name: site.name,
    },
    isPartOf: {
      "@type": "Book",
      name: site.title,
      url: site.url,
    },
    ...(poem.year ? { dateCreated: String(poem.year) } : {}),
  };
}
