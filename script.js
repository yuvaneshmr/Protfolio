// =========================================================================
// 1. TSPARTICLES — Tricolor floating dots (Cyan, Copper, Violet)
// =========================================================================
const initParticles = () => {
    if (typeof tsParticles === 'undefined') return;
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: "grab" }, resize: true },
            modes: { grab: { distance: 170, links: { opacity: 0.5, color: "#22d3ee" } } }
        },
        particles: {
            color: { value: ["#22d3ee", "#f09a52", "#a78bfa"] },
            links: { color: "#475569", distance: 140, enable: true, opacity: 0.12, width: 1 },
            move: { enable: true, outModes: { default: "bounce" }, random: true, speed: 0.5, straight: false },
            number: { density: { enable: true, area: 900 }, value: 72 },
            opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
            shape: { type: "circle" },
            size:  { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
    });
};

// =========================================================================
// 2. SPOTLIGHT EFFECT — Mouse-position CSS variable injection
// =========================================================================
const initSpotlight = () => {
    const cards = document.querySelectorAll(".spotlight-card");
    document.addEventListener("mousemove", (e) => {
        cards.forEach((card) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
        });
    });
};

// =========================================================================
// 3. MAGNETIC BUTTONS
// =========================================================================
const initMagnetic = () => {
    document.querySelectorAll(".magnetic-btn").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
            const r = el.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width  / 2) * 0.28;
            const y = (e.clientY - r.top  - r.height / 2) * 0.28;
            el.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
        });
        el.addEventListener("mouseleave", () => {
            el.style.transform = "translate(0,0) scale(1)";
        });
    });
};

// =========================================================================
// 4. CHART.JS — Tricolor Analytics Dashboard
// =========================================================================
const initCharts = () => {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.color = '#7c8ba1';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 11;

    const cyan   = '#22d3ee';
    const copper = '#f09a52';
    const violet = '#a78bfa';
    const bgC    = 'rgba(34,211,238,0.15)';
    const bgCu   = 'rgba(240,154,82,0.15)';
    const grid   = 'rgba(255,255,255,0.04)';

    // A — Line: Knowledge Trajectory
    const ctxL = document.getElementById('lineChart');
    if (ctxL) new Chart(ctxL, {
        type: 'line',
        data: {
            labels: ['2023', '2024', '2025', '2026'],
            datasets: [
                {
                    label: 'Software Engineering',
                    data: [30, 55, 78, 95],
                    borderColor: cyan, backgroundColor: bgC, fill: true, tension: 0.45,
                    borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#04060e', pointBorderColor: cyan
                },
                {
                    label: 'Data Science',
                    data: [15, 40, 68, 88],
                    borderColor: copper, backgroundColor: bgCu, fill: true, tension: 0.45,
                    borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#04060e', pointBorderColor: copper
                }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: { y: { grid: { color: grid }, ticks: { display: false } }, x: { grid: { display: false } } },
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, usePointStyle: true, padding: 16 } } }
        }
    });

    // B — Radar: Capability Matrix
    const ctxR = document.getElementById('radarChart');
    if (ctxR) new Chart(ctxR, {
        type: 'radar',
        data: {
            labels: ['Python', 'SQL', 'Flask', 'Data Viz', 'ML', 'C++'],
            datasets: [{
                label: 'Skill', data: [95, 85, 80, 90, 78, 75],
                backgroundColor: bgC, borderColor: cyan, borderWidth: 2,
                pointBackgroundColor: cyan, pointBorderColor: '#04060e', pointHoverBorderColor: cyan
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: grid }, grid: { color: grid },
                    pointLabels: { color: '#e2e8f0', font: { size: 10, weight: '700' } },
                    ticks: { display: false, max: 100, min: 0 }
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    // C — Bar: Stack Utilization
    const ctxB = document.getElementById('barChart');
    if (ctxB) new Chart(ctxB, {
        type: 'bar',
        data: {
            labels: ['Pandas', 'Flask', 'Power BI', 'NumPy', 'SQL'],
            datasets: [{
                label: 'Usage',
                data: [95, 78, 85, 88, 82],
                backgroundColor: [cyan, copper, violet, `${cyan}99`, `${copper}99`],
                borderRadius: 8, borderWidth: 0
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { y: { grid: { color: grid }, ticks: { display: false } }, x: { grid: { display: false } } },
            plugins: { legend: { display: false } }
        }
    });
};

// =========================================================================
// 5. VANILLA TILT + SCROLL REVEAL
// =========================================================================
const initTilt = () => {
    const els = document.querySelectorAll('.tilt-card');
    if (typeof VanillaTilt !== 'undefined' && els.length) {
        VanillaTilt.init(els, { scale: 1.02, speed: 900, perspective: 1500, glare: true, "max-glare": 0.12 });
    }
};

const initReveal = () => {
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = entry.target.getAttribute('data-delay');
            if (delay) entry.target.style.transitionDelay = `${delay}s`;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal-up, .reveal-down').forEach(el => io.observe(el));
};

// =========================================================================
// 6. NAVBAR — Add .scrolled class on scroll for deeper frost
// =========================================================================
const initNavScroll = () => {
    const nav = document.querySelector('.pro-nav');
    if (!nav) return;
    const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
};

// =========================================================================
// 7. SHIMMER — Inject shimmer divs into all spotlight cards
// =========================================================================
const initShimmer = () => {
    document.querySelectorAll('.spotlight-card').forEach(card => {
        const sh = document.createElement('div');
        sh.className = 'card-shimmer';
        card.appendChild(sh);
    });
};

// =========================================================================
// BOOT
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initParticles, 100);
    setTimeout(initCharts, 200);
    setTimeout(initTilt, 300);
    initSpotlight();
    initMagnetic();
    initReveal();
    initNavScroll();
    initShimmer();
});
