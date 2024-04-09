import inquirer from 'inquirer'
import { questionList } from './questionList'

export const askForProjectIdAndRegion = async () => {
  const projectInquirer = await inquirer.prompt<{
    projectId: string
    region: string
  }>(questionList.projectRegionQuestions)
  return projectInquirer
}

export const askForSqlPassword = async () => {
  const { password1, password2, username } = await inquirer.prompt<{
    username: string
    password1: string
    password2: string
  }>(questionList.sqlPasswordQuestions)
  if (password1 !== password2) {
    console.log('Password does not match!\nPlease try again.')
    await askForSqlPassword()
  }

  return {
    username,
    password: password1,
  }
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
  appDomain: string
  nsDomain: string
  lbDomain: string
}
