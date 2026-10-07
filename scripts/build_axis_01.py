"""
build_axis_01.py
Standalone generator script for Axis 01 (Slides 00 to 09) of PhD Defense Presentation:
"Intelligent Planning and Control of Cellular Networks in a GIS Environment"
Higher Institute for Applied Sciences and Technology (HIAST), Damascus, Syria.
Researcher: Eng. Yasser Almofaalani
Academic Supervisors: Prof. Dr. Moustafa Dakkak & Prof. Dr. Kinan Aljoumaa

Strict Compliance:
- Design_System_and_Master_Prompt_Engine.md (Ironclad Anti-Monotony Rule, Palette, Headers/Footers)
- Axis_01_Introduction_and_Context.md (Full Scientific Content, Complete Speaker Notes, Q&A)
- Standalone Output: presentation_axis_01.pptx
"""

import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ==============================================================================
# OFFICIAL COLOR PALETTE (Strict Compliance with Design System)
# ==============================================================================
COLOR_DEEP_TEAL   = RGBColor(66, 129, 119)     # #428177 - Primary Brand Teal
COLOR_DARK_TEAL   = RGBColor(20, 55, 50)       # #143732 - Dark Executive Teal
COLOR_BURGUNDY    = RGBColor(107, 31, 42)      # #6B1F2A - Secondary Academic Burgundy
COLOR_DARK_SLATE  = RGBColor(15, 23, 42)       # #0F172A - Deep Slate Background
COLOR_SLATE_CARD  = RGBColor(30, 41, 59)       # #1E293B - Dark Mode Card Fill
COLOR_LIGHT_BG    = RGBColor(246, 248, 250)    # #F6F8FA - Clean Light Canvas
COLOR_WHITE       = RGBColor(255, 255, 255)    # #FFFFFF - Pure White
COLOR_BORDER      = RGBColor(226, 232, 240)    # #E2E8F0 - Subtle Slate Border
COLOR_TEXT_DARK   = RGBColor(15, 23, 42)       # #0F172A - High-contrast Body Dark
COLOR_TEXT_MUTED  = RGBColor(100, 116, 139)    # #64748B - Muted Subtitle Text
COLOR_GOLD        = RGBColor(217, 119, 6)       # #D97706 - Highlight Amber Gold
COLOR_EMERALD     = RGBColor(16, 185, 129)     # #10B981 - Functional Emerald
COLOR_BLUE        = RGBColor(37, 99, 235)      # #2563EB - Functional Tech Blue
COLOR_CARD_RED    = RGBColor(254, 242, 242)    # Soft Burgundy background
COLOR_CARD_TEAL   = RGBColor(240, 253, 250)    # Soft Teal background

FONT_TITLE = "Segoe UI"
FONT_BODY  = "Segoe UI"

# ==============================================================================
# HELPER FUNCTIONS: PRESENTATION BASE, HEADERS, FOOTERS & NOTES
# ==============================================================================
def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.500)
    return prs

def set_background(slide, prs, color):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    return bg

def add_header(slide, title_ar, section_name, is_dark=False):
    # Top Breadcrumb Badge (Right-aligned)
    tb_b = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.733), Inches(0.32))
    tf_b = tb_b.text_frame
    tf_b.word_wrap = True
    p_b = tf_b.paragraphs[0]
    p_b.text = f"المعهد العالي للعلوم التطبيقية والتكنولوجيا  |  {section_name}"
    p_b.font.name = FONT_BODY
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = COLOR_GOLD if is_dark else COLOR_DEEP_TEAL
    p_b.alignment = PP_ALIGN.RIGHT

    # Main Slide Title (Right-aligned)
    tb_t = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.733), Inches(0.72))
    tf_t = tb_t.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = title_ar
    p_t.font.name = FONT_TITLE
    p_t.font.size = Pt(22)
    p_t.font.bold = True
    p_t.font.color.rgb = COLOR_WHITE if is_dark else COLOR_TEXT_DARK
    p_t.alignment = PP_ALIGN.RIGHT

def add_footer(slide, slide_num, total_slides=73, is_dark=False):
    tb_f = slide.shapes.add_textbox(Inches(0.8), Inches(6.92), Inches(11.733), Inches(0.35))
    tf_f = tb_f.text_frame
    p_f = tf_f.paragraphs[0]
    num_str = f"{slide_num:02d}" if isinstance(slide_num, int) else str(slide_num)
    p_f.text = f"أطروحة دكتوراه: التخطيط والتحكم الذكي بالشبكات الخلوية في بيئة GIS  —  ياسر المفعلاني   |   شريحة {num_str} من {total_slides}"
    p_f.font.name = FONT_BODY
    p_f.font.size = Pt(9.5)
    p_f.font.color.rgb = RGBColor(148, 163, 184) if is_dark else COLOR_TEXT_MUTED
    p_f.alignment = PP_ALIGN.RIGHT

def set_speaker_notes(slide, notes_title, est_time, script_text, qa_list=None):
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    tf.clear()

    p0 = tf.paragraphs[0]
    p0.text = f"=== {notes_title} (الزمن التقديري: {est_time}) ==="
    p0.font.bold = True
    p0.font.size = Pt(11)

    p_body = tf.add_paragraph()
    p_body.text = f"\n[سيناريو الإلقاء للمتحدث أمام لجنة التحكيم]:\n{script_text}"
    p_body.font.size = Pt(10)

    if qa_list:
        p_qa_head = tf.add_paragraph()
        p_qa_head.text = "\n[بنك الأسئلة المتوقعة من لجنة التحكيم والردود النموذجية]:"
        p_qa_head.font.bold = True
        p_qa_head.font.size = Pt(10)

        for q, a in qa_list:
            p_q = tf.add_paragraph()
            p_q.text = f"• س: {q}"
            p_q.font.bold = True
            p_q.font.size = Pt(9.5)

            p_a = tf.add_paragraph()
            p_a.text = f"  ج: {a}"
            p_a.font.size = Pt(9.5)

# ==============================================================================
# SLIDE BUILDERS (Slides 00 to 09)
# ==============================================================================

