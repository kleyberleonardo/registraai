
// Variáveis globais
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');

// Menu Mobile - Mostrar menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
    });
}

// Menu Mobile - Esconder menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
});

// Scroll Header - Esconder/Mostrar header
let lastScrollTop = 0;
let scrollTimeout;

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down - hide header
            header.classList.add('scroll-header');
        } else {
            // Scrolling up - show header
            header.classList.remove('scroll-header');
        }
    } else {
        // At top - always show header
        header.classList.remove('scroll-header');
    }
    
    lastScrollTop = scrollTop;
}

// Throttle scroll events
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            handleScroll();
            scrollTimeout = null;
        }, 16); // ~60fps
    }
});

// Active Link Scroll
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active');
        } else {
            sectionsClass?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Smooth scroll para links internos
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

// Animação de entrada dos elementos com Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animação especial para cards de serviços
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.style.opacity = '1';
            }
        }
    });
}, observerOptions);

// Aplicar animações aos elementos
function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-card, .service-card, .contact-item, .section-header'
    );
    
    animatedElements.forEach((el, index) => {
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-delay', (index * 100).toString());
        observer.observe(el);
    });
}

// Efeito de digitação no slogan
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Efeito parallax suave nos shapes
function initParallax() {
    const shapes = document.querySelectorAll('.shape, .decoration-item');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = -(scrolled * speed);
            shape.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${scrolled * 0.05}deg)`;
        });
    });
}

// Animações avançadas para cards de serviços
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Animação de entrada escalonada
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Efeitos de hover avançados
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
            
            // Efeito de brilho na imagem
            const img = this.querySelector('.service-image img');
            if (img) {
                img.style.filter = 'brightness(1.1) contrast(1.1)';
            }
            
            // Animação do preço
            const price = this.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1.1)';
                price.style.textShadow = '0 0 10px rgba(108, 92, 231, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
            
            const img = this.querySelector('.service-image img');
            if (img) {
                img.style.filter = 'brightness(1) contrast(1)';
            }
            
            const price = this.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1)';
                price.style.textShadow = 'none';
            }
        });
        
        // Efeito de clique
        card.addEventListener('click', function() {
            this.style.animation = 'bounceIn 0.6s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

// Contador animado para estatísticas (futuro)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start < target) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Efeito de fade in
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease-out';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                // Se a imagem já estiver carregada
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Efeito de partículas no background (opcional)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(108, 92, 231, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Efeito de cursor personalizado
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #6C5CE7, #A29BFE);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Efeito especial ao passar sobre elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .about-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.opacity = '0.7';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
        });
    });
}

// Easter egg - Konami Code
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
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg ativado!
        document.body.style.animation = 'rainbow 3s infinite';
        
        // Criar confetti
        createConfetti();
        
        setTimeout(() => {
            document.body.style.animation = 'none';
        }, 6000);
        konamiCode = [];
    }
});

// Função para criar confetti
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${['#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E'][Math.floor(Math.random() * 4)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            z-index: 9999;
            pointer-events: none;
            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// CSS para animações adicionais
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes confetti-fall {
        0% { 
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% { 
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes glow {
        0%, 100% { 
            box-shadow: 0 0 20px rgba(108, 92, 231, 0.3);
        }
        50% { 
            box-shadow: 0 0 40px rgba(108, 92, 231, 0.6);
        }
    }
    
    .service-card:hover {
        animation: glow 2s ease-in-out infinite;
    }
`;
document.head.appendChild(additionalStyles);

// Performance: Debounce para resize
function debounce(func, wait) {
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

// Ajustar elementos no resize
const handleResize = debounce(() => {
    scrollActive();
    // Reposicionar elementos se necessário
}, 250);

window.addEventListener('resize', handleResize);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Feedback tátil em dispositivos móveis
if ('vibrate' in navigator) {
    document.querySelectorAll('.button, .contact-btn, .whatsapp-btn, .service-card').forEach(btn => {
        btn.addEventListener('click', () => {
            navigator.vibrate(50);
        });
    });
}

// Inicialização quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initAnimations();
    initParallax();
    initServiceCards();
    initLazyLoading();
    
    // Efeitos opcionais (descomente se desejar)
    // createParticles();
    // initCustomCursor();
    
    // Efeito de digitação no slogan após um delay
    setTimeout(() => {
        const slogan = document.querySelector('.home-slogan');
        if (slogan) {
            const originalText = slogan.textContent;
            typeWriter(slogan, originalText, 50);
        }
    }, 2000);
    
    // Adicionar classe de carregamento concluído
    document.body.classList.add('loaded');
    
    // Animação de entrada dos cards de serviços
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Console easter egg
console.log(`
🎨 Registra Aí - Website
✨ Desenvolvido com amor e criatividade
🚀 "Quer eternizar um momento? REGISTRA AÍ!"

Gostou do site? Entre em contato conosco!
WhatsApp: https://wa.me/5592999999999

🎮 Easter Egg: Tente o código Konami!
↑↑↓↓←→←→BA
`);

// Exportar funções para uso global (se necessário)
window.RegistraAi = {
    animateCounter,
    typeWriter,
    createConfetti
};
