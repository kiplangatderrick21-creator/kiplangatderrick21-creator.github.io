# Nivavale

A production-ready corporate website for **Nivavale**, a quantitative intelligence and technology
firm. Built with Next.js (App Router), TypeScript, and Tailwind CSS v4, exported as a fully static
site and published from GitHub Pages (with an optional Cloudflare Pages deployment for the contact
form endpoint).

---

## Design system

Everything visual comes from one place: the `@theme` block at the top of `app/globals.css`. Change a
token there and the change lands everywhere — no component hard-codes a colour or a font name.

### Palette

| Token family | Base                      | Role                                                                                                        |
| ------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `forest-*`   | **Deep Forest Green** `#10251D` | Primary brand colour. Navigation, dark sections, logo, footer.                                              |
| `ivory-*`    | **Warm Ivory** `#E9E3D5`        | Main light backgrounds and contrast.                                                                         |
| `gold-*`     | **Muted Antique Gold** `#B59A63`| Restrained accents only: eyebrow labels, hairline rules, nav underlines, chart marks, CTAs on dark surfaces. |
| `navy-*`     | **Charcoal Navy** `#202C35`     | Secondary dark sections, research and data panels.                                                            |

Neutrals are derived from the ivory and charcoal families, and a small set of semantic tokens keeps
text readable without guesswork:

| Token                                            | Purpose                                            | Contrast                       |
| ------------------------------------------------ | -------------------------------------------------- | ------------------------------ |
| `ink`                                            | Primary text on light surfaces                     | 11.4:1 on `ivory-200`          |
| `ink-muted`                                      | Secondary text on light surfaces                   | 5.2:1 on `ivory-200`           |
| `rule` / `rule-strong`                           | Decorative hairline / interactive border on light  | `rule-strong` 3.6:1 (WCAG 1.4.11) |
| `on-dark` / `on-dark-muted`                      | Text on forest and navy surfaces                   | 11.1:1 / 7.8:1 or better       |
| `rule-dark` / `rule-dark-strong` / `rule-navy`   | Hairlines and borders on dark surfaces             | —                              |

Gold is never a large field on a light page. On ivory it appears only as thin rules and as
`gold-600`/`gold-700` small-capital labels, and the primary button inverts to Deep Forest Green on
Warm Ivory (12.5:1) instead of gold.

### Typography

- **Cormorant Garamond** (`font-display`) — display headings, figures, pull quotes.
- **Manrope** (`font-sans`) — body copy, navigation, buttons, labels, and data.

Both are self-hosted at build time by `next/font/google`, so there is no render-blocking font request
and no layout shift. Two families only: there is no icon library, no UI kit, and no animation library.

### Logo

`components/ui/Logo.tsx` draws the mark as vector geometry: seven diamond nodes joined by six edges
into an N, with the diagonal running through the centre node. It is point-symmetric about its centre
and mirror-symmetric about its diagonal, which is what gives it balance and makes it read as a
lattice as well as a letter. It paints with `currentColor` on a transparent background, so the same
code renders correctly in deep forest green on ivory, ivory on deep forest green, and single-colour
black or white, and it stays legible at favicon size (`app/icon.svg`).

Standalone copies for reports, email signatures, business cards, and presentations are in
`public/brand/`: `nivavale-mark-forest.svg`, `nivavale-mark-ivory.svg`, `nivavale-mark-black.svg`,
`nivavale-mark-white.svg`, plus `nivavale-lockup-forest.svg` and `nivavale-lockup-ivory.svg`. The
lockup files set the wordmark in Cormorant Garamond with a Georgia fallback; the on-page lockup always
uses the self-hosted webfont.

