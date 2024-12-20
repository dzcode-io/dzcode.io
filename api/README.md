# API code

## Folder structure

The app is split into modules, each module (any folder directly under `api/src`) can have service(s) and/or controller(s)

- example of a service is [./src/github/service.ts](./src/github/service.ts)
- example of a controller is [./contributor/controller.ts](./contributor/controller.ts)

## Dependency injection

We use typedi for dependency injection, please check their docs.

We use it in both services and controllers.

## The `.env` file

At minimum you need a `.env` file with this content:

```.env
NODE_ENV=development
```

Keep in mind that you have limited calls to Github Api (60 calls per hour), the [FetchService](./api/src/fetch/service.ts) is doing a great job at caching theses calls so it doesn't unnecessarily consume Github API quota. If you wish to extend the limit from 60 to 5000, simply create a [Github Personal Access Token](https://github.com/settings/tokens) (make sure it has `Access public repositories` checked), and set it in `./api/.env` like this:

```.env
GITHUB_TOKEN=Paste_You_Token_Here
NODE_ENV=development
```

**Note:** if the readme is still unclear, please create a PR with your suggested changes/additions
