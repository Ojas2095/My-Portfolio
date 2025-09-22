// Netflix-inspired Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initHorizontalScrolling();
    initSmoothScrolling();
    initButtonHandlers();
    initCardAnimations();
    initScrollAnimations();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Profile avatar click handlers
    const profileAvatars = document.querySelectorAll('.profile-avatar');
    profileAvatars.forEach((avatar, index) => {
        avatar.addEventListener('click', () => {
            // Add a subtle animation on click
            avatar.style.transform = 'scale(0.9)';
            setTimeout(() => {
                avatar.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Horizontal scrolling for content rows
function initHorizontalScrolling() {
    const sliders = document.querySelectorAll('.cards-slider');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Mouse events for drag scrolling
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Add scroll buttons for better UX
        addScrollButtons(slider);
    });
}

// Add left and right scroll buttons to sliders
function addScrollButtons(slider) {
    const container = slider.parentElement;
    
    // Create scroll buttons
    const leftBtn = document.createElement('button');
    const rightBtn = document.createElement('button');
    
    leftBtn.innerHTML = '‹';
    rightBtn.innerHTML = '›';
    
    leftBtn.className = 'scroll-btn scroll-btn-left';
    rightBtn.className = 'scroll-btn scroll-btn-right';
    
    // Add button styles
    const btnStyles = `
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    leftBtn.style.cssText = btnStyles + 'left: 10px;';
    rightBtn.style.cssText = btnStyles + 'right: 10px;';
    
    // Add hover effects
    [leftBtn, rightBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = 'rgba(229, 9, 20, 0.8)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        });
    });
    
    // Show buttons on container hover
    container.style.position = 'relative';
    container.addEventListener('mouseenter', () => {
        leftBtn.style.opacity = '1';
        rightBtn.style.opacity = '1';
    });
    container.addEventListener('mouseleave', () => {
        leftBtn.style.opacity = '0';
        rightBtn.style.opacity = '0';
    });
    
    // Button click handlers
    leftBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    rightBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
    });
    
    container.appendChild(leftBtn);
    container.appendChild(rightBtn);
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Button handlers
function initButtonHandlers() {
    const viewProjectsBtn = document.querySelector('.btn-primary');
    const downloadResumeBtn = document.querySelector('.btn-secondary');
    
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', () => {
            const projectsSection = document.querySelector('.content-row:nth-of-type(2)');
            if (projectsSection) {
                projectsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', () => {
            // Create a simple resume download simulation
            showNotification('Resume download feature would be implemented here!');
        });
    }
}

// Card animations and interactions
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add loading animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        // Initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(card);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 35px rgba(229, 9, 20, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.5)';
        });
        
        // Click effects for cards
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.content-row');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate row title
                const title = entry.target.querySelector('.row-title');
                if (title) {
                    title.style.opacity = '0';
                    title.style.transform = 'translateX(-50px)';
                    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        title.style.opacity = '1';
                        title.style.transform = 'translateX(0)';
                    }, 200);
                }
                
                // Animate cards with stagger effect
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 300 + (index * 100));
                });
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Utility function to show notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #E50914;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some Netflix-style loading animation
function addLoadingAnimation() {
    window.addEventListener('load', () => {
        // Hide loading screen if it exists
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
        
        // Animate hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(50px)';
            hero.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 300);
        }
    });
}

// Initialize loading animation
addLoadingAnimation();

// Add some interactive Easter eggs
function addEasterEggs() {
    // Konami code Easter egg
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            showNotification('🎉 You found the Konami code! Netflix vibes activated!');
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            konamiCode = [];
        }
    });
    
    // Double-click brand name Easter egg
    const brand = document.querySelector('.brand');
    let clickCount = 0;
    let clickTimeout;
    
    if (brand) {
        brand.addEventListener('click', () => {
            clickCount++;
            
            if (clickTimeout) {
                clearTimeout(clickTimeout);
            }
            
            clickTimeout = setTimeout(() => {
                if (clickCount === 3) {
                    showNotification('🚀 Thanks for checking out my portfolio!');
                    // Add some sparkle effects
                    createSparkles();
                }
                clickCount = 0;
            }, 500);
        });
    }
}

// Create sparkle effects
function createSparkles() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                top: ${Math.random() * window.innerHeight}px;
                left: ${Math.random() * window.innerWidth}px;
                z-index: 10000;
                pointer-events: none;
                font-size: ${20 + Math.random() * 20}px;
                opacity: 1;
                transition: all 2s ease;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.style.opacity = '0';
                sparkle.style.transform = 'translateY(-100px) rotate(360deg)';
                setTimeout(() => {
                    document.body.removeChild(sparkle);
                }, 2000);
            }, 100);
        }, i * 200);
    }
}

// Initialize Easter eggs
addEasterEggs();