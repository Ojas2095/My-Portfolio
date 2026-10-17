/* Ojaswee Upadhyay — interaction layer */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollUI();
  initReveal();
  initProjectFilters();
  initExperience();
  initCommandMenu();
  initPlayground();
  initProjectTilt();
  initGitHubStats();
});

function initTheme() {
  const root = document.documentElement;
  const button = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (!button) return;

  const apply = (theme) => {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    if (icon) icon.textContent = isDark ? '◐' : '◑';
    button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0a0a0b' : '#f0efe9');
  };

  const saved = localStorage.getItem('ojaswee-theme');
  apply(saved === 'light' || saved === 'dark' ? saved : 'dark');
  button.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ojaswee-theme', next);
    apply(next);
  });
}

function initNavigation() {
  const header = document.getElementById('navbar');
  const menu = document.getElementById('hamburger');
  const mobile = document.getElementById('mobileNav');
  if (!header) return;

  const closeMenu = () => {
    if (!menu || !mobile) return;
    mobile.classList.remove('open');
    mobile.setAttribute('aria-hidden', 'true');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
    menu.classList.remove('open');
  };

  menu?.addEventListener('click', () => {
    const open = !mobile.classList.contains('open');
    mobile.classList.toggle('open', open);
    mobile.setAttribute('aria-hidden', String(!open));
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', open);
  });
  mobile?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  const sectionLinks = [...document.querySelectorAll('.desktop-nav a')];
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}

function initScrollUI() {
  const bar = document.getElementById('scrollProgress');
  const header = document.getElementById('navbar');
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    header?.classList.toggle('scrolled', window.scrollY > 24);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initReveal() {
  const targets = document.querySelectorAll('.section-heading, .about-statement, .about-facts, .project-card, .experience-card, .lab-window, .toolkit-layout, .proof-banner, .contact-layout');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(target => target.classList.add('visible'));
    return;
  }
  targets.forEach((target, index) => {
    target.classList.add('reveal');
    target.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px' });
  targets.forEach(target => observer.observe(target));
}

function initProjectFilters() {
  const buttons = [...document.querySelectorAll('.filter-btn')];
  const cards = [...document.querySelectorAll('.project-card')];
  if (!buttons.length || !cards.length) return;
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hide', !visible);
      if (visible) card.animate([{ opacity: .25, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 350, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
  }));
}

function initExperience() {
  document.querySelectorAll('.experience-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.experience-card');
      const open = card.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });
}

function initCommandMenu() {
  const overlay = document.getElementById('cmdOverlay');
  const dialog = overlay?.querySelector('.command-dialog');
  const input = document.getElementById('cmdInput');
  const close = document.getElementById('cmdClose');
  const trigger = document.getElementById('cmdTrigger');
  const items = [...document.querySelectorAll('.command-item')];
  if (!overlay || !input || !items.length) return;
  let selected = 0;

  const visibleItems = () => items.filter(item => !item.hidden);
  const highlight = () => visibleItems().forEach((item, index) => item.classList.toggle('selected', index === selected));
  const hide = () => { overlay.hidden = true; input.value = ''; items.forEach(item => { item.hidden = false; item.classList.remove('selected'); }); };
  const show = () => { overlay.hidden = false; selected = 0; input.focus(); highlight(); };
  const run = (item) => {
    if (!item) return;
    if (item.dataset.action === 'scroll') document.querySelector(item.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
    if (item.dataset.action === 'download') document.querySelector('a[download="ResumeOjaswee_5thSem.pdf"]')?.click();
    if (item.dataset.action === 'theme') document.getElementById('themeToggle')?.click();
    hide();
  };

  trigger?.addEventListener('click', show);
  close?.addEventListener('click', hide);
  overlay.addEventListener('click', event => { if (event.target === overlay) hide(); });
  dialog?.addEventListener('click', event => event.stopPropagation());
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  input.addEventListener('input', () => {
    const query = normalize(input.value);
    items.forEach(item => {
      const searchable = normalize(`${item.textContent} ${item.dataset.search || ''}`);
      item.hidden = Boolean(query && !searchable.includes(query));
    });
    selected = 0;
    highlight();
  });
  input.addEventListener('keydown', event => {
    const current = visibleItems();
    if (event.key === 'ArrowDown') { event.preventDefault(); selected = (selected + 1) % Math.max(current.length, 1); highlight(); }
    if (event.key === 'ArrowUp') { event.preventDefault(); selected = (selected - 1 + Math.max(current.length, 1)) % Math.max(current.length, 1); highlight(); }
    if (event.key === 'Enter') { event.preventDefault(); run(current[selected]); }
    if (event.key === 'Escape') hide();
  });
  items.forEach(item => item.addEventListener('click', () => run(item)));
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); overlay.hidden ? show() : hide(); }
    if (event.key === 'Escape' && !overlay.hidden) hide();
  });
}

