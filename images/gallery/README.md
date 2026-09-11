# Gallery photos

Photos in this folder show up automatically on **gallery.html**. No code to edit.

Right now there are 12 photos, named `1.jpg` through `12.jpg`.

## How to add or change photos

1. Name files with plain numbers, in order, no gaps: `1.jpg`, `2.jpg`, `3.jpg` ...
2. Drop them in this folder (`images/gallery/`).
3. Refresh gallery.html. Photos show in number order, so put the ones you want
   seen first as `1.jpg`, `2.jpg`, and so on.

To add more, keep counting up: `13.jpg`, `14.jpg` ...
To remove one, delete its file and renumber the rest so there is no gap larger
than 3 (a bigger gap makes the gallery stop early).

## Format

- **JPG**. `.jpeg`, `.png`, and `.webp` also work, but `.jpg` loads fastest.
- Any shape is fine. The gallery is a masonry layout, so portrait and landscape
  photos both show in full without cropping.
- Around **1200 px on the long edge** and **under ~250 KB** each is plenty.
  Bigger files just slow the page down; smaller than ~600 px looks soft.
- Use real photos of real haircuts done at the shop.

## Want to control it by hand instead?

The settings live at the top of `js/gallery.js`. Or drop the auto-loader and put
plain `<figure class="gallery-item"><a ...><img class="gallery-img" ...></a></figure>`
blocks straight into `gallery.html`.
