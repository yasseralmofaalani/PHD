import React from 'react';
import { Maximize2, Minimize2, BookOpen } from 'lucide-react';
import { sectionBySlideIndex, TOTAL_SLIDES } from '../../data/slidesConfig';
import { assetUrl } from '../../lib/assets';

interface TopBarProps {
  currentSlide: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  showNotes: boolean;
  onToggleNotes: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  currentSlide,
  isFullscreen,
  onToggleFullscreen,
  showNotes,
  onToggleNotes,
}) => {
  const section = sectionBySlideIndex(currentSlide);
  const slideNum = String(currentSlide + 1).padStart(2, '0');
  const totalNum = String(TOTAL_SLIDES).padStart(2, '0');

  return (
    <header className="topbar" dir="rtl" aria-label="شريط التنقل العلوي">
      {/* Right: Institute Name */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flex: '0 0 auto',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}>
          <img
            src={assetUrl("hiast-logo.png")}
            alt="HIAST Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div>
          <div style={{
            color: 'rgba(237,235,224,0.95)',
            fontSize: '16px',
            fontFamily: 'Cairo, sans-serif',
            fontWeight: 700,
            lineHeight: 1.2,
          }}>
            المعهد العالي للعلوم التطبيقية والتكنولوجيا
          </div>
          <div style={{
            color: 'rgba(237,235,224,0.5)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}>
            Higher Institute for Applied Sciences and Technology
          </div>
        </div>
      </div>

      {/* Center: Current Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        overflow: 'hidden',
        padding: '0 24px',
      }}>
        {section && section.id !== 'cover' && (
          <>
            <span style={{
              color: 'var(--secondary)',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              background: 'rgba(107,31,42,0.3)',
              padding: '4px 12px',
              borderRadius: '20px',
              flexShrink: 0,
            }}>
              {section.number}
            </span>
            <span style={{
              color: 'rgba(237,235,224,0.9)',
              fontSize: '17px',
              fontFamily: 'Cairo, sans-serif',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {section.titleAr}
            </span>
          </>
        )}
      </div>

      {/* Left: Controls + Slide Counter */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flex: '0 0 auto',
      }}>
        {/* Slide Counter & Micro Progress Bar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          minWidth: '78px',
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '18px',
            color: 'rgba(237,235,224,0.9)',
            letterSpacing: '0.8px',
            textAlign: 'center',
            direction: 'ltr',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: '3px',
          }}>
            <span style={{ color: '#ffd700', fontSize: '24px', fontWeight: 800 }}>{slideNum}</span>
            <span style={{ color: 'rgba(237,235,224,0.4)', fontSize: '16px' }}>/</span>
            <span style={{ color: 'rgba(237,235,224,0.6)', fontSize: '16px' }}>{totalNum}</span>
          </div>
          {/* Micro Progress Bar Line */}
          <div style={{
            width: '100%',
            height: '3px',
            background: 'rgba(237, 235, 224, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%`,
              background: 'linear-gradient(90deg, #ffd700, #edebe0)',
              borderRadius: '2px',
              boxShadow: '0 0 6px rgba(255, 215, 0, 0.7)',
              transition: 'width 0.35s ease-out',
            }} />
          </div>
        </div>

        {/* Notes Toggle */}
        <button
          onClick={onToggleNotes}
          aria-label="ملاحظات المقدم"
          aria-pressed={showNotes}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: showNotes ? 'rgba(237,235,224,0.25)' : 'rgba(237,235,224,0.1)',
            border: '1px solid rgba(237,235,224,0.25)',
            color: 'rgba(237,235,224,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <BookOpen size={18} />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? 'الخروج من وضع العرض الكامل' : 'وضع العرض الكامل'}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: isFullscreen ? 'rgba(237,235,224,0.25)' : 'rgba(237,235,224,0.1)',
            border: '1px solid rgba(237,235,224,0.25)',
            color: 'rgba(237,235,224,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
