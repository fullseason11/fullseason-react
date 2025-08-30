import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import VideoBanner from "./VideoBanner";

/** 상단에만 깔리는 영상 배너 (아래로 그라데이션 페이드아웃) */
export default function VideoBanner({
  sources = ["/video/hero1.mp4", "/video/hero2.mp4"],
  height = "70vh",     // 60~80vh 권장
  dark = 0.7,          // 0.5~0.8 어둡게
  switchEvery = 12000, // 전환 간격(ms)
}) {
  const [i, setI] = useState(0);
  const total = sources.length;
  const timer = useRef(null);

  useEffect(() => {
    if (total <= 1) return;
    timer.current = setInterval(() => setI((p) => (p + 1) % total), switchEvery);
    return () => clearInterval(timer.current);
  }, [total, switchEvery]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height }}
      aria-label="visual video banner"
    >
      {/* 비디오 레이어 */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.video
            key={i}
            src={sources[i]}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ willChange: "opacity, transform" }}
          />
        </AnimatePresence>

        {/* 어둡게 + 아래로 사라지는 마스크 */}
        <div
          className="absolute inset-0"
          style={{
            background: `rgba(0,0,0,${dark})`,
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* 살짝 움직이는 그레인(느낌만) */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,.15), transparent 40%), radial-gradient(circle at 70% 80%, rgba(255,255,255,.1), transparent 45%)",
          animation: "grainMove 8s ease-in-out infinite alternate",
        }}
      />

      <style>{`
        @keyframes grainMove {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(2%, -2%, 0) scale(1.04); }
        }
      `}</style>
    </section>
  );
}

