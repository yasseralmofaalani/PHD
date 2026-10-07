"""
build_axis_04.py
Script to generate the standalone PowerPoint presentation for Axis 04 (Slides 46 to 58):
"المحور الرابع: النتائج التفصيلية والمناقشة والأوراق العلمية المنشورة"
(Detailed Experimental Results, Discussion & Published Scientific Papers)

Strict adherence to:
- 16:9 Widescreen (13.333 x 7.5 inches)
- Dynamic Anti-Monotony Design System & Master Prompt Engine
- Official HIAST Color Palette & Header/Footer Standards
- 16 Unique Layout Archetypes
- Full, exhaustive Speaker Notes & Defense Q&A for every slide
"""

import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ==============================================================================
# OFFICIAL HIAST COLOR PALETTE
# ==============================================================================
COLOR_DEEP_TEAL   = RGBColor(66, 129, 119)     # #428177 - Primary Brand Teal
COLOR_DARK_TEAL   = RGBColor(20, 55, 50)       # #143732 - Dark Executive Teal
COLOR_BURGUNDY    = RGBColor(107, 31, 42)      # #6B1F2A - Secondary Academic Red
COLOR_GOLD        = RGBColor(217, 119, 6)       # #D97706 - Amber Gold / Highlight
COLOR_DARK_SLATE  = RGBColor(15, 23, 42)       # #0F172A - Deep Slate Canvas (Dark Mode)
COLOR_SLATE_CARD  = RGBColor(30, 41, 59)       # #1E293B - Dark Mode Card
COLOR_LIGHT_BG    = RGBColor(246, 248, 250)    # #F6F8FA - Clean Light Canvas
COLOR_WHITE       = RGBColor(255, 255, 255)    # Pure White Card Fill
COLOR_TEXT_DARK   = RGBColor(15, 23, 42)       # #0F172A - Body Text Dark
COLOR_TEXT_MUTED  = RGBColor(100, 116, 139)    # #64748B - Muted Subtitle Text
COLOR_BORDER      = RGBColor(226, 232, 240)    # #E2E8F0 - Card Borders
COLOR_EMERALD     = RGBColor(16, 185, 129)     # #10B981 - Functional Emerald
COLOR_BLUE        = RGBColor(37, 99, 235)      # #2563EB - Functional Tech Blue

FONT_TITLE = "Segoe UI"
FONT_BODY  = "Segoe UI"

SECTION_BREADCRUMB = "المحور الرابع: النتائج والأوراق العلمية المنشورة"
TOTAL_SLIDES = 73

# ==============================================================================
# HELPER FUNCTIONS FOR SLIDE ANATOMY & CARDS
# ==============================================================================
def create_base_slide(prs, title_ar, slide_num, is_dark=False):
    """Creates a blank slide with background, standardized header, and footer."""
    slide = prs.slides.add_slide(prs.slide_layouts[6])

    # Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = COLOR_DARK_SLATE if is_dark else COLOR_LIGHT_BG
    bg.line.fill.background()

    # Header Badge (Breadcrumb)
    tb_b = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.7), Inches(0.35))
    tf_b = tb_b.text_frame
    tf_b.word_wrap = True
    p_b = tf_b.paragraphs[0]
    p_b.text = f"المعهد العالي للعلوم التطبيقية والتكنولوجيا  |  {SECTION_BREADCRUMB}"
    p_b.font.name = FONT_BODY
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = COLOR_GOLD if is_dark else COLOR_DEEP_TEAL
    p_b.alignment = PP_ALIGN.RIGHT

    # Main Title
    tb_t = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.7), Inches(0.75))
    tf_t = tb_t.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = title_ar
    p_t.font.name = FONT_TITLE
    p_t.font.size = Pt(22)
    p_t.font.bold = True
    p_t.font.color.rgb = COLOR_WHITE if is_dark else COLOR_TEXT_DARK
    p_t.alignment = PP_ALIGN.RIGHT

    # Footer
    tb_f = slide.shapes.add_textbox(Inches(0.8), Inches(6.92), Inches(11.7), Inches(0.35))
    tf_f = tb_f.text_frame
    p_f = tf_f.paragraphs[0]
    p_f.text = f"أطروحة دكتوراه: التخطيط والتحكم الذكي بالشبكات الخلوية في بيئة GIS  —  ياسر المفعلاني   |   شريحة {slide_num} من {TOTAL_SLIDES}"
    p_f.font.name = FONT_BODY
    p_f.font.size = Pt(9.5)
    p_f.font.color.rgb = RGBColor(148, 163, 184) if is_dark else COLOR_TEXT_MUTED
    p_f.alignment = PP_ALIGN.RIGHT

    return slide


def add_speaker_notes(slide, notes_text):
    """Sets exhaustive speaker notes into the PowerPoint presenter view notes frame."""
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    tf.clear()
    p = tf.paragraphs[0]
    p.text = notes_text
    p.font.name = "Segoe UI"
    p.font.size = Pt(11)


def add_card(slide, left, top, width, height, title, items,
             bg_color=COLOR_WHITE, border_color=COLOR_BORDER,
             title_color=COLOR_DEEP_TEAL, is_dark=False, border_width=1.5):
    """Adds a standard rounded card with title and bullet points."""
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width)
    else:
        shape.line.fill.background()

    tb = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.18), width - Inches(0.4), height - Inches(0.36))
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
        p.text = f"• {item}"
        p.font.name = FONT_BODY
        p.font.size = Pt(11)
        p.font.color.rgb = RGBColor(226, 232, 240) if is_dark else COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_after = Pt(3)

    return shape


# ==============================================================================
# SLIDE 46: DARK ACADEMIC SECTION MARKER
# ==============================================================================
def build_slide_46(prs):
    slide = create_base_slide(
        prs,
        title_ar="المحور الرابع: النتائج التفصيلية والمناقشة والأوراق العلمية المنشورة",
        slide_num=46,
        is_dark=True
    )

    # Section Subtitle
    tb_sub = slide.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11.7), Inches(0.5))
    tf_sub = tb_sub.text_frame
    p_sub = tf_sub.paragraphs[0]
    p_sub.text = "RESULTS & SCIENTIFIC PUBLICATIONS  |  من الأدلة التجريبية على رقعة الشبكة السورية إلى النشر العلمي المحكم دولياً"
    p_sub.font.name = FONT_BODY
    p_sub.font.size = Pt(13)
    p_sub.font.color.rgb = COLOR_GOLD
    p_sub.alignment = PP_ALIGN.RIGHT

    # 5-Step Pipeline Grid (The Scientific Validation Cycle)
    steps = [
        {"num": "01", "title": "بيانات الشبكة الحقيقية", "sub": "79,268 موقعاً فعلياً", "desc": "مسح راديوي وطني شامل لشبكتي سيريتل و MTN بكافة المحافظات.", "color": COLOR_DEEP_TEAL},
        {"num": "02", "title": "محرك التحسين الهجين", "sub": "BPSO & AGA Optimization", "desc": "صياغة متعددة الأهداف مع آلية إصلاح القيود التكيفية لمعالجة 2^30010.", "color": COLOR_DARK_TEAL},
        {"num": "03", "title": "البيئة المكانية ونظم GIS", "sub": "Spatial Fairness (SFI)", "desc": "دمج طبقات الارتفاع الرقمي DEM واستخدامات الأراضي لإنصاف الريف.", "color": COLOR_EMERALD},
        {"num": "04", "title": "الأدلة والنتائج التجريبية", "sub": "N=30 Runs, p < 0.001", "desc": "وفر 8.4M$ و 5.3% طاقة مع 95.12% تغطية وعزل قطاعي 97.5%.", "color": COLOR_BURGUNDY},
        {"num": "05", "title": "الإنتاج والنشر العلمي", "sub": "Elsevier Q1 & WoS", "desc": "ورقة منشورة في Computer Networks وورقتان قيد التحكيم الدولي.", "color": COLOR_GOLD}
    ]

    n = len(steps)
    total_w = 11.7
    gap = 0.2
    w_card = (total_w - (n - 1) * gap) / n
    left_start = 0.8
    top_pos = Inches(2.2)
    h_card = Inches(3.8)

    for idx, s in enumerate(steps):
        left_pos = Inches(left_start + idx * (w_card + gap))

        # Card container
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos, Inches(w_card), h_card)
        shape.fill.solid()
        shape.fill.fore_color.rgb = COLOR_SLATE_CARD
        shape.line.color.rgb = s["color"]
        shape.line.width = Pt(2)

        tb = slide.shapes.add_textbox(left_pos + Inches(0.12), top_pos + Inches(0.15), Inches(w_card - 0.24), h_card - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        # Step Number Badge
        p_num = tf.paragraphs[0]
        p_num.text = f"STEP {s['num']}"
        p_num.font.name = FONT_TITLE
        p_num.font.size = Pt(13)
        p_num.font.bold = True
        p_num.font.color.rgb = s["color"]
        p_num.alignment = PP_ALIGN.CENTER
        p_num.space_after = Pt(8)

        # Title
        p_t = tf.add_paragraph()
        p_t.text = s["title"]
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_WHITE
        p_t.alignment = PP_ALIGN.CENTER
        p_t.space_after = Pt(4)

        # Subtitle
        p_sub2 = tf.add_paragraph()
        p_sub2.text = s["sub"]
        p_sub2.font.name = FONT_BODY
        p_sub2.font.size = Pt(10)
        p_sub2.font.color.rgb = s["color"]
        p_sub2.alignment = PP_ALIGN.CENTER
        p_sub2.space_after = Pt(10)

        # Description
        p_desc = tf.add_paragraph()
        p_desc.text = s["desc"]
        p_desc.font.name = FONT_BODY
        p_desc.font.size = Pt(10.5)
        p_desc.font.color.rgb = RGBColor(203, 213, 225)
        p_desc.alignment = PP_ALIGN.CENTER

    # Bottom Narrative Banner
    banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.15), Inches(11.7), Inches(0.65))
    banner.fill.solid()
    banner.fill.fore_color.rgb = COLOR_DARK_TEAL
    banner.line.color.rgb = COLOR_GOLD
    banner.line.width = Pt(1.5)

    tb_bn = slide.shapes.add_textbox(Inches(0.9), Inches(6.18), Inches(11.5), Inches(0.55))
    tf_bn = tb_bn.text_frame
    p_bn = tf_bn.paragraphs[0]
    p_bn.text = "السلسلة العلمية المتكاملة: بحث هندسي موجه  ←  براهين تجريبية على 79,268 موقعاً  ←  مساهمات أصيلة  ←  نشر محكم بمجلات Q1"
    p_bn.font.name = FONT_BODY
    p_bn.font.size = Pt(12)
    p_bn.font.bold = True
    p_bn.font.color.rgb = COLOR_WHITE
    p_bn.alignment = PP_ALIGN.CENTER

    # Speaker Notes
    notes = """=== مدخل القسم الرابع: النتائج والمقالات العلمية المنشورة (الزمن المقترح: 1:00 دقيقة) ===
• بطاقة السلايد: رقم 46 من 73 | النمط المعماري: Dark Academic Section Marker.
• النقاط التقديمية المحورية:
  - ماذا أعرض: السلسلة المنهجية المتكاملة التي تربط بين بيانات الشبكة السورية الحقيقية، محركات الاستمثال الهجينة، نظم GIS، وصولاً إلى النتائج التجريبية والنشر العلمي الدولي.
  - النقطة العلمية: أطروحتنا ليست أرقاماً نظرية معزولة ولا مجرد قائمة أوراق؛ بل هي دورة تحقق هندسي كاملة تبدأ من الواقع وتنتهي باعتراف دولي صريح.
  - بصمتي البحثية: الانتقال المنطقي المتين من بيانات الميدان (79,268 موقعاً) إلى النشر في كبرى مجلات الربع الأول (Elsevier Computer Networks Q1).

• سيناريو الإلقاء والشرح الصوتي المتقن:
"السادة أعضاء لجنة التحكيم الموقرة، أهلاً بكم في القسم الرابع من هذا العرض؛ وهو القسم الذي يمثل الحصاد التجريبي والأكاديمي لجهد سنوات البحث.
إن ما سنستعرضه في الدقائق القادمة ليس مجرد مخرجات خوارزمية على ورق، ولا هو قائمة منفصلة من الأوراق العلمية؛ بل هو سلسلة منهجية متماسكة تبدأ من واقع هندسي معقد تمثل في 79,268 موقعاً خلوياً تغطي كافة المحافظات السورية لشبكتي سيريتل و MTN، مرت عبر محركات استمثال هجينة تم ضبط قيودها لتلائم خصوصية الميدان، ودمجت مع التحليل الجغرافي ثلاثي الأبعاد ونظم GIS، لتخرج بنتائج تجريبية حاسمة أثبتت كفاءتها، وتُوجت باعتراف دولي صريح بنشر المساهمة الثالثة في مجلة Elsevier Computer Networks المصنفة في قمة الربع الأول عالمياً Q1، مع تقديم مساهمتي التخطيط والعدالة إلى مجلات دولية رصينة قيد التحكيم. دعونا ننتقل الآن إلى لوحة المؤشرات الإجمالية للأداء."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: لماذا تم تخصيص قسم مستقل يجمع النتائج مع الأوراق المنشورة؟
  * الإجابة النموذجية: في أطروحات الدكتوراه الهندسية التطبيقية، يكون النشر في مجلات Q1 هو التحكيم الأعمى المستقل (Double-blind peer review) الذي يؤكد للجنة التحكيم أن المنهجية المتبعة والنتائج الرقمية قد خضعت لتدقيق صارم من كبار علماء التخصص في العالم، وبالتالي فإن وضع الأوراق في سياق النتائج يبرهن على الترابط بين كل فصل في الأطروحة ومخرجه العلمي المباشر."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 47: QUAD-KPI METRIC COMMAND (UNIFIED RESULTS DASHBOARD)
# ==============================================================================
def build_slide_47(prs):
    slide = create_base_slide(
        prs,
        title_ar="المؤشرات الإجمالية للأداء والمخرجات الكمية (لوحة النتائج الكبرى)",
        slide_num=47,
        is_dark=False
    )

    # Top Quad-KPI Command Cards
    kpis = [
        {"val": "95.12%", "label": "نسبة التغطية الراديوية (BPSO)", "sub": "تفوق على AGA (94.91%)  |  p = 0.016", "color": COLOR_EMERALD},
        {"val": "132.8 M$", "label": "النفقات الرأسمالية (CapEx)", "sub": "وفر 8.4 مليون دولار (-5.95%)  |  p < 0.001", "color": COLOR_DEEP_TEAL},
        {"val": "78.3 MWh", "label": "استهلاك الطاقة التشغيلية", "sub": "وفر 4.4 ميغاواط ساعي (-5.32%)  |  p < 0.001", "color": COLOR_GOLD},
        {"val": "0.71", "label": "مؤشر العدالة المكانية SFI", "sub": "قفزة نوعية +36.5% لإنصاف 14 محافظة  |  p < 0.001", "color": COLOR_BURGUNDY}
    ]

    total_w = 11.7
    n = 4
    gap = 0.25
    card_w = (total_w - (n - 1) * gap) / n
    top_pos = Inches(1.8)
    h_kpi = Inches(1.9)

    for idx, k in enumerate(kpis):
        left_pos = Inches(0.8 + idx * (card_w + gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos, Inches(card_w), h_kpi)
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = k["color"]
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(left_pos + Inches(0.12), top_pos + Inches(0.12), Inches(card_w - 0.24), h_kpi - Inches(0.24))
        tf = tb.text_frame
        tf.word_wrap = True

        p_val = tf.paragraphs[0]
        p_val.text = k["val"]
        p_val.font.name = FONT_TITLE
        p_val.font.size = Pt(26)
        p_val.font.bold = True
        p_val.font.color.rgb = k["color"]
        p_val.alignment = PP_ALIGN.CENTER

        p_lbl = tf.add_paragraph()
        p_lbl.text = k["label"]
        p_lbl.font.name = FONT_BODY
        p_lbl.font.size = Pt(12)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = COLOR_TEXT_DARK
        p_lbl.alignment = PP_ALIGN.CENTER
        p_lbl.space_after = Pt(2)

        p_sub = tf.add_paragraph()
        p_sub.text = k["sub"]
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(9.5)
        p_sub.font.color.rgb = COLOR_TEXT_MUTED
        p_sub.alignment = PP_ALIGN.CENTER

    # Bottom Analytical Cards (2 Large Containers)
    add_card(
        slide,
        left=Inches(0.8), top=Inches(3.95), width=Inches(5.7), height=Inches(2.75),
        title="الأساس الميداني ودقة العزل والتحكم التشغيلي",
        items=[
            "قاعدة بيانات وطنية ضخمة: دراسة 79,268 موقعاً خلوياً فعلياً تمثل كامل رقعة الشبكة السورية لمشغلي سيريتل و MTN عبر 14 محافظة.",
            "دقة العزل المكاني الراديوي: بلغت 97.5% في النطاقات الحضرية مع الحفاظ الكامل على اتصالات الطوارئ الصوتية 112.",
            "أوركسترا متعددة الموردين: نسبة نجاح تخطت 98.1% لمعدات هواوي و 97.4% لإريكسون مع استعادة الخدمة في أقل من 10 دقائق.",
            "المساهمة التطبيقية: استبدال أجهزة التشويش المادي بحل برمجي سيادي آمن يمنع الإضرار بالمشافي والمرافق الحيوية."
        ],
        title_color=COLOR_DEEP_TEAL
    )

    add_card(
        slide,
        left=Inches(6.8), top=Inches(3.95), width=Inches(5.7), height=Inches(2.75),
        title="المتانة الإحصائية وبرهان جبهة باريتو المثلى",
        items=[
            "البروتوكول الإحصائي الصارم: تنفيذ 30 تشغيلاً مستقلاً (N = 30 Independent Runs) لمونت-كارلو لكل خوارزمية وسيناريو.",
            "اختبارات الفرضيات: اختبارا Mann-Whitney U و Wilcoxon Signed-Rank أكدا فروقاً دالة إحصائياً (p < 0.001 للكلفة والطاقة، و p = 0.016 للتغطية).",
            "هيمنة جبهة باريتو: خوارزمية BPSO حققت السيطرة الكاملة على فضاء الحلول مقارنة بـ AGA مع تسريع زمن الحساب بنسبة 16.9% (118s مقابل 142s).",
            "الخلاصة الدفاعية: لا تعارض هندسياً بين خفض التكاليف، تحقيق العدالة الجغرافية، وحفظ الأمن السيادي للشبكة."
        ],
        title_color=COLOR_BURGUNDY
    )

    # Speaker Notes
    notes = """=== المؤشرات الإجمالية للأداء والمخرجات الكمية (الزمن المقترح: 1:30 دقيقة) ===
