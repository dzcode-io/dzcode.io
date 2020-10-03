This blog post shows a few different types of content that are supported and styled with
Material styles. Basic typography, images, and code are all supported.
You can extend these by modifying `Markdown.js`.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.

Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
Nullam id dolor id nibh ultricies vehicula ut id elit.

Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.

```jsx
import Markdown from "markdown-to-jsx";
import React from "react";
import { render } from "react-dom";

// surprise, it's a div instead!
const MyParagraph = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

render(
  <Markdown
    options={{
      overrides: {
        h1: {
          component: MyParagraph,
          props: {
            className: "foo",
          },
        },
      },
    }}
  >
    # Hello world!
  </Markdown>,
  document.body,
);

/*
    renders:

    <div class="foo">
        Hello World
    </div>
 */
```

## Heading

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

### Sub-heading

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

### Sub-heading

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
sit amet risus.

- Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
- Donec id elit non mi porta gravida at eget metus.
- Nulla vitae elit libero, a pharetra augue.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.

1.  Vestibulum id ligula porta felis euismod semper.
2.  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
3.  Maecenas sed diam eget risus varius blandit sit amet non magna.

Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.

## Set up Git

To use Git on the command line, you'll need to download, install, and configure Git on your computer.

If you want to work with Git locally, but don't want to use the command line, you can instead download and install the GitHub Desktop client. For more information, see "Getting started with GitHub Desktop."

## Create a repo

You can store a variety of projects in GitHub repositories, including open source projects. With open source projects, you can share code to make better, more reliable software.

## Commit your first change

A commit is like a snapshot of all the files in your project at a particular point in time.

When you created your new repository, you initialized it with a README file. README files are a great place to describe your project in more detail, or add some documentation such as how to install or use your project. The contents of your README file are automatically shown on the front page of your repository.

### Installation

| Hi    | There     | how | are       | you  |
| ----- | --------- | --- | --------- | ---- |
| doing | this      | is  | github    | and  |
| git   | tutorials | by  | dzcodeio  | your |
| open  | source    | dz  | community | .    |

Reason comes by default in [BuckleScript](https://bucklescript.github.io/), a compiler that turns Reason code into JavaScript code.

**Prerequisite**: either NPM (comes with [node](https://nodejs.org/en/)) or [Yarn](https://yarnpkg.com/en/).

To install BuckleScript & Reason globally:

```sh
yarn global add bs-platform
```

(or `npm install -g bs-platform` for npm).

## New Project

The global installation comes with a simple project generator. Try:

```sh
bsb -init my-new-project -theme basic-reason
```

To compile & run the project you just created:

```sh
cd my-new-project
yarn build # or npm run build, for npm
node src/Demo.bs.js
```

That uses BuckleScript to compile Reason to JavaScript, then uses NodeJS to run the JavaScript. Feel free to use the generated JS files in whichever way you'd like, as if they're hand-written by you.

During development, instead of running `npm run build` each time to compile, run `npm run start` to start a watcher that recompiles automatically after file changes.

By default, the `basic-reason` theme configures BuckleScript to output the generated JS files alongside the Reason files they were produced from. [There's a reason why this is helpful](https://bucklescript.github.io/docs/en/build-overview#tips-tricks). If you prefer to keep the generated files somewhere else, edit `bsconfig.json` to set `in-source` to `false`; the JS files will then be output to the `lib/js` directory instead.

Alternatively, **to start a [ReasonReact](https://reasonml.github.io/reason-react/docs/en/installation.html) app**, follow the instructions [here](https://reasonml.github.io/reason-react/docs/en/installation).

## Existing Project

You can install the toolchain locally to an existing project, through the familiar command:

```sh
yarn add --dev bs-platform
```

(or `npm install --save-dev bs-platform` for npm).

The rest is the same as above.
