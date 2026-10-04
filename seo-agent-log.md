# SEO Agent Log — uvsterile.com.au

Reverse-chronological (newest first). One entry per weekly run. This file is the agent's only memory between runs.

---

## 2026-10-04 — Run 8

### Researched

- **Second lap continued with the four clusters run 7 flagged as un-rechecked:** Gold Coast hotels, childcare QLD, the reseller cluster, and the caravan/boat cluster. Plus run 7's suggestion 3 — a depth comparison of `mould-treatment` and `water-damage` against Electrodry and Mould Medico specifically — and one PAA cluster on ULV fogging and misting.
- **Checked over runs 1–8:** see run 6 for runs 1–6 and run 7 for its own four. Run 8 re-checked Gold Coast hotels, childcare QLD, reseller, and caravan/boat, and added the fogging/ULV cluster.
- **Next lap should re-check:** the clusters last sampled in run 5 and earlier — funeral homes/mortuary QLD, veterinary, places of worship, restaurants/commercial kitchens, schools QLD, and the HVAC and post-flood odour clusters from run 3.

### Found

- **Both standing blockers hold, for the eighth run.** `https://uvsterile.com.au` is still refused by this environment's egress proxy (`403` at the CONNECT tunnel) on both `curl` and the fetch tool, so the live site cannot be read, and the search tool is US-geolocated. The Gold Coast hotel cluster returned nine US and Hong Kong sources and not one Australian result, which is the clearest demonstration of the second blocker so far. **Ranking positions remain unmeasured, not measured-as-zero.** Nothing in this log should be read as a ranking claim.
- **No owner commits since 2026-08-25, now five runs running.** Items 8 and 11 — the room-duration conflict across ten pages and the coach-duration conflict across two — are unanswered for the sixth run. Neither figure was touched or propagated. `fleet-vehicles` was edited this run and its "Coach: 3–4 minutes" line was left exactly as it stands.
- **A correction to run 7's competitor note, which was wrong on a specific.** Run 7 recorded that the mould remediation firms lead with a *free* inspection and written report, and built owner item 13 on it. Electrodry charges **$50** for the mould quote, inspection and detailed report, credited against the job if you book. The written report is real; "free" was not. Item 13 is corrected below rather than deleted — a credited inspection fee is still an offer the site does not have, and it is a cheaper thing to match than a free one.
- **The same source surfaced the strongest competitor trust signal found in eight runs: Electrodry publishes a 12-month mould guarantee.** That is a specific, falsifiable promise on the exact service `mould-treatment` targets. The site makes no guarantee of any kind. Owner item 6 territory, unchanged and unactioned, but it now has a named competitor and a number attached to it.
- **Competitor pages are now largely unreadable from here too, which narrows what depth comparison is possible.** `electrodry.com.au` is blocked by the same egress proxy as the site, and `mouldmedico.com.au` does not resolve. Run 7's suggestion 3 could therefore only be answered from search snippets, not by opening the pages. What the snippets do establish: Electrodry's page covers the inspection fee, a one-day treatment duration, the 12-month guarantee, and airborne spore treatment. `mould-treatment` matches it on duration and airborne load and has more depth on mechanism and limits; it is behind on the inspection offer and the guarantee, both of which are owner decisions. **Recording this so a future run does not keep re-opening a comparison the network will not let it finish.**
- **The childcare cluster returned real Queensland outbreak data and no UV service.** Reported clusters: 15 far north Queensland centres hit by hand, foot and mouth with nine children hospitalised; 20 south-east Queensland centres and 11 schools in a gastro wave; a separate outbreak across 50 centres with 200+ children sick. The competing copy is commercial cleaners selling hospital-grade chemical disinfectant with verified contact times and two-stage wipe protocols on nappy change stations. No UV anywhere. The run-6 formulation continues to hold.
- **The reseller cluster has a shape worth naming: the competitors are all upstream of this business, not beside it.** It returns UV *equipment* manufacturers and distributors — a 40-year Victorian UV manufacturer for sale, Cablex as Violet Defense's Australian representative, UV-Guard manufacturing locally, Hospital Products Australia distributing UV/UVC sterilisers nationally. Every one of them sells hardware into water, air and food-safety applications. None of them offers a service-operator program with a territory. The reseller page is competing for attention against equipment catalogues, not against rival operator programs.
- **The caravan/boat cluster is unchanged from run 6 and still the emptiest sampled.** Mobile detailers and repairers across Caloundra, Maroochydore and Noosa, plus mould-gel products (SAN-AIR) and RV water-tank sanitisers. Still no service treating a cabin with UV-C. Owner item 12 stands.

#### Technical problems found in the repo

1. **Zero `@id` on all 39 `LocalBusiness` nodes.** Nothing linked the `provider` named inside each of the 29 `Service` entities to the node on the homepage, to `about`'s `mainEntity`, or to each other — 39 nodes a crawler had no instruction to treat as one business. Fixed for the 32 named exactly "UV Sterile Australia"; see Changed.
2. **`fogging`, `ULV` and `misting` appeared zero times across all 41 pages** — the method every mould competitor in this site's strongest cluster leads with. Fixed on `mould-treatment`.
3. **Ozone was answered only on `odour-elimination`**, which a fleet buyer comparing quotes has no reason to open, while the Brisbane fleet cluster is held partly by ozone vendors. Fixed on `fleet-vehicles`.
4. **`about` was the only page of 41 with no `FAQPage` schema, and had zero inbound contextual links in body copy** — while carrying the site's only statement of IEC 62471, the ICNIRP UV-C guidelines and the WHS Act 2011 job report. Half fixed: it now has four inbound links. The missing `FAQPage` was left alone deliberately; see Deliberately NOT done.
5. **A near-miss on two site conventions, worth adding to run 7's technical note 3.** The first draft of this run's six new FAQ answers used `&mdash;` and `&rsquo;` entities. Both are wrong for body copy: `&mdash;` occurs **10 times sitewide and all 10 are inside meta tags**, never in a `<p>`, and `&rsquo;` occurs **zero times** — the site uses the literal `—` character and the straight apostrophe in copy. Caught and reverted before commit, and the edit harness now asserts against `&mdash;`, `&ndash;`, `&rsquo;`, `&lsquo;` and the four curly characters. **Sitewide curly-apostrophe count is zero before and after, and `&mdash;`-in-body-copy is zero before and after.**
6. **A QA harness bug worth recording so it is not rediscovered as a defect.** A freshly built harness measuring title and description length in **raw bytes** reports three failures — `medical-clinics` title 63 and description 156, `restaurants` title 65. All three are false: the strings contain `&amp;`, `&eacute;` and `&mdash;`, and the rendered lengths are 59, 150 and 54. **Metadata must be measured after HTML-unescaping.** The run 2–6 metadata job is still correctly closed; nothing was re-trimmed.

### Changed

Four commits, in priority order (fix broken → improve weak → add new):

1. **`Give the business one schema identity across all 32 pages`** — `@id: https://uvsterile.com.au/#business` added to every `LocalBusiness` node whose name is exactly "UV Sterile Australia". One line per page, 32 lines total, no fact touched. The 29 `Service` `provider` references are where it earns its place. **The seven location pages were deliberately left out**: their nodes are named "UV Sterile Australia — Noosa Heads" and so on, and giving them the shared `@id` would assert one entity with eight different names. Whether those pages should carry location-suffixed business names at all is a naming question, logged below rather than decided here.
2. **`Name the safety standards on the four compliance-led pages`** — `aged-care`, `medical-clinics`, `childcare`, `schools`. IEC 62471, ICNIRP and the WHS Act 2011 job report previously appeared only on `about`, `index`, `machines`, `reseller`, `cleaning-companies` and `offices` — not on any of the four pages whose buyers are the ones who have to evidence a standard, which answered safety only operationally ("residents are simply moved out", "Never", "at our exposure times, no"). One FAQ each, written from `about`'s own wording and not escalated past it: the unit is "rated and operated inside the exposure limits published in IEC 62471", never "certified to" it. Each answer is angled at its own reader — accreditation evidence, the equipment rating, the document a parent or assessor asks for, principal reporting — so the four are four answers rather than one paragraph copied four times. **These are also `about`'s first four inbound contextual links.**
3. **`Answer the two rival methods the site had no words for`** — one FAQ on `mould-treatment` for fogging and ULV misting, one on `fleet-vehicles` for ozone. Both concede the rival method's genuine advantage before stating the trade-off, which is the posture the site already takes. Fogging reaches shaded surfaces light cannot, at the cost of a chemical film on everything it settles on, and neither method removes the mould or dries the material — consistent with what `mould-treatment` already says about line-of-sight and mechanical removal. Ozone fills a cabin and reaches under seats, at the cost of material attack on seals and trim plus a ventilation window, which for a fleet is vehicle downtime. The fleet answer links to `odour-elimination` for the room version rather than restating it.
4. **`Refresh sitemap lastmod from git after this run's edits`** — 32 entries to 2026-10-04, each read from that page's own last commit. The nine keeping older dates are `machines`, `reseller` (no `LocalBusiness` node) and the seven location pages.

**Link graph:** `about` went from **0 inbound contextual links to 4**. Pages whose only body-copy link is the book CTA stays at **0** — run 7's remaining one was `about` itself, which now links out and in. `book` still has zero outbound, still defensible.

### QA performed

The harness was rebuilt from scratch again (not committed) and run against all 41 pages after every change: `<!DOCTYPE html>` first, exactly one `<html>`/`<head>`/`<body>`, open/close balance on 25 tag types with void elements excluded, one `<h1>` per page, every JSON-LD block parsing as valid JSON, every `FAQPage` question **and answer** matching the page's visible text, schema FAQ count equal to `<details>` count, every `Service`/`Product` entity carrying a name, every schema `url` resolving and free of `.html`, canonical and `og:url` matching the page's own extensionless route, the og tag set, every internal href resolving with zero `.html`, `alt` and a resolving `src` on every `<img>`, title ≤ 60 and description ≤ 155 **measured after HTML-unescaping**, no duplicate titles or descriptions, ABN / phone / email present, and sitemap coverage in both directions.

**All 41 pages pass with zero failures. 81 JSON-LD blocks parse. 41 sitemap entries.**

Each of the six new answers is byte-identical between its visible `<p>` and its schema entry with links stripped, asserted by the edit script at write time rather than checked by eye, and each new `<details>` count was re-verified against its `FAQPage` array immediately after insertion. All five new links were verified by offset to sit inside `.faq details p`, the only selector on the site that styles a link in body copy — run 7's technical note 3, which was read before writing as that note instructs.

