// Fundo do banner: porte em JavaScript puro do componente ShapeGrid do React Bits
// (https://reactbits.dev/backgrounds/shape-grid), na variação de quadrados.
(() => {
    const hero = document.querySelector('.hero');
    const canvas = document.querySelector('#heroGrid');
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const config = {
        direction: 'diagonal', // right | left | up | down | diagonal
        speed: reduceMotion ? 0 : .3,
        squareSize: 56,
        borderColor: 'rgba(88, 71, 56, .11)',
        hoverFillColor: 'rgba(149, 171, 184, .55)',
        hoverTrailAmount: 6,
    };

    const offset = { x: 0, y: 0 };
    const opacities = new Map();
    let trail = [];
    let hovered = null;
    let mouse = null;
    let width = 0;
    let height = 0;
    let frame = null;
    let isVisible = false;

    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = () => {
        const { speed, direction } = config;
        if (direction === 'right' || direction === 'diagonal') offset.x -= speed;
        if (direction === 'left') offset.x += speed;
        if (direction === 'up') offset.y += speed;
        if (direction === 'down' || direction === 'diagonal') offset.y -= speed;
    };

    // as células usam coordenadas absolutas da grade, então o destaque acompanha o quadrado
    // enquanto a grade se move (no original ele "pula" a cada volta do deslocamento)
    const cellAt = (x, y) => ({
        col: Math.floor((x - offset.x) / config.squareSize),
        row: Math.floor((y - offset.y) / config.squareSize),
    });

    const updateHover = () => {
        const cell = mouse ? cellAt(mouse.x, mouse.y) : null;
        const changed = !cell || !hovered || cell.col !== hovered.col || cell.row !== hovered.row;

        if (changed && hovered && config.hoverTrailAmount > 0) {
            trail = [hovered, ...trail].slice(0, config.hoverTrailAmount);
        }
        hovered = cell;
    };

    const updateOpacities = () => {
        const targets = new Map();

        if (hovered) targets.set(`${hovered.col},${hovered.row}`, 1);

        trail.forEach((cell, i) => {
            const key = `${cell.col},${cell.row}`;
            if (!targets.has(key)) targets.set(key, (trail.length - i) / (trail.length + 1));
        });

        targets.forEach((_, key) => {
            if (!opacities.has(key)) opacities.set(key, 0);
        });

        opacities.forEach((opacity, key) => {
            const next = opacity + ((targets.get(key) || 0) - opacity) * .15;
            if (next < .005) opacities.delete(key);
            else opacities.set(key, next);
        });
    };

    const draw = () => {
        const size = config.squareSize;
        const firstCol = Math.floor(-offset.x / size) - 1;
        const firstRow = Math.floor(-offset.y / size) - 1;
        const cols = Math.ceil(width / size) + 2;
        const rows = Math.ceil(height / size) + 2;

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = config.borderColor;
        ctx.fillStyle = config.hoverFillColor;

        for (let col = firstCol; col < firstCol + cols; col++) {
            for (let row = firstRow; row < firstRow + rows; row++) {
                const x = Math.round(col * size + offset.x) + .5;
                const y = Math.round(row * size + offset.y) + .5;
                const alpha = opacities.get(`${col},${row}`);

                if (alpha) {
                    ctx.globalAlpha = alpha;
                    ctx.fillRect(x, y, size, size);
                    ctx.globalAlpha = 1;
                }

                ctx.strokeRect(x, y, size, size);
            }
        }
    };

    const tick = () => {
        move();
        updateHover();
        updateOpacities();
        draw();
        frame = requestAnimationFrame(tick);
    };

    const start = () => {
        if (isVisible && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    };

    const stop = () => {
        cancelAnimationFrame(frame);
        frame = null;
    };

    // o conteúdo do banner fica por cima do canvas, então o mouse é lido na seção inteira
    hero.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return;
        const rect = canvas.getBoundingClientRect();
        mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    });

    hero.addEventListener('pointerleave', () => {
        mouse = null;
    });

    new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? start() : stop();
    }).observe(canvas);

    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    window.addEventListener('resize', () => {
        resize();
        draw();
    });

    resize();
    draw();
})();
