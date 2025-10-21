set -e
docker compose down -v
docker compose up -d

bash build.bash

expect <<'EOF'
  spawn pnpm login --registry http://localhost:4873
  expect "Username:"
  send "test\r"
  expect "Password:"
  send "test\r"
  expect eof
EOF

cd dist
mv package.json package.json.tmp
cat package.json.tmp | jq -r '.version="0.0.1-verdaccio"' > package.json
rm package.json.tmp

pnpm publish --registry http://localhost:4873 --no-git-checks --tag verdaccio
