# API code

## Folder structure

The app is split into modules, each module (any folder directly under `api/src`) can have service(s) and/or controller(s)

- example of a service is [./src/github/service.ts](./src/github/service.ts)
- example of a controller is [./contributor/controller.ts](./contributor/controller.ts)

There is still temporary old code inside:

- [./src/app/controllers](./src/app/controllers)
- [./src/app/loaders](./src/app/loaders)
- [./src/app/routes](./src/app/routes)
- [./src/app/services](./src/app/services)

## Dependency injection

We use typedi for dependency injection, please check their docs.

We use it in both services and controllers.

**Note:** if the readme is still unclear, please create a PR with your suggested changes/additions
