import React from "react";
import SectionMarker from "../components/ui/SectionMarker";
import Slide00Cover from "../components/slides/Slide00Cover";
import Slide01Agenda from "../components/slides/Slide01Agenda";
import Slide03WhyNow from "../components/slides/Slide03WhyNow";
import {
  Slide05SyrianProblem,
  Slide06ResearchProblem,
  Slide08Objectives,
} from "../components/slides/SlidesIntroduction";
import Slide09Questions from "../components/slides/Slide09Questions";
import {
  Slide12RelatedWork,
  Slide13Algorithms,
  Slide14ResearchGap,
} from "../components/slides/SlidesTheory";
import * as C from "../components/slides/contributions";
import * as R from "../components/slides/results";
import {
  SlideS5_09_FuturePerspectives,
  SlideS5_13_ClosingSlide,
  SlideS5_Conclusions,
  SlideS5_Recommendations,
} from "../components/slides/section5";

export interface SlideContext {
  goTo: (index: number) => void;
  openModal: (id: string) => void;
}

type Render = (ctx: SlideContext) => React.ReactNode;

const simple = (Comp: React.ComponentType): Render => () => <Comp />;

export const slideRegistry: Record<string, Render> = {
  cover: simple(Slide00Cover),
  agenda: ({ goTo }) => <Slide01Agenda onGoTo={goTo} />,

  "intro-marker": () => (
    <SectionMarker
      number="01"
      titleAr="المقدمة"
      subtitle="السياق المحلي والدولي، أزمة شبكات الخلوي السورية، صياغة إشكالية البحث، وأهدافه الاستراتيجية"
      sectionId="intro"
    />
  ),
  "intro-why-now": simple(Slide03WhyNow),
  "intro-syrian-problem": simple(Slide05SyrianProblem),
  "intro-research-problem": ({ openModal }) => <Slide06ResearchProblem onOpenModal={openModal} />,
  "intro-objectives": simple(Slide08Objectives),
  "intro-questions": simple(Slide09Questions),

  "theory-marker": () => (
    <SectionMarker
      number="02"
      titleAr="الدراسات النظرية والمرجعية"
      titleEn="THEORETICAL & RELATED STUDIES"
      subtitle="الأعمال السابقة، الخوارزميات الذكية، وتحديد الفجوة البحثية"
    />
  ),
  "theory-related": simple(Slide12RelatedWork),
  "theory-algorithms": ({ openModal }) => <Slide13Algorithms onOpenModal={openModal} />,
  "theory-gap": simple(Slide14ResearchGap),

  "c-marker": () => (
    <SectionMarker
      number="03"
      titleAr="المساهمات البحثية"
      titleEn="RESEARCH CONTRIBUTIONS"
      subtitle="النمذجة الرياضية للترقية، خوارزميات الاستمثال الاستدلالية الفوقية، مؤشر العدالة المكانية، ومنظومة العزل الجغرافي"
      sectionId="contributions"
    />
  ),
  "c-opening": simple(C.ContribOpening),
  "c1-pipeline": simple(C.C1Pipeline),
  "c1-dataset": simple(C.C1Dataset),
  "c1-why-hard": simple(C.C1WhyHard),
  "c1-model": simple(C.C1Model),
  "c1-two-algorithms": simple(C.C1TwoAlgorithms),
  "c1-repair-engine": simple(C.C1RepairEngine),
  "c1-experiments": simple(C.C1Experiments),
  "c1-hero-results": simple(C.C1HeroResults),
  "c1-stability": simple(C.C1Stability),
  "c1-convergence": simple(C.C1Convergence),
  "c1-budget": simple(C.C1Budget),
  "c1-baselines": simple(C.C1Baselines),
  "c1-decision": simple(C.C1Decision),
  "c2-problem": simple(C.C2Problem),
  "c2-model-extension": simple(C.C2ModelExtension),
  "c2-math": simple(C.C2Math),
  "c2-map-transformation": simple(C.C2MapTransformation),
  "c2-fair-search": simple(C.C2FairSearch),
  "c2-fairness-effect": simple(C.C2FairnessEffect),
  "c3-problem": simple(C.C3Problem),
  "c3-architecture": simple(C.C3Architecture),
  "c3-isolation": simple(C.C3Isolation),
  "c3-closed-loop": simple(C.C3ClosedLoop),
  "c3-restoration": simple(C.C3Restoration),
  "c3-operational-results": simple(C.C3OperationalResults),
  "c-three-contributions": simple(C.ContribThreeContributions),

  "res-marker": () => (
    <SectionMarker
      number="04"
      titleAr="النتائج العملية والإنتاج البحثي"
      titleEn="EVIDENCE & PUBLICATIONS"
      subtitle="كيف تحوّلت المساهمات الثلاث إلى أدلة تجريبية قابلة للقياس، ثم إلى إنتاج علمي محكّم"
      sectionId="results"
    />
  ),
  "res-planning": simple(R.ResPlanningResults),
  "res-fairness": simple(R.ResFairnessResults),
  "res-control": simple(R.ResControlResults),
  "res-portfolio": simple(R.ResPortfolio),

  "conclusion-marker": () => (
    <SectionMarker
      number="05"
      titleAr="الخاتمة والآفاق المستقبلية"
      titleEn="CONCLUSION & FUTURE OUTLOOK"
      subtitle="الاستنتاجات الشاملة للأطروحة، التوصيات الهندسية، حدود الدراسة، والآفاق البحثية المستقبلية"
      sectionId="conclusion"
    />
  ),
  "s5-conclusions": simple(SlideS5_Conclusions),
  "s5-recommendations": simple(SlideS5_Recommendations),
  "s5-future": simple(SlideS5_09_FuturePerspectives),
  "s5-closing": simple(SlideS5_13_ClosingSlide),
};
