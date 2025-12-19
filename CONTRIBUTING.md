# Contributing to koa-helmet

Thank you for your interest in contributing to `koa-helmet`. Contributions of all kinds are welcome and encouraged.

This document outlines a set of guidelines and processes for anyone considering opening an **issue**, **discussion** or **pull request** to the project.

> [!NOTE]
>
> AI-assisted contributions are welcome; contributors are expected to test, review, and vouch for all code as if they wrote it themselves.

## Getting Started

1. Fork and clone the repo
1. Install dependencies: `npm install`
1. Run the test/lint suite: `npm check`

## Making Changes

1. Create a new branch for your changes
1. Make your changes
1. Run `npm check` to ensure test and style conformance
1. Add a [changeset](#changesets) for your changes (see below)
1. Submit a pull request

## Changesets

This project uses [changesets](https://github.com/changesets/changesets) to manage releases and changelogs.

**If your PR affects the package** (bug fix, new feature, dependency update, etc), please add a changeset:

```bash
npm run changeset
```

You'll be prompted to:

1. Select the type of change (patch, minor, major)
2. Write a summary of the change

This creates a file in the `.changeset` directory that will be used to generate release notes.

**You can skip the changeset for:**

- Documentation-only changes
- CI/tooling changes
