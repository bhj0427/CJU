import React, { useState } from "react";
import { Search, X, History, TrendingUp, ArrowRight } from "lucide-react";
import { Language, SearchItem } from "../types";
import { SEARCH_DATABASE, TRANSLATIONS } from "../data";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export default function SearchDialog({ isOpen, onClose, language }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("univ_recent_searches");
    return saved ? JSON.parse(saved) : language === "ko" 
      ? ["기숙사", "장학금", "컴퓨터공학과", "수시 모집 요강"]
      : ["Dormitory", "Scholarships", "Computer Science", "Regular Decision"];
  });

  const t = TRANSLATIONS[language];

  const popularTags = language === "ko"
    ? ["입학 설명회", "학부 전형", "기숙사", "장학 혜택", "컴퓨터공학과", "외국인"]
    : ["Briefing Event", "Undergraduate", "Dormitory", "Scholarship", "Computer Science", "International"];

  const filteredResults: SearchItem[] = query.trim() === ""
    ? []
    : SEARCH_DATABASE.filter((item) => {
        const txt = language === "ko"
          ? (item.titleKo + item.categoryKo)
          : (item.titleEn + item.categoryEn);
        return txt.toLowerCase().includes(query.toLowerCase());
      });

  const saveRecent = (newSearches: string[]) => {
    setRecentSearches(newSearches);
    localStorage.setItem("univ_recent_searches", JSON.stringify(newSearches));
  };

  const handleSearchSubmit = (searchVal: string) => {
    if (!searchVal.trim()) return;
    const trimmed = searchVal.trim();
    const updated = [trimmed, ...recentSearches.filter((s) => s !== trimmed)].slice(0, 6);
    saveRecent(updated);
    setQuery(trimmed);
  };

  const handleDeleteRecent = (e: React.MouseEvent, target: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s !== target);
    saveRecent(updated);
  };

  const handleClearAllRecents = () => {
    saveRecent([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 md:px-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Dialog container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Area */}
        <div className="flex items-center p-4 border-b border-slate-100">
          <Search className="h-5 w-5 text-slate-400 mr-3" />
          <input
            id="searchInputField"
            type="text"
            className="w-full text-lg text-slate-800 bg-transparent placeholder-slate-400 focus:outline-none"
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit(query);
            }}
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button 
            id="closeSearchBtn"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <span className="text-xs font-mono font-bold">ESC</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                  <TrendingUp className="h-4 w-4 text-orange-500 mr-1.5" />
                  {t.popularSearchBtn}
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchSubmit(tag)}
                      className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-full text-sm font-medium transition-colors border border-slate-100"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                    <div className="flex items-center">
                      <History className="h-4 w-4 text-blue-500 mr-1.5" />
                      {t.recentSearchTitle}
                    </div>
                    <button 
                      onClick={handleClearAllRecents}
                      className="text-xs font-normal text-slate-400 hover:text-red-500 transition-colors"
                    >
                      {language === "ko" ? "모두 지우기" : "Clear All"}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recentSearches.map((search, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSearchSubmit(search)}
                        className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-slate-150 rounded-xl cursor-pointer transition-colors group border border-slate-50"
                      >
                        <span className="text-slate-600 group-hover:text-slate-900 text-sm font-medium truncate mr-3">
                          {search}
                        </span>
                        <button
                          onClick={(e) => handleDeleteRecent(e, search)}
                          className="p-1 rounded-md text-slate-300 hover:text-slate-500 hover:bg-slate-200 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Filtered searches results listing */}
              {filteredResults.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                    {language === "ko" ? `검색 결과 (${filteredResults.length}건)` : `Search Results (${filteredResults.length})`}
                  </div>
                  {filteredResults.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      onClick={onClose}
                      className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all group"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {language === "ko" ? item.titleKo : item.titleEn}
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                          {language === "ko" ? item.categoryKo : item.categoryEn}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-slate-400 group-hover:text-slate-600 font-medium font-mono">
                        GO
                        <ArrowRight className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Search className="h-10 w-10 text-slate-200 mb-3" />
                  <p className="text-slate-500 font-medium">{t.notFoundedSearch}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {language === "ko" ? "다른 검색키워드로 다시 검색해 보세요." : "Try checking spelling or using broader search terms."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action instruction footer in modal */}
        <div className="bg-slate-50/50 px-6 py-4 flex items-center justify-between border-t border-slate-100 text-[11px] text-slate-400">
          <div>
            <span>{language === "ko" ? "엔터(Enter) 키로 검색 등록" : "Press Enter to save search"}</span>
          </div>
          <div>
            <span>{language === "ko" ? "지구본 또는 닫기 키로 퇴장" : "Click background or ESC to exit"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
