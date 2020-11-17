const Generator = require("yeoman-generator");
const yosay = require("yosay");
const chalk = require("chalk");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    this.log(
      yosay(`Welcome to the spectacular ${chalk.red("skjöl")} generator!`)
    );
  }
};
