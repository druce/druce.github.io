#!/bin/bash
#
# Local link checker for druce.ai Jekyll site
#
# Usage:
#   ./check-links.sh              # Check internal links only
#   ./check-links.sh --external   # Check external links too (slower)
#   ./check-links.sh --help       # Show help
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
CHECK_EXTERNAL=false
while [[ $# -gt 0 ]]; do
    case $1 in
        --external|-e)
            CHECK_EXTERNAL=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Check links in Jekyll site"
            echo ""
            echo "Options:"
            echo "  --external, -e    Also check external links (slower)"
            echo "  --help, -h        Show this help message"
            echo ""
            echo "Examples:"
            echo "  $0                # Internal links only (fast)"
            echo "  $0 --external     # All links including external (slow)"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Link Checker for druce.ai${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# Check if html-proofer is installed
if ! gem list html-proofer -i > /dev/null 2>&1; then
    echo -e "${YELLOW}Installing html-proofer...${NC}"
    gem install html-proofer
    echo ""
else
    PROOFER_VERSION=$(gem list html-proofer | grep html-proofer | sed 's/.*(\(.*\))/\1/')
    if [[ "$PROOFER_VERSION" =~ ^5\. ]]; then
        echo -e "${YELLOW}Warning: html-proofer 5.x has known issues with link detection.${NC}"
        echo -e "${YELLOW}         Consider using Lychee instead (brew install lychee)${NC}"
        echo -e "${YELLOW}         Results may not be accurate.${NC}"
        echo ""
    fi
fi

# Build the site
echo -e "${BLUE}Step 1: Building Jekyll site...${NC}"
if bundle exec jekyll build; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""

# Check internal links
echo -e "${BLUE}Step 2: Checking internal links...${NC}"
if htmlproofer _site \
    --disable-external \
    --ignore-urls "/fintwit/,/static.test/" \
    --log-level :info \
    --no-enforce-https 2>&1 | tee /tmp/link-check-internal.log; then
    echo -e "${GREEN}✓ All internal links valid${NC}"
    INTERNAL_OK=true
else
    echo -e "${RED}✗ Internal link errors found${NC}"
    INTERNAL_OK=false
fi
echo ""

# Check external links if requested
EXTERNAL_OK=true
if [ "$CHECK_EXTERNAL" = true ]; then
    echo -e "${BLUE}Step 3: Checking external links...${NC}"
    echo -e "${YELLOW}Note: This may take several minutes and some failures are normal${NC}"
    echo ""

    # html-proofer 5.x doesn't have --external-only, so we check everything
    # but ignore internal link failures (they were already checked)
    if htmlproofer _site \
        --ignore-urls "/twitter.com/,/linkedin.com/,/facebook.com/,/t.co/,/streeteye.com/leaderboard,/streeteye.com/calculator" \
        --ignore-status-codes "429,403,999" \
        --log-level :info \
        --no-enforce-https \
        --cache '{"timeframe": {"external": "1d"}}' 2>&1 | tee /tmp/link-check-external.log; then
        echo -e "${GREEN}✓ All links valid${NC}"
        EXTERNAL_OK=true
    else
        echo -e "${YELLOW}⚠ Some link errors found${NC}"
        echo -e "${YELLOW}  (External link failures are often temporary)${NC}"
        EXTERNAL_OK=false
    fi
    echo ""
fi

# Summary
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Summary${NC}"
echo -e "${BLUE}================================================${NC}"

if [ "$INTERNAL_OK" = true ]; then
    echo -e "Internal links: ${GREEN}✓ PASS${NC}"
else
    echo -e "Internal links: ${RED}✗ FAIL${NC}"
fi

if [ "$CHECK_EXTERNAL" = true ]; then
    if [ "$EXTERNAL_OK" = true ]; then
        echo -e "External links: ${GREEN}✓ PASS${NC}"
    else
        echo -e "External links: ${YELLOW}⚠ WARNINGS${NC}"
    fi
fi

echo ""
echo -e "${BLUE}Logs saved to:${NC}"
echo "  /tmp/link-check-internal.log"
if [ "$CHECK_EXTERNAL" = true ]; then
    echo "  /tmp/link-check-external.log"
fi
echo ""

# Exit with error only if internal links failed
if [ "$INTERNAL_OK" = false ]; then
    exit 1
fi

exit 0
