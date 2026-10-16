/* Ask Oji — a small, offline-first portfolio assistant. */
(function () {
  const fab = document.getElementById('chatbotFab');
  const panel = document.getElementById('chatbotPanel');
  const closeButton = document.getElementById('chatbotClose');
  const messages = document.getElementById('chatbotMessages');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  if (!fab || !panel || !messages || !input || !send) return;

  const resumeFile = 'ResumeOjaswee_5thSem.pdf';
  const data = {
    name: 'Ojaswee Upadhyay',
    email: 'ojaswee2095@gmail.com',
    github: 'https://github.com/Ojas2095',
    linkedin: 'https://www.linkedin.com/in/ojaswee-upadhyay-79a041320/',
    leetcode: 'https://leetcode.com/u/coder209/',
    stack: 'React, Next.js, TypeScript, JavaScript, Node.js, Python, FastAPI, Flask, PostgreSQL, MongoDB, Docker, Vercel, Supabase, WebSockets, and Git',
    projects: [
      ['MorphOS', 'a generative operating system built with Next.js, Three.js, and Gemini Vision'],
      ['VoiceShield', 'a real-time voice-cloning attack detection system using spectrogram classifiers and WebSockets'],
      ['NaviiGo', 'a connected travel companion with itinerary discovery, booking workflows, and geospatial mapping'],
      ['ColdEmailAI', 'an AI workflow that researches context, drafts personalized outreach, and tracks responses']
    ]
  };

  const responses = [
    { keys: ['who is', 'about', 'ojaswee', 'introduce'], answer: () => `${data.name} is a B.Tech Computer Science student at UPES, co-founder and CTO of NaviiGo, and a builder of AI products, high-performance interfaces, and full-stack systems. He is currently open to internships and hard problems.` },
    { keys: ['skill', 'stack', 'technology', 'tech'], answer: () => `His current toolkit is ${data.stack}. React and JavaScript are the daily drivers; AI tooling, APIs, and thoughtful UI are the through-line.` },
    { keys: ['project', 'built', 'work'], answer: () => `A few highlights:\n\n${data.projects.map(([name, description]) => `• **${name}** — ${description}.`).join('\n')}\n\nUse the Selected work section for repository links.` },
    { keys: ['experience', 'intern', 'work history', 'career'], answer: () => `Ojaswee is co-founder and CTO of NaviiGo, a React Developer Intern at Sentienta QualityAI (return offer), a Full Stack Developer Intern at BuildXLayer, and an open-source contributor across tscircuit, OWASP Nest, and the ZIO ecosystem.` },
    { keys: ['hire', 'special', 'strength', 'why'], answer: () => `He combines product curiosity with delivery: 8 data-intensive QA interfaces shipped, sub-second target page loads at NaviiGo, 40% lower query latency, open-source contributions, and a habit of shipping under pressure.` },
    { keys: ['contact', 'email', 'reach', 'connect'], answer: () => `The easiest way to reach Ojaswee is [${data.email}](mailto:${data.email}). You can also find him on [LinkedIn](${data.linkedin}) or [GitHub](${data.github}).` },
    { keys: ['resume', 'cv', 'download'], answer: () => { setTimeout(() => document.querySelector(`a[download="${resumeFile}"]`)?.click(), 250); return 'Starting the résumé download now. If the browser asks, save the PDF as ResumeOjaswee_5thSem.pdf.'; } },
    { keys: ['cube', 'rubik', 'speedcub'], answer: () => 'Ojaswee speedcubes with a current average of 17.62 seconds — a useful reminder that small iterations compound.' },
    { keys: ['hello', 'hi', 'hey'], answer: () => 'Hey. Ask me about the work, the stack, the résumé, or how to get in touch.' }
  ];

  function open() { panel.classList.remove('hidden'); panel.setAttribute('aria-hidden', 'false'); input.focus(); }
  function close() { panel.classList.add('hidden'); panel.setAttribute('aria-hidden', 'true'); fab.focus(); }
  function answer(text) {
    const normalized = text.toLowerCase();
    const match = responses.find(item => item.keys.some(key => normalized.includes(key)));
    return match ? match.answer() : 'I am focused on Ojaswee’s portfolio. Try asking about his projects, stack, experience, or résumé.';
  }

  function renderInline(target, text) {
    const token = /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:|mailto:)[^)]+\))/g;
    let cursor = 0;
    text.split('\n').forEach((line, lineIndex, lines) => {
      let match;
      token.lastIndex = 0;
      while ((match = token.exec(line))) {
        if (match.index > cursor) target.appendChild(document.createTextNode(line.slice(cursor, match.index)));
        const value = match[0];
        if (value.startsWith('**')) {
          const strong = document.createElement('strong');
          strong.textContent = value.slice(2, -2);
          target.appendChild(strong);
        } else {
          const parts = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          const link = document.createElement('a');
          link.textContent = parts[1];
          link.href = parts[2];
          if (!parts[2].startsWith('mailto:')) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
          target.appendChild(link);
        }
        cursor = match.index + value.length;
      }
      if (cursor < line.length) target.appendChild(document.createTextNode(line.slice(cursor)));
      cursor = 0;
      if (lineIndex < lines.length - 1) target.appendChild(document.createElement('br'));
    });
  }

  function addMessage(text, role) {
    const wrapper = document.createElement('div');
    wrapper.className = `chat-message ${role}`;
    const paragraph = document.createElement('p');
    renderInline(paragraph, text);
    wrapper.appendChild(paragraph);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage(text, 'user');
    window.setTimeout(() => addMessage(answer(text), 'bot'), 220);
  }

  fab.addEventListener('click', open);
  closeButton?.addEventListener('click', close);
  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', event => { if (event.key === 'Enter') sendMessage(); if (event.key === 'Escape') close(); });
  document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => { input.value = chip.dataset.msg; sendMessage(); }));
})();
