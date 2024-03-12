import { readFile, writeFile } from 'fs/promises'
import { ModeFrequency } from './modeSelect'

export const incrementModeFrequency = async (
  modeKey: keyof ModeFrequency,
): Promise<void> => {
  const filePath = `./tmp/modeFrequency.json`

  const modeFrequency: ModeFrequency = JSON.parse(
    await readFile(filePath, 'utf8'),
  )

  if (modeFrequency[modeKey] !== undefined) {
    modeFrequency[modeKey] += 1
  } else {
    modeFrequency[modeKey] = 1
  }
  await writeFile(filePath, JSON.stringify(modeFrequency, null, 2), 'utf8')
}
