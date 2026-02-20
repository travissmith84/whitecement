(() => {
  const $ = (sel, el=document) => el.querySelector(sel);
  const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  // Dynamic header height variable (for accurate desktop anchor offsets)
  const headerEl = document.querySelector(".header");
  const setHeaderH = () => {
    if (!headerEl) return;
    const h = Math.ceil(headerEl.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  };
  setHeaderH();
  window.addEventListener("resize", setHeaderH, { passive: true });
  window.addEventListener("load", setHeaderH, { passive: true });


  // Dynamic topbar height variable (prevents header jump / overlap)
  const topbar = document.querySelector(".topbar");
  const setTopbarH = () => {
    if (!topbar) return;
    const h = Math.ceil(topbar.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--topbar-h", `${h}px`);
  };
  setTopbarH();
  window.addEventListener("resize", setTopbarH, { passive: true });
  // Recompute after fonts/images/layout settle
  window.addEventListener("load", setTopbarH, { passive: true });


  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const navToggle = $("#navToggle");
  const nav = $("#siteNav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("isOpen");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    $$("#siteNav a").forEach(a => {
      a.addEventListener("click", () => {
        if (nav.classList.contains("isOpen")) {
          nav.classList.remove("isOpen");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // Hero background carousel (8 images)
  const heroImages = [
    "assets/photos/hero-1.webp",
    "assets/photos/hero-2.webp",
    "assets/photos/hero-3.webp",
    "assets/photos/hero-4.webp",
    "assets/photos/hero-5.webp",
    "assets/photos/hero-6.webp",
    "assets/photos/hero-7.webp",
    "assets/photos/hero-8.webp"
  ];

  const heroBg = $("#heroBg");
  const heroDots = $("#heroDots");
  let heroIndex = 0;
  let heroTimer = null;

  function renderDots() {
    if (!heroDots) return;
    heroDots.innerHTML = heroImages.map((_, idx) =>
      `<button class="heroDot" type="button" aria-label="Hero image ${idx+1}" aria-current="${idx===0 ? "true" : "false"}"></button>`
    ).join("");

    $$(".heroDot", heroDots).forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        setHero(idx);
        startHero();
      });
    });
  }

  function setHero(i) {
    heroIndex = (i + heroImages.length) % heroImages.length;

    if (heroBg) {
      // Crossfade
      heroBg.classList.add("is-fading");
      window.setTimeout(() => {
        heroBg.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
        heroBg.classList.remove("is-fading");
      }, 280);
    }

    if (heroDots) {
      $$(".heroDot", heroDots).forEach((d, idx) => {
        d.setAttribute("aria-current", idx === heroIndex ? "true" : "false");
      });
    }
  }

  function startHero() {
    if (heroImages.length < 2) return;
    clearInterval(heroTimer);
    heroTimer = setInterval(() => setHero(heroIndex + 1), 4800);
  }

  renderDots();
  setHero(0);
  startHero();

  // Quote form AJAX submit
  const form = $("#quoteForm");
  const status = $("#formStatus");
  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "Sending…";

      try {
        const formData = new FormData(form);
        const res = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { "Accept": "application/json" }
        });

        if (res.ok) {
          status.textContent = "✅ Thanks — we got your request. We’ll reach out ASAP during business hours.";
          form.reset();
        } else {
          status.textContent = "⚠️ Something went wrong. Please call 941-488-2172 or try again.";
        }
      } catch {
        status.textContent = "⚠️ Network issue. Please call 941-488-2172 or try again.";
      }
    });
  }

  // Active nav link on scroll
  const sections = ["pavers","materials","services","brands","gallery","quote","visit"]
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = $$("#siteNav a");

  function onScroll() {
    const y = window.scrollY + 140;
    let current = null;
    for (const s of sections) {
      if (s.offsetTop <= y) current = s;
    }
    if (!current) return;

    navLinks.forEach(a => a.classList.remove("nav__link--active"));
    const active = navLinks.find(a => a.getAttribute("href") === `#${current.id}`);
    if (active) active.classList.add("nav__link--active");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Gallery lightbox (robust delegation)
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const imgEl = lightbox.querySelector(".lightbox__img");
    const closeBtn = lightbox.querySelector(".lightbox__close");

    function open(src, alt) {
      if (!src) return;
      imgEl.src = src;
      imgEl.alt = alt || "Expanded gallery image";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      imgEl.src = "";
      document.body.style.overflow = "";
    }
    function getBgUrl(el) {
      const bg = getComputedStyle(el).backgroundImage || "";
      const m = bg.match(/url\(["']?(.*?)["']?\)/i);
      return m ? m[1] : "";
    }

    document.addEventListener("click", (e) => {
      const item = e.target.closest(".gallery__item");
      if (!item) return;

      const img = item.querySelector("img");
      if (img) {
        open(img.currentSrc || img.src, img.alt);
        return;
      }
      const bgTarget = item.querySelector(".card__img") || item;
      open(getBgUrl(bgTarget), "Expanded gallery image");
    });

    closeBtn?.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }
})();
/* --- External links open in NEW WINDOW (forced) --- */
(function(){
  document.addEventListener("click", function(e){
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("sms:") || href.startsWith("javascript:")) return;
    let url;
    try { url = new URL(href, window.location.href); } catch { return; }
    if (url.origin !== window.location.origin) {
      e.preventDefault();
      const features = ["noopener","noreferrer","width=1200","height=800","resizable=yes","scrollbars=yes"].join(",");
      window.open(url.href, "_blank", features);
    }
  }, true);
})();
/* --- Open/Closed indicator logic (America/New_York) --- */
(function(){
  const el = document.getElementById("openStatus");
  if(!el) return;

  const tz = "America/New_York";
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, weekday:"short", hour:"2-digit", minute:"2-digit", hour12:false
  }).formatToParts(now);

  const get = (type) => parts.find(p => p.type === type)?.value;
  function int(v){ return parseInt(v, 10); }

  const weekday = get("weekday"); // Mon, Tue...
  const hour = int(get("hour"));
  const minute = int(get("minute"));

  const dayMap = {Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6, Sun:0};
  const d = dayMap[weekday];

  const openM = 7*60 + 0;
  const closeM = 15*60 + 30;
  const nowM = hour*60 + minute;

  const isWeekday = (d >= 1 && d <= 5);
  const isOpen = isWeekday && (nowM >= openM) && (nowM < closeM);

  if (isOpen){
    el.classList.remove("is-closed");
    const minsLeft = closeM - nowM;
    const hr = Math.floor(minsLeft/60);
    const mn = minsLeft%60;
    const tail = hr>0 ? `${hr}h ${mn}m` : `${mn}m`;
    el.innerHTML = `Open Now <small>• closes in ${tail}</small>`;
  } else {
    el.classList.add("is-closed");
    let nextText = "Opens at 7:00 AM";
    if (!isWeekday){
      nextText = "Opens Monday 7:00 AM";
    } else if (nowM >= closeM){
      if (d === 5) nextText = "Opens Monday 7:00 AM";
      else nextText = "Opens tomorrow 7:00 AM";
    } else if (nowM < openM){
      nextText = "Opens at 7:00 AM";
    }
    el.innerHTML = `Closed <small>• ${nextText}</small>`;
  }
})();

