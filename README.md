# Seed

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
