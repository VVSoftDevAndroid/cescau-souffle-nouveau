---
title: 'Cescau, un souffle nouveau'
slug: 'cescau-souffle-nouveau'
created: '2026-01-30'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack: ['HTML5', 'CSS3 (Custom Properties)', 'Vanilla JavaScript', 'JSON data files']
files_to_modify: ['index.html', 'equipe.html', 'village.html', 'projets.html', 'css/style.css', 'js/main.js', 'js/audio-player.js', 'data/team.json', 'data/projects.json', 'data/gallery.json']
code_patterns: ['Vanilla JS with ES6 modules', 'CSS Custom Properties for theming', 'JSON-driven content rendering', 'Intersection Observer for scroll animations', 'CSS animations and transitions']
test_patterns: ['Manual browser testing', 'Responsive testing on mobile/tablet/desktop', 'Cross-browser testing (Chrome, Firefox, Safari)']
---

# Tech-Spec: Cescau, un souffle nouveau

**Created:** 2026-01-30

## Overview

### Problem Statement

The "Souffle Nouveau" electoral list for Cescau (09800, Ariège, Occitanie) needs a web presence to present their team, showcase the village's natural beauty, and communicate their current and upcoming projects to residents before the municipal elections.

### Solution

A beautiful, classy static website with Ariège mountain aesthetics (green/blue color palette), featuring a simple JSON-based content system so the user can easily update text and add photos without touching code. The site will be hosted for free on GitHub Pages or Netlify.

### Scope

**In Scope:**
- Homepage with welcoming hero section and village ambiance
- Team presentation page (candidates with photos, roles, short bios)
- Village photo gallery showcasing Cescau's beauty
- Projects page (current + upcoming initiatives)
- Discreet audio player (user-controlled, no autoplay) for local/regional music
- Responsive design (mobile-friendly)
- Simple JSON-based content system for easy updates
- Placeholder content ready for real photos/text/music
- Free hosting deployment (GitHub Pages or Netlify)

**Out of Scope:**
- Database or backend server
- User accounts / login system
- Contact form with email sending (simple mailto link instead)
- Paid hosting or custom domain (for now)
- Complex CMS

## Context for Development

### Codebase Patterns

- **Confirmed Clean Slate** - Fresh project, no legacy constraints
- Vanilla HTML/CSS/JS approach (no build step, deploys anywhere)
- JSON-driven content: edit `data/*.json` files to update site content
- CSS Custom Properties for consistent theming
- Intersection Observer API for scroll-triggered animations
- ES6 JavaScript modules for clean code organization

### Files to Create

| File | Purpose |
| ---- | ------- |
| `index.html` | Homepage with hero, intro, and navigation |
| `equipe.html` | Team presentation page |
| `village.html` | Village photo gallery |
| `projets.html` | Current and upcoming projects |
| `css/style.css` | All styles with CSS Custom Properties |
| `js/main.js` | Content loader, scroll animations, navigation |
| `js/audio-player.js` | Custom audio player logic |
| `data/team.json` | Team members data (editable) |
| `data/projects.json` | Projects data (editable) |
| `data/gallery.json` | Gallery images and captions (editable) |
| `images/` | Placeholder images for hero, team, village |
| `audio/` | Placeholder for music file |

### Technical Decisions

- **Tech Stack:** Vanilla HTML5 + CSS3 + JavaScript (ES6) - no frameworks, no build step
- **Styling:** CSS Custom Properties for theming, modern CSS Grid/Flexbox layouts
- **Colors:** Forest green `#2D5A3D`, Mountain blue `#4A7C9B`, Cream `#F5F2EB`, Accent gold `#C9A227`
- **Typography:** Serif headings (Playfair Display), Sans-serif body (Inter or system fonts)
- **Animations:** CSS transitions + Intersection Observer for scroll reveals, parallax hero, hover effects
- **Content Management:** JSON files loaded via fetch() - non-technical users edit JSON only
- **Audio:** HTML5 `<audio>` with custom-styled floating player, user-initiated only
- **Hosting:** GitHub Pages or Netlify (free tier, automatic deploys)
- **Responsive:** Mobile-first, breakpoints at 768px (tablet) and 1024px (desktop)

## Implementation Plan

### Tasks

#### Phase 1: Foundation & Structure

- [ ] **Task 1: Create project structure and base files**
  - Files: Create directories `css/`, `js/`, `data/`, `images/hero/`, `images/team/`, `images/village/`, `audio/`
  - Action: Set up folder structure for the entire project
  - Notes: This is the foundation - all other tasks depend on this

