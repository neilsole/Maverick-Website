/* =========================================================================
   Maverick Men's Grooming Center — main.js
   Small, dependency-free progressive enhancements:
     1. Mobile navigation toggle
     2. Header hairline on scroll
     3. Highlight today's row in the hours table
     4. Current year in the footer
   ========================================================================= */
(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var nav = document.getElementById("siteNav");
  var toggle = document.getElementById("navToggle");

  /* ---- 1. Mobile navigation ---------------------------------------- */
  function closeNav() {
    header.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  function openNav() {
    header.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  }

  if (toggle && nav && header) {
    toggle.addEventListener("click", function () {
      if (header.classList.contains("nav-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close after tapping a link
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    // Reset when resizing up to desktop
    var desktop = window.matchMedia("(min-width: 900px)");
    desktop.addEventListener("change", function (ev) {
      if (ev.matches) closeNav();
    });
  }

  /* ---- 2. Header hairline on scroll ------------------------------- */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 3. Highlight today's hours -------------------------------- */
  var todayRow = document.querySelector(
    '.hours-table tr[data-day="' + new Date().getDay() + '"]'
  );
  if (todayRow) todayRow.classList.add("is-today");

  /* ---- 4. Footer year ------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
