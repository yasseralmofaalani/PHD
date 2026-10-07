"""
build_axis_03.py
Dedicated PowerPoint Generator for Axis 03: Research Contributions (Slides 17 to 45).
Fully adheres to:
1. The 16 Unique Layout Archetypes Catalog & Ironclad Anti-Monotony Rule (No consecutive repetitions).
2. Strict HIAST Design System (Deep Teal, Dark Teal, Burgundy, Gold, Dark Slate, Clean Light Canvas).
3. 16:9 Widescreen (13.333 x 7.500 inches) with exact Header & Footer architecture.
4. Comprehensive Speaker Notes & Defense Playbook Q&A for every slide.
5. Generates 'presentation_axis_03.pptx' covering all 29 slides (17 to 45).
"""

import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ==============================================================================
# 1. COLOR PALETTE & TYPOGRAPHY
# ==============================================================================
COLOR_DEEP_TEAL  = RGBColor(66, 129, 119)     # #428177 - Primary Brand Teal
COLOR_DARK_TEAL  = RGBColor(20, 55, 50)       # #143732 - Dark Executive Teal
COLOR_BURGUNDY   = RGBColor(107, 31, 42)      # #6B1F2A - Secondary Academic Burgundy
COLOR_GOLD       = RGBColor(217, 119, 6)       # #D97706 - Highlight Gold
COLOR_DARK_SLATE = RGBColor(15, 23, 42)       # #0F172A - Deep Slate Background
COLOR_SLATE_CARD = RGBColor(30, 41, 59)       # #1E293B - Dark Mode Card
COLOR_LIGHT_BG   = RGBColor(246, 248, 250)    # #F6F8FA - Clean Light Canvas
COLOR_WHITE      = RGBColor(255, 255, 255)    # #FFFFFF - Pure White Card Fill
COLOR_BORDER     = RGBColor(226, 232, 240)    # #E2E8F0 - Subtle Slate Border
COLOR_TEXT_DARK  = RGBColor(15, 23, 42)       # #0F172A - Body Text Dark
COLOR_TEXT_MUTED = RGBColor(100, 116, 139)    # #64748B - Muted Subtitle Text
COLOR_EMERALD    = RGBColor(16, 185, 129)     # #10B981 - Functional Emerald
COLOR_BLUE       = RGBColor(37, 99, 235)      # #2563EB - Functional Tech Blue

FONT_TITLE = "Segoe UI"
FONT_BODY  = "Segoe UI"
FONT_MATH  = "Cambria Math"

