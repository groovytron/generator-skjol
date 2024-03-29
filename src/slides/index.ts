import Generator from "yeoman-generator";
import { DateTime } from "luxon";
import path from "path";
import { getDirname } from "../utils";

const MAKEFILE = "Makefile";
const SLIDES_MD = "slides.md";
const METADATA = "metadata.yaml";
const README = "README.md";
const GITIGNORE = ".gitignore";

const BLACK_THEME = "black";

const THEMES = [
  "beige",
  BLACK_THEME,
  "blood",
  "league",
  "moon",
  "night",
  "serif",
  "simple",
  "sky",
  "solarized",
  "white"
];

const NO_TRANSITION = "none";

const TRANSITIONS = [
  NO_TRANSITION,
  "fade",
  "slide",
  "convex",
  "concave",
  "zoom"
];

const REVEALJS_VERSION = "^4.4.0";
const DECKTAPE_VERSION = "^3.5.0";

interface Answers {
  theme: string;
  transition: string;
  showSlideNumbers: boolean;
}

export default class SlidesGenerator extends Generator {
  private answers: Answers | undefined;

  constructor(args: any, opts: any) {
    super(args, opts);

    this.argument("projectName", { type: String, required: true });

    this.destinationRoot(this.destinationPath(this.options.projectName));

    this.composeWith(path.resolve(getDirname(import.meta.url), "../app"), {
      arguments: [this.options.projectName]
    });
  }

  async prompting() {
    const prompts: Generator.Question[] = [
      {
        type: "list",
        name: "theme",
        message: "Choose your reveal.js theme for your slides:",
        choices: THEMES.map(themeItem => {
          return {
            name: themeItem,
            value: themeItem
          };
        }),
        default: BLACK_THEME
      },
      {
        type: "list",
        name: "transition",
        message: "Choose your reveal.js transition for your slides:",
        choices: TRANSITIONS.map(transitionItem => {
          return {
            name: transitionItem,
            value: transitionItem
          };
        }),
        default: NO_TRANSITION
      },
      {
        type: "confirm",
        name: "showSlideNumbers",
        message: "Do you want to display slide numbers ?",
        default: true
      }
    ];

    this.answers = await this.prompt<Answers>(prompts);
  }

  writing() {
    const packageJson = {
      dependencies: {
        decktape: DECKTAPE_VERSION,
        "reveal.js": REVEALJS_VERSION
      }
    };

    const answers = this.answers as Answers;

    this.fs.copyTpl(
      this.templatePath(`${MAKEFILE}.ejs`),
      this.destinationPath(MAKEFILE),
      {
        theme: answers.theme,
        transition: answers.transition,
        showSlideNumbers: answers.showSlideNumbers
      }
    );

    this.fs.copyTpl(
      this.templatePath(`${METADATA}.ejs`),
      this.destinationPath(METADATA),
      {
        slidesDate: DateTime.local().toLocaleString(DateTime.DATE_FULL)
      }
    );

    this.fs.copyTpl(
      this.templatePath(`${SLIDES_MD}.ejs`),
      this.destinationPath(SLIDES_MD)
    );

    this.fs.extendJSON(this.destinationPath("package.json"), packageJson);

    this.fs.copyTpl(
      this.templatePath(`${README}.ejs`),
      this.destinationPath(README)
    );

    this.fs.copyTpl(
      this.templatePath(`${GITIGNORE}.ejs`),
      this.destinationPath(GITIGNORE)
    );
  }

  install() {
    this.spawnCommand("npm", ["install"], {
      cwd: this.destinationPath()
    });
  }
}
