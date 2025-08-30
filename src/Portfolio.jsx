// src/Portfolio.jsx
import React from "react";
import { motion } from "motion/react";

/**
 * 포트폴리오 섹션 (슬라이드 대신)
 * - 스크롤 시 살짝 떠오르는(staggered) 리빌
 * - 호버 시 미세한 패럴랙스/줌 + 그래디언트 오버레이
 * - Tailwind만 사용 (별도 라이브러리 없음)
 */
const IMAGES = [
  "/portfolio/01.png",
  "/portfolio/02.png",
  "/portfolio/03.png",
  "/portfolio/04.png",
  "/portfolio/05.png",
  "/portfolio/06.png",
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 border-t border-[#1b2131]">
      <div className="max-w-[1200px] mx-auto px-6">
        <header className="mb-10">
          <h2 className="text-3xl font-extrabold mb-4">포트폴리오</h2>
          <p className="text-xl text-[#9aa4b2]">
            최근 작업 샘플입니다. 스크롤하면 자연스럽게 등장하고, 호버하면 은은하게 살아납니다.
          </p>
        </header>

        {/* 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {IMAGES.map((src, i) => (
            <motion.article
              key={src}
              className="group relative rounded-2xl overflow-hidden bg-[#111628] border border-[#1b2131]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
            >
              {/* 이미지 */}
              <div className="relative aspect-square">
                <img
                  src={src}
                  alt={`work_${i + 1}`}
                  className="w-full h-full object-contain translate-z-0 transition-transform duration-500 group-hover:scale-[1.04] group-hover:-translate-y-[2px]"
                  decoding="async"
                  loading={i < 2 ? "eager" : "lazy"}
                  fetchpriority={i === 0 ? "high" : "auto"}
                  draggable="false"
                  style={{ display: "block" }}
                />

                {/* 상단 살짝 비치는 그레인/글로우 */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(500px 300px at 20% 10%, rgba(106,73,255,0.20), transparent 60%), radial-gradient(600px 400px at 80% 90%, rgba(42,127,255,0.18), transparent 60%)",
                  }}
                />

                {/* 하단 그라데이션 + 텍스트 */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/55 via-black/10 to-transparent">
                  <div className="flex items-end justify-between gap-3">
                    <h3 className="text-white/95 font-semibold tracking-wide">
                      Project {i + 1}
                    </h3>
                    <span className="text-white/70 text-sm">FullSeason</span>
                  </div>
                </div>
              </div>

              {/* 카드 테두리 글로우(호버 시) */}
              <div
                className="absolute inset-[-1px] rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(320px 200px at var(--mx,120%) var(--my,120%), rgba(106,73,255,.30), rgba(42,127,255,.12), transparent 70%)",
                  maskImage:
                    "radial-gradient(450px 280px at var(--mx,120%) var(--my,120%), black, transparent 65%)",
                }}
              />
              {/* 마우스 좌표로 글로우 따라오게 */}
              <MouseGlowBinder />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 호버 글로우가 마우스 따라오도록 CSS 변수 바인딩 */
function MouseGlowBinder() {
  React.useEffect(() => {
    const el = document.currentScript?.parentElement; // 안전장치
    return () => void el;
  }, []);
  return (
    <span
      className="absolute inset-0"
      onMouseMove={(e) => {
        const t = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - t.left;
        const y = e.clientY - t.top;
        e.currentTarget.parentElement?.style.setProperty("--mx", `${x}px`);
        e.currentTarget.parentElement?.style.setProperty("--my", `${y}px`);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.parentElement?.style.removeProperty("--mx");
        e.currentTarget.parentElement?.style.removeProperty("--my");
      }}
    />
  );
}

