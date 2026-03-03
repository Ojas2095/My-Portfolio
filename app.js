// ==========================================
// COSMIC DARK / AURORA — Portfolio JS v2
// All 12 Advanced Features
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initBootLoader();
  initParticles();
  initCustomCursor();
  initMouseTrail();
  initNavbar();
  initTypewriter();
  initScrollProgress();
  initDynamicTitle();
  initScrollReveal();
  initProjectTilt();
  initExpandableTimeline();
  initCodePlayground();
  initGitHubHeatmap();
  initTestimonialsCarousel();
  initVisitorGlobe();
  initSpotifyWidget();
  initCommandPalette();
  initThemeToggle();
  initMatrixToggle();
  initCubeEasterEgg();
  initEasterEggs();
  initDestroySite();
  initProjectFilters();
});

// ===================== PROJECT FILTERS =====================
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !projects.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projects.forEach(project => {
        if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
          project.classList.remove('hide');
          // Add a small animation effect
          project.style.animation = 'none';
          project.offsetHeight; /* trigger reflow */
          project.style.animation = 'fadeInUp 0.5s ease both';
        } else {
          project.classList.add('hide');
        }
      });
    });
  });
}

// ===================== BOOT LOADER =====================
function initBootLoader() {
  const loader = document.getElementById('bootLoader');
  const body = document.getElementById('terminalBody');
  if (!loader || !body) return;

  const lines = [
    '> Initializing Ojaswee.exe...',
    '> Loading skills... [██████████] 100%',
    '> Compiling 6 projects... done',
    '> Connecting visitor globe... ✓',
    '> Establishing AI neural link... ✓',
    '> Deploying portfolio... 🚀',
    '> Welcome.'
  ];

  body.innerHTML = '';
  let delay = 0;
  lines.forEach((text) => {
    delay += 300 + Math.random() * 200;
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = 'term-line';
      p.textContent = text;
      body.appendChild(p);
      body.scrollTop = body.scrollHeight;
    }, delay);
  });

  setTimeout(() => {
    loader.classList.add('done');
    setTimeout(() => loader.remove(), 600);
  }, delay + 600);
}

// ===================== PARTICLE / MATRIX SYSTEM =====================
let matrixMode = false;
let particleAnimId;

function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  runParticles(canvas);
}

function runParticles(canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = Math.min(80, Math.floor(window.innerWidth / 18));
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.15
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    if (matrixMode) {
      drawMatrixRain(ctx, w, h);
      particleAnimId = requestAnimationFrame(draw);
      return;
    }

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    particleAnimId = requestAnimationFrame(draw);
  }
  draw();
}

// ===================== MATRIX RAIN =====================
const matrixColumns = [];
let matrixInitialized = false;

function drawMatrixRain(ctx, w, h) {
  const fontSize = 14;
  const cols = Math.floor(w / fontSize);

  if (!matrixInitialized || matrixColumns.length !== cols) {
    matrixColumns.length = 0;
    for (let i = 0; i < cols; i++) matrixColumns.push(Math.random() * h / fontSize);
    matrixInitialized = true;
  }

  ctx.fillStyle = 'rgba(10, 10, 15, 0.06)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#0f0';
  ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]<>/\\|~';
  for (let i = 0; i < cols; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, matrixColumns[i] * fontSize);
    if (matrixColumns[i] * fontSize > h && Math.random() > 0.975) {
      matrixColumns[i] = 0;
    }
    matrixColumns[i]++;
  }
}

function initMatrixToggle() {
  const btn = document.getElementById('matrixToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    matrixMode = !matrixMode;
    matrixInitialized = false;
    btn.querySelector('span').textContent = matrixMode ? '✨' : '🟢';
    showToast(matrixMode ? '🟢 Matrix Rain activated!' : '✨ Particles restored!');
  });
}

// ===================== CUSTOM CURSOR =====================
function initCustomCursor() {
  const ring = document.getElementById('cursorRing');
  const dot = document.getElementById('cursorDot');
  if (!ring || !dot || 'ontouchstart' in window) {
    if (ring) ring.style.display = 'none';
    if (dot) dot.style.display = 'none';
    return;
  }

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  function lerp() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(lerp);
  }
  lerp();

  document.querySelectorAll('a, button, .project-card, .skill-tag, .chip, .cmd-item, .timeline-item, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '52px'; ring.style.height = '52px';
      ring.style.borderColor = '#7c3aed';
      dot.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px'; ring.style.height = '36px';
      ring.style.borderColor = '#06b6d4';
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
}

