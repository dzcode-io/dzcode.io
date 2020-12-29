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
- [x] Use FC interfaces on all React components (prop-types)
- [ ] /Contribute (list all open issues, discussion, ideas)
- [x] remove /Contact-Us
- [x] Make it work locally on other devices
- [x] proper loading component
- [x] splash screen
- [x] remove default react import
- [ ] Add leblad app
- [ ] ability to run only a specific app
- [x] Fix MUI Theme
- [x] move data/[model] to data/models/[model]
- [ ] fix the common and main components
- [ ] Update sitemap url on google search console
- [ ] Add example test cases
- [x] Deploy each stack separately
- [x] Update CI/CD
- [ ] Check Licence issues
- [ ] Change default branch to main
- [ ] Clean stale branches, and old PRs
- [ ] Clean the issue board ( possibly remove ZenHub)
- [ ] Try to use Github discussion
- [ ] Try yo use Github Codespaces
- [ ] Update In-Repo Documentation (add readme for each sub-folder)
- [ ] Setup proper Github releases
- [ ] Fix test coverage badges

## Meta

You can find more about each folder by clicking on the folder name

| Folder             | Production URL         | Staging URL                    | Coverage                                                                                                                       |
| :----------------- | :--------------------- | :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| [common](./common) | N/A                    | N/A                            | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=common)](https://codecov.io/gh/dzcode-io/dzcode.io) |
| [api](./api)       | N/A                    | N/A                            | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=api)](https://codecov.io/gh/dzcode-io/dzcode.io)    |
| [web](./web)       | https://www.dzcode.io  | https://staging.dzcode.io      | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=web)](https://codecov.io/gh/dzcode-io/dzcode.io)    |
| [data](./data)     | https://data.dzcode.io | https://data.staging.dzcode.io | [![codecov](https://codecov.io/gh/dzcode-io/dzcode.io/graph/badge.svg?flag=data)](https://codecov.io/gh/dzcode-io/dzcode.io)   |

## Table of Content

- [dzCode.io](#dzcodeio)
    - [Tasks (Open for changes)](#tasks-open-for-changes)
  - [Meta](#meta)
  - [Table of Content](#table-of-content)
  - [Get Started](#get-started)
    - [Perquisites](#perquisites)
    - [Run it locally](#run-it-locally)
  - [Contributing](#contributing)
    - [Add Your Own Article](#add-your-own-article)
    - [Fix Typos, or Edit existing Article](#fix-typos-or-edit-existing-article)
    - [Add Your Own Project](#add-your-own-project)
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

### Add Your Own Article

Articles on dzCode.io are found under the folder [`data/articles`](https://github.com/dzcode-io/dzcode.io/tree/master/data/articles).

To add new article let's say "Awesome New Article", simply do the following:

- Create a new folder `Awesome_New_Article` under `data/articles`
- Add two files:
  - `info.json` , a json file containing info about your article, like **title**, **description** etc..., see [this file](https://github.com/dzcode-io/dzcode.io/blob/master/data/articles/Welcome_to_dzCode/info.json) as an example.
  - `content.md` , a markdown file which contain your Article text, in form of [markdown](https://www.markdownguide.org/).
- Lastly, to make your article visible, modify the content of [`data/articles/list.json`](https://github.com/dzcode-io/dzcode.io/blob/master/data/articles/list.json) and add your article's folder name `Awesome_New_Article` inside the `"items": []` array.

To test and see your article locally, make sure to [you are all set](#get-started), after you run dzCode locally go to http://localhost:8080/Articles/Awesome_New_Article, you will see your article, and you can continue editing from there, once you are happy with the result, create a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) against master branch, and we will be happy to merge it 😃.

### Fix Typos, or Edit existing Article

If you find a typo in any Article, or you find something that needs to be edited, please let us know, by applying the necessary modification, then create a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) against master branch, and we will review it along with the article's author, then merge it.

### Add Your Own Project

Projects on dzCode.io are found under the folder [`data/projects`](https://github.com/dzcode-io/dzcode.io/tree/master/data/projects).

To add new project let's say "Awesome New Project", simply do the following:

- Create a new folder `Awesome_New_Project` under `data/projects`
- Add `info.json` , a json file containing info about your project, like **title**, **description** etc..., see [this file](https://github.com/dzcode-io/dzcode.io/tree/master/data/projects/Project_1/info.json) as an example.
- Lastly, to make your project visible, modify the content of [`data/projects/list.json`](https://github.com/dzcode-io/dzcode.io/blob/master/data/projects/list.json) and add your project's folder name `Awesome_New_Project` inside the `"items": []` array.

To test and see your project locally, make sure to [you are all set](#get-started), after you run dzCode locally go to http://localhost:8080/Projects/Awesome_New_Project, you will see your project, and you can continue editing from there, once you are happy with the result, create a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) against master branch, and we will be happy to merge it 😃.

## License

Copyright (c) 2020 dzCode.io (twitter: [@dzcode_io](https://twitter.com/dzcode_io)) Licensed under the MIT license.
