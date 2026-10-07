import os
import sys
import json
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ==========================================
# COLOR PALETTE
# ==========================================
COLOR_DEEP_TEAL  = RGBColor(66, 129, 119)     # #428177 - Primary Academic Teal
COLOR_DARK_TEAL  = RGBColor(20, 55, 50)       # #143732 - Dark Executive Teal
COLOR_BURGUNDY   = RGBColor(107, 31, 42)      # #6B1F2A - Secondary Academic Red
COLOR_DARK_SLATE = RGBColor(15, 23, 42)       # #0F172A - Deep Slate Background
COLOR_SLATE_CARD = RGBColor(30, 41, 59)       # #1E293B - Dark Mode Card
COLOR_LIGHT_BG   = RGBColor(246, 248, 250)    # Clean warm off-white
COLOR_WHITE      = RGBColor(255, 255, 255)
COLOR_TEXT_DARK  = RGBColor(15, 23, 42)
COLOR_TEXT_MUTED = RGBColor(100, 116, 139)
COLOR_BORDER     = RGBColor(226, 232, 240)
COLOR_GOLD       = RGBColor(217, 119, 6)       # #D97706
COLOR_EMERALD    = RGBColor(16, 185, 129)     # #10B981
COLOR_BLUE       = RGBColor(37, 99, 235)      # #2563EB

FONT_TITLE = "Segoe UI"
FONT_BODY  = "Segoe UI"

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    return prs

def set_slide_background(slide, prs, color):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    return bg

def add_header(slide, title_ar, section_name, slide_num, dark=False):
    # Top badge
    tb_badge = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.7), Inches(0.35))
    tf_badge = tb_badge.text_frame
    tf_badge.word_wrap = True
    p_b = tf_badge.paragraphs[0]
    p_b.text = f"المعهد العالي للعلوم التطبيقية والتكنولوجيا  |  {section_name}"
    p_b.font.name = FONT_BODY
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = COLOR_GOLD if dark else COLOR_DEEP_TEAL
    p_b.alignment = PP_ALIGN.RIGHT

    # Main Title
    tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.7), Inches(0.75))
    tf_title = tb_title.text_frame
    tf_title.word_wrap = True
    p_t = tf_title.paragraphs[0]
    p_t.text = title_ar
    p_t.font.name = FONT_TITLE
    p_t.font.size = Pt(22)
    p_t.font.bold = True
    p_t.font.color.rgb = COLOR_WHITE if dark else COLOR_TEXT_DARK
    p_t.alignment = PP_ALIGN.RIGHT

def add_footer(slide, current_num, total_slides=73, dark=False):
    tb_footer = slide.shapes.add_textbox(Inches(0.8), Inches(6.92), Inches(11.7), Inches(0.35))
    tf = tb_footer.text_frame
    p = tf.paragraphs[0]
    p.text = f"أطروحة دكتوراه: التخطيط والتحكم الذكي بالشبكات الخلوية في بيئة GIS  —  ياسر المفعلاني   |   شريحة {current_num} من {total_slides}"
    p.font.name = FONT_BODY
    p.font.size = Pt(9.5)
    p.font.color.rgb = RGBColor(148, 163, 184) if dark else COLOR_TEXT_MUTED
    p.alignment = PP_ALIGN.RIGHT

def set_speaker_notes(slide, notes_dict):
    if not notes_dict:
        return
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    tf.clear()
    
    title = notes_dict.get("title", "")
    time_min = notes_dict.get("timeMinutes", "")
    points = notes_dict.get("points", [])
    
    p0 = tf.paragraphs[0]
    p0.text = f"=== {title} (الزمن المقترح: {time_min} دقيقة) ==="
    p0.font.bold = True
    
    for pt in points:
        p = tf.add_paragraph()
        p.text = f"• {pt}"

def add_card(slide, left, top, width, height, title, items, bg_color=COLOR_WHITE, border_color=COLOR_BORDER, title_color=COLOR_DEEP_TEAL, is_dark=False):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = bg_color
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1.5)
    else:
        shape.line.fill.background()

    tb = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), height - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True

    if title:
        p_title = tf.paragraphs[0]
        p_title.text = title
        p_title.font.name = FONT_TITLE
        p_title.font.size = Pt(15)
        p_title.font.bold = True
        p_title.font.color.rgb = title_color
        p_title.alignment = PP_ALIGN.RIGHT
        p_title.space_after = Pt(8)

    first = True if not title else False
    for item in items:
        p = tf.paragraphs[0] if first else tf.add_paragraph()
        first = False
        p.text = f"• {item}"
        p.font.name = FONT_BODY
        p.font.size = Pt(12)
        p.font.color.rgb = RGBColor(226, 232, 240) if is_dark else COLOR_TEXT_DARK
        p.alignment = PP_ALIGN.RIGHT
        p.space_after = Pt(4)

