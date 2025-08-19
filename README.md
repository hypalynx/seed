# Stack

_THE stack for getting stuff done!_

## Getting Started

- `npm run dev` to run this in watch mode.
- `npm run build` to build this project.
- `npm run build -- --detail` to build with bundle analysis.

## TODO

- database (sqlite 99%?)
- page transition animation
- docker/k8s config
- node-cron
- auth n auth (guest/user/admin)

### Components

- dropdown menu
- mobile slide in menu
- progress bar

A starter template for building web services, prioritising speed,
simplicity and maintenance cost.

## Technology Choices

- Javascript
  - Client: Preact, wouter, @preact/signals
  - Server: Express, node-cron.
  - Build tools: esbuild.
  - Testing: node test runner, Playwright.
  - Deployment: docker-compose, single container, 15s deploys
    - may change but this is super minimal config for 99% of what
      we want.
