export const addSecret = (key: string, value: string) => {
  const cmd = `firebase functions:config:set ${key}="${value}"`
}
