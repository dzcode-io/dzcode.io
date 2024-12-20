# Web code

## Folder structure

The app is split main folders inside `./src`:

- `./components`: reusable React components
- `./pages`
- `./redux`: contains slices (reducers and actions), and async actions

then there are additional folders:

- `./utils`: misc code
- `./assets`: non-code files
- `_*` folders: boilerplate code

## State management

We use Redux Tool Kit, but only the "Redux" part, please check their docs.

## Run e2e locally

Make **sure** you already ran `npm run dev:all` at the root of the repo, then in a separate terminal run:

```sh
npm run e2e:dev
```

**Note:** if the readme is still unclear, please create a PR with your suggested changes/additions
