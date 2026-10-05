"use client";

import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useId, useRef } from "react";

import { Ornament } from "@/components/ui/editorial";

function Sheet({
  title,
  image,
  imageAlt,
}: {
  title: string;
  image?: string;
  imageAlt?: string;
}) {
  if (image) {
    return (
      <div className="relative aspect-[3/4] bg-ivory">
        <Image
          src={image}
          alt={imageAlt ?? title}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] bg-ivory shadow-[inset_0_0_0_1px_rgba(138,112,68,0.35)]">
      <div className="absolute inset-3 border border-line" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <Ornament />
        <p className="mt-6 font-serif text-2xl leading-snug text-ink">{title}</p>
        <p className="mt-4 max-w-[16rem] text-sm leading-7 text-muted">
          جای تصویر دست‌نوشته. این قاب، عکس یا خط واقعی نیست.
        </p>
      </div>
    </div>
  );
}

export function ArchiveSheet({
  title,
  image,
  imageAlt,
}: {
  title: string;
  image?: string;
  imageAlt?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        className="group block w-full cursor-pointer text-start"
        aria-haspopup="dialog"
        aria-label={`بزرگ‌نمایی ${title}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <Sheet title={title} image={image} imageAlt={imageAlt} />
        <span className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-ink">
          <ZoomIn className="size-4" aria-hidden />
          بزرگ‌نمایی
        </span>
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="archive-dialog"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex items-start justify-between gap-6">
          <h2 id={titleId} className="font-serif text-3xl leading-snug">
            {title}
          </h2>
          <form method="dialog">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 text-sm"
              aria-label="بستن"
            >
              <X className="size-5" aria-hidden />
              بستن
            </button>
          </form>
        </div>
        <div className="mx-auto mt-8 max-w-xl">
          <Sheet title={title} image={image} imageAlt={imageAlt} />
        </div>
      </dialog>
    </>
  );
}
