#!/bin/bash
set -e

echo "=== Deploying infrastructure components ==="

HELM_ARGS="--set namespace.name=${K8S_NAMESPACE}"

# Set ingress host if provided
if [ -n "$INGRESS_HOST" ]; then
  HELM_ARGS="$HELM_ARGS --set ingress.host=${INGRESS_HOST}"
  echo "Ingress host: ${INGRESS_HOST}"
fi

# Deliberately NOT passing --namespace here. Helm keys a release by
# (name, tracking namespace); if a project deployed from this template ends
# up on a shared cluster where the release is already tracked under
# "default" (or any namespace other than K8S_NAMESPACE), adding --namespace
# makes Helm treat this as a DIFFERENT release from the one already live —
# it then tries to re-install and collides with the live Namespace object's
# existing ownership annotations, breaking a working deploy (this bit two
# real projects derived from this template; see yi-ying-orchids PR #184).
# Chart resources still land in the right namespace via
# .Values.namespace.name regardless of where the release itself is tracked.
# Before touching this, check where the live release is actually tracked
# (`helm list -A`) rather than assuming it matches K8S_NAMESPACE.
helm upgrade --install infra-${K8S_NAMESPACE} helm \
  $HELM_ARGS \
  --create-namespace
echo "✓ Infrastructure deployed successfully"
