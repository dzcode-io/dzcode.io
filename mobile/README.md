# dzcode.io/mobile

The code for the mobile version of [dzcode.io](https://dzcode.io).

## Get Started

To get started you may check out the [README.md](../README.md#get-started) file.

## Helpful Scripts

- The following scripts are helpful to create files following the project structure.

- You must be in the mobile directory to run these scripts.

- In each of these scripts, the `<name>` is the name of the file you want to create which should use the kebab case naming convention (e.g. `test-one`).

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

3. To create a component with a specific template (more details can be found [here](https://omar-belghaouti.github.io/react-native-help-create/CREATING_FILES.html#templates)):

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

3. To create a screen with a specific template (more details can be found [here](https://omar-belghaouti.github.io/react-native-help-create/CREATING_FILES.html#templates)):

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

### Create Reducers

1. To create a reducer:

```sh
yarn create:reducer <name>
```

2. To create multiple reducers:

```sh
yarn create:reducer <name-1> <name-2> ...
```

### Create Actions

1. To create an action for an existing reducer:

```sh
yarn create:action <reducer-name> <name>
```

2. To create multiple actions for an existing reducer:

```sh
yarn create:action <reducer-name> <name-1> <name-2> ...
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

### Delete Reducers

1. To delete a reducer:

```sh
yarn delete:reducer <name>
```

2. To delete multiple reducers:

```sh
yarn delete:reducer <name-1> <name-2> ...
```

### Delete Actions

1. To delete an action for an existing reducer:

```sh
yarn delete:action <reducer-name> <name>
```

2. To delete multiple actions for an existing reducer:

```sh
yarn delete:action <reducer-name> <name-1> <name-2> ...
```
