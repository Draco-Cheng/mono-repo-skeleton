#!/bin/bash
set -e

echo "=== Deploying infrastructure components ==="
helm upgrade --install infra helm \
  --set namespace.name=${K8S_NAMESPACE} \
  --create-namespace
echo "✓ Infrastructure deployed successfully"
