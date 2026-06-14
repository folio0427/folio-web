// One-off audit: compare HTML default text vs i18n zh dict (safe-to-remove check)
const fs = require('fs');
const src = fs.readFileSync('js/i18n.js', 'utf8');
const zhStart = src.indexOf('zh: {');
const enStart = src.indexOf('en: {');
const zhBlock = src.slice(zhStart, enStart);
const dict = {};
const re = /'([^']+)':\s*'((?:[^'\\]|\\.)*)'/g;
let m;
while ((m = re.exec(zhBlock))) dict[m[1]] = m[2].replace(/\\'/g, "'");
console.log('zh keys:', Object.keys(dict).length);

const norm = (s) =>
  s
    .replace(/<br\s*\/?>/g, '<br>')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .trim();

let drift = 0;
for (const page of ['index.html', 'terms.html', 'privacy.html']) {
  const html = fs.readFileSync(page, 'utf8');
  const elRe = /<(\w+)([^>]*?)data-i18n="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g;
  let e;
  while ((e = elRe.exec(html))) {
    const key = e[3];
    const inner = e[5];
    if (inner.includes('<') && /data-i18n=/.test(inner)) continue; // nested i18n spans — outer match unreliable, inner ones matched separately
    if (dict[key] === undefined) {
      console.log('MISSING KEY', page, key);
      drift++;
      continue;
    }
    if (norm(inner) !== norm(dict[key])) {
      drift++;
      console.log('DRIFT', page, key);
      console.log('  html:', norm(inner).slice(0, 90));
      console.log('  dict:', norm(dict[key]).slice(0, 90));
    }
  }
}
console.log(drift === 0 ? 'NO DRIFT — safe to conditional-load' : drift + ' diffs found');
