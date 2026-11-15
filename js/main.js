/* Chidinma — Photography. Plain JavaScript, no libraries. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Placeholders: if a real photo (e.g. images/places-01.jpg) isn't there yet,
        show the matching placeholder from images/placeholders/ instead. */
  function usePlaceholder(img) {
    var ph = img.getAttribute("data-placeholder");
    if (ph && img.getAttribute("src") !== ph) { img.src = ph; img.classList.add("is-placeholder"); }
  }
  document.querySelectorAll("img[data-placeholder]").forEach(function (img) {
    img.addEventListener("error", function () { usePlaceholder(img); });
    if (img.complete && img.naturalWidth === 0) usePlaceholder(img);
  });

  /* 2. Nav background after scrolling past the top */
  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 60); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* 3. Gentle fade-in on scroll */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* 4. Gallery filters */
  var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile"));
  var filters = document.querySelectorAll(".filter");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      var g = document.getElementById("grid"); if (g) g.setAttribute("data-view", f);
      filters.forEach(function (b) { var on = b === btn; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on); });
      tiles.forEach(function (t) {
        var show = f === "all" || t.getAttribute("data-category") === f;
        t.classList.toggle("is-hidden", !show);
        if (show) t.classList.add("is-visible");
      });
    });
  });

  /* 5. Lightbox with keyboard + swipe */
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector(".lb-img");
  var lbTitle = lb.querySelector(".lb-title");
  var lbMeta = lb.querySelector(".lb-meta");
  var lbCount = lb.querySelector(".lb-count");
  var current = 0, lastFocus = null;

  function visibleTiles() { return tiles.filter(function (t) { return !t.classList.contains("is-hidden"); }); }

  function show(index) {
    var list = visibleTiles(); if (!list.length) return;
    current = (index + list.length) % list.length;
    var t = list[current], img = t.querySelector("img");
    var set = function () {
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lbTitle.textContent = t.querySelector(".cap-title").textContent;
      lbMeta.textContent = t.querySelector(".cap-meta").textContent;
      lbCount.textContent = (current + 1) + " / " + list.length;
      lbImg.classList.remove("is-swapping");
    };
    if (reduceMotion || lb.hidden) { set(); } else { lbImg.classList.add("is-swapping"); setTimeout(set, 220); }
  }

  function open(tile) {
    lastFocus = document.activeElement;
    lb.hidden = false; document.body.classList.add("lb-open");
    show(visibleTiles().indexOf(tile));
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    lb.querySelector(".lb-close").focus();
  }
  function close() {
    lb.classList.remove("is-open"); document.body.classList.remove("lb-open");
    setTimeout(function () { lb.hidden = true; }, reduceMotion ? 0 : 400);
    if (lastFocus) lastFocus.focus();
  }

  tiles.forEach(function (t) { t.querySelector(".tile-btn").addEventListener("click", function () { open(t); }); });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });

  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "Tab") { // keep focus inside the viewer
      var f = lb.querySelectorAll("button"), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  var startX = null, startY = null;
  lb.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close(); // swipe down to close
    startX = null;
  }, { passive: true });

  /* 6. Contact form opens the visitor's email app (no server needed) */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
    if (!name || !email || !msg) { note.textContent = "Please fill in your name, email and a little message."; return; }
    var to = form.getAttribute("data-email");
    var subject = "Hello from " + name;
    var body = msg + "\n\n— " + name + " (" + email + ")";
    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    note.textContent = "Your email app should open now. Thank you for writing 🌷";
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
