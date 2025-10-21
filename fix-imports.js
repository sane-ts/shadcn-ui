import fs from "node:fs";

const targetDir = import.meta.dirname + "/src/components/ui";
const files = fs.readdirSync(targetDir);

files.forEach((file) => {
  const fullPath = `${targetDir}/${file}`;
  const content = fs.readFileSync(fullPath).toString();
  const newContent = content
    .split("\n")
    .map((l) =>
      l.startsWith("import ") || l.startsWith('} from "#/')
        ? l.replaceAll(' from "#/', ' from "#')
        : l,
    )
    .join("\n");
  fs.writeFileSync(fullPath, newContent);
});

const uiContent = files
  .map((name) => `export * from "#components/ui/${name.slice(0, -4)}";`)
  .join("\n");
fs.writeFileSync(import.meta.dirname + "/src/ui.ts", uiContent);
