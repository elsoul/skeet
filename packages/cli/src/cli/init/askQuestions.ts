import inquirer from 'inquirer'
import { questionList } from './questionList'

export const askForProjectId = async () => {
  const projectInquirer = inquirer.prompt(questionList.projectQuestions)
  let projectId = ''
  let fbProjectId = ''
  let region = ''
  await projectInquirer.then(async (answer) => {
    projectId = answer.projectId
    region = answer.region
    fbProjectId = answer.fbProjectId
  })
  return { projectId, region, fbProjectId }
}

export const askForProjectIdAndRegion = async () => {
  const projectInquirer = await inquirer.prompt<{
    projectId: string
    region: string
  }>(questionList.projectRegionQuestions)
  return projectInquirer
}

export const askForSqlPassword = async () => {
  const { password1, password2 } = await inquirer.prompt<{
    password1: string
    password2: string
  }>(questionList.sqlPasswordQuestions)
  if (password1 !== password2) {
    console.log('Password does not match!\nPlease try again.')
    await askForSqlPassword()
  }

  return password1
}

export const askForGithubRepo = async () => {
  const githubRepoInquirer = inquirer.prompt(questionList.githubRepoQuestions)
  let githubRepo = ''
  await githubRepoInquirer.then(async (githubAnswer) => {
    githubRepo = githubAnswer.githubRepo
  })
  return githubRepo
}

export const askForNeedDomain = async () => {
  const needDomainInquirer = inquirer.prompt(questionList.needDomainQuestions)
  let isNeedDomain = 'no'
  await needDomainInquirer.then(async (needDomainAnswer) => {
    isNeedDomain = needDomainAnswer.isNeedDomain
  })
  return isNeedDomain
}

export type DomainAnswer = {
  isDomain: boolean
  appDomain: string
  nsDomain: string
  lbDomain: string
}