• بطاقة السلايد: رقم 47 من 73 | النمط المعماري: Quad-KPI Metric Command (Unified Results Dashboard).
• النقاط التقديمية المحورية:
  - ماذا أعرض: لوحة النتائج الإجمالية بستة مؤشرات رئيسية مثبتة بالأدلة الإحصائية في الأطروحة.
  - النقطة العلمية: 79,268 موقعاً حقيقياً في سوريا، 95.12% تغطية راديوية، وفر 8.4M$ (-5.95%)، وفر طاقي 5.32%، قفزة SFI بـ +36.5%، ودقة عزل 97.5%.
  - بصمتي البحثية: تفوق كاسح لـ BPSO المقترح على كافة المحاور بدلالة إحصائية عالية p < 0.001 عبر 30 تشغيلاً مستقلاً.
  - ما يجب تذكره: أرقام مثبتة بالأدلة الإحصائية الحاسمة تدحض أي تضارب بين الكفاءة والعدالة والسيطرة.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"حضرات الأساتذة الأفاضل، تلخص هذه اللوحة الحصاد الرقمي الشامل لأطروحتنا في مؤشرات استراتيجية لا لبس فيها:
أولاً: الأساس الميداني؛ بحثنا لم يُبنَ على عينة افتراضية، بل على 79,268 موقعاً خلوياً فعلياً لمشغلي الخلوي في سوريا عبر 14 محافظة.
ثانياً: التغطية الراديوية؛ حقق نموذجنا المقترح عبر خوارزمية BPSO نسبة تغطية بلغت 95.12% متفوقة على الخوارزمية الجينية التكيفية بدلالة p=0.016.
ثالثاً: النفقات الاستثمارية؛ لم نكتفِ بزيادة التغطية، بل خفضنا كلفة الترقية بمقدار 8.4 مليون دولار، أي وفر بنسبة قاربت 6% (p < 0.001).
رابعاً: الطاقة التشغيلية؛ وفي ظل أزمة الطاقة الحادة، وفرت خوارزميتنا 4.4 ميغاواط ساعي بنسبة تحسن بلغت 5.32% (p < 0.001).
خامساً: العدالة التوزيعية؛ ارتفع مؤشر العدالة المكانية SFI من 0.52 إلى 0.71، أي قفزة نوعية بلغت 36.5% حمت الأرياف من الحرمان الرقمي.
وأخيراً: التحكم والسيادة؛ حققت منظومتنا دقة عزل قطاعي بلغت 97.5% في المناطق الحضرية مع قدرة استعادة فورية للخدمة دون إطفاء المحطات في أقل من 10 دقائق. هذه الأرقام تثبت بشكل قاطع أنه لا تعارض هندسياً بين خفض التكاليف وتحقيق العدالة وحفظ الأمن السيادي للشبكة."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: يبدو فارق التغطية صغيراً (+0.21%)، فهل يستحق اعتباره إنجازاً؟
  * الإجابة النموذجية: سؤال جوهري جداً؛ على رقعة شبكة تضم أكثر من 79 ألف موقع، فإن نسبة 0.21% تمثل تغطية عشرات الكيلومترات المربعة ومئات آلاف المشتركين الإضافيين. الأهم من ذلك هندسياً هو اقتران هذه الزيادة في التغطية مع وفر مالي ضخم مقداره 8.4 مليون دولار، وخفض في الطاقة بمقدار 4.4 MWh؛ أي أننا لم نحسن التغطية بضخ المزيد من الأموال وأبراج الطاقة، بل برفع كفاءة التوزيع الهندسي، وهذا هو التعريف الدقيق لجبهة باريتو المثلى (Pareto-Optimality)."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 48: PARETO TRADE-OFF MATRIX
