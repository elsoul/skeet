import { spawnSync } from 'child_process'
import { SKEET_CONFIG_CLOUD_PATH } from '@/config/config'
import chalk from 'chalk'

export const firebasePruneSecret = async () => {
  const command = [
    'firebase',
    'functions:secrets:prune',
    '--project',
    'skeet-framework',
  ]

  spawnSync(command[0], command.slice(1), {
    stdio: 'inherit',
    shell: true,
  })

  console.log(
    chalk.yellow(`⚠️ Please remove the secret keys if you delete them.`),
  )
  console.log(chalk.white(`\nConfig Path: ${SKEET_CONFIG_CLOUD_PATH}`))
}

const extractUniqueKeys = (output: string): string[] => {
  const keyVersionPattern = /(\w+)@\d+/g
  const matches = output.match(keyVersionPattern) || []
  const uniqueKeys = Array.from(
    new Set(matches.map((match) => match.split('@')[0])),
  )
  return uniqueKeys
}
