# dzcode.io/mobile

The code for the mobile version of [dzcode.io](https://dzcode.io).

## Get Started

To get started you may check out the [README.md](../README.md#get-started) file.

## Helpful Scripts

- The following scripts are helpful to create files following the project structure.

- You must be in the mobile directory to run these scripts.

- The `<path>` is the path to the file you want to create (e.g. `foo/bar`).

- The `<navigation-type>` can be either one of the following: `stack`, `drawer` or `tab`.

- If one of the implementation already exists, it will not be overwritten by default. You can use the `--overwrite` flag to overwrite the file (this helpful when updating the navigation files).

### Create Components

1. To create a component:

```sh
yarn create:component <name>
```

2. To create multiple components:

```sh
yarn create:component <name-1> <name-2> ...
```

3. To create a component with a specific template (more details can be found [here](https://omar-belghaouti.github.io/react-native-help-create/docs/create/using-templates)):

```sh
yarn create:component <name> --template <template>
```

4. To create a component or multiple components in a specific path under the `./src/components/` directory:

```sh
yarn create:component <name-1> <name-2> ... --folder <path>
```

### Create Screens

1. To create a screen:

```sh
yarn create:screen <name>
```

2. To create multiple screens:

```sh
yarn create:screen <name-1> <name-2> ...
```

3. To create a screen with a specific template (more details can be found [here](https://omar-belghaouti.github.io/react-native-help-create/docs/create/using-templates)):

```sh
yarn create:screen <name> --template <template>
```

4. To create a screen or multiple screens in a specific path under the `./src/screens/` directory:

```sh
yarn create:screen <name-1> <name-2> ... --folder <path>
```

### Create Navigations

1. To create a navigation for the screens that resides in `./src/screens/` directory:

```sh
yarn create:navigation:<navigation-type>
```

2. To create a navigation for the screens that resides in a specific path under the `./src/screens/` directory:

```sh
yarn create:navigation:<navigation-type> --folder <path>
```

### Delete Components

1. To delete a component:

```sh
yarn delete:component <name>
```

2. To delete multiple components:

```sh
yarn delete:component <name-1> <name-2> ...
```

3. To delete a component or multiple components in a specific path under the `./src/components/` directory:

```sh
yarn delete:component <name-1> <name-2> ... --folder <path>
```

### Delete Screens

1. To delete a screen:

```sh
yarn delete:screen <name>
```

2. To delete multiple screens:

```sh
yarn delete:screen <name-1> <name-2> ...
```

3. To delete a screen or multiple screens in a specific path under the `./src/screens/` directory:

```sh
yarn delete:screen <name-1> <name-2> ... --folder <path>
```

### Delete Navigations

1. To delete a navigation for the screens that resides in `./src/screens/` directory:

```sh
yarn delete:navigation
```

2. To delete a navigation for the screens that resides in a specific path under the `./src/screens/` directory:

```sh
yarn delete:navigation --folder <path>
```

### Combine Components

- To combine components into a specific path under the `./src/components/` directory:

```sh
yarn combine:components <name-1> <name-2> ... --folder <path>
```

### Combine Screens

- To combine screens into a specific path under the `./src/screens/` directory:

```sh
yarn combine:screens <name-1> <name-2> ... --folder <path>
```
