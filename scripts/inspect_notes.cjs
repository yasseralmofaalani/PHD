const fs = require('fs');

const content = fs.readFileSync('src/data/speakerNotes.ts', 'utf8');

// Parse speakerNotes object roughly or via vm
const vm = require('vm');
// convert export const speakerNotes = ... to module.exports
const jsContent = content
  .replace(/export const speakerNotes:[^=]+=/g, 'const speakerNotes =')
  .replace(/\n\s*timeMinutes/g, 'timeMinutes') + '\nmodule.exports = speakerNotes;';

const sandbox = { module: {} };
vm.createContext(sandbox);
vm.runInContext(jsContent, sandbox);
const notes = sandbox.module.exports;

console.log('Total slides in notes:', Object.keys(notes).length);

for (let i = 17; i <= 25; i++) {
  console.log(`\n--- Slide ${i}: ${notes[i]?.title} ---`);
  notes[i]?.points.forEach((p, idx) => console.log(`  [${idx}] ${p}`));
}

