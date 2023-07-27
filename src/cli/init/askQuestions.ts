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

export const askForSqlPassword = async () => {
  const sqlPasswordInquirer = inquirer.prompt(questionList.sqlPasswordQuestions)
  let sqlPassword = ''
  await sqlPasswordInquirer.then(async (sqlPasswordAnswer) => {
    if (sqlPasswordAnswer.password1 !== sqlPasswordAnswer.password2)
      throw new Error("password doesn't match!")
    sqlPassword = sqlPasswordAnswer.password1
  })
  return sqlPassword
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

export const askForDomain = async () => {
  const domainInquirer = inquirer.prompt(questionList.domainQuestions)
  let isDomain = false
  let appDomain = ''
  let nsDomain = ''
  let lbDomain = ''
  await domainInquirer.then(async (domain) => {
    isDomain = domain.isDomain
    appDomain = domain.appDomain
    nsDomain = domain.nsDomain
    lbDomain = domain.lbDomain
  })
  return { isDomain, appDomain, nsDomain, lbDomain } as DomainAnswer
}
