Articles on dzcode.io are found under the folder `./data/models/articles` in [dzcode.io repository](https://github.com/dzcode-io/dzcode.io/tree/main/data/models/articles).

To add new article, named for example: "**My Awesome Article**", simply do the following:

1. [Fork](/Learn/Git_Basics/What_The_Fork) the dzcode.io repository. and clone it to your local machine.

2. Under `data/models/articles`, Create a new folder using **Capital-Snake Case** version of your article title: `My_Awesome_Article`

3. Under `data/models/articles/My_Awesome_Article`, Add 2 files, `info.json` and `content.md`:

   - `info.json` : here you add information about the article, eg:

     ```json
     {
       "title": "My Awesome Article",
       "description": "Small description about the article",
       "image": "https://i.imgur.com/SqhMCpV.png&fit=crop&w=800&q=100"
     }
     ```

     **Notes**:

     - Please use **Capital Cased** words for the title, as shown in the above example.
     - The image you provide, will to be shown on article Cards, social media thumbnails, and as header of the article.

   - `content.md` : here you add the actual content of the article, using [Markdown](https://en.wikipedia.org/wiki/Markdown#Example) language, eg:

     ```markdown
     Hi, This is my first article, using **markdown**,

     My check list of things to do in 2021:

     - [x] writing my first article on dzcode.io.
     - [ ] Adding my open-source project to dzcode.io.
     - [ ] Contributing to other algerian open-source projects.
     - [ ] Showoff my Github profile in an interview and get the job!
     ```

4. Under `data/articles/list.json`, append the folder name of your article: `My_Awesome_Article` to the `items` array:

   ```json
   {
     "items": [
       // ...previous articles will be here too,
       // Add yours after them:
       "Add_Your_Own_Article"
     ],
     "include": ["title"]
   }
   ```

   **Notes**

   - to make your article indexed by Google search, repeat the 4th step for `data/articles/ssr.json`.

5. Finally, commit and push the modifications you did to the repository and create a [pull request](/learn/git_basics/pull_merge_request). the maintainers will happily review, approve, merge and [deploy](https://github.com/dzcode-io/dzcode.io/releases) your changes!