- [ ] **Task 2: Create CSS foundation with design system**
  - File: `css/style.css`
  - Action: Create CSS file with:
    - CSS Custom Properties (colors: `--green-forest: #2D5A3D`, `--blue-mountain: #4A7C9B`, `--cream: #F5F2EB`, `--gold-accent: #C9A227`, `--text-dark: #2C2C2C`, `--text-light: #FFFFFF`)
    - Google Fonts import (Playfair Display, Inter)
    - CSS reset/normalize
    - Base typography styles
    - Utility classes for animations (`.fade-in`, `.slide-up`, `.reveal`)
    - Paper texture overlay as pseudo-element
  - Notes: Mobile-first approach, all measurements in rem

- [ ] **Task 3: Create reusable component styles**
  - File: `css/style.css` (append)
  - Action: Add styles for:
    - Navigation (sticky header, hamburger menu, underline hover animation)
    - Buttons (primary, secondary, with hover scale effect)
    - Cards (team cards, project cards with lift effect)
    - Footer
  - Notes: All interactive elements need hover/focus states

#### Phase 2: JSON Data Structure

- [ ] **Task 4: Create team data file**
  - File: `data/team.json`
  - Action: Create JSON with structure:
    ```json
    {
      "title": "Notre Équipe",
      "subtitle": "Les femmes et les hommes qui portent ce souffle nouveau",
      "members": [
        {
          "id": "1",
          "name": "Prénom Nom",
          "role": "Tête de liste",
          "bio": "Courte biographie...",
          "image": "images/team/placeholder-1.jpg"
        }
      ]
    }
    ```
  - Notes: Include 5-6 placeholder team members

- [ ] **Task 5: Create projects data file**
  - File: `data/projects.json`
  - Action: Create JSON with structure:
    ```json
    {
      "title": "Nos Projets",
      "subtitle": "Pour Cescau, aujourd'hui et demain",
      "current": [
        {
          "id": "1",
          "title": "Titre du projet",
          "description": "Description...",
          "status": "En cours",
          "icon": "🏔️"
        }
      ],
      "upcoming": [...]
    }
    ```
  - Notes: Include 3 current + 3 upcoming placeholder projects

- [ ] **Task 6: Create gallery data file**
  - File: `data/gallery.json`
  - Action: Create JSON with structure:
    ```json
    {
      "title": "Notre Village",
      "subtitle": "La beauté de Cescau en images",
      "images": [
        {
          "id": "1",
          "src": "images/village/placeholder-1.jpg",
          "caption": "Vue sur les Pyrénées",
          "featured": true
        }
      ]
    }
    ```
  - Notes: Include 8-10 placeholder gallery items

- [ ] **Task 7: Create site config data file**
  - File: `data/site.json`
  - Action: Create JSON with:
    ```json
    {
      "siteName": "Cescau, un souffle nouveau",
      "tagline": "Pour notre village, ensemble",
      "contact": {
        "email": "contact@example.com"
      },
      "social": {},
      "audioFile": "audio/musique.mp3",
      "audioTitle": "Musique d'Occitanie"
    }
    ```
  - Notes: Central config for site-wide content

#### Phase 3: Core JavaScript

- [ ] **Task 8: Create main JavaScript module**
  - File: `js/main.js`
  - Action: Implement:
    - `loadJSON(url)` - async fetch wrapper
    - `renderTeam(data)` - inject team cards into DOM
    - `renderProjects(data)` - inject project cards into DOM
    - `renderGallery(data)` - inject gallery grid into DOM
    - `initScrollAnimations()` - Intersection Observer for `.reveal` elements
    - `initNavigation()` - mobile menu toggle, sticky header shadow
    - `initParallax()` - subtle parallax on hero section
    - `DOMContentLoaded` event listener to initialize
  - Notes: Use ES6 syntax, async/await, template literals for HTML generation

- [ ] **Task 9: Create audio player module**
  - File: `js/audio-player.js`
  - Action: Implement:
    - Floating button HTML injection (bottom-right, fixed position)
    - Toggle mini-player expansion on click
    - Play/pause functionality with animated icon
    - Volume control (optional slider)
    - Load audio source from site.json config
    - No autoplay - user must click to start
  - Notes: Test on iOS Safari (autoplay restrictions)

#### Phase 4: HTML Pages

- [ ] **Task 10: Create homepage**
  - File: `index.html`
  - Action: Create with:
    - `<!DOCTYPE html>` + lang="fr"
    - Meta tags (viewport, description, charset)
    - Google Fonts link
    - CSS link
    - Header with nav (logo, links: Accueil, Équipe, Village, Projets)
    - Hero section (full-width, parallax background, title, tagline, CTA button)
    - Brief intro section ("Notre vision pour Cescau")
    - Preview cards (3 cards linking to other pages)
    - Footer (contact mailto link, copyright)
    - JS scripts at end of body
  - Notes: Hero image placeholder with gradient overlay

