# Why you want to sync your repository to the original (upstream) repository?

It's a common situation in open-source where you figure out a fix for a bug and you want to push the changes you made to the original repo, but you find out that you already forked the repository, and your forked repository is serval commits behind 😕, in this case, you most likely are going to have conflicts, and that is annoying to deal with.

In such situation, you have to first sync your repository before you make a Pull Request to the original repository, likely the process is very simple if you follow it step by step.

# How to Sync ?

## Prerequisites and Assumptions

We expect that you already [forked](/Learn/Git_Basics/Forking_A_Repository) and [cloned](/Learn/Git_Basics/Cloning_A_Repository) the repository, let's say [leblad](https://github.com/dzcode-io/leblad) for example, and your Github username is **`AM-77`**.

## Steps to follow

1. Specify a new remote upstream repository that will be synced with the fork.

```sh
git remote add upstream https://github.com/dzcode-io/leblad.git
```

2. Fetch the branches and their respective commits from the upstream repository. Commits to master will be stored in a local branch, upstream/master.

```sh
git fetch upstream
```

3. Check out your fork's local master branch.

```sh
git checkout master
```

4. [Rebase](/Learn/Git_Basics/Rebasing) the changes from upstream/master into your local master branch. This brings your fork's master branch into sync with the upstream repository, without losing your local changes.

```sh
git rebase upstream/master
```

5. At this point your local repository is in sync with the upstream, now you only need to push your changes to your forked remote.

```sh
git push -f
```
