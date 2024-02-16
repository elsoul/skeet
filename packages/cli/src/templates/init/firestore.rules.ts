export const firestoreRules = async (appName: string) => {
  const filePath = `${appName}/firestore.rules`
  const body = `rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if false;
      }
    }
  }`
  return {
    filePath,
    body,
  }
}