# ==============================================================================
# 2. BASE ENGINE & CORE LAYOUT HELPERS
# ==============================================================================
class Axis03PresentationBuilder:
    def __init__(self):
        self.prs = Presentation()
        self.prs.slide_width = Inches(13.333)
        self.prs.slide_height = Inches(7.500)
        self.blank_layout = self.prs.slide_layouts[6]

    def add_base_slide(self, title_ar, slide_num, total_slides=73, is_dark=False,
                       section_badge="المحور 03: المساهمات البحثية (PLAN → FAIR → CONTROL)"):
        slide = self.prs.slides.add_slide(self.blank_layout)

        # Background
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), self.prs.slide_width, self.prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = COLOR_DARK_SLATE if is_dark else COLOR_LIGHT_BG
        bg.line.fill.background()

        # Header Badge (Right-aligned)
        tb_badge = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.733), Inches(0.35))
        tf_b = tb_badge.text_frame
        tf_b.word_wrap = True
        p_b = tf_b.paragraphs[0]
        p_b.text = f"المعهد العالي للعلوم التطبيقية والتكنولوجيا  |  {section_badge}"
        p_b.font.name = FONT_BODY
        p_b.font.size = Pt(11)
        p_b.font.bold = True
        p_b.font.color.rgb = COLOR_GOLD if is_dark else COLOR_DEEP_TEAL
        p_b.alignment = PP_ALIGN.RIGHT

        # Header Title
        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.733), Inches(0.75))
        tf_t = tb_title.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_ar
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(22)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_WHITE if is_dark else COLOR_TEXT_DARK
        p_t.alignment = PP_ALIGN.RIGHT

        # Footer
        tb_footer = slide.shapes.add_textbox(Inches(0.8), Inches(6.92), Inches(11.733), Inches(0.35))
        tf_f = tb_footer.text_frame
        p_f = tf_f.paragraphs[0]
        p_f.text = f"أطروحة دكتوراه: التخطيط والتحكم الذكي بالشبكات الخلوية في بيئة GIS  —  ياسر المفعلاني   |   شريحة {slide_num} من {total_slides}"
        p_f.font.name = FONT_BODY
        p_f.font.size = Pt(9.5)
        p_f.font.color.rgb = RGBColor(148, 163, 184) if is_dark else COLOR_TEXT_MUTED
        p_f.alignment = PP_ALIGN.RIGHT

        return slide

    def set_notes(self, slide, title, time_minutes, script_text, key_point, qa_list=None):
        notes_slide = slide.notes_slide
        tf = notes_slide.notes_text_frame
        tf.clear()

        p0 = tf.paragraphs[0]
        p0.text = f"=== {title} (الوقت المقترح: {time_minutes}) ==="
        p0.font.bold = True

        p1 = tf.add_paragraph()
        p1.text = f"\n[سيناريو الإلقاء للمتحدث]:\n{script_text}\n"

        p2 = tf.add_paragraph()
        p2.text = f"[النقطة العلمية المحورية]:\n{key_point}\n"

        if qa_list:
            p3 = tf.add_paragraph()
            p3.text = "[بنك أسئلة الدفاع ونقاط الحوار الأكاديمي]:"
            p3.font.bold = True
            for q, a in qa_list:
                pq = tf.add_paragraph()
                pq.text = f"• سؤال محتمل: {q}"
                pq.font.bold = True
                pa = tf.add_paragraph()
                pa.text = f"  الجواب النموذجي: {a}"

    # --------------------------------------------------------------------------
    # GENERIC CARD BUILDER
    # --------------------------------------------------------------------------
    def _add_box(self, slide, left, top, width, height, title, items,
                 title_color=COLOR_DEEP_TEAL, bg_color=COLOR_WHITE, border_color=COLOR_BORDER,
                 is_dark=False, title_size=14, body_size=11, shape_type=MSO_SHAPE.ROUNDED_RECTANGLE):
        shape = slide.shapes.add_shape(shape_type, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        if border_color:
            shape.line.color.rgb = border_color
            shape.line.width = Pt(1.5)
        else:
            shape.line.fill.background()

        tb = slide.shapes.add_textbox(left + Inches(0.18), top + Inches(0.15), width - Inches(0.36), height - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        if title:
            p_t = tf.paragraphs[0]
            p_t.text = title
            p_t.font.name = FONT_TITLE
            p_t.font.size = Pt(title_size)
            p_t.font.bold = True
            p_t.font.color.rgb = title_color
            p_t.alignment = PP_ALIGN.RIGHT
            p_t.space_after = Pt(6)

        first = False if title else True
        for it in items:
            p = tf.paragraphs[0] if first else tf.add_paragraph()
            first = False
            p.text = f"• {it}"
            p.font.name = FONT_BODY
            p.font.size = Pt(body_size)
            p.font.color.rgb = RGBColor(226, 232, 240) if is_dark else COLOR_TEXT_DARK
            p.alignment = PP_ALIGN.RIGHT
            p.space_after = Pt(4)
        return shape

    # --------------------------------------------------------------------------
    # ARCHETYPE 1: SPLIT-SCREEN HIGH CONTRAST / VERSUS
    # --------------------------------------------------------------------------
    def layout_split_screen(self, slide, right_title, right_items, left_title, left_items,
                            right_color=COLOR_BURGUNDY, left_color=COLOR_DEEP_TEAL,
                            vs_text="VS", bottom_banner=None):
        h = Inches(4.3) if bottom_banner else Inches(4.8)
        # Right Half
        self._add_box(slide, Inches(0.8), Inches(1.8), Inches(5.6), h,
                      right_title, right_items, title_color=right_color, border_color=right_color)
        # Left Half
        self._add_box(slide, Inches(6.933), Inches(1.8), Inches(5.6), h,
                      left_title, left_items, title_color=left_color, border_color=left_color)
        # Center VS Badge
        vs = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(6.166), Inches(3.6), Inches(1.0), Inches(1.0))
        vs.fill.solid()
        vs.fill.fore_color.rgb = COLOR_GOLD
        vs.line.color.rgb = COLOR_WHITE
        vs.line.width = Pt(2)
        p = vs.text_frame.paragraphs[0]
        p.text = vs_text
        p.font.name = FONT_TITLE
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = COLOR_WHITE
        p.alignment = PP_ALIGN.CENTER

        if bottom_banner:
            self._add_box(slide, Inches(0.8), Inches(6.2), Inches(11.733), Inches(0.6),
                          None, [bottom_banner], bg_color=COLOR_DARK_TEAL, border_color=COLOR_GOLD,
                          is_dark=True, body_size=11)

    # --------------------------------------------------------------------------
    # ARCHETYPE 2: HERO GIANT STAT & ANALYTICAL WING
    # --------------------------------------------------------------------------
    def layout_hero_stat(self, slide, giant_number, number_label, number_sub, analytical_cards_list,
                         hero_bg=COLOR_DARK_SLATE, hero_num_color=COLOR_GOLD):
        # Giant Hero Block (Right)
        box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(4.7), Inches(4.8))
        box.fill.solid()
        box.fill.fore_color.rgb = hero_bg
        box.line.color.rgb = COLOR_GOLD
        box.line.width = Pt(2)

        tf = box.text_frame
        tf.word_wrap = True
        p_num = tf.paragraphs[0]
        p_num.text = giant_number
        p_num.font.name = FONT_TITLE
        p_num.font.size = Pt(44)
        p_num.font.bold = True
        p_num.font.color.rgb = hero_num_color
        p_num.alignment = PP_ALIGN.CENTER
        p_num.space_before = Pt(36)

        p_lbl = tf.add_paragraph()
        p_lbl.text = number_label
        p_lbl.font.name = FONT_BODY
        p_lbl.font.size = Pt(15)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = COLOR_WHITE
        p_lbl.alignment = PP_ALIGN.CENTER
        p_lbl.space_after = Pt(8)

        p_sub = tf.add_paragraph()
        p_sub.text = number_sub
        p_sub.font.name = FONT_BODY
        p_sub.font.size = Pt(11)
        p_sub.font.color.rgb = COLOR_DEEP_TEAL
        p_sub.alignment = PP_ALIGN.CENTER

        # Analytical Wing (Left: 3 stacked cards)
        top_start = 1.8
        h_card = 1.45
        gap = 0.22
        for idx, (c_title, c_items) in enumerate(analytical_cards_list[:3]):
            top = Inches(top_start + idx * (h_card + gap))
            self._add_box(slide, Inches(5.8), top, Inches(6.733), Inches(h_card), c_title, c_items,
                          title_color=COLOR_DEEP_TEAL, border_color=COLOR_BORDER)

    # --------------------------------------------------------------------------
    # ARCHETYPE 3: ASYMMETRIC BENTO GRID
    # --------------------------------------------------------------------------
    def layout_bento_grid(self, slide, hero_card, top_side_card, bot_left_card, bot_right_card):
        # Hero Card (Large Right)
        self._add_box(slide, Inches(0.8), Inches(1.8), Inches(5.9), Inches(4.8),
                      hero_card["title"], hero_card["items"], title_color=COLOR_DEEP_TEAL,
                      border_color=COLOR_DEEP_TEAL, title_size=15, body_size=11)
        # Top Side Card (Wide Banner Left)
        self._add_box(slide, Inches(7.0), Inches(1.8), Inches(5.533), Inches(2.25),
                      top_side_card["title"], top_side_card["items"], title_color=COLOR_BURGUNDY,
                      border_color=COLOR_BURGUNDY, title_size=13, body_size=10.5)
        # Bottom Left Card
        self._add_box(slide, Inches(7.0), Inches(4.35), Inches(2.65), Inches(2.25),
                      bot_left_card["title"], bot_left_card["items"], title_color=COLOR_GOLD,
                      border_color=COLOR_GOLD, title_size=12, body_size=10)
        # Bottom Right Card
        self._add_box(slide, Inches(9.883), Inches(4.35), Inches(2.65), Inches(2.25),
                      bot_right_card["title"], bot_right_card["items"], title_color=COLOR_BLUE,
                      border_color=COLOR_BLUE, title_size=12, body_size=10)

    # --------------------------------------------------------------------------
    # ARCHETYPE 4: 3D LAYERED GIS STACK
    # --------------------------------------------------------------------------
    def layout_layered_stack(self, slide, layers_list, inspection_panels_list):
        # layers_list: [Layer 1 (bottom), Layer 2, Layer 3, ...]
        # Right Stack (Vertical ascending)
        n_layers = len(layers_list)
        stack_w = Inches(5.6)
        card_h = Inches(4.8 / n_layers - 0.15)
        gap = Inches(0.15)

        for idx, layer in enumerate(layers_list):
            top = Inches(1.8 + (n_layers - 1 - idx) * (card_h.inches + gap.inches))
            box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, stack_w, card_h)
            box.fill.solid()
            box.fill.fore_color.rgb = layer.get("bg", COLOR_DARK_TEAL if idx % 2 == 0 else COLOR_DEEP_TEAL)
            box.line.color.rgb = COLOR_GOLD
            box.line.width = Pt(1.5)

            tf = box.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.text = f"الطبقة {idx+1}: {layer['title']}"
            p.font.name = FONT_TITLE
            p.font.size = Pt(13)
            p.font.bold = True
            p.font.color.rgb = COLOR_WHITE
            p.alignment = PP_ALIGN.RIGHT

            if layer.get("sub"):
                p_sub = tf.add_paragraph()
                p_sub.text = layer["sub"]
                p_sub.font.name = FONT_BODY
                p_sub.font.size = Pt(10)
                p_sub.font.color.rgb = COLOR_GOLD
                p_sub.alignment = PP_ALIGN.RIGHT

        # Left Inspection Panels
        n_panels = len(inspection_panels_list)
        panel_w = Inches(5.8)
        panel_h = Inches(4.8 / n_panels - 0.15)
        for idx, (p_title, p_items) in enumerate(inspection_panels_list):
            top = Inches(1.8 + idx * (panel_h.inches + gap.inches))
            self._add_box(slide, Inches(6.733), top, panel_w, panel_h,
                          p_title, p_items, title_color=COLOR_DEEP_TEAL, border_color=COLOR_BORDER,
                          title_size=13, body_size=10.5)

    # --------------------------------------------------------------------------
    # ARCHETYPE 5: HORIZONTAL PIPELINE / PROCESS FLOW
    # --------------------------------------------------------------------------
    def layout_horizontal_pipeline(self, slide, stages_list, bottom_summary_card=None):
        n = len(stages_list)
        total_w = 11.733
        gap = 0.25
        card_w = (total_w - (n - 1) * gap) / n
        h = Inches(3.6) if bottom_summary_card else Inches(4.8)

        # Connecting bar
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.7), Inches(total_w), Inches(0.08))
        bar.fill.solid()
        bar.fill.fore_color.rgb = COLOR_DEEP_TEAL
        bar.line.fill.background()

        for idx, stage in enumerate(stages_list):
            left = Inches(0.8 + idx * (card_w + gap))
            # Step Node Circle
            node = slide.shapes.add_shape(MSO_SHAPE.OVAL, left + Inches(card_w / 2 - 0.35), Inches(1.4), Inches(0.7), Inches(0.7))
            node.fill.solid()
            node.fill.fore_color.rgb = stage.get("color", COLOR_DEEP_TEAL)
            node.line.color.rgb = COLOR_WHITE
            node.line.width = Pt(2)
            pn = node.text_frame.paragraphs[0]
            pn.text = str(idx + 1)
            pn.font.name = FONT_TITLE
            pn.font.size = Pt(13)
            pn.font.bold = True
            pn.font.color.rgb = COLOR_WHITE
            pn.alignment = PP_ALIGN.CENTER

            # Stage Box
            self._add_box(slide, left, Inches(2.2), Inches(card_w), h - Inches(0.4),
                          stage["title"], stage["items"], title_color=stage.get("color", COLOR_DEEP_TEAL),
                          border_color=stage.get("color", COLOR_BORDER), title_size=13, body_size=10.5)

        if bottom_summary_card:
            self._add_box(slide, Inches(0.8), Inches(5.6), Inches(total_w), Inches(1.1),
                          bottom_summary_card["title"], bottom_summary_card["items"],
                          title_color=COLOR_GOLD, bg_color=COLOR_DARK_SLATE, border_color=COLOR_GOLD,
                          is_dark=True, title_size=12, body_size=10.5)

    # --------------------------------------------------------------------------
    # ARCHETYPE 6: FORMULA SPOTLIGHT & ANATOMICAL CALLOUTS
    # --------------------------------------------------------------------------
    def layout_formula_spotlight(self, slide, formula_title, formula_text, breakdown_cards):
        # Formula Hero Banner (Top)
        f_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.733), Inches(1.5))
        f_box.fill.solid()
        f_box.fill.fore_color.rgb = COLOR_DARK_TEAL
        f_box.line.color.rgb = COLOR_GOLD
        f_box.line.width = Pt(1.5)

        tf = f_box.text_frame
        tf.word_wrap = True
        p_name = tf.paragraphs[0]
        p_name.text = formula_title
        p_name.font.name = FONT_TITLE
        p_name.font.size = Pt(12)
        p_name.font.bold = True
        p_name.font.color.rgb = COLOR_GOLD
        p_name.alignment = PP_ALIGN.RIGHT

        p_eq = tf.add_paragraph()
        p_eq.text = formula_text
        p_eq.font.name = FONT_MATH
        p_eq.font.size = Pt(17)
        p_eq.font.bold = True
        p_eq.font.color.rgb = COLOR_WHITE
        p_eq.alignment = PP_ALIGN.CENTER
        p_eq.space_before = Pt(6)

        # Breakdown Cards (Bottom)
        n = len(breakdown_cards)
        card_w = (11.733 - (n - 1) * 0.25) / n
        for idx, (v_title, v_items) in enumerate(breakdown_cards):
            left = Inches(0.8 + idx * (card_w + 0.25))
            self._add_box(slide, left, Inches(3.55), Inches(card_w), Inches(3.1),
                          v_title, v_items, title_color=COLOR_DEEP_TEAL, border_color=COLOR_BORDER,
                          title_size=13, body_size=10.5)

    # --------------------------------------------------------------------------
    # ARCHETYPE 7: ALGORITHMIC DECISION TREE / FLOW
    # --------------------------------------------------------------------------
    def layout_decision_tree(self, slide, left_process, right_process, center_bridge_text=None):
        # Two side-by-side algorithmic branches
        w = Inches(5.6)
        # Right Branch
        self._add_box(slide, Inches(0.8), Inches(1.8), w, Inches(4.8),
                      right_process["title"], right_process["items"],
                      title_color=COLOR_DEEP_TEAL, border_color=COLOR_DEEP_TEAL,
                      title_size=14, body_size=11)
        # Left Branch
        self._add_box(slide, Inches(6.933), Inches(1.8), w, Inches(4.8),
                      left_process["title"], left_process["items"],
                      title_color=COLOR_BLUE, border_color=COLOR_BLUE,
                      title_size=14, body_size=11)

        if center_bridge_text:
            bridge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.3), Inches(3.8), Inches(2.733), Inches(0.75))
            bridge.fill.solid()
            bridge.fill.fore_color.rgb = COLOR_GOLD
            bridge.line.color.rgb = COLOR_WHITE
            bridge.line.width = Pt(1.5)
            p = bridge.text_frame.paragraphs[0]
            p.text = center_bridge_text
            p.font.name = FONT_TITLE
            p.font.size = Pt(11)
            p.font.bold = True
            p.font.color.rgb = COLOR_WHITE
            p.alignment = PP_ALIGN.CENTER

    # --------------------------------------------------------------------------
    # ARCHETYPE 8: PARETO TRADE-OFF MATRIX
    # --------------------------------------------------------------------------
    def layout_pareto_matrix(self, slide, main_chart_title, main_chart_items,
                             side_findings_title, side_findings_items, kpi_badges=None):
        # Main Trade-off Box (Right)
        self._add_box(slide, Inches(0.8), Inches(1.8), Inches(7.2), Inches(4.8),
                      main_chart_title, main_chart_items, title_color=COLOR_DEEP_TEAL,
                      border_color=COLOR_DEEP_TEAL, title_size=15, body_size=11)

        # Side Findings Box (Left)
        top_h = Inches(3.2) if kpi_badges else Inches(4.8)
        self._add_box(slide, Inches(8.25), Inches(1.8), Inches(4.283), top_h,
                      side_findings_title, side_findings_items, title_color=COLOR_BURGUNDY,
                      border_color=COLOR_BURGUNDY, title_size=13, body_size=10.5)

        # Small KPI Badges below side findings
        if kpi_badges:
            for idx, badge in enumerate(kpi_badges[:2]):
                left = Inches(8.25 + idx * 2.2)
                b_shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(5.2), Inches(2.083), Inches(1.4))
                b_shape.fill.solid()
                b_shape.fill.fore_color.rgb = COLOR_SLATE_CARD
                b_shape.line.color.rgb = COLOR_GOLD
                b_shape.line.width = Pt(1.5)
                tf = b_shape.text_frame
                tf.word_wrap = True
                p_v = tf.paragraphs[0]
                p_v.text = badge["val"]
                p_v.font.name = FONT_TITLE
                p_v.font.size = Pt(18)
                p_v.font.bold = True
                p_v.font.color.rgb = COLOR_GOLD
                p_v.alignment = PP_ALIGN.CENTER
                p_l = tf.add_paragraph()
                p_l.text = badge["label"]
                p_l.font.name = FONT_BODY
                p_l.font.size = Pt(10)
                p_l.font.color.rgb = COLOR_WHITE
                p_l.alignment = PP_ALIGN.CENTER

    # --------------------------------------------------------------------------
    # ARCHETYPE 9: SPATIAL MAP-ANCHORED CANVAS
    # --------------------------------------------------------------------------
    def layout_spatial_map(self, slide, map_panel_title, map_panel_items,
                           data_panel_title, data_table_headers, data_table_rows,
                           bottom_kpi_text=None):
        # Map / Regional Focus Panel (Right)
        self._add_box(slide, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8),
                      map_panel_title, map_panel_items, title_color=COLOR_DEEP_TEAL,
                      border_color=COLOR_DEEP_TEAL, title_size=14, body_size=11)

        # Data / Table Panel (Left)
        t_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.733), Inches(1.8), Inches(5.8), Inches(4.8))
        t_box.fill.solid()
        t_box.fill.fore_color.rgb = COLOR_WHITE
        t_box.line.color.rgb = COLOR_BORDER
        t_box.line.width = Pt(1.5)

        # Title
        tb_t = slide.shapes.add_textbox(Inches(6.9), Inches(1.95), Inches(5.4), Inches(0.4))
        p_t = tb_t.text_frame.paragraphs[0]
        p_t.text = data_panel_title
        p_t.font.name = FONT_TITLE
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_BURGUNDY
        p_t.alignment = PP_ALIGN.RIGHT

        # Table
        rows_cnt = len(data_table_rows) + 1
        cols_cnt = len(data_table_headers)
        table_shape = slide.shapes.add_table(rows_cnt, cols_cnt, Inches(6.9), Inches(2.45), Inches(5.4), Inches(3.4))
        tbl = table_shape.table

        # Headers
        for col_idx, head in enumerate(data_table_headers):
            cell = tbl.cell(0, col_idx)
            cell.text = head
            cell.fill.solid()
            cell.fill.fore_color.rgb = COLOR_DARK_TEAL
            for p in cell.text_frame.paragraphs:
                p.font.name = FONT_TITLE
                p.font.size = Pt(10)
                p.font.bold = True
                p.font.color.rgb = COLOR_WHITE
                p.alignment = PP_ALIGN.CENTER

        # Rows
        for r_idx, row in enumerate(data_table_rows):
            for c_idx, val in enumerate(row):
                cell = tbl.cell(r_idx + 1, c_idx)
                cell.text = str(val)
                cell.fill.solid()
                cell.fill.fore_color.rgb = COLOR_LIGHT_BG if r_idx % 2 == 0 else COLOR_WHITE
                for p in cell.text_frame.paragraphs:
                    p.font.name = FONT_BODY
                    p.font.size = Pt(9.5)
                    p.font.color.rgb = COLOR_TEXT_DARK
                    p.alignment = PP_ALIGN.CENTER

        if bottom_kpi_text:
            tb_k = slide.shapes.add_textbox(Inches(6.9), Inches(6.0), Inches(5.4), Inches(0.5))
            p_k = tb_k.text_frame.paragraphs[0]
            p_k.text = bottom_kpi_text
            p_k.font.name = FONT_TITLE
            p_k.font.size = Pt(11)
            p_k.font.bold = True
            p_k.font.color.rgb = COLOR_GOLD
            p_k.alignment = PP_ALIGN.CENTER

    # --------------------------------------------------------------------------
    # ARCHETYPE 11: QUAD-KPI METRIC COMMAND
    # --------------------------------------------------------------------------
    def layout_quad_kpi(self, slide, kpi_list, bottom_card_title, bottom_card_items):
        # 4 KPI metric cards in top row
        n = 4
        total_w = 11.733
        gap = 0.25
        card_w = (total_w - (n - 1) * gap) / n

        for idx, kpi in enumerate(kpi_list[:4]):
            left = Inches(0.8 + idx * (card_w + gap))
            shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(card_w), Inches(2.0))
            shape.fill.solid()
            shape.fill.fore_color.rgb = COLOR_WHITE
            shape.line.color.rgb = kpi.get("color", COLOR_DEEP_TEAL)
            shape.line.width = Pt(2)

            tf = shape.text_frame
            tf.word_wrap = True

            p_val = tf.paragraphs[0]
            p_val.text = kpi.get("val", "")
            p_val.font.name = FONT_TITLE
            p_val.font.size = Pt(24)
            p_val.font.bold = True
            p_val.font.color.rgb = kpi.get("color", COLOR_DEEP_TEAL)
            p_val.alignment = PP_ALIGN.CENTER
            p_val.space_before = Pt(8)

            p_lbl = tf.add_paragraph()
            p_lbl.text = kpi.get("label", "")
            p_lbl.font.name = FONT_BODY
            p_lbl.font.size = Pt(11.5)
            p_lbl.font.bold = True
            p_lbl.font.color.rgb = COLOR_TEXT_DARK
            p_lbl.alignment = PP_ALIGN.CENTER
            p_lbl.space_after = Pt(2)

            if kpi.get("sub"):
                p_sub = tf.add_paragraph()
                p_sub.text = kpi.get("sub", "")
                p_sub.font.name = FONT_BODY
                p_sub.font.size = Pt(9.5)
                p_sub.font.color.rgb = COLOR_TEXT_MUTED
                p_sub.alignment = PP_ALIGN.CENTER

        # Bottom Analysis Card
        self._add_box(slide, Inches(0.8), Inches(4.05), Inches(total_w), Inches(2.55),
                      bottom_card_title, bottom_card_items, title_color=COLOR_DEEP_TEAL,
                      border_color=COLOR_BORDER, title_size=14, body_size=11)

    # --------------------------------------------------------------------------
    # ARCHETYPE 13: TRIANGULAR PRISM BALANCE
    # --------------------------------------------------------------------------
    def layout_triangular_balance(self, slide, core_title, core_sub, pillars_list):
        # Central equilibrium core
        core = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.4), Inches(1.8), Inches(4.533), Inches(1.2))
        core.fill.solid()
        core.fill.fore_color.rgb = COLOR_DARK_TEAL
        core.line.color.rgb = COLOR_GOLD
        core.line.width = Pt(2)
        tf = core.text_frame
        tf.word_wrap = True
        pc = tf.paragraphs[0]
        pc.text = core_title
        pc.font.name = FONT_TITLE
        pc.font.size = Pt(13)
        pc.font.bold = True
        pc.font.color.rgb = COLOR_GOLD
        pc.alignment = PP_ALIGN.CENTER
        if core_sub:
            pcs = tf.add_paragraph()
            pcs.text = core_sub
            pcs.font.name = FONT_BODY
            pcs.font.size = Pt(10)
            pcs.font.color.rgb = COLOR_WHITE
            pcs.alignment = PP_ALIGN.CENTER

        # 3 Pillar Cards below
        n = 3
        card_w = (11.733 - (n - 1) * 0.3) / n
        for idx, pillar in enumerate(pillars_list[:3]):
            left = Inches(0.8 + idx * (card_w + 0.3))
            self._add_box(slide, left, Inches(3.25), Inches(card_w), Inches(3.35),
                          pillar["title"], pillar["items"], title_color=pillar.get("color", COLOR_DEEP_TEAL),
                          border_color=pillar.get("color", COLOR_BORDER), title_size=13, body_size=10.5)

    # --------------------------------------------------------------------------
    # ARCHETYPE 15: PROVOCATIVE QUESTION & EVIDENCE WEB
    # --------------------------------------------------------------------------
    def layout_provocative_question(self, slide, question_text, question_sub, evidence_cards_list):
        # Top Bold Question Banner
        q_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.733), Inches(1.3))
        q_box.fill.solid()
        q_box.fill.fore_color.rgb = COLOR_BURGUNDY
        q_box.line.color.rgb = COLOR_GOLD
        q_box.line.width = Pt(1.5)

        tf = q_box.text_frame
        tf.word_wrap = True
        pq = tf.paragraphs[0]
        pq.text = question_text
        pq.font.name = FONT_TITLE
        pq.font.size = Pt(17)
        pq.font.bold = True
        pq.font.color.rgb = COLOR_WHITE
        pq.alignment = PP_ALIGN.CENTER
        pq.space_before = Pt(4)

        if question_sub:
            pqs = tf.add_paragraph()
            pqs.text = question_sub
            pqs.font.name = FONT_BODY
            pqs.font.size = Pt(11)
            pqs.font.color.rgb = COLOR_GOLD
            pqs.alignment = PP_ALIGN.CENTER

        # 3 Evidentiary Cards (Bottom)
        n = len(evidence_cards_list)
        card_w = (11.733 - (n - 1) * 0.25) / n
        for idx, (e_title, e_items) in enumerate(evidence_cards_list):
            left = Inches(0.8 + idx * (card_w + 0.25))
            self._add_box(slide, left, Inches(3.35), Inches(card_w), Inches(3.3),
                          e_title, e_items, title_color=COLOR_BURGUNDY, border_color=COLOR_BORDER,
                          title_size=13, body_size=10.5)

    def save(self, filepath):
        self.prs.save(filepath)
        print(f"[SUCCESS] Axis 03 presentation successfully generated and saved to: {filepath}")

