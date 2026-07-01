# Admin Frontend Rules (Miscellaneous)

Version: 2026-06-27
Applies to: `src/**/*.ts`, `src/**/*.tsx`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `package.json`, `components.json`

## Project structure and imports

- MUST keep app code under `src/` (`src/app`, `src/components`, `src/api`, `src/config`, `src/utils`, `src/hooks`, `src/types`, `src/services`).
- MUST use the `@/*` alias for internal imports that map to `src/*`.
- MUST NOT use `export default` except in Next.js `page.tsx` and `layout.tsx` files.
- MUST use named exports and collect same-folder public exports in that folder's `index.ts`.
- MUST import modules from another folder through that folder's `index.ts`; imports from files in the same folder MUST use relative file imports.
- MUST keep each `index.ts` limited to same-level files in its folder; do not re-export from subfolders.
- SHOULD keep shared UI primitives in `src/components/ui` and feature-specific admin UI under `src/components/<feature>`.
- SHOULD keep reusable composed controls in `src/components/shared`.
- MUST keep `src/components/ui` focused on reusable primitive wrappers and visual variants; put multi-primitive patterns such as table controls, debounced inputs, and native-select adapters in `src/components/shared`.
- SHOULD keep generic helpers in `src/utils`, hooks in `src/hooks`, app API infrastructure in `src/api`, runtime config in `src/config`, API clients in `src/services` when they are product/domain-specific, and shared contracts in `src/types`.
- MUST prefer existing barrels (`@/api`, `@/config`, `@/components/ui`, `@/components/shared`, `@/utils`) over deep imports across folders.

## TypeScript and API boundaries

- MUST keep strict-compatible typings and avoid `any` unless justified near the boundary that requires it.
- MUST model API request/response payloads with explicit types.
- MUST validate and narrow unknown external data before rendering or persisting it.
- SHOULD use discriminated unions for variant UI/data states.

## Tooling and scripts

- MUST use the Node version from `.nvmrc` before running scripts.
- MUST use existing scripts from `package.json` when possible (`dev`, `build`, `lint`, `format`, `format:check`, `rules:sync`).
- MUST run `python3 scripts/sync-agent-rules.py` after changes under `.ai/rules/`.
- MUST keep generated files (`AGENTS.md`, `CLAUDE.md`, `CLINE.md`, `CODEX.md`, `.cursor/rules/*.mdc`) ignored from Git and Docker build context.
- SHOULD commit canonical rule edits under `.ai/rules/` and the sync script, not generated rule output.

## Lint, format, and generated output

- MUST keep ESLint configuration in `eslint.config.mjs` as the single source of lint behavior.
- MUST keep tooling ignore patterns from scanning `node_modules/**`.
- SHOULD run `yarn lint` and `yarn format:check` before finalizing substantial UI/config changes unless the user waives those checks.
- SHOULD avoid reformatting generated output or unrelated files.

## Assets and environment

- MUST keep static assets in `public/` unless they are imported as modules.
- MUST only use `NEXT_PUBLIC_*` values for data intended to be exposed to the browser.
- MUST keep `.env.example` limited to safe placeholder values.
- SHOULD validate redirects and external URLs before navigation.
