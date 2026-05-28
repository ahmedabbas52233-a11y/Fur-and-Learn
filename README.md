# 🐱 Fur & Learn — v2.0

> **The luxury destination for cat lovers.** Interactive breed guides, expert care tips, a 5-question breed finder quiz, photo gallery, cat age calculator, and breed comparison tool — all wrapped in a stunning 3D glassmorphism interface.

---

## ✨ What's New in v2.0

This is a complete ground-up redesign and feature expansion from v1.0.

### 🎨 Design System
- **Luxury Dark Theme** — Navy × Warm Gold × Teal colour palette with full **light/dark mode toggle** (persisted in `localStorage`)
- **Glassmorphism UI** — `backdrop-filter` glass cards used throughout
- **3D Hero Card** — CSS `perspective` + `rotateY/X` floating breed card that rotates automatically every 3.5 seconds
- **3D Breed Flip Cards** — All 13 breed cards flip on click to reveal detailed stats with animated trait bars
- **Floating Particles** — Dynamic JavaScript-generated ambient particle system
- **Scroll Reveal** — `IntersectionObserver`-powered staggered reveal animations
- **Animated Counters** — Numbers count up when scrolled into view
- **Custom Scrollbar** — Styled to match the gold design palette
- **Responsive** — Fully tested from 320px to 1600px viewports

### 🛠️ New Features

| Feature | Description |
|---|---|
| **Breed Finder Quiz** | 5-question lifestyle quiz with personalised breed match result |
| **Breed Comparison Tool** | Select any 2 of 13 breeds for instant side-by-side comparison |
| **Cat Age Calculator** | Interactive slider that converts cat years to human years in real time |
| **Masonry Gallery** | Filterable photo gallery with lightbox viewer (keyboard navigation supported) |
| **Tabbed Care Tips** | 5-tab care guide: Nutrition, Grooming, Health, Environment, Behaviour |
| **Animated FAQ** | Smooth accordion FAQ with ARIA accessibility |
| **Toast Notifications** | Non-blocking feedback for form submissions |
| **Gallery Filters** | Filter gallery by breed/category |
| **Breed Search** | Live search on the breeds page by name or trait tag |

---

## 📁 Project Structure

```
Fur-and-Learn/
├── Catphotoapp.html    # Home page
├── breeds.html         # 13 breed profiles + comparison tool
├── care-tips.html      # Tabbed care guides + age calculator
├── gallery.html        # Masonry photo gallery + lightbox
├── quiz.html           # 5-question breed finder quiz
├── about.html          # Team & mission
├── contact.html        # Contact form + FAQ
├── styles.css          # Full design system (~1000 lines)
├── script.js           # All interactivity (~400 lines)
├── README.md
├── LICENSE
└── Breeds/
    ├── ABYSSINIAN.webp
    ├── Bengal.jpeg
    ├── British.jpeg
    ├── Burmese.jpeg
    ├── Maine.jpg
    ├── Manx.jpeg
    ├── Persian.jpg
    ├── Ragdoll.webp
    ├── Russian.jpg
    ├── Scottish.jpeg
    ├── Siamese.jpeg
    ├── Sphynx.webp
    └── Tabby.jpg
```

---

## 🚀 Getting Started

No build tools, no dependencies. Pure HTML, CSS, and vanilla JavaScript.

```bash
# Clone the repo
git clone https://github.com/yourusername/fur-and-learn.git

# Open in browser
open Catphotoapp.html
```

Or just double-click `Catphotoapp.html` in your file manager.

> ⚠️ **Note:** The gallery page loads images from Wikimedia Commons — an internet connection is required for those photos to display. All breed images are local files and work offline.

---

## 🧩 Pages at a Glance

### `Catphotoapp.html` — Home
- 3D floating breed card hero with auto-rotating breed highlights
- Stats section with animated counters
- Feature cards grid (6 features)
- "Love & Hate" section (cat psychology)
- Fun facts grid
- Featured breed flip cards (3 breeds)
- Testimonials (4 cards)
- Animated FAQ accordion
- Newsletter signup

### `breeds.html` — Breeds
- Live search input
- 7 filter buttons (All, High Energy, Calm, Family-Friendly, Quiet, Low Grooming, Indoor)
- 13 interactive 3D flip cards — front shows image + badges; back shows trait bars + stats
- Breed Comparison Tool — two dropdowns, dynamic table with images

### `care-tips.html` — Care Tips
- 5 tabs: Nutrition, Grooming, Health, Environment, Behaviour
- 4 tip cards per tab (20 tip cards total)
- Interactive age calculator with live slider

### `gallery.html` — Gallery
- 7 filter buttons by category
- 16 masonry photos
- Click-to-open lightbox with keyboard arrow navigation (←/→ to navigate, Esc to close)

### `quiz.html` — Breed Finder Quiz
- Progress bar across 5 steps
- 4-option selection per question with icons
- Personalised result card with breed image, name, description, and trait badges

### `about.html` — About
- Split layout with layered rotating breed images
- Values grid (6 cards)
- Team section (4 members)
- Animated stats

### `contact.html` — Contact
- Two-column layout: info panel + form
- Form success state (no page reload)
- Embedded mini FAQ accordion

---

## ♿ Accessibility

- Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- All images have descriptive `alt` attributes
- `aria-label` on all interactive controls
- `role="tablist"` / `role="tab"` / `role="tabpanel"` on tabbed interfaces
- `aria-live="polite"` on toast and calculator output
- `aria-modal` on lightbox dialog
- Keyboard navigation: Tab, Enter, arrow keys, Escape
- Focus-visible styles preserved

---

## 🏷️ Tags

`cats` `cat-breeds` `pet-care` `feline` `cat-quiz` `breed-guide` `glassmorphism` `3d-css` `dark-mode` `responsive-design` `vanilla-js` `html-css-js` `cat-care` `persian` `maine-coon` `bengal` `siamese` `interactive` `frontend`

---

## 📄 License

MIT License — see `LICENSE` for full terms.

---

*© 2026 Fur & Learn — Learning about cats, one paw at a time 🐱*
