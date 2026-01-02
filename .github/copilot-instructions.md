## Purpose
Help AI coding agents become immediately productive in this Angular (v21) standalone app.

## Big picture
- App bootstraps via `bootstrapApplication(App, appConfig)` in `src/main.ts`.
- App wiring (router + global error listeners) lives in `src/app/app.config.ts` via `ApplicationConfig`.
- Routes are defined in `src/app/app.routes.ts` and reference standalone components under `src/app/pages` (example: `HomeComponent`).
- Root component is `src/app/app.ts` (standalone: true) and uses `RouterOutlet` for navigation.
- Static assets are served from the `public/` folder (configured in `angular.json`).

## Build / dev / test workflows
- Development server: `npm start` (runs `ng serve`, default dev configuration, port 4200).
- Build: `npm run build` (uses `ng build`, output in `dist/`).
- Watch rebuilds: `npm run watch` (ng build --watch --configuration development).
- Tests: `npm test` (runs `ng test`; project uses Angular build unit-test integration and has `vitest` in `devDependencies`).

## Project-specific patterns and conventions
- Uses Angular standalone components (`standalone: true`) rather than NgModules — import standalone components directly when adding routes or providers.
- Routing is registered via `provideRouter(routes)` inside `appConfig.providers` rather than an NgModule router import.
- Global error handling is enabled via `provideBrowserGlobalErrorListeners()` in `appConfig`.
- File layout: `src/app` for app-level code; `src/app/pages/<page>` for page components (`*.component.ts`, `*.html`, `*.css`).
- Templates and CSS are colocated next to their component files (see `src/app/pages/home/home.*`).

## Common tasks (examples)
- Add a new page and route:
  1. Create `src/app/pages/your-page/your-page.component.ts` as a standalone component.
  2. Import and add the route in `src/app/app.routes.ts`:
     ```ts
     import { YourPageComponent } from './pages/your-page/your-page.component';
     export const routes = [{ path: 'your-page', component: YourPageComponent }, ...];
     ```
- Serve assets: place static files under the `public/` folder (configured in `angular.json` asset globs).

## Integration points & dependencies
- Angular core libraries shown in `package.json` (e.g., `@angular/core`, `@angular/router`) — prefer built-in providers and `@angular/build` tooling.
- Tests use `vitest`; unit-test config is handled via Angular build tooling.
- No backend/HTTP conventions are present in the repo; if adding HTTP services, follow Angular `HttpClient` patterns and put services under `src/app/services`.

## What to avoid / quick notes
- Do not add NgModule scaffolding — this project intentionally uses standalone components.
- App config is centralized in `src/app/app.config.ts`; prefer adding providers there for application-wide services.
- Keep route definitions in `src/app/app.routes.ts` to avoid fragmentation.

## Key files to look at
- `src/main.ts` — app bootstrap
- `src/app/app.config.ts` — ApplicationConfig & global providers
- `src/app/app.routes.ts` — route table
- `src/app/app.ts` — root standalone component
- `angular.json` and `package.json` — build/test scripts and asset config

If anything is unclear or you'd like this expanded (examples for components, tests, or service patterns), tell me what you want and I will iterate.
