"""
build_axis_05.py
Generates the standalone PowerPoint presentation for Axis 05: Conclusion & Future Outlook
(Slides 59 to 72) of Eng. Yasser Almofaalani's PhD Defense at HIAST.

Strictly follows:
- Dynamic Anti-Monotony Design System & Master Prompt Engine
- 16 Architectural Layout Archetypes
- Official Color Palette & Typography
- Fixed Header & Footer Architecture
- Complete Spoken Defense Speaker Scripts & Notes
"""

import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ==============================================================================
# 1. OFFICIAL COLOR PALETTE & DESIGN SYSTEM CONSTANTS
# ==============================================================================
COLOR_DEEP_TEAL  = RGBColor(66, 129, 119)     # #428177 - Primary Brand Teal
COLOR_DARK_TEAL  = RGBColor(20, 55, 50)       # #143732 - Dark Executive Teal
COLOR_BURGUNDY   = RGBColor(107, 31, 42)      # #6B1F2A - Secondary Academic Burgundy
COLOR_DARK_SLATE = RGBColor(15, 23, 42)       # #0F172A - Deep Slate Background
COLOR_SLATE_CARD = RGBColor(30, 41, 59)       # #1E293B - Dark Mode Card
COLOR_LIGHT_BG   = RGBColor(246, 248, 250)    # #F6F8FA - Clean warm off-white canvas
COLOR_WHITE      = RGBColor(255, 255, 255)    # Pure White Card Fill
COLOR_TEXT_DARK  = RGBColor(15, 23, 42)       # #0F172A - Body Text Dark
COLOR_TEXT_MUTED = RGBColor(100, 116, 139)    # #64748B - Muted Subtitle Text
COLOR_BORDER     = RGBColor(226, 232, 240)    # #E2E8F0 - Subtle Border Slate
COLOR_GOLD       = RGBColor(217, 119, 6)       # #D97706 - Highlight Gold
COLOR_EMERALD    = RGBColor(16, 185, 129)     # #10B981 - Functional Emerald
COLOR_BLUE       = RGBColor(37, 99, 235)      # #2563EB - Functional Tech Blue

FONT_TITLE = "Segoe UI"
FONT_BODY  = "Segoe UI"

SECTION_NAME = "المحور الخامس: الخاتمة والآفاق المستقبلية"
TOTAL_SLIDES = 73

# ==============================================================================
# 2. CORE HELPER FUNCTIONS
# ==============================================================================

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.500)
    return prs

def set_slide_background(slide, prs, color):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    return bg

def add_header(slide, title_ar, section_name=SECTION_NAME, dark=False):
    # Top breadcrumb badge
    tb_badge = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.7), Inches(0.35))
    tf_b = tb_badge.text_frame
    tf_b.word_wrap = True
    p_b = tf_b.paragraphs[0]
    p_b.text = f"المعهد العالي للعلوم التطبيقية والتكنولوجيا  |  {section_name}"
    p_b.font.name = FONT_BODY
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = COLOR_GOLD if dark else COLOR_DEEP_TEAL
    p_b.alignment = PP_ALIGN.RIGHT

    # Main Title
    tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.7), Inches(0.75))
    tf_t = tb_title.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = title_ar
    p_t.font.name = FONT_TITLE
    p_t.font.size = Pt(22)
    p_t.font.bold = True
    p_t.font.color.rgb = COLOR_WHITE if dark else COLOR_TEXT_DARK
    p_t.alignment = PP_ALIGN.RIGHT

def add_footer(slide, current_num, total_slides=TOTAL_SLIDES, dark=False):
    tb_footer = slide.shapes.add_textbox(Inches(0.8), Inches(6.92), Inches(11.7), Inches(0.35))
    tf = tb_footer.text_frame
    p = tf.paragraphs[0]
    p.text = f"أطروحة دكتوراه: التخطيط والتحكم الذكي بالشبكات الخلوية في بيئة GIS  —  ياسر المفعلاني   |   شريحة {current_num} من {total_slides}"
    p.font.name = FONT_BODY
    p.font.size = Pt(9.5)
    p.font.color.rgb = RGBColor(148, 163, 184) if dark else COLOR_TEXT_MUTED
    p.alignment = PP_ALIGN.RIGHT

def set_speaker_notes(slide, title, time_minutes, speech_script, defense_qa=None):
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    tf.clear()

    p0 = tf.paragraphs[0]
    p0.text = f"=== {title} (الزمن المقترح: {time_minutes}) ==="
    p0.font.bold = True

    p_spk_header = tf.add_paragraph()
    p_spk_header.text = "\n[سيناريو الإلقاء الدفاعي الرصين]:"
    p_spk_header.font.bold = True

    p_spk = tf.add_paragraph()
    p_spk.text = speech_script

    if defense_qa:
        p_qa_header = tf.add_paragraph()
        p_qa_header.text = "\n[بنك الأسئلة المتوقعة والدفاع المسند]:"
        p_qa_header.font.bold = True
        for qa in defense_qa:
            p_qa = tf.add_paragraph()
            p_qa.text = f"• {qa}"

def add_card(slide, left, top, width, height, title, items,
             bg_color=COLOR_WHITE, border_color=COLOR_BORDER,
             title_color=COLOR_DEEP_TEAL, is_dark=False, border_width=1.5):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width)
    else:
        shape.line.fill.background()

    tb = slide.shapes.add_textbox(left + Inches(0.18), top + Inches(0.15), width - Inches(0.36), height - Inches(0.3))
    tf = tb.text_frame
    tf.word_wrap = True

    if title:
        p_title = tf.paragraphs[0]
        p_title.text = title
        p_title.font.name = FONT_TITLE
        p_title.font.size = Pt(14)
        p_title.font.bold = True
        p_title.font.color.rgb = title_color
        p_title.alignment = PP_ALIGN.RIGHT
        p_title.space_after = Pt(6)

    first = False if title else True
    for item in items:
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        p.text = f"• {item}" if not item.startswith("•") else item
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.color.rgb = RGBColor(226, 232, 240) if is_dark else COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_after = Pt(4)

    return shape

# ==============================================================================
# 3. SLIDE BUILDERS (SLIDES 59 TO 72)
# ==============================================================================

