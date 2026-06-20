# -*- coding: utf-8 -*-
"""One-off: respace blog note dates evenly from 2026-04-28 to 2026-06-20
(no two notes share a day). Updates each article's own metadata + related-card
cross-references + sitemap lastmod. blog/index.html is rewritten by hand."""
import re, pathlib

base = pathlib.Path(r'D:\Startup\folio-web')
blog = base / 'blog'

OLD = {
    'our-beginning.html':                    '2026-04-28',
    'why-co-reading.html':                   '2026-05-29',
    'slow-social-apps-2026.html':            '2026-06-03',
    'how-to-pick-books.html':                '2026-06-06',
    'design-notes-locked-room.html':         '2026-06-10',
    'bookish-date-ideas.html':               '2026-06-11',
    'finish-books-with-a-buddy.html':        '2026-06-12',
    'book-club-vs-app.html':                 '2026-06-13',
    'sticky-note-wall.html':                 '2026-06-13',
    'what-to-talk-about-after-matching.html':'2026-06-15',
    'find-reading-partner.html':             '2026-06-17',
    'introvert-social-app.html':             '2026-06-17',
    'no-photo-dating-app.html':              '2026-06-20',
}
NEW = {
    'our-beginning.html':                    '2026-04-28',
    'why-co-reading.html':                   '2026-05-02',
    'slow-social-apps-2026.html':            '2026-05-07',
    'how-to-pick-books.html':                '2026-05-11',
    'design-notes-locked-room.html':         '2026-05-16',
    'bookish-date-ideas.html':               '2026-05-20',
    'finish-books-with-a-buddy.html':        '2026-05-25',
    'book-club-vs-app.html':                 '2026-05-29',
    'sticky-note-wall.html':                 '2026-06-02',
    'what-to-talk-about-after-matching.html':'2026-06-07',
    'find-reading-partner.html':             '2026-06-11',
    'introvert-social-app.html':             '2026-06-16',
    'no-photo-dating-app.html':              '2026-06-20',
}

log = []

for fn, new in NEW.items():
    old = OLD[fn]
    p = blog / fn
    t = p.read_text(encoding='utf-8')
    orig = t
    if old != new:
        # own metadata (datePublished / dateModified / og published_time)
        t = t.replace(f'"datePublished": "{old}T00:00:00+08:00"', f'"datePublished": "{new}T00:00:00+08:00"')
        t = t.replace(f'"dateModified": "{old}T00:00:00+08:00"',  f'"dateModified": "{new}T00:00:00+08:00"')
        t = t.replace(f'content="{old}T00:00:00+08:00"',          f'content="{new}T00:00:00+08:00"')
        # own blog-meta <time> = first <time> in file
        t = t.replace(f'<time datetime="{old}">{old}</time>',
                      f'<time datetime="{new}">{new}</time>', 1)
    # related-card cross references (keyed by href so shared dates disambiguate)
    for g, gold in OLD.items():
        gnew = NEW[g]
        if gold == gnew:
            continue
        pat = (r'(href="' + re.escape(g) + r'">\s*<time datetime=")' +
               re.escape(gold) + r'(">)' + re.escape(gold) + r'(</time>)')
        t = re.sub(pat, r'\g<1>' + gnew + r'\g<2>' + gnew + r'\g<3>', t)
    if t != orig:
        p.write_text(t, encoding='utf-8')
        log.append(f'  {fn:42s} {old} -> {new}  (changed)')
    else:
        log.append(f'  {fn:42s} {old} -> {new}  (no change)')

# sitemap lastmod
sm = base / 'sitemap.xml'
s = sm.read_text(encoding='utf-8')
for fn, new in NEW.items():
    pat = (r'(<loc>https://foliomatch\.app/blog/' + re.escape(fn) +
           r'</loc>\s*<lastmod>)\d{4}-\d{2}-\d{2}(</lastmod>)')
    s = re.sub(pat, r'\g<1>' + new + r'\g<2>', s)
# blog index lastmod -> newest note date
s = re.sub(r'(<loc>https://foliomatch\.app/blog/</loc>\s*<lastmod>)\d{4}-\d{2}-\d{2}(</lastmod>)',
           r'\g<1>2026-06-20\g<2>', s)
sm.write_text(s, encoding='utf-8')

print('\n'.join(log))
print('\nsitemap.xml updated.')
