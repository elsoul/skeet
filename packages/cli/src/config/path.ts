export enum PATH {
  MODEL = 'common/models',
  TYPE = 'common/types',
  FUNCTION = './functions',
  SQL = './sql',
  GRAPHQL = './graphql',
  FIREBASE_USERS = './tmp/users.json',
  TMP = './tmp',
}

export enum FILE_NAME {
  ENV = '.env',
  ENV_BUILD = '.env.build',
  ENV_PRODUCTION = '.env.production',
  FIREBASE_CONFIG = 'firebase.json',
  FIREBASE_RC = '.firebaserc',
  PRISMA_SCHEMA = 'schema.prisma',
}

export const getPrismaPath = (sqlName: string) => {
  return `${PATH.SQL}/${sqlName}/prisma/${FILE_NAME.PRISMA_SCHEMA}`
}
