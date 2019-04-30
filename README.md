# Skrifskissa

This is a boilerplate to share documentation generation environment using docker containers. The name comes from 2 icelandic words (*skrifa* which means *write* and *skissa* that means *sketch*).

## How to use this boilerplate?

This boilerplate allows you to start 4 containers:

- `kroki` for diagrams generation with (`PlantUML`, `nomnoml` and many more) through a HTTP API
- `kroki-mermaid` for diagrams generation with `mermaid`
- `kroki-blockdiag` for diagrams generation with `BlockDiag`
- `pandoc` for PDF generation (takes `report.md` as input to generate `build/report.pdf`)

### Requirements

- `docker` and `docker-compose`
- `make` (Linux or OSX users) or `make-mingw32` (Windows users)

### Usage

1. Copy the content of this repository into your documentation folder
2. Run `make up` in the folder. The documentation should be generated in a file called `build/report.pdf`
3. Edit the `report.md` file or one of the diagrams in `diagrams` and see the pdf being generated again

Press *Ctrl+c* to stop the containers when you are done.

## Friendly projects

- [pandoc](https://pandoc.org/): writing tool handling tons of input and output file formats
- [kroki](https://github.com/yuzutech/kroki): containers making diagrams generation with numerous tools of your choice possible through a convenient HTTP API
- [rapport-technique](https://github.com/he-arc/rapport-technique): project template for technical report generation with pandoc
