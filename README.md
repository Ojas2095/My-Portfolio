# Ojaswee Upadhyay — Portfolio

A static, signal-first developer portfolio for Ojaswee Upadhyay. The site uses semantic HTML, vanilla CSS, and dependency-light JavaScript so it can be deployed on Vercel or served from a small container.

## Requirements

- Node.js `20.19.0` (the version is pinned in `.nvmrc`)
- npm (the repository includes `package-lock.json`)

## Setup

```bash
npm ci
```

The portfolio itself has no build step. `npm ci` is only needed when running the repository checks or working with the optional local tooling.

## Run locally

Serve the repository root with any static HTTP server. For example:

```bash
npx serve .
```

Then open the URL printed by the server. Opening `index.html` directly also works, but an HTTP server is the better way to verify asset delivery and downloads.

## Test

```bash
npm test
```

The offline smoke test verifies the HTML entry point, JavaScript syntax, Vercel résumé headers, and the bundled PDF signature.

## Deploy

### Vercel

Import the repository into Vercel. The included `vercel.json` intentionally skips a build and serves the repository root. Every static asset, including `ResumeOjaswee_5thSem.pdf`, is deployed with the site.

### Docker

```bash
docker build -t ojaswee-portfolio .
docker run --rm -p 8080:80 ojaswee-portfolio
```

Open <http://localhost:8080>.

## Résumé download

The primary call-to-action and command menu both point to `ResumeOjaswee_5thSem.pdf`. Vercel is configured to serve that path with an attachment `Content-Disposition` header so it downloads instead of opening inline.
