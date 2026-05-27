import React from "react";
import { ArrowRight, Sparkles, Navigation, Globe, Users, Trophy, GraduationCap, MapPin } from "lucide-react";
import { Language, UniversityInfo } from "../types";
import { TRANSLATIONS } from "../data";

interface HeroProps {
  language: Language;
  activeUniv: UniversityInfo;
}

export default function Hero({ language, activeUniv }: HeroProps) {
  const t = TRANSLATIONS[language];

  const handleScrollToId = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeUniv.heroUrl}
          alt={activeUniv.nameKo}
          className="w-full h-full object-cover object-center filter brightness-45 contrast-105 transition-all duration-700 ease-in-out scale-102"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col justify-center min-h-[500px]">
        {/* Sparkle Tag */}
        <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/25 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 w-fit self-start animate-fade-in transition-all">
          <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
          <span>{activeUniv.id === "cbnu" ? "National Flagship University" : "Academic Excellence"}</span>
        </div>

        {/* Welcome Headline */}
        <h1 
          style={{ letterSpacing: "-0.04em" }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl tracking-tight transition-all"
        >
          {language === "ko" ? (
            <>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 block">
                {activeUniv.nameKo}
              </span>
              에 오신 것을 환영합니다
            </>
          ) : (
            <>
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-100 block">
                {activeUniv.nameEn}
              </span>
            </>
          )}
        </h1>

        <p className="mt-5 text-sm sm:text-lg text-slate-350 max-w-2xl font-medium leading-relaxed">
          {t.welcomeSub}
        </p>

        {/* Buttons Action Group */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleScrollToId("admissions")}
            className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-900 font-bold hover:bg-slate-100 rounded-xl shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            {t.exploreBtn}
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
          </button>
          
          <button
            onClick={() => handleScrollToId("departments")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/40 hover:bg-slate-900/60 text-white font-bold rounded-xl border border-white/20 transition-all backdrop-blur-xs active:scale-98 cursor-pointer"
          >
            <Navigation className="h-4 w-4 text-slate-300" />
            {t.tourBtn}
          </button>
        </div>
      </div>

      {/* University Stats Dashboard Row Overlay */}
      <div className="relative z-10 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Stat 1 */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold tracking-wider uppercase">
                <Users className="h-4 w-4 text-blue-500" />
                <span>Students</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-wide">
                {activeUniv.stats.students}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold tracking-wider uppercase">
                <GraduationCap className="h-4 w-4 text-emerald-500" />
                <span>Faculty Members</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-wide">
                {activeUniv.stats.professors}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold tracking-wider uppercase">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>Employment</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-wide">
                {activeUniv.stats.employmentRate}
              </p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold tracking-wider uppercase">
                <MapPin className="h-4 w-4 text-sky-500" />
                <span>Founding Date</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-white font-mono tracking-wide">
                {activeUniv.foundingYear}
              </p>
            </div>
          </div>

          {/* Global/University Ranking Banner */}
          {activeUniv.stats.globalRank && (
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-center gap-1.5 bg-slate-800/40 border border-slate-800 text-slate-350 text-xs px-4 py-1.5 rounded-lg font-medium">
                <Trophy className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>{activeUniv.stats.globalRank}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
