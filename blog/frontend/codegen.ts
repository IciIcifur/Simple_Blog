import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8000/graphql/",
  documents: "src/**/*.graphql",
  generates: {
    "src/app/graphql-client.ts": {
      plugins: ["typescript"]
    },
    "src": {
      preset: 'near-operation-file',
      presetConfig: {extension: '.generated.ts', baseTypesPath: 'app/graphql-client.ts'},
      plugins:
        ["typescript-operations",
          "typescript-apollo-angular"],
      config:
        {skipTypename: true}
    }
  }
};

export default config;
