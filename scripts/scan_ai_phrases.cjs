const fs = require('fs');
const path = require('path');

const keywords = [
  'ثوري', 'ثورية', 'فريد', 'فريدة', 'خارق', 'أسطوري', 'غير مسبوق', 
  'لا شك', 'مما لا ريب', 'الجدير بالذكر', 'يجدر التنويه', 'تجدر الإشارة',
  'من نافلة القول', 'حجر الزاوية', 'لا غنى عنه', 'نقلة نوعية', 'بصمتي',
  'سحر', 'سحري', 'خارق للعادة', 'خارطة طريق الأجيال', 'مبتكرة', 'المبتكرة',
  'ماذا أعرض', 'ما يجب تذكره', 'اللجنة الموقرة', 'بصمتي البحثية',
  'My Contribution', 'فائقة التطور', 'كسر اللعبة', 'Game Changer'
];

function scanDir(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(scanDir(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        keywords.forEach(kw => {
          if (line.includes(kw)) {
            results.push({ 
              file: fullPath.replace(/\\/g, '/'), 
              line: idx + 1, 
              kw, 
              text: line.trim() 
            });
          }
        });
      });
    }
  }
  return results;
}

const hits = scanDir('src');
console.log('Total hits:', hits.length);

const slideHits = hits.filter(h => !h.file.includes('speakerNotes.ts'));
console.log('\n=== HITS IN SLIDES & COMPONENTS (' + slideHits.length + ') ===');
slideHits.forEach(h => {
  console.log(`${h.file}:${h.line} [${h.kw}] -> ${h.text}`);
});

const notesHits = hits.filter(h => h.file.includes('speakerNotes.ts'));
console.log('\n=== HITS IN SPEAKER NOTES: ' + notesHits.length + ' ===');