def build_slide_59(prs):
    """Slide 59: Dark Academic Section Marker"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_DARK_SLATE)
    add_header(slide, "الخاتمة والآفاق المستقبلية: تكامل الركائز البحثية", dark=True)
    add_footer(slide, 59, dark=True)

    # Main Section Banner
    banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(11.7), Inches(1.1))
    banner.fill.solid()
    banner.fill.fore_color.rgb = COLOR_SLATE_CARD
    banner.line.color.rgb = COLOR_GOLD
    banner.line.width = Pt(2)
    tf_b = banner.text_frame
    tf_b.word_wrap = True
    p1 = tf_b.paragraphs[0]
    p1.text = "المحور الخامس: الخاتمة والتوليف البحثي والآفاق المستقبلية"
    p1.font.name = FONT_TITLE
    p1.font.size = Pt(18)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_GOLD
    p1.alignment = PP_ALIGN.CENTER

    p2 = tf_b.add_paragraph()
    p2.text = "CONCLUSION, COMPREHENSIVE RESEARCH SYNTHESIS & FUTURE OUTLOOK"
    p2.font.name = FONT_BODY
    p2.font.size = Pt(11)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_DEEP_TEAL
    p2.alignment = PP_ALIGN.CENTER

    # 3 Pillars Cards on Dark Background
    pillars = [
        {
            "title": "المحور الأول (PLAN) — التخطيط الأمثلي لـ 5G",
            "border": COLOR_DEEP_TEAL,
            "items": [
                "حل مسألة التحسين متعدد الأهداف لترقية 79,268 موقعاً خلوياً.",
                "تحقيق تغطية راديوية 95.12% عبر خوارزمية BPSO الهجينة.",
                "خفض كلفة الترقية الرأسمالية بنسبة 6% (توفير 8.4 مليون دولار).",
                "ترشيد 5.3% من استهلاك الطاقة الكهربائية السنوية (78.3 MWh)."
            ]
        },
        {
            "title": "المحور الثاني (FAIR) — العدالة المكانية (SFI)",
            "border": COLOR_GOLD,
            "items": [
                "صياغة مؤشر العدالة المكانية (SFI) كقيد ملزم في دالة الهدف.",
                "قفزة نوعية في عدالة التوزيع الجغرافي بنسبة +36.5% (0.71).",
                "شمول كافة المحافظات الـ 14 ومنع تركز 82% من الترددات في المدن.",
                "إنصاف سكان الأرياف دون أي تراجع في نسبة التغطية الكلية."
            ]
        },
        {
            "title": "المحور الثالث (CONTROL) — التحكم متعدد الموردين",
            "border": COLOR_BURGUNDY,
            "items": [
                "معمارية عزل مكاني برمجية دقيقة بنسبة 97.5% في المدن الكثيفة.",
                "تنسيق مؤتمت بنسبة >97.4% بين معدات Huawei و Ericsson المتنافرة.",
                "حماية الطيف الوطني وإلغاء الحاجة لأجهزة التشويش الراديوي.",
                "استرجاع تشغيلي آمن ومتدرج للخدمة في أقل من 10 دقائق."
            ]
        }
    ]

    card_w = 3.7
    gap = 0.3
    for idx, p in enumerate(pillars):
        left = Inches(0.8 + idx * (card_w + gap))
        add_card(slide, left, Inches(2.9), Inches(card_w), Inches(2.85),
                 p["title"], p["items"],
                 bg_color=COLOR_SLATE_CARD, border_color=p["border"],
                 title_color=p["border"], is_dark=True, border_width=2)

    # Bottom Unified Ribbon / Hub
    hub = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.95), Inches(11.7), Inches(0.8))
    hub.fill.solid()
    hub.fill.fore_color.rgb = COLOR_DARK_TEAL
    hub.line.color.rgb = COLOR_GOLD
    hub.line.width = Pt(1.5)
    tf_h = hub.text_frame
    tf_h.word_wrap = True
    p_h1 = tf_h.paragraphs[0]
    p_h1.text = "منظومة وطنية متكاملة للإدارة الذكية والواعية مكانياً للشبكات الخلوية: [ PLAN ⟶ FAIR ⟶ CONTROL ]"
    p_h1.font.name = FONT_TITLE
    p_h1.font.size = Pt(13)
    p_h1.font.bold = True
    p_h1.font.color.rgb = COLOR_WHITE
    p_h1.alignment = PP_ALIGN.CENTER

    p_h2 = tf_h.add_paragraph()
    p_h2.text = "توليف هندسي يوحد التخطيط طويل الأجل، والعدالة الاجتماعية، والسيادة التشغيلية على كامل الجغرافيا السورية"
    p_h2.font.name = FONT_BODY
    p_h2.font.size = Pt(10)
    p_h2.font.color.rgb = COLOR_GOLD
    p_h2.alignment = PP_ALIGN.CENTER

    # Speaker Notes
    notes_script = (
        "السادة رئيس وأعضاء لجنة الحكم الموقرة، أصل معكم الآن إلى القسم الخامس والأخير من هذا الدفاع الأكاديمي: "
        "الخاتمة والآفاق المستقبلية.\n\n"
        "خلال الفصول السابقة، سرنا في رحلة علمية متدرجة بدأت من حيرة التخطيط الهندسي لشبكات الجيل الخامس في ظل موارد محدودة، "
        "وتعمقت في صياغة مفهوم العدالة المكانية لسكان الأرياف والمحافظات النامية، ثم امتدت ميدانياً لابتكار آلية تحكم تشغيلي "
        "تعزل الخدمة جغرافياً وتنسق بين الموردين دون إطلاق واط واحد من التشويش اللاسلكي.\n\n"
        "اليوم، أقف أمامكم لأؤكد أن هذه المحاور الثلاثة ليست أبحاثاً مجزأة، بل هي منظومة هندسية وطنية واحدة متكاملة نختصرها بشعار "
        "الأطروحة: PLAN, FAIR, CONTROL. فلا كفاءة في التشغيل دون تخطيط رياضي، ولا قبول وطنياً دون عدالة في التوزيع، ولا سيادة أو "
        "أمان للشبكة دون تحكم تشغيلي لحظي قابل للاسترجاع."
    )
    set_speaker_notes(slide, "مدخل المحور الخامس: تكامل الركائز البحثية الثلاث", "1:00 - 1:15 دقيقة", notes_script)


def build_slide_60(prs):
    """Slide 60: 3D Architecture Stack (التوليف النهائي)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "التركيب البحثي الشامل: من التخطيط إلى التحكم البرمجي")
    add_footer(slide, 60)

    # Right side: 3 Ascending Stacked Layers (width: 7.2)
    layers = [
        {
            "num": "المرحلة 03",
            "title": "التحكم التشغيلي الميداني والتنسيق متعدد الموردين (Field Control)",
            "color": COLOR_BURGUNDY,
            "items": [
                "المسألة: كيف نترجم مضلعات GIS إلى تحكم تشغيلي لحظي آمن في قلب الشبكة؟",
                "المخرجات: دقة عزل حضري 97.5%، وتنسيق مشترك >97.4% بين Huawei و Ericsson.",
                "الأثر: حماية الطيف الوطني واسترجاع تدريجي كامل للخدمة في أقل من 10 دقائق."
            ]
        },
        {
            "num": "المرحلة 02",
            "title": "دمج العدالة المكانية في التخطيط (Spatial Fairness Integration - SFI)",
            "color": COLOR_GOLD,
            "items": [
                "المسألة: هل الحل الأمثلي تجارياً عادل جغرافياً واجتماعياً لكافة المحافظات؟",
                "المخرجات: إدراج SFI >= Threshold، قفزة العدالة بنسبة +36.5% (0.52 إلى 0.71).",
                "الأثر: شمول 14 محافظة سورية دون التضحية بالتغطية المستقرة عند 95.12%."
            ]
        },
        {
            "num": "المرحلة 01",
            "title": "هندسة القرار والتخطيط الأمثلي لـ 5G (Engineering Decision & Optimization)",
            "color": COLOR_DEEP_TEAL,
            "items": [
                "المسألة: أين نضع معدات 5G NSA وبأي كلفة لترقية 79,268 موقعاً؟",
                "المخرجات: تغطية 95.12%، كلفة 132.8M$، وفر 8.4M$، وترشيد 5.3% طاقة.",
                "الأثر: تفوق BPSO على AGA بزمن حسابي 118 ثانية وبدلالة إحصائية p < 0.001."
            ]
        }
    ]

    layer_top_start = 1.8
    layer_h = 1.5
    layer_gap = 0.15
    for idx, lay in enumerate(layers):
        top = Inches(layer_top_start + idx * (layer_h + layer_gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(7.2), Inches(layer_h))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = lay["color"]
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(Inches(0.95), top + Inches(0.1), Inches(6.9), Inches(layer_h - 0.2))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = f"[{lay['num']}]  {lay['title']}"
        p0.font.name = FONT_TITLE
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = lay["color"]
        p0.alignment = PP_ALIGN.RIGHT
        p0.space_after = Pt(3)

        for it in lay["items"]:
            p = tf.add_paragraph()
            p.text = f"• {it}"
            p.font.name = FONT_BODY
            p.font.size = Pt(10.5)
            p.font.color.rgb = COLOR_TEXT_DARK
            p.alignment = PP_ALIGN.RIGHT
            p.space_after = Pt(2)

    # Left side: Analytical Inspection Panel (width: 4.2, height: 4.8)
    side = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.3), Inches(1.8), Inches(4.2), Inches(4.8))
    side.fill.solid()
    side.fill.fore_color.rgb = COLOR_DARK_SLATE
    side.line.color.rgb = COLOR_DEEP_TEAL
    side.line.width = Pt(2)

    tb_s = slide.shapes.add_textbox(Inches(8.45), Inches(1.95), Inches(3.9), Inches(4.5))
    tf_s = tb_s.text_frame
    tf_s.word_wrap = True

    ps0 = tf_s.paragraphs[0]
    ps0.text = "حتمية الانتقال وحلقة التحكم المغلقة"
    ps0.font.name = FONT_TITLE
    ps0.font.size = Pt(15)
    ps0.font.bold = True
    ps0.font.color.rgb = COLOR_GOLD
    ps0.alignment = PP_ALIGN.RIGHT
    ps0.space_after = Pt(10)

    points = [
        ("حتمية هندسية:", "الانتقال من مرحلة لأخرى فُرض بواقع الشبكة؛ فالتخطيط الرياضي وحده ينتج حلولاً غير عادلة ريفياً، والعدالة دون تحكم تشغيلي تترك الشبكة عاجزة في الطوارئ."),
        ("التوليف المعماري:", "دمج التخطيط الاستراتيجي مع التحكم الميداني اللحظي في بيئة GIS أوجد معمارية مغلقة الحلقة (Closed-Loop) تجمع الثابت والديناميكي."),
        ("حلقة السيطرة:", "MONITOR (رصد لحظي) ⟶ OPTIMIZE (تحسين BPSO/SFI) ⟶ CONTROL (تنسيق الموردين) ⟶ RESTORE (استرجاع آمن)."),
        ("الشعار والنتيجة:", "CLOSED-LOOP AUTOMATION: منظومة إدارة مؤتمتة ومغلقة تدير دورة حياة الشبكة بالكامل دون انقطاع.")
    ]

    for title_pt, desc_pt in points:
        p_t = tf_s.add_paragraph()
        p_t.text = f"■ {title_pt}"
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_WHITE
        p_t.alignment = PP_ALIGN.RIGHT
        p_t.space_after = Pt(2)

        p_d = tf_s.add_paragraph()
        p_d.text = desc_pt
        p_d.font.name = FONT_BODY
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = RGBColor(203, 213, 225)
        p_d.alignment = PP_ALIGN.RIGHT
        p_d.space_after = Pt(6)

    # Speaker Notes
    notes_script = (
        "لو نظرنا إلى مسار الأطروحة بنظرة تركيبية، لوجدنا أن الانتقال من مرحلة إلى أخرى كان حتمية هندسية تفرضها متطلبات الواقع.\n\n"
        "بدأنا في المرحلة الأولى بهندسة القرار: كيف نرقي 79,268 موقعاً بأعلى كفاءة طيفية واقتصادية؟ أثبتت BPSO كفاءتها بخفض 6% من الميزانية "
        "و 5.3% من الطاقة. لكن التوقف هنا كان سينتج شبكة غير عادلة تتركز في دمشق وحلب وتهمل باقي القطر.\n\n"
        "من هنا انبثقت المرحلة الثانية: إدخال البعد الجغرافي والعدالة المكانية عبر مؤشر SFI كقيد ملزم، لنضمن أن الترقية تنصف المحافظات "
        "النامية دون أن نخسر نسبة التغطية الكلية التي حافظت على استقرارها عند 95.12%.\n\n"
        "ثم جاء التساؤل الميداني الحاسم للمرحلة الثالثة: ما فائدة التخطيط إذا كانت الشبكة تفقد استقرارها في الأزمات وتعتمد على حلول "
        "تشويش عشوائية؟ فابتكرنا طبقة التحكم البرمجية عبر نظم GIS، لتتحول مضلعات الخريطة إلى أوامر عزل وتنسيق متعدد الموردين تُنفَّذ "
        "في دقائق وتُسترجع بضغطة زر.\n\n"
        "هكذا اكتملت الحلقة: لا انفصال بين التخطيط والتشغيل؛ بل إدارة مؤتمتة ومغلقة تدير دورة حياة الشبكة الخلوية بالكامل."
    )
    set_speaker_notes(slide, "التركيب البحثي الشامل: من التخطيط إلى التحكم البرمجي", "1:30 دقيقة", notes_script)


