import React, { useState, useEffect, useRef } from "react";
import { defineProperties } from "./figma-react-shim";
import { motion, AnimatePresence } from "motion/react";

/** 비주얼 섹션 (자동 슬라이드 + 마우스 컬러 틴트) */
function VisualSection({
  images = [],
  interval = 5000,
  kenBurns = true,
  pauseOnHover = true,
  tintOnHover = true,
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const wrapRef = useRef(null);
  const total = images.length;

  useEffect(() => {
    if (!total || paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % total), interval);
    return () => clearInterval(id);
  }, [total, interval, paused]);

  const onMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const tint = ["#6a49ff", "#2a7fff", "#49ff9a", "#ff7ab3"][i % 4];

  return (
    <section
      ref={wrapRef}
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden border-t border-b border-[#1b2131]"
      onMouseMove={onMove}
      onMouseEnter={() => {
        setHovered(true);
        if (pauseOnHover) setPaused(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (pauseOnHover) setPaused(false);
      }}
    >
      {/* 슬라이드 (크로스페이드 + Ken Burns) */}
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={i}
          src={images[i]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: kenBurns ? 1.05 : 1 }}
          animate={{
            opacity: 1,
            scale: kenBurns ? 1.12 : 1,
            x: kenBurns ? [0, 10, 0] : 0,
            y: kenBurns ? [0, -10, 0] : 0,
          }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{
            opacity: { duration: 1.1, ease: "easeInOut" },
            scale: { duration: interval / 1000, ease: "linear" },
            x: { duration: interval / 1000, ease: "linear" },
            y: { duration: interval / 1000, ease: "linear" },
          }}
        />
      </AnimatePresence>

      {/* 상/하 그라데이션 */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,11,17,.6),transparent_40%),linear-gradient(to_top,rgba(10,11,17,.7),transparent_35%)]" />

      {/* 마우스 컬러 틴트 */}
      {tintOnHover && (
        <motion.div
          className="pointer-events-none absolute rounded-full mix-blend-screen"
          style={{
            width: 320,
            height: 320,
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle, ${tint}99 0%, transparent 60%)`,
          }}
          animate={{
            left: mouse.x,
            top: mouse.y,
            opacity: hovered ? 0.9 : 0,
          }}
          transition={{ type: "tween", duration: 0.18 }}
        />
      )}

      {/* 하단 점 인디케이터 */}
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              aria-label={`go to ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                idx === i ? "bg-white/90 w-6" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function FullSeasonWebsite() {
  return (
    <div className="min-h-screen text-[#e9ecf1] bg-[#0a0b11]">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 backdrop-blur bg-black/30 border-b border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex justify-between">
          <div className="font-extrabold text-2xl">FullSeason Co., Ltd.</div>
          <nav className="flex gap-5 text-[#9aa4b2]">
            <a href="#about">회사소개</a>
            <a href="#services">사업영역</a>
            <a href="#info">회사정보</a>
          </nav>
        </div>
      </header>

      {/* 회사소개 (자리표시자) */}
      <section id="about" className="max-w-[1200px] mx-auto px-6 py-20 border-t border-[#1b2131]">
        <h2 className="text-3xl font-extrabold mb-4">회사소개</h2>
        <p className="text-[#9aa4b2]">프린팅 기술과 브랜드 운영을 결합해 차별화된 솔루션을 제공합니다.</p>
      </section>

      {/* 사업영역 */}
      <section id="services" className="max-w-[1200px] mx-auto px-6 py-20 border-t border-[#1b2131]">
        <h2 className="text-3xl font-extrabold mb-6">사업영역</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-[#1b2131] p-6 bg-[#121420]">Printing & Manufacturing</div>
          <div className="rounded-xl border border-[#1b2131] p-6 bg-[#121420]">Brand Operation</div>
          <div className="rounded-xl border border-[#1b2131] p-6 bg-[#121420]">Creative Solutions</div>
        </div>
      </section>

      {/* ★ 비주얼 섹션: 사업영역 바로 아래 */}
      <VisualSection
        images={["/visual/1.jpg","/visual/2.jpg","/visual/3.jpg","/visual/4.jpg"]}
        interval={5000}
        kenBurns={true}
        pauseOnHover={true}
        tintOnHover={true}
      />

      {/* 회사정보 */}
      <section id="info" className="max-w-[1200px] mx-auto px-6 py-20 border-t border-[#1b2131]">
        <h2 className="text-3xl font-extrabold mb-4">회사정보</h2>
        <p className="text-[#9aa4b2]">이메일: fullseason11@naver.com / 대표번호: 1544-5627</p>
      </section>

      <footer className="text-center text-[#9aa4b2] border-t border-[#1b2131] py-10">
        © {new Date().getFullYear()} FullSeason
      </footer>
    </div>
  );
}

defineProperties(FullSeasonWebsite, {});
