import { existsAsync } from '@skeet-framework/utils'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { ModeFrequency, defaultModeFrequency } from './modeSelect'

export const createOrReadModeFrequency = async () => {
  const filePath = `./tmp/modeFrequency.json`
  if (await existsAsync(filePath)) {
    const modeFrequency: ModeFrequency = JSON.parse(
      await readFile(filePath, 'utf8'),
    )
    const sortedKeys = Object.entries(modeFrequency)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0])
    return sortedKeys
  } else {
    const tmp = './tmp'
    if (!(await existsAsync(tmp))) {
      await mkdir(tmp)
    }
    const body = JSON.stringify(defaultModeFrequency, null, 2)
    await writeFile(filePath, body, 'utf8')
    return Object.keys(defaultModeFrequency)
  }
}
