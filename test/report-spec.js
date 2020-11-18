/* global describe, it */
const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const chaiFiles = require("chai-files");
const helpers = require("yeoman-test");
const path = require("path");
const fs = require("fs");
const yaml = require("js-yaml");

chai.use(chaiFiles);

const MAKEFILE = "Makefile";
const REPORT = "report.md";
const METADATA = "metadata.yaml";
const DOCKER_COMPOSE = "docker-compose.yaml";
const README = "README.md";

describe("Scaffold a report documentation skeleton", () => {
  it("should generate report files", () => {
    return helpers
      .run(path.join(__dirname, "../generators/report"))
      .withOptions({
        report: true
      })
      .then(() => {
        assert(fs.existsSync(MAKEFILE), `'${MAKEFILE}' file should be created`);

        assert(fs.existsSync(REPORT), `'${REPORT}' file should exist`);

        assert(fs.existsSync(METADATA), `'${METADATA}' file should exist`);

        assert(
          fs.existsSync(DOCKER_COMPOSE),
          `'${DOCKER_COMPOSE}' file should exist`
        );

        const dockerCompose = yaml.safeLoad(
          fs.readFileSync(DOCKER_COMPOSE, "utf8")
        );

        expect(dockerCompose.services).to.be.an("object");
        expect(dockerCompose.services).to.have.all.keys(["pandoc"]);

        assert(fs.existsSync(README), `'${README}' file should exist`);
      });
  });
});
