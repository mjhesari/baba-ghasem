"use client";

import { Pause, Play } from "lucide-react";
import { type MouseEvent, useRef, useState } from "react";

export function AudioPlayer({
  src,
  title,
  description,
}: {
  src?: string;
  title: string;
  description: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function seek(event: MouseEvent<HTMLButtonElement>) {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const fromLeft = (event.clientX - rect.left) / rect.width;
    const ratio = document.documentElement.dir === "rtl" ? 1 - fromLeft : fromLeft;
    audio.currentTime = Math.min(Math.max(ratio, 0), 1) * audio.duration;
  }

  return (
    <div className="border-b border-line py-8">
      <h3 className="font-serif text-2xl text-ink">{title}</h3>
      <p className="mt-3 max-w-xl leading-8 text-brown">{description}</p>
      {src ? (
        <>
          <audio
            ref={audioRef}
            src={src}
            preload="none"
            onTimeUpdate={() => {
              const audio = audioRef.current;
              if (!audio?.duration) return;
              setProgress(audio.currentTime / audio.duration);
            }}
            onEnded={() => {
              setPlaying(false);
              setProgress(0);
            }}
          />
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              aria-pressed={playing}
              aria-label={playing ? `توقف ${title}` : `پخش ${title}`}
              className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink text-ink"
            >
              {playing ? (
                <Pause className="size-4" aria-hidden />
              ) : (
                <Play className="size-4" aria-hidden />
              )}
            </button>
            <button
              type="button"
              onClick={seek}
              aria-label="جابه‌جایی در صوت"
              className="block h-6 flex-1 cursor-pointer"
            >
              <span className="block h-px w-full bg-line">
                <span className="block h-px bg-gold" style={{ width: `${progress * 100}%` }} />
              </span>
            </button>
          </div>
        </>
      ) : (
        <p className="mt-4 inline-flex items-center gap-3 text-sm text-muted">
          <span className="inline-flex size-9 items-center justify-center rounded-full border border-line">
            <Play className="size-3.5" aria-hidden />
          </span>
          فایل هنوز به آرشیو اضافه نشده است.
        </p>
      )}
    </div>
  );
}
