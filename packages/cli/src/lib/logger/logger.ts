import chalk from 'chalk'
import { Spinner } from 'cli-spinner'
import { spinnerPattern } from './spinnerList'
import { questionList } from '@/cli/init/questionList'

export module Logger {
  export const successHex = chalk.hex('#39A845')
  export const warningHex = chalk.hex('#FFD02E')
  export const errorHex = chalk.hex('#B5332E')
  export const syncHex = chalk.hex('#3073B7')
  export const greyHex = chalk.hex('#BEBDBD')
  export const indigoHex = chalk.hex('#3950A0')
  export const pinkHex = chalk.hex('#D8A1C4')

  export const syncSpinner = (text: string) => {
    const spinnerEmoji =
      spinnerPattern[Math.floor(Math.random() * spinnerPattern.length)]
    const spinner = new Spinner(
      ` ${spinnerEmoji.left} ` + chalk.white(text) + ` %s`,
    )
    try {
      spinner.setSpinnerString(18)
      spinner.start()
      return spinner
    } catch (error) {
      spinner.stop(true)
      throw new Error(`syncSpinner Error: ${error}`)
    }
  }

  export const normal = (text: string) => {
    console.log(chalk.white(text))
  }

  export const success = (text: string) => {
    console.log(successHex(text))
  }

  export const warning = (text: string) => {
    console.log(warningHex(text))
  }

  export const error = (text: string) => {
    console.log(errorHex(text))
  }

  export const errorString = (text: string) => {
    return errorHex(text)
  }

  export const sync = (text: string) => {
    console.log(syncHex(text))
  }

  export const grey = (text: string) => {
    console.log(greyHex(text))
  }

  export const successCheck = (text: string) => {
    const check = successHex('✔')
    const plainText = chalk.white(text)
    const textLog = `${check} ${plainText} 🎉`
    console.log(textLog)
  }

  export const skeetAA = () => {
    const row1SKEE = Logger.syncHex('   _____ __ __ ____________')
    const row1T = Logger.errorHex('______')
    const row2SKEE = Logger.syncHex('  / ___// //_// ____/ ____/')
    const row2T = Logger.errorHex('_  __/')
    const row3SKEE = Logger.syncHex('  \\__ \\/ ,<  / __/ / __/ ')
    const row3T = Logger.errorHex('  / / ')
    const row4SKEE = Logger.syncHex(' ___/ / /| |/ /___/ /___ ')
    const row4T = Logger.errorHex(' / /    ')
    const row5SKEE = Logger.syncHex('/____/_/ |_/_____/_____/')
    const row5T = Logger.errorHex(' /_/    🛠️🛠️')
    console.log(`\n${row1SKEE}${row1T}`)
    console.log(`${row2SKEE}${row2T}`)
    console.log(`${row3SKEE}${row3T}`)
    console.log(`${row4SKEE}${row4T}`)
    console.log(`${row5SKEE}${row5T}`)
  }

  export const welcomText2 = (appName: string) => {
    const title = warningHex(
      '\n⚡⚡⚡ Buidl TypeScript Fullstack App Fast ⚡⚡⚡',
    )
    const text = `
$ cd ${appName}
$ skeet init

You can ask AI Assistant for help

$ skeet ai --help`

    console.log(title)
    console.log(greyHex(text))
  }

  export const welcomText = (appName: string) => {
    const title = warningHex(
      '\n⚡⚡⚡ Buidl TypeScript Fullstack App Fast ⚡⚡⚡',
    )
    const text = `$ skeet new
$ cd ${appName}
$ skeet init
$ skeet s
View Emulator UI at : ${chalk.underline('http://127.0.0.1:4000/')}`

    console.log(title)
    console.log(greyHex(text))
  }

  export const cmText = () => {
    const text = `
    💃🤝🕺 We Support OpenSource Software Comunities 💃🤝🕺
  Why?  - OpenSouce Software Comunities should be deserved more 💎
  How?  - Incentivize for OpenSource Software Developments 💰
  What? - Play Game as Dev / Degen / Investor 🛠️
  Epics Beta: ${chalk.underline('https:/app.epics.dev/')}
  `
    console.log(successHex(text))
  }

  export const projectIdNotExistsError = (projectId: string) => {
    try {
      Logger.warning('⚠️ Project ID with that name does not exist ⚠️\n')
      Logger.normal(
        `Please check the project ID from Google Cloud. \n\nex) \`skeet-app\` might be \`skeet-app-123456\`.`,
      )
    } catch (error) {
      console.error(`projectIdNotExistsError: ${error}`)
    }
  }

  export const billingNotEnabledError = (projectId: string) => {
    try {
      Logger.warning('⚠️ Billing is not enabled for this project ⚠️\n')
      Logger.normal(
        `Please enable billing from Google Cloud. \n\nPlease Visit: https://cloud.google.com/billing/docs/how-to/modify-project#enable_billing_for_a_project\n`,
      )
      throw new Error(`Billing is not enabled for ${projectId}`)
    } catch (error) {
      throw new Error(`billingNotEnabledLog: ${error}`)
    }
  }

  export const dnsSetupLog = (
    nameServerAddresses: Array<string>,
    lbIp: string,
  ) => {
    Logger.warning(
      '🚸 === Copy & Paste below nameServer addresses to your DNS Setting === 🚸\n',
    )
    const exportLog = `${nameServerAddresses.join('\n')}\n`
    Logger.normal(exportLog)
    // Logger.warning('🚸 =========           END           ========= 🚸\n\n')

    Logger.warning(
      '👷 === https will be ready in about an hour after your DNS settings === 👷\n',
    )
    const content = `If you are not utilizing Google DNS, it is necessary to manually configure the A and CAA records.
Please set up the three records listed below:

DNS Records Setup:
--------------------------------
1. A Record:
   Address: ${lbIp}

2. CAA Records:
   - 0 issue "pki.goog"
   - 0 issue "letsencrypt.org"`
    Logger.normal(content)
    Logger.successCheck(`\nYou are all set`)
    Logger.normal(`\n📗 Doc: https://skeet.dev`)
  }

  export const confirmIfFirebaseSetupLog = (
    projectId: string,
    template: string,
  ) => {
    Logger.warning(
      `\n⚠️ Please make sure if you create Firestore & FirebaseAuth ⚠️\n`,
    )
    Logger.normal(`Click the link to check 👇`)

    Logger.normal(
      `Firestore: https://console.firebase.google.com/project/${projectId}/firestore`,
    )
    Logger.normal(
      `Firebase Auth: https://console.firebase.google.com/project/${projectId}/authentication\n`,
    )
    Logger.normal(
      `Cloud Storage: https://console.firebase.google.com/project/${projectId}/storage\n`,
    )
    Logger.normal(`📗 Doc: https://skeet.dev/doc/backend/initial-deploy/\n`)
  }

  export const confirmFirebaseSetup = async (
    projectId: string,
    template: string,
  ) => {
    Logger.confirmIfFirebaseSetupLog(projectId, template)
    await questionList.checkIfFirebaseSetup(projectId)
  }
}
