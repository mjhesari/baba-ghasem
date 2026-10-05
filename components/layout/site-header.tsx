"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Mark } from "@/components/brand/logo";
import { navItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpenPath(null);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const main = document.getElementById("content");
    const footer = document.querySelector("footer");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        openRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-40 border-b bg-paper",
        scrolled ? "border-line" : "border-transparent",
      )}
    >
      <div
        className="mx-auto flex h-[var(--header-h)] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
        {...(open ? { inert: true } : {})}
      >
        <Link href="/" className="inline-flex items-center gap-2.5 text-ink">
          <Mark />
          <span className="font-serif text-[1.55rem] leading-none">{site.name}</span>
        </Link>

        <nav aria-label="اصلی" className="hidden items-center gap-5 lg:flex">
          {navItems
            .filter((item) => item.href !== "/")
            .map((item) => {
              const current = isCurrent(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "pb-0.5 text-[0.95rem] transition-colors",
                    current
                      ? "border-b border-gold text-ink"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>

        <button
          ref={openRef}
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpenPath(pathname)}
        >
          <Menu className="size-5" aria-hidden />
          فهرست
        </button>
      </div>

      {open ? (
        <div id={menuId} className="fixed inset-0 z-50 bg-paper px-6 pt-6 lg:hidden">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-ink"
              onClick={() => setOpenPath(null)}
            >
              <Mark className="h-9" />
              <span className="font-serif text-xl leading-none">{site.name}</span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 text-sm"
              onClick={() => {
                setOpenPath(null);
                openRef.current?.focus();
              }}
            >
              <X className="size-5" aria-hidden />
              بستن
            </button>
          </div>
          <nav aria-label="موبایل" className="mt-16 flex flex-col gap-7">
            {navItems.map((item) => {
              const current = isCurrent(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "font-serif text-4xl leading-none",
                    current ? "text-burgundy" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
