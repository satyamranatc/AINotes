/**
 * Pure Vanilla JavaScript for AI Notes Editorial Experience
 * Zero frameworks | Lightweight | High Performance
 * Features: Reading Progress Bar, Active TOC Scrollspy, Mobile Contents Sheet,
 *           Heading Anchors, Syntax Highlighting + Line Numbers, Code Copying,
 *           Back-to-Top
 */

/* ------------------------------------------------------------------------ */
/* Syntax highlighter (Python by default; "bash" / "json" / "text" via       */
/* data-lang on .code-container). Produces .tok-* spans styled in CSS.      */
/* ------------------------------------------------------------------------ */
const PY_KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break',
  'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for',
  'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',
  'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield', 'match', 'case'
]);
const PY_BUILTINS = new Set([
  'print', 'len', 'range', 'str', 'int', 'float', 'bool', 'dict', 'list', 'set',
  'tuple', 'type', 'isinstance', 'enumerate', 'zip', 'map', 'filter', 'sorted',
  'sum', 'min', 'max', 'abs', 'open', 'super', 'object', 'any', 'all', 'round',
  'Exception', 'ValueError', 'KeyError', 'TypeError'
]);

const escapeHtml = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function tokenizePython(src) {
  const re = new RegExp([
    '(#[^\\n]*)',                                                    // 1 comment
    '((?:[rRbBuU]|[fF][rR]?|[rR][fF])?(?:"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'))', // 2 triple string
    '((?:[rRbBuU]|[fF][rR]?|[rR][fF])?(?:"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\'))', // 3 string
    '(@[A-Za-z_][\\w.]*)',                                           // 4 decorator
    '(\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b)',                    // 5 number
    '([A-Za-z_]\\w*)',                                               // 6 identifier
    '(->|[-+*/%=<>!&|^~]+)',                                         // 7 operator
    '(\\s+|.)'                                                       // 8 other
  ].join('|'), 'g');

  const tokens = [];
  let m;
  let prevWord = '';
  while ((m = re.exec(src)) !== null) {
    const [text, comment, tri, str, deco, num, ident, op] = m;
    if (comment) tokens.push(['comment', text]);
    else if (tri || str) tokens.push(['string', text]);
    else if (deco) tokens.push(['decorator', text]);
    else if (num) tokens.push(['number', text]);
    else if (ident) {
      const rest = src.slice(re.lastIndex);
      let type = null;
      if (PY_KEYWORDS.has(ident)) type = 'keyword';
      else if (prevWord === 'def') type = 'function';
      else if (prevWord === 'class') type = 'class';
      else if (ident === 'self' || ident === 'cls') type = 'self';
      else if (PY_BUILTINS.has(ident) && /^\s*\(/.test(rest)) type = 'builtin';
      else if (/^(str|int|float|bool|dict|list|set|tuple)$/.test(ident)) type = 'builtin'; // type hints
      else if (/^=(?!=)/.test(rest)) type = 'param';
      else if (/^\s*\(/.test(rest)) type = /^[A-Z]/.test(ident) ? 'class' : 'function';
      else if (/^[A-Z][a-z]\w*$/.test(ident)) type = 'class';
      tokens.push([type, text]);
      prevWord = ident;
      continue;
    } else if (op) tokens.push(['operator', text]);
    else tokens.push([null, text]);
    if (!/^\s+$/.test(text)) prevWord = '';
  }
  return tokens;
}

function tokenizeSimple(src, lang) {
  const parts = [
    lang === 'json' ? null : '(#[^\\n]*)',
    '("(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\')',
    '(\\b\\d+(?:\\.\\d+)?\\b)',
    lang === 'json' ? '(\\b(?:true|false|null)\\b)' : '(^\\s*[\\w.-]+|\\s--?[\\w-]+)',
    '(\\s+|.)'
  ];
  const re = new RegExp(parts.filter(Boolean).join('|'), 'gm');
  const tokens = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const g = lang === 'json' ? [null, ...m.slice(1)] : m.slice(1);
    const [comment, str, num, word] = g;
    if (comment) tokens.push(['comment', m[0]]);
    else if (str) tokens.push(['string', m[0]]);
    else if (num) tokens.push(['number', m[0]]);
    else if (word) tokens.push([lang === 'json' ? 'keyword' : 'function', m[0]]);
    else tokens.push([null, m[0]]);
  }
  return tokens;
}

