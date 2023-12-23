import inquirer from 'inquirer'
import { questionList } from './questionList'

export const askForProjectIdForProfile = async () => {
  const projectInquirer = inquirer.prompt(questionList.projectQuestions)
  let projectId = ''
  let fbProjectId = ''
  await projectInquirer.then(async (answer) => {
    projectId = answer.projectId
    fbProjectId = answer.fbProjectId
  })
  return { projectId, fbProjectId }
}

export const askForProjectProfile = async () => {
  const projectInquirer = inquirer.prompt(questionList.profileQuestions)
  let profile = ''
  await projectInquirer.then(async (answer) => {
    profile = answer.profile
  })
  return { profile }
}
