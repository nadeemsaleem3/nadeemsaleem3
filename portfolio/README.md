# Nadeem Saleem - Portfolio Website

A modern, responsive portfolio website built with React, Tailwind CSS, Framer Motion, and React-PDF. Features data-driven content from JSON files, dark/light mode toggle, smooth animations, and a fully responsive design.

![Portfolio Preview](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-purple) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **Modern Design**: Clean, professional interface with dark/light mode support
- **Responsive Layout**: Fully responsive across mobile, tablet, and desktop
- **Data-Driven**: Content loaded from `cv.json` and `projects.json` files
- **Smooth Animations**: Framer Motion animations for typewriter effects, fade-ins, pop-ins
- **Interactive Components**:
  - Hero section with typewriter effect
  - Skills section with proficiency bars
  - Experience timeline with alternating layout
  - Projects gallery with filtering
  - CV viewer with PDF preview and controls
  - Contact form with validation
- **Performance Optimized**: Fast loading with Vite build tool
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🚀 Live Demo

[View Live Demo](https://nadeemsaleem3.github.io/portfolio) | [GitHub Repository](https://github.com/nadeemsaleem3/portfolio)

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── cv.json                    # CV data (personal info, experience, education)
│   ├── projects.json              # Projects data (40+ projects)
│   ├── Nadeem_Saleem_CV.pdf       # PDF version of CV
│   └── images/                    # Profile and project images
├── src/
│   ├── components/
│   │   ├── layout/                # Navbar, Footer, ScrollToTop
│   │   ├── sections/              # Hero, About, Skills, Experience, etc.
│   │   └── ui/                    # DarkModeToggle, TimelineItem
│   ├── context/                   # ThemeContext for dark/light mode
│   ├── data/                      # Data helpers and enhanced projects
│   ├── pages/                     # ProjectsPage, CVPage
│   ├── App.jsx                    # Main app with routing
│   └── main.jsx                   # App entry point
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind configuration
└── vite.config.js                 # Vite configuration
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### 1. Clone the repository
```bash
git clone https://github.com/nadeemsaleem3/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### 4. Build for production
```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist` directory.

## 📦 Deployment

### GitHub Pages

1. Update `vite.config.js` with your repository name:
```javascript
export default defineConfig({
  base: '/portfolio/', // Replace with your repo name
  // ... rest of config
})
```

2. Install the `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

3. Add deploy scripts to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy:
```bash
npm run deploy
```

Your site will be available at `https://nadeemsaleem3.github.io/portfolio`

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```
Or connect your GitHub repository at [vercel.com](https://vercel.com).

3. Configure environment (if needed):
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```
Or drag and drop the `dist` folder to [app.netlify.com](https://app.netlify.com).

3. Configure build settings:
- Build command: `npm run build`
- Publish directory: `dist`

### Docker Deployment

1. Create a `Dockerfile` in the project root:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. Build and run:
```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio
```

### Custom Domain Setup

1. **For GitHub Pages**:
   - Create a `CNAME` file in the `public` folder with your domain:
     ```
     portfolio.yourdomain.com
     ```
   - Configure DNS:
     - Add A records pointing to GitHub Pages IPs:
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153
     - Or add a CNAME record pointing to `nadeemsaleem3.github.io`

2. **For Vercel/Netlify**:
   - Go to project settings → Domains
   - Add your custom domain
   - Follow the DNS configuration instructions

## 🔧 Configuration

### Data Files

The portfolio is data-driven. Update these files to customize content:

1. **`public/cv.json`** - Personal and professional information
2. **`public/projects.json`** - Project listings with details
3. **`public/Nadeem_Saleem_CV.pdf`** - PDF version of CV
4. **`public/images/`** - Profile and project images

### Theme Customization

Edit `tailwind.config.js` to customize:
- Colors
- Fonts (Poppins, Inter, Fira Code)
- Breakpoints
- Animations

### Adding New Projects

1. Add project data to `public/projects.json`:
```json
{
  "title": "Project Name",
  "platform": "Android",
  "store": "Google Play",
  "downloads": "1M+",
  "rating": 4.5,
  "genres": ["Action", "Arcade"],
  "description": "Project description...",
  "image": "/images/projects/project-name.jpg"
}
```

2. Add project image to `public/images/projects/`
3. The project will automatically appear in the projects page

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2-column grids)
- **Desktop**: > 1024px (3-column grids, alternating layouts)

## 🎨 Design System

### Colors
- Primary: `#3b82f6` (blue-500)
- Dark Mode Background: `#0f172a` (slate-900)
- Light Mode Background: `#ffffff`

### Fonts
- Headings: Poppins
- Body: Inter
- Code: Fira Code

### Animations
- Typewriter effect (Hero section)
- Fade-in on scroll
- Pop-in for skills
- Hover effects for cards
- Page transitions

## 🧪 Testing

Run the development server and test across:
- Different screen sizes (mobile, tablet, desktop)
- Dark/light mode toggle
- PDF viewer functionality
- Form validation
- Navigation and routing

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Nadeem Saleem
- GitHub: [@nadeemsaleem3](https://github.com/nadeemsaleem3)
- Email: nadeem@example.com
- LinkedIn: [Nadeem Saleem](https://linkedin.com/in/nadeemsaleem)

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**
