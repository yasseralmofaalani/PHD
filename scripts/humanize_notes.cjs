const fs = require('fs');

const raw = fs.readFileSync('src/data/speakerNotes.ts', 'utf8');

function humanizePoint(str) {
  let s = str.trim();

  // 1. Point 0: Visual Cue / Slide Topic
  if (s.startsWith('ماذا أعرض:')) {
    s = s.replace(/^ماذا أعرض:\s*/, '');
    if (s.startsWith('مدخل')) s = 'تقديم ' + s;
    else if (s.startsWith('خارطة') || s.startsWith('الخارطة')) s = 'استعراض ' + s;
    else if (s.startsWith('خريطة') || s.startsWith('الخريطة')) s = 'عرض ' + s;
    else if (s.startsWith('مسار')) s = 'توضيح ' + s;
    else if (s.startsWith('الركائز') || s.startsWith('ركائز')) s = 'استعراض ' + s;
    else if (s.startsWith('الصياغة')) s = 'شرح ' + s;
    else if (s.startsWith('المخطط') || s.startsWith('مخطط')) s = 'استعراض ' + s;
    else if (s.startsWith('المقارنة') || s.startsWith('مقارنة')) s = 'إجراء ' + s;
    else if (s.startsWith('الشكل') || s.startsWith('شكل')) s = 'مناقشة معطيات ' + s;
    else if (s.startsWith('الأرقام') || s.startsWith('بطاقات')) s = 'إبراز ' + s;
    else if (s.startsWith('تصنيف')) s = 'توضيح ' + s;
    else if (s.startsWith('المعادلة') || s.startsWith('معادلة')) s = 'بيان ' + s;
    else if (s.startsWith('تفاصيل')) s = 'استعراض ' + s;
    else if (s.startsWith('الورقة') || s.startsWith('ورقة')) s = 'تقديم تفاصيل ' + s;
    else if (s.startsWith('مصفوفة')) s = 'شرح ' + s;
    else if (s.startsWith('اللوحة') || s.startsWith('لوحة')) s = 'استعراض ' + s;
    else if (s.startsWith('التدفق')) s = 'تتبع ' + s;
    else if (s.startsWith('المقولة')) s = 'مناقشة المبدأ العلمي: ' + s.replace(/^المقولة الفلسفية المعرفية للأطروحة:\s*/, '');
    else if (s.startsWith('الانتقال')) s = 'توضيح مسار الانتقال ' + s.replace(/^الانتقال\s*/, '');
    else if (s.startsWith('المعمارية')) s = 'استعراض المعمارية ' + s.replace(/^المعمارية\s*/, '');
    else if (s.startsWith('المعالجة')) s = 'شرح المعالجة ' + s.replace(/^المعالجة\s*/, '');
    else if (s.startsWith('النتائج')) s = 'استعراض النتائج ' + s.replace(/^النتائج\s*/, '');
    else if (s.startsWith('السلسلة')) s = 'توضيح السلسلة ' + s.replace(/^السلسلة\s*/, '');
    else if (s.startsWith('أربعة استنتاجات')) s = 'استعراض أربعة استنتاجات ' + s.replace(/^أربعة استنتاجات\s*/, '');
    else if (s.startsWith('ستة اتجاهات')) s = 'طرح ستة اتجاهات ' + s.replace(/^ستة اتجاهات\s*/, '');
    else if (s.startsWith('الخلاصات')) s = 'إيجاز الخلاصات ' + s.replace(/^الخلاصات\s*/, '');
    else if (s.startsWith('المنصة')) s = 'استعراض المنصة ' + s.replace(/^المنصة\s*/, '');
    else if (s.startsWith('الصياغات')) s = 'استعراض الصياغات ' + s.replace(/^الصياغات\s*/, '');
    else if (s.startsWith('الأعمدة')) s = 'استعراض الأعمدة ' + s.replace(/^الأعمدة\s*/, '');
    else s = 'استعراض ' + s;
  }

  // 2. Point 1: Scientific / Technical Core
  else if (s.startsWith('النقطة العلمية:')) {
    s = s.replace(/^النقطة العلمية:\s*/, '');
    if (!s.startsWith('توضيح') && !s.startsWith('التركيز') && !s.startsWith('إبراز') && !s.startsWith('بيان') && !s.startsWith('تحليل') && !s.startsWith('شرح')) {
      s = 'الأساس العلمي: ' + s;
    }
  }

  // 3. Point 2: Methodological Contribution
  else if (s.startsWith('بصمتي البحثية:')) {
    s = s.replace(/^بصمتي البحثية:\s*/, '');
    s = 'المساهمة المنهجية للأطروحة: ' + s;
  }

  // 4. Point 3: Takeaway / Conclusion
  else if (s.startsWith('ما يجب تذكره:')) {
    s = s.replace(/^ما يجب تذكره:\s*/, '');
    s = 'الخلاصة المستخلصة: ' + s;
  }

  // Sanitizing internal AI hallmarks
  s = s.replace(/بصمتي البحثية/g, 'المساهمة المنهجية للأطروحة');
  s = s.replace(/بصمتي/g, 'مساهمة الأطروحة');
  s = s.replace(/إضافتي البحثية/g, 'التعديل المنهجي المقترح');
  s = s.replace(/اللجنة الموقرة/g, 'لجنة الحكم الموقرة');
  s = s.replace(/تثبت للجنة التحكيم أن/g, 'تؤكد النتائج أن');
  s = s.replace(/تبرهن للجنة التحكيم أن/g, 'يبرهن التحليل الميداني على أن');
  s = s.replace(/إثبات للجنة أن/g, 'إثبات أن');
  s = s.replace(/التأكيد للجنة الحكم أن/g, 'التأكيد على أن');
  s = s.replace(/إقناع اللجنة ب/g, 'تأكيد ');
  s = s.replace(/تثبت للجنة أن/g, 'تبرهن النتائج على أن');
  s = s.replace(/الرسالة الختامية للجنة:/g, 'الخلاصة الختامية:');
  s = s.replace(/أطروحتنا ليست/g, 'الأطروحة لا تقدم');
  s = s.replace(/ورقتنا المنشورة/g, 'الورقة المنشورة');
  s = s.replace(/ابتكار مشغل/g, 'تطوير وتضمين مشغل');
  s = s.replace(/ابتكرنا مشغلاً/g, 'طورنا مشغلاً');

  return s;
}

