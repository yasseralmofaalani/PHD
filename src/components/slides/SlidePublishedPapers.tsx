import React from 'react';
import { motion } from 'framer-motion';
import SlideBreadcrumb from '../ui/SlideBreadcrumb';
import RevealItem, { StepIndicator } from '../ui/RevealItem';
import { useStepReveal } from '../../hooks/useStepReveal';
import { publications } from '../../data/thesisData';
import { BookOpen, CheckCircle2, Clock, Award, FileText, ExternalLink, Sparkles } from 'lucide-react';

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

export const SlidePublishedPapers: React.FC = () => {
  const { step, totalSteps, goToStep } = useStepReveal({ totalSteps: 5 });

  return (
    <div className="slide" dir="rtl" style={darkSlideStyle}>
      <div style={techGridStyle} />
      <SlideBreadcrumb
        part="04"
        partLabel="النتائج والإنتاج العلمي"
        chapter="المقالات والأوراق العلمية المنشورة"
      />

      {/* Step 1: Header */}
      <RevealItem visibleAtStep={1} currentStep={step} animation="fadeUp">
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--accent)' }}>الإنتاج العلمي المحكم دولياً</span>
            </div>
            <h1 style={{ fontSize: 'clamp(27.3px, 2.93vw, 37.8px)', fontWeight: 900, color: '#000000', margin: 0 }}>
              الأوراق والمقالات العلمية المنبثقة عن الأطروحة
            </h1>
          </div>
          <StepIndicator totalSteps={totalSteps} currentStep={step} onStepClick={goToStep} />
        </div>
      </RevealItem>

      {/* Steps 2-4: Publications Cards List */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', position: 'relative', zIndex: 10, minHeight: 0, margin: '8px 0' }}>
        {publications.map((p, idx) => {
          const badgeColor =
            p.status === 'published'
              ? 'var(--primary)'
              : p.status === 'accepted'
                ? 'var(--primary)'
                : 'var(--accent)';
          const StatusIcon =
            p.status === 'published'
              ? CheckCircle2
              : p.status === 'accepted'
                ? Award
                : Clock;

          return (
            <RevealItem key={idx} visibleAtStep={idx + 2} currentStep={step} animation="fadeRight">
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  border:
                    p.status === 'final_decision'
                      ? '1.5px solid rgba(107, 31, 42, 0.35)'
                      : '1.5px solid rgba(66, 129, 119, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: badgeColor,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <BookOpen size={24} />
                  </div>

                  <div>
                    <div style={{ fontSize: '18.6px', fontWeight: 800, color: '#000000', lineHeight: 1.4, fontFamily: 'Inter, Cairo' }}>
                      {p.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                      {p.journal ? (
                        <>
                          <span style={{ fontSize: '19px', color: badgeColor, fontWeight: 900, fontFamily: 'Inter' }}>
                            {p.journal}
                          </span>
                          <span style={{ fontSize: '18px', color: 'rgba(0,0,0,0.3)' }}>•</span>
                        </>
                      ) : null}
                      <span style={{ fontSize: '18px', color: '#2c3531', fontFamily: 'Inter', fontWeight: 600 }}>{p.year}</span>
                      <span style={{ fontSize: '18px', color: 'rgba(0,0,0,0.3)' }}>•</span>
                      <span style={{ fontSize: '18px', color: '#2c3531', fontFamily: 'Inter' }}>{p.authors}</span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: badgeColor,
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '18px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                  }}
                >
                  <StatusIcon size={14} />
                  <span>{p.statusLabelAr}</span>
                  <span style={{ opacity: 0.85, fontFamily: 'Inter' }}>({p.statusLabelEn})</span>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </div>

      {/* Step 5: Summary Footer */}
      <RevealItem visibleAtStep={5} currentStep={step} animation="fadeUp">
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
            <Award size={20} color="#edebe0" />
            <span style={{ fontSize: '19px', fontWeight: 700, color: '#ffffff' }}>
              الإنتاجية العلمية: مقالات محكمة مفهرسة في Scopus و Web of Science تغطي جميع مساهمات الأطروحة النظرية والتطبيقية.
            </span>
          </div>
          <span style={{ fontSize: '18px', background: 'rgba(255,255,255,0.2)', padding: '3px 10px', borderRadius: '12px', fontWeight: 800 }}>
            Q1 / Indexed
          </span>
        </div>
      </RevealItem>
    </div>
  );
};

export default SlidePublishedPapers;