def build_slide_61(prs):
    """Slide 61: Triangular Prism Balance (المساهمات في ميزان الأثر)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "المساهمات الثلاث في ميزان الأثر العلمي والتطبيقي")
    add_footer(slide, 61)

    # Central Equilibrium Core (Top)
    core = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(3.666), Inches(1.8), Inches(6.0), Inches(1.3))
    core.fill.solid()
    core.fill.fore_color.rgb = COLOR_DARK_SLATE
    core.line.color.rgb = COLOR_GOLD
    core.line.width = Pt(2)
    tf_c = core.text_frame
    tf_c.word_wrap = True

    pc0 = tf_c.paragraphs[0]
    pc0.text = "نقطة الاتزان والتوليف المعرفي الشامل (Triangular Equilibrium)"
    pc0.font.name = FONT_TITLE
    pc0.font.size = Pt(13)
    pc0.font.bold = True
    pc0.font.color.rgb = COLOR_GOLD
    pc0.alignment = PP_ALIGN.CENTER

    pc1 = tf_c.add_paragraph()
    pc1.text = "تكامل GIS + AI + Multi-Vendor Orchestration في إطار وطني موحد"
    pc1.font.name = FONT_BODY
    pc1.font.size = Pt(11)
    pc1.font.bold = True
    pc1.font.color.rgb = COLOR_WHITE
    pc1.alignment = PP_ALIGN.CENTER

    pc2 = tf_c.add_paragraph()
    pc2.text = "إجابة حاسمة ومبرهنة لكل سؤال مصيري من أسئلة البحث الثلاثة"
    pc2.font.name = FONT_BODY
    pc2.font.size = Pt(10)
    pc2.font.color.rgb = COLOR_DEEP_TEAL
    pc2.alignment = PP_ALIGN.CENTER

    # 3 Pillar Cards below (Width: 3.7 each)
    cards_data = [
        {
            "tag": "CONTRIB 01: PLAN",
            "title": "المساهمة 1: التخطيط الأمثلي",
            "border": COLOR_DEEP_TEAL,
            "q": "أين يجب ترقية الشبكة جغرافياً لتحقيق التوازن بين التغطية والكلفة واستهلاك الطاقة؟",
            "items": [
                "خوارزمية BPSO المعدلة مع تقنية إصلاح القيود التكيفية.",
                "تغطية 95.12% لـ 30,010 موقعاً مرقى من أصل 79,268.",
                "توفير مالي 8.4M$ وترشيد 5.3% من استهلاك الطاقة.",
                "الشكل المرجعي: شكل 18 (Pareto Frontier & Upgrade Map)."
            ]
        },
        {
            "tag": "CONTRIB 02: FAIR",
            "title": "المساهمة 2: العدالة المكانية",
            "border": COLOR_GOLD,
            "q": "هل الشبكة المثلى رياضياً وتجارياً عادلة بالضرورة لكافة فئات المجتمع والمناطق؟",
            "items": [
                "ابتكار وتضمين مؤشر العدالة المكانية SFI في دالة الهدف.",
                "قفزة نوعية بنسبة +36.5% في مؤشر العدالة (0.52 إلى 0.71).",
                "منع تركز 82% من الترددات في المدن الكبرى وإنصاف الأرياف.",
                "الشكل المرجعي: شكل 24 (Fair Geographic Distribution)."
            ]
        },
        {
            "tag": "CONTRIB 03: CONTROL",
            "title": "المساهمة 3: التحكم البرمجي",
            "border": COLOR_BURGUNDY,
            "q": "كيف نتحكم بالخدمات ونعزلها جغرافياً في بيئة متعددة الموردين دون تشويش؟",
            "items": [
                "محرك التقاطع المكاني GIS مع بوابات التنسيق المعتمدة.",
                "دقة عزل مكاني 97.5% في البيئات الحضرية الكثيفة.",
                "تنسيق مؤتمت مشترك >97.4% (Huawei 98.1%, Ericsson 97.4%).",
                "الشكل المرجعي: شكل 31 (Spatial Multi-Vendor Control)."
            ]
        }
    ]

    card_w = 3.7
    gap = 0.3
    for idx, c in enumerate(cards_data):
        left = Inches(0.8 + idx * (card_w + gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(3.3), Inches(card_w), Inches(3.45))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = c["border"]
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(left + Inches(0.15), Inches(3.4), Inches(card_w - 0.3), Inches(3.25))
        tf = tb.text_frame
        tf.word_wrap = True

        p_tag = tf.paragraphs[0]
        p_tag.text = c["tag"]
        p_tag.font.name = FONT_BODY
        p_tag.font.size = Pt(9.5)
        p_tag.font.bold = True
        p_tag.font.color.rgb = c["border"]
        p_tag.alignment = PP_ALIGN.RIGHT

        p_t = tf.add_paragraph()
        p_t.text = c["title"]
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_TEXT_DARK
        p_t.alignment = PP_ALIGN.RIGHT
        p_t.space_after = Pt(4)

        p_q = tf.add_paragraph()
        p_q.text = f"«{c['q']}»"
        p_q.font.name = FONT_BODY
        p_q.font.size = Pt(9.5)
        p_q.font.bold = True
        p_q.font.color.rgb = COLOR_BURGUNDY if c["border"] != COLOR_BURGUNDY else COLOR_DEEP_TEAL
        p_q.alignment = PP_ALIGN.RIGHT
        p_q.space_after = Pt(6)

        for it in c["items"]:
            p_it = tf.add_paragraph()
            p_it.text = f"• {it}"
            p_it.font.name = FONT_BODY
            p_it.font.size = Pt(10)
            p_it.font.color.rgb = COLOR_TEXT_DARK
            p_it.alignment = PP_ALIGN.RIGHT
            p_it.space_after = Pt(3)

    # Speaker Notes
    notes_script = (
        "أمام حضراتكم الآن اللوحة الشاملة التي تجسد المساهمات البحثية الثلاث للأطروحة، حيث يقف كل عمود ليرد بشكل قاطع "
        "ومبرهن على سؤال هندسي محدد.\n\n"
        "المساهمة الأولى أجابت: أين نرقي؟ من خلال خارطة المواقع المرشحة وشكل 18، التي وفرت 8.4 مليون دولار و 5.3% من الطاقة الكهربائية السنوية.\n\n"
        "المساهمة الثانية طرحت التساؤل الأخلاقي والتنموي: هل الشبكة المثلى عادلة؟ وكان الجواب لا، إلا إذا فرضنا قيد SFI كما يوضح شكل 24، "
        "لنرفع عدالة التوزيع بنسبة 36.5% ونحمي المناطق الريفية من الإقصاء الرقمي.\n\n"
        "المساهمة الثالثة تصدت للتحدي السيادي والتشغيلي: كيف نتحكم بالشبكة ونعزلها مكانياً عند الطوارئ؟ وجاء الجواب في شكل 31 عبر "
        "خوارزميات التقاطع المضلعي مع خلايا المحطات في قلب الشبكة، محققين عزلاً بنسبة 97.5% دون تلويث الطيف بالتشويش.\n\n"
        "وهكذا نرى أن القاسم المشترك الذي يجمع هذه الإجابات الثلاث هو نظم المعلومات الجغرافية GIS، والتحسين الرياضي الهجين، والتحكم البرمجي الموحد."
    )
    set_speaker_notes(slide, "المساهمات الثلاث في ميزان الأثر العلمي والتطبيقي", "1:30 دقيقة", notes_script)


def build_slide_62(prs):
    """Slide 62: Asymmetric Bento Grid (الخلاصات الاستراتيجية)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "ما الذي أثبته البحث علمياً وبالأرقام الدقيقة؟")
    add_footer(slide, 62)

    # Bento Grid Layout:
    # 1. Hero Card (Main Left/Right: Width: 5.6, Height: 4.8)
    hero = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    hero.fill.solid()
    hero.fill.fore_color.rgb = COLOR_WHITE
    hero.line.color.rgb = COLOR_DEEP_TEAL
    hero.line.width = Pt(2)

    tb_h = slide.shapes.add_textbox(Inches(0.95), Inches(1.95), Inches(5.3), Inches(4.5))
    tf_h = tb_h.text_frame
    tf_h.word_wrap = True

    ph0 = tf_h.paragraphs[0]
    ph0.text = "الحصاد الكمي الشامل للشبكة الوطنية (79,268 موقعاً)"
    ph0.font.name = FONT_TITLE
    ph0.font.size = Pt(14)
    ph0.font.bold = True
    ph0.font.color.rgb = COLOR_DEEP_TEAL
    ph0.alignment = PP_ALIGN.RIGHT
    ph0.space_after = Pt(8)

    hero_stats = [
        ("95.12%", "نسبة التغطية الراديوية الإجمالية المثلى", "تفوق BPSO على AGA بنسبة +0.21% بدلالة إحصائية p = 0.016", COLOR_EMERALD),
        ("-6.0% / $8.4M", "تخفيض كلفة الترقية الرأسمالية (CAPEX)", "كلفة 132.8M$ مقابل 141.2M$ بوفر صافٍ 8.4M$ بدلالة p < 0.001", COLOR_GOLD),
        ("-5.3% / 78.3 MWh", "وفر استهلاك الطاقة الكهربائية السنوية", "استهلاك 78.3 مقابل 82.7 MWh/year للمحطات بدلالة p < 0.001", COLOR_DEEP_TEAL)
    ]

    for val, lbl, sub, col in hero_stats:
        p_val = tf_h.add_paragraph()
        p_val.text = val
        p_val.font.name = FONT_TITLE
        p_val.font.size = Pt(24)
        p_val.font.bold = True
        p_val.font.color.rgb = col
        p_val.alignment = PP_ALIGN.RIGHT

        p_lbl = tf_h.add_paragraph()
        p_lbl.text = lbl
        p_lbl.font.name = FONT_BODY
        p_lbl.font.size = Pt(11)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = COLOR_TEXT_DARK
        p_lbl.alignment = PP_ALIGN.RIGHT

        p_sub = tf_h.add_paragraph()
        p_sub.text = sub
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(9.5)
        p_sub.font.color.rgb = COLOR_TEXT_MUTED
        p_sub.alignment = PP_ALIGN.RIGHT
        p_sub.space_after = Pt(6)

    # 2. Top Side Card (Width: 5.8, Height: 2.25)
    top_side = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.7), Inches(1.8), Inches(5.8), Inches(2.25))
    top_side.fill.solid()
    top_side.fill.fore_color.rgb = COLOR_WHITE
    top_side.line.color.rgb = COLOR_BURGUNDY
    top_side.line.width = Pt(2)

    tb_ts = slide.shapes.add_textbox(Inches(6.85), Inches(1.9), Inches(5.5), Inches(2.05))
    tf_ts = tb_ts.text_frame
    tf_ts.word_wrap = True

    pts0 = tf_ts.paragraphs[0]
    pts0.text = "القفزة النوعية في العدالة المكانية (SFI)"
    pts0.font.name = FONT_TITLE
    pts0.font.size = Pt(13)
    pts0.font.bold = True
    pts0.font.color.rgb = COLOR_BURGUNDY
    pts0.alignment = PP_ALIGN.RIGHT

    pts_val = tf_ts.add_paragraph()
    pts_val.text = "+36.5% قفزة في مؤشر العدالة الجغرافية"
    pts_val.font.name = FONT_TITLE
    pts_val.font.size = Pt(18)
    pts_val.font.bold = True
    pts_val.font.color.rgb = COLOR_BURGUNDY
    pts_val.alignment = PP_ALIGN.RIGHT

    pts_items = [
        "ارتفاع مؤشر SFI من 0.52 لـ AGA إلى 0.71 لـ BPSO بدلالة p < 0.001.",
        "إنصاف 14 محافظة سورية وشمول الأرياف مع زمن حسابي أسرع (118 ثانية مقابل 142 ثانية)."
    ]
    for it in pts_items:
        p = tf_ts.add_paragraph()
        p.text = f"• {it}"
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT

    # 3. Bottom-Left Card (Width: 2.75, Height: 2.3)
    b_left = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.7), Inches(4.3), Inches(2.75), Inches(2.3))
    b_left.fill.solid()
    b_left.fill.fore_color.rgb = COLOR_WHITE
    b_left.line.color.rgb = COLOR_EMERALD
    b_left.line.width = Pt(1.5)

    tb_bl = slide.shapes.add_textbox(Inches(6.8), Inches(4.4), Inches(2.55), Inches(2.1))
    tf_bl = tb_bl.text_frame
    tf_bl.word_wrap = True

    pbl0 = tf_bl.paragraphs[0]
    pbl0.text = "دقة العزل المكاني"
    pbl0.font.name = FONT_TITLE
    pbl0.font.size = Pt(12)
    pbl0.font.bold = True
    pbl0.font.color.rgb = COLOR_EMERALD
    pbl0.alignment = PP_ALIGN.RIGHT

    pbl_v = tf_bl.add_paragraph()
    pbl_v.text = "97.5%"
    pbl_v.font.name = FONT_TITLE
    pbl_v.font.size = Pt(22)
    pbl_v.font.bold = True
    pbl_v.font.color.rgb = COLOR_EMERALD
    pbl_v.alignment = PP_ALIGN.RIGHT

    bl_items = [
        "حصر دقيق داخل مضلعات GIS في المدن الكثيفة (دمشق ومساكن برزة).",
        "تسرب جانبي ضئيل لا يتجاوز 2.5%."
    ]
    for it in bl_items:
        p = tf_bl.add_paragraph()
        p.text = f"• {it}"
        p.font.name = FONT_BODY
        p.font.size = Pt(9.5)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT

    # 4. Bottom-Right Card (Width: 2.8, Height: 2.3)
    b_right = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.7), Inches(4.3), Inches(2.8), Inches(2.3))
    b_right.fill.solid()
    b_right.fill.fore_color.rgb = COLOR_WHITE
    b_right.line.color.rgb = COLOR_BLUE
    b_right.line.width = Pt(1.5)

    tb_br = slide.shapes.add_textbox(Inches(9.8), Inches(4.4), Inches(2.6), Inches(2.1))
    tf_br = tb_br.text_frame
    tf_br.word_wrap = True

    pbr0 = tf_br.paragraphs[0]
    pbr0.text = "التنسيق متعدد الموردين"
    pbr0.font.name = FONT_TITLE
    pbr0.font.size = Pt(12)
    pbr0.font.bold = True
    pbr0.font.color.rgb = COLOR_BLUE
    pbr0.alignment = PP_ALIGN.RIGHT

    pbr_v = tf_br.add_paragraph()
    pbr_v.text = "> 97.4%"
    pbr_v.font.name = FONT_TITLE
    pbr_v.font.size = Pt(22)
    pbr_v.font.bold = True
    pbr_v.font.color.rgb = COLOR_BLUE
    pbr_v.alignment = PP_ALIGN.RIGHT

    br_items = [
        "نسبة استجابة مشتركة مؤتمتة (Huawei 98.1%, Ericsson 97.4%).",
        "استرجاع كامل وآمن في أقل من 10 دقائق."
    ]
    for it in br_items:
        p = tf_br.add_paragraph()
        p.text = f"• {it}"
        p.font.name = FONT_BODY
        p.font.size = Pt(9.5)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT

    # Speaker Notes
    notes_script = (
        "السادة أعضاء اللجنة الكرام، إن قوة أي أطروحة دكتوراه في العلوم التطبيقية تُقاس بما تثبته بالأرقام الدقيقة والتحقق الإحصائي الموثوق.\n\n"
        "اللوحة المعروضة أمامكم لا تعبر عن فرضيات نظرية، بل هي خلاصة تشغيل نماذجنا على 79,268 موقعاً خلوياً فعلياً خضعت لاختبارات إحصائية "
        "لـ 30 تشغيلاً مستقلاً.\n\n"
        "أثبت البحث علمياً: أولاً، تحقيق تغطية 95.12% متفوقة على الخوارزميات الجينية. ثانياً، توفير 8.4 مليون دولار من ميزانية الترقية "
        "الرأسمالية بفضل آلية إصلاح القيود التكيفية. ثالثاً، توفير 5.3% من استهلاك الطاقة الكهربائية السنوية لمحطات الإرسال، وهو رقم حاسم "
        "لقطاع الطاقة الوطني.\n\n"
        "رابعاً، القفزة النوعية في العدالة المكانية بنسبة 36.5% ليرتفع مؤشر SFI إلى 0.71. خامساً، دقة عزل مكاني بلغت 97.5% في البيئات "
        "الحضرية الكثيفة كدمشق ومساكن برزة. وسادساً، كفاءة تنسيق متعدد الموردين تجاوزت 97.4% بين معدات هواوي وإريكسون.\n\n"
        "جميع هذه النتائج جاءت بدلالة إحصائية حاسمة p-value أقل من 0.001 لمعظم المعايير، مما يؤكد أن التحسين المقترح ليس وليد الصدفة، "
        "بل هو تفوق منهجي راسخ."
    )
    set_speaker_notes(slide, "ما الذي أثبته البحث علمياً وبالأرقام الدقيقة؟", "2:00 دقيقة", notes_script)