# ==============================================================================
def build_slide_48(prs):
    slide = create_base_slide(
        prs,
        title_ar="النتائج المقارنة عبر المساهمات ومصفوفة التنازلات (Pareto Trade-Off)",
        slide_num=48,
        is_dark=False
    )

    # 3-Pillar Comparison Columns representing Pareto Trade-offs
    pillars = [
        {
            "name": "المساهمة 1: التخطيط الأمثل (PLAN)",
            "chap": "الفصل الرابع  |  C1",
            "color": COLOR_DEEP_TEAL,
            "metrics": [
                ("التغطية الراديوية", "95.12% (تفوق BPSO)"),
                ("كلفة الترقية CapEx", "132.8 M$ (وفر 8.4M$)"),
                ("استهلاك الطاقة", "78.3 MWh (وفر 5.32%)"),
                ("زمن الحساب", "118 ثانية (تسريع 16.9%)")
            ],
            "insight": "هيمنة مطلقة لحلول BPSO على جبهة باريتو عبر 300 تكرار بفضل آلية إصلاح القيود التكيفية، محققة أعلى تغطية عند أي مستوى ميزانية.",
            "paper": "الورقة 2: Optimizing 5G Deployment (قيد التحكيم)"
        },
        {
            "name": "المساهمة 2: العدالة المكانية (FAIR)",
            "chap": "الفصل الخامس  |  C2",
            "color": COLOR_EMERALD,
            "metrics": [
                ("مؤشر العدالة SFI", "0.71 (قفزة +36.5%)"),
                ("تغطية الأرياف", "88.7% (مقابل 64.2%)"),
                ("المواقع المعاد توجيهها", "1,480 موقعاً نحو الريف"),
                ("المفاضلة الطاقية", "+2.4% زيادة طفيفة فقط")
            ],
            "insight": "كسر احتكار المدن الكبرى (دمشق وحلب) وإعادة هندسة التوزيع الجغرافي لإنصاف 14 محافظة سورية مع الحفاظ على التغطية الكلية (95.12%).",
            "paper": "الورقة 3: Phased Upgrade & SFI (قيد التحكيم)"
        },
        {
            "name": "المساهمة 3: التحكم والعزل (CONTROL)",
            "chap": "الفصل السادس  |  C3",
            "color": COLOR_BURGUNDY,
            "metrics": [
                ("دقة العزل المكاني", "97.5% في النطاق الحضري"),
                ("تنسيق هواوي / إريكسون", "98.1% / 97.4% نجاح"),
                ("استعادة 2G / 3G", "< 5 دقائق  /  < 7 دقائق"),
                ("استعادة 4G LTE", "< 10 دقائق (صون 112)")
            ],
            "insight": "استبدال التشويش المادي بحل برمجي قطاعي عبر GIS يحمي مكبرات القدرة، ويوفر استعادة مؤتمتة آمنة دون إطفاء المحطات.",
            "paper": "الورقة 1: Elsevier Computer Networks (Q1 منشورة)"
        }
    ]

    total_w = 11.7
    w_col = 3.7
    gap = 0.3
    top_pos = Inches(1.8)
    h_col = Inches(4.25)

    for idx, p in enumerate(pillars):
        left_pos = Inches(0.8 + idx * (w_col + gap))

        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos, Inches(w_col), h_col)
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = p["color"]
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(left_pos + Inches(0.15), top_pos + Inches(0.15), Inches(w_col - 0.3), h_col - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        # Header Title
        p_t = tf.paragraphs[0]
        p_t.text = p["name"]
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = p["color"]
        p_t.alignment = PP_ALIGN.RIGHT

        p_ch = tf.add_paragraph()
        p_ch.text = p["chap"]
        p_ch.font.name = FONT_BODY
        p_ch.font.size = Pt(10)
        p_ch.font.bold = True
        p_ch.font.color.rgb = COLOR_TEXT_MUTED
        p_ch.alignment = PP_ALIGN.RIGHT
        p_ch.space_after = Pt(6)

        # 4 Metrics
        for m_name, m_val in p["metrics"]:
            p_m = tf.add_paragraph()
            p_m.text = f"• {m_name}: {m_val}"
            p_m.font.name = FONT_BODY
            p_m.font.size = Pt(10.5)
            p_m.font.color.rgb = COLOR_TEXT_DARK
            p_m.alignment = PP_ALIGN.RIGHT
            p_m.space_after = Pt(2)

        # Insight box
        p_in_lbl = tf.add_paragraph()
        p_in_lbl.text = "الخلاصة الهندسية وجبهة باريتو:"
        p_in_lbl.font.name = FONT_TITLE
        p_in_lbl.font.size = Pt(10.5)
        p_in_lbl.font.bold = True
        p_in_lbl.font.color.rgb = p["color"]
        p_in_lbl.alignment = PP_ALIGN.RIGHT
        p_in_lbl.space_before = Pt(6)

        p_in = tf.add_paragraph()
        p_in.text = p["insight"]
        p_in.font.name = FONT_BODY
        p_in.font.size = Pt(10)
        p_in.font.color.rgb = COLOR_TEXT_DARK
        p_in.alignment = PP_ALIGN.RIGHT
        p_in.space_after = Pt(6)

        # Paper link badge
        p_pp = tf.add_paragraph()
        p_pp.text = f"🔗 {p['paper']}"
        p_pp.font.name = FONT_BODY
        p_pp.font.size = Pt(9.5)
        p_pp.font.bold = True
        p_pp.font.color.rgb = p["color"]
        p_pp.alignment = PP_ALIGN.RIGHT

    # Bottom Synthesis Bar
    s_bar = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.15), Inches(11.7), Inches(0.65))
    s_bar.fill.solid()
    s_bar.fill.fore_color.rgb = COLOR_DARK_SLATE
    s_bar.line.color.rgb = COLOR_GOLD
    s_bar.line.width = Pt(1.5)

    tb_sb = slide.shapes.add_textbox(Inches(0.9), Inches(6.18), Inches(11.5), Inches(0.55))
    tf_sb = tb_sb.text_frame
    p_sb = tf_sb.paragraphs[0]
    p_sb.text = "مصفوفة باريتو المتكاملة: BPSO تحقق نقطة التشغيل المثلى (Optimal Operating Point) المتوازنة بين الكلفة، الطاقة، العدالة، والسيطرة السيادية."
    p_sb.font.name = FONT_BODY
    p_sb.font.size = Pt(11.5)
    p_sb.font.bold = True
    p_sb.font.color.rgb = COLOR_WHITE
    p_sb.alignment = PP_ALIGN.CENTER

    # Speaker Notes
    notes = """=== النتائج المقارنة عبر المساهمات البحثية الثلاث ومصفوفة باريتو (الزمن المقترح: 1:30 دقيقة) ===
• بطاقة السلايد: رقم 48 من 73 | النمط المعماري: Pareto Trade-off Matrix.
• النقاط التقديمية المحورية:
  - ماذا أعرض: الأعمدة البصرية الثلاثة المتوازية التي تلخص نتائج التخطيط (PLAN)، العدالة (FAIR)، والتحكم (CONTROL).
  - النقطة العلمية: التخطيط حقق باريتو الأمثل، العدالة أنصفت 14 محافظة ورفعت تغطية الريف لـ 88.7%، والتحكم حقق استعادة للخدمة في أقل من 10 دقائق.
  - بصمتي البحثية: الرابط الجغرافي الوطني الموحد: خريطة سوريا وطوبولوجيا شبكتي سيريتل و MTN توحد المساهمات الثلاث.
  - ما يجب تذكره: لكل مساهمة نتيجة هندسية قابلة للقياس متبوعة بورقة علمية متخصصة.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"توضح هذه الشريحة التكامل العضوي بين مساهماتنا الثلاث؛ إذ إن أطروحتنا ليست جزراً بحثية معزولة، بل بناء هندسي موحد:
بدأنا بـ PLAN في الفصل الرابع؛ حيث صممنا خوارزمية BPSO التي وفرت 8.4 مليون دولار و 5.3% من الطاقة، وأنجزت الحساب في 118 ثانية فقط وهيمنت على جبهة باريتو.
ولكن التخطيط الرياضي البحت قد يفرز انحيازاً جغرافياً نحو المدن، وهنا انبثقت المساهمة الثانية FAIR في الفصل الخامس؛ التي فرضت قيد العدالة المكانية SFI لتقفز بقيمته إلى 0.71، وتعيد توجيه 1,480 ترقية نحو الريف السوري لترفع تغطيته إلى 88.7% بمفاضلة طاقية طفيفة لم تتعدَّ 2.4%.
وحين تكتمل الشبكة ويتم تشغيلها، تبرز الحاجة للسيادة والسيطرة التشغيلية في الأزمات والطوارئ، فجاءت المساهمة الثالثة CONTROL في الفصل السادس؛ لتقدم العزل البرمجي القطاعي بدقة 97.5% وتنسيق متعدد الموردين تخطى 97.4%، مع استعادة تامة للخدمة في أقل من 10 دقائق، وهو الإنجاز الذي تكلل بنشره في Elsevier Q1."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: كيف تضمن أن إعادة توجيه 1,480 موقعاً نحو الريف لم تؤدِّ إلى تدهور حاد في جودة الخدمة بمراكز المدن المكتظة؟
  * الإجابة النموذجية: هذا بالتحديد هو جوهر خوارزمية التحسين متعددة الأهداف المقترحة؛ فالخوارزمية لم تقتطع من سعة المدن الحيوية، بل تخلت عن الترقيات الحدية ذات المردود التنازلي (Diminishing Returns) في المناطق التي تمتلك أصلاً خلايا متداخلة بكثافة عالية، ووجهتها إلى خلايا ريفية ذات أثر تغطية واسع، ولذلك حافظت التغطية الإجمالية الوطنية على مستواها العالي (95.12%)."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 49: HERO GIANT STAT (وفر 8.4M$ و 4.4MWh)
# ==============================================================================
def build_slide_49(prs):
    slide = create_base_slide(
        prs,
        title_ar="النتائج التجريبية — تخطيط ترقية الشبكة وتوفير الموارد (الفصل الرابع)",
        slide_num=49,
        is_dark=False
    )

    # Hero Giant Block (Right Side: Width 4.6 in, Height 4.8 in)
    box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(4.6), Inches(4.8))
    box.fill.solid()
    box.fill.fore_color.rgb = COLOR_DARK_SLATE
    box.line.color.rgb = COLOR_GOLD
    box.line.width = Pt(2.5)

    tf = box.text_frame
    tf.word_wrap = True

    p_badge = tf.paragraphs[0]
    p_badge.text = "HERO STATISTIC — الحصاد المالي والتشغيلي"
    p_badge.font.name = FONT_BODY
    p_badge.font.size = Pt(11)
    p_badge.font.bold = True
    p_badge.font.color.rgb = COLOR_GOLD
    p_badge.alignment = PP_ALIGN.CENTER
    p_badge.space_before = Pt(14)
    p_badge.space_after = Pt(10)

    p_num = tf.add_paragraph()
    p_num.text = "8.4 M$"
    p_num.font.name = FONT_TITLE
    p_num.font.size = Pt(46)
    p_num.font.bold = True
    p_num.font.color.rgb = COLOR_GOLD
    p_num.alignment = PP_ALIGN.CENTER

    p_lbl = tf.add_paragraph()
    p_lbl.text = "وفر مالي استثماري مباشر (-5.95% CapEx)"
    p_lbl.font.name = FONT_TITLE
    p_lbl.font.size = Pt(14)
    p_lbl.font.bold = True
    p_lbl.font.color.rgb = COLOR_WHITE
    p_lbl.alignment = PP_ALIGN.CENTER
    p_lbl.space_after = Pt(14)

    p_num2 = tf.add_paragraph()
    p_num2.text = "& 4.4 MWh"
    p_num2.font.name = FONT_TITLE
    p_num2.font.size = Pt(32)
    p_num2.font.bold = True
    p_num2.font.color.rgb = COLOR_EMERALD
    p_num2.alignment = PP_ALIGN.CENTER

    p_lbl2 = tf.add_paragraph()
    p_lbl2.text = "ترشيد استهلاك الطاقة اليومي (-5.32% Energy)"
    p_lbl2.font.name = FONT_BODY
    p_lbl2.font.size = Pt(12)
    p_lbl2.font.bold = True
    p_lbl2.font.color.rgb = COLOR_WHITE
    p_lbl2.alignment = PP_ALIGN.CENTER
    p_lbl2.space_after = Pt(14)

    p_stat = tf.add_paragraph()
    p_stat.text = "N = 30 Runs  •  p < 0.001 (دال إحصائياً جداً)"
    p_stat.font.name = FONT_BODY
    p_stat.font.size = Pt(11)
    p_stat.font.bold = True
    p_stat.font.color.rgb = RGBColor(148, 163, 184)
    p_stat.alignment = PP_ALIGN.CENTER

    # Analytical Wing (Left Side: 3 Stacked Cards, Width 6.8 in)
    top_start = 1.8
    h_card = 1.45
    gap = 0.225

    analytical_cards = [
        (
            "كفاءة التقارب والسرعة الخوارزمية (الشكل 14 من الأطروحة)",
            [
                "استقرت خوارزمية BPSO عند الحل الأمثل في 118 ثانية فقط مقارنة بـ 142 ثانية لخوارزمية AGA (تسريع 16.9%).",
                "آلية إصلاح القيود التكيفية (Adaptive Constraint Repair) جنّبت الخوارزمية الوقوع في الحلول غير المقبولة فيزيائياً."
            ],
            COLOR_DEEP_TEAL
        ),
        (
            "هيمنة جبهة باريتو للتغطية مقابل الكلفة (الشكل 15 من الأطروحة)",
            [
                "أثبتت نتائج 300 تكرار هيمنة كاملة لحلول BPSO على فضاء الحلول غير المغلوبة مقارنة بـ AGA.",
                "حققت BPSO تغطية 95.12% بكلفة 132.8M$ مقابل 94.91% بكلفة 141.2M$ لـ AGA بدلالة معنوية p = 0.016."
            ],
            COLOR_BURGUNDY
        ),
        (
            "الأثر المالي والاستراتيجي لإعادة الإعمار الوطني",
            [
                "توفير 8.4 مليون دولار يعادل تمويل صيانة وتشغيل مئات المحطات في ظل شح الميزانيات والعملة الصعبة.",
                "الاعتماد على الترقية التشاركية الذكية (Co-siting) للأبراج الحالية بدلاً من بناء محطات جديدة باهظة الكلفة."
            ],
            COLOR_GOLD
        )
    ]

    for idx, (c_title, c_items, c_color) in enumerate(analytical_cards):
        top_c = Inches(top_start + idx * (h_card + gap))
        add_card(
            slide,
            left=Inches(5.7), top=top_c, width=Inches(6.8), height=Inches(h_card),
            title=c_title, items=c_items, title_color=c_color
        )

    # Speaker Notes
    notes = """=== النتائج التجريبية — تخطيط ترقية الشبكة وتوفير الموارد (الزمن المقترح: 1:30 دقيقة) ===
• بطاقة السلايد: رقم 49 من 73 | النمط المعماري: Hero Giant Stat (وفر 8.4M$ و 4.4MWh).
• النقاط التقديمية المحورية:
  - ماذا أعرض: الشكلين 14 و 15 من الأطروحة (منحنيات التقارب وجبهة باريتو المثلى للتغطية مقابل الكلفة).
  - النقطة العلمية: خوارزمية BPSO المزودة بآلية إصلاح القيود تفوقت في تسريع التقارب (118s مقابل 142s) وهيمنت تماماً على جبهة باريتو.
  - بصمتي البحثية: تحقيق تغطية 95.12% مع وفر مالي مباشر 8.4 مليون دولار وترشيد 4.4 MWh من الطاقة التشغيلية.
  - ما يجب تذكره: الاستنتاج المحوري: التحسين الخوارزمي وفر الميزانية والطاقة دون التفريط بالتغطية الراديوية.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"نعرض أمامكم في هذه الشريحة النتائج التجريبية التفصيلية للمساهمة الأولى المعنية بتخطيط الترقية (الفصل الرابع).
بالنظر إلى الشكل 14 في الأطروحة، نرى منحنيات التقارب عبر 300 تكرار؛ يتضح جلياً تفوق خوارزمية BPSO المقترحة في سرعة الوصول إلى الحل الأمثل خلال 118 ثانية فقط، بفضل آلية إصلاح القيود التي طوّرناها والتي جنّبت الخوارزمية إهدار الوقت في فحص الحلول غير المقبولة فيزيائياً.
أما في الشكل 15، فنشاهد جبهة باريتو التي تمثل صلب مساهمتنا؛ حيث استطاعت BPSO الهيمنة على فضاء الحلول، محققة تغطية 95.12% مع خفض الكلفة إلى 132.8 مليون دولار. هذا الفارق يعني توفير 8.4 مليون دولار لقطاع الاتصالات الوطني، مع خفض 4.4 ميغاواط ساعي من الطاقة، وكلاهما بدلالة إحصائية قطعية عبر 30 تشغيلاً مستقلاً (p < 0.001)."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: لماذا تم اختيار BPSO بالتحديد ومقارنتها مع AGA دون غيرها من الخوارزميات الميتولوجية مثل (PSO المستمر أو SA)؟
  * الإجابة النموذجية: مسألة اختيار مواقع الترقية وتخصيص حوامل التردد هي بطبيعتها مسألة استمثال توافقي ثنائي (Binary 0/1 Knapsack & Facility Location Problem)، ولذلك فإن BPSO تمثل النموذج الرياضي الطبيعي لتمثيل المتغيرات (0 لعدم الترقية، 1 للترقية). أما AGA فتم اختيارها كمعيار مقارنة لأنها المنهجية الأكثر انتشاراً في أدبيات تخطيط الراديو المرجعية؛ وقد أظهرت تجاربنا تفوق BPSO بسبب قدرتها العالية على الموازنة بين الاستكشاف (Exploration) والاستغلال (Exploitation) عبر فضاء الحالة الثنائي."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 50: SPATIAL MAP-ANCHORED CANVAS (SFI بالمحافظات)
