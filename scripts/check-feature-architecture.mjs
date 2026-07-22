import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const featuresRoot = resolve("src/features");
const privateFeatureImport = /@\/features\/([^/]+)\/(?:components|hooks|lib)\//g;
const sourceExtension = /\.(?:ts|tsx)$/;
const testFile = /\.(?:test|spec)\.(?:ts|tsx)$/;

async function sourceFiles(directory) {
  const entries = await readdir(directory);
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry);
    return (await stat(path)).isDirectory() ? sourceFiles(path) : sourceExtension.test(path) && !testFile.test(path) ? [path] : [];
  }));
  return nested.flat();
}

try {
  const files = await sourceFiles(featuresRoot);
  const failures = [];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    const label = relative(featuresRoot, file);
    if (source.split("\n").length > 500) failures.push(`${label}: production feature modules must be 500 lines or fewer`);
    const owner = label.split("/")[0];
    for (const match of source.matchAll(privateFeatureImport)) {
      if (match[1] !== owner) failures.push(`${label}: import ${match[0]} through that feature's public index.ts instead`);
    }
  }
  if (failures.length) throw new Error(failures.join("\n"));
  console.log(`Feature architecture check passed (${files.length} production modules).`);
} catch (error) {
  if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
    console.log("Feature architecture check skipped: src/features does not exist yet.");
  } else {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
