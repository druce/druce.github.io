# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based static blog deployed to GitHub Pages at **druce.ai**. The site focuses on machine learning, AI, finance, economics, and technology topics, with 170+ posts dating back to 2011. It was migrated from WordPress and uses a customized version of the Minima theme.

## Common Commands

### Development
```bash
# Install dependencies
bundle install

# Start local development server (with live reload)
bundle exec jekyll serve
# Access at http://localhost:4000

# Build static site to _site/ directory
bundle exec jekyll build
```

Note: Changes to `_config.yml` require server restart.

### Deployment
Push to master branch - GitHub Pages automatically builds and deploys.

### Automated Workflows
- **Image Optimization**: GitHub Actions automatically optimizes PNG/JPG images in `assets/` on push (excluding `assets/wp-content/`). Creates a PR with optimization results. Commit message must include `[skip-img]` to prevent optimization loops.

## Architecture & Structure

### Jekyll Configuration
- **Main config**: `_config.yml` - Site settings, plugins, analytics, Disqus
- **Important**: `_config.yml.orig` contains template settings. The production `_config.yml` has live Google Analytics and Disqus codes - don't use it as a template
- **Markdown processor**: kramdown with GFM input
- **Syntax highlighter**: Rouge with GitHub theme
- **Excerpt separator**: `<!--more-->` tag in posts

### Content Organization

**Blog Posts** (`_posts/`)
- Naming: `YYYY-MM-DD-slug.md`
- All posts use `layout: post`
- Front matter structure:
  ```yaml
  ---
  id: 7151                              # WordPress-era ID (legacy)
  title: 'Post Title'
  date: 2025-11-01T01:01:01+00:00      # ISO 8601 timestamp
  author: Druce Vertes
  layout: post
  guid: /?p=7151                        # Legacy WordPress GUID
  permalink: /2025/11/slug              # Custom URL pattern
  categories: category-name
  tags: tag1, tag2
  ---
  ```
- Use `<!--more-->` to separate excerpt from full content

**Tag System** (`/tag/`)
- Each tag has dedicated markdown file (e.g., `AI.md`, `economics.md`)
- Uses `tagpage.html` layout
- Tags listed in post front matter auto-generate archives

**Assets** (`/assets/`)
- Organized by year: `/assets/YYYY/` (2019-2025)
- Legacy WordPress uploads in `/assets/wp-content/`
- JavaScript libraries in `/assets/js/`
- Fonts in `/assets/fonts/`

### Templates & Styling

**Layouts** (`_layouts/`)
- `default.html` - Base layout with HTML structure
- `post.html` - Individual blog post layout
- `tagpage.html` - Tag archive layout

**Includes** (`_includes/`)
- Standard partials: `head.html`, `header.html`, `footer.html`
- `disqus_comments.html` - Comment integration
- `tags.html` - Tag metadata
- `MTA/` - NYC subway project visualizations (3.6MB, Plotly Dash)
- `TSA/` - Time Series Analysis project files

**Styles** (`_sass/`)
- Entry point: `main.scss`
- Minima theme overrides in `minima/` subdirectory
- Custom styles: `dvtable.scss`, `dvdropdown.scss`, `fonts.scss`
- Syntax highlighting: `rouge-github.scss`

### Key Jekyll Plugins
- `jekyll-feed` - RSS feed generation
- `jekyll-sitemap` - XML sitemap
- `jekyll-seo-tag` - SEO meta tags
- `jekyll-archives` - Archive page generation
- `jekyll-paginate` - Homepage pagination (20 posts per page)
- `jekyll-redirect-from` - URL redirection support

### Interactive Content Support
- **Math rendering**: MathJax 3 for LaTeX
- **Charts**: Chart.js for interactive visualizations
- **Tables**: jQuery TableSorter for sortable tables
- **Code**: Rouge syntax highlighting with GitHub color scheme
- **Icons**: Font Awesome

## Current Development: AI Maturity Assessment Tool

### Overview
The AI Maturity Self-Assessment is a standalone interactive tool that helps organizations evaluate their AI readiness across 12 dimensions on a 4-level maturity scale (Crawl, Walk, Run, Fly). It's a single-file HTML application designed to be downloaded, customized, and used offline.

**Design Philosophy**: Monolithic, self-contained HTML file that users can customize and use offline while tracking progress via localStorage.

### File Locations

**Primary Files** (in `/assets/2025/`):
- **`ai_maturity_refactor.html`** - Current production version (refactored with MVC architecture)
- **`ai_maturity.html`** - Original version (legacy, reference only)
- **`ai_maturity_dimensions.js`** - JavaScript module containing dimension data
- **`ai_maturity.yml`** - YAML source of truth for dimensions data (in `/_data/` when deployed)

**Documentation**:
- **`maturity_refactor.md`** - Complete specification and refactoring plan
- **`README_AI_MATURITY.md`** - Data file structure and maintenance guide

### Architecture