// ===================== MOUSE TRAIL =====================
function initMouseTrail() {
  const canvas = document.getElementById('trailCanvas');
  if (!canvas || 'ontouchstart' in window) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  const trail = [];
  const MAX_TRAIL = 25;

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', e => {
    trail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
    if (trail.length > MAX_TRAIL) trail.shift();
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];
      p.alpha -= 0.03;
      if (p.alpha <= 0) { trail.splice(i, 1); i--; continue; }
      const size = p.alpha * 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha * 0.5})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ===================== NAVBAR =====================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (mobileNav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
      }
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
      });
    });
  }
}

// ===================== TYPEWRITER =====================
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const roles = ['Frontend Developer', 'React Specialist', 'Full Stack Explorer', 'Problem Solver', 'Hackathon Enthusiast', 'Speedcuber 🧩'];
  let rIdx = 0, cIdx = 0, deleting = false;
  function tick() {
    const cur = roles[rIdx];
    if (deleting) {
      el.textContent = cur.substring(0, cIdx--);
      if (cIdx < 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; setTimeout(tick, 500); return; }
      setTimeout(tick, 40);
    } else {
      el.textContent = cur.substring(0, cIdx++);
      if (cIdx > cur.length) { deleting = true; setTimeout(tick, 2000); return; }
      setTimeout(tick, 80);
    }
  }
  setTimeout(tick, 1500);
}

// ===================== SCROLL PROGRESS BAR =====================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    bar.style.width = pct + '%';
  });
}

// ===================== DYNAMIC PAGE TITLE =====================
function initDynamicTitle() {
  const original = document.title;
  const sections = document.querySelectorAll('[data-title]');
  if (!sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const t = entry.target.getAttribute('data-title');
        document.title = t ? `${t} — Ojaswee` : original;
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));

  // Reset on tab focus back
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) document.title = 'Come back! 👋';
    else document.title = original;
  });
}

// ===================== SCROLL REVEAL =====================
function initScrollReveal() {
  document.querySelectorAll(
    '.section-title, .about-grid, .timeline-item, .project-card, .skill-group, .achievement-card, .contact-grid, .github-heatmap-wrapper, .playground-container, .testimonials-carousel, .globe-wrapper'
  ).forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===================== 3D TILT =====================
function initProjectTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / (r.height / 2)) * -6;
      const ry = ((x - r.width / 2) / (r.width / 2)) * 6;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

// ===================== EXPANDABLE TIMELINE =====================
function initExpandableTimeline() {
  document.querySelectorAll('[data-expandable]').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('expanded');
      const hint = item.querySelector('.expand-hint');
      if (hint) hint.textContent = item.classList.contains('expanded') ? 'Click to collapse ▴' : 'Click to expand ▾';
    });
  });
}

// ===================== CODE PLAYGROUND =====================
function initCodePlayground() {
  const runBtn = document.getElementById('playgroundRun');
  const clearBtn = document.getElementById('playgroundClear');
  const codeArea = document.getElementById('playgroundCode');
  const output = document.getElementById('playgroundConsole');
  if (!runBtn || !codeArea || !output) return;

  runBtn.addEventListener('click', () => {
    output.innerHTML = '';
    const logs = [];
    const fakeConsole = {
      log: (...args) => logs.push({ type: 'log', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ') }),
      error: (...args) => logs.push({ type: 'error', msg: args.map(a => String(a)).join(' ') }),
      warn: (...args) => logs.push({ type: 'log', msg: '⚠️ ' + args.map(a => String(a)).join(' ') })
    };

    try {
      const fn = new Function('console', codeArea.value);
      fn(fakeConsole);
      if (logs.length === 0) logs.push({ type: 'log', msg: '✓ Code ran successfully (no output)' });
    } catch (err) {
      logs.push({ type: 'error', msg: `Error: ${err.message}` });
    }

    logs.forEach(l => {
      const span = document.createElement('span');
      span.className = l.type === 'error' ? 'output-error' : 'output-log';
      span.textContent = l.msg + '\n';
      output.appendChild(span);
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      output.innerHTML = '<span class="output-muted">// Output will appear here...</span>';
    });
  }

  // Tab key support
  codeArea.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeArea.selectionStart;
      const end = codeArea.selectionEnd;
      codeArea.value = codeArea.value.substring(0, start) + '  ' + codeArea.value.substring(end);
      codeArea.selectionStart = codeArea.selectionEnd = start + 2;
    }
  });
}

