import Image from "next/image";

import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <Image
      src="/mark.png"
      alt=""
      width={512}
      height={512}
      sizes="80px"
      className={cn("w-auto", className ?? "h-10")}
    />
  );
}

export function Wordmark({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/wordmark.png"
      alt="بابا قاسم، دیوان شعر"
      width={725}
      height={1043}
      priority={priority}
      sizes="(max-width: 640px) 58vw, 248px"
      className={cn("h-auto w-[min(58vw,15.5rem)]", className)}
    />
  );
}
