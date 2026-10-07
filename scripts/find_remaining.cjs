const fs = require('fs');

const lines = fs.readFileSync('src/data/speakerNotes.ts', 'utf8').split('\n');
lines.forEach((line, idx) => {
  if (line.includes('النقطة العلمية') || line.includes('ما يجب تذكره')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});

