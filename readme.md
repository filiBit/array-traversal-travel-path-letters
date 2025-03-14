This is a solution to a code challenge from the "Software Sauna" company.

Here is the [original task](https://github.com/softwaresauna/code-challenge/blob/ba1340569178b36d3d16115dfd8a80baba391994/README.md).

## How to use

```mermaid
flowchart TD

step1["`npm run install`"]
step2a1[Use CLI]
step2a2[npm run travel &quot;&lt;string map&gt;&quot;]
step2b1[open src/index.js]
step2b2[Edit the &quot;STRING_MAP&quot; variable]
step2b3[npm run playground]
step2c1[Run tests]
step2c2[npm run test]
step3[Get the result]

step1-->step2a1--->step2a2-->step3
step1-->step2b1-->step2b2-->step2b3-->step3
step1-->step2c1--->step2c2-->step3
```

## Techstack

- node `v22.14.0`
- Javascript
- JSDoc
- Jest
