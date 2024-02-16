export const firestoreIndexesJson = async (appName: string) => {
  const filePath = `${appName}/firestore.indexes.json`
  const body = `{
    "indexes": [],
    "fieldOverrides": []
  }`
  return {
    filePath,
    body,
  }
}