- [ ] **Task 11: Create team page**
  - File: `equipe.html`
  - Action: Create with:
    - Same header/footer as index.html
    - Page hero (smaller, with title)
    - `<div id="team-container">` for JS to populate
    - Team cards grid (CSS Grid, responsive)
  - Notes: Cards populated from team.json via main.js

- [ ] **Task 12: Create village gallery page**
  - File: `village.html`
  - Action: Create with:
    - Same header/footer as index.html
    - Page hero with village title
    - `<div id="gallery-container">` for JS to populate
    - Lightbox modal (hidden by default, activated on image click)
  - Notes: Masonry-style grid, Ken Burns on featured images

- [ ] **Task 13: Create projects page**
  - File: `projets.html`
  - Action: Create with:
    - Same header/footer as index.html
    - Page hero with projects title
    - Two sections: "Projets en cours" and "Projets à venir"
    - `<div id="projects-current">` and `<div id="projects-upcoming">`
  - Notes: Project cards with status badges and icons

#### Phase 5: Animations & Polish

- [ ] **Task 14: Implement scroll animations**
  - File: `css/style.css` (append) + `js/main.js` (update)
  - Action: 
    - CSS: Define `.reveal` (opacity: 0, transform: translateY(20px)), `.reveal.active` (opacity: 1, transform: none)
    - JS: Intersection Observer triggers `.active` class when element enters viewport
    - Add staggered delay for card grids (nth-child delays)
  - Notes: Use `transition` not `animation` for smoother reveals

- [ ] **Task 15: Implement hover effects and micro-interactions**
  - File: `css/style.css` (append)
  - Action: Add:
    - Card hover: `transform: translateY(-4px)`, `box-shadow` expansion
    - Image hover: `transform: scale(1.05)` within `overflow: hidden` container
    - Button hover: `transform: scale(1.02)`, color shift
    - Nav link underline: `::after` pseudo-element width animation
  - Notes: Use `transition: all 0.3s ease`

- [ ] **Task 16: Implement lightbox for gallery**
  - File: `js/main.js` (append)
  - Action: 
    - Click handler on gallery images
    - Show modal with full-size image
    - Close on backdrop click or X button
    - Smooth fade-in/out transitions
    - Keyboard support (Escape to close)
  - Notes: Prevent body scroll when lightbox is open

#### Phase 6: Responsive & Final Polish

- [ ] **Task 17: Complete responsive styles**
  - File: `css/style.css` (append)
  - Action: Add media queries:
    - Mobile (< 768px): Single column, hamburger menu, smaller hero text
    - Tablet (768px - 1024px): 2-column grids
    - Desktop (> 1024px): 3-4 column grids, full navigation
  - Notes: Test on actual devices if possible

- [ ] **Task 18: Add placeholder images**
  - Files: `images/hero/`, `images/team/`, `images/village/`
  - Action: 
    - Download or create placeholder images (mountain/village theme from Unsplash)
    - Hero: 1920x1080 landscape mountain/village
    - Team: 400x400 square placeholders
    - Village: Mix of landscape and portrait for gallery variety
  - Notes: Optimize images for web (compress, appropriate dimensions)

- [ ] **Task 19: Add placeholder audio**
  - File: `audio/musique.mp3`
  - Action: Add a royalty-free Occitan or folk music sample (or silent placeholder)
  - Notes: Keep file small (< 5MB) for fast loading

- [ ] **Task 20: Final QA and polish**
  - Files: All
  - Action:
    - Test all pages on Chrome, Firefox, Safari
    - Test responsive breakpoints
    - Test audio player functionality
    - Run Lighthouse audit, fix any critical issues
    - Verify all JSON content loads correctly
    - Check all animations are smooth (60fps)
  - Notes: Fix any console errors

### Acceptance Criteria

#### Core Functionality

- [ ] **AC1:** Given I am on any page, when I view the navigation, then I see links to Accueil, Équipe, Village, and Projets that navigate correctly
- [ ] **AC2:** Given I am on mobile, when I tap the hamburger menu, then the navigation slides in smoothly with backdrop blur
- [ ] **AC3:** Given I am on the homepage, when the page loads, then the hero section displays with parallax effect and fade-in title animation
- [ ] **AC4:** Given I am on the team page, when the page loads, then team member cards are populated from `data/team.json`
- [ ] **AC5:** Given I am on the projects page, when the page loads, then current and upcoming projects are populated from `data/projects.json`
- [ ] **AC6:** Given I am on the village page, when the page loads, then the gallery grid is populated from `data/gallery.json`

#### Gallery & Lightbox

- [ ] **AC7:** Given I am viewing the gallery, when I click on an image, then a lightbox opens with the full-size image
- [ ] **AC8:** Given the lightbox is open, when I click the backdrop or press Escape, then the lightbox closes smoothly

