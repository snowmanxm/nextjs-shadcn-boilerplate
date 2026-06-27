# Admin Frontend Agent Rules (Core)

Version: 2026-06-27
Applies to: All admin frontend work

## Instruction hierarchy

1. Follow system and tool policies first.
2. Follow the user's requested product behavior second.
3. Follow this admin frontend rule set third.
4. When rules conflict, choose the safer, smaller, and easier-to-review option.

## Delivery workflow

- MUST understand the request before coding.
- MUST present a short implementation plan and get explicit user confirmation before writing code.
- MUST keep changes small, scoped, and reviewable by phase.
- MUST run relevant validation before finalizing (`yarn lint`, `yarn build`, `yarn format:check`, or targeted checks) unless the user explicitly waives it.
- MUST explain behavior changes, validation performed, and remaining risk.

## Code quality

- MUST keep code readable over clever.
- MUST avoid dead code, commented-out logic, and unrelated refactors.
- MUST preserve existing Next.js, React, Tailwind, shadcn-style component, and alias patterns.
- SHOULD extract reusable logic only when it removes real duplication or matches an existing local pattern.
- SHOULD add concise comments only where intent is non-obvious.

## Safety and secrets

- MUST NOT hardcode secrets, tokens, private credentials, or production-only URLs.
- MUST NOT log admin JWTs, 2FA codes, sensitive user payloads, or backend error payloads.
- MUST validate and narrow untrusted input at UI boundaries such as forms, URL params, local storage, and API responses.
- SHOULD fail closed for auth, role, and protected route checks.

## Change safety

- MUST NOT run destructive git commands without explicit approval.
- MUST NOT revert unrelated local changes.
- MUST keep unrelated edits out of the same change.
- SHOULD call out unexpected workspace modifications when they affect the task.

## Testing expectations

- MUST add or update tests for meaningful behavior changes unless the user explicitly waives tests for the phase.
- SHOULD prefer focused unit tests for hooks/utilities and integration/UI tests for auth, 2FA, and admin action flows.
- SHOULD include regression coverage for bugs involving auth persistence, role gating, 2FA step-up, or API error handling.

## UX and accessibility baseline

- MUST keep interactive controls keyboard-accessible and semantically correct.
- MUST keep loading, empty, disabled, and error states visible for user-facing flows.
- SHOULD preserve the light, clean visual direction inspired by `chatchat/frontend`.
