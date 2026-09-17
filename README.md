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
privacy.html         Privacy Policy. Linked from every page's footer.
terms.html           Terms of Service. Linked from every page's footer.
404.html             Custom not-found page. Filename convention picked up
                     automatically by GitHub Pages, Cloudflare Pages, Netlify.
css/styles.css       Everything. Design tokens at the top of the file.
js/main.js           Nav toggle, sticky-header hairline, "today" hours row,
                     footer year. All null-guarded so it is safe on any page.
js/gallery.js        Builds the gallery (see below).
favicon.svg          Tab icon (source of truth - the PNGs below are rendered
                     from it).
favicon.ico          16/32/48 multi-res fallback for old browsers/crawlers.
site.webmanifest     Name, theme colour, icons for "Add to Home Screen".
robots.txt           Allows all crawlers, points at sitemap.xml.
sitemap.xml          Lists the 4 real pages. Update if the domain changes.
images/
  icons/               favicon-16.png, favicon-32.png, apple-touch-icon.png
                       (180x180), icon-192.png, icon-512.png. All rendered
                       from favicon.svg - regenerate from that file, don't
                       hand-edit these.
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
- `--ink-faint` is `#6a635c`, not the more obvious lighter taupe - it was
  darkened from `#8a8279` because the lighter value only hit ~3.3:1 contrast
  on the paper background (fails WCAG AA's 4.5:1 for normal text) and it's
  used for real content (service sub-notes, captions, `.gallery-note`), not
  just decoration. Keep any future edit to this token at 4.5:1+ on both
  `--paper` and `--paper-alt`.
- `.section-head h1` is sized to match `.section-head h2` (`gallery.html`,
  `privacy.html`, `terms.html`, and `404.html` each have exactly one real
  `<h1>` as their page heading, styled to look the same as every other
  section header). `index.html`'s only `<h1>` is the hero headline.

## Gallery (`js/gallery.js`)

- Probes `images/gallery/1`, `2`, `3` ... trying extensions `jpg, jpeg, png,
  webp`. Stops after 4 consecutive missing numbers (`STOP_AFTER_MISSES`).
- Reuses the probe `Image` object in the DOM, so each photo downloads once.
- Layout is a JS masonry: 1 / 2 / 3 columns at 560 / 980 px, and each photo goes
  into whichever column is currently shortest (estimated from aspect ratio, no
  DOM measurement). Re-runs on resize.
- No manifest to maintain. To add photos, drop in `13.jpg`, `14.jpg` ...
- `alt` text is generated per photo (`"Haircut example N from Maverick Men's
  Grooming Center"`, `N` = the file number) so screen readers don't hit 12
  identical strings. It's still generic - if you ever add real captions,
  wire them up here instead of hand-editing generated `<img>` tags.
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

## Legal pages

`privacy.html` and `terms.html` are real, specific to this site (not
boilerplate filler): they disclose the DaySmart booking embed and the Google
Maps embed by name and link out to DaySmart's and Google's own privacy
policies, and they deliberately do **not** invent a cancellation/no-show
policy since we don't actually know the shop's real one - that paragraph
points people to call the shop instead. Both are linked in every footer and
listed in `sitemap.xml` with `<meta name="robots" content="noindex, follow">`
(indexed pages shouldn't be the policy pages). If the shop gets real
lawyer-reviewed text later, drop it into the `.legal-content` block in each
file - the styling is already there.

## Loose ends

- **Phone number:** the site now uses **508-545-1141** (matches the storefront
  door and the Natick Report piece). The old (910) number is gone.
- `og-image.jpg`: add a 1200x630 image and repoint `og:image` (now set in all
  5 pages) for nicer link previews. Right now it uses the portrait
  `storefront.jpg`, which is a poor crop for OG's ~1.91:1 expectation.
- Team headshots (`team-daniel.jpg`, `team-greg.jpg`) are still placeholder
  blocks in the About section.
- `<link rel="canonical">`, `og:url`, `robots.txt`, and `sitemap.xml` all use
  `https://maverickmgc.com/`. Update all four when the real domain is live.
- `favicon.svg` is the source of truth for every icon. If you change it,
  regenerate `favicon.ico` and everything in `images/icons/` from it (headless
  Chrome screenshot at each pixel size, or any SVG-to-PNG tool) rather than
  editing the PNGs by hand.

## Publishing

See the "Publish" section of **OWNER-GUIDE.md** for step-by-step host setup
(Cloudflare Pages, Netlify, or GitHub Pages). Any static host works; upload the
folder as-is.