#### Audio Player

- [ ] **AC9:** Given I am on any page, when the page loads, then I see a floating audio button in the bottom-right corner (not playing)
- [ ] **AC10:** Given I click the audio button, when it expands, then I see play/pause controls and can start the music
- [ ] **AC11:** Given audio is playing, when I navigate to another page, then the audio continues playing (if same-page navigation) OR restarts from player (standard navigation)

#### Animations & Polish

- [ ] **AC12:** Given I scroll down any page, when elements with `.reveal` class enter the viewport, then they fade in with upward animation
- [ ] **AC13:** Given I hover over a card (team, project), when hovering, then the card lifts with expanded shadow
- [ ] **AC14:** Given I hover over a nav link, when hovering, then an underline animates in from the left

#### Responsive Design

- [ ] **AC15:** Given I view the site on mobile (375px width), when viewing any page, then content is readable and navigation works via hamburger menu
- [ ] **AC16:** Given I view the site on tablet (768px width), when viewing any page, then grids display in 2 columns
- [ ] **AC17:** Given I view the site on desktop (1440px width), when viewing any page, then grids display in 3-4 columns with full navigation visible

#### Content Management

- [ ] **AC18:** Given I edit `data/team.json`, when I refresh the team page, then my changes appear without touching HTML/JS
- [ ] **AC19:** Given I edit `data/projects.json`, when I refresh the projects page, then my changes appear without touching HTML/JS
- [ ] **AC20:** Given I edit `data/gallery.json`, when I refresh the village page, then my changes appear without touching HTML/JS

## Additional Context

### Dependencies

- **Google Fonts:** Playfair Display (headings), Inter (body) - loaded via CDN
- **No npm/build dependencies** - pure static files
- **Optional:** Placeholder images from Unsplash (mountain/village theme) until real photos provided

### Testing Strategy

**Manual Browser Testing:**
- Chrome (latest), Firefox (latest), Safari (latest)
- Edge (if available)

**Responsive Testing:**
- Mobile: 375px (iPhone SE), 390px (iPhone 14)
- Tablet: 768px (iPad), 820px (iPad Air)
- Desktop: 1280px, 1440px, 1920px

**Functionality Testing:**
- Navigation on all pages (desktop and mobile hamburger)
- JSON content loading on team, projects, village pages
- Gallery lightbox open/close, keyboard navigation
- Audio player play/pause, visibility on all pages
- Scroll animations triggering correctly
- All hover effects working smoothly

**Performance Testing:**
- Lighthouse audit targeting:
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90
- Image optimization check (file sizes)
- No console errors

**iOS-Specific Testing:**
- Audio player respects autoplay restrictions
- Smooth scrolling and animations
- Touch targets are adequate (44x44px minimum)

### Design & Animation Details

**Hero Section:**
- Parallax background with mountain/village image
- Fade-in title with gentle upward drift animation
- Soft gradient overlay

**Navigation:**
- Elegant underline animation on hover
- Smooth mobile hamburger menu with backdrop blur
- Sticky header with shadow on scroll

**Content Cards:**
- Lift effect on hover with shadow expansion
- Staggered scroll-triggered fade-in (0.1s delay between cards)
- Contained image zoom on hover

**Gallery:**
- CSS Grid masonry-style layout
- Lightbox with smooth zoom transition
- Ken Burns effect on featured images

**Audio Player:**
- Floating button (bottom-right corner)
- Expands into mini-player on click
- Animated icon while playing

**Micro-interactions:**
- Button scale + color shift on hover
- Scroll-triggered reveal animations
- Subtle paper/grain texture overlay for warmth

### Notes

**Target Audience:**
- Cescau residents and community members
- Potential voters interested in the list's vision
- Village visitors curious about the area

**Tone & Voice:**
- Welcoming, local, authentic, community-focused
- Positive and forward-looking ("souffle nouveau")
- Respectful of village traditions while embracing progress

**Visual Inspiration:**
- Ariège mountains and Pyrenees landscapes
- French village charm and authenticity
- Nature colors: forest greens, mountain blues, earthy creams

**Language:**
- All site content in French
- Code comments in English (developer convention)

**Known Risks & Mitigations:**
1. **Risk:** Large images slow down page load
   - **Mitigation:** Compress images, use lazy loading, provide WebP alternatives
2. **Risk:** Audio player doesn't work on iOS without user interaction
   - **Mitigation:** Require user click to play, clear play button UI
3. **Risk:** JSON fetch fails (CORS on local file://)
   - **Mitigation:** Test with local server (`python -m http.server`), works fine on deployed hosting

**Future Considerations (Out of Scope):**
- Custom domain name when budget allows
- Contact form with actual email sending (requires backend)
- Event calendar for village activities
- News/blog section
- Multi-language support
