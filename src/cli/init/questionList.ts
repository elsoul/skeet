import inquirer from 'inquirer'
import { regionList } from './regionList'
import chalk from 'chalk'
import { Logger } from '@/lib'
import { SkeetTemplate } from '@/types/skeetTypes'

export module questionList {
  export const requireRepoName = (value: string) => {
    if (/.+\/.+/.test(value)) {
      return true
    }

    return 'This is not GitHub Repo Name!It must be repoOwner/repoName'
  }

  export const requireDomainName = (value: string) => {
    if (/.+\..+/.test(value)) {
      return true
    }

    return 'This is not Domain Name!It must be example.com'
  }

  export const requireLetterAndNumber = (value: string) => {
    if (/\w/.test(value) && /\d/.test(value)) {
      return true
    }

    return 'Password need to have at least a letter and a number'
  }

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
    {
      type: 'list',
      message: 'Select Regions to deploy',
      name: 'region',
      choices: [
        new inquirer.Separator(' 🌏 Regions 🌏 '),
        ...regionList.map((value) => ({ name: value })),
      ],
      validate(answer: string) {
        if (answer.length < 1) {
          return 'You must choose at least one service.'
        }

        return true
      },
    },
  ]

  export const projectRegionQuestions = [
    {
      type: 'input',
      name: 'projectId',
      message: "What's your GCP Project ID",
      default() {
        return 'skeet-app-123456'
      },
    },
    {
      type: 'list',
      message: 'Select Regions to deploy',
      name: 'region',
      choices: [
        new inquirer.Separator(' 🌏 Regions 🌏 '),
        ...regionList.map((value) => ({ name: value })),
      ],
      validate(answer: string) {
        if (answer.length < 1) {
          return 'You must choose at least one service.'
        }

        return true
      },
    },
  ]

  export const templateQuestions = [
    {
      type: 'list',
      message: 'Select Template of Skeet',
      name: 'template',
      choices: [
        new inquirer.Separator(' Templates '),
        { name: SkeetTemplate.NextJsGraphQL },
        { name: SkeetTemplate.NextJsFirestore },
        { name: SkeetTemplate.ExpoFirestore },
      ],
      validate(answer: string) {
        if (answer.length < 1) {
          return 'You must choose at least one template.'
        }
        return true
      },
    },
  ]

  export const needDomainQuestions = [
    {
      type: 'list',
      message: 'Do you want to setup your domain?',
      name: 'isNeedDomain',
      choices: [
        new inquirer.Separator(chalk.white()),
        ...['yes(needs your domain)', 'no'],
      ],
    },
  ]

  export const githubRepoQuestions = [
    {
      type: 'input',
      name: 'githubRepo',
      message: "What's your GitHub Repo Name",
      validate: questionList.requireRepoName,
      default() {
        return 'elsoul/skeet-app'
      },
    },
  ]

  export const domainQuestions = [
    {
      type: 'input',
      name: 'appDomain',
      message: "What's your domain address for App",
      validate: questionList.requireDomainName,
      default() {
        return 'app.skeet.dev'
      },
    },
    {
      type: 'input',
      name: 'nsDomain',
      message: "What's your domain address for Domain Name Server",
      validate: questionList.requireDomainName,
      default() {
        return 'skeet.dev'
      },
    },
    {
      type: 'input',
      name: 'lbDomain',
      message: "What's your subdomain address for Load Balancer",
      validate: questionList.requireDomainName,
      default() {
        return 'lb.skeet.dev'
      },
    },
  ]

  export const sqlPasswordQuestions = [
    {
      type: 'password',
      message: 'Enter your CloudSQL password',
      name: 'password1',
      mask: '*',
      validate: requireLetterAndNumber,
    },
    {
      type: 'password',
      message: 'Confirm your password',
      name: 'password2',
      mask: '*',
      validate: requireLetterAndNumber,
    },
  ]

  export const checkIfFirebaseSetup = async (projectId: string) => {
    try {
      const firebaseSettingsCheck = inquirer.prompt([
        {
          type: 'list',
          message: 'Are you sure if you already set them up?',
          name: 'firebase',
          choices: [new inquirer.Separator(chalk.white()), ...['yes', 'no']],
        },
      ])
      await firebaseSettingsCheck.then(async (answers) => {
        if (answers.firebase === 'no') {
          Logger.error(
            'Please setup Firestore before running this command. \nhttps://console.firebase.google.com/project/${projectId}/firestore'
          )
          throw new Error('Firestore is not setup')
        }
      })
    } catch (error) {
      throw new Error(`checkIfFirebaseSetup: ${error}`)
    }
  }
}
