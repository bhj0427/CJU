import React from "react";
import { Mail, Phone, MapPin, ExternalLink, Globe } from "lucide-react";
import { Language, UniversityInfo } from "../types";
import { TRANSLATIONS } from "../data";

interface FooterProps {
  language: Language;
  activeUniv: UniversityInfo;
}

export default function Footer({ language, activeUniv }: FooterProps) {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Info and dynamic logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src={activeUniv.logoUrl}
                alt={activeUniv.nameKo}
                className="h-10 w-10 filter brightness-100 contrast-125 rounded-md object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-white font-extrabold text-base tracking-tight">
                {language === "ko" ? activeUniv.nameKo : activeUniv.nameEn}
              </span>
            </div>
            <p className="text-xs font-semibold leading-relaxed max-w-sm text-slate-400">
              {language === "ko" 
                ? "창의정신과 세계적 수준의 교육을 통해 내일의 미래를 디자인합니다. 글로벌 인재 양성의 최전선에서 꿈을 실현해 보세요."
                : "Designing the future of academic learning through creative innovation and global collaboration. Unlocking dreams on our research campus."}
            </p>
          </div>

          {/* Column 2: Specific address and support hotlines */}
          <div className="md:col-span-4 space-y-3.5">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">
              Contact / Location
            </span>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-350">
                  {language === "ko" ? activeUniv.addressKo : activeUniv.addressEn}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                <span className="text-slate-350">{activeUniv.tel}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                <span className="text-slate-350">{activeUniv.email}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div className="md:col-span-3 space-y-3.5 text-xs font-semibold">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">
              Direct Portals
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.cbnu.ac.kr"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-slate-950/40 hover:bg-slate-950 hover:text-white rounded-lg transition-colors border border-slate-800"
              >
                <span>Chungbuk Univ (충북대)</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
              <a
                href="https://www.cju.ac.kr"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-slate-950/40 hover:bg-slate-950 hover:text-white rounded-lg transition-colors border border-slate-800"
              >
                <span>Cheongju Univ (청주대)</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Divider */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-semibold tracking-wide uppercase">
          <p>
            {t.footerCopyright} {new Date().getFullYear()} {language === "ko" ? activeUniv.nameKo : activeUniv.nameEn}
          </p>
          <div className="flex gap-4">
            <span>Privacy Standards / 개인정보보호정책</span>
            <span>Terms of Use / 이용약관</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
