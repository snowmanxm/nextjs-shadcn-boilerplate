# Admin Panel Product Rules

Version: 2026-06-27
Applies to: `src/**/*.ts`, `src/**/*.tsx`

## Backend boundaries

- MUST treat `chatchat/backend` as the admin authentication source of truth.
- MUST use the shared admin JWT for calls to `chatchat`, `chatandbuild-v2`, and `lb-backend`.
- MUST keep backend base URLs centralized in typed config or API client modules, not scattered through components.
- SHOULD use `url-join` (`urlJoin(...)`) for endpoint path composition.

## Admin auth and RBAC

- MUST model admin identity separately from normal user identity.
- MUST preserve role domains from the backends: `SuperAdmin`, `SecureAdmin`, `ChatChatAdmin`, `ChatAndBuildAdmin`, and `LivingBrainAdmin`.
- MUST gate navigation and actions by role on the frontend, while assuming the backend remains the source of enforcement.
- MUST fail closed when roles, sessions, or auth state are missing or unknown.

## 2FA step-up behavior

- MUST pre-validate recent 2FA before sensitive mutations by calling the auth validation endpoint first.
- MUST show the 2FA step-up flow when validation indicates recent verification is missing or expired.
- MUST treat recent 2FA as per-session/per-device; do not infer that verification on one browser/device unlocks another.
- MUST retry the original sensitive action only after the current session passes step-up.

## Sensitive data handling

- MUST NOT store admin JWTs or 2FA state in places that are unnecessarily exposed.
- MUST NOT log access tokens, 2FA codes, recovery data, backend secrets, or raw error payloads.
- SHOULD keep token/session storage logic isolated in one auth module or hook.
- SHOULD redact sensitive fields from toasts, debug UI, and caught error summaries.

## Admin UX

- MUST show clear loading, disabled, confirmation, success, and failure states for sensitive actions.
- MUST make destructive or privileged mutations deliberate through confirmation dialogs where appropriate.
- SHOULD keep copy concise and operational, because this app is used by admins under pressure.
