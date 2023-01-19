"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const luxon_1 = require("luxon");
const MAKEFILE = "Makefile";
const METADATA = "metadata.yaml";
const DOCKER_COMPOSER = "docker-compose.yaml";
const REPORT = "report.md";
const README = "README.md";
class ReportGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.composeWith(require.resolve("../app"));
    }
    writing() {
        this.fs.copyTpl(this.templatePath(`${MAKEFILE}.ejs`), this.destinationPath(MAKEFILE));
        this.fs.copyTpl(this.templatePath(`${DOCKER_COMPOSER}.ejs`), this.destinationPath(DOCKER_COMPOSER));
        this.fs.copyTpl(this.templatePath(`${METADATA}.ejs`), this.destinationPath(METADATA), {
            reportDate: luxon_1.DateTime.local().toLocaleString(luxon_1.DateTime.DATE_FULL)
        });
        this.fs.copy(this.templatePath(`${REPORT}.ejs`), this.destinationPath(REPORT));
        this.fs.copy(this.templatePath(`${README}.ejs`), this.destinationPath(README));
    }
}
exports.default = ReportGenerator;
;
//# sourceMappingURL=index.js.map