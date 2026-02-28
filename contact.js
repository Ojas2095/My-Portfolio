// ==========================================
// Contact Form — EmailJS Integration
// ==========================================

(function () {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    // ---- CONFIGURATION ----
    // Sign up free at https://www.emailjs.com
    // Create a service (Gmail) and a template, then paste your IDs below.
    const EMAILJS_PUBLIC_KEY = 'Xnib5RLBGm1qR7iW0';
    const EMAILJS_SERVICE_ID = 'service_9dvdt8o';
    const EMAILJS_TEMPLATE_ID = 'template_hkjaan6';

    // Load EmailJS SDK dynamically (only when form exists)
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = () => {
            if (window.emailjs) {
                window.emailjs.init(EMAILJS_PUBLIC_KEY);
            }
        };
        document.head.appendChild(script);
    }

    // Rate limiting
    let lastSubmit = 0;
    const COOLDOWN = 30000; // 30 seconds

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Rate limit
        const now = Date.now();
        if (now - lastSubmit < COOLDOWN) {
            const wait = Math.ceil((COOLDOWN - (now - lastSubmit)) / 1000);
            showStatus(`Please wait ${wait}s before sending again.`, 'error');
            return;
        }

        // Basic validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            showStatus('Please fill in all fields.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Disable button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
            // Demo mode — simulate send
            setTimeout(() => {
                showStatus('✓ Message sent! (Demo mode — configure EmailJS to enable real emails)', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                lastSubmit = Date.now();
            }, 1200);
            return;
        }

        try {
            await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
            showStatus('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            lastSubmit = Date.now();
        } catch (err) {
            console.error('EmailJS error:', err);
            showStatus('Failed to send. Please email me directly at ojaswee2095@gmail.com', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    function showStatus(msg, type) {
        status.textContent = msg;
        status.className = `form-status ${type}`;
        setTimeout(() => {
            status.textContent = '';
            status.className = 'form-status';
        }, 5000);
    }
})();
