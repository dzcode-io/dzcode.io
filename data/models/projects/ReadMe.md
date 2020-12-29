# How To Add Your Project To DzCode

This Tutorial will show you how to add your own Project on our website [DzCode.io](https://dzcode.io)

## Requirements

All you need is a **_Good Project_**.

## Folder Structure

```fs
├── projects
   ├── ReadMe.md
   ├── top-projects.json
   ├── list.json           // list of all projects displayed in dzcode website
   ├── ssr.json            // list of all projects server side rendered in dzcode website
   └── My_New_Project      // A Folder that contains all project files
      ├── content.md       // A markdown file contains you Project content, in markdown language.
      └── info.json        // A Json file containing meta data about your Project ie: like title, description etc...
```

## Adding Your project To Dzcode

Projects on **[dzCode.io](https://dzcode.io)** are found under the folder `data/projects` of our **[dzcode.io Github repo](https://github.com/dzcode-io/dzcode.io/tree/master/data/projects)**.

To add new project simply do the following:

- Fork the repo **[Fork](https://github.com/dzcode-io/dzcode.io/fork)**. and Clone it to your workspace or machine.

  ![cloning](https://user-images.githubusercontent.com/54677068/95619105-f6970880-0a65-11eb-8a78-58c7de2f114a.PNG)

- Create a new folder using upper snake case `My_New_Project` under `data/projects`

> on this example our project will be named `My_New_Project`

- Add new file `info.json`. here we add the project meta data

```json
{
  "title": "dzCode",
  "description": "Website for Algerian open-source community.",
  "githubURI": "dzcode-io/dzcode.io",
  "slug": "DzCode_Website",
  "image": "https://user-images.githubusercontent.com/54677068/95579411-7e145580-0a2d-11eb-93cb-ccc10053453a.png"
}
```

- Make your project **Visible** on dzCode by adding the name of the project folder into the `"items": [] array` on `list.json` under `data/projects`.

  ```json
   {
    "items": [
     "DzCode",
     "React_Project_Builder",
     "My_New_Project" 👈 here is my new project
     ],
    "include": ["title", "description", "image", "githubURI"]
  }
  ```

- Also Make your project **server side rendered** by adding the name of the project folder into the `"items": [] array` on `ssr.json` under `data/projects`.

  ```json
  {
    "items": [
     "DzCode",
     "React_Project_Builder",
     "My_New_Project" 👈 here is my new project
     ],
    "include": ["title", "description", "image"]
  }
  ```

- Finally, Commit and push the modifications you did to the repository and create a `pull request`.

### 🎉 Congratulations 🎉 Your project is listed on dzCode

> it won't be published until one of the admins accepts the Pull Request and validate your modifications.

© 2020 - DzCode - Making the world a better place 🌎
