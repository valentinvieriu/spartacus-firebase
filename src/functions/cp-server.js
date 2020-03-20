const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
(async () => {
  const mainRoot = "dist/mystore/server";
  fs.mkdirSync(`functions/${mainRoot}`, { recursive: true });
  writeFileAsync(
    `functions/${mainRoot}/main.js`,
    await readFileAsync(`${mainRoot}/main.js`)
  );

  const indexRoot = "dist/mystore/browser";
  fs.mkdirSync(`functions/${indexRoot}`, { recursive: true });
  writeFileAsync(
    `functions/${indexRoot}/index.html`,
    await readFileAsync(`${indexRoot}/index.html`)
  );
})();
