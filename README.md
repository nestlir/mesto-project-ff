# Mesto

Responsive social-style web application for managing a profile and a collection of image cards.

## Features

- profile editing;
- avatar management;
- card creation and deletion;
- likes;
- popup and modal interactions;
- client-side form validation;
- responsive layout.

## Stack

- JavaScript
- HTML5
- CSS
- Webpack
- Babel
- PostCSS

## Run locally

```bash
npm ci
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment

Deployment is automated with GitHub Actions. Every successful update to `main` builds the application and publishes `dist/` to GitHub Pages.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |

## Project structure

```text
src/                  Application source code
src/blocks/           BEM CSS blocks
src/components/       JavaScript components
src/images/           Static assets
.github/workflows/    CI/CD configuration
```

## Project value

A frontend portfolio project demonstrating modular JavaScript, responsive UI development and a Webpack-based production pipeline.