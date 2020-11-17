# Skjöl

![CI](https://github.com/groovytron/generator-skjol/workflows/CI/badge.svg?branch=master)

Need to document you project with schemas (UML, Graphs, ...), a PDF report or slides? Skjöl is for you! Skjöl allows you to scaffold the needed configuration into your project to be able to generate documentation only based on simple text files.

Skjöl is a group of generators and contains the following:

- `kroki`: scaffolds a `docker-compose` stack that uses [kroki](https://kroki.io/) to generate diagrams and schemas from text files
- `slides`: scaffolds a slide show based on Markdown and ouputs a reveal.js presentation with [pandoc](https://pandoc.org/)
- `report`: scaffolds a `docker-compose` stack that uses `pandoc` to generate PDF from a MarkDown file

## Installation

To install this generators on your system, run `npm install --global generator-skjol`.

## Use the generators

You can then call the generators using Yeoman.

To scaffold slides documentation, run `yo skjol:slides`.

To scaffold diagrams documentation, run `yo skjol:kroki`.

To scaffold a report documentation, run `yo skjol:report`.
