# Admin Frontend Rules (Next.js + React + Tailwind)

Version: 2026-07-03
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

## App infrastructure

- MUST use the existing app infrastructure before adding custom infrastructure.
- MUST put app-wide client providers in `src/app/providers.tsx` and compose them from `src/app/layout.tsx`; do not create parallel provider roots.
- MUST use `@tanstack/react-query` for server/cache-backed data fetching, mutations, cache invalidation, loading, and error state. Do not implement server data flows with raw `useEffect` + `useState` unless the data is truly local UI state.
- MUST use the shared API layer under `src/api` for HTTP requests, API feedback events, and query client setup. Do not create feature-local Axios/fetch clients, interceptors, event buses, or toast pipelines.
- MUST keep runtime configuration in `src/config` and read env values through typed config helpers; do not read scattered `process.env.*` values inside components.
- SHOULD keep query keys centralized when a feature has cache invalidation or shared list/detail queries.

## Tailwind and shadcn-style UI

- MUST use Tailwind utility classes consistent with the current light theme tokens.
- MUST place generated shadcn components under `src/components/ui`.
- MUST use existing primitives from `src/components/ui` before creating new UI building blocks. Current primitives include accordion, alert, alert dialog, avatar, badge, breadcrumb, button, calendar, card, checkbox, collapsible, command, dialog, dropdown menu, hover card, input, input group, input OTP, label, pagination, popover, progress, radio group, scroll area, select, separator, sheet, skeleton, sonner/toaster, switch, table, tabs, textarea, and tooltip.
- MUST use controls exported from `@/components/ui` or composed controls from `@/components/shared` in feature components.
- MUST NOT render native interactive/control/table JSX elements directly outside `src/components/ui`; use `Button`, `Input`, `Select`, `Textarea`, `Label`, `Checkbox`, `Switch`, `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `Dialog`, `Progress`, or another existing primitive instead.
- MUST NOT import native browser controls, `@base-ui/react/*`, Radix primitives, `cmdk`, `input-otp`, `react-day-picker`, or other low-level primitive libraries directly in feature components when an equivalent `src/components/ui` component exists.
- MUST extend `src/components/ui` first when a shared primitive is missing, then export it from `src/components/ui/index.ts`; feature components should not define one-off primitive variants locally.
- MUST export every same-folder public primitive from `src/components/ui/index.ts`.
- MUST use reusable controls from `src/components/shared` for common table/search/select patterns before adding feature-local copies.
- MUST avoid inline style objects unless dynamic styling cannot be expressed clearly with classes.
- SHOULD centralize repeated class composition with `cn(...)` from `@/utils/cn` or the `@/utils` barrel.

```tsx
// Bad: feature component bypasses the project primitive.
<label className="text-sm">Enabled</label>

// Good: feature component uses the shared primitive surface.
<Label className="text-sm">Enabled</Label>
```

```tsx
// Bad: feature component imports low-level primitives directly.
import { Dialog } from '@base-ui/react/dialog';

// Good: feature component imports from the project UI barrel.
import { Dialog } from '@/components/ui';
```

## Forms and validation

- MUST validate user inputs before submission.
- MUST show actionable errors without leaking backend internals.
- SHOULD preserve in-progress user input on recoverable errors.
- SHOULD keep form schemas and TypeScript request types aligned.

## Performance and rendering

- MUST avoid shipping unnecessary client JavaScript.
- SHOULD keep large tables paginated, virtualized, or server-filtered where practical.
- SHOULD defer non-critical work until primary admin content is interactive.
