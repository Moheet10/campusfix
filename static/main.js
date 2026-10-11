/**
 * CampusFix - Crystallize & Prism Tokyo Interactive Experience
 * HTML5 Crystal Canvas Physics, Refractive Spotlights, 3D Tilt, Sparks & Live Filter
 */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. Interactive Crystalline Particle Canvas (Prism Tokyo Shimmer)
    // -------------------------------------------------------------
    const canvas = document.getElementById("crystal-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Generate crystal snowflake shards
        const crystalCount = Math.min(45, Math.floor(window.innerWidth / 30));
        const crystals = [];

        for (let i = 0; i < crystalCount; i++) {
            crystals.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 4 + 2,
                vx: (Math.random() - 0.5) * 0.4,
                vy: Math.random() * 0.5 + 0.2,
                rotation: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.02,
                opacity: Math.random() * 0.5 + 0.2,
                facets: Math.floor(Math.random() * 3) + 4 // 4 to 6 sided
            });
        }

        let mouseX = -1000;
        let mouseY = -1000;
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function renderCrystals() {
            ctx.clearRect(0, 0, width, height);

            crystals.forEach((c) => {
                c.y += c.vy;
                c.x += c.vx;
                c.rotation += c.vRot;

                // Mouse interaction repulsion/attraction
                const dx = mouseX - c.x;
                const dy = mouseY - c.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    const force = (140 - dist) / 140;
                    c.x -= (dx / dist) * force * 2;
                    c.y -= (dy / dist) * force * 2;
                }

                // Wrap around edges
                if (c.y > height + 20) c.y = -20;
                if (c.x > width + 20) c.x = -20;
                if (c.x < -20) c.x = width + 20;

                // Draw geometric crystal shard
                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation);
                ctx.strokeStyle = `rgba(186, 230, 253, ${c.opacity})`;
                ctx.fillStyle = `rgba(56, 189, 248, ${c.opacity * 0.25})`;
                ctx.lineWidth = 1;

                ctx.beginPath();
                for (let j = 0; j < c.facets; j++) {
                    const rad = (Math.PI * 2 * j) / c.facets;
                    const px = Math.cos(rad) * c.size * (j % 2 === 0 ? 1.5 : 0.8);
                    const py = Math.sin(rad) * c.size * (j % 2 === 0 ? 1.5 : 0.8);
                    if (j === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            });

            requestAnimationFrame(renderCrystals);
        }
        renderCrystals();
    }

    // -------------------------------------------------------------
    // 2. Refractive Spotlight Mouse Tracker
    // -------------------------------------------------------------
    const spotlightCards = document.querySelectorAll(".spotlight-card");
    spotlightCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        });
    });

    // -------------------------------------------------------------
    // 3. 3D Tilt Card
    // -------------------------------------------------------------
    const tiltCards = document.querySelectorAll(".tilt-card");
    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / (rect.height / 2)) * -5;
            const tiltY = (x / (rect.width / 2)) * 5;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        });
    });

    // -------------------------------------------------------------
    // 4. Click Spark Micro-Particles
    // -------------------------------------------------------------
    document.addEventListener("click", (e) => {
        const target = e.target.closest("button, a, .spotlight-card, input[type='submit']");
        if (!target) return;

        const count = 10;
        for (let i = 0; i < count; i++) {
            const p = document.createElement("div");
            p.className = "spark-particle";
            document.body.appendChild(p);

            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const dist = 35 + Math.random() * 30;
            p.style.left = `${e.clientX}px`;
            p.style.top = `${e.clientY}px`;
            p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
            p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);

            setTimeout(() => p.remove(), 650);
        }
    });

    // -------------------------------------------------------------
    // 5. Animated Number Counters
    // -------------------------------------------------------------
    const counters = document.querySelectorAll(".counter-value");
    counters.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || el.innerText, 10);
        if (isNaN(target)) return;
        el.innerText = "0";

        let current = 0;
        const duration = 900;
        const step = Math.max(15, Math.floor(duration / Math.max(target, 1)));

        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / step)) || 1;
            if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = current;
            }
        }, step);
    });

    // -------------------------------------------------------------
    // 6. Client-Side Instant Table Search & Filter
    // -------------------------------------------------------------
    const searchInput = document.getElementById("tableSearch");
    const filterPills = document.querySelectorAll(".filter-pill");
    const tableRows = document.querySelectorAll("tbody tr.data-row");

    function applyFilter() {
        const query = (searchInput ? searchInput.value : "").toLowerCase().trim();
        const activePill = document.querySelector(".filter-pill.active");
        const activeFilter = activePill ? activePill.getAttribute("data-filter") : "all";

        tableRows.forEach((row) => {
            const text = row.innerText.toLowerCase();
            const status = (row.getAttribute("data-status") || "").toLowerCase();
            const category = (row.getAttribute("data-category") || "").toLowerCase();

            const matchesQuery = !query || text.includes(query);
            let matchesFilter = true;

            if (activeFilter && activeFilter !== "all") {
                matchesFilter = (status === activeFilter || category === activeFilter);
            }

            if (matchesQuery && matchesFilter) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", applyFilter);
    }

    filterPills.forEach((pill) => {
        pill.addEventListener("click", () => {
            filterPills.forEach((p) => p.classList.remove("active"));
            pill.classList.add("active");
            applyFilter();
        });
    });

    // Auto-dismiss alerts
    const alerts = document.querySelectorAll(".alert");
    alerts.forEach((alert) => {
        setTimeout(() => {
            alert.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            alert.style.opacity = "0";
            alert.style.transform = "translateY(-10px)";
            setTimeout(() => alert.remove(), 400);
        }, 5000);
    });
});