def build_slide_63(prs):
    """Slide 63: Provocative Question & Evidence Web (الدرس العلمي المستفاد)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "الدرس العلمي الأهم: التحسين لا يُقاس بهدف أحادي")
    add_footer(slide, 63)

    # Top Inquiry Hero Box
    inquiry = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.75), Inches(11.7), Inches(1.3))
    inquiry.fill.solid()
    inquiry.fill.fore_color.rgb = COLOR_DARK_SLATE
    inquiry.line.color.rgb = COLOR_GOLD
    inquiry.line.width = Pt(2)
    tf_inq = inquiry.text_frame
    tf_inq.word_wrap = True

    pi0 = tf_inq.paragraphs[0]
    pi0.text = "لماذا يفشل السعي المنفرد وراء معيار واحد في إدارة الشبكات الخلوية؟"
    pi0.font.name = FONT_TITLE
    pi0.font.size = Pt(16)
    pi0.font.bold = True
    pi0.font.color.rgb = COLOR_GOLD
    pi0.alignment = PP_ALIGN.CENTER

    pi1 = tf_inq.add_paragraph()
    pi1.text = "التحسين الهندسي الرصين هو فن إدارة التنازلات المتعارضة عبر فضاء باريتو خماسي الأبعاد (Pareto Optimal Trade-off)"
    pi1.font.name = FONT_BODY
    pi1.font.size = Pt(11)
    pi1.font.bold = True
    pi1.font.color.rgb = COLOR_WHITE
    pi1.alignment = PP_ALIGN.CENTER

    # 5 Vertical Evidence Cards (Width: 2.15 each, Gap: 0.23)
    cards_data = [
        {
            "name": "التغطية (Coverage)",
            "color": COLOR_DEEP_TEAL,
            "risk": "استنزاف مالي مفرط وتشبع راديوي وتجهيزات غير مبررة اقتصادياً.",
            "sol": "تغطية مستهدفة 95.12% تحقق التوازن الأمثل مع الكلفة."
        },
        {
            "name": "الكلفة (CAPEX)",
            "color": COLOR_GOLD,
            "risk": "تدنٍ حاد في جودة الخدمة وظهور بؤر انقطاع وفجوات واسعة.",
            "sol": "وفر 8.4M$ عبر الترقية التشاركية دون التنازل عن شبر تغطية."
        },
        {
            "name": "الطاقة (Energy)",
            "color": COLOR_EMERALD,
            "risk": "خنق استطاعة الإرسال وتقلص مساحات الخلايا وتدهور النفاذ.",
            "sol": "ترشيد 5.3% عبر إطفاء الترددات الفائضة بذكاء جغرافي."
        },
        {
            "name": "العدالة (Fairness)",
            "color": COLOR_BURGUNDY,
            "risk": "حرمان 38% من سكان الريف وتكريس التهميش الرقمي.",
            "sol": "فرض قيد SFI = 0.71 كشرط ملزم لحماية المحافظات النامية."
        },
        {
            "name": "التحكم (Control)",
            "color": COLOR_BLUE,
            "risk": "شلل تشغيلي في الطوارئ ولجوء للتشويش العشوائي المدمر للطيف.",
            "sol": "عزل مكاني برمجياً 97.5% دون تلويث الطيف بالتشويش."
        }
    ]

    card_w = 2.15
    gap = 0.2375
    for idx, c in enumerate(cards_data):
        left = Inches(0.8 + idx * (card_w + gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(3.25), Inches(card_w), Inches(3.45))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = c["color"]
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(left + Inches(0.12), Inches(3.35), Inches(card_w - 0.24), Inches(3.25))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = c["name"]
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = c["color"]
        p_t.alignment = PP_ALIGN.RIGHT
        p_t.space_after = Pt(6)

        p_r_t = tf.add_paragraph()
        p_r_t.text = "⚠️ خطر الانفراد:"
        p_r_t.font.name = FONT_TITLE
        p_r_t.font.size = Pt(9.5)
        p_r_t.font.bold = True
        p_r_t.font.color.rgb = COLOR_BURGUNDY
        p_r_t.alignment = PP_ALIGN.RIGHT

        p_r_d = tf.add_paragraph()
        p_r_d.text = c["risk"]
        p_r_d.font.name = FONT_BODY
        p_r_d.font.size = Pt(9.5)
        p_r_d.font.color.rgb = COLOR_TEXT_DARK
        p_r_d.alignment = PP_ALIGN.RIGHT
        p_r_d.space_after = Pt(8)

        p_s_t = tf.add_paragraph()
        p_s_t.text = "✓ حل الأطروحة:"
        p_s_t.font.name = FONT_TITLE
        p_s_t.font.size = Pt(9.5)
        p_s_t.font.bold = True
        p_s_t.font.color.rgb = COLOR_EMERALD
        p_s_t.alignment = PP_ALIGN.RIGHT

        p_s_d = tf.add_paragraph()
        p_s_d.text = c["sol"]
        p_s_d.font.name = FONT_BODY
        p_s_d.font.size = Pt(9.5)
        p_s_d.font.color.rgb = COLOR_TEXT_DARK
        p_s_d.alignment = PP_ALIGN.RIGHT

    # Speaker Notes
    notes_script = (
        "لو سُئلت: ما هو الدرس العلمي والمنهجي الأهم الذي تخرج به هذه الأطروحة بعد سنوات من البحث؟ لأجبت دون تردد:\n\n"
        "إن تحسين الشبكات الخلوية لا يمكن، بأي حال من الأحوال، أن يُقاس بمعيار أحادي الجانب (Network optimization cannot be evaluated by a single objective).\n\n"
        "إن الانفراد بالسعي وراء التغطية القصوى يمثل انتحاراً استثمارياً يستنزف الميزانيات. والانفراد بخفض الكلفة يوقع الشبكة في فخ تدني جودة "
        "الخدمة وانقطاع الاتصالات. والتركيز على توفير الطاقة وحدها يخنق استطاعة الإرسال.\n\n"
        "أما التجاهل للأبعاد الجغرافية فيكرس انقساماً رقمياً ظالماً يحرم الريف. وغياب التحكم الميداني يترك الشبكة عمياء وعاجزة في ساعات الأزمات الوطنية.\n\n"
        "إن الإسهام المعرفي الحقيقي لأطروحتنا هو إثبات أن الكفاءة الهندسية هي فن إدارة التنازلات المتعارضة عبر فضاء باريتو المتعدد الأبعاد، "
        "مما أنتج حلاً متزناً يوفر المال والطاقة ويحقق التغطية والعدالة والتحكم في آنٍ واحد."
    )
    set_speaker_notes(slide, "الدرس العلمي الأهم: التحسين لا يُقاس بهدف أحادي", "1:30 دقيقة", notes_script)


def build_slide_64(prs):
    """Slide 64: Split-Screen High Contrast (التحول 1: الأمثلية إلى العدالة)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "التحسين وحده لا يكفي: من التخطيط التقليدي إلى العدالة المكانية")
    add_footer(slide, 64)

    # Right Box: Traditional Planning (Before)
    right_items = [
        "استثمار تجاري بحت يعظم التغطية في الكثافات السكانية العالية لتحصيل عائد مالي سريع.",
        "تركز ترقيات الجيل الخامس 5G في دمشق وحلب ومراكز المدن بنسبة تفوق 82%.",
        "مؤشر عدالة مكاني متدنٍ للغاية: SFI = 0.52 (تفاوت جغرافي وتنموي حاد).",
        "حرمان نحو 40% من سكان الأرياف والمحافظات النامية من خدمات النطاق العريض.",
        "تفاقم الفجوة الرقمية والتباعد التنموي بين الحضر والريف."
    ]
    add_card(slide, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8),
             "التخطيط التجاري الأحادي (قبل فرض القيد - Before)", right_items,
             bg_color=COLOR_WHITE, border_color=COLOR_BURGUNDY,
             title_color=COLOR_BURGUNDY, border_width=2)

    # Left Box: SFI-Constrained Planning (After)
    left_items = [
        "صياغة رياضية صريحة لقيد العدالة المكانية (SFI >= Threshold) مستمدة من مؤشر جيني والإنصاف.",
        "قفزة نوعية في مؤشر العدالة ليصل إلى SFI = 0.71 (تحسن استثنائي بنسبة +36.5%).",
        "نشر متوازن للمواقع عبر كافة المحافظات الـ 14 (درعا، حمص، حماة، اللاذقية، دير الزور...).",
        "الحفاظ التام على نسبة التغطية الوطنية عند 95.12% وبنفس الميزانية المرصودة (132.8M$).",
        "حوكمة رياضية معتمدة لربط تراخيص المشغلين بالعدالة الجغرافية."
    ]
    add_card(slide, Inches(6.9), Inches(1.8), Inches(5.6), Inches(4.8),
             "تخطيط الأطروحة العادل مكانياً (بعد فرض القيد - After)", left_items,
             bg_color=COLOR_WHITE, border_color=COLOR_DEEP_TEAL,
             title_color=COLOR_DEEP_TEAL, border_width=2)

    # Central Balance Badge
    badge = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(6.066), Inches(3.6), Inches(1.2), Inches(1.2))
    badge.fill.solid()
    badge.fill.fore_color.rgb = COLOR_GOLD
    badge.line.color.rgb = COLOR_WHITE
    badge.line.width = Pt(2.5)
    tf_b = badge.text_frame
    tf_b.word_wrap = True
    pb = tf_b.paragraphs[0]
    pb.text = "قيد ملزم\nSFI ≥ 0.70"
    pb.font.name = FONT_TITLE
    pb.font.size = Pt(11)
    pb.font.bold = True
    pb.font.color.rgb = COLOR_WHITE
    pb.alignment = PP_ALIGN.CENTER

    # Speaker Notes
    notes_script = (
        "تتفضل اللجنة الكريمة بملاحظة هذه المقارنة البصرية الحاسمة التي تفصل بين مدرستين في تخطيط الشبكات:\n\n"
        "على اليمين: التخطيط التقليدي التجاري. إذا تركت المشغلين دون قيود تنظيمية، ستتوجه خوارزميات الاستمثال آلياً لتركيز "
        "كافة استثمارات 5G في دمشق وحلب لأن الكثافة السكانية هناك تحقق أعلى عائد مالي سريع. النتيجة؟ مؤشر عدالة مكاني متدنٍ لا يتجاوز 0.52، "
        "وفجوة رقمية تفصل الريف عن ركب التطور التكنولوجي.\n\n"
        "وعلى اليسار: الحل الذي ابتكرته هذه الأطروحة. لم نكتفِ بالتحسين الاقتصادي، بل فرضنا قيد العدالة المكانية SFI كمعادلة ملزمة داخل "
        "خوارزمية BPSO. وكانت النتيجة العلمية المبهرة: ارتفع مؤشر العدالة بنسبة 36.5% ليصل إلى 0.71، وشملت الترقية كافة المحافظات الـ 14 "
        "بما فيها درعا وحمص وحماة واللاذقية والمحافظات الشرقية.\n\n"
        "والأهم هندسياً: أننا حققنا هذا الإنصاف الوطني دون أن نخسر عُشراً واحداً من التغطية الكلية التي بقيت مستقرة عند 95.12% وبنفس "
        "الميزانية المالية المرصودة. هذا هو جوهر الهندسة في خدمة المجتمع."
    )
    set_speaker_notes(slide, "التحسين وحده لا يكفي: من التخطيط التقليدي إلى العدالة المكانية", "1:30 دقيقة", notes_script)


