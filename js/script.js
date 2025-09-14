// DOM Elements
const header = document.querySelector('.header');
const heroSection = document.querySelector('.hero');
const navLinks = document.querySelectorAll('.nav-link');
const planButtons = document.querySelectorAll('.plan-btn');
const ctaButtons = document.querySelectorAll('#investBtn, #startInvestBtn');
const loginBtn = document.getElementById('loginBtn');
const learnMoreBtn = document.getElementById('learnMoreBtn');
const galleryItems = document.querySelectorAll('.gallery-item');

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.plan-card, .advantage-card, .gallery-item, .project-info, .project-visual');
    animatedElements.forEach(el => observer.observe(el));
}

// Plan selection functionality
function initPlanSelection() {
    planButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const planCard = button.closest('.plan-card');
            const planTitle = planCard.querySelector('.plan-title').textContent;
            const planRate = planCard.querySelector('.plan-rate').textContent;
            
            // Add loading state
            button.classList.add('loading');
            button.textContent = 'Загрузка...';
            
            // Simulate API call delay
            setTimeout(() => {
                button.classList.remove('loading');
                button.textContent = 'Выбрать план';
                
                // Show success message
                showNotification(`Выбран план "${planTitle}" с доходностью ${planRate}% в месяц`, 'success');
                
                // Here you would typically redirect to registration/login
                console.log(`Selected plan: ${planTitle} - ${planRate}%`);
            }, 1500);
        });
    });
}

// CTA buttons functionality
function initCTAButtons() {
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Scroll to plans section
            const plansSection = document.getElementById('plans');
            if (plansSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = plansSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Learn more button
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            const projectSection = document.getElementById('project');
            if (projectSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = projectSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Login button (placeholder)
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            showNotification('Личный кабинет будет доступен в ближайшее время', 'info');
        });
    }
}

// Gallery lightbox functionality
function initGalleryLightbox() {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-title').textContent;
            
            if (img) {
                openLightbox(img.src, title);
            }
        });
    });
}

// Lightbox modal
function openLightbox(imageSrc, title) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${imageSrc}" alt="${title}" class="lightbox-image">
            <div class="lightbox-title">${title}</div>
        </div>
    `;
    
    // Add lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const image = lightbox.querySelector('.lightbox-image');
    image.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    const titleEl = lightbox.querySelector('.lightbox-title');
    titleEl.style.cssText = `
        color: white;
        margin-top: 1rem;
        font-size: 1.125rem;
        font-weight: 600;
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Fade in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close functionality
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .feature-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.textContent.replace(/[^0-9.]/g, ''));
                const increment = target / 50;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (counter.textContent.includes('$')) {
                            counter.textContent = `$${Math.floor(current).toLocaleString()}`;
                        } else if (counter.textContent.includes('%')) {
                            counter.textContent = `${Math.floor(current)}%`;
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = counter.textContent.includes('$') ? 
                            `$${target.toLocaleString()}` : 
                            counter.textContent.includes('%') ? 
                            `${target}%` : 
                            target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    // Insert mobile menu button
    const headerContent = document.querySelector('.header-content');
    headerContent.insertBefore(mobileMenuBtn, headerContent.lastElementChild);
    
    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'white';
        nav.style.flexDirection = 'column';
        nav.style.padding = '1rem';
        nav.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    });
    
    // Show mobile menu button on small screens
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
            document.querySelector('.nav').style.display = 'flex';
        }
    };
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Parallax effect for hero section
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.075;
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        
        // Only apply parallax while hero section is visible
        if (heroSection && scrolled < heroHeight) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Form validation (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize all functionality
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    try {
        initSmoothScrolling();
        initHeaderScrollEffect();
        initScrollAnimations();
        initPlanSelection();
        initCTAButtons();
        initGalleryLightbox();
        initMobileMenu();
        animateCounters();
        initParallaxEffect();
        
        console.log('OrilResort landing page initialized successfully');
    } catch (error) {
        console.error('Error initializing landing page:', error);
    }
}

// Start initialization
init();

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Export functions for potential external use
window.OrilResort = {
    showNotification,
    openLightbox,
    validateEmail
};
