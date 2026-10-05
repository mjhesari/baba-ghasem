export const poemForms = ["غزل", "قصیده", "رباعی", "دوبیتی", "شعر آزاد"] as const;
export type PoemForm = (typeof poemForms)[number];

export const poemThemes = ["عاشقانه", "عرفانی", "اجتماعی", "مناسبتی"] as const;
export type PoemTheme = (typeof poemThemes)[number];

export type Poem = {
  title: string;
  slug: string;
  dateLabel?: string;
  year?: number;
  form: PoemForm;
  themes: PoemTheme[];
  excerpt?: string;
  stanzas: string[][];
  featured?: boolean;
  /** Typesetting sample. Replace with a poem transcribed from the family archive. */
  sample?: boolean;
  manuscriptSlug?: string;
};

export type Manuscript = {
  slug: string;
  title: string;
  dateLabel?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  poemSlug?: string;
  placeholder: boolean;
};

export type Memory = {
  slug: string;
  name: string;
  relation: string;
  text: string;
  image?: string;
  imageAlt?: string;
  sample?: boolean;
};

export type LifeEvent = {
  slug: string;
  yearLabel: string;
  title: string;
  body: string;
  image?: string;
  imageAlt?: string;
  poemSlug?: string;
  sample?: boolean;
};

export type Place = {
  slug: string;
  name: string;
  note: string;
  poemSlugs?: string[];
  placeholder?: boolean;
};

export type MediaKind = "audio" | "video" | "photo";

export type MediaItem = {
  slug: string;
  kind: MediaKind;
  title: string;
  description: string;
  src?: string;
  image?: string;
  imageAlt?: string;
  poemSlug?: string;
};
