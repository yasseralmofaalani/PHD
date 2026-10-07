import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleAr: string;
  titleEn?: string;
  headerColor?: 'primary' | 'accent';
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  titleAr,
  titleEn,
  headerColor = 'primary',
  children,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          dir="rtl"
          role="dialog"
          aria-modal="true"
          aria-label={titleAr}
        >
          <motion.div
            className="modal-box"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className={`modal-header ${headerColor}`}>
              <div>
                <h2 style={{
                  fontSize: '22px',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 800,
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {titleAr}
                </h2>
                {titleEn && (
                  <p style={{
                    fontSize: '13px',
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgba(255,255,255,0.7)',
                    margin: '4px 0 0 0',
                  }}>
                    {titleEn}
                  </p>
                )}
              </div>
              <button
                className="modal-close-btn"
                onClick={onClose}
                aria-label="إغلاق"
                style={{ marginRight: '0', marginLeft: '16px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
