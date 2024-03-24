# Create A Vim Plugin For Your Next Programming Language, Structure, and syntax highlight.

Create A Vim Plugin For Your Next Programming Language, Structure, and syntax highlight.

Vim is a text-based editor, opensource, it is also an improved version of the old vi UNIX, Vim has so many features including multi-level undo, syntax highlighting, command line history, on-line help, spell checking, filename completion, block operations, script language, etc.

If we want to talk about compatibility, Vim runs under MS-Windows (XP, Vista, 7, 8, 10), macOS, Haiku, VMS, and almost every OS based on UNIX.

In today's post, I would like to show you how to write your own vim extension for a new programming language, I wrote this plugin with the help of my two coworkers [Imen](https://github.com/imen-ben) and [Djamel](https://github.com/theLegend98).

## Introduction

First, let me introduce you to IOP (*Intersec Object Packer) it is a method to serialize data in different communication protocols, inspired by [*Google Protocol Buffers](https://developers.google.com/protocol-buffers/docs/overview), IOP syntax looks like _D language syntax, and all of this is according to [IOP official documentation](https://intersec.github.io/lib-common/lib-common/iop/base.html)._

## **The Structure of a Vim Plugin**

When we start working on our extension, we will create a root folder under the name [vim-io](https://github.com/abderrahmaneMustapha/vim-iop)p, which is exactly what we picked as a name for our vim extension.

This directory will contain three other important folders which are :

- autoload: is a technique for blocking the loading of your plugin’s code until it’s required, in our case, we will implement the autocomplete feature in this folder.

- ftdetect: or file type detection, has a clear purpose to figure out what file type a given file is.

- ftplugin: contains scripts that run automatically when vim detect a file opened or created by a user, in our case this file will contain the logic to implement indentation.

- scripts: contains a script that implements syntax highlight.

## Detect File Type

In this section, we add the code to set file type for IOP files, but first, our root folder **vim-iop** must look like this :

    vim-iop
    ------- ftplugin
    ------- ftdetect
    ------- syntax
    ------- autoload

In this part we need to create a new file ftdetect/[\*iop.vim](https://github.com/abderrahmaneMustapha/vim-iop/blob/main/ftdetect/iop.vim)\*, add this code below to it:

    " ftdetect/iop.vim
    autocmd BufNewFile,BufRead *.iop setfiletype iop

## Syntax Highlight

In this section, we will write some vim script in addition to some regex, so we can add the syntax highlight feature to our Vim extension.

Before we can start coding i want to mention that IOP has Basics types which are : int, uint, long, ulong, byte, ubyte ... and more, plus four complex types struct, class, union, enum , if you want to learn more about this types make sure to check this [\*link](https://intersec.github.io/lib-common/lib-common/iop/base.html)\*.

So for the code below, we need add the logic to highlight the IOP types mentioned in this part of _I[OP documentation.](https://intersec.github.io/lib-common/lib-common/iop/base.html)_

    "syntax/iop.vim

    ***syntax keyword *iopComplexType** class enum union struct module **nextgroup**=iopComlexTypeName **skipwhite**
    ***syntax keyword *iopBasicTypes** int uint long ulong xml
    ***syntax keyword *iopBasicTypes** byte ubyte short ushort void
    ***sytanx keyword* iopBasicTypes** bool double string bytes

    " complex types name
    ***syntax match iopComlexTypeName ***"**\w\+**" contained

as you can see we have** iopComplexType**, **iopBasicTypes** both of these variables contain the different complex and basic types of IOP, we also want to tell our extension that each complex type is followed by a name and that white space should be ignored, after this, we need to tell our vim extension to highlight this types by adding the code below in the bottom of syntax/iop.vim.

    "syntax/iop.vim
    ***highlight link*** **iopComplexType** Keyword
    ***highlight link *iopBasicTypes** Type

in the end and after adding this extension to our vim ide, we will see something like this.

![](https://cdn-images-1.medium.com/max/3374/1*clJKJaBcuSz9fDn60PlOPQ.png)

IOP syntax contains decorators also, we are going to write some regular expressions in order to highlight this, so just add the code below to our syntax/iop.vim file.

    "syntax/iop.vim

    syntax match iopDecorator /^**\s***@/ nextgroup=iopDecoratorFunction
    syntax match iopDecoratorFunction contained /**\h**[a-zA-Z0-9_.]*/

In the first line of the code above we are telling our vim extension that this decorator can start with a zero or multiple white spaces followed by an “@” ( /^**\s\***@/) , and the **nextgroup** keyword means that after “@” there is a name of this decorator, the name of this decorator can contain all _alphabet_ letters whether it is upper or lower case, this decorator name can also contain numbers and the two special characters “\_ “ and “.”.

After telling our vim extension to highlight the decorators.

    "syntax/iop.vim

    highlight link iopDecoratorFunction Function

This is an example of what we will see in our vim IDE.

![](https://cdn-images-1.medium.com/max/2898/1*abXRlK8jyTHfgncmEu23GQ.png)

if you want the complete implementation of vim-iop syntax highlight make sure to check this [link](https://github.com/abderrahmaneMustapha/vim-iop/tree/main/syntax).

That's it for now, in the next post, i will show you how to add autocomplete and indentation.

## **References:**

[Learn Vimscript the Hard Way](https://learnvimscriptthehardway.stevelosh.com/)
[How To Use Vundle to Manage Vim Plugins on a Linux VPS | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-vundle-to-manage-vim-plugins-on-a-linux-vps)
[IOP](https://intersec.github.io/lib-common/lib-common/iop/base.html)
