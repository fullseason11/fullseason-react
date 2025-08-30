// src/VisualSection.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function VisualSection({
  images = [],
  interval = 3000,
  kenBurns = true,
  pauseOnHover = true,
  tintOnHover = true,
  caption = "", // 이미지 안쪽 하단에 고정 표기할 자막 (없으면 숨김)
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const wrapRef = useRef(null);
  const total = images.length;

  // 모든 이미지 미리 로드
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [images]);

  // 자동 슬라이드
  useEffect(() => {
    if (!total || paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % total), interval);
    return () => clearInterval(id);
  }, [total, interval, paused]);

  const onMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const activeTint = useMemo(
    () =>
      hovered && tintOnHover
        ? `radial-gradient(400px 400px at ${mouse.x}px ${mouse.y}px, rgba(80,180,255,.18), transparent 70%)`
        : "transparent",
    [hovered, tintOnHover, mouse]
  );

  if (!total) return null;

  return (
    <section
      ref={wrapRef}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-[#1b2131]"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHovered(false);
      }}
      onMouseMove={(e) => {
        setHovered(true);
        onMove(e);
      }}
      style={{ willChange: "transform" }}
      aria-label="Visual gallery"
    >
      {/* 마우스 틴트 */}
      <div
        className="absolute inset-0 mix-blend-screen pointer-events-none"
        style={{ background: activeTint }}
      />

      {/* 이미지 페이드(켄번즈) */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[i]}
          src={images[i]}
          alt=""
          loading="eager"
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: kenBurns ? 1.03 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ willChange: "opacity, transform" }}
        />
      </AnimatePresence>

      {/* 이미지 안쪽 하단 자막 */}
      {caption && (
        <div
          className="absolute inset-x-0 bottom-0 z-20 px-6 pb-2 pt-6 pointer-events-none select-none
                     bg-gradient-to-t from-black/55 via-black/30 to-transparent"
          style={{ transition: "none" }}
        >
          <p
            className="text-center text-[13px] leading-5 text-white/85 tracking-wide"
            style={{ transition: "none" }}
          >
            {caption}
          </p>
        </div>
      )}

      {/* 점 네비게이션 */}
      <div className="absolute bottom-14 inset-x-0 z-30 flex items-center justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            aria-label={`go to ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              idx === i
                ? "bg-white opacity-90"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

