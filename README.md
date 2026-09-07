# Flexikits (Singapore)

A static landing site where people can browse flexible work areas, register interest in
the ones that fit them, and create one profile. Flexikits does not screen, rank, or place
people, and does not advertise confirmed vacancies unless a card is labelled Open Opportunity.

## Run locally

```bash
python3 -m http.server 8765
```

Then open <http://localhost:8765/>.

| Page | Path |
| --- | --- |
| Landing | `/` |
| Profile created | `/thank-you/` |
| Privacy Policy | `/privacy-policy/` |
| Terms of Use | `/terms-of-use/` |

On Vercel, Netlify, or Apache, the live URLs omit the trailing slash and `.html`
(`domain.com/thank-you`, `domain.com/privacy-policy`, `domain.com/terms-of-use`).
Legacy `.html` paths redirect to those clean URLs.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Landing page: hero, platform explanation, opportunity listings, profile form, FAQ |
| `styles.css` | All styling. Section rhythm is driven by the `--section-y` token |
| `js/opportunities.js` | Opportunity catalogue and category metadata. **Placeholder data** |
| `js/app.js` | Listing rendering, filter, detail drawer, interest capture, form validation |
| `assets/` | Photography and category illustrations |

## Placeholder data

`js/opportunities.js` is marked `source: "DEVELOPMENT_DATA"` with
`productionReady: false`. Every listing is currently `kind: "opportunity_area"`, meaning a
category of work someone can register interest in, **not** a confirmed vacancy.

The warning about this is aimed at the team, not at visitors:

- A `console.warn` fires on every page load.
- Appending `?dev=1` to the URL shows an on-screen banner.

Neither appears in the normal visitor experience. Once real data is wired up, set
`meta.productionReady` to `true` and both stop.

## Opportunity area vs open opportunity

This distinction is a product requirement, not a styling choice.

| `kind` | Badge | Card CTA | Meaning |
| --- | --- | --- | --- |
| `opportunity_area` | Opportunity Area | Explore This Area | A category of work. Nobody is confirmed to be hiring |
| `active_job` | Open Opportunity | View Opportunity | A confirmed vacancy from a participating company |

Never relabel an area as an open opportunity to improve conversion. Only set
`kind: "active_job"` when a participating company has confirmed a live opening.

Optional fields (`compensation`, `companyName`, `workArrangement`, `employmentType`,
`postedAt`) render only when present. Omit anything unverified rather than guessing.

## Before production

### Data

- [ ] Replace `js/opportunities.js` with CMS or backend records, or fetch them at runtime.
- [ ] Set `meta.productionReady` to `true` only after ops and legal sign-off.
- [ ] `POST` the profile payload built in `js/app.js` to a real candidate-profile API.
      `sessionStorage` is preview-only and holds nothing durably.
- [ ] Persist `listing.id` and `category.id` on the profile, not just display labels.

### Legal

- [ ] `/privacy-policy` and `/terms-of-use` (`privacy-policy/index.html`,
      `terms-of-use/index.html`) are **unapproved drafts**. Replace with
      counsel-approved text reviewed against the Singapore PDPA.
- [ ] Confirm the on-form disclosure in `index.html` matches the approved Privacy Policy
      and the real data-sharing workflow.
- [x] Published contact email (`support@flexikits.com`) and business correspondence
      address (1 Raffles Quay, Singapore 048583) in the footer and on both legal pages.
- [ ] Add the registered legal entity name and PDPA data protection officer details
      (if required) to the footer and legal pages.
- [ ] Confirm retention periods and the access, correction, and withdrawal process.
- [ ] Confirm WhatsApp or mobile is genuinely how participating companies make contact.

### SEO

- [ ] Add absolute `rel=canonical`, `og:url`, `og:image`, and `twitter:image` once the
      production domain is confirmed. Canonical is deliberately omitted until then, since a
      wrong absolute canonical is worse than letting Google self-canonicalise.
- [ ] Add `sitemap.xml` and `robots.txt`.
- [ ] **Do not add `JobPosting` structured data** while the catalogue holds opportunity
      areas. `JobPosting` requires a real open role, and using it for interest categories
      risks a Google Search manual action. Add it per-listing only for `active_job`
      records, with verified fields.
- [ ] `FAQPage` structured data is already present in `index.html`. If FAQ copy changes,
      update the JSON-LD to match, because it must mirror the visible text.

## Copy conventions

- Plain, direct prose. No em dashes in visitor-facing text.
- Lead with what the reader gets, not with what Flexikits is not.
- No invented pay, company names, work arrangements, vacancy counts, urgency, or career
  progression claims.
- No aggressive CTAs. "Explore This Area", "View Opportunity", and "I'm Interested" are the
  approved actions.
- Keep opportunity-related contact consent separate from marketing consent. The marketing
  checkbox must stay optional and unchecked by default.
