# Chess Broadcaster Suite
Collection of packages to make chess broadcasting and codewriting easier.
Typescript-based Turborepo with pnpm, prettier & eslint.

## Packages
### @chess-broadcaster-suite/uci
Implementation of the UCI protocol

### @chess-broadcaster-suite/chess
Chess logic & abstractions above it. ATM a very hot mess

### @chess-broadcaster-suite/config-eslint
Highly opinionated flat-config(s) to use across the repo

### @chess-broadcaster-suite/config-typescript
Reusable typescript base(s)

## Prerequisities
LTS node (20, 21, 22) & pnpm >= 10. Things should probably work with earlier versions of node as well, but the latest LTS will always be the primary target.
Repo is attuned to vscode, although not obligatory.

## Setup
Clone the repo and `pnpm i`.
There's not so much in the repo right now, but a Docker dev environment setup might be added as things are stood up.

### Tasks & CI
- `pnpm dev` to spin up workspaces recompiling in watch mode
- `pnpm dev:test` to spin up tests with Vitest in watch mode
- `pnpm build`
- `pnpm format` to run prettier over all workspaces
- resp. `pnpm format:fix` to automatically fix issues
- `pnpm lint` to run eslint over all workspaces
- resp. `pnpm lint:fix` to automatically fix issues
- `pnpm test`
- `pnm typecheck` to do a no-emit typecheck run

CI github action runs `format, lint, typecheck, test & build` over supported nodejs versions.
[Conventional commits](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index) with kebab-case (e.g. `fix(workspace-name): message`) are enforced, with loosened rules for message length.

See respective workspaces for their licenses (ATM everything is MIT-licensed)
