# dzCode.io

[![](https://github.com/dzcode-io/dzcode.io/workflows/Deploy%20Frontend/badge.svg)](https://github.com/dzcode-io/dzcode.io/actions?query=workflow%3A%22Deploy+Frontend%22)

The code for [dzcode.io](https://dzcode.io), a website for Algerian open-source community.

## Table of Content

- [dzCode.io](#dzcodeio)
  - [Table of Content](#table-of-content)
  - [Get Started](#get-started)
    - [Perquisites](#perquisites)
    - [Clone the repo](#clone-the-repo)
    - [Install dependencies](#install-dependencies)
    - [Run it locally](#run-it-locally)
  - [Contributing](#contributing)
  - [License](#license)

## Get Started

### Perquisites

Make sure you have:

- [git](https://git-scm.com/)
- [nodejs](https://nodejs.org/) 10 or higher
- [yarn](https://yarnpkg.com/)

### Clone the repo

- open terminal and clone the repo:

```shell
$ git clone https://github.com/dzcode-io/dzcode.io.git
```

- Make **sure** you are in the project **root**:

```shell
$ cd dzcode.io
```

### Install dependencies

- Install frontend dependencies:

```shell
$ cd frontend && yarn && cd ..
```

- Install frontend Firebase dependencies:

```shell
$ cd frontend/firebase && yarn && cd ../..
```

- Install data dependencies:

```shell
$ cd data && yarn && cd ..
```

- Install fullstack dependencies:

```shell
$ cd fullstack && yarn && cd ..
```

### Run it locally

- Build fullstack code:

```shell
$ cd fullstack && yarn build:watch
```

- Open new terminal and Run frontend server:

```shell
$ cd frontend && yarn dev
```

- Open new terminal and Run data server:

```shell
$ cd data && yarn build && yarn dev
```

- Now, Go to http://localhost:8080

## Contributing

To get started see [the contributing guidelines](https://github.com/dzcode-io/dzcode.io/blob/master/.github/CONTRIBUTING.md).

**Fix Typos** :
If you find a typo, please let us know, by creating a poll request.

**Unit test** :
Unit test are written in [Jest](https://jestjs.io/). Please add a unit test for every new feature or bug fix. `yarn test` to run the test suite.

## License

Copyright (c) 2020 dzCode.io (twitter: [@dzcode_io](https://twitter.com/dzcode_io)) Licensed under the MIT license.