def build_slide_65(prs):
    """Slide 65: Split-Screen High Contrast (التحول 2: التغطية إلى التحكم)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "من التخطيط الاستراتيجي إلى التحكم التشغيلي الميداني")
    add_footer(slide, 65)

    # Top Split: Planning Level vs Control Level (Height: 2.2)
    # Right: Level 1 Planning
    l1_items = [
        "قرارات استراتيجية طويلة الأجل تمتد لسنوات تشمل اختيار المواقع وتوزيع ترقيات 5G.",
        "ترشيد كلفة CAPEX بمقدار 8.4M$، وفر 5.3% طاقة، وضمان العدالة المكانية SFI = 0.71.",
        "استثمار أمثل لقاعدة البيانات الوطنية بـ 79,268 موقعاً خلوياً."
    ]
    add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(2.2),
             "المستوى الأول: التخطيط الاستراتيجي (Strategic Planning)", l1_items,
             bg_color=COLOR_WHITE, border_color=COLOR_DEEP_TEAL,
             title_color=COLOR_DEEP_TEAL, border_width=2)

    # Left: Level 2 Control
    l2_items = [
        "قرارات ميدانية لحظية عند الطوارئ والامتحانات وحماية المنشآت الحيوية الوطنية.",
        "استهداف مضلعات GIS بدقة 97.5%، وتنسيق متزامن بين Huawei و Ericsson (>97.4%).",
        "استغناء تام عن أجهزة التشويش اللاسلكي وحماية الطيف الكهرومغناطيسي."
    ]
    add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(2.2),
             "المستوى الثاني: التحكم التشغيلي اللحظي (Operational Control)", l2_items,
             bg_color=COLOR_WHITE, border_color=COLOR_BURGUNDY,
             title_color=COLOR_BURGUNDY, border_width=2)

    # Bottom 4-Stage Operational Flow Cards (Top: 4.25, Height: 2.45)
    stages = [
        ("01. PLAN (التخطيط)", "النمذجة المكانية في بيئة GIS، تشغيل استمثال BPSO متعدد الأهداف، وتحديد أولويات الترقية.", COLOR_DEEP_TEAL),
        ("02. OPERATE (التنفيذ)", "رسم مضلع العزل على الخريطة، إرسال أوامر حظر الترددات آلياً لبوابات قلب الشبكة Core.", COLOR_BURGUNDY),
        ("03. MONITOR (المراقبة)", "الرصد اللحظي لمؤشرات جودة الخدمة KPIs، مراقبة التسرب الطيفي، وضمان استقرار الخلايا المجاورة.", COLOR_GOLD),
        ("04. RESTORE (الاسترجاع)", "استعادة متدرجة آمنة (2G < 5د، 3G < 7د، 4G < 10د) لتفادي عواصف الإشارات (Signaling Storms).", COLOR_EMERALD)
    ]

    card_w = 2.75
    gap = 0.233
    for idx, (st_t, st_d, st_c) in enumerate(stages):
        left = Inches(0.8 + idx * (card_w + gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(4.25), Inches(card_w), Inches(2.45))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = st_c
        box.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(left + Inches(0.12), Inches(4.35), Inches(card_w - 0.24), Inches(2.25))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = st_t
        p0.font.name = FONT_TITLE
        p0.font.size = Pt(12)
        p0.font.bold = True
        p0.font.color.rgb = st_c
        p0.alignment = PP_ALIGN.RIGHT
        p0.space_after = Pt(6)

        p1 = tf.add_paragraph()
        p1.text = st_d
        p1.font.name = FONT_BODY
        p1.font.size = Pt(10)
        p1.font.color.rgb = COLOR_TEXT_DARK
        p1.alignment = PP_ALIGN.RIGHT

    # Speaker Notes
    notes_script = (
        "ننتقل الآن إلى إحدى النقاط الفارقة في أطروحتنا: الانتقال من التخطيط الاستراتيجي الصامت إلى التحكم التشغيلي النابض.\n\n"
        "عادةً ما تنتهي أطروحات التخطيط عند حساب مصفوفات الترقية وتحديد المواقع. لكننا في هذه الدراسة خطونا خطوة أبعد استجابةً "
        "للاحتياجات السيادية والتشغيلية الوطنية.\n\n"
        "ربطنا المستوى الأول التخطيطي بالمستوى الثاني التشغيلي من خلال دورة تحكم مغلقة تتألف من أربع مراحل:\n"
        "نبدأ بـ PLAN للتخطيط الاستراتيجي، ثم ننتقل إلى OPERATE حيث يستطيع ضابط التشغيل رسم أي مضلع جغرافي على الخريطة ليقوم "
        "النظام برمجياً بعزل الخدمة عن تلك المنطقة عبر أوامر موجهة لقلب الشبكة.\n"
        "ثم تأتي مرحلة MONITOR للمراقبة اللحظية لمؤشرات الأداء والتسرب الراديوي، وأخيراً مرحلة RESTORE التي تضمن إعادة الخدمة لحالتها "
        "الطبيعية بتسلسل زمني يحمي المعدات من صدمات الإقلاع الكهربائية.\n\n"
        "بهذا الإنجاز، لم نعد نخطط لشبكة جامدة، بل بنينا منظومة تحكم قادرة على إدارة الأزمات دون إطلاق واط واحد من التشويش اللاسلكي الذي يلوث الطيف الكهرومغناطيسي."
    )
    set_speaker_notes(slide, "من التخطيط الاستراتيجي إلى التحكم التشغيلي الميداني", "1:30 دقيقة", notes_script)


def build_slide_66(prs):
    """Slide 66: Gap-to-Bridge / Boundary Matrix (الحدود الهندسية والاعتراف العلمي)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "ما كشفته النتائج أيضاً: الحدود الهندسية والتشغيلية")
    add_footer(slide, 66)

    # Top Subtitle Badge
    sub_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.75), Inches(11.7), Inches(0.55))
    sub_box.fill.solid()
    sub_box.fill.fore_color.rgb = COLOR_DARK_SLATE
    sub_box.line.color.rgb = COLOR_GOLD
    sub_box.line.width = Pt(1.5)
    tf_sb = sub_box.text_frame
    tf_sb.word_wrap = True
    psb = tf_sb.paragraphs[0]
    psb.text = "الأمانة الأكاديمية الصارمة: تعريف نطاق التشغيل الهندسي الآمن للمنظومة (Operating Envelope Defined)"
    psb.font.name = FONT_TITLE
    psb.font.size = Pt(11.5)
    psb.font.bold = True
    psb.font.color.rgb = COLOR_GOLD
    psb.alignment = PP_ALIGN.CENTER

    # 3 Horizontal Boundary Cards (Top: 2.45 + idx*1.42, Height: 1.35)
    boundaries = [
        {
            "env": "01. البيئات الحضرية الكثيفة (Dense Urban)",
            "res": "دقة عزل مكاني استثنائية بلغت 97.5% مع تسرب هامشي لا يتعدى 2.5%.",
            "phy": "التفسير الفيزيائي: قصر أنصاف أقطار الخلايا الصغيرة (Micro-cells) وكثافة المحطات وانخفاض استطاعة الإرسال سمح بحصر الإشارة التام داخل المضلعات.",
            "color": COLOR_EMERALD,
            "status": "✓ نجاح منقطع النظير"
        },
        {
            "env": "02. المناطق الريفية وشبه الحضرية (Rural & Suburban)",
            "res": "نسبة تسرب ترددي تجاوزت > 46% خارج حدود المضلع الجغرافي المستهدف.",
            "phy": "التفسير والتوصية: حتمية فيزيائية لانتشار خلايا الماكرو (Macro-cells) وتباعد الأبراج؛ يتطلب تدخلاً ميكانيكياً لزوايا الميل (Tilt) مكملاً للعزل البرمجي.",
            "color": COLOR_BURGUNDY,
            "status": "⚠️ محدد فيزيائي حتمي"
        },
        {
            "env": "03. أزمنة الاستعادة التشغيلية الآمنة (Restoration Timeline)",
            "res": "أزمنة استعادة متدرجة: 2G في أقل من 5 دقائق، 3G في 7 دقائق، و 4G في 10 دقائق.",
            "phy": "التفسير التشغيلي: التدرج الزمني ضرورة هندسية لتفادي عواصف الإشارات (Signaling Storms) وحماية مخدمات التوجيه ومحولات الطاقة من الانهيار.",
            "color": COLOR_DEEP_TEAL,
            "status": "⏱️ أمان تشغيلي مؤكد"
        }
    ]

    for idx, b in enumerate(boundaries):
        top = Inches(2.45 + idx * 1.42)
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(11.7), Inches(1.32))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = b["color"]
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(Inches(0.95), top + Inches(0.08), Inches(11.4), Inches(1.16))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = f"{b['env']}   |   [{b['status']}]"
        p0.font.name = FONT_TITLE
        p0.font.size = Pt(12)
        p0.font.bold = True
        p0.font.color.rgb = b["color"]
        p0.alignment = PP_ALIGN.RIGHT
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = f"• النتيجة التجريبية: {b['res']}"
        p1.font.name = FONT_BODY
        p1.font.size = Pt(10)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_TEXT_DARK
        p1.alignment = PP_ALIGN.RIGHT
        p1.space_after = Pt(1)

        p2 = tf.add_paragraph()
        p2.text = f"• {b['phy']}"
        p2.font.name = FONT_BODY
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = COLOR_TEXT_MUTED
        p2.alignment = PP_ALIGN.RIGHT

    # Speaker Notes
    notes_script = (
        "السادة رئيس وأعضاء اللجنة الموقرة، تقتضي الأمانة العلمية الصارمة للباحث الأكاديمي ألا يكتفي بعرض النجاحات والإنجازات فحسب، "
        "بل أن يعلن بشفافية تامة عن الحدود الهندسية والفيزيائية التي تحكم منظومته.\n\n"
        "لقد كشفت تجاربنا الميدانية عن حقائق هندسية بالغة الأهمية نعتبرها قيمة مضافة للأطروحة:\n\n"
        "أولاً: أثبتت المنظومة البرمجية كفاءة منقطعة النظير في المدن الحضرية الكثيفة بدقة عزل بلغت 97.5% بفضل صغر خلايا Micro-cells.\n\n"
        "ثانياً: في المقابل، أظهرت النتائج في المناطق الريفية تسرباً إشعاعياً تجاوز 46%. ونحن هنا نؤكد أمام لجنتكم الموقرة أن البرمجيات، "
        "مهما بلغت درجة ذكائها، لا تستطيع إلغاء قوانين الفيزياء وانتشار الأمواج الكهرومغناطيسية. فالخلايا الكبرى في الريف مصممة لتغطية "
        "مسافات شاسعة، وعزلها برمجياً دون تعديل فيزيائي لزوايا الميل الميكانيكي للهوائيات (Tilt) سيؤدي حتماً إلى تسرب الإشارة.\n\n"
        "ثالثاً: بينت الأطروحة أن زمن الاستعادة التشغيلية التامة يحتاج ما بين 5 إلى 10 دقائق بحسب جيل الشبكة، وهو زمن مدروس لحماية محولات "
        "الطاقة ومخدمات التوجيه من عواصف الإشارات المتزامنة.\n\n"
        "إن هذه المحددات ليست نقاط ضعف، بل هي تحديد علمي دقيق لنطاق التشغيل الآمن (Operating Envelope) الذي يجب أن تلتزم به فرق التشغيل الميدانية."
    )
    set_speaker_notes(slide, "ما كشفته النتائج أيضاً: الحدود الهندسية والتشغيلية", "1:30 دقيقة", notes_script)


