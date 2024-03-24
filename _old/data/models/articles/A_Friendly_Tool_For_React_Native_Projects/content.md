When I start developing in React Native I have noticed that there are many boilerplates (like creating components, redux implementation, navigations, … etc.) and some repeated things that you have to do in each project. It was then when I came with the idea of creating a command line tool that helps making the development process much faster and efficient.

# Table of Contents

1. [What is react-native-help-create?](#What-is-react-native-help-create?)
2. [How it was created?](#How-it-was-created?)
3. [How to install it?](#How-to-install-it?)
4. [How to use it?](#How-to-use-it?)
5. [Summary](#Summary)
6. [Creating Files](#Creating-Files)
   - [Components](#Creating-Components)
   - [Screens](#Creating-Screens)
   - [Navigations](#Creating-Navigations)
   - [Using templates](#Creating-files-using-Templates)
   - [Redux](#Creating-Redux)
   - - [Redux reducers](#Creating-Reducers)
   - - [Redux actions](#Creating-Actions)
   - [Using configuration](#Creating-Configuration)
7. [Deleting Files](#Deleting-Files)
   - [Components](#Deleting-Components)
   - [Screens](#Deleting-Screens)
   - [Navigations](#Deleting-Navigations)
   - [Redux](#Deleting-Redux)
   - - [Redux reducers](#Deleting-Reducers)
   - - [Redux actions](#Deleting-Actions)
   - [Configuration](#Deleting-Configuration)
8. [Combining Files](#Combining-Files)
   - [Components](#Combining-Components)
   - [Screens](#Combining-Screens)
9. [Notes](#Notes)
10. [Future work](#Future-work)

# What is react-native-help-create?

The simplest definition which describes this tool is a command line that can be ran on the root of a React Native project that is dedicated to help you create or delete components, screens, navigations and even redux implementation (in JavaScript and TypeScript) in very structured manner, and all of that is from executing one single line from your Shell.

# How it was created?

This tool was created with the help of [Node](https://nodejs.org/en/) and two other dependencies which are:

- [file-system](https://www.npmjs.com/package/file-system): This package was useful in creating files and folders and also in deleting them.

- [yargs](https://www.npmjs.com/package/yargs): This package was used to handle creating commands and options for the command line.

# How to install it?

As mentioned before, this tool is built with Node and in order to publish it I have used [Node Package Manager](https://www.npmjs.com/). So you can install it in your system by executing the following command on you Shell:

```sh
npm i react-native-help-create -g
```

Or

```sh
yarn global add react-native-help-create
```

This will install this tool globally in your system so you can run it every where. However, it detects if your at the root of a React Native project so it will not work in other places.

You can also install it inside your project as a dev dependency by executing:

```sh
npm i react-native-help-create --save-dev
```

Or

```sh
yarn add react-native-help-create --dev
```

To see the available commands you can run:

```sh
rnhc --help
```

If you want to use it without installing it (using npm cache) run:

```sh
npx react-native-help-create --help
```

You can follow this [link](https://www.npmjs.com/package/react-native-help-create) to see the npm page for this package.

# How to use it?

This command line have many commands to helps you with creating, deleting and combing your implementations for screens, components and redux.

The following commands are used as from version [2.3.1](https://github.com/Omar-Belghaouti/react-native-help-create/releases/tag/2.3.1).

# Summary

This command line help you create your React Native project in a easy and useful structure by creating components and screens in separate folders in order to distinguish between them. It also make it easier to create navigations for your screens without writing a single line of code.

The following project structure is used by this command:

```
src
├───components
│   ├───comp-one
│   │       index.jsx
│   │       styles.js
│   │
│   ├───comp-two
│   │       index.jsx
│   │       styles.js
│   │
│   └───folder
│       └───comp-three
│               index.jsx
│               styles.js
│
├───redux
│   │   index.js
│   │
│   ├───actions
│   │   └───general
│   │           index.js
│   │
│   └───reducers
│       │   index.js
│       │
│       └───general
│               index.js
│
└───screens
    │   navigation.jsx
    │
    ├───folder
    │   │   navigation.jsx
    │   │
    │   ├───screen-four
    │   │   │   index.jsx
    │   │   │   styles.js
    │   │   │
    │   │   └───functions
    │   │           index.js
    │   │
    │   └───screen-three
    │       │   index.jsx
    │       │   styles.js
    │       │
    │       └───functions
    │               index.js
    │
    ├───screen-one
    │   │   index.jsx
    │   │   styles.js
    │   │
    │   └───functions
    │           index.js
    │
    └───screen-two
        │   index.jsx
        │   styles.js
        │
        └───functions
                index.js
```

- As you can see above, the `src` folder is the folder that resides at the root of your React Native project and under this folder, you will find the `components` folder which contains all the shared components that are used through out the screen. The `screens` folder contains the app's screens that can uses some of the shared components above it.

- In each component you will find `index.jsx` that contains the components `JSX.Element` syntaxes, and `styles.js` that contains the styles for that component.

- In each screen you will find `index.jsx` that contains the `JSX.Element` syntaxes, and `styles.js` that contains the screen's styles and `functions` folder which will contain the screen's specific functions.

- Each screen can use one of the shared components that are defined in `components` folder, and you can pass the functions to those components hence there is not `functions` folder under a component subfolder.

- For the `screens` part you can find `navigation.jsx` files that shows the relation between the screens that resides in the same folder. For example, the `navigation.jsx` under the `screens` folder represent a stack navigation between `folder` and `screen-one` and `screen-two`. As for the `navigation.jsx` file under the `folder` folder is represent a drawer navigation between `screen-three` and `screen-four`.

- As for the `redux` folder you can see there is `index.js` which contain the redux store, and `actions` and `reducers` folders are next to it so you can find only things that are related to redux in one single place.

- This command line can write code in both JavaScript and TypeScript. By default it will use the used language for your React Native project and of course you can override the used language using one of its options.

# Creating Files

`rnhc` provide you more flexibility and easy to use approach to create your files and folders for your componets, screens navigations and redux implementation.

- By default `rnhc` create files with the project's language, so if the project is written in TypeScript all the created files will be in TypeScript, and the same applies for JavaScript.

- If you want to force the use of a specific language you can add the `--js` or `--ts` options at the end of your `create` commands.

- `rnhc` will not overwrite the existed implementation for all of the `create` commands.

- If you want to overwrite the existed implementation for a specific `create` command you can add the `--overwrite` or `-o` option at the end of the command.

The following points shows how to use the `create` command.

## Creating Components

1. To create your components simply run:

```sh
rnhc create -c <component-name>
```

- This will create a component named after the given name `<component-name>` under the `src/components/<component-name>/` folder.

### Example

```sh
rnhc create -c test-component
```

- This command will create the following directory `src/components/test-component/`:

```sh
src
└───components
    └───test-component
            index.jsx
            styles.js
```

- Where `index.jsx` represents the React FC component that contains the following:

```jsx
import React from "react";
import { Text, View } from "react-native";
import { TestComponentStyles } from "./styles";

export const TestComponent = () => {
  return (
    <View>
      <Text>TestComponent component created!</Text>
    </View>
  );
};
```

- And for the `styles.js` you will see:

```js
import { StyleSheet } from "react-native";

export const TestComponentStyles = StyleSheet.create({});
```

2. To create multiple components simply run:

```sh
rnhc create -c <component-name-1> <component-name-2> ...
```

- This will create multiple components for the given names under the `src/components/` folder.

### Exmaple

```sh
rnhc create -c comp-1 comp-2
```

- This command will create under the `src/components/` folder the following:

```sh
src
└───components
    ├───comp-1
    │       index.jsx
    │       styles.js
    │
    └───comp-2
            index.jsx
            styles.js
```

3. To create one or mutliple components in a specified path that resides under the `src/components/` folder, simply run:

```sh
rnhc create -c <component-name-1> <component-name-2> ... -f <folder-path>
```

- This will create your components under the `src/components/<folder-path>/` folder.

### Example

```sh
rnhc create -c comp-1 comp-2 -f foo/bar
```

- This command will create under the `src/components/` folder the following:

```sh
src
└───components
    └───foo
        └───bar
            ├───comp-1
            │       index.jsx
            │       styles.js
            │
            └───comp-2
                    index.jsx
                    styles.js
```

## Creating Screens

1. To create your screen simply run:

```sh
rnhc create -s <screen-name>
```

- This will create a screen after the given name `screen-name` under the `src/screens/` folder.

### Example

```sh
rnhc create -s test-screen
```

- This will create the following:

```sh
src
└───screens
    └───test-screen
        │   index.jsx
        │   styles.js
        │
        └───functions
                index.js
```

- Where `index.jsx` represent the screen which is nothing but a React FC component that contains the following:

```jsx
import React from "react";
import { Text, View } from "react-native";

import {} from "./functions";
import { TestScreenStyles } from "./styles";

export const TestScreenScreen = () => {
  return (
    <View>
      <Text>TestScreen screen created!</Text>
    </View>
  );
};
```

- As for `styles.js` you will find:

```js
import { StyleSheet } from "react-native";

export const TestScreenStyles = StyleSheet.create({});
```

- And under the `functions` folder you should write your screen's functions and export them in `function/index.js` file, which by default it will contain the following:

```js
// write your TestScreen screen functions here
```

2. To create multiple screens simply run:

```sh
rnhc create -s <screen-name-1> <screen-name-2> ...
```

- This will create multiple screens under the `src/screens/` folder.

### Example

```sh
rnhc create -s screen-1 screen-2
```

- This will create the following:

```sh
src
└───screens
    ├───screen-1
    │   │   index.jsx
    │   │   styles.js
    │   │
    │   └───functions
    │           index.js
    │
    └───screen-2
        │   index.jsx
        │   styles.js
        │
        └───functions
                index.js
```

3. To create one or multiple screens in a specific path that resides under `src/screens/` folder, simply run:

```sh
rnhc create -s <screen-name-1> <screen-name-2> ... -f <folder-path>
```

- This will create your screens under the `src/screens/<folder-path>` folder.

### Example

```sh
rnhc create -s screen-1 screen-2 -f foo/bar
```

- This will create the following:

```sh
src
└───screens
    └───foo
        └───bar
            ├───screen-1
            │   │   index.jsx
            │   │   styles.js
            │   │
            │   └───functions
            │           index.js
            │
            └───screen-2
                │   index.jsx
                │   styles.js
                │
                └───functions
                        index.js
```

## Creating Navigations

Navigations are the relations between chosen screens, those relations can be stack navigation, drawer navigation or tab navigation.

1. To create a navigation between two or more screens, simply run:

```sh
rnhc create -n <navigation-type> <screen-name-1> <screen-name-2> ...
```

- The `<navigation-type>` can be either of these types: `stack` or `drawer` or `tab`.

- The number of given screens should be 2 or more.

- If one of the screens does not exist, `rnhc` will try to create the `navigation.jsx` file that resides next to the existed screens.

- If all screens does not exist, `rhnc` will prompt you the following:

```sh
None of these screens exist
```

### Example

```sh
rnhc create -n stack screen-1 screen-2
```

- This will create a `navigation.jsx` file next to `screen-1` and `screen-2` screens as the following:

```sh
src
└───screens
    │   navigation.jsx
    │
    ├───screen-1
    │   │   index.jsx
    │   │   styles.js
    │   │
    │   └───functions
    │           index.js
    │
    └───screen-2
        │   index.jsx
        │   styles.js
        │
        └───functions
                index.js
```

- The content for the `navigation.jsx` file is as the following:

```jsx
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();

import { Screen1Screen } from "./screen-1";
import { Screen2Screen } from "./screen-2";

export const Navigation = () => {
  return (
    <Navigator>
      <Screen name="screen-1" component={Screen1Screen} />
      <Screen name="screen-2" component={Screen2Screen} />
    </Navigator>
  );
};
```

2. To create a navigation file for screens that resides in a specific path under the `src/screens/` folder, you can run this:

```sh
rnhc create -n <navigation-type> <screen-name-1> <screen-name-2> ... -f <folder-path>
```

- This will create the `navigation.jsx` file under the `src/screens/<folder-path>/` folder for the screens that resides in the same location.

### Example

```sh
rhnc create -n drawer screen-1 screen-2 -f foo/bar
```

- This will create `navigation.jsx` file under `src/screens/foo/bar/` folder which contains the following:

```jsx
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
const { Navigator, Screen } = createDrawerNavigator();

import { Screen1Screen } from "./screen-1";
import { Screen2Screen } from "./screen-2";

export const Navigation = () => {
  return (
    <Navigator>
      <Screen name="screen-1" component={Screen1Screen} />
      <Screen name="screen-2" component={Screen2Screen} />
    </Navigator>
  );
};
```

3. To create a navigation that depends on another navigation you can run the same command as this:

```sh
rnhc create -n <navigation-type> <screen-name-1> <screen-name-2> ... <another-navigation-folder>
```

- This will create `navigation.jsx` file that resides in the same location for the given inputs.

### Example

In this example, we have the following structure:

```sh
src
└───screens
    ├───folder
    │   │   navigation.jsx
    │   │
    │   ├───screen-one
    │   │   │   index.jsx
    │   │   │   styles.js
    │   │   │
    │   │   └───functions
    │   │           index.js
    │   │
    │   └───screen-two
    │       │   index.jsx
    │       │   styles.js
    │       │
    │       └───functions
    │               index.js
    │
    └───screen-three
        │   index.jsx
        │   styles.js
        │
        └───functions
                index.js
```

Where we have a drawer navigation between `screen-one` and `screen-two` under the `folder` folder. And we want to create a stack navigation between `folder` and `screen-three`. And to show that `rnhc` will continue to run for the existed screens we added in the command line `screen-four` which does not exist as the following:

```sh
rnhc create -n stack folder screen-three screen-four
```

- The command will output the following:

```sh
src/screens/screen-four/ does not exist
src/screens/navigation.jsx created
```

- And it will add a new `navigation.jsx` that resides between `folder` and `screen-three` as the following:

```sh
src
└───screens
    │   navigation.jsx
    │
    ├───folder
    │   │   navigation.jsx
    │   │
    │   ├───screen-one
    │   │   │   index.jsx
    │   │   │   styles.js
    │   │   │
    │   │   └───functions
    │   │           index.js
    │   │
    │   └───screen-two
    │       │   index.jsx
    │       │   styles.js
    │       │
    │       └───functions
    │               index.js
    │
    └───screen-three
        │   index.jsx
        │   styles.js
        │
        └───functions
                index.js
```

- And the content of the new `navigation.jsx` file will be like this:

```jsx
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();

import { Navigation as Folder } from "./folder/navigation";
import { ScreenThreeScreen } from "./screen-three";

export const Navigation = () => {
  return (
    <Navigator>
      <Screen name="folder" component={Folder} />
      <Screen name="screen-three" component={ScreenThreeScreen} />
    </Navigator>
  );
};
```

4. To create a navigation file for multiple screens that resides at the root of the `src/screens/` folder, you can run this:

```sh
rnhc create -n <navigation-type>
```

- This will create the navigation file for all existed screens in the `src/screens/` folder.

You can also run this command to create a navigation file for multiple screens that resides in a specific path under the `src/screens/` folder:

```sh
rnhc create -n <navigation-type> -f <folder-path>
```

- This will create the navigation file for all existed screens in the `src/screens/<folder-path>/` folder.

- This also work for the nested navigations.

- All the sub folders should contain the navigation files so it can be added to the navigation file you want to create, for example take this structure:

```sh
src
└───screens
    │   navigation.jsx
    │
    ├───folder
    │   │
    │   ├───screen-one
    │   │   │   index.jsx
    │   │   │   styles.js
    │   │   │
    │   │   └───functions
    │   │           index.js
    │   │
    │   └───screen-two
    │       │   index.jsx
    │       │   styles.js
    │       │
    │       └───functions
    │               index.js
    │
    ├───screen-three
    │   │   index.jsx
    │   │   styles.js
    │   │
    │   └───functions
    │           index.js
    │
    └───screen-four
        │   index.jsx
        │   styles.js
        │
        └───functions
                index.js
```

When you try to create a navigation like this:

```sh
rnhc create -n stack
```

It will contain only `screen-three` and `screen-four` because the `src/screens/folder` does not contain a navigation file.

So if you want to create a navigation file for all existed screens in the `src/screens/` folder, you must take in consideration that all subfolders must contain a navigation file first and then you can either update the navigation file or create a new one.

By updating it means overwriting in other words, so you can just do this:

```sh
rnhc create -n stack -o
```

## Creating files using Templates

You can create your screens and components with your defined templates by following these steps:

1. First thing to do is to create a `.template` folder at the root of your react project.

2. Inside the `.template` folder you can add your template, for example `componentWithUseEffect.tsx` (the file extension doesn't matter so it could be `*.jsx`, `*.js` or `*.tsx`):

```jsx
import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function __COMPONENT__() {
  useEffect(() => {}, []);

  return (
    <View>
      <Text>Hello, World!</Text>
    </View>
  );
}
```

- There is a restriction in naming these templates which is you should not put dots (`.`) between the name, like this (`component.WithUseEffect.jsx`). It should only contain one dot that makes the extension file like we're doing above.

- You should type `__COMPONENT__` in the template file and it will be replaced with the component name you want to create.

3. After creating your template you can use them to create components or screens as the following:

```sh
rnhc create -c <component-name> -t <template-name>
```

```sh
rnhc create -s <screen-name> -t <template-name>
```

- And of course, you can create multiple components or screens with the same template.

### Example

As for our example it can be used like this for the above template:

```sh
rnhc create -c comp -t componentWithUseEffect
```

- This will create `comp` component under `src/components/` folder and the `index.jsx` for this component will contain the same code written in the template.

- For the screen case, the `index.jsx` for that screen will contain the code written in the template.

## Creating Redux

- To create a redux implementation run:

```sh
rnhc create -r
```

- This will create a `redux` folder under the `src/` folder containing the following:

```sh
src
└───redux
    │   index.js
    │
    ├───actions
    │   └───general
    │           index.js
    │
    └───reducers
        │   index.js
        │
        └───general
                index.js
```

- Where `index.js` under the `redux` folder contains the redux store definition:

```js
import { applyMiddleware, compose, createStore } from "redux";
import { mainReducer } from "./reducers";

/**
 * the main redux state, with all the reducers
 */
export const mainStore = createStore(mainReducer, compose(applyMiddleware(thunk)));

/**
 * Creates a new redux state each time this function is called, this is used only for unit tests, to ensure that we have fresh state on each individual test
 */
export const createMainStore = () => {
  return createStore(mainReducer, compose(applyMiddleware(thunk)));
};
```

- And `actions` folder contains the action for each reducer, as for a example, at first `rnhc` will create a sample reducer and action which is called `general`.

- The `general` action's `index.js` contains:

```js
// write your general actions here

// this is an example for an action
export const init = () => async (dispatch, getState) => {
  dispatch({ type: "UPDATE_GENERAL", payload: { message: "init created!" } });
};
```

- And the `general` reducer's `index.js` contains:

```js
const initialState = { message: "" };

export const general = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_GENERAL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
```

- And the `index.js` file under the `reducers` folder contains the following:

```js
import { combineReducers } from "redux";
import { general } from "./general";

export const mainReducer = combineReducers({
  general,
});
```

- In TypeScript, the files will be written as the following:

`redux/index.ts`

```ts
import { applyMiddleware, compose, createStore } from "redux";
import { mainReducer } from "./reducers";

/**
 * the main redux state, with all the reducers
 */
export const mainStore = createStore(mainReducer, compose(applyMiddleware(thunk)));

export type StateInterface = ReturnType<typeof mainStore.getState>;

/**
 * list of action types
 */
export type ActionType = "UPDATE_GENERAL";

export interface Action<T> {
  type: ActionType;
  payload: Partial<T>;
}

export type ThunkResult<A = Record<string, unknown>, E = Record<string, unknown>> = ThunkAction<
  void,
  StateInterface,
  E,
  Action<A>
>;

export type Dispatch<A> = ThunkDispatch<StateInterface, Record<string, unknown>, Action<A>>;
```

`redux/actions/general/index.ts`

```ts
import { GeneralState } from "../../reducers/general";
import { ThunkResult } from "../..";

// write your general actions here

// this is an example for an action
export const init = (): ThunkResult<GeneralState> => async (dispatch, getState) => {
  dispatch({ type: "UPDATE_GENERAL", payload: { message: "init created!" } });
};
```

`redux/reducers/general/index.ts`

```ts
import { Action } from "../..";

export interface GeneralState {
  message: string;
}

export const general = (
  state: GeneralState = {
    message: "",
  },
  action: Action<GeneralState>,
) => {
  switch (action.type) {
    case "UPDATE_GENERAL":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
```

`redux/reducers/index.ts`

```ts
import { combineReducers } from "redux";
import { general } from "./general";

export const mainReducer = combineReducers({
  general,
});
```

- ### Creating Reducers

1 - To create a reducer, you must have a redux implementation then run:

```sh
rnhc create --reducer <reducer-name>
```

### Example

```sh
rnhc create --reducer auth
```

- This will create a `auth` reducer under the `src/redux/reducers/` folder and the `index.js` for this reducer will contain the same code written in the template.

`src/redux/reducers/auth/index.js`

```js
const initialState = {};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

- It will also add the reducer to the `index.js` file under the `reducers` folder to use it in the `combineReducers` function.

`src/redux/reducers/index.js`

```js
import { combineReducers } from "redux";
import { auth } from "./auth";
import { general } from "./general";

export const mainReducer = combineReducers({
  auth,
  general,
});
```

- If you don't have a redux implementation create using `rnhc create -r`, this command will prompt:

```sh
Redux implementation does not exist
```

- You can also overwrite the reducer by running:

```sh
rnhc create --reducer <reducer-name> -o
```

2 - To create multiple reducers, you must have a redux implementation then run:

```sh
rnhc create --reducer <reducer-name-1> <reducer-name-2> ...
```

- This will also update your `index.js` file under the `reducers` folder to use the reducers you created.

- ### Creating Actions

- To create an action, you must have a redux implementation as wee as the reducer you want to add an action for it, then run:

```sh
rnhc create --action <reducer-name> <action-name>
```

### Example

- In this example we are going to create an action for the `auth` reducer, so we will run:

```sh
rnhc create --action auth login
```

- This will create a `login` action under the `src/redux/actions/auth/` folder and the `login.js` for this action will contain the same code written in the template.

`src/redux/actions/auth/login.js`

```js
export const loginAction = () => async (dispatch, getState) => {
  dispatch({ type: "AUTH_LOGIN", payload: {} });
};
```

- And it will update the `index.js` file under `src/redux/actions/auth/` to export the action.

`src/redux/actions/auth/index.js`

```js
export { loginAction } from "./login";
```

2 - To create multiple actions, you must have a redux implementation and existed reducer, then run:

```sh
rnhc create --action <reducer-name> <action-name-1> <action-name-2> ...
```

- If the reducer doesn't exist, you will get an error like this:

```sh
./src/redux/reducers/x does not exist
```

- Keep in mind that this also works for TypeScript projects. Even better when creating an action for a reducer in TypeScript, you will get TypeScript support as well as updating the `ActionType` in the `src/redux/index.ts` file. For example if you create an action for the `auth` reducer, you will get the following:

`src/redux/index.ts`

```ts
import { applyMiddleware, compose, createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import { mainReducer } from "./reducers";

/**
 * the main redux state, with all the reducers
 */
export const mainStore = createStore(mainReducer, compose(applyMiddleware(thunk)));

/**
 * Creates a new redux state each time this function is called, this is used only for unit tests, to ensure that we have fresh state on each individual test
 */
export const createMainStore = () => {
  return createStore(mainReducer, compose(applyMiddleware(thunk)));
};

export type StateInterface = ReturnType<typeof mainStore.getState>;

/**
 * list of action types
 */
export type ActionType = "AUTH_LOGIN" | "UPDATE_GENERAL";

export interface Action<T> {
  type: ActionType;
  payload: Partial<T>;
}
export type ThunkResult<A = Record<string, unknown>, E = Record<string, unknown>> = ThunkAction<
  void,
  StateInterface,
  E,
  Action<A>
>;

export type Dispatch<A> = ThunkDispatch<StateInterface, Record<string, unknown>, Action<A>>;
```

- It will also update the necessary files that imports and exports modules in order to use the action in the reducer.

- Also another note, if you prefer not using `redux-thunk` you can set that in `rnhc.config.json` file, this will let you create your store and actions without applying the `redux-thunk` middleware (For more details check [configuration section](#Creating-Configuration)).

## Creating Configuration

With the above steps, you can now create a configuration file which will be used by `rnhc` to create your files with your custom config.

- To create a default configuration file run:

```sh
rnhc create --config
```

- This will create a `rnhc.config.json` file at the root of your project. The file will contain the following:

```json
{
  "withStyles": true,
  "withFunctions": true,
  "withProps": true,
  "defaultExports": true,
  "componentsRoot": "./src/components",
  "screensRoot": "./src/screens",
  "reduxRoot": "./src/redux",
  "applyReduxThunk": true
}
```

1. `withStyles`: if true, create `styles.js` (or `styles.ts`) file for components and pages, if false, don't create `styles.js` (or `styles.ts`) file, default is true.
2. `withFunctions`: if true, create `functions` folder for pages, if false, don't create `functions` folder, default is true.
3. `withProps`: if true, create props `interface` for components and pages (in TS only), if false, don't create props `interface`, default is true.
4. `defaultExports`: if true, create default export for components and pages, if false, create named export for components and pages, default is true.
5. `componentsRoot`: the root folder for components, default is `./src/components`.
6. `screensRoot`: the root folder for screens, default is `./src/screens`.
7. `reduxRoot`: the root folder for redux, default is `./src/redux`.
8. `applyReduxThunk`: if true, apply `redux-thunk` middleware to the store, if false, don't apply `redux-thunk` middleware, default is true.

- If no configuration file is found or you don't specify some of the configuration, the default configuration will be used.

# Deleting Files

With `rnhc` you can delete what you already created with [`create` commands](#creating-files).

The following points shows how to deal with deleting your files with the `delete` command.

## Deleting Components

1. To delete a component simply run:

```sh
rnhc delete -c <component-name>
```

- This will delete the component with the given name `<component-name>` under the `src/components/` folder.

- If the component does not exist, `rnhc` will prompt the following:

```sh
src/components/<component-name>/ does not exist
```

2. To delete multiple components run:

```sh
rnhc delete -c <component-name-1> <component-name-2> ...
```

- This will delete only the existed components with the given inputs that resides under the `src/components/` folder.

3. To delete one or multiple components that resides in a specific path under the `src/components/` folder, you can run:

```sh
rnhc delete -c <component-name-1> <component-name-2> ... -f <folder-path>
```

- This will delete only the existed components with the given inputs that resides under the `src/components/<folder-path>/` folder.

## Deleting Screens

1. To delete a screen simply run:

```sh
rnhc delete -s <screen-name>
```

- This will delete the screen with the given name `<screen-name>` under the `src/screens/` folder.

- If the screen does not exist, `rnhc` will prompt the following:

```sh
src/screens/<screen-name>/ does not exist
```

2. To delete multiple screens run:

```sh
rnhc delete -s <screen-name-1> <screen-name-2> ...
```

- This will delete only the existed screens with the given inputs that resides under the `src/screens/` folder.

3. To delete one or multiple screens that resides in a specific path under the `src/screens/` folder, you can run:

```sh
rnhc delete -s <screen-name-1> <screen-name-2> ... -f <folder-path>
```

- This will delete only the existed screens with the given inputs that resides under the `src/screens/<folder-path>/` folder.

## Deleting Navigations

1. To delete a navigation file that resides in `src/screens/` folder simply run:

```sh
rnhc delete -n
```

- This will delete the navigation file if it exists, if not `rnhc` will prompt the following:

```sh
It seems there is no navigation file in src/screens/
```

2. To delete a navigation file that resides in a specific path that resides under `src/screens/` folder you can run:

```sh
rnhc delete -n -f <folder-path>
```

- This will delete the navigation file if it does exist under the `src/screens/<folder-path>/` folder.

## Deleting Redux

- To delete a redux implementation run:

```sh
rnhc delete -r
```

- This will delete the `redux` folder under `src/` with all of its files and subfolders.

- If `redux` does not exist, `rnhc` will prompt:

```sh
src/redux/ does not exist
```

- ### Deleting Reducers

1 - To delete a reducer run:

```sh
rnhc delete --reducer <reducer-name>
```

- This will delete the existed reducer under `src/redux/reducer/` folder, if not `rnhc` will prompt the following:

```sh
./src/redux/reducers/<reducer-name>/ does not exist
```

- It will also update the `index.js` file under `src/redux/reducer/` folder to remove it from the import list as well as from the `combineReducers` function.

2 - You can even delete multiple reducers at once:

```sh
rnhc delete --reducer <reducer-name-1> <reducer-name-2> ...
```

3 - To delete all reducers run:

```sh
rnhc delete --reducer
```

- ### Deleting Actions

1 - To delete an action run:

```sh
rnhc delete --action <reducer-name> <action-name>
```

- If the reducer does not exist, `rnhc` will prompt the following:

```sh
./src/redux/actions/<reducer-name>/ does not exist
```

- It will also update the necessary files to remove the action from the reducer. And in case of TypeScript projects it will remove the action type in the `src/redux/index.ts`.

2 - You can even delete multiple actions for a specific reducer at once:

```sh
rnhc delete --action <reducer-name> <action-name-1> <action-name-2> ...
```

3 - To delete all actions for a specific reducer run:

```sh
rnhc delete --action <reducer-name>
```

## Deleting Configuration

- To delete a configuration file run:

```sh
rnhc delete --config
```

- This will delete the `rnhc.config.json` file at the root of the project.

- If `rnhc.config.json` does not exist, `rnhc` will prompt:

```sh
rnhc.config.json does not exist
```

# Combining Files

With `rnhc` you can combine your components or screens in a specific path.

The following points shows how to user the `combine` command.

## Combining Components

- To combine components that resides in `src/components/` folder to a specific path that resides under that same folder you can run:

```sh
rnhc combine -c <component-name-1> <component-name-2> ... -f <folder-path>
```

- This will move the existed components for the given inputs to `src/components/<folder-path>/` folder.

- If somehow one of the given components does not exist, `rnhc` will prompt:

```sh
Check if all of these components exist
```

### Example

In this example, we have `comp-1` and `comp-2` that exists under `src/components/` folder, and we want to move them to `src/components/foo/bar/` folder:

```sh
rnhc combine -c comp-1 comp-2 -f foo/bar
```

- The command will outputs the following:

```sh
comp-1 component moved to src/components/foo/bar/
comp-2 component moved to src/components/foo/bar/
```

## Combining Screens

- To combine screens that resides in `src/screens/` folder to a specific path that resides under that same folder you can run:

```sh
rnhc combine -s <screen-name-1> <screen-name-2> ... -f <folder-path>
```

- This will move the existed screens for the given inputs to `src/screens/<folder-path>/` folder.

- If somehow one of the given screens does not exist, `rnhc` will prompt:

```sh
Check if all of these screens exist
```

### Example

In this example, we have `screen-1` and `screen-2` that exists under `src/screens/` folder, and we want to move them to `src/screens/foo/bar/` folder:

```sh
rnhc combine -s screen-1 screen-2 -f foo/bar
```

- The command will outputs the following:

```sh
screen-1 screen moved to src/screens/foo/bar/
screen-2 screen moved to src/screens/foo/bar/
```

# Notes

- To see the available commands for `rnhc` you can run:

```sh
rnhc --help
```

- To see the available positionals and options for a specific command like `create` you can run:

```sh
rnhc create --help
```

- In order to `rnhc` to work, you must be at the root of your React Native project. It will check and if somehow you are not at the root of the project, `rnhc` will prompt:

```
You don't seem to be at the root of a react native project
```

- In `create` command, `rnhc` will create files with the project's used language, so if the project is written with TypeScript, it will write files with TypeScript, the same apply for JavaScript.

- If you want to create files with a specific language you can add `--js` or `--ts` options at the end of your `create` command, like this for example:

```sh
rnhc create -s test-screen --ts
```

- It is advisable to give the components, screens, reducers and actions with this case `some-name`, for example:

```sh
rnhc create -s world-to-react
```

- You can always overwrite your implementation using the `--overwrite` or `-o` option, for example:

```sh
rnhc create -c test-component -o
```

```sh
rnhc create -s test-screen -o
```

```sh
rnhc create -r -o
```

```sh
rnhc create --reducer test-reducer -o
```

```sh
rnhc create --action test-reducer test-action -o
```

- This is helpful when you want to update your navigation files, for example you already have a navigation file in `src/screens/` folder and you want to update it with the new screens you created:

```sh
rnhc create -n stack --overwrite
```

- When creating reducers you should have already a redux implmentation created with `rnhc create -r` so it can work.

- When creating actions, you should have already a redux implementation created with `rnhc create -r` as well as an existed reducer with `rnhc create --reducer <reducer-name>` so it can create actions for that specific reducer.

- Creating and deleting reducers and actions will not just delete files, but also update other files that depends on them under the `src/redux/` folder (Or your specified path for the root of redux folder in `rnhc.config.json`).

# Future work

This tool is a working progress and it will be always updated to give you even more help for your development process for your React Native projects.

In each new version this article will be updated so you can learn for the new things that you can do with this tool and hopefully it will provide you what you need.
