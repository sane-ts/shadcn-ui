set -e

rm -rf src/components src/hooks

# https://ui.shadcn.com/docs/installation/manual

mv package.json package.json.bak
cat package.json.bak | jq '.dependencies = {}' > package.json
rm package.json.bak
pnpm install

pnpm add class-variance-authority clsx tailwind-merge lucide-react tw-animate-css @tailwindcss/typography
pnpx shadcn@latest add --all
pnpx shadcn@latest migrate radix -y

node fix-imports.js
pnpm tsc --noEmit