# ==============================================================================
def build_slide_50(prs):
    slide = create_base_slide(
        prs,
        title_ar="النتائج التجريبية — تحقيق العدالة المكانية والتوازن الجغرافي (الفصل الخامس)",
        slide_num=50,
        is_dark=False
    )

    # Right Canvas: Spatial Regional Breakdown & Before vs After (Width 6.0 in, Height 4.8 in)
    map_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(6.0), Inches(4.8))
    map_box.fill.solid()
    map_box.fill.fore_color.rgb = COLOR_WHITE
    map_box.line.color.rgb = COLOR_EMERALD
    map_box.line.width = Pt(2)

    tf_m = map_box.text_frame
    tf_m.word_wrap = True

    p_mt = tf_m.paragraphs[0]
    p_mt.text = "الأثر الميداني لقيد SFI على خريطة سوريا (الشكل 24 من الأطروحة)"
    p_mt.font.name = FONT_TITLE
    p_mt.font.size = Pt(14)
    p_mt.font.bold = True
    p_mt.font.color.rgb = COLOR_EMERALD
    p_mt.alignment = PP_ALIGN.RIGHT
    p_mt.space_after = Pt(8)

    regional_text = [
        "التوزيع الجغرافي عبر أقاليم المحافظات الـ 14:",
        "  • المنطقة الجنوبية: دمشق، ريف دمشق، درعا، السويداء، القنيطرة (قفزة تغطية درعا والسويداء +22%).",
        "  • المنطقة الوسطى والساحلية: حمص، حماة، طرطوس، اللاذقية (تغطية متوازنة تراعي سلاسل الجبال الساحلية).",
        "  • المنطقة الشمالية والشرقية: حلب، إدلب، الرقة، دير الزور، الحسكة (إنصاف قرى الجزيرة والبادية +26%).",
        "",
        "مقارنة التحول الجغرافي المباشر (Before vs After):",
        "  [ النمط التجاري البحت (دون قيد SFI) ]:",
        "    - تركز 82% من الترقيات في دمشق وحلب  |  SFI = 0.42  |  تغطية الأرياف 64.2% فقط.",
        "  [ النموذج العادل المقترح (مع دمج قيد SFI) ]:",
        "    - توزيع وطني متوازن وشامل  |  SFI = 0.71 (+36.5%)  |  تغطية الأرياف قفزت إلى 88.7%."
    ]

    for line in regional_text:
        p_l = tf_m.add_paragraph()
        p_l.text = line
        p_l.font.name = FONT_BODY
        p_l.font.size = Pt(10.5)
        if "النمط التجاري" in line:
            p_l.font.bold = True
            p_l.font.color.rgb = COLOR_BURGUNDY
        elif "النموذج العادل" in line:
            p_l.font.bold = True
            p_l.font.color.rgb = COLOR_EMERALD
        elif "الأثر الميداني" in line or "التوزيع الجغرافي" in line or "مقارنة" in line:
            p_l.font.bold = True
            p_l.font.color.rgb = COLOR_TEXT_DARK
        else:
            p_l.font.color.rgb = COLOR_TEXT_DARK
        p_l.alignment = PP_ALIGN.RIGHT
        p_l.space_after = Pt(2)

    # Left Side: 4 Metric Cards (Width 5.4 in)
    sfi_kpis = [
        ("مؤشر العدالة المكانية (SFI)", "0.71 مع BPSO (قفزة +36.5%، p < 0.001)", "ارتفع من 0.52 لـ AGA و 0.42 في التخطيط التقليدي.", COLOR_EMERALD),
        ("نسبة التغطية في المناطق الريفية", "88.7% (قفزة نوعية بمقدار +24.5 نقطة)", "مقابل 64.2% في التخطيط التجاري البحت غير المقيد.", COLOR_DEEP_TEAL),
        ("إعادة التوجيه الجغرافي للمواقع", "1,480 موقعاً خلوياً تم نقل ترقيتها", "تحويل مسار الاستثمار من المدن المشبعة نحو الأرياف المحرومة.", COLOR_GOLD),
        ("المفاضلة الطاقية الناتجة (Trade-off)", "+2.4% استهلاك إضافي طفيف فقط", "ثمن زهيد ومبرر هندسياً واجتماعياً لتأمين الشمول الرقمي الوطني.", COLOR_BURGUNDY)
    ]

    top_k = 1.8
    h_card = 1.05
    gap_k = 0.2

    for idx, (t, val, sub, col) in enumerate(sfi_kpis):
        top_pos = Inches(top_k + idx * (h_card + gap_k))
        add_card(
            slide,
            left=Inches(7.1), top=top_pos, width=Inches(5.4), height=Inches(h_card),
            title=f"{t}: {val}", items=[sub], title_color=col
        )

    # Speaker Notes
    notes = """=== النتائج التجريبية — تحقيق العدالة المكانية والتوازن الجغرافي (الزمن المقترح: 1:30 دقيقة) ===
• بطاقة السلايد: رقم 50 من 73 | النمط المعماري: Spatial Map-Anchored Canvas (SFI بالمحافظات).
• النقاط التقديمية المحورية:
  - ماذا أعرض: الشكل 24 من الأطروحة: المقارنة الجغرافية الميدانية على خريطة سوريا بين النموذج التقليدي والنموذج العادل.
  - النقطة العلمية: قفزة مؤشر العدالة المكانية SFI من 0.52 لـ AGA إلى 0.71 لـ BPSO (+36.5%، p < 0.001).
  - بصمتي البحثية: إعادة توجيه 1,480 ترقية نحو الأرياف، رافعاً تغطيتها إلى 88.7% بمفاضلة طاقية طفيفة بلغت 2.4% فقط.
  - ما يجب تذكره: الخريطة تبرهن للجنة التحكيم أن قيد العدالة حقق أثراً مكانياً ملموساً حمى الأرياف من الفجوة الرقمية.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"ننتقل إلى المساهمة الثانية؛ العدالة المكانية الراديوية (الفصل الخامس).
إن معضلة تخطيط شبكات الاتصال تاريخياً تكمن في أن الخوارزميات التجارية تركز الاستثمارات في مراكز المدن الكثيفة لتحقيق أعلى عائد، مما يخلق فجوة رقمية عميقة تحرم الأرياف والمناطق الطرفية.
في الشكل 24 من الأطروحة، نعرض الأثر الميداني لإدخال مؤشر العدالة المكانية SFI الذي ابتكرناه؛ حيث نرى كيف تحولت خريطة التغطية السورية من التركز الحاد في دمشق وحلب بنسبة 82%، إلى شبكة موزعة بعدالة تكافئ بين كافة المحافظات الـ 14.
هذا الإجراء رفع مؤشر العدالة المكانية SFI بنسبة 36.5% ليصل إلى 0.71، ونقل التغطية الريفية من 64.2% إلى 88.7% عبر إعادة توجيه 1,480 موقعاً، وبمفاضلة طاقية طفيفة للغاية لم تتعدَّ 2.4%. لقد أثبتنا أن الدولة قادرة على تحقيق الشمول الرقمي دون استنزاف مالي."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: كيف تم قياس مؤشر العدالة المكانية SFI رياضياً؟
  * الإجابة النموذجية: تم بناء مؤشر SFI بالاعتماد على صياغة رياضية مشتقة من مؤشر جاين للعدالة (Jain's Fairness Index) وموزونة جغرافياً بكثافة السكان والمساحة الإقليمية لكل محافظة:
    SFI = [ (sum(C_k / D_k))^2 ] / [ M * sum((C_k / D_k)^2) ]
    حيث C_k نسبة التغطية الراديوية في المحافظة k، و D_k الكثافة النسبية المطلوبة، و M عدد المحافظات (14). يقترب المؤشر من 1 كلما تساوت مستويات التغطية نسبة للحاجة المكانية، وقد قفز المؤشر لدينا من 0.42 إلى 0.71، مما يعكس توزيعاً يكافئ كافة أبناء الوطن."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 51: SPLIT-SCREEN HIGH CONTRAST (Huawei vs Ericsson)
# ==============================================================================
def build_slide_51(prs):
    slide = create_base_slide(
        prs,
        title_ar="نتائج التحكم والعزل البرمجي — الأوركسترا متعددة الموردين (الفصل السادس)",
        slide_num=51,
        is_dark=False
    )

    # Right Half: Huawei Infrastructure (Syriatel) - Burgundy/Dark Slate Tone
    add_card(
        slide,
        left=Inches(0.8), top=Inches(1.8), width=Inches(5.6), height=Inches(4.1),
        title="تجهيزات هواوي — شركة سيريتل Syriatel",
        items=[
            "نسبة نجاح الأوركسترا والتنسيق: 98.1% ± 1.1%",
            "نسبة كبح التسليم غير المرغوب (Handover): 93.2% ± 2.0%",
            "ثبات واستقرار الاستعادة البرمجية: 96.8% ± 1.5%",
            "بيئة التحكم: واجهات U2020 / iMaster NCE عبر بروتوكولات REST و NETCONF.",
            "آلية العزل: حجب حوامل البيانات (Data Carriers) على مستوى القطاع مع إبقاء نداءات الطوارئ 112.",
            "التطبيق: معمارية التنسيق الموحد للشكل 29 من الأطروحة."
        ],
        title_color=COLOR_BURGUNDY, border_color=COLOR_BURGUNDY, border_width=2
    )

    # Left Half: Ericsson Infrastructure (MTN Syria) - Tech Blue/Teal Tone
    add_card(
        slide,
        left=Inches(6.9), top=Inches(1.8), width=Inches(5.6), height=Inches(4.1),
        title="تجهيزات إريكسون — شركة MTN سوريا",
        items=[
            "نسبة نجاح الأوركسترا والتنسيق: 97.4% ± 1.4%",
            "نسبة كبح التسليم غير المرغوب (Handover): 92.0% ± 2.3%",
            "ثبات واستقرار الاستعادة البرمجية: 95.9% ± 1.7%",
            "بيئة التحكم: منصة Ericsson Network Manager (ENM) والأوامر الموحدة.",
            "آلية العزل: كبح خوارزميات التسليم الخلوي وتعديل بارامترات RSRP و PRBs الاسمية.",
            "التطبيق: خوارزمية التقاطع المكاني للشكل 31 من الأطروحة."
        ],
        title_color=COLOR_BLUE, border_color=COLOR_BLUE, border_width=2
    )

    # Central VS Badge
    vs = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(6.166), Inches(3.4), Inches(1.0), Inches(1.0))
    vs.fill.solid()
    vs.fill.fore_color.rgb = COLOR_GOLD
    vs.line.color.rgb = COLOR_WHITE
    vs.line.width = Pt(2.5)

    p_vs = vs.text_frame.paragraphs[0]
    p_vs.text = "VS"
    p_vs.font.name = FONT_TITLE
    p_vs.font.size = Pt(14)
    p_vs.font.bold = True
    p_vs.font.color.rgb = COLOR_WHITE
    p_vs.alignment = PP_ALIGN.CENTER

    # Bottom Synthesis Banner
    b_bar = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.05), Inches(11.7), Inches(0.75))
    b_bar.fill.solid()
    b_bar.fill.fore_color.rgb = COLOR_DARK_TEAL
    b_bar.line.color.rgb = COLOR_GOLD
    b_bar.line.width = Pt(1.5)

    tb_bb = slide.shapes.add_textbox(Inches(0.9), Inches(6.08), Inches(11.5), Inches(0.68))
    tf_bb = tb_bb.text_frame
    p_bb = tf_bb.paragraphs[0]
    p_bb.text = "الحصيلة الميدانية المشتركة: دقة عزل مكاني 97.5%  |  استعادة 2G في < 5 دقائق  |  استعادة 3G في < 7 دقائق  |  استعادة 4G في < 10 دقائق\nمنشور رسمياً في مجلة Elsevier Computer Networks (Q1, 2026, Article 112653)"
    p_bb.font.name = FONT_BODY
    p_bb.font.size = Pt(11)
    p_bb.font.bold = True
    p_bb.font.color.rgb = COLOR_WHITE
    p_bb.alignment = PP_ALIGN.CENTER

    # Speaker Notes
    notes = """=== نتائج التحكم والعزل البرمجي — الأوركسترا متعددة الموردين (الزمن المقترح: 1:30 دقيقة) ===
• بطاقة السلايد: رقم 51 من 73 | النمط المعماري: Split-Screen High Contrast (Huawei vs Ericsson).
• النقاط التقديمية المحورية:
  - ماذا أعرض: الشكلين 29 و 31 من الأطروحة: معمارية التنسيق متعدد الموردين وخوارزمية التقاطع المكاني القطاعي.
  - النقطة العلمية: تحقيق دقة عزل مكاني بلغت 97.5% في البيئات الحضرية ونجاح تنسيق مشترك 98.1% لهواوي و 97.4% لإريكسون.
  - بصمتي البحثية: إنجاز العزل البرمجي التام دون إطفاء المحطات، واستعادة الخدمة في أقل من 10 دقائق مع صون مكالمات 112.
  - ما يجب تذكره: هذا الإنجاز العملي هو جوهر ورقتنا المنشورة في مجلة Computer Networks (Elsevier Q1).

• سيناريو الإلقاء والشرح الصوتي المتقن:
"نصل الآن إلى المساهمة الثالثة والأكثر حساسية وتطبيقاً ميدانياً؛ التحكم التشغيلي والعزل المكاني بمساعدة GIS (الفصل السادس).
في الأزمات الأمنية وحالات الطوارئ، كان المشغلون يلجؤون للتشويش اللاسلكي العشوائي أو قطع الكهرباء عن المحطات، مما يعطل المشافي ونداءات النجدة ويؤذي المعدات.
حلّنا المقترح يعتمد على البرمجيات ونظم المعلومات الجغرافية؛ حيث يوضح الشكل 29 المعمارية الموحدة التي بنيناها لتخاطب منصات إدارة الشبكة لموردي الشبكة في سوريا (هواوي في سيريتل، وإريكسون في MTN) بالتوازي.
ويوضح الشكل 31 خوارزمية التقاطع المكاني القطاعي؛ التي تحجب حوامل البيانات (Data Carriers) على مستوى القطاع الراديوي فقط داخل المنطقة المحظورة، وتبقي على قنوات الطوارئ 112.
حققنا دقة عزل مكاني بلغت 97.5%، بنسبة نجاح أوركسترا 98.1% لهواوي و 97.4% لإريكسون، واستعادة كاملة لخدمة 4G في أقل من 10 دقائق وللجيل الثاني في أقل من 5 دقائق. هذه النتائج هي ذاتها التي نالت ثقة المحكمين الدوليين في مجلة Elsevier Computer Networks."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: كيف تمت معالجة مكالمات الطوارئ 112 في المناطق المعزولة برمجياً؟
  * الإجابة النموذجية: تكمن أصالة حلنا البرمجي في عدم إطفاء التردد الحامل الأساسي للخلية (BCCH في 2G)، بل قمنا برمجياً بحجب قنوات نقل البيانات التشاركية (Packet Data Channels - PDCH في 2G/3G، و PDSCH PRBs في 4G)، مع إبقاء قنوات التنبيه الصوتي ونداءات الاستغاثة (Emergency Call Access Class 11-15) مفتوحة ومحصنة، وبالتالي تمكن المواطن من الاتصال بالرقم 112 في حين مُنعت شبكات البيانات المغذية للعمليات التخريبية."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 52: ASYMMETRIC BENTO GRID (الدروس الهندسية)
