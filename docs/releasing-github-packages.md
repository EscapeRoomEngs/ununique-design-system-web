# Organization-only release

This repository publishes `@escaperoomengs/ununique-design-system-web` to GitHub Packages, not the public npm registry.

## Release prerequisites

1. The repository's Actions workflow permissions must allow `GITHUB_TOKEN` to write repository contents and packages. Branch and tag protection must allow the release workflow to atomically push its generated version commit to `main` and move the release tag.
2. Add a Changeset for every consumer-facing change before merging it to `main`.
3. After the first publish, open the package settings and limit access to the `EscapeRoomEngs` organization or this repository as required.

## Consumer setup

Each organization repository that consumes the package needs this `.npmrc` entry:

```ini
@escaperoomengs:registry=https://npm.pkg.github.com
```

In GitHub Actions, use `GITHUB_TOKEN` with `packages: read`. For a developer machine, use a GitHub personal access token with `read:packages` permission before running:

```bash
npm install @escaperoomengs/ununique-design-system-web
```

## Subsequent releases

1. Add a Changeset with `npm run changeset` and merge it to `main`.
2. Determine the version Changesets will produce, then push the matching semantic-version tag at the current `main` commit. For example, a pending minor Changeset from `1.0.0` is released with `v1.1.0`; prereleases use the matching `v1.1.0-rc.1` form.
3. The **Publish organization package** workflow runs automatically. It applies Changesets, rejects a mismatched tag, runs lint, coverage, and package checks, commits the generated `package.json`, lockfile, changelog, and consumed Changeset files to `main`, then atomically moves the release tag to that commit and publishes.
4. If publishing fails after the release commit is pushed, rerun the failed workflow. The matching package version and tag allow a safe retry without generating another version; an already-published matching package version is treated as complete.