ABN 78 059 411 175 present and unchanged on all 41 pages, with zero other ABN variants. `0417 631 743` occurrences unchanged at **211**, email at **175**, and no other phone number appears anywhere — the new copy adds neither, by design. Form internals verified byte-identical to run 7 by extracting both trees and counting: 4 `<form>` elements, 4 FormSubmit endpoints, 127 `_honey` references, 123 `addEventListener` handlers, all equal before and after. `vercel.json`, `main.js`, `styles.css`, `robots.txt` and `site.webmanifest` verified byte-identical to run 7. Zero `href` with `.html` sitewide. No pages added or removed. The whole run's diff was grepped for dollar signs, price, pricing, guarantee, refund, warranty, payback, percentages, discount, the ABN and the contact details: **no match**.

### Deliberately NOT done

- **No new page created — eighth run running.** Four re-checked clusters and one PAA cluster produced no search opportunity an existing page does not already serve. The fogging cluster was an answer missing from a strong page, not a missing URL; a "UV vs fogging" page would compete with `mould-treatment` for the same intent.
- **Did not add `FAQPage` schema to `about`, despite it being the only page without one.** Every question worth asking there is already answered by the page's own Standards, Science and Principles sections, so an FAQ would have meant restating existing copy a few lines below itself — the same duplication trap run 7 avoided on the frequency and parvovirus clusters. The gap that actually mattered on `about` was that nothing linked to it, and that is fixed.
- **Did not give the seven location pages a shared or page-scoped `@id`.** Sharing `#business` asserts one entity with eight names; a distinct `@id` each asserts seven businesses. Both are worse than leaving them anonymous until the naming question is settled.
- **Did not reconcile the room-duration figures (item 8) or the coach-duration conflict (item 11).** Owner-authored service facts, sixth run unanswered. `fleet-vehicles` was edited this run and its coach figure was left untouched.
- **Did not re-trim any metadata.** The three apparent over-length failures were a harness bug, not a defect; see technical problem 6.
- **Did not make the ARTG argument.** Unchanged from run 7, item 7.
- **No pricing, guarantee, inspection offer, payback figure or earnings claim added** — including on `mould-treatment`, where the Electrodry comparison makes the absence of a guarantee most visible. Owner items 5, 6 and 13.
- **Did not extend the materials/fade answer** to the seven pages still missing it. Item 10, unchanged.
- **No `BreadcrumbList`** (settled run 3). **No Twitter card completion** (settled run 5). **No `sameAs`** — it needs real profile URLs, which is owner item 4.

### Needs owner input

Items 1–7, 9, 10 and 12 all still stand with **no action taken** — GSC access, live-site confirmation, published reviews with attribution, a Google Business Profile, visible starting prices, a satisfaction guarantee, third-party accreditation, the HVAC operating-cost argument, the materials/fade answer for venues and places of worship, and whether the mobile caravan/boat detailers are a competitor or a reseller channel. See runs 1–7 for the reasoning.

8. **Which room treatment time is correct? Three figures, now in its sixth run unanswered.** `index` says **3–8 minutes**, `machines` and `reseller` say **3–12**, and `australia`, `bed-and-breakfasts`, `caloundra`, `gold-coast`, `hotels`, `mould-treatment` and `noosa` say **12–15**, three of them inside FAQ schema. Ten pages, three answers, on the most-asked question about the service. **One line settles it and the agent will align all ten pages and their schema in a single pass the run after it arrives.**

11. **Does a coach take 60 seconds or 3–4 minutes?** `coaches-and-buses` headlines "A full coach, clean in 60 seconds"; `fleet-vehicles` states "Coach: 3–4 minutes" in its copy and its FAQ schema. Both owner-authored, both live, fourfold apart, on the number the fleet pitch rests on.

13. **Corrected, and now cheaper than run 7 thought.** Electrodry charges **$50** for a mould inspection and written report and credits it against the job if you book — it is not free, as run 7 recorded. A credited inspection fee is a materially smaller commitment to match than a free inspection, and it is the entry-level trust signal in this cluster. Whether it is offered is an owner decision; if it is, it belongs on `mould-treatment` and `water-damage`.

14. **New — the strongest single competitor signal found in eight runs.** Electrodry publishes a **12-month guarantee** that treated mould will not return. The site makes no guarantee of any kind, on any service. This is owner item 6 with a named competitor and a number attached, on the service the site's best topical page targets. **Nothing was written to the site about guarantees either way.** If no guarantee is possible, that is also worth knowing, because it means `mould-treatment` should compete on mechanism and honesty rather than on promise — which is what it currently does, by default rather than by decision.

15. **New, and small — should the seven location pages name the business "UV Sterile Australia — Noosa Heads" and so on?** The suffix reads as a branch of a multi-location company. The business has one base, one ABN and one phone number, so it is one entity with service areas. Settling this unlocks the `@id` consolidation for those seven pages. Either answer is fine; the agent will not guess a business's own name.

### Suggested next run

1. **If the owner has answered items 8, 11 or 15, do those first** — ten pages and three FAQ schema blocks for the room time, two pages for the coach time, seven schema nodes for the naming question. Item 8 has been the top suggestion for six runs.
2. **Read technical problems 5 and 6 above before writing copy or building a harness.** Entities in body copy, and raw-byte metadata measurement, are the two traps that cost time this run. Both are invisible unless checked against the rest of the site.
3. **Do not re-open the Electrodry/Mould Medico depth comparison by fetching their pages.** One is blocked by the egress proxy and one does not resolve; see Found. Search snippets are the ceiling from this environment.
4. **Continue the second lap** with the clusters last sampled in run 5 or earlier: funeral homes/mortuary QLD, veterinary, places of worship, restaurants and commercial kitchens, schools QLD, plus run 3's HVAC and post-flood odour clusters.
5. **The method-comparison seam opened this run is probably the best remaining content vein.** Competitors are defined by method — fogging, ozone, electrostatic spray, thermal fogging, chemical wipe-down — and the site now answers three of those five, on three pages. `hvac-air-conditioning` and `post-tenant` are the next candidates, but only where research shows a real competing method in that specific cluster, not as a sweep.
6. **Maintain `sitemap.xml` `lastmod`** from git whenever pages change. Note the tension recorded in commit 4: a one-line sitewide schema edit resets 32 dates and overstates the content change. That argues against cosmetic sitewide sweeps, not against reading the field from git.

---

## 2026-09-27 — Run 7

### Researched

