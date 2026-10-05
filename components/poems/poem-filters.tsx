import Link from "next/link";

import { poemForms, poemThemes, type PoemForm, type PoemTheme } from "@/lib/types";
import { cn } from "@/lib/utils";

function filterHref(form?: string, theme?: string) {
  const params = new URLSearchParams();
  if (form) params.set("form", form);
  if (theme) params.set("theme", theme);
  const query = params.toString();
  return query ? `/poems?${query}` : "/poems";
}

function FilterLink({
  href,
  current,
  children,
}: {
  href: string;
  current: boolean;
  children: string;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "true" : undefined}
      className={cn(
        "pb-0.5 transition-colors",
        current ? "border-b border-gold text-ink" : "text-muted hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

export function PoemFilters({
  form,
  theme,
}: {
  form?: PoemForm;
  theme?: PoemTheme;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm text-gold">قالب</h2>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm">
          <li>
            <FilterLink href={filterHref(undefined, theme)} current={!form}>
              همه
            </FilterLink>
          </li>
          {poemForms.map((item) => (
            <li key={item}>
              <FilterLink href={filterHref(item, theme)} current={form === item}>
                {item}
              </FilterLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-sm text-gold">حال‌وهوا</h2>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm">
          <li>
            <FilterLink href={filterHref(form, undefined)} current={!theme}>
              همه
            </FilterLink>
          </li>
          {poemThemes.map((item) => (
            <li key={item}>
              <FilterLink href={filterHref(form, item)} current={theme === item}>
                {item}
              </FilterLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
