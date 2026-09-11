# Gallery photos

Photos in this folder show up automatically on **gallery.html**. No code to edit.

## How to add photos

1. Name the files with plain numbers, in order, no gaps:

   ```
   1.jpg
   2.jpg
   3.jpg
   4.jpg
   ...
   ```

2. Drop them in this folder (`images/gallery/`).
3. Refresh gallery.html. Photos show in number order, so put the ones you want
   seen first as `1.jpg`, `2.jpg`, and so on.

To remove a photo, delete its file and renumber the ones after it so there is
no gap (a gap of more than 3 numbers makes the gallery stop early).

## Format

- **JPG** is best. `.jpeg`, `.png`, and `.webp` also work.
- Aim for about **1024 x 768** (landscape) and **under ~250 KB** each so the
  page stays fast. The gallery crops each image to a 4:3 tile, so landscape
  shots look best.
- Use real photos of real haircuts done at the shop.

## Want to control it by hand instead?

Open `js/gallery.js` for the settings, or replace the auto-loader by putting
plain `<figure class="gallery-item">` blocks straight into `gallery.html`.
