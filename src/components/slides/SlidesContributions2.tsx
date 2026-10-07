import React from 'react';
import { motion } from 'framer-motion';
import SlideBreadcrumb from '../ui/SlideBreadcrumb';
import RevealItem, { StepIndicator } from '../ui/RevealItem';
import { useStepReveal } from '../../hooks/useStepReveal';
import {
  Scale,
  Layers,
  ShieldCheck,
  Radio,
  XCircle,
  CheckCircle2,
  ArrowDown,
  ArrowLeft,
  Zap,
  Network,
  Cpu,
  Server,
  GitMerge,
  BarChart3,
  Sliders,
  Compass,
  TrendingUp,
  MapPin,
  Sparkles,
  Check,
  X,
  AlertTriangle,
  RefreshCw,
  Clock,
  Activity,
  Award,
  Terminal,
  Code
} from 'lucide-react';

const darkSlideStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 'clamp(12px, 1.8vh, 20px) clamp(22px, 2.8vw, 40px)',
  boxSizing: 'border-box',
  fontFamily: 'Cairo, sans-serif',
  background: 'transparent',
  color: '#000000',
};

const techGridStyle: React.CSSProperties = {
  display: "none",
};

// ─────────────────────────────────────────────────────────────
// Slide 23 (Slide21SpatialFairness): Contribution 2 - SFI Formulation & Algorithmic Modification
// ─────────────────────────────────────────────────────────────
export const Slide21SpatialFairness: React.FC<{ onOpenModal?: (id: string) => void }> = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 5 });

  const zones = [
    { label: 'المناطق الحضرية الكبرى (دمشق، حلب)', commercial: 95, proposed: 95, color: 'var(--primary)', desc: 'تغطية فائقة مستمرة لكلا النموذجين' },
    { label: 'المناطق شبه الحضرية ومراكز المحافظات', commercial: 70, proposed: 88, color: 'var(--primary)', desc: 'تحسن بنسبة +18% في الوصول للنطاق العريض' },
    { label: 'المناطق الريفية والنائية والبادية', commercial: 45, proposed: 78, color: 'var(--accent)', desc: 'قفزة كبرى بنسبة +33% وإنهاء العزلة الرقمية' },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="03" partLabel="المساهمات البحثية" chapter="المساهمة 2 (الفصل 5) — مؤشر العدالة المكانية SFI وتطوير الخوارزميات" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: 'clamp(18px, 1.22vw, 22px)', fontWeight: 800, color: 'var(--accent)' }}>
                المساهمة البحثية الثانية — الفصل الخامس: صياغة وتطبيق قيد العدالة المكانية وتكييف الخوارزميات
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(28.8px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              مؤشر العدالة المكانية (SFI): تصحيح التحيز التجاري ومساهمتنا في تطوير الخوارزميتين
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.15fr',
        gap: '16px',
        position: 'relative',
        zIndex: 10,
        minHeight: 0,
        margin: '10px 0',
        alignItems: 'stretch'
      }}>
        {/* Left Column: Commercial Bias Dilemma + Zone Comparison Bars (Steps 2 & 3) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
          {/* Step 2: Commercial Bias Dilemma */}
          <RevealItem visibleAtStep={2} currentStep={step} animation="fadeRight" style={{ flex: 1 }}>
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--accent)',
              borderRadius: '16px',
              padding: 'clamp(12px, 1.6vh, 16px)',
              boxShadow: '0 6px 18px rgba(107, 31, 42, 0.08)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <AlertTriangle size={22} color="var(--accent)" />
                <span style={{ fontSize: 'clamp(19.1px, 1.4vw, 22px)', fontWeight: 900, color: 'var(--accent)' }}>
                  المفارقة العلمية: لماذا فشل النموذج ثلاثي الأبعاد اجتماعياً؟
                </span>
              </div>
              <p style={{ fontSize: 'clamp(18px, 1.12vw, 22px)', color: '#2c3531', lineHeight: 1.45, margin: 0, fontWeight: 600 }}>
                أثبتت التجارب أن التحسين التقني/الاقتصادي البحت (تغطية + كلفة + طاقة) يقود حتماً إلى <strong>تركز 95% من استثمارات 5G في المدن المكتظة</strong> لتحقيق أعلى عائد فوري، تاركاً الأرياف والمحافظات الطرفية عند 45% فقط من التغطية، مما يخلق عزلة رقمية وظلماً مكانياً فجاً.
              </p>
            </div>
          </RevealItem>

          {/* Step 3: Zone Coverage Comparison Bars */}
          <RevealItem visibleAtStep={3} currentStep={step} animation="fadeRight" style={{ flex: 1.3 }}>
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary)',
              borderRadius: '16px',
              padding: 'clamp(12px, 1.6vh, 16px)',
              boxShadow: '0 6px 18px rgba(66, 129, 119, 0.08)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}>
              <div style={{ fontSize: 'clamp(18.6px, 1.34vw, 22px)', fontWeight: 900, color: '#000000', marginBottom: '2px' }}>
                مقارنة نسب التغطية الفعلية: التخطيط التجاري مقابل نموذج الأطروحة:
              </div>
              {zones.map((z, i) => (
                <div key={z.label} style={{ marginBottom: i < zones.length - 1 ? '4px' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(18px, 1.1vw, 22px)', color: '#000000', marginBottom: '2px', fontWeight: 800 }}>
                    <span>{z.label}</span>
                    <span>
                      تجاري: <strong style={{ color: 'var(--accent)', fontFamily: 'Inter' }}>{z.commercial}%</strong> ← مقترح: <strong style={{ color: 'var(--primary)', fontFamily: 'Inter' }}>{z.proposed}%</strong>
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div style={{ height: '8px', background: 'rgba(107, 31, 42, 0.15)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${z.commercial}%`, height: '100%', background: 'var(--accent)', borderRadius: '6px' }} />
                    </div>
                    <div style={{ height: '8px', background: 'rgba(66, 129, 119, 0.2)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${z.proposed}%`, height: '100%', background: 'var(--primary)', borderRadius: '6px' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 'clamp(18px, 0.98vw, 22px)', color: 'rgba(0,0,0,0.6)', marginTop: '1px', fontWeight: 600 }}>
                    {z.desc}
                  </div>
                </div>
              ))}
            </div>
          </RevealItem>
        </div>

        {/* Right Column: SFI Formulation + OUR ALGORITHMIC MODIFICATION (Steps 4 & 5) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
          {/* Step 4: SFI Formulation Box & Lorenz Curve */}
          <RevealItem visibleAtStep={4} currentStep={step} animation="scale" style={{ flex: 1.1 }}>
            <div style={{
              background: '#ffffff',
              border: '2.5px solid var(--primary)',
              borderRadius: '18px',
              padding: 'clamp(12px, 1.6vh, 18px)',
              boxShadow: '0 8px 24px rgba(66, 129, 119, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 'clamp(18px, 1.04vw, 22px)',
                    color: '#ffffff',
                    fontWeight: 900,
                    background: 'var(--primary)',
                    padding: '3px 12px',
                    borderRadius: '14px'
                  }}>
                    المعامل الرابع: مؤشر العدالة المكانية SFI
                  </span>
                  <div style={{ fontSize: 'clamp(35.4px, 3.66vw, 44.8px)', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Inter', lineHeight: 1 }}>
                    SFI = 0.89
                  </div>
                </div>

                {/* Mathematical Formula */}
                <div style={{
                  background: 'rgba(66, 129, 119, 0.08)',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  marginTop: '6px',
                  direction: 'ltr',
                  fontFamily: 'Inter',
                  fontSize: 'clamp(18px, 1.16vw, 22px)',
                  fontWeight: 900,
                  textAlign: 'center',
                  border: '1px solid rgba(66, 129, 119, 0.25)'
                }}>
                  Max F(X) = w₁·C(X) − w₂·K(X) − w₃·E(X) + w₄·SFI(X)
                  <div style={{ fontSize: 'clamp(18px, 1.04vw, 22px)', color: 'var(--accent)', fontWeight: 800, marginTop: '3px' }}>
                    Regional Constraint: ∑_(i ∈ M_j) x_i ≥ K_j^min &nbsp;|&nbsp; SFI(X) ≥ 0.85
                  </div>
                </div>
              </div>

              {/* Lorenz Curve Diagram Simulation */}
              <div style={{
                background: 'rgba(237, 235, 224, 0.5)',
                borderRadius: '12px',
                padding: '6px 12px',
                border: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '4px'
              }}>
                <svg width="95" height="55" viewBox="0 0 100 60" fill="none">
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#000000" strokeWidth="1.5" />
                  <line x1="10" y1="50" x2="10" y2="10" stroke="#000000" strokeWidth="1.5" />
                  <line x1="10" y1="50" x2="90" y2="10" stroke="rgba(0,0,0,0.3)" strokeDasharray="3 2" />
                  <path d="M10 50 Q55 52 90 10" stroke="#6b1f2a" strokeWidth="2.5" fill="none" />
                  <path d="M10 50 Q38 30 90 10" stroke="#428177" strokeWidth="2.5" fill="none" />
                </svg>
                <div style={{ fontSize: 'clamp(18px, 1.04vw, 22px)', color: '#2c3531', lineHeight: 1.35 }}>
                  <div><span style={{ color: 'var(--primary)', fontWeight: 900 }}>— المقترح (SFI=0.89):</span> تطابق وثيق مع خط التكافؤ التام.</div>
                  <div><span style={{ color: 'var(--accent)', fontWeight: 900 }}>— التجاري (SFI=0.52):</span> انحراف حاد بسبب التمركز الحضري.</div>
                </div>
              </div>
            </div>
          </RevealItem>

          {/* Step 5: WHAT WAS OUR ALGORITHMIC CONTRIBUTION TO BPSO & AGA IN CH5? */}
          <RevealItem visibleAtStep={5} currentStep={step} animation="fadeUp">
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '2px solid var(--accent)',
              padding: '10px 16px',
              boxShadow: '0 6px 18px rgba(107, 31, 42, 0.12)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <Award size={20} color="var(--accent)" />
                <span style={{ fontSize: 'clamp(18.6px, 1.34vw, 22px)', fontWeight: 900, color: 'var(--accent)' }}>
                  تطويرنا للخوارزميتين في المساهمة 2 (آلية إصلاح العدالة المكانية):
                </span>
              </div>
              <p style={{ fontSize: 'clamp(18px, 1.1vw, 22px)', color: '#1a1a1a', lineHeight: 1.4, margin: 0, fontWeight: 600 }}>
                لم نكتفِ بإضافة حد العدالة في دالة الهدف؛ بل <strong>أعدنا هندسة آلية إصلاح القيود في صلب BPSO و AGA</strong> لتقوم تلقائياً بفحص كل منطقة إدارية $M_j$. فإذا لم تستوفِ المنطقة شرط التغطية الدنيا $K_j^{'{min}'}$، تتدخل الخوارزمية <strong>بنقل قرارات الترقية ($x_i=1$) من المواقع الحضرية الفائضة إلى المواقع الريفية الاستراتيجية</strong> حتى تحقيق قيد العدالة $SFI \ge 0.85$.
              </p>
              <div style={{
                background: 'rgba(107, 31, 42, 0.1)',
                borderRadius: '8px',
                padding: '4px 10px',
                textAlign: 'center',
                marginTop: '4px',
                fontSize: 'clamp(18px, 1.04vw, 22px)',
                fontWeight: 900,
                color: 'var(--accent)'
              }}>
                النتيجة: قفزة نوعية +36.5% في إنصاف الأرياف، وتفوق BPSO في استكشاف جبهة باريتو المثلى (Pareto Front).
              </div>
            </div>
          </RevealItem>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 24 (Slide23NoJamming): Contribution 3 - Software Isolation vs RF Jamming
// ─────────────────────────────────────────────────────────────
export const Slide23NoJamming: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 5 });

  const drawbacks = [
    { title: 'حجب اتصالات الطوارئ والإسعاف', desc: 'قطع قنوات الاستجابة الأولى والمستشفيات وتشكيل خطر مباشر على الأرواح.' },
    { title: 'تسرب طاقي عشوائي (High Spillover)', desc: 'استحالة حصر التداخل الراديوي داخل مضلع جغرافي محدد وتشويش النطاقات المجاورة.' },
    { title: 'تلوث كهرومغناطيسي واستهلاك طاقة هائل', desc: 'إشعاع راديوي مكثف يستهلك موارد الطاقة ولا يتوافق مع المعايير البيئية.' },
    { title: 'انتهاك اللوائح الوطنية للطيف الترددي', desc: 'مخالفة معايير 3GPP وإتلاف البنية التحتية الترددية للمشغلين.' }
  ];

  const advantages = [
    { title: 'عزل برمجي محكم (Zero Spillover)', desc: 'استهداف مكاني دقيق للأبراج والخلايا الراديوية الواقعة حصراً داخل المضلع الجغرافي.' },
    { title: 'استمرار قنوات الطوارئ المعتمدة', desc: 'بقاء قنوات البث العام ومكالمات النجدة متاحة دون أي انقطاع للمواطنين.' },
    { title: 'استعادة تشغيلية فورية (< 10 ثوانٍ)', desc: 'إعادة تفعيل البث آلياً وبشكل متدرج فور انتهاء الحدث دون فترات خمول.' },
    { title: 'توافق كامل مع معايير 3GPP العالمية', desc: 'حل برمجي نظيف يحافظ على سلامة الهوائيات ويوفر الطاقة بنسبة 100% في الخلايا المعزولة.' }
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="03" partLabel="المساهمات البحثية" chapter="المساهمة 3 (الفصل 6) — التحكم الميداني الآمن مقابل التشويش" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: 'clamp(18px, 1.22vw, 22px)', fontWeight: 800, color: 'var(--accent)' }}>
                المساهمة البحثية الثالثة — الفصل السادس: النقلة النوعية نحو التحكم التشغيلي الميداني
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(28.8px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              العزل المكاني البرمجي الآمن (Zero-Jamming) مقابل التشويش الراديوي التقليدي
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2 & 3: Comparison Columns */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        position: 'relative',
        zIndex: 10,
        minHeight: 0,
        margin: '10px 0',
        alignItems: 'stretch'
      }}>
        {/* Step 2: Drawbacks of RF Jamming */}
        <RevealItem visibleAtStep={2} currentStep={step} animation="fadeRight" style={{ height: '100%' }}>
          <div style={{
            background: '#ffffff',
            border: '2.5px solid var(--accent)',
            borderRadius: '18px',
            padding: 'clamp(12px, 1.6vh, 18px)',
            boxShadow: '0 8px 24px rgba(107, 31, 42, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <XCircle size={26} color="var(--accent)" />
                <span style={{ fontSize: 'clamp(19.8px, 1.46vw, 22.4px)', fontWeight: 900, color: 'var(--accent)' }}>
                  المخاطر الكارثية للتشويش الراديوي التقليدي (RF Jamming):
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {drawbacks.map((d, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 900, fontSize: 'clamp(19.3px, 1.34vw, 22px)' }}>✗</span>
                    <div>
                      <strong style={{ fontSize: 'clamp(18px, 1.16vw, 22px)', color: '#000000' }}>{d.title}: </strong>
                      <span style={{ fontSize: 'clamp(18px, 1.1vw, 22px)', color: '#2c3531', lineHeight: 1.35 }}>{d.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(107, 31, 42, 0.1)',
              borderRadius: '10px',
              padding: '6px 12px',
              textAlign: 'center',
              border: '1px solid rgba(107, 31, 42, 0.25)',
              marginTop: '8px'
            }}>
              <span style={{ fontSize: 'clamp(18px, 1.1vw, 22px)', color: 'var(--accent)', fontWeight: 800 }}>
                ⚠️ النتيجة: تعطيل عشوائي غير منضبط ومخاطر أمنية وبيئية كبرى
              </span>
            </div>
          </div>
        </RevealItem>

        {/* Step 3: Advantages of Software Control */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="fadeLeft" style={{ height: '100%' }}>
          <div style={{
            background: '#ffffff',
            border: '2.5px solid var(--primary)',
            borderRadius: '18px',
            padding: 'clamp(12px, 1.6vh, 18px)',
            boxShadow: '0 8px 24px rgba(66, 129, 119, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <CheckCircle2 size={26} color="var(--primary)" />
                <span style={{ fontSize: 'clamp(19.8px, 1.46vw, 22.4px)', fontWeight: 900, color: 'var(--primary)' }}>
                  الميزات الهندسية للعزل البرمجي (GIS Software Control):
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {advantages.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 'clamp(19.3px, 1.34vw, 22px)' }}>✓</span>
                    <div>
                      <strong style={{ fontSize: 'clamp(18px, 1.16vw, 22px)', color: '#000000' }}>{a.title}: </strong>
                      <span style={{ fontSize: 'clamp(18px, 1.1vw, 22px)', color: '#2c3531', lineHeight: 1.35 }}>{a.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(66, 129, 119, 0.1)',
              borderRadius: '10px',
              padding: '6px 12px',
              textAlign: 'center',
              border: '1px solid rgba(66, 129, 119, 0.25)',
              marginTop: '8px'
            }}>
              <span style={{ fontSize: 'clamp(18px, 1.1vw, 22px)', color: 'var(--primary)', fontWeight: 800 }}>
                🛡️ النتيجة: استهداف مكاني دقيق بنسبة 97.5% دون توليد أي تداخل راديوي
              </span>
            </div>
          </div>
        </RevealItem>
      </div>

      {/* Step 4: Metric Banner */}
      <RevealItem visibleAtStep={4} currentStep={step} animation="fadeUp">
        <div style={{
          background: 'var(--primary)',
          borderRadius: '14px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 10,
          color: '#ffffff',
          boxShadow: '0 4px 16px rgba(66, 129, 119, 0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={20} color="#ffffff" />
            <span style={{ fontSize: 'clamp(18px, 1.22vw, 22px)', fontWeight: 800 }}>
              المعادلة الهندسية: تحقيق أقصى درجات الانضباط الأمني في سيناريوهات الطوارئ المصرح بها دون الإضرار بسلامة الطيف الترددي الوطني.
            </span>
          </div>
          <span style={{
            fontSize: 'clamp(18px, 1.04vw, 22px)',
            background: 'var(--accent)',
            color: '#ffffff',
            padding: '3px 12px',
            borderRadius: '14px',
            fontWeight: 800,
            whiteSpace: 'nowrap'
          }}>
            Zero RF Interference
          </span>
        </div>
      </RevealItem>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 25 (Slide22Orchestration): Contribution 3 - Multi-Vendor GIS Architecture with Exact Commands
// ─────────────────────────────────────────────────────────────
export const Slide22Orchestration: React.FC<{ onOpenModal?: (id: string) => void }> = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 5 });

  const pipelineSteps = [
    { num: '01', title: 'رسم مضلع الحدث (GIS Polygon)', desc: 'تحديد الإحداثيات الجغرافية الدقيقة لمنطقة الحدث بدقة عبر بيئة نظم المعلومات الجغرافية.', icon: <Compass size={18} /> },
    { num: '02', title: 'التقاطع المكاني الفوري (Spatial Intersect)', desc: 'حصر الخلايا والهوائيات المشعة داخل المضلع بدقة واستبعاد المحطات المحيطة لتفادي التسرب.', icon: <MapPin size={18} /> },
    { num: '03', title: 'طبقة التنسيق الموحدة (Orchestrator)', desc: 'طبقة برمجية محايدة للموردين تقوم بتفكيك أمر العزل إلى مسارات تشغيلية متوازية.', icon: <Server size={18} /> },
    { num: '04', title: 'ترجمة الأوامر الميدانية (MML & CLI)', desc: 'ترجمة آلية لأوامر MML لمعدات Huawei وأوامر CLI لمعدات Ericsson بالتوازي.', icon: <Terminal size={18} /> },
    { num: '05', title: 'التنفيذ والاستعادة الآمنة (< 10 ثوانٍ)', desc: 'تطبيق العزل الفوري مع بروتوكول تراجع تلقائي (Safe Rollback) يعيد الخدمة فور زوال السبب.', icon: <Clock size={18} /> },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="03" partLabel="المساهمات البحثية" chapter="المساهمة 3 (الفصل 6) — معمارية التنسيق متعدد الموردين عبر GIS" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }} />
              <span style={{ fontSize: 'clamp(18px, 1.22vw, 22px)', fontWeight: 800, color: 'var(--primary)' }}>
                المساهمة البحثية الثالثة — الفصل السادس: المعمارية الهندسية للتنسيق الميداني
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(28.8px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              معمارية التنسيق متعدد الموردين (Huawei & Ericsson) عبر GIS بزمن &lt; 10s
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Main Grid */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.25fr 1fr',
        gap: '16px',
        position: 'relative',
        zIndex: 10,
        minHeight: 0,
        margin: '10px 0',
        alignItems: 'stretch'
      }}>
        {/* Steps 2 & 3: 5 Pipeline Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
          {pipelineSteps.map((s, i) => (
            <RevealItem key={s.num} visibleAtStep={i < 3 ? 2 : 3} currentStep={step} animation="fadeRight">
              <div
                style={{
                  background: '#ffffff',
                  border: '1.5px solid rgba(66, 129, 119, 0.3)',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{
                  background: 'var(--primary)',
                  color: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: '8px',
                  fontSize: 'clamp(18px, 1.04vw, 22px)',
                  fontWeight: 900,
                  fontFamily: 'Inter',
                  flexShrink: 0
                }}>
                  {s.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'clamp(18px, 1.22vw, 22px)', fontWeight: 800, color: '#000000' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: 'clamp(18px, 1.04vw, 22px)', color: '#2c3531', lineHeight: 1.3, fontWeight: 600 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>

        {/* Steps 4 & 5: Exact Multi-Vendor Technical Commands & Speed Indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between', height: '100%' }}>
          {/* Step 4: Speed Metric Card */}
          <RevealItem visibleAtStep={4} currentStep={step} animation="scale">
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary)',
              borderRadius: '16px',
              padding: '12px 18px',
              boxShadow: '0 6px 18px rgba(66, 129, 119, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: 'clamp(18px, 1.04vw, 22px)', color: 'var(--primary)', fontWeight: 800 }}>
                  زمن الاستجابة والتنفيذ الميداني
                </span>
                <div style={{ fontSize: 'clamp(18.6px, 1.28vw, 22px)', fontWeight: 900, color: '#000000' }}>
                  عزل واستعادة متزامنة للموردين
                </div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: 'clamp(33.6px, 3.42vw, 42.5px)', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Inter' }}>
                  &lt; 10s
                </span>
                <div style={{ fontSize: 'clamp(18px, 0.98vw, 22px)', color: 'rgba(0,0,0,0.6)', fontWeight: 700 }}>
                  دقة عزل مكاني 97.5%
                </div>
              </div>
            </div>
          </RevealItem>

          {/* Step 5: Dual Multi-Vendor Command Console (Huawei MML vs Ericsson CLI) */}
          <RevealItem visibleAtStep={5} currentStep={step} animation="fadeLeft" style={{ flex: 1 }}>
            <div style={{
              background: '#1a2220',
              border: '2px solid var(--primary)',
              borderRadius: '16px',
              padding: '12px 14px',
              boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
              color: '#ffffff',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '4px', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={16} color="var(--primary)" />
                  <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff' }}>ترجمة الأوامر الحقيقية للموردين (Vendor Translation Layer)</span>
                </div>
                <span style={{ fontSize: '18px', background: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>Automated</span>
              </div>

              {/* Huawei Box */}
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '6px 10px', marginBottom: '6px', direction: 'ltr', textAlign: 'left', fontFamily: 'Courier New, monospace' }}>
                <div style={{ fontSize: '18px', color: '#68d8d6', fontWeight: 800 }}>// HUAWEI MML COMMAND EXECUTION:</div>
                <div style={{ fontSize: '18px', color: '#ffffff' }}>DEA CELL: LocalCellId=12, CellId=3401; // Deactivate</div>
                <div style={{ fontSize: '18px', color: '#a0e4b0' }}>ACT CELL: LocalCellId=12, CellId=3401; // Safe Rollback</div>
              </div>

              {/* Ericsson Box */}
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '6px 10px', direction: 'ltr', textAlign: 'left', fontFamily: 'Courier New, monospace' }}>
                <div style={{ fontSize: '18px', color: '#fca311', fontWeight: 800 }}>// ERICSSON MOSHELL / CLI EXECUTION:</div>
                <div style={{ fontSize: '18px', color: '#ffffff' }}>bl EUtranCellFDD=SYR_DMS_041; // Block Traffic</div>
                <div style={{ fontSize: '18px', color: '#a0e4b0' }}>deb EUtranCellFDD=SYR_DMS_041; // Deblock / Restore</div>
              </div>
            </div>
          </RevealItem>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 26 (Slide24IntegratedFramework): The Grand Unified Thesis Framework
// ─────────────────────────────────────────────────────────────
export const Slide24IntegratedFramework: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 5 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="03" partLabel="المساهمات البحثية" chapter="الإطار الهندسي المتكامل للأطروحة" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: 'clamp(18px, 1.22vw, 22px)', fontWeight: 800, color: 'var(--accent)' }}>
                الخلاصة الهيكلية الكبرى للأطروحة — دورة الحياة المتكاملة
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(28.8px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              الإطار الهندسي المتكامل: تكامل التخطيط والعدالة المكانية والتحكم الميداني
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Architecture Flow Stack */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
        minHeight: 0,
        margin: '10px 0',
        gap: '10px'
      }}>
        {/* Step 2: Layer 1 - Inputs */}
        <RevealItem visibleAtStep={2} currentStep={step} animation="fadeUp">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary)',
              borderRadius: '14px',
              padding: '10px 16px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: 'clamp(18.6px, 1.34vw, 22px)', fontWeight: 900, color: 'var(--primary)' }}>
                قاعدة البيانات التشغيلية الحقيقية
              </div>
              <div style={{ fontSize: 'clamp(18px, 1.1vw, 22px)', color: '#2c3531', marginTop: '2px', fontWeight: 700 }}>
                79,268 موقعاً وسجلاً خلوياً في سوريا (Syriatel & MTN)
              </div>
            </div>

            <div style={{
              background: 'var(--accent)',
              border: '2px solid var(--accent)',
              borderRadius: '14px',
              padding: '10px 16px',
              textAlign: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(107, 31, 42, 0.2)'
            }}>
              <div style={{ fontSize: 'clamp(18.6px, 1.34vw, 22px)', fontWeight: 900, color: '#ffffff' }}>
                طبقة الذكاء الجغرافي GIS
              </div>
              <div style={{ fontSize: 'clamp(18px, 1.1vw, 22px)', color: '#edebe0', marginTop: '2px', fontWeight: 700 }}>
                نموذج الارتفاع الرقمي DEM 30m + الكثافة والمضلعات
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary)',
              borderRadius: '14px',
              padding: '10px 16px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: 'clamp(18.6px, 1.34vw, 22px)', fontWeight: 900, color: 'var(--primary)' }}>
                القيود الوطنية والتشغيلية
              </div>
              <div style={{ fontSize: 'clamp(18px, 1.1vw, 22px)', color: '#2c3531', marginTop: '2px', fontWeight: 700 }}>
                سقف CapEx + أزمة الطاقة + قيد العدالة SF(X) ≥ 0.85
              </div>
            </div>
          </div>
        </RevealItem>

        {/* Step 3: Layer 2 - The Dual Engine Core */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="scale">
          <div style={{
            background: 'linear-gradient(90deg, var(--primary) 0%, #29534c 100%)',
            borderRadius: '16px',
            padding: '12px 20px',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(66, 129, 119, 0.25)',
            color: '#ffffff',
            position: 'relative'
          }}>
            <div style={{ fontSize: 'clamp(20.5px, 1.53vw, 22.9px)', fontWeight: 900, color: '#ffffff' }}>
              محرك التحسين والتنسيق الموحد للأطروحة (Dual Optimization & Orchestration Engine)
            </div>
            <div style={{ fontSize: 'clamp(18px, 1.16vw, 22px)', color: '#edebe0', marginTop: '3px', fontWeight: 600 }}>
              يدمج مساري: التخطيط الاستراتيجي لترقية 5G المقيدة بالعدالة (BPSO-AGA مع آلية إصلاح القيود) + التنسيق التشغيلي اللحظي للعزل الآمن (GIS Zero-Jamming)
            </div>
          </div>
        </RevealItem>

        {/* Step 4: Layer 3 - Two Output Deliverables */}
        <RevealItem visibleAtStep={4} currentStep={step} animation="fadeUp">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{
              background: '#ffffff',
              border: '2px solid var(--primary)',
              borderRadius: '14px',
              padding: '12px 18px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <Award size={20} color="var(--primary)" />
                <div style={{ fontSize: 'clamp(19.3px, 1.4vw, 22px)', fontWeight: 900, color: 'var(--primary)' }}>
                  مخرجات التخطيط الاستراتيجي لـ 5G:
                </div>
              </div>
              <div style={{ fontSize: 'clamp(18px, 1.16vw, 22px)', color: '#2c3531', lineHeight: 1.4, fontWeight: 600 }}>
                خطة ترقية وطنية مثلى تحقق 95.12% جودة تغطية، ووفر 62.4% في كلفة الترقية، وتخفيض 38% بالطاقة، مع رفع عدالة الأرياف بنسبة +36.5% (SFI = 0.89).
              </div>
            </div>

            <div style={{
              background: 'var(--accent)',
              border: '2px solid var(--accent)',
              borderRadius: '14px',
              padding: '12px 18px',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(107, 31, 42, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                <ShieldCheck size={20} color="#ffffff" />
                <div style={{ fontSize: 'clamp(19.3px, 1.4vw, 22px)', fontWeight: 900, color: '#ffffff' }}>
                  مخرجات التحكم الميداني والأمني:
                </div>
              </div>
              <div style={{ fontSize: 'clamp(18px, 1.16vw, 22px)', color: '#edebe0', lineHeight: 1.4, fontWeight: 600 }}>
                عزل مكاني آمن بالمضلعات بدقة 97.5% وزمن استجابة &lt; 10s عبر Huawei و Ericsson، مع الحفاظ على قنوات الطوارئ والاستعادة التلقائية المؤكدة.
              </div>
            </div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};