def build_slide_67(prs):
    """Slide 67: Asymmetric Bento Grid (آفاق المستقبل NTN, AI-RAN)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "الآفاق المستقبلية: إلى أين يمكن أن يمضي هذا البحث؟")
    add_footer(slide, 67)

    # 5 Bento Grid Cards:
    # Card 1: Hero Top-Right (Width: 5.7, Height: 2.15)
    c1_items = [
        "دمج الأسطح العاكسة الذكية القابلة لإعادة التشكيل (RIS).",
        "تكامل الشبكات غير الأرضية (NTN/HAPS) لتغطية البادية والمناطق الوعرة.",
        "مواءمة المعايير مع 3GPP Rel-19 ورؤية ITU IMT-2030 للجيل السادس."
    ]
    add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(2.15),
             "01. التطور نحو 5G-Advanced و 6G و NTN", c1_items,
             bg_color=COLOR_WHITE, border_color=COLOR_DEEP_TEAL,
             title_color=COLOR_DEEP_TEAL, border_width=2)

    # Card 2: Top-Left (Width: 5.7, Height: 2.15)
    c2_items = [
        "الانتقال من التخطيط المجدول (Offline) إلى التعديل اللحظي للترددات.",
        "استجابة آنية لحركة الحشود والازدحام المروري والمواسم الدينية والوطنية.",
        "خوارزميات التعلم المعزز العميق (DRL: PPO / DDPG) للضبط التلقائي."
    ]
    add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(2.15),
             "02. التحسين اللحظي والديناميكي (Real-Time AI)", c2_items,
             bg_color=COLOR_WHITE, border_color=COLOR_BURGUNDY,
             title_color=COLOR_BURGUNDY, border_width=2)

    # Bottom 3 Cards: (Width: 3.7 each, Height: 2.1)
    c3_items = [
        "إدماج نماذج الارتفاع الرقمية DEM والمباني 3D.",
        "تأثيرات الطقس والغطاء النباتي في الانتشار الراديوي."
    ]
    add_card(slide, Inches(0.8), Inches(4.1), Inches(3.7), Inches(2.1),
             "03. الذكاء المكاني 3D GIS", c3_items,
             bg_color=COLOR_WHITE, border_color=COLOR_GOLD,
             title_color=COLOR_GOLD, border_width=1.5)

    c4_items = [
        "دمج متحكمات الوصول الراديوي (Near-RT & Non-RT RIC).",
        "تطبيقات xApps و rApps لكسر احتكار الموردين."
    ]
    add_card(slide, Inches(4.8), Inches(4.1), Inches(3.7), Inches(2.1),
             "04. معمارية Open-RAN و O-RAN", c4_items,
             bg_color=COLOR_WHITE, border_color=COLOR_BLUE,
             title_color=COLOR_BLUE, border_width=1.5)

    c5_items = [
        "الانتقال من المحاكاة إلى النشر التجاري الشامل.",
        "تنسيق تنفيذي مع الهيئة الناظمة والمشغلين الوطنيين."
    ]
    add_card(slide, Inches(8.8), Inches(4.1), Inches(3.7), Inches(2.1),
             "05. النشر الميداني الموسع", c5_items,
             bg_color=COLOR_WHITE, border_color=COLOR_EMERALD,
             title_color=COLOR_EMERALD, border_width=1.5)

    # Bottom Integrity Callout
    bot_badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.32), Inches(11.7), Inches(0.48))
    bot_badge.fill.solid()
    bot_badge.fill.fore_color.rgb = COLOR_DARK_SLATE
    bot_badge.line.color.rgb = COLOR_GOLD
    bot_badge.line.width = Pt(1)
    tf_bb = bot_badge.text_frame
    tf_bb.word_wrap = True
    pbb = tf_bb.paragraphs[0]
    pbb.text = "التزام أكاديمي صارم: محاور استشرافية مستندة لأحدث مراجع 2026 تفصل بدقة بين ما أُنجز وما هو قيد البحث المستقبلي"
    pbb.font.name = FONT_BODY
    pbb.font.size = Pt(10)
    pbb.font.bold = True
    pbb.font.color.rgb = COLOR_GOLD
    pbb.alignment = PP_ALIGN.CENTER

    # Speaker Notes
    notes_script = (
        "إن أطروحة الدكتوراه الناجحة لا تغلق الأبواب بانتهاء صفحاتها، بل تفتح آفاقاً ومسارات بحثية جديدة للباحث وللأجيال القادمة "
        "من طلاب الماجستير والدكتوراه.\n\n"
        "واستناداً إلى الفصل السابع من الأطروحة، نحدد ستة مسارات استراتيجية يمكن لهذا البحث أن يمضي نحوها في المستقبل:\n"
        "المسار الأول: التوسع نحو أفق الجيل السادس وتقنيات الأسطح العاكسة الذكية RIS.\n"
        "المسار الثاني: نقل خوارزميات BPSO من التحسين المجدول إلى التحسين اللحظي المتكيف مع حركة المرور اليومية.\n"
        "المسار الثالث: تعميق البعد الجغرافي بإدخال النمذجة ثلاثية الأبعاد 3D للمباني والارتفاعات الطبوغرافية.\n"
        "المسار الرابع: مواءمة طبقة التنسيق مع معايير O-RAN ومتحكمات RIC الذكية.\n"
        "المسار الخامس: تدريب عملاء التعلم المعزز العميق DRL لضبط أوزان التغطية والكلفة والطاقة ذاتياً.\n"
        "والمسار السادس: التطبيق الميداني التجاري المباشر على كامل البنية التحتية السورية.\n\n"
        "وهنا أؤكد للجنة الموقرة التزامي بالأمانة الأكاديمية: هذه المحاور الستة تمثل أفقاً مستقبلياً استشرافياً مستنداً إلى أحدث "
        "أوراق 2026، وليست نتائج مكتملة ضمن نطاق دفاعنا اليوم."
    )
    set_speaker_notes(slide, "الآفاق المستقبلية: إلى أين يمكن أن يمضي هذا البحث؟", "1:30 دقيقة", notes_script)


def build_slide_68(prs):
    """Slide 68: 3-Tier Horizon Roadmap (الخط الزمني ثلاثي الآفاق)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "خارطة طريق البحث: من هذه الأطروحة إلى الجيل القادم")
    add_footer(slide, 68)

    # Top Progression Ribbon
    ribbon = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.75), Inches(11.7), Inches(0.55))
    ribbon.fill.solid()
    ribbon.fill.fore_color.rgb = COLOR_DARK_SLATE
    ribbon.line.color.rgb = COLOR_GOLD
    ribbon.line.width = Pt(1.5)
    tf_rb = ribbon.text_frame
    tf_rb.word_wrap = True
    prb = tf_rb.paragraphs[0]
    prb.text = "مسار التطور الاستراتيجي:  Static (اليوم)   ⟶   Adaptive (2-4 سنوات)   ⟶   Intelligent (4-6 سنوات)   ⟶   Autonomous (أفق 6G)"
    prb.font.name = FONT_TITLE
    prb.font.size = Pt(11.5)
    prb.font.bold = True
    prb.font.color.rgb = COLOR_GOLD
    prb.alignment = PP_ALIGN.CENTER

    # 3 Horizontal Roadmap Horizon Bands (Top: 2.45 + idx*1.42, Height: 1.35)
    horizons = [
        {
            "tag": "TODAY — إنجاز الأطروحة المثبت",
            "title": "الأفق الأول: التخطيط والتحكم الواعي مكانياً (Static / Offline Optimization)",
            "desc": "تخطيط وتحسين مستقر لـ 79,268 موقعاً خلوياً، إدماج قيد العدالة المكانية SFI = 0.71، دقة عزل مكاني 97.5%، وتنسيق مؤتمت بين Huawei و Ericsson مثبت إحصائياً بدلالة p < 0.001.",
            "color": COLOR_DEEP_TEAL,
            "bg": COLOR_WHITE,
            "text_dark": True
        },
        {
            "tag": "NEXT — المدى القريب والمتوسط (2 إلى 4 سنوات)",
            "title": "الأفق الثاني: التحكم التكيفي والديناميكي التفاعلي (Adaptive / Closed-Loop Control)",
            "desc": "تحديث لحظي لطبقات GIS استجابةً لحركة المشتركين والازدحام المروري، أتمتة دمج تدفقات البيانات عبر واجهات APIs المشغلين، ومراقبة مستمرة لمؤشرات التسرب وجودة الخدمة.",
            "color": COLOR_GOLD,
            "bg": COLOR_WHITE,
            "text_dark": True
        },
        {
            "tag": "FUTURE — المدى البعيد (أفق 6G وشبكات 2030+)",
            "title": "الأفق الثالث: الإدارة الشبكية المستقلة الصفرية (Autonomous Zero-Touch Orchestration)",
            "desc": "شبكات خلوية ذاتية الشفاء والتنظيم (Self-Healing)، تكامل الأقمار الصناعية والمنصات غير الأرضية (NTN/HAPS)، والتوائم الرقمية الشبكية الشاملة (Network Digital Twins).",
            "color": COLOR_BLUE,
            "bg": COLOR_SLATE_CARD,
            "text_dark": False
        }
    ]

    for idx, h in enumerate(horizons):
        top = Inches(2.45 + idx * 1.42)
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(11.7), Inches(1.32))
        box.fill.solid()
        box.fill.fore_color.rgb = h["bg"]
        box.line.color.rgb = h["color"]
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(Inches(0.95), top + Inches(0.08), Inches(11.4), Inches(1.16))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = f"{h['title']}   |   [{h['tag']}]"
        p0.font.name = FONT_TITLE
        p0.font.size = Pt(12)
        p0.font.bold = True
        p0.font.color.rgb = h["color"]
        p0.alignment = PP_ALIGN.RIGHT
        p0.space_after = Pt(3)

        p1 = tf.add_paragraph()
        p1.text = h["desc"]
        p1.font.name = FONT_BODY
        p1.font.size = Pt(10)
        p1.font.color.rgb = COLOR_TEXT_DARK if h["text_dark"] else RGBColor(226, 232, 240)
        p1.alignment = PP_ALIGN.RIGHT

    # Speaker Notes
    notes_script = (
        "لترجمة هذه الرؤية المستقبلية إلى خطة عمل قابلة للتنفيذ، وضعنا خارطة طريق زمنية متدرجة تضمن الانتقال السلس لقطاع الاتصالات السوري "
        "عبر أربع محطات تطورية:\n\n"
        "محطة اليوم (TODAY): وهي ما أنجزناه وأثبتناه مخبرياً وإحصائياً في هذه الأطروحة؛ منظومة تخطيط رصينة وقيد عدالة مكانية وتحكم متعدد الموردين.\n\n"
        "محطة الغد القريب (NEXT): خلال العامين إلى الأربعة أعوام القادمة، نهدف إلى تحويل هذه الخوارزميات إلى نظام تكيفي مستمر يتغذى "
        "مباشرة من واجهات برمجة التطبيقات للمشغلين ويعدل التغطية ديناميكياً مع ساعات الذروة والمواسم.\n\n"
        "محطة المستقبل (FUTURE): بالتوازي مع نضوج معايير الجيل السادس 6G، نتطلع إلى الوصول للإدارة الذاتية الكاملة Zero-Touch، حيث تتولى "
        "نماذج التوائم الرقمية التنبؤ بالأعطال وإصلاح التغطية وعزل الحوادث دون أي تدخل بشري.\n\n"
        "إن هذا التدرج يمنح أطروحتنا ميزة استثنائية: فهي قابلة للتطبيق الفوري اليوم، ومصممة لتكون نواة للتطوير المستقبلي لسنوات قادمة."
    )
    set_speaker_notes(slide, "خارطة طريق البحث: من هذه الأطروحة إلى الجيل القادم", "1:30 دقيقة", notes_script)


