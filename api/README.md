# API code

## Folder structure

The app is split into modules. Each module (any folder directly under `api/src`) can have service(s) and/or controller(s).

- An example of a service is [./src/github/service.ts](./src/github/service.ts).
- An example of a controller is [./contributor/controller.ts](./contributor/controller.ts).

## Dependency injection

We use typedi for dependency injection. Please check their documentation.

We use it in both services and controllers.

## The `.env` file

At a minimum, you need a `.env` file with this content:

```.env
NODE_ENV=development
```

Keep in mind that you have limited calls to the GitHub API (60 calls per hour). The [FetchService](./api/src/fetch/service.ts) does a great job of caching these calls so it doesn't unnecessarily consume the GitHub API quota. If you wish to extend the limit from 60 to 5000, simply create a [GitHub Personal Access Token](https://github.com/settings/tokens) (make sure it has `Access public repositories` checked), and set it in `./api/.env` like this:

```.env
GITHUB_TOKEN=Paste_your_token_here
NODE_ENV=development
OPENAI_KEY=Pase_your_key_here
```

**Note:** If the README is still unclear, please create a PR with your suggested changes/additions.
