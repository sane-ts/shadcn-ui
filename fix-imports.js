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

const deleteCss = `
:root {
  --sidebar: hsl(0 0% 98%);
  --sidebar-foreground: hsl(240 5.3% 26.1%);
  --sidebar-primary: hsl(240 5.9% 10%);
  --sidebar-primary-foreground: hsl(0 0% 98%);
  --sidebar-accent: hsl(240 4.8% 95.9%);
  --sidebar-accent-foreground: hsl(240 5.9% 10%);
  --sidebar-border: hsl(220 13% 91%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
}

.dark {
  --sidebar: hsl(240 5.9% 10%);
  --sidebar-foreground: hsl(240 4.8% 95.9%);
  --sidebar-primary: hsl(224.3 76.3% 48%);
  --sidebar-primary-foreground: hsl(0 0% 100%);
  --sidebar-accent: hsl(240 3.7% 15.9%);
  --sidebar-accent-foreground: hsl(240 4.8% 95.9%);
  --sidebar-border: hsl(240 3.7% 15.9%);
  --sidebar-ring: hsl(217.2 91.2% 59.8%);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
const indexCss = fs.readFileSync("./index.css").toString();
fs.writeFileSync("./index.css", indexCss.replace(deleteCss, ""));
