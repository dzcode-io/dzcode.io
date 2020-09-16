# Use  conventional commits to contribute to dzcode

Yoo there i just want  to share with you a standard to write commits, and i know that most of us struggle to come up with an appropriate commit messages.
I was experiencing the same thing, but one day I found out about this conventional commits after reading this [article](https://dev.to/alvarotorresc/conventional-commits-1an9) by Alvaro Torres Carrasco

## Why commits is important

Some describe the commits as the first way to communicate with your team , and i think that you should write a  good commit messages even when you work alone ,because this  personal project might became an open source project and there will be  lot of other developers who want to contribute !!!

## What is conventional commits

A specification for adding human and machine readable meaning to commit messages

Conventional commits make it easier for other developers who want to understand what the hell is going on a specific project

Another definition from the ['official conventional commits website'](https://www.conventionalcommits.org/en/v1.0.0/)
> The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with semver.org , by describing the features, fixes, and breaking changes made in commit messages.....

## Conventional commits structor

~~~markdown
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
~~~

### Types
* API relevant changes
    * __feat__ Commits, that adds a new feature
    * __fix__ Commits, that fixes a bug
* __refactor__ Commits, that rewrite/restructure your code, however does not change any behaviour
* __perf__ Commits are refactor commit, that improves performance
* __style__ Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
* __test__ Commits, that add missing tests or correcting existing tests
* __doc__ Commits, that affect documentation only
* __build__ Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
* __ops__ Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...

### Scopes

The __scope__ provides additional contextual information.

* Is an optional part of the format
* Allowed Scopes depends on the specific project
* Don't use issue identifiers as scopes

### Subject

The __subject__ contains a succinct description of the change.

* Is a mandatory part of the format
* Use the imperative, present tense: "change" not "changed" nor "changes"
* Don't capitalize the first letter
* No dot (.) at the end

### Body

The __body__ should include the motivation for the change and contrast this with previous behavior.

* Is an optional part of the format
* Use the imperative, present tense: "change" not "changed" nor "changes"
* This is the place to mention issue identifiers and their relations

### Footer

The __footer__ should contain any information about Breaking Changes and is also the place to reference Issues that this commit refers to.

* Is an optional part of the format
optionally reference an issue by its id.
* Breaking Changes should start with the word __BREAKING CHANGES:__ followed by space or two newlines. The rest of the commit message is then used for this

## For further exploration 

* [conventional commit messages by
qoomon](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)
* [Conventional Commits website ](https://www.conventionalcommits.org/en/v1.0.0/)
* [Alvaro Torres Carrasco article](https://dev.to/alvarotorresc/conventional-commits-1an9)
* [A Case For Conventional Commits in Git by Tom Feron](https://medium.com/better-programming/a-case-for-conventional-commits-in-git-d70c65245009
)
* [feat(conventional_commits): signal breaking changes in commit titles by apereo community](https://apereo.github.io/2018/07/07/indicate-breaks-in-conventional-commit-titles/)
## Social footer

By Toumi abderrahmane [twitter](https://twitter.com/Abderrahmaneend) .  [github](https://github.com/abderrahmaneMustapha)