`public/brand/nivavale-avatar-1080.png` is the raster version for places that cannot take an SVG — a
social avatar for WhatsApp, LinkedIn, and Instagram. It is a 1080×1080 tile of Deep Forest Green with
the Warm Ivory mark at 59% of the tile, which keeps it clear of the circular crop those platforms
apply. It was rendered from the same vector geometry (see [Open Graph card](#open-graph-card) for the
method), so it stays sharp at every size those platforms display.

### Open Graph card

`app/opengraph-image.png` is the social sharing card: deep forest green, a gold hairline, the lattice
monogram, and the positioning statement. It is committed as a static file so it is served at
`/opengraph-image.png` with a correct `image/png` content type, and `app/opengraph-image.alt.txt`
supplies its alt text.

It was rendered from the brand tokens with Next's own `next/og` renderer rather than drawn by hand.
To regenerate it after a brand change, temporarily add `app/opengraph-image.tsx` returning
`new ImageResponse(...)`, keep `export const dynamic = 'force-static'` in that file (without it,
`next build` refuses to collect the route when `output: 'export'` is set), run `npm run build`, then
copy `out/opengraph-image` over `app/opengraph-image.png` and remove the route file again.

### Accessibility

- Semantic landmarks throughout: `header`, `nav`, `main`, `footer`, a single `h1` per page, and
  ordered lists wherever order carries meaning.
- A two-tone focus indicator — a 2px gold outline plus a 2px forest ring — so at least one ring clears
  3:1 against every surface in the palette.
- A skip link, `aria-current` on the active navigation item, `aria-expanded`/`aria-controls` on the
  mobile menu, `Escape` to close it, 44px minimum touch targets, and labelled form fields with
  `aria-invalid` plus `aria-describedby` on validation errors.
- `prefers-reduced-motion` is honoured globally: entrance animations and smooth scrolling are both
  suppressed.
- Decorative charts are `aria-hidden="true"` and contain no numbers, so they cannot be misread as
  data or as a performance record.

## Tech stack

- **Next.js 16** (App Router, `output: 'export'` static export)
- **TypeScript** (strict)
- **React 19**
- **Tailwind CSS v4** (CSS-first theming via `@theme` in `app/globals.css`)
- **No UI, icon, chart, or animation libraries** — every visual is hand-built SVG or CSS, which keeps
  the bundle small and the styling consistent.

## Project structure

```
app/                    # Routes, layout, metadata, fonts, favicon
  layout.tsx            # Root layout: fonts, metadata, skip link, header and footer
  page.tsx              # Home
  about/ research/ analytics/ technology/ education/ contact/
  opengraph-image.png   # Social card (see "Open Graph card" below)
  opengraph-image.alt.txt  # Alt text for the social card
  not-found.tsx         # 404
  icon.svg              # Favicon (logo mark on deep forest green)
  globals.css           # The whole design system: palette, type, focus, motion
components/
  layout/               # Header, Footer, Container, PageHero
  ui/                   # Logo, Button, Card, Panel, SectionHeading, Tag, Icon
  data-viz/             # LatticeGrid, SignalPlot, ExposureBars, StackLedger
  home/                 # Homepage sections, including DisciplinesStrip
  contact/              # ContactForm, EmailActions (webmail redirects)
lib/
  site.ts               # Site config: name, tagline, description, url, email, nav
  content.ts            # All page copy (capabilities, research areas, stack layers, ...)
  email.ts              # mailto: and webmail (Gmail/Outlook) compose links
functions/
  api/contact.ts        # Cloudflare Pages Function that emails contact submissions
public/
  brand/                # Standalone logo SVGs for print, decks, and signatures
  robots.txt  sitemap.xml  .nojekyll
.github/workflows/
  deploy-pages.yml      # Builds out/ and publishes it to GitHub Pages
```

### Design primitives worth knowing

| Component                     | Use it for                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `PageHero`                    | The opening band on every interior route. Keeps all six pages identical at the top.           |
| `SectionHeading`              | Gold eyebrow + display headline + standfirst. `tone="dark"` on forest or navy surfaces.       |
| `Panel`                       | The framed instrument surface for charts. `tone="navy"` or `tone="forest"`.                    |
| `LatticeGrid`                 | The brand texture, as a CSS background. Control intensity with an `opacity-*` utility.        |
| `SignalPlot` / `ExposureBars` | Decorative, unit-free figures. Always `aria-hidden`, never numeric.                           |
| `StackLedger`                 | An ordered, hairline-ruled ledger — used for the technology stack.                            |

## Getting started

Requirements: **Node.js 18.18+** (Node 20 LTS recommended).

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
```

Then open <http://localhost:3000>.

## Scripts

| Command             | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Run the local dev server                        |
| `npm run build`     | Type-check and produce a static site in `out/`  |
| `npm run typecheck` | Run TypeScript type checking only               |
| `npm run preview`   | Serve the built `out/` folder locally           |

## Environment variables

Copy the example file and fill in real values:

```bash
copy .env.example .env.local   # Windows
cp .env.example .env.local     # macOS / Linux
```

| Variable                      | Purpose                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_CONTACT_ENDPOINT`| Optional override for the contact form's POST endpoint. Unset means the form posts to `/api/contact`.     |

The email delivery settings are **server-side** and therefore do not belong in `.env.local` — see
[Contact form and email](#contact-form-and-email) below.

**Never commit `.env.local` or real secrets.** `.env.local` and all real env files are gitignored.
`NEXT_PUBLIC_*` values are inlined at build time, so only put public endpoints here — never API keys
or secrets.

## Contact form and email

The contact form (`components/contact/ContactForm.tsx`) posts JSON to `NEXT_PUBLIC_CONTACT_ENDPOINT`,
which defaults to `/api/contact`.

`/api/contact` is a **Cloudflare Pages Function** (`functions/api/contact.ts`). The site is a static
export, so it cannot host API routes itself; the function supplies the one piece of server behaviour
the site needs — validating the submission and emailing it to **`info@nivavale.com`** through the
[Resend](https://resend.com) REST API.

### One-time setup

1. **Verify the domain with Resend** — create a Resend account, add `nivavale.com`, and publish the
   DNS records it shows (SPF/DKIM). Resend will not send from `@nivavale.com` until this is done.
2. **Create an API key** — Resend → API Keys → Create, and copy the `re_…` value.
3. **Add it to Cloudflare** — Workers & Pages → your Pages project → Settings →
   **Variables and Secrets** → add `RESEND_API_KEY`, type **Secret**, for both Production and
   Preview.
4. **Redeploy** the Pages project.

Optional variables on that same screen:

| Variable         | Purpose                                                                       |
| ---------------- | ----------------------------------------------------------------------------- |
| `CONTACT_TO`     | Delivery address. Default `info@nivavale.com`.                                |
| `CONTACT_FROM`   | `From` header. Default `Nivavale Website <info@nivavale.com>`; must be on the Resend-verified domain. |
| `ALLOWED_ORIGIN` | Allow one extra origin to POST, e.g. the GitHub Pages URL (see below).        |

### Behaviour

- Valid submissions are emailed to `info@nivavale.com` with the visitor's address as `Reply-To`, so
  replying to the email answers the visitor directly.
- Invalid submissions get `400` with per-field messages. A hidden honeypot field is dropped silently.
- If `RESEND_API_KEY` is not set, the endpoint answers `503` and the form shows its "not connected"
  notice, plus a `mailto:` fallback to `site.email` — it never fakes a success.
- `NEXT_PUBLIC_CONTACT_ENDPOINT` still overrides everything, so an external service such as Formspree
  can be used instead.

### If a visitor's device has no mail app

`mailto:` links need a mail client to be installed, which many phones and locked-down work machines do
not have. So the contact page (`components/contact/EmailActions.tsx`) and the form's error and
"not connected" notices (`DirectEmailLinks` in `ContactForm`) always offer, alongside `mailto:`:

- **Open in Gmail** → `https://mail.google.com/mail/?view=cm&fs=1&to=…`
- **Open in Outlook** → `https://outlook.live.com/mail/0/deeplink/compose?to=…`
- **Copy address** → clipboard, for pasting into any other webmail

All of them are built from `site.email` by `lib/email.ts`, so changing the address in one place updates
the displayed link, the pre-filled webmail drafts, and the form's fallback together.

### Testing locally

Pages Functions do not run inside `next dev`. Build the static site and serve it with Wrangler, which
runs `out/` and `functions/` together:

```bash
copy .dev.vars.example .dev.vars   # then fill in RESEND_API_KEY
npm run build
npx wrangler pages dev out
```

`npx wrangler login` is needed once. `npx serve out` (and `npm run preview`) still works for browsing
the pages, but POSTs to `/api/contact` return `404` there because no Function runtime is running.

## Content & placeholders

Copy lives in `lib/content.ts`. Site-wide values (name, tagline, domain, email, nav) live in
`lib/site.ts`.

`site.url` is set to `https://nivavale.com` and is used for canonical URLs, the sitemap, robots.txt,
and Open Graph. Every page declares its own canonical path.

`site.email` is set to `info@nivavale.com`, so it is rendered in the footer and on the contact page.
Setting it back to `null` hides every email link across the site automatically.

No statistics, returns, clients, testimonials, employees, or other claims are fabricated anywhere in
the site. The charts are deliberately unlabelled and hidden from assistive technology for the same
reason. The one remaining placeholder is the **Company details** note on the About page, which is kept
visibly marked until verified information is available.

## Deploying to GitHub Pages

This repository is published to GitHub Pages as a **user site**
(`https://kiplangatderrick21-creator.github.io/`) and served on the custom domain **`nivavale.com`**.
Because it is served from the domain root, no `basePath` is required.

GitHub Pages cannot run a Next.js dev/build process. A repository with no root `index.html` is
rendered by Jekyll as documentation instead, which is why the raw source shows the `README.md` rather
than the site. The site is therefore built by GitHub Actions and the generated `out/` folder is what
gets published:

- `.github/workflows/deploy-pages.yml` — installs dependencies, runs `npm run build`, and publishes
  `out/` with `actions/deploy-pages`.
- `public/.nojekyll` — disables Jekyll processing. Without it, GitHub Pages strips every file and
  folder whose name starts with `_`, which includes Next.js's `_next/` asset directory, leaving the
  site without its CSS or JavaScript.

**One-time repository setting:** Settings → Pages → **Build and deployment** → **Source: GitHub
Actions**, and **Custom domain: `nivavale.com`**. While the source is set to "Deploy from a branch",
GitHub Pages keeps serving the repository source (the rendered `README.md`) instead of the built site.

Every push to `main` rebuilds and redeploys automatically, and the workflow can also be run manually
from the **Actions** tab (`workflow_dispatch`).

> **Note on `CNAME`.** When a site is published by a custom GitHub Actions workflow, GitHub does not
> create a `CNAME` file and **ignores any `CNAME` file that exists**. The custom domain is a
> repository setting only, so the `CNAME` file in the repository root has no effect on the deployed
> site.

### Making `www.nivavale.com` serve the same site

GitHub Pages serves one custom domain. To have both the apex domain and `www` resolve to the site,
configure the apex domain and then the `www` subdomain:

1. **DNS at your provider** (these are GitHub's published values):

   | Type    | Name  | Value                                                                       |
   | ------- | ----- | --------------------------------------------------------------------------- |
   | `A`     | `@`   | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`  |
   | `AAAA`  | `@`   | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
   | `CNAME` | `www` | `kiplangatderrick21-creator.github.io`                                      |

   Do not use a wildcard (`*`) record — it exposes the domain to takeover.

2. **In GitHub**, Settings → Pages → **Custom domain**: enter `nivavale.com` and save, then enter
   `www.nivavale.com` in the same field if GitHub reports it as available. GitHub will redirect
   between the two once both resolve.

3. **Enable "Enforce HTTPS"** once the certificate is issued (it can take up to 24 hours). Do not
   point `www` at the apex with a `CNAME` to `nivavale.com` — that breaks HTTPS for the subdomain.

4. **Verify** with `Resolve-DnsName www.nivavale.com` on Windows, or `dig www.nivavale.com` anywhere
   else. DNS changes can take up to 24 hours to propagate.

Until the `www` `CNAME` record exists, `www.nivavale.com` does not resolve at all — the apex domain
works, but `www` has no DNS record pointing anywhere.

GitHub Pages cannot run the Cloudflare Pages Function in `functions/`, so a form deployed there
reports a send error. Two ways forward:

- **Preferred:** deploy the `functions/` directory to Cloudflare Pages, where `/api/contact` works
  with no client-side setup.
- **Stay purely on GitHub Pages:** build with `NEXT_PUBLIC_CONTACT_ENDPOINT` pointing at the function
  URL on your Pages project — add a repository **variable** under Settings → Secrets and variables →
  Actions → **Variables** — and set `ALLOWED_ORIGIN` on the Pages project to `https://nivavale.com`
  (and to the `*.github.io` URL if `www` is also used) so the cross-origin POST is accepted.

Alternatively, point `NEXT_PUBLIC_CONTACT_ENDPOINT` at an external form service such as Formspree.

## Deploying to Cloudflare Pages

1. **Push to GitHub** — commit and push this repository.
2. **Create a project** in the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages**.
3. **Connect your GitHub repo** and select it.
4. **Configure the build:**
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
5. **Deploy** — Cloudflare will install dependencies, run the build, and publish the site.
6. **Attach a custom domain** from the project's **Custom domains** tab.

> Because the site is a static export, there is no server runtime to manage and no recurring compute
> cost on Cloudflare's free plan. `wrangler.jsonc` already points at `out`, so
> `npx wrangler pages deploy` also works from a local checkout.

## Local build verification

```bash
npm run typecheck   # no type errors
npm run build       # succeeds, emits the static site in out/
npm run preview     # serve out/ and click through every page
```

After building, `out/` will contain `index.html`, `about/index.html`, `robots.txt`, `sitemap.xml`, the
generated Open Graph image, and the compiled assets in `_next/`.

## Things to verify manually

- **Visual review** — run `npm run dev` and review each page at desktop, tablet, and mobile widths.
- **Keyboard navigation** — tab through the header, the buttons, and the contact form; confirm the
  two-tone focus ring is visible on both ivory and forest backgrounds, and that the mobile menu opens
  and closes with Enter, Space, and Escape.
- **Reduced motion** — turn on "reduce motion" in your OS and confirm entrance animations and smooth
  scrolling are suppressed.
- **Contrast** — the documented pairings in `app/globals.css` were checked against WCAG 2.1 AA
  (4.5:1 for body text, 3:1 for large text and UI borders). Re-check if you change a token.
- **Contact form** — run `npm run build && npx wrangler pages dev out` with `RESEND_API_KEY` set in
  `.dev.vars` and confirm a real email arrives at `info@nivavale.com`; remove the key and confirm the
  "not connected" notice with its `mailto:` fallback appears instead.
- **Custom domain** — confirm both `https://nivavale.com` and `https://www.nivavale.com` load the
  site over HTTPS once the DNS record for `www` is in place.




