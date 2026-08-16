# SEO Agent Log — uvsterile.com.au

Reverse-chronological (newest first). One entry per weekly run. This file is the agent's only memory between runs.

---

## 2026-08-16 — Run 1 (first run)

### Researched

- **Keyword clusters sampled this run:** "UV sanitisation Noosa Heads", "mould treatment Noosa / Sunshine Coast", "UV disinfection aged care Sunshine Coast QLD", plus a branded check on `uvsterile.com.au`. Also pulled "people also ask" style questions around UV-C efficacy (does UV kill mould, how long does UV-C take).
- **Not yet checked (rotate to these next runs):** fleet vehicle sanitisation Brisbane, UV disinfection Gold Coast hotels, become a UV cleaning reseller Australia, end-of-lease sanitisation Sunshine Coast, childcare/school UV disinfection QLD, HVAC UV sanitisation Brisbane, odour removal / post-flood clusters, Maroochydore and Caloundra local terms.

### Found

- **uvsterile.com.au did not surface on page 1 for any sampled cluster.** Important caveat on this finding: the search tool available to this agent is US-geolocated, so it does not reproduce what an Australian searcher sees for local queries. Treat "not ranking" as unconfirmed, not established. The owner's Google Search Console is the authoritative source and this agent cannot access it — see "Needs owner input".
- **Could not fetch the live site.** `https://uvsterile.com.au` is blocked by this environment's network egress proxy (403 at the CONNECT tunnel), so live rendering, response headers, indexing status and Core Web Vitals could not be verified this run. All findings below were verified against the repository source instead, which is what actually deploys.
- **Competitors ranking for the mould cluster** (Mould Medico, Electrodry, Removing Mould, The Mould Mob, MouldMen, Absolute Mould Removal) are mould-remediation specialists with dedicated suburb-level pages. They compete on visible review counts and inspection/testing offers rather than on technology.
- **Competitors in the UV/commercial disinfection space** (Australian Ultra Violet, UV Consulting, Steril-Aire AU) sell equipment and fixed installations, not booked local treatments. The booked-treatment + local-service angle is genuinely underserved — the gap is visibility, not positioning.

#### Technical problems found in the repo (all verified with a parser, not by eye)

1. **Every FAQPage JSON-LD block on the site was invalid JSON.** All 31 blocks used single-quoted JavaScript-style string values (`"name":'Can we finance it?'`) instead of JSON double quotes. 133 Q&A pairs of structured data, parsing as nothing. No page was eligible for FAQ rich results despite the markup being present on almost every page. This was by far the biggest single issue found.
2. `machines.html` was missing "How many units does my business need?" from its schema (6 visible questions, 5 in markup), and carried a backslash-escaped apostrophe (`What\'s`) — JS escaping, not JSON.
3. `contact.html` had 4 visible FAQs and no FAQPage block at all.
4. **All 7 location pages lacked FAQ content entirely** — no FAQ section and no FAQPage schema — while all 33 service/industry pages had both. The location pages are the ones targeting the highest-intent local queries.
5. 23 pages were missing `twitter:card`; the 7 location pages plus `about` and `australia` were also missing `og:type` and `og:locale`.
6. **The site had zero contextual internal links.** Every internal link was nav, footer or CTA. Related pages were connected only through the sitewide footer, which passes very diluted relevance signal.

#### Checked and found clean

- All internal hrefs resolve; no `.html` extensions anywhere (cleanUrls intact).
- No `<img>` missing `alt`.
- No duplicate meta descriptions or duplicate titles.
- ABN 78 059 411 175, phone, email, FormSubmit endpoints and honeypot fields present and correct on all 41 pages.
- sitemap.xml covers all 41 routes; robots.txt is correct.

### Changed

Three commits, in priority order (fix broken → improve weak):

1. **`Fix invalid FAQPage JSON-LD sitewide`** — regenerated all 31 FAQPage blocks as valid JSON, derived directly from each page's visible `<details>`/`<summary>` content so schema and on-page text match exactly (Google requires this). Fixed the machines.html omission and escaping, and added a FAQPage block to contact.html. No visible copy changed on any page.
2. **`Complete Open Graph and Twitter card tags across 23 pages`** — added the missing `og:type`, `og:locale` and `twitter:card` in the tag order already used by the industry pages. No existing tag values altered. All 41 pages now carry the full set.
3. **`Add FAQ sections and contextual internal links to four location pages`** — added a four-question FAQ plus FAQPage schema to `noosa`, `sunshine-coast`, `brisbane` and `gold-coast`, answering the local questions those pages were silent on (response time and travel, turnover timing, after-hours scheduling, insurance and documentation for site induction, suburb coverage). Every factual claim was sourced from copy already live elsewhere on the site. Also introduced the site's first 13 contextual internal links, inside those FAQ answers.

