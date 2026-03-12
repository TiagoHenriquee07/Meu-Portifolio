document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initSmoothScroll();
    initIntersectionObserver();
    initScrollAnimations();
});

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const toggler = document.querySelector('.navbar-toggler');
                toggler.click();
            }
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll(
        '.project-card, .skill-category, .info-card, .about-cards, .contact-info'
    );

    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition + window.innerHeight > sectionTop + 100) {
                section.style.opacity = '1';
            }
        });
    });
}

console.log('%cportfólio tiago oliveira', 'font-size: 20px; color: #0066cc; font-weight: bold;');
console.log('%cdesenvolvedor front-end | especialista em segurança digital', 'font-size: 14px; color: #0080ff;');
console.log('%cgithub: https://github.com/TiagoHenriquee07', 'font-size: 12px; color: #999;');
console.log('%clinkedin: https://www.linkedin.com/in/tiago-oliveira0808/', 'font-size: 12px; color: #999;');