def build_slide_00(prs):
    """Slide 00: Dark Master Cover (غلاف الأطروحة الأكاديمي والسيادي)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_DARK_SLATE)

    # 1. Syrian Institutional Header Bar
    tb_inst = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11.733), Inches(0.45))
    tf_inst = tb_inst.text_frame
    p_inst = tf_inst.paragraphs[0]
    p_inst.text = "الجمهورية العربية السورية  |  المعهد العالي للعلوم التطبيقية والتكنولوجيا (HIAST)  |  قسم المعلوماتية"
    p_inst.font.name = FONT_TITLE
    p_inst.font.size = Pt(13)
    p_inst.font.bold = True
    p_inst.font.color.rgb = COLOR_GOLD
    p_inst.alignment = PP_ALIGN.CENTER

    # 2. PhD Thesis Badge
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.3), Inches(1.05), Inches(4.733), Inches(0.52))
    badge.fill.solid()
    badge.fill.fore_color.rgb = COLOR_BURGUNDY
    badge.line.color.rgb = COLOR_GOLD
    badge.line.width = Pt(1.5)
    p_b = badge.text_frame.paragraphs[0]
    p_b.text = "🎓 أطروحة دكتوراه في الهندسة المعلوماتية (نظم ذكية وشبكات)"
    p_b.font.name = FONT_TITLE
    p_b.font.size = Pt(12)
    p_b.font.bold = True
    p_b.font.color.rgb = COLOR_WHITE
    p_b.alignment = PP_ALIGN.CENTER

    # 3. Thesis Main Title
    tb_t = slide.shapes.add_textbox(Inches(0.8), Inches(1.75), Inches(11.733), Inches(1.8))
    tf_t = tb_t.text_frame
    tf_t.word_wrap = True

    p_t1 = tf_t.paragraphs[0]
    p_t1.text = "التخطيط والتحكم الذكي بالشبكة الخليوية في بيئة نظم المعلومات الجغرافية (GIS)"
    p_t1.font.name = FONT_TITLE
    p_t1.font.size = Pt(27)
    p_t1.font.bold = True
    p_t1.font.color.rgb = COLOR_WHITE
    p_t1.alignment = PP_ALIGN.CENTER

    p_t2 = tf_t.add_paragraph()
    p_t2.text = "Intelligent Planning and Control of Cellular Networks in a Geographic Information Systems (GIS) Environment"
    p_t2.font.name = FONT_BODY
    p_t2.font.size = Pt(14)
    p_t2.font.color.rgb = COLOR_DEEP_TEAL
    p_t2.alignment = PP_ALIGN.CENTER
    p_t2.space_before = Pt(6)

    # 4. Author and Supervisors Split Cards
    # Right: Author
    card_author = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(3.7), Inches(5.7), Inches(1.9))
    card_author.fill.solid()
    card_author.fill.fore_color.rgb = COLOR_SLATE_CARD
    card_author.line.color.rgb = COLOR_DEEP_TEAL
    card_author.line.width = Pt(1.5)

    tf_auth = card_author.text_frame
    tf_auth.word_wrap = True
    p_a0 = tf_auth.paragraphs[0]
    p_a0.text = "الباحث والدرجة الأكاديمية"
    p_a0.font.name = FONT_TITLE
    p_a0.font.size = Pt(13)
    p_a0.font.bold = True
    p_a0.font.color.rgb = COLOR_GOLD
    p_a0.alignment = PP_ALIGN.RIGHT

    lines_auth = [
        "إعداد المهندس: ياسر المفعلاني (Eng. Yasser Almofaalani)",
        "درجة دكتوراه فلسفة (PhD) في الهندسة المعلوماتية",
        "دراسة تطبيقية ميدانية على كامل شبكة الجمهورية العربية السورية (79,268 موقعاً)"
    ]
    for line in lines_auth:
        p = tf_auth.add_paragraph()
        p.text = f"• {line}"
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.color.rgb = RGBColor(226, 232, 240)
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(3)

    # Left: Supervisors
    card_sup = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.833), Inches(3.7), Inches(5.7), Inches(1.9))
    card_sup.fill.solid()
    card_sup.fill.fore_color.rgb = COLOR_SLATE_CARD
    card_sup.line.color.rgb = COLOR_BURGUNDY
    card_sup.line.width = Pt(1.5)

    tf_sup = card_sup.text_frame
    tf_sup.word_wrap = True
    p_s0 = tf_sup.paragraphs[0]
    p_s0.text = "لجنة الإشراف العلمي"
    p_s0.font.name = FONT_TITLE
    p_s0.font.size = Pt(13)
    p_s0.font.bold = True
    p_s0.font.color.rgb = COLOR_GOLD
    p_s0.alignment = PP_ALIGN.RIGHT

    lines_sup = [
        "الأستاذ الدكتور مصطفى دقّاك (Prof. Dr. Moustafa Dakkak) — HIAST",
        "الأستاذ الدكتور كادان الجمعة (Prof. Dr. Kinan Aljoumaa) — HIAST",
        "المكان والتاريخ: دمشق، الجمهورية العربية السورية — 2026 م"
    ]
    for line in lines_sup:
        p = tf_sup.add_paragraph()
        p.text = f"• {line}"
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.color.rgb = RGBColor(226, 232, 240)
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(3)

    # 5. Bottom 4 HUD Widgets (Telemetry & Research Scope)
    hud_items = [
        ("البيئة الجغرافية 3D GIS", "طبقات تضاريس DEM 30m واستخدامات الأراضي Clutter", COLOR_DEEP_TEAL),
        ("الانتشار الراديوي 5G", "محاكاة تتبع الأشعة بمعيار 3GPP TR 38.901", COLOR_BLUE),
        ("الاستمثال والعدالة SFI", "خوارزمية BPSO-AGA الهجينة ومؤشر SFI = 0.71", COLOR_GOLD),
        ("التحكم البرمجي السيادي", "عزل جغرافي لحظي بدون تشويش واستعادة < 10 د", COLOR_EMERALD)
    ]
    w_hud = 2.75
    gap_hud = 0.244
    for idx, (h_title, h_sub, h_col) in enumerate(hud_items):
        l_pos = 0.8 + idx * (w_hud + gap_hud)
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(l_pos), Inches(5.75), Inches(w_hud), Inches(0.95))
        box.fill.solid()
        box.fill.fore_color.rgb = RGBColor(20, 30, 48)
        box.line.color.rgb = h_col
        box.line.width = Pt(1)

        tf_h = box.text_frame
        tf_h.word_wrap = True
        p1 = tf_h.paragraphs[0]
        p1.text = h_title
        p1.font.name = FONT_TITLE
        p1.font.size = Pt(11)
        p1.font.bold = True
        p1.font.color.rgb = h_col
        p1.alignment = PP_ALIGN.CENTER

        p2 = tf_h.add_paragraph()
        p2.text = h_sub
        p2.font.name = FONT_BODY
        p2.font.size = Pt(9)
        p2.font.color.rgb = RGBColor(203, 213, 225)
        p2.alignment = PP_ALIGN.CENTER
        p2.space_before = Pt(2)

    add_footer(slide, 0, 73, is_dark=True)

    # Speaker Notes
    script = (
        "بسم الله الرحمن الرحيم، والصلاة والسلام على رسوله الكريم.\n"
        "الأستاذ الدكتور رئيس اللجنة الموقر، أساتذتي الأفاضل أعضاء لجنة الحكم والمناقشة الكرام، "
        "أستاذي المشرفين العزيزين الأستاذ الدكتور مصطفى دقّاك والأستاذ الدكتور كادان الجمعة، الحضور الأكارم، "
        "السلام عليكم ورحمة الله وبركاته.\n"
        "يشرفني في هذا اليوم العلمي المبارك أن أقف بين أيديكم في رحاب المعهد العالي للعلوم التطبيقية والتكنولوجيا، "
        "لأعرض على مسامعكم وخبراتكم الراسخة أطروحة الدكتوراه في الهندسة المعلوماتية بعنوان: "
        "'التخطيط والتحكم الذكي بالشبكة الخليوية في بيئة نظم المعلومات الجغرافية GIS'.\n"
        "تنطلق هذه الأطروحة من مفصل استراتيجي يجمع بين ثلاثة علوم هندسية: بحوث العمليات والاستمثال الرياضي، "
        "وهندسة شبكات الاتصالات الخلوية المتقدمة 5G، وعلم البيانات المكانية ثلاثية الأبعاد GIS. "
        "وقد طُبق هذا العمل عبر دراسة وطنية حقيقية غير مسبوقة شملت شبكة الجمهورية العربية السورية بكامل مواقعها "
        "البالغة 79,268 موقعاً خلوياً، مقدماً حلولاً جذرية لمعضلات التكلفة، عجز الطاقة، التفاوت بين الريف والمدينة، "
        "والتحكم البرمجي السيادي بالشبكة دون الحاجة لأجهزة التشويش التقليدية."
    )
    qa = [(
        "جاء عنوان الأطروحة جامعاً بين التخطيط (Planning) والتحكم (Control). أليست أدوات التخطيط الخلوي التقليدية مثل Atoll كافية؟ ولماذا استلزم الأمر بناء منصة جديدة داخل بيئة GIS؟",
        "الأدوات التجارية التقليدية كبرنامج Atoll صُممت لتعمل كأدوات تخطيط ثابتة (Offline Static Planning)، حيث تُستخدم المعطيات المكانية كخلفية جامدة لحسابات التخامد فقط، وتفتقر للربط اللحظي مع الشبكة التشغيلية، كما أنها تنحاز للمدن وتفتقر لمؤشر العدالة المكانية، ولا تدعم العزل البرمجي في البيئات متعددة الموردين. أطروحتنا نقلت GIS إلى محرك استمثال وتحكم تشغيلي متكامل (GIS-to-RAN Control Loop)."
    )]
    set_speaker_notes(slide, "غلاف الأطروحة الأكاديمي والسيادي", "1.5 - 2 دقيقة", script, qa)


def build_slide_01(prs):
    """Slide 01: Orbital 5-Node Agenda (خارطة العرض والأجندة التفاعلية)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "مخطط العرض وهيكلية الأطروحة (خارطة الطريق الأكاديمية)", "المقدمة والافتتاح")

    # Center Orbital Hub Box
    hub = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.5), Inches(1.6), Inches(4.333), Inches(1.1))
    hub.fill.solid()
    hub.fill.fore_color.rgb = COLOR_DARK_TEAL
    hub.line.color.rgb = COLOR_GOLD
    hub.line.width = Pt(2)
    tf_hub = hub.text_frame
    tf_hub.word_wrap = True
    p_h1 = tf_hub.paragraphs[0]
    p_h1.text = "النواة المركزية للأطروحة"
    p_h1.font.name = FONT_TITLE
    p_h1.font.size = Pt(11)
    p_h1.font.bold = True
    p_h1.font.color.rgb = COLOR_GOLD
    p_h1.alignment = PP_ALIGN.CENTER
    p_h2 = tf_hub.add_paragraph()
    p_h2.text = "دورة حياة الشبكة الوطنية في بيئة نظم المعلومات الجغرافية GIS"
    p_h2.font.name = FONT_TITLE
    p_h2.font.size = Pt(13)
    p_h2.font.bold = True
    p_h2.font.color.rgb = COLOR_WHITE
    p_h2.alignment = PP_ALIGN.CENTER

    # 5 Orbital Nodes
    nodes = [
        ("01", "المقدمة وسياق البحث", "السياق الدولي والمحلي، أزمة شبكة سوريا (79,268 موقعاً)، صياغة الإشكالية وأسئلة البحث.", "السلايدات: 02 - 09", COLOR_DEEP_TEAL),
        ("02", "الدراسات النظرية والمرجعية", "المفاهيم الراديوية، انتشار الأمواج، الخوارزميات التطورية وحشود BPSO، وتحديد الفجوات الثلاث.", "السلايدات: 10 - 16", COLOR_BURGUNDY),
        ("03", "المساهمات البحثية الأساسية", "المسار التكاملي الثلاثي: PLAN (الترقية الأمثل) -> FAIR (العدالة SFI) -> CONTROL (العزل البرمجي).", "السلايدات: 17 - 45", COLOR_DEEP_TEAL),
        ("04", "النتائج والأوراق المنشورة", "الحصاد الإحصائي (Wilcoxon p < 0.001)، والورقة المنشورة بمجلة Computer Networks (Elsevier Q1).", "السلايدات: 46 - 58", COLOR_BURGUNDY),
        ("05", "الخاتمة والآفاق المستقبلية", "الدروس الهندسية المستخلصة، توصيات المشغلين، وخارطة طريق أبحاث 6G والشبكات غير الأرضية NTN.", "السلايدات: 59 - 72", COLOR_GOLD),
    ]

    card_w = 2.22
    gap_n = 0.158
    for idx, (num, title_n, desc_n, range_n, col_n) in enumerate(nodes):
        left_pos = 0.8 + idx * (card_w + gap_n)
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left_pos), Inches(2.9), Inches(card_w), Inches(3.8))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_WHITE
        card.line.color.rgb = col_n
        card.line.width = Pt(2)

        tf = card.text_frame
        tf.word_wrap = True

        # Number Badge inside
        p_num = tf.paragraphs[0]
        p_num.text = num
        p_num.font.name = FONT_TITLE
        p_num.font.size = Pt(26)
        p_num.font.bold = True
        p_num.font.color.rgb = col_n
        p_num.alignment = PP_ALIGN.CENTER

        # Title
        p_t = tf.add_paragraph()
        p_t.text = title_n
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_TEXT_DARK
        p_t.alignment = PP_ALIGN.CENTER
        p_t.space_before = Pt(4)
        p_t.space_after = Pt(6)

        # Range Badge
        p_r = tf.add_paragraph()
        p_r.text = range_n
        p_r.font.name = FONT_BODY
        p_r.font.size = Pt(10)
        p_r.font.bold = True
        p_r.font.color.rgb = col_n
        p_r.alignment = PP_ALIGN.CENTER
        p_r.space_after = Pt(8)

        # Description
        p_d = tf.add_paragraph()
        p_d.text = desc_n
        p_d.font.name = FONT_BODY
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = COLOR_TEXT_MUTED
        p_d.alignment = PP_ALIGN.RIGHT
        p_d.space_before = Pt(4)

    add_footer(slide, 1, 73)

    script = (
        "سادتي الأفاضل، قُسّم هذا العرض التقديمي إلى خمسة أقسام رئيسية تتبع بدقة التسلسل العلمي الموثق في أطروحة الدكتوراه:\n"
        "سنبدأ في القسم الأول بالوقوف على سياق البحث المحلي والدولي وأزمة التخطيط في سوريا، لنصوغ بدقة متناهية الإشكالية المركزية وأهدافها الاستراتيجية وأسئلتها الجوهرية.\n"
        "ومن ثم ننتقل في القسم الثاني إلى مراجعة الأدبيات المرجعية والأسس النظرية لأنظمة الراديو وخوارزميات الذكاء الصنعي، لنحدد الفجوة المعرفية الدقيقة.\n"
        "أما في القسم الثالث — وهو القلب العلمي للأطروحة — فسأعرض مساهماتنا البحثية الثلاث المترابطة عضوياً تحت شعار: PLAN -> FAIR -> CONTROL؛ "
        "حيث نجيب: أين نرقي الأبراج؟ ثم: كيف نعدل الخوارزميات لتنصف الأرياف؟ ثم: كيف نتحكم تشغيلياً بالشبكة لحظة الأزمات؟\n"
        "لننتقل بعدها للقسم الرابع ونستعرض الحصاد الرقمي والنتائج الإحصائية المدعومة بـ 30 تشغيلاً مستقلاً، والأوراق المنشورة في مجلة Computer Networks.\n"
        "ونختتم في القسم الخامس بالاستنتاجات والتوصيات وآفاق ما بعد الجيل الخامس.\n"
        "وننطلق الآن مع القسم الأول: المقدمة وسياق البحث."
    )
    qa = [(
        "نلاحظ أن العرض يغطي مساحة علمية واسعة من الاستمثال الرياضي إلى التوزيع الجغرافي وصولاً للتحكم الميداني. كيف حافظ الباحث على خيط ناظم يمنع تشتت الأطروحة؟",
        "الخيط الناظم هو 'دورة حياة الشبكة الوطنية في بيئة GIS'. التخطيط الأمثل (PLAN) أفرز كفاءة عالية لكنه كشف عيباً هيكلياً بحرمان الريف، مما استلزم نموذج العدالة المكانية (FAIR). وعندما وُزعت الشبكة بعدالة، فرض الواقع الميداني حتمية السيطرة التشغيلية وحمايتها (CONTROL). كل ذلك ينبثق من محرك مكاني موحد وقاعدة بيانات وطنية واحدة."
    )]
    set_speaker_notes(slide, "خارطة العرض وهيكلية الأطروحة", "1 دقيقة", script, qa)


