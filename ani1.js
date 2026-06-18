/* ========================= */
/* FLOWER ANIMATION (HOME)   */
/* ========================= */

let flowerStarted = false;

function startFlower() {
    if (flowerStarted) return;
    flowerStarted = true;

    const canvas = document.getElementById("flowerCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    let flowers = [];

    const colors = [
        "#ff6fa1",
        "#ff9ec4",
        "#ffd54f",
        "#ff8a80",
        "#ce93d8",
        "#80deea"
    ];

    class Flower {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 8 + 4;
            this.speed = Math.random() * 0.5 + 0.2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);

            ctx.fillStyle = "#ffd700";
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();

            for (let i = 0; i < 5; i++) {
                ctx.rotate(Math.PI * 2 / 5);
                ctx.beginPath();
                ctx.arc(this.size, 0, this.size / 1.6, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            ctx.restore();
        }

        update() {
            this.y -= this.speed;
            if (this.y < -20) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
            }
            this.draw();
        }
    }

    for (let i = 0; i < 100; i++) {
        flowers.push(new Flower());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flowers.forEach(f => f.update());
        requestAnimationFrame(animate);
    }

    animate();
}


/* =================================================== */
/* REALISTIC DARK SPACE – VERY BIG SUN (PROFILE)       */
/* =================================================== */

let neuralStarted = false;

