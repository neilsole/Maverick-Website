# Maverick Men's Grooming Center - website (developer notes)

> Not a developer? Open **OWNER-GUIDE.md** instead. It covers changing prices,
> hours, photos, and publishing, in plain language.

Static site. Plain HTML, CSS, and vanilla JS. No build step, no framework, no
npm, no server. Open `index.html` in a browser and it runs.

## Files

```
index.html          Home page. All the main content and the JSON-LD block.
gallery.html         Photo gallery. Header/footer duplicated from index.html;
                     its nav links point back to index.html#section.
css/styles.css       Everything. Design tokens at the top of the file.
js/main.js           Nav toggle, sticky-header hairline, "today" hours row,
                     footer year. All null-guarded so it is safe on any page.
js/gallery.js        Builds the gallery (see below).
favicon.svg          Tab icon.
images/
  storefront.jpg       Home hero. 576x1024, CSS-cropped to 3:4.
  daniel-at-work.png   Home "About". 402x314, CSS-cropped to 4:3.
  team-daniel.jpg      Placeholder - not added yet.
  team-greg.jpg        Placeholder - not added yet.
  og-image.jpg         Not added. og:image currently points at storefront.jpg.
  gallery/1.jpg..12.jpg  Gallery photos, numbered.
OWNER-GUIDE.md       Plain-language guide for the shop.
```

## CSS

- Design tokens (colour, spacing, shadow, easing) are CSS custom properties on
  `:root` at the top of `styles.css`. Change the palette there.
- Palette: warm bone paper, warm near-black ink, one oxblood accent (`--accent`).
- Type: Barlow Condensed (display) + Source Serif 4 (body), from Google Fonts.
- Layout primitives: `.wrap` (max-width + gutter), `.section` (vertical rhythm +
  top hairline), `.frame` (padded card around photos and iframes), `.btn`
  (`.btn-accent` / `.btn-outline` / `.btn-on-dark`, plus `.btn-sm`).
- Breakpoints in use: 460, 560, 620, 900, 980 px. All grids use
  `minmax(0, 1fr)` to stay blowout-proof. `body` has `overflow-x: hidden` as a
  backstop.
- Footer grid: 1 col, then 2 at 620, then 4 at 900. It went 4-up too early once
  and the email address forced a sideways scroll around 700 px; keep it 2-up
  until there is room for the address.

## Gallery (`js/gallery.js`)

- Probes `images/gallery/1`, `2`, `3` ... trying extensions `jpg, jpeg, png,
  webp`. Stops after 4 consecutive missing numbers (`STOP_AFTER_MISSES`).
- Reuses the probe `Image` object in the DOM, so each photo downloads once.
- Layout is a JS masonry: 1 / 2 / 3 columns at 560 / 980 px, and each photo goes
  into whichever column is currently shortest (estimated from aspect ratio, no
  DOM measurement). Re-runs on resize.
- No manifest to maintain. To add photos, drop in `13.jpg`, `14.jpg` ...
- Current set: `1`-`10` finished cuts (portrait), `11`-`12` action shots
  (landscape). Several sources are only 225x300 and look soft enlarged; ask the
  shop for full-res versions if it bothers you.
- Images were normalised with Pillow: `ImageOps.exif_transpose`, long edge
  capped at 1400, re-saved q85 progressive.

## Booking

Embed URL (in `index.html` x3: the `<iframe src>`, the "open in a new tab"
fallback link, and the JSON-LD `potentialAction` `urlTemplate`):

```
https://book.daysmart.com/booking/service?DSID=DC-2291947
```

Do **not** use `maverickmgc.myonlineappointment.com`. It redirects through a
session check, needs third-party cookies (fails in an iframe on Safari/iOS), and
shows a "you are leaving this site" prompt. `book.daysmart.com` embeds cleanly.

## Local preview and screenshots

- Preview: double-click `index.html`. The booking iframe and the map need an
  internet connection.
- Headless Chrome `--window-size` below ~500 px is unreliable on this machine
  (it clamps the window and crops the screenshot, which looks like overflow when
  the layout is fine). For real phone widths, drive Chrome over the DevTools
  Protocol with `Emulation.setDeviceMetricsOverride` (`mobile: true`). Launch
  Chrome with `--remote-allow-origins=*`.
- `pip install pillow websocket-client` if the screenshot scripts need it.

## Loose ends

- **Phone number:** the site now uses **508-545-1141** (matches the storefront
  door and the Natick Report piece). The old (910) number is gone.
- `og-image.jpg`: add a 1200x630 image and repoint `og:image` for nicer link
  previews. Right now it uses the portrait `storefront.jpg`.
- Team headshots (`team-daniel.jpg`, `team-greg.jpg`) are still placeholder
  blocks in the About section.
- `<link rel="canonical">` and `og:url` use `https://maverickmgc.com/`. Update
  them when the real domain is live.

## Publishing

See the "Publish" section of **OWNER-GUIDE.md** for step-by-step host setup
(Cloudflare Pages, Netlify, or GitHub Pages). Any static host works; upload the
folder as-is.