- **Second lap of the keyword rotation begins, starting with the clusters that returned something rather than nothing** (run 6's suggestion 4): mould treatment Sunshine Coast, fleet vehicle sanitisation Brisbane, UV-C disinfection in Queensland aged care, and purchase intent for the unit. Plus two "people also ask" clusters that looked like content gaps on paper — treatment frequency for childcare and schools, and whether UV-C kills parvovirus in a vet clinic.
- **Checked over runs 1–7:** see run 6 for runs 1–6. Run 7 re-checked mould/Sunshine Coast, fleet/Brisbane, aged care/QLD and unit purchase intent, and added the frequency and parvovirus PAA clusters.
- **Next lap should re-check:** Gold Coast hotels, childcare QLD, the reseller cluster, and the caravan/boat cluster — none re-checked since the run that first found them.

### Found

- **Both standing blockers hold, for the seventh run.** `https://uvsterile.com.au` is still refused by this environment's egress proxy (`403` at the CONNECT tunnel), so the live site cannot be read, and the search tool is US-geolocated so it does not reproduce what an Australian searcher sees. **Ranking positions remain unmeasured, not measured-as-zero.** Nothing in this log should be read as a ranking claim.
- **No owner commits since 2026-08-25, now four runs running.** Items 8 and 11 — the room-duration conflict across ten pages and the coach-duration conflict across two — are unanswered for the fifth run. Neither figure was touched or propagated this run.
- **Two apparent content gaps turned out to be already covered, and were dropped rather than written to.** The frequency cluster suggests weekly-to-fortnightly scheduling is what buyers search for; `childcare`, `gyms-and-fitness` and `offices` already answer it in their own words, and `mould-treatment` answers "how often should treatment be repeated?" directly. The parvovirus literature says UV-C achieves high reduction on directly exposed surfaces, is useless in shadow, and cannot replace chemical disinfection after organic soiling; `veterinary` already says almost exactly that, including the mechanical-removal caveat. **Writing either would have duplicated existing copy, so neither was written.** Recorded because a future run will rediscover these clusters and should not treat them as openings.
- **The competitive picture is unchanged across four re-checked clusters.** Mould on the Sunshine Coast is held by remediation specialists competing on ULV misting, fogging and inspection reports (Electrodry, Mould Medico, MouldMen, Ever Ready, Beyond Clean) — none of them UV. Brisbane fleet work is held by detailers and chemical/ozone disinfection vendors (Rentokil via Custom Fleet, 1800 Dirty Cars, ISTOBAL ozone units). Aged care returns compliance guidance (the Aged Care IPC Guide, Queensland Health, the ARTG hospital-grade disinfectant requirement) and overseas UV vendors, not Australian UV services. Unit purchase intent returns Australian UV equipment distributors — Australian Ultra Violet, LAF tech, Ultra Violet Products — reselling Philips, sterilAir and Goldensea rather than competing as a service. **The run-6 formulation still holds and should keep being used: UV-C is a line item for a handful of large generalist cleaners, and nobody in South East Queensland is positioned as a UV specialist. That is not the same as "no competitor offers UV."**
- **A recurring competitor trust signal worth naming precisely.** The mould remediation firms lead with things the site cannot claim for itself: Goldmorr-approved technicians, free inspection with a written report, and named accreditation. The aged-care cluster adds a harder one — the ARTG hospital-grade disinfectant listing, which is a chemical-product register and so does not apply to a light-based treatment at all. That asymmetry is an argument the site could make and currently does not. Owner item 7 territory; not acted on.

#### Technical problems found in the repo

1. **Fifteen pages had no outbound contextual link at all beyond the book CTA** — ten industry pages and four service pages, plus `about`. The ten industry pages additionally named no location anywhere in body copy. Fixed for all fourteen; see Changed.
2. **`sitemap.xml` carried no `<lastmod>` on any of its 41 entries**, on a site that now changes most weeks, and each entry listed `priority` before `changefreq`, which does not validate against the sitemap XSD. Both fixed.
3. **A styling trap that nearly shipped, and is the most useful thing in this entry for future runs.** The global rule on every page is `a { color: inherit; text-decoration: none; }`. The only rule that styles a link in body copy is `.faq details p a`, which the location pages introduced and runs 5–6 propagated. **A link placed anywhere else — a lede, a heading, a card paragraph — renders with no colour and no underline and is invisible to a reader.** A first draft of the service-page commit put links in one lede and two headings; it was reverted before commit once this was checked against the CSS. Every contextual link on the site now sits inside a FAQ answer paragraph, verified by offset rather than by eye. **Future runs: put contextual links in FAQ answers, or add the styling deliberately.**
4. **Curly apostrophes.** The site used the straight form exclusively — zero `’` across all 41 pages. Nine new FAQ paragraphs were drafted with curly ones; caught before commit and normalised, in both the visible copy and the matching schema string so byte-identity held. Sitewide count is zero before and after.

### Changed

Three commits, in priority order (fix broken → improve weak → add new):

1. **`Answer "where do you service?" on the last ten industry pages`** — internal linking tranche 3, and the end of the job begun in run 5. Nine new FAQs on `childcare`, `schools`, `restaurants`, `gyms-and-fitness`, `funeral-homes`, `veterinary`, `salons-and-beauty`, `cinemas-and-venues`, `places-of-worship`. Every geographic claim is lifted from the location pages: Coolum to Caloundra as the Sunshine Coast span, same- or next-day locally, Brisbane next-day or scheduled and mostly multi-site, the Gold Coast as commercial contract work, interstate sites quoted as unit supply per site with operator training. Page-specific detail from the same source — Maroochydore's hospital precinct on `veterinary`, Robina/Southport/Broadbeach on `salons-and-beauty`, Hastings Street and Noosaville kitchens on `restaurants`. **`sports-clubs` got no new words**: it already answered the question, so "Sunshine Coast" and "supply units" were simply wrapped as links and the JSON-LD string left verbatim.
2. **`Link the four service pages to the services they overlap with`** — `odour-elimination`, `post-tenant`, `hvac-air-conditioning`, `real-estate`. These needed cross-references, not locations. One link-bearing FAQ each, plus three zero-word wraps (`fleet-vehicles`, `rental-properties`, `sunshine-coast`). `odour-elimination` now answers the musty-smell question as the reverse of the one run 3 answered on `water-damage` — which linked here and got nothing back. Every answer keeps the limits the site already states: UV-C treats what the light reaches, adds no moisture, will not dry a cavity or find a leak.
3. **`Give sitemap.xml accurate lastmod dates and valid child order`** — each date read from that page's own last git commit rather than set by hand, so the field stays accurate; an inaccurate `lastmod` is worse than none. Children reordered to the XSD sequence.

**Link graph before → after:** pages whose only body-copy link was the book CTA went **15 → 1**. The remaining one is `about`. `book` still has zero outbound, which is defensible for a conversion endpoint.

### QA performed

The harness was rebuilt from scratch again this run (it is not committed) and run against all 41 pages after every change: `<!DOCTYPE html>` first, exactly one `<html>`/`<head>`/`<body>`, open/close balance on 25 tag types, one `<h1>` per page, every JSON-LD block parsing as valid JSON, every FAQPage question **and answer** matching the page's visible text, every `Service`/`Product` entity carrying a name and url, every schema `url`/`image` resolving, canonical and `og:url` matching the page's own extensionless route, the og tag set, every internal href resolving with zero `.html`, `alt` and a resolving `src` on every `<img>`, title ≤ 60 and description ≤ 155, no duplicate titles or descriptions, ABN / phone / email present, FormSubmit endpoint and honeypot intact, and sitemap coverage in both directions.

**All 41 pages pass with zero failures. 81 JSON-LD blocks parse.** Schema FAQ count equals visible `<details>` count on all 14 edited pages. Every new answer is byte-identical between the visible `<p>` and its schema entry with links stripped, asserted by the edit script rather than checked by eye; where a wrapped sentence also appears in JSON-LD, the replacement was applied outside the `ld+json` regions and the schema copy asserted unchanged. `sitemap.xml` was validated by parsing it with an XML parser: 41 entries, every child sequence correct, every date well-formed, coverage correct in both directions.

Note for future runs: the strict "schema answer must equal a bare `<p>`" check reports six mismatches on `index`, which are **not** defects — the homepage uses `<p class="faq-a">`, so the bare-`<p>` matcher misses it. The generic whole-document matcher passes on `index`.

ABN 78 059 411 175 verified present and unchanged on all 41 pages, with no other ABN variant anywhere. Phone occurrences unchanged at **211** and email at **175** — the new copy adds neither, by design. No other phone number appears on the site. FormSubmit endpoints (4) and honeypot fields (86) untouched. `vercel.json`, `main.js`, `styles.css` and `robots.txt` verified byte-identical to run 6. No pages added or removed. No dollar figure, percentage, payback or guarantee wording appears anywhere in the diff.

### Deliberately NOT done

- **No new page created — seventh run running.** Nothing in four re-checked clusters and two PAA clusters pointed at a search opportunity an existing page does not already serve. The two apparent gaps were already answered on the site.
- **Did not write the frequency or parvovirus answers**, having found both already covered. Duplicating existing copy would compete with it.
- **Did not reconcile the room-duration figures (item 8) or the coach-duration conflict (item 11).** Owner-authored service facts, fifth run unanswered. Neither figure was propagated.
- **Did not link the homepage's "Where do you service?" answer**, which names Noosa Heads, the Sunshine Coast, Maroochydore, Caloundra, Nambour, Mooloolaba, Brisbane, the Gold Coast and Australia, all unlinked. Two reasons: `index` uses `.faq-a` and has no rule styling links inside it, so it would need a new CSS rule; and `index` already links every location page from its locations grid, so the links would be duplicates. Low leverage, real cost.
- **Did not claim the field is free of UV competitors** anywhere, despite four clusters returning no UV service.
- **Did not make the ARTG argument** (that a hospital-grade disinfectant listing is a chemical-product register and cannot apply to a light-based treatment). It is a competitive positioning claim about a regulatory register, and it belongs to the owner. Recorded under item 7.
- **No pricing, payback figure, earnings claim or guarantee added.** Owner items 5 and 6.
- **Did not extend the materials/fade answer** to the seven pages still missing it. Item 10, unchanged.
- **No `BreadcrumbList`.** Settled in run 3. **No Twitter card completion.** Settled in run 5.

### Needs owner input

Items 1–7, 9 and 10 all still stand with **no action taken** — GSC access, live-site confirmation, published reviews with attribution, a Google Business Profile, visible starting prices, a satisfaction guarantee, third-party accreditation, the HVAC operating-cost argument, and the materials/fade answer for venues and places of worship. See runs 1–5 for the reasoning. Item 12 (mobile caravan/boat detailers: competitor or reseller channel?) stands from run 6.

8. **Which room treatment time is correct? Three figures, now in its fifth run unanswered.** `index` says **3–8 minutes**, `machines` and `reseller` say **3–12**, and `australia`, `bed-and-breakfasts`, `caloundra`, `gold-coast`, `hotels`, `mould-treatment` and `noosa` say **12–15**, three of them inside FAQ schema. Ten pages, three answers, on the most-asked question about the service. **One line settles it and the agent will align all ten pages and their schema in a single pass the run after it arrives.**

11. **Does a coach take 60 seconds or 3–4 minutes?** `coaches-and-buses` headlines "A full coach, clean in 60 seconds"; `fleet-vehicles` states "Coach: 3–4 minutes" in its copy and its FAQ schema. Both owner-authored, both live, fourfold apart, on the number the fleet pitch rests on.

13. **New — item 7 now has a specific, cheap form.** Competitors in the mould cluster lead with a **free inspection and written report**, not just accreditation. That is an offer, not a certification, so it may be the lowest-cost trust signal available to the business. Whether it is offered is an owner decision; if it is, it belongs on `mould-treatment` and `water-damage` and would change what those pages open with.

### Suggested next run

1. **If the owner has answered items 8 and 11, do those first** — ten pages and three FAQ schema blocks for the room time, two pages for the coach time. This is the fifth run it has been the top suggestion.
2. **The internal linking job is done.** Do not re-open it as a sweep. The two open questions are narrow: whether `about` should carry an outbound link and earn any inbound ones (it currently has one outbound and none inbound in body copy), and whether `book` should stay a pure endpoint. Both are judgement calls, not defects.
3. **The next real content work is depth on the pages that already rank-target well, not more breadth.** `mould-treatment` and `water-damage` are the two strongest topical pages and the two whose competitors publish the most. Compare their depth against Electrodry and Mould Medico specifically.
4. **Continue the second lap** with the clusters not yet re-checked: Gold Coast hotels, childcare QLD, the reseller cluster, the caravan/boat cluster.
5. **Read technical problem 3 above before writing any link.** It is the one repo-specific trap that is invisible in the HTML and only shows in the CSS.
6. **Maintain `sitemap.xml` `lastmod`** whenever pages change — regenerate from git rather than editing by hand, or the field stops being accurate and stops being trusted.

---

## 2026-09-20 — Run 6

### Researched

- **Keyword clusters sampled this run: the five that had never been sampled.** Real estate and property turnover (UV-C sanitisation for rentals, sales presentation, vacate cleans), offices Brisbane as its own cluster, boats/marine and caravans/RVs (cabin mould and sanitising, QLD), sports clubs and gyms, and salons/beauty as a standalone rather than paired cluster. Plus one "people also ask" cluster on whether UV light actually kills mould in a caravan or boat cabin, and one branded check.
- **Checked over runs 1–6:** Noosa Heads, mould Noosa/Sunshine Coast, aged care Sunshine Coast, UV-C efficacy PAA (run 1); fleet Brisbane, bond-clean Sunshine Coast, Maroochydore, Caloundra, reseller Australia, mould-duration PAA, branded (run 2); Gold Coast hotels, HVAC Brisbane, childcare QLD, aged care Gold Coast, post-flood odour, two HVAC/odour PAA clusters (run 3); five purchase-intent clusters for the unit (run 4); six industry clusters and the materials PAA cluster (run 5); the five clusters above plus the caravan/boat mould PAA cluster and a branded check (run 6).
- **The rotation has now covered every page on the site at least once.** Run 7 starts the second lap. The clusters worth re-checking first are the ones where something was found rather than the ones where nothing was: mould Sunshine Coast, fleet Brisbane, aged care, and the purchase-intent cluster for the unit.

### Found

- **Both standing blockers hold, for the sixth run.** The search tool is US-geolocated and does not reproduce an Australian searcher's local results, and `https://uvsterile.com.au` is still refused by this environment's egress proxy (`403` at the CONNECT tunnel). Ranking positions remain **unmeasured**, not measured-as-zero. A branded search for "UV Sterile Australia" / "uvsterile" returned nine competitors and not the site — which under a US-geolocated tool is close to meaningless for a Noosa business and should not be read as a ranking finding.
- **No owner commits since run 3, now three runs running.** Items 8 and 11 — the room-duration and coach-duration conflicts — are unanswered and nothing was aligned. Both remain one-line answers that unlock a ten-page and a two-page fix respectively.
- **The competitive picture held in all five new clusters, with one correction to how it should be described.** Brisbane offices returned *Zoom Office Cleaning* again (run 2's finding: a generalist listing UV-C among chemical, steam, electrostatic and ozone methods) plus fogging and pest-control operators. Gyms and sports clubs on the Sunshine Coast are held entirely by commercial cleaning companies — Signature, Divine, Ronnies, Sun Cleaning — whose copy covers change rooms, mats and equipment without a UV mention anywhere. Real estate returned no service competitor at all, only national UV equipment vendors. The accurate statement after six runs and twenty-three clusters is: **UV-C is a line item for a handful of large generalist cleaners, and nobody in South East Queensland is positioned as a UV specialist.** That is not the same as "no competitor offers UV", and the site should keep not implying it.
- **The caravan/boat cluster is the emptiest one sampled so far, and the site was silent in it.** It is held by mobile detailers (Caravan Detailing Services, which covers Brisbane, Gold Coast and the Sunshine Coast) and by mould-gel and mould-prevention products. The only UV in the cluster is **water** sterilisers for RV plumbing — a different product answering a different question. No service anywhere in the results treats a cabin with UV-C. Acted on; see Changed.
- **The mould PAA literature has a shape the site should not overstate, and doesn't.** Category sources report UV-C is effective on mould it directly reaches (one cited study, up to 90% growth reduction on exposed surfaces) and useless on mould behind linings or under dust, and they stress that without moisture control the problem returns. That is almost exactly the position `mould-treatment` already takes in its own words — "UV-C is a disinfection layer, not a moisture control solution" — so the two new FAQs were written to it rather than to the competitor framing.
- **A business-model observation, recorded not acted on.** The detailers holding the caravan/boat cluster are mobile, already service Noosa to the Gold Coast, and already sell "sanitising and mould treatment" as a line item. That is the exact profile of the reseller program's target buyer. Whether that is a competitor or a distribution channel is an owner judgement, not an SEO change.

#### Technical problems found in the repo

1. **Seven titles were still over 60 characters** — the tail of the job begun in run 2. Fixed; the sitewide count is now zero over on both titles and descriptions.
2. **Twenty-three pages still had no outbound contextual link**, and the industry pages still named no location anywhere in their body copy. Partly fixed — six pages this run, tranche 2 of a paced job.
3. **`caravans-and-rvs` and `boats-and-marine` both name mould as their audience's number one problem and never said what UV-C does about it.** Neither linked to `mould-treatment` outside the nav. Fixed.
4. **`machines` had no route to `reseller`** — it carries a Reseller testimonial and offered the reader no way to find out what that involves. Fixed. This was run 5's suggestion 5.

### Changed

Four commits, in priority order (fix broken → improve weak → add new):

1. **`Trim the last seven over-length titles`** — `schools`, `offices`, `hotels`, `gyms-and-fitness`, `boats-and-marine`, `caravans-and-rvs`, `caloundra`. Each drops the third category term rather than the keyword ("Boats & Yachts" over "Boats, Yachts & Marine Vessels") and takes the shorter `| UV Sterile` suffix earlier tranches already use; `caloundra` instead matches the other location pages exactly. `og:title` updated in step. **Sitewide: 7 titles over 60 → 0, descriptions over 155 stay at 0. The metadata job begun in run 2 is finished.**
2. **`Answer "do you come to us?" on six industry pages`** — internal linking tranche 2, on `aged-care`, `medical-clinics`, `hotels`, `offices`, `post-illness` and `rental-properties`. Unlike tranche 1 these needed a sentence written, because the industry pages never name a location in body copy. Every claim is lifted from the location pages rather than invented: Brisbane and Gold Coast are scheduled or next-day commercial work, the Gold Coast takes larger bookings and multi-property portfolios, interstate sites are quoted as unit supply with operator training. The `post-illness` answer says plainly that a single house outside the Sunshine Coast depends on what else is booked that week.
3. **`Answer the mould question on the caravan and boat pages`** — one FAQ each, written to the position `mould-treatment` already holds: kills what the light reaches, adds no moisture, cannot reach behind a lining or into a wet bilge, and a van stored closed or a vessel left sealed will grow it again. Both now link to `mould-treatment` in copy.
4. **`Give a machines buyer a route to the reseller program`** — one FAQ that also separates the two audiences: buy here to treat your own premises, go through the reseller program to treat other people's for a fee. The support it names is taken from the reseller page's own answers, including its qualifier that territory applies to operators committing to a region rather than to every buyer.

**Why 12 pages and not more:** the linking job still has 18 pages without an outbound contextual link. Pacing it beats sweeping it, same reasoning as runs 2–5.

### QA performed

The harness rebuilt from scratch and run against all 41 pages after every change: `<!DOCTYPE html>` first, exactly one `<html>`/`<head>`/`<body>`, open/close balance on 25 tag types, one `<h1>` per page, every JSON-LD block parsing as valid JSON, every FAQPage question **and answer** matching the page's visible text in order, every `Service`/`Product` entity carrying a name and url, every schema `url`/`image` resolving, canonical and `og:url` matching the page's own extensionless route, the og/twitter tag set, every internal href resolving with zero `.html`, `alt` and a resolving `src` on every `<img>`, title ≤ 60 and description ≤ 155 as hard failures, no duplicate titles or descriptions, ABN / phone / email present, FormSubmit endpoint and honeypot intact, and sitemap coverage in both directions.

**All 41 pages pass with zero failures. 81 JSON-LD blocks parse.** One harness fix carried over from run 4: `index` wraps its FAQ questions in `<summary class="faq-q"><h4>` with a trailing `+` glyph, which the generic `<summary>` matcher trips on — handled in the matcher rather than by excluding the page, so the homepage's questions and answers are compared like every other page's.

ABN 78 059 411 175 verified present and unchanged on all 41 pages. Phone occurrences went 209 → 211, both additions being the two copies (visible and schema) of the same new `post-illness` sentence, with the number byte-identical. Email unchanged at 175. FormSubmit endpoints and honeypot fields untouched. `vercel.json`, `main.js`, `styles.css` and `sitemap.xml` untouched — no pages added or removed. Every new FAQ answer is byte-identical between the visible `<p>` and its schema entry with links stripped, asserted by the edit script rather than checked by eye.

### Deliberately NOT done

- **No new page created — sixth run running.** The caravan/boat cluster was the closest thing to an opening found so far, and it is still served by pages that already exist (`caravans-and-rvs`, `boats-and-marine`, `mould-treatment`). What those pages lacked was the mould answer, not a new URL. A "caravan mould treatment" page would compete with `mould-treatment` for the same intent.
- **Did not reconcile the room-duration figures (item 8) or the coach-duration conflict (item 11).** Owner-authored service facts, third run unanswered. Neither figure was propagated this run.
- **Did not claim the field is free of UV competitors** anywhere, including in the new caravan and boat copy, despite that cluster returning no UV service at all.
- **Did not complete the Twitter card tag set on 40 pages.** Settled in run 5: X falls back to the `og:` tags, which are present and correct everywhere.
- **No pricing, payback figure or earnings claim added** to the new `machines` FAQ, though the question it answers invites all three. Owner item 5.
- **Did not extend the materials/fade answer** to the seven pages still missing it. Item 10, unchanged.
- **No `BreadcrumbList`.** Settled in run 3.

### Needs owner input

Items 1–7, 9 and 10 all still stand with **no action taken** — GSC access, live-site confirmation, published reviews with attribution, a Google Business Profile, visible starting prices, a satisfaction guarantee, third-party accreditation (GBAC being the concrete name run 5 attached to it), the HVAC operating-cost argument, and the materials/fade answer for venues and places of worship. See runs 1–5 for the reasoning.

8. **Which room treatment time is correct? Three figures, now in its fourth run unanswered.** `index` says **3–8 minutes**, `machines` and `reseller` say **3–12**, and `australia`, `bed-and-breakfasts`, `caloundra`, `gold-coast`, `hotels`, `mould-treatment` and `noosa` say **12–15**, three of them inside FAQ schema. Ten pages, three answers, on the most-asked question about the service. **One line settles it and the agent will align all ten pages and their schema in a single pass the run after it arrives.**

11. **Does a coach take 60 seconds or 3–4 minutes?** `coaches-and-buses` headlines "A full coach, clean in 60 seconds"; `fleet-vehicles` states "Coach: 3–4 minutes" in its copy and its FAQ schema. Both owner-authored, both live, fourfold apart, on the number the fleet pitch rests on.

12. **New — are the mobile caravan and boat detailers a competitor or a distribution channel?** The operators holding that cluster are already mobile across Noosa to the Gold Coast and already sell mould treatment as a line item, which makes them the reseller program's target buyer on paper. Nothing was written to the site either way. If the answer is "channel", it changes what `reseller` and `cleaning-companies` should say about who the program is for.

### Suggested next run

1. **If the owner has answered items 8 and 11, do those first** — ten pages and three FAQ schema blocks for the room time, two pages for the coach time.
2. **Internal linking, tranche 3.** 18 pages still have no outbound contextual link. The strongest remaining candidates are the industry pages that receive location links and give none back: `childcare`, `schools`, `restaurants`, `gyms-and-fitness`, `funeral-homes`, `veterinary`, `salons-and-beauty`, `cinemas-and-venues`, `places-of-worship`, `sports-clubs`.
3. **Consider the reverse direction for the two pages the site sells hardest.** `reseller` has exactly one outbound contextual link (to `machines`) and `machines` now has two (`reseller`, `sunshine-coast`). Both are endpoints of the funnel with little pointing out of them — worth checking whether that is right or just unfinished.
4. **Start the second lap of keyword rotation** with the clusters that returned something: mould Sunshine Coast, fleet Brisbane, aged care, purchase intent for the unit.
5. **The metadata job is closed.** Do not re-open it without a reason; the next metadata work worth doing is rewriting descriptions for click-through, not for length, and that needs the ranking data the blockers currently prevent.

---

## 2026-09-13 — Run 5

### Researched

- **Keyword clusters sampled this run: the industry pages that had never been sampled, plus the two nearest neighbours.** Funeral homes and mortuary disinfection QLD, veterinary clinic disinfection (parvovirus and ringworm) Sunshine Coast, places of worship / church and community hall sanitising Australia, gyms and fitness centre equipment sanitising Australia, restaurant and commercial kitchen sanitising Sunshine Coast, and school classroom disinfection and gastro-outbreak response QLD. Plus one "people also ask" cluster on material safety — does UV-C damage fabrics, plastics, finishes and artwork.
- **Checked over runs 1–5:** Noosa Heads, mould Noosa/Sunshine Coast, aged care Sunshine Coast, UV-C efficacy PAA (run 1); fleet Brisbane, bond-clean Sunshine Coast, Maroochydore, Caloundra, reseller Australia, mould-duration PAA, branded (run 2); Gold Coast hotels, HVAC Brisbane, childcare QLD, aged care Gold Coast, post-flood odour, two HVAC/odour PAA clusters (run 3); five purchase-intent clusters for the unit (run 4); the six industry clusters and the materials PAA cluster above (run 5).
- **Still to rotate through:** real estate and property sales, offices Brisbane as its own cluster, boats/marine and caravans/RVs, sports clubs, and salons as a standalone rather than paired cluster. Every industry page has now had at least one cluster sampled except those five.

### Found

- **Both standing blockers hold, for the fifth run.** The search tool is US-geolocated and does not reproduce an Australian searcher's local results, and `https://uvsterile.com.au` is still refused by this environment's egress proxy (`403` at the CONNECT tunnel). Ranking positions remain **unmeasured**, not measured-as-zero. New this run: `scsgroup.com.au` is also egress-blocked, so the finding immediately below rests on a search-result snippet rather than on reading their page.
- **No owner commits since run 3.** The room-duration question (item 8) is still unanswered, so nothing was aligned. The inventory has since grown again — see items 8 and 11.
- **The four-run finding that "nobody ranking is a UV specialist" now needs a qualifier.** *SCS Group*, a commercial cleaner with a Sunshine Coast location page, advertises "autonomous UV-C disinfecting" as part of its equipment. That is the first ranking **service** competitor in this region, across five runs and seventeen clusters, that mentions UV-C at all. It does not overturn the positioning finding — they are a generalist listing UV among many methods, which is the *Zoom Office Cleaning* pattern run 2 found in Brisbane, now on the Coast — but "no local competitor offers UV" is no longer a safe thing for the site to imply anywhere. The new reseller FAQ was written with that in mind.
- **A nameable certification specific to this category exists, and a competitor leads with it.** *The Ellsim Group* (Melbourne, funeral home cleaning) leads with **GBAC** accreditation — the Global Biorisk Advisory Council standard for biological contamination control. This sharpens owner item 7 from "any certification" into something concrete and purchasable: GBAC is the accreditation the death-care, gym and venue cleaning categories compete on. Recorded as an observation; nothing was asserted on the site.
- **Nothing in the sampled clusters justified a new page — fifth run running.** Funeral homes, veterinary, places of worship, gyms, restaurants and schools are all held by generalist commercial cleaners with state-capital coverage, and each cluster maps onto an industry page that already exists and already answers the specific hooks the cluster turns on (gastro-outbreak response on `schools` and `childcare`; parvovirus and kennels on `veterinary`; change rooms and shared kit on `gyms-and-fitness`). The gap remains visibility, not coverage.

#### A question the research raised that the site mostly already answers

The materials PAA cluster — will UV-C damage fabric, plastic, finishes, artwork — is a real purchase objection, and the literature is not a clean "no": colour change in dyed fabrics and plastics is dose-cumulative, while tensile strength and flame retardancy were unaffected at the doses studied. Checking the site before writing anything found **nine pages already answer it, each in its own audience's terms** — soft toys on `childcare`, rubber flooring and vinyl mats on `gyms-and-fitness`, marine carpet and leather on `boats-and-marine`, screens on `offices` and `medical-clinics`, HVAC components, fabric seats on `coaches-and-buses`, soft furnishings on `caravans-and-rvs` — and `aged-care` carries the owner-authored general position: *"At our exposure times, no. UV-C affects DNA-level pathogens, not material structure. Prolonged exposure can fade some plastics over years of daily use — not relevant for periodic disinfection."* That is well-judged and consistent with what the literature actually says. **No change made.** Recorded so a future run doesn't re-open it. The pages where it is still unanswered are listed under item 10.

#### Technical problems found in the repo

1. **All 31 service and industry pages had zero contextual internal links.** Link flow ran one way only: the seven location pages point outward into industry pages (the FAQ links added in runs 1–3), and not one industry or service page pointed back or sideways. `machines` and `reseller`, the two highest-value commercial pages on the site, received no in-copy link from anywhere except `australia` and `index`.
2. **Six pages tell the reader to "see our Buy a Unit page" and give them no way to get there** — `bed-and-breakfasts`, `boats-and-marine`, `caravans-and-rvs`, `cleaning-companies`, `coaches-and-buses`, `fleet-vehicles`. Plain text, no anchor.
3. **A second factual conflict, the same class as item 8.** `coaches-and-buses` headlines "A full coach, clean in 60 seconds" and repeated it in its meta description; `fleet-vehicles` states "Coach: 3–4 minutes" in both its visible FAQ and its FAQ schema. Both predate this agent (owner commits, July 2026). See item 11.
4. **The homepage contradicted itself, and that one was this agent's doing.** `index` states 3–8 minutes for a standard room in its copy and its FAQ schema, but its meta description said 12–15. The 12–15 came from run 2's metadata trim, which took the figure used on the service pages without checking the homepage's own text. Fixed — see Changed.
5. **`twitter:title`, `twitter:description` and `twitter:image` are absent from 40 of 41 pages** (only `twitter:card` is present; `index` has a title and description that match neither its `<title>` nor its `og:` tags). **A correction to runs 1–4:** those entries record verifying "the full og/twitter tag set", but the harness only ever checked `twitter:card`. Assessed and **not swept** — X falls back to `og:title`/`og:description`/`og:image`, all of which are present and correct on all 41 pages, so the practical effect is nil and a 41-page edit for it would be churn. Recorded so run 6 knows it was a decision, not an oversight.

### Changed

Four commits, in priority order (fix broken → improve weak → add new):

1. **`Link the cross-references the copy already makes`** — ten links across nine pages, every one of them wrapping text that was already on the page. No wording added, removed or altered. The six "Buy a Unit page" mentions now link to `machines`; "Sunshine Coast" links to `sunshine-coast` from `fleet-vehicles` and `machines`; `mould-treatment` links "post-flood recovery" to `water-damage`, reciprocating the link `water-damage` has carried since run 3; `reseller` links "Operator training" to `machines`. Visible copy only — the FAQPage JSON-LD answer text stays plain and still matches the rendered text word for word. Each page picks up the `.faq details p a` rule the location pages already use. This is tranche 1 of a paced job; see "Suggested next run".
2. **`Trim titles and meta descriptions on nine more pages`** — fourth tranche, chosen as the nine pages that were over length on **both** counts: `odour-elimination`, `restaurants`, `australia`, `veterinary`, `medical-clinics`, `cinemas-and-venues`, `maroochydore`, `salons-and-beauty`, `coaches-and-buses`. **This clears the site's entire over-length description backlog: 9 descriptions over 155 → 0, and 16 titles over 60 → 7.** `og:title`, `og:description` and the `LocalBusiness` schema description on `australia` and `maroochydore` updated in step. Titles now lead with the query rather than the category — "UV-C Sanitisation for Vet Clinics" over "Veterinary Clinics & Pet Boarding", since *vet clinic* is the term that gets typed.
3. **`Answer 'who am I competing against' on the reseller page`** — the question run 4 queued. One FAQ plus its schema entry, built from claims already live (`aged-care` on UV-C as the step after a standard clean; `cleaning-companies` on contracts won on hygiene documentation and on aged care / medical / food service tenders; `machines` on robots staying at one site) and from this run's research. It concedes that larger contractors already bundle UV with chemical, steam and electrostatic methods rather than claiming an empty field — directly because of the SCS Group finding. No earnings figure, rate or market-share number asserted.
4. **`Make the homepage description match the homepage`** — problem 4 above, corrected to the figure `index` itself states. This settles nothing about which room time is right for the business; it only stops the homepage describing itself with a number it never uses.

**Why 18 pages and not more:** the linking job has roughly 25 pages still without an outbound contextual link and the remaining metadata work is 7 titles. Both are better paced than swept, same reasoning as runs 2–4.

### QA performed

The harness rebuilt from scratch and run against all 41 pages: `<!DOCTYPE html>` first, exactly one `<html>`/`<head>`/`<body>`, open/close balance on 26 tag types, every JSON-LD block parsing as valid JSON, every FAQPage question list matching the page's visible `<summary>` text in order, every `Service`/`Product` entity carrying a name, every schema `url`/`image` resolving to a real route or file, canonical and `og:url` matching the page's own extensionless route, the og/twitter tag set, every internal href resolving with zero `.html`, `alt` and a resolving `src` on every `<img>`, ABN / phone / email present, FormSubmit endpoint and honeypot intact, one `<h1>` per page, no duplicate titles or descriptions, and sitemap coverage in both directions.

**All 41 pages pass with zero failures. 81 JSON-LD blocks parse.** ABN 78 059 411 175, phone and email verified unchanged on all 41 pages — the only diff lines touching the phone number are the two location descriptions rewritten around it, with the number itself byte-identical. FormSubmit endpoints and honeypot fields untouched. `vercel.json`, `main.js` and `styles.css` untouched. The new reseller FAQ's answer text is byte-identical between the visible `<p>` and the schema entry, asserted by the edit script rather than checked by eye. All three new link targets resolve, and `--uv` is defined on all nine pages that gained the FAQ link rule.

### Deliberately NOT done

- **No new page created — fifth run running.** Every sampled cluster maps onto an industry page that already exists and already answers the cluster's specific hooks.
- **Did not complete the Twitter card tag set on 40 pages.** X falls back to the `og:` tags, which are present and correct everywhere. See problem 5 — a decision, not an oversight.
- **Did not reconcile any of the three room-duration figures, or the coach-duration conflict.** Both are owner-authored service facts. Neither figure was propagated; the coach figure was *removed* from the `coaches-and-buses` meta description rather than repeated.
- **Did not add a materials/fade FAQ to the pages missing one.** For `cinemas-and-venues` and `places-of-worship` in particular the honest answer turns on what the operator actually does around upholstered seating, heritage textiles and artwork, which this agent does not know. See item 10.
- **Did not assert GBAC or any other accreditation**, and did not claim the local field is free of UV competitors. See the SCS Group finding.
- **No pricing added.** Owner decision; item 5.
- **`sitemap.xml` untouched** — no pages added or removed.
- **No `BreadcrumbList`.** Settled in run 3 as not worth doing on a deliberately flat site. Not re-opened.

### Needs owner input

Items 1–7 and 9 all still stand with **no action taken** — GSC access, live-site confirmation, published reviews with attribution, a Google Business Profile, visible starting prices, a satisfaction guarantee, third-party accreditation (item 7 now has a concrete name attached: **GBAC**), and the HVAC operating-cost argument. See runs 1–4 for the reasoning.

8. **Which room treatment time is correct? Still three figures, still unanswered — now in its third run.** `index` says **3–8 minutes** (copy, FAQ schema and, since this run, its meta description too). `machines` and `reseller` say **3–12**. `australia`, `bed-and-breakfasts`, `caloundra`, `gold-coast`, `hotels`, `mould-treatment` and `noosa` say **12–15**, three of them inside FAQ schema. Ten pages, three answers, on the most-asked question about the service. **This is a one-line answer and the agent will align all ten pages and their schema in a single pass the run after it arrives.**

10. **Should the materials answer be extended to the pages selling repeat treatment of soft furnishings and valuables?** `cinemas-and-venues` (upholstered seating treated between sessions), `places-of-worship` (textiles, timber, artwork), `salons-and-beauty`, `hotels`, `restaurants`, `funeral-homes` and `sports-clubs` have no answer to it, while nine other pages do. The reason this agent did not simply copy the `aged-care` answer across: that answer is about plastics under years of daily use, and stretching it to cover a dyed altar cloth, a painting or a 400-seat cinema's upholstery is a different claim. **What would settle it: has the business treated venues or churches with valuable textiles or artwork, and is there a practice around it** — keeping the focal zone off them, shorter dwell, covering, or simply that it has never been raised? One or two sentences would let all seven pages be answered honestly.

11. **Does a coach take 60 seconds or 3–4 minutes?** `coaches-and-buses` headlines "A full coach, clean in 60 seconds"; `fleet-vehicles` states "Coach: 3–4 minutes" in its copy **and its FAQ schema**. Both are owner-authored and both are live. A fleet operator comparing the two pages sees a fourfold difference on the number the whole pitch rests on. This run took the figure out of the `coaches-and-buses` meta description rather than repeat it, but left the page's `<h1>` alone. Same one-line fix as item 8.

### Suggested next run

1. **If the owner has answered items 8 and 11, do those first** — ten pages and three FAQ schema blocks for the room time, two pages for the coach time.
2. **Internal linking, tranche 2.** Roughly 25 pages still have no outbound contextual link. The highest-value targets are the eight industry pages that *receive* location links and give none back — `aged-care`, `medical-clinics`, `hotels`, `offices`, `post-illness`, `rental-properties` (and `fleet-vehicles`, `mould-treatment`, done this run). Unlike this run's tranche these need a short sentence written, not just an anchor wrapped, because the industry pages never name a location in their body copy at all — which is itself worth noting for a local service business: 31 pages carry no geographic signal outside nav, footer and schema.
3. **Fifth metadata tranche, the last 7 titles:** `schools` (78), `offices` (77), `gyms-and-fitness` (76), `hotels` (76), `boats-and-marine` (75), `caravans-and-rvs` (73), `caloundra` (72). That finishes the job begun in run 2.
4. Rotate keyword checks to the five clusters never sampled: real estate, offices Brisbane, boats/marine and caravans/RVs, sports clubs, salons standalone.
5. Consider whether `machines` should link to `reseller` in copy. It carries a testimonial attributed to a Reseller, Sunshine Coast, and no link to the reseller program anywhere in its body — a buyer weighing "should I run this as a business" has no route.

---

## 2026-09-06 — Run 4

### Researched

- **Keyword cluster sampled this run: purchase intent for the unit itself** — the terms someone uses when they are ready to buy hardware rather than book a treatment. Run 3 flagged that `machines` and `reseller` are the two highest-value pages on the site and had had no cluster research at all. This run gave them one to themselves: "buy commercial UV-C disinfection machine Australia price", "UV disinfection robot / mobile UVC unit for sale Australia commercial", "UV sanitising equipment supplier reseller opportunity Australia", "portable UV-C unit vs autonomous disinfection robot", and a consumables PAA cluster on UV-C lamp life, replacement interval and running cost.
- **Checked over runs 1–4:** Noosa Heads, mould Noosa/Sunshine Coast, aged care Sunshine Coast, UV-C efficacy PAA (run 1); fleet Brisbane, bond-clean Sunshine Coast, Maroochydore, Caloundra, reseller Australia, mould-duration PAA, branded (run 2); Gold Coast hotels, HVAC Brisbane, childcare QLD, aged care Gold Coast, post-flood odour, two HVAC/odour PAA clusters (run 3); the five purchase-intent clusters above (run 4).
- **Still to rotate through:** veterinary and salon/beauty, gyms and fitness, restaurants and hospitality, schools as its own cluster, real estate and property sales, offices Brisbane, boats/marine and caravans/RVs, and the three smallest industry pages (funeral homes, places of worship, sports clubs) which have never been sampled.

### Found

- **Both standing blockers still hold, for the fourth run.** The search tool is US-geolocated and does not reproduce an Australian searcher's local results, and `https://uvsterile.com.au` is still refused by this environment's egress proxy (`EGRESS_BLOCKED`). New this run: `medicalsearch.com.au`, the aggregator that ranks hardest in this cluster, is **also** egress-blocked, so its page structure was inferred from search results rather than read. Ranking positions remain **unmeasured**, not measured-as-zero.
- **No owner commits since run 3**, so the room-duration question (item 8) is still unanswered and nothing was aligned. See below — the inventory has since grown.
- **The purchase-intent cluster has a different competitive shape from every service cluster sampled so far.** The service clusters are held by generalist cleaners who never mention UV. This one is held by three groups who all know exactly what UV-C is: quote aggregators (MedicalSearch, which runs city-level pages such as "UV Disinfection Robot in Brisbane"), autonomous-robot vendors (UVD Robots/Blue Ocean, OhmniClean/OhmniLabs, MUVi, GERMii, RobotLAB), and equipment vendors (Australian Ultra Violet, Ultra Violet Products, UV Cleantech). What is still absent is anyone selling a **hand-portable, operator-led unit to Australian small and mid-size businesses** — the same unoccupied position runs 1–3 found, confirmed from the hardware side.
- **The robot vendors argue against portable units directly, and the site had no answer.** Their comparison content characterises handheld UV as labour-intensive, error-prone, dangerous, and requiring the operator to wear a protective suit. That is the single most likely objection in a buyer's head at the point of purchase, and `machines` was silent on it. Its existing comparison section covers only the step up from a 40W fluorescent unit — the low end, not the alternative a buyer is actually weighing. Acted on; see Changed.
- **Aggregators publish price ranges for this category** ($500–$5,000, ~$2,750 average quoted for disinfection robots). This strengthens owner item 5 rather than resolving it — **no pricing was added to the site.**
- **The site's 9,000-hour rated bulb life is consistent with the category** (low-pressure UV-C lamps are typically quoted at 8,000–12,000 hours), and `machines` already answers bulb replacement in its FAQ. No change needed — recorded so a future run does not re-open it. Category sources also claim roughly 15% annual output degradation; the site makes no such claim and none was added, since it is someone else's number about generic lamps rather than a measurement of this unit.

#### A hypothesis tested and rejected

Runs 2 and 3 both recorded that competitors in aged care, childcare and HVAC lead with certification and regulatory language, and run 2 raised it as owner item 7. This run checked whether the site's real, already-published equipment standards (IEC 62471, ICNIRP UV-C, WHS Act 2011) were simply buried — they appear in full on only five pages — and planned to surface them on the industry pages.

**That was wrong, and the change was not made.** Thirty pages already render a `standards-strip` section, and on the industry pages it is *tailored to that industry's own regulator* rather than listing equipment standards: `aged-care` cites the Aged Care Quality Standards (Standard 3: Personal and clinical care) and offers treatment logs as accreditation evidence. Bolting a generic equipment-certification list onto those pages would have duplicated and diluted something already better-aimed than the generic version.

The consequence for owner item 7 is that it should be read more narrowly from here: the gap is **third-party accreditation of the business** (the NATA/ISO class of signal a competitor leads with), not equipment standards, which the site already states well.

#### Technical problems found in the repo

1. **All 31 `Service` and `Product` JSON-LD blocks lacked a `url`.** Nothing tied the entity to the page describing it — the gap run 3 flagged for `Service`, and it turned out to cover the two `Product` blocks on `machines` and `reseller` as well.
2. **Fourteen of those blocks had no `name` at all** — a `Service` entity Google cannot identify. All fourteen are industry pages. The seven industry pages that *do* carry a name set it to exactly their own `audienceType`, so the fix was derivable from the site's own convention rather than invented.
3. `machines` had no answer to the autonomous-robot comparison (above).

### Changed

Three commits, in priority order (fix broken → improve weak):

1. **`Give every Service and Product entity a name and a canonical url`** — all 31 blocks now carry their page's own extensionless canonical URL, and the 14 missing names are set from that block's existing `audienceType`, matching the convention the seven named industry pages already follow. Additions only: no other schema key changed and no visible copy was touched.
2. **`Trim titles and meta descriptions on eight more pages`** — third tranche of the paced metadata job: `sports-clubs`, `post-illness`, `cleaning-companies`, `funeral-homes`, `bed-and-breakfasts`, `places-of-worship`, `real-estate`, `childcare`. Worst cases were `sports-clubs` (a 229-character description that listed six sports before saying what the service was) and `bed-and-breakfasts` (an 86-character title that spent two ampersands before reaching the brand). `og:title` and `og:description` updated in step. **Sitewide over-length: 23 titles → 16, 17 descriptions → 9.**
3. **`Answer the autonomous-robot comparison on the machines page`** — one new FAQ plus schema entry, built entirely from facts already live on that page: the unit hangs from a hook, runs from a wireless key fob with the operator outside the room, and moves between vehicles, rooms and sites in a day. It concedes the case where a robot genuinely suits (one large fixed facility) rather than claiming the unit wins everywhere. No competitor price or specification is cited.

**Why three changes and not more:** the two schema and metadata jobs together touched 38 pages, which is already the run's full change budget for a site this size. The metadata job has roughly 16 pages left; pacing it still beats a sweep.

### QA performed

The run-2/3 harness, rebuilt and re-run against all 41 pages: `<!DOCTYPE html>` first, exactly one `<html>`/`<head>`/`<body>`, open/close balance on 20 tag types, every JSON-LD block parsing as valid JSON, every FAQPage question list matching the page's visible `<summary>` text in order, every schema `url`/`image` resolving to a real route or file, canonical and `og:url` matching the page's own extensionless route, the full og/twitter tag set, every internal href resolving with zero `.html`, `alt` on every `<img>`, ABN / phone / email present, FormSubmit endpoint and honeypot intact, no duplicate titles or descriptions, and sitemap coverage in both directions.

**All 41 pages pass with zero failures. 81 JSON-LD blocks parse.** One harness bug found and fixed: the FAQ comparison was tripping on `index`, whose `.faq-item` headings carry a trailing `+` toggle glyph the other 40 pages don't have — a harness artefact, not a site fault. ABN 78 059 411 175, phone, email, FormSubmit endpoints and honeypot fields verified unchanged on all 41 pages. `vercel.json`, `main.js` and `styles.css` untouched. The new FAQ's answer text is byte-identical between the visible `<p>` and the schema entry.

### Deliberately NOT done

- **No new page created — fourth run running.** The purchase-intent cluster maps onto `machines` and `reseller`, which already exist and are strong. The one structural idea it suggested — city-level hardware pages, mirroring the aggregator's "UV Disinfection Robot in Brisbane" pattern — would mean building `machines`-variants per city that compete with the existing location pages for the same queries. Not worth splitting relevance for.
- **No pricing added**, despite the category publishing ranges freely. Owner decision; see item 5.
- **No lamp-degradation claim added** — it is a generic category figure, not a measurement of this unit.
- **Did not surface equipment certifications on the industry pages.** Hypothesis tested and rejected — see above. Recorded so run 5 doesn't re-open it.
- **Did not reconcile the room-duration figures.** Now worse than run 3 recorded; see item 8 below.
- **`sitemap.xml` untouched** — no pages added or removed.
- **No `BreadcrumbList`.** Settled in run 3 as not worth doing on a deliberately flat site. Not re-opened.

### Needs owner input

Items 1–7 and 9 all still stand with **no action taken** — GSC access, live-site confirmation, published reviews with attribution, a Google Business Profile, visible starting prices, a satisfaction guarantee, third-party accreditation (now narrowed, see above), and the HVAC operating-cost argument. See runs 1–3 for the reasoning.

8. **Which room treatment time is correct? There are now three figures live, not two.** Run 3 recorded a conflict between the homepage and `bed-and-breakfasts`; checking the whole site this run found a third. The full inventory:

   | Figure | Pages |
   |---|---|
   | **3–8 minutes** | `index` (twice, incl. FAQ schema) |
   | **3–12 minutes** | `machines`, `reseller` |
   | **12–15 minutes** | `australia`, `bed-and-breakfasts`, `caloundra`, `gold-coast` (incl. FAQ schema), `hotels`, `mould-treatment` (incl. FAQ schema), `noosa` |

   Ten pages, three answers, on the single most-asked question about the service — and it is in FAQ schema on three of them, so it is what Google reads. 3–8 and 3–12 are at least compatible; 12–15 is not compatible with either. A prospective client who opens the homepage and then a service page sees the site contradict itself. **This is a one-line answer from the owner and the agent will align all ten pages and their schema in a single pass next run.** It will not guess, and it did not propagate any figure further this run.

### Suggested next run

1. **If the owner has answered item 8, do that first** — ten pages and three FAQ schema blocks, one pass.
2. Fourth metadata tranche, 8 pages, worst first from the remaining 16 titles / 9 descriptions: `odour-elimination` (188-char description), `schools`, `offices`, `cinemas-and-venues`, `restaurants`, `veterinary`, `boats-and-marine`, `caravans-and-rvs`.
3. Rotate keyword checks to the clusters listed above — the three never-sampled industry pages (`funeral-homes`, `places-of-worship`, `sports-clubs`) are the priority, since this run rewrote their metadata without ever having researched their clusters.
4. Consider whether `reseller` needs the same objection-handling treatment `machines` just got. Its FAQ answers earnings, experience, territory, support, ROI and side-business fit, but nothing about what a reseller competes against locally.

---

## 2026-08-30 — Run 3

### Researched

- **Keyword clusters sampled this run:** UV disinfection for Gold Coast hotels, HVAC/air-conditioning UV sanitisation Brisbane, childcare and early-learning disinfection QLD, aged care infection control Gold Coast, post-flood and water-damage odour QLD, plus two "people also ask" clusters — "does UV in air conditioning actually work / is it worth it" and "why does it still smell musty after water damage".
- **Checked over runs 1–3:** Noosa Heads, mould Noosa/Sunshine Coast, aged care Sunshine Coast, UV-C efficacy PAA (run 1); fleet Brisbane, end-of-lease Sunshine Coast, Maroochydore, Caloundra, reseller Australia, mould-duration PAA, branded (run 2); the seven above (run 3).
- **Still to rotate through:** veterinary and salon/beauty clusters, gyms and fitness, restaurants and hospitality, schools as its own cluster, real estate and property sales, offices Brisbane, boats/marine and caravans/RV, and purchase-intent terms for the unit itself ("buy UV sanitising unit Australia", "commercial UV disinfection machine price").

### Found

- **Both standing blockers still hold, for the third run.** The search tool is US-geolocated and does not reproduce an Australian searcher's local results, and `https://uvsterile.com.au` is still refused by this environment's egress proxy (`EGRESS_BLOCKED`). No live rendering, response headers, indexing status or Core Web Vitals again this run. Everything below is verified against repository source, which is what deploys. Ranking positions remain **unmeasured**, not measured-as-zero.
- **The central competitive finding is now consistent across three runs and eleven clusters: nobody ranking is a UV specialist.** Gold Coast hotels, Brisbane HVAC, QLD childcare and Gold Coast aged care are all held by generalist commercial cleaners and pest/hygiene contractors competing on chemical disinfection, certification and years-in-business. Not one of the ranking service providers in this run's samples mentions UV-C at all. The exception is the equipment vendors (Steril-Aire AU, Australian Ultra Violet, Alfaa, Honeywell), who sell installed hardware, not booked treatments — the same split run 1 identified. The positioning is genuinely unoccupied; the deficit is visibility, not proposition.
- **Nothing in the sampled clusters justified a new page.** Every cluster maps onto a page that already exists (`hotels` + `gold-coast`, `hvac-air-conditioning` + `brisbane`, `childcare`, `aged-care` + `gold-coast`, `water-damage` + `odour-elimination`). Building suburb- or pairing-level pages on top of these would split relevance across near-duplicates rather than add coverage.
- **Competitor observations:**
  - *Steril-Aire Australia* competes on named mechanism — 253.7 nm output, biofilm on coils and drain pans, and a quantified efficiency claim (a 0.05 mm biofilm costing 37% of thermal efficiency). The `hvac-air-conditioning` page argues hygiene only; the operating-cost argument is the one a facilities manager buys on, and the site does not make it.
  - Childcare and aged-care contractors in QLD lead with regulatory language — NQF/National Quality Framework alignment, infection-control training records, triple certification. Trust signals, not technology claims. Same certification theme flagged in run 2.
  - US HVAC coverage of "UV light worth it" is dominated by *installed-lamp* pricing and bulb-replacement costs. The `hvac-air-conditioning` page's existing FAQ separating periodic service treatment from installed in-duct lamps is well-aimed at that confusion and is worth keeping prominent.

#### Technical problems found in the repo

1. **The homepage had six visible FAQs and no `FAQPage` markup** — the only page on the site with FAQ content and no schema for it, and the highest-value page on the site. Run 1's sweep fixed 31 FAQ blocks and added one to `contact`; `index` was missed because its FAQ markup uses the `.faq-grid`/`.faq-item` component rather than the `.faq`/`<details>` pattern the other 40 pages use.
2. **All six Queensland location pages under-declared their coverage.** Each `LocalBusiness` block named a single `areaServed` — the one region in the page title — while the page's own visible "Areas Covered" section listed eight to eleven suburbs the markup never mentioned. None of the six carried `GeoCoordinates` either, though `index` has declared them since before run 1.
3. **A factual conflict between two owner-authored pages, still unresolved (see "Needs owner input").** `index` states a standard office or hotel room takes **3–8 minutes**; `bed-and-breakfasts` states **12-15 minutes per room**. Both predate this agent. Runs 1–2 propagated the 12–15 figure to five further pages without noticing the homepage said something different — that amplification is this agent's, and it is recorded here rather than quietly reconciled.
4. `water-damage` had no answer to "why does it still smell after it's dried", which the PAA research put at the centre of that cluster.

### Changed

Four commits, in priority order (fix broken → improve weak):

1. **`Add missing FAQPage schema to the homepage`** — six Q&As, extracted programmatically from the visible copy so schema and on-page text match exactly, as Google requires. No visible copy changed. Site total: 81 JSON-LD blocks, all parsing.
2. **`Trim titles and meta descriptions on eight more pages`** — second tranche of the paced metadata job: `about`, `contact`, `aged-care`, `post-tenant`, `hvac-air-conditioning`, `rental-properties`, `fleet-vehicles`, `water-damage`. All eight titles now under 60 characters and all descriptions under 155. `og:title` and `og:description` updated in step — `about` was the worst case, carrying an `og:description` that shared no wording at all with its meta description. `post-tenant` now leads on "bond cleans" rather than "end-of-lease", acting on run 2's finding that it is the term Australian searchers use and that no ranking bond cleaner pairs it with UV.
3. **`Add geo coordinates and full suburb coverage to location page schema`** — `areaServed` on each of the six QLD location pages rebuilt from that page's own visible suburb list (56 Places total), plus the Noosa Heads `GeoCoordinates` already declared on `index`, which match the `PostalAddress` stated alongside them on every one of those pages. No suburb was added that the page did not already name, and no visible copy changed.
4. **`Answer the lingering musty-smell question on the water damage page`** — one new FAQ plus schema entry, built from the mechanism the `odour-elimination` page already sets out (musty smell is microbial, not moisture) and keeping the line-of-sight caveat `mould-treatment` states, so it does not promise what UV-C cannot reach. Two contextual internal links, plus the `.faq details p a` rule the location pages already carry.

**Why 15 pages and not more:** the metadata job still has roughly 23 pages to go. Same reasoning as run 2 — pacing it beats a single sweep that reads as churn.

### QA performed

The run-2 harness, extended, run against all 41 pages: `<!DOCTYPE html>` first, exactly one `<html>`/`<head>`/`<body>`, open/close balance on 19 tag types, every JSON-LD block parsing as valid JSON, every FAQPage question list matching the page's visible `<summary>` text in order, every schema `url`/`image` resolving to a real route or file, canonical and `og:url` matching the page's own extensionless route, the full og/twitter tag set present, every internal href resolving with zero `.html`, `alt` on every `<img>`, ABN / phone / email present, FormSubmit endpoint and honeypot intact on every page with a form, no duplicate titles or descriptions, and sitemap coverage in both directions.

All 41 pages pass with zero failures. 81 JSON-LD blocks parse (was 80 — one new FAQPage on `index`). Two harness bugs found and fixed while building it: `<head` was substring-matching `<header`, and title lengths were being measured on the raw source rather than the unescaped text. ABN 78 059 411 175, phone, email, FormSubmit endpoints and honeypot fields verified unchanged on all 41 pages. `vercel.json`, `main.js` and `styles.css` untouched.

Remaining metadata over-length, as warnings rather than failures: **23 titles over 60 characters, 17 descriptions over 155.** Next tranches, worst first.

### Deliberately NOT done

- **No new page created.** Third run running: every sampled cluster maps to an existing page. See above.
- **`sitemap.xml` untouched** — no pages added or removed.
- **No `BreadcrumbList` schema.** Deferred a third time, and this time with a recommendation to drop it: the site is deliberately flat (every page sits at the root, `/noosa` is not under `/locations/`), so a breadcrumb trail would have to be invented rather than described. Google's breadcrumb rich result reflects real hierarchy. Recorded as "not worth doing" rather than "still queued", so run 4 doesn't re-open it.
- **Did not reconcile the 3–8 vs 12-15 minute room figure.** Both are owner-authored, this agent cannot know which is right, and picking one would be inventing a service fact. Not propagated any further this run either. See below.
- **Did not add the coil-biofilm efficiency argument to the HVAC page.** The 37%-efficiency-loss figure belongs to a competitor's marketing, and the site has no measurement of its own to cite. Making a quantified energy claim on the strength of someone else's number is not something this agent should do unprompted.

### Needs owner input

Run 1's six items and run 2's seventh all still stand, with **no action taken on any of them** — GSC access, live-site confirmation, published reviews with attribution, a Google Business Profile, visible starting prices, a satisfaction guarantee, and any nameable certification or accreditation. See runs 1–2 for the reasoning. Two additions:

8. **Which room treatment time is correct — 3–8 minutes, or 12–15?** The homepage FAQ says a standard office or hotel room takes 3–8 minutes. The bed-and-breakfasts page says 12-15 minutes per room. Both were written before this agent existed; runs 1–2 then repeated the 12–15 figure on five more pages. They are now both live, in FAQ schema, and a prospective client comparing the homepage against a service page sees the site contradict itself on the single most-asked question about the service. **This is a one-word answer from the owner and the agent will align every page to it next run.** It will not guess.
9. **Is there an operating-cost argument for the HVAC service?** The strongest competitor in that cluster sells on plant efficiency — biofilm on cooling coils costing thermal performance — rather than on hygiene, and facilities managers buy on running cost. If UV Sterile has ever measured or been told of an efficiency or maintenance-interval benefit on a real job, that is the argument the `hvac-air-conditioning` page is missing. The agent will not borrow a competitor's figure to make it.

### Suggested next run

1. Third metadata tranche, 8 pages, worst first: `sports-clubs` (229-char description), `post-illness` (196), `cleaning-companies` (192), `funeral-homes` (187), `bed-and-breakfasts` (86-char title), `places-of-worship`, `real-estate`, `childcare`.
2. If the owner has answered item 8, align the room-duration figure sitewide — it touches seven pages and their FAQ schema.
3. Rotate keyword checks to the untouched clusters listed above, and give the purchase-intent terms for the unit a run of their own — `machines` and `reseller` have had no cluster research at all beyond run 2's single reseller check, and they are the two highest-value pages on the site.
4. Consider `Service` schema `url` fields: the 33 service and industry pages declare a `Service` with no `url`, so nothing ties the entity to the page describing it.

---

## 2026-08-23 — Run 2

### Researched

- **Keyword clusters sampled this run:** fleet vehicle sanitisation Brisbane, end-of-lease / bond-clean sanitisation Sunshine Coast, "UV sanitisation" Maroochydore and Caloundra, become a UV cleaning reseller Australia, plus the UV-C-and-mould "people also ask" cluster (does UV kill mould, how long does it take) and a branded check on `uvsterile.com.au`.
- **Checked over runs 1–2:** Noosa Heads, mould Noosa/Sunshine Coast, aged care Sunshine Coast, UV-C efficacy PAA (run 1); the five above (run 2).
- **Still to rotate through:** UV disinfection Gold Coast hotels, childcare and school UV disinfection QLD, HVAC UV sanitisation Brisbane, odour removal and post-flood clusters, aged care Gold Coast, veterinary and salon clusters.

### Found

- **Both run 1 blockers still hold, unchanged.** The search tool is US-geolocated, so it does not reproduce an Australian searcher's local results, and `https://uvsterile.com.au` is still blocked by this environment's egress proxy (403 at the CONNECT tunnel) — no live rendering, headers, indexing status or Core Web Vitals this run either. Findings below are verified against repository source, which is what deploys. Ranking positions remain unmeasured, not measured-as-zero.
- **Nothing in the sampled clusters justified a new page.** The Brisbane fleet cluster is held by general commercial cleaners and detailers, not UV specialists; `fleet-vehicles` and `brisbane` already address it. The Sunshine Coast bond-clean cluster is crowded and price-led, and no ranking provider mentions UV at all — but that is a differentiator for the existing `post-tenant` page, not a reason to build another one.
- **Competitor observations:**
  - *Clean-Air Australia* runs Sunshine Coast HVAC-hygiene location pages and leads with NATA-accredited IAQ testing and ISO-certified UVC. Direct overlap with `hvac-air-conditioning`, and they compete on third-party certification rather than on service. Recorded as an observation — see "Needs owner input".
  - *Zoom Office Cleaning* (Brisbane) lists UV-C as one of five sanitisation methods alongside chemical, steam, electrostatic and ozone. A generalist bundling UV, not a specialist.
  - A Brisbane operator trades under the name *UV-Clean* (Level 1/241 Adelaide St). Name-adjacent in the same vertical; worth the owner knowing it exists.
  - Bond cleaners across the Coast are a plausible partner channel rather than a competitor — the same argument `cleaning-companies` already makes.

#### Technical problems found in the repo

1. **Every location page's `LocalBusiness` schema pointed its `url` at a page that does not exist.** All seven declared `https://uvsterile.com.au/locations/<slug>.html` — a `/locations/` directory the site has never had, plus a `.html` extension `cleanUrls` strips. Seven 404s, none matching the page's own canonical.
2. **Eight pages declared a schema `image` of `/assets/logo.svg`** — there is no `/assets/` directory either. Google cannot fetch an image that 404s, and SVG is not among the formats it accepts for structured-data images regardless.
3. `mould-treatment` had no answer to "how long does it take", which the PAA research put among the most-asked questions in that cluster.

### Changed

Four commits, in priority order (fix broken → improve weak):

1. **`Point LocalBusiness schema url and image at real URLs`** — repointed the seven `url` values to their extensionless canonical and the eight `image` values to `/images/sterile-bright-unit.png`, a real PNG already serving as the sitewide `og:image`. No visible copy changed.
2. **`Add FAQ sections and FAQPage schema to remaining three location pages`** — finishes the location set begun last run. `maroochydore`, `caloundra` and `australia` each get four questions written to their actual audience rather than a shared template: after-hours office cycles, fleet turnaround and the hospital precinct for Maroochydore; holiday-let changeovers, aged-care scheduling and residential whole-home for Caloundra; travel-versus-unit-supply, operator training and reseller territories for the national page. Every factual claim traced to copy already live elsewhere. Adds 9 contextual internal links and the `.faq details p a` rule the other location pages already carry.
3. **`Trim titles and meta descriptions on eight highest-value pages`** — first tranche of the paced metadata job. `index`, `machines`, `reseller`, `noosa`, `sunshine-coast`, `brisbane`, `gold-coast` and the `mould-treatment` description. All eight titles now fit under 60 characters and all descriptions under 155, so neither gets truncated. Titles lead with the query rather than the brand. `og:title`, `og:description` and the `LocalBusiness` schema `description` were updated in step, so no page describes itself two different ways.
4. **`Answer 'how long does UV-C mould treatment take'`** — one new FAQ plus schema entry on `mould-treatment`, built from the 12–15 minute room figure and the focal-zone dwell language already stated elsewhere on the site.

**Why 12 pages and not more:** the metadata job still has ~25 pages to go. Rewriting all of them in one week alongside a schema change reads as churn. Next tranche next run.

### QA performed

A reusable harness now checks, on all 41 pages: `<!DOCTYPE html>` first, exactly one `<html>`/`<head>`/`<body>`, open/close balance on 17 tag types, every JSON-LD block parsing as valid JSON, every FAQPage question list matching the page's visible `<summary>` text in order, every schema `url`/`image` resolving to a real route or file, every internal href resolving extensionless with zero `.html`, no `.html` in any canonical or `og:url`, `alt` on every `<img>`, ABN / phone / email present, FormSubmit endpoint and honeypot intact on the four pages that have forms, no duplicate titles or descriptions, and sitemap coverage in both directions.

All 41 pages pass with zero failures. 80 JSON-LD blocks now parse (was 77 — three new FAQPage blocks). ABN 78 059 411 175, phone, email, FormSubmit endpoints and honeypot fields verified unchanged. `vercel.json`, `main.js` and `styles.css` untouched.

### Deliberately NOT done

- **No new page created.** See above — neither sampled cluster produced a distinct, unaddressed opportunity.
- **`sitemap.xml` untouched** — no pages added or removed.
- **No `BreadcrumbList` schema and no `GeoCoordinates` on location pages.** Still genuine wins, still deferred: this run already changed 12 pages, and both are sitewide sweeps better done on their own. Carried to next run.
- **No mould-specific dwell-time figure invented.** The new mould FAQ uses the room figure the site already states and explains the mechanism; it does not assert a kill time for mould that the business has not published.

### Needs owner input

Run 1's six items all still stand — **GSC access, live-site confirmation, published reviews with attribution, a Google Business Profile, visible starting prices, and a satisfaction guarantee.** No action taken on any of them. Repeated here rather than restated at length; see run 1 for the reasoning. One addition:

7. **Third-party certification or accreditation, if any exists.** The HVAC competitor found this run leads with NATA-accredited testing and ISO-certified UVC, and competes on that rather than on service. If UV Sterile holds any certification, accreditation, insurance class or equipment standard that can be named, it belongs on the site — but the agent cannot assert one it has not been given. Related: the site's existing "full public liability cover, certificates of currency on request" line is a trust asset currently buried in one FAQ answer.

### Suggested next run

1. Second metadata tranche, 6–8 pages: `book`, `contact`, `about`, `aged-care`, `post-tenant`, `hvac-air-conditioning`, `rental-properties`, `fleet-vehicles`.
2. `BreadcrumbList` schema sitewide, or `GeoCoordinates` on the six QLD location pages — one, not both.
3. Rotate keyword checks to the untouched clusters listed above.
4. Consider whether `post-tenant` should target the bond-clean vocabulary more directly, given no ranking bond cleaner mentions UV.

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
