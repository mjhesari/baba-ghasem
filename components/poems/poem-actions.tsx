"use client";

import { Link2, Printer, Share2 } from "lucide-react";
import { useState } from "react";

export function PoemActions({ title }: { title: string }) {
  const [notice, setNotice] = useState("");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("پیوند کپی شد.");
    } catch {
      setNotice("کپی پیوند ممکن نشد.");
    }
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        setNotice("");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    await copyLink();
  }

  return (
    <div className="no-print mt-14 border-t border-line pt-6">
      <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
        <button type="button" onClick={() => void share()} className="inline-flex cursor-pointer items-center gap-2 text-ink">
          <Share2 className="size-4" aria-hidden />
          اشتراک‌گذاری
        </button>
        <button type="button" onClick={() => void copyLink()} className="inline-flex cursor-pointer items-center gap-2 text-ink">
          <Link2 className="size-4" aria-hidden />
          کپی پیوند
        </button>
        <button type="button" onClick={() => window.print()} className="inline-flex cursor-pointer items-center gap-2 text-ink">
          <Printer className="size-4" aria-hidden />
          چاپ
        </button>
      </div>
      <p className="mt-3 min-h-5 text-sm text-gold" aria-live="polite">
        {notice}
      </p>
    </div>
  );
}
