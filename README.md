# generator-skjol

[![npm version](https://badge.fury.io/js/generator-skjol.svg)](https://badge.fury.io/js/generator-skjol)
![CI](https://github.com/groovytron/generator-skjol/workflows/CI/badge.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/groovytron/generator-skjol/badge.svg?branch=master)](https://coveralls.io/github/groovytron/generator-skjol?branch=master)

![](./images/dawg.jpg)

Need to document your project with schemas (UML, Graphs, ...), a PDF report or
slides?
Skjöl is for you! Skjöl allows you to scaffold the needed configuration into
your project to be able to generate documentation only based on
simple text files.

Skjöl is a group of generators and contains the following:

- `kroki`: scaffolds a `docker-compose` stack that uses [kroki](https://kroki.io/)
to generate diagrams and schemas from text files
- `slides`: scaffolds a slide show based on Markdown and ouputs
a [reveal.js](https://revealjs.com/) presentation with [pandoc](https://pandoc.org/)
- `report`: scaffolds a `docker-compose` stack that uses `pandoc` to generate
a PDF from a Markdown file

Now you can wonder why this generator is named skjöl. Simply because *skjöl*
means *documents* in icelandic. That might be disappointing but that's why!

## Installation

To install this generators on your system, run
`npm install --global generator-skjol`.

## Use the generators

You can then call the generators using Yeoman.

To scaffold slides documentation in a folder named `my-slides`,
run `yo skjol:slides my-slides`.

To scaffold diagrams documentation in a folder named `my-diagrams`,
run `yo skjol:kroki my-diagrams`.

To scaffold a report documentation in a folder named `my-report`,
run `yo skjol:report my-report`.