def build_slide_02(prs):
    """Slide 02: Dark Academic Section Marker (فاصل المحور الأول: المقدمة)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_DARK_SLATE)

    # Central Section Badge
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.4), Inches(1.2), Inches(2.533), Inches(0.6))
    badge.fill.solid()
    badge.fill.fore_color.rgb = COLOR_DEEP_TEAL
    badge.line.color.rgb = COLOR_GOLD
    badge.line.width = Pt(1.5)
    p_b = badge.text_frame.paragraphs[0]
    p_b.text = "المحور الأول | Part 01"
    p_b.font.name = FONT_TITLE
    p_b.font.size = Pt(15)
    p_b.font.bold = True
    p_b.font.color.rgb = COLOR_WHITE
    p_b.alignment = PP_ALIGN.CENTER

    # Main Section Title
    tb_m = slide.shapes.add_textbox(Inches(0.8), Inches(1.95), Inches(11.733), Inches(1.4))
    tf_m = tb_m.text_frame
    tf_m.word_wrap = True
    p_m1 = tf_m.paragraphs[0]
    p_m1.text = "المقدمة وسياق البحث وأزمة التخطيط وإشكالية الأطروحة"
    p_m1.font.name = FONT_TITLE
    p_m1.font.size = Pt(30)
    p_m1.font.bold = True
    p_m1.font.color.rgb = COLOR_WHITE
    p_m1.alignment = PP_ALIGN.CENTER

    p_m2 = tf_m.add_paragraph()
    p_m2.text = "من التطور المعياري العالمي إلى الواقع الاستثنائي للشبكة السورية (79,268 موقعاً)"
    p_m2.font.name = FONT_BODY
    p_m2.font.size = Pt(14)
    p_m2.font.color.rgb = COLOR_GOLD
    p_m2.alignment = PP_ALIGN.CENTER
    p_m2.space_before = Pt(6)

    # 4 Pillar Cards on Dark Canvas
    pillars = [
        ("1. تطور أجيال الاتصالات", "التحول نحو 5G-Advanced (3GPP Rel-18) والترقية التشاركية الذكية للأبراج Co-siting.", COLOR_DEEP_TEAL),
        ("2. واقع الشبكة السورية", "79,268 موقعاً خلوياً، قيود التمويل، أزمة الكهرباء، وتفاوت التغطية بين الريف والمدينة.", COLOR_BURGUNDY),
        ("3. إشكالية البحث المركزية", "المعضلة ثلاثية الأبعاد: التغطية ونقاء الإشارة vs الكلفة والطاقة vs العدالة والتحكم.", COLOR_GOLD),
        ("4. الأهداف والأسئلة البحثية", "بناء نموذج استمثال 4 في 1، إثبات تفوق BPSO، مؤشر SFI، والعزل البرمجي السيادي.", COLOR_EMERALD)
    ]

    card_w = 2.75
    gap_p = 0.244
    for idx, (p_title, p_desc, p_col) in enumerate(pillars):
        left_pos = 0.8 + idx * (card_w + gap_p)
        c = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left_pos), Inches(3.7), Inches(card_w), Inches(2.8))
        c.fill.solid()
        c.fill.fore_color.rgb = COLOR_SLATE_CARD
        c.line.color.rgb = p_col
        c.line.width = Pt(1.5)

        tf = c.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = p_title
        p1.font.name = FONT_TITLE
        p1.font.size = Pt(14)
        p1.font.bold = True
        p1.font.color.rgb = p_col
        p1.alignment = PP_ALIGN.CENTER

        p2 = tf.add_paragraph()
        p2.text = p_desc
        p2.font.name = FONT_BODY
        p2.font.size = Pt(11.5)
        p2.font.color.rgb = RGBColor(226, 232, 240)
        p2.alignment = PP_ALIGN.RIGHT
        p2.space_before = Pt(12)

    add_footer(slide, 2, 73, is_dark=True)

    script = (
        "نبدأ مستعينين بالله بالقسم الأول من هذا العرض: المقدمة وسياق البحث.\n"
        "في هذا القسم، سنستعرض التطور المعياري العالمي لشبكات الاتصالات وصولاً إلى الجيل الخامس المتقدم Rel-18، "
        "ونضعه جنباً إلى جنب مع الواقع الاستثنائي المعقد لشبكتنا الخلوية السورية بمواقعها الـ 79,268، "
        "لنبلور معاً الإشكالية العلمية المركبة التي تتصدى لها هذه الأطروحة، وأهدافها الاستراتيجية وأسئلتها الجوهرية."
    )
    set_speaker_notes(slide, "فاصل المحور الأول: المقدمة وسياق البحث", "30 ثانية", script)


def build_slide_03(prs):
    """Slide 03: Split-Screen High Contrast (لماذا الآن؟ التحولات العالمية والمحلية)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "دوافع البحث: لماذا الآن؟ التحولات العالمية والضرورات الميدانية", "المحور الأول: المقدمة وسياق البحث")

    # Right Half: Local Syrian Imperatives (Burgundy Theme)
    card_r = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(5.6), Inches(4.3))
    card_r.fill.solid()
    card_r.fill.fore_color.rgb = COLOR_CARD_RED
    card_r.line.color.rgb = COLOR_BURGUNDY
    card_r.line.width = Pt(2)

    tf_r = card_r.text_frame
    tf_r.word_wrap = True
    p_r0 = tf_r.paragraphs[0]
    p_r0.text = "الواقع والضرورات الميدانية السورية (Local Imperatives)"
    p_r0.font.name = FONT_TITLE
    p_r0.font.size = Pt(14)
    p_r0.font.bold = True
    p_r0.font.color.rgb = COLOR_BURGUNDY
    p_r0.alignment = PP_ALIGN.RIGHT

    items_r = [
        "أزمة الطاقة الحادة: انقطاع التغذية الكهربائية والاعتماد المرهق على المولدات والديزل وارتفاع كلفة الطاقة.",
        "القيود الاقتصادية والتمويل: استحالة بناء شبكات جديدة من الصفر (Greenfield) لارتفاع النفقات الرأسمالية.",
        "حجم الشبكة الميدانية: 79,268 موقعاً لمشغلي سيريتل و MTN بحاجة لخطة ترقية انتقائية مدروسة ومجدية.",
        "معضلة التحيز التجاري: تركيز 95% من سعات 4G في المدن وحرمان 38% من سكان الريف من خدمات النطاق العريض.",
        "الحاجة للتحكم الآمن: ضرورة الاستغناء عن أجهزة التشويش التقليدية المضرة بالمشافي وشبكات الطوارئ."
    ]
    for it in items_r:
        p = tf_r.add_paragraph()
        p.text = f"• {it}"
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(4)

    # Left Half: Global Trends (Teal Theme)
    card_l = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.933), Inches(1.6), Inches(5.6), Inches(4.3))
    card_l.fill.solid()
    card_l.fill.fore_color.rgb = COLOR_CARD_TEAL
    card_l.line.color.rgb = COLOR_DEEP_TEAL
    card_l.line.width = Pt(2)

    tf_l = card_l.text_frame
    tf_l.word_wrap = True
    p_l0 = tf_l.paragraphs[0]
    p_l0.text = "التحولات المعيارية والتقنية العالمية (Global Trends)"
    p_l0.font.name = FONT_TITLE
    p_l0.font.size = Pt(14)
    p_l0.font.bold = True
    p_l0.font.color.rgb = COLOR_DEEP_TEAL
    p_l0.alignment = PP_ALIGN.RIGHT

    items_l = [
        "معايير 5G-Advanced (3GPP Rel-18): الانتقال إلى خدمات eMBB فائقة وكمون منخفض جداً URLLC < 1ms.",
        "التعقيد التوافقي NP-Hard: تخطيط الشبكة مسألة لا خطية متعددة القيود تستدعي استدلالاً فوقياً هجيناً.",
        "النمذجة الطبوغرافية 3D GIS: الانتقال من المحاكاة النظرية المستوية إلى دمج طبقات الارتفاع DEM 30m.",
        "كفاءة الطاقة الخضراء: تحسين استهلاك البت المنقول بعشرة أضعاف وتفعيل أنماط سكون الخلايا Cell Sleep.",
        "العزل البرمجي السيادي: هندسة Geofencing برمجية متوافقة دولياً تحجب البيانات وتصون مكالمات الطوارئ 112."
    ]
    for it in items_l:
        p = tf_l.add_paragraph()
        p.text = f"• {it}"
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(4)

    # Central VS Badge
    vs = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(6.166), Inches(3.2), Inches(1.0), Inches(1.0))
    vs.fill.solid()
    vs.fill.fore_color.rgb = COLOR_GOLD
    vs.line.color.rgb = COLOR_WHITE
    vs.line.width = Pt(2)
    p_vs = vs.text_frame.paragraphs[0]
    p_vs.text = "VS"
    p_vs.font.name = FONT_TITLE
    p_vs.font.size = Pt(18)
    p_vs.font.bold = True
    p_vs.font.color.rgb = COLOR_WHITE
    p_vs.alignment = PP_ALIGN.CENTER

    # Bottom Synthesis Banner
    banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.05), Inches(11.733), Inches(0.72))
    banner.fill.solid()
    banner.fill.fore_color.rgb = COLOR_DARK_TEAL
    banner.line.fill.background()
    tf_ban = banner.text_frame
    p_ban = tf_ban.paragraphs[0]
    p_ban.text = "الدافع الاستراتيجي الحاسم: الترقية التشاركية الذكية (Co-siting) كخيار وطني حتمي يدمج أحدث معايير 5G بالواقع المقيد."
    p_ban.font.name = FONT_TITLE
    p_ban.font.size = Pt(12)
    p_ban.font.bold = True
    p_ban.font.color.rgb = COLOR_WHITE
    p_ban.alignment = PP_ALIGN.CENTER

    add_footer(slide, 3, 73)

    script = (
        "قد يتبادر إلى الذهن سؤال بديهي: لماذا هذه الأطروحة؟ ولماذا في هذا التوقيت بالذات؟\n"
        "إن الإجابة تتلخص في خمسة دوافع استراتيجية متكاملة تتضافر فيما بينها:\n"
        "أولاً: الدافع المعياري العالمي؛ فنحن نشهد التحول نحو الإصدار 18 من 3GPP (5G-Advanced)، حيث لا مجال للتأخر عن الركب التكنولوجي.\n"
        "ثانياً: التعقيد الرياضي للمسألة؛ فتخطيط شبكة بلد كامل يمثل مسألة NP-Hard يستحيل حلها بالاستقراء التام، مما تطلب ابتكار نموذج هجين BPSO-AGA مع آلية إصلاح القيود، يسرع الحل بنسبة 35% ويضمن حلولاً مقبولة بالكامل.\n"
        "ثالثاً: واقعية البيئة السورية؛ فلسنا بصدد محاكاة افتراضية، بل بنينا نماذجنا على بيانات مكانية حقيقية وتضاريس واقعية لمعالجة فجوة التغطية وإرساء العدالة عبر مؤشر SFI المبتكر.\n"
        "رابعاً: الجدوى الاقتصادية الحتمية؛ ففي ظل ندرة التمويل وشح المحروقات، اعتمدنا مبدأ الترقية التشاركية للأبراج القائمة محققين وفراً رأسمالياً يفوق 62.4%.\n"
        "وخامساً: البعد التشغيلي والسيادي؛ حيث تجاوزنا أجهزة التشويش التخريبية بابتكار تحكم برمجي بالطيف لعزل المناطق المستهدفة مع صون مكالمات الطوارئ."
    )
    qa = [(
        "تحدثت عن نشر 5G-Advanced بينما يعاني المواطنون من ضعف 3G و 4G وانقطاع الكهرباء. ألا ترون فجوة بين الطرح الأكاديمي والواقع الميداني؟",
        "هذا التحدي بالذات هو الدافع الأكبر لبحثنا؛ فنشر 5G وفق رؤيتنا التشاركية المقيدة هو الحل الأمثل لأزمة الطاقة والتشغيل: كفاءة الطاقة في 5G لكل بت تفوق 4G بنحو 10 أضعاف بفضل Massive MIMO وسكون الخلايا المتقدم. خوارزمياتنا خفضت الحمل الطاقي بنسبة 38.5% خارج الذروة ووفرت 62.4% من التكلفة الرأسمالية."
    )]
    set_speaker_notes(slide, "دوافع البحث: لماذا الآن؟", "1.5 - 2 دقيقة", script, qa)