// ===================== GITHUB HEATMAP =====================
function initGitHubHeatmap() {
  const container = document.getElementById('githubHeatmap');
  if (!container) return;

  // Generate a simulated heatmap (52 weeks × 7 days)
  const weeks = 52;
  const days = 7;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      // Simulate activity with weighted randomness
      const rand = Math.random();
      let opacity;
      if (rand < 0.35) opacity = 0.05;
      else if (rand < 0.55) opacity = 0.15;
      else if (rand < 0.75) opacity = 0.35;
      else if (rand < 0.9) opacity = 0.6;
      else opacity = 0.9;
      cell.style.opacity = opacity;
      cell.title = `${Math.floor(opacity * 10)} contributions`;
      container.appendChild(cell);
    }
  }

  // Fetch real GitHub stats
  fetch('https://api.github.com/users/Ojas2095')
    .then(r => r.json())
    .then(data => {
      const repos = document.getElementById('ghRepos');
      const followers = document.getElementById('ghFollowers');
      if (repos) repos.textContent = data.public_repos || '29';
      if (followers) followers.textContent = data.followers || '—';
    })
    .catch(() => {
      const repos = document.getElementById('ghRepos');
      if (repos) repos.textContent = '29';
    });

  // Set static fallbacks
  const stars = document.getElementById('ghStars');
  const contribs = document.getElementById('ghContribs');
  if (stars) stars.textContent = '12';
  if (contribs) contribs.textContent = '450+';
}

// ===================== TESTIMONIALS CAROUSEL =====================
function initTestimonialsCarousel() {
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = track.querySelectorAll('.testimonial-slide');
  let current = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    current = idx;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => goTo((current - 1 + slides.length) % slides.length));
  nextBtn.addEventListener('click', () => goTo((current + 1) % slides.length));

  // Auto-rotate
  setInterval(() => goTo((current + 1) % slides.length), 6000);
}

// ===================== VISITOR GLOBE =====================
function initVisitorGlobe() {
  const canvas = document.getElementById('globeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const center = size / 2;
  const radius = size * 0.38;
  let rotation = 0;

  // Simulated visitor locations (lat, lng)
  const visitors = [
    { lat: 26.76, lng: 83.37, label: 'Gorakhpur' },
    { lat: 28.61, lng: 77.21, label: 'Delhi' },
    { lat: 19.07, lng: 72.88, label: 'Mumbai' },
    { lat: 30.32, lng: 78.03, label: 'Dehradun' },
    { lat: 12.97, lng: 77.59, label: 'Bangalore' },
    { lat: 37.77, lng: -122.42, label: 'San Francisco' },
    { lat: 51.51, lng: -0.13, label: 'London' },
    { lat: 35.68, lng: 139.69, label: 'Tokyo' },
    { lat: 1.35, lng: 103.82, label: 'Singapore' },
    { lat: -33.87, lng: 151.21, label: 'Sydney' },
    { lat: 48.86, lng: 2.35, label: 'Paris' },
    { lat: 55.75, lng: 37.62, label: 'Moscow' },
    { lat: 22.57, lng: 88.36, label: 'Kolkata' },
    { lat: 40.71, lng: -74.01, label: 'New York' },
    { lat: -23.55, lng: -46.63, label: 'São Paulo' }
  ];

  function latLngTo3D(lat, lng, r) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + rotation) * Math.PI / 180;
    return {
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.cos(phi),
      z: r * Math.sin(phi) * Math.sin(theta)
    };
  }

  function draw() {
    ctx.clearRect(0, 0, size, size);

    // Globe sphere
    const gradient = ctx.createRadialGradient(center - 30, center - 30, 10, center, center, radius);
    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
    gradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.04)');
    gradient.addColorStop(1, 'rgba(124, 58, 237, 0.01)');
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Grid lines (longitude)
    for (let lng = 0; lng < 360; lng += 30) {
      ctx.beginPath();
      for (let lat = -90; lat <= 90; lat += 5) {
        const p = latLngTo3D(lat, lng, radius);
        if (p.z < 0) continue;
        const sx = center + p.x, sy = center - p.y;
        if (lat === -90 || p.z < 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.06)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Grid lines (latitude)
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      for (let lng = 0; lng <= 360; lng += 5) {
        const p = latLngTo3D(lat, lng, radius);
        if (p.z < 0) continue;
        const sx = center + p.x, sy = center - p.y;
        if (lng === 0 || p.z < 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Visitor dots
    visitors.forEach(v => {
      const p = latLngTo3D(v.lat, v.lng, radius);
      if (p.z < 0) return; // behind globe
      const sx = center + p.x, sy = center - p.y;
      const scale = (p.z / radius + 1) * 0.5;

      // Glow
      ctx.beginPath();
      ctx.arc(sx, sy, 8 * scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${0.15 * scale})`;
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(sx, sy, 3 * scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${0.7 + 0.3 * scale})`;
      ctx.fill();
    });

    rotation += 0.15;
    requestAnimationFrame(draw);
  }
  draw();

  // Set stats
  const vc = document.getElementById('visitorCount');
  const cc = document.getElementById('countryCount');
  if (vc) animateCounter(vc, 1247);
  if (cc) animateCounter(cc, 15);
}

function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = current;
  }, 30);
}

