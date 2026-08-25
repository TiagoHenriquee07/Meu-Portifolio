(() => {
    const header = document.querySelector('[data-header]');
    const menu = document.querySelector('[data-menu]');
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const menuLabel = menuToggle?.querySelector('.sr-only');
    const backToTop = document.querySelector('[data-back-to-top]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setMenuState = (isOpen) => {
        if (!menu || !menuToggle) return;

        menu.classList.toggle('is-open', isOpen);
        header?.classList.toggle('is-open', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));

        if (menuLabel) {
            menuLabel.textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
        }
    };

    menuToggle?.addEventListener('click', () => {
        setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    menu?.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuState(false);
            menuToggle?.focus();
        }
    });

    const updateScrollState = () => {
        const hasScrolled = window.scrollY > 20;
        header?.classList.toggle('is-scrolled', hasScrolled);
        backToTop?.classList.toggle('is-visible', window.scrollY > 650);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });

    const revealElements = document.querySelectorAll('[data-reveal]');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    const sections = document.querySelectorAll('main section[id]');
    const navigationLinks = menu?.querySelectorAll('a[href^="#"]') ?? [];

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navigationLinks.forEach((link) => {
                    const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
                    if (isCurrent) link.setAttribute('aria-current', 'true');
                    else link.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-25% 0px -65%', threshold: 0 });

        sections.forEach((section) => sectionObserver.observe(section));
    }
})();
