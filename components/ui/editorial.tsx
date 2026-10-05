import { cn } from "@/lib/utils";

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="h-px w-10 bg-gold/80 sm:w-16" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold/80 sm:w-16" />
    </div>
  );
}

export function PageIntro({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-5 pt-16 pb-8 sm:px-8 md:pt-24 md:pb-12">
      <p className="text-sm text-gold">{kicker}</p>
      <h1 className="mt-3 font-serif text-[2.55rem] leading-[1.35] text-balance text-ink sm:text-5xl md:text-6xl md:leading-[1.3]">
        {title}
      </h1>
      {lede ? (
        <p className="mt-6 max-w-xl text-lg leading-[2.05] text-brown">{lede}</p>
      ) : null}
    </header>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
