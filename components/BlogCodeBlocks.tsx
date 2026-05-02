'use client';

import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

export default function BlogCodeBlocks() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>('.blog-content pre code');

    blocks.forEach(code => {
      // Apply syntax highlighting
      hljs.highlightElement(code);

      const pre = code.parentElement as HTMLElement;
      if (!pre || pre.dataset.enhanced) return;
      pre.dataset.enhanced = 'true';

      // Detect language from class name (e.g. "language-typescript")
      const langClass = [...code.classList].find(c => c.startsWith('language-'));
      const lang = langClass ? langClass.replace('language-', '') : '';

      // Language badge (top-left)
      if (lang) {
        const badge = document.createElement('span');
        badge.className = 'code-lang-badge';
        badge.textContent = lang;
        pre.appendChild(badge);
      }

      // Copy button (top-right)
      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = COPY_ICON;

      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.innerText);
          btn.innerHTML = CHECK_ICON;
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerHTML = COPY_ICON;
            btn.classList.remove('copied');
          }, 2000);
        } catch {
          // Clipboard API blocked (e.g. http context) — fail silently
        }
      });

      pre.appendChild(btn);
    });
  }, []);

  return null;
}
