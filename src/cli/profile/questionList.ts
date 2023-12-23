export module questionList {

  export const projectQuestions = [
    {
      type: 'input',
      name: 'projectId',
      message: "What's your GCP Project ID",
      default() {
        return 'skeet-app-123456'
      },
    },
    {
      type: 'input',
      name: 'fbProjectId',
      message: "What's your Firebase Project ID",
      default() {
        return 'skeet-app-123456'
      },
    },
  ]

  export const profileQuestions = [
    {
      type: 'input',
      name: 'profile',
      message: "What's your Environment Profile Name. (ex: dev, staging, prod)",
      default() {
        return 'dev'
      },
    },
  ]
}
