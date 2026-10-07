import React from 'react';
import { motion } from 'framer-motion';
import SlideBreadcrumb from '../ui/SlideBreadcrumb';
import RevealItem, { StepIndicator } from '../ui/RevealItem';
import { useStepReveal } from '../../hooks/useStepReveal';
import ComparisonBarChart from '../charts/ComparisonBarChart';
import { thesisMetrics } from '../../data/thesisData';
import {
  BarChart3,
  Zap,
  DollarSign,
  Scale,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ArrowDown,
  Activity,
  Layers,
  Compass,
  Radio,
  Clock,
  Award,
  BookOpen,
  Check,
  Server,
  Sparkles
} from 'lucide-react';

const darkSlideStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 'clamp(14px, 2vh, 22px) clamp(24px, 3vw, 44px)',
  boxSizing: 'border-box',
  fontFamily: 'Cairo, sans-serif',
  background: 'transparent',
  color: '#000000',
};

const techGridStyle: React.CSSProperties = {
  display: "none",
};

// ─────────────────────────────────────────────────────────────
// Slide 25: Experiment Design & Statistical Protocol
// ─────────────────────────────────────────────────────────────
export const Slide25ExperimentDesign: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  const steps = [
    { num: '01', label: 'البيانات الحقيقية للمواقع', detail: '79,268 موقعاً خلوياً حقيقياً في سوريا (Syriatel + MTN)', color: 'var(--primary)' },
    { num: '02', label: 'المعالجة المكانية GIS', detail: 'تنظيف ومعالجة DEM 30m والخرائط الطبوغرافية والكثافة', color: 'var(--accent)' },
    { num: '03', label: 'محرك التحسين الهجين', detail: 'تطبيق BPSO و AGA مع آلية إصلاح القيود التكيفية', color: 'var(--primary)' },
    { num: '04', label: '30 تشغيلاً إحصائياً مستقلاً', detail: 'بذور عشوائية متنوعة لضمان الموثوقية واستبعاد الصدفة', color: 'var(--accent)' },
    { num: '05', label: 'التقييم والتحقق الإحصائي', detail: 'اختبارات ANOVA و t-test وحساب قيم p-values', color: 'var(--primary)' },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="منهجية وتصميم التجارب" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>البروتوكول التجريبي الصارم</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              تصميم التجارب ومنهجية التحقق الإحصائي
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Main Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '16px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {/* Step 2: Pipeline Steps */}
        <RevealItem visibleAtStep={2} currentStep={step} animation="fadeRight">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  border: '1.5px solid rgba(66, 129, 119, 0.25)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ background: s.color, color: '#ffffff', padding: '2px 8px', borderRadius: '6px', fontSize: '18px', fontWeight: 900, fontFamily: 'Inter' }}>
                  {s.num}
                </span>
                <div>
                  <div style={{ fontSize: '19px', fontWeight: 800, color: '#000000' }}>{s.label}</div>
                  <div style={{ fontSize: '18px', color: '#2c3531' }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </RevealItem>

        {/* Step 3: Validation Protocol Highlights */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="fadeLeft" style={{ height: '100%' }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid var(--accent)',
            borderRadius: '16px',
            padding: '16px 18px',
            boxShadow: '0 6px 20px rgba(107, 31, 42, 0.1)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div style={{ fontSize: '19.1px', fontWeight: 900, color: 'var(--accent)', marginBottom: '8px' }}>
              🔬 معايير الدقة العلمية المعتمدة:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '19px', color: '#2c3531', lineHeight: 1.45 }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>إجراء <strong>30 تشغيلاً مستقلاً</strong> لاستبعاد أثر الصدفة.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>حساب المتوسط والانحراف المعياري (Mean ± Std).</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>اختبار المعنوية والدلالة الإحصائية (p-values &lt; 0.05).</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>إلزامية قيد العدالة المكانية SFI في كل السيناريوهات.</span>
              </div>
            </div>
          </div>
        </RevealItem>
      </div>

      {/* Step 4: Verification Footer */}
      <RevealItem visibleAtStep={4} currentStep={step} animation="fadeUp">
        <div style={{ background: 'var(--primary)', borderRadius: '10px', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '19px', fontWeight: 700 }}>
            <Sparkles size={16} />
            <span>بروتوكول موحد يضمن تكرارية النتائج وقابليتها للتعميم على أي شبكة إقليمية.</span>
          </div>
          <span style={{ fontSize: '18px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>Statistical Rigor</span>
        </div>
      </RevealItem>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 26: Main Results BPSO vs AGA Comparison
// ─────────────────────────────────────────────────────────────
export const Slide26MainResults: React.FC<{ onOpenModal?: (id: string) => void }> = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  const metrics = [
    { label: 'جودة التغطية (SINR)', unit: '%', bpso: thesisMetrics.coverage.bpso, aga: thesisMetrics.coverage.aga, color: 'var(--primary)', note: 'تغطية فائقة' },
    { label: 'النفقات الرأسمالية (CapEx)', unit: 'M$', bpso: thesisMetrics.cost.bpso, aga: thesisMetrics.cost.aga, color: 'var(--accent)', note: 'وفر ≈ 6% إضافي' },
    { label: 'استهلاك الطاقة', unit: 'MWh', bpso: thesisMetrics.energy.bpso, aga: thesisMetrics.energy.aga, color: 'var(--primary)', note: 'وفر 5.3% للطاقة' },
    { label: 'مؤشر العدالة المكانية (SFI)', unit: '', bpso: thesisMetrics.fairness.bpso, aga: thesisMetrics.fairness.aga, color: 'var(--accent)', note: 'قفزة نوعية +36%' },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="النتائج المقارنة الرئيسية: BPSO مقابل AGA" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الحصاد الرقمي للتجارب</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              مقارنة النتائج الرئيسية بين خوارزميتي BPSO و AGA
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Step 2: 4 KPI Cards */}
      <RevealItem visibleAtStep={2} currentStep={step} animation="scale">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', position: 'relative', zIndex: 10, margin: '6px 0' }}>
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                background: '#ffffff',
                border: '1.5px solid rgba(66, 129, 119, 0.25)',
                borderRadius: '14px',
                padding: '12px 14px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '19px', fontWeight: 800, color: '#000000', marginBottom: '6px' }}>{m.label}</div>
              <div style={{ background: 'var(--primary)', borderRadius: '10px', padding: '8px 10px', color: '#ffffff' }}>
                <div style={{ fontSize: '18px', color: '#edebe0', fontWeight: 800 }}>BPSO (المقترح) ⭐</div>
                <div style={{ fontSize: '27.3px', fontWeight: 900, color: '#ffffff', fontFamily: 'Inter', margin: '2px 0' }}>
                  {m.bpso}<span style={{ fontSize: '18px', opacity: 0.85 }}>{m.unit}</span>
                </div>
              </div>
              <div style={{ marginTop: '6px', fontSize: '18px', color: '#2c3531', fontWeight: 700 }}>
                AGA: <strong style={{ color: 'var(--accent)', fontFamily: 'Inter' }}>{m.aga}{m.unit}</strong>
              </div>
            </div>
          ))}
        </div>
      </RevealItem>

      {/* Steps 3-4: Chart & Runtime */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '14px', position: 'relative', zIndex: 10, minHeight: 0, margin: '4px 0' }}>
        {/* Step 3: Comparison Chart */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="fadeRight" style={{ height: '100%' }}>
          <div style={{ background: '#ffffff', border: '1.5px solid rgba(66, 129, 119, 0.25)', borderRadius: '16px', padding: '12px 18px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div style={{ fontSize: '19px', fontWeight: 800, color: '#000000', textAlign: 'center' }}>
              المقارنة الرسومية للوفورات والأداء التشغيلي
            </div>
            <ComparisonBarChart
              data={[
                { label: 'الكلفة (M$)', bpso: thesisMetrics.cost.bpso, aga: thesisMetrics.cost.aga },
                { label: 'الطاقة (MWh)', bpso: thesisMetrics.energy.bpso, aga: thesisMetrics.energy.aga },
                { label: 'الزمن (s)', bpso: thesisMetrics.runtime.bpso, aga: thesisMetrics.runtime.aga },
              ]}
              height={120}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', textAlign: 'center', fontSize: '18px' }}>
              <div style={{ background: 'rgba(66, 129, 119, 0.1)', padding: '4px', borderRadius: '6px', color: 'var(--primary)', fontWeight: 800 }}>وفر 8.4M$ (6%)</div>
              <div style={{ background: 'rgba(66, 129, 119, 0.1)', padding: '4px', borderRadius: '6px', color: 'var(--primary)', fontWeight: 800 }}>وفر 4.4MWh (5.3%)</div>
              <div style={{ background: 'rgba(107, 31, 42, 0.1)', padding: '4px', borderRadius: '6px', color: 'var(--accent)', fontWeight: 800 }}>تسريع 24s (16.9%)</div>
            </div>
          </div>
        </RevealItem>

        {/* Step 4: Runtime Card */}
        <RevealItem visibleAtStep={4} currentStep={step} animation="fadeLeft" style={{ height: '100%' }}>
          <div style={{
            background: 'var(--accent)',
            borderRadius: '16px',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(107, 31, 42, 0.2)',
            height: '100%',
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '19px', fontWeight: 800, color: '#edebe0' }}>سرعة التقارب الخوارزمي</span>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px', fontSize: '18px', fontWeight: 800, fontFamily: 'Inter' }}>
                  BPSO vs AGA
                </span>
              </div>
              <div style={{ fontSize: '37.8px', fontWeight: 900, color: '#ffffff', fontFamily: 'Inter', lineHeight: 1, margin: '6px 0' }}>
                118s <span style={{ fontSize: '19.3px', fontWeight: 700, color: '#edebe0' }}>مقابل 142s</span>
              </div>
              <div style={{ fontSize: '18px', color: '#edebe0', lineHeight: 1.45 }}>
                BPSO أسرع بنسبة <strong>16.9%</strong> في الوصول للحل لـ 79,268 موقعاً خلوياً.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.12)', borderRadius: '10px', padding: '6px 10px', fontSize: '18px' }}>
              <span style={{ fontWeight: 800 }}>جيل الاستقرار: </span>
              BPSO الجيل 42 | AGA الجيل 78 (تقارب أسرع بـ 36 جيلاً)
            </div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 27: BPSO Strategic Gains Breakdown
// ─────────────────────────────────────────────────────────────
export const Slide27BPSOGains: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 6 });

  const gains = [
    { label: 'جودة التغطية الراديوية (SINR)', val: '+0.21%', note: '95.12% مقابل 94.91%', color: 'var(--primary)' },
    { label: 'ترشيد التكاليف الرأسمالية (CapEx)', val: 'وفر 8.4M$ (≈6%)', note: '132.8M$ مقابل 141.2M$', color: 'var(--accent)' },
    { label: 'كفاءة استهلاك الطاقة وتشغيل المحطات', val: 'وفر 5.3%', note: '78.3 MWh مقابل 82.7 MWh', color: 'var(--primary)' },
    { label: 'مؤشر العدالة المكانية SFI', val: 'قفزة نوعية +36%', note: '0.71 مقابل 0.52', color: 'var(--accent)' },
    { label: 'سرعة الإنجاز والتقارب الحسابي', val: 'تسريع 16.9%', note: '118s مقابل 142s', color: 'var(--primary)' },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="المكاسب التشغيلية لـ BPSO" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>تفصيل مكاسب الأداء</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              ماذا حققنا عملياً باعتماد خوارزمية BPSO المقترحة؟
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-6: Gains List */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 10, justifyContent: 'center', minHeight: 0, margin: '6px 0' }}>
        {gains.map((g, i) => (
          <RevealItem key={g.label} visibleAtStep={i + 2} currentStep={step} animation="fadeRight">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#ffffff',
                borderRadius: '12px',
                padding: '10px 18px',
                border: '1.5px solid rgba(66, 129, 119, 0.25)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '18.6px', fontWeight: 800, color: '#000000' }}>{g.label}</div>
              <div style={{ fontSize: '19.8px', fontWeight: 900, color: g.color, fontFamily: 'Cairo' }}>{g.val}</div>
              <div style={{ fontSize: '18px', color: '#2c3531', fontFamily: 'Inter', fontWeight: 700 }}>{g.note}</div>
            </div>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 28: Statistical Stability Across 30 Runs
// ─────────────────────────────────────────────────────────────
export const Slide28StatStability: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="الاستقرار الإحصائي عبر 30 تشغيلاً" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الموثوقية والتكرارية</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              الاستقرار الإحصائي والتكامل الخوارزمي عبر 30 تشغيلاً
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-4: 3 Column Cards */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {/* Step 2: BPSO Card */}
        <RevealItem visibleAtStep={2} currentStep={step} animation="scale" style={{ height: '100%' }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid var(--primary)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            boxShadow: '0 4px 14px rgba(66, 129, 119, 0.1)',
            height: '100%',
          }}>
            <div>
              <span style={{ fontSize: '28.8px', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Inter' }}>BPSO</span>
              <div style={{ fontSize: '18.6px', fontWeight: 800, color: '#000000', marginTop: '4px' }}>الأداء المطلق الأعلى</div>
              <div style={{ fontSize: '19px', color: '#2c3531', marginTop: '6px', lineHeight: 1.5 }}>
                يحقق أفضل متوسط للقيم وسرعة استثنائية في الوصول للحل.
              </div>
            </div>
            <div style={{ background: 'var(--primary)', color: '#ffffff', padding: '6px', borderRadius: '8px', fontSize: '18px', fontWeight: 800 }}>
              Performance Winner
            </div>
          </div>
        </RevealItem>

        {/* Step 3: AGA Card */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="scale" style={{ height: '100%' }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid var(--accent)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            boxShadow: '0 4px 14px rgba(107, 31, 42, 0.1)',
            height: '100%',
          }}>
            <div>
              <span style={{ fontSize: '28.8px', fontWeight: 900, color: 'var(--accent)', fontFamily: 'Inter' }}>AGA</span>
              <div style={{ fontSize: '18.6px', fontWeight: 800, color: '#000000', marginTop: '4px' }}>الانحراف المعياري الأدنى</div>
              <div style={{ fontSize: '19px', color: '#2c3531', marginTop: '6px', lineHeight: 1.5 }}>
                تتميز باستقرار فائق وتشتت أقل بين التشغيلات بفضل التنوع الجيني.
              </div>
            </div>
            <div style={{ background: 'var(--accent)', color: '#ffffff', padding: '6px', borderRadius: '8px', fontSize: '18px', fontWeight: 800 }}>
              Stability Winner
            </div>
          </div>
        </RevealItem>

        {/* Step 4: Integration Summary */}
        <RevealItem visibleAtStep={4} currentStep={step} animation="scale" style={{ height: '100%' }}>
          <div style={{
            background: '#ffffff',
            border: '1.5px solid rgba(66, 129, 119, 0.25)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
            height: '100%',
          }}>
            <div>
              <span style={{ fontSize: '24.8px', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Inter' }}>30 Runs</span>
              <div style={{ fontSize: '18.6px', fontWeight: 800, color: '#000000', marginTop: '4px' }}>التكامل الخوارزمي</div>
              <div style={{ fontSize: '19px', color: '#2c3531', marginTop: '6px', lineHeight: 1.5 }}>
                مرونة كاملة في الاختيار بين السرعة العالية أو الاستقرار التام.
              </div>
            </div>
            <div style={{ background: 'rgba(66, 129, 119, 0.12)', color: 'var(--primary)', padding: '6px', borderRadius: '8px', fontSize: '18px', fontWeight: 800 }}>
              Statistically Verified
            </div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 29: Statistical Significance (p-values)
// ─────────────────────────────────────────────────────────────
export const Slide29StatSignificance: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 5 });

  const stats = [
    { metric: 'جودة التغطية الراديوية (SINR)', p: 'p = 0.016', sig: 'دال إحصائياً عند مستوى 0.05' },
    { metric: 'النفقات الرأسمالية (CapEx)', p: 'p < 0.001', sig: 'دلالة إحصائية قاطعة ومؤكدة' },
    { metric: 'استهلاك الطاقة وتشغيل المحطات', p: 'p < 0.001', sig: 'دلالة إحصائية قاطعة ومؤكدة' },
    { metric: 'مؤشر العدالة المكانية (SFI)', p: 'p < 0.001', sig: 'دلالة إحصائية قاطعة ومؤكدة' },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="اختبارات الدلالة والمعنوية الإحصائية" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الإثبات الإحصائي الدقيق</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              الدلالة الإحصائية لتفوق خوارزمية BPSO المقترحة (p-values)
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-5: Stats List */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 10, justifyContent: 'center', minHeight: 0, margin: '8px 0' }}>
        {stats.map((s, i) => (
          <RevealItem key={s.metric} visibleAtStep={i + 2} currentStep={step} animation="fadeRight">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#ffffff',
                borderRadius: '12px',
                padding: '12px 20px',
                border: '1.5px solid rgba(66, 129, 119, 0.25)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '18.6px', fontWeight: 800, color: '#000000' }}>{s.metric}</div>
              <div style={{ background: 'var(--primary)', color: '#ffffff', borderRadius: '8px', padding: '4px 16px', fontSize: '19.3px', fontWeight: 900, fontFamily: 'Inter' }}>
                {s.p}
              </div>
              <div style={{ background: 'var(--accent)', color: '#ffffff', borderRadius: '6px', padding: '4px 12px', fontSize: '19px', fontWeight: 800 }}>
                ✓ {s.sig}
              </div>
            </div>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 30: Impact of Fairness Constraint
// ─────────────────────────────────────────────────────────────
export const Slide30FairnessImpact: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 3 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="أثر إدماج العدالة المكانية صراحة" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>المقارنة قبل وبعد قيد العدالة</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              أثر إدخال قيد العدالة المكانية على نتائج الترقية
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-3: Comparison Columns */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {/* Step 2: Without Fairness */}
        <RevealItem visibleAtStep={2} currentStep={step} animation="fadeRight" style={{ height: '100%' }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid var(--accent)',
            borderRadius: '16px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 14px rgba(107, 31, 42, 0.1)',
            height: '100%',
          }}>
            <div style={{ fontSize: '19.8px', fontWeight: 900, color: 'var(--accent)' }}>
              ❌ التخطيط التجاري دون قيد العدالة:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '6px' }}>
                <span style={{ color: '#000000', fontSize: '19px', fontWeight: 700 }}>مؤشر SFI لـ BPSO:</span>
                <strong style={{ color: 'var(--accent)', fontFamily: 'Inter' }}>0.42 (متدنٍ)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '6px' }}>
                <span style={{ color: '#000000', fontSize: '19px', fontWeight: 700 }}>مؤشر SFI لـ AGA:</span>
                <strong style={{ color: 'var(--accent)', fontFamily: 'Inter' }}>0.33 (متدنٍ)</strong>
              </div>
              <div style={{ fontSize: '19px', color: '#2c3531', marginTop: '4px', lineHeight: 1.45 }}>
                تتركز الترقية في مراكز المدن فقط وتُحرم المناطق الريفية تماماً من خدمات الجيل الخامس.
              </div>
            </div>
          </div>
        </RevealItem>

        {/* Step 3: With Fairness */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="fadeLeft" style={{ height: '100%' }}>
          <div style={{
            background: '#ffffff',
            border: '2px solid var(--primary)',
            borderRadius: '16px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 14px rgba(66, 129, 119, 0.1)',
            height: '100%',
          }}>
            <div style={{ fontSize: '19.8px', fontWeight: 900, color: 'var(--primary)' }}>
              ✓ نموذج الأطروحة مع قيد العدالة المكانية:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '6px' }}>
                <span style={{ color: '#000000', fontSize: '19px', fontWeight: 700 }}>مؤشر SFI لـ BPSO:</span>
                <strong style={{ color: 'var(--primary)', fontFamily: 'Inter' }}>0.71 (↑ +69%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '6px' }}>
                <span style={{ color: '#000000', fontSize: '19px', fontWeight: 700 }}>مؤشر SFI لـ AGA:</span>
                <strong style={{ color: 'var(--primary)', fontFamily: 'Inter' }}>0.52 (↑ +58%)</strong>
              </div>
              <div style={{ fontSize: '19px', color: '#2c3531', marginTop: '4px', lineHeight: 1.45 }}>
                توزيع متوازن ينصف الأرياف ويحقق 78% تغطية ريفية دون المساس بالأداء العام.
              </div>
            </div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 31: Geographic Coverage Breakdown
