# Organization-only release

This repository publishes `@escaperoomengs/ununique-design-system-web` to GitHub Packages, not the public npm registry.

## Before publishing v1.0.0

1. Merge the release commit containing `package.json` version `1.0.0` and `CHANGELOG.md`.
2. Confirm the GitHub Actions workflow has `packages: write` permission.
3. Run the **Publish organization package** workflow manually from the GitHub Actions page.
4. After the first publish, open the package settings and limit access to the `EscapeRoomEngs` organization or this repository as required.

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

1. Add a Changeset with `npm run changeset`.
2. Apply it with `npm run version-packages`.
3. Run `npm run lint`, `npm run test:coverage`, `npm run test:package`, and `npm run build-storybook`.
4. Merge and manually dispatch the publishing workflow.