# ==============================================================================
def build_slide_52(prs):
    slide = create_base_slide(
        prs,
        title_ar="ماذا كشفت التجارب الميدانية؟ استنتاجات ومحدوديات هندسية (نقد علمي)",
        slide_num=52,
        is_dark=False
    )

    # 1. Hero Card (Large Left/Right: Width 6.0 in, Height 4.8 in)
    add_card(
        slide,
        left=Inches(0.8), top=Inches(1.8), width=Inches(6.0), height=Inches(4.8),
        title="الاستنتاج الخوارزمي والمكاني (موازنة الأهداف وإعادة هندسة الجغرافيا)",
        items=[
            "آلية إصلاح القيود التكيفية (Adaptive Constraint Repair): منعت خوارزمية BPSO من الهبوط في النهايات الصغرى المحلية وحققت وفراً متزامناً قدره 8.4 M$ و 5.3% طاقة دون المساس بالتغطية (95.12%).",
            "إعادة التوزيع المكاني: قيد SFI كسر نمط التكديس التجاري الجشع، وأعاد توجيه 1,480 موقعاً ريفياً رافعاً تغطيتها إلى 88.7% بمفاضلة طاقية طفيفة لم تتجاوز 2.4%.",
            "التكامل الرياضي الجغرافي: برهنت التجارب أن إدخال الأبعاد الطبوغرافية DEM ومؤشرات العدالة يحول التخطيط من حسابات تجريدية إلى أداة تنمية وطنية حقيقية."
        ],
        title_color=COLOR_DEEP_TEAL, border_color=COLOR_DEEP_TEAL, border_width=2
    )

    # 2. Top Wide Card (Width 5.4 in, Height 2.25 in)
    add_card(
        slide,
        left=Inches(7.1), top=Inches(1.8), width=Inches(5.4), height=Inches(2.25),
        title="الاستنتاج التشغيلي والسيادي (الاستهداف القطاعي البرمجي)",
        items=[
            "حماية البنية التحتية: التحول من إطفاء المحطات إلى حجب حوامل البيانات برمجياً حمى مكبرات القدرة (Power Amplifiers) من صدمات الإقلاع الكهربائي المفاجئ (Current Surges).",
            "الاستجابة الفورية: استعادة الخدمة في <10 دقائق لكافة الأجيال وصون اتصالات 112 بنسبة 100%."
        ],
        title_color=COLOR_DARK_TEAL
    )

    # 3. Bottom-Left Card: Documented Physical Limitation (Width 2.55 in, Height 2.3 in)
    add_card(
        slide,
        left=Inches(7.1), top=Inches(4.3), width=Inches(2.55), height=Inches(2.3),
        title="المحدودية الهندسية الموثقة (Spillover)",
        items=[
            "تسرب إشعاعي ريفي > 46% بسبب كبر نصف قطر الخلايا (5-15 كم) وارتفاع الأبراج.",
            "اعتراف علمي صريح بحدود الانتشار الراديوي في البيئات المفتوحة."
        ],
        title_color=COLOR_BURGUNDY, border_color=COLOR_BURGUNDY, border_width=2
    )

    # 4. Bottom-Right Card: Engineering Recommendation (Width 2.55 in, Height 2.3 in)
    add_card(
        slide,
        left=Inches(9.95), top=Inches(4.3), width=Inches(2.55), height=Inches(2.3),
        title="التوصية والعلاج الهندسي الميداني",
        items=[
            "تقليص التسرب بنسبة 31% عبر الضبط الكهربائي للميل (RET).",
            "معايرة القدرة المشعة (EIRP) ديناميكياً لضبط الحدود الراديوية."
        ],
        title_color=COLOR_GOLD, border_color=COLOR_GOLD, border_width=2
    )

    # Speaker Notes
    notes = """=== ماذا كشفت التجارب الهندسية؟ استنتاجات ومحدوديات هندسية (الزمن المقترح: 2:00 دقيقة) ===
• بطاقة السلايد: رقم 52 من 73 | النمط المعماري: Asymmetric Bento Grid (الدروس الهندسية).
• النقاط التقديمية المحورية:
  - ماذا أعرض: أربعة استنتاجات هندسية صريحة تجمع بين نجاحات التحسين والعدالة والاستهداف القطاعي، ومحدودية التسرب الإشعاعي (Spillover).
  - النقطة العلمية: تفسير فيزيائي علمي لظاهرة التسرب غير المقصود (>46%) في الأرياف بسبب كبر الخلايا وارتفاع الأبراج.
  - بصمتي البحثية: النضج الأكاديمي والمصداقية العلمية: لم نكتفِ بعرض الإيجابيات بل وثقنا المحدوديات وقدمنا حلول الضبط الفيزيائي (Electrical Tilt & Power).
  - ما يجب تذكره: الاعتراف بالحدود الهندسية قوة علمية تعزز ثقة لجنة التحكيم بالباحث وعمله الميداني.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"السادة أعضاء اللجنة، إن المصداقية الأكاديمية والبحثية لا تقتصر على الاحتفاء بالإنجازات، بل تتطلب شجاعة الاعتراف بالحدود الهندسية والفيزيائية للميدان.
كشفت تجاربنا عن ثلاثة استنتاجات هندسية مشرقة: قدرة BPSO على موازنة الكلفة والطاقة، وقدرة قيد SFI على إنصاف 14 محافظة، وجدوى العزل البرمجي القطاعي في حماية الشبكة واستعادتها السريعة.
لكن التطبيق العملي كشف لنا أيضاً عن محدودية هندسية فيزيائية حقيقية وثقناها بأمانة علمية في الأطروحة؛ ألا وهي ظاهرة التسرب الإشعاعي غير المقصود (Spillover) في البيئات الريفية وشبه الحضرية؛ حيث تجاوزت نسبة التسرب 46% بسبب كبر حجم الخلايا وارتفاع الأبراج.
ولم نكتفِ برصد المشكلة، بل وضعنا توصيات هندسية لمعالجتها عبر تقنيات الضبط الكهربائي للزوايا (Remote Electrical Tilt) والتحكم الديناميكي بالقدرة (EIRP) مما قلص التسرب بنسبة 31%. إن هذا التقييم النقدي هو ما يمنح أطروحتنا نضجها الهندسي الكامل."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: هل أثر تسرب الإشعاع (>46%) في الأرياف على فاعلية العزل الأمني؟
  * الإجابة النموذجية: سؤال في غاية الأهمية؛ في البيئات الحضرية الكثيفة (Dense Urban) حيث توجد المنشآت الحساسة ومراكز القرار، كانت نسبة العزل دقيقة جداً (97.5%) بسبب صغر حجم الخلايا (Microcells) ووجود المباني التي تحد من الانتشار. أما في الأرياف، فنظراً للطبيعة المفتوحة، فإن التسرب كان متوقعاً فيزيائياً، ولكن بما أن الهدف الأمني في الريف غالباً ما يكون مساحياً واسعاً وليس نقطياً ضيقاً، فإن هذا التسرب لم يفرط بالهدف الأمني الأساسي، بل عولج برمجياً بتعديل معاملات الميل الراديوي (Tilt)."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 53: HORIZONTAL PIPELINE (مسار النشر)
# ==============================================================================
def build_slide_53(prs):
    slide = create_base_slide(
        prs,
        title_ar="خارطة الإنتاج العلمي ومسار الأوراق البحثية المنبثقة عن الأطروحة",
        slide_num=53,
        is_dark=False
    )

    # Top Stepper Timeline (Horizontal Pipeline across 11.7 in)
    p_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(1.0))
    p_box.fill.solid()
    p_box.fill.fore_color.rgb = COLOR_DARK_TEAL
    p_box.line.color.rgb = COLOR_GOLD
    p_box.line.width = Pt(1.5)

    tf_p = p_box.text_frame
    tf_p.word_wrap = True
    p_pt = tf_p.paragraphs[0]
    p_pt.text = "مسار الإنتاج والنشر العلمي: تغطية شاملة 100% لكافة مساهمات وفصول أطروحة الدكتوراه"
    p_pt.font.name = FONT_TITLE
    p_pt.font.size = Pt(12)
    p_pt.font.bold = True
    p_pt.font.color.rgb = COLOR_GOLD
    p_pt.alignment = PP_ALIGN.CENTER

    p_flow = tf_p.add_paragraph()
    p_flow.text = "الفصل الرابع (PLAN) ──> الورقة 2 (تحكيم دولي)  |  الفصل الخامس (FAIR) ──> الورقة 3 (تحكيم دولي)  |  الفصل السادس (CONTROL) ──> الورقة 1 (منشورة Q1)"
    p_flow.font.name = FONT_BODY
    p_flow.font.size = Pt(11)
    p_flow.font.bold = True
    p_flow.font.color.rgb = COLOR_WHITE
    p_flow.alignment = PP_ALIGN.CENTER
    p_flow.space_before = Pt(4)

    # 3 Column Detailed Preview beneath the timeline
    papers = [
        {
            "num": "الورقة العلمية 01 (منشورة)",
            "status": "PUBLISHED (2026) — Q1 TOP TIER",
            "journal": "Computer Networks (Elsevier)",
            "metrics": "Impact Factor: 4.4  |  CiteScore: 10.2  |  Vol 288, Art 112653",
            "title": "GIS-assisted multi-vendor cellular service isolation for emergency and security scenarios",
            "mapping": "المساهمة 3: التحكم والعزل البرمجي بمساعدة GIS (الفصل السادس)",
            "color": COLOR_BURGUNDY
        },
        {
            "num": "الورقة العلمية 02 (قيد التحكيم)",
            "status": "UNDER REVIEW (2026) — Scopus / WoS",
            "journal": "International Telecom Journal",
            "metrics": "مجلة دولية محكمة متخصصة في هندسة الاتصالات وتخطيط الشبكات",
            "title": "Optimizing 5G Deployment in Resource-Constrained Environments: Multi-Criteria GA & PSO Study",
            "mapping": "المساهمة 1: استمثال ترقية الشبكة وتوفير الموارد (الفصل الرابع)",
            "color": COLOR_DEEP_TEAL
        },
        {
            "num": "الورقة العلمية 03 (قيد التحكيم)",
            "status": "UNDER REVIEW (2026) — Scopus / WoS",
            "journal": "Journal of Network and Systems",
            "metrics": "مجلة دولية محكمة متخصصة في أنظمة الشبكات والعدالة المكانية",
            "title": "A Hybrid Optimization Framework for Phased 5G Upgrade: A Case Study of Syria",
            "mapping": "المساهمة 2: إطار الترقية المرحلية والعدالة المكانية SFI (الفصل الخامس)",
            "color": COLOR_EMERALD
        }
    ]

    total_w = 11.7
    w_card = 3.7
    gap = 0.3
    top_pos = Inches(3.0)
    h_card = Inches(3.7)

    for idx, p in enumerate(papers):
        left_pos = Inches(0.8 + idx * (w_card + gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos, Inches(w_card), h_card)
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = p["color"]
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(left_pos + Inches(0.15), top_pos + Inches(0.15), Inches(w_card - 0.3), h_card - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = p["num"]
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = p["color"]
        p_t.alignment = PP_ALIGN.RIGHT

        p_st = tf.add_paragraph()
        p_st.text = p["status"]
        p_st.font.name = FONT_BODY
        p_st.font.size = Pt(10)
        p_st.font.bold = True
        p_st.font.color.rgb = p["color"]
        p_st.alignment = PP_ALIGN.RIGHT
        p_st.space_after = Pt(6)

        p_j = tf.add_paragraph()
        p_j.text = f"المجلة: {p['journal']}"
        p_j.font.name = FONT_TITLE
        p_j.font.size = Pt(11)
        p_j.font.bold = True
        p_j.font.color.rgb = COLOR_TEXT_DARK
        p_j.alignment = PP_ALIGN.RIGHT

        p_m = tf.add_paragraph()
        p_m.text = p["metrics"]
        p_m.font.name = FONT_BODY
        p_m.font.size = Pt(9.5)
        p_m.font.color.rgb = COLOR_TEXT_MUTED
        p_m.alignment = PP_ALIGN.RIGHT
        p_m.space_after = Pt(6)

        p_title = tf.add_paragraph()
        p_title.text = f"\"{p['title']}\""
        p_title.font.name = "Georgia"
        p_title.font.size = Pt(10.5)
        p_title.font.italic = True
        p_title.font.color.rgb = COLOR_TEXT_DARK
        p_title.alignment = PP_ALIGN.LEFT
        p_title.space_after = Pt(6)

        p_map = tf.add_paragraph()
        p_map.text = f"📍 الارتباط: {p['mapping']}"
        p_map.font.name = FONT_BODY
        p_map.font.size = Pt(10)
        p_map.font.bold = True
        p_map.font.color.rgb = p["color"]
        p_map.alignment = PP_ALIGN.RIGHT

    # Speaker Notes
    notes = """=== خارطة الإنتاج العلمي ومسار الأوراق البحثية (الزمن المقترح: 1:30 دقيقة) ===
