const Generator = require("yeoman-generator");
const { DateTime } = require("luxon");

const MAKEFILE = "Makefile";
const METADATA = "metadata.yaml";
const DOCKER_COMPOSER = "docker-compose.yaml";
const REPORT = "report.md";

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.composeWith(require.resolve('../app'));
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(`${MAKEFILE}.ejs`),
      this.destinationPath(MAKEFILE)
    );

    this.fs.copyTpl(
      this.templatePath(`${DOCKER_COMPOSER}.ejs`),
      this.destinationPath(DOCKER_COMPOSER)
    );

    this.fs.copyTpl(
      this.templatePath(`${METADATA}.ejs`),
      this.destinationPath(METADATA),
      {
        reportDate: DateTime.local().toLocaleString(DateTime.DATE_FULL)
      }
    );

    this.fs.copy(
      this.templatePath(`${REPORT}.ejs`),
      this.destinationPath(REPORT)
    );
  }
};