**Single-File MVC Pattern**:
```
HTML Structure
  └─ CSS Styles (Catppuccin Latte theme with CSS variables)
    └─ JavaScript Modules (IIFEs):
        ├─ Data Model (CONFIG + DIMENSIONS_DATA)
        ├─ Model Layer (state management, scoring logic)
        ├─ Storage Layer (localStorage with versioning)
        ├─ View Layer (DOM manipulation, Chart.js)
        └─ Controller Layer (orchestrates Model ↔ View)
```

### Key Features
1. **12 Dimensions × 4 Levels**: Leadership, Team, Data, Tech Platforms, Observability, Governance, Security, Training, Analytics/MLOps, Use Cases, Partnerships, Process Implementation
2. **Progressive Unlocking**: Higher levels unlock when previous level averages ≥50% (threshold configurable)
3. **Radar Chart Visualization**: Click chart to jump to dimension, real-time updates
4. **localStorage Persistence**: Auto-save on every change, schema versioning with migrations
5. **Wizard Navigation**: Step-by-step with keyboard shortcuts, progress tracking

### Critical Implementation Details

**Scoring System**:
- Questions use 0-4 slider (Not Started → Fully Implemented)
- Level score: average of question responses (0.0-1.0)
- Dimension score: sum of unlocked level scores (0.0-4.0)
- Overall score: average of all dimensions (0.0-4.0)

**State Structure**:
```javascript
{
  schemaVersion: 1,
  currentDimensionIndex: 0,
  answers: {
    dimensionId: {
      level: { questionIndex: value }
    }
  }
}
```

**Data Management**:
- YAML (`ai_maturity.yml`) is the source of truth
- Manually sync to JavaScript module (`ai_maturity_dimensions.js`)
- HTML loads JS module for runtime use
- **Important**: Keep YAML and JS in sync when updating questions/dimensions

### When Working on This Tool

**DO**:
- Read `maturity_refactor.md` for full architecture and refactoring plan
- Maintain MVC separation of concerns (Model, View, Controller layers)
- Use CSS variables for theming (defined in `:root`)
- Preserve single-file architecture (all dependencies via CDN)
- Update both YAML and JS when changing dimension data
- Test localStorage persistence and schema migrations
- Ensure HTML escaping for XSS prevention

**DON'T**:
- Break the single-file design (users need to download one file)
- Add server-side dependencies
- Use eval() or unsafe practices (security-critical)
- Remove schema versioning (needed for data migration)
- Hardcode values that should be in CONFIG object
- Skip testing the radar chart click navigation

**Common Modifications**:
1. **Update questions**: Edit `DIMENSIONS_DATA` in HTML and sync to YAML
2. **Change theme**: Modify CSS variables in `:root` section
3. **Adjust unlock threshold**: Change `CONFIG.UNLOCK_THRESHOLD`
4. **Add features**: Follow MVC pattern, extend appropriate layer's public API

### Testing Checklist
- [ ] All 12 dimensions load and display correctly
- [ ] Progressive unlocking works (test threshold logic)
- [ ] Radar chart updates in real-time
- [ ] Chart click navigation jumps to correct dimension
- [ ] localStorage save/restore works across page reloads
- [ ] Keyboard navigation (arrow keys, tab order)
- [ ] Mobile responsive design
- [ ] Print/PDF export functionality

## Site Pages

- `index.html` - Homepage with post listing
- `archive.html` - Posts by date
- `tags.html` - Tag cloud with post counts
- `contact.html` - About/bio page
- `projects.html` - Portfolio/project showcase (includes MTA visualizations)
- `FAQ.html` - FAQ page
- `/tag/*.md` - Per-tag archive pages

## Working with Content

### Creating a New Post
1. Create `_posts/YYYY-MM-DD-slug.md`
2. Add front matter with required fields (see structure above)
3. Write content in Markdown or HTML
4. Use `<!--more-->` to set excerpt
5. Place images in `/assets/YYYY/`
6. Commit and push to master

### Adding a New Tag
1. Create `/tag/tagname.md` with tagpage layout
2. Add tag to post front matter
3. Tag archives auto-generate

### Modifying Styles
- Edit SCSS in `_sass/` directory
- Main color scheme uses crimson (#c20) as primary
- Responsive design with mobile-first approach

## Important Notes

### Repository & Environment
- The repository is 4.6GB due to large binary assets - be mindful when cloning/pulling
- Emacs backup files (`#*#`) may appear in `_posts/` - these should be ignored
- The site uses custom domain (druce.ai) via CNAME file
- Host is set to `0.0.0.0` in config for development server accessibility

### Ruby Version Management
- The site uses `github-pages` gem which manages all Jekyll dependencies
- GitHub Pages officially supports Ruby 3.3.4+
- Local development may use different Ruby versions - consult Gemfile for compatibility
- Use `bundle install` after any Ruby version changes

### Legacy WordPress Migration
- Post IDs and GUIDs are preserved from WordPress for URL compatibility
- Legacy uploads remain in `/assets/wp-content/`
- Permalink structure maintains WordPress-era URLs
