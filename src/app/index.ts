import Generator from "yeoman-generator";
import yosay from "yosay";
import chalk from "chalk";

export default class App extends Generator {
  constructor(args: any, opts: any) {
    super(args, opts);

    this.argument("projectName", { type: String, required: true });
  }

  async prompting() {
    this.log(
      yosay(`Welcome to the spectacular ${chalk.red("skjöl")} generator!`)
    );
  }
}
