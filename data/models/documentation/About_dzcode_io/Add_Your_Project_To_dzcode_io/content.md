Projects on dzcode.io are found under the folder `./data/models/projects` in [dzcode.io repository](https://github.com/dzcode-io/dzcode.io/tree/main/data/models/projects).

To add new project, named for example: "**My Awesome Project**", simply do the following:

1. [Fork](/Learn/Git_Basics/What_The_Fork) the dzcode.io repository. and clone it to your local machine.

2. Under `data/models/projects`, Create a new folder using **Capital-Snake Case** version of your project title: `My_Awesome_Project`

3. Under `data/models/projects/My_Awesome_Project`, Add 2 files, `info.json` and `content.md`:

   - `info.json` : here you add information about the project, eg:

     ```json
     {
       "title": "My Awesome Project",
       "description": "Small description about the project",
       "image": "https://i.imgur.com/SqhMCpV.png&fit=crop&w=800&q=100",
       "githubURI": "your-github-username/your-awesome-project"
     }
     ```

     **Notes**:

     - Please use **Capital Cased** words for the title, as shown in the above example.
     - The image you provide, will to be shown on project Cards, social media thumbnails.

4. Under `data/projects/list.json`, append the folder name of your project: `My_Awesome_Project` to the `items` array:

   ```json
   {
     "items": [
       // ...previous projects will be here too,
       // Add yours after them:
       "Add_Your_Own_Project"
     ],
     "include": ["title", "description", "image", "githubURI"]
   }
   ```

   **Notes**

   - to make your project indexed by Google search, repeat the 4th step for `data/projects/ssr.json`.

5. Finally, commit and push the modifications you did to the repository and create a [pull request](/learn/git_basics/pull_merge_request). the maintainers will happily review, approve, merge and [deploy](https://github.com/dzcode-io/dzcode.io/releases) your changes!
