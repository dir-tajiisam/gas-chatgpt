# Setup Log

```sh
# node
nodenv install 18.16.0
nodenv local 18.16.0
nodenv rehash
. ~/.zshrc
node -v
npm install --location=global @google/clasp
npm install --location=global \
  ts-lint@4.5.1 \
  ts-node@10.9.1 \
  typescript@5.1.6 \
  typesync@0.11.1
# Optional
# export NODE_TLS_REJECT_UNAUTHORIZED=0

. ~/.zshrc
```

```sh
npx tsc --init
npm i -D @types/google-apps-script
clasp login
ls ~/.clasprc.json

npm i -D rollup
# 必要な依存関係を解決する (上記のjs内で使ってるplugin等々)
npm i -D @rollup/plugin-babel @rollup/plugin-node-resolve @babel/preset-env @babel/preset-typescript @babel/plugin-transform-runtime
```
