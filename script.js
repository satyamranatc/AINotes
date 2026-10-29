/**
 * Pure Vanilla JavaScript for AI Notes Editorial Experience
 * Zero frameworks | Lightweight | High Performance
 * Features: Reading Progress Bar, Active TOC Scrollspy, Code Copying, Back-to-Top
 */

document.addEventListener('DOMContentLoaded', () => {
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

  // 2. Active Sidebar Table of Contents (TOC) Tracking
  const tocLinks = document.querySelectorAll('.toc-item a');
  const sections = [];

  tocLinks.forEach(link => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const section = document.querySelector(targetId);
      if (section) {
        sections.push({ id: targetId, section, link });
      }
    }
  });

  if (sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = `#${entry.target.id}`;
          tocLinks.forEach(l => l.classList.remove('active'));
          const currentLink = document.querySelector(`.toc-item a[href="${activeId}"]`);
          if (currentLink) {
            currentLink.classList.add('active');
          }
        }
      });
    }, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(({ section }) => observer.observe(section));
  }

  // 3. Code Copy-to-Clipboard Buttons
  document.querySelectorAll('.code-container').forEach(container => {
    const header = container.querySelector('.code-header');
    const code = container.querySelector('pre code') || container.querySelector('pre');
    
    if (header && code) {
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.type = 'button';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
      copyBtn.textContent = 'Copy';

      copyBtn.addEventListener('click', async () => {
        try {
          const textToCopy = code.innerText;
          await navigator.clipboard.writeText(textToCopy);
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
    }
  });

  // 4. Back to Top Floating Pill
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top-btn';
  backToTopBtn.type = 'button';
  backToTopBtn.setAttribute('aria-label', 'Scroll back to top');
  backToTopBtn.innerHTML = '<span class="top-arrow">&uarr;</span> Top';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