// ===================== SPOTIFY WIDGET =====================
// ===================== SPOTIFY WIDGET =====================
function initSpotifyWidget() {
  const tracks = [
    { track: 'Cosmic Vibes', artist: 'Oji Records', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { track: 'Neon Deep Space', artist: 'Lofi Orbit', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { track: 'Aurora Flow', artist: 'Synthwave Ojas', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
  ];

  const widget = document.getElementById('spotifyWidget');
  const trackEl = document.getElementById('spotifyTrack');
  const artistEl = document.getElementById('spotifyArtist');
  const artEl = document.getElementById('spotifyArt');
  const wave = document.getElementById('spotifyWave');
  const audio = document.getElementById('spotifyAudio');
  const label = document.getElementById('spotifyLabel');
  if (!widget || !audio) return;

  let idx = 0;
  let isPlaying = false;

  function loadTrack(index) {
    const t = tracks[index];
    trackEl.textContent = t.track;
    artistEl.textContent = t.artist;
    audio.src = t.url;
    audio.load();
  }

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      artEl.textContent = '▶️';
      wave.classList.remove('playing');
      label.textContent = 'Paused';
    } else {
      audio.play().catch(e => console.log('Audio autoplay blocked:', e));
      artEl.textContent = '⏸️';
      wave.classList.add('playing');
      label.textContent = 'Now Playing';
    }
    isPlaying = !isPlaying;
  }

  widget.addEventListener('click', togglePlay);
  audio.addEventListener('ended', () => {
    idx = (idx + 1) % tracks.length;
    loadTrack(idx);
    if (isPlaying) audio.play();
  });

  loadTrack(idx);
}

// ===================== COMMAND PALETTE =====================
function initCommandPalette() {
  const overlay = document.getElementById('cmdOverlay');
  const input = document.getElementById('cmdInput');
  const results = document.getElementById('cmdResults');
  const trigger = document.getElementById('cmdTrigger');
  if (!overlay || !input || !results) return;

  const items = results.querySelectorAll('.cmd-item');

  function open() { overlay.classList.remove('hidden'); input.value = ''; input.focus(); filterItems(''); }
  function close() { overlay.classList.add('hidden'); }

  // Keyboard shortcut
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });

  if (trigger) trigger.addEventListener('click', open);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  // Filter
  input.addEventListener('input', () => filterItems(input.value));

  function filterItems(query) {
    const q = query.toLowerCase();
    items.forEach(item => {
      item.classList.toggle('hidden', q && !item.textContent.toLowerCase().includes(q));
    });
  }

  // Actions
  items.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      if (action === 'scroll') {
        const target = document.querySelector(item.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'download') {
        const link = document.querySelector('a[download]');
        if (link) link.click();
      } else if (action === 'theme') {
        toggleTheme();
      } else if (action === 'matrix') {
        matrixMode = !matrixMode;
        matrixInitialized = false;
        showToast(matrixMode ? '🟢 Matrix Rain activated!' : '✨ Particles restored!');
      } else if (action === 'chat') {
        const fab = document.getElementById('chatbotFab');
        if (fab) fab.click();
      }
      close();
    });
  });
}

// ===================== THEME TOGGLE =====================
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (!btn) return;

  // Load saved theme
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
    if (icon) icon.textContent = saved === 'light' ? '🌙' : '☀️';
  }

  btn.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = next === 'light' ? '🌙' : '☀️';
  showToast(next === 'light' ? '☀️ Light mode activated' : '🌙 Dark mode activated');
}

// ===================== CUBE EASTER EGG =====================
function initCubeEasterEgg() {
  const card = document.getElementById('cubeEasterEgg');
  const timer = document.getElementById('cubeTimer');
  const display = document.getElementById('cubeTimerDisplay');
  const btn = document.getElementById('cubeTimerBtn');
  if (!card || !timer || !display || !btn) return;

  let running = false, start = 0, interval;
  card.addEventListener('dblclick', () => timer.classList.toggle('hidden'));

  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (running) { clearInterval(interval); running = false; btn.textContent = 'Reset'; }
    else if (btn.textContent === 'Reset') { display.textContent = '0.00'; btn.textContent = 'Start'; }
    else {
      start = Date.now(); running = true; btn.textContent = 'Stop';
      interval = setInterval(() => { display.textContent = ((Date.now() - start) / 1000).toFixed(2); }, 30);
    }
  });
}

