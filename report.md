---
title: _kroki_ and _pandoc_
subtitle: How to share your documentation generation environment using containers
lang: en
author:
- Julien M'Poy^[julien.mpoy@gmail.com]
tags: [docker, docker-compose, kroki, markdown, pandoc]
date: \today
papersize: a4

# Document type
documentoptions: twoside

# Styles
fontsize: 12pt
colorlinks: true
linkcolor: Blue
citecolor: MidnightBlue
urlcolor: MidnightBlue

links-as-notes: true
numbersections: true

monofontoptions: Scale=.8

# Table of content
toc: true
toc-depth: 1
lof: true
lot: false
tblPrefix: tab

# Sources
bibliography: bibliography/bibliography.bib
csl: bibliography/iso690-author-date-fr.csl

# Abstract, thanks, etc.
abstract: |
    _This document aims at presenting how to build technical documentation using open source softwares and the_ Markdown _format._

    _**Keywords:** docker, docker-compose, kroki, markdown, pandoc._

# https://tex.stackexchange.com/questions/7546/how-to-get-latex-symbol-in-document/7549#7549
header-includes:
- |
  \usepackage{lmodern}
  \usepackage{xspace}
  \usepackage{xltxtra}
  \let\tex\TeX
  \renewcommand{\TeX}{\tex\xspace}
---

# Introduction

This document is highly inspired by [@he-arc2019].

Developpers usually need to write documentation for projects they work on and it usually includes the following kinds of documents:

- reports
- diagrams/schemas
- presentations/slides

They usually use tools such as the *Micrsoft Office* suit or open source tools like *LibreOffice* to write our technical documentation. This approach is efficient but it has some drawbacks:

- everybody who would possibly participate to the writing of documents related to the project needs to have the compatible tools installed on his machine
- the file formats used by these tools are binary files or files that are not «VCS-friendly» and thus cannot be version controlled in the project repository
- the tools cannot easily generate different ouput formats without changing drastically the original source files
- highlighting code in these formats is usually cumbersome
- keeping a report/presentation in sync with diagrams is not easy and often forgotten because you have to import or copy-paste your updated diagrams again and again

\pagebreak

The approach that will be presented will use the following open source softwares to solve these issues:

- [pandoc](https://pandoc.org): a universal document converter that supports a lot of input and output formats
- [kroki](https://docs.kroki.io/kroki): a server providing an API to schema tools like [PlantUML](http://plantuml.com), [nomnoml](http://nomnoml.com), [mermaid](https://mermaidjs.github.io), [Graphviz](https://www.graphviz.org) and many others
- [docker](https://www.docker.com): a software that allows you to embed all the tools (`pandoc`, `kroki`, `make`, etc.) in containers that can be run easily on any operating system
- [docker-compose](https://docs.docker.com/compose): a component part of docker that allows you to start and link the needed containers all together

If we look back to the issues that were presented before:

- the tools are embedded in docker containers so the only software that a new contributor needs is `docker` and of course a text editor such as [visual studio code](https://code.visualstudio.com), [vim](https://www.vim.org), [emacs](https://www.gnu.org/software/emacs) or any other one following your flavor
- all the tools presented below are free softwares
- the input file used to write the documentation are all text based:
    - `pandoc` handles text formats such as [Markdown](https://en.wikipedia.org/wiki/Markdown), `HTML`, `org-mode`, etc.
    - all the tools `kroki` gives access to use text based format
- not only `pandoc` handles a lot of input formats but also offers a large panel of output formats (eg. `Markdown` to `PDF` through `LaTeX`)
- `Markdown` is an easy to learn markup language so it can be mastered quickly by a newcomer

# Markdown

Here are a few example of what you can do with `Markdown`:

```markdown

# Title 1

## Title 2

*italic* with star or _underscore_

make it **bold** with double star or __double underscore__

This is an unordered list:

- first item
- second item
- third item

This is an ordered list:

1. Item 1
2. Item 2
3. Item 3

> this is a quote
> quotes can be on multiple lines

[link to pandoc starter guide](https://pandoc.org/getting-started.html)

![picture caption](link-to-picture.png)

![picture with a specific height](link-to-picture.png){ height=300px }

This is how you make inline code block: `this.show()`.
```

# Pandoc

Written in [haskell](https://www.haskell.org) by John MacFarlane, `pandoc` was designed to be a writing tool for publishing.

## Include code in your documentation

```python
class Car:
    def __init__(doors, seats, horse_power):
        self.doors  = doors
        self.seats = seats
        self.horse_power = horse_power
```

Or you can use `pandoc-include-code` filter. Here the content of the file `code/Component.js`:

```{.php include=code/User.php}
```

## Mathematic formulas

Pandoc provides an enhanced Markdown syntax that allows you to include mathematic formulas in your documents (thanks to [MathJax](https://www.mathjax.org) and [MathML](https://www.w3.org/Math)). So the equation `$$-1 = e^{j \pi}$${#eq:minus-one}` will be rendered like below:

$$-1 = e^{j \pi}$$

# Kroki and the diagram tools

`Kroki` is a project that aims to provide an HTTP API to schemas and diagram tools like [ERD](https://github.com/BurntSushi/erd), [BlockDiag](http://blockdiag.com/en), [PlantUML](http://plantuml.com) (with or without [C4](https://c4model.com/)), [nomnoml](https://github.com/skanaar/nomnoml) and [mermaid](https://mermaidjs.github.io).

You can either install `kroki` or simply use it in containers in combination with `pandoc`:

![Documentation stack drawn with PlantUML and C4](build/diagrams/plantuml/stack.svg){ height=450px }

\pagebreak

## Entity - Relationship Diargrams with ERD

![Entity - relationship diagram made with ERD](build/diagrams/erd/schema.svg)

\pagebreak

## Mermaid

### Sequence diagrams

![Sequence diagram made with Mermaid](build/diagrams/mermaid/message.svg){ height=200px }

\pagebreak

## Plantuml

### Flowcharts

![Flowchart made with PlantUML without C4](build/diagrams/plantuml/flow.svg){ height=200px }

\pagebreak

## Nomnoml

![Workflow diagram made with nomnoml](build/diagrams/nomnoml/workflow.svg){ height=500px }

![Flowchart made with nomnoml](build/diagrams/nomnoml/git.svg)

![Overview of components nomnoml offers](build/diagrams/nomnoml/showcase.svg)

# Bibliography
