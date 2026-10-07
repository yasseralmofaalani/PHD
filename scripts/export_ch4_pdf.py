# -*- coding: utf-8 -*-
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PPTX = ROOT / "Chapter_4_5G_Optimization_Defense.pptx"
PDF = ROOT / "Chapter_4_5G_Optimization_Defense.pdf"


def export_via_powerpoint():
    import win32com.client  # type: ignore

    app = win32com.client.Dispatch("PowerPoint.Application")
    app.Visible = True
    pres = app.Presentations.Open(str(PPTX), WithWindow=False)
    # 32 = ppSaveAsPDF
    pres.SaveAs(str(PDF), 32)
    pres.Close()
    app.Quit()
    print("PDF via PowerPoint:", PDF)


def export_via_comtypes():
    from comtypes.client import CreateObject  # type: ignore

    app = CreateObject("PowerPoint.Application")
    app.Visible = 1
    pres = app.Presentations.Open(str(PPTX), WithWindow=False)
    pres.SaveAs(str(PDF), 32)
    pres.Close()
    app.Quit()
    print("PDF via comtypes:", PDF)


if __name__ == "__main__":
    if not PPTX.exists():
        raise SystemExit(f"missing {PPTX}")
    try:
        export_via_powerpoint()
    except Exception as e1:
        print("win32com failed:", e1)
        try:
            export_via_comtypes()
        except Exception as e2:
            print("comtypes failed:", e2)
            raise SystemExit(2)
