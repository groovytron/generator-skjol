import Generator from "yeoman-generator";
import { DateTime } from "luxon";
import path from "path";
import { getDirname } from "../utils";

const MAKEFILE = "Makefile";
const METADATA = "metadata.yaml";
const DOCKER_COMPOSER = "docker-compose.yaml";
const REPORT = "report.md";
const README = "README.md";

export default class ReportGenerator extends Generator {
  constructor(args: any, opts: any) {
    super(args, opts);

    this.composeWith(path.resolve(getDirname(import.meta.url), "../app"));
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

    this.fs.copy(
      this.templatePath(`${README}.ejs`),
      this.destinationPath(README)
    );
  }
}