• بطاقة السلايد: رقم 53 من 73 | النمط المعماري: Horizontal Pipeline (مسار النشر).
• النقاط التقديمية المحورية:
  - ماذا أعرض: خط الإنتاج العلمي للأطروحة: 3 مقالات علمية دولية رصينة تغطي مباشرة المساهمات الثلاث (PLAN, FAIR, CONTROL).
  - النقطة العلمية: ورقة منشورة رسمياً في مجلة Elsevier Computer Networks (Q1, IF 4.4, CiteScore 10.2)، وورقتان قيد التحكيم الدولي.
  - بصمتي البحثية: نشر مساهمة التحكم في كبرى مجلات العالم المتخصصة في شبكات الحاسب وهندسة الاتصالات.
  - ما يجب تذكره: الأوراق العلمية هي التتويج الأكاديمي المحكم للجهد الهندسي المبذول.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"تُقاس رصانة أطروحات الدكتوراه بمدى اعتراف الأوساط الأكاديمية الدولية بنتائجها. وأمام لجنتكم الموقرة، يسعدني تقديم الإنتاج العلمي المنبثق عن هذه الأطروحة:
لدينا خط إنتاج علمي متكامل مكوّن من ثلاث أوراق علمية دولية تغطي مباشرة المساهمات الثلاث:
توجنا المساهمة الثالثة بنشر ورقة كاملة في كبرى مجلات شبكات الحاسب والاتصالات في العالم: مجلة Computer Networks الصادرة عن Elsevier ذات تصنيف الربع الأول Q1 ومعامل تأثير 4.4، وهي منشورة ومفهرسة بمعرف DOI رسمي متاح بين أيديكم.
كما قمنا بإيداع ورقتين علميتين محكمتين تغطيان مساهمتي التخطيط والعدالة المكانية وتطبيقهما على الجمهورية العربية السورية في مجلات دولية مفهرسة في Scopus و Web of Science، وهما حالياً في مرحلة التحكيم المتقدم (Under Review). دعونا نتناول كل ورقة بالتفصيل في الشرائح التالية."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: لماذا تم نشر ورقة المساهمة الثالثة أولاً بينما الورقتان الأولى والثانية قيد التحكيم؟
  * الإجابة النموذجية: مساهمة التحكم والعزل بمساعدة GIS قدمت حلاً غير مسبوق في الأدبيات العالمية لدمج نظم المعلومات الجغرافية مع الأوركسترا متعددة الموردين (Huawei و Ericsson) في سيناريوهات الطوارئ؛ ونظراً لحداثة الفكرة وتطبيقها على شبكة حقيقية، نالت قبولاً سريعاً لدى هيئة تحرير مجلة Elsevier Computer Networks. أما ورقتي التخطيط والعدالة المكانية، فتطلبت دراسة موسعة وتحليلاً إحصائياً مكثفاً لـ 30 تشغيلاً على كامل الـ 79 ألف موقع، وقد تم تقديمهما تباعاً وهما حالياً في مراحل المراجعة الأخيرة."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 54: PRESTIGIOUS JOURNAL SHOWCASE (الورقة 1: Elsevier Q1)
# ==============================================================================
def build_slide_54(prs):
    slide = create_base_slide(
        prs,
        title_ar="الورقة العلمية الأولى — نشر دولي في مجلة Computer Networks (Elsevier Q1)",
        slide_num=54,
        is_dark=False
    )

    # Top Masthead Simulation Box (Elsevier Q1 Paper Header)
    m_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(2.2))
    m_box.fill.solid()
    m_box.fill.fore_color.rgb = COLOR_DARK_SLATE
    m_box.line.color.rgb = COLOR_BURGUNDY
    m_box.line.width = Pt(2.5)

    tf_m = m_box.text_frame
    tf_m.word_wrap = True

    p_jnl = tf_m.paragraphs[0]
    p_jnl.text = "ELSEVIER  |  Computer Networks  •  Volume 288 (2026)  •  Article 112653"
    p_jnl.font.name = FONT_TITLE
    p_jnl.font.size = Pt(12)
    p_jnl.font.bold = True
    p_jnl.font.color.rgb = COLOR_GOLD
    p_jnl.alignment = PP_ALIGN.LEFT

    p_t = tf_m.add_paragraph()
    p_t.text = "\"GIS-assisted multi-vendor cellular service isolation for emergency and security scenarios\""
    p_t.font.name = "Georgia"
    p_t.font.size = Pt(14)
    p_t.font.bold = True
    p_t.font.color.rgb = COLOR_WHITE
    p_t.alignment = PP_ALIGN.LEFT
    p_t.space_before = Pt(4)

    p_auth = tf_m.add_paragraph()
    p_auth.text = "Yasser Almofaalani, Mamdouh Dakkak, Kinan Aljoumaa"
    p_auth.font.name = FONT_BODY
    p_auth.font.size = Pt(11)
    p_auth.font.color.rgb = RGBColor(203, 213, 225)
    p_auth.alignment = PP_ALIGN.LEFT

    p_meta = tf_m.add_paragraph()
    p_meta.text = "Q1 Top Tier (Scopus / Clarivate WoS)  |  Impact Factor: 4.4  |  CiteScore: 10.2  |  DOI: 10.1016/j.comnet.2026.112653"
    p_meta.font.name = FONT_BODY
    p_meta.font.size = Pt(10.5)
    p_meta.font.bold = True
    p_meta.font.color.rgb = COLOR_GOLD
    p_meta.alignment = PP_ALIGN.LEFT
    p_meta.space_before = Pt(4)

    # 4 Flow Breakdown Cards (Bottom)
    sub_cards = [
        ("إشكالية البحث (Problem)", ["مخاطر التشويش اللاسلكي العشوائي وقطع الكهرباء عن المحطات وتأثيره السلبي على نداءات الطوارئ والمعدات."], COLOR_BURGUNDY),
        ("المنهجية المقترحة (Method)", ["خوارزمية التقاطع المكاني القطاعي 3D GIS والأوركسترا الموحدة متعددة الموردين (Huawei & Ericsson)."], COLOR_DARK_TEAL),
        ("النتائج المعتمدة (Results)", ["دقة عزل مكاني 97.5% في المدن، استعادة الخدمة في <10 دقائق، وصون مكالمات 112 بنسبة 100%."], COLOR_EMERALD),
        ("الارتباط بالأطروحة (Link)", ["تمثل التوثيق المحكم والاعتراف الدولي الكامل للمساهمة الثالثة ونتائج الفصل السادس."], COLOR_GOLD)
    ]

    total_w = 11.7
    w_card = 2.75
    gap = 0.233
    top_pos = Inches(4.2)
    h_card = Inches(2.5)

    for idx, (c_title, c_items, c_color) in enumerate(sub_cards):
        left_pos = Inches(0.8 + idx * (w_card + gap))
        add_card(
            slide,
            left=left_pos, top=top_pos, width=Inches(w_card), height=h_card,
            title=c_title, items=c_items, title_color=c_color, border_color=c_color
        )

    # Speaker Notes
    notes = """=== الورقة العلمية 01: Computer Networks (Elsevier Q1, 2026) (الزمن المقترح: 2:00 دقيقة) ===
• بطاقة السلايد: رقم 54 من 73 | النمط المعماري: Prestigious Journal Showcase (الورقة 1: Elsevier Q1).
• النقاط التقديمية المحورية:
  - ماذا أعرض: تفاصيل المقال المنشور في مجلة Computer Networks ذات معامل التأثير 4.4 ومعرف DOI المتاح للجنة.
  - النقطة العلمية: العنوان الرسمي الدقيق: GIS-assisted multi-vendor cellular service isolation for emergency and security scenarios.
  - بصمتي البحثية: المسار العلمي: إشكالية العزل -> خوارزمية التقاطع GIS -> دقة 97.5% واستعادة <10m -> تغطية كاملة للفصل السادس.
  - ما يجب تذكره: ورقة Q1 محكمة دولياً ومفهرسة في WoS و Scopus تثبت أصالة المساهمة الثالثة.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"نعرض في هذه الشريحة فخر إنتاجنا العلمي؛ الورقة المنشورة في مجلة Elsevier Computer Networks العريقة لعام 2026.
هذه الورقة تعالج معضلة أمنية وتشغيلية بالغة الحساسية: كيف نعزل تغطية الخلوي جغرافياً في حالات الطوارئ دون قطع اتصالات النجدة ودون إلحاق الضرر بالشبكة.
ابتكرنا في هذه الورقة معمارية تنسيق برمجي موحدة تتكامل مع بروتوكولات موردي العتاد (هواوي وإريكسون)، واعتمدنا على التحليل المكاني ثلاثي الأبعاد GIS لحجب حوامل البيانات قطاعياً.
وكانت النتيجة المبهرة التي أقنعت المحكمين الدوليين: دقة عزل مكاني 97.5% في المناطق الحضرية، واستعادة برمجية كاملة للخدمة في أقل من 10 دقائق، وصون مكالمات 112 بنسبة 100%. هذه الورقة تمثل البرهان الملموس على أصالة وجودة الفصل السادس من الأطروحة."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: ما هي القيمة المضافة التي جعلت مجلة رائدة مثل Computer Networks تقبل نشر هذه الورقة؟
  * الإجابة النموذجية: تكمن القيمة في أمرين لم يجتمعا معاً في الأدبيات السابقة:
    1. التطبيق متعدد الموردين الفعلي (Real Multi-Vendor Interoperability): معظم الأبحاث السابقة تفترض بيئة عتادية موحدة، بينما نجح بحثنا في التنسيق المتزامن بين نظامي Huawei U2020 و Ericsson ENM في بيئة تشغيل وطنية حقيقية.
    2. الدمج المكاني الدقيق (Granular 3D GIS Integration): تجاوزنا مفهوم العزل على مستوى البرج الكامل إلى مستوى القطاع الراديوي المستند إلى خوارزمية تقاطع مضلعات البث، مما وفر دقة مكانية 97.5% مع تجنب الإضرار بالمناطق المجاورة."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 55: PRESTIGIOUS JOURNAL SHOWCASE (الورقة 2: استمثال 5G المقيد)
# ==============================================================================
def build_slide_55(prs):
    slide = create_base_slide(
        prs,
        title_ar="الورقة العلمية الثانية — تحسين نشر شبكات 5G في البيئات مقيدة الموارد",
        slide_num=55,
        is_dark=False
    )

    # Top Manuscript Header Banner (Under Review - Deep Teal & Blue)
    m_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(2.2))
    m_box.fill.solid()
    m_box.fill.fore_color.rgb = COLOR_DARK_TEAL
    m_box.line.color.rgb = COLOR_DEEP_TEAL
    m_box.line.width = Pt(2.5)

    tf_m = m_box.text_frame
    tf_m.word_wrap = True

    p_jnl = tf_m.paragraphs[0]
    p_jnl.text = "INTERNATIONAL TELECOM JOURNAL  |  Under Review (2026)  •  Scopus & Web of Science Indexed"
    p_jnl.font.name = FONT_TITLE
    p_jnl.font.size = Pt(12)
    p_jnl.font.bold = True
    p_jnl.font.color.rgb = COLOR_GOLD
    p_jnl.alignment = PP_ALIGN.LEFT

    p_t = tf_m.add_paragraph()
    p_t.text = "\"Optimizing 5G Deployment in Resource-Constrained Environments: A Real-World Multi-Criteria Optimization Study Using GA and PSO\""
    p_t.font.name = "Georgia"
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = COLOR_WHITE
    p_t.alignment = PP_ALIGN.LEFT
    p_t.space_before = Pt(4)

    p_auth = tf_m.add_paragraph()
    p_auth.text = "Yasser Almofaalani, Mamdouh Dakkak, Kinan Aljoumaa"
    p_auth.font.name = FONT_BODY
    p_auth.font.size = Pt(11)
    p_auth.font.color.rgb = RGBColor(203, 213, 225)
    p_auth.alignment = PP_ALIGN.LEFT

    p_meta = tf_m.add_paragraph()
    p_meta.text = "Status: Under Advanced Peer Review  |  Focus: Multi-Objective Knapsack & Heuristic Constraint Repair"
    p_meta.font.name = FONT_BODY
    p_meta.font.size = Pt(10.5)
    p_meta.font.bold = True
    p_meta.font.color.rgb = COLOR_GOLD
    p_meta.alignment = PP_ALIGN.LEFT
    p_meta.space_before = Pt(4)

    # 4 Flow Breakdown Cards (Bottom)
    sub_cards = [
        ("الإشكالية الواقعية", ["نشر 5G في ظل شح التمويل الاستثماري وأزمات الطاقة الحادة في الدول النامية وإعادة الإعمار."], COLOR_DEEP_TEAL),
        ("الابتكار الخوارزمي", ["صياغة الترقية الثنائية وتطوير آلية إصلاح القيود التكيفية داخل BPSO لمعالجة فضاء 2^30010."], COLOR_BLUE),
        ("النتائج الرقمية (30 تشغيلاً)", ["وفر 8.4 M$ وترشيد 5.32% من الطاقة وتغطية 95.12% وزمن 118s (p < 0.001)."], COLOR_EMERALD),
        ("الارتباط بالأطروحة", ["تمثل التوثيق العلمي الرصين والكامل للمساهمة الأولى ونتائج الفصل الرابع."], COLOR_GOLD)
    ]

    total_w = 11.7
    w_card = 2.75
    gap = 0.233
    top_pos = Inches(4.2)
    h_card = Inches(2.5)

    for idx, (c_title, c_items, c_color) in enumerate(sub_cards):
        left_pos = Inches(0.8 + idx * (w_card + gap))
        add_card(
            slide,
            left=left_pos, top=top_pos, width=Inches(w_card), height=h_card,
            title=c_title, items=c_items, title_color=c_color, border_color=c_color
        )

    # Speaker Notes
    notes = """=== الورقة العلمية 02: تحسين نشر الجيل الخامس (GA & PSO) (الزمن المقترح: 1:30 دقيقة) ===
