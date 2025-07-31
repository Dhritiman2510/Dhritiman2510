// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initParticles();
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initCounters();
    initForms();
    initFeedbackSystem();
    initBackToTop();
    initTypingEffect();
    
    // Show loading complete
    document.body.classList.remove('loading');
});

// Particle.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .about-stats, .skill-category, .project-card, .contact-info, .contact-form, .feedback-intro, .feedback-form');
    
    animatedElements.forEach((el, index) => {
        // Add staggered animation classes
        if (index % 2 === 0) {
            el.classList.add('fade-in');
        } else {
            el.classList.add('slide-in-left');
        }
        observer.observe(el);
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const targetWidth = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = targetWidth;
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const phrases = [
        "Hello, I'm",
        "Welcome, I'm",
        "Hi there, I'm",
        "Greetings, I'm"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
}

// Form handling
function initForms() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Remove active labels
            const labels = this.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = '#999';
            });
        });
    }
}

// Feedback system
function initFeedbackSystem() {
    const feedbackForm = document.getElementById('feedbackForm');
    const starRating = document.getElementById('starRating');
    const feedbackList = document.getElementById('feedbackList');
    let selectedRating = 0;

    // Star rating functionality
    if (starRating) {
        const stars = starRating.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                selectedRating = index + 1;
                updateStarDisplay();
            });
            
            star.addEventListener('mouseenter', function() {
                highlightStars(index + 1);
            });
        });
        
        starRating.addEventListener('mouseleave', function() {
            updateStarDisplay();
        });
        
        function highlightStars(rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }
        
        function updateStarDisplay() {
            highlightStars(selectedRating);
        }
    }

    // Feedback form submission
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (selectedRating === 0) {
                showToast('Please provide a rating before submitting.', 'error');
                return;
            }
            
            const formData = new FormData(this);
            const feedback = {
                rating: selectedRating,
                message: formData.get('feedback'),
                name: formData.get('name') || 'Anonymous',
                date: new Date().toLocaleDateString()
            };
            
            // Save feedback to localStorage
            saveFeedback(feedback);
            
            // Display feedback
            displayFeedback(feedback);
            
            // Reset form
            this.reset();
            selectedRating = 0;
            updateStarDisplay();
            
            showToast('Thank you for your feedback!', 'success');
        });
    }

    // Load and display existing feedback
    loadFeedback();

    function saveFeedback(feedback) {
        let feedbacks = JSON.parse(localStorage.getItem('portfolioFeedback')) || [];
        feedbacks.unshift(feedback); // Add to beginning
        
        // Keep only last 10 feedbacks
        if (feedbacks.length > 10) {
            feedbacks = feedbacks.slice(0, 10);
        }
        
        localStorage.setItem('portfolioFeedback', JSON.stringify(feedbacks));
    }

    function loadFeedback() {
        const feedbacks = JSON.parse(localStorage.getItem('portfolioFeedback')) || [];
        
        if (feedbacks.length === 0) {
            // Add some sample feedback
            const sampleFeedbacks = [
                {
                    rating: 5,
                    message: "Amazing portfolio! The animations and design are top-notch. Would love to see more project details.",
                    name: "Sarah Chen",
                    date: new Date(Date.now() - 86400000).toLocaleDateString()
                },
                {
                    rating: 4,
                    message: "Great work! The particle effects are really cool. Maybe add a dark mode toggle?",
                    name: "Mike Johnson",
                    date: new Date(Date.now() - 172800000).toLocaleDateString()
                }
            ];
            
            sampleFeedbacks.forEach(feedback => {
                saveFeedback(feedback);
                displayFeedback(feedback);
            });
        } else {
            feedbacks.forEach(feedback => displayFeedback(feedback));
        }
    }

    function displayFeedback(feedback) {
        if (!feedbackList) return;
        
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item fade-in';
        
        const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
        
        feedbackItem.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-author">${feedback.name}</span>
                <span class="feedback-rating">${stars}</span>
            </div>
            <div class="feedback-message">${feedback.message}</div>
            <div class="feedback-date">${feedback.date}</div>
        `;
        
        feedbackList.appendChild(feedbackItem);
        
        // Trigger animation
        setTimeout(() => {
            feedbackItem.classList.add('visible');
        }, 100);
    }
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastClose = document.getElementById('toastClose');
    
    if (!toast || !toastMessage) return;
    
    // Set message and type
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    const autoHide = setTimeout(() => {
        hideToast();
    }, 5000);
    
    // Close button functionality
    if (toastClose) {
        toastClose.onclick = function() {
            clearTimeout(autoHide);
            hideToast();
        };
    }
    
    function hideToast() {
        toast.classList.remove('show');
    }
}

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form label animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        const label = this.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
            animateLabel(label, true);
        }
    });
    
    input.addEventListener('blur', function() {
        const label = this.nextElementSibling;
        if (label && label.tagName === 'LABEL' && this.value === '') {
            animateLabel(label, false);
        }
    });
    
    // Check if input has value on load
    if (input.value !== '') {
        const label = input.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
            animateLabel(label, true);
        }
    }
});

function animateLabel(label, isActive) {
    if (isActive) {
        label.style.top = '-10px';
        label.style.fontSize = '0.8rem';
        label.style.color = '#667eea';
        label.style.background = 'white';
        label.style.padding = '0 5px';
    } else {
        label.style.top = '1rem';
        label.style.fontSize = '1rem';
        label.style.color = '#999';
        label.style.background = 'transparent';
        label.style.padding = '0';
    }
}

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Social links hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add loading class initially
document.body.classList.add('loading');

// Performance optimization: Debounced scroll handler
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(function() {
        // Perform scroll-dependent operations here if needed
    }, 10);
});

// Intersection Observer for lazy loading (if needed for images)
const lazyLoadObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('loading');
                lazyLoadObserver.unobserve(img);
            }
        }
    });
});

// Apply lazy loading to images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    lazyLoadObserver.observe(img);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Easter egg activated!
        showToast('🎉 Konami Code activated! You found the easter egg!', 'success');
        
        // Add special effect
        document.body.style.animation = 'pulse 0.5s ease-in-out 3';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1500);
        
        konamiCode = [];
    }
});

// Console message for developers
console.log(`
🚀 Welcome to Alex Johnson's Portfolio!
   
   Built with vanilla HTML, CSS, and JavaScript
   Features:
   - Particle.js animations
   - Smooth scrolling
   - Interactive feedback system
   - Responsive design
   - Accessibility features
   
   Try the Konami code: ↑↑↓↓←→←→BA
   
   Interested in the code? Check out the source!
`);

// Accessibility: Skip to content link
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && !e.shiftKey) {
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #667eea;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.appendChild(skipLink);
        skipLink.focus();
    }
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add PWA features
        // navigator.serviceWorker.register('/sw.js');
    });
}