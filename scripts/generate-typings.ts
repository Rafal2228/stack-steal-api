import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { resolve } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: [root('src/schemas/*.graphql')],
  path: root('src/graphql.schema.ts'),
  outputAs: 'class',
  debug: false,
});

function root(...paths: string[]) {
  return resolve(process.cwd(), ...paths);
}
