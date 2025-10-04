#!/bin/bash
set -e

echo "=== Retagging non-affected projects ==="

# Get projects that are NOT affected but have retag target
NON_AFFECTED_PROJECTS=$(npx nx show projects --with-target=retag | grep -v -F "$(npx nx show projects --affected --with-target=retag --base=$NX_BASE --head=$NX_HEAD)" || true)

if [ ! -z "$NON_AFFECTED_PROJECTS" ]; then
  echo "Non-affected projects to retag: $NON_AFFECTED_PROJECTS"
  for project in $NON_AFFECTED_PROJECTS; do
    echo "Retagging $project..."
    # Check if latest image exists before retagging (skip new projects without images)
    LATEST_IMAGE="$DOCKER_USERNAME/${REPO_NAME}_${project}:latest"
    if docker manifest inspect "$LATEST_IMAGE" > /dev/null 2>&1; then
      npx nx run $project:retag
      echo "✓ $project retagged"
    else
      echo "⚠️  Skipping retag for $project: no existing image found (new project?)"
    fi
  done
else
  echo "No projects to retag"
fi

echo "=== Retagging complete ==="
