# Mesto — Social Photo Platform

Interactive single-page application for publishing places, managing a profile and interacting with community cards.

## Live demo

https://nestlir.github.io/mesto-project-ff/

## Features

- edit profile information;
- update avatar;
- create new place cards;
- delete cards owned by the current user;
- like and unlike cards;
- preview images in a modal;
- client-side form validation;
- asynchronous REST API integration;
- responsive interface.

## Architecture

The project is organised around small JavaScript modules:

- `src/components/api.js` — REST API requests and response handling;
- `src/components/card.js` — card creation and like interactions;
- `src/components/modal.js` — modal lifecycle and keyboard/overlay handling;
- `src/components/validation.js` — reusable form validation;
- `src/components/forms/` — submit handlers for profile, avatar, cards and deletion;
- `src/components/constats.js` — DOM references and shared constants;
- `src/index.js` — application bootstrap and UI orchestration.

The initial user profile and cards are loaded concurrently with `Promise.all()`, then rendered after both requests complete.

## Tech stack

**HTML5 · CSS3 · JavaScript · REST API · Webpack · Babel · PostCSS**

## Run locally

```bash
git clone https://github.com/nestlir/mesto-project-ff.git
cd mesto-project-ff
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment

The repository includes a GitHub Pages deployment script:

```bash
npm run deploy
```

## Engineering focus

Mesto demonstrates the transition from static frontend development to application development: asynchronous data loading, server-backed state changes, reusable UI modules, event-driven interactions and form validation.

## Project context

Originally created as part of frontend training and subsequently documented as a portfolio case study.
