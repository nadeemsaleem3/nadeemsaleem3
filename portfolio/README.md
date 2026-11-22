# Nadeem Saleem — Portfolio

A data-driven portfolio for a senior Unity developer. Built with React 19, Vite, Tailwind CSS, Framer Motion and React Router. Content comes from local JSON files, fonts are self-hosted, and the CV is available as an accessible HTML page with a PDF download.

[Live site](https://nadeemsaleem3.github.io/nadeemsaleem3/) · [GitHub](https://github.com/nadeemsaleem3)

## Features

- Responsive layout with light and dark themes, initialised before first paint.
- Data-driven sections: CV, skills, experience, education, projects and game case studies.
- Accessible HTML CV as the primary version, with a PDF download for forwarding and printing.
- Project filtering by category, genre and store, with keyboard-accessible trailer dialogs.
- Contact form with a required privacy consent checkbox, honeypot spam protection and announced status messages.
- Legal pages: privacy policy, accessibility statement and imprint.
- Accessibility work: skip link, landmarks, visible focus styles, reduced-motion support, semantic headings, labelled form controls and text alternatives.
- Static SEO metadata, Open Graph tags, JSON-LD, `robots.txt` and `sitemap.xml`.
- Self-hosted Inter, Poppins and Fira Code fonts via `@fontsource`.

## Stack

| Area | Choice |
| --- | --- |
| Framework | React 19 |
| Build | Vite 8 |
| Routing | React Router 7 (`createBrowserRouter`, base `/nadeemsaleem3`) |
| Styling | Tailwind CSS 3 |
| Motion | Framer Motion |
| Icons | react-icons |
| Email | EmailJS |
| Hosting | GitHub Pages |

## Project structure

```text
portfolio/
├── public/
│   ├── images/                     # Profile and project artwork
│   ├── Nadeem_Saleem_CV.pdf        # Downloadable PDF CV
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── copy-404.mjs                # SPA fallback for GitHub Pages
├── src/
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer, LegalPage
│   │   ├── sections/               # Hero, About, Skills, Experience, Contact, projects…
│   │   └── ui/                     # DarkModeToggle, TimelineItem
│   ├── context/                    # ThemeContext
│   ├── data/
│   │   ├── cv.json                 # Source of truth for CV content
│   │   ├── projects-enhanced.json  # Source of truth for projects
│   │   ├── aiProjectDetails.js     # Long-form AI case studies
│   │   ├── gameCaseStudies.js      # Shipped-game case studies
│   │   └── helpers.js              # Data accessors and normalisers
│   ├── pages/                      # Projects, case study, CV, legal, journey
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── tailwind.config.js
└── vite.config.js
```

## Local development

Requires Node.js 18+.

```bash
cd portfolio
npm install
npm run dev
```

The dev server runs at `http://localhost:5173/nadeemsaleem3/`.

### Environment variables

The contact form uses EmailJS. Create `portfolio/.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

`.env` is gitignored. Without these values the form shows a generic error and offers the email address as a fallback.

### Scripts

```bash
npm run dev       # development server
npm run build     # production build, then copies index.html to 404.html
npm run preview   # preview the production build
npm run lint      # ESLint
npm run deploy    # build and publish dist to the gh-pages branch
```

## Content

- **CV:** edit `src/data/cv.json`. This file feeds the home page, the CV page, the footer and the legal pages. `public/cv.json` is not used by the app.
- **Projects:** edit `src/data/projects-enhanced.json`. Local images live in `public/images/projects/`; remote URLs in `imageFallback` are only used if a local image is missing.
- **Game case studies:** edit `src/data/gameCaseStudies.js`. The slug must match the slug generated from the project name in `projects-enhanced.json`.
- **AI case studies:** edit `src/data/aiProjectDetails.js`.
- **PDF CV:** replace `public/Nadeem_Saleem_CV.pdf`. The HTML CV remains the accessible primary version.

## Accessibility and privacy

- The site aims to conform to WCAG 2.1 AA and aligns with EN 301 549. It is not certified.
- The accessibility statement lives at `/accessibility` and should be updated after each audit.
- The privacy policy at `/privacy` documents the contact form, EmailJS, GitHub Pages and the 12-month retention period.
- The only client-side storage is the `portfolio-theme` value in `localStorage`. There are no analytics or advertising cookies.
- The imprint at `/imprint` contains provider details. Do not add identity documents or tax numbers that should not be public.

## Deployment

The Vite base path is `/nadeemsaleem3/`, matching the GitHub Pages repository. `npm run deploy` publishes `dist` to the `gh-pages` branch. The `postbuild` script copies `index.html` to `404.html` so client-side routes resolve on GitHub Pages.

## License

MIT. See [LICENSE](LICENSE).
