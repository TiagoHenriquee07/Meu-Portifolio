(() => {
    const header = document.querySelector('[data-header]');
    const menu = document.querySelector('[data-menu]');
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const menuLabel = menuToggle?.querySelector('.sr-only');
    const backToTop = document.querySelector('[data-back-to-top]');
    const scrollProgress = document.querySelector('[data-scroll-progress]');
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

        if (scrollProgress) {
            const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = availableScroll > 0 ? Math.min(window.scrollY / availableScroll, 1) : 0;
            scrollProgress.style.transform = `scaleX(${progress})`;
        }
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

    const timelineItems = document.querySelectorAll('.timeline details');
    timelineItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            timelineItems.forEach((otherItem) => {
                if (otherItem !== item) otherItem.open = false;
            });
        });
    });

    const filterButtons = document.querySelectorAll('[data-repo-filter]');
    const repositoryCards = document.querySelectorAll('[data-repo-card]');
    const emptyRepositoryMessage = document.querySelector('[data-empty-repos]');

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedFilter = button.dataset.repoFilter;
            let visibleCount = 0;

            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;
                filterButton.classList.toggle('is-active', isActive);
                filterButton.setAttribute('aria-pressed', String(isActive));
            });

            repositoryCards.forEach((card) => {
                const categories = card.dataset.category?.split(' ') ?? [];
                const isVisible = selectedFilter === 'all' || categories.includes(selectedFilter);
                card.hidden = !isVisible;
                if (isVisible) visibleCount += 1;
            });

            if (emptyRepositoryMessage) {
                emptyRepositoryMessage.hidden = visibleCount !== 0;
            }
        });
    });

    if (window.location.hash) {
        window.addEventListener('load', () => {
            const target = document.querySelector(window.location.hash);
            target?.scrollIntoView({ block: 'start', behavior: 'auto' });
        }, { once: true });
    }
})();
