/* =========================================================================
   Maverick Men's Grooming Center — gallery.js
   -------------------------------------------------------------------------
   Fills #galleryGrid from images/gallery/ with no build step and no server.

   HOW TO ADD PHOTOS
     Drop numbered image files into images/gallery/ :
       1.jpg, 2.jpg, 3.jpg, 4.jpg ...
     Number them in order with no gaps. JPG is best (also accepts .jpeg,
     .png, .webp). Any shape works; around 1200 px on the long edge and
     under ~250 KB each keeps the page fast.

   The script loads 1, 2, 3 ... in order, stops after a few missing numbers
   in a row, and lays the photos out in a balanced masonry grid.
   ========================================================================= */
(function () {
  "use strict";

  var grid = document.getElementById("galleryGrid");
  if (!grid) return;

  var note = document.getElementById("galleryNote");

  var BASE = "images/gallery/";
  var EXTS = ["jpg", "jpeg", "png", "webp"];
  var MAX = 300;              // hard ceiling, just in case
  var STOP_AFTER_MISSES = 4;  // consecutive missing numbers => stop looking
  var BATCH = 6;              // how many to check at once

  var nextIndex = 1;
  var misses = 0;
  var hits = [];              // { url, img } in numeric order

  /* ---- find the files ------------------------------------------------- */

  // Resolve to { url, img } if images/gallery/<i>.<ext> exists, else null.
  function probe(i) {
    return new Promise(function (resolve) {
      var e = 0;
      (function tryNext() {
        if (e >= EXTS.length) { resolve(null); return; }
        var img = new Image();
        var url = BASE + i + "." + EXTS[e];
        img.onload = function () { resolve({ url: url, img: img }); };
        img.onerror = function () { e++; tryNext(); };
        img.src = url;
      })();
    });
  }

  function runBatch() {
    var jobs = [];
    for (var k = 0; k < BATCH && nextIndex <= MAX && misses < STOP_AFTER_MISSES; k++) {
      jobs.push(probe(nextIndex++));
    }

    if (!jobs.length) { done(); return; }

    // Promise.all keeps results in ascending order, and each batch finishes
    // before the next starts, so `hits` stays in numeric order.
    Promise.all(jobs).then(function (results) {
      results.forEach(function (r) {
        if (r) { misses = 0; hits.push(r); }
        else { misses++; }
      });
      layout();
      if (misses >= STOP_AFTER_MISSES || nextIndex > MAX) done();
      else runBatch();
    });
  }

  function done() {
    if (note && hits.length === 0) {
      note.textContent = "Photos coming soon.";
      note.hidden = false;
    }
  }

  /* ---- masonry layout ---------------------------------------------------
     Split into 1 / 2 / 3 columns by width and drop each photo into the
     column that is currently shortest, so the columns stay even. */

  function columnCount() {
    if (window.matchMedia("(min-width: 980px)").matches) return 3;
    if (window.matchMedia("(min-width: 560px)").matches) return 2;
    return 1;
  }

  var laidOutCols = 0;

  function buildItem(hit, n) {
    var fig = document.createElement("figure");
    fig.className = "gallery-item";

    var link = document.createElement("a");
    link.href = hit.url;
    link.target = "_blank";
    link.rel = "noopener";

    var img = hit.img;
    img.className = "gallery-img";
    img.loading = "lazy";
    img.decoding = "async";
    // Each photo gets a distinct alt (not just repeated identical text) so
    // screen-reader and search users can tell the images apart.
    img.alt = "Haircut example " + n + " from Maverick Men's Grooming Center";
    if (img.naturalWidth) {
      img.setAttribute("width", img.naturalWidth);
      img.setAttribute("height", img.naturalHeight);
    }

    link.appendChild(img);
    fig.appendChild(link);
    return fig;
  }

  function layout() {
    var cols = columnCount();

    // Rebuild the column boxes only when the count changes.
    if (cols !== laidOutCols) {
      grid.textContent = "";
      grid.style.setProperty("--gallery-cols", cols);
      for (var i = 0; i < cols; i++) {
        var col = document.createElement("div");
        col.className = "gallery-col";
        grid.appendChild(col);
      }
      laidOutCols = cols;
    }

    var boxes = grid.querySelectorAll(".gallery-col");
    var heights = new Array(cols).fill(0);
    // Account for photos already placed (only matters while batches stream in).
    for (var c = 0; c < cols; c++) {
      boxes[c].querySelectorAll(".gallery-img").forEach(function (im) {
        heights[c] += ratioHeight(im);
      });
    }

    var placed = grid.querySelectorAll(".gallery-item").length;
    for (var h = placed; h < hits.length; h++) {
      var shortest = heights.indexOf(Math.min.apply(null, heights));
      var item = buildItem(hits[h], h + 1);
      boxes[shortest].appendChild(item);
      heights[shortest] += ratioHeight(item.querySelector(".gallery-img"));
    }
  }

  // Approximate on-screen height as an aspect ratio (column width cancels out),
  // so we can balance columns without measuring the DOM.
  function ratioHeight(img) {
    var w = img.naturalWidth || 4;
    var h = img.naturalHeight || 3;
    return h / w + 0.04; // +frame/border/gap fudge
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 150);
  });

  runBatch();
})();
