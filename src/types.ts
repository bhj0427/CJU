export type Language = "ko" | "en";

export type UniversityId = "cbnu" | "cju";

export interface UniversityInfo {
  id: UniversityId;
  nameKo: string;
  nameEn: string;
  logoUrl: string;
  logoTextUrl?: string;
  heroUrl: string;
  brandColor: string;
  accentColor: string;
  textColor: string;
  foundingYear: number;
  stats: {
    students: string;
    professors: string;
    employmentRate: string;
    globalRank?: string;
  };
  addressKo: string;
  addressEn: string;
  tel: string;
  email: string;
}

export interface Department {
  id: string;
  category: "humanities" | "engineering" | "natural" | "arts" | "medical";
  nameKo: string;
  nameEn: string;
  descKo: string;
  descEn: string;
  featuresKo: string[];
  featuresEn: string[];
}

export interface CounselingInquiry {
  id: string;
  name: string;
  contact: string;
  category: "undergrad" | "grad" | "inter";
  content: string;
  agreePrivacy: boolean;
  date: string;
  status: "received" | "reviewing" | "completed";
}

export interface SearchItem {
  titleKo: string;
  titleEn: string;
  categoryKo: string;
  categoryEn: string;
  url: string;
}