def build_slide_04(prs):
    """Slide 04: Horizontal Pipeline / Process Flow (مسار تطور الأجيال والترقية)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "تطور أجيال الاتصالات: التحول من 4G إلى 5G ومتطلبات الترقية التشاركية للأبراج", "المحور الأول: المقدمة وسياق البحث")

    # Pipeline: 4 Connected Milestone Steps
    steps = [
        ("المحطة 1: واقع الأجيال الحالي",
         "21,356 موقعاً 2G\n27,902 موقعاً 3G\n30,010 مواقع 4G (المرشحة)",
         "79,268 موقعاً في الميدان", COLOR_TEXT_MUTED),
        ("المحطة 2: رفض مسار Greenfield",
         "تكلفة إنشائية 100% (باهظة جداً)\nبطء شديد في النشر الميداني\nتفاقم حرمان الريف (SFI = 0.41)",
         "مرفوض اقتصادياً وتنموياً", COLOR_BURGUNDY),
        ("المحطة 3: محرك الترقية التشاركية",
         "مكدس GIS: تضاريس DEM 30m\nمراكز الكثافة السكانية والنشاط\nمحاكاة دوائر التداخل الراديوي",
         "Co-siting Guided by GIS", COLOR_DEEP_TEAL),
        ("المحطة 4: المكاسب الوطنية الكبرى",
         "وفر رأسمالي CapEx بنسبة 62.4%\nتسريع النشر بـ 3.5 أضعاف\nرفع العدالة إلى SFI = 0.71",
         "استدامة وجودة وسيادة", COLOR_GOLD)
    ]

    pipe_w = 2.75
    gap_pipe = 0.244
    for idx, (s_title, s_body, s_badge, s_col) in enumerate(steps):
        l_pos = 0.8 + idx * (pipe_w + gap_pipe)
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(l_pos), Inches(1.6), Inches(pipe_w), Inches(3.2))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_WHITE
        card.line.color.rgb = s_col
        card.line.width = Pt(2)

        tf = card.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = s_title
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(12.5)
        p_t.font.bold = True
        p_t.font.color.rgb = s_col
        p_t.alignment = PP_ALIGN.CENTER

        p_b = tf.add_paragraph()
        p_b.text = s_body
        p_b.font.name = FONT_BODY
        p_b.font.size = Pt(10.5)
        p_b.font.color.rgb = COLOR_TEXT_DARK
        p_b.alignment = PP_ALIGN.CENTER
        p_b.space_before = Pt(8)
        p_b.space_after = Pt(8)

        p_badge = tf.add_paragraph()
        p_badge.text = f"[{s_badge}]"
        p_badge.font.name = FONT_TITLE
        p_badge.font.size = Pt(10)
        p_badge.font.bold = True
        p_badge.font.color.rgb = s_col
        p_badge.alignment = PP_ALIGN.CENTER

    # Connecting horizontal line behind/between steps
    conn = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(4.95), Inches(11.733), Inches(0.04))
    conn.fill.solid()
    conn.fill.fore_color.rgb = COLOR_DEEP_TEAL
    conn.line.fill.background()

    # Bottom 4 Pillars of Tower Eligibility
    eligibility = [
        ("1. أولوية الطلب الحقيقي", "ترقية الأبراج في مراكز الكثافة السكانية لتلبية حركة المرور العالية.", COLOR_DEEP_TEAL),
        ("2. التموضع الجغرافي", "انتقاء الأبراج المهيمنة طبوغرافياً لتوفير خط رؤية راديوي واسع Line-of-Sight.", COLOR_BLUE),
        ("3. الجاهزية الإنشائية", "توفر صواري قادرة على حمل Massive MIMO AAUs وتغذية ميكروية/ألياف مستقرة.", COLOR_BURGUNDY),
        ("4. العدالة المكانية SFI", "ضمان تمثيل الأرياف والمناطق الطرفية وعدم حصر الترقية في النقاط المربحة تجارياً.", COLOR_GOLD)
    ]

    card_el_w = 2.75
    gap_el = 0.244
    for idx, (e_title, e_desc, e_col) in enumerate(eligibility):
        l_pos = 0.8 + idx * (card_el_w + gap_el)
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(l_pos), Inches(5.15), Inches(card_el_w), Inches(1.6))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = e_col
        box.line.width = Pt(1.5)

        tf_e = box.text_frame
        tf_e.word_wrap = True
        p1 = tf_e.paragraphs[0]
        p1.text = e_title
        p1.font.name = FONT_TITLE
        p1.font.size = Pt(11.5)
        p1.font.bold = True
        p1.font.color.rgb = e_col
        p1.alignment = PP_ALIGN.RIGHT

        p2 = tf_e.add_paragraph()
        p2.text = e_desc
        p2.font.name = FONT_BODY
        p2.font.size = Pt(10)
        p2.font.color.rgb = COLOR_TEXT_MUTED
        p2.alignment = PP_ALIGN.RIGHT
        p2.space_before = Pt(4)

    add_footer(slide, 4, 73)

    script = (
        "عندما نتحدث عن الانتقال نحو الجيل الخامس، فإننا نوضع مباشرة أمام مفترق طرق تخطيطي حاسم:\n"
        "الخيار الأول: هو النهج التقليدي القائم على البناء من الصفر (Greenfield)؛ وهو نهج كارثي في حالتنا الوطنية، "
        "إذ يعني هدر الأبراج القائمة وتكبد نفقات إنشاءات باهظة وبطء النشر وتفاقم التفاوت الجغرافي.\n"
        "الخيار الثاني — وهو ما تبنته أطروحتنا: هو الترقية التشاركية الذكية (Co-siting)؛ أي المحافظة الكاملة على مواقعنا "
        "البالغة 79,268 موقعاً، واعتماد المفاضلة الرياضية المبنية على نظم GIS لترقية المواقع المؤهلة فقط.\n"
        "كيف يحسم الـ GIS هذا القرار؟ عبر مكدس ثلاثي الطبقات يدرس التضاريس والكثافة السكانية والتداخل الراديوي.\n"
        "وبذلك وضعنا أربعة معايير متوازنة لاختيار البرج المؤهل: الطلب الفعلي، التموضع الجغرافي، الجاهزية الإنشائية، والعدالة المكانية."
    )
    qa = [(
        "هل بنية الأبراج الحالية لشبكات 2G و 3G قادرة إنشائياً وتوصيلياً على تحمل هوائيات Massive MIMO الثقيلة وسعات التراسل العالية؟",
        "نموذجنا الاستمثالي لم يفترض إمكانية ترقية كل الأبراج بصورة عمياء، بل وضع قيداً صريحاً هو 'معيار الجاهزية الإنشائية والتراسلية' (Infrastructure Feasibility Constraint): فالخوارزمية تستبعد المواقع ذات الصواري الضعيفة أو خطوط التراسل المحدودة، وتختار من بين 30,010 مواقع 4G المواقع التي تمتلك مساحة كافية على الهيكل وتغذيها ألياف أو ميكروويف عالي السعة."
    )]
    set_speaker_notes(slide, "تطور أجيال الاتصالات والترقية التشاركية", "1.5 دقيقة", script, qa)


def build_slide_05(prs):
    """Slide 05: Hero Giant Stat (79,268) + Analytical Wing (أزمة الشبكة السورية الميدانية)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "واقع وتحديات الشبكات السورية: الأزمة الميدانية والبيانات الحقيقية (79,268 موقعاً)", "المحور الأول: المقدمة وسياق البحث")

    # Right Hero Stat Card (Width: 4.8 in, Height: 5.15 in, Deep Slate)
    hero = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(4.8), Inches(5.15))
    hero.fill.solid()
    hero.fill.fore_color.rgb = COLOR_DARK_SLATE
    hero.line.color.rgb = COLOR_DEEP_TEAL
    hero.line.width = Pt(2)

    tf_h = hero.text_frame
    tf_h.word_wrap = True

    p_badge = tf_h.paragraphs[0]
    p_badge.text = "قاعدة البيانات الوطنية الموثقة"
    p_badge.font.name = FONT_TITLE
    p_badge.font.size = Pt(13)
    p_badge.font.bold = True
    p_badge.font.color.rgb = COLOR_GOLD
    p_badge.alignment = PP_ALIGN.CENTER

    # Giant Number
    p_num = tf_h.add_paragraph()
    p_num.text = "79,268"
    p_num.font.name = FONT_TITLE
    p_num.font.size = Pt(54)
    p_num.font.bold = True
    p_num.font.color.rgb = COLOR_GOLD
    p_num.alignment = PP_ALIGN.CENTER
    p_num.space_before = Pt(4)

    p_lbl = tf_h.add_paragraph()
    p_lbl.text = "موقعاً خلوياً (سيريتل + MTN)"
    p_lbl.font.name = FONT_BODY
    p_lbl.font.size = Pt(13)
    p_lbl.font.bold = True
    p_lbl.font.color.rgb = COLOR_WHITE
    p_lbl.alignment = PP_ALIGN.CENTER
    p_lbl.space_after = Pt(12)

    stats_breakdown = [
        ("مواقع الجيل الثاني (2G):", "21,356 موقعاً (26.9%)"),
        ("مواقع الجيل الثالث (3G):", "27,902 موقعاً (35.2%)"),
        ("مواقع الجيل الرابع (4G):", "30,010 مواقع (37.9% - فضاء الترقية)"),
        ("التوزيع الديمغرافي المكاني:", "62% حضري مقابل 38% ريفي"),
        ("عدد المحافظات المشمولة:", "14 محافظة سورية (تغطية وطنية شاملة)")
    ]
    for lbl, val in stats_breakdown:
        p = tf_h.add_paragraph()
        p.text = f"• {lbl} {val}"
        p.font.name = FONT_BODY
        p.font.size = Pt(10.5)
        p.font.color.rgb = RGBColor(226, 232, 240)
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(3)

    # Left Analytical Wing: 4 Horizontal Challenge Cards (Width: 6.6 in, Height: 1.18 in each)
    challenges = [
        ("التحدي 1: قيد التكلفة الاستثمارية (CapEx)",
         "عجز التمويل عن Greenfield. الحل: وفر رأسمالي 62.4% بالترقية التشاركية، ووفر إضافي 8.4 مليون دولار مقارنة بالخوارزميات التقليدية.",
         COLOR_BURGUNDY),
        ("التحدي 2: أزمة كفاءة الطاقة والتشغيل (OpEx)",
         "انقطاع الكهرباء وارتفاع كلفة الديزل. الحل: خفض الحمل بنسبة 38.5% خارج الذروة وتوفير 5.32% طاقة إجمالية (78.3 MWh مقابل 82.7 MWh).",
         COLOR_GOLD),
        ("التحدي 3: فجوة التغطية ونقاء الإشارة (SINR)",
         "تعقيد تضاريس سوريا وتداخل الإشارات. الحل: ضبط الميل الراديوي لرفع نقاء الإشارة ليتجاوز SINR > 12 dB في 94.8% من المناطق المأهولة.",
         COLOR_DEEP_TEAL),
        ("التحدي 4: التفاوت الجغرافي والعدالة المكانية",
         "حرمان 38% من سكان الريف تجارياً. الحل: ابتكار مؤشر جيني المكاني ورفع SFI من 0.42 إلى 0.71، وقفز تغطية الريف من 64.2% إلى 88.7%.",
         COLOR_EMERALD)
    ]

    top_start = 1.6
    card_h = 1.2
    gap_ch = 0.12
    for idx, (c_title, c_desc, c_col) in enumerate(challenges):
        c_top = top_start + idx * (card_h + gap_ch)
        c_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.933), Inches(c_top), Inches(6.6), Inches(card_h))
        c_box.fill.solid()
        c_box.fill.fore_color.rgb = COLOR_WHITE
        c_box.line.color.rgb = c_col
        c_box.line.width = Pt(1.5)

        tf_c = c_box.text_frame
        tf_c.word_wrap = True
        p1 = tf_c.paragraphs[0]
        p1.text = c_title
        p1.font.name = FONT_TITLE
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = c_col
        p1.alignment = PP_ALIGN.RIGHT

        p2 = tf_c.add_paragraph()
        p2.text = c_desc
        p2.font.name = FONT_BODY
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = COLOR_TEXT_DARK
        p2.alignment = PP_ALIGN.RIGHT
        p2.space_before = Pt(3)

    add_footer(slide, 5, 73)

    script = (
        "تتميز هذه الأطروحة بأنها لم تبنَ على افتراضات نظرية أو شبكات مصطنعة، بل استندت إلى أكبر وأدق قاعدة بيانات خلوية "
        "وطنية موثقة في الجمهورية العربية السورية؛ حيث قمنا بجرد وتنقية ومعالجة بيانات 79,268 موقعاً خلوياً لمشغلينا الوطنيين "
        "(سيريتل و MTN)، موزعة بين 21 ألف موقع للجيل الثاني، و 28 ألفاً للجيل الثالث، و 30,010 مواقع للجيل الرابع تشكل فضاء البحث الحقيقي لترقية 5G.\n"
        "ومن خلال الغوص في هذا الواقع، شخصت الأطروحة أربعة تحديات ميدانية خانقة:\n"
        "التحدي الأول: قيد التكلفة الاستثمارية CapEx؛ وفرضت الظروف الترقية التشاركية لتحقيق وفر رأسمالي يفوق 62%.\n"
        "التحدي الثاني: أزمة الطاقة الخانقة؛ مما تطلب خوارزمية تكيفية تدير أحمال الخلايا وتخفض الاستهلاك بنسبة 38.5% خارج أوقات الذروة.\n"
        "التحدي الثالث: فجوة التغطية في تضاريسنا الصعبة؛ حيث ضبطنا زوايا الإشعاع لضمان SINR تفوق 12 ديسبل في 94.8% من المناطق.\n"
        "والتحدي الرابع: التفاوت الجغرافي؛ حيث ابتكرنا مؤشر العدالة المكانية SFI لتقفز تغطية الريف من 64% إلى نحو 89% دون التضحية بكفاءة الشبكة."
    )
    qa = [(
        "من أين حصل الباحث على بيانات 79,268 موقعاً خلوياً، وكيف تم التحقق من دقتها وصحتها الطبوغرافية؟",
        "تم جمع وتدقيق البيانات بالتعاون مع الفرق الهندسية وتحت إشراف مباشر من الهيئة الناظمة للاتصالات والبريد، وبموافقة الجهات المعنية للاستخدام البحثي في HIAST. وخضعت البيانات لمعالجة مكانية شملت مطابقة الإحداثيات WGS84 UTM، وتصحيح زوايا السمت والارتفاعات بالرجوع لنموذج DEM 30m التابع لوكالة ناسا (SRTM)، واستبعاد السجلات المكررة."
    )]
    set_speaker_notes(slide, "واقع وتحديات الشبكات السورية (79,268 موقعاً)", "2 دقيقة", script, qa)