• بطاقة السلايد: رقم 55 من 73 | النمط المعماري: Prestigious Journal Showcase (الورقة 2: استمثال 5G المقيد).
• النقاط التقديمية المحورية:
  - ماذا أعرض: الورقة العلمية الثانية قيد التحكيم الدولي التي تغطي تحسين نشر 5G في البيئات محدودة الموارد.
  - النقطة العلمية: العنوان الرسمي: Optimizing 5G Deployment in Resource-Constrained Environments: A Real-World Multi-Criteria Optimization Study Using GA and PSO.
  - بصمتي البحثية: صياغة نموذج التحسين الهجين وتفوق BPSO في توفير 8.4M$ و 5.3% طاقة، ممثلةً المساهمة الأولى (الفصل الرابع).
  - ما يجب تذكره: عرض حالة الورقة بكل أمانة علمية مع توثيق كافة نتائجها التجريبية.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"تجسد الورقة العلمية الثانية المساهمة الأولى لأطروحتنا (الفصل الرابع)، وهي بعنوان: 'تحسين نشر الجيل الخامس في البيئات مقيدة الموارد'.
هذه الورقة تخاطب العالم بنموذج رياضي مستمد من واقع المعاناة التشغيلية في سوريا والدول النامية؛ حيث يعاني المشغلون من شح الميزانية وأزمات الطاقة الكهربائية الحادة.
صغنا في هذه الورقة نموذج التحسين متعدد الأهداف، وأثبتنا كيف استطاعت BPSO بفضل آلية إصلاح القيود أن تتفوق على الخوارزمية الجينية التكيفية، لتوفر 8.4 مليون دولار و 5.3% من الطاقة، مع تسريع زمن الحساب بنسبة 16.9%. الورقة حالياً في مرحلة التحكيم الدولي المتقدم في مجلة متخصصة ومفهرسة عالمياً."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: ما هي الضمانة أن هذه الورقة ستنال القبول النهائي في التحكيم؟
  * الإجابة النموذجية: المنهجية المتبعة في الورقة مستوفية لأعلى معايير النشر الدولي الصارم؛ فقد اعتمدنا على بيانات حقيقية ضخمة (Big Real-World Dataset)، وطبقنا 30 تشغيلاً إحصائياً مستقلاً مدعوماً باختبارات الدلالة الإحصائية (p < 0.001)، بالإضافة إلى تفوق حلول باريتو الناتجة. فضلاً عن ذلك، فإن مجلات الاتصالات الدولية اليوم تبدي اهتماماً بالغاً بأبحاث كفاءة الطاقة والبيئات محدودة الموارد، وهو ما يمثل جوهر هذه الورقة."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 56: PRESTIGIOUS JOURNAL SHOWCASE (الورقة 3: الترقية المرحلية والعدالة)
# ==============================================================================
def build_slide_56(prs):
    slide = create_base_slide(
        prs,
        title_ar="الورقة العلمية الثالثة — إطار الترقية المرحلية والعدالة المكانية: دراسة حالة سوريا",
        slide_num=56,
        is_dark=False
    )

    # Top Manuscript Header Banner (Emerald & Deep Slate)
    m_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(2.2))
    m_box.fill.solid()
    m_box.fill.fore_color.rgb = COLOR_DARK_SLATE
    m_box.line.color.rgb = COLOR_EMERALD
    m_box.line.width = Pt(2.5)

    tf_m = m_box.text_frame
    tf_m.word_wrap = True

    p_jnl = tf_m.paragraphs[0]
    p_jnl.text = "JOURNAL OF NETWORK AND SYSTEMS  |  Under Review (2026)  •  Scopus & Web of Science"
    p_jnl.font.name = FONT_TITLE
    p_jnl.font.size = Pt(12)
    p_jnl.font.bold = True
    p_jnl.font.color.rgb = COLOR_GOLD
    p_jnl.alignment = PP_ALIGN.LEFT

    p_t = tf_m.add_paragraph()
    p_t.text = "\"A Hybrid Optimization Framework for Phased 5G Upgrade Planning in Multi-Generation Cellular Networks: A Case Study of Syria\""
    p_t.font.name = "Georgia"
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = COLOR_WHITE
    p_t.alignment = PP_ALIGN.LEFT
    p_t.space_before = Pt(4)

    p_auth = tf_m.add_paragraph()
    p_auth.text = "Yasser Almofaalani, Mamdouh Dakkak, Kinan Aljoumaa"
    p_auth.font.name = FONT_BODY
    p_auth.font.size = Pt(11)
    p_auth.font.color.rgb = RGBColor(203, 213, 225)
    p_auth.alignment = PP_ALIGN.LEFT

    p_meta = tf_m.add_paragraph()
    p_meta.text = "Status: Under Advanced Peer Review  |  Focus: Spatial Fairness Index (SFI) & Multi-Generation Coexistence"
    p_meta.font.name = FONT_BODY
    p_meta.font.size = Pt(10.5)
    p_meta.font.bold = True
    p_meta.font.color.rgb = COLOR_GOLD
    p_meta.alignment = PP_ALIGN.LEFT
    p_meta.space_before = Pt(4)

    # 4 Flow Breakdown Cards (Bottom)
    sub_cards = [
        ("معضلة الحرمان الجغرافي", ["الفجوة الرقمية بين العاصمة والمحافظات الأخرى الناتجة عن التخطيط التجاري البحت."], COLOR_BURGUNDY),
        ("الابتكار الرياضي (SFI)", ["صياغة مؤشر العدالة المكانية المستند إلى جاين ودمجه كقيد استمثال صريح متعدد الأهداف."], COLOR_EMERALD),
        ("دراسة الحالة السورية", ["قفزة مؤشر SFI إلى 0.71 (+36.5%) ورفع تغطية الريف إلى 88.7% بإعادة توجيه 1,480 موقعاً."], COLOR_DEEP_TEAL),
        ("الارتباط بالأطروحة", ["تمثل التوثيق العلمي الرصين والكامل للمساهمة الثانية ونتائج الفصل الخامس."], COLOR_GOLD)
    ]

    total_w = 11.7
    w_card = 2.75
    gap = 0.233
    top_pos = Inches(4.2)
    h_card = Inches(2.5)

    for idx, (c_title, c_items, c_color) in enumerate(sub_cards):
        left_pos = Inches(0.8 + idx * (w_card + gap))
        add_card(
            slide,
            left=left_pos, top=top_pos, width=Inches(w_card), height=h_card,
            title=c_title, items=c_items, title_color=c_color, border_color=c_color
        )

    # Speaker Notes
    notes = """=== الورقة العلمية 03: إطار الترقية المرحلية ودراسة حالة سوريا (الزمن المقترح: 1:30 دقيقة) ===
• بطاقة السلايد: رقم 56 من 73 | النمط المعماري: Prestigious Journal Showcase (الورقة 3: الترقية المرحلية والعدالة).
• النقاط التقديمية المحورية:
  - ماذا أعرض: الورقة العلمية الثالثة قيد التحكيم الدولي التي تطبق إطار العدالة المكانية المرحلي كحالة دراسية وطنية لسوريا.
  - النقطة العلمية: العنوان الرسمي: A Hybrid Optimization Framework for Phased 5G Upgrade Planning in Multi-Generation Cellular Networks: A Case Study of Syria.
  - بصمتي البحثية: دمج مؤشر SFI كقيد صريح وتحقيق قفزة +36.5% في العدالة المكانية، مغطيةً المساهمة الثانية (الفصل الخامس).
  - ما يجب تذكره: تثبيت اسم الجمهورية العربية السورية كحالة دراسية علمية رائدة في الأدبيات العالمية.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"أما الورقة العلمية الثالثة، فتحمل طابعاً وطنياً واستراتيجياً بامتياز؛ إذ تعنون: 'إطار تحسين هجين لتخطيط الترقية المرحلية نحو 5G في الشبكات متعددة الأجيال: دراسة حالة سوريا'.
هذه الورقة تعالج معضلة الفجوة الرقمية بين العاصمة والمحافظات الأخرى؛ حيث طرحنا فيها مؤشر العدالة المكانية SFI وأدمجناه كمعيار استمثال رياضي.
لقد قدمنا سوريا كحالة دراسية رائدة في الأدبيات العالمية لكيفية ترقية شبكة دولة نامية تعيش فيها أربعة أجيال خلوية جنباً إلى جنب، وأثبتنا كيف أمكن رفع التغطية الريفية بنسبة 24.5 نقطة مئوية لتصل إلى 88.7% دون إرهاق الميزانية. هذه الورقة تمثل التوثيق العلمي الرصين لكل ما ورد في الفصل الخامس من الأطروحة."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: هل تقبل المجلات الدولية نشر دراسات حالة تركز على دولة محددة مثل سوريا (Case Study of Syria)؟
  * الإجابة النموذجية: نعم بالتأكيد، والسبب هو أن المجتمع البحثي الدولي يبحث اليوم عن نماذج واقعية خارج بيئات المختبرات المثالية المترفة في أوروبا وأمريكا؛ فدراسة حالة سوريا توفر نموذجاً معيارياً عالمياً (Global Benchmark) للدول التي تواجه تحديات إعادة الإعمار، ومحدودية الموارد، وتعايش الأجيال التقنية المتعددة، ولذلك فإن الإطار الرياضي العام المقترح صالح للتطبيق في أي شبكة وطنية في العالم، بينما كانت سوريا حقل الاختبار الأكثر قسوة ومصداقية لإثبات صمود الإطار."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 57: GAP-TO-BRIDGE MATRIX (ربط الفصول بالأوراق)
# ==============================================================================
def build_slide_57(prs):
    slide = create_base_slide(
        prs,
        title_ar="مصفوفة الربط المباشر بين فصول الأطروحة ومخرجات النشر العلمي الدولي",
        slide_num=57,
        is_dark=False
    )

    # 3 Parallel Integration Rows (Horizontal Bridge Matrix)
    rows = [
        {
            "chap": "الفصل الرابع: التخطيط الأمثل وترقية الشبكة (PLAN)",
            "chap_desc": "صياغة BPSO، آلية إصلاح القيود، وفر 8.4M$ وترشيد 5.3% طاقة.",
            "bridge": "══[ برهان رياضي ونمذجة 2^30010 ]══>",
            "paper": "الورقة 2: Optimizing 5G Deployment (Telecom Journal)",
            "status": "قيد التحكيم الدولي (Under Review, 2026) — Scopus & WoS",
            "color": COLOR_DEEP_TEAL
        },
        {
            "chap": "الفصل الخامس: العدالة المكانية والتوازن الجغرافي (FAIR)",
            "chap_desc": "ابتكار مؤشر SFI، قفزة +36.5%، رفع تغطية الريف إلى 88.7% عبر 1,480 موقعاً.",
            "bridge": "══[ دراسة حالة وطنية: خريطة سوريا ]══>",
            "paper": "الورقة 3: Phased 5G Upgrade & SFI (Network Systems)",
            "status": "قيد التحكيم الدولي (Under Review, 2026) — Scopus & WoS",
            "color": COLOR_EMERALD
        },
        {
            "chap": "الفصل السادس: التحكم التشغيلي والعزل بمساعدة GIS (CONTROL)",
            "chap_desc": "أوركسترا Huawei & Ericsson المشتركة، عزل 97.5%، استعادة < 10 دقائق.",
            "bridge": "══[ نشر دولي رسمي ومفهرس ]══>",
            "paper": "الورقة 1: Computer Networks (Elsevier)",
            "status": "منشور رسمي (2026) — Q1 Top Tier • IF: 4.4 • CiteScore: 10.2",
            "color": COLOR_BURGUNDY
        }
    ]

    top_start = 1.8
    h_row = 1.25
    gap = 0.2

    for idx, r in enumerate(rows):
        top_pos = Inches(top_start + idx * (h_row + gap))

        # Right Card: Thesis Chapter
        add_card(
            slide,
            left=Inches(0.8), top=top_pos, width=Inches(4.8), height=Inches(h_row),
            title=r["chap"], items=[r["chap_desc"]], title_color=r["color"]
        )

        # Center Bridge Badge
        br = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.8), top_pos + Inches(0.3), Inches(1.7), Inches(0.65))
        br.fill.solid()
        br.fill.fore_color.rgb = COLOR_DARK_SLATE
        br.line.color.rgb = COLOR_GOLD
        br.line.width = Pt(1.5)

        tf_br = br.text_frame
        p_br = tf_br.paragraphs[0]
        p_br.text = r["bridge"]
        p_br.font.name = FONT_BODY
        p_br.font.size = Pt(9.5)
        p_br.font.bold = True
        p_br.font.color.rgb = COLOR_GOLD
        p_br.alignment = PP_ALIGN.CENTER

        # Left Card: Published / Target Paper
        add_card(
            slide,
            left=Inches(7.7), top=top_pos, width=Inches(4.8), height=Inches(h_row),
            title=r["paper"], items=[r["status"]], title_color=r["color"]
        )

    # Bottom Synthesis Box
    s_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.05), Inches(11.7), Inches(0.75))
    s_box.fill.solid()
    s_box.fill.fore_color.rgb = COLOR_DARK_TEAL
    s_box.line.color.rgb = COLOR_GOLD
    s_box.line.width = Pt(1.5)

    tf_sb = s_box.text_frame
    p_sb = tf_sb.paragraphs[0]
    p_sb.text = "المعادلة الأكاديمية الشاملة: أطروحة دكتوراه واحدة  ←  ثلاث مساهمات بحثية أصيلة  ←  ثلاثة مخرجات علمية دولية محكمة\nتغطية منهجية بنسبة 100% دون أي فجوة بين البناء النظري، التحقق التجريبي، والنشر الدولي."
    p_sb.font.name = FONT_BODY
    p_sb.font.size = Pt(11)
    p_sb.font.bold = True
    p_sb.font.color.rgb = COLOR_WHITE
    p_sb.alignment = PP_ALIGN.CENTER

    # Speaker Notes
    notes = """=== من فصول الأطروحة إلى الأوراق المنشورة: مصفوفة الربط المتكامل (الزمن المقترح: 1:30 دقيقة) ===
