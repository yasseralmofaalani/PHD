import type { Section, SectionId } from "../types";
import { SLIDE_ORDER } from "./slideOrder";

const indicesOf = (id: SectionId): number[] =>
  SLIDE_ORDER.flatMap((s, i) => (s.section === id ? [i] : []));

export const sections: Section[] = [
  {
    id: "cover",
    number: "00",
    titleAr: "الغلاف",
    titleEn: "COVER",
    color: "#428177",
    slides: indicesOf("cover"),
  },
  {
    id: "intro",
    number: "01",
    titleAr: "المقدمة",
    titleEn: "INTRODUCTION",
    color: "#428177",
    slides: indicesOf("intro"),
  },
  {
    id: "theory",
    number: "02",
    titleAr: "الدراسات النظرية والمرجعية",
    titleEn: "THEORETICAL & RELATED STUDIES",
    color: "#428177",
    slides: indicesOf("theory"),
  },
  {
    id: "contributions",
    number: "03",
    titleAr: "المساهمات البحثية",
    titleEn: "RESEARCH CONTRIBUTIONS",
    color: "#428177",
    slides: indicesOf("contributions"),
  },
  {
    id: "results",
    number: "04",
    titleAr: "النتائج العلمية والإنتاج البحثي",
    titleEn: "EVIDENCE & PUBLICATION",
    color: "#428177",
    slides: indicesOf("results"),
  },
  {
    id: "conclusion",
    number: "05",
    titleAr: "الخاتمة والآفاق المستقبلية",
    titleEn: "CONCLUSION & FUTURE OUTLOOK",
    color: "#428177",
    slides: indicesOf("conclusion"),
  },
];

export const sectionById = (id: SectionId): Section | undefined =>
  sections.find((s) => s.id === id);

export const sectionBySlideIndex = (index: number): Section | undefined =>
  sections.find((s) => s.slides.includes(index));

export const TOTAL_SLIDES = SLIDE_ORDER.length;
