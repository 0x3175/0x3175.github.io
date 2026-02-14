// loader.js - Antfu-inspired '010' animation logic
export function startLoadingAnimation(canvasId, overlayId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const overlay = document.getElementById(overlayId);
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    const PI = Math.PI;
    const r90 = PI / 2;
    const r180 = PI;
    const SQRT_2 = Math.sqrt(2);
    const duration = 1500;

    function roundRect(size = 0, r = 0) {
        const x = cx - size / 2;
        const y = cy - size / 2;
        r = Math.min(r, size / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + size - r, y);
        ctx.arc(x + size - r, y + r, r, -r90, 0);
        ctx.lineTo(x + size, y + size - r);
        ctx.arc(x + size - r, y + size - r, r, 0, r90);
        ctx.lineTo(x + r, y + size);
        ctx.arc(x + r, y + size - r, r, r90, r180);
        ctx.lineTo(x, y + r);
        ctx.arc(x + r, y + r, r, r180, -r90);
        ctx.closePath();
        ctx.stroke();
    }

    function rectRound(size = 0, d = 0) {
        const hs = size / 2;
        const h = hs + d;
        const rad = Math.atan2(hs, h);
        const r = h / Math.cos(rad);
        ctx.beginPath();
        ctx.arc(cx, cy + d, r, -r90 - rad, -r90 + rad);
        ctx.arc(cx - d, cy, r, -rad, +rad);
        ctx.arc(cx, cy - d, r, r90 - rad, r90 + rad);
        ctx.arc(cx + d, cy, r, r180 - rad, r180 + rad);
        ctx.stroke();
    }

    let startTime = Date.now();

    function iterations(t, i) {
        t = t - duration * 3 * i;
        if (t < 0) return;

        const turn = (t % (duration * 2)) >= duration;
        const rt = t % duration;
        const rounds = Math.floor(t / (duration * 2));
        const size = Math.round(398 / (SQRT_2 ** rounds));

        if (size < 5) return;

        if (turn)
            roundRect(size, Math.round(size * (rt / 550) ** 2));
        else
            rectRound(size, Math.round((rt / 60) ** 4));
    }

    function animate() {
        if (overlay && overlay.style.display === 'none') return;

        const t = Date.now() - startTime;
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2.0;

        for (let i = 0; i < 30; i++) {
            iterations(t, i);
        }

        requestAnimationFrame(animate);
    }

    animate();
}
