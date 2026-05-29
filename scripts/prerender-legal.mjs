// Prerender legal markdown into terms.html / privacy.html for SEO.
//
// Why: the live page fetches .md via JS at runtime, which Googlebot can render
// but indexes slowly and unreliably. Inlining the ZH version makes the static
// HTML self-contained while the JS still handles ZH↔EN switching at runtime.
//
// Usage:
//   node scripts/prerender-legal.mjs
//
// Or via GitHub Action (.github/workflows/prerender-legal.yml) on push to
// legal/*.md or this script.

import { readFile, writeFile } from 'node:fs/promises';
import { marked } from 'marked';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..');

const MARK_START = '<!-- LEGAL_PRERENDERED_START -->';
const MARK_END = '<!-- LEGAL_PRERENDERED_END -->';

marked.use({ gfm: true, breaks: false });

async function prerender(htmlRelPath, mdRelPath) {
  const htmlPath = path.join(root, htmlRelPath);
  const mdPath = path.join(root, mdRelPath);
  const md = await readFile(mdPath, 'utf-8');
  const html = await readFile(htmlPath, 'utf-8');
  const rendered = marked.parse(md);
  const block = [
    MARK_START,
    '<div class="legal-prerendered" data-prerendered-lang="zh">',
    rendered.trim(),
    '</div>',
    MARK_END,
  ].join('\n');

  if (!html.includes(MARK_START) || !html.includes(MARK_END)) {
    throw new Error(
      `Missing markers in ${htmlRelPath}. ` +
        `Add ${MARK_START} ... ${MARK_END} inside <article id="legal-content">.`
    );
  }

  const re = new RegExp(
    `${escapeRe(MARK_START)}[\\s\\S]*?${escapeRe(MARK_END)}`
  );
  const updated = html.replace(re, block);
  if (updated === html) {
    console.log(`  no change: ${htmlRelPath}`);
    return;
  }
  await writeFile(htmlPath, updated);
  console.log(`  rendered: ${htmlRelPath}  (${md.length} chars md → ${rendered.length} chars html)`);
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

console.log('Prerendering legal pages (ZH version inlined for SEO)…');
await prerender('terms.html', 'legal/terms_zh.md');
await prerender('privacy.html', 'legal/privacy_zh.md');
console.log('Done.');
