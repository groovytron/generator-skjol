# Changelog

## 3.1.2

- fix: update slides README template's Makefile documentation

## 3.1.1

- fix: improve performances by not exporting slides PDF on every change when watching
- fix: fix code format in slides.md template

## 3.1.0

- feature: add PDF export (with [`decktape`](https://github.com/astefanutti/decktape)) to slides generator (<https://github.com/groovytron/generator-skjol/issues/35>)

## 3.0.1

- fix: upgrade dependencies

## 3.0.0

- feature: add `.editorconfig` file to harmonize editor configuration
- fix: fix some npm scripts that were failing (`dev`)
- **breaking change**: generators now all have a required argument `projectName`
  so that files are not created in the current folder but in a separate folder

## 2.1.0

- fix: migrate slides generator to `fswatch` to improve crossplatform compatibility (https://github.com/groovytron/generator-skjol/issues/31)
- fix: remove references to `docker-compose` from slides' README (https://github.com/groovytron/generator-skjol/issues/32)

## 2.0.1

- fix: upgrade dependencies

## 2.0.0

- fix: upgrade dependencies
- fix: add missing `.gitignore` template to slides generator (https://github.com/groovytron/generator-skjol/issues/22)
- feature: migrate to TypeScript

## 1.1.1

- fix: fix typo in slides' reveal.js transition prompt question

## 1.1.0

- feature: make every generator create a `README.md` to help the end user to know how to use the stack ([#3](https://github.com/groovytron/generator-skjol/issues/3))

## 1.0.1

- fix: add missing `yeoman-generator` to `package.json`

## 1.0.0

- feature: add `slides` generator to scaffold slides documentation skeleton
- feature: add `kroki` generator to scaffold diagram documentation skeleton
- feature: add `repoter` generator to scaffold report documentation skeleton
