import React, { useState, useEffect } from "react";
import { Laptop, Smartphone, FileText, CalendarCheck, Megaphone, Bell, Sparkles } from "lucide-react";
import { Language, UniversityId, UniversityInfo } from "./types";
import { UNIVERSITIES, TRANSLATIONS } from "./data";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AdmissionsCards from "./components/AdmissionsCards";
import CampusTour from "./components/CampusTour";
import CounselingForm from "./components/CounselingForm";
import SearchDialog from "./components/SearchDialog";
import Footer from "./components/Footer";

export default function App() {
  const [language, setLanguage] = useState<Language>("ko");
  const [univId, setUnivId] = useState<UniversityId>("cju"); // default to Cheongju Univ as seen in many screenshots, can be swapped instantly
  const [searchOpen, setSearchOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  
  // Tab states for navigation synchronization
  const [activeTab, setActiveTab] = useState<string>("home");

  const activeUniv = UNIVERSITIES[univId];
  const t = TRANSLATIONS[language];

  // Sync ESC key for search close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenSearch = () => {
    setSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  // Mock Academic News Notifications (specifically for Cheongju / Chungbuk)
  const mockupNews = [
    {
      id: "news-1",
      date: "2025.05.24",
      tagKo: "모집 공고",
      tagEn: "Admission Notice",
      titleKo: "2025학년도 후기 대학원 외국인 신합생 요건 개정안",
      titleEn: "Revision of criteria for international graduate applicants 2025",
      urgent: true,
    },
    {
      id: "news-2",
      date: "2025.05.20",
      tagKo: "장학 안내",
      tagEn: "Scholarship Guide",
      titleKo: "신입생 우수 장학선발 및 기숙사 100% 매칭 혜택 설명회",
      titleEn: "Info briefing: Entrance scholarships & guaranteed dorm residency matches",
      urgent: false,
    },
    {
      id: "news-3",
      date: "2025.04.15",
      tagKo: "캠퍼스 투어",
      tagEn: "Campus Tour",
      titleKo: "고교생 대상 찾아가는 오프라인 입학 자문 투어 모집",
      titleEn: "Apply for on-site local high-school advising counselors visits",
      urgent: false,
    }
  ];

  return (
    <div id="root" className="min-h-screen bg-slate-100 text-slate-850 antialiased font-sans">
      
      {/* Top Floating Viewport Emulation Commuter Controls */}
      <div className="bg-slate-900 text-slate-300 py-3.5 px-4 md:px-8 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4.5 w-4.5 text-amber-400 shrink-0 animate-pulse" />
          <span className="text-white font-extrabold tracking-wide uppercase">
            {language === "ko" ? "인터랙티브 뷰 변환기" : "Interactive View Selector"}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 font-medium">
            {language === "ko" 
              ? "충북대와 청주대 시안을 모두 확인해 보세요!" 
              : "Explore BOTH Chungbuk & Cheongju mockup screens!"}
          </span>
        </div>

        {/* Action Toggles for Desktop and Mobile View */}
        <div className="flex gap-2">
          {/* Desktop Trigger */}
          <button
            onClick={() => {
              setViewMode("desktop");
              setActiveTab("home");
            }}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all outline-none cursor-pointer ${
              viewMode === "desktop"
                ? "bg-white text-slate-900 shadow-sm font-bold scale-102"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Laptop className="h-4 w-4" />
            <span>{t.desktopMode}</span>
          </button>

          {/* Mobile Emulated Trigger */}
          <button
            onClick={() => {
              setViewMode("mobile");
              setActiveTab("home");
            }}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all outline-none cursor-pointer ${
              viewMode === "mobile"
                ? "bg-white text-slate-900 shadow-sm font-bold scale-102"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>{t.mobileMode}</span>
          </button>
        </div>
      </div>

      {/* RENDER MODE: 1. FULL DESKTOP LAYOUT */}
      {viewMode === "desktop" ? (
        <div className="animate-in fade-in duration-300 flex flex-col">
          {/* Main Desktop Navbar */}
          <Navbar
            language={language}
            setLanguage={setLanguage}
            activeUniv={activeUniv}
            setUnivId={setUnivId}
            onOpenSearch={handleOpenSearch}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Hero Banner Section */}
          <Hero language={language} activeUniv={activeUniv} />

          {/* Bulleted News Announcements Segment */}
          <div className="bg-white py-12 border-b border-slate-200 text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-red-500" />
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    {language === "ko" ? "공식 학사 및 입학 정보 새소식" : "Admissions & Campus News Bulletin"}
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest bg-slate-100 px-2.5 py-1 rounded-md">
                  Updates Direct
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockupNews.map((news) => (
                  <div
                    key={news.id}
                    className="p-5 rounded-2xl border border-slate-150 bg-slate-50 hover:bg-white hover:shadow-md transition-all text-left flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase">
                        <span 
                          className={`px-2 py-0.5 rounded-md ${
                            news.urgent ? "bg-red-100 text-red-600" : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {language === "ko" ? news.tagKo : news.tagEn}
                        </span>
                        <span className="text-slate-400 font-mono">{news.date}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug group-hover:text-blue-600">
                        {language === "ko" ? news.titleKo : news.titleEn}
                      </h4>
                    </div>
                    <span 
                      style={{ color: activeUniv.accentColor }}
                      className="text-[11px] font-bold mt-4 inline-flex items-center gap-1 cursor-pointer hover:underline text-amber-600"
                    >
                      {language === "ko" ? "공고 전문 읽기 →" : "Read Announcement →"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Three admissions grid cards with interactive details details */}
          <AdmissionsCards language={language} activeUniv={activeUniv} />

          {/* Campus and departments explorer module */}
          <CampusTour language={language} activeUniv={activeUniv} />

          {/* Submission and inquiries helpdesk */}
          <CounselingForm language={language} activeUniv={activeUniv} />

          {/* Footer of the Portal */}
          <Footer language={language} activeUniv={activeUniv} />
        </div>
      ) : (
        /* RENDER MODE: 2. DEVICE SIMULATION VIEW (Inspired by Image 4 Mobile View) */
        <div className="py-12 flex justify-center items-center min-h-[calc(100vh-60px)] px-4">
          <div className="relative w-full max-w-[375px] h-[780px] bg-slate-900 rounded-[50px] p-3.5 shadow-2xl border-4 border-slate-800 flex flex-col overflow-hidden">
            
            {/* Top Earphone Speaker Capsule / Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-36 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
              <div className="h-1.5 w-12 bg-slate-800 rounded-full mb-1" />
            </div>

            {/* Simulated Phone Main Screen Window */}
            <div className="w-full h-full bg-white rounded-[38px] flex flex-col overflow-hidden relative border border-slate-950">
              
              {/* Phone Status bar */}
              <div className="bg-slate-50 px-6 pt-3 pb-1 h-8 flex justify-between items-center text-[10px] font-mono text-slate-500 font-bold shrink-0">
                <span>09:41 AM</span>
                <div className="flex gap-1.5 items-center">
                  <span>5G</span>
                  <span className="bg-slate-300 h-2.5 w-4 rounded-xs inline-block relative overflow-hidden">
                    <span className="bg-slate-700 h-full w-4/5 block" />
                  </span>
                </div>
              </div>

              {/* Mobile Top Navbar with minimal layout */}
              <Navbar
                language={language}
                setLanguage={setLanguage}
                activeUniv={activeUniv}
                setUnivId={setUnivId}
                onOpenSearch={handleOpenSearch}
                isMobileFrame={true}
              />

              {/* Main Inside View container according to Mobile Bottom tabs */}
              <div className="flex-1 overflow-y-auto scrollbar-thin text-left">
                {activeTab === "home" && (
                  <div className="animate-in fade-in duration-200">
                    {/* Small Hero inside mobile */}
                    <div className="relative h-44 bg-slate-950 overflow-hidden">
                      <img
                        src={activeUniv.heroUrl}
                        alt="Mobile Hero"
                        className="w-full h-full object-cover filter brightness-50"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end text-left">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
                          {activeUniv.id === "cbnu" ? "National Univ" : "First-Class Campus"}
                        </span>
                        <h2 className="text-base font-black text-white leading-tight">
                          {language === "ko" ? `${activeUniv.nameKo} 후기` : `${activeUniv.nameEn}`}
                        </h2>
                        <p className="text-[10px] text-slate-350 line-clamp-2 leading-relaxed mt-1 font-medium">
                          {t.welcomeSub}
                        </p>
                      </div>
                    </div>

                    {/* Quick Access Quick links (Undergrad, Graduate, International) */}
                    <div className="p-4 space-y-4">
                      <div className="text-left">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          {language === "ko" ? "입학 프로그램 분류" : "Program Pathways"}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-800 mt-0.5">
                          {language === "ko" ? "한눈에 보는 원서 접수" : "Application Overview"}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        <button
                          onClick={() => setActiveTab("admissions")}
                          className="bg-slate-50 border border-slate-150 rounded-xl p-3 text-left hover:bg-slate-100 transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-850 block">{t.undergradTitle}</span>
                            <span className="text-[9px] text-slate-400 block font-medium mt-0.5">
                              {language === "ko" ? "수시, 정시전형 접수 일정 요강" : "Early Decision and Transfers schedule"}
                            </span>
                          </div>
                          <span style={{ color: activeUniv.accentColor }} className="text-xs font-bold font-mono">GO</span>
                        </button>

                        <button
                          onClick={() => setActiveTab("admissions")}
                          className="bg-slate-50 border border-slate-150 rounded-xl p-3 text-left hover:bg-slate-100 transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-850 block">{t.gradTitle}</span>
                            <span className="text-[9px] text-slate-400 block font-medium mt-0.5">
                              {language === "ko" ? "종합 대학원 상세 모집 인원" : "Doctoral details & Research paths"}
                            </span>
                          </div>
                          <span style={{ color: activeUniv.accentColor }} className="text-xs font-bold font-mono">GO</span>
                        </button>
                      </div>

                      {/* Small Call to consultation */}
                      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col gap-2">
                        <span className="text-[9px] font-bold text-amber-300 tracking-wide uppercase">Interactive helpdesk</span>
                        <p className="text-[11px] font-semibold text-slate-350">
                          {language === "ko" ? "입학 조교와 일대일 실시간 비대면 상담을 요청하세요!" : "Request direct, 1-on-1 advisor consultations!"}
                        </p>
                        <button
                          onClick={() => setActiveTab("news")}
                          className="w-full text-center py-2 bg-white hover:bg-slate-100 text-slate-900 text-[10px] font-bold rounded-lg transition-transform active:scale-95 cursor-pointer mt-1"
                        >
                          {language === "ko" ? "학사 새소식 확인하기" : "Check News Bulletin"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "admissions" && (
                  <div className="animate-in fade-in duration-200">
                    <AdmissionsCards language={language} activeUniv={activeUniv} />
                  </div>
                )}

                {activeTab === "departments" && (
                  <div className="animate-in fade-in duration-200">
                    <CampusTour language={language} activeUniv={activeUniv} />
                  </div>
                )}

                {activeTab === "news" && (
                  <div className="p-4 space-y-4 animate-in fade-in duration-200">
                    <div className="text-left">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        Real-time News
                      </span>
                      <h3 className="text-base font-black text-slate-800">
                        {language === "ko" ? "대학 공식 새소식" : "Admissions News"}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {mockupNews.map((news) => (
                        <div
                          key={news.id}
                          className="p-3.5 rounded-xl border border-slate-150 bg-slate-50 space-y-2 text-left"
                        >
                          <div className="flex justify-between text-[8px] font-bold">
                            <span className={news.urgent ? "text-red-500" : "text-slate-500"}>
                              {language === "ko" ? news.tagKo : news.tagEn}
                            </span>
                            <span className="text-slate-400">{news.date}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-800">
                            {language === "ko" ? news.titleKo : news.titleEn}
                          </h4>
                        </div>
                      ))}
                    </div>

                    {/* Counseling Form inside mobile view */}
                    <div className="pt-4 border-t border-slate-150">
                      <CounselingForm language={language} activeUniv={activeUniv} />
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Phone Bottom Tab Bar (Exactly matching Image 4!) */}
              <div className="bg-white border-t border-slate-150 px-3 py-2 flex items-center justify-around text-center shrink-0 shadow-lg relative z-20">
                {/* Tab: Home */}
                <button
                  onClick={() => setActiveTab("home")}
                  className={`flex flex-col items-center gap-1 cursor-pointer outline-none transition-colors ${
                    activeTab === "home" ? "text-slate-900 font-extrabold" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span className="text-[9px] font-semibold">{t.navHome}</span>
                </button>

                {/* Tab: Admissions */}
                <button
                  onClick={() => setActiveTab("admissions")}
                  className={`flex flex-col items-center gap-1 cursor-pointer outline-none transition-colors ${
                    activeTab === "admissions" ? "text-slate-900 font-extrabold" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <CalendarCheck className="h-4 w-4" />
                  <span className="text-[9px] font-semibold">{t.navAdmissions}</span>
                </button>

                {/* Tab: Departments */}
                <button
                  onClick={() => setActiveTab("departments")}
                  className={`flex flex-col items-center gap-1 cursor-pointer outline-none transition-colors ${
                    activeTab === "departments" ? "text-slate-900 font-extrabold" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[9px] font-semibold">{t.navDepts}</span>
                </button>

                {/* Tab: News */}
                <button
                  onClick={() => setActiveTab("news")}
                  className={`flex flex-col items-center gap-1 cursor-pointer outline-none transition-colors ${
                    activeTab === "news" ? "text-slate-900 font-extrabold" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  <span className="text-[9px] font-semibold">{t.navNews}</span>
                </button>
              </div>

              {/* Phone Home Swipe Bar */}
              <div className="bg-slate-50 h-5 pb-1 w-full flex items-center justify-center shrink-0">
                <div className="h-1 w-24 bg-slate-350 rounded-full" />
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Global search overlay, active on ESC or search trigger */}
      <SearchDialog
        isOpen={searchOpen}
        onClose={handleCloseSearch}
        language={language}
      />
    </div>
  );
}