def build_slide_06(prs):
    """Slide 06: Triangular Prism Balance (إشكالية البحث المركزية والمعضلة ثلاثية الأبعاد)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "إشكالية البحث المركزية والمعضلة ثلاثية الأبعاد (المعضلة الوطنية الكبرى)", "المحور الأول: المقدمة وسياق البحث")

    # Center Equilibrium Circle
    center_hub = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(4.8), Inches(2.7), Inches(3.733), Inches(1.8))
    center_hub.fill.solid()
    center_hub.fill.fore_color.rgb = COLOR_DARK_SLATE
    center_hub.line.color.rgb = COLOR_GOLD
    center_hub.line.width = Pt(2.5)

    tf_ch = center_hub.text_frame
    tf_ch.word_wrap = True
    p_c1 = tf_ch.paragraphs[0]
    p_c1.text = "نقطة الاتزان الرياضي والتشغيلي"
    p_c1.font.name = FONT_TITLE
    p_c1.font.size = Pt(11)
    p_c1.font.bold = True
    p_c1.font.color.rgb = COLOR_GOLD
    p_c1.alignment = PP_ALIGN.CENTER

    p_c2 = tf_ch.add_paragraph()
    p_c2.text = "دالة الهدف الموحدة\nPLAN -> FAIR -> CONTROL"
    p_c2.font.name = FONT_TITLE
    p_c2.font.size = Pt(12)
    p_c2.font.bold = True
    p_c2.font.color.rgb = COLOR_WHITE
    p_c2.alignment = PP_ALIGN.CENTER

    # 3 Triangular Prism Vertices:
    # Vertex 1: Top (Deep Teal)
    v1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.1), Inches(1.5), Inches(5.133), Inches(1.05))
    v1.fill.solid()
    v1.fill.fore_color.rgb = COLOR_WHITE
    v1.line.color.rgb = COLOR_DEEP_TEAL
    v1.line.width = Pt(2)
    tf_v1 = v1.text_frame
    tf_v1.word_wrap = True
    p1_t = tf_v1.paragraphs[0]
    p1_t.text = "الركن 1: التغطية ونقاء الإشارة الراديوية (Coverage & SINR)"
    p1_t.font.name = FONT_TITLE
    p1_t.font.size = Pt(12)
    p1_t.font.bold = True
    p1_t.font.color.rgb = COLOR_DEEP_TEAL
    p1_t.alignment = PP_ALIGN.CENTER
    p1_d = tf_v1.add_paragraph()
    p1_d.text = "تعظيم التغطية الكلية إلى 95.12% وضمان جودة الخدمة بنقاء راديوي SINR > 12 dB."
    p1_d.font.name = FONT_BODY
    p1_d.font.size = Pt(10.5)
    p1_d.font.color.rgb = COLOR_TEXT_DARK
    p1_d.alignment = PP_ALIGN.CENTER

    # Vertex 2: Bottom Right (Burgundy)
    v2 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.6), Inches(5.6), Inches(1.25))
    v2.fill.solid()
    v2.fill.fore_color.rgb = COLOR_WHITE
    v2.line.color.rgb = COLOR_BURGUNDY
    v2.line.width = Pt(2)
    tf_v2 = v2.text_frame
    tf_v2.word_wrap = True
    p2_t = tf_v2.paragraphs[0]
    p2_t.text = "الركن 2: قيود التكلفة الاستثمارية والطاقة (CapEx & Energy)"
    p2_t.font.name = FONT_TITLE
    p2_t.font.size = Pt(12)
    p2_t.font.bold = True
    p2_t.font.color.rgb = COLOR_BURGUNDY
    p2_t.alignment = PP_ALIGN.RIGHT
    p2_d = tf_v2.add_paragraph()
    p2_d.text = "خفض CapEx بنسبة 62.4% عبر الترقية التشاركية، وترشيد استهلاك الطاقة بنسبة 38.5% خارج الذروة."
    p2_d.font.name = FONT_BODY
    p2_d.font.size = Pt(10.5)
    p2_d.font.color.rgb = COLOR_TEXT_DARK
    p2_d.alignment = PP_ALIGN.RIGHT

    # Vertex 3: Bottom Left (Gold / Tech)
    v3 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.933), Inches(4.6), Inches(5.6), Inches(1.25))
    v3.fill.solid()
    v3.fill.fore_color.rgb = COLOR_WHITE
    v3.line.color.rgb = COLOR_GOLD
    v3.line.width = Pt(2)
    tf_v3 = v3.text_frame
    tf_v3.word_wrap = True
    p3_t = tf_v3.paragraphs[0]
    p3_t.text = "الركن 3: العدالة المكانية والتحكم السيادي (Fairness & Control)"
    p3_t.font.name = FONT_TITLE
    p3_t.font.size = Pt(12)
    p3_t.font.bold = True
    p3_t.font.color.rgb = COLOR_GOLD
    p3_t.alignment = PP_ALIGN.RIGHT
    p3_d = tf_v3.add_paragraph()
    p3_d.text = "رفع مؤشر SFI إلى 0.71 لإنصاف الريف، وعزل جغرافي آمن بدون تشويش بدقة 97.5% واسترجاع < 10 د."
    p3_d.font.name = FONT_BODY
    p3_d.font.size = Pt(10.5)
    p3_d.font.color.rgb = COLOR_TEXT_DARK
    p3_d.alignment = PP_ALIGN.RIGHT

    # Bottom Synthesis Problem Statement
    stmt = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.0), Inches(11.733), Inches(0.75))
    stmt.fill.solid()
    stmt.fill.fore_color.rgb = COLOR_DARK_TEAL
    stmt.line.fill.background()
    tf_st = stmt.text_frame
    tf_st.word_wrap = True
    p_st = tf_st.paragraphs[0]
    p_st.text = "نص صياغة الإشكالية: كيف نصل إلى شبكة 5G كفؤة، منصفة جغرافياً، وخاضعة للسيطرة التامة في بيئة وطنية مقيدة بـ 79,268 موقعاً؟"
    p_st.font.name = FONT_TITLE
    p_st.font.size = Pt(12)
    p_st.font.bold = True
    p_st.font.color.rgb = COLOR_WHITE
    p_st.alignment = PP_ALIGN.CENTER

    add_footer(slide, 6, 73)

    script = (
        "أساتذتي الأجلاء، من هذا الواقع الميداني المركب، تتبلور إشكالية البحث المركزية التي نجتمع اليوم لمناقشتها:\n"
        "إن المشغل يقف عاجزاً أمام معضلة ثلاثية الأبعاد (Trilemma) تتصارع فيها الأهداف:\n"
        "البعد الأول: هو المعضلة التكنولوجية؛ كيف نرفع التغطية إلى 95.12% دون ميزانيات بناء جديدة وفي ظل أزمة كهرباء؟ والحل لا يكون إلا بالموازنة الدقيقة عبر ترقية الأبراج القائمة.\n"
        "البعد الثاني: هو المعضلة التنموية؛ لماذا تُحرم أريافنا السورية (38% من السكان) لمجرد أن الخوارزميات التجارية ترى فيها عائداً مالياً منخفضاً؟ كان لزاماً علينا كسر هذا التحيز وفرض مفهوم 'العدالة المكانية' بصياغة رياضية ملزمة.\n"
        "البعد الثالث: هو المعضلة التشغيلية والسيادية؛ كيف نحمي أمن مجتمعنا ونعزل الخلايا المطلوبة بدقة دون أن نلجأ للتشويش التخريبي؟\n"
        "إن إشكالية هذه الأطروحة تكمن في صهر هذه الأبعاد الثلاثة المتناقضة في إطار رياضي وبرمجي واحد موحد: شبكة كفؤة، منصفة، وخاضعة للسيطرة التامة."
    )
    set_speaker_notes(slide, "إشكالية البحث المركزية والمعضلة ثلاثية الأبعاد", "2 دقيقة", script)


def build_slide_07(prs):
    """Slide 07: Asymmetric Bento Grid (الأبعاد الهندسية والتقنية للإشكالية)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "الأبعاد الهندسية والتقنية لإشكالية البحث (4 تحديات صلبة)", "المحور الأول: المقدمة وسياق البحث")

    # Tile 1: Hero Large Tile (Right Side: NP-Hard Combinatorial Complexity)
    # Width: 5.6 in, Height: 5.15 in, Dark Slate Theme
    t1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.15))
    t1.fill.solid()
    t1.fill.fore_color.rgb = COLOR_DARK_SLATE
    t1.line.color.rgb = COLOR_GOLD
    t1.line.width = Pt(2)

    tf_1 = t1.text_frame
    tf_1.word_wrap = True
    p1_t = tf_1.paragraphs[0]
    p1_t.text = "1. التعقيد الرياضي والتوافقي الهائل (NP-Hard)"
    p1_t.font.name = FONT_TITLE
    p1_t.font.size = Pt(14)
    p1_t.font.bold = True
    p1_t.font.color.rgb = COLOR_GOLD
    p1_t.alignment = PP_ALIGN.RIGHT

    lines_t1 = [
        "فضاء الحالات الإجمالي للشبكة: Ω = 2^79,268 احتمالاً.",
        "فضاء الحالات للمواقع المرشحة: 2^30,010 حالة محتملة (رقم يفوق عدد ذرات الكون المنظور بمراحل فلكية!).",
        "استحالة الاستقراء التام (Brute Force): يتطلب تعقيداً زمنياً أسياً O(2^N) يستغرق مليارات السنين حوسبياً.",
        "حتمية الاستدلال الفوقي (Meta-heuristics): تصميم خوارزميات تعمل بزمن حدودي O(K · P · N) حيث K عدد التكرارات و P حجم المجتمع السربي.",
        "المعادلة الحاكمة: الانتقال من الفضاء النظري المستحيل إلى فضاء الحلول المقبولة والمجدية ميدانياً."
    ]
    for l in lines_t1:
        p = tf_1.add_paragraph()
        p.text = f"• {l}"
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.color.rgb = RGBColor(226, 232, 240)
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(8)

    # Tile 2: Top Left Banner (Algorithm & Constraint Repair) - Width: 5.933 in, Height: 2.45 in
    t2 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.6), Inches(1.6), Inches(5.933), Inches(2.45))
    t2.fill.solid()
    t2.fill.fore_color.rgb = COLOR_WHITE
    t2.line.color.rgb = COLOR_DEEP_TEAL
    t2.line.width = Pt(2)

    tf_2 = t2.text_frame
    tf_2.word_wrap = True
    p2_t = tf_2.paragraphs[0]
    p2_t.text = "2. المفاضلة الخوارزمية ومحرك إصلاح القيود (BPSO vs AGA)"
    p2_t.font.name = FONT_TITLE
    p2_t.font.size = Pt(13)
    p2_t.font.bold = True
    p2_t.font.color.rgb = COLOR_DEEP_TEAL
    p2_t.alignment = PP_ALIGN.RIGHT

    lines_t2 = [
        "معضلة الفضاء غير المقبول: 80% من الحلول المولدة عشوائياً تنتهك الميزانية أو تسبب تداخلاً راديوياً.",
        "ابتكار مشغل الإصلاح التلقائي R(x): يعيد الحلول المنتهكة إلى الحيز الممكن جشعياً دون إهدار وقت الحساب.",
        "النتيجة: ضمان حلول مقبولة فيزيائياً بنسبة 100% Feasible وتسريع التقارب بنسبة تفوق 35%."
    ]
    for l in lines_t2:
        p = tf_2.add_paragraph()
        p.text = f"• {l}"
        p.font.name = FONT_BODY
        p.font.size = Pt(10.5)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(4)

    # Tile 3: Bottom Left - Split Tile 1 (3D GIS Modeling) - Width: 2.87 in, Height: 2.55 in
    t3 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.6), Inches(4.2), Inches(2.87), Inches(2.55))
    t3.fill.solid()
    t3.fill.fore_color.rgb = COLOR_WHITE
    t3.line.color.rgb = COLOR_BLUE
    t3.line.width = Pt(1.5)

    tf_3 = t3.text_frame
    tf_3.word_wrap = True
    p3_t = tf_3.paragraphs[0]
    p3_t.text = "3. النمذجة المكانية 3D GIS"
    p3_t.font.name = FONT_TITLE
    p3_t.font.size = Pt(12)
    p3_t.font.bold = True
    p3_t.font.color.rgb = COLOR_BLUE
    p3_t.alignment = PP_ALIGN.RIGHT

    lines_t3 = [
        "تضاريس حادة: جبال الساحل، جبل الشيخ، حوض دمشق والبادية.",
        "مكدس الطبقات: DEM 30m + استخدامات الأراضي Clutter.",
        "تتبع الأشعة 3D Ray-Tracing بمعيار 3GPP TR 38.901."
    ]
    for l in lines_t3:
        p = tf_3.add_paragraph()
        p.text = f"• {l}"
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(3)

    # Tile 4: Bottom Left - Split Tile 2 (Multi-Vendor Orchestration) - Width: 2.87 in, Height: 2.55 in
    t4 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.663), Inches(4.2), Inches(2.87), Inches(2.55))
    t4.fill.solid()
    t4.fill.fore_color.rgb = COLOR_WHITE
    t4.line.color.rgb = COLOR_BURGUNDY
    t4.line.width = Pt(1.5)

    tf_4 = t4.text_frame
    tf_4.word_wrap = True
    p4_t = tf_4.paragraphs[0]
    p4_t.text = "4. بيئة متعددة الموردين"
    p4_t.font.name = FONT_TITLE
    p4_t.font.size = Pt(12)
    p4_t.font.bold = True
    p4_t.font.color.rgb = COLOR_BURGUNDY
    p4_t.alignment = PP_ALIGN.RIGHT

    lines_t4 = [
        "سيريتل (Huawei: gNodeB / U2020 / NCE).",
        "MTN Syria (Ericsson: Baseband / ENM).",
        "أوركسترا موحدة: وسيط برمجي عبر بروتوكولات NETCONF / REST APIs الموحدة."
    ]
    for l in lines_t4:
        p = tf_4.add_paragraph()
        p.text = f"• {l}"
        p.font.name = FONT_BODY
        p.font.size = Pt(10)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(3)

    add_footer(slide, 7, 73)

    script = (
        "لكي ندرك سبب تعذر حل هذه الإشكالية بالطرق التقليدية، لا بد أن نفككها إلى أبعادها الهندسية والرياضية الأربعة:\n"
        "البعد الأول: هو التعقيد التوافقي الهائل؛ فعندما نتعامل مع 79,268 موقعاً وفضاء مرشحين يبلغ 2^30,010، "
        "فإن محاولة الاستقراء التام O(2^N) مستحيلة حوسبياً، مما جعل الاستدلال الفوقي O(K · P · N) حتمية رياضية.\n"
        "البعد الثاني: هو مشكلة القيود؛ ففي هذه الشبكات، 80% من الحلول المولدة عشوائياً تكون غير مقبولة بسبب خرق الميزانية والتداخل. "
        "وهنا ابتكرنا محرك إصلاح القيود التكيفي R(x) الذي يعيد الحلول إلى الحيز المقبول ويسرع التقارب بنسبة 35%.\n"
        "البعد الثالث: هو الدقة المكانية؛ فالإشارة في سوريا تعبر جبالاً وأودية ومباني، فدمجنا مكدس طبقات GIS ثلاثي الأبعاد لنمذجة التخامد والحيود التضاريسي.\n"
        "البعد الرابع: هو تعدد الموردين والأجيال؛ فالشبكة تتوزع بين هواوي وإريكسون وتجمع أربعة أجيال، وقد نجحنا في بناء وسيط برمجي موحد يدير الموردين ببروتوكولات موحدة."
    )
    set_speaker_notes(slide, "الأبعاد الهندسية والتقنية للإشكالية", "1.5 - 2 دقيقة", script)


