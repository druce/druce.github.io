#!/usr/bin/env python3
"""
Replace streeteye.com blog URLs with relative paths in posts.

This script:
- Replaces internal blog post URLs with relative paths
- Preserves external streeteye.com features (leaderboard, calculator, etc.)
- Shows a dry-run by default
- Use --apply to actually make changes
"""

import re
import sys
from pathlib import Path
from collections import defaultdict

def should_replace_url(url):
    """
    Determine if a streeteye.com URL should be replaced with a relative path.

    Replace if:
    - Contains /blog/ (old WordPress structure)
    - Contains /YYYY/ pattern (blog posts)
    - Is just the domain root

    Don't replace if:
    - Points to /leaderboard, /calculator, etc. (separate services)
    - Is in a Twitter intent URL (referrer parameter)
    """
    # Don't replace Twitter referrer URLs
    if 'twitter.com/intent' in url or 'original_referer' in url:
        return False

    # Don't replace specific non-blog services
    non_blog_paths = ['/leaderboard', '/calculator', '/bleaderboard']
    for path in non_blog_paths:
        if path in url:
            return False

    # Replace if it's a blog post URL
    if '/blog/' in url:
        return True

    # Replace if it matches a year pattern (blog posts)
    if re.search(r'/\d{4}/', url):
        return True

    # Replace if it's just the domain root (www.streeteye.com or www.streeteye.com/)
    if re.match(r'https?://(www\.|blog\.)?streeteye\.com/?$', url):
        return True

    return False

def extract_relative_path(url):
    """
    Extract the relative path from a streeteye.com URL.

    Examples:
    - https://streeteye.com/blog/2011/04/foo.html -> /blog/2011/04/foo.html
    - https://blog.streeteye.com/2015/05/bar -> /2015/05/bar
    - https://www.streeteye.com/ -> /
    """
    # Remove protocol and domain
    path = re.sub(r'https?://(www\.|blog\.)?streeteye\.com', '', url)

    # Ensure it starts with /
    if not path:
        path = '/'
    elif not path.startswith('/'):
        path = '/' + path

    return path

def process_file(filepath, apply_changes=False):
    """
    Process a single file, replacing streeteye.com URLs.

    Returns: (changes_made, list of (old_url, new_path) tuples)
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # Find all streeteye.com URLs
    pattern = r'https?://(www\.|blog\.)?streeteye\.com[^\s\'")\]]*'
    matches = re.finditer(pattern, content)

    replacements = {}  # old_url -> new_path

    for match in matches:
        url = match.group(0)

        if should_replace_url(url):
            new_path = extract_relative_path(url)
            replacements[url] = new_path
            changes.append((url, new_path))

    # Apply replacements (in reverse order to preserve positions)
    if replacements:
        for old_url, new_path in replacements.items():
            content = content.replace(old_url, new_path)

    # Write back if applying changes
    if apply_changes and content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes

    return (content != original_content), changes

def main():
    apply_changes = '--apply' in sys.argv

    posts_dir = Path('_posts')

    if not posts_dir.exists():
        print("Error: _posts directory not found")
        sys.exit(1)

    print("=" * 70)
    if apply_changes:
        print("APPLYING CHANGES - Replacing streeteye.com URLs with relative paths")
    else:
        print("DRY RUN - Showing what would be changed (use --apply to apply)")
    print("=" * 70)
    print()

    all_changes = defaultdict(list)
    files_changed = 0
    total_replacements = 0

    for post_file in sorted(posts_dir.glob('*.md')):
        changed, changes = process_file(post_file, apply_changes)

        if changed:
            files_changed += 1
            all_changes[post_file.name] = changes
            total_replacements += len(changes)

    # Report changes
    if all_changes:
        print(f"Files with changes: {files_changed}")
        print(f"Total URL replacements: {total_replacements}")
        print()

        # Show first 20 files in detail
        shown = 0
        for filename, changes in list(all_changes.items())[:20]:
            print(f"\n{filename}:")
            for old_url, new_path in changes[:5]:  # Show first 5 changes per file
                print(f"  {old_url}")
                print(f"    -> {new_path}")
            if len(changes) > 5:
                print(f"  ... and {len(changes) - 5} more changes")
            shown += 1

        if files_changed > 20:
            print(f"\n... and {files_changed - 20} more files")

        print()
        print("=" * 70)
        if apply_changes:
            print(f"✅ Applied {total_replacements} URL replacements to {files_changed} files")
        else:
            print(f"💡 Would replace {total_replacements} URLs in {files_changed} files")
            print("   Run with --apply to make these changes")
        print("=" * 70)
    else:
        print("No streeteye.com blog URLs found to replace.")

    # Show sample of URLs that were NOT replaced
    print("\nSample URLs that were preserved (non-blog links):")
    preserved_urls = set()
    for post_file in sorted(posts_dir.glob('*.md'))[:50]:
        with open(post_file, 'r', encoding='utf-8') as f:
            content = f.read()
        pattern = r'https?://(www\.|blog\.)?streeteye\.com[^\s\'")\]]*'
        for match in re.finditer(pattern, content):
            url = match.group(0)
            if not should_replace_url(url):
                preserved_urls.add(url)
                if len(preserved_urls) >= 5:
                    break
        if len(preserved_urls) >= 5:
            break

    for url in list(preserved_urls)[:5]:
        print(f"  ✓ {url}")
    if not preserved_urls:
        print("  (none found in sample)")

if __name__ == '__main__':
    main()
