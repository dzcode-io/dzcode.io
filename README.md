# dzcode.io

[<img src="http://img.shields.io/badge/Join%20us%20on%20Slack-@dzcode.io-yellow.svg?logo=slack">](https://join.slack.com/t/dzcode/shared_invite/zt-ek9kscb7-m8z_~cBjX79l~uchuABPFQ)

The code for [dzcode.io](https://dzcode.io), a website for Algerian open-source community.

## Meta

You can find more about each folder by clicking on the folder name

| **Apps**                          | **Coverage**                                                                                                                      |                               **Production URL** |                                                                                                                                                                                     **Staging URL** |                                     **Local URL** |
| :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------: |
| [api](./api)                      | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=api)](https://codecov.io/gh/dzcode-io/dzcode.io)       | [api.dzcode.io/docs](https://api.dzcode.io/docs) |                                                                                                                                        [api-stage.dzcode.io/docs](https://api-stage.dzcode.io/docs) | [localhost:7070/docs](http://localhost:7070/docs) |
| [web](./web)                      | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=web)](https://codecov.io/gh/dzcode-io/dzcode.io)       |                   [dzcode.io](https://dzcode.io) |                                                                                                                                                          [stage.dzcode.io](https://stage.dzcode.io) |           [localhost:8080](http://localhost:8080) |
| [mobile](./mobile)                | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=mobile)](https://codecov.io/gh/dzcode-io/dzcode.io)    |                                                  | [Android](https://play.google.com/store/apps/details?id=io.dzcode.mobile) \| [iOS](https://testflight.apple.com/join/XDcfIqdJ) \| [Expo](https://expo.dev/@zakman.dev/dzcode?release-channel=stage) |                run `yarn --cwd=mobile start:expo` |
| [data](./data)                    | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=data)](https://codecov.io/gh/dzcode-io/dzcode.io)      |                                                  |                                                                                                                                                                                                     |                                                   |
| **Packages**                      |                                                                                                                                   |                                                  |                                                                                                                                                                                                     |                                                   |
| [models](./packages/models)       | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=models)](https://codecov.io/gh/dzcode-io/dzcode.io)    |                                                  |                                                                                                                                                                                                     |                                                   |
| [utils](./packages/utils)         | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=utils)](https://codecov.io/gh/dzcode-io/dzcode.io)     |                                                  |                                                                                                                                                                                                     |                                                   |
| [ui](./packages/ui)               | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=ui)](https://codecov.io/gh/dzcode-io/dzcode.io)        |                                                  |                                                                                                                                                                                                     |                                                   |
| [tooling](./packages/tooling)     |                                                                                                                                   |                                                  |                                                                                                                                                                                                     |                                                   |
| [ui-mobile](./packages/ui-mobile) | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=ui-mobile)](https://codecov.io/gh/dzcode-io/dzcode.io) |                                                  |                                                                                                                                                                                                     |                                                   |

## Get Started

### Perquisites

Make sure you have:

- [Git](https://git-scm.com/)
- [Nodejs](https://nodejs.org/) version 18 or higher (we recommend using [nvm](https://github.com/nvm-sh/nvm))
- [Yarn](https://yarnpkg.com/) version 1.4.2 or higher

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
yarn
```

- Run it locally by either:

```sh
yarn dev:web
```

```sh
yarn dev:mobile
```

```sh
yarn dev:all
```

- For api server go to <http://localhost:7070/docs>
- For web server go to <http://localhost:8080>
- For mobile run `yarn --cwd=mobile start:expo` and scan QR code with your phone

**Note**

In [`./api`](./api), keep in mind that you have limited calls to Github Api (60 calls per hour), the [FetchService](./api/src/fetch/service.ts) is doing a great job at caching theses calls so it doesn't unnecessarily consume Github API quota. If you wish to extend the limit from 60 to 5000, simply create a [Github Personal Access Token](https://github.com/settings/tokens) (make sure it has `Access public repositories` checked), and set it in `./api/.env` like this:

```.env
GITHUB_TOKEN=Paste_You_Token_Here
```

### Run e2e locally

Make **sure** you are in the project **root**, then:

- run web e2e tests by:

```sh
yarn e2e:web
```

## Contributing

To get started see [the contributing guidelines](https://github.com/dzcode-io/dzcode.io/blob/main/.github/CONTRIBUTING.md).

If you use VSCode, please make sure to have a `.vscode/settings.json` file with the content:

```json
{
  "prettier.configPath": "packages/tooling/.prettierrc",
  "eslint.options": { "overrideConfigFile": "packages/tooling/.eslintrc.json" },
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

### Before You Create a Pull Request

- If you already forked the repository, please make sure your fork is up-to-date, following [this simple steps](https://www.dzcode.io/Learn/Git_Basics/Syncing_An_Old_Forked_Repository_With_Upstream).
- Please make sure your code follows the style guideline defined in this repo, for that simply run `yarn lint:fix` to ensure the conformity. This process should happen automatically whenever you commit your changes, but you can always do it manually when your Pull Request checks are failing due to linting errors.

### List Your Project or Add/Edit Article

- To list your project on dzcode.io, see [this tutorial](https://dzcode.io/Learn/About_dzcode_io/Add_Your_Project_To_dzcode_io)
- To add an article, see [this tutorial](https://dzcode.io/Learn/About_dzcode_io/Add_Your_Article_To_dzcode_io)

## License

Copyright (c) 2021 DzCode i/o (twitter: [@dzcode_io](https://twitter.com/dzcode_io)) Licensed under the MIT license.
