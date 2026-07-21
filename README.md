# UV Sterile — Brand & Website

A complete brand identity and 12-page website for UV Sterile Australia: hospital-grade UV-C sanitisation services based in Noosa Heads, QLD, servicing nationally.

---

## Brand

**Name:** UV Sterile
**Tagline:** *Light that cleans where chemicals can't.*
**Voice:** Confident, scientific, plain-spoken Australian. Authority without arrogance. Tech-literate without jargon.

### Logo
Geometric aperture mark — a UV emission target. Renders crisply at any size, monochrome to inherit the surrounding theme. SVG at `assets/logo.svg`.

### Colour Palette
| Role | Hex | Use |
|---|---|---|
| Ink (primary) | `#0B0E1A` | Body text, dark surfaces, primary buttons |
| Ink-2 | `#1A1E33` | Gradient surfaces |
| Paper | `#F5F2EB` | Default background — warm off-white |
| Paper-2 | `#EDE8DC` | Alternating section background |
| UV (accent) | `#6B3FFF` | Brand violet — accents, CTAs on dark |
| UV-Glow | `#8B6BFF` | Hover states |
| Cyan (signal) | `#00E5FF` | Active indicator dot, signal light |

The colour direction deliberately avoids cliché purple-on-white gradients. Warm off-white paper grounds the violet so it reads scientific, not synthetic.

### Typography
- **Display:** Fraunces (variable serif — optical size, softness, wonk axes used for character)
- **Body:** Geist Sans (modern technical neutral)
- **Mono / labels:** Geist Mono (specs, eyebrow tags, data callouts)

Italic display headings use Fraunces' WONK axis for that signature *character* word treatment seen across the site.

### Layout & Motion
Editorial grid with restrained density. Sections breathe. One signature animation: a slow violet halo pulsing behind the device illustration in the hero, with shimmer rays. Scroll-triggered fades on section reveals. Hover states on all interactive elements.

---

## Pages

| Page | Path | Purpose |
|---|---|---|
| Home | `index.html` | Hero, USPs, tech specs, services, FAQ, locations |
| About | `about.html` | Mission, principles, origin |
| Contact | `contact.html` | Phone, email, form |
| Book | `book.html` | Treatment booking form |
| Buy a Unit | `machines.html` | Sterile-Bright™ purchase enquiry |
| Noosa | `locations/noosa.html` | Local SEO — home turf |
| Sunshine Coast | `locations/sunshine-coast.html` | Local SEO — region |
| Maroochydore | `locations/maroochydore.html` | Local SEO |
| Caloundra | `locations/caloundra.html` | Local SEO |
| Brisbane | `locations/brisbane.html` | Local SEO |
| Gold Coast | `locations/gold-coast.html` | Local SEO |
| Australia-wide | `locations/australia.html` | National service page |

Plus `sitemap.xml`, `robots.txt` for search engines.

---

## SEO

- Unique `<title>` and `<meta description>` on every page targeting local keywords (e.g. "UV Sanitisation Noosa Heads")
- Canonical URLs
- Open Graph + Twitter Card tags
- `LocalBusiness` schema.org JSON-LD on home + all location pages, with `areaServed` matched per page
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Heading hierarchy: one H1 per page
- Clean URL structure, no query strings
- `sitemap.xml` + `robots.txt`
- Fast: no JS frameworks, no external trackers, ~1 font request, CSS-only animations

---

## Mobile

- Fluid type (`clamp()`) across all headings
- Sticky nav becomes off-canvas drawer on screens < 860px
- Floating "Book ↗" pill appears on mobile only — always one tap to booking
- All grids collapse gracefully to single column
- Tap targets > 44px
- `prefers-reduced-motion` respected

---

## Contact details wired throughout

- **Phone:** 0417 631 743 — `tel:+61417631743` links everywhere
- **Email:** uvsterileaustralia@gmail.com — `mailto:` links + form fallback uses `mailto:` action
- **Location:** Noosa Heads, QLD

All forms have a `data-mailto` attribute; on submit, content is composed into a `mailto:` link with subject and body. For production, swap to a form backend (Formspree, Netlify Forms, or a small serverless function).

---

## Deploy

Static site — drop the `uv-sanitise/` folder onto any host:
- Netlify / Vercel / Cloudflare Pages: drag-and-drop or git connect
- AWS S3 + CloudFront: upload as static site
- Any shared hosting: FTP the folder to public_html

No build step. No dependencies. No JavaScript framework. Total page weight per route < 50 KB excluding fonts.

---

## File tree

```
uv-sanitise/
├── index.html              # Home
├── about.html
├── contact.html
├── book.html
├── machines.html           # Unit purchase enquiry
├── sitemap.xml
├── robots.txt
├── css/styles.css          # Full design system
├── js/main.js              # Nav, reveal, form mailto
├── assets/logo.svg
└── locations/
    ├── noosa.html
    ├── sunshine-coast.html
    ├── maroochydore.html
    ├── caloundra.html
    ├── brisbane.html
    ├── gold-coast.html
    └── australia.html
```
