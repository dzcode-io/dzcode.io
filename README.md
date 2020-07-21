# dzCode.io

[<img src="http://img.shields.io/badge/Join%20us%20on%20Slack-@dzCode.io-yellow.svg?logo=slack">](https://join.slack.com/t/dzcode/shared_invite/zt-ek9kscb7-m8z_~cBjX79l~uchuABPFQ)

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
    - [Add Your Own Article](#add-your-own-article)
    - [Fix Typos, or Edit existing Article](#fix-typos-or-edit-existing-article)
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
cd frontend
yarn
cd ..
```

- Install frontend Firebase dependencies:

```shell
cd frontend/firebase
yarn
cd ../..
```

- Install data dependencies:

```shell
cd data
yarn
cd ..
```

- Install fullstack dependencies:

```shell
cd fullstack
yarn
cd ..
```

### Run it locally

- Build fullstack code:

```shell
cd fullstack
yarn build:watch
```

- Open new terminal and Run frontend server:

```shell
cd frontend
yarn dev
```

- Open new terminal and Run data server:

```shell
cd data
yarn build
yarn dev
```

- Now, Go to http://localhost:8080

## Contributing

To get started see [the contributing guidelines](https://github.com/dzcode-io/dzcode.io/blob/master/.github/CONTRIBUTING.md).

**Unit test** :
Unit test are written in [Jest](https://jestjs.io/). Please add a unit test for every new feature or bug fix. `yarn test` to run the test suite.

### Add Your Own Article

Articles on dzCode.io are found under the folder [`data/articles`](https://github.com/dzcode-io/dzcode.io/tree/master/data/articles).

To add new article let's say "Awesome New Article", simply do the following:

- Create a new folder `Awesome_New_Article` under `data/articles`
- Add two files:
  - `info.json` , a json file containing info about your article, like **title**, **description** etc..., see [this file](https://github.com/dzcode-io/dzcode.io/blob/master/data/articles/Welcome_to_dzCode/info.json) as an example.
  - `content.md` , a markdown file which contain your Article text, in form of [markdown](https://www.markdownguide.org/).
- Lastly, to make you article visible, modify the content of [`data/articles/list.json`](https://github.com/dzcode-io/dzcode.io/blob/master/data/articles/list.json) and add your article's folder name `Awesome_New_Article` inside the `"items": []` array.

To test and see your article locally, make sure to [you are all set](#get-started), after you run dzCode locally go to http://localhost:8080/Articles/Awesome_New_Article, you will see your article, and you can continue editing from there, once you are happy with the result, create a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) against master branch, and we will be happy to merge it 😃.

### Fix Typos, or Edit existing Article

If you find a typo in any Article, or you find something that needs to be edited, please let us know, by applying the necessary modification, then create a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) against master branch, and we will review it along with the article's author, then merge it.

## License

Copyright (c) 2020 dzCode.io (twitter: [@dzcode_io](https://twitter.com/dzcode_io)) Licensed under the MIT license.
