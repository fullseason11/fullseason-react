import React, { useState, useEffect, useRef } from "react";
import { defineProperties } from "./figma-react-shim";
import { motion } from "motion/react";
import VisualSection from "./VisualSection";

const siteData = {
  companyInfo: {
    name: "주식회사풀시즌(FullSeason Co., Ltd.)",
    ceo: "김순주",
    address: "경남 양산 양주1길 11, 4층, 403호 (세종빌딩)",
    phone: "1544-5627",
    email: "fullseason11@naver.com",
    bizRegNo: "185-87-03430"
  },
  services: [
    { title: "Printing & Manufacturing", description: "DTF / HTV Vinyl / Sublimation" },
    { title: "Brand Operation", description: "자체 브랜드 기획·운영(Coming Soon)\n드랍·프리오더 중심 운영" },
    { title: "Creative Solutions", description: "로고 · 웹사이트 · 상세페이지\nAI 기반 비주얼/콘텐츠 제작" }
  ],
  printingMethods: [
    { title: "DTF (Direct to Film)", imageUrl: "", features: ["다양한 원단에 적용 가능","선명한 색상과 디테일 표현","내구성이 뛰어나고 세탁에 강함","복잡한 디자인도 정확하게 구현"] },
    { title: "HTV (Heat Transfer Vinyl)", imageUrl: "", features: ["선명한 단색 디자인에 적합","특수 효과(글리터, 홀로그램 등) 구현 가능","내구성이 뛰어나고 오래 지속됨","다양한 원단에 적용 가능"] },
    { title: "Sublimation", imageUrl: "", features: ["폴리에스터 원단에 최적화","사진과 같은 풀 컬러 이미지 구현","영구적인 프린팅으로 색상 유지","원단과 일체화되어 촉감이 부드러움"] }
  ],
  businessApproaches: [
    { title: "D2C (Direct to Consumer)", steps: [
      { icon:"brand-development", title:"브랜드 개발", description:"아이덴티티, 컨셉, 마케팅 전략" },
      { icon:"product-creation", title:"제품 제작", description:"디자인, 샘플링, 생산" },
      { icon:"brand-operation", title:"브랜드 운영", description:"유통, 마케팅, 고객 관리" },
    ]},
    { title: "B2C (Business to Consumer)", steps: [
      { icon:"brand-development", title:"브랜드 개발", description:"디자인, 컨셉, 타겟 설정" },
      { icon:"product-creation", title:"제품 제작", description:"프린팅, 생산, QC" },
      { icon:"brand-making", title:"브랜드 구축", description:"로고, 패키징, 브랜드 경험" },
    ]},
  ],
};

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;
  return didError ? (
    <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`} style={style}>
      <div className="flex items-center justify-center w-full h-full">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" 
          alt="Error loading image" {...rest} data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  );
}

export default function FullSeasonWebsite() {
  // 커서 글로우/트레일
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isGlowActive, setIsGlowActive] = useState(false);
  const [trails, setTrails] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsGlowActive(true);
      const now = Date.now();
      if (isDragging || (trails.length > 0 && now - trails[trails.length - 1].time < 50)) {
        const id = Date.now();
        setTrails((p) => [...p, { id, x: e.clientX, y: e.clientY, time: now, opacity: 1 }]);
        setTimeout(() => {
          setTrails((p) => p.map(t => t.id === id ? { ...t, opacity: 0 } : t));
        }, 100);
      }
    };
    const handleMouseLeave = () => { setIsGlowActive(false); setIsDragging(false); setTrails([]); };
    const handleMouseDown = () => { setIsDragging(true); };
    const handleMouseUp = () => { setIsDragging(false); };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, trails]);

  // 카드 틸트
  const handleCardMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;
    const rx = (+py * 8).toFixed(2);
    const ry = (-px * 8).toFixed(2);
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const handleCardMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="relative w-full h-full font-sans text-[#e9ecf1] bg-[#0a0b11] overflow-x-hidden">
      {/* Cursor Glow */}
      <motion.div
        className="fixed pointer-events-none z-10 rounded-full mix-blend-screen"
        animate={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          width: isDragging ? 455 : 350,
          height: isDragging ? 455 : 350,
          opacity: isGlowActive ? (isDragging ? 1 : 0.8) : 0,
          background:
            isDragging
              ? `radial-gradient(circle, rgba(106,73,255,0.27) 0%, rgba(42,127,255,0.18) 40%, rgba(73,255,154,0.14) 70%, transparent 85%)`
              : `radial-gradient(circle, rgba(106,73,255,0.18) 0%, rgba(42,127,255,0.12) 40%, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        style={{ x: "-50%", y: "-50%" }}
        transition={{ duration: isDragging ? 0.2 : 0.3, ease: "easeOut" }}
      />
      {trails.map(trail => (
        <motion.div key={trail.id} className="fixed pointer-events-none z-10 rounded-full"
          style={{ left: trail.x, top: trail.y, width: 25, height: 25, opacity: trail.opacity, background: "radial-gradient(circle, rgba(106,73,255,0.7) 0%, transparent 70%)", x:"-50%", y:"-50%" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      ))}

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-gradient-to-b from-[rgba(10,11,17,0.95)] via-[rgba(10,11,17,0.7)] to-transparent">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between border-b border-[#1b2131] py-[35px]">
            <div className="text-2xl font-extrabold tracking-wide">FullSeason Co., Ltd.</div>
            <nav className="flex gap-5 text-[#9aa4b2]">
              <a href="#about">회사소개</a>
              <a href="#mission-vision">미션·비전</a>
              <a href="#services">사업영역</a>
              <a href="#business-approaches">비즈니스&nbsp;접근법</a>
              <a href="#portfolio">포트폴리오</a>
              <a href="#tech">프린팅&nbsp;제조방식</a>
              <a href="#info">회사정보</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] py-[220px] text-center bg-[radial-gradient(1200px_600px_at_0%_-10%,rgba(106,73,255,0.25),transparent_60%),radial-gradient(900px_600px_at_100%_-10%,rgba(42,127,255,0.22),transparent_60%),radial-gradient(800px_600px_at_50%_-20%,rgba(73,255,154,0.15),transparent_60%)]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center justify-center gap-10">
          <h1 className="text-[clamp(64px,8vw,120px)] leading-tight font-black tracking-wider inline-block relative animate-gradient bg-gradient-to-r from-[#6a49ff] via-[#2a7fff] to-[#49ff9a] bg-clip-text text-transparent bg-[length:200%_100%]">
            Beyond Printing,<br/>Towards Branding
          </h1>
          <p className="text-2xl text-[#9aa4b2] max-w-[900px] mx-auto leading-relaxed">
            풀시즌은 프린팅 기술과 브랜드 운영을 아우르는 제조·운영사로,<br className="hidden md:block" />
            아이디어를 실제 브랜드로 완성합니다.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div
            ref={el => cardRefs.current[0] = el}
            className="bg-[#121420] border border-[#1b2131] rounded-2xl p-7 relative overflow-hidden"
            onMouseMove={(e) => handleCardMouseMove(e, 0)}
            onMouseLeave={() => handleCardMouseLeave(0)}
            style={{ transformStyle: "preserve-3d", transition: "transform .18s ease, box-shadow .18s ease, border-color .18s ease", willChange: "transform" }}
          >
            <h2 className="text-3xl font-extrabold mb-6">회사소개</h2>
            <p className="text-[#9aa4b2]">
              주식회사 풀시즌(FullSeason)은 2024년 설립된 제조 기반 브랜드 운영사입니다.<br/>
              DTF, HTV Vinyl, Sublimation 등 프린팅 기술과 브랜드 운영 경험을 결합해 차별화된 솔루션을 제공합니다.
            </p>
            <hr className="h-px border-0 bg-gradient-to-r from-transparent via-[#6a49ff] to-transparent opacity-65 mt-12" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission-vision" className="py-32 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-10 text-center">미션 · 비전</h2>
          <div className="text-xl text-[#9aa4b2] text-center max-w-[900px] mx-auto mb-16 leading-relaxed italic">
            “프린팅은 기술과 감성이 만나는 순간 콘텐츠가 됩니다. 우리는 제조에서 시작해 브랜드로 성장하고, 콘텐츠로 문화를 남깁니다.”
          </div>
          {/* 간단한 3단 여정 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { c:"#6a49ff", t:"제조", d:"프린팅 기술로 시작되는 브랜드의 첫 단계" },
              { c:"#2a7fff", t:"브랜드", d:"기술과 감성이 만나 스토리를 완성" },
              { c:"#49ff9a", t:"콘텐츠·문화", d:"브랜드가 성장하여 문화 형성" },
            ].map((s,idx)=>(
              <div key={idx} className="bg-[#121420] border border-[#1b2131] rounded-2xl p-7">
                <div className="w-10 h-10 rounded-full mb-4" style={{background:s.c}}/>
                <h3 className="text-xl font-bold mb-2">{s.t}</h3>
                <p className="text-[#9aa4b2]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">포트폴리오</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(id=> (
              <div key={id} className="group relative overflow-hidden rounded-2xl border border-[#1b2131]">
                <ImageWithFallback src={`https://images.unsplash.com/random/800x600?sig=${id}&auto=format&fit=crop&w=800&q=80`} alt="portfolio" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Project {id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">사업영역</h2>
          <p className="text-xl text-[#9aa4b2] max-w-[900px] mb-8">
            풀시즌은 단순한 제조를 넘어 아이디어를 현실로 만드는 브랜드 파트너입니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {siteData.services.map((service, index) => (
              <div key={index}
                ref={el => cardRefs.current[index + 2] = el}
                className="bg-[#121420] border border-[#1b2131] rounded-2xl p-7 relative overflow-hidden"
                onMouseMove={(e) => handleCardMouseMove(e, index + 2)}
                onMouseLeave={() => handleCardMouseLeave(index + 2)}
                style={{ transformStyle: "preserve-3d", transition: "transform .18s ease, box-shadow .18s ease, border-color .18s ease", willChange: "transform" }}
              >
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <div className="text-[#9aa4b2] whitespace-pre-line">{service.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Section — 사업영역 바로 아래 */}
      <VisualSection
        images={["/visual/1.jpg","/visual/2.jpg","/visual/3.jpg","/visual/4.jpg"]}
        interval={5000}
        kenBurns={true}
        pauseOnHover={true}
        tintOnHover={true}
      />

      {/* Business Approaches (D2C/B2C) */}
      <section id="business-approaches" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">비즈니스 접근법</h2>
          <p className="text-xl text-[#9aa4b2] max-w-[900px] mb-12">
            풀시즌은 D2C, B2C 모델을 통해 다양한 파트너/소비자에게 서비스를 제공합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {siteData.businessApproaches.map((appr, i)=>(
              <div key={i} className="bg-[#121420] border border-[#1b2131] rounded-2xl p-7">
                <h3 className="text-2xl font-extrabold mb-8 text-center">{appr.title}</h3>
                <div className="relative">
                  <div className="absolute left-[24px] top-[40px] h-[calc(100%-40px)] w-[2px] bg-gradient-to-b from-[#6a49ff] via-[#2a7fff] to-[#49ff9a]" />
                  {appr.steps.map((s, idx)=>(
                    <div key={idx} className="flex items-start mb-10 relative">
                      <div className="flex-shrink-0 w-[50px] h-[50px] rounded-full border-2 flex items-center justify-center z-10"
                           style={{borderColor: ["#6a49ff","#2a7fff","#49ff9a"][idx%3]}}>
                        <div className="w-2.5 h-2.5 rounded-full" style={{background: ["#6a49ff","#2a7fff","#49ff9a"][idx%3]}} />
                      </div>
                      <div className="ml-6">
                        <h4 className="text-xl font-bold text-white">{s.title}</h4>
                        <p className="text-[#9aa4b2] mt-2">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 두 접근법 비교 */}
          <div className="bg-[#121420] border border-[#1b2131] rounded-2xl p-7">
            <h3 className="text-2xl font-bold mb-6">두 접근법 비교</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[#6a49ff] mb-4">브랜드 중심 접근법</h4>
                <ul className="space-y-3 text-[#9aa4b2]">
                  <li>브랜드 정체성과 가치를 먼저 구축</li>
                  <li>장기적인 브랜드 운영 전략 중심</li>
                  <li>제품은 브랜드 가치를 전달하는 수단</li>
                  <li>고객 커뮤니티 및 관계 구축 중시</li>
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[#49ff9a] mb-4">제작 중심 접근법</h4>
                <ul className="space-y-3 text-[#9aa4b2]">
                  <li>제품 품질과 기술적 완성도 우선</li>
                  <li>제작 과정에서 브랜드 특성 발굴</li>
                  <li>기술력과 제작 경쟁력 기반 브랜드 구축</li>
                  <li>제품 중심의 마케팅과 브랜드 스토리</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Printing Methods */}
      <section id="tech" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">프린팅 제조방식</h2>
          <p className="text-xl text-[#9aa4b2] max-w-[900px] mb-8">
            최고 품질을 위해 다양한 최신 프린팅 기술을 활용합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData.printingMethods.map((m, idx)=>(
              <div key={idx}
                   ref={el => cardRefs.current[idx + 20] = el}
                   className="bg-[#121420] border border-[#1b2131] rounded-2xl p-7 relative overflow-hidden"
                   onMouseMove={(e) => handleCardMouseMove(e, idx + 20)}
                   onMouseLeave={() => handleCardMouseLeave(idx + 20)}
                   style={{ transformStyle: "preserve-3d", transition: "transform .18s ease, box-shadow .18s ease, border-color .18s ease", willChange: "transform" }}
              >
                <h3 className="text-2xl font-bold mb-3">{m.title}</h3>
                {m.imageUrl && (
                  <ImageWithFallback src={m.imageUrl} alt={m.title} className="aspect-[16/9] w-full object-cover rounded-xl border border-[#1b2131]" />
                )}
                <ul className="mt-4 pl-0 list-none text-[#9aa4b2]">
                  {m.features.map((f,i)=>(<li key={i} className="relative pl-5 before:content-['•'] before:text-[#2a7fff] before:font-bold before:absolute before:left-0">{f}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section id="info" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#121420] border border-[#1b2131] rounded-2xl p-7">
              <h2 className="text-3xl font-extrabold mb-6">회사정보</h2>
              <p className="text-[#9aa4b2]">회사명: {siteData.companyInfo.name}</p>
              <p className="text-[#9aa4b2]">대표이사: {siteData.companyInfo.ceo}</p>
              <p className="text-[#9aa4b2]">주소: {siteData.companyInfo.address}</p>
              <p className="text-[#9aa4b2]">대표번호: {siteData.companyInfo.phone}</p>
              <p className="text-[#9aa4b2]">이메일: {siteData.companyInfo.email}</p>
              <p className="text-[#9aa4b2]">사업자등록번호: {siteData.companyInfo.bizRegNo}</p>
            </div>
            <div className="bg-[#121420] border border-[#1b2131] rounded-2xl p-7">
              <h2 className="text-3xl font-extrabold mb-6">문의 및 안내</h2>
              <p className="text-[#9aa4b2]">
                소비자 상담·교환·반품은 각 브랜드 스토어 고객센터를 통해 진행됩니다. 전화 상담은 현재 제공하지 않으며,
                문의는 이메일 <strong>{siteData.companyInfo.email}</strong>로 부탁드립니다. (운영시간: 평일 10:00 - 18:00)
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 border-t border-[#1b2131] text-center">
        <div className="max-w-[1200px] mx-auto px-6 text-[#9aa4b2] text-base">
          © {currentYear} FullSeason Co., Ltd. All rights reserved.
        </div>
      </footer>

      <style>{`
        @keyframes gradient { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
        .animate-gradient { animation: gradient 4s linear infinite; }
      `}</style>
    </div>
  );
}

defineProperties(FullSeasonWebsite, {});
