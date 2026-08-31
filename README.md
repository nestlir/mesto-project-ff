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

## Architecture

The interface is organized into reusable JavaScript modules and BEM-style CSS blocks. Webpack builds the production bundle into the `dist/` directory.

## Run locally

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment

The repository includes an automated GitHub Actions workflow that builds the project and publishes the production bundle to GitHub Pages on updates to `main`.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run deploy` | Publish `dist/` with gh-pages |

## Project structure

```text
src/                  Application source code
src/blocks/           BEM CSS blocks
src/components/       JavaScript components
src/images/           Static assets
.github/workflows/    CI/CD configuration
```

## Notes

This repository is maintained as a frontend portfolio project demonstrating modular JavaScript, responsive UI development and a Webpack-based build pipeline.
