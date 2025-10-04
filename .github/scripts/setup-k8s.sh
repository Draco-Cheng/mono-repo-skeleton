#!/bin/bash
set -e

echo "=== Setting up Kubernetes environment ==="

# Validate K8s credentials
echo "Validating K8s credentials..."
INVALID=""
echo "$K8S_CA_DATA" | base64 -d > /dev/null 2>&1 || INVALID="${INVALID}K8S_CA_DATA "
echo "$K8S_CLIENT_CERT" | base64 -d > /dev/null 2>&1 || INVALID="${INVALID}K8S_CLIENT_CERT "
echo "$K8S_CLIENT_KEY" | base64 -d > /dev/null 2>&1 || INVALID="${INVALID}K8S_CLIENT_KEY "
if [ -n "$INVALID" ]; then
  echo "ERROR: Invalid base64 format: $INVALID"
  exit 1
fi
echo "✓ All K8s credentials are valid"

# Create kubeconfig from template
echo "Creating kubeconfig..."
mkdir -p ~/.kube
envsubst < .github/templates/kubeconfig.yaml > ~/.kube/config
echo "✓ Kubeconfig created"

# Verify connection
echo "Verifying cluster connection..."
kubectl config current-context
echo "✓ Connected to cluster"

# Create namespace
echo "Creating namespace..."
envsubst < .github/templates/namespace.yaml | kubectl apply -f -
echo "✓ Namespace ready"

echo "=== Kubernetes environment setup complete ==="