**Why only four location pages, not seven:** writing genuinely distinct location FAQs takes real per-page substance, and near-duplicate FAQ blocks across seven pages would be thin content — a net negative. Maroochydore, Caloundra and Australia are queued for next run.

**Design system:** no new component classes. The `.faq` and `.section-head` CSS already existed (unused) in the location pages. The single added CSS rule styles in-copy FAQ links using the treatment already defined for `.form-status.is-success a` (`var(--uv)`, underline, 3px offset).

### QA performed

- All 77 JSON-LD blocks across the site parse as valid JSON (was 41 valid / 31 invalid).
- FAQPage question lists match visible questions on all 37 pages that have FAQs — zero mismatches.
- Tag balance (`section`/`div`/`footer`/`form`/`details`/`summary`/`script`/`style`/`p`/`a`) holds on all 41 pages; every page starts with `<!DOCTYPE html>` and has exactly one `<head>` and one `<body>`.
- All internal hrefs, including the 13 new ones, resolve to real extensionless routes. Zero `.html` hrefs.
- ABN, phone, email, FormSubmit endpoints and honeypot fields unchanged on all 41 pages. `vercel.json`, `main.js` and `styles.css` untouched.

### Deliberately NOT done

- **Did not create any new location or industry page.** Nothing in this run's research established a distinct, currently-unaddressed search opportunity that the existing 41 pages don't already cover. Padding the site would dilute it.
- **Did not touch sitemap.xml** — no pages added or removed.
- **Did not rewrite titles/meta descriptions for length.** 33 titles exceed ~60 characters and 27 descriptions exceed ~155. This is real and worth fixing, but they are currently well-written and consistent, and rewriting 40 pages of metadata in the same week as a sitewide schema change is exactly the kind of mass edit that reads as churn. Queued as a paced job: ~6-8 pages per run, highest-traffic first.
- **Did not add `BreadcrumbList` schema** (no page has it) or `GeoCoordinates` to location pages (only index.html has them). Both are genuine wins; deferred to keep this run's change surface contained.

### Needs owner input

These would help but require a real business decision or a fact the agent doesn't have. **No action was taken on any of them.**

1. **Google Search Console access is the single highest-value thing missing.** This agent is flying blind on actual impressions, positions and click-through rate, and the search tooling it has is US-geolocated, so it cannot see Australian local results. Everything above is inferred from the source code rather than measured. If GSC data (or even weekly exported CSVs committed to the repo) could be made available, every future run gets dramatically more targeted.
2. **The live site could not be reached from this environment** (egress proxy blocks the domain). Worth confirming independently that `uvsterile.com.au` is serving, indexed, and verified in GSC, and that the sitemap has been submitted.
3. **Published reviews with attribution.** Every mould competitor ranking on page 1 leads with visible review counts. The site currently has no review or rating markup anywhere. If real customers would give attributable reviews, that is likely the biggest single trust and ranking gain available — but the agent will not fabricate testimonials or invent `aggregateRating` markup, both of which are Google structured-data violations and would risk a manual action.
4. **A Google Business Profile** for Noosa Heads, if one doesn't exist. Local pack visibility for "UV sanitisation Noosa" is largely driven by GBP, not by the website, and the agent cannot create or claim one.
5. **Visible starting prices.** Competitors with published pricing tend to win comparison-stage clicks. The agent will not invent figures. If the owner supplies real starting prices, they can be added to the service pages with `Offer` schema.
6. **A satisfaction guarantee**, if the business actually offers one. Cannot be asserted without the owner's say-so.

### Suggested next run

1. Add FAQ + FAQPage schema to `maroochydore`, `caloundra`, `australia` (finishes the location set).
2. Begin the paced title/meta-description trim, 6-8 pages, starting with `index`, `machines`, `reseller`, `book`, `noosa`, `sunshine-coast`.
3. Rotate keyword checks to the untouched clusters listed above.
4. Consider `BreadcrumbList` schema sitewide and `GeoCoordinates` on location pages.