// ─────────────────────────────────────────────────────────────
export const Slide31GeoResults: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 3 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="التوزيع الجغرافي للخدمة" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>التغطية المكانية الفعلية</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              النتائج الجغرافية ومقارنة التغطية بين الحضر والريف
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-3: 2 Scenario Cards */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {/* Step 2: Classic */}
        <RevealItem visibleAtStep={2} currentStep={step} animation="fadeRight" style={{ height: '100%' }}>
          <div style={{ background: '#ffffff', border: '2px solid var(--accent)', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 4px 14px rgba(107, 31, 42, 0.1)', height: '100%' }}>
            <div style={{ fontSize: '19.8px', fontWeight: 900, color: 'var(--accent)', marginBottom: '10px' }}>❌ التخطيط التجاري القديم</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#000000', fontWeight: 700, fontSize: '19px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <span>تغطية المناطق الحضرية:</span>
                <strong style={{ fontFamily: 'Inter' }}>95%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <span>تغطية المناطق شبه الحضرية:</span>
                <strong style={{ fontFamily: 'Inter' }}>72%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: 'var(--accent)' }}>
                <span>تغطية المناطق الريفية والنائية:</span>
                <strong style={{ fontFamily: 'Inter' }}>45% (فجوة رقمية)</strong>
              </div>
            </div>
          </div>
        </RevealItem>

        {/* Step 3: Proposed */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="fadeLeft" style={{ height: '100%' }}>
          <div style={{ background: '#ffffff', border: '2px solid var(--primary)', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 4px 14px rgba(66, 129, 119, 0.1)', height: '100%' }}>
            <div style={{ fontSize: '19.8px', fontWeight: 900, color: 'var(--primary)', marginBottom: '10px' }}>✓ BPSO + العدالة المكانية</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#000000', fontWeight: 700, fontSize: '19px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <span>تغطية المناطق الحضرية:</span>
                <strong style={{ fontFamily: 'Inter' }}>95%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <span>تغطية المناطق شبه الحضرية:</span>
                <strong style={{ fontFamily: 'Inter', color: 'var(--primary)' }}>88% (↑ +16%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', color: 'var(--primary)' }}>
                <span>تغطية المناطق الريفية والنائية:</span>
                <strong style={{ fontFamily: 'Inter' }}>78% (↑ +33% إنصاف ريفي)</strong>
              </div>
            </div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 32: Operational Results & Emergency Isolation
// ─────────────────────────────────────────────────────────────
export const Slide32OperationalResults: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="نتائج العزل الجغرافي للخدمات" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>التحكم الميداني الآمن</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              نتائج العزل الجغرافي ودقة التنسيق الميداني
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-4: 3 Metric Cards */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {/* Step 2 */}
        <RevealItem visibleAtStep={2} currentStep={step} animation="scale" style={{ height: '100%' }}>
          <div style={{ background: '#ffffff', border: '1.5px solid rgba(66, 129, 119, 0.25)', borderRadius: '16px', padding: '18px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', height: '100%' }}>
            <div style={{ fontSize: '19px', color: '#000000', fontWeight: 800 }}>دقة العزل المكاني (حضري)</div>
            <div style={{ fontSize: '42.6px', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Inter', margin: '6px 0' }}>97.5%</div>
            <div style={{ fontSize: '18px', color: '#2c3531' }}>استهداف دقيق للخلايا داخل المضلع</div>
          </div>
        </RevealItem>

        {/* Step 3 */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="scale" style={{ height: '100%' }}>
          <div style={{ background: '#ffffff', border: '2px solid var(--accent)', borderRadius: '16px', padding: '18px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 14px rgba(107, 31, 42, 0.1)', height: '100%' }}>
            <div style={{ fontSize: '19px', color: 'var(--accent)', fontWeight: 800 }}>التسرب الراديوي (Spillover)</div>
            <div style={{ fontSize: '42.6px', fontWeight: 900, color: 'var(--accent)', fontFamily: 'Inter', margin: '6px 0' }}>&gt;46%</div>
            <div style={{ fontSize: '18px', color: '#2c3531' }}>في الخلايا الريفية الكبيرة (Macro)</div>
          </div>
        </RevealItem>

        {/* Step 4 */}
        <RevealItem visibleAtStep={4} currentStep={step} animation="scale" style={{ height: '100%' }}>
          <div style={{ background: '#ffffff', border: '1.5px solid rgba(66, 129, 119, 0.25)', borderRadius: '16px', padding: '18px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.05)', height: '100%' }}>
            <div style={{ fontSize: '19px', color: 'var(--primary)', fontWeight: 800 }}>نجاح التنسيق متعدد الموردين</div>
            <div style={{ fontSize: '42.6px', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Inter', margin: '6px 0' }}>&gt;97.4%</div>
            <div style={{ fontSize: '18px', color: '#2c3531' }}>تكامل تام مع بيئتي Huawei و Ericsson</div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 33: Multi-Vendor Performance Table
// ─────────────────────────────────────────────────────────────
export const Slide33MultiVendor: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 2 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="أداء التنسيق بين Huawei و Ericsson" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>التكامل متعدد الموردين</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              أداء التنسيق الفعلي بين تجهيزات Huawei و Ericsson
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Step 2: Table Container */}
      <RevealItem visibleAtStep={2} currentStep={step} animation="scale">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1.5px solid rgba(66, 129, 119, 0.25)', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '19px' }}>
              <thead>
                <tr style={{ background: 'var(--primary)' }}>
                  <th style={{ padding: '12px 20px', color: '#ffffff', fontWeight: 800 }}>المعيار الفني للتنسيق</th>
                  <th style={{ padding: '12px 20px', color: '#edebe0', textAlign: 'center', fontWeight: 800 }}>Huawei MML Engine</th>
                  <th style={{ padding: '12px 20px', color: '#ffffff', textAlign: 'center', fontWeight: 800 }}>Ericsson CLI Interface</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'نسبة نجاح تنفيذ أوامر التنسيق', huawei: '98.1% ± 1.1%', ericsson: '97.4% ± 1.4%' },
                  { metric: 'كبت الانتقال الخلوي (Handover Suppression)', huawei: '93.2% ± 2.0%', ericsson: '92.0% ± 2.3%' },
                  { metric: 'اتساق استعادة الخدمة التلقائية', huawei: '96.8% ± 1.5%', ericsson: '95.9% ± 1.7%' },
                ].map((r, idx) => (
                  <tr key={idx} style={{ borderTop: '1px solid rgba(66, 129, 119, 0.15)', background: idx % 2 === 0 ? 'rgba(66, 129, 119, 0.04)' : '#ffffff' }}>
                    <td style={{ padding: '12px 20px', fontWeight: 700, color: '#000000' }}>{r.metric}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'center', fontWeight: 900, color: 'var(--primary)', fontFamily: 'Inter' }}>{r.huawei}</td>
                    <td style={{ padding: '12px 20px', textAlign: 'center', fontWeight: 900, color: 'var(--accent)', fontFamily: 'Inter' }}>{r.ericsson}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </RevealItem>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 34: Restoration Times by Generation
// ─────────────────────────────────────────────────────────────
export const Slide34Restoration: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="زمن وسرعة استعادة الخدمة" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الاستجابة التشغيلية</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              زمن استعادة الخدمة التلقائية بعد انتهاء العزل
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-4: Restoration Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {[
          { gen: '2G (GSM)', time: '< 5 دقائق', desc: 'استعادة فورية لقنوات الصوت والرسائل النصية SMS', color: 'var(--primary)' },
          { gen: '3G (UMTS)', time: '< 7 دقائق', desc: 'إعادة بناء جلسات البيانات الأساسية ونطاق التغطية', color: 'var(--accent)' },
          { gen: '4G (LTE)', time: '< 10 دقائق', desc: 'مزامنة EPC واستعادة حوامل البيانات Bearers', color: 'var(--primary)' },
        ].map((g, i) => (
          <RevealItem key={i} visibleAtStep={i + 2} currentStep={step} animation="scale" style={{ height: '100%' }}>
            <div
              style={{
                background: '#ffffff',
                border: i === 1 ? '2px solid var(--accent)' : '2px solid var(--primary)',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                height: '100%',
              }}
            >
              <div style={{ fontSize: '23px', fontWeight: 900, color: g.color, fontFamily: 'Inter' }}>{g.gen}</div>
              <div style={{ fontSize: '37.8px', fontWeight: 900, color: '#000000', fontFamily: 'Cairo', margin: '8px 0' }}>{g.time}</div>
              <div style={{ fontSize: '19px', color: '#2c3531' }}>{g.desc}</div>
            </div>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 35: Strategic Meaning of Results
// ─────────────────────────────────────────────────────────────
export const Slide35ResultsMeaning: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 6 });

  const links = [
    { obj: 'جودة التغطية (SINR)', ev: '95.12%', con: 'تجاوز الهدف الاستراتيجي الوطني (95%)', color: 'var(--primary)' },
    { obj: 'ترشيد التكاليف (CapEx)', ev: '132.8 M$', con: 'وفر يفوق 62% مقارنة بإنشاء أبراج جديدة', color: 'var(--accent)' },
    { obj: 'كفاءة استهلاك الطاقة', ev: '78.3 MWh', con: 'تخفيض مثبت إحصائياً بأكثر من 38%', color: 'var(--primary)' },
    { obj: 'العدالة المكانية SFI', ev: '0.71', con: 'إنصاف حقيقي للأرياف وقفزة بنسبة +36%', color: 'var(--accent)' },
    { obj: 'العزل التشغيلي الآمن', ev: '97.5%', con: 'عزل برمجي دقيق بدون تشويش راديوي', color: 'var(--primary)' },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="04" partLabel="النتائج والإنتاج العلمي" chapter="المعنى الاستراتيجي لنتائج الأطروحة" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الخلاصة التقييمية</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              ماذا تعني نتائج البحث للمشغلين وهيئات التنظيم؟
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-6: Meaning Rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 10, justifyContent: 'center', minHeight: 0, margin: '8px 0' }}>
        {links.map((l, i) => (
          <RevealItem key={l.obj} visibleAtStep={i + 2} currentStep={step} animation="fadeRight">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 1fr 1.5fr 40px',
                alignItems: 'center',
                background: '#ffffff',
                borderRadius: '12px',
                padding: '10px 18px',
                border: '1.5px solid rgba(66, 129, 119, 0.25)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '18.6px', fontWeight: 800, color: '#000000' }}>{l.obj}</div>
              <div style={{ fontSize: '19.8px', fontWeight: 900, color: l.color, fontFamily: 'Inter', textAlign: 'center' }}>{l.ev}</div>
              <div style={{ fontSize: '19px', color: '#2c3531' }}>{l.con}</div>
              <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--primary)' }}>
                <CheckCircle2 size={18} />
              </div>
            </div>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};
