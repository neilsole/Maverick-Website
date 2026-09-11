# Maverick Men's Grooming Center — website

Website for the barbershop at 1 South Main Street, Natick Center, MA.

Plain HTML, CSS, and JavaScript — **no build step, no framework, no npm.**
Open `index.html` in a browser and it works. Host it anywhere for free.

```
Maverick Website/
├── index.html          ← home page: all the main content
├── gallery.html        ← photo gallery of recent haircuts
├── css/styles.css      ← all styling
├── js/main.js          ← menu toggle, "today" highlight, small touches
├── js/gallery.js       ← auto-loads photos onto gallery.html
├── favicon.svg         ← browser-tab icon
├── images/             ← photos (see images/README.md)
│   └── gallery/        ← haircut photos for gallery.html (see its README)
└── README.md           ← this file
```

---

## 1. Preview it locally

Just double-click `index.html`. That's it. The Gallery link opens `gallery.html`.

The booking window and the map load from the internet, so those need a
connection to appear.

---

## 2. Edit the content

Everything a non-developer needs to change lives in **`index.html`** as plain
text. Open it in any editor (even TextEdit / Notepad) and search for the words
you want to change.

| To change…              | Search `index.html` for | Also update                              |
|-------------------------|-------------------------|------------------------------------------|
| A service or price      | `class="menu"`          | The `hasOfferCatalog` block near the top  |
| Hours                   | `hours-table`           | `.info-strip`, the footer, and `openingHoursSpecification` near the top |
| Phone number            | `474-3492`              | Appears in several places — replace all. Also `+1-910-474-3492` in the structured-data block |
| Email                   | `bostonshaves@gmail.com`| —                                         |
| Address                 | `South Main Street`     | Footer + `PostalAddress` block            |
| Team members            | `class="team-grid"`     | —                                         |
| Booking link            | `book.daysmart.com`     | Appears 3×: the embedded iframe, the "open in a new tab" fallback, and the `potentialAction` in the structured data |

> **Heads-up on the phone number:** the site uses **(910) 474-3492**, the number
> you provided. A local news write-up listed **508-545-1141**. If the public
> number should be the 508 one, do a find-and-replace before publishing.

### Adding photos

- **Home page photos** (storefront, About, team): see
  [`images/README.md`](images/README.md).
- **Gallery photos** (recent haircuts): drop numbered files —
  `1.jpg`, `2.jpg`, `3.jpg` … — into `images/gallery/`. They appear on
  `gallery.html` automatically. Details in
  [`images/gallery/README.md`](images/gallery/README.md).

---

## 3. Publish it for free

Pick **one**. All three are free and support a custom domain
(e.g. `maverickmgc.com`) later.

### Option A — Cloudflare Pages (drag & drop, no account juggling)

1. Go to <https://pages.cloudflare.com> and sign up (free).
2. **Create a project → Direct Upload.**
3. Drag the whole `Maverick Website` folder onto the page.
4. Done — you get a `something.pages.dev` address immediately.
5. To update later: repeat the upload, or connect a GitHub repo.

### Option B — Netlify (drag & drop)

1. Go to <https://app.netlify.com/drop>.
2. Drag the `Maverick Website` folder onto the drop zone.
3. You get a live URL right away. Create a free account to keep it and add a
   custom domain.

### Option C — GitHub Pages (best if you'll use GitHub anyway)

1. Create a free GitHub account and a new **public** repository.
2. Upload all the files (keep the folder structure).
3. Repo **Settings → Pages → Build and deployment → Source: Deploy from a
   branch**, branch `main`, folder `/ (root)`, **Save**.
4. Your site appears at `https://<username>.github.io/<repo>/` in a minute or two.

### Custom domain

Once the site is live on any of the above, buy the domain (e.g. from Cloudflare
Registrar or Namecheap) and follow that host's "Add a custom domain" guide —
it's a couple of DNS records. Then update `https://maverickmgc.com/` in the
`<link rel="canonical">` and `og:url` tags in `index.html`.

---

## 4. About the embedded booking

The **Book** section embeds DaySmart's modern booking page directly:

```
https://book.daysmart.com/booking/service?DSID=DC-2291947
```

Visitors book without leaving the site. This is a different URL from the old
`maverickmgc.myonlineappointment.com` one, which forces a "you are leaving this
site" prompt and does not work inside an embed — do not use that one.

If DaySmart ever changes your booking address, update it in three places in
`index.html`: the `<iframe src="…">`, the "Open it in a new tab" link just below
it, and the `urlTemplate` inside the `potentialAction` block near the top.

The "Book Appointment" buttons in the header and footer, and the "Book a chair
below" line in the hero, all scroll down to this section.

---

## 5. Notes on the design

- **Type:** Barlow Condensed (headlines) + Source Serif 4 (text), loaded from
  Google Fonts.
- **Colour:** warm bone paper, warm near-black ink, one oxblood accent. Defined
  once as CSS variables at the top of `styles.css` — change them there and the
  whole site follows.
- Fully responsive; tested down to ~360 px wide.
- Respects "reduce motion" system settings.
