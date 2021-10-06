When I start developing in React Native I have noticed that there are many boilerplates (like creating components, redux implementation, navigations, … etc.) and some repeated things that you have to do in each project. It was then when I came with the idea of creating a command line tool that helps making the development process much faster and efficient.

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

You can follow this [link](https://www.npmjs.com/package/react-native-help-create) to see the npm page for this package.

# How to use it?

This command line have many commands to helps you with creating, deleting and combing your implementations for screens, components and redux.

The following commands are used as from version [1.0.5](https://github.com/Omar-Belghaouti/react-native-help-create/releases/tag/1.0.5).

- Creating files

To see the available commands and options run:

```sh
rnhc create --help
```

To create a component run:

```sh
rnhc create -c <component_name>
```

To create a screen run:

```sh
rnhc create -s <screen_name>
```

To create a redux implementation run:

```sh
rnhc create -r <redux_folder_name>
```

You can also create multiple components and screens in one line:

```sh
rnhc create -c <component_name_1> <component_name_2> ...
rnhc create -s <screen_name_1> <screen_name_2> ...
```

Sometimes you need to create components or screens in a specific folder to give even more flexibility to structure your project as you want. In order to do that you can run the following:

```sh
rnhc create -c <component_name_1> <component_name_2> ... -f <folder_name>
rnhc create -s <screen_name_1> <screen_name_2> ... -f <folder_name>
```

In order to create react navigations for specified screens you can easily do it by running:

```sh
rnhc create -n <type_of_navigation> <screen_name_1> <screen_name_2> ...
```

`<type_of_navigation>` takes one of these options: `stack`, `drawer` or `tab`. So for example if you want to create a drawer navigation for `screen1` and `screen2` that are located in `./app/screens/` you can type:

```sh
rnhc create -n drawer screen1 screen2
```

This will create `Navigation.js` file at `./app/screens/` which will be like this:

```js
// import react
import React from "react";
// import drawer navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
// import screens
import screen1Screen from "./screen1/ui/screen1UI";
import screen2Screen from "./screen2/ui/screen2UI";
// create drawer navigator
const { Navigator, Screen } = createDrawerNavigator();
// export drawer navigation
export default function Navigation() {
  return (
    <Navigator>
      <Screen name="screen1Screen" component={screen1Screen} />
      <Screen name="screen2Screen" component={screen2Screen} />
    </Navigator>
  );
}
```

If for some reason one of the screens doesn’t exist `rnhc` will try to create the `Navigation.js` file for the existed screens, like this case where `screen3` does not exist:

```sh
rnhc create -n drawer screen1 screen2 screen3
```

The output of the command will be:

```sh
app/screens/screen3/ does not exists
app/screens/Navigation.js created
```

Also, if for some reason none of the provided screens does not exist in that path, `rnhc` will not create the `Navigation.js` file and it will outputs:

```sh
app/screens/screen3/ does not exists
app/screens/screen4/ does not exists
None of these screens exists
```

If the screens are located in a specified folder which is under the `./app/screens/` folder, let’s say for example `./app/screens/path/to/foo/` you can specify the `-f` or `--folder` option like this:

```sh
rnhc create -n stack screen1 screen2 -f path/to/foo
```

This will creates `Navigation.js` file under the path `./app/screens/path/to/foo/` and as always `rnhc` will check the existence of these screens.

By default `rnhc` will create files in _JavaScript_, so if you want to create in _TypeScript_ you just need to add `--ts` option in all of create commands. The following example shows how to create a component in _TypeScript_:

```sh
rnhc create -c Foo --ts
```

Also `rnhc` will check if those implementations are already exists so it will not overwrite what you have already implemented.

- Deleting files

To see the available commands and options run:

```sh
rnhc delete --help
```

In deleting files you don’t have to specify the language option (like `--js`).

To delete a component run:

```sh
rnhc delete -c <component_name>
```

To delete a screen run:

```sh
rnhc delete -s <screen_name>
```

To delete a redux implementation run:

```sh
rnhc delete -r <redux_folder_name>
```

You can also delete multiple components and screens in one line:

```sh
rnhc delete -c <component_name_1> <component_name_2> ...
rnhc delete -s <screen_name_1> <screen_name_2> ...
```

If you want to delete some components or screens that were created in a specific folder you can do that by running the following command:

```sh
rnhc delete -c <component_name_1> <component_name_2> ... -f <folder_name>
rnhc delete -s <screen_name_1> <screen_name_2> ... -f <folder_name>
```

And if you want to delete an entire folder that combines components or screens run:

```sh
rnhc delete -c -f <folder_name>
rnhc delete -s -f <folder_name>
```

To delete a `Navigation.js` file that is located under `./app/screens/` just type:

```sh
rnhc delete -n
```

To delete a `Navigation.js` file that is located in a specific path let’s say `./app/screens/path/to/foo/` just type:

```sh
rnhc delete -n -f path/to/foo
```

Keep in mind that `rnhc` will always check if these implementations are already existed and it will also prompt you if a specific component for example does not exist. It will only delete the available implementations.

- Combining files

To see the available commands and options run:

```sh
rnhc combine --help
```

In combining files you don’t need to specify the language option too.

To combine specific components in a folder run:

```sh
rnhc combine -c <component_name_1> <component_name_2> ... -f <folder_name>
```

To combine specific screens in a folder run:

```sh
rnhc combine -s <screen_name_1> <screen_name_2> ... -f <folder_name>
```

# Future work

This tool is a working progress and it will be always updated to give you even more help for your development process for your React Native projects.

In each new version this article will be updated so you can learn for the new things that you can do with this tool and hopefully it will provide you what you need.