def build_slide_69(prs):
    """Slide 69: Spatial Map-Anchored Canvas (الأثر الوطني السوري)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "الصورة الكلية: رؤية موحدة لإدارة الشبكات الخلوية الموزعة")
    add_footer(slide, 69)

    # Right: 6 Layered Architecture Stack (Width: 6.8, Height: 4.8)
    layers = [
        ("L5", "الشبكة الخلوية الذكية المستدامة", "الحوكمة الوطنية الشاملة التي توفق بين الكفاءة والعدالة والسيادة.", COLOR_BURGUNDY),
        ("L4", "طبقة التكيف والاسترجاع الآمن", "محرك الاسترجاع المتدرج (Rollback) لحماية الشبكة من صدمات الإقلاع.", COLOR_GOLD),
        ("L3", "طبقة المراقبة وحالة مؤشرات KPIs", "المراقبة اللحظية لجودة الخدمة وقياس التسرب الطيفي (Spillover).", COLOR_DEEP_TEAL),
        ("L2", "التنسيق متعدد الموردين (Multi-Vendor)", "محرك التنسيق المؤتمت بين منظومات Huawei و Ericsson المتنافرة.", COLOR_BLUE),
        ("L1", "محرك التحسين والاستمثال (BPSO/AGA)", "الاستمثال متعدد الأهداف وإصلاح القيود وقيد العدالة المكانية SFI.", COLOR_EMERALD),
        ("L0", "الأساس المكاني الجغرافي (GIS Foundation)", "قاعدة بيانات 79,268 موقعاً ومضلعات المحافظات وتضاريس DEM 30m.", COLOR_DARK_TEAL)
    ]

    lay_top_start = 1.8
    lay_h = 0.72
    lay_gap = 0.09
    for idx, (code, title, desc, col) in enumerate(layers):
        top = Inches(lay_top_start + idx * (lay_h + lay_gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(6.8), Inches(lay_h))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = col
        box.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(Inches(0.95), top + Inches(0.04), Inches(6.5), Inches(lay_h - 0.08))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = f"[{code}] {title} — {desc}"
        p0.font.name = FONT_BODY
        p0.font.size = Pt(9.5)
        p0.font.bold = True
        p0.font.color.rgb = col
        p0.alignment = PP_ALIGN.RIGHT

    # Left: Closed-Loop & National Sovereignty Box (Width: 4.6, Height: 4.8)
    left_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.9), Inches(1.8), Inches(4.6), Inches(4.8))
    left_box.fill.solid()
    left_box.fill.fore_color.rgb = COLOR_DARK_SLATE
    left_box.line.color.rgb = COLOR_GOLD
    left_box.line.width = Pt(2)

    tb_lb = slide.shapes.add_textbox(Inches(8.05), Inches(1.95), Inches(4.3), Inches(4.5))
    tf_lb = tb_lb.text_frame
    tf_lb.word_wrap = True

    p0 = tf_lb.paragraphs[0]
    p0.text = "حلقة التحكم الذاتية والأثر الوطني"
    p0.font.name = FONT_TITLE
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = COLOR_GOLD
    p0.alignment = PP_ALIGN.RIGHT
    p0.space_after = Pt(8)

    pts = [
        ("حلقة التحكم المغلقة:", "MONITOR (رصد اللحظي) ⟶ OPTIMIZE (تحسين BPSO/SFI) ⟶ CONTROL (تنفيذ ميداني) ⟶ RESTORE (استرجاع آمن)."),
        ("السيادة التقنية الوطنية:", "إدارة مركزية مستقلة تنهي الارتهان للحلول الخارجية والتشويش العشوائي، وتصون الطيف الترددي السوري."),
        ("دعم مرحلة التعافي:", "أداة تخطيطية وتنظيمية في يد الهيئة الناظمة والمشغلين لترشيد الاستثمارات وحماية أرياف المحافظات في إعادة الإعمار.")
    ]
    for pt_t, pt_d in pts:
        p_t = tf_lb.add_paragraph()
        p_t.text = f"■ {pt_t}"
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_WHITE
        p_t.alignment = PP_ALIGN.RIGHT
        p_t.space_after = Pt(2)

        p_d = tf_lb.add_paragraph()
        p_d.text = pt_d
        p_d.font.name = FONT_BODY
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = RGBColor(203, 213, 225)
        p_d.alignment = PP_ALIGN.RIGHT
        p_d.space_after = Pt(8)

    # Speaker Notes
    notes_script = (
        "نصل الآن إلى الصورة المعمارية الكلية التي تلخص الإجابة الهندسية الشاملة للأطروحة وتوحد كافة فصولها في هيكل واحد متسق.\n\n"
        "على يمين الشاشة، ترون المعمارية الطبقية سداسية المستويات:\n"
        "بدأنا من الأساس الجغرافي L0 حيث ترتكز بيانات 79,268 موقعاً.\n"
        "بنينا فوقه محرك التحسين الرياضي L1 الذي يزن التغطية والكلفة والطاقة والعدالة.\n"
        "ثم طبقة التنسيق متعدد الموردين L2 التي توحد لغة المخاطبة بين هواوي وإريكسون.\n"
        "تليها طبقة المراقبة اللحظية L3 لرصد الأداء والتسرب.\n"
        "ثم طبقة الاسترجاع والتكيف L4 التي تضمن أمان الشبكة.\n"
        "وصولاً إلى القمة L5: شبكة خلوية وطنية ذكية واعية مكانياً.\n\n"
        "وعلى يسار الشاشة، تتفاعل هذه الطبقات عبر حلقة تحكم مغلقة مستمرة: MONITOR لرصد الحالة، ثم OPTIMIZE لاتخاذ القرار، "
        "ثم CONTROL للتنفيذ الميداني، وأخيراً RESTORE للاستعادة الآمنة.\n\n"
        "هذه المعمارية هي التي تمكننا من الانتقال بقطاع الاتصالات من حالة رد الفعل اليدوي المرهق إلى حالة الفعل البرمجي الذاتي المؤتمت."
    )
    set_speaker_notes(slide, "الصورة الكلية: رؤية موحدة لإدارة الشبكات الخلوية الموزعة", "1:30 دقيقة", notes_script)


def build_slide_70(prs):
    """Slide 70: Hero Stat & Analytical Wing (الرسائل الحاسمة للجنة التحكيم)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "الاستنتاجات الجوهرية الأربعة للأطروحة")
    add_footer(slide, 70)

    # Giant Hero Stat Block (Right: Width: 4.2, Height: 4.8)
    hero = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(4.2), Inches(4.8))
    hero.fill.solid()
    hero.fill.fore_color.rgb = COLOR_DARK_SLATE
    hero.line.color.rgb = COLOR_GOLD
    hero.line.width = Pt(2)

    tf_h = hero.text_frame
    tf_h.word_wrap = True

    p_num = tf_h.paragraphs[0]
    p_num.text = "4"
    p_num.font.name = FONT_TITLE
    p_num.font.size = Pt(64)
    p_num.font.bold = True
    p_num.font.color.rgb = COLOR_GOLD
    p_num.alignment = PP_ALIGN.CENTER
    p_num.space_before = Pt(30)

    p_lbl = tf_h.add_paragraph()
    p_lbl.text = "استنتاجات جوهرية حاسمة"
    p_lbl.font.name = FONT_TITLE
    p_lbl.font.size = Pt(16)
    p_lbl.font.bold = True
    p_lbl.font.color.rgb = COLOR_WHITE
    p_lbl.alignment = PP_ALIGN.CENTER
    p_lbl.space_after = Pt(8)

    p_sub = tf_h.add_paragraph()
    p_sub.text = "خلاصة إسهامات الباحث أمام لجنة الحكم الموقرة في المعهد العالي (HIAST)"
    p_sub.font.name = FONT_BODY
    p_sub.font.size = Pt(11)
    p_sub.font.color.rgb = COLOR_DEEP_TEAL
    p_sub.alignment = PP_ALIGN.CENTER
    p_sub.space_after = Pt(16)

    p_ver = tf_h.add_paragraph()
    p_ver.text = "✓ براهين رياضية وتجريبية مثبتة على 79,268 موقعاً بدلالة إحصائية p < 0.001"
    p_ver.font.name = FONT_BODY
    p_ver.font.size = Pt(10.5)
    p_ver.font.bold = True
    p_ver.font.color.rgb = COLOR_GOLD
    p_ver.alignment = PP_ALIGN.CENTER

    # Analytical Wing (Left: 4 stacked cards, Width: 7.2)
    takeaways = [
        ("01. الجغرافيا ركيزة جوهرية للأمثلة (Geography Matters)",
         "يكتسب التحسين الرياضي قيمته التطبيقية عندما تُدمج الخصائص المكانية والتضاريس صراحةً في صياغة المسألة بدلاً من الاكتفاء بالنماذج التجريدية المنعزلة.",
         COLOR_DEEP_TEAL),
        ("02. تكامل الكفاءة والعدالة (Efficiency & Fairness)",
         "كفاءة الشبكة الاقتصادية (CAPEX / Energy) والعدالة المكانية (SFI) ليسا هدفين متناقضين، بل هما غايتان تكامليتان عند صياغة فضاء باريتو بدقة.",
         COLOR_GOLD),
        ("03. جسر GIS نحو التحكم متعدد الموردين (GIS Bridges Control)",
         "نظم GIS تتجاوز الخرائط الصامتة لتتحول إلى محرك تشغيلي يحقق عزلاً مكانياً دقيقاً واستعادة آمنة دون تشويش في البيئات غير المتجانسة.",
         COLOR_BURGUNDY),
        ("04. نحو إدارة شبكية وطنية ذكية وشاملة (Towards Adaptive Management)",
         "نقل قطاع الاتصالات من المعالجات الترقيعية المجزأة إلى نموذج إدارة وطني موحد، تكيّفي، واعٍ مكانياً، وجاهز للمستقبل.",
         COLOR_BLUE)
    ]

    top_start = 1.8
    h_card = 1.12
    gap = 0.11
    for idx, (c_title, c_desc, c_col) in enumerate(takeaways):
        top = Inches(top_start + idx * (h_card + gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.3), top, Inches(7.2), Inches(h_card))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = c_col
        box.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(Inches(5.45), top + Inches(0.08), Inches(6.9), Inches(h_card - 0.16))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = c_title
        p0.font.name = FONT_TITLE
        p0.font.size = Pt(12)
        p0.font.bold = True
        p0.font.color.rgb = c_col
        p0.alignment = PP_ALIGN.RIGHT
        p0.space_after = Pt(2)

        p1 = tf.add_paragraph()
        p1.text = c_desc
        p1.font.name = FONT_BODY
        p1.font.size = Pt(10)
        p1.font.color.rgb = COLOR_TEXT_DARK
        p1.alignment = PP_ALIGN.RIGHT

    # Speaker Notes
    notes_script = (
        "حضرات السادة الأساتذة الأفاضل، نختصر رحلتنا البحثية في أربع رسائل جوهرية نضعها بين أيدي لجنتكم الموقرة:\n\n"
        "الرسالة الأولى: أن الجغرافيا ليست مجرد خلفية للعرض، بل هي ركيزة أصيلة في صياغة معادلات التحسين؛ فالأرقام المجردة عن الواقع المكاني تظل حبراً على ورق.\n\n"
        "الرسالة الثانية: أن الكفاءة والعدالة لا تتناقضان؛ لقد أثبتنا رياضياً وتجريبياً أننا نستطيع بناء شبكة توفر الملايين وترشد الطاقة، "
        "وفي الوقت ذاته تنصف أبناء الأرياف وتمنحهم حق الوصول الرقمي المكافئ للمدن.\n\n"
        "الرسالة الثالثة: أن نظم GIS هي الجسر الحقيقي الذي يحول التخطيط النظري إلى تحكم سيادي مؤتمت يجمع بين تقنيات الموردين المتنافسين ويصون الطيف الراديوي الوطني.\n\n"
        "والرسالة الرابعة: أن هذه الأطروحة تقدم لبلدنا نموذجاً وطنياً متكاملاً للإدارة الواعية مكانياً، يؤسس لمرحلة جديدة في بناء وتطوير البنية التحتية للاتصالات في الجمهورية العربية السورية."
    )
    set_speaker_notes(slide, "الاستنتاجات الجوهرية الأربعة للأطروحة", "1:30 دقيقة", notes_script)


