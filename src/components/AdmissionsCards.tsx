import React, { useState } from "react";
import { GraduationCap, Landmark, Earth, CalendarDays, Clock, ArrowUpRight, CheckCircle, Info } from "lucide-react";
import { Language, UniversityInfo } from "../types";
import { TRANSLATIONS } from "../data";

interface AdmissionsCardsProps {
  language: Language;
  activeUniv: UniversityInfo;
}

export default function AdmissionsCards({ language, activeUniv }: AdmissionsCardsProps) {
  const [selectedPanel, setSelectedPanel] = useState<"undergrad" | "grad" | "inter">("undergrad");
  
  const t = TRANSLATIONS[language];

  // Specific content that adapts according to university and selection
  const panelDetails = {
    undergrad: {
      title: t.undergradTitle,
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
      tagline: language === "ko" ? "성장하는 지성의 첫걸음, 학부 과정" : "The first step of growing intellect, Undergraduate Admissions.",
      datesKo: [
        { title: "수시 원서 접수", period: "2025년 9월 10일 ~ 9월 14일", status: "D-92" },
        { title: "정시 원서 접수", period: "2025년 12월 29일 ~ 12월 31일", status: "D-202" },
        { title: "편입학 원서 접수", period: "2026년 1월 5일 ~ 1월 9일", status: "D-210" },
      ],
      datesEn: [
        { title: "Early Decision", period: "Sept 10, 2025 ~ Sept 14, 2025", status: "D-92" },
        { title: "Regular Admissions", period: "Dec 29, 2025 ~ Dec 31, 2025", status: "D-202" },
        { title: "Transfer Options", period: "Jan 5, 2026 ~ Jan 9, 2026", status: "D-210" },
      ],
      requirementsKo: [
        "고등학교 졸업(예정)자 또는 법령에 의하여 이와 동등 이상의 학력이 있다고 인정된 자",
        "생활기록부 반영 과목: 국어, 영어, 수학, 사회/과학 교과 전과목 등",
        "서류 제출 기한 내에 학생기록부나 검정고시 성적증명서 스캔본 필수 제출",
      ],
      requirementsEn: [
        "High school graduate or equivalent legally recognized credentials.",
        "Reflected transcript categories: Korean,-English, Math, Social/Natural Science fields.",
        "Academic credentials and transcripts must be uploaded before application close.",
      ],
    },
    grad: {
      title: t.gradTitle,
      icon: <Landmark className="h-6 w-6 text-emerald-600" />,
      tagline: language === "ko" ? "글로벌 연구 혁신의 중심, 전문 대학원" : "Center of global study innovation, Graduate School",
      datesKo: [
        { title: "전기 1차 모집", period: "2025년 10월 12일 ~ 10월 22일", status: "D-124" },
        { title: "전기 2차 모집", period: "2025년 11월 18일 ~ 11월 28일", status: "D-161" },
        { title: "후기 모집 요강", period: "2026년 5월 예정", status: "Scheduled" },
      ],
      datesEn: [
        { title: "1st Term Application", period: "Oct 12, 2025 ~ Oct 22, 2025", status: "D-124" },
        { title: "2nd Term Selection", period: "Nov 18, 2025 ~ Nov 28, 2025", status: "D-161" },
        { title: "Subsequent Openings", period: "Expected May 2026", status: "Scheduled" },
      ],
      requirementsKo: [
        "국내외 4년제 대학 졸업자 및 2025년 2월 학사학위 취득 예정자",
        "지원 자격 요건: 출신 전공 및 대학 평점 평균(GPA) 성적 기준 충족",
        "연구 계획서(Statement of Purpose) 및 교수 추천서 1부 이상 제출 필수",
      ],
      requirementsEn: [
        "Acquired BS/BA or scheduled to acquire accredited degree before enrolment.",
        "Academic criteria: Standard Minimum GPA guidelines based on previous study.",
        "A Statement of Purpose (SOP) and at least 1 faculty referral letter are mandatory.",
      ],
    },
    inter: {
      title: t.interTitle,
      icon: <Earth className="h-6 w-6 text-amber-500" />,
      tagline: language === "ko" ? "전세계 80여 개국 인재와 함께하는 글로벌 대학" : "A global university with academics from over 80 nations.",
      datesKo: [
        { title: "봄학기 1차 접수", period: "2025년 9월 1일 ~ 9월 18일", status: "D-83" },
        { title: "봄학기 2차 접수", period: "2025년 11월 5일 ~ 11월 20일", status: "D-148" },
        { title: "가을학기 예비 접수", period: "2026년 3월 예정", status: "Scheduled" },
      ],
      datesEn: [
        { title: "Spring Intake Row 1", period: "Sept 1, 2025 ~ Sept 18, 2025", status: "D-83" },
        { title: "Spring Intake Row 2", period: "Nov 5, 2025 ~ Nov 20, 2025", status: "D-148" },
        { title: "Autumn Intake Slots", period: "Expected March 2026", status: "Scheduled" },
      ],
      requirementsKo: [
        "부모와 본인 모두가 외국 국적을 소지한 외국인 학생에 한해 응모 가능",
        "어학 성적: 한국어 TOPIK 3급 이상 혹은 영어 공인 성적 (TOEFL 530, IELTS 5.5) 이상 소지자",
        "아포스티유 공증을 받은 졸업증명서 및 성적표 필수 첨부",
      ],
      requirementsEn: [
        "Applicants and parents must possess non-Korean citizenship status.",
        "Language criteria: TOPIK Level 3 or higher, or accredited English scores (TOEFL 530, IELTS 5.5).",
        "Apostilled copies of high school/college diplomas and transcripts are mandatory.",
      ],
    },
  };

  const activePanel = panelDetails[selectedPanel];

  return (
    <section id="admissions" className="py-16 bg-white border-b border-slate-100Scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title area */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.admissionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium">
            {t.admissionsSub}
          </p>
        </div>

        {/* 3 Grid Admissions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Undergraduate Card */}
          <div
            onClick={() => setSelectedPanel("undergrad")}
            className={`cursor-pointer rounded-2xl p-6 border transition-all text-left flex flex-col justify-between h-48 select-none ${
              selectedPanel === "undergrad"
                ? "bg-slate-50 shadow-md border-transparent ring-2"
                : "bg-white hover:bg-slate-50/50 border-slate-200"
            }`}
            style={{ ringColor: activeUniv.accentColor }}
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{t.undergradTitle}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">{t.undergradDesc}</p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-blue-600 mt-4">
              <span>{language === "ko" ? "전형 정보 확인" : "Check Schedule"}</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* Graduate Card */}
          <div
            onClick={() => setSelectedPanel("grad")}
            className={`cursor-pointer rounded-2xl p-6 border transition-all text-left flex flex-col justify-between h-48 select-none ${
              selectedPanel === "grad"
                ? "bg-slate-50 shadow-md border-transparent ring-2"
                : "bg-white hover:bg-slate-50/50 border-slate-200"
            }`}
            style={{ ringColor: activeUniv.accentColor }}
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                <Landmark className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{t.gradTitle}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">{t.gradDesc}</p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-600 mt-4">
              <span>{language === "ko" ? "연구 요강 확인" : "Check Syllabus"}</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* International Card */}
          <div
            onClick={() => setSelectedPanel("inter")}
            className={`cursor-pointer rounded-2xl p-6 border transition-all text-left flex flex-col justify-between h-48 select-none ${
              selectedPanel === "inter"
                ? "bg-slate-50 shadow-md border-transparent ring-2"
                : "bg-white hover:bg-slate-50/50 border-slate-200"
            }`}
            style={{ ringColor: activeUniv.accentColor }}
          >
            <div>
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <Earth className="h-5 w-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{t.interTitle}</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">{t.interDesc}</p>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-amber-600 mt-4">
              <span>{language === "ko" ? "글로벌 접수 안내" : "Apply Details"}</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Detailed Criteria Panel Card below */}
        <div className="mt-8 bg-slate-50/60 rounded-2xl border border-slate-150 p-6 md:p-8 animate-in fade-in duration-200 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm shrink-0">
                {activePanel.icon}
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-800">{activePanel.title}</h4>
                <p className="text-xs font-medium text-slate-500 mt-0.5">{activePanel.tagline}</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-[11px] text-slate-500 font-bold px-3 py-1 rounded-lg">
              <Info className="h-3.5 w-3.5 text-blue-500" />
              <span>Target: Year 2025/2026 Admissions</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {/* Left side: Timeline list */}
            <div>
              <h5 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3.5 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-400" />
                {language === "ko" ? "원서 접수 및 주요 전형 일정" : "Admission Calendar & Milestones"}
              </h5>
              <div className="space-y-3">
                {(language === "ko" ? activePanel.datesKo : activePanel.datesEn).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-150 shadow-xs"
                  >
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold text-slate-700 block truncate">
                        {item.title}
                      </span>
                      <span className="text-xs font-medium text-slate-400 mt-0.5 block flex items-center gap-1">
                        <CalendarDays className="h-3 w-3 shrink-0" />
                        {item.period}
                      </span>
                    </div>
                    <span 
                      style={{ 
                        backgroundColor: activeUniv.id === "cju" ? "#ecfdf5" : "#eff6ff",
                        color: activeUniv.id === "cju" ? "#065f46" : "#1e40af"
                      }}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-md shrink-0 uppercase tracking-wider"
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Eligibility requirements */}
            <div>
              <h5 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3.5 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-slate-400" />
                {language === "ko" ? "핵심 지원 자격 및 구비서류" : "Core Requirements & Documents"}
              </h5>
              <ul className="space-y-3">
                {(language === "ko" ? activePanel.requirementsKo : activePanel.requirementsEn).map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-600 text-xs font-medium leading-relaxed"
                  >
                    <span 
                      style={{ backgroundColor: activeUniv.id === "cju" ? "#059669" : "#2563eb" }}
                      className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white shrink-0 mt-0.5"
                    >
                      {idx + 1}
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
