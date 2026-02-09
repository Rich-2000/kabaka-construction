/* ============================================
   MODERN KABAKA CONSTRUCTION WEBSITE SCRIPTS
   ============================================ */

// ============================================
// DOM ELEMENTS
// ============================================
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const heroSlides = document.querySelectorAll('.hero-slide');
const statNumbers = document.querySelectorAll('[data-target]');
const contactForm = document.getElementById('contactForm');

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

// Toggle Mobile Menu
menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close Mobile Menu on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle?.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Active Navigation Link on Scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
}

// ============================================
// HERO SLIDESHOW
// ============================================
let currentSlide = 0;

function showSlide(index) {
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
if (heroSlides.length > 0) {
    setInterval(nextSlide, 5000);
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            animateCounter(entry.target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
function handleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn?.classList.add('show');
    } else {
        backToTopBtn?.classList.remove('show');
    }
}

backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add 'reveal' class to elements for animation
function initRevealElements() {
    const elementsToReveal = [
        '.service-card',
        '.project-card',
        '.process-step',
        '.mv-card',
        '.feature-item',
        '.stat-item'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('reveal');
        });
    });
}

// ============================================
// FORM SUBMISSION
// ============================================
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Show success message (In production, you would send this to a server)
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

// Notification Function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);

// ============================================
// MAP INITIALIZATION (Leaflet)
// ============================================
function initMap() {
    // Check if Leaflet is loaded and map element exists
    if (typeof L !== 'undefined' && document.getElementById('map')) {
        // Coordinates for Accra, Ghana
        const accraCoords = [5.6037, -0.1870];
        
        // Initialize map
        const map = L.map('map', {
            center: accraCoords,
            zoom: 13,
            zoomControl: true,
            scrollWheelZoom: false
        });
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Custom marker icon
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background: #FF6B35; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"><i class="fas fa-map-marker-alt"></i></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });
        
        // Add marker
        const marker = L.marker(accraCoords, { icon: customIcon }).addTo(map);
        
        // Add popup
        marker.bindPopup(`
            <div style="text-align: center; padding: 10px;">
                <strong style="font-family: 'Syne', sans-serif; font-size: 16px;">Kabaka Construction</strong><br>
                <span style="color: #6C757D; font-size: 14px;">Accra, Ghana</span>
            </div>
        `);
        
        // Open popup by default
        marker.openPopup();
        
        // Make map responsive
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// EVENT LISTENERS
// ============================================

// Optimized scroll event listener
window.addEventListener('scroll', debounce(() => {
    handleHeaderScroll();
    handleBackToTop();
    updateActiveNavLink();
    revealOnScroll();
}, 10));

// Window resize handler
window.addEventListener('resize', throttle(() => {
    // Handle any resize-specific logic here
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        menuToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 100));

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    initRevealElements();
    initLazyLoading();
    handleHeaderScroll();
    handleBackToTop();
    updateActiveNavLink();
    revealOnScroll();
    
    // Initialize map after a short delay to ensure DOM is ready
    setTimeout(initMap, 500);
    
    // Add loading animation complete
    document.body.classList.add('loaded');
    
    console.log('Kabaka Construction Website Loaded Successfully! 🏗️');
});

// ============================================
// PAGE VISIBILITY API
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        console.log('Page hidden - pausing animations');
    } else {
        // Resume animations when tab is visible
        console.log('Page visible - resuming animations');
    }
});

// ============================================
// SERVICE WORKER (Progressive Web App)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker for offline support (optional)
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('ServiceWorker registered'))
        //     .catch(err => console.log('ServiceWorker registration failed'));
    });
}

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        menuToggle?.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Focus trap in mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trap to mobile menu
if (navMenu) {
    trapFocus(navMenu);
}

// ============================================
// PARALLAX EFFECT (Optional Enhancement)
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', debounce(() => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
}

// Initialize parallax if elements exist
if (document.querySelectorAll('[data-parallax]').length > 0) {
    initParallax();
}

// ============================================
// COOKIE CONSENT (Optional)
// ============================================
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <button class="btn btn-primary btn-accept-cookies">Accept</button>
            </div>
        `;
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(15, 15, 15, 0.95);
            color: white;
            padding: 1.5rem;
            z-index: 10000;
            animation: slideInUp 0.5s ease;
        `;
        
        document.body.appendChild(banner);
        
        banner.querySelector('.btn-accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            banner.style.animation = 'slideOutDown 0.5s ease';
            setTimeout(() => banner.remove(), 500);
        });
    }
}

// Add cookie consent animations
const cookieStyle = document.createElement('style');
cookieStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(100%);
        }
    }
    
    .cookie-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1280px;
        margin: 0 auto;
        gap: 2rem;
    }
    
    @media (max-width: 768px) {
        .cookie-content {
            flex-direction: column;
            text-align: center;
        }
    }
`;
document.head.appendChild(cookieStyle);

// Initialize cookie consent (uncomment to enable)
// initCookieConsent();

// ============================================
// ANALYTICS TRACKING (Placeholder)
// ============================================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Track Event: ${category} - ${action} - ${label}`);
    
    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    });
});

// ============================================
// EXPORT FOR TESTING
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        animateCounter,
        trackEvent
    };
}