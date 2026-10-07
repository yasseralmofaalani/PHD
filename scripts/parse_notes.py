import re
import json

def parse_speaker_notes():
    with open('src/data/speakerNotes.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    slides = {}
    # Matches patterns like:
    # 0: {
    #   title: "...",
    #   points: [
    #     "...",
    #     "..."
    #   ],
    #   timeMinutes: "..."
    # },
    # Let's split by number: {
    pattern = re.compile(r'^\s*(\d+):\s*\{', re.MULTILINE)
    matches = list(pattern.finditer(content))
    
    for i, match in enumerate(matches):
        slide_num = int(match.group(1))
        start_pos = match.start()
        end_pos = matches[i+1].start() if i + 1 < len(matches) else len(content)
        block = content[start_pos:end_pos]
        
        # Extract title
        title_m = re.search(r'title:\s*["\']([^"\']+)["\']', block)
        title = title_m.group(1) if title_m else f"Slide {slide_num}"
        
        # Extract timeMinutes
        time_m = re.search(r'timeMinutes:\s*["\']([^"\']+)["\']', block)
        time_min = time_m.group(1) if time_m else "1"
        
        # Extract points
        points = []
        pts_match = re.search(r'points:\s*\[(.*?)\]', block, re.DOTALL)
        if pts_match:
            pts_str = pts_match.group(1)
            # Find quoted strings
            raw_pts = re.findall(r'["\']([^"\']+)["\']', pts_str)
            points = [p.strip() for p in raw_pts if p.strip()]
            
        slides[slide_num] = {
            "slide_num": slide_num,
            "title": title,
            "timeMinutes": time_min,
            "points": points
        }
        
    print(f"Parsed {len(slides)} slides successfully.")
    with open('scripts/parsed_slides.json', 'w', encoding='utf-8') as f:
        json.dump(slides, f, ensure_ascii=False, indent=2)
    return slides

if __name__ == '__main__':
    parse_speaker_notes()

