(() => {
    // sem GSAP (CDN fora do ar) ou com "reduzir movimento" ativo, o site fica estático
    if (!window.gsap || !window.ScrollTrigger || !window.SplitText) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // ----------------- PROJETOS: SCROLL HORIZONTAL FIXADO -----------------

    /*
     * Ao chegar na seção, ela fica fixa na tela e o scroll vertical passa a deslizar os cards
     * para o lado. A página só continua descendo depois que o último card aparece.
     */
    const projects = document.querySelector('.projects');
    const track = document.querySelector('.projects__grid');

    if (projects && track) {
        const cards = gsap.utils.toArray('.project-card', track);
        const count = projects.querySelector('.projects__count b');
        const fill = projects.querySelector('.projects__bar-fill');

        projects.classList.add('projects--horizontal');
        // o .reveal anima o transform da trilha, o que conflitaria com o deslocamento do GSAP
        track.classList.remove('reveal');

        // quanto a trilha precisa andar para o último card encostar na margem direita
        const distance = () => {
            const inner = track.parentElement;
            const styles = getComputedStyle(inner);
            const contentWidth = inner.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
            return Math.max(0, track.scrollWidth - contentWidth);
        };

        const scrollTween = gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
                trigger: projects,
                start: 'top top',
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                // calcula antes dos gatilhos das seções de baixo, que dependem do espaço do pin
                refreshPriority: 1,
                onUpdate: (self) => {
                    const index = Math.round(self.progress * (cards.length - 1)) + 1;
                    count.textContent = String(index).padStart(2, '0');
                    fill.style.transform = `scaleX(${self.progress})`;
                },
            },
        });

        cards.forEach((card) => {
            // parallax: a imagem anda mais devagar que o card
            gsap.fromTo(card.querySelector('.project-card__cover'), { xPercent: -6 }, {
                xPercent: 6,
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                },
            });

            // o texto do card sobe conforme ele entra na tela
            gsap.from(card.querySelector('.project-card__info'), {
                y: 40,
                opacity: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: 'left 85%',
                    end: 'left 45%',
                    scrub: true,
                },
            });
        });
    }

    // ----------------- TEXTO ANIMADO (SplitText) -----------------

    document.querySelectorAll('[data-animate-text]').forEach((heading) => {
        SplitText.create(heading, {
            type: 'lines, words',
            mask: 'lines',
            autoSplit: true,
            // retornar a animação permite ao SplitText refazê-la quando as linhas quebram diferente
            onSplit: (self) => gsap.from(self.words, {
                yPercent: 110,
                opacity: 0,
                duration: .9,
                ease: 'expo.out',
                stagger: .06,
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    once: true,
                },
            }),
        });
    });

    // as imagens e a fonte mudam o tamanho dos cards, então os cálculos são refeitos quando carregam
    window.addEventListener('load', () => ScrollTrigger.refresh());
})();
