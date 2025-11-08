// ===================================
// Smooth Scrolling & Navigation
// ===================================

// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');

// Smooth scroll to section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Skip smooth scroll for external links
        if (link.classList.contains('external-link')) {
            return;
        }
        
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===================================
// Scroll Spy - Update Active Nav Link
// ===================================

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                // Skip external links for scroll spy
                if (!link.classList.contains('external-link')) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                }
            });
        }
    });
}

// Throttle function for better performance
function throttle(func, wait) {
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

window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// ===================================
// Navbar Background on Scroll
// ===================================

const navbar = document.getElementById('navbar');

function updateNavbarBackground() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', throttle(updateNavbarBackground, 100));

// ===================================
// Mobile Menu Toggle
// ===================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinksContainer.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close mobile menu for both internal and external links
        navLinksContainer.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Elements to animate
const animatedElements = document.querySelectorAll(`
    .content-card,
    .topic-block,
    .layer-card,
    .activation-card,
    .loss-card,
    .optimizer-card,
    .type-card,
    .advanced-card,
    .practice-card
`);

// Set initial state and observe
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    animateOnScroll.observe(element);
});

// ===================================
// Interactive Perceptron Diagram
// ===================================

const perceptronDiagram = document.querySelector('.perceptron-diagram');

if (perceptronDiagram) {
    const svg = perceptronDiagram.querySelector('svg');
    const lines = svg.querySelectorAll('line');
    const circles = svg.querySelectorAll('circle');
    
    // Add pulse animation to neurons on hover
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', () => {
            circle.style.transform = 'scale(1.2)';
            circle.style.transformOrigin = 'center';
            circle.style.transition = 'transform 0.3s ease';
        });
        
        circle.addEventListener('mouseleave', () => {
            circle.style.transform = 'scale(1)';
        });
    });
    
    // Animate signal flow on diagram hover
    let animationInterval;
    
    perceptronDiagram.addEventListener('mouseenter', () => {
        let opacity = 0;
        let direction = 1;
        
        animationInterval = setInterval(() => {
            opacity += 0.05 * direction;
            
            if (opacity >= 1 || opacity <= 0) {
                direction *= -1;
            }
            
            lines.forEach(line => {
                line.style.opacity = 0.3 + (opacity * 0.7);
            });
        }, 50);
    });
    
    perceptronDiagram.addEventListener('mouseleave', () => {
        clearInterval(animationInterval);
        lines.forEach(line => {
            line.style.opacity = '1';
        });
    });
}

// ===================================
// Interactive Formula Boxes
// ===================================

const formulaBoxes = document.querySelectorAll('.formula-box');

formulaBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'scale(1.02)';
        box.style.transition = 'transform 0.3s ease';
        box.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
    });
    
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'scale(1)';
        box.style.boxShadow = 'none';
    });
});

// ===================================
// Typing Effect for Hero Title
// ===================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    const originalHTML = element.innerHTML;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.innerHTML = originalHTML;
        }
    }
    
    return type;
}

// Uncomment below to enable typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     window.addEventListener('load', () => {
//         const text = heroTitle.textContent;
//         typeWriter(heroTitle, text, 50)();
//     });
// }

// ===================================
// Interactive Neural Network Background
// ===================================

class NeuralNetworkBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.animationFrame = null;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createNodes();
        this.createConnections();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createNodes() {
        const nodeCount = 30;
        this.nodes = [];
        
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2
            });
        }
    }
    
    createConnections() {
        this.connections = [];
        const maxDistance = 150;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.connections.push({
                        from: i,
                        to: j,
                        distance: distance
                    });
                }
            }
        }
    }
    
    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.connections.forEach(conn => {
            const from = this.nodes[conn.from];
            const to = this.nodes[conn.to];
            const opacity = 1 - (conn.distance / 150);
            
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity * 0.3})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(102, 126, 234, 0.6)';
            this.ctx.fill();
        });
    }
    
    animate() {
        this.updateNodes();
        this.createConnections();
        this.draw();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Initialize neural network background in hero section
const heroBackground = document.querySelector('.neural-network-bg');
if (heroBackground) {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    heroBackground.appendChild(canvas);
    
    new NeuralNetworkBackground(canvas);
}

// ===================================
// Interactive Cards - 3D Tilt Effect
// ===================================

function tiltCard(card) {
    const cardRect = card.getBoundingClientRect();
    
    card.addEventListener('mousemove', (e) => {
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// Apply tilt effect to cards (excluding type-card and advanced-card for better readability)
const tiltCards = document.querySelectorAll('.content-card');
tiltCards.forEach(card => {
    card.style.transition = 'transform 0.3s ease';
    tiltCard(card);
});

// ===================================
// Progress Bar for Reading
// ===================================

function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

createProgressBar();

// ===================================
// Back to Top Button
// ===================================

function createBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

createBackToTopButton();

// ===================================
// Interactive Code Highlighting
// ===================================

const codeBlocks = document.querySelectorAll('code');

codeBlocks.forEach(code => {
    code.addEventListener('click', () => {
        // Copy to clipboard
        const textArea = document.createElement('textarea');
        textArea.value = code.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show feedback
        const originalBg = code.style.backgroundColor;
        code.style.backgroundColor = 'rgba(102, 126, 234, 0.3)';
        
        setTimeout(() => {
            code.style.backgroundColor = originalBg;
        }, 200);
    });
    
    // Add cursor pointer
    code.style.cursor = 'pointer';
    code.title = 'Click to copy';
});

// ===================================
// Animated Counters
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Animate stats when hero section is in view
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                stat.textContent = '0';
                setTimeout(() => {
                    animateCounter(stat, number);
                }, 500);
            });
        }
    });
}, { threshold: 0.5 });

if (statNumbers.length > 0) {
    statsObserver.observe(statNumbers[0].parentElement.parentElement);
}

// ===================================
// Keyboard Navigation
// ===================================

document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = getPrevSection(currentSection);
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function getCurrentSection() {
    const scrollPosition = window.scrollY + 200;
    let current = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section;
        }
    });
    
    return current;
}

function getNextSection(currentSection) {
    if (!currentSection) return sections[0];
    
    const index = Array.from(sections).indexOf(currentSection);
    return sections[index + 1] || null;
}

function getPrevSection(currentSection) {
    if (!currentSection) return sections[0];
    
    const index = Array.from(sections).indexOf(currentSection);
    return sections[index - 1] || null;
}

// ===================================
// Performance Optimization
// ===================================

// Lazy load images if any are added later
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// Console Easter Egg
// ===================================

console.log('%c🧠 NeuraNet', 'font-size: 40px; color: #667eea; font-weight: bold;');
console.log('%cWelcome to NeuraNet! Exploring the fascinating world of Neural Networks.', 'font-size: 14px; color: #764ba2;');
console.log('%cBuilt with ❤️ for AI education', 'font-size: 12px; color: #4facfe;');

// ===================================
// Initialize Everything on Load
// ===================================

window.addEventListener('load', () => {
    // Initial nav update
    updateActiveNavLink();
    
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    console.log('NeuraNet loaded successfully! 🚀');
});
