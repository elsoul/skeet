export const databaseRulesJson = async (appName: string) => {
  const filePath = `${appName}/database.rules.json`
  const body = `{
    "rules": {
      ".read": false,
      ".write": false
    }
  }`
  return {
    filePath,
    body,
  }
}
