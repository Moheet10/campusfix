/**
 * CampusFix - ReactBits Vanilla JavaScript Engine
 * Provides Spotlight, 3D Tilt, Click Sparks, Animated Counters, and Live Filtering
 */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    // 1. ReactBits Spotlight Card Effect (Mouse position tracking)
    // -------------------------------------------------------------
    const spotlightCards = document.querySelectorAll(".spotlight-card");
    spotlightCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // -------------------------------------------------------------
    // 2. ReactBits 3D Tilt Card Effect
    // -------------------------------------------------------------
    const tiltCards = document.querySelectorAll(".tilt-card");
    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / (rect.height / 2)) * -6;
            const tiltY = (x / (rect.width / 2)) * 6;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
        });
    });

    // -------------------------------------------------------------
    // 3. ReactBits Click Spark Effect
    // -------------------------------------------------------------
    document.addEventListener("click", (e) => {
        const target = e.target.closest("button, a, .spotlight-card, input[type='submit']");
        if (!target) return;

        const particleCount = 8;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "spark-particle";
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const distance = 30 + Math.random() * 25;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            particle.style.setProperty("--dx", `${dx}px`);
            particle.style.setProperty("--dy", `${dy}px`);

            setTimeout(() => particle.remove(), 700);
        }
    });

    // -------------------------------------------------------------
    // 4. Animated Number Counters
    // -------------------------------------------------------------
    const counterElements = document.querySelectorAll(".counter-value");
    counterElements.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || el.innerText, 10);
        if (isNaN(target)) return;
        el.innerText = "0";

        let current = 0;
        const duration = 1000;
        const stepTime = Math.max(20, Math.floor(duration / Math.max(target, 1)));

        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime)) || 1;
            if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
            } else {
                el.innerText = current;
            }
        }, stepTime);
    });

    // -------------------------------------------------------------
    // 5. Client-Side Instant Table Search & Filter (Zero Reload)
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

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll(".alert");
    alerts.forEach((alert) => {
        setTimeout(() => {
            alert.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            alert.style.opacity = "0";
            alert.style.transform = "translateY(-10px)";
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    });
});
