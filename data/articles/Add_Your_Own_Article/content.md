# How To Add Your Own Article

This Tutorial will show you how to add your own article on our website [DzCode.io](https://dzcode.io)

# Requirments :

You don't need much to write and add an article to our website, ALL you need is a <b><i>Good Article</i></b>.

## What does a good article look like ?

A good article requires good <b>content</b> and good <b>technique</b>. It means your article needs to be informative, easy to read and appealing.

# Write the article :

Articles on [dzCode.io](https://dzcode.io) are found under the folder `data/articles` of our [dzcode.io Github repo](https://github.com/dzcode-io/dzcode.io/tree/master/data/articles).

To add new article simply do the following:

- 1 - Fork the repo [Fork](https://github.com/dzcode-io/dzcode.io/fork).
  ![aze](https://i.imgur.com/3JVIa5i.png)

- 2 - Clone it to your workspace or machine.
  ![](https://i.imgur.com/iNV3Uo5.png)

- 3 - Create a new folder `MyNewAricleName` under `data/articles`

> on this example our article will be named " How To Add Your Own Article "

- 4 - Add 2 files, `info.json` and `content.md`

  - `info.json` : A Json file containing info about your article, like title, description etc...

    check this [File](https://github.com/dzcode-io/dzcode.io/blob/master/data/articles/Welcome_to_dzCode/info.json) as an example.

  - `content.md` , a markdown file which contain your Article text, in form of markdown.

  ![](https://i.imgur.com/5nK1FOJ.png)

- 5 - Make your modifications and add your Article content.

- 6 - Make your article visible by adding the name of the article into the `"items": [] array` on `list.json` under `data/articles`.

  ![](https://i.imgur.com/XjV0Pn9.png)

- 7 - Commit and push the modifications you did to the repository and create a `pull request`.

<h3><b><i> And CONGRATS ! you have added your own article to our website. </h3></i></b>

> it won't be published until one of the admins accepts the Pull Request and validate your modifications.

© 2020 - DzCode - Making the world a better place 🌎