def build_slide_08(prs):
    """Slide 08: Gap-to-Bridge / Objectives Matrix (أهداف البحث ومصفوفة الجسور)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "أهداف البحث ومحاور الإنجاز الاستراتيجية (خريطة الأهداف الأربعة ومصفوفة الجسور)", "المحور الأول: المقدمة وسياق البحث")

    # 4 Parallel Rows mapping Gap -> Bridge -> Target KPI
    matrix = [
        ("الهدف 01: صياغة نموذج الاستمثال متعدد الأهداف",
         "الفجوة والتحدي: تعارض تعظيم التغطية مع خفض الكلفة وعجز الطاقة والتوزيع العادل في دالة واحدة.",
         "جسر الحل والمساهمة: صياغة دالة هدف هجينة موزونة '4 في 1' تدمج CapEx, Energy, SINR, SFI.",
         "المستهدف المحقق: تغطية >= 95.12% وخفض CapEx بـ 62.4% في إطار رياضي موحد.",
         COLOR_DEEP_TEAL),
        ("الهدف 02: المقارنة المرجعية لخوارزميات BPSO و AGA",
         "الفجوة والتحدي: بطء تقارب الخوارزميات التطورية وفساد 80% من الحلول في الفضاء غير المقبول.",
         "جسر الحل والمساهمة: ابتكار مشغل إصلاح القيود R(x) وإجراء 30 تشغيلاً مستقلاً مع اختبار Wilcoxon.",
         "المستهدف المحقق: 100% حلول مقبولة Feasible وزمن قياسي 118 ثانية لـ BPSO مقابل 142 ثانية لـ AGA.",
         COLOR_BURGUNDY),
        ("الهدف 03: ابتكار واعتماد مؤشر العدالة المكانية (SFI)",
         "الفجوة والتحدي: انحياز التخطيط التجاري القديم لتركيز 95% من سعات 4G في المدن وحرمان 38% بالريف.",
         "جسر الحل والمساهمة: اشتقاق مؤشر رياضي كمي مشتق من تشتت جيني المكاني ودمجه في دالة اللياقة.",
         "المستهدف المحقق: رفع مؤشر العدالة من 0.52 إلى SFI = 0.71 (+36.5%) وتغطية الأرياف إلى 88.7%.",
         COLOR_GOLD),
        ("الهدف 04: بناء معمارية العزل الجغرافي الآمن بدون تشويش",
         "الفجوة والتحدي: مخاطر التشويش الكهرومغناطيسي على المستشفيات وشبكات الطوارئ والأجهزة الحساسة.",
         "جسر الحل والمساهمة: كبت التسليم برمجياً وحظر الحوامل عبر وسيط متعدد الموردين وتكامل GIS.",
         "المستهدف المحقق: دقة عزل 97.5%، استعادة < 10 د، وضمان مكالمات الطوارئ 112 بنسبة 100%.",
         COLOR_EMERALD)
    ]

    top_m = 1.6
    row_h = 1.2
    gap_m = 0.12
    for idx, (title_o, gap_o, bridge_o, kpi_o, col_o) in enumerate(matrix):
        cur_top = top_m + idx * (row_h + gap_m)
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(cur_top), Inches(11.733), Inches(row_h))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = col_o
        box.line.width = Pt(1.5)

        tf = box.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = title_o
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = col_o
        p_t.alignment = PP_ALIGN.RIGHT

        p_det = tf.add_paragraph()
        p_det.text = f"• {gap_o}\n• {bridge_o}  ◄  [{kpi_o}]"
        p_det.font.name = FONT_BODY
        p_det.font.size = Pt(10.5)
        p_det.font.color.rgb = COLOR_TEXT_DARK
        p_det.alignment = PP_ALIGN.RIGHT
        p_det.space_before = Pt(3)

    add_footer(slide, 8, 73)

    script = (
        "بناءً على هذا التشخيص الدقيق للإشكالية، رسمت هذه الأطروحة لنفسها أربعة أهداف استراتيجية وتطبيقية محددة بدقة قابلة للقياس:\n"
        "الهدف الأول: صياغة نموذج رياضي موحد متعدد الأهداف؛ يدمج التغطية الراديوية، وخفض التكاليف، وترشيد الطاقة، والإنصاف المكاني في دالة لياقة موحدة.\n"
        "الهدف الثاني: تطوير ومقارنة خوارزميات الاستدلال الفوقي BPSO و AGA، وابتكار آلية الإصلاح التكيفي لنقل الحلول إلى الحيز الممكن بنسبة 100% وتحقيق زمن تنفيذ قياسي.\n"
        "الهدف الثالث: ابتكار مؤشر العدالة المكانية SFI؛ للانتقال بالشبكة من منطق الربحية التجارية الضيقة إلى منطق التنمية الوطنية الشاملة، ورفع المؤشر إلى 0.71 لإنصاف الريف السوري.\n"
        "الهدف الرابع: هندسة منظومة تحكم وعزل برمجي آمنة بدون تشويش؛ تحقق دقة 97.5% واستعادة كاملة في أقل من 10 دقائق مع صون مكالمات الإسعاف والطوارئ.\n"
        "وقد أخضعت هذه الأهداف جميعها للتحقق الميداني الصارم عبر كامل شبكة القطر السوري بمحافظاتها الأربع عشرة عبر 30 تشغيلاً مستقلاً."
    )
    set_speaker_notes(slide, "أهداف البحث ومحاور الإنجاز الاستراتيجية", "1.5 دقيقة", script)


def build_slide_09(prs):
    """Slide 09: Provocative Question & Evidence Web (أسئلة البحث الرئيسية الثلاثة والمنهجية)"""
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    set_background(slide, prs, COLOR_LIGHT_BG)
    add_header(slide, "أسئلة البحث الرئيسية الثلاثة (المصفوفة المنهجية للأطروحة)", "المحور الأول: المقدمة وسياق البحث")

    # Top Provocative Question / Master Matrix Banner
    banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(11.733), Inches(0.85))
    banner.fill.solid()
    banner.fill.fore_color.rgb = COLOR_DARK_TEAL
    banner.line.color.rgb = COLOR_GOLD
    banner.line.width = Pt(1.5)

    tf_b = banner.text_frame
    tf_b.word_wrap = True
    p_b1 = tf_b.paragraphs[0]
    p_b1.text = "المصفوفة المنهجية الثلاثية: [ السؤال العلمي Q  ◄  المنهجية والأدوات الرياضية  ◄  المخرجات والمساهمة ]"
    p_b1.font.name = FONT_TITLE
    p_b1.font.size = Pt(13)
    p_b1.font.bold = True
    p_b1.font.color.rgb = COLOR_GOLD
    p_b1.alignment = PP_ALIGN.CENTER

    p_b2 = tf_b.add_paragraph()
    p_b2.text = "تكامل وثيق يربط التساؤلات العلمية التأسيسية بالمساهمات الثلاث الكبرى للأطروحة (PLAN -> FAIR -> CONTROL)"
    p_b2.font.name = FONT_BODY
    p_b2.font.size = Pt(10.5)
    p_b2.font.color.rgb = COLOR_WHITE
    p_b2.alignment = PP_ALIGN.CENTER
    p_b2.space_before = Pt(2)

    # 3 Vertical Evidentiary Wings (Columns)
    wings = [
        ("السؤال الأول (Q1): صياغة المعضلة متعددة الأهداف",
         "كيف يمكن صياغة دالة هدف رياضية موحدة توازن بدقة بين تعظيم التغطية، خفض التكلفة الرأسمالية، ترشيد استهلاك الطاقة، والإنصاف المكاني؟",
         "صياغة جبهة باريتو رباعية الأبعاد (4D Pareto Hypersurface) وتطبيع المعايير المختلفة فيزيائياً (Cost, Power, dB, Fairness).",
         "المساهمة الأولى (C1: PLAN):\nنموذج الاستمثال الرياضي الهجين وتحديد 30,010 موقعاً مؤهلاً لترقية 5G NSA.",
         COLOR_DEEP_TEAL),
        ("السؤال الثاني (Q2): المفاضلة الخوارزمية وعمق التقارب",
         "أي الخوارزميتين (BPSO أم AGA) تحقق تفوقاً حاسماً في سرعة الحل، الدقة، وثبات النتائج الإحصائية مع آلية الإصلاح التلقائي؟",
         "اختبار ويلكوكسون اللامعلمي (Wilcoxon Rank-Sum) عبر 30 تشغيلاً مستقلاً لتأكيد الدلالة الإحصائية (p < 0.001) وتحليل استقرار التقارب.",
         "المساهمة الأولى والثانية (PLAN + FAIR):\nإثبات تفوق BPSO العددي الحاسم بزمن 118 ثانية وتوفير 8.4M$ ودلالة p = 0.016.",
         COLOR_BURGUNDY),
        ("السؤال الثالث (Q3): حوسبة الدقة المكانية (GIS-to-RAN)",
         "كيف نترجم الطبقات الطبوغرافية الرقمية (DEM, Clutter) إلى معايير تشغيلية مباشرة تمنع التداخل وتتيح العزل الجغرافي الآمن دون تشويش؟",
         "خوارزميات التقاطع المكاني الراديوي (Spatial Intersection) ومكاملة واجهات NETCONF/REST مع نظم GIS لكبت التسليم وحظر الحوامل.",
         "المساهمة الثالثة (C3: CONTROL):\nمنظومة العزل البرمجي السيادي بدقة 97.5% واسترجاع < 10 د (منشورة في Elsevier Q1).",
         COLOR_GOLD)
    ]

    col_w = 3.75
    gap_col = 0.241
    for idx, (w_title, w_q, w_meth, w_contrib, w_col) in enumerate(wings):
        l_pos = 0.8 + idx * (col_w + gap_col)
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(l_pos), Inches(2.6), Inches(col_w), Inches(4.15))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = w_col
        box.line.width = Pt(2)

        tf = box.text_frame
        tf.word_wrap = True

        p1 = tf.paragraphs[0]
        p1.text = w_title
        p1.font.name = FONT_TITLE
        p1.font.size = Pt(12)
        p1.font.bold = True
        p1.font.color.rgb = w_col
        p1.alignment = PP_ALIGN.CENTER

        p2 = tf.add_paragraph()
        p2.text = f"• نص السؤال:\n\"{w_q}\""
        p2.font.name = FONT_BODY
        p2.font.size = Pt(10)
        p2.font.color.rgb = COLOR_TEXT_DARK
        p2.alignment = PP_ALIGN.RIGHT
        p2.space_before = Pt(6)

        p3 = tf.add_paragraph()
        p3.text = f"• المنهجية والأدوات:\n{w_meth}"
        p3.font.name = FONT_BODY
        p3.font.size = Pt(10)
        p3.font.color.rgb = COLOR_TEXT_MUTED
        p3.alignment = PP_ALIGN.RIGHT
        p3.space_before = Pt(6)

        p4 = tf.add_paragraph()
        p4.text = f"• المخرجات والمساهمة:\n{w_contrib}"
        p4.font.name = FONT_TITLE
        p4.font.size = Pt(10.5)
        p4.font.bold = True
        p4.font.color.rgb = w_col
        p4.alignment = PP_ALIGN.RIGHT
        p4.space_before = Pt(6)

    add_footer(slide, 9, 73)

    script = (
        "لتأطير هذه الأطروحة في مسار علمي منهجي صارم، صغنا جهودنا للإجابة على ثلاثة أسئلة مركزية تقابل مساهماتنا الثلاث الكبرى:\n"
        "السؤال الأول: كيف نصوغ دالة هدف رياضية توفق بين أربعة معايير متصارعة: تغطية أعلى، كلفة أقل، طاقة أرشد، وإنصاف أعدل؟ "
        "وأجبنا عنه عبر صياغة جبهة باريتو رباعية الأبعاد ونموذج استمثال هجين.\n"
        "السؤال الثاني: أي الخوارزميات تتفوق ميدانياً: سرب الجسيمات BPSO أم الخوارزمية الجينية AGA؟ "
        "وقد حسمنا الإجابة بالتحليل الإحصائي المقارن عبر اختبار ويلكوكسون و 30 تشغيلاً مستقلاً، مبرهنين التفوق العددي الحاسم لـ BPSO.\n"
        "السؤال الثالث: كيف نحول بيانات الـ GIS وطبقات التضاريس إلى قرارات تشغيلية مباشرة تمنع التداخل وتتيح السيطرة والعزل الجغرافي الآمن دون أجهزة تشويش؟ "
        "وأجبنا عنه بمعمارية تحكم برمجية متعددة الموردين نالت ثقة النشر الدولي في مجلة Elsevier.\n"
        "[جملة الربط الانتقالية الكبرى نحو المحور الثاني]:\n"
        "أساتذتي الأفاضل، بعد أن وضعنا بين أيديكم أزمة التخطيط لشبكتنا الوطنية السورية، وفككنا معضلتها الرياضية والمكانية والتشغيلية، "
        "وصغنا أهدافنا وأسئلتنا بدقة؛ بات لزاماً علينا أن نعود خطوة إلى الوراء لنستند إلى الإرث العلمي التأسيسي. "
        "ننتقل الآن إلى المحور الثاني: الدراسات النظرية والمرجعية؛ لنستعرض المفاهيم الراديوية والمكانية الأساسية، "
        "ونحدد بدقة متناهية الفجوات البحثية الثلاث التي جاءت هذه الأطروحة لتسدها."
    )
    qa = [(
        "لماذا تم اختيار اختبار Wilcoxon Rank-Sum بالذات للتحقق الإحصائي وليس اختبار Student's t-test التقليدي؟",
        "اختبار Student's t-test يشترط أن تتبع البيانات توزيعاً طبيعياً معيارياً، بينما نتائج خوارزميات الاستدلال الفوقي وتكرارات تشغيلها العشوائية المتعددة غالباً ما تكون لا بارامترية (Non-parametric) ومنحازة. لذلك، فإن المعيار الذهبي المعتمد عالمياً في مقارنة خوارزميات الذكاء الصنعي هو اختبار ويلكوكسون اللامعلمي (Wilcoxon Rank-Sum Test)، لأنه لا يفترض التوزيع الطبيعي ويعطي دلالة قطعية حقيقية لقيم p-value، وهو ما أكد تفوق خوارزميتنا بدلالة إحصائية عالية جداً p < 0.001."
    )]
    set_speaker_notes(slide, "أسئلة البحث الرئيسية الثلاثة والمنهجية", "1.5 دقيقة", script, qa)


# ==============================================================================
# MAIN RUNNER
# ==============================================================================
def main():
    print("=" * 70)
    print("Building Axis 01 Presentation (Slides 00 to 09)...")
    print("=" * 70)

    prs = create_deck()

    print("Generating Slide 00: Dark Master Cover...")
    build_slide_00(prs)

    print("Generating Slide 01: Orbital 5-Node Agenda...")
    build_slide_01(prs)

    print("Generating Slide 02: Dark Academic Section Marker...")
    build_slide_02(prs)

    print("Generating Slide 03: Split-Screen High Contrast...")
    build_slide_03(prs)

    print("Generating Slide 04: Horizontal Pipeline...")
    build_slide_04(prs)

    print("Generating Slide 05: Hero Giant Stat (79,268) + Analytical Wing...")
    build_slide_05(prs)

    print("Generating Slide 06: Triangular Prism Balance...")
    build_slide_06(prs)

    print("Generating Slide 07: Asymmetric Bento Grid...")
    build_slide_07(prs)

    print("Generating Slide 08: Gap-to-Bridge / Objectives Matrix...")
    build_slide_08(prs)

    print("Generating Slide 09: Provocative Question & Evidence Web...")
    build_slide_09(prs)

    # Save Output Presentation
    out_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_path = os.path.join(out_dir, "presentation_axis_01.pptx")

    prs.save(out_path)
    print(f"\n[SUCCESS] Axis 01 presentation successfully saved to:")
    print(f"--> {out_path}")
    print(f"Total slides generated: {len(prs.slides)}")
    print("=" * 70)

if __name__ == "__main__":
    main()

