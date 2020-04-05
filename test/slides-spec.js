/* global describe, it */
const chai = require("chai");
const assert = chai.assert;
const chaiFiles = require("chai-files");
const helpers = require("yeoman-test");
const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

chai.use(chaiFiles);

// const file = chaiFiles.file;
const MAKEFILE = "Makefile";
const PACKAGE_JSON = "package.json";
const SLIDES_MD = "slides.md";
const METADATA = "metadata.yaml";

describe("Scaffold a slides documentation skeleton", () => {
  it("should generate files", () => {
    const author = "John Does A Presentation";
    const title = "Best presntation ever";
    const subtitle = "and you know it";

    return helpers
      .run(path.join(__dirname, "../generators/slides"))
      .withPrompts({
        author: author,
        showSlideNumber: true,
        subtitle: subtitle,
        theme: "black",
        title: title,
        transition: "zoom"
      })
      .then(() => {
        assert(fs.existsSync(MAKEFILE), "Makefile file should be created");
        assert(
          fs.existsSync(PACKAGE_JSON),
          `'${PACKAGE_JSON}' file should exist`
        );

        const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, "utf8"));

        assert.isObject(
          packageJson.dependencies,
          `dependencies are not defined in ${PACKAGE_JSON}'`
        );
        assert(
          packageJson.dependencies["reveal.js"] !== undefined,
          `reveal.js dependency is not in '${PACKAGE_JSON}'`
        );
        assert(
          packageJson.dependencies["reveal.js"] === "^3.9.2",
          `reveal.js dependency version has changed`
        );

        assert(fs.existsSync(METADATA), `'${METADATA}' file should exist`);

        const metadata = yaml.safeLoad(fs.readFileSync(METADATA, "utf8"));

        assert(
          metadata.author === author,
          `Author should be defined and contain '${author}'`
        );
        assert(
          metadata.title === title,
          `Title should be defined and contain '${title}'`
        );
        assert(
          metadata.subtitle === subtitle,
          `Subtitle should be defined and contain '${subtitle}'`
        );

        assert(fs.existsSync(SLIDES_MD), `'${SLIDES_MD}' file should exist`);
      });
  });
});
