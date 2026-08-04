import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const temporaryDirectory = mkdtempSync(join(tmpdir(), "ununique-design-system-web-"));
const packageName = "@escaperoomengs/ununique-design-system-web";

function run(command, arguments_, workingDirectory) {
  return execFileSync(command, arguments_, { cwd: workingDirectory, encoding: "utf8", stdio: "pipe" });
}

try {
  const [packedPackage] = JSON.parse(run("npm", ["pack", "--json", "--pack-destination", temporaryDirectory], repositoryRoot));
  const tarballPath = join(temporaryDirectory, packedPackage.filename);

  writeFileSync(join(temporaryDirectory, "package.json"), JSON.stringify({ private: true, type: "module" }));
  run("npm", ["install", tarballPath, "react@^19.2.8", "react-dom@^19.2.8"], temporaryDirectory);

  run(process.execPath, ["--input-type=module", "--eval", `import("${packageName}").then(({ Button, Dropdown }) => { if (typeof Button !== "function" || typeof Dropdown !== "function") process.exit(1); })`], temporaryDirectory);
  run(process.execPath, ["--eval", `const pkg = require("${packageName}"); if (typeof pkg.Button !== "function" || !require.resolve("${packageName}/styles.css")) process.exit(1);`], temporaryDirectory);

  const publishedCss = readFileSync(join(temporaryDirectory, "node_modules", "@escaperoomengs", "ununique-design-system-web", "dist", "styles.css"), "utf8");
  const hasBrandIconUtility = [...publishedCss.matchAll(/([^{}]+)\{color:var\(--uui-semantic-text-brand\)\}/g)]
    .some(([, selectors]) => selectors.split(",").includes(".text-uui-icon-brand"));
  if (!hasBrandIconUtility) {
    throw new Error("Published CSS is missing the text-uui-icon-brand semantic utility");
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
