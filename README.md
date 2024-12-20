# dzcode.io

[![Discord](https://img.shields.io/discord/1290374838627602483)](https://discord.gg/TGbPsSMJC2)

The code for [dzcode.io](https://dzcode.io), a website for Algerian open-source community.

**Apps:**

- [`./web`](./web) ( [dzcode.io](https://dzcode.io) or [stage.dzcode.io](https://stage.dzcode.io) )
- [`./api`](./api) ( [api.dzcode.io](https://api.dzcode.io) or [api-stage.dzcode.io](https://api-stage.dzcode.io) )

**Packages**

- [`./data`](./data)
- [`./packages/models`](./packages/models)
- [`./packages/utils`](./packages/utils)
- [`./packages/tooling`](./packages/tooling)

## Get Started

### Perquisites

Make sure you have:

- [Git](https://git-scm.com/)
- [Nodejs](https://nodejs.org/) version 20 or higher (we recommend using [volta](https://docs.volta.sh/guide/getting-started) over plain install or [nvm](https://github.com/nvm-sh/nvm))
- [Docker](https://www.docker.com/) installed and running.

### Run it locally

- Open terminal and clone the repo:

```sh
 git clone https://github.com/dzcode-io/dzcode.io.git
```

- Make **sure** you are in the project **root**:

```sh
 cd dzcode.io
```

- Install dependencies:

```sh
npm install
```

- Run it locally:

```sh
npm run dev:all
```

- For api server go to <http://localhost:7070>
- For web server go to <http://localhost:8080>
- For search server go to <http://localhost:7700>

Please check the Readme.md files inside `./api` and `./web` for more info.

## Contributing

To get started see [the contributing guidelines](https://github.com/dzcode-io/dzcode.io/blob/main/.github/CONTRIBUTING.md).

If you use VSCode, please make sure to have a `.vscode/settings.json` file with the content:

```json
{
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "prettier.configPath": "packages/tooling/.prettierrc",
  "prettier.prettierPath": "./node_modules/prettier/index.cjs",
  "eslint.options": { "overrideConfigFile": "packages/tooling/eslint.config.mjs" },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.fixAll.ts": "always"
  }
}
```

### Before You Create a Pull Request

- If you already forked the repository, please make sure your fork is up-to-date, following [these simple steps](https://www.dzcode.io/Learn/Git_Basics/Syncing_An_Old_Forked_Repository_With_Upstream).
- Please make sure your code follows the style guideline defined in this repo, for that simply run `npm run lint:fix` to ensure the conformity. This process should happen automatically whenever you commit your changes, but you can always do it manually when your Pull Request checks are failing due to linting errors.

### List Your Project

Follow [these steps](https://github.com/dzcode-io/dzcode.io/blob/main/data/models/documentation/About_dzcode_io/Add_Your_Project_To_dzcode_io/content.md).

## License

Licensed under the MIT license (twitter: [@dzcode_io](https://twitter.com/dzcode_io)).
