import React from 'react';
import { sections, sectionBySlideIndex, TOTAL_SLIDES } from '../../data/slidesConfig';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ProgressBarProps {
  currentSlide: number;
  onGoTo: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentSlide,
  onGoTo,
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
  const currentSection = sectionBySlideIndex(currentSlide);
  const progressPercent = ((currentSlide + 1) / TOTAL_SLIDES) * 100;

  const mainSections = sections.filter((s) => s.id !== 'cover');

  return (
    <footer className="progress-bar-container" dir="rtl" aria-label="شريط تقدم العرض السفلي">
      {/* Prev Arrow */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        aria-label="الشريحة السابقة"
        className="nav-btn"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: isFirst ? 'rgba(237, 235, 224, 0.08)' : 'rgba(237, 235, 224, 0.18)',
          border: '1px solid rgba(237, 235, 224, 0.25)',
          color: isFirst ? 'rgba(237, 235, 224, 0.3)' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isFirst ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Section Progress Bar (Research Timeline) */}
      <div
        style={{
          flex: '1 1 auto',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          minWidth: 0,
          maxWidth: '1400px',
        }}
      >
        {mainSections.map((section) => {
          // If on cover, section 'intro' is marked as the initial research stage
          const isSectionActive =
            currentSection?.id === section.id ||
            (currentSection?.id === 'cover' && section.id === 'intro');

          const sectionProgress =
            section.slides.length > 0
              ? section.slides.filter((s) => s <= currentSlide).length / section.slides.length
              : 0;

          return (
            <div
              key={section.id}
              id={`footer-section-${section.id}`}
              role="button"
              tabIndex={0}
              style={{
                flex: isSectionActive ? '1.35 1 auto' : '1 1 auto',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                cursor: 'pointer',
                padding: '6px 10px',
                borderRadius: '10px',
                position: 'relative',
                background: isSectionActive
                  ? 'linear-gradient(135deg, rgba(107, 31, 42, 0.95) 0%, rgba(77, 21, 30, 0.95) 100%)'
                  : 'rgba(0, 0, 0, 0.16)',
                border: isSectionActive
                  ? '1.5px solid rgba(255, 215, 0, 0.75)'
                  : '1px solid rgba(237, 235, 224, 0.14)',
                boxShadow: isSectionActive
                  ? '0 4px 16px rgba(107, 31, 42, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 0 10px rgba(255, 215, 0, 0.25)'
                  : 'none',
                transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onClick={() => {
                if (section.slides.length > 0) onGoTo(section.slides[0]);
              }}
              title={`الانتقال إلى: ${section.titleAr}`}
            >
              {/* Section Header: Number Badge & Title Label */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {/* Section Number Pill */}
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 900,
                    padding: '2px 7px',
                    borderRadius: '6px',
                    background: isSectionActive ? '#ffd700' : 'rgba(237, 235, 224, 0.2)',
                    color: isSectionActive ? '#4d151e' : 'rgba(237, 235, 224, 0.85)',
                    letterSpacing: '0.5px',
                    lineHeight: '1.2',
                    flexShrink: 0,
                  }}
                >
                  {section.number}
                </span>

                {/* Section Title */}
                <span
                  style={{
                    fontSize: isSectionActive ? '16px' : '15px',
                    fontFamily: 'Cairo, sans-serif',
                    color: isSectionActive ? '#ffffff' : 'rgba(237, 235, 224, 0.75)',
                    fontWeight: isSectionActive ? 800 : 600,
                    letterSpacing: '0.2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textShadow: isSectionActive ? '0 1px 4px rgba(0, 0, 0, 0.6)' : 'none',
                  }}
                >
                  {section.titleAr}
                </span>
              </div>

              {/* Progress Track */}
              <div
                style={{
                  height: isSectionActive ? '5px' : '4px',
                  background: isSectionActive
                    ? 'rgba(0, 0, 0, 0.4)'
                    : 'rgba(237, 235, 224, 0.18)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${sectionProgress * 100}%`,
                    background: isSectionActive
                      ? 'linear-gradient(90deg, #ffd700, #ffffff)'
                      : 'rgba(237, 235, 224, 0.65)',
                    borderRadius: '3px',
                    boxShadow: isSectionActive ? '0 0 10px rgba(255, 215, 0, 0.9)' : 'none',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress Percentage Badge */}
      <div
        style={{
          fontSize: '16px',
          fontWeight: 800,
          fontFamily: 'Inter, monospace, sans-serif',
          color: '#ffffff',
          minWidth: '58px',
          textAlign: 'center',
          direction: 'ltr',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(237, 235, 224, 0.3)',
          padding: '5px 10px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0.5px',
        }}
      >
        {Math.round(progressPercent)}%
      </div>

      {/* Next Arrow */}
      <button
        onClick={onNext}
        disabled={isLast}
        aria-label="الشريحة التالية"
        className="nav-btn"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: isLast ? 'rgba(237, 235, 224, 0.08)' : 'rgba(237, 235, 224, 0.18)',
          border: '1px solid rgba(237, 235, 224, 0.25)',
          color: isLast ? 'rgba(237, 235, 224, 0.3)' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isLast ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronLeft size={22} />
      </button>
    </footer>
  );
};

export default ProgressBar;
