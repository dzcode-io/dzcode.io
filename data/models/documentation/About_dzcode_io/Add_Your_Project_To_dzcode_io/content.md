Projects on dzcode.io are found under the folder `./data/models/projects` in [dzcode.io repository](https://github.com/dzcode-io/dzcode.io/tree/main/data/models/projects).

To add new project, named for example: "**My Awesome Project**", simply do the following:

1. [Fork](/Learn/Git_Basics/What_The_Fork) the dzcode.io repository. and clone it to your local machine.

2. Under `data/models/projects`, Create a new folder using **Capital-Snake Case** version of your project title: `My_Awesome_Project`

3. Under `data/models/projects/My_Awesome_Project`, Add new file `info.json` and write the basic information about your project (name and list of repositories), like below:

   ```json
   {
     "name": "My Awesome Project",
     "repositories": [
       {
         "provider": "github",
         "owner": "your-github-username",
         "repository": "your-awesome-project"
       }
     ]
   }
   ```

   **Notes**:

   - Please use **Capital Cased** words for the name, as shown in the above example.
   - if your projects has mutiple repositories, just add them in the `repositories` array, and they will automatically be shown in the website.

4. Finally run `npm i` then `npm run lint:fix`, commit and push the modifications you did to the repository and create a [pull request](/learn/git_basics/pull_merge_request). the maintainers will happily review, approve, merge and [deploy](https://github.com/dzcode-io/dzcode.io/releases) your changes!