// ===================== EASTER EGGS =====================
function initEasterEggs() {
  let code = [];
  const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  document.addEventListener('keydown', e => {
    code.push(e.code);
    if (code.length > konami.length) code.shift();
    if (JSON.stringify(code) === JSON.stringify(konami)) {
      showToast('🎉 Konami code activated! Cosmic vibes intensified!');
      document.body.style.filter = 'hue-rotate(120deg)';
      setTimeout(() => { document.body.style.filter = ''; }, 4000);
      code = [];
    }
  });
}

// ===================== TOAST =====================
function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed', top: '80px', right: '20px',
    background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
    color: '#fff', padding: '14px 22px', borderRadius: '12px',
    fontSize: '0.88rem', fontWeight: '500', zIndex: '100000',
    opacity: '0', transform: 'translateX(100%)',
    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
    boxShadow: '0 8px 30px rgba(124,58,237,0.3)',
    fontFamily: "'Space Grotesk', sans-serif"
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(0)'; });
  setTimeout(() => {
    toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ===================== PHYSICS DESTROY SITE =====================
function initDestroySite() {
  const btn = document.getElementById('destroyBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!window.Matter) {
      showToast('Physics engine loading... try again in a sec.');
      return;
    }
    showToast('🧨 Physics engine activated. Goodbye layout!');

    // Initialize Matter.js
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    const world = engine.world;
    const w = window.innerWidth;
    const h = document.documentElement.scrollHeight;

    // Create a hidden canvas for the physics bodies to interact over the whole page
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: { width: w, height: h, wireframes: false, background: 'transparent' }
    });
    render.canvas.style.position = 'absolute';
    render.canvas.style.top = '0';
    render.canvas.style.left = '0';
    render.canvas.style.zIndex = '9999';
    render.canvas.style.pointerEvents = 'none';

    // Boundaries
    const ground = Bodies.rectangle(w / 2, h + 50, w + 1000, 100, { isStatic: true });
    const wallLeft = Bodies.rectangle(-50, h / 2, 100, h * 2, { isStatic: true });
    const wallRight = Bodies.rectangle(w + 50, h / 2, 100, h * 2, { isStatic: true });
    Composite.add(world, [ground, wallLeft, wallRight]);

    // Select all cards/interactive elements
    const elements = document.querySelectorAll(
      '.glass-card, .btn-glow, .btn-outline, .timeline-item, .project-card, .skill-group, h1, h2, h3, p'
    );

    const bodies = [];
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const stY = window.scrollY;

      // Calculate true absolute position
      const x = rect.left + rect.width / 2;
      const y = rect.top + stY + rect.height / 2;

      if (rect.width > 0 && rect.height > 0) {
        // Create physics body
        const body = Bodies.rectangle(x, y, rect.width, rect.height, {
          restitution: 0.6,
          frictionAir: 0.02,
          render: { visible: false } // we render the HTML element, not the canvas body
        });

        // Set HTML element strictly to absolute for JS control
        el.style.position = 'absolute';
        el.style.width = `${rect.width}px`;
        el.style.height = `${rect.height}px`;
        el.style.left = `${rect.left}px`;
        el.style.top = `${rect.top + stY}px`;
        el.style.margin = '0';
        el.style.transition = 'none'; // Disable CSS transitions so it follows physics tick perfectly
        el.style.zIndex = '10000';

        bodies.push({ el, body, initX: rect.left + rect.width / 2, initY: rect.top + stY + rect.height / 2 });
        Composite.add(world, body);
      }
    });

    // Add mouse control so user can throw elements around
    const mouse = Mouse.create(document.body);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Composite.add(world, mouseConstraint);

    // Allow scrolling to not break mouse constraint
    render.canvas.style.pointerEvents = 'auto';
    mouseConstraint.mouse.element.removeEventListener('mousewheel', mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', mouseConstraint.mouse.mousewheel);

    // Run physics
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Sync HTML elements to physics bodies every frame
    Matter.Events.on(engine, 'afterUpdate', () => {
      bodies.forEach(item => {
        const { x, y } = item.body.position;
        const angle = item.body.angle;
        // The element's absolute position was set to its initial top/left.
        // We translate it relative to that initial position.
        const dx = x - item.initX;
        const dy = y - item.initY;
        item.el.style.transform = `translate(${dx}px, ${dy}px) rotate(${angle}rad)`;
      });
    });

    // Hide the trigger button so it can't be clicked twice
    btn.style.display = 'none';

    // Disable global styles that might interfere
    document.body.style.overflowX = 'hidden';
  });
}