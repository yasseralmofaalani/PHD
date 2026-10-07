const fs = require('fs');

const content = fs.readFileSync('src/data/speakerNotes.ts', 'utf8');

const titleRegex = /title:\s*["']([^"']+)["']/g;
let match;
let slideIndex = 0;
while ((match = titleRegex.exec(content)) !== null) {
  const title = match[1];
  if (title.includes('بصمتي') || title.includes('اللجنة') || title.includes('ابتكاري') || title.includes('ما يجب')) {
    console.log(`Slide title match: "${title}"`);
  }
}

