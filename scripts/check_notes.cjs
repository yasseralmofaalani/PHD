const fs = require('fs');

const content = fs.readFileSync('src/data/speakerNotes.ts', 'utf8');
const words = [
  'ثوري', 'غير مسبوق', 'خارق', 'أسطوري', 'Game Changer', 
  'كسر اللعبة', 'لا شك', 'مما لا ريب', 'الجدير بالذكر', 
  'يجدر التنويه', 'لا غنى عنه', 'حجر الزاوية', 'نقلة نوعية',
  'ماذا أعرض', 'النقطة العلمية', 'بصمتي البحثية', 'ما يجب تذكره',
  'اللجنة الموقرة', 'بصمتي'
];

console.log('--- Speaker Notes Occurrences ---');
words.forEach(w => {
  const matches = content.match(new RegExp(w, 'g')) || [];
  if (matches.length > 0) {
    console.log(`${w}: ${matches.length}`);
  }
});

