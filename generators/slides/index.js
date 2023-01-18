const Generator = require("yeoman-generator");
const { DateTime } = require("luxon");

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

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.composeWith(require.resolve("../app"));
  }

  async prompting() {
    this.answers = await this.prompt([
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
    ]);
  }

  writing() {
    const packageJson = {
      dependencies: {
        "reveal.js": "^4.0.2"
      }
    };

    this.fs.copyTpl(
      this.templatePath(`${MAKEFILE}.ejs`),
      this.destinationPath(MAKEFILE),
      {
        theme: this.answers.theme,
        transition: this.answers.transition,
        showSlideNumbers: this.answers.showSlideNumbers
      }
    );

    this.fs.copyTpl(
      this.templatePath(`${METADATA}.ejs`),
      this.destinationPath(METADATA),
      {
        author: this.answers.author,
        subtitle: this.answers.subtitle,
        title: this.answers.title,
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
    this.npmInstall();
  }
};
