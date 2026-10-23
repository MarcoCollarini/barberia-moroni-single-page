(() => {
  "use strict";
  const C = window.BARBERIA_CONFIG;
  if (!C) return;
  const $ = (s, c = document) => c.querySelector(s),
    $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const ext = (el, url) => {
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  };
  function links() {
    $$(".booking-link").forEach((a) => ext(a, C.business.booking));
    ext($("#instagram-link"), C.business.instagram);
    ext($("#instagram-gallery"), C.business.instagram);
    ext($("#directions-link"), C.business.directions);
    $("#call-link").href = `tel:${C.business.phoneHref}`;
    $("#phone").href = `tel:${C.business.phoneHref}`;
    $("#phone").textContent = C.business.phone;
    $("#address").textContent =
      `${C.business.address}, ${C.business.postalCity}`;
    $("#year").textContent = new Date().getFullYear();
  }
function menu() {
    const b = $(".menu-toggle");
    const n = $("#nav");

    if (!b || !n) {
        return;
    }

    let scrollPosition = 0;


    function unlockBody() {
        document.documentElement.classList.remove("menu-open");
        document.body.classList.remove("menu-open");

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";

        b.setAttribute("aria-expanded", "false");
        b.setAttribute("aria-label", "Apri menu");
    }


    function open() {
        scrollPosition = window.scrollY;

        document.documentElement.classList.add("menu-open");
        document.body.classList.add("menu-open");

        /*
         * Congela la pagina esattamente
         * nel punto in cui si trova.
         */
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";

        b.setAttribute("aria-expanded", "true");
        b.setAttribute("aria-label", "Chiudi menu");
    }


    /*
     * Chiusura normale tramite hamburger / ESC.
     *
     * In questo caso vogliamo rimanere esattamente
     * nella posizione precedente.
     */
    function close() {
        const isOpen =
            document.body.classList.contains("menu-open");

        if (!isOpen) {
            return;
        }

        unlockBody();

        window.scrollTo({
            top: scrollPosition,
            left: 0,
            behavior: "instant"
        });
    }


    /*
     * Navigazione verso una sezione.
     *
     * Qui NON dobbiamo tornare a scrollPosition.
     */
    function navigateToSection(link) {
        const href = link.getAttribute("href");

        if (
            !href ||
            !href.startsWith("#") ||
            href === "#"
        ) {
            return false;
        }

        const target = document.querySelector(href);

        if (!target) {
            return false;
        }

        /*
         * Prima sblocchiamo completamente
         * il documento.
         */
        unlockBody();


        /*
         * Poi navighiamo davvero
         * alla sezione richiesta.
         */
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        /*
         * Mantiene aggiornato anche
         * l'hash nell'URL.
         */
        if (history.pushState) {
            history.pushState(
                null,
                "",
                href
            );
        }

        return true;
    }


    /*
     * Hamburger
     */
    b.addEventListener("click", () => {
        const isOpen =
            document.body.classList.contains("menu-open");

        if (isOpen) {
            close();
        } else {
            open();
        }
    });


    /*
     * Click link navbar
     */
    n.addEventListener("click", (e) => {
        const link =
            e.target.closest("a");

        if (!link) {
            return;
        }

        const href =
            link.getAttribute("href");


        /*
         * Link interni
         *
         * Home
         * Barberia
         * Servizi
         * Esperienza
         * Galleria
         * Contatti
         */
        if (
            href &&
            href.startsWith("#") &&
            href !== "#"
        ) {
            e.preventDefault();

            navigateToSection(link);

            return;
        }


        /*
         * Collegamenti esterni,
         * ad esempio Prenota.
         *
         * Chiudiamo semplicemente il menu
         * senza interferire con il link.
         */
        unlockBody();
    });


    /*
     * ESC
     */
    document.addEventListener("keydown", (e) => {
        if (
            e.key === "Escape" &&
            document.body.classList.contains("menu-open")
        ) {
            close();

            b.focus();
        }
    });
}

  function services() {
    // const list = $("#services-list");
    // C.services.forEach((s, i) => {
    //   const art = document.createElement("article");
    //   art.className = "service";
    //   const id = `service-${i}`;
    //   art.innerHTML = `<button class="service-toggle" aria-expanded="false" aria-controls="${id}"><span class="num">${String(i + 1).padStart(2, "0")}</span><h3>${s.name}</h3><span class="duration">${s.duration}</span><span class="plus" aria-hidden="true">+</span></button><div class="service-panel" id="${id}"><div><div class="service-panel-inner"><p>${s.description}</p><a class="btn btn-gold" href="${C.business.booking}" target="_blank" rel="noopener noreferrer">Prenota questo servizio</a></div></div></div>`;
    //   const btn = $("button", art);
    //   btn.addEventListener("click", () => {
    //     const open = art.classList.toggle("open");
    //     btn.setAttribute("aria-expanded", String(open));
    //   });
    //   list.append(art);
    // });
  }
  const days = [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ];
  function italyNow() {
    const p = new Intl.DateTimeFormat("it-IT", {
      timeZone: C.business.timezone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const wd = { dom: 0, lun: 1, mar: 2, mer: 3, gio: 4, ven: 5, sab: 6 }[
      p
        .find((x) => x.type === "weekday")
        .value.slice(0, 3)
        .toLowerCase()
    ];
    return {
      day: wd,
      min:
        +p.find((x) => x.type === "hour").value * 60 +
        +p.find((x) => x.type === "minute").value,
    };
  }
  function minutes(t) {
    const [a, b] = t.split(":").map(Number);
    return a * 60 + b;
  }
  function hours() {
    const now = italyNow(),
      list = $("#hours-list");
    days.forEach((d, i) => {
      const ranges = C.hours[i] || [],
        li = document.createElement("li");
      if (i === now.day) li.className = "today";
      li.innerHTML = `<span>${d}</span><span>${ranges.length ? ranges.map((r) => `${r.open}–${r.close}`).join(" / ") : "Chiuso"}</span>`;
      list.append(li);
    });
    const active = (C.hours[now.day] || []).some((r) => {
      let a = minutes(r.open),
        b = minutes(r.close);
      return b < a ? now.min >= a || now.min < b : now.min >= a && now.min < b;
    });
    const status = $("#open-status");
    status.textContent = active ? "Aperto ora" : "Chiuso ora";
    status.classList.toggle("open", active);
    $("#verify-note").hidden = !C.hoursNeedVerification;
  }
  let galleryIndex = 0,
    items = [];
  function gallery() {
    const grid = $("#gallery-grid"),
      lb = $("#lightbox"),
      img = $("img", lb),
      cap = $("figcaption", lb);
    C.gallery.forEach((g, i) => {
      const b = document.createElement("button");
      b.className = "gallery-item";
      b.dataset.ratio = g[2];
      b.setAttribute("aria-label", `Apri: ${g[1]}`);
      b.innerHTML = `<picture><source srcset="assets/images/${g[0]}.webp" type="image/webp"><img src="assets/images/${g[0]}.jpg" alt="${g[1]}" loading="lazy" width="1200" height="1200"></picture><span>${g[1]}</span>`;
      b.addEventListener("click", () => open(i));
      grid.append(b);
    });
    items = C.gallery;
    function render() {
      const g = items[galleryIndex];
      img.src = `assets/images/${g[0]}.webp`;
      img.alt = g[1];
      cap.textContent = g[1];
    }
    function open(i) {
      galleryIndex = i;
      render();
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      $(".lightbox-close", lb).focus();
    }
    function close() {
      lb.hidden = true;
      document.body.style.overflow = "";
    }
    $(".lightbox-close", lb).onclick = close;
    $(".lightbox-prev", lb).onclick = () => {
      galleryIndex = (galleryIndex - 1 + items.length) % items.length;
      render();
    };
    $(".lightbox-next", lb).onclick = () => {
      galleryIndex = (galleryIndex + 1) % items.length;
      render();
    };
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") $(".lightbox-prev", lb).click();
      if (e.key === "ArrowRight") $(".lightbox-next", lb).click();
    });
  }
  function scroll() {
    const header = $(".site-header"),
      hero = $("#hero-image"),
      reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    addEventListener(
      "scroll",
      () => {
        header.classList.toggle("scrolled", scrollY > 30);
        if (!reduce && innerWidth > 860)
          hero.style.transform = `translateY(${Math.min(scrollY * 0.08, 50)}px) scale(1.04)`;
      },
      { passive: true },
    );
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.14 },
    );
    $$(".reveal").forEach((x) => io.observe(x));
    const sections = $$("main section[id]");
    const nav = $$("#nav a[href^='#']");
    new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            nav.forEach((a) =>
              a.classList.toggle(
                "active",
                a.getAttribute("href") === `#${e.target.id}`,
              ),
            );
          }
        }),
      { rootMargin: "-35% 0px -55%" },
    ).observe;
    sections.forEach((s) =>
      new IntersectionObserver(
        (es) => {
          if (es[0].isIntersecting)
            nav.forEach((a) =>
              a.classList.toggle(
                "active",
                a.getAttribute("href") === `#${s.id}`,
              ),
            );
        },
        { rootMargin: "-35% 0px -55%" },
      ).observe(s),
    );
  }
  function init() {
    links();
    menu();
    services();
    hours();
    gallery();
    scroll();
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
