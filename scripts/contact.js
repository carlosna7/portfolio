const contactForm = document.querySelector('#contactForm');
const contactStatus = document.querySelector('#contactStatus');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    contactStatus.classList.remove('is-error');
    contactStatus.textContent = 'Enviando...';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success === false) throw new Error(result.message);

        contactForm.reset();
        contactStatus.textContent = 'Mensagem enviada! Obrigado pelo contato.';
    } catch (error) {
        contactStatus.classList.add('is-error');
        contactStatus.textContent = `Não foi possível enviar agora. Escreva direto para ${SITE.email}.`;
    } finally {
        submitButton.disabled = false;
    }
});
