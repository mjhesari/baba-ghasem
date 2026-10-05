"use client";

import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { Ornament } from "@/components/ui/editorial";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 28]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100svh-var(--header-h))] items-center px-5 py-16 sm:px-8"
    >
      <motion.div style={{ y }} className="mx-auto w-full max-w-3xl text-center">
        <p className="text-sm text-gold">دفتر خانوادگی</p>
        <h1 className="mt-6 font-serif text-[clamp(3.4rem,10vw,6.6rem)] leading-[1.18] text-ink">
          {site.name}
        </h1>
        <motion.div
          className="mt-8"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.08, ease }}
        >
          <Ornament />
        </motion.div>
        <motion.p
          className="mx-auto mt-8 max-w-[18em] font-serif text-[1.45rem] leading-[2.15] text-brown italic sm:text-[1.7rem]"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.16, ease }}
        >
          {site.tagline}
        </motion.p>
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <Link
            href="/poems"
            className="group inline-flex items-center gap-2 text-sm text-ink"
          >
            <span className="border-b border-ink/25 pb-1 transition-colors group-hover:border-gold">
              ورود به دیوان
            </span>
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-1"
              aria-hidden
            />
          </Link>
          <Link
            href="/about"
            className="border-b border-transparent pb-1 text-sm text-brown transition-colors hover:border-gold hover:text-ink"
          >
            درباره شاعر
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