function initPlayground() {
  const runButton = document.getElementById('playgroundRun');
  const clearButton = document.getElementById('playgroundClear');
  const code = document.getElementById('playgroundCode');
  const frame = document.getElementById('playgroundFrame');
  const output = document.getElementById('playgroundConsole');
  if (!runButton || !code || !frame || !output) return;

  const runtime = `<!doctype html><html><body><script>
    window.addEventListener('message', function (event) {
      if (!event.data || event.data.type !== 'run') return;
      const logs = [];
      const format = value => typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
      const safeConsole = {
        log: (...values) => logs.push({ type: 'log', value: values.map(format).join(' ') }),
        warn: (...values) => logs.push({ type: 'log', value: '⚠ ' + values.map(format).join(' ') }),
        error: (...values) => logs.push({ type: 'error', value: values.map(format).join(' ') })
      };
      try { new Function('console', event.data.code)(safeConsole); if (!logs.length) logs.push({ type: 'log', value: '✓ Code ran without output' }); }
      catch (error) { logs.push({ type: 'error', value: 'Error: ' + error.message }); }
      parent.postMessage({ type: 'playground-result', logs }, '*');
    });
  <\/script></body></html>`;

  const render = logs => {
    output.textContent = '';
    logs.forEach(log => { const line = document.createElement('span'); line.className = log.type === 'error' ? 'output-error' : 'output-log'; line.textContent = `${log.value}\n`; output.appendChild(line); });
  };
  const run = () => {
    frame.srcdoc = runtime;
    frame.onload = () => frame.contentWindow.postMessage({ type: 'run', code: code.value }, '*');
  };
  window.addEventListener('message', event => { if (event.source === frame.contentWindow && event.data?.type === 'playground-result') render(event.data.logs); });
  runButton.addEventListener('click', run);
  clearButton?.addEventListener('click', () => { output.innerHTML = '<span class="output-muted">// Ready when you are.</span>'; });
  code.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = code.selectionStart;
      code.value = `${code.value.slice(0, start)}  ${code.value.slice(code.selectionEnd)}`;
      code.selectionStart = code.selectionEnd = start + 2;
    }
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') { event.preventDefault(); run(); }
  });
}

function initProjectTilt() {
  if (window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.transform = `perspective(900px) rotateX(${y * -2.5}deg) rotateY(${x * 2.5}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

function initGitHubStats() {
  const repo = document.getElementById('githubRepoCount');
  const followers = document.getElementById('githubFollowerCount');
  if (!repo && !followers) return;
  fetch('https://api.github.com/users/Ojas2095', { headers: { Accept: 'application/vnd.github+json' } })
    .then(response => response.ok ? response.json() : Promise.reject(new Error('GitHub unavailable')))
    .then(data => { if (repo) repo.textContent = data.public_repos ?? '—'; if (followers) followers.textContent = data.followers ?? '—'; })
    .catch(() => { if (repo) repo.textContent = '29+'; if (followers) followers.textContent = '—'; });
}