def add_kpis(slide, top, kpis, is_dark=False):
    n = len(kpis)
    total_w = 11.7
    gap = 0.25
    card_w = (total_w - (n - 1) * gap) / n
    left_start = 0.8
    
    for i, kpi in enumerate(kpis):
        left = Inches(left_start + i * (card_w + gap))
        h = Inches(1.8)
        
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(card_w), h)
        shape.fill.solid()
        shape.fill.fore_color.rgb = COLOR_SLATE_CARD if is_dark else COLOR_WHITE
        shape.line.color.rgb = kpi.get("color", COLOR_DEEP_TEAL)
        shape.line.width = Pt(2)
        
        tb = slide.shapes.add_textbox(left + Inches(0.1), top + Inches(0.15), Inches(card_w - 0.2), h - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p_val = tf.paragraphs[0]
        p_val.text = kpi.get("val", "")
        p_val.font.name = FONT_TITLE
        p_val.font.size = Pt(24)
        p_val.font.bold = True
        p_val.font.color.rgb = kpi.get("color", COLOR_DEEP_TEAL)
        p_val.alignment = PP_ALIGN.CENTER
        
        p_lbl = tf.add_paragraph()
        p_lbl.text = kpi.get("label", "")
        p_lbl.font.name = FONT_BODY
        p_lbl.font.size = Pt(12)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = COLOR_WHITE if is_dark else COLOR_TEXT_DARK
        p_lbl.alignment = PP_ALIGN.CENTER
        
        if kpi.get("sub"):
            p_sub = tf.add_paragraph()
            p_sub.text = kpi.get("sub", "")
            p_sub.font.name = FONT_BODY
            p_sub.font.size = Pt(9.5)
            p_sub.font.color.rgb = COLOR_GOLD if is_dark else COLOR_TEXT_MUTED
            p_sub.alignment = PP_ALIGN.CENTER

def add_table_custom(slide, left, top, width, height, headers, rows, is_dark=False):
    rows_cnt = len(rows) + 1
    cols_cnt = len(headers)
    table_shape = slide.shapes.add_table(rows_cnt, cols_cnt, left, top, width, height)
    tbl = table_shape.table

    # Header Row
    for col_idx, h_text in enumerate(headers):
        cell = tbl.cell(0, col_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = COLOR_DARK_TEAL if is_dark else COLOR_DEEP_TEAL
        p = cell.text_frame.paragraphs[0]
        p.text = h_text
        p.font.name = FONT_TITLE
        p.font.bold = True
        p.font.size = Pt(12)
        p.font.color.rgb = COLOR_WHITE
        p.alignment = PP_ALIGN.CENTER

    # Data Rows
    for row_idx, r_data in enumerate(rows):
        bg = COLOR_SLATE_CARD if is_dark else (RGBColor(241, 245, 249) if row_idx % 2 == 1 else COLOR_WHITE)
        for col_idx, val in enumerate(r_data):
            cell = tbl.cell(row_idx + 1, col_idx)
            cell.fill.solid()
            cell.fill.fore_color.rgb = bg
            p = cell.text_frame.paragraphs[0]
            p.text = str(val)
            p.font.name = FONT_BODY
            p.font.size = Pt(11)
            p.font.color.rgb = COLOR_WHITE if is_dark else COLOR_TEXT_DARK
            p.alignment = PP_ALIGN.CENTER

# Main Generation Runner
def build_all_slides():
    with open('scripts/parsed_slides.json', 'r', encoding='utf-8') as f:
        notes_db = json.load(f)

    prs = create_presentation()
    blank_layout = prs.slide_layouts[6]

    # Section Names mapping
    def get_section_name(idx):
        if idx in [0, 1]: return "المقدمة والافتتاح"
        elif 2 <= idx <= 9: return "المحور الأول: المقدمة وسياق البحث"
        elif 10 <= idx <= 16: return "المحور الثاني: الدراسات النظرية والمرجعية"
        elif 17 <= idx <= 45: return "المحور الثالث: المساهمات البحثية الأساسية"
        elif 46 <= idx <= 58: return "المحور الرابع: النتائج والأوراق العلمية المنشورة"
        else: return "المحور الخامس: الخاتمة والآفاق المستقبلية"

    print("Building 73 slides...")

    for i in range(73):
        slide_info = notes_db.get(str(i), {})
        title = slide_info.get("title", f"شريحة {i}")
        time_min = slide_info.get("timeMinutes", "1")
        points = slide_info.get("points", [])
        sec_name = get_section_name(i)
        
        slide = prs.slides.add_slide(blank_layout)
        set_speaker_notes(slide, slide_info)

        # ----------------------------------------------------
        # SLIDE 0: COVER SLIDE
        # ----------------------------------------------------
        if i == 0:
            set_slide_background(slide, prs, COLOR_DARK_SLATE)
            
            # Syrian Governorates Top Banner
            tb_inst = slide.shapes.add_textbox(Inches(0.8), Inches(0.6), Inches(11.7), Inches(0.6))
            p_inst = tb_inst.text_frame.paragraphs[0]
            p_inst.text = "الجمهورية العربية السورية  |  المعهد العالي للعلوم التطبيقية والتكنولوجيا (HIAST)  |  قسم المعلوماتية"
            p_inst.font.name = FONT_TITLE
            p_inst.font.size = Pt(13)
            p_inst.font.bold = True
            p_inst.font.color.rgb = COLOR_GOLD
            p_inst.alignment = PP_ALIGN.CENTER
            
            # Badge: PhD Thesis
            badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.5), Inches(1.3), Inches(4.333), Inches(0.55))
            badge.fill.solid()
            badge.fill.fore_color.rgb = COLOR_BURGUNDY
            badge.line.fill.background()
            p_b = badge.text_frame.paragraphs[0]
            p_b.text = "🎓 أطروحة دكتوراه في الهندسة المعلوماتية"
            p_b.font.name = FONT_TITLE
            p_b.font.size = Pt(14)
            p_b.font.bold = True
            p_b.font.color.rgb = COLOR_WHITE
            p_b.alignment = PP_ALIGN.CENTER

            # Main Thesis Title
            tb_t = slide.shapes.add_textbox(Inches(0.8), Inches(2.1), Inches(11.7), Inches(1.8))
            tf_t = tb_t.text_frame
            tf_t.word_wrap = True
            p_t1 = tf_t.paragraphs[0]
            p_t1.text = "التخطيط والتحكم الذكي بالشبكات الخلوية في بيئة نظم المعلومات الجغرافية GIS"
            p_t1.font.name = FONT_TITLE
            p_t1.font.size = Pt(28)
            p_t1.font.bold = True
            p_t1.font.color.rgb = COLOR_WHITE
            p_t1.alignment = PP_ALIGN.CENTER
            
            p_t2 = tf_t.add_paragraph()
            p_t2.text = "Intelligent Planning and Control of Cellular Networks in a GIS Environment"
            p_t2.font.name = FONT_BODY
            p_t2.font.size = Pt(15)
            p_t2.font.color.rgb = COLOR_DEEP_TEAL
            p_t2.alignment = PP_ALIGN.CENTER

            # Author and Supervisors Cards
            add_card(slide, Inches(1.5), Inches(4.2), Inches(4.8), Inches(2.2),
                     "الباحث والدرجة الأكاديمية",
                     [
                         "إعداد المهندس: ياسر المفعلاني",
                         "درجة الدكتوراه في نظم الاتصالات والمعلوماتية",
                         "دراسة ميدانية وتطبيقية على كامل أراضي الجمهورية العربية السورية (79,268 موقعاً)"
                     ],
                     bg_color=COLOR_SLATE_CARD, border_color=COLOR_DEEP_TEAL, title_color=COLOR_GOLD, is_dark=True)

            add_card(slide, Inches(7.0), Inches(4.2), Inches(4.8), Inches(2.2),
                     "لجنة الإشراف العلمي",
                     [
                         "إشراف الأستاذ الدكتور: محمد دكّاك (المعهد العالي للعلوم التطبيقية والتكنولوجيا)",
                         "إشراف الدكتور: كنان الجمعة (المعهد العالي للعلوم التطبيقية والتكنولوجيا)",
                         "العام الأكاديمي: 2026 م"
                     ],
                     bg_color=COLOR_SLATE_CARD, border_color=COLOR_BURGUNDY, title_color=COLOR_GOLD, is_dark=True)
            
            add_footer(slide, 0, 73, dark=True)
            continue

        # ----------------------------------------------------
        # SLIDE 1: AGENDA SLIDE
        # ----------------------------------------------------
        if i == 1:
            set_slide_background(slide, prs, COLOR_LIGHT_BG)
            add_header(slide, "خارطة العرض التقديمي (محاور الأطروحة)", sec_name, i)
            
            axes = [
                ("01", "المقدمة وسياق البحث", "السياق المحلي والدولي، أزمة الشبكة السورية، صياغة الإشكالية وأسئلة البحث", COLOR_DEEP_TEAL),
                ("02", "الدراسات النظرية والمرجعية", "المفاهيم الراديوية، الخوارزميات الذكية، تحديد الفجوة المعرفية العالمية", COLOR_DARK_TEAL),
                ("03", "المساهمات البحثية الثلاث", "C1 التخطيط الأمثل، C2 العدالة المكانية SFI، C3 التحكم والعزل المكاني", COLOR_BURGUNDY),
                ("04", "النتائج والأوراق المنشورة", "التحليل الإحصائي، نتائج المقارنات، والأوراق العلمية (Elsevier Q1)", COLOR_GOLD),
                ("05", "الخاتمة والآفاق المستقبلية", "الدروس المستفادة، خارطة الطريق للجيل السادس، والتوصيات الاستراتيجية", COLOR_EMERALD),
            ]
            
            for idx, (num, ax_title, ax_desc, ax_col) in enumerate(axes):
                left = Inches(0.8 + idx * 2.4)
                shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(2.2), Inches(4.8))
                shape.fill.solid()
                shape.fill.fore_color.rgb = COLOR_WHITE
                shape.line.color.rgb = ax_col
                shape.line.width = Pt(2)
                
                tf = shape.text_frame
                tf.word_wrap = True
                
                p_n = tf.paragraphs[0]
                p_n.text = num
                p_n.font.name = FONT_TITLE
                p_n.font.size = Pt(26)
                p_n.font.bold = True
                p_n.font.color.rgb = ax_col
                p_n.alignment = PP_ALIGN.CENTER
                
                p_t = tf.add_paragraph()
                p_t.text = ax_title
                p_t.font.name = FONT_TITLE
                p_t.font.size = Pt(14)
                p_t.font.bold = True
                p_t.font.color.rgb = COLOR_TEXT_DARK
                p_t.alignment = PP_ALIGN.CENTER
                p_t.space_before = Pt(8)
                p_t.space_after = Pt(12)
                
                p_d = tf.add_paragraph()
                p_d.text = ax_desc
                p_d.font.name = FONT_BODY
                p_d.font.size = Pt(11)
                p_d.font.color.rgb = COLOR_TEXT_MUTED
                p_d.alignment = PP_ALIGN.CENTER
                
            add_footer(slide, 1, 73)
            continue

        # ----------------------------------------------------
        # SECTION MARKERS (Slides 2, 10, 17, 46, 59)
        # ----------------------------------------------------
        if i in [2, 10, 17, 46, 59]:
            set_slide_background(slide, prs, COLOR_DARK_SLATE)
            
            sec_num = "01" if i == 2 else ("02" if i == 10 else ("03" if i == 17 else ("04" if i == 46 else "05")))
            
            # Badge
            badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.666), Inches(1.8), Inches(2.0), Inches(0.6))
            badge.fill.solid()
            badge.fill.fore_color.rgb = COLOR_DEEP_TEAL
            badge.line.fill.background()
            p_b = badge.text_frame.paragraphs[0]
            p_b.text = f"المحور {sec_num}"
            p_b.font.name = FONT_TITLE
            p_b.font.size = Pt(16)
            p_b.font.bold = True
            p_b.font.color.rgb = COLOR_WHITE
            p_b.alignment = PP_ALIGN.CENTER

            # Title
            tb_m = slide.shapes.add_textbox(Inches(1.0), Inches(2.7), Inches(11.333), Inches(1.5))
            tf_m = tb_m.text_frame
            tf_m.word_wrap = True
            p_m = tf_m.paragraphs[0]
            p_m.text = title
            p_m.font.name = FONT_TITLE
            p_m.font.size = Pt(32)
            p_m.font.bold = True
            p_m.font.color.rgb = COLOR_WHITE
            p_m.alignment = PP_ALIGN.CENTER

            # Sub-points card
            if points:
                add_card(slide, Inches(2.2), Inches(4.3), Inches(8.933), Inches(2.2),
                         "النقاط المفتاحية لهذا المحور",
                         points[:4],
                         bg_color=COLOR_SLATE_CARD, border_color=COLOR_GOLD, title_color=COLOR_GOLD, is_dark=True)
            
            add_footer(slide, i, 73, dark=True)
            continue

        # ----------------------------------------------------
        # GENERAL CONTENT SLIDES (Light Executive Theme)
        # ----------------------------------------------------
        set_slide_background(slide, prs, COLOR_LIGHT_BG)
        add_header(slide, title, sec_name, i)

        # Customized content per slide group:
        # Group A: Introduction (3 to 9)
        if 3 <= i <= 9:
            if i == 3: # Why Now
                add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "الدوافع والتحولات العالمية (Global Trends)",
                         [
                             "الانتشار المتسارع لشبكات الجيل الخامس (5G Standalone & Non-Standalone).",
                             "تزايد هائل في كثافة البيانات وخدمات إنترنت الأشياء IoT والمدن الذكية.",
                             "التوجه العالمي نحو خفض البصمة الكربونية (Green Cellular Networks).",
                             "ضرورة الأتمتة المتقدمة للشبكات وعزل الخدمات برمجياً (Network Slicing)."
                         ], title_color=COLOR_BLUE)
                add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "الواقع والتحديات المحلية السورية (Syrian Context)",
                         [
                             "الظروف الاقتصادية الضاغطة ومحدودية الميزانيات الاستثمارية (CapEx/OpEx).",
                             "أزمة حادة في إمدادات الطاقة الكهربائية وتغذية المحطات بالألواح والمولدات.",
                             "شبكة ضخمة تضم 79,268 موقعاً بحاجة لتحديث انتقائي مدروس.",
                             "الاعتماد على الترقية المشتركة (Shared Infrastructure) لخفض النفقات."
                         ], title_color=COLOR_BURGUNDY)
            elif i == 4: # Evolution & Upgrade
                add_card(slide, Inches(0.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "الأجيال السابقة (2G / 3G / 4G)",
                         [
                             "21,356 موقعاً للجيل الثاني (صوت ورسائل وتغطية أساسية).",
                             "27,902 موقعاً للجيل الثالث (بيانات متوسطة المدى).",
                             "30,010 موقعاً للجيل الرابع (النواة الحقيقية للترقية)."
                         ], title_color=COLOR_TEXT_MUTED)
                add_card(slide, Inches(4.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "الترقية الذكية الانتقائية",
                         [
                             "لا حاجة لبناء أبراج جديدة باهظة التكلفة وإزالة الأبراج القائمة.",
                             "الاستفادة القصوى من البنية التحتية والارتفاعات والألياف القائمة.",
                             "ترقية المواقع المؤهلة فقط لتغطية نقاط الطلب المرتفع بحكمة."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(8.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المكاسب التشغيلية والاقتصادية",
                         [
                             "توفير ملايين الدولارات من الميزانية المخصصة للإنشاءات الجديدة.",
                             "تسريع الجدول الزمني لإطلاق خدمات الجيل الخامس بنسبة 70%.",
                             "تقليل التعقيد التشغيلي والتداخل الراديوي بين المواقع المتجاورة."
                         ], title_color=COLOR_GOLD)
            elif i == 5: # Syrian Crisis Data
                add_kpis(slide, Inches(1.8), [
                    {"val": "79,268", "label": "إجمالي المواقع الخلوية", "sub": "MTN + سيريتل", "color": COLOR_DEEP_TEAL},
                    {"val": "62% vs 38%", "label": "توزيع المواقع (حضري / ريفي)", "sub": "فجوة رقمية ملحوظة", "color": COLOR_BURGUNDY},
                    {"val": "30,010", "label": "المواقع المرشحة للترقية", "sub": "أبراج 4G المؤهلة للـ 5G", "color": COLOR_GOLD}
                ])
                add_card(slide, Inches(0.8), Inches(4.0), Inches(5.7), Inches(2.6),
                         "محددات البيئة السورية المقيدة",
                         [
                             "عجز الطاقة وانقطاعات التغذية الكهربائية الطويلة للمحطات.",
                             "محدودية خطوط النقل الميكروية والألياف الضوئية بين المحافظات.",
                             "تدمير أجزاء من البنية التحتية خلال سنوات الأزمة وحاجتها لإعادة البناء."
                         ], title_color=COLOR_BURGUNDY)
                add_card(slide, Inches(6.8), Inches(4.0), Inches(5.7), Inches(2.6),
                         "متطلبات الحل التخطيطي الوطني",
                         [
                             "نمذجة دقيقة تأخذ بالحسبان تضاريس المحافظات الـ 14 عبر GIS.",
                             "استخدام خوارزميات ذكية قادرة على التعامل مع فضاء حلول ضخم.",
                             "ضمان كفاءة الطاقة وتقليل استهلاك المحطات المحدثة قدر الإمكان."
                         ], title_color=COLOR_DEEP_TEAL)
            elif i == 6 or i == 7: # Research Problem & Dimensions
                add_card(slide, Inches(0.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "1. البعد التقني والاستمثالي",
                         [
                             "معضلة الترقية متعددة الأهداف (Multi-Objective).",
                             "الموازنة المعقدة بين: تعظيم التغطية، تقليل الكلفة، وخفض استهلاك الطاقة.",
                             "طبيعة المسألة الرياضية كـ NP-Hard تتطلب استدلالاً فوقياً متطوراً."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(4.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "2. البعد المكاني والتنموي",
                         [
                             "انحياز الخوارزميات التقليدية نحو المدن الكبرى (دمشق، حلب).",
                             "إهمال الأرياف والمناطق الطرفية لضعف الجدوى المالية المباشرة.",
                             "الحاجة لصياغة مؤشر عدالة مكانية (SFI) يفرض توازناً جغرافياً عادلاً."
                         ], title_color=COLOR_BURGUNDY)
                add_card(slide, Inches(8.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "3. البعد التشغيلي والأمني",
                         [
                             "خطورة أجهزة التشويش الراديوي التقليدي على المستشفيات والمدنيين.",
                             "الحاجة لعزل الخدمة برمجياً عبر منظومات متعددة المصنعين (Huawei / Ericsson).",
                             "ضمان الاستعادة السريعة والآمنة للخدمات بعد انتهاء الطوارئ."
                         ], title_color=COLOR_GOLD)
            elif i == 8: # Objectives
                add_card(slide, Inches(0.8), Inches(1.8), Inches(11.7), Inches(1.4),
                         "الهدف العام الاستراتيجي للأطروحة",
                         [
                             "تطوير إطار وطني متكامل وشامل يجمع بين التخطيط الأمثل، العدالة المكانية، والتحكم البرمجي بالشبكة الخلوية في بيئة نظم المعلومات الجغرافية GIS للجمهورية العربية السورية."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(0.8), Inches(3.4), Inches(3.7), Inches(3.2),
                         "الهدف الأول: الاستمثال التقني",
                         [
                             "بناء نموذج تحسين متعدد الأهداف لاختيار مواقع الترقية.",
                             "تطوير خوارزميات BPSO و AGA لمعالجة قيود الميزانية والطاقة."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(4.8), Inches(3.4), Inches(3.7), Inches(3.2),
                         "الهدف الثاني: العدالة المكانية",
                         [
                             "صياغة مؤشر العدالة المكانية SFI.",
                             "ضمان تغطية متوازنة وعادلة للأرياف دون هدر الموارد المتاحة."
                         ], title_color=COLOR_BURGUNDY)
                add_card(slide, Inches(8.8), Inches(3.4), Inches(3.7), Inches(3.2),
                         "الهدف الثالث: التحكم البرمجي",
                         [
                             "ابتكار محرك تقاطع مكاني لعزل الخدمات جغرافياً.",
                             "أوركسترا موحدة تدعم تجهيزات هواوي وإريكسون بفاعلية."
                         ], title_color=COLOR_GOLD)
            elif i == 9: # Questions
                add_card(slide, Inches(0.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "السؤال الأول: أين نرقي؟ (Where to Upgrade?)",
                         [
                             "كيف يمكن تحديد المواقع المثلى للترقية إلى 5G من بين 30,010 موقعاً مرشحاً؟",
                             "ما الخوارزمية الفضلى لتحقيق أقصى تغطية بأقل كلفة واستهلاك طاقة؟"
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(4.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "السؤال الثاني: كيف ننصف الريف؟ (How to Ensure Fairness?)",
                         [
                             "كيف يمكن منع انحياز الخوارزميات الذكية نحو الكثافات السكانية الحضرية فقط؟",
                             "كيف نصوغ رياضياً مؤشراً يقيس ويفرض العدالة المكانية بين المحافظات؟"
                         ], title_color=COLOR_BURGUNDY)
                add_card(slide, Inches(8.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "السؤال الثالث: كيف نتحكم سيادياً؟ (How to Govern Control?)",
                         [
                             "كيف نحقق عزلاً مكانياً دقيقاً للخدمة الخلوية دون اللجوء للتشويش العشوائي؟",
                             "كيف ندير شبكة غير متجانسة تضم تجهيزات هواوي وإريكسون ضمن بيئة GIS؟"
                         ], title_color=COLOR_GOLD)

        # Group B: Theoretical Foundation (11 to 16)
        elif 11 <= i <= 16:
            if i == 11: # Core Concepts
                add_card(slide, Inches(0.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "بنية المحطات القاعدية (BTS / gNodeB)",
                         [
                             "الترددات ومخططات الإشعاع الهوائي وميل الهوائيات (Tilt/Azimuth).",
                             "فصل وحدات الراديو (RRU) عن وحدات معالجة النطاق الأساسي (BBU).",
                             "معمارية الترقية المشتركة ونقل البيانات Backhaul."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(4.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "طبقات الانتشار ثلاثي الأبعاد (3D Propagation)",
                         [
                             "نموذج الارتفاعات الرقمي للجمهورية العربية السورية (DEM).",
                             "طبقات تصنيف استخدامات الأراضي والمباني (Clutter Layers).",
                             "حسابات توهين الإشارة، التظليل، ومسارات خط النظر (LOS / NLOS)."
                         ], title_color=COLOR_BLUE)
                add_card(slide, Inches(8.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "تكامل نظم المعلومات الجغرافية (GIS)",
                         [
                             "التحليل المكاني متعدد الطبقات والتقاطع الهندسي المتقدم.",
                             "ربط خصائص المشتركين والطلب السكاني مع المواقع الجغرافية.",
                             "محاكاة تغطية الخلايا بدقة عالية عبر الإسقاط المكاني WGS84."
                         ], title_color=COLOR_GOLD)
            elif i == 12: # Radio KPIs
                add_kpis(slide, Inches(1.8), [
                    {"val": "RSRP", "label": "قدرة الإشارة المرجعية المستقبلة", "sub": "المعيار الأساسي للتغطية الراديوية", "color": COLOR_DEEP_TEAL},
                    {"val": "SINR", "label": "نسبة الإشارة إلى التداخل والضجيج", "sub": "تحدد جودة القناة ومعدل النقل", "color": COLOR_BLUE},
                    {"val": "Throughput", "label": "معدل تدفق البيانات (Mbps)", "sub": "تجربة المستخدم وسرعة التحميل", "color": COLOR_EMERALD},
                    {"val": "Outage Prob.", "label": "احتمالية انقطاع الخدمة", "sub": "مؤشر موثوقية الاتصال والاستمرارية", "color": COLOR_BURGUNDY}
                ])
                add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                         "دور المؤشرات الراديوية في صياغة توابع الهدف والقيود",
                         [
                             "تم اعتبار عتبة RSRP >= -105 dBm كحد أدنى لاحتساب النقطة الجغرافية مغطاة بخدمة الجيل الخامس.",
                             "تم دمج قيم SINR في دالة اللياقة لضمان أن الترقية لا تؤدي لتداخلات كارثية بين الخلايا المتجاورة.",
                             "المؤشرات الراديوية تمثل الجسر الواصل بين النمذجة النظرية والتحقق الميداني الفعلي للشبكة السورية."
                         ], title_color=COLOR_DEEP_TEAL)
            elif i == 13: # Related Work
                add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "الدراسات والأدبيات العالمية السابقة",
                         [
                             "أبحاث التخطيط الأخضر (Green Cellular Planning): ركزت على خفض الطاقة دون قيود الميزانية.",
                             "أبحاث تخطيط 5G في المدن الذكية: افترضت ميزانيات غير محدودة وألياف ضوئية فائقة.",
                             "أبحاث الخوارزميات التطورية: طبقت GA و PSO على شبكات صغيرة اصطناعية (أقل من 500 موقع)."
                         ], title_color=COLOR_TEXT_MUTED)
                add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "أوجه القصور في الدراسات السابقة",
                         [
                             "إغفال تام لواقع الشبكات في بيئات ما بعد الأزمات والشح الاقتصادي الشديد.",
                             "تجاهل معيار العدالة المكانية وحرمان المناطق الريفية المنهجي لصالح المدن.",
                             "الاعتماد على التشويش الفيزيائي العشوائي للتحكم الأمني بدلاً من التحكم البرمجي."
                         ], title_color=COLOR_BURGUNDY)
            elif i == 14: # Algorithms
                add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "الخوارزمية الجينية التكيفية (Adaptive GA)",
                         [
                             "التمثيل الثنائي للكروموسومات: كل جين يمثل حالة موقع (0 = إبقاء، 1 = ترقية لـ 5G).",
                             "معاملات تقاطع وطفرة متكيفة (Adaptive Pc & Pm) وفق تشتت اللياقة لتجنب الركود.",
                             "قدرة استكشاف واسعة في الفضاء الكلي ولكن ببطء نسبي في التقارب النهائي."
                         ], title_color=COLOR_BLUE)
                add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "خوارزمية سرب الجسيمات الثنائية (Binary PSO)",
                         [
                             "تحديث السرعة المتصلة ثم تحويلها لاحتمالية ثنائية عبر تابع Sigmoid S(v).",
                             "توازن فائق بين الاستكشاف الكلي (Global gbest) والاستثمار المحلي (Personal pbest).",
                             "سرعة تقارب قياسية واستقرار إحصائي متميز عبر 30 تشغيلاً مستقلاً."
                         ], title_color=COLOR_DEEP_TEAL)
            elif i == 15 or i == 16: # Research Gap & Matrix
                headers = ["مجال الفجوة البحثية", "واقع الدراسات العالمية", "حل ومساهمة الأطروحة"]
                rows = [
                    ["تخطيط الترقية المقيدة", "افتراض شبكات جديدة وميزانيات مفتوحة", "نموذج ترقية تشاركي ذكي لـ 30,010 موقعاً سلبياً بأقل كلفة"],
                    ["التوزيع المكاني للتغطية", "انحياز تجاري كامل للمدن وإهمال الريف", "صياغة مؤشر SFI لفرض عدالة التوزيع التنموي والسكاني"],
                    ["التحكم والأمن الميداني", "أجهزة تشويش فيزيائية ضارة وغير منضبطة", "عزل برمجي متعدد المصنعين عبر GIS بنجاح 98.1% واستعادة <10د"]
                ]
                add_table_custom(slide, Inches(0.8), Inches(2.0), Inches(11.7), Inches(4.5), headers, rows)

        # Group C: Contributions (18 to 45)
        elif 18 <= i <= 45:
            if i == 18: # Roadmap
                add_card(slide, Inches(0.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المرحلة 1: التخطيط الأمثل (PLAN)",
                         [
                             "صياغة المسألة كتحسين متعدد الأهداف.",
                             "معالجة قيود الميزانية والطاقة والتغطية.",
                             "خوارزميات BPSO و AGA لمعالجة فضاء 2^30010."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(4.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المرحلة 2: العدالة المكانية (FAIR)",
                         [
                             "اكتشاف فجوة الحرمان الريفي تحت الأمثلية المجردة.",
                             "ابتكار مؤشر العدالة المكانية SFI.",
                             "تحقيق قفزة نوعية في توازن التغطية الوطنية."
                         ], title_color=COLOR_BURGUNDY)
                add_card(slide, Inches(8.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المرحلة 3: التحكم السيادي (CONTROL)",
                         [
                             "الانتقال من التخطيط الساكن إلى التحكم الديناميكي.",
                             "محرك تقاطع مكاني لعزل الخدمة برمجياً.",
                             "أوركسترا متعددة المصنعين (Huawei & Ericsson)."
                         ], title_color=COLOR_GOLD)
            elif i == 19: # Geo Context
                add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "طبوغرافيا وجغرافية المحافظات الـ 14",
                         [
                             "المنطقة الجنوبية: دمشق، ريف دمشق، درعا، السويداء، القنيطرة.",
                             "المنطقة الوسطى والساحلية: حمص، حماة، طرطوس، اللاذقية.",
                             "المنطقة الشمالية والشرقية: حلب، إدلب، الرقة، دير الزور، الحسكة.",
                             "تنوع تضاريسي شاسع بين السلاسل الجبلية، السهول، والبوادي الممتدة."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "تحديات الانتشار والتغذية الميدانية",
                         [
                             "اختلاف حاد في كثافة المستخدمين بين العواصم والأرياف النائية.",
                             "صعوبة مد خطوط الألياف في المناطق الوعرة والاعتماد على الربط اللاسلكي.",
                             "ضرورة وجود نموذج تغطية موحد يأخذ بالحسبان الارتفاعات الرقمية DEM."
                         ], title_color=COLOR_BURGUNDY)
            elif i == 20: # Dataset Pipeline
                add_kpis(slide, Inches(1.8), [
                    {"val": "79,268", "label": "إجمالي المواقع الممسوحة", "sub": "بيانات وطنية واقعية 100%", "color": COLOR_DEEP_TEAL},
                    {"val": "30,010", "label": "فضاء البحث الفعلي", "sub": "أبراج 4G المؤهلة للترقية", "color": COLOR_BLUE},
                    {"val": "2^30010", "label": "حجم فضاء الحالات", "sub": "مسألة NP-Hard مستحيلة بالحل الدقيق", "color": COLOR_BURGUNDY},
                    {"val": "14", "label": "محافظة مغطاة بالكامل", "sub": "إسقاط طبوغرافيا DEM و Clutter", "color": COLOR_GOLD}
                ])
                add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                         "مراحل خط معالجة البيانات المكانية (Spatial Pipeline)",
                         [
                             "تنقية البيانات الميدانية لمشغلي MTN وسيريتل، إزالة التكرار المكاني، وتوحيد الإحداثيات الجغرافية WGS84.",
                             "دمج طبقات الارتفاع الرقمي (DEM) مع طبقات استخدامات الأراضي لتحديد معامل التوهين لكل خلية بدقة.",
                             "تحديد مصفوفة الجوار الراديوي ومواصفات الهوائيات لكل موقع لتغذية محرك الاستمثال والتحكم."
                         ], title_color=COLOR_DEEP_TEAL)
            elif 21 <= i <= 27: # C1 Details
                if i == 23: # Optimization Problem
                    add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "دالة اللياقة متعددة الأهداف (Fitness Function)",
                             [
                                 "Fitness = w1 * Coverage - w2 * Cost - w3 * Energy",
                                 "تعظيم التغطية السكانية والراديوية معاً.",
                                 "تقليل النفقات الرأسمالية والتشغيلية المخصصة للترقية.",
                                 "خفض استهلاك الطاقة الكهربائية للمحطات العاملة."
                             ], title_color=COLOR_DEEP_TEAL)
                    add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "القيود الرياضية الصارمة (Hard Constraints)",
                             [
                                 "قيد الميزانية المالية: مجموع كلفة الأبراج المحدثة <= B_max.",
                                 "قيد عتبة التغطية الراديوية: Coverage >= Cov_min (90%).",
                                 "قيد سعة الربط الخلفي: Backhaul Capacity للربط مع النواة.",
                                 "آلية إصلاح الحلول غير المقبولة (Constraint Repair Heuristic)."
                             ], title_color=COLOR_BURGUNDY)
                elif i == 27: # C1 Key Results
                    add_kpis(slide, Inches(1.8), [
                        {"val": "95.12%", "label": "نسبة التغطية الكلية (BPSO)", "sub": "مقابل 94.91% لـ AGA", "color": COLOR_EMERALD},
                        {"val": "132.8 M$", "label": "التكلفة الاستثمارية", "sub": "وفر 6% مقارنة بـ AGA ($141.2M)", "color": COLOR_DEEP_TEAL},
                        {"val": "78.3 MWh", "label": "استهلاك الطاقة السنوي", "sub": "وفر 5.3% في الطاقة", "color": COLOR_GOLD},
                        {"val": "118 s", "label": "زمن التقارب الحسابي", "sub": "أسرع بنسبة 17% من AGA (142s)", "color": COLOR_BLUE}
                    ])
                    add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                             "الاستنتاجات المحورية للمساهمة الأولى",
                             [
                                 "تفوق خوارزمية BPSO إحصائياً على AGA عبر 30 تشغيلاً مستقلاً بمعنوية p < 0.001.",
                                 "آلية إصلاح القيود المقترحة نجحت في توفير 8.4% من زمن المعالجة عبر تجنب إهدار الحسابات على حلول غير مقبولة.",
                                 "أثبتت النتائج إمكانية توفير تغطية وطنية ممتازة بأقل من نصف كلفة بناء شبكة جديدة بالكامل."
                             ], title_color=COLOR_DEEP_TEAL)
                else:
                    add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "الأسس النظرية والمنهجية",
                             points[:3] if len(points) >= 3 else ["تحليل النمذجة الرياضية", "مقارنة الخوارزميات التطورية", "التحقق من صحة النتائج"],
                             title_color=COLOR_DEEP_TEAL)
                    add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "التحليل والتطبيق الميداني",
                             points[3:6] if len(points) >= 6 else points[1:],
                             title_color=COLOR_BURGUNDY)
            elif 28 <= i <= 34: # C2 Details
                if i == 31: # SFI Formulation
                    add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "الصياغة الرياضية لمؤشر العدالة المكانية SFI",
                             [
                                 "SFI = 1 - [ sum(|Cov_i - Cov_avg|) / (2 * N * Cov_avg) ]",
                                 "المؤشر يأخذ قيماً بين 0 (قمة اللامساواة) و 1 (العدالة التامة).",
                                 "Cov_i تمثل نسبة تغطية المحافظة أو المنطقة i.",
                                 "Cov_avg تمثل متوسط التغطية على المستوى الوطني العام."
                             ], title_color=COLOR_BURGUNDY)
                    add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "دمج SFI في دالة الهدف",
                             [
                                 "Fitness_Fair = Fitness_Orig + lambda * SFI",
                                 "معامل الترجيح lambda يتحكم بمستوى التوازن بين الربحية والعدالة.",
                                 "يمنع الخوارزمية من تكديس الأبراج في دمشق وحلب وترك الأرياف محرومة.",
                                 "أداة رياضية قوية بيد صانع القرار في مرحلة إعادة الإعمار."
                             ], title_color=COLOR_DEEP_TEAL)
                elif i == 34: # C2 Key Results
                    add_kpis(slide, Inches(1.8), [
                        {"val": "0.71", "label": "مؤشر SFI مع BPSO", "sub": "قفزة من 0.42 بدون العدالة", "color": COLOR_EMERALD},
                        {"val": "0.52", "label": "مؤشر SFI مع AGA", "sub": "قفزة من 0.33 بدون العدالة", "color": COLOR_BLUE},
                        {"val": "+36.5%", "label": "نسبة التحسن في العدالة", "sub": "فارق معنوي إحصائياً p < 0.001", "color": COLOR_GOLD},
                        {"val": "95.12%", "label": "الحفاظ على التغطية الكلية", "sub": "تحققت العدالة دون التضحية بالتغطية", "color": COLOR_BURGUNDY}
                    ])
                    add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                             "الأثر التنموي للمساهمة الثانية",
                             [
                                 "ارتفاع نسبة تغطية الأرياف في محافظات درعا، السويداء، والحسكة بنسب تتراوح بين 18% و 26%.",
                                 "إثبات أن فرض العدالة المكانية تطلب زيادة طفيفة جداً في الكلفة (أقل من 1.7%) مع تحقيق مكاسب تنموية هائلة.",
                                 "توفير أول خريطة طريق اتصالاتية لإنصاف المجتمعات الريفية في سوريا."
                             ], title_color=COLOR_DEEP_TEAL)
                else:
                    add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "أبعاد العدالة المكانية",
                             points[:3] if len(points) >= 3 else ["مفهوم العدالة الجغرافية", "الفجوة الرقمية الريفية", "تحليل التوزيع السكاني"],
                             title_color=COLOR_BURGUNDY)
                    add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "الآثار والتطبيق على المحافظات",
                             points[3:6] if len(points) >= 6 else points[1:],
                             title_color=COLOR_DEEP_TEAL)
            elif 35 <= i <= 42: # C3 Details
                if i == 39: # Multi-vendor Arch
                    add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "تجهيزات هواوي (Huawei Infrastructure)",
                             [
                                 "واجهات U2000 / iMaster NCE عبر بروتوكولات REST/NETCONF.",
                                 "التحكم الفوري بمعاملات بث الخلايا وتعطيل الترددات الحساسة.",
                                 "نسبة نجاح الأوركسترا: 98.1% ± 1.1% وسرعة استجابة قياسية."
                             ], title_color=COLOR_BURGUNDY)
                    add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "تجهيزات إريكسون (Ericsson Infrastructure)",
                             [
                                 "واجهات Ericsson Network Manager (ENM) والأوامر الموحدة.",
                                 "كبح تسليم المكالمات (Handover Suppression) نحو منطقة العزل.",
                                 "نسبة نجاح الأوركسترا: 97.4% ± 1.4% واستقرار برمجي متين."
                             ], title_color=COLOR_BLUE)
                elif i == 42: # C3 Key Results
                    add_kpis(slide, Inches(1.8), [
                        {"val": "97.4% - 98.1%", "label": "نسبة نجاح الأوركسترا", "sub": "أداء متقارب وممتاز لكلا المصنعين", "color": COLOR_EMERALD},
                        {"val": "92.0% - 93.2%", "label": "كبح التسليم (Handover)", "sub": "منع الأجهزة من النفاذ لمنطقة العزل", "color": COLOR_BLUE},
                        {"val": "< 5 - 10 min", "label": "زمن الاستعادة المؤتمتة", "sub": "2G: <5د | 3G: <7د | 4G: <10د", "color": COLOR_GOLD},
                        {"val": "97.5%", "label": "دقة العزل الحضري", "sub": "مقابل تسرب 46% في الريف المفتوح", "color": COLOR_BURGUNDY}
                    ])
                    add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                             "الخلاصة الهندسية للمساهمة الثالثة",
                             [
                                 "استبدال كامل وموثوق لأجهزة التشويش الراديوي الضارة بحل برمجي صديق للبيئة وآمن للمدنيين.",
                                 "نجاح الأوركسترا البرمجية في إدارة بيئة هجينة غير متجانسة تضم المشغلين السوريين وكلا المصنعين العالميين.",
                                 "تحديد الحدود التشغيلية الصريحة: العزل فائق الدقة في المدن، بينما يتطلب الريف تدخلاً إضافياً لضبط التسرب الراديوي."
                             ], title_color=COLOR_DEEP_TEAL)
                else:
                    add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "محرك العزل المكاني البرمجي",
                             points[:3] if len(points) >= 3 else ["محرك التقاطع المكاني", "بروتوكولات التنسيق الموحدة", "آليات كبح التغطية"],
                             title_color=COLOR_DEEP_TEAL)
                    add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                             "إجراءات الاستعادة وضمان الخدمة",
                             points[3:6] if len(points) >= 6 else points[1:],
                             title_color=COLOR_GOLD)
            else: # Synthesis 43 to 45
                add_card(slide, Inches(0.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "C1: أين نرقي؟ (Plan)",
                         [
                             "الترقية الذكية لـ 30,010 موقعاً.",
                             "توفير 6% كلفة و 5.3% طاقة عبر BPSO.",
                             "أعلى تغطية وطنية ممكنة (95.12%)."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(4.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "C2: كيف نعدل؟ (Fair)",
                         [
                             "صياغة وتطبيق مؤشر SFI.",
                             "قفزة بالعدالة بنسبة 36.5% (0.71).",
                             "حماية أرياف المحافظات السورية من التهميش."
                         ], title_color=COLOR_BURGUNDY)
                add_card(slide, Inches(8.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "C3: كيف نتحكم؟ (Control)",
                         [
                             "عزل مكاني برمجي بدون تشويش.",
                             "دعم موحد لـ Huawei و Ericsson بنجاح >97%.",
                             "استعادة مؤتمتة آمنة تحت 10 دقائق."
                         ], title_color=COLOR_GOLD)

        # Group D: Results & Publications (47 to 58)
        elif 47 <= i <= 58:
            if i == 47 or i == 48: # Overall Results
                add_kpis(slide, Inches(1.8), [
                    {"val": "95.12%", "label": "نسبة التغطية الراديوية", "sub": "تفوق BPSO على كافة الخوارزميات", "color": COLOR_EMERALD},
                    {"val": "$132.8M", "label": "التكلفة الكلية للترقية", "sub": "وفر 8.4 مليون دولار مقارنة بـ AGA", "color": COLOR_DEEP_TEAL},
                    {"val": "0.71", "label": "مؤشر العدالة المكانية SFI", "sub": "توزيع جغرافي عادل ومتوازن", "color": COLOR_GOLD},
                    {"val": "98.1%", "label": "كفاءة العزل البرمجي", "sub": "أوركسترا متعددة المصنعين", "color": COLOR_BURGUNDY}
                ])
                add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                         "ملخص المؤشرات القياسية الموحدة للأطروحة",
                         [
                             "تم إثبات الجدوى الاقتصادية والتقنية لتحويل شبكة الاتصالات السورية إلى الجيل الخامس دون الحاجة لاستثمارات خيالية.",
                             "أكدت الاختبارات الإحصائية (Wilcoxon Rank-Sum) معنوية كافة الفروق لصالح منهجية البحث بمستوى p < 0.001.",
                             "تكاملت المساهمات الثلاث لتقدم أول منظومة وطنية تجمع التخطيط الراديوي والتوزيع العادل والتحكم السيادي في إطار GIS واحد."
                         ], title_color=COLOR_DEEP_TEAL)
            elif 53 <= i <= 58: # Publications
                if i == 54: # Elsevier Paper
                    add_card(slide, Inches(0.8), Inches(1.8), Inches(11.7), Inches(2.0),
                             "الورقة العلمية الأولى (منشورة) — مجلة Computer Networks (Elsevier)",
                             [
                                 "العنوان: GIS-assisted multi-vendor cellular service isolation for emergency and security scenarios",
                                 "المؤلفون: Yasser Almofaalani, Mohammad Dakkak, Kinan Aljoumaa",
                                 "المجلة: Computer Networks (Elsevier)  |  المجلد: 288 (2026)  |  رقم المقال: 112653",
                                 "التصنيف والأثر: مصنفة Q1 ضمن Scopus و Clarivate (Web of Science)  |  معامل التأثير: 4.4"
                             ], title_color=COLOR_BURGUNDY)
                    add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                             "المساهمة العلمية للورقة الأولى",
                             [
                                 "تقديم أول إطار عمل يعتمد على GIS للعزل المكاني الدقيق للشبكات الخلوية دون استخدام أجهزة التشويش الضارة.",
                                 "برهنة قابلية التشغيل البيني بين أنظمة Huawei و Ericsson عبر بروتوكولات REST/NETCONF الموحدة.",
                                 "إثبات دقة عزل تصل إلى 97.5% في البيئات الحضرية مع آليات استعادة مؤتمتة تلبي معايير الطوارئ الصارمة."
                             ], title_color=COLOR_DEEP_TEAL)
                elif i == 55: # Paper 2 Under Review
                    add_card(slide, Inches(0.8), Inches(1.8), Inches(11.7), Inches(2.0),
                             "الورقة العلمية الثانية (قيد التحكيم) — مجلة دولية محكمة Q1",
                             [
                                 "العنوان: Optimizing 5G Deployment in Resource-Constrained Environments: A Real-World Multi-Criteria Optimization Study Using GA and PSO",
                                 "المؤلفون: Yasser Almofaalani, Mohammad Dakkak, Kinan Aljoumaa",
                                 "الحالة: قيد التحكيم (Under Review) في إحدى كبرى المجلات الدولية المحكمة",
                                 "المجال: هندسة الاتصالات، الاستمثال الذكي، والتخطيط في البيئات المقيدة بالموارد"
                             ], title_color=COLOR_BLUE)
                    add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                             "المساهمة العلمية للورقة الثانية",
                             [
                                 "صياغة المسألة متعددة المعايير (تغطية، كلفة، طاقة) للترقية الانتقائية في بيئة مقيدة الموارد كالحالة السورية.",
                                 "مقارنة خوارزميات BPSO و AGA على شبكة تضم 79,268 موقعاً وإثبات تفوق BPSO في سرعة التقارب والوفر المالي.",
                                 "تقديم نموذج لتوفير الطاقة في المحطات الخلوية يسهم في تقليل البصمة الكربونية للشبكة."
                             ], title_color=COLOR_DEEP_TEAL)
                elif i == 56: # Paper 3 Under Review
                    add_card(slide, Inches(0.8), Inches(1.8), Inches(11.7), Inches(2.0),
                             "الورقة العلمية الثالثة (قيد التحكيم) — مجلة دولية محكمة Q1",
                             [
                                 "العنوان: A Hybrid Optimization Framework for Phased 5G Upgrade Planning in Multi-Generation Cellular Networks: A Case Study of Syria",
                                 "المؤلفون: Yasser Almofaalani, Mohammad Dakkak, Kinan Aljoumaa",
                                 "الحالة: قيد التحكيم (Under Review)",
                                 "المجال: التخطيط المرحلي للترقية التشاركية، والعدالة المكانية SFI في شبكات الاتصالات متعددة الأجيال"
                             ], title_color=COLOR_GOLD)
                    add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                             "المساهمة العلمية للورقة الثالثة",
                             [
                                 "ابتكار مؤشر العدالة المكانية SFI ودمجه في دالة الهدف لمنع تهميش المناطق الريفية والأطراف.",
                                 "تقديم خطة ترقية مرحلية على 3 مراحل تراعي الأولويات الاستراتيجية والاقتصادية للمحافظات السورية.",
                                 "إثبات أن التخطيط المنصف جغرافياً لا يكلف سوى زيادة ضئيلة في الميزانية مع عوائد اجتماعية واقتصادية بالغة الأهمية."
                             ], title_color=COLOR_DEEP_TEAL)
                else: # Publications Overview / Map
                    headers = ["الورقة العلمية", "المجلة والناشر", "التصنيف", "فصل الأطروحة المقابل", "الحالة"]
                    rows = [
                        ["GIS Service Isolation", "Computer Networks (Elsevier)", "Q1 (IF: 4.4)", "الفصل السادس (التحكم والعزل)", "منشورة (2026)"],
                        ["5G Deployment Optimization", "IEEE / Elsevier Journal", "Q1 Candidate", "الفصل الرابع (التخطيط والاستمثال)", "قيد التحكيم"],
                        ["Hybrid Framework & Fairness", "Telecommunications Journal", "Q1 Candidate", "الفصل الخامس (العدالة المكانية)", "قيد التحكيم"]
                    ]
                    add_table_custom(slide, Inches(0.8), Inches(2.0), Inches(11.7), Inches(4.5), headers, rows)
            else:
                add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "التحليل الإحصائي للنتائج",
                         points[:3] if len(points) >= 3 else ["نتائج التجارب الحسابية", "دلالات التوزيع الإحصائي", "منحنيات التقارب والتكرار"],
                         title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "الدروس والتطبيقات الهندسية",
                         points[3:6] if len(points) >= 6 else points[1:],
                         title_color=COLOR_BURGUNDY)

        # Group E: Conclusion & Outlook (60 to 72)
        else:
            if i == 72: # Final Closing Slide
                set_slide_background(slide, prs, COLOR_DARK_SLATE)
                
                tb_cl = slide.shapes.add_textbox(Inches(1.0), Inches(1.5), Inches(11.333), Inches(1.5))
                tf_cl = tb_cl.text_frame
                tf_cl.word_wrap = True
                p_c1 = tf_cl.paragraphs[0]
                p_c1.text = "شاكراً لكم حسن الاستماع والاهتمام"
                p_c1.font.name = FONT_TITLE
                p_c1.font.size = Pt(32)
                p_c1.font.bold = True
                p_c1.font.color.rgb = COLOR_GOLD
                p_c1.alignment = PP_ALIGN.CENTER
                
                p_c2 = tf_cl.add_paragraph()
                p_c2.text = "وأنقل خالص الشكر والامتنان للسادة أعضاء لجنة الحكم والمشرفين الكرام"
                p_c2.font.name = FONT_BODY
                p_c2.font.size = Pt(18)
                p_c2.font.color.rgb = COLOR_WHITE
                p_c2.alignment = PP_ALIGN.CENTER
                p_c2.space_before = Pt(10)

                add_card(slide, Inches(2.2), Inches(3.4), Inches(8.933), Inches(3.2),
                         "جاهز لأسئلة وملاحظات السادة المحكمين الكرام",
                         [
                             "الباحث: المهندس ياسر المفعلاني",
                             "المشرفون: أ.د. محمد دكّاك — د. كادان الجمعة",
                             "المعهد العالي للعلوم التطبيقية والتكنولوجيا (HIAST) — قسم المعلوماتية",
                             "دمشق، الجمهورية العربية السورية — 2026 م"
                         ], bg_color=COLOR_SLATE_CARD, border_color=COLOR_DEEP_TEAL, title_color=COLOR_GOLD, is_dark=True)
                
                add_footer(slide, 72, 73, dark=True)
                continue
            elif i == 60 or i == 61: # Synthesis & 3 Contributions
                add_card(slide, Inches(0.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المساهمة الأولى: التخطيط الأمثل",
                         [
                             "حل معضلة الترقية لـ 30,010 موقعاً خلوياً.",
                             "نموذج تحسين متعدد الأهداف (تغطية، كلفة، طاقة).",
                             "تفوق BPSO بتغطية 95.12% وتوفير 6% كلفة."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(4.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المساهمة الثانية: العدالة المكانية",
                         [
                             "ابتكار مؤشر SFI لإنصاف الأرياف السورية.",
                             "رفع مؤشر العدالة إلى 0.71 بنسبة تحسن 36.5%.",
                             "تطبيق ناجح على محافظات الجنوب والشمال والشرق."
                         ], title_color=COLOR_BURGUNDY)
                add_card(slide, Inches(8.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المساهمة الثالثة: التحكم السيادي",
                         [
                             "عزل مكاني برمجي موحد لتجهيزات Huawei و Ericsson.",
                             "نسبة نجاح 98.1% واستعادة مؤتمتة تحت 10 دقائق.",
                             "بديل تقني راقٍ يلغي أضرار التشويش العشوائي."
                         ], title_color=COLOR_GOLD)
            elif i == 67 or i == 68: # Future Roadmap
                add_card(slide, Inches(0.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المدى القريب (1 - 2 سنة)",
                         [
                             "تطبيق الإطار المقترح تجريبياً على محافظة دمشق وريفها.",
                             "ربط محرك العزل المكاني بأنظمة إدارة الطوارئ الوطنية.",
                             "دمج مؤشرات جودة التجربة الفعلية للمشتركين (QoE)."
                         ], title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(4.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المدى المتوسط (3 - 5 سنوات)",
                         [
                             "توسيع النموذج ليشمل الشبكات غير الأرضية (NTN) والأقمار الصناعية.",
                             "الانتقال نحو معمارية النفاذ الراديوي المفتوح (Open RAN).",
                             "تطبيق خوارزميات التعلم المعزز العميق (DRL) للإدارة الذاتية."
                         ], title_color=COLOR_BLUE)
                add_card(slide, Inches(8.8), Inches(1.8), Inches(3.7), Inches(4.8),
                         "المدى البعيد (5 - 10 سنوات)",
                         [
                             "التأسيس لبنية الجيل السادس (6G) والشبكات الصفرية الطاقة (Zero-Energy).",
                             "التكامل الشامل مع أسطول المركبات الذكية وإنترنت الأشياء الواسع.",
                             "السيادة الرقمية الكاملة على طبقات البرمجيات والعتاد الوطني."
                         ], title_color=COLOR_GOLD)
            elif i == 70: # Final Takeaways
                add_kpis(slide, Inches(1.8), [
                    {"val": "علمي", "label": "ابتكار منهجي أصيل", "sub": "دمج GIS مع AI والتحكم", "color": COLOR_DEEP_TEAL},
                    {"val": "تطبيقي", "label": "حل وطني واقعي", "sub": "79,268 موقعاً حقيقياً", "color": COLOR_BURGUNDY},
                    {"val": "تنموي", "label": "إنصاف الأرياف (SFI)", "sub": "رأب الفجوة الرقمية الوطنية", "color": COLOR_GOLD},
                    {"val": "سيادي", "label": "عزل برمجي آمن", "sub": "حماية بدون تشويش ضار", "color": COLOR_EMERALD}
                ])
                add_card(slide, Inches(0.8), Inches(4.0), Inches(11.7), Inches(2.6),
                         "الرسائل الختامية للدفاع الأكاديمي",
                         [
                             "الأطروحة لم تقدم نماذج نظرية معزولة، بل قدمت حلاً هندسياً شاملاً وقابلاً للتطبيق الفوري في سوريا.",
                             "النشر في مجلة Computer Networks المرموقة (Elsevier Q1) يمثل شهادة عالمية على أصالة المنهجية ورصانتها.",
                             "المنظومة تمثل بنية تحتية برمجية تدعم جهود إعادة الإعمار وبناء شبكة اتصالات وطنية متقدمة ومنصفة."
                         ], title_color=COLOR_DEEP_TEAL)
            else:
                add_card(slide, Inches(0.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "الخلاصات والتوصيات الرئيسية",
                         points[:3] if len(points) >= 3 else ["التركيب البحثي", "الأثر العلمي للأطروحة", "التوصيات الهندسية المباشرة"],
                         title_color=COLOR_DEEP_TEAL)
                add_card(slide, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8),
                         "الآفاق المستقبلية والتوسع",
                         points[3:6] if len(points) >= 6 else points[1:],
                         title_color=COLOR_BURGUNDY)

        add_footer(slide, i, 73)

    output_path = "presentation_powerpoint_phd_defense.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path} (Total Slides: {len(prs.slides)})")

if __name__ == "__main__":
    build_all_slides()

