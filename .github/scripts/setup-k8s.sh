#!/bin/bash
set -e

echo "=== Setting up Kubernetes environment ==="

# Determine authentication method
# Priority: Token auth if K8S_USER_TOKEN is set, otherwise use cert auth
if [ -n "$K8S_USER_TOKEN" ]; then
  AUTH_METHOD="token"
  echo "Authentication method: Token-based"
else
  AUTH_METHOD="cert"
  echo "Authentication method: Certificate-based"
fi

# Validate common K8s credentials
echo "Validating K8s credentials..."
INVALID=""

# K8S_CA_DATA is required for both methods
echo "$K8S_CA_DATA" | base64 -d > /dev/null 2>&1 || INVALID="${INVALID}K8S_CA_DATA "

# Validate method-specific credentials
if [ "$AUTH_METHOD" = "token" ]; then
  # Token auth: validate token is not empty
  if [ -z "$K8S_USER_TOKEN" ]; then
    INVALID="${INVALID}K8S_USER_TOKEN "
  fi
else
  # Cert auth: validate certificates
  echo "$K8S_CLIENT_CERT" | base64 -d > /dev/null 2>&1 || INVALID="${INVALID}K8S_CLIENT_CERT "
  echo "$K8S_CLIENT_KEY" | base64 -d > /dev/null 2>&1 || INVALID="${INVALID}K8S_CLIENT_KEY "
fi

if [ -n "$INVALID" ]; then
  echo "ERROR: Invalid or missing credentials: $INVALID"
  exit 1
fi
echo "✓ All K8s credentials are valid"

# Create kubeconfig from appropriate template
echo "Creating kubeconfig..."
mkdir -p ~/.kube

if [ "$AUTH_METHOD" = "token" ]; then
  envsubst < .github/templates/kubeconfig-token.yaml > ~/.kube/config
else
  envsubst < .github/templates/kubeconfig.yaml > ~/.kube/config
fi
echo "✓ Kubeconfig created"

# Verify connection
echo "Verifying cluster connection..."
kubectl config current-context
echo "✓ Connected to cluster"

echo "=== Kubernetes environment setup complete ==="
