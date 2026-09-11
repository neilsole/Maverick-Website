# Photos

Real photos of the actual shop, barbers, and Natick Center storefront only.
No stock imagery.

## In use now

| File                 | Where it shows        | Current size | Notes                                   |
|----------------------|-----------------------|--------------|-----------------------------------------|
| `storefront.jpg`     | Home hero + link previews | 576 x 1024 | Cropped to a 3:4 portrait on the page   |
| `daniel-at-work.png` | Home "About" section  | 402 x 314    | Cropped to a 4:3 tile on the page       |

To swap either one, just replace the file (keep the same name) or edit the
`<img src="…">` in `index.html`.

## Still placeholder (optional to add)

| File            | Where it shows        | Suggested size     | Notes                       |
|-----------------|-----------------------|--------------------|-----------------------------|
| `team-daniel.jpg` | About - Meet the team | 700 x 700 (square) | Head-and-shoulders          |
| `team-greg.jpg`   | About - Meet the team | 700 x 700 (square) | Head-and-shoulders          |
| `og-image.jpg`    | Link previews         | 1200 x 630         | Optional; replaces the storefront for social previews. If you add it, point `og:image` in `index.html` at it. |

When you add a team photo, open `index.html`, find the matching `photo-ph`
placeholder (there is a comment above it with the exact `<img>` tag to paste).

## Gallery

Haircut photos for **gallery.html** live in [`gallery/`](gallery/), named
`1.jpg`, `2.jpg`, `3.jpg` ... They load automatically in a masonry layout (any
shape works). See the README in that folder to add or reorder them.

## Tips

- Export as JPG, quality ~80%, aim for under ~300 KB each.
- Bigger source images are fine; the browser scales them down. Very large files
  just slow the first load.