• بطاقة السلايد: رقم 57 من 73 | النمط المعماري: Gap-to-Bridge Matrix (ربط الفصول بالأوراق).
• النقاط التقديمية المحورية:
  - ماذا أعرض: مصفوفة الربط المباشرة: الفصل الرابع -> الورقة 2، الفصل الخامس -> الورقة 3، الفصل السادس -> الورقة 1.
  - النقطة العلمية: شعار الأطروحة المحوري: أطروحة واحدة -> 3 مساهمات -> 3 أوراق دولية محكمة.
  - بصمتي البحثية: إثبات تماسك البناء الأكاديمي للأطروحة؛ لا يوجد بحث بلا تطبيق، ولا يوجد فصل بلا مخرج علمي رصين.
  - ما يجب تذكره: ترابط عضوي محكم بين البناء النظري، التحقق التجريبي، والنشر العلمي.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"تجسد هذه المصفوفة المعمارية المتماسكة لرسالة الدكتوراه، وتجيب عن سؤال منهجي حاسم: كيف تُرجمت فصول الأطروحة إلى إنتاج علمي منشور ومحكم؟
المعادلة لدينا واضحة لا لبس فيها:
أطروحة دكتوراه واحدة ← ثلاث مساهمات بحثية أصيلة ← ثلاثة مخرجات علمية دولية محكمة:
- الفصل الرابع المعني بالتخطيط قاد مباشرة إلى ورقتنا حول تحسين 5G في البيئات محدودة الموارد.
- الفصل الخامس المعني بالعدالة المكانية أثمر عن ورقتنا حول الترقية المرحلية ودراسة حالة سوريا.
- والفصل السادس المعني بالتحكم التشغيلي بمساعدة GIS توج ببحثنا المنشور في كبرى مجلات الربع الأول Q1 (Elsevier Computer Networks).
لا يوجد فصل نظري معزول بلا تطبيق، ولا توجد مساهمة دون توثيق دولي معتمد."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: هل تغطي الأوراق الثلاث كامل محتوى الأطروحة؟
  * الإجابة النموذجية: نعم تماماً؛ لقد صُممت الأطروحة منهجياً لتغطي دورة حياة الشبكة الوطنية بالكامل: التخطيط المسبق في الفصل الرابع، وضبط التوزيع الجغرافي العادل في الفصل الخامس، ثم التحكم التشغيلي وصيانة الشبكة في الأزمات في الفصل السادس، وبالتالي فإن الأوراق الثلاث تمثل التغطية الشاملة والمحكمة بنسبة 100% للجوهر العلمي للأطروحة."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# SLIDE 58: QUAD-KPI METRIC COMMAND (مؤشرات الأثر العلمي والأكاديمي)
# ==============================================================================
def build_slide_58(prs):
    slide = create_base_slide(
        prs,
        title_ar="الحصيلة الإجمالية للمخرجات والإنتاج العلمي للأطروحة (اللوحة الختامية)",
        slide_num=58,
        is_dark=False
    )

    # Top Tier: 3 Academic Prestige Cards
    prestige_cards = [
        ("01: مقال منشور رسمياً Q1", "Elsevier Computer Networks", "Q1 Top Tier  |  IF: 4.4  |  CiteScore: 10.2", COLOR_BURGUNDY),
        ("02: مقالان قيد التحكيم الدولي", "مجلات دولية محكمة رصينة", "Scopus & Web of Science Indexed", COLOR_DEEP_TEAL),
        ("03: مساهمات أصيلة مثبتة", "تغطية 100% لفصول الأطروحة", "Plan ──> Fair ──> Control", COLOR_EMERALD)
    ]

    total_w = 11.7
    w_top = 3.7
    gap_top = 0.3
    top_pos_1 = Inches(1.8)
    h_top = Inches(1.3)

    for idx, (t, val, sub, col) in enumerate(prestige_cards):
        left_pos = Inches(0.8 + idx * (w_top + gap_top))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos_1, Inches(w_top), h_top)
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = col
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(left_pos + Inches(0.12), top_pos_1 + Inches(0.1), Inches(w_top - 0.24), h_top - Inches(0.2))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = t
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = col
        p_t.alignment = PP_ALIGN.CENTER

        p_val = tf.add_paragraph()
        p_val.text = val
        p_val.font.name = FONT_TITLE
        p_val.font.size = Pt(13)
        p_val.font.bold = True
        p_val.font.color.rgb = COLOR_TEXT_DARK
        p_val.alignment = PP_ALIGN.CENTER

        p_sub = tf.add_paragraph()
        p_sub.text = sub
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(9.5)
        p_sub.font.color.rgb = COLOR_TEXT_MUTED
        p_sub.alignment = PP_ALIGN.CENTER

    # Middle Tier: Quad-KPI Metric Command (4 High-Impact Numbers)
    quad_kpis = [
        {"val": "79,268", "label": "موقعاً خلوياً فعلياً", "sub": "كامل طوبولوجيا شبكة سوريا", "color": COLOR_DARK_TEAL},
        {"val": "95.12%", "label": "تغطية راديوية مثلى", "sub": "وفر 8.4M$ و 4.4MWh طاقة", "color": COLOR_EMERALD},
        {"val": "+36.5%", "label": "قفزة العدالة المكانية SFI", "sub": "0.71 مع 88.7% تغطية ريفية", "color": COLOR_GOLD},
        {"val": "97.5%", "label": "دقة العزل المكاني", "sub": "استعادة الخدمة في < 10 دقائق", "color": COLOR_BURGUNDY}
    ]

    w_quad = 2.75
    gap_quad = 0.233
    top_pos_2 = Inches(3.3)
    h_quad = Inches(2.3)

    for idx, k in enumerate(quad_kpis):
        left_pos = Inches(0.8 + idx * (w_quad + gap_quad))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left_pos, top_pos_2, Inches(w_quad), h_quad)
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = k["color"]
        box.line.width = Pt(2)

        tb = slide.shapes.add_textbox(left_pos + Inches(0.12), top_pos_2 + Inches(0.15), Inches(w_quad - 0.24), h_quad - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p_val = tf.paragraphs[0]
        p_val.text = k["val"]
        p_val.font.name = FONT_TITLE
        p_val.font.size = Pt(28)
        p_val.font.bold = True
        p_val.font.color.rgb = k["color"]
        p_val.alignment = PP_ALIGN.CENTER

        p_lbl = tf.add_paragraph()
        p_lbl.text = k["label"]
        p_lbl.font.name = FONT_BODY
        p_lbl.font.size = Pt(12)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = COLOR_TEXT_DARK
        p_lbl.alignment = PP_ALIGN.CENTER
        p_lbl.space_after = Pt(4)

        p_sub = tf.add_paragraph()
        p_sub.text = k["sub"]
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(10)
        p_sub.font.color.rgb = COLOR_TEXT_MUTED
        p_sub.alignment = PP_ALIGN.CENTER

    # Bottom Banner: Finale Takeaway
    b_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.85), Inches(11.7), Inches(0.95))
    b_box.fill.solid()
    b_box.fill.fore_color.rgb = COLOR_DARK_SLATE
    b_box.line.color.rgb = COLOR_GOLD
    b_box.line.width = Pt(2)

    tf_bb = b_box.text_frame
    p_bb = tf_bb.paragraphs[0]
    p_bb.text = "SECTION 04 COMPLETE — ختام المحور الرابع"
    p_bb.font.name = FONT_TITLE
    p_bb.font.size = Pt(11)
    p_bb.font.bold = True
    p_bb.font.color.rgb = COLOR_GOLD
    p_bb.alignment = PP_ALIGN.CENTER

    p_bb2 = tf_bb.add_paragraph()
    p_bb2.text = "أطروحة هندسية وطنية متكاملة: قدمت حلولاً تطبيقية وفرت ملايين الدولارات لقطاع الاتصالات السوري،\nوتُوجت باعتراف دولي صريح في كبريات مجلات الربع الأول عالمياً (Elsevier Computer Networks Q1)."
    p_bb2.font.name = FONT_BODY
    p_bb2.font.size = Pt(11)
    p_bb2.font.bold = True
    p_bb2.font.color.rgb = COLOR_WHITE
    p_bb2.alignment = PP_ALIGN.CENTER
    p_bb2.space_before = Pt(2)

    # Speaker Notes
    notes = """=== الحصاد الإجمالي للمخرجات والإنتاج العلمي للأطروحة (الزمن المقترح: 2:00 دقيقة) ===
• بطاقة السلايد: رقم 58 من 73 | النمط المعماري: Quad-KPI Metric Command (مؤشرات الأثر).
• النقاط التقديمية المحورية:
  - ماذا أعرض: اللوحة الختامية للقسم الرابع: إحصائيات النشر (1 Q1 منشور، 2 قيد التحكيم، 3 مساهمات مغطاة) وتلخيص المؤشرات.
  - النقطة العلمية: التذكير بأرقام الحسم: 79,268 موقعاً، 95.12% تغطية، -6% كلفة، +36.5% عدالة، 97.5% عزل مكاني.
  - بصمتي البحثية: تقديم خلاصة علمية تثبت للجنة أن الأطروحة استوفت أعلى المعايير الهندسية والأكاديمية ونقلت النتائج للعالمية.
  - ما يجب تذكره: الرسالة الختامية للجنة: أنتج البحث نتائج ملموسة، دعمت المساهمات، وتُوجت بنشر دولي مرموق.

• سيناريو الإلقاء والشرح الصوتي المتقن:
"السيد رئيس اللجنة، الأستاذين المشرفين، السادة أعضاء لجنة الحكم الأفاضل:
نصل إلى ختام القسم الرابع، حاملاً بين أيديكم الخلاصة المتكاملة لهذا الجهد العلمي:
لقد خرجت هذه الأطروحة بنتاج علمي دولي تضمن مقالاً منشوراً في كبرى مجلات الربع الأول Q1 (Elsevier Computer Networks)، ومقالين قيد التحكيم الدولي، لتغطي مساهماتنا الثلاث بنسبة 100%.
وتأكدت هذه المخرجات بأرقام قياسية لا تقبل الشك: انطلقنا من 79,268 موقعاً خلوياً حقيقياً في سوريا، حققنا بها تغطية 95.12%، ووفرنا 8.4 مليون دولار من ميزانية الترقية، ورشدنا 4.4 ميغاواط ساعي من الطاقة، ورفعنا عدالة التوزيع الجغرافي بنسبة 36.5%، وأمّنا عزل الخدمة واستعادتها بدقة 97.5% في أقل من 10 دقائق.
هذه النتائج نضعها اليوم كمرجع علمي وحل وطني سيادي جاهز للتطبيق العملي. شكراً لحسن استماعكم، وأنا جاهز للانتقال للقسم الختامي ومناقشة أي استفسار لديكم."

• بنك الأسئلة المتوقعة من لجنة التحكيم (Defense Q&A):
- سؤال: ما هي الرسالة النهائية التي يريد الباحث إيصالها للجنة من خلال هذا القسم؟
  * الإجابة النموذجية: الرسالة الأساسية هي أن البحث العلمي الهندسي في سوريا قادر — رغم كل تحديات الواقع وصعوبة الميدان — على تقديم حلول تطبيقية تخدم الاقتصاد الوطني وتوفر ملايين الدولارات، وفي الوقت ذاته ترتقي إلى أعلى منصات التنافس والنشر العلمي في أرقى المجلات العالمية Q1."""
    add_speaker_notes(slide, notes)


# ==============================================================================
# MAIN GENERATOR FUNCTION
# ==============================================================================
def generate_axis_04(output_pptx_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.500)

    print(f"Building Axis 04 Presentation: Slides 46 to 58...")

    build_slide_46(prs)
    print("  [OK] Slide 46 generated: Dark Academic Section Marker")

    build_slide_47(prs)
    print("  [OK] Slide 47 generated: Quad-KPI Metric Command (Unified Results Dashboard)")

    build_slide_48(prs)
    print("  [OK] Slide 48 generated: Pareto Trade-off Matrix")

    build_slide_49(prs)
    print("  [OK] Slide 49 generated: Hero Giant Stat (وفر 8.4M$ و 4.4MWh)")

    build_slide_50(prs)
    print("  [OK] Slide 50 generated: Spatial Map-Anchored Canvas (SFI بالمحافظات)")

    build_slide_51(prs)
    print("  [OK] Slide 51 generated: Split-Screen High Contrast (Huawei vs Ericsson)")

    build_slide_52(prs)
    print("  [OK] Slide 52 generated: Asymmetric Bento Grid (الدروس الهندسية)")

    build_slide_53(prs)
    print("  [OK] Slide 53 generated: Horizontal Pipeline (مسار النشر)")

    build_slide_54(prs)
    print("  [OK] Slide 54 generated: Prestigious Journal Showcase (Paper 1: Elsevier Q1)")

    build_slide_55(prs)
    print("  [OK] Slide 55 generated: Prestigious Journal Showcase (Paper 2: 5G GA/PSO)")

    build_slide_56(prs)
    print("  [OK] Slide 56 generated: Prestigious Journal Showcase (Paper 3: Syria Upgrade & SFI)")

    build_slide_57(prs)
    print("  [OK] Slide 57 generated: Gap-to-Bridge Matrix (ربط الفصول بالأوراق)")

    build_slide_58(prs)
    print("  [OK] Slide 58 generated: Quad-KPI Metric Command (مؤشرات الأثر)")

    prs.save(output_pptx_path)
    print(f"\n[SUCCESS] Axis 04 PowerPoint generated successfully at: {output_pptx_path}")


if __name__ == "__main__":
    out_file = r"d:\Work\todo\Prof_Yaser\Prof_Yaser\final_presentation\22092026\presentation_axis_04.pptx"
    generate_axis_04(out_file)
