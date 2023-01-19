import Generator = require("yeoman-generator");
import yosay = require("yosay");
import chalk = require("chalk");

export default class App extends Generator {
  constructor(args: any, opts: any) {
    super(args, opts);
  }

  async prompting() {
    this.log(
      yosay(`Welcome to the spectacular ${chalk.red("skjöl")} generator!`)
    );
  }
};