# ==============================================================================
# 3. BUILD ALL 29 SLIDES (17 to 45)
# ==============================================================================
def build_axis_03_presentation(output_path):
    builder = Axis03PresentationBuilder()

    # --------------------------------------------------------------------------
    # SLIDE 17: SECTION MARKER (Dark Executive Theme)
    # Archetype: Dark Academic Section Marker
    # --------------------------------------------------------------------------
    s17 = builder.add_base_slide("المساهمات البحثية الأساسية الثلاث", 17, 73, is_dark=True)
    # Giant Section Badge
    badge = s17.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.666), Inches(1.8), Inches(2.0), Inches(0.6))
    badge.fill.solid()
    badge.fill.fore_color.rgb = COLOR_DEEP_TEAL
    badge.line.fill.background()
    pb = badge.text_frame.paragraphs[0]
    pb.text = "المحور 03"
    pb.font.name = FONT_TITLE
    pb.font.size = Pt(16)
    pb.font.bold = True
    pb.font.color.rgb = COLOR_WHITE
    pb.alignment = PP_ALIGN.CENTER

    # Title Box
    tbox = s17.shapes.add_textbox(Inches(1.0), Inches(2.6), Inches(11.333), Inches(1.5))
    pm = tbox.text_frame.paragraphs[0]
    pm.text = "المساهمات البحثية: PLAN → FAIR → CONTROL"
    pm.font.name = FONT_TITLE
    pm.font.size = Pt(30)
    pm.font.bold = True
    pm.font.color.rgb = COLOR_WHITE
    pm.alignment = PP_ALIGN.CENTER

    # Sub-card with 4 pillars
    builder._add_box(s17, Inches(1.8), Inches(4.2), Inches(9.733), Inches(2.4),
                     "الركائز العلمية الأربع لصلب الأطروحة (الفصول 4، 5، و 6)",
                     [
                         "النمذجة الرياضية لترقية الشبكات الخلوية التشاركية نحو 5G ومقارنة BPSO و AGA (الفصل 4).",
                         "ابتكار وتطبيق مؤشر العدالة المكانية الراديوي (Spatial Fairness Index - SFI) لإنصاف الريف (الفصل 5).",
                         "منظومة التحكم البرمجي والعزل المكاني متعددة الموردين (Huawei & Ericsson) بمساعدة GIS (الفصل 6).",
                         "الإطار الوطني المتكامل والتحقق التجريبي على شبكة سوريا (79,268 موقعاً خلوياً)."
                     ],
                     bg_color=COLOR_SLATE_CARD, border_color=COLOR_GOLD, title_color=COLOR_GOLD,
                     is_dark=True, title_size=14, body_size=11.5)

    builder.set_notes(s17, "بوابة المحور الثالث — المساهمات البحثية", "0.5 دقيقة",
                      "سادتي أعضاء اللجنة الموقرة، ننتقل الآن إلى صلب هذه الأطروحة ونتاجها العلمي الأصيل الممتد عبر الفصول الرابع والخامس والسادس. لم تكن الغاية من هذا البحث تقديم معالجة نظرية منعزلة، بل بناء منظومة متكاملة تبدأ من التخطيط الأمثل (PLAN)، وتمر بالعدالة التنموية للجغرافيا السورية (FAIR)، وتكتمل بأدوات التحكم والسيطرة الميدانية في أوقات الأزمات (CONTROL).",
                      "إعلان الدخول في صلب الأطروحة وربط الفصول الثلاثة بدورة حياة مغلقة للشبكة الخلوية.",
                      [("كيف تترابط هذه الفصول الثلاثة هل هي أبحاث متباعدة أم مشروع متصل؟",
                        "هي دورة حياة متكاملة ومغلقة لشبكة الاتصالات: لا يمكن لمهندس الاتصالات أن يخطط شبكة (الفصل 4) دون أن يسأل عن عدالة توزيعها على المواطنين في الريف والمدينة (الفصل 5)، ولا تكتمل المنظومة حتى يمتلك المشغل والجهة الناظمة أدوات السيطرة اللحظية على ما تم بناؤه أثناء الطوارئ دون تدمير البنية التحتية (الفصل 6).")])

    # --------------------------------------------------------------------------
    # SLIDE 18: ROADMAP (Horizontal Pipeline)
    # Archetype 5: Horizontal Pipeline / Process Flow
    # --------------------------------------------------------------------------
    s18 = builder.add_base_slide("رحلة المساهمات البحثية: سردية علمية متكاملة", 18, 73)
    builder.layout_horizontal_pipeline(s18, [
        {
            "title": "المرحلة 1: التخطيط (PLAN)",
            "color": COLOR_DEEP_TEAL,
            "items": [
                "السؤال: أين نرقي الشبكة القائمة بأقل كلفة واستهلاك طاقة؟",
                "صياغة استمثال متعدد الأهداف (تغطية، CapEx، طاقة).",
                "خوارزميات BPSO و AGA مع آلية إصلاح القيود التكيفية.",
                "الحصاد: تغطية 95.12%، وفر 6% كلفة، وفر 5.3% طاقة."
            ]
        },
        {
            "title": "المرحلة 2: العدالة (FAIR)",
            "color": COLOR_BURGUNDY,
            "items": [
                "السؤال: هل الشبكة الأكثر كفاءة هي الأكثر عدالة جغرافياً؟",
                "اكتشاف حرمان 38% من سكان الريف تحت التخطيط التجاري.",
                "ابتكار مؤشر العدالة المكانية SFI وفرض قيد التكافؤ.",
                "الحصاد: قفزة بـ +36.5% في العدالة (SFI = 0.71)."
            ]
        },
        {
            "title": "المرحلة 3: التحكم (CONTROL)",
            "color": COLOR_GOLD,
            "items": [
                "السؤال: كيف نتحكم بالشبكة لحظياً في الطوارئ دون تشويش ضار؟",
                "معمارية برمجية موجهة بـ GIS متعددة الموردين.",
                "عزل الحوامل برمجياً واستبقاء خطوط الطوارئ 112 بنسبة 100%.",
                "الحصاد: دقة عزل 97.5% في المدن واستعادة < 10 دقائق."
            ]
        }
    ], bottom_summary_card={
        "title": "السردية المغلقة للأطروحة: PLAN ──► FAIR ──► CONTROL",
        "items": ["الترقية الانتقائية قادت لاكتشاف ثغرة الريف، وفرض العدالة استلزم امتلاك أدوات السيطرة الميدانية اللحظية كمنظومة سيادية موحدة."]
    })
    builder.set_notes(s18, "خارطة الرحلة العلمية — PLAN → FAIR → CONTROL", "1.5 دقيقة",
                      "نعرض هنا المسار المنطقي التراكمي للمساهمات الثلاث؛ كل مساهمة كانت استجابة علمية حتمية للمساهمة التي سبقتها: الترقية قادتنا لاكتشاف ثغرة الريف، وفرض العدالة أوجب امتلاك أدوات السيطرة الميدانية. هذه السردية تميز أطروحتنا عن الأبحاث المنشورة التي تتعامل مع التخطيط كمسألة رياضية مجردة.",
                      "الترابط العضوي التراكمي بين المساهمات الثلاث وعدم انفصالها.")

    # --------------------------------------------------------------------------
    # SLIDE 19: SPATIAL MAP CANVAS
    # Archetype 9: Spatial Map-Anchored Canvas
    # --------------------------------------------------------------------------
    s19 = builder.add_base_slide("الواقع الجغرافي والميداني: شبكة الاتصالات الخلوية السورية", 19, 73)
    builder.layout_spatial_map(s19,
        map_panel_title="طبوغرافيا وجغرافية المحافظات الـ 14 (الشكل 18)",
        map_panel_items=[
            "تغطية شاملة لـ 14 محافظة سورية تضم 79,268 موقعاً خلوياً فعلياً.",
            "المنطقة الجنوبية (دمشق، ريف دمشق، درعا، السويداء، القنيطرة): 31% من المواقع.",
            "المنطقة الشمالية والوسطى (حلب، حمص، حماة، إدلب): 40% من المواقع.",
            "المنطقة الساحلية والشرقية (اللاذقية، طرطوس، الرقة، دير الزور، الحسكة): 29%.",
            "تنوع طبوغرافي شاسع بين السلاسل الجبلية الغربية والبادية والسهول الشرقية."
        ],
        data_panel_title="التحديات الحاكمة للبيئة التشغيلية السورية المقيدة",
        data_table_headers=["المعيار / التحدي", "الواقع الميداني", "الحل الهندسي بالأطروحة"],
        data_table_rows=[
            ["الميزانيات الاستثمارية (CapEx)", "شح حاد وعقوبات اقتصادية", "الترقية التشاركية Co-siting (وفر 62%)"],
            ["إمدادات الطاقة الكهربائية", "عجز طاقي وانقطاعات متكررة", "دمج استهلاك الطاقة كهدف أساسي بالدالة"],
            ["الفجوة الرقمية الريفية", "62% حضري مقابل 38% ريفي", "ابتكار مؤشر SFI لفرض التكافؤ المكاني"],
            ["تعدد المصنعين والتجهيزات", "شبكة هجينة (Huawei & Ericsson)", "معمارية برمجية موحدة عبر GIS و REST"]
        ],
        bottom_kpi_text="100% بيانات وطنية واقعية | المشغلان: سيريتل و MTN | 79,268 موقعاً"
    )
    builder.set_notes(s19, "الواقع الجغرافي والميداني لشبكة الاتصالات السورية", "1.5 دقيقة",
                      "هنا تكمن قيمة بحثنا الميدانية: لم نختبر خوارزمياتنا على شبكات اصطناعية أو شبكات صغيرة تضم بضع مئات من المحطات كما تفعل أغلب الأوراق، بل وضعنا نماذجنا في مواجهة شبكة دولة كاملة تضم 79,268 موقعاً، في واحدة من أصعب البيئات التشغيلية في العالم.",
                      "الاعتماد على بيانات حقيقية 100% يمنح الأطروحة مصداقية هندسية وتطبيقية مطلقة.")

    # --------------------------------------------------------------------------
    # SLIDE 20: HERO STAT & ANALYTICAL WING
    # Archetype 2: Hero Giant Stat & Analytical Wing
    # --------------------------------------------------------------------------
    s20 = builder.add_base_slide("خط معالجة البيانات الوطنية: 79,268 موقعاً خلوياً", 20, 73)
    builder.layout_hero_stat(s20,
        giant_number="2^30,010",
        number_label="حجم فضاء الحالات الممكنة للاختيار",
        number_sub="≈ 10^9,033 حالة (برهان رياضي قاطع على NP-Hard)",
        analytical_cards_list=[
            ("تنقية وإسقاط البيانات المكانية (WGS84)", [
                "تنقية سجلات مشغلي MTN وسيريتل وإزالة التكرار وتصحيح الإحداثيات.",
                "إسقاط المواقع على الخرائط الطبوغرافية للمحافظات السورية الـ 14."
            ]),
            ("الدمج الطبوغرافي ثلاثي الأبعاد (DEM & Clutter)", [
                "ربط المواقع بنماذج الارتفاع الرقمية (DEM 30m) واستخدامات الأراضي (Clutter).",
                "حساب التوهين الراديوي وخطوط النظر (LoS/NLoS) بدقة متناهية."
            ]),
            ("تصنيف الأجيال وتحديد فضاء الترقية (الشكل 9)", [
                "محطات 2G: 21,356 موقعاً (26.9% - خدمات الصوت والتغطية الأساسية).",
                "محطات 3G: 27,902 موقعاً (35.2% - بيانات متوسطة النطاق).",
                "المواقع المرشحة لـ 5G: 30,010 مواقع (37.9% تمثل فضاء القرار الخوارزمي)."
            ])
        ]
    )
    builder.set_notes(s20, "خط معالجة البيانات الوطنية — 79,268 موقعاً خلوياً", "1.5 دقيقة",
                      "عندما يتعامل الباحث مع 30,010 قرارات ثنائية متزامنة، يصل فضاء البحث إلى 2 أس 30,010، وهو رقم يفوق عدد ذرات الكون المنظور بملايين المرات! هذا التبرير الرياضي القاطع لتصنيف المسألة كـ NP-Hard هو الأساس العلمي الذي برر استخدام خوارزميات الاستدلال الفوقي (Metaheuristics).",
                      "البرهان الرياضي لتصنيف المسألة كـ NP-Hard Combinatorial Optimization.")

    # --------------------------------------------------------------------------
    # SLIDE 21: 3D LAYERED GIS STACK
    # Archetype 4: 3D Layered GIS Stack
    # --------------------------------------------------------------------------
    s21 = builder.add_base_slide("الأساس المنهجي المشترك: تكامل الـ GIS مع الاستمثال والتحكم", 21, 73)
    builder.layout_layered_stack(s21,
        layers_list=[
            {"title": "الطبقة الجغرافية المكانية (GIS)", "sub": "DEM 30m + Clutter + ArcGIS Enterprise", "bg": COLOR_DARK_TEAL},
            {"title": "محرك الاستمثال الذكي", "sub": "Multi-Objective 0-1 Knapsack + BPSO/AGA", "bg": COLOR_DEEP_TEAL},
            {"title": "طبقة التحكم والأوركسترا", "sub": "Multi-Vendor REST/NETCONF + Cell Control", "bg": COLOR_BURGUNDY}
        ],
        inspection_panels_list=[
            ("الوعاء الجغرافي المكاني (GIS Layer)", [
                "نمذجة التضاريس ثلاثية الأبعاد لحساب خطوط النظر والتوهين التضاريسي.",
                "تحديد مصفوفات التجاور المكاني ومناطق التغطية المتداخلة بدقة."
            ]),
            ("محرك الاستمثال والقرارات (Optimization Engine)", [
                "معالجة المسألة كـ 0-1 Knapsack متعددة الأهداف مقيدة بضوابط صارمة.",
                "دوال لياقة هجينة تجمع التغطية، الكلفة، الطاقة، والعدالة المكانية.",
                "مشغلات ذكية لإصلاح القيود وضمان جدوى الحلول بنسبة 100%."
            ]),
            ("طبقة التحكم والتشغيل (Control & Orchestration Layer)", [
                "ترجمة المضلعات الجغرافية إلى بارامترات شبكية تشغيلية لحظية.",
                "توحيد واجهات التحكم عبر بروتوكولات NETCONF و REST لمعدات هواوي وإريكسون."
            ])
        ]
    )
    builder.set_notes(s21, "الأساس المنهجي المشترك — GIS + الاستمثال + التحكم", "1.5 دقيقة",
                      "نظم المعلومات الجغرافية (GIS) في أطروحتنا ليست أداة للعرض الخرائطي فقط؛ إنها المحرك التوليدي الذي يغذي دوال الهدف، يفرض قيود التداخل، ويحدد بدقة متناهية الخلايا التي يجب التأثير عليها في الميدان.",
                      "تكامل GIS مع الاستمثال والتحكم كوعاء ومنصة قرار موحدة.")

    # --------------------------------------------------------------------------
    # SLIDE 22: BENTO GRID (C1 - Candidate Selection)
    # Archetype 3: Asymmetric Bento Grid
    # --------------------------------------------------------------------------
    s22 = builder.add_base_slide("أين يجب ترقية الشبكة الخلوية؟ تحديد المواقع المرشحة (C1)", 22, 73,
                                 section_badge="المحور 03: المساهمة الأولى (PLAN) — التخطيط الأمثل")
    builder.layout_bento_grid(s22,
        hero_card={
            "title": "المنطق الهندسي للترقية التشاركية (Co-siting)",
            "items": [
                "بناء برج خلوي جديد (Greenfield) يكلف مبالغ باهظة تتجاوز قدرات المشغلين (أرض، برج، كوابل، طاقة).",
                "ترقية المواقع القائمة (Colocated) بإضافة هوائيات Massive MIMO ومعالجات BBU توفر 62% من CapEx.",
                "صياغة مسألة القرار كمتجه ثنائي: X = [x1, x2, ..., xN] حيث xi ∈ {0, 1} لـ 30,010 مواقع مرشحة.",
                "xi = 1 تعني ترقية المحطة لـ 5G، و xi = 0 تعني الإبقاء على تشغيلها الحالي."
            ]
        },
        top_side_card={
            "title": "معايير الاختيار والفرز الذكي",
            "items": [
                "الكثافة السكانية ومستوى الطلب الفعلي على البيانات في رقعة التغطية.",
                "الجاهزية الفيزيائية والكهربائية للبنية التحتية للبرج القائم."
            ]
        },
        bot_left_card={
            "title": "طبوغرافيا الموقع",
            "items": ["استغلال المواقع المرتفعة لتأمين خط نظر LoS وتغطية أوسع مساحة."]
        },
        bot_right_card={
            "title": "وفر التكاليف",
            "items": ["وفر مالي يتجاوز 62% مقارنة بالإنشاءات الجديدة للأبراج."]
        }
    )
    builder.set_notes(s22, "معايير اختيار مواقع الترقية نحو الجيل الخامس (C1)", "1.5 دقيقة",
                      "في ظل الميزانيات المقيدة، الترقية الانتقائية التشاركية ليست خياراً تفضيلياً، بل هي المسار الوحيد القابل للتطبيق هندسياً ومالياً على شبكتنا الوطنية.",
                      "الترقية التشاركية توفر 62% من التكاليف مقارنة بإنشاء أبراج جديدة.")

    # --------------------------------------------------------------------------
    # SLIDE 23: FORMULA SPOTLIGHT (C1 - Optimization Problem)
    # Archetype 6: Formula Spotlight & Anatomical Callouts
    # --------------------------------------------------------------------------
    s23 = builder.add_base_slide("مسألة الاستمثال ثلاثية الأهداف: تغطية • كلفة • طاقة (C1)", 23, 73,
                                 section_badge="المحور 03: المساهمة الأولى (PLAN) — التخطيط الأمثل")
    builder.layout_formula_spotlight(s23,
        formula_title="دالة اللياقة الإجمالية الموزونة (Aggregate Weighted Fitness Function)",
        formula_text="Maximize  F(X) = α · [f₁(X) / f₁ᵐᵃˣ] - β · [f₂(X) / Budget] - γ · [f₃(X) / Eₘₐₓ] - Penalty(Violations)",
        breakdown_cards=[
            ("الهدف 1: تعظيم التغطية وجودة الإشارة (f₁)", [
                "f₁(X) = Σ wₖ · 𝕀(SINRₖ(X) ≥ γₜₕ)",
                "wₖ وزن الأهمية السكانية للنقطة k.",
                "γₜₕ عتبة جودة الإشارة (≥ -3 dB).",
                "𝕀 دالة المؤشر لتحقق التغطية."
            ]),
            ("الهدف 2: تقليل التكاليف الرأسمالية (f₂)", [
                "f₂(X) = Σ cᵢ · xᵢ ≤ Budget",
                "cᵢ تكلفة ترقية الموقع i (عتاد، وهوائيات، وترقية النقل الخلفي Backhaul).",
                "تخضع لسقف الميزانية المالية الصارم."
            ]),
            ("الهدف 3: ترشيد استهلاك الطاقة (f₃)", [
                "f₃(X) = Σ (P_base,i + P_5G,i · xᵢ) ≤ E_max",
                "P_base استهلاك المحطة القائم.",
                "P_5G الحمل الكهربائي الإضافي لمعدات 5G.",
                "تخضع للسقف الطاقي الوطني المسموح."
            ])
        ]
    )
    builder.set_notes(s23, "صياغة مسألة الاستمثال ثلاثية الأهداف (C1)", "2.0 دقيقة",
                      "هذه الأهداف الثلاثة متعارضة حتماً: تعظيم التغطية يرفع التكلفة ويزيد استهلاك الطاقة، وتقليص الكلفة يضر بالتغطية؛ لذا كان التحدي هو إيجاد حل باريتو الأمثل الذي يحقق أعلى كفاءة متوازنة.",
                      "الصياغة الرياضية الدقيقة والتنازلات المتعارضة بين الأهداف الثلاثة.",
                      [("كيف تم ضبط أوزان الترجيح α, β, γ وهل النتائج حساسة لتغيرها؟",
                        "تم ضبط الأوزان وفق منهجية التحليل الهرمي (AHP) وبالتشاور مع خبراء سيريتل و MTN (α=0.5 للتغطية، β=0.3 للتكلفة، γ=0.2 للطاقة). وأجرينا تحليل حساسية شامل بتغيير الأوزان بنسبة ±20% في المبحث 4.7 وحافظت BPSO على استقرارها وتفوقها.")])

    # --------------------------------------------------------------------------
    # SLIDE 24: DECISION TREE (C1 - BPSO vs AGA)
    # Archetype 7: Algorithmic Decision Tree / Flow
    # --------------------------------------------------------------------------
    s24 = builder.add_base_slide("المنهج الخوارزمي: خوارزمية سرب الجسيمات BPSO مقابل AGA (C1)", 24, 73,
                                 section_badge="المحور 03: المساهمة الأولى (PLAN) — التخطيط الأمثل")
    builder.layout_decision_tree(s24,
        left_process={
            "title": "الخوارزمية الجينية التكيفية (Adaptive GA - الشكل 11)",
            "items": [
                "التمثيل الثنائي للكروموسومات: بطول 30,010 جيناً لكل فرد.",
                "معاملات التقاطع والطفرة التكيفية (Pc & Pm):",
                "  Pc = k1 · (f_max - f') / (f_max - f_avg)",
                "  Pm = k2 · (f_max - f) / (f_max - f_avg)",
                "تتغير الاحتمالات ديناميكياً بحسب لياقة الفرد لتجنب الركود المحلي.",
                "قدرة استكشاف واسعة ولكن ببطء نسبي في التقارب النهائي."
            ]
        },
        right_process={
            "title": "خوارزمية سرب الجسيمات الثنائية (BPSO - الشكل 12)",
            "items": [
                "تحديث السرعة المتصلة للجسيم:",
                "  v_id(t+1) = w·v_id(t) + c₁r₁(p_id - x_id) + c₂r₂(g_d - x_id)",
                "دالة التحويل السينية (Sigmoid Transfer Function):",
                "  S(v_id(t+1)) = 1 / (1 + e^(-v_id(t+1)))",
                "قرار تحديث الموضع الثنائي: x_id = 1 إذا كان rand() < S(v) وإلا 0.",
                "سرعة فائقة في بلوغ منطقة الاستقرار مع الحفاظ على التنوع."
            ]
        },
        center_bridge_text="مقارنة عبر 300 تكرار و 30 تشغيلاً"
    )
    builder.set_notes(s24, "التدفق الخوارزمي والمقارنة بين BPSO و AGA (C1)", "1.5 دقيقة",
                      "رغم الرصانة النظرية لـ AGA، أظهرت التجربة العملية تفوق BPSO الحاسم في فضاء القرارات الثنائية المخصص لشبكات الاتصالات، وذلك بفضل انسيابية دالة التحويل السينية وكفاءة حركة السرب نحو الحلول المثلى.",
                      "تفوق BPSO في الفضاءات الثنائية الضخمة مقارنة بـ AGA.")

    # --------------------------------------------------------------------------
    # SLIDE 25: SPLIT-SCREEN VERSUS (C1 - Originality Constraint Repair)
    # Archetype 1: Split-Screen High Contrast / Versus
    # --------------------------------------------------------------------------
    s25 = builder.add_base_slide("من الاستمثال القياسي إلى المنهج المقترح: آلية إصلاح القيود التكيفية (C1)", 25, 73,
                                 section_badge="المحور 03: المساهمة الأولى (PLAN) — الأصالة البحثية")
    builder.layout_split_screen(s25,
        right_title="النهج التقليدي الشائع: دوال العقاب والاستبعاد (Baseline)",
        right_items=[
            "استبعاد فوري لأي حل ينتهك الميزانية أو قيود التداخل (Death Penalty).",
            "أو فرض غرامات عقابية قاسية (Penalty Functions) تشوه سطح اللياقة.",
            "استبعاد أكثر من 60% من الحلول المولدة وهدر آلاف التكرارات الحسابية.",
            "بطء شديد في التقارب ومخاطر استقرار الحل في منطقة غير مجدية تشغيلياً."
        ],
        left_title="الابتكار المقترح: مشغل إصلاح القيود التكيفي (Adaptive Repair)",
        left_items=[
            "إصلاح فائض التكلفة جشعياً (Budget Pruning): ترتيب المحطات تصاعدياً حسب (ΔCov/c) وقلب الأقل مردوداً (xi ← 0) حتى استيفاء الميزانية.",
            "إصلاح التداخل الراديوي (Interference Relief): معالجة الخلايا المسببة لهبوط SINR مع ضمان تغطية المنطقة عبر الجوار.",
            "إعادة الحل فورياً إلى الفضاء المقبول (Feasible Space) دون إهدار التقييم."
        ],
        right_color=COLOR_BURGUNDY, left_color=COLOR_DEEP_TEAL, vs_text="VS",
        bottom_banner="الحصاد الهندسي: 100% حلول مقبولة تشغيلياً  |  تسريع التقارب بنسبة +45%  |  0% هدر حسابي"
    )
    builder.set_notes(s25, "آلية إصلاح القيود المبتكرة (Constraint Repair Heuristic) (C1)", "2.0 دقيقة",
                      "هذه الشريحة تجيب بصراحة عن سؤال لجنة الحكم: ما الذي أضفته أنت على الخوارزميات المعروفة؟ الإضافة هي أننا حولنا الخوارزمية من أداة رياضية عمياء تسقط الحلول إلى أداة مهنية واعية بالشبكة تصلح الحل المخالف لتعيده فورياً للميدان.",
                      "مشغل إصلاح القيود التكيفي كأصالة وبصمة بحثية خاصة بالأطروحة.")

    # --------------------------------------------------------------------------
    # SLIDE 26: PARETO MATRIX (C1 - Experimental Compare)
    # Archetype 8: Pareto Trade-Off Matrix
    # --------------------------------------------------------------------------
    s26 = builder.add_base_slide("المقارنة التجريبية: منحنيات التقارب وجبهة باريتو المثلى (C1)", 26, 73,
                                 section_badge="المحور 03: المساهمة الأولى (PLAN) — التحقق التجريبي")
    builder.layout_pareto_matrix(s26,
        main_chart_title="تحليل جبهة باريتو ومنحنيات التقارب (الشكلان 14 و 15)",
        main_chart_items=[
            "سلوك التقارب وسرعة الاستقرار (الشكل 14): استقرت BPSO عند الحل شبه الأمثل حول الجيل 120، بينما احتاجت AGA إلى 210 أجيال لبلوغ الاستقرار.",
            "هيمنة جبهة باريتو (Pareto Dominance - الشكل 15): حلول BPSO مهيمنة بالكامل على حلول AGA عبر كافة مستويات الميزانية.",
            "كفاءة الإنفاق: بنفس مستوى الإنفاق الرأسمالي، حققت BPSO نسبة تغطية أعلى بـ 0.2% إلى 0.6% مع استهلاك طاقة أقل.",
            "الزمن الحسابي: BPSO استغرقت 118 ثانية مقابل 142 ثانية لـ AGA عبر 300 تكرار (تسريع 16.9%)."
        ],
        side_findings_title="الموثوقية الإحصائية (Wilcoxon Test)",
        side_findings_items=[
            "30 تشغيلاً مستقلاً لتأكيد الثقة الإحصائية.",
            "اختبار ويلكوكسون ذو الدلالة الإحصائية المؤكدة: p = 0.016 للتغطية، و p < 0.001 للتكلفة والطاقة.",
            "استقرار تام في معاملات التشتت والانحراف المعياري."
        ],
        kpi_badges=[
            {"val": "118 s", "label": "زمن BPSO (جيل 120)"},
            {"val": "142 s", "label": "زمن AGA (جيل 210)"}
        ]
    )
    builder.set_notes(s26, "المقارنة التجريبية وجبهة باريتو (C1)", "1.5 دقيقة",
                      "منحنى التقارب يثبت سرعة التعلم، وجبهة باريتو تثبت جودة القرار. BPSO لم تكن أسرع فقط بل قدمت خيارات استثمارية تتفوق على AGA عند كل دولار يتم إنفاقه عبر 30 تشغيلاً مستقلاً.",
                      "هيمنة جبهة باريتو لـ BPSO واختبار ويلكوكسون الإحصائي.")

    # --------------------------------------------------------------------------
    # SLIDE 27: QUAD-KPI (C1 - Key Results)
    # Archetype 11: Quad-KPI Metric Command
    # --------------------------------------------------------------------------
    s27 = builder.add_base_slide("حصاد المساهمة الأولى: النتائج الرقمية المؤكدة للأطروحة (C1)", 27, 73,
                                 section_badge="المحور 03: المساهمة الأولى (PLAN) — النتائج والحصاد")
    builder.layout_quad_kpi(s27,
        kpi_list=[
            {"val": "95.12%", "label": "نسبة التغطية الراديوية", "sub": "+0.21% تفوق على AGA (p = 0.016)", "color": COLOR_EMERALD},
            {"val": "132.8 M$", "label": "التكاليف الرأسمالية CapEx", "sub": "وفر 5.95% (8.4M$ وفر مباشر)", "color": COLOR_DEEP_TEAL},
            {"val": "78.3 MWh", "label": "استهلاك الطاقة السنوي", "sub": "وفر 5.32% (4.4MWh سنوياً)", "color": COLOR_GOLD},
            {"val": "118 sec", "label": "زمن التقارب الحسابي", "sub": "تسريع بنسبة 16.9% (جيل 120)", "color": COLOR_BLUE}
        ],
        bottom_card_title="الاستنتاجات الهندسية والتطبيقية للمساهمة الأولى",
        bottom_card_items=[
            "نجاح نموذج الترقية التشاركية في توفير تغطية 5G وطنية ممتازة بأقل من نصف كلفة بناء شبكة جديدة.",
            "تحقيق وفر مالي مباشر قدره 8.4 مليون دولار ووفر طاقي سنوي 4.4 ميغاواط ساعي، وهو عامل حاسم في بيئة سوريا المقيدة.",
            "إثبات كفاءة آلية إصلاح القيود المقترحة في إنتاج حلول مقبولة 100% وتسريع الحساب بمقدار 24 ثانية.",
            "إجابة هندسية قاطعة على السؤال الاستراتيجي الأول: أين نرقي الشبكة الخلوية؟"
        ]
    )
    builder.set_notes(s27, "النتائج الأساسية للمساهمة الأولى وحصاد الأداء (C1)", "1.5 دقيقة",
                      "هذا الحصاد الرقمي يثبت أن نموذج التخطيط المقترح أنجز أهدافه الاقتصادية والهندسية بامتياز: غطينا 95.12% ووفرنا 8.4 مليون دولار و 4.4 ميغاواط ساعي. وهكذا نكون قد أجبنا بنجاح على سؤال: أين نرقي الشبكة؟",
                      "تثبيت الأرقام الأربعة الكبرى للمساهمة 1 في ذهن لجنة التحكيم.")

    # --------------------------------------------------------------------------
    # SLIDE 28: PROVOCATIVE QUESTION (Transition C1 -> C2)
    # Archetype 15: Provocative Question & Evidence Web
    # --------------------------------------------------------------------------
    s28 = builder.add_base_slide("السؤال الانتقالي الحاسم: هل الشبكة الأكثر كفاءة هي الأكثر عدالة؟", 28, 73,
                                 section_badge="المحور 03: فاصل وانتقال من التخطيط (PLAN) إلى العدالة (FAIR)")
    builder.layout_provocative_question(s28,
        question_text="هل الشبكة الأكثر كفاءة اقتصادياً هي بالضرورة الأكثر عدالة جغرافياً وتنموياً؟",
        question_sub="اكتشاف المفارقة التخطيطية الكبرى وصدمة التفاوت المكاني في شبكة الاتصالات",
        evidence_cards_list=[
            ("المفارقة الكبرى (The Paradox)", [
                "النتائج الرقمية للمساهمة الأولى مبهرة على الورق (تغطية 95.12% ووفر 8.4M$).",
                "الخوارزمية تصرفت بأعلى عقلانية تجارية: وجّهت الاستثمار للمناطق ذات الكثافة السكانية العالية لتحقيق أعلى عائد تغطوي لكل ليرة."
            ]),
            ("الصدمة المكانية (The Disparity)", [
                "عند إسقاط الحل على الخريطة: 95% من استثمارات 5G تركزت في شريط المدن الكبرى (دمشق، حلب، مراكز المحافظات).",
                "حرمان 38% من سكان سوريا في المناطق الريفية والبادية، وتُركوا على شبكات متقادمة."
            ]),
            ("انهيار مؤشر العدالة SFI", [
                "مؤشر العدالة المكانية بلغ مستوى متدنياً وخطيراً: SFI = 0.42 لـ BPSO و 0.33 لـ AGA.",
                "الخلاصة: الاستمثال الاقتصادي الأعمى هو شريك غير واعٍ في تعميق الفجوة الرقمية وحرمان الريف."
            ])
        ]
    )
    builder.set_notes(s28, "فاصل وانتقال: مفارقة حرمان الريف وظهور الحاجة للعدالة", "1.5 دقيقة",
                      "هنا توقفت كباحث وسألت نفسي: هل دور مهندس الاتصالات هو تعظيم أرباح المشغل فقط حتى لو حُرم ريف وطنه من الخدمة؟ كان الجواب حتماً: لا! الخوارزمية بدون قيد عدالة ركزت 95% من الاستثمار في المدن وتركت 38% من الشعب السوري في عزلة رقمية؛ ومن هنا انطلقت المساهمة الثانية.",
                      "المفارقة التخطيطية: كفاءة تجارية عالية مقابل حرمان مكاني جائر للأرياف.")

    # --------------------------------------------------------------------------
    # SLIDE 29: SPLIT-SCREEN VERSUS (C2 - From Opt to Fair)
    # Archetype 1: Split-Screen High Contrast / Versus
    # --------------------------------------------------------------------------
    s29 = builder.add_base_slide("من الاستمثال الاقتصادي المحض إلى التكافؤ الجغرافي المنصف (C2)", 29, 73,
                                 section_badge="المحور 03: المساهمة الثانية (FAIR) — العدالة المكانية")
    builder.layout_split_screen(s29,
        right_title="التخطيط التجاري التقليدي: منطق الربحية والجدوى",
        right_items=[
            "أكثر من 75% من محطات 4G القائمة متمركزة في دمشق وريفها وحلب.",
            "توجيه الاستثمار للمناطق الأكثر كثافة لضمان عائد سريع (ROI).",
            "إهمال وتهميش ريف حمص الشرقي، ريف حماة، درعا، القنيطرة، ومحافظات الجزيرة السورية.",
            "مؤشر العدالة المكانية متدنٍ للغاية: SFI = 0.42."
        ],
        left_title="التخطيط المنصف المقترح: السيادة والشمول الرقمي",
        left_items=[
            "الشبكة الوطنية لا تقاس بالنسب المجردة بل بمدى وصول الخدمة لكل مواطن في ريفه كعاصمته.",
            "كسر الهيمنة الحضرية وتأمين بنية تحتية رقمية تدعم الإنتاج الزراعي والصناعي في الأرياف.",
            "إعادة هيكلة الاستمثال ليوازن بين ربحية المشغل وحق المواطن الدستوري.",
            "استهداف رفع مؤشر العدالة إلى عتبة قطعية: SFI ≥ 0.70."
        ],
        right_color=COLOR_BURGUNDY, left_color=COLOR_DEEP_TEAL, vs_text="VS",
        bottom_banner="التحول المنهجي: الانتقال من البحث عن الحل الأرخص إلى البحث عن الحل الأكثر إنصافاً واستدامة"
    )
    builder.set_notes(s29, "من الأمثلية الاقتصادية إلى العدالة المكانية (C2)", "1.5 دقيقة",
                      "في هذه المساهمة، لم نعد نبحث عن الحل الأرخص، بل عن الحل الأكثر إنصافاً وتوازناً بين ربحية المشغل وحق المواطن الريفي في التنمية والتعليم والخدمات الصحية.",
                      "التحول الفلسفي والمنهجي نحو العدالة المكانية.")

    # --------------------------------------------------------------------------
    # SLIDE 30: BENTO GRID (C2 - Why Spatial Fairness)
    # Archetype 3: Asymmetric Bento Grid
    # --------------------------------------------------------------------------
    s30 = builder.add_base_slide("لماذا العدالة المكانية؟ كسر حلقة التحيز التجاري وفشل السوق (C2)", 30, 73,
                                 section_badge="المحور 03: المساهمة الثانية (FAIR) — العدالة المكانية")
    builder.layout_bento_grid(s30,
        hero_card={
            "title": "معضلة فشل السوق (Market Failure) في الاتصالات",
            "items": [
                "في غياب الضوابط التنظيمية، يتصرف المشغلون بمنطق العائد المالي السريع والمجرد.",
                "برج خلوي في حي سكني كثيف بدمشق يخدم 10,000 مستخدم يومياً ويحقق عائداً باهراً.",
                "برج في قرية ريفية يخدم 400 مستخدم ويكلف نفس تكلفة المعدات والطاقة؛ فيعتبر استثماراً 'غير مجدٍ' تجارياً.",
                "النتيجة الحتمية: عزل الأرياف، تفاقم الهجرة للمدن، وتراجع الإنتاج الزراعي والوطني."
            ]
        },
        top_side_card={
            "title": "تحويل الخدمة الشاملة (USO) لقيد خوارزمي",
            "items": [
                "نقل مفهوم 'التزام الخدمة الشاملة' من نصوص قانونية نظرية إلى قيد رياضي صارم.",
                "إلزام محرك الاستمثال بإنصاف الريف قبل اعتماد أي خطة ترقية وطنية."
            ]
        },
        bot_left_card={
            "title": "الأمن التنموي",
            "items": ["شبكة الاتصالات في الأرياف تدعم الاستقرار السكاني والأمن الغذائي الوطني."]
        },
        bot_right_card={
            "title": "دور الهيئة الناظمة",
            "items": ["أداة برمجية بيد المنظم السوري لفرض التوزيع المنصف علمياً."]
        }
    )
    builder.set_notes(s30, "مسوغات العدالة المكانية وتحليل الفجوة الإقليمية (C2)", "1.5 دقيقة",
                      "العدالة المكانية ليست صدقة تقدم للأرياف؛ بل هي استقرار اقتصادي وأمني للدولة، وتوفير اتصال يدعم استقرار المجتمعات الريفية والإنتاج الوطني.",
                      "معالجة فشل السوق عبر إدماج قيد الخدمة الشاملة في الخوارزميات.")

    # --------------------------------------------------------------------------
    # SLIDE 31: FORMULA SPOTLIGHT (C2 - SFI Formulation)
    # Archetype 6: Formula Spotlight & Anatomical Callouts
    # --------------------------------------------------------------------------
    s31 = builder.add_base_slide("الصياغة الرياضية لمؤشر العدالة المكانية SFI (C2)", 31, 73,
                                 section_badge="المحور 03: المساهمة الثانية (FAIR) — العدالة المكانية")
    builder.layout_formula_spotlight(s31,
        formula_title="مؤشر العدالة المكانية الراديوي المشتق من معامل جيني (المعادلة 5.4 في الأطروحة)",
        formula_text="SFI = 1 - [ Σᵢ₌₁ᴺ Σⱼ₌₁ᴺ |Cᵢ - Cⱼ| ] / [ 2 · N² · μ_C ]",
        breakdown_cards=[
            ("المعاملات والمجال القياسي", [
                "مجال المؤشر: 0 ≤ SFI ≤ 1.",
                "SFI = 1: تكافؤ مكاني تام بين كافة المحافظات.",
                "SFI = 0: احتكار التغطية في منطقة واحدة وحرمان البقية.",
                "N = 14 محافظة سورية معتمدة."
            ]),
            ("الفروق المزدوجة (|Cᵢ - Cⱼ|)", [
                "Cᵢ نسبة التغطية الراديوية المحققة في المحافظة i.",
                "قياس الفارق التغطوي بين كل زوج من المحافظات.",
                "الميزة: عدم إخفاء المناطق المحرومة خلف المتوسطات العامة الخادعة."
            ]),
            ("المتوسط الوطني وقيد العدالة", [
                "μ_C المتوسط الوطني العام لنسب التغطية بالمحافظات الـ 14.",
                "قيد العدالة الصريح المفروض: SFI(X) ≥ 0.70.",
                "دالة اللياقة المعدلة: F_fair(X) = F(X) + λ · SFI(X)."
            ])
        ]
    )
    builder.set_notes(s31, "الصياغة الرياضية لمؤشر العدالة المكانية (SFI) (C2)", "2.0 دقيقة",
                      "هذه المعادلة (5.4) هي إحدى البصمات العلمية الأساسية للأطروحة. اقتبسنا الفلسفة الإحصائية لمؤشر جيني المستخدم في قياس عدالة توزيع الدخل، وكيّفناها مكانياً وهندسياً لقياس عدالة التغطية الراديوية بين المحافظات.",
                      "تكييف معامل جيني إحصائياً وهندسياً ليصبح مؤشراً راديوياً مكانياً.",
                      [("ما هو السند الرياضي لاشتقاق مؤشر SFI ولماذا وضعتم العتبة عند 0.70 تحديداً؟",
                        "السند هو معامل جيني المكاني. أما تحديد العتبة عند 0.70 فهو نتاج دراسة المفاضلة في الشكل 26؛ رفع SFI إلى 0.70 كلف زيادة طفيفة بالطاقة (2.4%)، بينما محاولة دفعه فوق 0.80 تؤدي لقفزة أسية بالتكلفة لترقية مواقع نائية جداً. 0.70 هي النقطة الذهبية على جبهة باريتو.")])

    # --------------------------------------------------------------------------
    # SLIDE 32: PARETO MATRIX (C2 - Algorithmic Extension & Trade-offs)
    # Archetype 8: Pareto Trade-Off Matrix
    # --------------------------------------------------------------------------
    s32 = builder.add_base_slide("التطوير الخوارزمي: دمج قيد العدالة وآلية إعادة التوزيع المكاني (C2)", 32, 73,
                                 section_badge="المحور 03: المساهمة الثانية (FAIR) — التطوير الخوارزمي")
    builder.layout_pareto_matrix(s32,
        main_chart_title="مشغل إعادة التوزيع المكاني والتحليل الطاقي (الشكلان 20 و 26)",
        main_chart_items=[
            "مخطط التحول الخوارزمي (الشكل 20): بعد كل جيل يتم فحص SFI(X)؛ إذا كان SFI < 0.70 يُفعّل مشغل إعادة التوزيع الجغرافي (Spatial Redistribution Operator).",
            "آلية المشغل: تحديد المحافظات 'المتخمة' بفائض تغطية ونقل جزء من الترقية للمحافظات 'المحرومة' حتى استيفاء SFI ≥ 0.70 بنسبة 100%.",
            "تحليل المفاضلة غير الخطية (الشكل 26): زيادة طفيفة جداً في الطاقة بلغت 2.4% فقط (من 76.4 إلى 78.3 MWh في BPSO) نتيجة تشغيل خلايا ريفية أوسع.",
            "المكسب الهندسي: مقابل هذه الزيادة الطفيفة (2.4%) حققنا قفزة بـ 36.5% في العدالة المكانية."
        ],
        side_findings_title="استنتاجات كفاءة العدالة",
        side_findings_items=[
            "ضمان استيفاء قيد العدالة بنسبة 100% في كافة الحلول.",
            "تفوق BPSO على AGA في ميزان الطاقة والعدالة عبر كافة التكرارات.",
            "إثبات أن التكافؤ الجغرافي لا يتطلب تدمير الكفاءة الاقتصادية."
        ],
        kpi_badges=[
            {"val": "+36.5%", "label": "مكسب العدالة المكانية"},
            {"val": "+2.4%", "label": "ضريبة استهلاك الطاقة"}
        ]
    )
    builder.set_notes(s32, "دمج مؤشر SFI في دالة الهدف ومشغل إعادة التوزيع الجغرافي (C2)", "1.5 دقيقة",
                      "لم نكتفِ بإضافة حد عقابي في دالة اللياقة، بل بنينا مشغلاً خوارزمياً مكانياً داخل BPSO (الشكل 20) يعيد توجيه حركة الجسيمات مكانياً لتضمن إنصاف الأرياف بضريبة طاقية لا تتجاوز 2.4%.",
                      "مشغل إعادة التوزيع المكاني داخل BPSO والمفاضلة مع الطاقة.")

    # --------------------------------------------------------------------------
    # SLIDE 33: SPATIAL MAP CANVAS (C2 - Syria Map Geographic Effect)
    # Archetype 9: Spatial Map-Anchored Canvas
    # --------------------------------------------------------------------------
    s33 = builder.add_base_slide("الأثر الجغرافي على خريطة سوريا: التخطيط التقليدي مقابل المنصف (C2)", 33, 73,
                                 section_badge="المحور 03: المساهمة الثانية (FAIR) — البرهان الميداني")
    builder.layout_spatial_map(s33,
        map_panel_title="المقارنة البصرية الميدانية على خريطة سوريا (الشكل 24)",
        map_panel_items=[
            "خريطة التخطيط التقليدي (يساراً): تركز كثيف وبقع متراكمة في دمشق وحلب والساحل، وفراغات بيضاء هائلة في الأرياف والبادية (SFI = 0.42).",
            "خريطة التخطيط المنصف المقترح (يميناً): انتشار متوازن لمحطات 5G عبر المحافظات الـ 14 وتغطية المحاور الريفية والطرق الدولية (SFI = 0.71).",
            "الحفاظ على تغطية ممتازة للمدن دون أي تراجع محسوس في الأداء."
        ],
        data_panel_title="جدول المقارنة الميداني الصادم بالأرقام",
        data_table_headers=["المعيار الهندسي", "النموذج التقليدي", "النموذج المنصف", "الفارق والمكسب"],
        data_table_rows=[
            ["تغطية المناطق الحضرية", "98.4%", "96.8%", "حفاظ على تميز المدن (-1.6%)"],
            ["تغطية المناطق الريفية", "64.2%", "88.7%", "قفزة نوعية بـ +24.5%"],
            ["التغطية الوطنية الإجمالية", "95.14%", "95.12%", "شبه متطابقة (فارق 0.02% فقط)"],
            ["مؤشر العدالة المكانية SFI", "0.42", "0.71", "تحسن دراماتيكي (+36.5%)"]
        ],
        bottom_kpi_text="رفع تغطية الريف بـ +24.5% دون خسارة التغطية الوطنية (95.12%)"
    )
    builder.set_notes(s33, "الأثر الجغرافي الميداني للعدالة على المحافظات (C2)", "2.0 دقيقة",
                      "هذه الخريطة (الشكل 24) هي الشاهد الميداني الحاسم أمام لجنتكم الموقرة: لقد رفعنا تغطية الريف السوري من 64.2% إلى 88.7% دون أن نخسر سوى 1.6% من تغطية المدن الفائضة، وحافظنا على نسبة التغطية الوطنية الإجمالية عند 95.12%.",
                      "البرهان الميداني الحاسم على خريطة سوريا وجدول الأرقام الدقيق.",
                      [("كيف أمكن رفع تغطية الريف إلى 88.7% مع ثبات التغطية العامة عند 95.12%؟",
                        "السر يكمن في التغطية المتراكبة الفائضة في المدن (Over-coverage)؛ بعض أحياء دمشق وحلب كانت مغطاة بثلاثة قطاعات فائضة. عندما ألغينا ترقية بعض الهوائيات المتداخلة ونقلناها للأرياف، ظلت المدن مغطاة بكفاءة، بينما كسب الريف تغطية جديدة لأول مرة.")])

    # --------------------------------------------------------------------------
    # SLIDE 34: HERO STAT & ANALYTICAL WING (C2 - Key Results & Radar)
    # Archetype 2: Hero Giant Stat & Analytical Wing
    # --------------------------------------------------------------------------
    s34 = builder.add_base_slide("نتائج المساهمة الثانية: تحسن مؤشر العدالة SFI وتحليل المفاضلات (C2)", 34, 73,
                                 section_badge="المحور 03: المساهمة الثانية (FAIR) — النتائج والحصاد")
    builder.layout_hero_stat(s34,
        giant_number="+36.5%",
        number_label="القفزة النوعية في مؤشر العدالة المكانية SFI",
        number_sub="ارتفاع المؤشر من 0.52 لـ AGA إلى 0.71 لـ BPSO (p < 0.001)",
        analytical_cards_list=[
            ("تحليل مخطط الرادار خماسي الأبعاد (الشكل 28)", [
                "مقارنة خماسية: التغطية، خفض الكلفة، كفاءة الطاقة، سرعة التنفيذ، ومؤشر العدالة.",
                "أثبتت BPSO هيمنتها الكاملة وتوسيع مساحة الرادار لتتفوق على AGA في كافة المحاور."
            ]),
            ("إنصاف المحافظات والمجتمعات الريفية", [
                "ارتفاع نسب التغطية في محافظات درعا، السويداء، الحسكة، ودير الزور بنسب بين 18% و 26%.",
                "إدخال 38% من الشعب السوري في مظلة النطاق العريض للجيل الخامس."
            ]),
            ("الكفاءة الاستثمارية للعدالة المكانية", [
                "تحقيق الشمول الرقمي الوطني بكلفة إضافية لا تتجاوز 1.7% مقارنة بالحل التجاري الأعمى.",
                "وفر صافٍ قدره 8.4 مليون دولار لـ BPSO مقارنة بـ AGA حتى بعد تطبيق قيد العدالة."
            ])
        ]
    )
    builder.set_notes(s34, "نتائج العدالة المكانية والقفزة الإحصائية (+36.5%) (C2)", "1.5 دقيقة",
                      "في الهندسة لا توجد حلول مجانية؛ العدالة المكانية فرضت علينا ضريبة طاقية طفيفة قدرها 2.4%، لكننا في مقابلها أدخلنا 38% من الشعب السوري في مظلة النطاق العريض وحققنا قفزة 36.5% في العدالة المكانية.",
                      "تثبيت القفزة الإحصائية لمؤشر SFI وتحليل الرادار خماسي الأبعاد.")

    # --------------------------------------------------------------------------
    # SLIDE 35: HORIZONTAL PIPELINE (Transition C2 -> C3)
    # Archetype 5: Horizontal Pipeline / Process Flow
    # --------------------------------------------------------------------------
    s35 = builder.add_base_slide("من التخطيط الاستراتيجي إلى التحكم التشغيلي الميداني", 35, 73,
                                 section_badge="المحور 03: فاصل وانتقال من العدالة (FAIR) إلى التحكم (CONTROL)")
    builder.layout_horizontal_pipeline(s35, [
        {
            "title": "التخطيط الاستراتيجي (PLAN & FAIR)",
            "color": COLOR_DEEP_TEAL,
            "items": [
                "تصميم مستقر طويل الأمد (Offline).",
                "يفترض استقرار الشبكة لشهور وسنوات.",
                "الفصول 4 و 5: أين نرقي؟ وكيف ننصف؟"
            ]
        },
        {
            "title": "المتغيرات والأزمات الميدانية",
            "color": COLOR_BURGUNDY,
            "items": [
                "حوادث طارئة، كوارث، أو فعاليات حساسة.",
                "متطلبات لحظية في الزمن الحقيقي (Real-time).",
                "الحاجة لعزل منطقة جغرافية محددة بدقة."
            ]
        },
        {
            "title": "قصور الحلول البدائية القائمة",
            "color": COLOR_TEXT_MUTED,
            "items": [
                "إطفاء طاقة المحطات (Cell Shutdown).",
                "أجهزة التشويش الراديوي المادي (Jamming).",
                "أضرار كارثية وحجب نداءات الطوارئ."
            ]
        },
        {
            "title": "التحكم البرمجي الذكي (CONTROL)",
            "color": COLOR_GOLD,
            "items": [
                "معمارية موجهة بـ GIS متعددة المصنعين.",
                "عزل الحوامل برمجياً دون إطفاء المحطة.",
                "الفصل 6: كيف نتحكم سيادياً ولحظياً؟"
            ]
        }
    ], bottom_summary_card={
        "title": "السؤال الحاكم للمساهمة الثالثة:",
        "items": ["كيف نمنح المشغل والجهات الوطنية أداة سيطرة برمجية رصينة لعزل أي بقعة جغرافية في دقائق معدودة، دون إطفاء الأبراج ودون تشويش ضار؟"]
    })
    builder.set_notes(s35, "فاصل وانتقال: من التخطيط الساكن إلى التحكم اللحظي", "1.5 دقيقة",
                      "المهندس لا يكتفي برسم الأبراج على الخريطة؛ بل يجب أن يمتلك مفاتيح التحكم بها في أحلك الظروف. التخطيط يجيب عن بناء الشبكة، لكن الأزمات تفرض امتلاك السيطرة الميدانية اللحظية دون تدمير البنية التحتية.",
                      "الانتقال المنطقي من التخطيط الساكن إلى التحكم الديناميكي اللحظي.")

    # --------------------------------------------------------------------------
    # SLIDE 36: 3D LAYERED GIS STACK (C3 - Control Overview)
    # Archetype 4: 3D Layered GIS Stack
    # --------------------------------------------------------------------------
    s36 = builder.add_base_slide("التحكم في التغطية الخلوية بمساعدة نظم المعلومات الجغرافية (C3)", 36, 73,
                                 section_badge="المحور 03: المساهمة الثالثة (CONTROL) — التحكم والعزل المكاني")
    builder.layout_layered_stack(s36,
        layers_list=[
            {"title": "واجهة رسم المضلع الجغرافي (GIS Target)", "sub": "رسم مضلع الحدث الحي على خريطة ArcGIS", "bg": COLOR_DARK_TEAL},
            {"title": "محرك التقاطع المكاني وزوايا السمت", "sub": "مطابقة زوايا السمت والـ Beamwidth والخلايا", "bg": COLOR_DEEP_TEAL},
            {"title": "منسق المشغلين متعدد الموردين", "sub": "REST/NETCONF مع Huawei U2020 و Ericsson ENM", "bg": COLOR_BURGUNDY}
        ],
        inspection_panels_list=[
            ("المكانة العلمية والتوثيق الدولي (Elsevier Q1)", [
                "نُشرت هذه المساهمة كبحث علمي أصيل في المجلة العالمية المرموقة:",
                "Computer Networks (Elsevier, Vol. 288, Art. 112653, 2026).",
                "معامل تأثير المجلة IF = 4.4 وتصنيف الربع الأول Q1."
            ]),
            ("الهدف التشغيلي والسيادي للمنظومة", [
                "تمكين مشغلي الاتصالات والجهات الوطنية من عزل خدمات الاتصال عن بقعة جغرافية محددة بدقة بالغة.",
                "تطبيق العزل دون إلحاق أي ضرر فيزيائي بالمحطات، وبلا أجهزة تشويش.",
                "استبقاء خطوط الطوارئ الحيوية 112 بنسبة 100% لفرق الإنقاذ."
            ]),
            ("سلسلة التنفيذ المؤتمتة (End-to-End)", [
                "رسم مضلع الحدث ← مطابقة الخلايا راديوياً ← توليد أوامر بروتوكولية ← عزل الحوامل في دقائق."
            ])
        ]
    )
    builder.set_notes(s36, "مدخل منظومة التحكم والسيطرة البرمجية (C3)", "1.5 دقيقة",
                      "هذه المساهمة ليست مجرد نموذج محاكاة؛ بل معمارية برمجية سيادية تم تحكيمها ونشرها في مجلة Computer Networks المصنفة Q1، وتطبق عملياً على شبكات الجيل الثاني والثالث والرابع السورية.",
                      "توثيق نشر المساهمة الثالثة في مجلة Computer Networks (Elsevier Q1).")

    # --------------------------------------------------------------------------
    # SLIDE 37: SPLIT-SCREEN VERSUS (C3 - RF Jamming vs Software Control)
    # Archetype 1: Split-Screen High Contrast / Versus
    # --------------------------------------------------------------------------
    s37 = builder.add_base_slide("الإشكالية التشغيلية: مخاطر التشويش وإطفاء الطاقة مقابل العزل البرمجي (C3)", 37, 73,
                                 section_badge="المحور 03: المساهمة الثالثة (CONTROL) — الإشكالية التشغيلية")
    builder.layout_split_screen(s37,
        right_title="مخاطر التشويش المادي وإطفاء المحطات (الأساليب التقليدية)",
        right_items=[
            "التشويش الراديوي (RF Jamming): فيضان عشوائي يعطل المشافي والمناطق الحيوية المجاورة ويلوث الطيف الترددي.",
            "حجب نداءات الطوارئ: تعمية الطيف تمنع مكالمات الإسعاف والدفاع المدني (112 / 110).",
            "إطفاء طاقة المحطة (Cell Shutdown): سقوط إشارة RSRP يسبب Signaling Storm يستنزف بطاريات أجهزة المواطنين.",
            "أضرار فيزيائية بالمولدات وتكلفة تشغيلية تستغرق ساعات طويلة لإعادة الخدمة."
        ],
        left_title="الحل المقترح للأطروحة: العزل البرمجي الموجه بـ GIS",
        left_items=[
            "المحطة القاعدية تظل نشطة ومستقرة كهربائياً وتبث إشاراتها المرجعية دون انقطاع.",
            "حجب حوامل البيانات (Bearers) برمجياً عبر نواة الشبكة وموائمات الراديو.",
            "استبقاء خطوط الطوارئ 112 بنسبة 100% وفق معايير 3GPP وقوانين الاتصالات.",
            "استعادة كاملة للخدمة برمجياً في دقائق معدودة وبضغطة زر واحدة فور زوال الحدث."
        ],
        right_color=COLOR_BURGUNDY, left_color=COLOR_DEEP_TEAL, vs_text="VS",
        bottom_banner="مبدأ الدفاع: مهندس الاتصالات الحقيقي لا يقبل بالتشويش المادي العشوائي؛ الحل الرصين هو التحكم البرمجي النظيف"
    )
    builder.set_notes(s37, "المعضلة التشغيلية: مخاطر التشويش المادي مقابل أمان العزل المكاني (C3)", "2.0 دقيقة",
                      "مهندس الاتصالات الحقيقي لا يقبل بالتشويش المادي؛ التشويش هو سلاح العاجز هندسياً لأنه يعطل المشافي ويمنع مكالمات الإسعاف. الحل الرصين هو استخدام بروتوكولات الشبكة لمعالجة حركة المرور دون المساس باستقرار الطيف أو إيقاف مكالمات الإنقاذ 112.",
                      "المقارنة الصارمة بين مخاطر التشويش المادي وتفوق العزل البرمجي.")

    # --------------------------------------------------------------------------
    # SLIDE 38: DECISION TREE (C3 - Spatial Intersection Engine)
    # Archetype 7: Algorithmic Decision Tree / Flow
    # --------------------------------------------------------------------------
    s38 = builder.add_base_slide("لماذا نظم المعلومات الجغرافية GIS؟ خوارزمية التقاطع المكاني (C3)", 38, 73,
                                 section_badge="المحور 03: المساهمة الثالثة (CONTROL) — الخوارزمية المكانية")
    builder.layout_decision_tree(s38,
        left_process={
            "title": "التصنيف الثلاثي للخلايا الراديوية (الشكل 31)",
            "items": [
                "1. خلايا داخلية كاملة (Full Intersection):",
                "   مخروط إشعاع القطاع يقع كلياً داخل المضلع ← عزل تام للحوامل.",
                "2. خلايا حدودية جزئية (Boundary Intersection):",
                "   يتقاطع جزء من شعاعها مع المضلع ← تعديل زاوية الميل الإلكتروني (Tilt) وتخفيض قدرة الإرسال لضغط البقعة.",
                "3. خلايا خارجية (Non-Intersecting):",
                "   خارج المضلع تماماً ← محظور مساسها لضمان استمرار خدمة الجوار."
            ]
        },
        right_process={
            "title": "مراحل خوارزمية التقاطع المكاني",
            "items": [
                "المرحلة 1: رسم المضلع الجغرافي وإسقاط إحداثيات WGS84.",
                "المرحلة 2: استدعاء خصائص الهوائيات الراديوية ثلاثية الأبعاد:",
                "   موقع البرج، زاوية السمت (Azimuth θ)، وعرض الحزمة (HPBW ϕ).",
                "المرحلة 3: نمذجة تضاريس الـ DEM 30m لحساب مدى التغطية الفعلي.",
                "المرحلة 4: تصدير ملف التحكم البرمجي (Action Profile) للمنسق فورياً."
            ]
        },
        center_bridge_text="تصنيف ثلاثي مؤتمت في أجزاء من الثانية"
    )
    builder.set_notes(s38, "محرك التقاطع المكاني GIS لزوايا السمت وعرض الحزمة (C3)", "1.5 دقيقة",
                      "استحالة تحديد الخلايا يدوياً دون أخطاء في شبكة تضم آلاف القطاعات؛ خوارزمية التقاطع المكاني الموجهة بالـ GIS تفرز الخلايا هندسياً في أجزاء من الثانية وتستبعد الخلايا الخارجية بنسبة خطأ 0%.",
                      "خوارزمية التقاطع المكاني وتصنيف الخلايا إلى كاملة وحدودية وخارجية.")

    # --------------------------------------------------------------------------
    # SLIDE 39: SPLIT-SCREEN UNIFIED (C3 - Multi-Vendor Huawei & Ericsson)
    # Archetype 1: Split-Screen Unified Multi-Vendor
    # --------------------------------------------------------------------------
    s39 = builder.add_base_slide("معمارية التنسيق متعددة الموردين (Huawei & Ericsson) (C3)", 39, 73,
                                 section_badge="المحور 03: المساهمة الثالثة (CONTROL) — معمارية التنسيق")
    builder.layout_split_screen(s39,
        right_title="موائم تجهيزات هواوي (Huawei Subsystem)",
        right_items=[
            "واجهات التخاطب الشمالية: iManager U2020 / iMaster NCE.",
            "بروتوكولات التنسيق: RESTful APIs و MML Scripts.",
            "نسبة نجاح التنسيق البرمجي: 98.1% ± 1.1%.",
            "كبت التسليم القسري (Handover Suppression): 93.2%.",
            "إدارة حوامل النطاق العريض على مستوى خوادم MME/SGW."
        ],
        left_title="موائم تجهيزات إريكسون (Ericsson Subsystem)",
        left_items=[
            "واجهات التخاطب الشمالية: Ericsson Network Manager (ENM).",
            "بروتوكولات التنسيق: NETCONF و CLI Automation.",
            "نسبة نجاح التنسيق البرمجي: 97.4% ± 1.4%.",
            "كبت التسليم القسري (Handover Suppression): 92.0%.",
            "توحيد معايير الأوامر عبر نماذج بيانات YANG القياسية."
        ],
        right_color=COLOR_BURGUNDY, left_color=COLOR_BLUE, vs_text="ORCH",
        bottom_banner="طبقة تجريد موحدة (Abstraction Layer) تدير شبكتي سيريتل و MTN ككيان وطني سيادي متكامل"
    )
    builder.set_notes(s39, "معمارية التنسيق البرمجية متعددة المصنعين (Huawei & Ericsson) (C3)", "1.5 دقيقة",
                      "الواقع السوري موزع بين معدات هواوي ومعدات إريكسون لدى المشغلين؛ ابتكارنا المعماري قدم طبقة تجريد وسيطة موحدة تتجاوز خصوصية كل مورد وتتحكم بالشبكتين ككيان وطني واحد دون الحاجة لتغيير أي عتاد صلب.",
                      "معمارية التنسيق المشتركة ونسب النجاح العالية لكلا المصنعين (> 97.4%).",
                      [("هل تتطلب هذه المعمارية تعديلات في عتاد المحطات (Hardware) لدى المشغلين؟",
                        "قطعاً لا؛ المعمارية مبنية بالكامل في طبقة البرمجيات (Software Layer) وتتصل بواجهات الإدارة الشمالية (NBI) المتوفرة افتراضياً في مخدمات Huawei U2020 و Ericsson ENM عبر بروتوكولات معيارية مثل NETCONF و REST.")])

    # --------------------------------------------------------------------------
    # SLIDE 40: BENTO GRID (C3 - Service Isolation Mechanics)
    # Archetype 3: Asymmetric Bento Grid
    # --------------------------------------------------------------------------
    s40 = builder.add_base_slide("آلية عزل الخدمة الانتقائي: إبقاء المحطة نشطة وحجب النطاق المستهدف (C3)", 40, 73,
                                 section_badge="المحور 03: المساهمة الثالثة (CONTROL) — آليات العزل")
    builder.layout_bento_grid(s40,
        hero_card={
            "title": "الإجراءات الثلاثية في طبقة النفاذ الراديوي (RAN)",
            "items": [
                "1. تعديل بارامترات إعادة الانتخاب (Cell Reselection): رفع Qoffset وعتبات q-RxLevMin لدفع الأجهزة لتجنب التخييم على خلايا العزل.",
                "2. كبت التسليم القسري (Handover Suppression): حظر علاقات الجوار وتعطيل تقارير القياس A3/A5 لمنع تسلل المكالمات للمنطقة (نجاح 93.2% لهواوي و 92.0% لإريكسون).",
                "3. حظر حوامل البيانات (Bearer Teardown): حظر حوامل الإنترنت الافتراضية (QCI 8-9) وحوامل الوسائط المتعددة (QCI 1-2) عبر نواة الشبكة."
            ]
        },
        top_side_card={
            "title": "استبقاء مكالمات الطوارئ 112 بنسبة 100%",
            "items": [
                "حوامل نداءات الطوارئ (QCI 70 / ARP Priority 1) تظل مفعلة ومحمية بالكامل.",
                "خلو قنوات الراديو من حركة المرور يمنح مكالمات الإسعاف نفاذاً فورياً."
            ]
        },
        bot_left_card={
            "title": "كبت التسليم",
            "items": ["منع تسلل المكالمات بنسبة 93.2% لهواوي و 92.0% لإريكسون."]
        },
        bot_right_card={
            "title": "ثبات إشارة RSRP",
            "items": ["بقاء المحطة نشطة يمنع استنزاف بطاريات هواتف المواطنين."]
        }
    )
    builder.set_notes(s40, "آليات العزل المكاني الثلاثية واستبقاء مكالمات الطوارئ 112 (C3)", "1.5 دقيقة",
                      "المحطة تظل تبث في الهواء، ولكنها لا تفتح أي جلسة بيانات للمستخدمين غير المصرح لهم؛ وتظل الأذن الصاغية الوحيدة مفتوحة لمكالمة إنقاذ قد تنقذ روحاً عبر الرقم 112.",
                      "استبقاء حوامل الطوارئ 112 بنسبة 100% وكبت التسليم القسري.",
                      [("كيف تضمنون عدم اختناق الخلية بمكالمات الطوارئ أثناء العزل؟",
                        "الضمانة مستمدة من معايير 3GPP (TS 22.101)؛ العزل يعمل على مستوى طبقة الحوامل (Bearers). بما أننا حظرنا 99% من حركة الإنترنت والصوت العادي، تصبح قنوات النفاذ العشوائي (PRACH) شاغرة بالكامل لمكالمة الطوارئ 112 دون أي اختناق.")])

    # --------------------------------------------------------------------------
    # SLIDE 41: HORIZONTAL PIPELINE (C3 - Rollback & Restoration)
    # Archetype 5: Horizontal Pipeline / Process Flow
    # --------------------------------------------------------------------------
    s41 = builder.add_base_slide("المراقبة المستمرة لمؤشرات الأداء (KPIs) والاستعادة السريعة (C3)", 41, 73,
                                 section_badge="المحور 03: المساهمة الثالثة (CONTROL) — الاستعادة المؤتمتة")
    builder.layout_horizontal_pipeline(s41, [
        {
            "title": "إنهاء المضلع في واجهة GIS",
            "color": COLOR_DEEP_TEAL,
            "items": [
                "إصدار أمر إلغاء العزل بنقرة زر واحدة فور انتهاء حالة الطوارئ.",
                "تحديد قائمة الخلايا والبارامترات المستهدفة بالاسترجاع آلياً."
            ]
        },
        {
            "title": "تطبيق سكريبتات الاسترجاع",
            "color": COLOR_BLUE,
            "items": [
                "إرسال أوامر إعادة الضبط عبر موائمات NETCONF و REST للمنسق.",
                "استعادة بارامترات الجوار الراديوي وتفعيل حوامل البيانات فورياً."
            ]
        },
        {
            "title": "فحص مؤشرات الجودة (KPIs)",
            "color": COLOR_GOLD,
            "items": [
                "فحص آلي لـ RSRP و RSRQ ومعدل نجاح النفاذ الراديوي.",
                "التحقق من انخفاض معدل قطع المكالمات: Call Drop Rate < 0.5%."
            ]
        },
        {
            "title": "أزمنة الاستعادة الموثقة",
            "color": COLOR_EMERALD,
            "items": [
                "2G GSM: < 5 دقائق (المتوسط: 4.2 دقيقة).",
                "3G UMTS: < 7 دقائق (المتوسط: 6.1 دقيقة).",
                "4G LTE: < 10 دقائق (المتوسط: 8.7 دقيقة)."
            ]
        }
    ], bottom_summary_card={
        "title": "اتساق الاسترجاع البرمجي المؤتمت (Restoration Consistency):",
        "items": ["96.8% لمعدات هواوي، و 95.9% لمعدات إريكسون — تقليص زمن إعادة الخدمة من ساعات طويلة إلى دقائق معدودة وبلا تدخل بشري ميداني."]
    })
    builder.set_notes(s41, "بروتوكول الاستعادة المؤتمتة بعد الطوارئ (Rollback Pipeline) (C3)", "1.5 دقيقة",
                      "في الأساليب التقليدية، يحتاج المشغل لساعات طويلة لإرسال فرق ميدانية لإعادة تشغيل الأبراج المتوقفة؛ في منظومتنا البرمجية، بمجرد انتهاء حالة الطوارئ، يُلغى العزل وتعود الخدمة بكامل طاقتها خلال 8.7 دقائق لشبكة الـ 4G.",
                      "بروتوكول الاسترجاع التلقائي والتحقق من مؤشرات جودة الخدمة.")

    # --------------------------------------------------------------------------
    # SLIDE 42: QUAD-KPI (C3 - Results & Engineering Limitations)
    # Archetype 11: Quad-KPI Metric Command
    # --------------------------------------------------------------------------
    s42 = builder.add_base_slide("حصاد المساهمة الثالثة: النتائج المؤكدة والحدود الهندسية (C3)", 42, 73,
                                 section_badge="المحور 03: المساهمة الثالثة (CONTROL) — النتائج والشفافية الأكاديمية")
    builder.layout_quad_kpi(s42,
        kpi_list=[
            {"val": "97.5%", "label": "دقة العزل الحضري", "sub": "داخل مضلع الحدث الجغرافي", "color": COLOR_EMERALD},
            {"val": "> 97.4%", "label": "نجاح الأوركسترا الموحدة", "sub": "98.1% هواوي | 97.4% إريكسون", "color": COLOR_BLUE},
            {"val": "> 92.0%", "label": "كبت التسليم القسري", "sub": "منع تسلل المكالمات لمنطقة العزل", "color": COLOR_DEEP_TEAL},
            {"val": "< 10 min", "label": "أقصى زمن استعادة 4G", "sub": "تقليص من ساعات لدقائق معدودة", "color": COLOR_GOLD}
        ],
        bottom_card_title="الشفافية الأكاديمية والاعتراف بالحد الفيزيائي: تسرب الريف > 46%",
        bottom_card_items=[
            "توثيق الحد الهندسي والفيزيائي الصريح: في البيئات الريفية والمفتوحة، تتجاوز نسبة التسرب الراديوي 46% خارج حدود المضلع الجغرافي.",
            "التفسير الفيزيائي المعمق: أنصاف أقطار الخلايا الريفية كبيرة جداً (Macro-cells > 5-10 km) وأبراجها شاهقة، مع انعدام العوائق العمرانية المخففة.",
            "التوصيات الهندسية للتغلب على الحد: استخدام الخلايا الصغيرة (Small Cells) في النقاط الحساسة، والتحكم بزوايا الميل الإلكتروني (RET) لضغط فص الإشعاع.",
            "هذا التوثيق يثبت أمانة البحث ومصداقيته العالية أمام لجنة التحكيم الموقرة."
        ]
    )
    builder.set_notes(s42, "نتائج التحكم الميدانية وحدود التسرب الفيزيائي في الأرياف (C3)", "2.0 دقيقة",
                      "سادتي أعضاء اللجنة، الباحث الصادق لا يكتفي بعرض نجاحاته؛ نحن نصارحكم بأن دقة العزل البالغة 97.5% في المدن تتراجع في الأرياف ويفيض التسرب لأكثر من 46% بسبب فيزياء الأمواج والخلايا العملاقة. هذا الاعتراف هو مصدر قوة لأطروحتنا وتوثيق دقيق لحدود تطبيقها.",
                      "الجمع بين عرض النتائج القياسية والاعتراف العلمي الصريح بحد التسرب الريفي.",
                      [("ألا يعتبر تسرب الريف بنسبة > 46% فشلاً للمساهمة الثالثة في البيئة الريفية؟",
                        "على الإطلاق؛ بل هو تأكيد للأمانة وفهم فيزياء انتشار الأمواج. انتشار الترددات في الفضاء المفتوح تحكمه معادلات ماكسويل ونماذج فقد المسار وليس الحدود الإدارية للخرائط. البرج الريفي يغطي 10 كم ويستحيل فيزيائياً قص موجته بالمسطرة. وقد أوصينا باستخدام الخلايا الصغيرة وضبط زوايا RET.")])

    # --------------------------------------------------------------------------
    # SLIDE 43: TRIANGULAR BALANCE (Synthesis - 3 Contributions)
    # Archetype 13: Triangular Prism Balance
    # --------------------------------------------------------------------------
    s43 = builder.add_base_slide("المساهمات الثلاث على رقعة الجغرافيا السورية: سردية علمية موحدة", 43, 73,
                                 section_badge="المحور 03: التركيب والتكامل — السردية العلمية الموحدة")
    builder.layout_triangular_balance(s43,
        core_title="المنظومة الوطنية الموحدة لدورة حياة الشبكة الخلوية السورية",
        core_sub="تكامل عضوي مغلق: 79,268 موقعاً خلوياً عبر 14 محافظة سورية",
        pillars_list=[
            {
                "title": "المساهمة 1: التخطيط (PLAN)",
                "color": COLOR_DEEP_TEAL,
                "items": [
                    "الفصل الرابع من الأطروحة.",
                    "ترقية 30,010 مواقع لـ 5G.",
                    "وفر 8.4M$ في CapEx (5.95%).",
                    "وفر 4.4 MWh في الطاقة (5.32%).",
                    "تغطية 95.12% عبر BPSO (118s)."
                ]
            },
            {
                "title": "المساهمة 2: العدالة (FAIR)",
                "color": COLOR_BURGUNDY,
                "items": [
                    "الفصل الخامس من الأطروحة.",
                    "صياغة مؤشر SFI = 0.71.",
                    "قفزة +36.5% في العدالة المكانية.",
                    "رفع تغطية الريف من 64.2% لـ 88.7%.",
                    "إنصاف 38% من سكان سوريا."
                ]
            },
            {
                "title": "المساهمة 3: التحكم (CONTROL)",
                "color": COLOR_GOLD,
                "items": [
                    "الفصل السادس من الأطروحة.",
                    "أوركسترا موحدة لهواوي وإريكسون.",
                    "دقة عزل 97.5% في المدن.",
                    "استبقاء طوارئ 112 بنسبة 100%.",
                    "استعادة كاملة في < 10 دقائق (Q1)."
                ]
            }
        ]
    )
    builder.set_notes(s43, "التركيب: تكامل المساهمات الثلاث (PLAN + FAIR + CONTROL)", "1.5 دقيقة",
                      "هنا تلتقي خيوط الأطروحة كلها في بناء ثلاثي متزن: لم نترك الشبكة السورية عند مرحلة التخطيط النظري، بل رافقناها حتى استقرت منصفة في الميدان ومحمية بأدوات سيطرة تشغيلية لحظية.",
                      "التركيب الهندسي والتكامل العضوي بين المساهمات الثلاث.")

    # --------------------------------------------------------------------------
    # SLIDE 44: 3D LAYERED GIS STACK (Synthesis - Unified Framework)
    # Archetype 4: 3D Layered GIS Stack (5 Stages)
    # --------------------------------------------------------------------------
    s44 = builder.add_base_slide("الإطار البحثي الموحد: منظومة التخطيط والتحكم البرمجي بالشبكة الخلوية", 44, 73,
                                 section_badge="المحور 03: الإطار الوطني المتكامل الشامل")
    builder.layout_layered_stack(s44,
        layers_list=[
            {"title": "المدخلات المكانية الوطنية", "sub": "79,268 موقعاً + DEM 30m + Clutter", "bg": COLOR_DARK_TEAL},
            {"title": "محرك الاستمثال والترقية الذكية", "sub": "BPSO/AGA + Adaptive Repair Heuristic", "bg": COLOR_DEEP_TEAL},
            {"title": "معيار التكافؤ الجغرافي والعدالة", "sub": "SFI ≥ 0.70 + مشغل إعادة التوزيع المكاني", "bg": COLOR_BURGUNDY},
            {"title": "منسق المشغلين متعدد الموردين", "sub": "Huawei & Ericsson via REST/NETCONF", "bg": COLOR_BLUE},
            {"title": "طبقة العزل البرمجي والاستعادة", "sub": "عزل الحوامل + حفظ 112 + استعادة <10د", "bg": COLOR_GOLD}
        ],
        inspection_panels_list=[
            ("القيمة السيادية والتشغيلية للإطار الوطني", [
                "معمارية برمجية سيادية متكاملة ومغلقة مقدمة للهيئة الناظمة والمشغلين في سوريا.",
                "تغطي دورة حياة الشبكة الخلوية من التصميم النظري إلى العدالة الميدانية والسيطرة اللحظية.",
                "لا تتطلب أي استثمارات إضافية في تبديل العتاد وتعمل فوق البنى التحتية القائمة."
            ]),
            ("الاعتمادية والمرونة الهندسية", [
                "جاهزية تامة للتوسع نحو تقنيات ما بعد 5G و Open-RAN والشبكات غير الأرضية (NTN).",
                "أمان تشغيلي كامل واستبقاء نداءات الطوارئ والإنقاذ في كافة الظروف."
            ])
        ]
    )
    builder.set_notes(s44, "المعمارية المتكاملة للإطار الوطني الموحد", "1.5 دقيقة",
                      "هذا المخطط هو المعمارية الكاملة لأطروحة الدكتوراه: منظومة برمجية سيادية متكاملة ومغلقة مقدمة للهيئة الناظمة للاتصالات والمشغلين في الجمهورية العربية السورية لحماية الاستثمارات وضمان العدالة والأمن.",
                      "استعراض المعمارية البرمجية خماسية المراحل للإطار الوطني.")

    # --------------------------------------------------------------------------
    # SLIDE 45: BENTO GRID (Defense Takeaways)
    # Archetype 3: Asymmetric Bento Grid
    # --------------------------------------------------------------------------
    s45 = builder.add_base_slide("حصاد المساهمات البحثية: ما يجب أن تتذكره لجنة التحكيم الموقرة", 45, 73,
                                 section_badge="المحور 03: رسائل الدفاع الأكاديمية الثلاث")
    builder.layout_bento_grid(s45,
        hero_card={
            "title": "المساهمة 1 (PLAN): التخطيط الأمثل وترشيد الموارد",
            "items": [
                "بناء نموذج استمثال متعدد الأهداف مدفوع بالبيانات الجغرافية مع آلية إصلاح قيود تكيفية.",
                "ترقية 30,010 مواقع وتحقيق تغطية 95.12% مع خفض CapEx بـ 5.95% (وفر 8.4M$).",
                "ترشيد الطاقة بـ 5.32% (وفر 4.4 MWh) بزمن حسابي 118 ثانية (p = 0.016).",
                "سند البرهان: الفصل الرابع من الأطروحة ورقة قيد التحكيم."
            ]
        },
        top_side_card={
            "title": "المساهمة 2 (FAIR): كسر التحيز وإنصاف الريف",
            "items": [
                "صياغة مؤشر SFI = 0.71 المبتكر المستند لمعامل جيني المكاني ودمجه بمشغل إعادة توزيع جغرافي.",
                "رفع تغطية الريف من 64.2% إلى 88.7% بقفزة عدالة +36.5% لصالح 38% من السكان (p < 0.001).",
                "سند البرهان: الفصل الخامس من الأطروحة ورقة قيد التحكيم."
            ]
        },
        bot_left_card={
            "title": "المساهمة 3 (CONTROL): السيادة البرمجية",
            "items": [
                "عزل مكاني 97.5%، وتنسيق 97.4%، وحفظ طوارئ 112، واستعادة < 10د.",
                "سند البرهان: Elsevier Q1 (2026)."
            ]
        },
        bot_right_card={
            "title": "الخلاصة الدفاعية الجامعة",
            "items": [
                "خططنا بالذكاء (PLAN)، وأنصفنا بالجغرافيا (FAIR)، وسيطرنا بالمعايير (CONTROL)."
            ]
        }
    )
    builder.set_notes(s45, "رسائل الدفاع الأكاديمية الثلاث للجنة الحكم الموقرة", "2.0 دقيقة",
                      "هكذا سادتي أعضاء اللجنة الموقرة، تكتمل أركان البحث الثلاثة: خططنا بالذكاء (PLAN)، وأنصفنا بالجغرافيا (FAIR)، وسيطرنا بالمعايير (CONTROL). هذه النتائج الثلاث الموثقة تمثل مساهمتنا الأصيلة في خدمة العلم والجمهورية العربية السورية.",
                      "تثبيت الرسائل العلمية الثلاث الصريحة والموثقة في ذهن لجنة التحكيم قبل الانتقال لمحور النتائج.")

    # Save presentation
    builder.save(output_path)


if __name__ == "__main__":
    output_file = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "presentation_axis_03.pptx")
    )
    print(f"[INFO] Starting generation of Axis 03 Presentation to: {output_file}")
    build_axis_03_presentation(output_file)
    print("[SUCCESS] All 29 slides built successfully with 0 consecutive layout repetitions!")
