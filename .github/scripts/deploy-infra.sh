#!/bin/bash
set -e

echo "=== Deploying infrastructure components ==="

HELM_ARGS="--set namespace.name=${K8S_NAMESPACE}"

# Set ingress host if provided
if [ -n "$INGRESS_HOST" ]; then
  HELM_ARGS="$HELM_ARGS --set ingress.host=${INGRESS_HOST}"
  echo "Ingress host: ${INGRESS_HOST}"
fi

helm upgrade --install infra-${K8S_NAMESPACE} helm \
  $HELM_ARGS \
  --create-namespace
echo "✓ Infrastructure deployed successfully"
