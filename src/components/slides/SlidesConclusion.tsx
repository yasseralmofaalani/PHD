import React from 'react';
import { motion } from 'framer-motion';
import SlideBreadcrumb from '../ui/SlideBreadcrumb';
import RevealItem, { StepIndicator } from '../ui/RevealItem';
import { useStepReveal } from '../../hooks/useStepReveal';
import { publications } from '../../data/thesisData';
import {
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Zap,
  Layers,
  Activity,
  Server,
  Network,
  Cpu,
  Radio,
  FileText,
  Check
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
// Slide 36: Summary of Findings & Thesis Harvest
// ─────────────────────────────────────────────────────────────
export const Slide36Summary: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 6 });

  const pillars = [
    {
      num: '01',
      title: 'نموذج التحسين الرياضي متعدد الأهداف',
      result: 'توازن أمثلي: تغطية 95.12%، كلفة 132.8M$، وطاقة 78.3 MWh لـ 79,268 موقعاً.',
      tag: 'التغطية والكفاءة',
      color: 'var(--primary)',
    },
    {
      num: '02',
      title: 'تفوق BPSO الموثّق إحصائياً',
      result: 'تفوق قاطع (p < 0.001) في التكلفة والطاقة والعدالة وسرعة التقارب (118s).',
      tag: 'التفوق الخوارزمي',
      color: 'var(--accent)',
    },
    {
      num: '03',
      title: 'مؤشر العدالة المكانية SFI',
      result: 'رفع المؤشر من 0.52 إلى 0.71 بنسبة +36%، مانعاً تركز 5G في المدن فقط.',
      tag: 'الإنصاف الرقمي',
      color: 'var(--primary)',
    },
    {
      num: '04',
      title: 'معمارية العزل الجغرافي الخالية من التشويش',
      result: 'دقة مكانية 97.5% في المدن، مع استعادة سريعة وآمنة دون الإضرار بالطيف.',
      tag: 'التحكم الآمن',
      color: 'var(--accent)',
    },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="05" partLabel="الخاتمة والآفاق المستقبلية" chapter="حصاد الأطروحة والنتائج الجوهرية" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الخلاصة التنفيذية</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              حصاد الأطروحة والنتائج الجوهرية
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-5: 4 Pillars Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {pillars.map((p, i) => (
          <RevealItem key={p.num} visibleAtStep={i + 2} currentStep={step} animation="scale">
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '16px 20px',
                border: '1.5px solid rgba(66, 129, 119, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                height: '100%',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ background: p.color, color: '#ffffff', borderRadius: '8px', padding: '2px 10px', fontSize: '18px', fontWeight: 900, fontFamily: 'Inter' }}>
                    المحور {p.num}
                  </span>
                  <span style={{ fontSize: '18px', color: '#2c3531', fontWeight: 700 }}>{p.tag}</span>
                </div>
                <div style={{ fontSize: '19.1px', fontWeight: 900, color: '#000000', marginBottom: '6px' }}>{p.title}</div>
                <div style={{ fontSize: '19px', color: '#2c3531', lineHeight: 1.5 }}>{p.result}</div>
              </div>
              <div style={{ height: '3px', background: p.color, borderRadius: '2px', marginTop: '10px' }} />
            </div>
          </RevealItem>
        ))}
      </div>

      {/* Step 6: Summary Footer */}
      <RevealItem visibleAtStep={6} currentStep={step} animation="fadeUp">
        <div style={{
          background: 'var(--primary)',
          borderRadius: '12px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 10,
          color: '#ffffff',
          boxShadow: '0 4px 14px rgba(66, 129, 119, 0.25)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={20} color="#edebe0" />
            <span style={{ fontSize: '19px', fontWeight: 700, color: '#ffffff' }}>
              الاستخلاص الأكاديمي: أثبتت الأطروحة إمكانية الارتقاء بالشبكة الخلوية الوطنية بأقل التكاليف وبأعلى معايير العدالة المكانية.
            </span>
          </div>
          <span style={{ fontSize: '18px', background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '12px', fontWeight: 800 }}>
            Proven Feasibility
          </span>
        </div>
      </RevealItem>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 37: Scientific & Applied Value
// ─────────────────────────────────────────────────────────────
export const Slide37Value: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 3 });

  const scientific = [
    { t: 'دمج GIS في دالة الهدف والقيود', d: 'الانتقال من النظريات التجريدية إلى الفضاء الجغرافي الواقعي' },
    { t: 'تأسيس مؤشر عدالة مكاني جديد (SFI)', d: 'صياغة رياضية جديدة لعدالة توزيع الترددات رقمياً' },
    { t: 'التحقق على 79,268 موقعاً حقيقياً', d: 'سد الفجوة بين الأبحاث النظرية وواقع الشبكات الوطنية' },
  ];

  const applied = [
    { t: 'خارطة طريق ترقية واقعية للمشغلين', d: 'تحديد دقيق للمواقع ذات الأولوية للانتقال لـ 5G بأقل كلفة' },
    { t: 'وفورات استثمارية وتشغيلية ضخمة', d: 'وفر >62% في كلفة الترقية وخفض استهلاك الطاقة بنسبة 38%' },
    { t: 'أداة قرار وطنية للهيئة الناظمة', d: 'منصة لمراقبة التغطية والعدالة وتوجيه الخدمة الرقمية' },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="05" partLabel="الخاتمة والآفاق المستقبلية" chapter="القيمة المضافة الأكاديمية والصناعية" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الأثر العلمي والتطبيقي</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              القيمة المضافة للأطروحة: بين الأكاديميا والصناعة
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-3: 2 Column Cards */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {/* Step 2: Scientific Value */}
        <RevealItem visibleAtStep={2} currentStep={step} animation="fadeRight" style={{ height: '100%' }}>
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
            <div>
              <div style={{ fontSize: '19.8px', fontWeight: 900, color: 'var(--primary)', marginBottom: '10px' }}>
                🔬 القيمة العلمية والأكاديمية:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {scientific.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 900 }}>✓</span>
                    <div>
                      <strong style={{ fontSize: '19px', color: '#000000' }}>{item.t}: </strong>
                      <span style={{ fontSize: '19px', color: '#2c3531' }}>{item.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealItem>

        {/* Step 3: Applied Value */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="fadeLeft" style={{ height: '100%' }}>
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
            <div>
              <div style={{ fontSize: '19.8px', fontWeight: 900, color: 'var(--accent)', marginBottom: '10px' }}>
                🏭 القيمة التطبيقية والصناعية:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {applied.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 900 }}>✓</span>
                    <div>
                      <strong style={{ fontSize: '19px', color: '#000000' }}>{item.t}: </strong>
                      <span style={{ fontSize: '19px', color: '#2c3531' }}>{item.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 38: Scientific Limitations & Scope
// ─────────────────────────────────────────────────────────────
export const Slide38Limitations: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  const limitations = [
    {
      title: 'نماذج الانتشار الراديوي شبه التجريبية',
      desc: 'اعتماد Okumura-Hata و Cost-231 مع تصحيحات طوبوغرافية لسرعة الحساب',
      impact: 'دقة ممتازة على المستوى الوطني مع هامش خطأ راديوي متوقع.',
    },
    {
      title: 'ديناميكية حركة المشتركين والحمولات',
      desc: 'استخدام مصفوفات حركة ساعات الذروة المجمعة بدلاً من التتبع اللحظي الفردي',
      impact: 'النموذج يركز على التخطيط الاستراتيجي والتحكم الوسيط.',
    },
    {
      title: 'الاعتماد على واجهات الإدارة (OSS/EMS)',
      desc: 'تتطلب معمارية العزل تكاملاً برمجياً عبر واجهات موحدة تختلف حسب الجيل',
      impact: 'تم التحقق بنجاح على بيئتي Huawei و Ericsson.',
    },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="05" partLabel="الخاتمة والآفاق المستقبلية" chapter="الحدود والافتراضات العلمية" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>النزاهة والشفافية الأكاديمية</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              حدود البحث والافتراضات العلمية
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-4: Limitations List */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 10, justifyContent: 'center', minHeight: 0, margin: '8px 0' }}>
        {limitations.map((lim, i) => (
          <RevealItem key={lim.title} visibleAtStep={i + 2} currentStep={step} animation="fadeRight">
            <div
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '12px 18px',
                border: '1.5px solid rgba(66, 129, 119, 0.25)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                display: 'grid',
                gridTemplateColumns: '200px 1fr 180px',
                gap: '14px',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '18.6px', fontWeight: 800, color: '#000000' }}>{lim.title}</div>
              <div style={{ fontSize: '19px', color: '#2c3531', lineHeight: 1.45 }}>{lim.desc}</div>
              <div style={{ background: 'rgba(66, 129, 119, 0.1)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(66, 129, 119, 0.25)' }}>
                <div style={{ fontSize: '18px', color: 'var(--primary)', fontWeight: 800 }}>الأثر العلمي:</div>
                <div style={{ fontSize: '18px', color: '#000000', marginTop: '2px', fontWeight: 700 }}>{lim.impact}</div>
              </div>
            </div>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 39: Practical & Regulatory Recommendations
// ─────────────────────────────────────────────────────────────
export const Slide39Recommendations: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 3 });

  const recsOperators = [
    'اعتماد خوارزميات BPSO في خطط ترقية الأبراج لخفض نفقات CAPEX بنسبة >62%.',
    'تطبيق الترقية الانتقائية Co-siting للمواقع القائمة قبل البناء الجديد.',
    'تفعيل سياسات التحكم الراديوي البرمجي للعزل الجغرافي في الطوارئ.',
  ];

  const recsRegulators = [
    'إلزام المشغلين بمعايير العدالة المكانية (SFI) لضمان عدم حرمان الأرياف.',
    'تأسيس قاعدة بيانات GIS وطنية مركزية موحدة للبنية التحتية الراديوية.',
    'وضع أطر تنظيمية للتحكم الجغرافي بالخدمات دون اللجوء للتشويش.',
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="05" partLabel="الخاتمة والآفاق المستقبلية" chapter="التوصيات العملية والتنظيمية" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>خريطة الطريق التنفيذية</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              التوصيات العملية لقطاع الاتصالات الوطني
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-3: 2 Recommendations Columns */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {/* Step 2: Operators */}
        <RevealItem visibleAtStep={2} currentStep={step} animation="fadeRight" style={{ height: '100%' }}>
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
            <div>
              <div style={{ fontSize: '19.8px', fontWeight: 900, color: 'var(--primary)', marginBottom: '10px' }}>
                📡 توصيات لمشغلي الاتصالات (Syriatel و MTN):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recsOperators.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 800 }}>✓</span>
                    <span style={{ fontSize: '19px', color: '#2c3531', lineHeight: 1.45 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealItem>

        {/* Step 3: Regulators */}
        <RevealItem visibleAtStep={3} currentStep={step} animation="fadeLeft" style={{ height: '100%' }}>
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
            <div>
              <div style={{ fontSize: '19.8px', fontWeight: 900, color: 'var(--accent)', marginBottom: '10px' }}>
                🏛️ توصيات للهيئة الناظمة للاتصالات والبريد:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {recsRegulators.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 800 }}>✓</span>
                    <span style={{ fontSize: '19px', color: '#2c3531', lineHeight: 1.45 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 40: Future Research Work
// ─────────────────────────────────────────────────────────────
export const Slide40FutureWork: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  const directions = [
    {
      title: 'التعلم المعزز العميق (DRL)',
      desc: 'نماذج ذكاء صنعي تكيفية لضبط زوايا الميل (Tilt) والقدرة اللحظية ذاتياً.',
      horizon: 'قصير المدى (1 - 2 سنة)',
      color: 'var(--primary)',
    },
    {
      title: 'التوأمة الرقمية للشبكة (Digital Twin)',
      desc: 'بناء توأم رقمي 3D للبيئة العمرانية لاختبار الكوارث والترقيات.',
      horizon: 'متوسط المدى (2 - 3 سنوات)',
      color: 'var(--accent)',
    },
    {
      title: 'التكامل مع الأقمار الصناعية (NTN)',
      desc: 'دمج شبكات LEO ومنصات HAPS لتأمين تغطية 100% لكامل البادية.',
      horizon: 'طويل المدى (3 - 5 سنوات)',
      color: 'var(--primary)',
    },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="05" partLabel="الخاتمة والآفاق المستقبلية" chapter="آفاق البحث والتطوير المستقبلي" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الامتداد العلمي للأطروحة</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              آفاق البحث والتطوير المستقبلي
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-4: 3 Future Directions */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {directions.map((d, i) => (
          <RevealItem key={d.title} visibleAtStep={i + 2} currentStep={step} animation="scale" style={{ height: '100%' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '18px',
                border: '1.5px solid rgba(66, 129, 119, 0.25)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <div>
                <span style={{ background: d.color, color: '#ffffff', borderRadius: '8px', padding: '2px 8px', fontSize: '18px', fontWeight: 800 }}>
                  {d.horizon}
                </span>
                <div style={{ fontSize: '19.1px', fontWeight: 900, color: '#000000', margin: '8px 0 4px' }}>{d.title}</div>
                <div style={{ fontSize: '19px', color: '#2c3531', lineHeight: 1.5 }}>{d.desc}</div>
              </div>
              <div style={{ height: '3px', background: d.color, borderRadius: '2px', marginTop: '10px' }} />
            </div>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 41: Vision Beyond 5G → 6G
// ─────────────────────────────────────────────────────────────
export const Slide41To6G: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  const concepts = [
    { title: 'الأسطح الراديوية القابلة لإعادة التشكيل (RIS)', desc: 'تحويل البيئة إلى عنصر نشط يعكس ويوجه الإشارات لتجاوز عوائق التضاريس.', tag: 'RIS Technology', color: 'var(--primary)' },
    { title: 'الشبكات غير المقيدة بالخلايا (Cell-Free)', desc: 'إلغاء حدود الخلايا والتنسيق التام بين آلاف الهوائيات الموزعة جغرافياً.', tag: 'Cell-Free MIMO', color: 'var(--accent)' },
    { title: 'الشبكات ذاتية الإدارة بالكامل (ZTM)', desc: 'أتمتة دورة حياة الشبكة كاملة من التخطيط والمعايرة إلى معالجة الأعطال.', tag: 'Zero-Touch', color: 'var(--primary)' },
  ];

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="05" partLabel="الخاتمة والآفاق المستقبلية" chapter="الرؤية المستقبلية نحو 6G" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الجيل القادم من الاتصالات</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              نحو الجيل السادس (6G) والشبكات ذاتية التحكم
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-4: 3 Concepts */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {concepts.map((c, i) => (
          <RevealItem key={c.title} visibleAtStep={i + 2} currentStep={step} animation="scale" style={{ height: '100%' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '18px',
                border: '1.5px solid rgba(66, 129, 119, 0.25)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <div>
                <span style={{ background: c.color, color: '#ffffff', borderRadius: '8px', padding: '2px 8px', fontSize: '18px', fontWeight: 800, fontFamily: 'Inter' }}>
                  {c.tag}
                </span>
                <div style={{ fontSize: '19.1px', fontWeight: 900, color: '#000000', margin: '8px 0 4px' }}>{c.title}</div>
                <div style={{ fontSize: '19px', color: '#2c3531', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
              <div style={{ height: '3px', background: c.color, borderRadius: '2px', marginTop: '10px' }} />
            </div>
          </RevealItem>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 42: Final Defense Message
// ─────────────────────────────────────────────────────────────
export const Slide42FinalMessage: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 2 });

  return (
    <div className="slide" dir="rtl" style={{
      ...darkSlideStyle,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="05" partLabel="الخاتمة والآفاق المستقبلية" chapter="الرسالة الختامية للدفاع" />

      <RevealItem visibleAtStep={1} currentStep={step} animation="scale">
        <div
          style={{
            maxWidth: '920px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px',
            position: 'relative',
            zIndex: 10,
            background: '#ffffff',
            padding: '32px 40px',
            borderRadius: '24px',
            border: '2px solid var(--primary)',
            boxShadow: '0 8px 30px rgba(66, 129, 119, 0.12)',
          }}
        >
          <div style={{
            background: 'var(--primary)',
            borderRadius: '50px',
            padding: '6px 22px',
            color: '#ffffff',
            fontSize: '19px',
            fontWeight: 800,
          }}>
            الخلاصة الجوهرية لأطروحة الدكتوراه
          </div>

          <h1 style={{ fontSize: 'clamp(24.8px, 3.17vw, 37.8px)', fontWeight: 900, color: '#000000', lineHeight: 1.6, margin: 0 }}>
            "إن التخطيط الراديوي المدعوم بالمعلومات الجغرافية ليس مجرد مسألة تحسين رياضي، بل هو جسر وطني يربط الكفاءة الاقتصادية بالعدالة الرقمية والسيادة التقنية."
          </h1>

          <div style={{ width: '80px', height: '4px', background: 'var(--accent)', borderRadius: '2px' }} />

          <p style={{ fontSize: '19.1px', color: '#2c3531', lineHeight: 1.7, maxWidth: '780px', margin: 0 }}>
            أثبتت هذه الأطروحة إمكانية الارتقاء بالبنية التحتية الخلوية للجمهورية العربية السورية، وتحقيق أداء يضاهي المعايير العالمية حتى في ظل أقسى القيود الاستثمارية والتشغيلية.
          </p>

          <div style={{ color: 'var(--accent)', fontSize: '19.3px', fontWeight: 800 }}>
            ياسر المفعلاني — المعهد العالي للعلوم التطبيقية والتكنولوجيا — دمشق 2026
          </div>
        </div>
      </RevealItem>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide 43: Thank You & Defense Conclusion
// ─────────────────────────────────────────────────────────────
export const Slide43ThankYou: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 2 });

  return (
    <div className="slide" dir="rtl" style={{
      ...darkSlideStyle,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <div style={techGridStyle} />

      <RevealItem visibleAtStep={1} currentStep={step} animation="scale">
        <div
          style={{
            maxWidth: '850px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: '51.5px' }}>🎓</span>

          <h1 style={{ fontSize: 'clamp(31.2px, 4.39vw, 53.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
            شكراً لحسن استماعكم واهتمامكم
          </h1>

          <p style={{ fontSize: 'clamp(19.3px, 1.95vw, 23px)', color: 'var(--accent)', fontWeight: 800, margin: 0 }}>
            أتقدم بجزيل الشكر والامتنان لأعضاء لجنة الحكم الموقرة والأساتذة المشرفين
          </p>

          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '20px 36px',
            border: '2px solid var(--primary)',
            boxShadow: '0 8px 24px rgba(66, 129, 119, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '380px',
          }}>
            <div style={{ fontSize: '21.8px', fontWeight: 900, color: 'var(--primary)' }}>
              ياسر المفعلاني
            </div>
            <div style={{ fontSize: '19px', color: '#2c3531' }}>
              المعهد العالي للعلوم التطبيقية والتكنولوجيا — دمشق 2026
            </div>
            <div style={{
              marginTop: '4px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(66, 129, 119, 0.2)',
              fontSize: '18.6px',
              fontWeight: 800,
              color: 'var(--accent)',
            }}>
            </div>
          </div>
        </div>
      </RevealItem>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Slide References
// ─────────────────────────────────────────────────────────────
export const SlideReferences: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 4 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb part="06" partLabel="المراجع" chapter="قائمة المنشورات والمراجع المختارة" />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>التوثيق العلمي</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              المنشورات والمراجع العلمية الأساسية
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-4: References */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 10, justifyContent: 'center', minHeight: 0, margin: '8px 0' }}>
        <div style={{ fontSize: '18.6px', fontWeight: 800, color: '#000000' }}>
          أوراق الأطروحة المنشورة وقيد النشر:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {publications.map((p, idx) => (
            <RevealItem key={idx} visibleAtStep={idx + 2} currentStep={step} animation="fadeRight">
              <div style={{ background: '#ffffff', borderRadius: '12px', padding: '10px 18px', border: '1.5px solid rgba(66, 129, 119, 0.25)', borderRight: '5px solid var(--primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '19px', fontWeight: 600, color: '#2c3531', fontFamily: 'Inter', direction: 'ltr', textAlign: 'left' }}>
                  [{idx + 1}] {p.authors} ({p.year}). "{p.title}".
                  {p.journal ? (
                    <>
                      {' '}
                      <em>{p.journal}</em>
                      {p.volume ? `, Vol. ${p.volume}, Article ${p.articleNumber}. DOI: ${p.doi}` : ''}
                    </>
                  ) : (
                    <> Status: {p.statusLabelEn}.</>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </div>
  );
};
