import { assert } from "chai";
import { createHelpers } from 'yeoman-test';
import * as path from "path";
import * as fs from "fs";

const MAKEFILE = "Makefile";
const PACKAGE_JSON = "package.json";
const SLIDES_MD = "slides.md";
const METADATA = "metadata.yaml";
const README = "README.md";
const GITIGNORE = ".gitignore";

describe("Scaffold a slides documentation skeleton", () => {
  let runResult: any;
  const helpers = createHelpers({});

  beforeEach(async () => {
    runResult = await helpers 
      .create(
        path.resolve(path.resolve(), 'src/slides'),
        {},
        {}
      )
      .withPrompts({
        showSlideNumber: true,
        theme: "black",
        transition: "zoom"
      })
      .run();
  });

  afterEach(() => {
    if (runResult !== undefined) {
      runResult.restore();
    }
  });

  it("should generate files", () => {

    assert(fs.existsSync(MAKEFILE), "Makefile file should be created");
    assert(fs.existsSync(PACKAGE_JSON), `'${PACKAGE_JSON}' file should exist`);

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
      packageJson.dependencies["reveal.js"] === "^4.0.2",
      `reveal.js dependency version has changed`
    );

    assert(fs.existsSync(METADATA), `'${METADATA}' file should exist`);

    assert(fs.existsSync(SLIDES_MD), `'${SLIDES_MD}' file should exist`);

    assert(fs.existsSync(README), `'${README}' file should exist`);

    assert(fs.existsSync(GITIGNORE), `'${GITIGNORE}' file should exist`);
  });
});
