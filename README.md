# Frontend Skeleton

This branch provides a general-purpose Next.js frontend skeleton with a reusable UI system, shared app infrastructure, and project rules that keep future feature work consistent.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- shadcn-style UI primitives in `src/components/ui`
- React Query for server state
- Axios-based API helpers in `src/api`
- Yarn 1.x for package scripts

## Getting Started

Use the Node version from `.nvmrc`, then install dependencies:

```bash
nvm use
yarn install
```

Create local environment values from the example:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
yarn dev
```

The homepage is a component showcase that demonstrates the available primitives, shared controls, app providers, and API conventions.

## Scripts

- `yarn dev` starts the local Next.js development server.
- `yarn build` creates a production build.
- `yarn start` serves the production build on `PORT` or `3500`.
- `yarn lint` runs ESLint for `src`.
- `yarn format` formats supported project files.
- `yarn format:check` checks formatting without writing changes.
- `yarn rules:sync` regenerates AI rule outputs from `.ai/rules`.

## Project Structure

- `src/app` contains App Router pages, layouts, global styles, and app-level providers.
- `src/api` contains shared request helpers, API feedback events, and React Query setup.
- `src/config` contains typed runtime configuration helpers.
- `src/components/ui` contains reusable UI primitives. Feature code should import controls from this folder instead of native controls or low-level primitive libraries.
- `src/components/shared` contains composed reusable controls such as debounced inputs, native selects, and table controls.
- `src/components/showcase` contains the skeleton homepage showcase.
- `src/utils` contains framework-light helpers such as `cn`, date formatting, CSV parsing, error extraction, and platform checks.

## UI Conventions

Use `@/components/ui` as the main UI surface for buttons, inputs, labels, dialogs, tables, tabs, overlays, and feedback components. If a primitive is missing, add or extend it in `src/components/ui`, export it from `src/components/ui/index.ts`, and then consume it from feature code.

Use `@/components/shared` for common composed patterns before adding feature-local copies. Keep feature components focused on product behavior instead of recreating foundational controls.

## Data And Configuration

Use React Query for API-backed loading, error, mutation, and cache state. Use the shared API layer in `src/api` for HTTP requests and feedback events instead of adding feature-local clients or toast pipelines.

Read runtime values through `src/config`. Browser-exposed environment variables must use the `NEXT_PUBLIC_` prefix.

## Validation

Before finalizing meaningful changes, run the relevant checks:

```bash
yarn lint
yarn format:check
yarn build
```

If you edit `.ai/rules`, run:

```bash
yarn rules:sync
```
