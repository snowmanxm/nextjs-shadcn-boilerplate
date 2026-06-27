# Admin Frontend Rules (Next.js + React + Tailwind)

Version: 2026-06-27
Applies to: `src/**/*.ts`, `src/**/*.tsx`

## Next.js architecture

- MUST use Server Components by default and add Client Components only when required.
- MUST keep `src/app/**/page.tsx` and `src/app/**/layout.tsx` as Server Components; if client-side behavior is needed, extract it to a Client Component under `src/components/**`.
- MUST keep browser-only APIs inside Client Components, hooks, or services guarded for browser runtime.
- SHOULD keep route-level loading and error states close to the related `src/app` segment.

## React patterns

- MUST use functional components and hooks.
- MUST keep render paths pure and avoid side effects during render.
- MUST keep component props and state shapes explicit and typed.
- SHOULD move reused stateful behavior into custom hooks under `src/hooks`.
- SHOULD minimize unnecessary rerenders from unstable object/function creation in hot paths.

## Tailwind and shadcn-style UI

- MUST use Tailwind utility classes consistent with the current light theme tokens.
- MUST place generated shadcn components under `src/components/ui`.
- MUST prefer shadcn CLI-generated primitives for dialogs, dropdowns, selects, tables, toasts, tabs, skeletons, badges, buttons, inputs, and labels when compatible.
- MUST avoid inline style objects unless dynamic styling cannot be expressed clearly with classes.
- SHOULD centralize repeated class composition with `cn(...)` from `@/lib`.

## Forms and validation

- MUST validate user inputs before submission.
- MUST show actionable errors without leaking backend internals.
- SHOULD preserve in-progress user input on recoverable errors.
- SHOULD keep form schemas and TypeScript request types aligned.

## Performance and rendering

- MUST avoid shipping unnecessary client JavaScript.
- SHOULD keep large tables paginated, virtualized, or server-filtered where practical.
- SHOULD defer non-critical work until primary admin content is interactive.
