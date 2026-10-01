# AI_README: CI/CD Workflows

Conventions for `.github/workflows/`. Nx caching, GitHub Actions cache scoping, release flow.

---

## Release

- Release is TAG-ONLY — CD never bumps `package.json`/`pyproject.toml` nor commits back to `main`. Version lives in the git tag. See `README.md` § Versioning.
- `manual-deploy.yml`'s `clean_namespace` deletes the live K8s namespace — gated behind `confirm_namespace`, which must exactly match `K8S_NAMESPACE`, so a stray checkbox click can't wipe production.

## Nx

- `nx:run-commands` targets are UNCACHED unless `cache: true` in `nx.json` targetDefaults — persisting `.nx/cache` alone does nothing.
- A workflow running cacheable targets MUST be in `namedInputs.sharedGlobals`, else editing it invalidates nothing. `manual-deploy.yml` runs ONLY `deploy` (uncacheable by design — it mutates the cluster), so it needs neither.
- `helm/` + `.github/scripts/` are OUTSIDE the nx graph — `nx affected` returns empty for infra-only commits, so `deploy.yml`'s `check` job also greps `git diff` for those paths. Without it an infra-only change merges green and never deploys.

## Actions cache

- GitHub scopes a cache entry to the ref that WROTE it — a PR-ref entry is unreadable by other PRs and by `main`. Shared keys are written from `main` only; PRs use `actions/cache/restore@v4`, never combined `actions/cache@v4` (it saves from whatever ref it ran on).
- nx cache key is the BRANCH name, not `github.sha` — a per-commit key never hits yet always saves, minting a multi-hundred-MB entry per push until the quota evicts entries in use.
- `actions/cache/save` cannot overwrite an existing exact key — a rolling key must `gh api --method DELETE` the old entry first. Needs `actions: write`.
- Skip `npm ci` on a node_modules cache hit — it DELETES node_modules first, discarding what was restored.
- `astral-sh/setup-uv` needs `prune-cache: false` — the post-job prune hangs, is killed at 5m00s, and logs a red "exit code 2" that does NOT fail the build. Pruning only shrinks the upload.
- Playwright browser key is identical across branches, so a PR saves only on a miss — once stored, later runs hit and save nothing.

## Docker

- Layer cache lives in the registry (`:buildcache` tag), NOT Actions cache — that store is capped per repo.
- Needs `docker/setup-buildx-action` — the default `docker` driver silently ignores `--cache-to`.
