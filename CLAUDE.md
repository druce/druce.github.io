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

# Build static site to _site/ directory
bundle exec jekyll build
```

Note: Server runs on port 4000 by default. Changes to `_config.yml` require server restart.

### Deployment
Push to master branch - GitHub Pages automatically builds and deploys.

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
- `jekyll_picture_tag` - Responsive images
- `jekyll-archives` - Archive page generation

### Interactive Content Support
- **Math rendering**: MathJax 3 for LaTeX
- **Charts**: Chart.js for interactive visualizations
- **Tables**: jQuery TableSorter for sortable tables
- **Code**: Rouge syntax highlighting with GitHub color scheme
- **Icons**: Font Awesome

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

- The repository is 4.6GB due to large binary assets - be mindful when cloning/pulling
- Emacs backup files (`#*#`) appear in `_posts/` - these should be ignored
- The site uses custom domain (druce.ai) via CNAME file
- Post IDs and GUIDs are legacy from WordPress migration
- Host is set to `0.0.0.0` in config for development server accessibility
