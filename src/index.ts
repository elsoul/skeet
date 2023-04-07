import Dotenv from 'dotenv'
import { Command } from 'commander'
import fs from 'fs'
import { VERSION } from '@/lib/version'
import { init, setupIam, setupNetwork } from './cli'

export type SkeetCloudConfig = {
  api: GCPConfig
  cloudArmor?: CloudArmor
}

export type GCPConfig = {
  appName: string
  projectId: string
  region: string
  cloudRun: CloudRunConfig
}

export type CloudRunConfig = {
  name: string
  url: string
  cpu: number
  memory: string
  maxConcurrency: number
  minInstances: number
  maxInstances: number
}

export type CloudArmor = Array<SecurityPolicy>

export type SecurityPolicy = {
  securityPolicyName: string
  rules: [
    {
      priority: string
      description: string
      options: { [key: string]: string }
    }
  ]
}

export enum ArmorAction {
  ALLOW = 'allow',
  DENY1 = 'deny-403',
  DENY2 = 'deny-404',
  DENY3 = 'deny-429',
  DENY4 = 'deny-502',
  REDIRECT = 'redirect',
}

export const importConfig = async () => {
  try {
    const config = fs.readFileSync(`${process.cwd()}/skeet-cloud.config.json`)
    const json: SkeetCloudConfig = JSON.parse(String(config))
    return json
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const program = new Command()

program.name('skeet').description('CLI to skeet framework').version(VERSION)

Dotenv.config()

async function main() {
  try {
    program
      .command('init')
      .description('Deploy skeet AI Kit to Google Cloud Platform')
      .action(async () => {
        await init()
      })
    program
      .command('iam')
      .description('Setup IAM for Google Cloud Platform')
      .action(async () => {
        await setupIam()
      })
    program
      .command('vpc')
      .description('Setup VPC for Google Cloud Platform')
      .action(async () => {
        await setupNetwork()
      })
    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
