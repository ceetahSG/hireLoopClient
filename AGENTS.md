<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop Client

Marketing/landing site for HireLoop, built with the Next.js App Router and a shadcn-style component library. Treat this file as the source of truth for how code in this repo is organized and written.

## Stack

- **Next.js 16.4.4** (App Router, RSC, Turbopack) — docs bundled in `node_modules/next/dist/docs/`
- **React 19.3** with TypeScript 5 (`strict: true`)
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config`)
- **shadcn/ui** (`base-nova` style) built on **Base UI** (`@base-ui/react`), not Radix
- **better-auth** + **MongoDB** adapter for authentication
- **next-themes** for dark/light mode
- **lucide-react** for icons, **class-variance-authority** for variants

## Commands

Run from the repo root (`D:\PH\Backend Projects\hireloop-client`):

```bash
npm run dev        # next dev
npm run build      # next build
npm run start      # next start
npm run lint       # eslint (flat config)
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write on **/*.{ts,tsx}
```

Before finishing a change, run `npm run lint` and `npm run typecheck`.

## Project structure

```text
app/
  layout.tsx                 # Root layout: fonts, ThemeProvider, globals.css
  page.tsx                   # Landing page (currently renders <Navbar />)
  globals.css                # Tailwind v4 + shadcn theme tokens
  api/auth/[...all]/route.ts # better-auth route handler (GET/POST)
  images/                    # Page imagery (cta-bg, globe, logo)
  logos/                     # Partner/company logos
  favicon.ico
components/
  navbar.tsx                 # Site chrome / client components
  theme-provider.tsx         # next-themes wrapper + "d" hotkey toggle
  ui/                        # shadcn primitives (button, sheet, ...)
hooks/                       # Custom React hooks (currently empty)
lib/
  auth.ts                    # Server-side better-auth config (Mongo adapter)
  auth-client.ts             # Client-side auth client (signIn/signUp/useSession)
  utils.ts                   # Re-exports `cn` from the `cn` package
public/                      # Static assets served from `/`
```

- Import everything through the `@/*` alias (maps to the repo root), e.g. `@/components/ui/button`, `@/lib/auth`, `@/app/images/logo.png`.
- Add new UI primitives to `components/ui/`; keep feature components outside that folder.
- Hooks go in `hooks/`, server/client helpers and third-party setup in `lib/`.

## Next.js rules for this repo

- **Read the bundled docs first** when touching routing, data fetching, caching, Server Actions, or config. Start with:
  - `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
  - `.../03-layouts-and-pages.md`, `.../05-server-and-client-components.md`
  - `.../06-fetching-data.md`, `.../07-mutating-data.md`, `.../08-caching.md`
  - `.../15-route-handlers.md` and `.../16-proxy.md` (replaces the old middleware conventions)
  - `node_modules/next/dist/docs/01-app/02-guides/ai-agents.md`
- Use the **App Router** only (`app/`). Do not introduce `pages/`.
- Server Components are the default. Add `"use client"` only to components that need state, effects, refs, or browser APIs (see `components/navbar.tsx`).
- Keep route handlers under `app/api/**/route.ts` and export named HTTP verbs (`export const { GET, POST } = ...`).
- Do not edit generated/build artifacts: `.next/`, `next-env.d.ts`, `tsconfig.tsbuildinfo`, `node_modules/`.

## Styling conventions

- Tailwind v4 is configured entirely in `app/globals.css` via `@import "tailwindcss"`, `@theme inline`, and CSS variables (`--background`, `--primary`, etc.). Add tokens there, not in a JS config.
- Use the `dark:` variant backed by `.dark` (see `@custom-variant dark`). Theme is class-based (`attribute="class"`).
- Use `cn()` to merge classes. It is exported from the `cn` package and re-exported by `@/lib/utils`; shadcn-generated files import it directly from `"cn"` — match the surrounding file.
- Fonts are loaded with `next/font/google` in `app/layout.tsx` and exposed as CSS variables (`--font-sans`, `--font-mono`, `--font-inter`, `--font-instrument`).
- Prefer `next/image` with static imports from `app/images` or `public/` (see `components/navbar.tsx`).
- Follow mobile-first responsive classes and existing dark palette (`#070709`, `white/10`, cyan accents) for landing-page sections.
- Maintain accessibility: semantic elements, `aria-label`/`aria-expanded`, and the existing `focus-visible:outline-*` treatment.

## shadcn / component conventions

- Registry style is `base-nova` with **Base UI** primitives (`@base-ui/react/*`), not Radix. Check `components.json` before adding anything.
- Add primitives with:
  ```bash
  npx shadcn@latest add <component>
  ```
- shadcn aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`, `@/lib/utils`.
- UI primitives use `function` declarations, `data-slot` attributes, and named exports (see `components/ui/button.tsx`, `sheet.tsx`). Keep that pattern; do not rewrite them into arrow-function components.
- Build variants with `cva` and type them with `VariantProps`.

## Authentication

- Server config: `lib/auth.ts` (`betterAuth` + `mongodbAdapter`).
- Client config: `lib/auth-client.ts` (`createAuthClient` from `better-auth/react`; exports `signIn`, `signUp`, `useSession`).
- Route handler: `app/api/auth/[...all]/route.ts` via `toNextJsHandler(auth)`.
- Required env vars (`.env`, gitignored): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and a Mongo connection string.
- **Never hardcode credentials or connection strings in source.** Read them from `process.env` (the Mongo URI currently in `lib/auth.ts` should be moved to an env var). Never commit `.env*`.

## Code style

Config lives in `.prettierrc` and `eslint.config.mjs`:

- No semicolons, double quotes, 2-space indent, `trailingComma: "es5"`, `printWidth: 80`, LF line endings.
- Tailwind class sorting is enforced by `prettier-plugin-tailwindcss` for `cn` and `cva`. Run `npm run format`.
- ESLint uses `eslint-config-next` core-web-vitals + TypeScript rules; do not disable rules casually.
- Components: named exports for reusable components (`export function Navbar`), default exports for pages/layouts/route files.
- Prefer `import type` for type-only imports and `@/` aliases over long relative paths.
- Keep client components small; push data fetching and secrets to Server Components / route handlers.
