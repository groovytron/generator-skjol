import { assert, expect } from "chai";
import { createHelpers } from "yeoman-test";
import * as path from "path";
import * as fs from "fs";
import * as yaml from "js-yaml";

const PROJECT_NAME = "my-report";
const MAKEFILE = "Makefile";
const REPORT = "report.md";
const METADATA = "metadata.yaml";
const DOCKER_COMPOSE = "docker-compose.yaml";
const README = "README.md";

describe("Scaffold a report documentation skeleton", () => {
  let runResult: any;
  const helpers = createHelpers({});

  beforeEach(async () => {
    runResult = await helpers
      .create(path.join(path.resolve(), "/src/report"), {}, {})
      .withArguments([PROJECT_NAME])
      .withOptions({
        report: true
      })
      .run();
  });

  afterEach(() => {
    if (runResult !== undefined) {
      runResult.restore();
    }
  });

  it("should generate report files", () => {
    assert(
      fs.existsSync(`${PROJECT_NAME}/${MAKEFILE}`),
      `'${PROJECT_NAME}/${MAKEFILE}' file should be created`
    );

    assert(
      fs.existsSync(`${PROJECT_NAME}/${REPORT}`),
      `'${PROJECT_NAME}/${REPORT}' file should exist`
    );

    assert(
      fs.existsSync(`${PROJECT_NAME}/${METADATA}`),
      `'${PROJECT_NAME}/${METADATA}' file should exist`
    );

    assert(
      fs.existsSync(`${PROJECT_NAME}/${DOCKER_COMPOSE}`),
      `'${PROJECT_NAME}/${DOCKER_COMPOSE}' file should exist`
    );

    const dockerCompose = yaml.load(
      fs.readFileSync(`${PROJECT_NAME}/${DOCKER_COMPOSE}`, "utf8")
    ) as any;

    expect(dockerCompose.services).to.be.an("object");
    expect(dockerCompose.services).to.have.all.keys(["pandoc"]);

    assert(
      fs.existsSync(`${PROJECT_NAME}/${README}`),
      `'${PROJECT_NAME}/${README}' file should exist`
    );
  });
});