// Clean titles
let content = raw.replace(/title:\s*"المساهمة 1: بصمتي البحثية: آلية إصلاح القيود التكيفية"/g, 'title: "المساهمة 1: مشغل إصلاح القيود التكيفي (Constraint Repair)"');
content = content.replace(/title:\s*"المساهمة 2: بصمتي البحثية: دمج قيد العدالة وإعادة التوزيع المكاني"/g, 'title: "المساهمة 2: دمج قيد العدالة وإعادة التوزيع المكاني"');
content = content.replace(/title:\s*"حصاد المساهمات البحثية: ما يجب أن تتذكره اللجنة الموقرة"/g, 'title: "حصاد المساهمات البحثية: الخلاصة الاستراتيجية للأطروحة"');

const lines = content.split(/\r?\n/);
const newLines = [];
let slideNum = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const slideMatch = line.match(/^\s*(\d+):\s*\{/);
  if (slideMatch) {
    slideNum = parseInt(slideMatch[1], 10);
  }

  if (slideNum !== null && slideNum >= 17) {
    const pointMatch = line.match(/^(\s*)"(.*)",?$/);
    if (pointMatch) {
      const indent = pointMatch[1];
      const text = pointMatch[2];
      if (text.includes('ماذا أعرض:') || text.includes('النقطة العلمية:') || text.includes('بصمتي البحثية:') || text.includes('ما يجب تذكره:')) {
        const cleaned = humanizePoint(text);
        newLines.push(`${indent}"${cleaned}",`);
        continue;
      }
    }
  }

  newLines.push(line);
}

fs.writeFileSync('src/data/speakerNotes.ts', newLines.join('\n'), 'utf8');
console.log('Successfully updated src/data/speakerNotes.ts');

