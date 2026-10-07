import React from 'react';
import { sections, sectionBySlideIndex } from '../../data/slidesConfig';
import { assetUrl } from '../../lib/assets';
import type { SectionId } from '../../types';

interface SidebarProps {
  currentSlide: number;
  onGoTo: (index: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSlide, onGoTo }) => {
  const currentSection = sectionBySlideIndex(currentSlide);

  const mainSections = sections.filter(s => s.id !== 'cover' && s.id !== 'references');

  const handleSectionClick = (sectionId: SectionId) => {
    const section = sections.find(s => s.id === sectionId);
    if (section && section.slides.length > 0) {
      onGoTo(section.slides[0]);
    }
  };

  return (
    <nav className="sidebar" aria-label="التنقل في العرض" dir="rtl">
      {/* Logo Area */}
      <div style={{
        padding: '20px 16px',
        borderBottom: '1px solid rgba(237, 235, 224, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}>
        {/* Official Institute Logo */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '14px',
          background: 'rgba(255, 255, 255, 0.96)',
          border: '2px solid rgba(212, 175, 55, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          flexShrink: 0,
        }}>
          <img
            src={assetUrl("hiast-logo.png")}
            alt="HIAST Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: 'rgba(237,235,224,0.95)',
            fontSize: '11px',
            lineHeight: '1.4',
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 700,
          }}>
            المعهد العالي للعلوم<br />التطبيقية والتكنولوجيا
          </div>
          <div style={{
            color: 'rgba(212, 175, 55, 0.85)',
            fontSize: '9px',
            fontFamily: 'Inter, sans-serif',
            marginTop: '2px',
            fontWeight: 700,
            letterSpacing: '1px',
          }}>
            HIAST
          </div>
        </div>
      </div>

      {/* Navigation Sections */}
      <div style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {mainSections.map((section) => {
          const isActive = currentSection?.id === section.id;
          return (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id as SectionId)}
              aria-current={isActive ? 'true' : undefined}
              style={{
                width: '100%',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                cursor: 'pointer',
                border: 'none',
                textAlign: 'right',
                background: isActive ? 'var(--secondary)' : 'transparent',
                color: isActive ? 'var(--text-dark)' : 'rgba(237,235,224,0.85)',
                transition: 'all 0.25s ease',
                borderRight: isActive ? '4px solid var(--accent)' : '4px solid transparent',
                borderLeft: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(237,235,224,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  opacity: 0.7,
                  minWidth: '24px',
                  color: isActive ? 'var(--accent)' : 'inherit',
                }}>
                  {section.number}
                </span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  fontFamily: 'Cairo, sans-serif',
                  lineHeight: 1.3,
                }}>
                  {section.titleAr}
                </span>
              </div>
              <div style={{
                fontSize: '9px',
                fontFamily: 'Inter, sans-serif',
                opacity: 0.55,
                paddingRight: '32px',
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}>
                {section.titleEn}
              </div>
            </button>
          );
        })}

        {/* References */}
        <button
          onClick={() => {
            const refSection = sections.find(s => s.id === 'references');
            if (refSection) onGoTo(refSection.slides[0]);
          }}
          style={{
            width: '100%',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            cursor: 'pointer',
            border: 'none',
            textAlign: 'right',
            background: currentSection?.id === 'references' ? 'var(--secondary)' : 'transparent',
            color: currentSection?.id === 'references' ? 'var(--text-dark)' : 'rgba(237,235,224,0.85)',
            transition: 'all 0.25s ease',
            borderRight: currentSection?.id === 'references' ? '4px solid var(--accent)' : '4px solid transparent',
            borderLeft: 'none',
          }}
          onMouseEnter={(e) => {
            if (currentSection?.id !== 'references') {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(237,235,224,0.12)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentSection?.id !== 'references') {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 700, opacity: 0.7, minWidth: '24px' }}>06</span>
            <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'Cairo' }}>المراجع</span>
          </div>
          <div style={{ fontSize: '9px', fontFamily: 'Inter', opacity: 0.55, paddingRight: '32px', fontWeight: 500 }}>
            REFERENCES
          </div>
        </button>
      </div>

      {/* Bottom: Thesis Info */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(237, 235, 224, 0.15)',
        fontSize: '10px',
        color: 'rgba(237,235,224,0.5)',
        fontFamily: 'Cairo, sans-serif',
        textAlign: 'center',
        lineHeight: 1.5,
      }}>
        <div style={{ fontWeight: 600 }}>ياسر المفعلاني</div>
        <div style={{ fontFamily: 'Inter', fontSize: '9px', marginTop: '2px' }}>دمشق — 2026</div>
      </div>
    </nav>
  );
};

export default Sidebar;
