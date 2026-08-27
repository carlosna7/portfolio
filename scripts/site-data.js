const SITE = {
    email: 'carloseduardo.na7@gmail.com',
    phone: '(11) 95265-9821',
    whatsapp: '5511952659821',
    github: 'https://github.com/carlosna7',
    linkedin: 'https://www.linkedin.com/in/carlosna7/',
    resume: '/assets/curriculo.pdf',
};

const SITE_LINKS = {
    email: `mailto:${SITE.email}`,
    whatsapp: `https://wa.me/${SITE.whatsapp}`,
    github: SITE.github,
    linkedin: SITE.linkedin,
    resume: SITE.resume,
};

document.querySelectorAll('[data-site]').forEach((el) => {
    const key = el.dataset.site;
    const href = SITE_LINKS[key];

    if (href) el.setAttribute('href', href);
    if ('siteText' in el.dataset) el.textContent = SITE[key];
});