def build_slide_71(prs):
    """Slide 71: Interactive Software UI Frame (المحاكيات التفاعلية)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "التجارب التطبيقية الحية على خريطة سوريا")
    add_footer(slide, 71)

    # Simulated Application Window Frame (Width: 11.7, Height: 4.8)
    frame = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(4.8))
    frame.fill.solid()
    frame.fill.fore_color.rgb = COLOR_SLATE_CARD
    frame.line.color.rgb = COLOR_DEEP_TEAL
    frame.line.width = Pt(2)

    # App Header Bar inside
    hbar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(0.6))
    hbar.fill.solid()
    hbar.fill.fore_color.rgb = COLOR_DARK_SLATE
    hbar.line.fill.background()

    tb_hb = slide.shapes.add_textbox(Inches(0.95), Inches(1.85), Inches(11.4), Inches(0.5))
    tf_hb = tb_hb.text_frame
    tf_hb.word_wrap = True
    phb = tf_hb.paragraphs[0]
    phb.text = "GIS-CELLULAR CONTROL SUITE v2.6   |   رابط المنصة الحية: https://yaser-presentation.vercel.app/tests/   |   بيانات 79,268 موقعاً متاحة حياً"
    phb.font.name = FONT_BODY
    phb.font.size = Pt(10.5)
    phb.font.bold = True
    phb.font.color.rgb = COLOR_GOLD
    phb.alignment = PP_ALIGN.CENTER

    # 3 Interactive Simulation Cards inside the UI (Width: 3.6 each)
    sims = [
        {
            "tag": "EXPERIMENT 01 — التخطيط الاستراتيجي",
            "title": "الترقية التشاركية المثلى لـ 5G",
            "scope": "نطاق الحالة: دمشق وريفها",
            "border": COLOR_DEEP_TEAL,
            "items": [
                "استعراض اختيار وترقية المواقع المثلى بـ BPSO.",
                "مؤشرات الأداء: تغطية 95.12% | وفر 8.4M$ | وفر طاقة 5.3%.",
                "الحالة: جاهز للفحص الفوري التفاعلي أمام اللجنة."
            ]
        },
        {
            "tag": "EXPERIMENT 02 — العدالة المكانية",
            "title": "قيد العدالة المكانية (SFI)",
            "scope": "نطاق الحالة: دمشق والمحافظات المجاورة",
            "border": COLOR_GOLD,
            "items": [
                "معاينة التحول الجغرافي للمواقع عند تفعيل قيد SFI.",
                "مؤشرات الأداء: SFI = 0.71 (+36.5%) | تغطية ريفية 88.7%.",
                "الحالة: مقارنة بصرية حية (Before vs After)."
            ]
        },
        {
            "tag": "EXPERIMENT 03 — التحكم التشغيلي",
            "title": "العزل المكاني الطارئ والاسترجاع",
            "scope": "نطاق الحالة: برزة ومساكن برزة",
            "border": COLOR_BURGUNDY,
            "items": [
                "رسم مضلع جغرافي حي وتقاطع مكاني مع خلايا المحطات.",
                "مؤشرات الأداء: دقة عزل 97.5% | تسرب < 2.5% | استرجاع < 10د.",
                "الحالة: محاكاة سيناريو الطوارئ والتنسيق بين Huawei و Ericsson."
            ]
        }
    ]

    card_w = 3.6
    gap = 0.25
    for idx, s in enumerate(sims):
        left = Inches(1.05 + idx * (card_w + gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.6), Inches(card_w), Inches(3.3))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_DARK_SLATE
        box.line.color.rgb = s["border"]
        box.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(left + Inches(0.12), Inches(2.7), Inches(card_w - 0.24), Inches(3.1))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = s["tag"]
        p0.font.name = FONT_BODY
        p0.font.size = Pt(9)
        p0.font.bold = True
        p0.font.color.rgb = s["border"]
        p0.alignment = PP_ALIGN.RIGHT

        p1 = tf.add_paragraph()
        p1.text = s["title"]
        p1.font.name = FONT_TITLE
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_WHITE
        p1.alignment = PP_ALIGN.RIGHT
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = s["scope"]
        p2.font.name = FONT_BODY
        p2.font.size = Pt(9.5)
        p2.font.bold = True
        p2.font.color.rgb = COLOR_GOLD
        p2.alignment = PP_ALIGN.RIGHT
        p2.space_after = Pt(6)

        for it in s["items"]:
            p = tf.add_paragraph()
            p.text = f"• {it}"
            p.font.name = FONT_BODY
            p.font.size = Pt(9.5)
            p.font.color.rgb = RGBColor(226, 232, 240)
            p.alignment = PP_ALIGN.RIGHT
            p.space_after = Pt(3)

    # Bottom Window Status Banner
    bot_w = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.05), Inches(6.05), Inches(11.2), Inches(0.42))
    bot_w.fill.solid()
    bot_w.fill.fore_color.rgb = COLOR_DARK_TEAL
    bot_w.line.color.rgb = COLOR_GOLD
    bot_w.line.width = Pt(1)
    tf_bw = bot_w.text_frame
    tf_bw.word_wrap = True
    pbw = tf_bw.paragraphs[0]
    pbw.text = "دعوة كريمة للجنة الحكم الموقرة لمعاينة التجارب الحية ومحاكاة سيناريوهات التخطيط والعزل مباشرة عبر المنصة البرمجية"
    pbw.font.name = FONT_BODY
    pbw.font.size = Pt(9.5)
    pbw.font.bold = True
    pbw.font.color.rgb = COLOR_WHITE
    pbw.alignment = PP_ALIGN.CENTER

    # Speaker Notes
    notes_script = (
        "وحتى لا تظل هذه الإنجازات حبيسة المعادلات النظرية والرسوم البيانية الثابتة، يسعدني أن أضع بين أيدي لجنتكم الموقرة منصة المحاكاة "
        "الجغرافية التفاعلية الحية التي قمت بتطويرها ونشرها على الويب.\n\n"
        "من خلال الرابط المعروض أمامكم، يمكننا وبشكل تفاعلي ومباشر استعراض ثلاث تجارب تطبيقية تحاكي واقع الشبكة السورية:\n\n"
        "في التجربة الأولى: نرى كيف تختار خوارزمية BPSO مواقع الترقية في دمشق وريفها محققة نسبة 95.12% بأقل كلفة.\n"
        "وفي التجربة الثانية: نستطيع بلمسة زر تفعيل قيد العدالة المكانية SFI، لنشاهد على الخريطة مباشرة كيف تتوزع التغطية لتنصف المناطق "
        "الريفية وترفع المؤشر إلى 0.71.\n"
        "وفي التجربة الثالثة: نستعرض سيناريو حياً للعزل التشغيلي في منطقة برزة ومساكن برزة، حيث نرى المضلع الجغرافي وهو يحدد الخلايا "
        "المستهدفة بدقة 97.5% وينسق بين معدات هواوي وإريكسون مع إمكانية الاستعادة التامة للخدمة.\n\n"
        "إن وجود هذه المنصة البرمجية الحية يثبت الجاهزية التطبيقية لمنظومتنا وقابليتها للاندماج الفوري في غرف التحكم ومراكز التخطيط الوطنية."
    )
    set_speaker_notes(slide, "التجارب التطبيقية الحية على خريطة سوريا", "2:00 دقيقة", notes_script)


def build_slide_72(prs):
    """Slide 72: Grand Defense Finale Dark Cover (شريحة الختام ونقاش اللجنة)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_slide_background(slide, prs, COLOR_DARK_SLATE)

    # Top Quranic Verse
    tb_quran = slide.shapes.add_textbox(Inches(0.8), Inches(0.6), Inches(11.7), Inches(0.8))
    tf_q = tb_quran.text_frame
    tf_q.word_wrap = True
    pq = tf_q.paragraphs[0]
    pq.text = "﴿ وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ ﴾"
    pq.font.name = "Traditional Arabic"
    pq.font.size = Pt(20)
    pq.font.bold = True
    pq.font.color.rgb = COLOR_GOLD
    pq.alignment = PP_ALIGN.CENTER

    # Main Closing Typography
    tb_main = slide.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.7), Inches(1.2))
    tf_m = tb_main.text_frame
    tf_m.word_wrap = True
    pm1 = tf_m.paragraphs[0]
    pm1.text = "شكراً جزيلاً لحسن استماعكم واهتمامكم الكريم"
    pm1.font.name = FONT_TITLE
    pm1.font.size = Pt(28)
    pm1.font.bold = True
    pm1.font.color.rgb = COLOR_WHITE
    pm1.alignment = PP_ALIGN.CENTER
    pm1.space_after = Pt(4)

    pm2 = tf_m.add_paragraph()
    pm2.text = "THANK YOU FOR YOUR ATTENTION"
    pm2.font.name = FONT_BODY
    pm2.font.size = Pt(13)
    pm2.font.bold = True
    pm2.font.color.rgb = COLOR_DEEP_TEAL
    pm2.alignment = PP_ALIGN.CENTER

    # Thesis Core Paradigm Ribbon
    ribbon = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.8), Inches(2.75), Inches(9.7), Inches(0.8))
    ribbon.fill.solid()
    ribbon.fill.fore_color.rgb = COLOR_SLATE_CARD
    ribbon.line.color.rgb = COLOR_GOLD
    ribbon.line.width = Pt(1.5)
    tf_r = ribbon.text_frame
    tf_r.word_wrap = True
    pr1 = tf_r.paragraphs[0]
    pr1.text = "PLAN (التخطيط الأمثلي)   ⟶   FAIR (العدالة المكانية)   ⟶   CONTROL (التحكم التشغيلي)"
    pr1.font.name = FONT_TITLE
    pr1.font.size = Pt(13)
    pr1.font.bold = True
    pr1.font.color.rgb = COLOR_GOLD
    pr1.alignment = PP_ALIGN.CENTER

    pr2 = tf_r.add_paragraph()
    pr2.text = "نحو شبكات خلوية وطنية ذكية، متوازنة، ومستدامة"
    pr2.font.name = FONT_BODY
    pr2.font.size = Pt(10.5)
    pr2.font.color.rgb = COLOR_WHITE
    pr2.alignment = PP_ALIGN.CENTER

    # 4 Academic Info Cards (Width: 2.7 each, Height: 1.6)
    info_cards = [
        ("الباحث المُعِدّ", "ياسر المفعلاني", "طالب دكتوراه في هندسة الاتصالات والمعلوماتية"),
        ("المشرفون الأكاديميون", "أ.د. مصطفى دقيق", "أ.د. كدان الجمعة"),
        ("الصرح الأكاديمي", "المعهد العالي (HIAST)", "المعهد العالي للعلوم التطبيقية والتكنولوجيا"),
        ("الدرجة والعام", "دكتوراه في الهندسة المعلوماتية", "دمشق — الجمهورية العربية السورية 2026")
    ]

    card_w = 2.7
    gap = 0.3
    for idx, (role, name, sub) in enumerate(info_cards):
        left = Inches(0.8 + idx * (card_w + gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(3.85), Inches(card_w), Inches(1.6))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_SLATE_CARD
        box.line.color.rgb = COLOR_DEEP_TEAL
        box.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(left + Inches(0.1), Inches(3.95), Inches(card_w - 0.2), Inches(1.4))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = role
        p0.font.name = FONT_BODY
        p0.font.size = Pt(10)
        p0.font.bold = True
        p0.font.color.rgb = COLOR_GOLD
        p0.alignment = PP_ALIGN.CENTER

        p1 = tf.add_paragraph()
        p1.text = name
        p1.font.name = FONT_TITLE
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_WHITE
        p1.alignment = PP_ALIGN.CENTER
        p1.space_after = Pt(2)

        p2 = tf.add_paragraph()
        p2.text = sub
        p2.font.name = FONT_BODY
        p2.font.size = Pt(9.5)
        p2.font.color.rgb = COLOR_TEXT_MUTED
        p2.alignment = PP_ALIGN.CENTER

    # Bottom Readiness Callout
    callout = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.8), Inches(5.8), Inches(9.7), Inches(0.9))
    callout.fill.solid()
    callout.fill.fore_color.rgb = COLOR_BURGUNDY
    callout.line.color.rgb = COLOR_GOLD
    callout.line.width = Pt(2)
    tf_co = callout.text_frame
    tf_co.word_wrap = True

    pco1 = tf_co.paragraphs[0]
    pco1.text = "يشرفني الآن استقبال أسئلة وملاحظات وتوجيهات السادة رئيس وأعضاء لجنة الحكم الموقرة"
    pco1.font.name = FONT_TITLE
    pco1.font.size = Pt(14)
    pco1.font.bold = True
    pco1.font.color.rgb = COLOR_WHITE
    pco1.alignment = PP_ALIGN.CENTER

    pco2 = tf_co.add_paragraph()
    pco2.text = "COMMUNITY DEFENSE DISCUSSION & Q&A SESSION IS NOW OPEN"
    pco2.font.name = FONT_BODY
    pco2.font.size = Pt(10)
    pco2.font.bold = True
    pco2.font.color.rgb = COLOR_GOLD
    pco2.alignment = PP_ALIGN.CENTER

    # Speaker Notes
    notes_script = (
        "بسم الله الرحمن الرحيم:\n"
        "﴿ وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ ﴾\n\n"
        "السيد رئيس لجنة الحكم المحترم، السادة أعضاء اللجنة الأفاضل، أستاذيَّ المشرفين الكريمين:\n\n"
        "في ختام هذا العرض، أتوجه بأسمى آيات الشكر والامتنان والتقدير لحضراتكم جميعاً على تفضلكم بقراءة هذه الأطروحة "
        "وتخصيص وقتكم الثمين لتقييمها وتصويب مسارها العلمي.\n\n"
        "كما أتوجه بعميق العرفان إلى صرحنا العلمي المتميز، المعهد العالي للعلوم التطبيقية والتكنولوجيا (HIAST)، الذي كان "
        "ولا يزال منارة للعلم والبحث التطبيقي الرصين، وإلى أستاذيَّ الفاضلين الدكتور مصطفى دقيق والدكتور كدان الجمعة على رعايتهما "
        "الكريمة وتوجيهاتهما السديدة طيلة سنوات البحث.\n\n"
        "إن كان من توفيق فمن الله وفضله، وإن كان من تقصير فمن نفسي. والآن، وبكل سرور واعتزاز وتطلع للاستفادة من علمكم وتوجيهاتكم، "
        "أعلن ختام هذا العرض، وأضع الأطروحة بين أيديكم الكريمة، ومستعد تماماً لأسئلتكم وملاحظاتكم القيّمة.\n\n"
        "والسلام عليكم ورحمة الله وبركاته."
    )
    qa_list = [
        "س1: لماذا فضلتم BPSO على AGA؟ الرد: حققت تغطية أعلى 95.12% (p=0.016)، وفرت 8.4M$، وفرت 5.3% طاقة، ورفعت SFI لـ 0.71 بزمن 118ث.",
        "س2: هل إدماج قيد العدالة SFI يهدر المال في الريف؟ الرد: لا، أعيد توزيع الميزانية بذات السقف (132.8M$) مع الحفاظ على التغطية 95.12% ومراعاة معايير ITU.",
        "س3: كيف تضمنون دقة العزل 97.5% دون انهيار شبكي؟ الرد: طبقة التنسيق تعمل كوسيط محايد Vendor-Neutral والاسترجاع التدريجي (2G ثم 3G ثم 4G) يمنع عواصف الإشارات.",
        "س4: تسرب الريف تجاوز 46%، هل هذا عجز تشغيلي؟ الرد: حتمية فيزيائية لخلايا الماكرو؛ ويوصى بدمج العزل البرمجي مع تعديل زوايا الميل (Tilt)."
    ]
    set_speaker_notes(slide, "خاتمة الدفاع الأكاديمي ونقاش اللجنة", "1:00 دقيقة", notes_script, qa_list)


# ==============================================================================
# 4. MAIN GENERATION ROUTINE
# ==============================================================================

def main():
    print("================================================================")
    print("Building Axis 05 Presentation: Conclusion & Future Outlook")
    print("Slides 59 to 72 — Eng. Yasser Almofaalani PhD Defense (HIAST)")
    print("================================================================")

    prs = create_deck()

    print("-> Generating Slide 59: Dark Academic Section Marker...")
    build_slide_59(prs)

    print("-> Generating Slide 60: 3D Layered Stack (Research Synthesis)...")
    build_slide_60(prs)

    print("-> Generating Slide 61: Triangular Prism Balance (Three Contributions)...")
    build_slide_61(prs)

    print("-> Generating Slide 62: Asymmetric Bento Grid (Key Quantitative Findings)...")
    build_slide_62(prs)

    print("-> Generating Slide 63: Provocative Question & Evidence Web (Main Scientific Lesson)...")
    build_slide_63(prs)

    print("-> Generating Slide 64: Split-Screen High Contrast (From Optimal to Fair SFI)...")
    build_slide_64(prs)

    print("-> Generating Slide 65: Split-Screen High Contrast (Planning to Operational Control)...")
    build_slide_65(prs)

    print("-> Generating Slide 66: Gap-to-Bridge / Boundary Matrix (Engineering Boundaries)...")
    build_slide_66(prs)

    print("-> Generating Slide 67: Asymmetric Bento Grid (Future Perspectives)...")
    build_slide_67(prs)

    print("-> Generating Slide 68: 3-Tier Horizon Roadmap (Research Roadmap)...")
    build_slide_68(prs)

    print("-> Generating Slide 69: Spatial Map-Anchored Canvas (The Big Picture)...")
    build_slide_69(prs)

    print("-> Generating Slide 70: Hero Stat & Analytical Wing (Four Core Takeaways)...")
    build_slide_70(prs)

    print("-> Generating Slide 71: Interactive Software UI Frame (Live Simulation Sandbox)...")
    build_slide_71(prs)

    print("-> Generating Slide 72: Grand Defense Finale Dark Cover (Closing & Q&A)...")
    build_slide_72(prs)

    output_dir = r"d:\Work\todo\Prof_Yaser\Prof_Yaser\final_presentation\22092026"
    output_path = os.path.join(output_dir, "presentation_axis_05.pptx")

    prs.save(output_path)
    print(f"\n[SUCCESS] Axis 05 Presentation created successfully at:")
    print(f"--> {output_path}")
    print(f"Total slides created: {len(prs.slides)}")

if __name__ == "__main__":
    main()
