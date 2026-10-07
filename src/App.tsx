import React, { useEffect, useState } from "react";
import { preloadThesisFigures } from "./lib/assets";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigation } from "./hooks/useNavigation";
import { useKeyboard } from "./hooks/useKeyboard";
import { useFullscreen } from "./hooks/useFullscreen";
import { speakerNotes } from "./data/speakerNotes";
import { SLIDE_ORDER } from "./data/slideOrder";
import { slideRegistry } from "./data/slideRegistry";

// Layout Components
import TopBar from "./components/layout/TopBar";
import ProgressBar from "./components/layout/ProgressBar";
import Modal from "./components/ui/Modal";
import { ParchmentBackdrop } from "./components/design/ParchmentBackdrop";

const App: React.FC = () => {
  const {
    currentSlide,
    goTo,
    goNext,
    goPrev,
    goFirst,
    goLast,
    isFirst,
    isLast,
  } = useNavigation();

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  useEffect(() => {
    preloadThesisFigures();
  }, []);

  // Keyboard Navigation
  useKeyboard({
    onNext: goNext,
    onPrev: goPrev,
    onFirst: goFirst,
    onLast: goLast,
  });

  // Modal State
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Speaker Notes Drawer State
  const [showNotes, setShowNotes] = useState(false);

  const renderSlide = () => {
    const entry = SLIDE_ORDER[currentSlide] ?? SLIDE_ORDER[0];
    const render = slideRegistry[entry.id] ?? slideRegistry[SLIDE_ORDER[0].id];
    return render({ goTo, openModal: setActiveModal });
  };

  const currentNotes = speakerNotes[(SLIDE_ORDER[currentSlide] ?? SLIDE_ORDER[0]).id];

  return (
    <div className="presentation-app" dir="rtl">
      {/* Top Navigation Bar */}
      <TopBar
        currentSlide={currentSlide}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        showNotes={showNotes}
        onToggleNotes={() => setShowNotes((prev) => !prev)}
      />

      {/* Main Presentation Layout */}
      <div className="presentation-body">
        {/* Slide Stage Area */}
        <main className="presentation-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="slide-wrapper"
              initial={{ opacity: 0.86 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <ParchmentBackdrop />
              {renderSlide()}
            </motion.div>
          </AnimatePresence>

          {/* Collapsible Speaker Notes Drawer */}
          <AnimatePresence>
            {showNotes && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(237, 235, 224, 0.98)",
                  backdropFilter: "blur(10px)",
                  borderTop: "3px solid var(--accent)",
                  padding: "16px 28px",
                  zIndex: 50,
                  boxShadow: "0 -8px 24px rgba(0,0,0,0.12)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 800,
                        color: "var(--accent)",
                        fontFamily: "Cairo",
                      }}
                    >
                      ملاحظات الإلقاء للشريحة {currentSlide + 1}
                      {currentNotes ? `: ${currentNotes.title}` : ""}
                    </span>
                    {currentNotes && (
                      <span
                        style={{
                          fontSize: "11px",
                          background: "var(--primary)",
                          color: "#fff",
                          padding: "2px 8px",
                          borderRadius: "10px",
                        }}
                      >
                        الزمن المستحسن: {currentNotes.timeMinutes} دقيقة
                      </span>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
                  >
                    {currentNotes ? (
                      currentNotes.points.map((pt, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: "12px",
                            color: "var(--text-dark)",
                            fontFamily: "Cairo",
                          }}
                        >
                          • {pt}
                        </span>
                      ))
                    ) : (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(0,0,0,0.5)",
                          fontFamily: "Cairo",
                        }}
                      >
                        ركز على إبراز الأثر الهندسي للأرقام والتجانس بين النظرية
                        والتطبيق.
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowNotes(false)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(0,0,0,0.2)",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    cursor: "pointer",
                    color: "var(--text-dark)",
                  }}
                >
                  إخفاء
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Navigation & Progress Bar */}
      <ProgressBar
        currentSlide={currentSlide}
        onGoTo={goTo}
        onNext={goNext}
        onPrev={goPrev}
        isFirst={isFirst}
        isLast={isLast}
      />

      {/* Interactive Detail Modals */}
      <Modal
        isOpen={activeModal === "gis"}
        onClose={() => setActiveModal(null)}
        titleAr="تكامل نظم المعلومات الجغرافية GIS في التخطيط الراديوي"
        titleEn="GIS INTEGRATION IN CELLULAR PLANNING"
        headerColor="primary"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            lineHeight: 1.7,
            fontSize: "14px",
            color: "#000000",
          }}
        >
          <p>
            تعتمد الأطروحة على دمج بيئة <strong>ArcGIS Enterprise</strong> مع
            محركات التحسين الرياضي لتوفير نموذج مكاني واقعي متكامل:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "var(--secondary)",
                padding: "14px",
                borderRadius: "8px",
                borderRight: "4px solid var(--primary)",
                color: "#000000",
              }}
            >
              <strong>1. طبقة الارتفاعات الرقمية (DEM):</strong>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "#2c3531",
                }}
              >
                تغذية نماذج الانتشار الراديوي بمعلومات التضاريس ثلاثية الأبعاد
                لحساب الظلال والتوهين الراديوي.
              </p>
            </div>
            <div
              style={{
                background: "var(--secondary)",
                padding: "14px",
                borderRadius: "8px",
                borderRight: "4px solid var(--primary)",
                color: "#000000",
              }}
            >
              <strong>2. طبقة استخدامات الأراضي (Clutter/Land Use):</strong>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "#2c3531",
                }}
              >
                تصنيف المناطق إلى حضرية عالية الكثافة، ضواحي، زراعية، وصحراوية
                لضبط قيود التداخل بدقة.
              </p>
            </div>
            <div
              style={{
                background: "var(--secondary)",
                padding: "14px",
                borderRadius: "8px",
                borderRight: "4px solid var(--accent)",
                color: "#000000",
              }}
            >
              <strong>3. طبقة الكثافة السكانية والطلب:</strong>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "#2c3531",
                }}
              >
                تحديد أوزان دالة الهدف بناءً على تركز المشتركين المتوقع
                واحتياجات المرور في ساعات الذروة.
              </p>
            </div>
            <div
              style={{
                background: "var(--secondary)",
                padding: "14px",
                borderRadius: "8px",
                borderRight: "4px solid var(--accent)",
                color: "#000000",
              }}
            >
              <strong>4. الحدود الإدارية للمحافظات:</strong>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "#2c3531",
                }}
              >
                حساب مؤشر العدالة المكانية SFI بناءً على التوزيع الجغرافي العادل
                بين المحافظات والأرياف.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "spatial-fairness"}
        onClose={() => setActiveModal(null)}
        titleAr="الصياغة الرياضية لمؤشر العدالة المكانية SFI"
        titleEn="MATHEMATICAL FORMULATION OF SFI"
        headerColor="accent"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            lineHeight: 1.7,
            fontSize: "14px",
            color: "#000000",
          }}
        >
          <p>
            يوسّع الفصل الخامس دالة الهدف في الفصل الرابع بإضافة حد العدالة
            المكانية:
          </p>
          <div
            style={{
              background: "var(--accent)",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              fontFamily: "monospace",
              direction: "ltr",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            max F = w1·Coverage − w2·Cost − w3·Energy + w4·Fairness(x)
          </div>
          <p>ويُفرض قيد عدالة على كل منطقة جغرافية Rj:</p>
          <div
            style={{
              background: "var(--accent)",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              fontFamily: "monospace",
              direction: "ltr",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            Σ_(i∈Rj) xi ≥ αj   ∀ j
          </div>
          <p>
            يُقاس توزيع قرارات الترقية بمؤشر العدالة المكانية{" "}
            <strong>Spatial Fairness Index (SFI)</strong> المبني على مؤشر Jain
            للعدالة.
          </p>
          <div
            style={{
              background: "var(--secondary)",
              padding: "14px",
              borderRadius: "8px",
              borderRight: "4px solid var(--accent)",
              color: "#000000",
            }}
          >
            <strong>النتيجة (الجدول 26):</strong> ارتفع SFI لدى BPSO من 0.53
            بدون عدالة (S2) إلى 0.68 بعدالة جزئية (S4) ثم{" "}
            <strong>0.71</strong> بعدالة كاملة (S5)، مع تغطية 95.12%.
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "bpso"}
        onClose={() => setActiveModal(null)}
        titleAr="خوارزمية حشد الجسيمات الثنائية (BPSO) ودالة التحويل"
        titleEn="BINARY PARTICLE SWARM OPTIMIZATION (BPSO)"
        headerColor="primary"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            lineHeight: 1.7,
            fontSize: "14px",
            color: "#000000",
          }}
        >
          <p>
            تتميز BPSO بتمثيل قرارات ترقية المواقع كمتجه ثنائي{" "}
            <em>x_i ∈ {"{0, 1}"}^N</em>:
          </p>
          <div
            style={{
              background: "var(--primary)",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              fontFamily: "monospace",
              direction: "ltr",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            v_i^(t+1) = w * v_i^t + c_1 * r_1 * (pbest_i - x_i^t) + c_2 * r_2 *
            (gbest - x_i^t)
            <br />
            <br />
            S(v_i^(t+1)) = 1 / ( 1 + exp(-v_i^(t+1)) )<br />
            <br />
            x_i^(t+1) = 1 if rand() &lt; S(v_i^(t+1)) else 0
          </div>
          <div
            style={{
              background: "var(--secondary)",
              padding: "14px",
              borderRadius: "8px",
              borderRight: "4px solid var(--primary)",
              color: "#000000",
            }}
          >
            <strong>
              مشغل إصلاح القيود التكيفي (Constraint Repair Operator):
            </strong>{" "}
            يُطبَّق على كل حل بعد كل عملية تحديث. عند تجاوز الميزانية B تُزال
            مواقع، وعند عدم بلوغ الحد الأدنى للتغطية Cmin تُضاف مواقع، ثم يُعاد
            تقييم الحل قبل تحديث pBest وgBest.
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "aga"}
        onClose={() => setActiveModal(null)}
        titleAr="الخوارزمية الجينية التكيفية (Adaptive GA)"
        titleEn="ADAPTIVE GENETIC ALGORITHM (AGA)"
        headerColor="accent"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            lineHeight: 1.7,
            fontSize: "14px",
            color: "#000000",
          }}
        >
          <p>
            تطوّر AGA مجتمعاً من 150 حلاً ثنائياً عبر 300 جيل، بانتقاء البطولة
            وتقاطع ثنائي النقطة ومعدل طفرة يتناقص عبر الأجيال (الجدول 4):
          </p>
          <div
            style={{
              background: "var(--accent)",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              fontFamily: "monospace",
              direction: "ltr",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Tournament k = 3 &nbsp;·&nbsp; Two-Point Crossover = 0.85
            <br />
            P_m = 0.08 (t &lt; T/3) &nbsp;→&nbsp; P_m = 0.02 (t ≥ 2T/3)
          </div>
          <p>
            يمر كل جيل بآلية إصلاح القيود المشتركة نفسها المستخدمة مع BPSO. وفي
            الفصل الرابع أظهرت AGA استقراراً أعلى، مع زمن تنفيذ 142 ثانية مقابل
            118 ثانية لـ BPSO (الجدول 13).
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "orchestration"}
        onClose={() => setActiveModal(null)}
        titleAr="معمارية العزل التنسيقية متعددة الموردين (Multi-Vendor Orchestration)"
        titleEn="MULTI-VENDOR ISOLATION ORCHESTRATION"
        headerColor="primary"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            lineHeight: 1.7,
            fontSize: "14px",
            color: "#000000",
          }}
        >
          <p>
            يربط إطار التنسيق قرار GIS ببيئات الإدارة لدى Huawei وEricsson عبر
            طبقة تجريد ومحوّلات خاصة بكل مورد. وتصفه الأطروحة بأنه{" "}
            <strong>منهجية تنسيق متعددة الموردين</strong> وليس بنية تحكم
            موحّدة كاملة:
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                background: "var(--secondary)",
                padding: "12px",
                borderRadius: "8px",
                borderRight: "4px solid var(--primary)",
                color: "#000000",
              }}
            >
              <strong>نجاح التنسيق:</strong> 98.1% ± 1.1% لـ Huawei و 97.4% ±
              1.4% لـ Ericsson (الجدول 33).
            </div>
            <div
              style={{
                background: "var(--secondary)",
                padding: "12px",
                borderRadius: "8px",
                borderRight: "4px solid var(--accent)",
                color: "#000000",
              }}
            >
              <strong>كفاءة قمع التسليم (Handover Suppression):</strong> 93.2%
              لـ Huawei و 92.0% لـ Ericsson (الجدول 33).
            </div>
            <div
              style={{
                background: "var(--secondary)",
                padding: "12px",
                borderRadius: "8px",
                borderRight: "4px solid var(--primary)",
                color: "#000000",
              }}
            >
              <strong>زمن الاستعادة:</strong> أقل من 5 دقائق لـ 2G، و7 دقائق لـ
              3G، و10 دقائق لـ 4G (الجدول 34)، ويزداد مع تعقيد تقنية الوصول.
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
