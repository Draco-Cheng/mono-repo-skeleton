## Summary
Brief description of changes

## Type of Change
- [ ] `feat:` New feature (minor version bump)
- [ ] `fix:` Bug fix (patch version bump)
- [ ] `docs:` Documentation (patch version bump)
- [ ] `refactor:` Code refactor (patch version bump)
- [ ] `test:` Tests (patch version bump)
- [ ] `chore:` Maintenance (patch version bump)
- [ ] `ci:` CI/CD changes (patch version bump)
- [ ] `perf:` Performance improvements (patch version bump)
- [ ] `style:` Code style (patch version bump)
- [ ] Breaking change (add `!` or `BREAKING CHANGE:` for major version bump)

## ⚠️ Important: PR Title Format
Make sure your PR title follows conventional commits format:
- ✅ `feat: add user authentication`
- ✅ `fix: resolve memory leak in parser`
- ✅ `feat!: remove support for Node 12` (breaking change)
- ❌ `update code` (wrong format)

**For breaking changes**, use one of these formats:
- Add `!` after type: `feat!: breaking change description`
- Or add `BREAKING CHANGE:` in PR description body

**This PR title will be used as the squash merge commit message!**

## Test Plan
- [ ] Tests pass
- [ ] Manual testing completed