/**
 * Threads of Fate — Ambient Particle System
 * Gold dust motes drifting upward through darkness.
 */

(function () {
    'use strict';

    var canvas = document.getElementById('particles');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var particles = [];
    var COUNT = 55;
    var w = 0;
    var h = 0;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function spawn(randomY) {
        return {
            x: Math.random() * w,
            y: randomY ? Math.random() * h : h + Math.random() * 40,
            r: Math.random() * 1.5 + 0.4,
            vy: -(Math.random() * 0.28 + 0.06),
            vx: (Math.random() - 0.5) * 0.12,
            o: Math.random() * 0.32 + 0.06,
            ws: Math.random() * 0.012 + 0.004,   // wobble speed
            wp: Math.random() * Math.PI * 2,      // wobble phase
            hue: 36 + Math.random() * 14          // 36-50 gold range
        };
    }

    function init() {
        resize();
        particles = [];
        for (var i = 0; i < COUNT; i++) {
            particles.push(spawn(true));
        }
    }

    function frame() {
        ctx.clearRect(0, 0, w, h);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];

            p.y += p.vy;
            p.x += p.vx + Math.sin(p.wp) * 0.06;
            p.wp += p.ws;

            // Recycle particle when it drifts off the top
            if (p.y < -15) {
                particles[i] = spawn(false);
                continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 6.2832);
            ctx.fillStyle = 'hsla(' + p.hue + ',55%,58%,' + p.o + ')';
            ctx.fill();
        }

        requestAnimationFrame(frame);
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 200);
    });

    init();
    frame();
})();
