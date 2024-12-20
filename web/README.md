# Web code

## Folder structure

The app is split into main folders inside `./src`:

- `./components`: reusable React components
- `./pages`
- `./redux`: contains slices (reducers and actions), and async actions

Then there are additional folders:

- `./utils`: miscellaneous code
- `./assets`: non-code files
- `_*` folders: boilerplate code

## State management

We use Redux Toolkit, but only the "Redux" part. Please check their documentation.

## Run e2e locally

Make **sure** you have already run `npm run dev:all` at the root of the repo, then in a separate terminal run:

```sh
npm run e2e:dev
```

**Note:** If the README is still unclear, please create a PR with your suggested changes/additions.
