import React, { useState, useEffect } from "react";
import { MessageSquare, User, AlertCircle, Check, Send, Trash2, ShieldCheck, CheckSquare, Square } from "lucide-react";
import { Language, UniversityInfo, CounselingInquiry } from "../types";
import { TRANSLATIONS } from "../data";

interface CounselingFormProps {
  language: Language;
  activeUniv: UniversityInfo;
}

export default function CounselingForm({ language, activeUniv }: CounselingFormProps) {
  const t = TRANSLATIONS[language];

  // Forms states
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    category: "undergrad" as "undergrad" | "grad" | "inter",
    content: "",
    agreePrivacy: false,
  });

  // Highlight/Errors states
  const [errors, setErrors] = useState({
    name: false,
    contact: false,
    content: false,
    agreePrivacy: false,
  });

  const [touched, setTouched] = useState({
    name: false,
    contact: false,
    content: false,
    agreePrivacy: false,
  });

  const [inquiries, setInquiries] = useState<CounselingInquiry[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Load inquiries history
  useEffect(() => {
    const saved = localStorage.getItem(`consultation_logs_${activeUniv.id}`);
    if (saved) {
      setInquiries(JSON.parse(saved));
    } else {
      setInquiries([]);
    }
  }, [activeUniv.id]);

  // Form input validation logic
  const validateField = (field: string, val: any) => {
    switch (field) {
      case "name":
        return !val.trim() || val.trim().length < 2;
      case "contact":
        // simple Korean phone check: 010-XXXX-XXXX or similar, or just minimum digits
        const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;
        return !val.trim() || !phoneRegex.test(val.trim());
      case "content":
        return !val.trim() || val.trim().length < 10 || val.trim().length > 500;
      case "agreePrivacy":
        return !val;
      default:
        return false;
    }
  };

  // Perform instant validation after touching fields
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (touched[field as keyof typeof touched]) {
        setErrors((err) => ({
          ...err,
          [field]: validateField(field, value),
        }));
      }
      return updated;
    });
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((err) => ({
      ...err,
      [field]: validateField(field, formData[field as keyof typeof formData]),
    }));
  };

  // Submit action
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTouched = { name: true, contact: true, content: true, agreePrivacy: true };
    setTouched(newTouched);

    const newErrors = {
      name: validateField("name", formData.name),
      contact: validateField("contact", formData.contact),
      content: validateField("content", formData.content),
      agreePrivacy: validateField("agreePrivacy", formData.agreePrivacy),
    };
    setErrors(newErrors);

    const hasAnyError = Object.values(newErrors).some((err) => err);
    if (hasAnyError) return;

    // Save submission
    const newInquiry: CounselingInquiry = {
      id: "counsel-" + Date.now(),
      name: formData.name.trim(),
      contact: formData.contact.trim(),
      category: formData.category,
      content: formData.content.trim(),
      agreePrivacy: formData.agreePrivacy,
      date: new Date().toLocaleDateString(language === "ko" ? "ko-KR" : "en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "received",
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem(`consultation_logs_${activeUniv.id}`, JSON.stringify(updated));

    // Reset Form
    setFormData({
      name: "",
      contact: "",
      category: "undergrad",
      content: "",
      agreePrivacy: false,
    });
    setTouched({ name: false, contact: false, content: false, agreePrivacy: false });
    setErrors({ name: false, contact: false, content: false, agreePrivacy: false });

    // Show toaster
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const handleDeleteLog = (id: string) => {
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    localStorage.setItem(`consultation_logs_${activeUniv.id}`, JSON.stringify(updated));
  };

  return (
    <section id="counseling" className="py-16 bg-slate-50 border-b border-slate-200 text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Support Helpdesk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.counselFormTitle}
          </h2>
          <p className="mt-3 text-sm text-slate-500 font-medium">
            {t.counselFormSub}
          </p>
        </div>

        {/* Form Container Grid (Inspired by Image 8) */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-150 overflow-hidden">
          
          {/* Header Highlight Banner */}
          <div 
            style={{ backgroundColor: activeUniv.brandColor }}
            className="px-6 py-4 flex items-center justify-between text-white"
          >
            <div className="flex items-center gap-2.5">
              <User className="h-5 w-5 text-amber-300" />
              <span className="text-sm font-extrabold tracking-wide">
                {activeUniv.nameKo} / {activeUniv.nameEn}
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider opacity-75">
              Ref: Counselor-A1
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            
            {/* Top Row: Name and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field: Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {t.labelName} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="counselorNameField"
                    type="text"
                    onBlur={() => handleBlur("name")}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={language === "ko" ? "홍길동" : "e.g. John Doe"}
                    className={`w-full px-4 py-3 bg-slate-50 text-slate-800 text-sm border font-medium rounded-xl focus:outline-none transition-all ${
                      touched.name && errors.name
                        ? "border-red-500 ring-1 ring-red-250 bg-red-50/20"
                        : "border-slate-200 focus:border-blue-500 focus:bg-white"
                    }`}
                  />
                </div>
                {touched.name && errors.name && (
                  <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {t.errName}
                  </p>
                )}
              </div>

              {/* Field: Contact number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {t.labelContact} <span className="text-red-500">*</span>
                </label>
                <input
                  id="counselorContactField"
                  type="text"
                  onBlur={() => handleBlur("contact")}
                  value={formData.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                  placeholder="010-1234-5678"
                  className={`w-full px-4 py-3 bg-slate-50 text-slate-800 text-sm border font-medium rounded-xl focus:outline-none transition-all ${
                    touched.contact && errors.contact
                      ? "border-red-500 ring-1 ring-red-250 bg-red-50/20"
                      : "border-slate-200 focus:border-blue-500 focus:bg-white"
                  }`}
                />
                {touched.contact && errors.contact ? (
                  <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {t.errContact}
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400 font-medium">
                    {language === "ko" ? "하이픈(-)을 포함하여 입력해 주세요." : "Please include hyphens (-)."}
                  </p>
                )}
              </div>
            </div>

            {/* Field: Category interest */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {t.labelCategory} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {/* Categor 1: undergrad */}
                <label
                  onClick={() => handleInputChange("category", "undergrad")}
                  className={`border p-3.5 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    formData.category === "undergrad"
                      ? "bg-blue-50/30 border-blue-500 ring-1 ring-blue-500 text-blue-800 font-semibold"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50"
                  }`}
                >
                  <span className="text-xs block">{t.undergradTitle}</span>
                </label>

                {/* Categor 2: grad */}
                <label
                  onClick={() => handleInputChange("category", "grad")}
                  className={`border p-3.5 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    formData.category === "grad"
                      ? "bg-blue-50/30 border-blue-500 ring-1 ring-blue-500 text-blue-800 font-semibold"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50"
                  }`}
                >
                  <span className="text-xs block">{t.gradTitle}</span>
                </label>

                {/* Categor 3: inter */}
                <label
                  onClick={() => handleInputChange("category", "inter")}
                  className={`border p-3.5 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    formData.category === "inter"
                      ? "bg-blue-50/30 border-blue-500 ring-1 ring-blue-500 text-blue-800 font-semibold"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50"
                  }`}
                >
                  <span className="text-xs block">{t.interTitle}</span>
                </label>
              </div>
            </div>

            {/* Field: Content Inquiry with Characters Counter */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">
                  {t.labelContent} <span className="text-red-500">*</span>
                </label>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  formData.content.length > 500 ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-500"
                }`}>
                  {formData.content.length} / 500{language === "ko" ? "자" : " chars"}
                </span>
              </div>
              <textarea
                id="counselorContentArea"
                rows={5}
                onBlur={() => handleBlur("content")}
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder={
                  language === "ko"
                    ? "장학금 지원 기준과 원서 마감 기일 동의 사항에 대해 상세히 상담받길 원합니다..."
                    : "Please describe your academic questions in detail..."
                }
                className={`w-full px-4 py-3 bg-slate-50 text-slate-800 text-sm border font-medium rounded-xl focus:outline-none transition-all resize-none ${
                  touched.content && errors.content
                    ? "border-red-500 ring-1 ring-red-250 bg-red-50/20"
                    : "border-slate-200 focus:border-blue-500 focus:bg-white"
                }`}
              />
              {touched.content && errors.content && (
                <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {t.errContent}
                </p>
              )}
            </div>

            {/* Policy Consent Agreement */}
            <div className="pt-2">
              <label 
                onClick={() => handleInputChange("agreePrivacy", !formData.agreePrivacy)}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <div 
                  className={`mt-0.5 shrink-0 p-0.5 rounded border transition-all ${
                    formData.agreePrivacy 
                      ? "bg-slate-900 border-slate-900 text-white" 
                      : "border-slate-300 hover:border-slate-500"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div className="text-xs font-semibold text-slate-700 leading-normal select-none">
                  {t.agreePrivacyText}
                  <span className="text-red-500 ml-1">*</span>
                  <div className="text-[10px] font-normal text-slate-400 mt-0.5">
                    {language === "ko" 
                      ? "수정된 동의서는 접수 진행 중 기밀 처리되며, 답변 전송 완료 후 1년 이내에 완벽히 파기됩니다." 
                      : "The collected metadata is strictly secure and will be disposed of after 1 year period."}
                  </div>
                </div>
              </label>
              {touched.agreePrivacy && errors.agreePrivacy && (
                <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-2">
                  <AlertCircle className="h-3 w-3" />
                  {t.errPrivacy}
                </p>
              )}
            </div>

            {/* Submit Action Button */}
            <div className="pt-4">
              <button
                id="submitCounselorBtn"
                type="submit"
                style={{ backgroundColor: activeUniv.accentColor }}
                className="w-full text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="h-4.5 w-4.5" />
                <span>{t.submitBtn}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Successful Notification Banner inside helpdesk (Inspired by standard Toast/States) */}
        {showSuccessToast && (
          <div className="mt-4 p-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
            <ShieldCheck className="h-5 w-5 text-emerald-100 shrink-0" />
            <span className="text-xs sm:text-sm">{t.formSuccessMsg}</span>
          </div>
        )}

        {/* Counseling Inquiry History Log Cards */}
        <div className="mt-12 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-500 tracking-wider uppercase flex items-center gap-2">
            <span style={{ backgroundColor: activeUniv.accentColor }} className="h-2 w-2 rounded-full block animate-pulse" />
            {t.counselHistory} ({inquiries.length})
          </h3>

          {inquiries.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {inquiries.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-start justify-between gap-4 select-none hover:shadow-md transition-shadow"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        ({item.contact})
                      </span>
                      <span className="inline-flex bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        {item.category === "undergrad"
                          ? t.undergradTitle
                          : item.category === "grad"
                          ? t.gradTitle
                          : t.interTitle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 font-medium leading-relaxed">
                      {item.content}
                    </p>
                    <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-3">
                      <span>{item.date}</span>
                      <span className="text-blue-500 uppercase tracking-widest bg-blue-50 px-1 py-0.5 rounded text-[8px] font-bold">
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteLog(item.id)}
                    className="p-1.5 rounded-lg border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 py-10 px-4 text-center">
              <MessageSquare className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-500">{t.historyEmpty}</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
