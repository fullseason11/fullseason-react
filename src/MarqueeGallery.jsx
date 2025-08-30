// src/MarqueeGallery.jsx
import React from "react";

/**
 * 무한 좌측 슬라이드 (마키) - 안정 버전
 * - keyframes: fs2Slide
 * - width:200%로 잡고 images 2세트로 이어붙임
 */
export default function MarqueeGallery({
  images = [],
  height = 220,   // 숫자(px)
  gap = 20,       // 숫자(px)
  speed = 24,     // 초 (커질수록 느려짐 = 더 매끈해 보임)
  pauseOnHover = false,
  twoRows = false,
}) {
  const Row = ({ reverse = false }) => (
    <div
      className="fs2-track"
      style={{
        animation: `fs2Slide ${speed}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
        willChange: "transform",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
      }}
    >
      {[...images, ...images].map((src, i) => {
        const j = i % images.length;
        return (
          <div
            key={i}
            className="fs2-item"
            style={{
              width: height,
              height,
              marginRight: j === images.length - 1 ? 0 : gap,
              contain: "layout paint size",
            }}
          >
            <img
              src={src}
              alt={`work_${j}`}
              className="fs2-img"
              width={height}
              height={height}
              decoding="async"
              loading={i < 2 ? "eager" : "lazy"}
              fetchpriority={i === 0 ? "high" : "auto"}
              draggable="false"
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      className="fs2-wrap"
      style={{ height }}
    >
      <div className="fs2-row" style={{ height }}>
        <Row reverse={false} />
      </div>
      {twoRows && (
        <div className="fs2-row" style={{ height, marginTop: gap }}>
          <Row reverse={true} />
        </div>
      )}

      <style>{`
        .fs2-wrap{ position:relative; overflow:hidden; }
        .fs2-row{ width:100%; overflow:hidden; }

        /* 트랙: 200% 폭 */
        .fs2-track{
          width:200%;
          display:flex;
          align-items:center;
        }


        .fs2-item{
          flex:0 0 auto;
          display:block;
          outline:1px solid rgba(255,255,255,.08);
          border:0;
          border-radius:12px;
          background:#0e1325;
          overflow:hidden;
        }

        .fs2-img{
          width:100%;
          height:100%;
          display:block;
          object-fit:contain;
          transform: translateZ(0);
          pointer-events:none;
          user-select:none;
        }

        /* 슬라이드 keyframes */
        @keyframes fs2Slide {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }

        @media (prefers-reduced-motion: reduce){
          .fs2-track{ animation: none !important; }
        }
      `}</style>
    </section>
  );
}

