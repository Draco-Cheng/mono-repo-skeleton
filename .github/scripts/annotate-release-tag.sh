#!/bin/bash
set -e

echo "=== Adding release notes to git tag ==="

# Get affected projects
AFFECTED_PROJECTS=$(npx nx show projects --affected --base=$NX_BASE --head=$NX_HEAD | sed 's/^/  - /')

# Get commit messages since last version
LAST_VERSION=$(git describe --tags --abbrev=0 $VERSION^ 2>/dev/null || echo "")
if [ -n "$LAST_VERSION" ]; then
  CHANGES=$(git log --pretty=format:"  - %s" $LAST_VERSION..$VERSION | head -10)
else
  CHANGES=$(git log --pretty=format:"  - %s" -5)
fi

# Create annotated tag message
TAG_MESSAGE="Release $VERSION

📦 Affected Projects:
${AFFECTED_PROJECTS:-  - all}

📝 Changes:
$CHANGES

🚀 Deployed by GitHub Actions"

# Delete the lightweight tag and create annotated tag
git tag -d $VERSION
git tag -a $VERSION -m "$TAG_MESSAGE"
git push origin $VERSION --force

echo "✓ Git tag $VERSION updated with release notes"
echo "=== Release notes added successfully ==="
