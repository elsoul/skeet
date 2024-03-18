export const genEnvProduction = async (
  instanceName: string,
  databaseIp: string,
  encodedPassword: string,
) => {
  const secretKeyName =
    'DATABASE_PRODUCTION_URL_' + instanceName.toUpperCase().replaceAll('-', '_')
  const databaseUrlValue = `postgresql://postgres:${encodedPassword}@${databaseIp}:5432/${instanceName}?schema=public\n`
  const result = {
    key: secretKeyName,
    value: databaseUrlValue,
  }
  return result
}
