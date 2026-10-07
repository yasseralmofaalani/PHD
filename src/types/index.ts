// Types for the PhD Defense Presentation

export interface Slide {
  id: number;
  component: string;
  section: SectionId;
  chapter?: string;
  title: string;
  titleEn?: string;
  isSection?: boolean;
  speakerNotes?: string;
}

export type SectionId = 'cover' | 'agenda' | 'intro' | 'theory' | 'contributions' | 'results' | 'conclusion' | 'references';

export interface Section {
  id: SectionId;
  number: string;
  titleAr: string;
  titleEn: string;
  color: string;
  slides: number[];
}

export interface ModalContent {
  id: string;
  titleAr: string;
  titleEn: string;
  content: React.ReactNode;
  headerColor?: 'primary' | 'accent';
}

export interface KPIData {
  label: string;
  labelEn?: string;
  value: string | number;
  unit?: string;
  description?: string;
  variant?: 'primary' | 'accent' | 'secondary';
}

export interface ChartDataPoint {
  name: string;
  bpso?: number;
  aga?: number;
  huawei?: number;
  ericsson?: number;
  value?: number;
  [key: string]: string | number | undefined;
}
