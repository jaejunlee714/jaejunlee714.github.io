/* ==========================================================================
   Shared Layout, Interactive Knowledge Graph Canvas, and Page Renderers
   All user-facing content is driven dynamically from window.SITE_DATA.
   ========================================================================== */

(function () {
  const DATA = window.SITE_DATA;
  const body = document.body;
  const BASE = body.dataset.base || "./";
  const PAGE = body.dataset.page || "about";

  const pathOf = (rel) => {
    if (!rel) return BASE;
    if (/^https?:\/\//.test(rel) || rel.startsWith("mailto:")) return rel;
    return BASE + rel.replace(/^\.?\//, "");
  };

  function safeGetStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  }

  function safeSetStorage(key, val) {
    try {
      window.localStorage.setItem(key, val);
    } catch (_) {}
  }

  function getInitials(name) {
    return (name || "JL")
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function showToast(msg) {
    let el = document.getElementById("site-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "site-toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2000);
  }

  function copyText(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(label)).catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  }

  function fallbackCopy(text, label) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast(label);
    } catch (_) {}
    document.body.removeChild(ta);
  }

  /* ---------- Theme ---------- */
  function initTheme() {
    const saved = safeGetStorage("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    safeSetStorage("theme", next);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  /* ---------- Header & Footer ---------- */
  function renderChrome() {
    const header = document.getElementById("site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML = `
        <div class="container nav-inner">
          <a class="brand" href="${pathOf("")}">
            <span>${DATA.name}</span>
          </a>
          <div class="nav-right">
            <nav class="nav-links" aria-label="Main navigation">
              <a class="nav-link ${PAGE === "about" ? "active" : ""}" href="${pathOf("")}">About</a>
              <a class="nav-link ${PAGE === "publications" ? "active" : ""}" href="${pathOf("publications/")}">Publications</a>
              <a class="nav-link ${PAGE === "cv" ? "active" : ""}" href="${pathOf("cv/")}">CV</a>
            </nav>
            <button id="theme-toggle-btn" class="icon-btn" type="button" title="Toggle theme"></button>
          </div>
        </div>
      `;
      document.getElementById("theme-toggle-btn").addEventListener("click", toggleTheme);
      updateThemeIcon();
    }

    const footer = document.getElementById("site-footer");
    if (footer) {
      footer.className = "site-footer";
      const year = new Date().getFullYear();
      footer.innerHTML = `
        <div class="container footer-inner">
          <div>© ${year} ${DATA.name}${DATA.affiliationShort ? ` · ${DATA.affiliationShort}` : ""}</div>
          <div class="footer-links">
            <a href="mailto:${DATA.email}">Email</a>
            <a href="${DATA.social.scholar}" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            <a href="${DATA.social.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="${pathOf(DATA.cvPdf)}" target="_blank" rel="noopener noreferrer">CV (PDF)</a>
          </div>
        </div>
      `;
    }
  }

  /* ---------- Minimal Vector Fallback Diagrams for Papers ---------- */
  function fallbackSvg(shortKey) {
    return `
      <div class="pub-thumb-svg" aria-hidden="true">
        <svg viewBox="0 0 220 130" width="100%" height="100%" fill="none">
          <g stroke="currentColor" stroke-opacity="0.22" stroke-width="1.3">
            <line x1="42" y1="36" x2="110" y2="62"/>
            <line x1="42" y1="94" x2="110" y2="62"/>
            <line x1="110" y1="62" x2="178" y2="38"/>
            <line x1="110" y1="62" x2="174" y2="96"/>
            <line x1="42" y1="36" x2="178" y2="38" stroke-dasharray="3 3"/>
          </g>
          <circle cx="42" cy="36" r="6" fill="var(--accent)" fill-opacity="0.35"/>
          <circle cx="42" cy="94" r="5" fill="var(--accent)" fill-opacity="0.25"/>
          <circle cx="110" cy="62" r="9" fill="var(--accent)" fill-opacity="0.85"/>
          <circle cx="178" cy="38" r="6" fill="var(--accent)" fill-opacity="0.45"/>
          <circle cx="174" cy="96" r="5.5" fill="var(--accent)" fill-opacity="0.3"/>
          <text x="110" y="118" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="var(--text-muted)">${shortKey}</text>
        </svg>
      </div>
    `;
  }

  /* ---------- Publication Card Renderer ---------- */
  function formatAuthors(authors) {
    return authors
      .map((a) => (a.startsWith(DATA.name) ? `<span class="me">${a}</span>` : a))
      .join(", ");
  }

  function renderPubCard(pub) {
    const linkDefs = [
      ["pdf", "PDF"],
      ["arxiv", "arXiv"],
      ["code", "Code"],
      ["poster", "Poster"],
      ["slides", "Slides"],
      ["video", "Video"],
      ["html", "Proceedings"]
    ];

    const actionLinks = linkDefs
      .filter(([key]) => pub.links && pub.links[key])
      .map(
        ([key, label]) =>
          `<a class="pub-action-btn ${key === "pdf" ? "primary" : ""}" href="${pub.links[key]}" target="_blank" rel="noopener noreferrer">${label}</a>`
      )
      .join("");

    const primaryUrl = (pub.links && (pub.links.html || pub.links.pdf)) || "#";

    return `
      <article class="pub-card" data-pub-id="${pub.id}">
        <div class="pub-thumb" data-shortkey="${pub.shortKey}">
          <img src="${pathOf(pub.preview)}" alt="${pub.shortKey} preview" loading="lazy" />
        </div>
        <div class="pub-body">
          <div class="pub-badges">
            <span class="venue-badge">${pub.venueShort}</span>
            ${pub.selected ? '<span class="selected-badge">Selected</span>' : ""}
            ${pub.note ? `<span class="note-badge">${pub.note}</span>` : ""}
          </div>
          <h3 class="pub-title">
            <a href="${primaryUrl}" target="_blank" rel="noopener noreferrer">${pub.title}</a>
          </h3>
          <p class="pub-authors">${formatAuthors(pub.authors)}</p>
          <p class="pub-venue-full">${pub.venueFull}</p>
          <div class="pub-actions">
            ${actionLinks}
            <button type="button" class="pub-action-btn bib-toggle-btn" data-id="${pub.id}">BibTeX</button>
          </div>
          <div class="bib-box" id="bib-${pub.id}">
            <div class="bib-header">
              <span>BibTeX</span>
              <button type="button" class="pub-action-btn bib-copy-btn" data-id="${pub.id}">Copy</button>
            </div>
            <pre>${pub.bibtex.replace(/</g, "&lt;")}</pre>
          </div>
        </div>
      </article>
    `;
  }

  function bindPubEvents(container) {
    if (!container) return;

    container.querySelectorAll(".pub-thumb img").forEach((img) => {
      const wrap = img.parentElement;
      const shortKey = wrap.dataset.shortkey || "Paper";
      img.addEventListener("error", () => {
        wrap.innerHTML = fallbackSvg(shortKey);
      });
    });

    container.querySelectorAll(".bib-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const box = document.getElementById("bib-" + btn.dataset.id);
        if (box) box.classList.toggle("open");
      });
    });

    container.querySelectorAll(".bib-copy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pub = DATA.publications.find((p) => p.id === btn.dataset.id);
        if (pub) copyText(pub.bibtex, "BibTeX copied to clipboard");
      });
    });
  }

  /* ---------- Interactive Knowledge Graph Canvas (Sparse Connected) ---------- */
  function initKnowledgeGraph(canvasId, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const interactive = options.interactive !== false;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let paused = false;
    let time = 0;
    let mouse = { x: -9999, y: -9999, active: false };
    let pulses = [];
    let nodes = [];
    let edges = [];

    function setup() {
      const rect = canvas.parentElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const keywords = options.subtle ? [] : DATA.graphKeywords;
      const bgCount = options.subtle ? 16 : Math.min(26, Math.max(16, Math.floor(width / 42)));
      nodes = [];

      // 1. 허브 노드(연구 키워드) 배치
      keywords.forEach((label, idx) => {
        const angle = (idx / keywords.length) * Math.PI * 2 + 0.35;
        const rx = width * (width < 720 ? 0.36 : 0.41);
        const ry = height * 0.35;
        const cx = width * 0.56;
        const cy = height * 0.5;
        const bx = Math.max(48, Math.min(width - 72, cx + Math.cos(angle) * rx + (Math.random() - 0.5) * 36));
        const by = Math.max(32, Math.min(height - 32, cy + Math.sin(angle) * ry + (Math.random() - 0.5) * 24));
        nodes.push({
          baseX: bx,
          baseY: by,
          x: bx,
          y: by,
          ampX: 7 + Math.random() * 6,
          ampY: 6 + Math.random() * 6,
          speedX: 0.45 + Math.random() * 0.35,
          speedY: 0.45 + Math.random() * 0.35,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          r: 4.2,
          label,
          hub: true
        });
      });

      // 2. 배경 노드 배치 (지터 그리드로 고르게 분포시켜 뭉침 방지)
      const cols = Math.max(4, Math.round(Math.sqrt(bgCount * (width / Math.max(height, 1)))));
      const rows = Math.max(2, Math.ceil(bgCount / cols));
      const cellW = width / cols;
      const cellH = height / rows;
      for (let i = 0; i < bgCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const bx = Math.max(20, Math.min(width - 20, (col + 0.2 + Math.random() * 0.6) * cellW));
        const by = Math.max(20, Math.min(height - 20, (row + 0.2 + Math.random() * 0.6) * cellH));
        nodes.push({
          baseX: bx,
          baseY: by,
          x: bx,
          y: by,
          ampX: 8 + Math.random() * 8,
          ampY: 7 + Math.random() * 7,
          speedX: 0.4 + Math.random() * 0.45,
          speedY: 0.4 + Math.random() * 0.45,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          r: 2.1 + Math.random() * 1.4,
          label: null,
          hub: false
        });
      }

      // 3. Prim MST로 100% Connected Graph 구성 (고립 노드·분리 컴포넌트 제거)
      const n = nodes.length;
      edges = [];
      const edgeSet = new Set();
      const degree = new Array(n).fill(0);

      function addEdge(u, v) {
        if (u === v) return false;
        const key = u < v ? `${u}-${v}` : `${v}-${u}`;
        if (edgeSet.has(key)) return false;
        edgeSet.add(key);
        edges.push([u, v]);
        degree[u]++;
        degree[v]++;
        return true;
      }

      if (n > 1) {
        const inTree = new Array(n).fill(false);
        const minDist = new Array(n).fill(Infinity);
        const parent = new Array(n).fill(-1);
        minDist[0] = 0;

        for (let stepIdx = 0; stepIdx < n; stepIdx++) {
          let u = -1;
          for (let i = 0; i < n; i++) {
            if (!inTree[i] && (u === -1 || minDist[i] < minDist[u])) {
              u = i;
            }
          }
          if (u === -1) break;
          inTree[u] = true;
          if (parent[u] !== -1) addEdge(parent[u], u);

          for (let v = 0; v < n; v++) {
            if (inTree[v]) continue;
            const d = Math.hypot(nodes[u].baseX - nodes[v].baseX, nodes[u].baseY - nodes[v].baseY);
            if (d < minDist[v]) {
              minDist[v] = d;
              parent[v] = u;
            }
          }
        }

        // 4. 가까운 이웃 1~2개만 짧게 추가 연결 (자연스러운 그래프 구조, 과밀 방지)
        const maxExtraDist = Math.min(210, Math.max(135, width * 0.2));
        for (let i = 0; i < n; i++) {
          const maxDeg = nodes[i].hub ? 4 : 3;
          if (degree[i] >= maxDeg) continue;

          const candidates = [];
          for (let j = 0; j < n; j++) {
            if (i === j || degree[j] >= (nodes[j].hub ? 4 : 3)) continue;
            const d = Math.hypot(nodes[i].baseX - nodes[j].baseX, nodes[i].baseY - nodes[j].baseY);
            if (d < maxExtraDist) candidates.push({ j, d });
          }
          candidates.sort((a, b) => a.d - b.d);

          for (const c of candidates) {
            if (degree[i] >= maxDeg) break;
            if (addEdge(i, c.j)) break; // 노드당 짧은 보조 엣지 최대 1개만 추가
          }
        }
      }
    }

    function getColors() {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      return {
        node: isDark ? "rgba(148, 163, 184, 0.36)" : "rgba(75, 85, 99, 0.28)",
        hub: isDark ? "rgba(96, 165, 250, 0.65)" : "rgba(30, 58, 138, 0.48)",
        active: isDark ? "rgba(96, 165, 250, 0.95)" : "rgba(30, 58, 138, 0.88)",
        edge: isDark ? "rgba(148, 163, 184, 0.13)" : "rgba(30, 58, 138, 0.095)",
        edgeActive: isDark ? "rgba(96, 165, 250, 0.48)" : "rgba(30, 58, 138, 0.36)",
        label: isDark ? "rgba(148, 163, 184, 0.52)" : "rgba(55, 65, 81, 0.44)",
        labelActive: isDark ? "rgba(191, 219, 254, 0.95)" : "rgba(30, 58, 138, 0.92)"
      };
    }

    function step() {
      if (width && height) {
        const c = getColors();
        ctx.clearRect(0, 0, width, height);

        if (!paused) {
          time += 0.012;
          nodes.forEach((n) => {
            n.x = n.baseX + Math.sin(time * n.speedX + n.phaseX) * n.ampX;
            n.y = n.baseY + Math.cos(time * n.speedY + n.phaseY) * n.ampY;
          });
        }

        let hoverIdx = -1;
        let minDist = 115;
        if (interactive && mouse.active) {
          nodes.forEach((n, idx) => {
            const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
            if (d < minDist) {
              minDist = d;
              hoverIdx = idx;
            }
          });
        }

        const neighbors = new Set();
        if (hoverIdx !== -1) {
          neighbors.add(hoverIdx);
          edges.forEach(([a, b]) => {
            if (a === hoverIdx) neighbors.add(b);
            if (b === hoverIdx) neighbors.add(a);
          });
        }

        // 모든 연결 엣지 유지 (거리 제한으로 끊기지 않음)
        edges.forEach(([a, b]) => {
          const na = nodes[a];
          const nb = nodes[b];
          const highlighted = hoverIdx !== -1 && (a === hoverIdx || b === hoverIdx);
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.strokeStyle = highlighted ? c.edgeActive : c.edge;
          ctx.lineWidth = highlighted ? 1.45 : 0.9;
          ctx.stroke();
        });

        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.t += paused ? 0 : 0.025;
          if (p.t >= 1) {
            pulses.splice(i, 1);
            continue;
          }
          const na = nodes[p.from];
          const nb = nodes[p.to];
          const px = na.x + (nb.x - na.x) * p.t;
          const py = na.y + (nb.y - na.y) * p.t;
          ctx.beginPath();
          ctx.arc(px, py, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = c.active;
          ctx.fill();
        }

        nodes.forEach((n, idx) => {
          const isNeighbor = neighbors.has(idx);
          const isHover = idx === hoverIdx;
          ctx.beginPath();
          ctx.arc(n.x, n.y, isHover ? n.r + 2 : n.r, 0, Math.PI * 2);
          ctx.fillStyle = isNeighbor ? c.active : n.hub ? c.hub : c.node;
          ctx.fill();

          if (n.label) {
            ctx.font = '500 10.5px "JetBrains Mono", monospace';
            ctx.fillStyle = isNeighbor ? c.labelActive : c.label;
            ctx.fillText(n.label, n.x + 8, n.y + 3.5);
          }
        });
      }
      requestAnimationFrame(step);
    }

    if (interactive) {
      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      });
      canvas.addEventListener("mouseleave", () => {
        mouse.active = false;
      });
      canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        let closest = -1;
        let best = 140;
        nodes.forEach((n, idx) => {
          const d = Math.hypot(n.x - cx, n.y - cy);
          if (d < best) {
            best = d;
            closest = idx;
          }
        });
        if (closest !== -1) {
          edges.forEach(([a, b]) => {
            if (a === closest) pulses.push({ from: a, to: b, t: 0 });
            if (b === closest) pulses.push({ from: b, to: a, t: 0 });
          });
        }
      });

      const toggleBtn = document.getElementById("graph-toggle-btn");
      if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
          paused = !paused;
          toggleBtn.textContent = paused ? "▶ Play Graph" : "❚❚ Pause Graph";
        });
      }
    }

    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(setup).observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", setup);
    }
    setup();
    step();
  }

  /* ---------- Page 1: About (index.html) ---------- */
  function renderAboutPage() {
    document.title = DATA.siteTitle;

    const eyebrowEl = document.getElementById("hero-eyebrow");
    if (eyebrowEl) eyebrowEl.textContent = DATA.eyebrow;

    const titleEl = document.getElementById("hero-title");
    if (titleEl) {
      titleEl.innerHTML = `${DATA.name}${DATA.koreanName ? ` <span class="kr-name">${DATA.koreanName}</span>` : ""}`;
    }

    const profileFrame = document.getElementById("profile-frame");
    if (profileFrame) {
      const img = document.createElement("img");
      img.src = pathOf(DATA.profileImage);
      img.alt = DATA.name;
      img.addEventListener("error", () => {
        profileFrame.innerHTML = `<div class="profile-fallback">${getInitials(DATA.name)}</div>`;
      });
      profileFrame.innerHTML = "";
      profileFrame.appendChild(img);
    }

    const bioEl = document.getElementById("bio-paragraphs");
    if (bioEl) {
      bioEl.innerHTML = DATA.bioParagraphs.map((p) => `<p>${p}</p>`).join("");
    }

    const socialEl = document.getElementById("social-row");
    if (socialEl) {
      socialEl.innerHTML = `
        <button type="button" class="pill-btn" id="copy-email-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          <span>${DATA.email}</span>
        </button>
        <a class="pill-btn" href="${DATA.social.scholar}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          <span>Google Scholar</span>
        </a>
        <a class="pill-btn" href="${DATA.social.github}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          <span>GitHub</span>
        </a>
        <a class="pill-btn" href="${pathOf(DATA.cvPdf)}" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          <span>CV (PDF)</span>
        </a>
      `;
      document.getElementById("copy-email-btn").addEventListener("click", () => {
        copyText(DATA.email, "Email copied: " + DATA.email);
      });
    }

    const selectedList = document.getElementById("selected-pub-list");
    if (selectedList) {
      const selected = DATA.publications.filter((p) => p.selected);
      selectedList.innerHTML = selected.map(renderPubCard).join("");
      bindPubEvents(selectedList);
    }

    const totalCountEl = document.getElementById("all-pub-count");
    if (totalCountEl) {
      totalCountEl.textContent = DATA.publications.length;
    }

    initKnowledgeGraph("kg-canvas", { interactive: true });
  }

  /* ---------- Page 2: Publications (publications/index.html) ---------- */
  function renderPublicationsPage() {
    document.title = `Publications — ${DATA.siteTitle}`;
    let activeVenue = "ALL";
    let onlySelected = false;
    let query = "";

    const scholarLink = document.getElementById("pub-scholar-link");
    if (scholarLink) scholarLink.href = DATA.social.scholar;

    const venueGroupEl = document.getElementById("venue-filters");
    const listEl = document.getElementById("all-pub-list");
    const searchEl = document.getElementById("pub-search");
    const countEl = document.getElementById("pub-result-count");

    // Automatically extract unique venueGroup list sorted by publication count (desc)
    const venueCounts = new Map();
    DATA.publications.forEach((p) => {
      if (!p.venueGroup) return;
      venueCounts.set(p.venueGroup, (venueCounts.get(p.venueGroup) || 0) + 1);
    });
    const venues = [
      "ALL",
      ...Array.from(venueCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([v]) => v)
    ];

    function drawFilters() {
      venueGroupEl.innerHTML =
        venues
          .map(
            (v) =>
              `<button type="button" class="filter-pill ${activeVenue === v && !onlySelected ? "active" : ""}" data-venue="${v}">${v === "ALL" ? "All" : v}</button>`
          )
          .join("") +
        `<button type="button" class="filter-pill ${onlySelected ? "active" : ""}" id="selected-only-btn">Selected (${DATA.publications.filter((p) => p.selected).length})</button>`;

      venueGroupEl.querySelectorAll("[data-venue]").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeVenue = btn.dataset.venue;
          onlySelected = false;
          drawFilters();
          drawList();
        });
      });

      document.getElementById("selected-only-btn").addEventListener("click", () => {
        onlySelected = !onlySelected;
        if (onlySelected) activeVenue = "ALL";
        drawFilters();
        drawList();
      });
    }

    function drawList() {
      const q = query.trim().toLowerCase();
      const filtered = DATA.publications.filter((p) => {
        if (onlySelected && !p.selected) return false;
        if (activeVenue !== "ALL" && p.venueGroup !== activeVenue) return false;
        if (!q) return true;
        const hay = `${p.title} ${p.authors.join(" ")} ${p.venueShort} ${p.venueFull} ${p.year}`.toLowerCase();
        return hay.includes(q);
      });

      countEl.textContent = `${filtered.length} of ${DATA.publications.length} publications`;
      if (filtered.length === 0) {
        listEl.innerHTML = `<div class="empty-state">No publications match your filter.</div>`;
        return;
      }
      listEl.innerHTML = filtered.map(renderPubCard).join("");
      bindPubEvents(listEl);
    }

    if (searchEl) {
      searchEl.addEventListener("input", (e) => {
        query = e.target.value;
        drawList();
      });
    }

    drawFilters();
    drawList();
    initKnowledgeGraph("sub-kg-canvas", { interactive: false, subtle: true });
  }

  /* ---------- Page 3: CV (cv/index.html) ---------- */
  function renderCvPage() {
    document.title = `CV — ${DATA.siteTitle}`;

    const fullNameDisplay = DATA.koreanName ? `${DATA.name} (${DATA.koreanName})` : DATA.name;

    const subtitleEl = document.getElementById("cv-subtitle");
    if (subtitleEl) {
      subtitleEl.textContent = `${fullNameDisplay}${DATA.affiliationShort ? ` · ${DATA.affiliationShort}` : ""}`;
    }

    const pdfLinkEl = document.getElementById("cv-pdf-link");
    if (pdfLinkEl) pdfLinkEl.href = pathOf(DATA.cvPdf);

    const basicsEl = document.getElementById("cv-basics");
    if (basicsEl) {
      basicsEl.innerHTML = `
        <div class="cv-basics-item">
          <span>Full Name</span>
          <strong>${fullNameDisplay}</strong>
        </div>
        <div class="cv-basics-item">
          <span>Email</span>
          <a href="mailto:${DATA.email}" id="cv-copy-email" title="Click to copy">${DATA.email}</a>
        </div>
        <div class="cv-basics-item">
          <span>Affiliation</span>
          ${DATA.affiliationFull || DATA.affiliationShort}
        </div>
      `;
      const copyEmailCv = document.getElementById("cv-copy-email");
      if (copyEmailCv) {
        copyEmailCv.addEventListener("click", (e) => {
          e.preventDefault();
          copyText(DATA.email, "Email copied: " + DATA.email);
        });
      }
    }

    const eduEl = document.getElementById("cv-education");
    if (eduEl) {
      eduEl.innerHTML = DATA.education
        .map(
          (e) => `
          <div class="cv-timeline-item">
            <div class="cv-period">${e.period}</div>
            <div>
              <div class="cv-item-title">
                <a href="${e.degreeUrl}" target="_blank" rel="noopener noreferrer">${e.degree}</a>
              </div>
              <p class="cv-item-desc">${e.lines.join("<br>")}</p>
            </div>
          </div>
        `
        )
        .join("");
    }

    const pubEl = document.getElementById("cv-publications");
    if (pubEl) {
      pubEl.innerHTML = DATA.publications
        .map((p) => {
          const authStr = p.authors
            .map((a) => (a.startsWith(DATA.name) ? `<strong>${a}</strong>` : a))
            .join(", ");
          const noteStr = p.note ? ` (${p.note})` : "";
          return `<li>${authStr}, <em>${p.title}</em>, ${p.venueShort}${noteStr}.</li>`;
        })
        .join("");
    }

    const tutEl = document.getElementById("cv-tutorials");
    if (tutEl) {
      tutEl.innerHTML = DATA.tutorials
        .map(
          (t) => `
          <div class="cv-tutorial-item">
            <div class="cv-tutorial-top">
              <span class="venue-badge">${t.venue}</span>
              <span class="cv-tutorial-role">${t.role}</span>
            </div>
            <p class="cv-tutorial-title">
              <a href="${t.url}" target="_blank" rel="noopener noreferrer">“${t.title}” ↗</a>
            </p>
          </div>
        `
        )
        .join("");
    }

    const revEl = document.getElementById("cv-peer-review");
    if (revEl) {
      revEl.innerHTML = DATA.peerReview
        .map(
          (r) => `
          <div class="cv-service-card">
            <div class="cv-service-type">${r.category}</div>
            <div class="cv-service-venues">${r.venues}</div>
          </div>
        `
        )
        .join("");
    }

    initKnowledgeGraph("sub-kg-canvas", { interactive: false, subtle: true });
  }

  /* ---------- Boot ---------- */
  initTheme();
  renderChrome();
  if (PAGE === "about") renderAboutPage();
  if (PAGE === "publications") renderPublicationsPage();
  if (PAGE === "cv") renderCvPage();
})();
