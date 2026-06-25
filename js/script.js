/* ============================================================
   PT SEMUTARA SEMESTA ABADI — JavaScript
   Clean Architecture | Vanilla JS | No Framework
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ------------------------------------------------------
       1. LANGUAGE MANAGER (Bilingual EN | ID)
       ------------------------------------------------------ */
    const langButtons = document.querySelectorAll('.lang-toggle button');
    let currentLang = localStorage.getItem('semutara-lang') || 'en';

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('semutara-lang', lang);

        // Update toggle buttons
        langButtons.forEach(btn => {
            btn.classList.toggle('active-lang', btn.dataset.lang === lang);
        });

        // Update all elements with data-lang attributes
        document.querySelectorAll('[data-lang-en]').forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text !== null) {
                el.textContent = text;
            }
        });
    }

    // Init language from localStorage
    langButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            switchLanguage(this.dataset.lang);
        });
        btn.classList.toggle('active-lang', btn.dataset.lang === currentLang);
    });

    if (currentLang !== 'en') {
        switchLanguage(currentLang);
    }


    /* ------------------------------------------------------
       2. HAMBURGER MENU (Mobile)
       ------------------------------------------------------ */
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            nav.classList.toggle('nav--open');
        });

        // Close menu when a nav link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                nav.classList.remove('nav--open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && e.target !== navToggle && !navToggle.contains(e.target)) {
                nav.classList.remove('nav--open');
            }
        });
    }


    /* ------------------------------------------------------
       3. SMOOTH SCROLL + ACTIVE NAV HIGHLIGHT
       ------------------------------------------------------ */
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Highlight active nav based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        let scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }


    /* ------------------------------------------------------
       4. SCROLL-BASED ANIMATIONS
       ------------------------------------------------------ */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    function revealOnScroll() {
        const threshold = window.innerHeight * 0.85;

        animatedElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < threshold) {
                el.classList.add('visible');
            }
        });
    }


    /* ------------------------------------------------------
       5. STICKY HEADER ON SCROLL
       ------------------------------------------------------ */
    const header = document.querySelector('header');

    function handleHeaderScroll() {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }


    /* ------------------------------------------------------
       6. SCROLL TO TOP BUTTON
       ------------------------------------------------------ */
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    function handleScrollTopBtn() {
        if (window.scrollY > 600) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ------------------------------------------------------
       7. COMBINED SCROLL HANDLER (single listener)
       ------------------------------------------------------ */
    window.addEventListener('scroll', function () {
        highlightNav();
        revealOnScroll();
        handleHeaderScroll();
        handleScrollTopBtn();
    });

    // Init all on page load
    handleHeaderScroll();
    revealOnScroll();
    handleScrollTopBtn();


    /* ------------------------------------------------------
       8. WHATSAPP FLOATING BUTTON — init (HTML handles link)
       ------------------------------------------------------ */
    // WhatsApp button is purely static HTML + CSS — no extra JS needed.
    // The link below is a placeholder. Update the href when the real
    // WhatsApp number is available:
    //   <a href="https://wa.me/62xxxxxxxx" class="wa-float" ...>

});
