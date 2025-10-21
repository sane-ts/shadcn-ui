set -e

rm -rf dist
pnpm tsc

cp README.md dist/README.md
cp src/index.css dist/src/index.css
cat package.json | jq -r '.imports = { "#*": "./src/*.js" }' > dist/package.json
