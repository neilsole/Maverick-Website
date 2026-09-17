# Updating the Maverick website

This guide is for the shop. No coding needed. The website is just a folder of
files on your computer. To change something you open a file, edit the text, save
it, and upload the folder to your host. There is no login, no monthly software,
and no dashboard.

If you get stuck, call your developer. Nothing you type here can break the live
website until you upload it, and you can always undo with Ctrl+Z.

---

## 1. What you need

- **The website folder** (this one: `Maverick-Website`).
- **A text editor.** Notepad works in a pinch. Better and still free:
  [Notepad++](https://notepad-plus-plus.org/) or
  [VS Code](https://code.visualstudio.com/). Open a file by right-clicking it and
  choosing "Open with".
- The file you will edit most is **`index.html`**. It holds all the words on the
  home page.

## 2. See your changes before you publish

Double-click **`index.html`**. It opens in your web browser and looks just like
the real site. Edit `index.html`, save, then refresh the browser tab to see the
change. The booking box and the map only appear when you are online.

## 3. Find the thing you want to change

In your editor press **Ctrl+F** and type a word or number that is near what you
want to change. The tables below tell you what to search for.

### Prices

| Search `index.html` for | Then |
|---|---|
| `$43` (or `$30`, `$25`, `$65`, `$35`) | Change the number. |

There is a second copy of every price near the top of the file, inside a block
that starts with `application/ld+json`. That copy is only used by Google. If you
want your Google listing to show the new price too, search for `43.00` and change
it there as well. Otherwise you can skip it.

### Service names and the little notes under them

| Search for | Example |
|---|---|
| `Men's Cut` , `Buzz Cut` , `Beard Trim` , etc. | Change the words. |
| `Includes shampoo and neck shave` | This is the grey note under a service. |

### Hours

Hours appear in a few spots, all in `index.html` except the footer line, which
is repeated at the bottom of every page. Change them all so they match:

1. In `index.html`, search `9:00 am` - this is the full hours table further
   down the page (one row per day, `Closed` for the days you're not open).
2. In `index.html`, search `Tue` - the first match is the short line under the
   welcome (`Tue-Fri 9-6 ...`).
3. Search `Tue` again in `index.html`, and the same text in `gallery.html`,
   `privacy.html`, `terms.html`, and `404.html` - that's the footer line
   (`Tue-Fri: 9 am - 6 pm ...`), and it needs to match on every page.

You may see `&ndash;` in the text. That is just a dash. Leave it, or replace it
with a plain `-`. Both work.

There is also a Google-only copy near the top (search `openingHoursSpecification`
and `"opens"` / `"closes"`, written in 24-hour time like `"18:00"`). Optional.

The "Today" marker on the hours table updates itself, so you only need to fix the
words.

### Phone number

The number appears many times, in two forms, and now across **every** `.html`
file in the folder (`index.html`, `gallery.html`, `privacy.html`, `terms.html`,
`404.html`). Use your editor's **Replace All** (usually Ctrl+H) and run it once
per file, or use a "replace in all files" option if your editor has one:

| Find | Replace with |
|---|---|
| `(508) 545-1141` | your new number, same style, e.g. `(508) 555-0000` |
| `+15085451141` | `+1` then your number with no spaces, dashes, or brackets: `+15085550000` |
| `+1-508-545-1141` | `+1-508-555-0000` (this one is in the Google block near the top of `index.html`) |

### Email

Search `bostonshaves@gmail.com` and change it everywhere it appears. It shows
up in `index.html`, `gallery.html`, `privacy.html`, `terms.html`, and `404.html`.

### The welcome text and the "About" paragraph

Search `Welcome to Maverick` for the big headline, or `Located at The Block` for
the About paragraph. Just type over the words. Keep it warm and plain, the way it
reads now.

## 4. Photos

All photos live in the **`images`** folder.

### The storefront photo (home page) and the "Daniel at the chair" photo

Replace the file and **keep the exact same file name**:

- Storefront: `images/storefront.jpg`
- Daniel: `images/daniel-at-work.png`

The page crops them to fit, so any normal photo works. Upright phone photos are
fine.

### The two barber headshots

Right now these show a placeholder box. To add a real photo:

1. Put a square-ish head-and-shoulders photo in the `images` folder named
   `team-daniel.jpg` and `team-greg.jpg`.
2. Open `index.html`, search for `team-daniel`. Just above the placeholder there
   is a line in grey that begins with `<!-- Replace with:` and shows the exact
   line to paste in. Follow it, or ask your developer to do this one.

### The gallery of haircuts

Open **`images/gallery`**. The photos in there are named `1.jpg`, `2.jpg`,
`3.jpg`, and so on. They show up on the Gallery page automatically, in number
order.

- **Add photos:** keep counting up. The next ones are `13.jpg`, `14.jpg`, ...
- **Change the order:** rename the files. `1.jpg` shows first.
- **Remove a photo:** delete the file, then rename the ones after it so there is
  no gap bigger than 3 numbers.
- **Best results:** use JPG files, landscape or portrait both fine, roughly
  1200 pixels on the long side, and try to keep each file under about 250 KB so
  the page loads fast.

## 5. The booking link

Booking is handled by DaySmart and shown right on the page. If DaySmart ever
gives you a new booking web address, open `index.html` and search for
`book.daysmart.com`. Replace the address in all three places you find it. Then
you are done.

## 6. Legal pages (Privacy Policy & Terms)

Two extra pages, `privacy.html` and `terms.html`, are linked at the very
bottom of every page's footer. They're plain text, edited the same way as
anything else here (open, find the words, type over them). If a lawyer ever
gives you replacement wording, you can paste it over the paragraphs in those
two files. There's also a `404.html` page people land on if a link is
mistyped or broken — usually nothing to touch there.

## 7. Publish your changes to the live site

Your developer set up one of these when the site went live. Use whichever one
they told you.

**Cloudflare Pages or Netlify (drag and drop):**

1. Go to your host's dashboard and sign in.
2. Find your site and open its "Deployments" or "Deploys" area.
3. Drag the whole `Maverick-Website` folder onto the upload area.
4. Wait about a minute. The live site updates itself.

**GitHub:**

1. Open GitHub Desktop.
2. It lists the files you changed. Type a short note like "updated prices" in the
   Summary box and click "Commit to main".
3. Click "Push origin". The live site updates in a minute or two.

## 8. If something looks wrong

- The **live website is unchanged** until you upload. Take your time.
- In your editor, **Ctrl+Z** undoes your last changes.
- If a file is in a mess, get a fresh copy from your developer or from GitHub and
  start over.
- Refresh the browser with **Ctrl+Shift+R** to make sure you are not seeing an
  old cached version.

## 9. What not to touch

- The **`css`** and **`js`** folders. That is the layout and the behaviour.
- Anything inside angle brackets like `<span class="...">`. Edit the words
  between the brackets, not the brackets themselves.
- The `application/ld+json` block near the top of `index.html`, unless you are
  deliberately updating your Google listing info.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `favicon.ico`, `favicon.svg`,
  and the `images/icons` folder. These are quiet technical files for search
  engines and browser tabs/home-screen icons — nothing on the page changes if
  you leave them alone. Only touch `sitemap.xml` if your domain name changes.

## 10. Help

Call your developer. Tell them which file you changed and what you were trying to
do. If you can, send them the folder so they can see exactly what you see.
