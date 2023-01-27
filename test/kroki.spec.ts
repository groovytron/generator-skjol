import { assert, expect } from "chai";
import { createHelpers } from "yeoman-test";
import * as path from "path";
import * as fs from "fs";
import * as yaml from "js-yaml";

const MAKEFILE = "Makefile";
const DIAGRAMS = "diagrams";
const DOCKER_COMPOSE = "docker-compose.yaml";
const WAIT_FOR_IT = "wait-for-it.sh";
const README = "README.md";

describe("Scaffold a diagrams documentation skeleton", () => {
  let runResult: any;
  const helpers = createHelpers({});

  beforeEach(async () => {
    runResult = await helpers
      .create(path.resolve(path.resolve(), "src/kroki"), {}, {})
      .withOptions({
        kroki: true
      })
      .run();
  });

  afterEach(() => {
    if (runResult !== undefined) {
      runResult.restore();
    }
  });

  it("should generate kroki files", () => {
    assert(fs.existsSync(MAKEFILE), `'${MAKEFILE}' file should be created`);

    assert(fs.existsSync(WAIT_FOR_IT), `'${WAIT_FOR_IT}' file should exist`);

    assert(fs.existsSync(DIAGRAMS), `'${DIAGRAMS}' folder should be created`);

    assert(
      fs.existsSync(DOCKER_COMPOSE),
      `'${DOCKER_COMPOSE}' file should exist`
    );

    const dockerCompose = yaml.load(
      fs.readFileSync(DOCKER_COMPOSE, "utf8")
    ) as any;

    expect(dockerCompose.services).to.be.an("object");
    expect(dockerCompose.services).to.have.all.keys([
      "blockdiag",
      "kroki",
      "mermaid",
      "pandoc"
    ]);

    assert(fs.existsSync(README), `'${README}' file should exist`);
  });
});
