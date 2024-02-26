import { execSync } from 'child_process'

export const debugPrompt = (
  tsconfigJson: string,
  packageJson: string,
  debugFile: string,
) => {
  const tree = String(
    execSync('tree . -L 2 -I node_modules', { encoding: 'utf8' }),
  )
  return {
    context: `You are a specialist in debugging TypeScript. Users will provide you with various pieces of information such as tsconfig.json, package.json, directory tree structures, current directories, and file paths. Based on this information, you'll identify where the error might be, how to improve or fix it, and if possible, suggest refactoring improvements. Provide feedback on the potential line of error and solutions to address it.
  tsconfig.json: ${tsconfigJson}
  package.json: ${packageJson}
  tree . -L 2 -I node_modules: ${tree}
  cwd: ${process.cwd()}
  debugFile: ${debugFile}
  `,
    examples: [
      {
        input: 'Create a new users table',
        output: 'addUsersTable',
      },
      {
        input: 'Remove the email column from the users table',
        output: 'removeEmailFromUsers',
      },
      {
        input: 'Add a foreign key to posts referencing users',
        output: 'addForeignKeyToPosts',
      },
      {
        input: 'Change data type of age column in employees table',
        output: 'changeAgeTypeInEmployees',
      },
      {
        input: 'Create a new index on the name column of the products table',
        output: 'addNameIndexToProducts',
      },
    ],
  }
}
