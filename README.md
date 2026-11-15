# Chidinma — Photography Portfolio

Your own little website. Every file lives in this folder, so it's yours forever.
No apps, no accounts, nothing to install.

---

## 1. Open the site

Double-click **`index.html`**. It opens in your web browser (Chrome, Safari, Edge…).

That's it. (The fancy fonts load from Google when you're online. Offline, it still works with backup fonts.)

---

## 2. Put in your photos

All your photos go in the **`images`** folder (not inside `images/placeholders`).

Name each photo exactly like this, and it shows up automatically:

| Spot on the site | File name to use |
|---|---|
| Big photo on the first screen | `hero.jpg` |
| Your photo in the About section | `about.jpg` |
| Places (5 photos) | `places-01.jpg` … `places-05.jpg` |
| People (5 photos) | `people-01.jpg` … `people-05.jpg` |
| Friends (5 photos) | `friends-01.jpg` … `friends-05.jpg` |

Until a photo is there, the site shows a soft pink placeholder with that file name on it,
so you always know which name goes where.

Tips:
- Use **.jpg** files, with the name in lowercase, exactly as above.
- Keep each photo around **2000 px wide or smaller** so the site loads fast
  (free tool: https://squoosh.app).
- Tall, wide and square photos all work. The grid fits them in.
- You don't need to delete the `placeholders` folder. It's only used when a photo is missing.

**Want more than 15 photos?** In `index.html`, copy one whole `<figure class="tile" ...> … </figure>` block,
paste it below, and change the file names (for example `places-06.jpg`) and the words.
Set `data-category` to `places`, `people` or `friends` so the filter buttons pick it up.

---

## 3. Change the words

Open **`index.html`** in any text editor (TextEdit, Notepad, or the free VS Code), change the words, save, and refresh the browser.

- **Tagline** (first screen): find `Small moments,`
- **Photo titles and places**: each photo has a `cap-title` (the title) and a `cap-meta` (the place or moment).
- **Alt text**: the `alt="..."` on each photo is a short description for people using screen readers. Describe what's in your real photo.
- **About me**: find `Hi, I’m Chidinma.` and rewrite the paragraphs below it.
- **Email**: search for `favourcharlessidequest@gmail.com`. It appears 3 times (the link text, the `mailto:` link, and the form's `data-email`). Change all 3 if you switch emails.
- **Instagram**: search for `takenbyfave`.

Colours are at the very top of `css/style.css` (`--rose`, `--cream`, and so on) if you ever want a different mood.

---

## 4. Put it online for free (whenever you're ready)

**Easiest: Netlify Drop**
1. Go to https://app.netlify.com/drop
2. Drag the whole `chidinma-portfolio` folder onto the page.
3. You get a live link in seconds. Make a free account to keep it and pick a nicer name (for example `chidinma.netlify.app`).
4. To update it later, drag the folder in again.

**Or: GitHub Pages**
1. Make a free account at https://github.com and create a new repository (for example `dinmaelle`).
2. Click "uploading an existing file" and drag in everything *inside* this folder (`index.html`, `css`, `js`, `images`, `README.md`).
3. Go to **Settings → Pages**, choose branch `main` and folder `/ (root)`, then save.
4. Your site appears at `https://YOUR-USERNAME.github.io/dinmaelle/` within a few minutes.

---

## What's inside

```
chidinma-portfolio/
├── index.html          ← all the words and the photo list
├── css/style.css       ← colours, fonts, layout
├── js/main.js          ← filters, photo viewer, fade-ins, contact form
├── images/             ← put your .jpg photos here
│   └── placeholders/   ← soft stand-ins shown until your photos are added
└── README.md           ← this guide
```

Good to know:
- The contact form doesn't need a server. It opens the visitor's email app with their message ready to send to you.
- In the photo viewer you can use the arrow keys, swipe on a phone, press Esc, or swipe down to close.
- If someone's device is set to "reduce motion", the site turns off the animations for them.
