import React, { useState, useEffect } from "react";
import { Search, Globe, ChevronDown, Menu, X, Calendar, MapPin, Building, GraduationCap, Award } from "lucide-react";
import { Language, UniversityId, UniversityInfo } from "../types";
import { TRANSLATIONS } from "../data";

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeUniv: UniversityInfo;
  setUnivId: (id: UniversityId) => void;
  onOpenSearch: () => void;
  isMobileFrame?: boolean;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Navbar({
  language,
  setLanguage,
  activeUniv,
  setUnivId,
  onOpenSearch,
  isMobileFrame = false,
  activeTab = "home",
  setActiveTab,
}: NavbarProps) {
  const [megamenuOpen, setMegamenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 8, minutes: 45, seconds: 12 });

  const t = TRANSLATIONS[language];

  // Countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLinkClick = (anchorId: string, tabValue?: string) => {
    setMegamenuOpen(false);
    setMobileMenuOpen(false);
    if (setActiveTab && tabValue) {
      setActiveTab(tabValue);
    }
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      {/* Upper bar: Lang Switcher, University Selector */}
      <div className="bg-slate-50 border-b border-slate-150 py-1.5 px-4 md:px-8 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">{t.selectUniv}:</span>
          <div className="flex items-center bg-slate-200/60 p-0.5 rounded-lg border border-slate-300">
            <button
              onClick={() => setUnivId("cbnu")}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                activeUniv.id === "cbnu"
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              임시 충북대 (CBNU)
            </button>
            <button
              onClick={() => setUnivId("cju")}
              className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                activeUniv.id === "cju"
                  ? "bg-white text-emerald-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              임시 청주대 (CJU)
            </button>
          </div>
        </div>

        {/* Brand Year, Flag Info, and Bilingual Toggle */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center text-[10px] bg-slate-200/50 text-slate-600 px-2 py-0.5 rounded font-mono uppercase">
            Est. {activeUniv.foundingYear}
          </span>
          <button
            onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
            className="flex items-center gap-1 hover:text-slate-800 transition-colors bg-white px-2.5 py-1 rounded-md border border-slate-200 hover:shadow-xs active:bg-slate-50 cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-semibold">{language === "ko" ? "English" : "한국어"}</span>
          </button>
        </div>
      </div>

      {/* Main Bar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logos Container */}
        <div 
          onClick={() => handleLinkClick("root", "home")} 
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <img
            src={activeUniv.logoUrl}
            alt={activeUniv.nameKo}
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            {activeUniv.logoTextUrl && !isMobileFrame ? (
              <img
                src={activeUniv.logoTextUrl}
                alt={activeUniv.nameEn}
                className="h-6 object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <>
                <span className="text-base font-bold text-slate-800 leading-none group-hover:text-amber-600 transition-colors">
                  {language === "ko" ? activeUniv.nameKo : activeUniv.nameEn}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
                  {language === "ko" ? activeUniv.nameEn : "Unified Campus Portal"}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Desktop Menu links (Only if not emulated mobile view) */}
        {!isMobileFrame && (
          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-700">
            <button
              onClick={() => handleLinkClick("root", "home")}
              className={`hover:text-[var(--primary)] py-1 transition-colors relative cursor-pointer font-semibold ${
                activeTab === "home" ? "text-slate-900 border-b-2 text-bold" : ""
              }`}
              style={{ borderBottomColor: activeUniv.accentColor }}
            >
              {language === "ko" ? "홈" : "Home"}
            </button>

            <div className="relative">
              <button
                onClick={() => setMegamenuOpen(!megamenuOpen)}
                className="flex items-center gap-1 hover:text-[var(--primary)] py-1 transition-colors cursor-pointer font-semibold"
              >
                {t.navAdmissions}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${megamenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            <button
              onClick={() => handleLinkClick("departments", "departments")}
              className={`hover:text-slate-900 py-1 transition-colors cursor-pointer font-semibold ${
                activeTab === "departments" ? "text-slate-900 border-b-2" : ""
              }`}
              style={{ borderBottomColor: activeUniv.accentColor }}
            >
              {t.navDepts}
            </button>

            <button
              onClick={() => handleLinkClick("counseling", "counseling")}
              className={`hover:text-slate-900 py-1 transition-colors cursor-pointer font-semibold ${
                activeTab === "counseling" ? "text-slate-900 border-b-2" : ""
              }`}
              style={{ borderBottomColor: activeUniv.accentColor }}
            >
              {t.navCounsel}
            </button>
          </nav>
        )}

        {/* Right side utilities: Search triggers, App View indicator, drawer */}
        <div className="flex items-center gap-3">
          <button
            id="globalSearchTrigger"
            onClick={onOpenSearch}
            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-full border border-slate-200 transition-all active:scale-95 cursor-pointer tool-target"
            title="Search Site"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Hamburger (Mobile menu toggle) */}
          <button
            onClick={() => {
              if (isMobileFrame && setActiveTab) {
                // If we're inside mobile view, we want to allow scrolling down to options or opening hamburger
                setMobileMenuOpen(!mobileMenuOpen);
              } else {
                setMobileMenuOpen(!mobileMenuOpen);
              }
            }}
            className="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg active:scale-95 border border-slate-200 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* High-Fidelity Desktop Mega Menu (Image 7/9 inspired) */}
      {megamenuOpen && !isMobileFrame && (
        <div className="absolute top-18 left-0 right-0 bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-5 duration-200 z-50">
          <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Undergraduate */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                <Building className="h-4.5 w-4.5 text-blue-600" />
                <span className="text-sm uppercase tracking-wider">{t.majorColUnder}</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li>
                  <button
                    onClick={() => handleLinkClick("admissions", "home")}
                    className="hover:text-blue-600 font-medium transition-colors flex items-center justify-between w-full group text-left"
                  >
                    <span>{t.earlyDesc}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Active
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("admissions", "home")}
                    className="hover:text-blue-600 font-medium transition-colors flex items-center justify-between w-full group text-left"
                  >
                    <span>{t.regularDesc}</span>
                    <span className="text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Soon
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("admissions", "home")}
                    className="hover:text-blue-600 font-medium transition-colors text-left"
                  >
                    {t.transferDesc}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Graduate */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                <GraduationCap className="h-4.5 w-4.5 text-emerald-600" />
                <span className="text-sm uppercase tracking-wider">{t.majorColGrad}</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
                <li>
                  <button
                    onClick={() => handleLinkClick("admissions", "home")}
                    className="hover:text-emerald-600 transition-colors text-left"
                  >
                    {t.phdgrad}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("admissions", "home")}
                    className="hover:text-emerald-600 transition-colors text-left"
                  >
                    {t.specialgrad}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: International */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold border-b border-slate-100 pb-2">
                <Award className="h-4.5 w-4.5 text-amber-500" />
                <span className="text-sm uppercase tracking-wider">{t.majorColInter}</span>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
                <li>
                  <button
                    onClick={() => handleLinkClick("admissions", "home")}
                    className="hover:text-amber-500 transition-colors text-left"
                  >
                    {t.langSchool}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick("admissions", "home")}
                    className="hover:text-amber-500 transition-colors text-left"
                  >
                    {t.exchangeStudent}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Upcoming Info briefing event card with count down timer */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                  <Calendar className="h-3 w-3" /> Scheduled Event
                </span>
                <h4 className="text-sm font-bold text-slate-800 leading-snug">
                  {t.scheduleEvent}
                </h4>
                <div className="mt-2.5 space-y-1.5 text-xs text-slate-500 font-medium">
                  <p className="flex items-start">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 mr-1.5 shrink-0 mt-0.5" />
                    <span>{t.eventDate}</span>
                  </p>
                  <p className="flex items-start">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 mr-1.5 shrink-0 mt-0.5" />
                    <span>{t.eventLocation}</span>
                  </p>
                </div>
              </div>

              {/* Countdown panel */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[10px] font-semibold text-slate-400 block mb-1.5">
                  {t.countDownTitle}
                </span>
                <div className="flex gap-2 text-center">
                  <div className="bg-white px-2 py-1 rounded border border-slate-100 shrink-0">
                    <span className="font-mono text-sm font-bold text-slate-800 block">
                      {timeLeft.days.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-slate-400">{t.days}</span>
                  </div>
                  <div className="bg-white px-2 py-1 rounded border border-slate-100 shrink-0">
                    <span className="font-mono text-sm font-bold text-slate-800 block">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-slate-400">{t.hours}</span>
                  </div>
                  <div className="bg-white px-2 py-1 rounded border border-slate-100 shrink-0">
                    <span className="font-mono text-sm font-bold text-slate-800 block">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-slate-400">{t.minutes}</span>
                  </div>
                  <div className="bg-white px-2 py-1 rounded border border-slate-100 shrink-0">
                    <span className="font-mono text-sm font-bold text-slate-800 block text-orange-600">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-slate-400">{t.seconds}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Slide-out Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 py-6 space-y-4 flex flex-col font-medium">
            <button
              onClick={() => handleLinkClick("root", "home")}
              className={`text-left py-2 border-b border-slate-100 text-slate-800 font-semibold ${
                activeTab === "home" ? "text-amber-600" : ""
              }`}
            >
              {language === "ko" ? "홈" : "Home"}
            </button>

            {/* Direct access to admissions category */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold tracking-wider text-slate-400 block uppercase pt-1">
                {t.navAdmissions}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleLinkClick("admissions", "home")}
                  className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 hover:bg-slate-100 text-slate-700 text-left font-medium"
                >
                  {t.undergradTitle}
                </button>
                <button
                  onClick={() => handleLinkClick("admissions", "home")}
                  className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 hover:bg-slate-100 text-slate-700 text-left font-medium"
                >
                  {t.gradTitle}
                </button>
                <button
                  onClick={() => handleLinkClick("admissions", "home")}
                  className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 hover:bg-slate-100 text-slate-700 text-left font-medium col-span-2"
                >
                  {t.interTitle}
                </button>
              </div>
            </div>

            <button
              onClick={() => handleLinkClick("departments", "departments")}
              className={`text-left py-2 border-b border-slate-100 text-slate-800 font-semibold ${
                activeTab === "departments" ? "text-amber-600" : ""
              }`}
            >
              {t.navDepts}
            </button>

            <button
              onClick={() => handleLinkClick("counseling", "counseling")}
              className={`text-left py-2 border-b border-slate-100 text-slate-800 font-semibold ${
                activeTab === "counseling" ? "text-amber-600" : ""
              }`}
            >
              {t.navCounsel}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
