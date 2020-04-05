const Generator = require("yeoman-generator");

const KROKI_VERSION = "0.0.12";
const MAKEFILE = "Makefile";
const DIAGRAMS = "diagrams";
const DOCKER_COMPOSER = "docker-compose.yaml";
const WAIT_FOR_IT = "wait-for-it.sh";

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(`${MAKEFILE}.ejs`), 
      this.destinationPath(MAKEFILE),
    );

    this.fs.copy(
      this.templatePath(DIAGRAMS), 
      this.destinationPath(DIAGRAMS),
    );

    this.fs.copyTpl(
      this.templatePath(`${DOCKER_COMPOSER}.ejs`), 
      this.destinationPath(DOCKER_COMPOSER),
      {
        kroki_version: KROKI_VERSION,
      }
    );

    this.fs.copyTpl(
      this.templatePath(`${WAIT_FOR_IT}`), 
      this.destinationPath(WAIT_FOR_IT),
    );
  }
};