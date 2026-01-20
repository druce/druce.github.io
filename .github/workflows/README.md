# GitHub Actions Workflows

## Available Workflows

### link-checker.yml (Active)

**Purpose**: Automatically check for broken links in the Jekyll site

**Triggers**:
- On push to `master` branch
- On pull requests to `master`
- Weekly schedule (Mondays at 9 AM UTC)
- Manual trigger via GitHub Actions UI

**What it checks**:
- **Internal links** (always): Checks all links within your site
- **External links** (scheduled/manual only): Checks external URLs on scheduled runs

**Configuration**:
- Uses `html-proofer` gem (Jekyll-specific)
- Ignores social media links that often rate-limit (Twitter, LinkedIn, Facebook)
- Ignores certain paths: `/fintwit/`, `/static.test/`
- Accepts HTTP status codes: 200, 204, 301, 302, 307, 308, 429, 403, 999
- Timeout: 30s for internal, 60s for external

**Behavior**:
- ✅ **Internal link failures**: Workflow FAILS (blocks merge)
- ⚠️ **External link failures**: Workflow continues (warning only)

### link-checker-lychee.yml.alternative (Inactive)

**Purpose**: Alternative link checker using Lychee (faster, modern Rust-based)

**To activate**:
```bash
mv .github/workflows/link-checker-lychee.yml.alternative .github/workflows/link-checker-lychee.yml
# Optional: remove or rename the html-proofer version
```

**Advantages over html-proofer**:
- Faster execution
- Better performance with large sites
- Nice markdown reports in GitHub Actions summary

**Trade-offs**:
- Less Jekyll-specific features
- Newer tool (less mature)

## Local Testing

Before pushing, test links locally:

```bash
# Check internal links only (fast)
./check-links.sh

# Check all links including external (slow, ~5-10 min)
./check-links.sh --external
```

## Maintenance

### Adding URL Exceptions

If you need to ignore specific URLs:

**html-proofer** - Edit `link-checker.yml`:
```yaml
--ignore-urls "/example.com/,/another-site.com/"
```

**Lychee** - Edit `link-checker-lychee.yml.alternative`:
```yaml
--exclude 'example\.com'
--exclude 'another-site\.com'
```

### Adjusting Timeouts

If checks are timing out:

**html-proofer**:
```yaml
--typhoeus '{"timeout": 60, "connecttimeout": 20}'
```

**Lychee**:
```yaml
--timeout 60
```

### Changing Schedule

Edit the cron expression in the workflow:
```yaml
schedule:
  - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
```

Format: `minute hour day-of-month month day-of-week`

Examples:
- `0 0 * * *` - Daily at midnight
- `0 9 * * 1,4` - Mondays and Thursdays at 9 AM
- `0 */6 * * *` - Every 6 hours

## Troubleshooting

### Too many external link failures

External links can be flaky. Consider:
1. Increase timeout values
2. Add problematic domains to ignore list
3. Reduce concurrency: `--max-concurrency 3`
4. Check only on schedule, not on every push

### Rate limiting (429 errors)

Some sites rate-limit bots. Options:
1. Add to ignore list (already done for Twitter, LinkedIn, Facebook)
2. Reduce concurrency
3. Add retry logic (html-proofer does this automatically)

### False positives

Some sites block bot user agents:
- Add them to ignore list
- Or accept 403 status: `--http-status-ignore "403"`

## Files

- `link-checker.yml` - Main workflow (html-proofer)
- `link-checker-lychee.yml.alternative` - Alternative workflow (Lychee)
- `optimize-images-direct.yml.example` - Image optimization example
- `README.md` - This file
- `../../check-links.sh` - Local link checking script
