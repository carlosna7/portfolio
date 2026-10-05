const menuToggle = document.querySelector('#menuToggle');
const menuClose = document.querySelector('#menuClose');
const mobileMenu = document.querySelector('#mobileMenu');

const openMenu = () => {
    mobileMenu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    menuClose.focus();
};

const closeMenu = () => {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
};

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', () => {
    closeMenu();
    menuToggle.focus();
});

mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
    }
});
