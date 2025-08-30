import React, { useEffect, useRef, useState } from "react";

export default function VideoBanner({
  sources = ["/video/hero1.mp4", "/video/hero2.mp4"],
  height = "70vh",
  dark = 0.72,
  switchEvery = 12000,
}) {
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);

  // 일정 간격으로 소스 전환
  useEffect(() => {
    if (!sources.length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % sources.length), switchEvery);
    return () => clearInterval(id);
  }, [sources, switchEvery]);

  // 소스 바뀔 때 재생 보장(모바일 자동재생 정책 대응)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [index]);

  return (
    <section style={{ position: "relative", width: "100%", height, overflow: "hidden" }}>
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `brightness(${1 - dark})`,
        }}
      >
        <source src={sources[index]} type="video/mp4" />
      </video>

      {/* 아래로 부드럽게 사라지는 페이드 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "22%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(10,11,17,1) 95%)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

