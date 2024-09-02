
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://0.0.0.0:1337/graphql",
  documents: "graphql/**/*.ts",
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: []
    }
  },
  ignoreNoDocuments: true,
};

export default config;
