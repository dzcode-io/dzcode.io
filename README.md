# dzCode.io

[![](https://github.com/dzcode-io/dzcode.io/workflows/Deploy%20Frontend/badge.svg)](https://github.com/dzcode-io/dzcode.io/actions?query=workflow%3A%22Deploy+Frontend%22)

The code for [dzcode.io](https://dzcode.io), a website for Algerian open-source community.

## Table of Content

- [Table of Content](#table-of-content)
- [Get Started](#get-started)
  - [Perquisites](#perquisites)
  - [Clone the repo and run it locally](#clone-the-repo-and-run-it-locally)
- [Contributing](#contributing)
- [License](#license)

## Get Started

### Perquisites

Make sure you have:

- [git](https://git-scm.com/)
- [nodejs](https://nodejs.org/) 10 or higher
- [yarn](https://yarnpkg.com/)

### Clone the repo and run it locally

- open terminal and clone the repo:

```shell
$ git clone https://github.com/dzcode-io/dzcode.io.git
```

- Make **sure** you are in the project **root**:

```shell
$ cd dzcode.io
```

- Install frontend dependencies:

```shell
$ cd frontend && yarn && cd ..
```

- Install frontend Firebase dependencies:

```shell
$ cd frontend/firebase && yarn && cd ../..
```

- Run the website locally:

```shell
$ cd frontend && yarn dev
```

## Contributing

To get started see [the contributing guidelines](https://github.com/dzcode-io/dzcode.io/blob/master/.github/CONTRIBUTING.md).

**Fix Typos** :
If you find a typo, please let us know, by creating a poll request.

**Unit test** :
Unit test are written in [Jest](https://jestjs.io/). Please add a unit test for every new feature or bug fix. `yarn test` to run the test suite.

## License

Copyright (c) 2020 dzCode.io (twitter: [@dzcode_io](https://twitter.com/dzcode_io)) Licensed under the MIT license.
