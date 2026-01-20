# Link Checker Setup

Automated link checking has been added to your site to catch broken links before they reach production.

## Quick Start

### Local Testing (Before Pushing)

```bash
# Check internal links only (fast, ~30 seconds)
./check-links.sh

# Check all links including external (slow, ~5-10 minutes)
./check-links.sh --external
```

### GitHub Actions (Automatic)

Once you push to GitHub, link checking runs automatically:

**On every push/PR**:
- ✅ Checks all internal links
- ✅ Fails CI if internal links are broken
- ⏭️ Skips external links (to avoid rate limits)

**Weekly (Mondays 9 AM UTC)**:
- ✅ Checks internal links
- ⚠️ Checks external links (warnings only)
- 📧 Email notification if issues found

**Manual trigger**:
- Go to Actions tab → "Link Checker" → "Run workflow"

## What Gets Checked

### Internal Links ✅
- Links between your blog posts
- Links to static pages (About, Projects, etc.)
- Image references
- CSS/JS references
- Anchor links (`#section`)

### External Links (scheduled only) ⚠️
- External websites
- Social media links
- Reference links
- Embedded content

### Ignored Links ⏭️
These are intentionally skipped:
- Twitter/X (rate limited)
- LinkedIn (rate limited)
- Facebook (rate limited)
- `/fintwit/` path (special case)
- `/static.test/` (excluded from build)

## Understanding Results

### ✅ Pass
All links working correctly

### ⚠️ Warning (External only)
Some external links failed, but this is normal:
- Sites may be temporarily down
- Rate limiting (too many requests)
- Sites blocking bots
- Temporary network issues

**Action**: Review warnings, but don't worry if external links occasionally fail

### ❌ Fail (Internal only)
Internal links are broken - **must be fixed**

Common causes:
- Typo in link path
- File moved or deleted
- Wrong permalink in front matter
- Image file missing

## Files Created

```
.github/workflows/
├── link-checker.yml                    # Active workflow (html-proofer)
├── link-checker-lychee.yml.alternative # Alternative (Lychee - faster)
└── README.md                           # Workflow documentation

check-links.sh                          # Local testing script
LINK-CHECKER.md                         # This file
```

## Customization

### Change Check Frequency

Edit `.github/workflows/link-checker.yml`:

```yaml
schedule:
  - cron: '0 9 * * 1'  # Current: Mondays at 9 AM
  # Examples:
  # - cron: '0 0 * * *'      # Daily at midnight
  # - cron: '0 9 * * 1,4'    # Mon & Thu at 9 AM
```

### Ignore Additional URLs

Add to `--ignore-urls` in both files:

**Workflow** (`.github/workflows/link-checker.yml`):
```yaml
--ignore-urls "/fintwit/,/static.test/,/example.com/"
```

**Local script** (`check-links.sh`):
```bash
--ignore-urls "/fintwit/,/static.test/,/example.com/"
```

### Switch to Lychee (Faster Alternative)

```bash
# Activate Lychee workflow
mv .github/workflows/link-checker-lychee.yml.alternative \
   .github/workflows/link-checker-lychee.yml

# Optional: Disable html-proofer
mv .github/workflows/link-checker.yml \
   .github/workflows/link-checker.yml.disabled
```

**Lychee benefits**:
- 3-5x faster
- Better concurrency
- Nice markdown reports
- Modern, actively maintained

## Troubleshooting

### "Too many 429 errors"
Sites are rate limiting. Options:
1. Add domain to ignore list
2. Reduce `--max-concurrency`
3. Increase `--timeout`

### "403 Forbidden errors"
Sites blocking bot user agents:
1. Add to ignore list, or
2. Add 403 to accepted status codes

### "Check takes too long"
1. Use Lychee instead (faster)
2. Reduce external link checking
3. Increase concurrency (if rate limits allow)

## Best Practices

1. **Run locally before pushing**
   ```bash
   ./check-links.sh  # Quick check
   ```

2. **Fix internal links immediately**
   - These block your CI/CD
   - Usually easy to fix

3. **Review external link warnings**
   - Check if pattern (same domain failing)
   - Ignore one-off failures
   - Update or remove persistently broken links

4. **Use relative links for internal content**
   - ✅ `[link](/2025/01/post)`
   - ❌ `[link](https://druce.ai/2025/01/post)`

5. **Check after major changes**
   - After restructuring posts
   - After changing permalinks
   - After moving images

## Next Steps

1. **Push to GitHub** to activate workflows
2. **Check Actions tab** after first push
3. **Run locally** before major changes
4. **Review weekly reports** via email

For detailed documentation, see `.github/workflows/README.md`
