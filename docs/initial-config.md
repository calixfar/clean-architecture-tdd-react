npm i -D git-commit-msg-linter
npm i -D typescript @types/node

```json
{
  "compilerOptions": {
    "target": "es6",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "jsx": "react",
    "rootDir": "src",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    },
    "allowJs": true,
    "resolveJsonModule": true
  },
  "include": [
    "src"
  ]
}

```

npm i -D eslint eslint-config-standard-with-typescript
npm i -D eslint eslint-config-standard-with-typescript@11 eslint-plugin-import eslint-plugin-promise eslint-plugin-standard @typescript-eslint/eslint-plugin