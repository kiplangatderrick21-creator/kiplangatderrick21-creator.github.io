# Nivavale

A production-ready corporate website for **Nivavale**, a quantitative intelligence and technology
firm. Built with Next.js (App Router), TypeScript, and Tailwind CSS v4, exported as a fully static
site and deployed to Cloudflare Pages.

---

## Tech stack

- **Next.js 15** (App Router, static export)
- **TypeScript** (strict)
- **React 19**
- **Tailwind CSS v4** (CSS-first theming via `@theme`)
- No UI/icon/animation libraries — all custom, to keep the bundle minimal.

## Project structure

```
app/                  # Routes, layout, metadata, fonts
  layout.tsx          # Root layout, fonts, metadata defaults, skip link
  page.tsx            # Home
  about/  research/  analytics/  technology/  education/  contact/
  not-found.tsx       # 404
  icon.svg            # favicon
public/
  robots.txt          # robots.txt
  sitemap.xml         # sitemap.xml
  og-image.png        # Open Graph social card image
components/
  layout/             # Header, Footer, Container
  ui/                 # Button, Card, SectionHeading, Tag, Icon
  data-viz/           # Decorative SVG visuals (dot grid, line/bar patterns)
  home/               # Homepage sections
  contact/            # ContactForm, EmailActions (webmail redirects)
lib/
  site.ts             # Site config (name, nav, metadata, contact email)
  email.ts            # mailto: and webmail (Gmail/Outlook) compose links
  content.ts          # All page copy (capabilities, research areas, etc.)
functions/
  api/contact.ts      # Cloudflare Pages Function: emails contact-form submissions
```

## Getting started

Requirements: **Node.js 18.18+** (Node 20 LTS recommended).

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
```

## Scripts

| Command               | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| `npm run dev`         | Run the local dev server                       |
| `npm run build`       | Type-check and produce a static site in `out/` |
| `npm run typecheck`   | Run TypeScript type checking only              |
| `npm run preview`     | Serve the built `out/` folder locally          |

## Environment variables

Copy the example file and fill in real values:

```bash
copy .env.example .env.local   # Windows
cp .env.example .env.local     # macOS / Linux
```

| Variable                     | Purpose                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional override for the contact form's POST endpoint. Unset means the form posts to `/api/contact`. |

The email delivery settings are **server-side** and therefore do not belong in `.env.local` — see
[Contact form and email](#contact-form-and-email) below.

**Never commit `.env.local` or real secrets.** `.env.local` and all real env files are gitignored.
`NEXT_PUBLIC_*` values are inlined at build time, so only put public endpoints here — never API
keys or secrets.

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
`lib/site.ts`. One value is still a placeholder — replace it before launch:

- `site.url` → your real production domain (used for canonical URLs, sitemap, and Open Graph).

`site.email` is set to `info@nivavale.com`, so it is rendered in the footer and on the contact page.
Setting it back to `null` hides every email link across the site automatically.

No statistics, returns, clients, testimonials, employees, or other claims are fabricated anywhere
in the site.

## Deploying to GitHub Pages

This repository is published to GitHub Pages as a **user site**
(`https://kiplangatderrick21-creator.github.io/`), so it is served from the domain root — no
`basePath` is required.

GitHub Pages cannot run a Next.js dev/build process. A repository with no root `index.html` is
rendered by Jekyll as documentation instead, which is why the raw source showed the `README.md`
rather than the site. The site is therefore built by GitHub Actions and the generated `out/` folder
is what gets published:

- `.github/workflows/deploy-pages.yml` — installs dependencies, runs `npm run build`, and publishes
  `out/` with `actions/deploy-pages`.
- `public/.nojekyll` — disables Jekyll processing. Without it, GitHub Pages strips every file and
  folder whose name starts with `_`, which includes Next.js's `_next/` asset directory, leaving the
  site without its CSS or JavaScript.

**One-time repository setting:** Settings → Pages → **Build and deployment** → **Source: GitHub
Actions**. While the source is set to “Deploy from a branch”, GitHub Pages keeps serving the
repository source (the rendered `README.md`) instead of the built site.

After that, every push to `main` rebuilds and redeploys automatically, and the workflow can also be
run manually from the **Actions** tab (`workflow_dispatch`).

GitHub Pages cannot run the Cloudflare Pages Function in `functions/`, so a form deployed there
reports a send error. Two ways forward:

- **Preferred:** deploy to Cloudflare Pages, where `/api/contact` works with no client-side setup.
- **Stay on GitHub Pages:** build with `NEXT_PUBLIC_CONTACT_ENDPOINT` pointing at the function URL on
  your Pages project — add a repository **variable** under Settings → Secrets and variables →
  Actions → **Variables** — and set `ALLOWED_ORIGIN` on the Pages project to
  `https://kiplangatderrick21-creator.github.io` so the cross-origin POST is accepted.

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
6. **Attach a custom domain** from the project's **Custom domains** tab, then update `site.url`
   in `lib/site.ts` and redeploy.

> Because the site is a static export, there is no server runtime to manage and no recurring
> compute cost on Cloudflare's free plan.

## Local build verification

```bash
npm run typecheck   # no type errors
npm run build       # succeeds, emits static site in out/
```

After building, `out/` will contain `index.html`, `about/index.html`, `robots.txt`,
`sitemap.xml`, and the generated static assets.

## Things to verify manually

- **Visual polish** — run `npm run dev` and review each page at desktop, tablet, and mobile widths.
- **Keyboard navigation** — tab through the header, buttons, and form; confirm visible focus
  rings and that the mobile menu opens/closes with Enter, Space, and Escape.
- **Reduced motion** — enable "reduce motion" in your OS and confirm entrance animations are
  suppressed.
- **Contact form** — run `npm run build && npx wrangler pages dev out` with `RESEND_API_KEY` set in
  `.dev.vars` and confirm a real email arrives at `info@nivavale.com`; remove the key and confirm the
  "not connected" notice with its `mailto:` fallback appears instead.
