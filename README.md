# dzCode.io

[<img src="http://img.shields.io/badge/Join%20us%20on%20Slack-@dzCode.io-yellow.svg?logo=slack">](https://join.slack.com/t/dzcode/shared_invite/zt-ek9kscb7-m8z_~cBjX79l~uchuABPFQ)

The code for [dzcode.io](https://dzcode.io), a website for Algerian open-source community.

🚧 This branch contains breaking changes 🚧

since the version of dzcode.io website is still v0.x.x things are still unstable, the goal of this new version v1.x.x is to stabilize the code, and make it easy to chip new features

### Tasks (Open for changes)

- [x] change folder names, frontend to web, fullstack to common.
- [x] Move husky to sub-folders.
- [x] Use package names as aliases
- [x] Update Packages to use the latest major versions
- [x] clean dev deps
- [x] Remove t9config
- [x] Use Redux Hooks
- [x] update footer
- [x] split index.tsx from app.tsx
- [x] use rm instead of px
- [x] Fix styles
- [x] remove WhatAndWhy section
- [x] Landing pages for /[Model]
- [x] fix Logo responsiveness on navbar
- [x] Use FC interfaces on all React components (prop-types)
- [x] remove /Contact-Us
- [x] Make it work locally on other devices
- [x] proper loading component
- [x] splash screen
- [x] remove default react import
- [x] Fix MUI Theme
- [x] move data/[model] to data/models/[model]
- [x] fix the common and main components
- [x] Deploy each stack separately
- [x] Update CI/CD
- [x] cherry-pick recent commits to master
- [x] Clean /Learn data
- [x] Setup proper Github releases
- [x] Update In-Repo Documentation (Readme)
- [x] update labeler ci
- [x] Change default branch to main
- [x] Deploy 1.0.0 to production
- [x] Deploy API server
- [x] Clean tutorial Articles and move it to /Learn under dzcode.io section
- [ ] BUG: Material-UI: The `fade` color utility was renamed to `alpha` to better describe its functionality.
- [ ] Fix test coverage badges
- [ ] Check Licence issues

- [ ] /Contribute (list all open issues, discussion, ideas)
- [ ] Add leblad app
- [ ] ability to run only a specific app

## Meta

You can find more about each folder by clicking on the folder name

| Folder               | Coverage                                                                                                                       | Production URL |          Staging URL |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------- | -------------: | -------------------: |
| [./web](./web)       | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=web)](https://codecov.io/gh/dzcode-io/dzcode.io)    |      dzcode.io |      stage.dzcode.io |
| [./data](./data)     | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=data)](https://codecov.io/gh/dzcode-io/dzcode.io)   | data.dzcode.io | data.stage.dzcode.io |
| [./api](./api)       | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=api)](https://codecov.io/gh/dzcode-io/dzcode.io)    |  api.dzcode.io |  api_stage.dzcode.io |
| [./common](./common) | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=common)](https://codecov.io/gh/dzcode-io/dzcode.io) |                |                      |

## Table of Content

- [dzCode.io](#dzcodeio)
    - [Tasks (Open for changes)](#tasks-open-for-changes)
  - [Meta](#meta)
  - [Table of Content](#table-of-content)
  - [Get Started](#get-started)
    - [Perquisites](#perquisites)
    - [Run it locally](#run-it-locally)
  - [Contributing](#contributing)
    - [List Your Project or Add/Edit Article](#list-your-project-or-addedit-article)
  - [License](#license)

## Get Started

### Perquisites

Make sure you have:

- [Git](https://git-scm.com/)
- [Nodejs](https://nodejs.org/) version 10 or higher
- [Yarn](https://yarnpkg.com/) version 1 or higher

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

- Run it locally

```sh
yarn dev
```

- Now, Go to <http://localhost:8080>
- For data server go to <http://localhost:9090>
- For api server go to <http://localhost:7070>

## Contributing

To get started see [the contributing guidelines](https://github.com/dzcode-io/dzcode.io/blob/master/.github/CONTRIBUTING.md).

**Before You Create a Pull Request** :
Please make sure your code follows the style guideline defined in this repo, for that simply run `yarn lint:fix` to ensure the conformity. This process should happen automatically whenever you commit your changes, but you can always do it manually when your Pull Request checks are failing due to linting errors.

### List Your Project or Add/Edit Article

- To list your project on dzcode.io, see [this tutorial](https://dzcode.io/Learn/About_dzcode_io/Add_Your_Project_To_dzcode_io)
- To add an article, see [this tutorial](https://dzcode.io/Learn/About_dzcode_io/Add_Your_Article_To_dzcode_io)

## License

Copyright (c) 2020 dzCode.io (twitter: [@dzcode_io](https://twitter.com/dzcode_io)) Licensed under the MIT license.
