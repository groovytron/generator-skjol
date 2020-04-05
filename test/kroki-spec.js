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

// const file = chaiFiles.file;
const MAKEFILE = "Makefile";
const DIAGRAMS = "diagrams";
const DOCKER_COMPOSE = "docker-compose.yaml";
const WAIT_FOR_IT = "wait-for-it.sh";

describe("Scaffold a dragrams documentation skeleton", () => {
  it("should generate files", () => {
    return helpers.run(path.join(__dirname, "../generators/kroki")).then(() => {
      assert(fs.existsSync(MAKEFILE), `'${MAKEFILE}' file should be created`);

      assert(fs.existsSync(WAIT_FOR_IT), `'${WAIT_FOR_IT}' file should exist`);

      assert(fs.existsSync(DIAGRAMS), `'${DIAGRAMS}' folder should be created`);

      assert(
        fs.existsSync(DOCKER_COMPOSE),
        `'${DOCKER_COMPOSE}' file should exist`
      );

      const dockerCompose = yaml.safeLoad(
        fs.readFileSync(DOCKER_COMPOSE, "utf8")
      );

      expect(dockerCompose.services).to.be.an("object");
      expect(dockerCompose.services).to.have.all.keys([
        "blockdiag",
        "kroki",
        "mermaid",
        "pandoc"
      ]);
    });
  });
});
