# How To Add Your Article To dzCode

This Tutorial will show you how to add your own article on our website [DzCode.io](https://dzcode.io)

## Requirements

All you need is a **_Good Article_**.

## Folder Structure

```fs
├── articles
   ├── ReadMe.md
   ├── top-articles.json
   ├── list.json           // list of all articles displayed in dzcode website
   ├── ssr.json            // list of all articles server side rendered in dzcode website
   └── My_New_Article      // A Folder that contains all article files
      ├── content.md       // A markdown file contains you Article content, in markdown language.
      └── info.json        // A Json file containing meta data about your article ie: like title, description etc...
```

## Adding Your Article To Dzcode

Articles on **[dzCode.io](https://dzcode.io)** are found under the folder `data/articles` of our **[dzcode.io Github repo](https://github.com/dzcode-io/dzcode.io/tree/master/data/articles)**.

To add new article simply do the following:

- 1 - Fork the repo **[Fork](https://github.com/dzcode-io/dzcode.io/fork)**. and clone it to your workspace or machine.

  ![cloning](https://user-images.githubusercontent.com/54677068/95619105-f6970880-0a65-11eb-8a78-58c7de2f114a.PNG)

- 2 - Create a new folder using upper snake case `My_New_Article` under `data/articles`

> on this example our article will be named `Add_Your_Own_Article`

- 3 - Add 2 files, `info.json` and `content.md`

  `info.json` here we add the article meta data

  ```json
  {
    "title": "How To Add A New Article",
    "description": "This Tutorial will show you how to add your own article on our website",
    "image": "https://i.imgur.com/SqhMCpV.png&fit=crop&w=800&q=100"
  }
  ```

  `content.md` here we add the article content

  ```markdown
  # How To Add Your Own Article

  This Tutorial will show you how to add your own article on our website [DzCode.io](https://dzcode.io)

  ## Requirements

  - All you need is a **Good Article**.

  ...etc
  ```

- Make your article **Visible** on dzCode by adding the name of the article into the `"items": [] array` on `list.json` under `data/articles`.

  ```json
  {
   "items": [
     "Welcome_to_dzCode",
     "Send_Emails_With_Django_and_Gmail_A_Better_Way",
     "The_Using_Of_Conventional_Commits_To_Contribute_To_DZCode",
     "Add_Your_Own_Article",  👈 here is my new article
   ],
   "include": ["title"]
  }
  ```

- Also Make your article **server side rendered** by adding the name of the article into the `"items": [] array` on `ssr.json` under `data/articles`.

  ```json
  {
   "items": [
     "Welcome_to_dzCode",
     "Send_Emails_With_Django_and_Gmail_A_Better_Way",
     "The_Using_Of_Conventional_Commits_To_Contribute_To_DZCode",
     "Add_Your_Own_Article",  👈 here is my new article
   ],
   "include": ["title", "description", "image"]
  }
  ```

- Finally, Commit and push the modifications you did to the repository and create a `pull request`.

### 🎉 Congratulations 🎉 You Now have an article on dzCode

> it won't be published until one of the admins accepts the Pull Request and validate your modifications.

© 2020 - DzCode - Making the world a better place 🌎
