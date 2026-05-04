const themeSwitch = document.querySelector('#theme-button');
const sun = themeSwitch.querySelector('.fa-sun');
const moon = themeSwitch.querySelector('.fa-moon');

themeSwitch.addEventListener('click', () => {
    // status de animação
    themeSwitch.classList.add('animating');
    animating = true

    const center = sun.classList.contains('pos-center') ? sun : moon;
    const left = center === sun ? moon : sun;

    // center vai para a direita
    center.classList.remove('pos-center');
    center.classList.add('pos-right');

    // esqeurda vem para o centro
    left.classList.remove('pos-left');
    left.classList.add('pos-center');

    // troca de tema
    const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);

    // quando a transição de transform terminar transforma o right em left
    const onTransitionEnd = () => {
        center.removeEventListener('transitionend', onTransitionEnd);
        center.classList.remove('pos-right');
        center.classList.add('pos-left');

        // animação finalizada
        animating = false;
        themeSwitch.classList.remove('animating');
    };

    center.addEventListener('transitionend', onTransitionEnd);
});