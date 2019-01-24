const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const { writeFileSync } = require('fs');
const { join } = require('path');

function mergeTypeDefinitions(path) {
  const typesArray = fileLoader(join(__dirname, path), {
    extensions: ['.gql'],
    recursive: true
  });

  return mergeTypes(typesArray, { all: true });
}

function clearSchema(path) {
  writeFileSync(join(__dirname, path), '');
}

function writeSchema(path, typeDefs) {
  writeFileSync(join(__dirname, path), typeDefs);
}

function mergeSchemaAndWriteToFile(typeDefsPath, schemaOutputPaths) {
  try {
    schemaOutputPaths.forEach((path) => {
      clearSchema(path);
      writeSchema(path, mergeTypeDefinitions(typeDefsPath));
    });

    return true;
  } catch (err) {
    throw err;
  }
}

mergeSchemaAndWriteToFile('../src/graphql', [
  '../dist/graphql/schema.graphql',
  '../src/graphql/schema.graphql'
]);