/** Render tokens into one <span class="code-line"> per line (spans never cross lines). */
function renderLines(tokens) {
  const lines = [''];
  tokens.forEach(([type, text]) => {
    text.split('\n').forEach((piece, i) => {
      if (i > 0) lines.push('');
      if (!piece) return;
      const html = escapeHtml(piece);
      lines[lines.length - 1] += type ? `<span class="tok-${type}">${html}</span>` : html;
    });
  });
  if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
  return lines.map((l) => `<span class="code-line">${l}</span>`).join('');
}

function highlightBlock(container) {
  const code = container.querySelector('pre code') || container.querySelector('pre');
  if (!code || code.dataset.highlighted) return;
  const raw = code.textContent.replace(/\s+$/, '');
  const lang = (container.dataset.lang || 'python').toLowerCase();
  let tokens;
  if (lang === 'python') tokens = tokenizePython(raw);
  else if (lang === 'text') tokens = [[null, raw]];
  else tokens = tokenizeSimple(raw, lang);
  code.innerHTML = renderLines(tokens);
  code.dataset.highlighted = 'true';
  container.dataset.raw = raw;
}

document.addEventListener('DOMContentLoaded', () => {
  // 0. Ensure active top-nav pill is scrolled into view on smaller screens
  const activeNavPill = document.querySelector('.top-nav-links .nav-pill.active');
  if (activeNavPill) {
    activeNavPill.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  // 1. Reading Progress Bar
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  // 2. Mobile / tablet "Contents" sheet (cloned from the desktop sidebar)
  const sidebarList = document.querySelector('.toc-sidebar .toc-list');
  if (sidebarList) {
    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'toc-fab';
    fab.setAttribute('aria-label', 'Open table of contents');
    fab.innerHTML = '<span aria-hidden="true">&#9776;</span> Contents';

    const backdrop = document.createElement('div');
    backdrop.className = 'toc-sheet-backdrop';

    const sheet = document.createElement('nav');
    sheet.className = 'toc-sheet';
    sheet.setAttribute('aria-label', 'Table of contents');
    sheet.innerHTML = '<div class="toc-title">Contents</div>';
    sheet.appendChild(sidebarList.cloneNode(true));

    const close = () => document.body.classList.remove('toc-open');
    fab.addEventListener('click', () => document.body.classList.add('toc-open'));
    backdrop.addEventListener('click', close);
    sheet.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    document.body.append(fab, backdrop, sheet);
  }

  // 3. Active Table of Contents (TOC) Tracking — sidebar and mobile sheet
  const tocLinks = document.querySelectorAll('.toc-item a');
  const targets = new Map();
  tocLinks.forEach((link) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const section = document.querySelector(targetId);
      if (section) targets.set(targetId, section);
    }
  });

  if (targets.size > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeId = `#${entry.target.id}`;
          tocLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === activeId));
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });
    targets.forEach((section) => observer.observe(section));
  }

  // 4. Heading anchors: hover an H2/H3 inside a section to get a "#" link
  document.querySelectorAll('section[id] > h2, h3[id]').forEach((h) => {
    const id = h.id || h.parentElement.id;
    if (!id || h.querySelector('.heading-anchor')) return;
    const a = document.createElement('a');
    a.className = 'heading-anchor';
    a.href = `#${id}`;
    a.setAttribute('aria-label', 'Link to this section');
    a.textContent = '#';
    h.appendChild(a);
  });

  // 5. Code blocks: syntax highlight, window dots, copy button
  document.querySelectorAll('.code-container').forEach((container) => {
    highlightBlock(container);
    const header = container.querySelector('.code-header');
    if (!header) return;

    const dots = document.createElement('span');
    dots.className = 'code-dots';
    dots.setAttribute('aria-hidden', 'true');
    dots.innerHTML = '<span></span><span></span><span></span>';
    header.prepend(dots);

    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.type = 'button';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    copyBtn.textContent = 'Copy';

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(container.dataset.raw || container.innerText);
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        copyBtn.textContent = 'Error';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
      }
    });

    header.appendChild(copyBtn);
  });

  // 6. Back to Top Floating Pill
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top-btn';
  backToTopBtn.type = 'button';
  backToTopBtn.setAttribute('aria-label', 'Scroll back to top');
  backToTopBtn.innerHTML = '<span class="top-arrow">&uarr;</span> Top';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