// Desktop header compact toggle (shrink header slightly on scroll)
(function(){
  const header = document.querySelector(".header");
  if (!header) return;

  const mq = window.matchMedia("(min-width: 821px)");
  let ticking = false;

  const apply = () => {
    if (!mq.matches){
      header.classList.remove("is-compact");
      ticking = false;
      return;
    }
    const y = window.scrollY || 0;
    const compact = y > 80;
    header.classList.toggle("is-compact", compact);
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", apply, { passive: true });
  window.addEventListener("load", apply, { passive: true });
  apply();
})();



// Dynamic Formspree _next for GitHub Pages / custom domains
(function(){
  const form = document.getElementById("quoteForm");
  if (!form) return;
  const nextInput = form.querySelector('input[name="_next"]');
  if (!nextInput) return;

  // Base path = current directory (works for /whitecement/ and custom domains)
  const basePath = window.location.pathname.replace(/[^\/]*$/, "");
  nextInput.value = window.location.origin + basePath + "thank-you.html";
})();



// Auto-apply reveal to key sections/cards
(function(){
  const add = (sel)=>document.querySelectorAll(sel).forEach(el=>el.classList.add('reveal'));
  add('section .sectionHead');
  add('.card, .infoCard, .serviceCard, .brandCard, .brandTile, .categoryCard, .tile, .statCard');
})();

// Reveal observer
(function(){
  const els = Array.from(document.querySelectorAll('.reveal'));
  if(!els.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
  els.forEach(el=>io.observe(el));
})();

// Animated counters (runs once when visible)
(function(){
  const yearsEl = document.querySelector('#statsCounters .statNum[data-target="0"]');
  if (yearsEl){
    yearsEl.setAttribute('data-target', String(new Date().getFullYear() - 1958));
  }
  const nums = Array.from(document.querySelectorAll('#statsCounters .statNum'));
  if(!nums.length) return;
  const animate = (el)=>{
    const target = parseFloat(el.getAttribute('data-target')||'0');
    const dur = 900;
    const t0 = performance.now();
    const step = (t)=>{
      const p = Math.min(1, (t - t0)/dur);
      const v = Math.round(target * (1 - Math.pow(1-p,3)));
      el.textContent = String(v);
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const wrap = document.getElementById('statsCounters');
  if(!wrap) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        nums.forEach(animate);
        io.disconnect();
      }
    });
  }, {threshold: 0.25});
  io.observe(wrap);
})();
