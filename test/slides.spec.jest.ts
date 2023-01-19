// const helpers = require('yeoman-test');
import SlidesGenerator from '../src/slides/index'

// chai.use(chaiFiles);

const MAKEFILE = "Makefile";
const PACKAGE_JSON = "package.json";
const SLIDES_MD = "slides.md";
const METADATA = "metadata.yaml";
const README = "README.md";
const GITIGNORE = ".gitignore";

describe("Scaffold a slides documentation skeleton", () => {
  let runResult: any;
  // const runContext = new RunContext<SlidesGenerator>('../src/slides', {}, {})

  // beforeEach(async () => {
  //   runResult = await runContext
  //     // .create(
  //     //   '../src/slides',
  //     //   {},
  //     //   {}
  //     // )
  //     // .cd(dir)
  //     // .doInDir(dir => {})
  //     // .withGenerators([])
  //     // .withLookups({})
  //     // .withOptions({})
  //     // .withLocalConfig({})
  //     .withPrompts({
  //       showSlideNumber: true,
  //       theme: "black",
  //       transition: "zoom"
  //     })
  //     // .build(runContext => {
  //     //   [runContext.env][runContext.generator];
  //     // })
  //     .run();

  //   // // runResult.create().run();
  // });

  // afterEach(() => {
  //   if (runResult !== undefined) {
  //     runResult.restore();
  //   }
  // });

  it("should raise an error", () => {
    expect(false).toBeTruthy();
    // assert(false, "This assertion is false");
  });

  // it("should generate files", () => {

  //   assert(fs.existsSync(MAKEFILE), "Makefile file should be created");
  //   assert(fs.existsSync(PACKAGE_JSON), `'${PACKAGE_JSON}' file should exist`);

  //   const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, "utf8"));

  //   assert.isObject(
  //     packageJson.dependencies,
  //     `dependencies are not defined in ${PACKAGE_JSON}'`
  //   );
  //   assert(
  //     packageJson.dependencies["reveal.js"] !== undefined,
  //     `reveal.js dependency is not in '${PACKAGE_JSON}'`
  //   );
  //   assert(
  //     packageJson.dependencies["reveal.js"] === "^4.0.2",
  //     `reveal.js dependency version has changed`
  //   );

  //   assert(fs.existsSync(METADATA), `'${METADATA}' file should exist`);

  //   assert(fs.existsSync(SLIDES_MD), `'${SLIDES_MD}' file should exist`);

  //   assert(fs.existsSync(README), `'${README}' file should exist`);

  //   assert(fs.existsSync(GITIGNORE), `'${GITIGNORE}' file should exist`);

  //   console.log('SAPINNNNNNNNNNNNNNNNNNNNNNNNNNN');

  //   // return helpers
  //   //   .run(path.join(__dirname, "../generators/slides"))
  //   //   .withPrompts({
  //   //     showSlideNumber: true,
  //   //     theme: "black",
  //   //     transition: "zoom"
  //   //   })
  //   //   .then(() => {
  //   //     assert(fs.existsSync(MAKEFILE), "Makefile file should be created");
  //   //     assert(
  //   //       fs.existsSync(PACKAGE_JSON),
  //   //       `'${PACKAGE_JSON}' file should exist`
  //   //     );

  //   //     const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, "utf8"));

  //   //     assert.isObject(
  //   //       packageJson.dependencies,
  //   //       `dependencies are not defined in ${PACKAGE_JSON}'`
  //   //     );
  //   //     assert(
  //   //       packageJson.dependencies["reveal.js"] !== undefined,
  //   //       `reveal.js dependency is not in '${PACKAGE_JSON}'`
  //   //     );
  //   //     assert(
  //   //       packageJson.dependencies["reveal.js"] === "^4.0.2",
  //   //       `reveal.js dependency version has changed`
  //   //     );

  //   //     assert(fs.existsSync(METADATA), `'${METADATA}' file should exist`);

  //   //     assert(fs.existsSync(SLIDES_MD), `'${SLIDES_MD}' file should exist`);

  //   //     assert(fs.existsSync(README), `'${README}' file should exist`);

  //   //     assert(fs.existsSync(GITIGNORE), `'${GITIGNORE}' file should exist`);
  //   //   });
  // });
});
