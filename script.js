// ========================================
// Homezai Landing Page Scripts
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
            const isOpen = document.body.classList.contains('menu-open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('menu-open');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation to elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .benefit-item, .section-header, .demo-inner, .features-image'
    );
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Form submission handler
    const demoForm = document.querySelector('.demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(demoForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simple validation
            const requiredFields = ['firstName', 'lastName', 'email', 'company'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = demoForm.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    input.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            if (!isValid) return;

            // Show success message
            const submitBtn = demoForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Thank you! We\'ll be in touch.';
            submitBtn.style.backgroundColor = '#10b981';
            submitBtn.disabled = true;

            // Log form data (replace with actual API call)
            console.log('Demo request submitted:', data);

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                demoForm.reset();
            }, 3000);
        });
    }

    // Header shadow on scroll
    const header = document.querySelector('.header');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 10) {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = scrollY;
    }, { passive: true });
});
