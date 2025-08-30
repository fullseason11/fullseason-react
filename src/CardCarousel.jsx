// src/CardCarousel.jsx
import React, { useEffect, useRef, useState } from "react";

export default function CardCarousel({ items = [], auto = true, interval = 4000, className = "" }) {
  const wrapRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const n = items.length;

  const goTo = (i) => {
    const el = wrapRef.current?.children[i];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { left, width } = el.getBoundingClientRect();
        let best = 0, bestDist = Infinity;
        Array.from(el.children).forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const dist = Math.abs((r.left + r.width / 2) - (left + width / 2));
          if (dist < bestDist) { best = i; bestDist = dist; }
        });
        setIdx(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (!auto || n <= 1) return;
    const id = setInterval(() => goTo((idx + 1) % n), interval);
    return () => clearInterval(id);
  }, [auto, interval, idx, n]);

  return (
    <section className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0b11] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0b11] to-transparent z-10" />

      <div
        ref={wrapRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 md:px-8 py-8"
        style={{ scrollPadding: "0 24px" }}
      >
        {items.map((it, i) => (
          <article
            key={i}
            className="snap-center shrink-0 w-[78vw] sm:w-[420px] md:w-[460px] bg-[#121420] border border-white/10 rounded-2xl p-6 md:p-7
                       shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-shadow"
          >
            <div className="text-3xl mb-3">{it.emoji}</div>
            <h3 className="text-white text-2xl font-extrabold tracking-wide mb-3">{it.title}</h3>
            <p className="text-[#9aa4b2] leading-relaxed mb-5">{it.desc}</p>
            {it.badges?.length ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {it.badges.map((b, j) => (
                  <span key={j} className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10">{b}</span>
                ))}
              </div>
            ) : null}
            {it.href ? (
              <a href={it.href} className="inline-block mt-1 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6a49ff] via-[#2a7fff] to-[#49ff9a] text-black font-bold">
                자세히 보기
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-1">
        <button onClick={() => goTo((idx - 1 + n) ^ n)} className="z-20 mx-1 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur grid place-items-center" aria-label="이전">‹</button>
        <button onClick={() => goTo((idx + 1) % n)} className="z-20 mx-1 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur grid place-items-center" aria-label="다음">›</button>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`슬라이드 ${i + 1}`} className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-2.5 bg-white/40"}`} />
        ))}
      </div>
    </section>
  );
}

