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
  }
};

export default function FullSeasonWebsite() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#0a0b11] text-[#e9ecf1] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-black/50 border-b border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex justify-between">
          <div className="text-2xl font-extrabold">FullSeason Co., Ltd.</div>
          <nav className="flex gap-6 text-[#9aa4b2]">
            <a href="#about">회사소개</a>
            <a href="#mission-vision">미션·비전</a>
            <a href="#services">사업영역</a>
            <a href="#business-approaches">비즈니스 접근법</a>
            <a href="#portfolio">포트폴리오</a>
            <a href="#tech">프린팅 제조방식</a>
            <a href="#info">회사정보</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-32 text-center bg-[radial-gradient(1200px_600px_at_0%_-10%,rgba(106,73,255,0.25),transparent_60%)]">
        <h1 className="text-[clamp(48px,8vw,100px)] font-black bg-gradient-to-r from-[#6a49ff] via-[#2a7fff] to-[#49ff9a] bg-clip-text text-transparent">
          Beyond Printing,<br/>Towards Branding
        </h1>
        <p className="mt-6 text-xl text-[#9aa4b2]">
          프린팅 ↔ 브랜드 운영, 아이디어를 실제 브랜드로.
        </p>
      </section>

      {/* About */}
      <section id="about" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">회사소개</h2>
          <p className="text-[#9aa4b2]">
            주식회사 풀시즌은 2024년에 설립된 프린팅·브랜드 운영사입니다.<br/>
            기술과 감성이 만나 브랜드를 완주합니다.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission-vision" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-10">미션 · 비전</h2>
          <p className="text-[#9aa4b2] italic">
            프린팅은 기술과 감성이 만나는 순간 콘텐츠가 됩니다.<br/>
            우리는 제조에서 시작해 브랜드로 성장하며, 콘텐츠로 문화를 남깁니다.
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">사업영역</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <li className="bg-[#121420] p-6 rounded-xl border border-[#1b2131]">
              <h3 className="font-bold mb-2">Printing & Manufacturing</h3>
              <p className="text-[#9aa4b2]">DTF / HTV Vinyl / Sublimation</p>
            </li>
            <li className="bg-[#121420] p-6 rounded-xl border border-[#1b2131]">
              <h3 className="font-bold mb-2">Brand Operation</h3>
              <p className="text-[#9aa4b2]">드랍·프리오더 중심 운영</p>
            </li>
            <li className="bg-[#121420] p-6 rounded-xl border border-[#1b2131]">
              <h3 className="font-bold mb-2">Creative Solutions</h3>
              <p className="text-[#9aa4b2]">로고 · 웹사이트 · AI 기반 비주얼</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Visual Section */}
      <VisualSection
        images={["/visual/1.jpg","/visual/2.jpg","/visual/3.jpg","/visual/4.jpg"]}
        interval={5000}
        kenBurns={true}
        pauseOnHover={true}
        tintOnHover={true}
      />

      {/* Business Approaches */}
      <section id="business-approaches" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-10">비즈니스 접근법</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#121420] p-6 rounded-xl border border-[#1b2131]">
              <h3 className="text-xl font-bold mb-4">D2C (Direct to Consumer)</h3>
              <p className="text-[#9aa4b2]">자사몰 중심, 브랜드 직접 운영</p>
            </div>
            <div className="bg-[#121420] p-6 rounded-xl border border-[#1b2131]">
              <h3 className="text-xl font-bold mb-4">B2C (Business to Consumer)</h3>
              <p className="text-[#9aa4b2]">플랫폼/유통 기반 소비자 접근</p>
            </div>
          </div>
          <div className="mt-10 bg-[#121420] p-6 rounded-xl border border-[#1b2131]">
            <h3 className="font-bold mb-4">두 접근법 비교</h3>
            <p className="text-[#9aa4b2]">브랜드 중심 ↔ 제작 중심</p>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">포트폴리오</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(id=>(
              <div key={id} className="bg-[#121420] h-40 rounded-xl border border-[#1b2131] flex items-center justify-center text-[#9aa4b2]">
                Project {id}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Printing Methods */}
      <section id="tech" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">프린팅 제조방식</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <li className="bg-[#121420] p-6 rounded-xl border border-[#1b2131]">DTF</li>
            <li className="bg-[#121420] p-6 rounded-xl border border-[#1b2131]">HTV</li>
            <li className="bg-[#121420] p-6 rounded-xl border border-[#1b2131]">Sublimation</li>
          </ul>
        </div>
      </section>

      {/* Info */}
      <section id="info" className="py-24 border-t border-[#1b2131]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-6">회사정보</h2>
          <p className="text-[#9aa4b2]">회사명: {siteData.companyInfo.name}</p>
          <p className="text-[#9aa4b2]">대표: {siteData.companyInfo.ceo}</p>
          <p className="text-[#9aa4b2]">주소: {siteData.companyInfo.address}</p>
          <p className="text-[#9aa4b2]">대표번호: {siteData.companyInfo.phone}</p>
          <p className="text-[#9aa4b2]">이메일: {siteData.companyInfo.email}</p>
        </div>
      </section>

      <footer className="text-center text-[#9aa4b2] border-t border-[#1b2131] py-10">
        © {currentYear} FullSeason
      </footer>
    </div>
  );
}

defineProperties(FullSeasonWebsite, {});