function startNeural() {
    if (neuralStarted) return;
    neuralStarted = true;

    const canvas = document.getElementById("neural");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const cx = W / 2;
    const cy = H / 2;
    const sunRadius = Math.min(W, H) * 0.48;

    const stars = [];
    for (let i = 0; i < 500; i++) {
        stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            size: 0.5 + Math.random() * 2.5,
            twinkleSpeed: 0.5 + Math.random() * 2,
            phase: Math.random() * 100,
            brightness: 0.3 + Math.random() * 0.7
        });
    }

    const coronaParticles = [];
    for (let i = 0; i < 200; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = sunRadius * (0.8 + Math.random() * 2.5);
        coronaParticles.push({
            angle: angle,
            dist: dist,
            size: 1 + Math.random() * 4,
            speed: 0.001 + Math.random() * 0.005,
            drift: (Math.random() - 0.5) * 0.02,
            alpha: 0.3 + Math.random() * 0.6
        });
    }

    const planet = {
        x: W * 0.15,
        y: H * 0.2,
        radius: Math.min(W, H) * 0.045,
        color: "rgba(180, 160, 140, 0.6)"
    };

    function animate() {
        ctx.clearRect(0, 0, W, H);
        const time = Date.now() / 1000;

        const spaceGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.8);
        spaceGrad.addColorStop(0, "#0a0a1a");
        spaceGrad.addColorStop(0.5, "#050510");
        spaceGrad.addColorStop(1, "#000000");
        ctx.fillStyle = spaceGrad;
        ctx.fillRect(0, 0, W, H);

        stars.forEach(s => {
            const twinkle = 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.phase);
            const alpha = s.brightness * twinkle * 0.9;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * twinkle, 0, Math.PI * 2);
            ctx.shadowBlur = s.size * 3;
            ctx.shadowColor = "rgba(255,255,255,0.2)";
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        ctx.globalAlpha = 1;

        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunRadius * 8);
        glow.addColorStop(0, "rgba(255, 240, 200, 0.95)");
        glow.addColorStop(0.1, "rgba(255, 220, 160, 0.8)");
        glow.addColorStop(0.3, "rgba(255, 180, 100, 0.5)");
        glow.addColorStop(0.6, "rgba(255, 120, 40, 0.2)");
        glow.addColorStop(1, "rgba(255, 50, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        ctx.translate(cx, cy);
        const rayCount = 48;
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2 + time * 0.015;
            const r1 = sunRadius * 1.02;
            const r2 = sunRadius * (3.5 + 0.8 * Math.sin(time * 0.3 + i * 1.5));
            const width = 6 + 4 * Math.sin(time * 0.4 + i * 1.2);
            const alpha = 0.1 + 0.15 * Math.sin(time * 0.25 + i * 1.8);

            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
            ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
            ctx.strokeStyle = `rgba(255, 230, 180, ${alpha})`;
            ctx.lineWidth = width;
            ctx.shadowBlur = 30;
            ctx.shadowColor = "rgba(255, 200, 100, 0.4)";
            ctx.stroke();
        }
        ctx.restore();

        coronaParticles.forEach(p => {
            p.angle += p.speed + p.drift * Math.sin(time * 0.5 + p.angle);
            const x = cx + Math.cos(p.angle) * p.dist;
            const y = cy + Math.sin(p.angle) * p.dist * 0.9;
            const pulse = 0.7 + 0.3 * Math.sin(time * 1.5 + p.angle * 2);
            const size = p.size * pulse;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 220, 150, ${p.alpha * pulse * 0.7})`;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "rgba(255, 200, 100, 0.6)";
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        const sunGrad = ctx.createRadialGradient(
            cx - sunRadius * 0.2, cy - sunRadius * 0.2, 0,
            cx, cy, sunRadius
        );
        sunGrad.addColorStop(0, "#ffffff");
        sunGrad.addColorStop(0.1, "#fffce8");
        sunGrad.addColorStop(0.3, "#ffdd77");
        sunGrad.addColorStop(0.6, "#ffaa33");
        sunGrad.addColorStop(0.85, "#ff6600");
        sunGrad.addColorStop(1, "#cc3300");
        ctx.beginPath();
        ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = sunGrad;
        ctx.shadowColor = "rgba(255, 200, 100, 0.9)";
        ctx.shadowBlur = 150;
        ctx.fill();
        ctx.shadowBlur = 0;

        const coreGrad = ctx.createRadialGradient(
            cx - sunRadius * 0.15, cy - sunRadius * 0.15, 0,
            cx, cy, sunRadius * 0.5
        );
        coreGrad.addColorStop(0, "rgba(255,255,255,1)");
        coreGrad.addColorStop(0.5, "rgba(255,255,240,0.8)");
        coreGrad.addColorStop(1, "rgba(255,255,200,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, sunRadius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        ctx.save();
        ctx.translate(cx, cy);
        for (let i = -3; i <= 3; i++) {
            const dist = i * sunRadius * 0.6;
            const size = sunRadius * (0.08 - Math.abs(i) * 0.015);
            const alpha = 0.15 - Math.abs(i) * 0.03;
            if (size > 0.5 && alpha > 0.01) {
                const flareGrad = ctx.createRadialGradient(dist, 0, 0, dist, 0, size);
                flareGrad.addColorStop(0, `rgba(255, 240, 200, ${alpha})`);
                flareGrad.addColorStop(1, "rgba(255, 200, 100, 0)");
                ctx.beginPath();
                ctx.arc(dist, 0, size, 0, Math.PI * 2);
                ctx.fillStyle = flareGrad;
                ctx.fill();
            }
        }
        ctx.restore();

        const p = planet;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(100,80,60,0.3)";
        ctx.fill();
        const planetGlow = ctx.createRadialGradient(
            p.x + p.radius * 0.3, p.y - p.radius * 0.3, 0,
            p.x, p.y, p.radius * 1.8
        );
        planetGlow.addColorStop(0, "rgba(200,180,160,0.1)");
        planetGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = planetGlow;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(p.x + p.radius * 1.8, p.y - p.radius * 0.5, p.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,190,180,0.4)";
        ctx.fill();

        requestAnimationFrame(animate);
    }

    animate();
}


/* ========================= */
/* MATRIX RAIN (EXPERIENCE)  */
/* ========================= */

let rainStarted = false;

function startRain() {
    if (rainStarted) return;
    rainStarted = true;

    const canvas = document.getElementById("rain");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    let drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0f0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);
}


/* =============================================================== */
/* ✨ PROFESSIONAL GEOMETRIC SHOWCASE – PROJECT TAB ✨              */
/* =============================================================== */

let cyberStarted = false;

function startCyber() {
    if (cyberStarted) return;
    cyberStarted = true;

    const canvas = document.getElementById("cyberCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // ---- ELEGANT COLOR PALETTE ----
    const palette = {
        primary: "#4a7cf7",
        secondary: "#7c5cfc",
        accent: "#f7c948",
        cyan: "#4ad0f7",
        white: "#ffffff",
        dark: "#0a0a1a",
        surface: "rgba(255,255,255,0.03)",
        glow: "rgba(74, 124, 247, 0.15)"
    };

    // ============================================================
    // 1. FLOATING GEOMETRIC SHAPES
    // ============================================================
    class GeometricShape {
        constructor() {
            this.reset();
            this.type = Math.random() > 0.5 ? "circle" : "square";
        }

        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.size = 20 + Math.random() * 60;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.01;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.opacity = 0.05 + Math.random() * 0.12;
            this.hue = 210 + Math.random() * 40;
            this.phase = Math.random() * 100;
            this.pulseSpeed = 0.003 + Math.random() * 0.005;
        }

        draw(ctx, time) {
            const pulse = 0.85 + 0.15 * Math.sin(time * this.pulseSpeed + this.phase);
            const size = this.size * pulse;
            const alpha = this.opacity * (0.7 + 0.3 * Math.sin(time * 0.3 + this.phase));

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation + time * this.rotSpeed);

            // glow
            ctx.shadowBlur = 40;
            ctx.shadowColor = `hsla(${this.hue}, 80%, 60%, ${alpha * 0.3})`;

            // stroke
            ctx.strokeStyle = `hsla(${this.hue}, 80%, 70%, ${alpha})`;
            ctx.lineWidth = 1.5;

            if (this.type === "circle") {
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.stroke();
                // inner ring
                ctx.strokeStyle = `hsla(${this.hue + 30}, 80%, 60%, ${alpha * 0.4})`;
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
                ctx.stroke();
            } else {
                ctx.strokeRect(-size / 2, -size / 2, size, size);
                // inner square
                ctx.strokeStyle = `hsla(${this.hue + 30}, 80%, 60%, ${alpha * 0.4})`;
                ctx.lineWidth = 0.8;
                ctx.strokeRect(-size * 0.35, -size * 0.35, size * 0.7, size * 0.7);
            }

            ctx.shadowBlur = 0;
            ctx.restore();

            // update position (gentle drift)
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < -100) this.x = W + 100;
            if (this.x > W + 100) this.x = -100;
            if (this.y < -100) this.y = H + 100;
            if (this.y > H + 100) this.y = -100;
        }
    }

    const shapes = [];
    for (let i = 0; i < 25; i++) {
        shapes.push(new GeometricShape());
    }

    // ============================================================
    // 2. FLOWING WAVES / LINES
    // ============================================================
    class FlowLine {
        constructor() {
            this.points = [];
            const count = 60 + Math.floor(Math.random() * 40);
            for (let i = 0; i < count; i++) {
                this.points.push({
                    x: (i / count) * W,
                    y: Math.random() * H
                });
            }
            this.speed = 0.2 + Math.random() * 0.3;
            this.amplitude = 20 + Math.random() * 40;
            this.phase = Math.random() * 100;
            this.opacity = 0.04 + Math.random() * 0.08;
            this.hue = 210 + Math.random() * 40;
            this.width = 0.8 + Math.random() * 1.2;
        }

        draw(ctx, time) {
            const offset = time * this.speed;
            const alpha = this.opacity * (0.7 + 0.3 * Math.sin(time * 0.2 + this.phase));

            ctx.beginPath();
            ctx.strokeStyle = `hsla(${this.hue}, 80%, 70%, ${alpha})`;
            ctx.lineWidth = this.width;
            ctx.shadowBlur = 20;
            ctx.shadowColor = `hsla(${this.hue}, 80%, 60%, ${alpha * 0.2})`;

            this.points.forEach((p, i) => {
                const t = i / this.points.length;
                const waveY = p.y + Math.sin(t * Math.PI * 4 + offset + this.phase) * this.amplitude;
                const waveX = p.x + Math.sin(t * Math.PI * 2 + offset * 0.5 + this.phase) * 20;

                if (i === 0) {
                    ctx.moveTo(waveX, waveY);
                } else {
                    ctx.lineTo(waveX, waveY);
                }
            });

            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }

    const flowLines = [];
    for (let i = 0; i < 12; i++) {
        flowLines.push(new FlowLine());
    }

    // ============================================================
    // 3. ELEGANT PARTICLE SYSTEM
    // ============================================================
    class ElegantParticle {
        constructor() {
            this.reset();
            this.type = Math.random() > 0.6 ? "dot" : "spark";
        }

        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.size = 1.5 + Math.random() * 4;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = -0.3 - Math.random() * 0.6;
            this.life = 0.5 + Math.random() * 0.5;
            this.maxLife = this.life;
            this.hue = 200 + Math.random() * 60;
            this.phase = Math.random() * 100;
            this.speed = 0.2 + Math.random() * 0.4;
        }

        update(time, W, H) {
            this.x += this.vx + Math.sin(time * 0.2 + this.phase) * 0.1;
            this.y += this.vy;
            this.vy += 0.001;
            this.life -= 0.002;

            if (this.y < -20 || this.life < 0) {
                this.reset();
                this.y = H + 20;
                this.x = Math.random() * W;
                this.life = this.maxLife;
                this.vy = -0.3 - Math.random() * 0.6;
            }
        }

        draw(ctx, time) {
            const alpha = (this.life / this.maxLife) * 0.6;
            const pulse = 0.7 + 0.3 * Math.sin(time * 1.5 + this.phase);

            if (this.type === "dot") {
                ctx.shadowBlur = 15;
                ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, ${alpha * 0.3})`;
                ctx.fillStyle = `hsla(${this.hue}, 100%, 80%, ${alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // spark - cross shape
                const s = this.size * pulse;
                ctx.shadowBlur = 20;
                ctx.shadowColor = `hsla(${this.hue}, 100%, 70%, ${alpha * 0.4})`;
                ctx.strokeStyle = `hsla(${this.hue}, 100%, 80%, ${alpha})`;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(this.x - s, this.y);
                ctx.lineTo(this.x + s, this.y);
                ctx.moveTo(this.x, this.y - s);
                ctx.lineTo(this.x, this.y + s);
                ctx.stroke();
                ctx.shadowBlur = 0;
                // center dot
                ctx.fillStyle = `hsla(${this.hue}, 100%, 90%, ${alpha * 0.5})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 0.8, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0;
        }
    }

    const particles = [];
    for (let i = 0; i < 120; i++) {
        particles.push(new ElegantParticle());
    }

    // ============================================================
    // 4. RADIAL GRADIENT ORB (centerpiece)
    // ============================================================
    class Orb {
        constructor() {
            this.radius = Math.min(W, H) * 0.25;
            this.x = W / 2;
            this.y = H / 2;
            this.pulseSpeed = 0.002;
            this.phase = Math.random() * 100;
        }

        draw(ctx, time) {
            const pulse = 0.92 + 0.08 * Math.sin(time * this.pulseSpeed + this.phase);
            const r = this.radius * pulse;

            // outer glow
            const grad1 = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 2.5);
            grad1.addColorStop(0, "rgba(74, 124, 247, 0.06)");
            grad1.addColorStop(0.4, "rgba(124, 92, 252, 0.04)");
            grad1.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grad1;
            ctx.fillRect(0, 0, W, H);

            // main orb glow
            const grad2 = ctx.createRadialGradient(this.x - r * 0.2, this.y - r * 0.2, 0, this.x, this.y, r);
            grad2.addColorStop(0, "rgba(74, 124, 247, 0.15)");
            grad2.addColorStop(0.3, "rgba(124, 92, 252, 0.10)");
            grad2.addColorStop(0.7, "rgba(74, 124, 247, 0.05)");
            grad2.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grad2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
            ctx.fill();

            // orbiting ring
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(time * 0.1 + this.phase);

            ctx.shadowBlur = 40;
            ctx.shadowColor = "rgba(74, 124, 247, 0.3)";
            ctx.strokeStyle = "rgba(74, 124, 247, 0.2)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.7, 0, Math.PI * 2);
            ctx.stroke();

            // dashed inner ring
            ctx.setLineDash([8, 12]);
            ctx.strokeStyle = "rgba(124, 92, 252, 0.15)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // orbiting dots
            const dotCount = 16;
            for (let i = 0; i < dotCount; i++) {
                const a = (i / dotCount) * Math.PI * 2 + time * 0.15;
                const dr = r * (0.5 + 0.2 * Math.sin(time * 0.2 + i));
                const dx = Math.cos(a) * dr;
                const dy = Math.sin(a) * dr;
                const size = 2 + Math.sin(time * 0.3 + i) * 1;
                ctx.shadowBlur = 20;
                ctx.shadowColor = "rgba(74, 124, 247, 0.4)";
                ctx.fillStyle = `hsla(${210 + i * 15}, 100%, 70%, ${0.3 + 0.3 * Math.sin(time * 0.2 + i)})`;
                ctx.beginPath();
                ctx.arc(dx, dy, size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.shadowBlur = 0;
            ctx.restore();
        }
    }

    const orb = new Orb();

    // ============================================================
    // 5. MAIN ANIMATION LOOP
    // ============================================================
    function animate() {
        const time = Date.now() / 1000;
        ctx.clearRect(0, 0, W, H);

        // ---- DEEP SPACE BACKGROUND ----
        const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
        bgGrad.addColorStop(0, "#0f0f25");
        bgGrad.addColorStop(0.5, "#080815");
        bgGrad.addColorStop(1, "#020208");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // ---- SUBTLE STARS ----
        for (let i = 0; i < 80; i++) {
            const sx = (i * 173) % W;
            const sy = (i * 107) % H;
            const tw = 0.4 + 0.6 * Math.sin(time * 0.15 + i * 1.1);
            ctx.fillStyle = `rgba(255,255,255,${0.03 * tw})`;
            ctx.beginPath();
            ctx.arc(sx, sy, 0.3 + (i % 2) * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // ---- FLOWING LINES ----
        flowLines.forEach(line => line.draw(ctx, time));

        // ---- ORB (centerpiece) ----
        orb.draw(ctx, time);

        // ---- GEOMETRIC SHAPES ----
        shapes.forEach(shape => shape.draw(ctx, time));

        // ---- PARTICLES ----
        particles.forEach(p => {
            p.update(time, W, H);
            p.draw(ctx, time);
        });

        // ---- CORNER ACCENTS ----
        const accentSize = 60;
        const accentOpacity = 0.08 + 0.04 * Math.sin(time * 0.2);

        // top-left
        ctx.shadowBlur = 30;
        ctx.shadowColor = `rgba(74, 124, 247, ${accentOpacity * 0.3})`;
        ctx.strokeStyle = `rgba(74, 124, 247, ${accentOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(30, 30, accentSize, accentSize);

        // bottom-right
        ctx.strokeStyle = `rgba(124, 92, 252, ${accentOpacity})`;
        ctx.shadowColor = `rgba(124, 92, 252, ${accentOpacity * 0.3})`;
        ctx.strokeRect(W - 30 - accentSize, H - 30 - accentSize, accentSize, accentSize);

        // top-right (smaller)
        const small = 30;
        ctx.strokeStyle = `rgba(74, 212, 247, ${accentOpacity * 0.7})`;
        ctx.shadowColor = `rgba(74, 212, 247, ${accentOpacity * 0.2})`;
        ctx.strokeRect(W - 30 - small, 30, small, small);

        // bottom-left
        ctx.strokeStyle = `rgba(247, 201, 72, ${accentOpacity * 0.7})`;
        ctx.shadowColor = `rgba(247, 201, 72, ${accentOpacity * 0.2})`;
        ctx.strokeRect(30, H - 30 - small, small, small);

        ctx.shadowBlur = 0;

        // ---- SUBTLE VIGNETTE ----
        const vigGrad = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
        vigGrad.addColorStop(0, "rgba(0,0,0,0)");
        vigGrad.addColorStop(1, "rgba(0,0,0,0.4)");
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, W, H);

        requestAnimationFrame(animate);
    }

    animate();
}