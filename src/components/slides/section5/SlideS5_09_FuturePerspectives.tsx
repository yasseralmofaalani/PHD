import React from "react";
import { motion } from "framer-motion";
import { Network, Scale, Waypoints, Radio, type LucideIcon } from "lucide-react";
import { slideContainerStyle, techGridStyle, SlideHeader, SectionBadge, SlideFooter } from "./shared";
import { useStepReveal } from "../../../hooks/useStepReveal";
import { C, EASE } from "../results/stage";
import { alpha } from "../../design/tokens";

type Horizon = {
  n: string;
  title: string;
  claim: string;
  color: string;
  icon: LucideIcon;
};

const HORIZONS: Horizon[] = [
  {
    n: "01",
    title: "تطوير نموذج تخطيط ديناميكي لترقية الشبكات الخليوية",
    claim:
      "الانتقال من تخطيط الترقية اعتماداً على بيانات ثابتة إلى تخطيط ديناميكي يأخذ في الحسبان التغير المستقبلي في عدد السكان، وتوزع الطلب على الخدمة، والتوسع العمراني. ويسمح ذلك بتحديث أولويات ترقية الأبراج دورياً وفق الاحتياجات الفعلية والمتوقعة.",
    color: "#428177",
    icon: Network,
  },
  {
    n: "02",
    title: "تطوير مفهوم العدالة المكانية لقياس جودة الخدمة الفعلية",
    claim:
      "توسيع مفهوم العدالة من توزيع أعداد الأبراج المطوّرة إلى قياس التغطية الفعلية، وعدد السكان المستفيدين، وجودة الخدمة في المناطق الحضرية والريفية. ويساعد ذلك على تقييم ما إذا كانت الترقية تحقق استفادة متوازنة للسكان، وليس مجرد توزيع متوازن للأبراج.",
    color: "#6b1f2a",
    icon: Scale,
  },
  {
    n: "03",
    title: "تحسين خوارزميات التخطيط متعدد الأهداف",
    claim:
      "دراسة خوارزميات تحسين متقدمة، مثل خوارزميات الجبهة غير المهيمن عليها، للوصول إلى مجموعة حلول تبيّن المفاضلات بين التغطية والكلفة واستهلاك الطاقة والعدالة المكانية. ويساعد ذلك متخذ القرار على اختيار الحل الأنسب وفق الميزانية والأولويات المعتمدة.",
    color: "#c8951a",
    icon: Waypoints,
  },
  {
    n: "04",
    title: "توسيع نموذج التحسين ليشمل الترابط والتداخل بين الخلايا",
    claim:
      "تطوير النموذج ليأخذ في الحسبان التداخل الراديوي والتأثير المتبادل بين الخلايا المتجاورة عند اختيار الأبراج المراد ترقيتها، بدلاً من تقييم كل برج بصورة منفصلة. ويساعد ذلك على إنتاج خطط ترقية أكثر واقعية من الناحية التشغيلية.",
    color: "#2e7d5b",
    icon: Radio,
  },
];

export const SlideS5_09_FuturePerspectives: React.FC = () => {
  const { step, totalSteps, goNext } = useStepReveal({ totalSteps: HORIZONS.length, initialStep: 1 });

  return (
    <div
      style={{ ...slideContainerStyle, cursor: step < totalSteps ? "pointer" : "default" }}
      dir="rtl"
      onClick={() => step < totalSteps && goNext()}
    >
      <div style={techGridStyle} />
      <SlideHeader
        titleAr="الآفاق المستقبلية"
        badge={<SectionBadge text="" variant="primary" />}
      />

      <div
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 12,
        }}
      >
        {HORIZONS.map((h, i) => {
          const on = i < step;
          const Icon = h.icon;
          return (
            <motion.div
              key={h.n}
              animate={{ opacity: on ? 1 : 0.14, y: on ? 0 : 8 }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: `1.5px solid ${on ? alpha(h.color, 0.32) : "rgba(15,23,42,0.08)"}`,
                borderRight: `7px solid ${h.color}`,
                boxShadow: on ? "0 8px 22px rgba(15,23,42,0.07)" : "none",
                padding: "10px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                minHeight: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: alpha(h.color, 0.12),
                    color: h.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={17} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: 18, fontWeight: 900, color: h.color, flexShrink: 0 }}>
                      {h.n}
                    </span>
                    <div style={{ fontSize: 18, fontWeight: 900, color: C.ink, lineHeight: 1.28 }}>{h.title}</div>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.inkSoft, lineHeight: 1.42 }}>{h.claim}</div>
            </motion.div>
          );
        })}
      </div>

      <SlideFooter slideLabel=" " />
    </div>
  );
};
