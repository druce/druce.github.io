# druce.ai blog

Jekyll-based blog at [druce.ai](https://druce.ai) - Machine learning, AI, finance, economics, and technology.

Based on the brilliant [Lilian Weng's Lil'Log blog](https://lilianweng.github.io/lil-log/) which uses the [Minima](https://github.com/jekyll/minima) theme with custom tweaks.

## Quick Start

### Local Development

```bash
# Install dependencies
bundle install

# Start development server with live reload
bundle exec jekyll serve
# Access at http://localhost:4000

# Build static site
bundle exec jekyll build
```

**Note:** Changes to `_config.yml` require server restart.

### Run CI/CD Checks Locally

**Link Checker** (recommended before pushing):
```bash
# Check internal links only (fast, ~30 seconds)
./check-links.sh

# Check all links including external (slow, ~5-10 minutes)
./check-links.sh --external
```

**Alternative: Use Lychee** (faster, modern):
```bash
# Install Lychee
brew install lychee

# Check internal links
bundle exec jekyll build
lychee --exclude-path fintwit --exclude-path static.test \
       --exclude 'twitter\.com' --exclude 'linkedin\.com' \
       --base _site '_site/**/*.html'

# Check all links
lychee --exclude 'twitter\.com' --exclude 'linkedin\.com' \
       --base _site --max-concurrency 5 --timeout 60 \
       '_site/**/*.html'
```

## Automated Workflows

### Link Checker (GitHub Actions)

Located at `.github/workflows/link-checker.yml` - uses Lychee for fast, reliable link checking.

**Runs on:**
- Every push to master (internal links only)
- Every pull request (internal links only)
- Weekly schedule: Mondays at 9 AM UTC (all links)
- Manual trigger via Actions tab

**What it checks:**
- ✅ Internal links between posts
- ✅ Image references
- ✅ Anchor links
- ⚠️ External links (weekly only, warnings only)

**Ignored URLs:**
- Twitter/LinkedIn/Facebook (rate limited)
- `/fintwit/` and `/static.test/` paths

**View results:**
- Go to [Actions tab](https://github.com/druce/druce.github.io/actions)
- Click "Link Checker" workflow
- Click "Run workflow" to trigger manually

### Image Optimization

Located at `.github/workflows/optimize-images-direct.yml.example` (example, not active).

To activate:
```bash
mv .github/workflows/optimize-images-direct.yml.example \
   .github/workflows/optimize-images.yml
```

## Site Structure

- **Posts:** `_posts/YYYY-MM-DD-slug.md` (169 posts)
- **Tags:** `/tag/*.md` (20 tag pages)
- **Layouts:** `_layouts/` (default, post, tagpage)
- **Styles:** `_sass/` (Minima overrides + custom styles)
- **Assets:** `/assets/YYYY/` (images by year)

**Total URLs:** ~235 (under Screaming Frog free limit of 500)

## Documentation

- **Link Checker:** See [LINK-CHECKER.md](LINK-CHECKER.md) for detailed setup and troubleshooting
- **Project Instructions:** See [CLAUDE.md](CLAUDE.md) for development guidelines
- **Workflow Details:** See [.github/workflows/README.md](.github/workflows/README.md)

## Deployment

Push to `master` branch - GitHub Pages automatically builds and deploys to druce.ai.

## Configuration Note

If cloning for your own blog: Copy `_config.yml.orig` to `_config.yml` and update appropriately. The existing `_config.yml` contains production Disqus and Google Analytics codes.

