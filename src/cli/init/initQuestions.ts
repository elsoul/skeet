import inquirer from 'inquirer'
import { regionList } from './regionList'
import chalk from 'chalk'
import { Logger } from '@/lib/logger'

export module InitQuestions {
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

  export const domainQuestions = [
    {
      type: 'input',
      name: 'githubRepo',
      message: "What's your GitHub Repo Name",
      validate: InitQuestions.requireRepoName,
      default() {
        return 'elsoul/skeet-app'
      },
    },
    {
      type: 'input',
      name: 'nsDomain',
      message: "What's your domain address for DNS",
      validate: InitQuestions.requireDomainName,
      default() {
        return 'skeet.dev'
      },
    },
    {
      type: 'input',
      name: 'lbDomain',
      message: "What's your subdomain address for Load Balancer",
      validate: InitQuestions.requireDomainName,
      default() {
        return 'lb.skeet.dev'
      },
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
