"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const yosay = require("yosay");
const chalk = require("chalk");
class App extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }
    async prompting() {
        this.log(yosay(`Welcome to the spectacular ${chalk.red("skjöl")} generator!`));
    }
}
exports.default = App;
;
//# sourceMappingURL=index.js.map