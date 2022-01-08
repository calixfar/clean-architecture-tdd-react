npm i -D git-commit-msg-linter
npm i -D typescript @types/node


Create tsconfig.json file and add the next json
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
npm i -D eslint eslint-config-standard-with-typescript@11 eslint-plugin-import eslint-plugin-promise eslint-plugin-standard @typescript-eslint/eslint-plugin eslint-plugin-node

Create .eslint.json file and add the next json

```json
{
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": [
    "standard-with-typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended"
    
  ],
  "plugins": ["react"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
}
```

Create .eslintignore file and add the same lines that .gitignore file

npm i -D lint-staged husky

create .lintstagedrc.json

Add next json

```json
{
  "*.{ts,tsx}": [
    "eslint 'src/** --fix'"
  ]
}
```

- npx husky install
- touch pre-commit.sh in folder in .husky
-Add next code 
```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"