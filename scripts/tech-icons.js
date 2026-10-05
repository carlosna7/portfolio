// ícones monocromáticos do Simple Icons (https://simpleicons.org), usados como máscara
// no CSS para herdarem a cor do texto
const ICON_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@16.34.0/icons/';
const iconUrl = (slug) => `url("${ICON_CDN}${slug}.svg")`;

const skillCards = [...document.querySelectorAll('.skill-card')];
const skillsGrid = document.querySelector('.skills__grid');
const skillsPanel = document.querySelector('#skillsPanel');
const panelLabel = skillsPanel.querySelector('.skills__panel-label');
const panelList = skillsPanel.querySelector('.skills__panel-list');

// lista dentro de cada card (aparece só no mobile, onde não há hover)
document.querySelectorAll('.skill-card__techs [data-tech]').forEach((item) => {
    item.style.setProperty('--icon', iconUrl(item.dataset.tech));
});

// ----------------- PAINEL: célula livre do grid -----------------

let activeCard = null;

const showTechs = (card) => {
    if (card === activeCard) return;
    activeCard = card;

    panelLabel.textContent = card.querySelector('.skill-card__title').textContent;
    panelList.replaceChildren(...[...card.querySelectorAll('[data-tech]')].map((tech, index) => {
        const item = document.createElement('li');
        const icon = document.createElement('span');
        const name = document.createElement('span');

        item.style.setProperty('--i', index);
        icon.className = 'skills__panel-icon';
        icon.style.setProperty('--icon', iconUrl(tech.dataset.tech));
        name.textContent = tech.title;

        item.append(icon, name);
        return item;
    }));

    skillsPanel.classList.add('is-active');
    skillCards.forEach((c) => c.classList.toggle('is-active', c === card));
};

const resetPanel = () => {
    activeCard = null;
    skillsPanel.classList.remove('is-active');
    skillCards.forEach((c) => c.classList.remove('is-active'));
};

skillCards.forEach((card) => {
    card.addEventListener('mouseenter', () => showTechs(card));
    card.addEventListener('focus', () => showTechs(card));
    card.addEventListener('click', () => showTechs(card));
});

skillsGrid.addEventListener('mouseleave', () => {
    if (!skillsGrid.contains(document.activeElement)) resetPanel();
});

skillsGrid.addEventListener('focusout', (event) => {
    if (!skillsGrid.contains(event.relatedTarget)) resetPanel();
});
