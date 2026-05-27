import React, { useState } from "react";
import { BookOpen, Monitor, Award, HeartHandshake, CheckCircle2, FlaskConical, CircleAlert } from "lucide-react";
import { Language, UniversityInfo, Department } from "../types";
import { DEPARTMENTS, TRANSLATIONS, HOTLINKS } from "../data";

interface CampusTourProps {
  language: Language;
  activeUniv: UniversityInfo;
}

export default function CampusTour({ language, activeUniv }: CampusTourProps) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [expandedDept, setExpandedDept] = useState<string | null>("dept-1");

  const t = TRANSLATIONS[language];

  const categories = [
    { id: "all", label: t.allCategory },
    { id: "engineering", label: t.engineering },
    { id: "humanities", label: t.humanities },
    { id: "natural", label: t.natural },
    { id: "arts", label: t.arts },
    { id: "medical", label: t.medical },
  ];

  const filteredDepts = selectedCat === "all"
    ? DEPARTMENTS
    : DEPARTMENTS.filter((d) => d.category === selectedCat);

  const getCatIcon = (cat: string) => {
    switch (cat) {
      case "engineering":
        return <Monitor className="h-4 w-4 text-blue-500" />;
      case "humanities":
        return <BookOpen className="h-4 w-4 text-emerald-500" />;
      case "natural":
        return <FlaskConical className="h-4 w-4 text-indigo-500" />;
      case "arts":
        return <Award className="h-4 w-4 text-yellow-500" />;
      case "medical":
        return <HeartHandshake className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <section id="departments" className="py-16 bg-white border-b border-slate-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
              Interactive Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.deptFilterTitle}
            </h2>
          </div>
          
          {/* Quick Stats Summary */}
          <div className="flex gap-4 items-center bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {categories.length - 1} Specializations
            </span>
            <span className="text-slate-300">|</span>
            <span>{DEPARTMENTS.length} Featured Majors</span>
          </div>
        </div>

        {/* Dual Layout: Category Tabs & List cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Top Side: Tabs selection triggers (3 Columns grid on lg) */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              {language === "ko" ? "분야 필터 선택" : "Select Major Track"}
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCat(cat.id);
                    // Reset or choose first department of active list
                    const activeList = cat.id === "all" ? DEPARTMENTS : DEPARTMENTS.filter(d => d.category === cat.id);
                    if (activeList.length > 0) {
                      setExpandedDept(activeList[0].id);
                    }
                  }}
                  className={`px-4 py-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 text-left cursor-pointer ${
                    selectedCat === cat.id
                      ? "bg-slate-900 text-white border-transparent shadow"
                      : "bg-white hover:bg-slate-50 text-slate-700 border-slate-150"
                  }`}
                >
                  <span className="shrink-0">{getCatIcon(cat.id)}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Simulated Campus Image Overlay with Hotlink */}
            <div className="hidden lg:block relative rounded-2xl overflow-hidden shadow border border-slate-150 mt-6 group bg-slate-900 aspect-3/2">
              <img
                src={HOTLINKS.campusMain}
                alt="Main Campus"
                className="w-full h-full object-cover brightness-65 transition-transform duration-500 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/40 to-transparent">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Virtual Campus View</span>
                <p className="text-[11px] font-semibold text-white mt-1">
                  {activeUniv.id === "cbnu" ? "Main Admin Hall Square" : "CJU Central Library Campus"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Area: Interactive Department lists */}
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              {language === "ko" ? `개설 전공 목록 (${filteredDepts.length})` : `Available Classes/Majors (${filteredDepts.length})`}
            </span>
            
            {filteredDepts.length > 0 ? (
              <div className="space-y-2.5">
                {filteredDepts.map((dept) => {
                  const isExpanded = expandedDept === dept.id;
                  return (
                    <div
                      key={dept.id}
                      className={`border rounded-2xl overflow-hidden transition-all duration-200 select-none ${
                        isExpanded
                          ? "bg-slate-50 border-slate-350 shadow-sm"
                          : "bg-white hover:bg-slate-50/55 border-slate-150 cursor-pointer"
                      }`}
                      onClick={() => !isExpanded && setExpandedDept(dept.id)}
                    >
                      {/* Top collapsed header bar */}
                      <div className="p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors shrink-0">
                            {getCatIcon(dept.category)}
                          </span>
                          <div className="text-left">
                            <span className="text-sm font-extrabold text-slate-800 leading-none">
                              {language === "ko" ? dept.nameKo : dept.nameEn}
                            </span>
                            <span className="hidden sm:inline-block text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-2 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                              {dept.category}
                            </span>
                          </div>
                        </div>
                        <span 
                          style={{ color: activeUniv.accentColor }}
                          className="text-xs font-bold shrink-0 text-amber-600"
                        >
                          {isExpanded ? (language === "ko" ? "숨기기" : "Collapse") : (language === "ko" ? "상세 보기" : "Learn More")}
                        </span>
                      </div>

                      {/* Expanded detail box */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 border-t border-slate-200/60 bg-white animate-in slide-in-from-top-1 duration-150 text-left">
                          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                            {language === "ko" ? dept.descKo : dept.descEn}
                          </p>

                          {/* Features grid */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold tracking-wider text-slate-450 uppercase block">
                              {language === "ko" ? "학과 강점 및 특성화" : "Core Specializations & Strengths"}
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {(language === "ko" ? dept.featuresKo : dept.featuresEn).map((feat, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2 text-xs"
                                >
                                  <span 
                                    style={{ color: activeUniv.accentColor }} 
                                    className="text-amber-500 font-bold font-mono mt-0.5 shrink-0"
                                  >
                                    ✓
                                  </span>
                                  <span className="text-slate-700 font-semibold leading-snug">
                                    {feat}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Quick Inquiry CTA */}
                          <div className="mt-4 flex items-center justify-between bg-amber-50/50 p-2.5 rounded-xl border border-amber-100 text-xs text-amber-900">
                            <span className="flex items-center gap-1 font-semibold">
                              <CircleAlert className="h-4 w-4 text-amber-500 shrink-0" />
                              {language === "ko"
                                ? "해당 학과에 관한 궁금증이 있으신가요?"
                                : "Have specific inquiries about this curriculum?"}
                            </span>
                            <a
                              href="#counseling"
                              className="px-3 py-1 bg-white hover:bg-slate-100 font-bold border border-amber-200 text-amber-950 rounded-lg shadow-2xs cursor-pointer inline-block"
                            >
                              {language === "ko" ? "상담 문의하기" : "Inquire Now"}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-50 text-center py-10 rounded-2xl border border-dashed border-slate-200">
                <BookOpen className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">No courses available for this category filter.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
