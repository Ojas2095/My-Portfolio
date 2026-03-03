// ==========================================
// "Ask Oji" — AI Chatbot Trained on Ojaswee's Data
// Works fully offline with comprehensive knowledge base
// Optional: Add Gemini API key for conversational AI
// ==========================================

(function () {
    const fab = document.getElementById('chatbotFab');
    const panel = document.getElementById('chatbotPanel');
    const closeBtn = document.getElementById('chatbotClose');
    const messagesContainer = document.getElementById('chatbotMessages');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    const chipsContainer = document.getElementById('chatbotChips');
    if (!fab || !panel) return;

    // ---- GEMINI CONFIG (Optional — works without it) ----
    const GEMINI_API_KEY = 'Your api key here :D';
    const GEMINI_MODEL = 'gemini-1.5-flash';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    // =====================================================
    // OJASWEE'S COMPLETE KNOWLEDGE BASE
    // =====================================================
    const KB = {
        identity: {
            name: 'Ojaswee Upadhyay',
            nickname: 'Ojas',
            location: 'Gorakhpur, Uttar Pradesh, India — 273003',
            phone: '+91 79855 48606',
            email: 'ojaswee2095@gmail.com',
            dob: 'September 20, 2005',
            college: 'University of Petroleum and Energy Studies (UPES), Dehradun',
            degree: 'B.Tech Computer Science',
            graduation: 'Expected May 2028',
            cgpa: 'Maintaining strong academic performance',
            linkedin: 'https://www.linkedin.com/in/ojaswee-upadhyay-79a041320/',
            github: 'https://github.com/Ojas2095',
            leetcode: 'https://leetcode.com/u/coder209/',
            status: 'Actively looking for tech internships'
        },

        experience: [
            {
                role: 'React Developer Intern',
                company: 'Sentienla QualityAI',
                duration: 'June 2025 – August 2025',
                type: 'Remote',
                highlights: [
                    'Redesigned the company website using React and Tailwind CSS',
                    'Built 8 user-facing QA interfaces serving 500+ daily users',
                    'Improved page load performance by 35% through code splitting',
                    'Implemented responsive design patterns for mobile-first approach'
                ],
                tech: ['React', 'Tailwind CSS', 'JavaScript', 'Git']
            },
            {
                role: 'Full Stack Developer',
                company: 'BuildXLayer',
                duration: 'November 2024 – April 2025',
                type: 'Remote / Hybrid',
                highlights: [
                    'Developed and maintained scalable full-stack web applications using the MERN stack',
                    'Engineered robust RESTful backend APIs with Node.js and Express',
                    'Built responsive, high-performance user interfaces with React and Tailwind CSS',
                    'Collaborated with cross-functional teams to implement new features and resolve critical bugs',
                    'Reduced average query time by 40% through MongoDB index optimization'
                ],
                tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS']
            }
        ],

        projects: [
            {
                name: 'FactForge',
                description: 'AI-powered fact-checking tool built for the Google Gen AI Hackathon. Uses Google Gemini to verify claims against trusted sources.',
                tech: ['Gen AI', 'Google Gemini', 'Python'],
                github: 'https://github.com/Ojas2095/FactForge',
                highlight: 'Built during a hackathon, demonstrates Ojaswee\'s ability to ship fast under pressure'
            },
            {
                name: 'SkillSwap',
                description: 'Peer-to-peer skill exchange platform with 50+ registered users and a real-time matching algorithm. Full-stack web app.',
                tech: ['React', 'Node.js', 'MongoDB'],
                github: 'https://github.com/Ojas2095/SkillSwap',
                highlight: 'Shows full-stack capability with MERN stack'
            },
            {
                name: 'ColdEmailAI',
                description: 'AI-powered automation sending personalized emails to 10-15 companies daily autonomously. Features A/B testing and a real-time analytics dashboard.',
                tech: ['Next.js', 'Python', 'OpenRouter', 'SQLite'],
                github: 'https://github.com/Ojas2095',
                highlight: 'Flagship AI project demonstrating end-to-end automation and API integration'
            },
            {
                name: 'AI Resume Reviewer',
                description: 'Full-stack AI tool performing automatic resume analysis, skill gap extraction, ATS scoring, and GPT-powered coaching.',
                tech: ['FastAPI', 'React', 'OpenAI API', 'NLP'],
                github: 'https://github.com/Ojas2095',
                highlight: 'Advanced deep-learning applied to text parsing and analysis'
            },
            {
                name: 'GradTrack',
                description: 'Mobile application to track SGPA/CGPA, academic attendance, and log placement activities natively.',
                tech: ['React Native', 'Expo', 'TypeScript'],
                github: 'https://github.com/Ojas2095',
                highlight: 'Native mobile app demonstrating cross-platform development'
            },
            {
                name: 'Medicare Dashboard',
                description: 'Healthcare application with appointment booking, patient analytics, and authentication. Built with React and Flask.',
                tech: ['React', 'Flask', 'SQL Server'],
                github: 'https://github.com/Ojas2095/MediCare-',
                highlight: 'Real-world professional project from internship'
            },
            {
                name: 'Voice Assistant',
                description: 'Browser-based voice assistant using Web Speech API. Supports speech recognition and text-to-speech synthesis for hands-free interaction.',
                tech: ['JavaScript', 'Web Speech API'],
                github: 'https://github.com/Ojas2095/Voice-Assistant-',
                highlight: 'Demonstrates interest in emerging browser APIs'
            },
            {
                name: 'Meeting Summarizer',
                description: 'AI-driven tool that transcribes meeting recordings and generates concise summaries using natural language processing.',
                tech: ['JavaScript', 'AI/NLP'],
                github: 'https://github.com/Ojas2095/meeting-summarizer',
                highlight: 'Practical productivity tool showcasing AI integration'
            },
            {
                name: 'Spotify Clone',
                description: 'Full-stack music player with playlists, search, shuffle, and repeat. Uses Jamendo API for royalty-free music streaming.',
                tech: ['React', 'Flask', 'Jamendo API'],
                github: 'https://github.com/Ojas2095/SpotifyClone',
                highlight: 'Most complex project — full-stack with external API integration'
            }
        ],

        skills: {
            frontend: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML5 & CSS3'],
            backend: ['Node.js', 'Express', 'Python', 'Flask', 'FastAPI'],
            database: ['MongoDB', 'PostgreSQL', 'SQLite', 'SQL Server'],
            mobile: ['Android Development', 'Kotlin', 'React Native', 'Expo'],
            ai: ['LLM APIs (OpenRouter, Gemini, OpenAI)', 'NLP', 'Data Viz (pandas, matplotlib)'],
            tools: ['Git', 'GitHub', 'REST APIs']
        },

        achievements: [
            '100+ LeetCode problems solved',
            'Cleared internal round of Smart India Hackathon (SIH)',
            'Reached BGMI tournament semifinals in college',
            'Rubik\'s Cube average improved from 19.89s to 17.62s'
        ],

        hobbies: [
            'BGMI esports — serious competitive player, reached tournament semifinals',
            'Speedcubing — Rubik\'s Cube solver, current average 17.62 seconds',
            'Cricket — team sports lover',
            'Kabaddi — enjoys contact sports',
            'Badminton — active recreational player',
            'Networking — loves meeting new people and building connections'
        ],

        personality: [
            'Energetic and fun to work with',
            'Thrives under pressure (hackathon veteran)',
            'Self-taught in many technologies',
            'Curious about how things work',
            'Great communicator and team player',
            'Balances tech and sports equally'
        ]
    };

    // =====================================================
    // INTENT MATCHING ENGINE
    // =====================================================
    const intents = [
        {
            patterns: ['who is', 'who are you', 'about ojaswee', 'tell me about', 'introduce', 'who\'s ojaswee', 'about him', 'about you', 'what do you know'],
            handler: () => {
                const k = KB.identity;
                return `**Ojaswee Upadhyay** is a ${k.degree} student at **${k.college}** (graduating ${k.graduation}). He's from ${k.location.split(',')[0]}, India.\n\nHe's a passionate frontend developer with experience in React, full-stack development, and has participated in multiple hackathons. He's currently ${k.status}! 🚀\n\nFun fact: He's also a speedcuber and BGMI esports player! 🧩🎮`;
            }
        },
        {
            patterns: ['skill', 'tech stack', 'technologies', 'what can he do', 'what does he know', 'programming', 'languages', 'frameworks'],
            handler: () => {
                const s = KB.skills;
                return `Here's Ojaswee's tech arsenal:\n\n**Frontend:** ${s.frontend.join(', ')}\n**Backend:** ${s.backend.join(', ')}\n**Tools:** ${s.tools.join(', ')}\n**Soft Skills:** ${s.soft.join(', ')}\n\nHe's strongest in **React** and **JavaScript** — core focus areas! 💻`;
            }
        },
        {
            patterns: ['project', 'built', 'portfolio work', 'what has he built', 'show me projects', 'github project'],
            handler: () => {
                let response = 'Ojaswee has built **6 notable projects**:\n\n';
                KB.projects.forEach((p, i) => {
                    response += `${i + 1}. **${p.name}** — ${p.description.split('.')[0]}. _(${p.tech.join(', ')})_\n`;
                });
                response += '\nScroll down to the Projects section to see them all! Each card links to its GitHub repo. 🚀';
                return response;
            }
        },
        {
            patterns: ['factforge', 'fact forge', 'fact-checking', 'fact check'],
            handler: () => {
                const p = KB.projects[0];
                return `**${p.name}** — ${p.description}\n\n🔧 Tech: ${p.tech.join(', ')}\n🔗 [GitHub](${p.github})\n\n${p.highlight}! 🧠`;
            }
        },
        {
            patterns: ['skillswap', 'skill swap', 'skill exchange', 'peer exchange'],
            handler: () => {
                const p = KB.projects[1];
                return `**${p.name}** — ${p.description}\n\n🔧 Tech: ${p.tech.join(', ')}\n🔗 [GitHub](${p.github})\n\n${p.highlight}! 🔄`;
            }
        },
        {
            patterns: ['medicare', 'healthcare', 'medical', 'dashboard'],
            handler: () => {
                const p = KB.projects[2];
                return `**${p.name}** — ${p.description}\n\n🔧 Tech: ${p.tech.join(', ')}\n🔗 [GitHub](${p.github})\n\n${p.highlight}! 🏥`;
            }
        },
        {
            patterns: ['voice assistant', 'speech', 'voice'],
            handler: () => {
                const p = KB.projects[3];
                return `**${p.name}** — ${p.description}\n\n🔧 Tech: ${p.tech.join(', ')}\n🔗 [GitHub](${p.github})\n\n${p.highlight}! 🎙️`;
            }
        },
        {
            patterns: ['meeting summarizer', 'meeting', 'summarizer', 'transcri'],
            handler: () => {
                const p = KB.projects[4];
                return `**${p.name}** — ${p.description}\n\n🔧 Tech: ${p.tech.join(', ')}\n🔗 [GitHub](${p.github})\n\n${p.highlight}! 📝`;
            }
        },
        {
            patterns: ['spotify', 'music', 'clone', 'jamendo'],
            handler: () => {
                const p = KB.projects[5];
                return `**${p.name}** — ${p.description}\n\n🔧 Tech: ${p.tech.join(', ')}\n🔗 [GitHub](${p.github})\n\n${p.highlight}! 🎵`;
            }
        },
        {
            patterns: ['experience', 'intern', 'work', 'job', 'company', 'career', 'where did he work', 'professional'],
            handler: () => {
                let response = 'Ojaswee has **2 internship experiences**:\n\n';
                KB.experience.forEach(exp => {
                    response += `**${exp.role}** at _${exp.company}_ (${exp.duration}, ${exp.type})\n`;
                    response += exp.highlights.slice(0, 3).map(h => `  • ${h}`).join('\n') + '\n\n';
                });
                response += 'Both internships gave him real-world production experience! 💼';
                return response;
            }
        },
        {
            patterns: ['sentienla', 'qualityai', 'react intern'],
            handler: () => {
                const exp = KB.experience[0];
                return `**${exp.role}** at _${exp.company}_ (${exp.duration})\nType: ${exp.type}\n\nKey contributions:\n${exp.highlights.map(h => `• ${h}`).join('\n')}\n\nTech used: ${exp.tech.join(', ')} 💻`;
            }
        },
        {
            patterns: ['buildxlayer', 'build x layer', 'full stack developer', 'mern developer'],
            handler: () => {
                const exp = KB.experience[1];
                return `**${exp.role}** at _${exp.company}_ (${exp.duration})\n\nKey contributions:\n${exp.highlights.map(h => `• ${h}`).join('\n')}\n\nTech used: ${exp.tech.join(', ')} 🔧`;
            }
        },
        {
            patterns: ['contact', 'email', 'reach', 'hire', 'connect', 'phone', 'number'],
            handler: () => {
                const k = KB.identity;
                return `Here's how to reach Ojaswee:\n\n📧 **Email:** ${k.email}\n📞 **Phone:** ${k.phone}\n💼 **LinkedIn:** [Profile](${k.linkedin})\n🐙 **GitHub:** [Ojas2095](${k.github})\n📊 **LeetCode:** [coder209](${k.leetcode})\n\nOr just use the contact form below! He's ${k.status} 🚀`;
            }
        },
        {
            patterns: ['education', 'college', 'university', 'upes', 'degree', 'study', 'school', 'academic'],
            handler: () => {
                const k = KB.identity;
                return `🎓 **${k.degree}** at **${k.college}**\n📅 Expected graduation: ${k.graduation}\n📍 Campus: Dehradun, Uttarakhand\n\nHe's maintaining strong academics while juggling internships, hackathons, and personal projects! 📚`;
            }
        },
        {
            patterns: ['achievement', 'award', 'hackathon', 'competition', 'won', 'sih', 'smart india'],
            handler: () => {
                let response = 'Ojaswee\'s key achievements:\n\n';
                KB.achievements.forEach(a => { response += `🏆 ${a}\n`; });
                response += '\nHe thrives in competitive environments! 🔥';
                return response;
            }
        },
        {
            patterns: ['hobby', 'hobbies', 'fun', 'free time', 'interest', 'gaming', 'bgmi', 'sports', 'cricket', 'badminton', 'kabaddi'],
            handler: () => {
                let response = 'When Ojaswee isn\'t coding, he\'s:\n\n';
                KB.hobbies.forEach(h => { response += `• ${h}\n`; });
                response += '\nA true all-rounder who balances tech and sports! 🏏🧩🎮';
                return response;
            }
        },
        {
            patterns: ['cube', 'rubik', 'speedcub', 'cubing', 'puzzle'],
            handler: () => `🧩 Ojaswee is a **speedcuber**! His Rubik's Cube average went from **19.89s** to **17.62s**.\n\nPro tip: Double-click the 🧩 achievement card in the Achievements section to activate a hidden cube timer! ⏱️`
        },
        {
            patterns: ['resume', 'cv', 'download'],
            handler: () => {
                setTimeout(() => {
                    const link = document.querySelector('a[download]');
                    if (link) link.click();
                }, 500);
                return '📄 Downloading Ojaswee\'s resume for you right now! If the download doesn\'t start, scroll to the hero section and click "Download Resume".';
            }
        },
        {
            patterns: ['github', 'repos', 'open source', 'code'],
            handler: () => `🐙 Check out Ojaswee\'s GitHub: [github.com/Ojas2095](${KB.identity.github})\n\nHe has **29+ repositories** including FactForge, SkillSwap, Medicare Dashboard, and more. The GitHub Activity section on this page shows his contribution heatmap! 📊`
        },
        {
            patterns: ['leetcode', 'dsa', 'coding challenge', 'competitive', 'problem solving'],
            handler: () => `📊 Ojaswee's LeetCode profile: [leetcode.com/u/coder209](${KB.identity.leetcode})\n\nHe practices Data Structures & Algorithms regularly to sharpen his problem-solving skills! 💡`
        },
        {
            patterns: ['react', 'frontend'],
            handler: () => `⚛️ React is Ojaswee's **primary framework**! He:\n\n• Interned as a React Developer at Sentienla QualityAI\n• Built SkillSwap, Medicare Dashboard, and Spotify Clone with React\n• Knows component architecture, hooks, state management, and routing\n• Pairs React with Tailwind CSS for rapid UI development\n\nHe's a true React specialist! 🚀`
        },
        {
            patterns: ['python', 'flask', 'backend'],
            handler: () => `🐍 On the backend, Ojaswee works with:\n\n• **Python & Flask** — Built Medicare Dashboard and Spotify Clone backends\n• **Node.js & Express** — Used in SkillSwap and other projects\n• **MongoDB** — NoSQL database for full-stack apps\n• **SQL Server** — Used in professional internship projects\n\nHe's a versatile full-stack developer! 🔧`
        },
        {
            patterns: ['location', 'where', 'city', 'gorakhpur', 'dehradun', 'india'],
            handler: () => `📍 Ojaswee is from **Gorakhpur, Uttar Pradesh, India** (273003).\n\nHe's currently studying at **UPES, Dehradun**. He's open to remote internships and on-site opportunities across India! 🇮🇳`
        },
        {
            patterns: ['age', 'old', 'born', 'birthday'],
            handler: () => `🎂 Ojaswee was born on **September 20, 2005**. He's a young, driven developer with a bright future ahead! ✨`
        },
        {
            patterns: ['personality', 'what is he like', 'describe him', 'type of person'],
            handler: () => {
                let response = 'People describe Ojaswee as:\n\n';
                KB.personality.forEach(p => { response += `✨ ${p}\n`; });
                return response;
            }
        },
        {
            patterns: ['hello', 'hi ', 'hey', 'hola', 'sup', 'yo', 'hii', 'namaste'],
            handler: () => {
                const greetings = [
                    "Hey there! 👋 I'm Oji, Ojaswee's AI assistant. I know everything about him — ask me about his skills, projects, experience, or just chat!",
                    "Hello! 🚀 Welcome to Ojaswee's portfolio! I'm Oji — try asking me about his projects, tech stack, or achievements!",
                    "Hi! 😊 Great to see you here! I'm Oji, ask me anything about Ojaswee — his work, his hobbies, even his Rubik's cube times!"
                ];
                return greetings[Math.floor(Math.random() * greetings.length)];
            }
        },
        {
            patterns: ['thank', 'thanks', 'thx', 'appreciate'],
            handler: () => {
                const replies = [
                    "You're welcome! 😊 Feel free to ask anything else about Ojaswee!",
                    "Happy to help! 🙏 If you want to connect with Ojaswee, check out the contact section below!",
                    "Anytime! 🚀 Don't forget to check out his projects and drop a ⭐ on GitHub!"
                ];
                return replies[Math.floor(Math.random() * replies.length)];
            }
        },
        {
            patterns: ['bye', 'goodbye', 'see you', 'later', 'cya'],
            handler: () => "Bye! 👋 Great chatting with you! If you liked what you saw, consider connecting with Ojaswee on [LinkedIn](https://www.linkedin.com/in/ojaswee-upadhyay-79a041320/)! 💼"
        },
        {
            patterns: ['why should i hire', 'why hire', 'why ojaswee', 'what makes him special', 'strengths'],
            handler: () => `Great question! Here's why Ojaswee stands out:\n\n🔥 **2 real internship experiences** — not just coursework\n🏆 **Hackathon veteran** — SIH, Google Gen AI, Protorush, CSA\n💻 **6 deployed projects** — from AI tools to full-stack apps\n⚡ **React specialist** — his core strength\n🧠 **Fast learner** — picks up new tech quickly under pressure\n🤝 **Great communicator** — team player and leader\n🎯 **Driven** — balances tech, sports, and academics\n\nHe's not just a developer — he's a **builder** who ships! 🚀`
        }
    ];

    // Navigation shortcuts
    const navIntents = [
        { patterns: ['show project', 'go to project', 'navigate project', 'scroll project'], target: '#projects' },
        { patterns: ['show skill', 'go to skill', 'navigate skill', 'scroll skill'], target: '#skills' },
        { patterns: ['show experience', 'go to experience', 'scroll experience'], target: '#experience' },
        { patterns: ['show contact', 'go to contact', 'scroll contact'], target: '#contact' },
        { patterns: ['show about', 'go to about', 'scroll about'], target: '#about' },
        { patterns: ['show achievement', 'go to achievement', 'scroll achievement'], target: '#achievements' },
        { patterns: ['show testimonial', 'go to testimonial'], target: '#testimonials' },
        { patterns: ['show github', 'go to github', 'scroll github', 'show heatmap'], target: '#github' },
        { patterns: ['show playground', 'go to playground', 'code editor'], target: '#playground' },
        { patterns: ['show globe', 'go to globe', 'visitor'], target: '#globe-section' },
        { patterns: ['go to top', 'go home', 'scroll top'], target: '#hero' }
    ];

    // System prompt for Gemini (used only when API key is set)
    const SYSTEM_PROMPT = `You are "Oji", the AI assistant on Ojaswee Upadhyay's portfolio. You are friendly, witty, use emojis, and ONLY answer about Ojaswee.

COMPLETE DATA:
${JSON.stringify(KB, null, 2)}

RULES:
- ONLY answer about Ojaswee, his skills, projects, experience, and personality
- If asked something unrelated, politely redirect: "I'm trained specifically on Ojaswee's data! Ask me about his projects, skills, or experience 😊"
- Keep responses concise (3-5 sentences max)
- Use markdown formatting (bold, bullet points) for readability
- Add relevant emojis
- If someone asks to see a section, suggest they scroll to it
- Never make up information not in the data above`;

    let chatHistory = [];
    const stored = sessionStorage.getItem('oji_chat');
    if (stored) {
        try {
            const msgs = JSON.parse(stored);
            msgs.forEach(m => addMessage(m.text, m.role, false));
            chatHistory = msgs;
        } catch (_) { }
    }

    // Toggle panel
    fab.addEventListener('click', () => {
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) input.focus();
    });
    closeBtn.addEventListener('click', () => panel.classList.add('hidden'));

    // Send
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

    // Chips
    chipsContainer.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            input.value = chip.dataset.msg;
            sendMessage();
        });
    });

    async function sendMessage() {
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        addMessage(text, 'user');
        const lower = text.toLowerCase();

        // Check navigation intents first
        for (const nav of navIntents) {
            if (nav.patterns.some(p => lower.includes(p))) {
                const section = document.querySelector(nav.target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    const name = nav.target.replace('#', '').replace('-', ' ');
                    addMessage(`Scrolling to the ${name} section! 🚀`, 'bot');
                    return;
                }
            }
        }

        // Check knowledge base intents
        for (const intent of intents) {
            if (intent.patterns.some(p => lower.includes(p))) {
                // Small delay to feel natural
                setTimeout(() => addMessage(intent.handler(), 'bot'), 300 + Math.random() * 400);
                return;
            }
        }

        // If no local match and Gemini is configured, use API
        if (GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
            const typingEl = addMessage('Thinking...', 'bot', false);
            typingEl.classList.add('typing');

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                        contents: [{ parts: [{ text }] }]
                    })
                });
                const data = await response.json();
                const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || getFallback();
                typingEl.querySelector('p').textContent = reply;
                typingEl.classList.remove('typing');
                saveChat(reply, 'bot');
            } catch {
                typingEl.querySelector('p').textContent = getFallback();
                typingEl.classList.remove('typing');
                saveChat(getFallback(), 'bot');
            }
            return;
        }

        // Fallback for unmatched queries
        setTimeout(() => addMessage(getFallback(), 'bot'), 400);
    }

    function getFallback() {
        const fallbacks = [
            "I'm specifically trained on Ojaswee's data! Try asking about his **projects**, **skills**, **experience**, or **achievements** 😊",
            "Hmm, I'm not sure about that — but I know everything about Ojaswee! Ask me about his tech stack, internships, or hackathon wins! 🚀",
            "That's outside my area! I'm Oji — built to talk about Ojaswee. Try: *'What are his skills?'* or *'Tell me about his projects'* 💡",
            "I'm an expert on all things Ojaswee! Try asking: *'Why should I hire him?'* or *'What has he built?'* 🔥"
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    function addMessage(text, role, save = true) {
        const div = document.createElement('div');
        div.className = `chat-message ${role}`;
        // Simple markdown-ish rendering for bold and links
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:#06b6d4;text-decoration:underline">$1</a>')
            .replace(/\n/g, '<br>');
        div.innerHTML = `<p>${html}</p>`;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        if (save) saveChat(text, role);
        return div;
    }

    function saveChat(text, role) {
        chatHistory.push({ text, role });
        sessionStorage.setItem('oji_chat', JSON.stringify(chatHistory));
    }
})();
