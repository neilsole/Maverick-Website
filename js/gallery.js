/* =========================================================================
   Maverick Men's Grooming Center — gallery.js
   -------------------------------------------------------------------------
   Fills #galleryGrid from images/gallery/ with no build step and no server.

   HOW TO ADD PHOTOS
     Drop numbered image files into images/gallery/ :
       1.jpg, 2.jpg, 3.jpg, 4.jpg ...
     Number them in order with no gaps. JPG is best (also accepts .jpeg,
     .png, .webp). Around 1024x768 and under ~250 KB each keeps the page fast.

   The script loads 1, 2, 3 ... in order and stops after it hits a few
   missing numbers in a row, so you never have to edit this file.
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
  var found = 0;

  // Resolve to { index, img } if images/gallery/<i>.<ext> exists, else null.
  function probe(i) {
    return new Promise(function (resolve) {
      var e = 0;
      (function tryNext() {
        if (e >= EXTS.length) { resolve(null); return; }
        var img = new Image();
        var url = BASE + i + "." + EXTS[e];
        img.onload = function () { resolve({ index: i, img: img, url: url }); };
        img.onerror = function () { e++; tryNext(); };
        img.src = url;
      })();
    });
  }

  function append(hit) {
    var fig = document.createElement("figure");
    fig.className = "gallery-item";

    var link = document.createElement("a");
    link.href = hit.url;
    link.target = "_blank";
    link.rel = "noopener";

    hit.img.className = "gallery-img";
    hit.img.loading = "lazy";
    hit.img.decoding = "async";
    hit.img.alt = "Haircut by Maverick Men's Grooming Center";

    link.appendChild(hit.img);
    fig.appendChild(link);
    grid.appendChild(fig);
    found++;
  }

  function runBatch() {
    var jobs = [];
    for (var k = 0; k < BATCH && nextIndex <= MAX && misses < STOP_AFTER_MISSES; k++) {
      jobs.push(probe(nextIndex++));
    }

    if (!jobs.length) { finish(); return; }

    // Promise.all keeps results in ascending order, and each batch finishes
    // before the next starts, so photos land in the grid in numeric order.
    Promise.all(jobs).then(function (results) {
      results.forEach(function (r) {
        if (r) { misses = 0; append(r); }
        else { misses++; }
      });
      if (misses >= STOP_AFTER_MISSES || nextIndex > MAX) finish();
      else runBatch();
    });
  }

  function finish() {
    if (!note) return;
    if (found === 0) {
      note.textContent = "Photos coming soon.";
      note.hidden = false;
    }
  }

  runBatch();
})();
