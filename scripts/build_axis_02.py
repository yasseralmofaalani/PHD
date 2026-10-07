#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
build_axis_02.py
Generates Axis 02 (Slides 10 to 16) for Eng. Yasser Almofaalani's PhD Defense Presentation at HIAST.
Title: Intelligent Planning and Control of Cellular Networks in a GIS Environment.

Layout Archetypes Used (Strict Anti-Monotony Enforcement):
- Slide 10: Dark Academic Section Marker
- Slide 11: 3D Layered GIS Stack (Pattern 4)
- Slide 12: Quad-KPI Metric Command (Pattern 11)
- Slide 13: Split-Screen High Contrast (Pattern 1)
- Slide 14: Algorithmic Decision Tree (Pattern 7)
- Slide 15: Gap-to-Bridge Matrix (Pattern 10)
- Slide 16: Horizontal Pipeline (Pattern 5)

Each slide includes rich, complete speaker notes with slide metadata, defense script, and critical Q&A.
"""

import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ==============================================================================
# COLOR PALETTE (Strict HIAST Defense Design System)
# ==============================================================================
COLOR_DEEP_TEAL   = RGBColor(66, 129, 119)     # #428177 - Primary Brand Teal
COLOR_DARK_TEAL   = RGBColor(20, 55, 50)       # #143732 - Dark Executive Teal
COLOR_BURGUNDY    = RGBColor(107, 31, 42)      # #6B1F2A - Secondary Academic Red
COLOR_DARK_SLATE  = RGBColor(15, 23, 42)       # #0F172A - Deep Slate Background
COLOR_SLATE_CARD  = RGBColor(30, 41, 59)       # #1E293B - Dark Mode Card
COLOR_LIGHT_BG    = RGBColor(246, 248, 250)    # #F6F8FA - Clean Light Canvas
COLOR_WHITE       = RGBColor(255, 255, 255)
COLOR_TEXT_DARK   = RGBColor(15, 23, 42)       # #0F172A - Primary Text
COLOR_TEXT_MUTED  = RGBColor(100, 116, 139)    # #64748B - Muted Subtitle Text
COLOR_BORDER      = RGBColor(226, 232, 240)    # #E2E8F0 - Subtle Border
COLOR_GOLD        = RGBColor(217, 119, 6)       # #D97706 - Amber / Pareto Accent
COLOR_EMERALD     = RGBColor(16, 185, 129)     # #10B981 - Success / Quality Metric
COLOR_BLUE        = RGBColor(37, 99, 235)      # #2563EB - Tech / Standards Blue
COLOR_SOFT_RED    = RGBColor(254, 242, 242)    # Soft red for gap cards
COLOR_SOFT_TEAL   = RGBColor(240, 253, 250)    # Soft teal for solution cards
COLOR_SOFT_BLUE   = RGBColor(239, 246, 255)    # Soft blue for algorithmic cards
COLOR_BORDER_RED  = RGBColor(252, 165, 165)    # Border for gap cards
COLOR_BORDER_TEAL = RGBColor(94, 234, 212)     # Border for solution cards

FONT_TITLE = "Segoe UI"
FONT_BODY  = "Segoe UI"


# ==============================================================================
# HELPER FUNCTIONS (Base Slide, Headers, Footers, Speaker Notes)
# ==============================================================================
def create_base_slide(prs, is_dark=False):
    """Creates a blank slide with standard background."""
    blank_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank_layout)
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = COLOR_DARK_SLATE if is_dark else COLOR_LIGHT_BG
    bg.line.fill.background()
    return slide


def add_slide_header(slide, title_ar, subtitle_ar=None, is_dark=False):
    """Standardized header architecture."""
    # Top Breadcrumb Badge
    tb_badge = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.733), Inches(0.35))
    tf_badge = tb_badge.text_frame
    tf_badge.word_wrap = True
    p_badge = tf_badge.paragraphs[0]
    p_badge.text = "المعهد العالي للعلوم التطبيقية والتكنولوجيا  |  المحور 02: الدراسات النظرية والمرجعية وتحديد الفجوة البحثية"
    p_badge.font.name = FONT_BODY
    p_badge.font.size = Pt(11)
    p_badge.font.bold = True
    p_badge.font.color.rgb = COLOR_GOLD if is_dark else COLOR_DEEP_TEAL
    p_badge.alignment = PP_ALIGN.RIGHT

    # Main Title
    tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.733), Inches(0.75))
    tf_title = tb_title.text_frame
    tf_title.word_wrap = True
    p_title = tf_title.paragraphs[0]
    p_title.text = title_ar
    p_title.font.name = FONT_TITLE
    p_title.font.size = Pt(22)
    p_title.font.bold = True
    p_title.font.color.rgb = COLOR_WHITE if is_dark else COLOR_TEXT_DARK
    p_title.alignment = PP_ALIGN.RIGHT

    if subtitle_ar:
        p_sub = tf_title.add_paragraph()
        p_sub.text = subtitle_ar
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(11.5)
        p_sub.font.color.rgb = RGBColor(148, 163, 184) if is_dark else COLOR_TEXT_MUTED
        p_sub.alignment = PP_ALIGN.RIGHT


def add_slide_footer(slide, slide_num, total_slides=73, is_dark=False):
    """Standardized footer architecture."""
    tb_footer = slide.shapes.add_textbox(Inches(0.8), Inches(6.92), Inches(11.733), Inches(0.35))
    tf = tb_footer.text_frame
    p = tf.paragraphs[0]
    p.text = f"أطروحة دكتوراه: التخطيط والتحكم الذكي بالشبكات الخلوية في بيئة GIS  —  ياسر المفعلاني   |   شريحة {slide_num} من {total_slides}"
    p.font.name = FONT_BODY
    p.font.size = Pt(9.5)
    p.font.color.rgb = RGBColor(148, 163, 184) if is_dark else COLOR_TEXT_MUTED
    p.alignment = PP_ALIGN.RIGHT


def set_full_speaker_notes(slide, notes_dict):
    """Injects comprehensive defense speaker script into presenter view."""
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    tf.clear()

    title = notes_dict.get("title", "")
    time_min = notes_dict.get("timeMinutes", "1.5")
    goals = notes_dict.get("academic_goals", "")
    speech = notes_dict.get("speech_script", "")
    qa_list = notes_dict.get("critical_qa", [])

    p0 = tf.paragraphs[0]
    p0.text = f"=== بطاقة الشريحة: {title} (الزمن المقترح: {time_min} دقيقة) ==="
    p0.font.bold = True

    if goals:
        p_g = tf.add_paragraph()
        p_g.text = f"🎯 الهدف الأكاديمي: {goals}"
        p_g.font.bold = True

    if speech:
        p_s_hdr = tf.add_paragraph()
        p_s_hdr.text = "\n🎙️ سيناريو الإلقاء الدفاعي أمام لجنة الحكم (Presenter Script):"
        p_s_hdr.font.bold = True
        p_s = tf.add_paragraph()
        p_s.text = speech

    if qa_list:
        p_q_hdr = tf.add_paragraph()
        p_q_hdr.text = "\n💡 بنك الأسئلة المتوقعة والردود النموذجية المفحمة (Defense Q&A):"
        p_q_hdr.font.bold = True
        for idx, (q, a) in enumerate(qa_list, 1):
            p_q = tf.add_paragraph()
            p_q.text = f"س{idx}: {q}\nج: {a}\n"


# ==============================================================================
# SLIDE BUILDERS (Slides 10 to 16)
# ==============================================================================

def build_slide_10(prs):
    """Slide 10: Dark Academic Section Marker."""
    slide = create_base_slide(prs, is_dark=True)

    # Central Badge Pill
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.416), Inches(1.3), Inches(2.5), Inches(0.55))
    badge.fill.solid()
    badge.fill.fore_color.rgb = COLOR_DEEP_TEAL
    badge.line.color.rgb = COLOR_GOLD
    badge.line.width = Pt(1.5)
    p_b = badge.text_frame.paragraphs[0]
    p_b.text = "المحور الثاني"
    p_b.font.name = FONT_TITLE
    p_b.font.size = Pt(16)
    p_b.font.bold = True
    p_b.font.color.rgb = COLOR_WHITE
    p_b.alignment = PP_ALIGN.CENTER

    # Main Title
    tb_m = slide.shapes.add_textbox(Inches(0.8), Inches(2.0), Inches(11.733), Inches(1.4))
    tf_m = tb_m.text_frame
    tf_m.word_wrap = True
    p_m = tf_m.paragraphs[0]
    p_m.text = "الدراسات النظرية والمرجعية وتحديد الفجوة البحثية"
    p_m.font.name = FONT_TITLE
    p_m.font.size = Pt(30)
    p_m.font.bold = True
    p_m.font.color.rgb = COLOR_WHITE
    p_m.alignment = PP_ALIGN.CENTER

    p_m_en = tf_m.add_paragraph()
    p_m_en.text = "THEORETICAL FOUNDATIONS, LITERATURE REVIEW & RESEARCH GAP"
    p_m_en.font.name = FONT_TITLE
    p_m_en.font.size = Pt(13)
    p_m_en.font.bold = True
    p_m_en.font.color.rgb = COLOR_GOLD
    p_m_en.alignment = PP_ALIGN.CENTER
    p_m_en.space_before = Pt(4)

    # 4 Academic Pillars (Cards)
    pillars = [
        ("01", "المفاهيم الراديوية والمكانية", "فيزياء انتشار الأمواج، مصفوفات التغطية الراديوية ثلاثية الأبعاد، وتكامل نظم المعلومات الجغرافية GIS في بيئة وطنية عملاقة.", COLOR_DEEP_TEAL),
        ("02", "مؤشرات الأداء وجودة الخدمة", "التأصيل الرياضي لمؤشرات RSRP و SINR، وعتبة 12 dB كقيد قطعي، وحساب السعة الطيفية بنظرية شانون.", COLOR_BURGUNDY),
        ("03", "الاستدلال الفوقي والذكاء السربي", "المفاضلة الرياضية بين BPSO و AGA و MILP، وتحويل السرعة بالـ Sigmoid، ومسوغات اختيار الذكاء السربي.", COLOR_DEEP_TEAL),
        ("04", "الفجوة المعرفية وجسور الحلول", "تفكيك قصور الأدبيات العالمية: إغفال الترقية المقيدة، غياب العدالة المكانية، وعشوائية التشويش المادي.", COLOR_BURGUNDY),
    ]

    card_w = 2.7
    gap = 0.31
    start_left = 0.8

    for idx, (num, p_title, p_desc, p_col) in enumerate(pillars):
        left = Inches(start_left + idx * (card_w + gap))
        top = Inches(3.6)
        card_h = Inches(2.9)

        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(card_w), card_h)
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_SLATE_CARD
        card.line.color.rgb = p_col
        card.line.width = Pt(1.75)

        tb = slide.shapes.add_textbox(left + Inches(0.15), top + Inches(0.15), Inches(card_w - 0.3), card_h - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p_n = tf.paragraphs[0]
        p_n.text = num
        p_n.font.name = FONT_TITLE
        p_n.font.size = Pt(22)
        p_n.font.bold = True
        p_n.font.color.rgb = COLOR_GOLD
        p_n.alignment = PP_ALIGN.CENTER

        p_t = tf.add_paragraph()
        p_t.text = p_title
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_WHITE
        p_t.alignment = PP_ALIGN.CENTER
        p_t.space_before = Pt(6)
        p_t.space_after = Pt(8)

        p_d = tf.add_paragraph()
        p_d.text = p_desc
        p_d.font.name = FONT_BODY
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = RGBColor(203, 213, 225)
        p_d.alignment = PP_ALIGN.CENTER

    add_slide_footer(slide, 10, is_dark=True)

    # Speaker Notes
    set_full_speaker_notes(slide, {
        "title": "فاصل المحور الثاني — الدراسات النظرية والمرجعية",
        "timeMinutes": "0.5 - 1.0",
        "academic_goals": "تهيئة اللجنة علمياً للانتقال من تشخيص الإشكالية إلى التأسيس الأكاديمي الصارم، وإثبات استناد الأطروحة إلى مراجعة نقدية لأحدث أبحاث IEEE وElsevier.",
        "speech_script": (
            "سعادة رئيس وأعضاء لجنة الحكم الموقرين، بعد أن فصّلنا في المحور الأول التحديات الواقعية الاستثنائية التي تواجه شبكة الاتصالات الخلوية السورية، ننتقل الآن إلى المحور الثاني: الدراسات النظرية والمرجعية.\n"
            "لن نطرح هنا مفاهيم كتب تقليدية مكررة، بل سنفكك الأدبيات العالمية الحديثة لنبين بدقة أين تقف علوم الاتصالات اليوم، وما هي الفجوات الحسابية والهندسية التي استوجبت تقديم هذه الأطروحة.\n"
            "يرتكز هذا المحور على 4 ركائز محورية:\n"
            "1. المفاهيم الراديوية والمكانية وتكامل GIS.\n"
            "2. التأصيل الرياضي لمؤشرات RSRP و SINR وعتبات الخدمة.\n"
            "3. المقارنة الخوارزمية بين BPSO و AGA وإثبات استحالة الحلول الدقيقة MILP.\n"
            "4. بناء مصفوفة الجسور الهندسية بين الفجوة العالمية والحل المبتكر.\n"
            "سنبدأ فوراً بتوحيد المصطلحات الهندسية والمكانية الستة التي تشكل البنية التحتية لنموذجنا."
        ),
        "critical_qa": [
            (
                "لماذا تم تخصيص محور كامل للدراسات المرجعية بدلاً من الدخول مباشرة في خوارزمياتك ومساهماتك؟",
                "إن قيمة أي مساهمة علمية في أطروحة دكتوراه لا تُقاس فقط بما حققته، بل بما تجاوزته وأضافته على الإنتاج العلمي العالمي. كان لا بد من تفكيك النماذج القائمة لـ 3GPP والمسارات البحثية في IEEE وElsevier، لإثبات أن ما نقترحه من مؤشرات مثل مؤشر العدالة المكانية SFI وآليات العزل البرمجي ليست تكراراً، بل هي سد دقيق لفجوات عجزت عن حلها المدارس الكلاسيكية."
            )
        ]
    })


def build_slide_11(prs):
    """Slide 11: 3D Layered GIS Stack (Archetype 4)."""
    slide = create_base_slide(prs, is_dark=False)
    add_slide_header(
        slide,
        "المفاهيم الراديوية والمكانية المؤسسة للأطروحة",
        "Foundational Radio & Spatial Engineering Concepts: تكامل الطبقات الفيزيائية والمكانية لـ 79,268 موقعاً"
    )

    # Left Side: 3 Foundational Conceptual Cards (left: 0.8, w: 5.6)
    cards_data = [
        ("محطة الإرسال والاستقبال القاعدية (BTS & Massive MIMO)",
         [
             "الطبقة الفيزيائية: أبراج ثلاثية القطاعات (3-Sector Sites) تغطي كل منها 120° أفقياً.",
             "وحدات هوائيات نشطة (AAU) تدعم مصفوفات الهوائيات الهائلة (Massive MIMO).",
             "فصل مجمع وحدات النطاق الأساسي (BBU Pool) عن وحدات الراديو (RRH) عبر وصلات eCPRI."
         ], COLOR_DEEP_TEAL),
        ("الترقية التشاركية الذكية (Co-siting Strategy)",
         [
             "استثمار الأبراج والصواري والبنية التحتية الإنشائية القائمة لشبكات 2G/3G/4G لتركيب عتاد 5G.",
             "توفير أكثر من 60% من التكاليف الرأسمالية (CapEx) مقارنة بالإنشاء من الصفر (Greenfield).",
             "تسريع زمن النشر الميداني وتفادي تعقيدات تراخيص المواقع وتمديد الألياف الجديدة."
         ], COLOR_BURGUNDY),
        ("تكامل نظم المعلومات الجغرافية (GIS-Radio Synergy)",
         [
             "الـ GIS ليس أداة رسم خرائط ثابتة، بل هو المزود المباشر لدوال الهدف بحسابات التداخل.",
             "تحويل الخصائص الطبوغرافية وحواجز التضاريس إلى معاملات حسابية مباشرة في خوارزميات الترقية.",
             "تمكين الأوركسترا التشغيلية من تحديد الخلايا المؤثرة جغرافياً بدقة متناهية."
         ], COLOR_DEEP_TEAL),
    ]

    left_x = 0.8
    card_w = 5.6
    card_h = 1.45
    card_gap = 0.18
    start_y = 1.75

    for idx, (c_title, c_items, c_col) in enumerate(cards_data):
        top_y = start_y + idx * (card_h + card_gap)
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left_x), Inches(top_y), Inches(card_w), Inches(card_h))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_WHITE
        card.line.color.rgb = c_col
        card.line.width = Pt(1.5)

        tb = slide.shapes.add_textbox(Inches(left_x + 0.15), Inches(top_y + 0.1), Inches(card_w - 0.3), Inches(card_h - 0.2))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = c_title
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = c_col
        p_t.alignment = PP_ALIGN.RIGHT

        for item in c_items:
            p_i = tf.add_paragraph()
            p_i.text = f"• {item}"
            p_i.font.name = FONT_BODY
            p_i.font.size = Pt(9.5)
            p_i.font.color.rgb = COLOR_TEXT_DARK
            p_i.alignment = PP_ALIGN.RIGHT
            p_i.space_before = Pt(2)

    # Right Side: 3D Layered GIS Stack (left: 6.8, w: 5.733)
    # 4 Layers stacked vertically with ascending flow
    stack_x = 6.7
    stack_w = 5.833
    layer_h = 1.05
    layer_gap = 0.16
    stack_start_y = 1.75

    layers_info = [
        ("الطبقة 4: مصفوفة التغطية الراديوية و SINR (Radio Quality Layer)",
         "حسابات التداخل التراكمي، ونقاء القناة، وعتبة SINR ≥ 12 dB لضمان جودة الجيل الخامس 256-QAM.",
         COLOR_BURGUNDY, "Top Layer - القرار الراديوي"),
        ("الطبقة 3: الكثافة السكانية والطلب التنموي (Demographic Layer)",
         "توزيع الكثافة السكانية، والتمييز بين المراكز الحضرية (62%) والأرياف (38%) لتطبيق مؤشر العدالة SFI.",
         COLOR_GOLD, "Layer 3 - العدالة المكانية"),
        ("الطبقة 2: استخدامات الأراضي والغطاء الحضري (Clutter Classes 30m)",
         "تصنيف تفصيلي: مراكز حضرية كثيفة، ضواحي سكنية، مساحات زراعية، وبيئات صحراوية مكشوفة لتحديد التوهين.",
         COLOR_DARK_TEAL, "Layer 2 - بيئة الانتشار"),
        ("الطبقة 1: التضاريس ونموذج الارتفاع الرقمي (DEM 30m Substrate)",
         "طبوغرافيا سوريا بدقة 30 متراً لتحديد خطوط النظر (LOS/NLOS) والحيود التضاريسي لكافة الـ 79,268 موقعاً.",
         COLOR_DEEP_TEAL, "Base Layer - الأساس الجغرافي"),
    ]

    for idx, (l_title, l_desc, l_col, l_tag) in enumerate(layers_info):
        top_y = stack_start_y + idx * (layer_h + layer_gap)

        # Layer container
        layer_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(stack_x), Inches(top_y), Inches(stack_w), Inches(layer_h))
        layer_box.fill.solid()
        layer_box.fill.fore_color.rgb = COLOR_WHITE
        layer_box.line.color.rgb = l_col
        layer_box.line.width = Pt(1.75)

        # Left tag pill
        tag_pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(stack_x + 0.12), Inches(top_y + 0.12), Inches(1.8), Inches(0.28))
        tag_pill.fill.solid()
        tag_pill.fill.fore_color.rgb = l_col
        tag_pill.line.fill.background()
        p_pill = tag_pill.text_frame.paragraphs[0]
        p_pill.text = l_tag
        p_pill.font.name = FONT_BODY
        p_pill.font.size = Pt(8)
        p_pill.font.bold = True
        p_pill.font.color.rgb = COLOR_WHITE
        p_pill.alignment = PP_ALIGN.CENTER

        # Text Frame
        tb_l = slide.shapes.add_textbox(Inches(stack_x + 2.0), Inches(top_y + 0.08), Inches(stack_w - 2.1), Inches(layer_h - 0.16))
        tf_l = tb_l.text_frame
        tf_l.word_wrap = True

        p_lt = tf_l.paragraphs[0]
        p_lt.text = l_title
        p_lt.font.name = FONT_TITLE
        p_lt.font.size = Pt(11)
        p_lt.font.bold = True
        p_lt.font.color.rgb = l_col
        p_lt.alignment = PP_ALIGN.RIGHT

        p_ld = tf_l.add_paragraph()
        p_ld.text = l_desc
        p_ld.font.name = FONT_BODY
        p_ld.font.size = Pt(9)
        p_ld.font.color.rgb = COLOR_TEXT_DARK
        p_ld.alignment = PP_ALIGN.RIGHT
        p_ld.space_before = Pt(2)

    # Bottom Synergy Banner
    banner_y = 6.48
    syn_banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(banner_y), Inches(11.733), Inches(0.36))
    syn_banner.fill.solid()
    syn_banner.fill.fore_color.rgb = COLOR_DARK_TEAL
    syn_banner.line.color.rgb = COLOR_GOLD
    syn_banner.line.width = Pt(1)
    p_sb = syn_banner.text_frame.paragraphs[0]
    p_sb.text = "مبدأ التكامل التآزري (GIS-Radio Synergy): دمج التضاريس DEM واستخدامات الأراضي يمنح الخوارزميات دقة واقعية تلغي أخطاء التقدير بنسبة تتجاوز 80%."
    p_sb.font.name = FONT_BODY
    p_sb.font.size = Pt(9.5)
    p_sb.font.bold = True
    p_sb.font.color.rgb = COLOR_WHITE
    p_sb.alignment = PP_ALIGN.CENTER

    add_slide_footer(slide, 11)

    # Speaker Notes
    set_full_speaker_notes(slide, {
        "title": "المفاهيم الراديوية والمكانية المؤسسة للأطروحة",
        "timeMinutes": "1.5",
        "academic_goals": "ضبط الإطار الاصطلاحي والهندسي وشرح التفاعل العضوي بين الطبقة الفيزيائية الراديوية والطبقات الطبوغرافية المكانية لـ 79,268 موقعاً.",
        "speech_script": (
            "أبراج الاتصالات في بيئتنا ليست نقاطاً رياضية مجردة في فضاء إقليدي ثنائي الأبعاد، بل هي منظومات إشعاعية ثلاثية القطاعات تتأثر بوعورة التضاريس والارتفاعات الحقيقية لسطح الأرض السورية.\n"
            "لذلك صممنا نموذجنا ليرتكز على مكدس طبقي رباعي الأبعاد في نظم المعلومات الجغرافية GIS:\n"
            "• في القاعدة: نموذج الارتفاع الرقمي DEM بدقة 30 متراً لتحديد خطوط النظر LOS والحيود.\n"
            "• الطبقة الثانية: الغطاء الحضري واستخدامات الأراضي Clutter لحساب معاملات التوهين بدقة.\n"
            "• الطبقة الثالثة: الكثافة السكانية والطلب للتمييز بين المدن والأرياف وتطبيق مؤشر العدالة SFI.\n"
            "• الطبقة العليا: مصفوفة التغطية ونقاء القناة SINR لحساب التداخل بين الخلايا المتجاورة.\n"
            "وفي الجانب المقابل، اعتمدنا استراتيجية الترقية التشاركية Co-siting على 30,010 موقعاً للجيل الرابع لتوفير أكثر من 60% من CapEx وتسريع النشر في ظل الظروف الاقتصادية الراهنة."
        ),
        "critical_qa": [
            (
                "لماذا تم التركيز على عتبة SINR ≥ 12 dB بينما معايير الجيل الخامس تسمح بالاتصال عند قيم سالبة لـ SINR في خدمات NB-IoT؟",
                "تسمح معايير 3GPP باتصال الأدوات الذكية NB-IoT عند قيم متدنية جداً قد تصل إلى -6 dB للرسائل البسيطة، لكن هدف أطروحتنا الاستراتيجي هو ترقية شبكة النطاق العريض المتنقل الفائق (eMBB) لتقديم سرعات تدفق حقيقية وسعات تتطلب تعديلات معقدة مثل 64-QAM و 256-QAM. هذه التعديلات تنهار تماماً إذا انخفضت نسبة SINR عن 12 dB، لذا تم تثبيت هذه العتبة كقيد حتمي لضمان جودة خدمة ممتازة وتفادي تداخل الحوامل في الشبكات التشاركية."
            )
        ]
    })


def build_slide_12(prs):
    """Slide 12: Quad-KPI Metric Command (Archetype 11)."""
    slide = create_base_slide(prs, is_dark=False)
    add_slide_header(
        slide,
        "المؤشرات الراديوية ومعايير جودة الخدمة وعتبات التقييم",
        "Radio Propagation Metrics, QoS Standards & Evaluation Thresholds: التأصيل الرياضي والفصل بين التغطية ونقاء الإشارة"
    )

    # Top Half: 4 Metric Command Tiles (Inches(1.75), w: 2.7, h: 2.05, gap: 0.31)
    kpis = [
        {
            "val": "≥ -110 dBm",
            "title": "قدرة الإشارة المرجعية (RSRP)",
            "formula": "RSRP = RSSI / (12 × N_PRB)",
            "sub": "المعيار الحاكم لاتساع التغطية وحدود الخلية (3GPP TS 38.215)",
            "color": COLOR_DEEP_TEAL,
            "badge": "مقياس التغطية المطلق"
        },
        {
            "val": "≥ 12 dB",
            "title": "نسبة الإشارة للتداخل (SINR)",
            "formula": "SINR = S / (∑ I_j + N_0)",
            "sub": "قيد أمان قطعي (Hard Constraint) لتشغيل التعديل عالي الرتبة 256-QAM",
            "color": COLOR_BURGUNDY,
            "badge": "قيد الأطروحة الصارم"
        },
        {
            "val": "C = B · log₂(1+SINR)",
            "title": "السعة بنظرية شانون (Capacity)",
            "formula": "Throughput = f(SINR, AMC)",
            "sub": "معدل تدفق البيانات الفعلي وتفادي اختناق الحوامل الترددية المشتركة",
            "color": COLOR_BLUE,
            "badge": "سرعة النقل وتجربة المشترك"
        },
        {
            "val": "95.12%",
            "title": "التغطية الوطنية المستهدفة",
            "formula": "Cov_Target (BPSO Frontier)",
            "sub": "الفصل الصارم بين التغطية الشكلية وجودة الاتصال الراديوي الفعلي",
            "color": COLOR_EMERALD,
            "badge": "المستهدف الاستمثالي"
        }
    ]

    card_w = 2.7
    gap = 0.31
    start_left = 0.8
    top_kpi_y = 1.75
    card_h = 2.1

    for idx, kpi in enumerate(kpis):
        left = Inches(start_left + idx * (card_w + gap))
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(top_kpi_y), Inches(card_w), Inches(card_h))
        box.fill.solid()
        box.fill.fore_color.rgb = COLOR_WHITE
        box.line.color.rgb = kpi["color"]
        box.line.width = Pt(2)

        # Top tag
        tag = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left + Inches(0.2), Inches(top_kpi_y + 0.12), Inches(card_w - 0.4), Inches(0.26))
        tag.fill.solid()
        tag.fill.fore_color.rgb = kpi["color"]
        tag.line.fill.background()
        p_tag = tag.text_frame.paragraphs[0]
        p_tag.text = kpi["badge"]
        p_tag.font.name = FONT_BODY
        p_tag.font.size = Pt(8.5)
        p_tag.font.bold = True
        p_tag.font.color.rgb = COLOR_WHITE
        p_tag.alignment = PP_ALIGN.CENTER

        # Content Textbox
        tb = slide.shapes.add_textbox(left + Inches(0.1), Inches(top_kpi_y + 0.42), Inches(card_w - 0.2), Inches(card_h - 0.48))
        tf = tb.text_frame
        tf.word_wrap = True

        p_val = tf.paragraphs[0]
        p_val.text = kpi["val"]
        p_val.font.name = FONT_TITLE
        p_val.font.size = Pt(17 if len(kpi["val"]) > 10 else 22)
        p_val.font.bold = True
        p_val.font.color.rgb = kpi["color"]
        p_val.alignment = PP_ALIGN.CENTER

        p_t = tf.add_paragraph()
        p_t.text = kpi["title"]
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(10.5)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_TEXT_DARK
        p_t.alignment = PP_ALIGN.CENTER
        p_t.space_before = Pt(2)

        p_f = tf.add_paragraph()
        p_f.text = kpi["formula"]
        p_f.font.name = "Consolas"
        p_f.font.size = Pt(9)
        p_f.font.bold = True
        p_f.font.color.rgb = kpi["color"]
        p_f.alignment = PP_ALIGN.CENTER
        p_f.space_before = Pt(2)

        p_s = tf.add_paragraph()
        p_s.text = kpi["sub"]
        p_s.font.name = FONT_BODY
        p_s.font.size = Pt(8)
        p_s.font.color.rgb = COLOR_TEXT_MUTED
        p_s.alignment = PP_ALIGN.CENTER
        p_s.space_before = Pt(2)

    # Bottom Half: Two Analytical / Comparative Panels (Inches(4.0), h: 2.75)
    # Right Panel: Mathematical Breakdown
    p1_left = 0.8
    p1_w = 5.7
    p1_top = 4.0
    p1_h = 2.75

    box_p1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(p1_left), Inches(p1_top), Inches(p1_w), Inches(p1_h))
    box_p1.fill.solid()
    box_p1.fill.fore_color.rgb = COLOR_WHITE
    box_p1.line.color.rgb = COLOR_DEEP_TEAL
    box_p1.line.width = Pt(1.5)

    tb_p1 = slide.shapes.add_textbox(Inches(p1_left + 0.2), Inches(p1_top + 0.15), Inches(p1_w - 0.4), Inches(p1_h - 0.3))
    tf_p1 = tb_p1.text_frame
    tf_p1.word_wrap = True

    p_p1_t = tf_p1.paragraphs[0]
    p_p1_t.text = "التفكيك الرياضي الدقيق للمؤشرات الراديوية الثلاثة"
    p_p1_t.font.name = FONT_TITLE
    p_p1_t.font.size = Pt(13)
    p_p1_t.font.bold = True
    p_p1_t.font.color.rgb = COLOR_DEEP_TEAL
    p_p1_t.alignment = PP_ALIGN.RIGHT

    items_p1 = [
        ("معادلة RSRP:", "RSRP = RSSI / (12 × N_PRB) — يقيس الاستطاعة النقية دون احتساب التداخل الحراري، حيث 12 هو عدد النواقل الفرعية في كتلة المورد PRB وفق 3GPP."),
        ("معادلة RSRQ:", "RSRQ = N × RSRP / RSSI — يقيس جودة الإشارة مع احتساب أحمال القناة وازدحام الخلايا المجاورة (ممتاز: > -9 dB، ضعيف: < -15 dB)."),
        ("معادلة SINR:", "SINR = S / (∑ I_j + N_0) — المؤشر الحاسم؛ يطرح التداخل التراكمي للخلايا المجاورة ∑I_j والضجيج الحراري N_0 (ممتاز: > 20 dB، مقبول: 10-20 dB).")
    ]
    for lbl, desc in items_p1:
        p = tf_p1.add_paragraph()
        p.text = f"• {lbl} {desc}"
        p.font.name = FONT_BODY
        p.font.size = Pt(9.5)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(4)

    # Left Panel: Hard Constraint & Complexity Mitigation
    p2_left = 6.8
    p2_w = 5.733
    p2_top = 4.0
    p2_h = 2.75

    box_p2 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(p2_left), Inches(p2_top), Inches(p2_w), Inches(p2_h))
    box_p2.fill.solid()
    box_p2.fill.fore_color.rgb = COLOR_WHITE
    box_p2.line.color.rgb = COLOR_BURGUNDY
    box_p2.line.width = Pt(1.5)

    tb_p2 = slide.shapes.add_textbox(Inches(p2_left + 0.2), Inches(p2_top + 0.15), Inches(p2_w - 0.4), Inches(p2_h - 0.3))
    tf_p2 = tb_p2.text_frame
    tf_p2.word_wrap = True

    p_p2_t = tf_p2.paragraphs[0]
    p_p2_t.text = "معيار الأطروحة الصارم وقمع تعقيد التداخل الحسابي"
    p_p2_t.font.name = FONT_TITLE
    p_p2_t.font.size = Pt(13)
    p_p2_t.font.bold = True
    p_p2_t.font.color.rgb = COLOR_BURGUNDY
    p_p2_t.alignment = PP_ALIGN.RIGHT

    items_p2 = [
        ("عتبة SINR ≥ 12 dB كقيد قطعي:", "أي موقع يتسبب تشغيله بهبوط SINR لأي مشترك تحت 12 dB يُعتبر حلاً غير مقبول رياضياً ويُسقط فوراً عبر آلية إصلاح القيود."),
        ("قمع التعقيد الحسابي O(N²):", "حساب التداخل التراكمي لـ 79,268 موقعاً مستحيل زمنياً؛ لذا أنشأنا مصفوفة تجاور مكاني (Spatial Adjacency Matrix) في GIS لحساب التداخل ضمن نصف قطر التأثير فقط."),
        ("الأثر الهندسي:", "اختصار زمن المعالجة بنسبة >80% وضمان جودة اتصال 5G فعلية تمنع انهيار التعديل عالي الرتبة 256-QAM.")
    ]
    for lbl, desc in items_p2:
        p = tf_p2.add_paragraph()
        p.text = f"• {lbl} {desc}"
        p.font.name = FONT_BODY
        p.font.size = Pt(9.5)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(4)

    add_slide_footer(slide, 12)

    # Speaker Notes
    set_full_speaker_notes(slide, {
        "title": "المؤشرات الراديوية ومعايير جودة الخدمة وعتبات التقييم",
        "timeMinutes": "1.5",
        "academic_goals": "التأصيل الرياضي للمؤشرات الراديوية وتحديد عتبات الجودة والتمييز الصارم بين مقاييس التغطية ومقاييس نقاء الإشارة.",
        "speech_script": (
            "غالباً ما تكتفي دراسات التخطيط الراديوي السابقة بقياس قوة الإشارة RSRP لتقول إن التغطية 95% أو 98%.\n"
            "لكن في الواقع العملي، قد يمتلك المشترك إشارة قوية جداً (مثلاً -75 dBm) ومع ذلك يعاني من انقطاع الخدمة وبطء شديد؛ والسبب هو التداخل العالي وضعف نسبة الإشارة للتداخل SINR.\n"
            "أطروحتنا تعتمد فلسفة الفصل الصارم بين التغطية ونقاء القناة:\n"
            "1. جعلنا من عتبة SINR ≥ 12 dB قيداً أمانياً حتمياً (Hard Constraint) غير قابل للتنازل؛ لأن سرعات الجيل الخامس وتعديل 256-QAM لا يمكن أن تعملا بدونه.\n"
            "2. ولمعالجة التعقيد الحسابي O(N²) الناتج عن حساب التداخل بين 79,268 موقعاً، وظفنا نظم GIS لبناء مصفوفة تجاور مكاني تستبعد الخلايا الواقعة خلف السلاسل الجبلية، مما اختصر زمن الحساب بنسبة 80%."
        ),
        "critical_qa": [
            (
                "كيف تم حساب التداخل التراكمي ∑I_j في بيئة وطنية تضم 79 ألف موقع دون الوقوع في كارثة التعقيد الحسابي؟",
                "لو قمنا بحساب التداخل بين كل موقع وكافة المواقع الـ 79,268 في كل تكرار لأسراب الجسيمات لكان التعقيد O(N²) وهو مستحيل عملياً. لذلك وظفنا نظم المعلومات الجغرافية GIS لإنشاء مصفوفة تجاور مكاني (Spatial Adjacency Matrix)؛ حيث يتم حساب التداخل فقط ضمن نصف قطر التأثير الراديوي الفعلي المحسوب وفق نموذج الانتشار Hata-Okumura المعدل بطبقات DEM، مع استبعاد الخلايا الواقعة خلف الحواجز التضاريسية المباشرة، مما خفّض زمن المعالجة الحسابية بنسبة تتجاوز 80%."
            )
        ]
    })


def build_slide_13(prs):
    """Slide 13: Split-Screen High Contrast (Archetype 1)."""
    slide = create_base_slide(prs, is_dark=False)
    add_slide_header(
        slide,
        "تحليل الأدبيات والدراسات السابقة وتصنيف المسارات العالمية",
        "Global Research Taxonomies & Literature Streams: كشف العزلة بين التخطيط والعدالة والتحكم الميداني"
    )

    # Right Half: Traditional Literature (Burgundy / Warning Tint)
    r_left = 0.8
    r_w = 5.6
    r_top = 1.75
    r_h = 4.6

    box_r = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(r_left), Inches(r_top), Inches(r_w), Inches(r_h))
    box_r.fill.solid()
    box_r.fill.fore_color.rgb = COLOR_SOFT_RED
    box_r.line.color.rgb = COLOR_BURGUNDY
    box_r.line.width = Pt(2)

    tb_r = slide.shapes.add_textbox(Inches(r_left + 0.2), Inches(r_top + 0.15), Inches(r_w - 0.4), Inches(r_h - 0.3))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True

    p_rt = tf_r.paragraphs[0]
    p_rt.text = "الأدبيات العالمية الكلاسيكية (Traditional Literature)"
    p_rt.font.name = FONT_TITLE
    p_rt.font.size = Pt(13)
    p_rt.font.bold = True
    p_rt.font.color.rgb = COLOR_BURGUNDY
    p_rt.alignment = PP_ALIGN.RIGHT

    r_items = [
        ("المسار 1: التخطيط الراديوي الكلاسيكي (Radio Planning):",
         "• التركيز الحصري على تعظيم التغطية وخفض CapEx في نطاق ضيق.\n• إجراء التجارب على بيئات اصطناعية (<100 خلية) وتجاهل تضاريس DEM.\n• العجز التام عن معالجة الشبكات الوطنية العملاقة."),
        ("المسار 2: العدالة وتوزيع الموارد (Fairness & Allocation):",
         "• انحصار مفهوم العدالة على مستوى الأجهزة الطرفية (UE-Level) بخلية واحدة.\n• التخطيط التجاري البحت وتوجيه 95% من الترقية للمدن الكثيفة.\n• إهمال 38% من سكان الريف السوري وتكريس الفجوة الرقمية."),
        ("المسار 3: التحكم التشغيلي وأمن الطوارئ (Emergency Control):",
         "• الاعتماد على أجهزة التشويش الراديوي (RF Jammers) أو قطع التغذية.\n• تدمير الطيف اللاسلكي وقطع مكالمات الطوارئ 112 وصدمات للمعدات.\n• العمل في بيئات أحادية المورد مع عجز تام عن إدارة الشبكات الهجينة.")
    ]
    for h, b in r_items:
        p1 = tf_r.add_paragraph()
        p1.text = h
        p1.font.name = FONT_TITLE
        p1.font.size = Pt(10.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_BURGUNDY
        p1.alignment = PP_ALIGN.RIGHT
        p1.space_before = Pt(6)

        p2 = tf_r.add_paragraph()
        p2.text = b
        p2.font.name = FONT_BODY
        p2.font.size = Pt(9)
        p2.font.color.rgb = COLOR_TEXT_DARK
        p2.alignment = PP_ALIGN.RIGHT

    # Left Half: Proposed Thesis Paradigm (Teal / Solution Tint)
    l_left = 6.933
    l_w = 5.6
    l_top = 1.75
    l_h = 4.6

    box_l = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(l_left), Inches(l_top), Inches(l_w), Inches(l_h))
    box_l.fill.solid()
    box_l.fill.fore_color.rgb = COLOR_SOFT_TEAL
    box_l.line.color.rgb = COLOR_DEEP_TEAL
    box_l.line.width = Pt(2)

    tb_l = slide.shapes.add_textbox(Inches(l_left + 0.2), Inches(l_top + 0.15), Inches(l_w - 0.4), Inches(l_h - 0.3))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True

    p_lt = tf_l.paragraphs[0]
    p_lt.text = "المنظومة التكاملية للأطروحة (Proposed Thesis Paradigm)"
    p_lt.font.name = FONT_TITLE
    p_lt.font.size = Pt(13)
    p_lt.font.bold = True
    p_lt.font.color.rgb = COLOR_DEEP_TEAL
    p_lt.alignment = PP_ALIGN.RIGHT

    l_items = [
        ("الحل 1: استمثال الترقية المقيدة للشبكة الوطنية (PLAN):",
         "• نموذج تحسين هجين لـ 30,010 موقعاً مرشحاً من أصل 79,268 موقعاً حقيقياً.\n• دمج طبقات الارتفاع DEM 30m ونماذج التوهين واستخدامات الأراضي.\n• خوارزمية BPSO تحقق 95.12% تغطية وتوفر 6% كلفة في 118 ثانية."),
        ("الحل 2: ابتكار مؤشر العدالة المكانية (FAIR - SFI):",
         "• اشتقاق رياضي لمؤشر العدالة SFI المشتق من تباين جيني المكاني.\n• دمج SFI في دالة الهدف لفرض توازن التوزيع الجغرافي بين المحافظات.\n• قفزة في العدالة بنسبة +36.5% (SFI = 0.71) وحماية أرياف درعا والحسكة."),
        ("الحل 3: العزل البرمجي الآمن متعدد المصنعين (CONTROL):",
         "• استبدال التشويش بمحرك تقاطع مكاني GIS يعزل الخلايا برمجياً.\n• تكامل موحد مع معدات Huawei (98.1%) و Ericsson (97.4%).\n• صون مكالمات الطوارئ 112 واستعادة الخدمة كاملة في أقل من 10 دقائق.")
    ]
    for h, b in l_items:
        p1 = tf_l.add_paragraph()
        p1.text = h
        p1.font.name = FONT_TITLE
        p1.font.size = Pt(10.5)
        p1.font.bold = True
        p1.font.color.rgb = COLOR_DEEP_TEAL
        p1.alignment = PP_ALIGN.RIGHT
        p1.space_before = Pt(6)

        p2 = tf_l.add_paragraph()
        p2.text = b
        p2.font.name = FONT_BODY
        p2.font.size = Pt(9)
        p2.font.color.rgb = COLOR_TEXT_DARK
        p2.alignment = PP_ALIGN.RIGHT

    # Central "VS" Badge
    vs_circle = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(6.166), Inches(3.6), Inches(1.0), Inches(1.0))
    vs_circle.fill.solid()
    vs_circle.fill.fore_color.rgb = COLOR_DARK_SLATE
    vs_circle.line.color.rgb = COLOR_GOLD
    vs_circle.line.width = Pt(2)
    p_vs = vs_circle.text_frame.paragraphs[0]
    p_vs.text = "VS"
    p_vs.font.name = FONT_TITLE
    p_vs.font.size = Pt(15)
    p_vs.font.bold = True
    p_vs.font.color.rgb = COLOR_GOLD
    p_vs.alignment = PP_ALIGN.CENTER

    # Bottom Banner
    banner_y = 6.48
    syn_banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(banner_y), Inches(11.733), Inches(0.36))
    syn_banner.fill.solid()
    syn_banner.fill.fore_color.rgb = COLOR_DARK_TEAL
    syn_banner.line.color.rgb = COLOR_GOLD
    syn_banner.line.width = Pt(1)
    p_sb = syn_banner.text_frame.paragraphs[0]
    p_sb.text = "الفجوة المركزية في الأدبيات: جزر علمية معزولة بين التخطيط والعدالة والتحكم  ◄►  الحل: إطار وطني موحد يربط الأبعاد الثلاثة تحت مظلة GIS."
    p_sb.font.name = FONT_BODY
    p_sb.font.size = Pt(9.5)
    p_sb.font.bold = True
    p_sb.font.color.rgb = COLOR_WHITE
    p_sb.alignment = PP_ALIGN.CENTER

    add_slide_footer(slide, 13)

    # Speaker Notes
    set_full_speaker_notes(slide, {
        "title": "تحليل الأدبيات والدراسات السابقة وتصنيف المسارات العالمية",
        "timeMinutes": "1.5",
        "academic_goals": "تصنيف الأدبيات العالمية في 3 مسارات مستقلة، وإبراز غياب الرؤية التكاملية والقصور في معالجة الشبكات الكبرى والعدالة والتحكم.",
        "speech_script": (
            "عندما حللنا أكثر من 120 ورقة علمية في IEEE وElsevier، وجدنا أن الأبحاث العالمية تعيش في جزر منعزلة:\n"
            "• علماء بحوث العمليات يطورون خوارزميات للترقية في فضاءات اصطناعية صغيرة دون مراعاة لتضاريس الواقع أو قيود الطاقة.\n"
            "• وعلماء التنمية يناقشون الفجوة الرقمية وحرمان الريف دون صياغة مؤشر رياضي حقيقي يوجه الخوارزميات.\n"
            "• ومهندسو العمليات الميدانية يعزلون الشبكات بالتشويش المادي الترددي الذي يدمر الطيف ويقطع مكالمات الإسعاف 112.\n"
            "مساهمة هذه الأطروحة الجوهرية تكمن في كسر هذه العزلة: بنينا إطاراً وطنياً موحداً يجمع التخطيط الاقتصادي الذكي (PLAN)، والعدالة المكانية الصارمة (FAIR)، والتحكم البرمجي السيادي الآمن (CONTROL) تحت مظلة نظم المعلومات الجغرافية GIS."
        ),
        "critical_qa": [
            (
                "هل من المنطقي دمج مسألة أمنية كعزل الطوارئ مع مسألة تخطيطية كترقية الشبكة للجيل الخامس؟ أليسا موضوعين منفصلين؟",
                "رؤية وجيهة للوهلة الأولى دكتورنا العزيز. لكن واقع الشبكات الحديثة، وتحديداً في الدول التي تواجه أزمات ممتدة كسوريا، أثبت أن التخطيط المنفصل عن السيطرة التشغيلية هو تخطيط أعرج. المشغل والهيئة الناظمة يحتاجان لمعرفة دقيقة بخصائص البرج الراديوية وزوايا ميل هوائياته أثناء التخطيط، وهي ذاتها المعطيات اللازمة للتحكم فيه وعزله برمجياً عند الطوارئ دون تدمير الشبكة. توحيد المعمارية تحت مظلة GIS يخلق لأول مرة ما يسمى بالشبكة الصامدة تكيّفياً (Resilient Adaptive Network)."
            )
        ]
    })


def build_slide_14(prs):
    """Slide 14: Algorithmic Decision Tree (Archetype 7)."""
    slide = create_base_slide(prs, is_dark=False)
    add_slide_header(
        slide,
        "المفاضلة الخوارزمية ومسوغات اختيار الذكاء السربي والجيني",
        "Algorithmic Trade-offs & AI Optimization Justifications: برهان استحالة الحل الدقيق وتفوق BPSO المعززة بمشغل إصلاح القيود"
    )

    # Top Flowchart Container (Inches(1.75), w: 11.733, h: 2.7)
    flow_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.75), Inches(11.733), Inches(2.7))
    flow_box.fill.solid()
    flow_box.fill.fore_color.rgb = COLOR_WHITE
    flow_box.line.color.rgb = COLOR_BORDER
    flow_box.line.width = Pt(1.5)

    # Flow Node 1: Problem Definition & Combinatorial Space (Right: 9.3, w: 2.9)
    n1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(9.3), Inches(1.9), Inches(3.0), Inches(2.35))
    n1.fill.solid()
    n1.fill.fore_color.rgb = COLOR_DARK_SLATE
    n1.line.color.rgb = COLOR_GOLD
    n1.line.width = Pt(1.5)
    tf_n1 = n1.text_frame
    tf_n1.word_wrap = True
    p_n1 = tf_n1.paragraphs[0]
    p_n1.text = "1. فضاء القرار الثنائي"
    p_n1.font.name = FONT_TITLE
    p_n1.font.size = Pt(11.5)
    p_n1.font.bold = True
    p_n1.font.color.rgb = COLOR_GOLD
    p_n1.alignment = PP_ALIGN.CENTER
    items_n1 = [
        "30,010 موقع مرشح للترقية",
        "متغيرات ثنائية: x_i ∈ {0, 1}",
        "حجم الفضاء: 2^30,010 ≈ 10^9,033",
        "مسألة NP-Hard غير خطية"
    ]
    for itm in items_n1:
        p = tf_n1.add_paragraph()
        p.text = f"• {itm}"
        p.font.name = FONT_BODY
        p.font.size = Pt(8.5)
        p.font.color.rgb = COLOR_WHITE
        p.alignment = PP_ALIGN.RIGHT

    # Flow Node 2: Decision on Exact Methods (MILP) (Center-Right: 6.8, w: 2.2)
    n2 = slide.shapes.add_shape(MSO_SHAPE.DIAMOND, Inches(6.8), Inches(1.9), Inches(2.2), Inches(2.35))
    n2.fill.solid()
    n2.fill.fore_color.rgb = COLOR_SOFT_RED
    n2.line.color.rgb = COLOR_BURGUNDY
    n2.line.width = Pt(1.75)
    tf_n2 = n2.text_frame
    tf_n2.word_wrap = True
    p_n2 = tf_n2.paragraphs[0]
    p_n2.text = "هل الحل الدقيق\n(MILP)\nممكن؟"
    p_n2.font.name = FONT_TITLE
    p_n2.font.size = Pt(10.5)
    p_n2.font.bold = True
    p_n2.font.color.rgb = COLOR_BURGUNDY
    p_n2.alignment = PP_ALIGN.CENTER
    p_n2_sub = tf_n2.add_paragraph()
    p_n2_sub.text = "تعقيد O(2^N)\nمستحيل زمنياً"
    p_n2_sub.font.name = FONT_BODY
    p_n2_sub.font.size = Pt(8)
    p_n2_sub.font.color.rgb = COLOR_TEXT_DARK
    p_n2_sub.alignment = PP_ALIGN.CENTER

    # Flow Node 3: Metaheuristic Branching (Center-Left: 3.7, w: 2.8)
    n3 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(3.7), Inches(1.9), Inches(2.8), Inches(2.35))
    n3.fill.solid()
    n3.fill.fore_color.rgb = COLOR_SOFT_BLUE
    n3.line.color.rgb = COLOR_BLUE
    n3.line.width = Pt(1.5)
    tf_n3 = n3.text_frame
    tf_n3.word_wrap = True
    p_n3 = tf_n3.paragraphs[0]
    p_n3.text = "2. الاستدلال الفوقي المقارن"
    p_n3.font.name = FONT_TITLE
    p_n3.font.size = Pt(11.5)
    p_n3.font.bold = True
    p_n3.font.color.rgb = COLOR_BLUE
    p_n3.alignment = PP_ALIGN.CENTER
    items_n3 = [
        "AGA: استكشاف كلي ممتاز، لكن بطيئة في التقارب (142 ثانية)",
        "BPSO: سرعة تقارب فائقة (118 ثانية) وتوافق مع القرار الثنائي عبر Sigmoid S(v)",
        "تحدي BPSO: حساسية للوقوع في النهايات المحلية (Local Optima)"
    ]
    for itm in items_n3:
        p = tf_n3.add_paragraph()
        p.text = f"• {itm}"
        p.font.name = FONT_BODY
        p.font.size = Pt(8)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT

    # Flow Node 4: Constraint Repair Operator (Left: 0.95, w: 2.5)
    n4 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.95), Inches(1.9), Inches(2.55), Inches(2.35))
    n4.fill.solid()
    n4.fill.fore_color.rgb = COLOR_SOFT_TEAL
    n4.line.color.rgb = COLOR_DEEP_TEAL
    n4.line.width = Pt(1.5)
    tf_n4 = n4.text_frame
    tf_n4.word_wrap = True
    p_n4 = tf_n4.paragraphs[0]
    p_n4.text = "3. مشغل إصلاح القيود"
    p_n4.font.name = FONT_TITLE
    p_n4.font.size = Pt(11.5)
    p_n4.font.bold = True
    p_n4.font.color.rgb = COLOR_DEEP_TEAL
    p_n4.alignment = PP_ALIGN.CENTER
    items_n4 = [
        "فحص القيود: ميزانية ≤ B_max، تغطية ≥ 90%، SINR ≥ 12 dB",
        "قلب البتات جشعياً عند انتهاك أي قيد وإخراج السرب من الفخاخ",
        "ضمان 100% حلول مقبولة",
        "تحقيق جبهة باريتو المثلى"
    ]
    for itm in items_n4:
        p = tf_n4.add_paragraph()
        p.text = f"• {itm}"
        p.font.name = FONT_BODY
        p.font.size = Pt(8)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT

    # Bottom Half: Two Detailed Analytical Panels (Inches(4.6), h: 2.15)
    # Right Panel: 4 Mathematical Justifications
    b1_left = 0.8
    b1_w = 5.7
    b1_top = 4.6
    b1_h = 2.15

    box_b1 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(b1_left), Inches(b1_top), Inches(b1_w), Inches(b1_h))
    box_b1.fill.solid()
    box_b1.fill.fore_color.rgb = COLOR_WHITE
    box_b1.line.color.rgb = COLOR_DEEP_TEAL
    box_b1.line.width = Pt(1.5)

    tb_b1 = slide.shapes.add_textbox(Inches(b1_left + 0.15), Inches(b1_top + 0.1), Inches(b1_w - 0.3), Inches(b1_h - 0.2))
    tf_b1 = tb_b1.text_frame
    tf_b1.word_wrap = True

    p_b1_t = tf_b1.paragraphs[0]
    p_b1_t.text = "المسوغات الرياضية الأربعة لاختيار الاستدلال الفوقي"
    p_b1_t.font.name = FONT_TITLE
    p_b1_t.font.size = Pt(11.5)
    p_b1_t.font.bold = True
    p_b1_t.font.color.rgb = COLOR_DEEP_TEAL
    p_b1_t.alignment = PP_ALIGN.RIGHT

    justifications = [
        ("أهداف متعارضة رباعية:", "تغطية قصوى ↔ أقل كلفة ↔ أدنى طاقة ↔ أعلى عدالة SFI."),
        ("فضاء بحث هائل 2^30,010:", "يتجاوز عدد ذرات الكون (10^80)، مما يسقط خوارزميات الاستقصاء الشامل."),
        ("طبيعة NP-Hard غير خطية:", "تلاشي الإشارات والحيود التضاريسي وحسابات SINR اقترانات غير خطية معقدة."),
        ("الجدوى التشغيلية السريعة:", "الحاجة لإعادة التخطيط التكراري بزمن قياسي (< 120 ثانية).")
    ]
    for lbl, desc in justifications:
        p = tf_b1.add_paragraph()
        p.text = f"• {lbl} {desc}"
        p.font.name = FONT_BODY
        p.font.size = Pt(8.5)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(2)

    # Left Panel: Hybrid Decision of the Thesis
    b2_left = 6.8
    b2_w = 5.733
    b2_top = 4.6
    b2_h = 2.15

    box_b2 = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(b2_left), Inches(b2_top), Inches(b2_w), Inches(b2_h))
    box_b2.fill.solid()
    box_b2.fill.fore_color.rgb = COLOR_WHITE
    box_b2.line.color.rgb = COLOR_BURGUNDY
    box_b2.line.width = Pt(1.5)

    tb_b2 = slide.shapes.add_textbox(Inches(b2_left + 0.15), Inches(b2_top + 0.1), Inches(b2_w - 0.3), Inches(b2_h - 0.2))
    tf_b2 = tb_b2.text_frame
    tf_b2.word_wrap = True

    p_b2_t = tf_b2.paragraphs[0]
    p_b2_t.text = "قرار الأطروحة المبتكر (Hybrid Algorithmic Decision)"
    p_b2_t.font.name = FONT_TITLE
    p_b2_t.font.size = Pt(11.5)
    p_b2_t.font.bold = True
    p_b2_t.font.color.rgb = COLOR_BURGUNDY
    p_b2_t.alignment = PP_ALIGN.RIGHT

    decisions = [
        ("المعمارية المعتمدة:", "BPSO Accelerated by Adaptive Constraint Repair Operator."),
        ("دمج المزايا:", "استثمار سرعة BPSO الفائقة مع تحصينها بمشغل إصلاح القيود ضد التلاشي المبكر."),
        ("وزن القصور الذاتي الديناميكي:", "تطبيق w يتناقص خطياً من 0.9 إلى 0.4 لضبط الموازنة بين الاستكشاف والاستغلال."),
        ("التفوق الإحصائي الميداني:", "تقارب في 118 ثانية (أسرع 17% من AGA)، ووفر 6% كلفة و 5.3% طاقة بدلالة p < 0.001.")
    ]
    for lbl, desc in decisions:
        p = tf_b2.add_paragraph()
        p.text = f"• {lbl} {desc}"
        p.font.name = FONT_BODY
        p.font.size = Pt(8.5)
        p.font.color.rgb = COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_before = Pt(2)

    add_slide_footer(slide, 14)

    # Speaker Notes
    set_full_speaker_notes(slide, {
        "title": "المفاضلة الخوارزمية ومسوغات اختيار الذكاء السربي والجيني",
        "timeMinutes": "1.5",
        "academic_goals": "الدفاع الأكاديمي الصارم عن اختيار الميتا-إرشاديات بدلاً من البرمجة الخطية، والمفاضلة بين BPSO و AGA، وتوضيح ابتكار مشغل إصلاح القيود.",
        "speech_script": (
            "قد تتساءل اللجنة الموقرة: لماذا لم نستخدم البرمجة الخطية MILP لضمان الحل الأمثل رياضياً؟\n"
            "الجواب يكمن في التعقيد الحسابي؛ فلدينا 30,010 موقعاً مرشحاً، مما يولد فضاء حالات بحجم 2^30,010 (أكثر من 10^9,033 حالة!). إن حل هذه المسألة بـ MILP يتطلب مليارات السنين، فضلاً عن أن انتشار الأمواج الراديوية وحسابات SINR هي اقترانات غير خطية بالغة التعقيد.\n"
            "لذلك كان التحول نحو الاستدلال الفوقي ضرورة حتمية. وعند المقارنة بين BPSO و AGA، أثبتت تجاربنا عبر 30 تشغيلاً مستقلاً أن BPSO تتفوق بسرعة التقارب (118 ثانية مقابل 142 ثانية لـ AGA) وبفارق دال إحصائياً p < 0.001.\n"
            "ولمعالجة نقطة ضعف BPSO المعروفة في الوقوع بالفخاخ المحلية (Local Optima)، ابتكرنا مشغل 'إصلاح القيود التكيفي' الذي يقوم بقلب البتات جشعياً عند انتهاك الميزانية أو عتبة SINR، مما يضمن خروج السرب قسرياً من أي فخ محلي والوصول إلى جبهة باريتو الحقيقية."
        ),
        "critical_qa": [
            (
                "تتعرض خوارزمية BPSO الكلاسيكية لمشكلة التلاشي المبكر (Premature Convergence)، كيف ضمنت أن حلك على شبكة سوريا هو الأقرب للأمثل؟",
                "لمعالجة التلاشي المبكر لـ BPSO، قمنا بإجراء تعديلين جوهريين: أولاً، تطبيق وزن القصور الذاتي الديناميكي المتناقص تدريجياً (Linearly Decreasing Inertia Weight w)، حيث يبدأ بقيمة مرتفعة (w_max = 0.9) لتعزيز الاستكشاف العام، ثم يتناقص إلى (w_min = 0.4) لضبط الاستغلال الموضعي. ثانياً، ابتكرنا مشغل 'إصلاح القيود وإعادة التوزيع المكاني' الذي يقوم بقلب البتات ذات الجدوى المنخفضة جشعياً عند انتهاك القيود، مما يُخرج السرب قسرياً من أي فخ محلي ويضمن استمرار التحسين نحو جبهة باريتو الحقيقية."
            )
        ]
    })


def build_slide_15(prs):
    """Slide 15: Gap-to-Bridge Matrix (Archetype 10)."""
    slide = create_base_slide(prs, is_dark=False)
    add_slide_header(
        slide,
        "الفجوة البحثية الدقيقة وجسور الحلول الهندسية المبتكرة",
        "Precise Research Gaps & Proposed Engineering Bridges: الربط المباشر بين أوجه القصور العالمية ومساهمات الأطروحة الأصيلة"
    )

    # 3 Horizontal Bridge Rows (Inches(1.75), w: 11.733, row_h: 1.45, gap: 0.16)
    bridges = [
        {
            "num": "الجسر الأول (PLAN)",
            "gap_title": "الفجوة 1: غياب إطار ترقية موحد يدمج العدالة المكانية",
            "gap_desc": "كافة أوراق الاستمثال المنشورة تفاضل بين التغطية والتكلفة فقط، مما ينحاز تجارياً للمدن ويحرم الأرياف، دون صياغة رياضية للعدالة الجغرافية.",
            "sol_title": "الحل: نموذج استمثال هجين رباعي الأهداف مع مؤشر SFI",
            "sol_desc": "صياغة اقتران هدف كلي: max F = w1·Cov(SINR) - w2·Cost - w3·Energy + w4·SFI مع مشغل إصلاح القيود لضمان 100% حلول مقبولة.",
            "color": COLOR_DEEP_TEAL
        },
        {
            "num": "الجسر الثاني (FAIR)",
            "gap_title": "الفجوة 2: ندرة التحقق الميداني والاعتماد على سيناريوهات نظرية",
            "gap_desc": "92% من أبحاث التخطيط تعتمد خلايا اصطناعية (<100 خلية) وتتجاهل تضاريس الدول النامية وقيود الطاقة والربط الخلفي.",
            "sol_title": "الحل: تطبيق وتحقق تجريبي شامل على شبكة وطنية كاملة (79,268 موقعاً)",
            "sol_desc": "بناء قاعدة بيانات جغرافية وطنية حقيقية 100% تغطي 14 محافظة سورية ومدمجة مع نماذج الارتفاع الرقمي DEM 30m لأول مرة عالمياً.",
            "color": COLOR_GOLD
        },
        {
            "num": "الجسر الثالث (CONTROL)",
            "gap_title": "الفجوة 3: انعدام التنسيق للشبكات الهجينة والاعتماد على التشويش",
            "gap_desc": "المشوشات الفيزيائية تعطل الطيف بالكامل وتقطع مكالمات الطوارئ 112، مع غياب أي بروتوكول ينسق بين موردي الاتصالات المتنافسين.",
            "sol_title": "الحل: محرك GIS للتحكم والعزل البرمجي الآمن متعدد الموردين",
            "sol_desc": "عزل الخلايا برمجياً بنجاح 98.1% لهواوي و 97.4% لإريكسون، صون مكالمات 112 بنسبة 100%، واستعادة الخدمة في أقل من 10 دقائق.",
            "color": COLOR_BURGUNDY
        }
    ]

    start_y = 1.75
    row_h = 1.45
    row_gap = 0.16

    for idx, b in enumerate(bridges):
        top_y = start_y + idx * (row_h + row_gap)

        # Gap Box (Right: 0.8, w: 4.8)
        gap_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(top_y), Inches(4.8), Inches(row_h))
        gap_box.fill.solid()
        gap_box.fill.fore_color.rgb = COLOR_SOFT_RED
        gap_box.line.color.rgb = COLOR_BORDER_RED
        gap_box.line.width = Pt(1.5)

        tb_g = slide.shapes.add_textbox(Inches(0.9), Inches(top_y + 0.1), Inches(4.6), Inches(row_h - 0.2))
        tf_g = tb_g.text_frame
        tf_g.word_wrap = True
        p_gt = tf_g.paragraphs[0]
        p_gt.text = b["gap_title"]
        p_gt.font.name = FONT_TITLE
        p_gt.font.size = Pt(10.5)
        p_gt.font.bold = True
        p_gt.font.color.rgb = COLOR_BURGUNDY
        p_gt.alignment = PP_ALIGN.RIGHT

        p_gd = tf_g.add_paragraph()
        p_gd.text = b["gap_desc"]
        p_gd.font.name = FONT_BODY
        p_gd.font.size = Pt(8.5)
        p_gd.font.color.rgb = COLOR_TEXT_DARK
        p_gd.alignment = PP_ALIGN.RIGHT
        p_gd.space_before = Pt(3)

        # Connector Arrow Badge (Center: 5.75, w: 1.8)
        arrow = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.75), Inches(top_y + 0.45), Inches(1.8), Inches(0.55))
        arrow.fill.solid()
        arrow.fill.fore_color.rgb = b["color"]
        arrow.line.fill.background()
        p_arr = arrow.text_frame.paragraphs[0]
        p_arr.text = f"{b['num']}\n──►"
        p_arr.font.name = FONT_BODY
        p_arr.font.size = Pt(9)
        p_arr.font.bold = True
        p_arr.font.color.rgb = COLOR_WHITE
        p_arr.alignment = PP_ALIGN.CENTER

        # Solution Bridge Box (Left: 7.7, w: 4.833)
        sol_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.7), Inches(top_y), Inches(4.833), Inches(row_h))
        sol_box.fill.solid()
        sol_box.fill.fore_color.rgb = COLOR_SOFT_TEAL
        sol_box.line.color.rgb = COLOR_BORDER_TEAL
        sol_box.line.width = Pt(1.5)

        tb_s = slide.shapes.add_textbox(Inches(7.8), Inches(top_y + 0.1), Inches(4.633), Inches(row_h - 0.2))
        tf_s = tb_s.text_frame
        tf_s.word_wrap = True
        p_st = tf_s.paragraphs[0]
        p_st.text = b["sol_title"]
        p_st.font.name = FONT_TITLE
        p_st.font.size = Pt(10.5)
        p_st.font.bold = True
        p_st.font.color.rgb = COLOR_DEEP_TEAL
        p_st.alignment = PP_ALIGN.RIGHT

        p_sd = tf_s.add_paragraph()
        p_sd.text = b["sol_desc"]
        p_sd.font.name = FONT_BODY
        p_sd.font.size = Pt(8.5)
        p_sd.font.color.rgb = COLOR_TEXT_DARK
        p_sd.alignment = PP_ALIGN.RIGHT
        p_sd.space_before = Pt(3)

    # Bottom Breakthrough Summary Banner
    banner_y = 6.48
    syn_banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(banner_y), Inches(11.733), Inches(0.36))
    syn_banner.fill.solid()
    syn_banner.fill.fore_color.rgb = COLOR_DARK_TEAL
    syn_banner.line.color.rgb = COLOR_GOLD
    syn_banner.line.width = Pt(1)
    p_sb = syn_banner.text_frame.paragraphs[0]
    p_sb.text = "الأثر الهندسي للجسور: نقل التخطيط الراديوي والتحكم من الأطر النظرية المحدودة إلى منظومة وطنية شاملة تجمع الكفاءة الاقتصادية والعدالة التنموية والسيادة التقنية."
    p_sb.font.name = FONT_BODY
    p_sb.font.size = Pt(9.5)
    p_sb.font.bold = True
    p_sb.font.color.rgb = COLOR_WHITE
    p_sb.alignment = PP_ALIGN.CENTER

    add_slide_footer(slide, 15)

    # Speaker Notes
    set_full_speaker_notes(slide, {
        "title": "الفجوة البحثية الدقيقة وجسور الحلول الهندسية المبتكرة",
        "timeMinutes": "1.5",
        "academic_goals": "التحديد القطعي للقصور في الأدبيات العالمية وبيان الرابط المباشر 1-to-1 بين كل فجوة والحل الهندسي المبتكر للأطروحة.",
        "speech_script": (
            "سعادة أعضاء اللجنة الموقرين، لسنا هنا في وارد تكرار ما كُتب في المراجع، بل جئنا لنبني ثلاثة جسور هندسية واضحة:\n"
            "• الجسر الأول: نقل التخطيط من المفاضلة الثنائية الضيقة إلى نموذج هجين رباعي الأهداف يدمج مؤشر العدالة المكانية SFI كبعد رابع ملزم.\n"
            "• الجسر الثاني: نقل التجارب من خلايا المختبر الافتراضية إلى شبكة الجمهورية العربية السورية الحقيقية بـ 79,268 موقعاً وتضاريسها الوعرة.\n"
            "• الجسر الثالث: استبدل التشويش المادي العشوائي بمنظومة عزل برمجي دقيقة موجهة بـ GIS متوافقة مع هواوي وإريكسون وتصون مكالمات 112 بنسبة 100%.\n"
            "هذه الجسور الثلاثة هي جوهر ما سنفصله في المحور الثالث القادم."
        ),
        "critical_qa": [
            (
                "تذكر في الجسر الثاني أنك اختبرت النموذج على 79,268 موقعاً، هل شملت خوارزمية الترقية كافة هذه المواقع أم جزءاً منها؟",
                "إن قاعدة البيانات الجغرافية المجهزة تشمل بالفعل كامل البنية التحتية لسوريا وهي 79,268 موقعاً (تشمل 21,356 موقع 2G و 27,902 موقع 3G و 30,010 موقع 4G). أما فضاء البحث لترقية الجيل الخامس 5G Co-siting فقد ركز تحديداً على المواقع المؤهلة فنياً والجاهزة لاستقبال عتاد Massive MIMO وهي مواقع الجيل الرابع البالغ عددها 30,010 موقعاً. ومع ذلك، بقيت كافة المواقع الـ 79 ألفاً حاضرة في مصفوفة حسابات التداخل الكهرومغناطيسي وعزل الخدمة الطارئة لضمان عدم تأثر الشبكات العاملة."
            )
        ]
    })


def build_slide_16(prs):
    """Slide 16: Horizontal Pipeline (Archetype 5)."""
    slide = create_base_slide(prs, is_dark=False)
    add_slide_header(
        slide,
        "معمارية الانتقال من الفجوة إلى منظومة الحل المقترحة",
        "Pipeline Architecture: From Gaps to the Integrated Solution: خط التدفق الهندسي الرباعي المرتكز على حاضنة GIS"
    )

    # 4 Horizontal Pipeline Stages (Inches(1.75), w: 2.7, h: 3.9, gap: 0.31)
    stages = [
        {
            "num": "المرحلة 01",
            "title": "التشخيص الهندسي\n(Diagnostics)",
            "color": COLOR_BURGUNDY,
            "items": [
                "تحديد المآزق الثلاثة للبنية الخلوية الوطنية.",
                "كلفة الإنشاءات الباهظة للمواقع الجديدة في ظل العقوبات وشح الموارد.",
                "تفاقم الفجوة الرقمية وحرمان 38% من سكان الأرياف.",
                "المخاطر التشغيلية للتشويش والإطفاء القسري للأبراج."
            ]
        },
        {
            "num": "المرحلة 02",
            "title": "النموذج الرياضي\n(Formulation)",
            "color": COLOR_DEEP_TEAL,
            "items": [
                "صياغة النموذج الرياضي متعدد الأهداف الموزون.",
                "إدخال طبقات GIS (DEM 30m & Clutter) كمعاملات حسابية مباشرة.",
                "اشتقاق مؤشر العدالة المكانية SFI المشتق من جيني.",
                "فرض قيد العدالة SFI ≥ 0.70 كمعيار حتمي."
            ]
        },
        {
            "num": "المرحلة 03",
            "title": "التحسين الراديوي\n(Optimization)",
            "color": COLOR_DEEP_TEAL,
            "items": [
                "تشغيل محرك BPSO المعزز بمشغل إصلاح القيود التكيفي.",
                "معالجة 30,010 موقع مرشح عبر 30 تشغيلاً مستقلاً.",
                "تحقيق تغطية 95.12% لـ 5G بفارق معنوي p < 0.001.",
                "توفير 8.4 مليون دولار وخفض استهلاك الطاقة بـ 4.4 MWh."
            ]
        },
        {
            "num": "المرحلة 04",
            "title": "التحكم التشغيلي\n(Operational Control)",
            "color": COLOR_BURGUNDY,
            "items": [
                "ترجمة مضلعات الطوارئ الجغرافية إلى أوامر برمجية لحظية عبر REST/NETCONF.",
                "عزل قطاعي دقيق بنسبة 98.1% لهواوي و 97.4% لإريكسون.",
                "صون مكالمات الطوارئ 112 بنسبة 100%.",
                "استعادة الخدمة المؤتمتة بالكامل في زمن قياسي (<10 دقائق)."
            ]
        }
    ]

    card_w = 2.7
    gap = 0.31
    start_left = 0.8
    top_y = 1.75
    card_h = 3.9

    for idx, stg in enumerate(stages):
        left = Inches(start_left + idx * (card_w + gap))

        # Stage Card Container
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(top_y), Inches(card_w), Inches(card_h))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_WHITE
        card.line.color.rgb = stg["color"]
        card.line.width = Pt(2)

        # Stage Header Pill
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left + Inches(0.2), Inches(top_y + 0.15), Inches(card_w - 0.4), Inches(0.35))
        pill.fill.solid()
        pill.fill.fore_color.rgb = stg["color"]
        pill.line.fill.background()
        p_p = pill.text_frame.paragraphs[0]
        p_p.text = stg["num"]
        p_p.font.name = FONT_TITLE
        p_p.font.size = Pt(11)
        p_p.font.bold = True
        p_p.font.color.rgb = COLOR_WHITE
        p_p.alignment = PP_ALIGN.CENTER

        # Stage Content
        tb = slide.shapes.add_textbox(left + Inches(0.12), Inches(top_y + 0.55), Inches(card_w - 0.24), Inches(card_h - 0.65))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = stg["title"]
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_TEXT_DARK
        p_t.alignment = PP_ALIGN.CENTER
        p_t.space_after = Pt(6)

        for item in stg["items"]:
            p_i = tf.add_paragraph()
            p_i.text = f"• {item}"
            p_i.font.name = FONT_BODY
            p_i.font.size = Pt(8.5)
            p_i.font.color.rgb = COLOR_TEXT_DARK
            p_i.alignment = PP_ALIGN.RIGHT
            p_i.space_before = Pt(3)

        # Flow Arrow between stages
        if idx < len(stages) - 1:
            arr_x = start_left + idx * (card_w + gap) + card_w + 0.05
            arr = slide.shapes.add_textbox(Inches(arr_x), Inches(top_y + 1.8), Inches(gap - 0.1), Inches(0.4))
            tf_arr = arr.text_frame
            p_a = tf_arr.paragraphs[0]
            p_a.text = "◄"
            p_a.font.name = FONT_TITLE
            p_a.font.size = Pt(14)
            p_a.font.bold = True
            p_a.font.color.rgb = COLOR_GOLD
            p_a.alignment = PP_ALIGN.CENTER

    # Bottom Platform Banner (Unified GIS Substrate)
    banner_y = 5.8
    gis_plat = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(banner_y), Inches(11.733), Inches(0.55))
    gis_plat.fill.solid()
    gis_plat.fill.fore_color.rgb = COLOR_DARK_TEAL
    gis_plat.line.color.rgb = COLOR_GOLD
    gis_plat.line.width = Pt(1.5)
    tf_gp = gis_plat.text_frame
    p_gp = tf_gp.paragraphs[0]
    p_gp.text = "الركيزة الحاضنة الموحدة: منصة نظم المعلومات الجغرافية (Unified GIS Substrate)"
    p_gp.font.name = FONT_TITLE
    p_gp.font.size = Pt(11.5)
    p_gp.font.bold = True
    p_gp.font.color.rgb = COLOR_GOLD
    p_gp.alignment = PP_ALIGN.CENTER

    p_gp_sub = tf_gp.add_paragraph()
    p_gp_sub.text = "الحبل السري الذي يغذي كافة المراحل: تشخيص المشكلة مكانياً ◄ إمداد النموذج بالارتفاعات ◄ توجيه الاستمثال ◄ والسيطرة الميدانية اللحظية"
    p_gp_sub.font.name = FONT_BODY
    p_gp_sub.font.size = Pt(9)
    p_gp_sub.font.color.rgb = COLOR_WHITE
    p_gp_sub.alignment = PP_ALIGN.CENTER

    # Transition Callout
    trans_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(6.45), Inches(11.733), Inches(0.38))
    trans_box.fill.solid()
    trans_box.fill.fore_color.rgb = COLOR_WHITE
    trans_box.line.color.rgb = COLOR_BURGUNDY
    trans_box.line.width = Pt(1)
    p_tr = trans_box.text_frame.paragraphs[0]
    p_tr.text = "الانتقال إلى المحور الثالث: المساهمات البحثية الثلاث للأطروحة [ PLAN: أين نرقي؟  ──►  FAIR: كيف ننصف الريف؟  ──►  CONTROL: كيف نتحكم سيادياً؟ ]"
    p_tr.font.name = FONT_BODY
    p_tr.font.size = Pt(9.5)
    p_tr.font.bold = True
    p_tr.font.color.rgb = COLOR_BURGUNDY
    p_tr.alignment = PP_ALIGN.CENTER

    add_slide_footer(slide, 16)

    # Speaker Notes
    set_full_speaker_notes(slide, {
        "title": "معمارية الانتقال من الفجوة إلى منظومة الحل المقترحة",
        "timeMinutes": "1.5",
        "academic_goals": "تقديم خارطة التدفق المنهجي التي تلخص تسلسل انتقال الأطروحة عبر 4 مراحل هندسية متتابعة، وتؤسس لانطلاق استعراض المساهمات في المحور الثالث.",
        "speech_script": (
            "بهذا السلايد نختتم المحور الثاني ونلخص خارطة الطريق للمحور الثالث القادم.\n"
            "الأطروحة ليست أفكاراً متناثرة أو تجارب معزولة، بل خط أنابيب هندسي متصل:\n"
            "• بدأنا في المرحلة 01 بتشخيص عميق للواقع الوطني وكشف مآزق الكلفة والتهميش والتشويش.\n"
            "• ثم صغنا في المرحلة 02 نموذجاً رياضياً هجيناً يفرض مؤشر العدالة المكانية SFI كقيد إلزامي.\n"
            "• ثم أطلقنا في المرحلة 03 محرك التحسين السربي BPSO المعزز بمشغل إصلاح القيود، محققين 95.12% تغطية وتوفير ملايين الدولارات.\n"
            "• وتوجنا ذلك في المرحلة 04 بمنظومة تحكم ميداني سيادي تنجز العزل البرمجي متعدد الموردين بنجاح >97%.\n"
            "كل هذه المراحل الأربع تقف على أرضية واحدة صلبة: نظم المعلومات الجغرافية GIS.\n"
            "والآن، يشرفني أن أنتقل معكم إلى المحور الثالث، لنستعرض بالتفصيل والأدلة الرياضية المساهمات البحثية الثلاث للأطروحة: PLAN, FAIR, ثم CONTROL."
        ),
        "critical_qa": [
            (
                "تظهر المعمارية تدفقاً خطياً من المرحلة 1 إلى 4، فهل هناك تغذية راجعة (Feedback Loop) بين التحكم في المرحلة 4 والتخطيط في المرحلة 3؟",
                "نعم بالتأكيد، فالمعمارية مصممة كدورة حياة مغلقة (Closed-Loop System). إن مؤشرات الأداء الحية (Live KPIs) التي تجمعها منظومة التحكم في المرحلة 4 (مثل معدلات انقطاع المكالمات ونجاح التسليم) تُعاد تغذيتها كأوزان تشغيلية محدثة إلى محرك الاستمثال في المرحلة 3 ليعيد ضبط زوايا الهوائيات واستطاعة البث، مما يحول الشبكة إلى شبكة ذاتية التنظيم والشفاء (Self-Organizing Network - SON)."
            )
        ]
    })


# ==============================================================================
# MAIN EXECUTION
# ==============================================================================
def main():
    print("=" * 70)
    print("Generating Axis 02 (Slides 10 to 16) Presentation...")
    print("=" * 70)

    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.500)

    # Build Slides
    print("Building Slide 10: Dark Academic Section Marker...")
    build_slide_10(prs)

    print("Building Slide 11: 3D Layered GIS Stack (Pattern 4)...")
    build_slide_11(prs)

    print("Building Slide 12: Quad-KPI Metric Command (Pattern 11)...")
    build_slide_12(prs)

    print("Building Slide 13: Split-Screen High Contrast (Pattern 1)...")
    build_slide_13(prs)

    print("Building Slide 14: Algorithmic Decision Tree (Pattern 7)...")
    build_slide_14(prs)

    print("Building Slide 15: Gap-to-Bridge Matrix (Pattern 10)...")
    build_slide_15(prs)

    print("Building Slide 16: Horizontal Pipeline (Pattern 5)...")
    build_slide_16(prs)

    output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "presentation_axis_02.pptx"))
    prs.save(output_path)
    print(f"\n[SUCCESS] Axis 02 presentation successfully generated at:\n  {output_path}")
    print(f"Total slides generated: {len(prs.slides)}")


if __name__ == "__main__":
    main()
