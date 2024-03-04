import { copyFile, unlink } from 'fs/promises'
import { Logger } from '@/lib/logger'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'

export const copyFileWithOverwrite = async (
  sourceFilePath: string,
  destinationFilePath: string,
): Promise<void> => {
  try {
    if (await checkFileDirExists(destinationFilePath)) {
      await unlink(destinationFilePath)
    }
    await copyFile(sourceFilePath, destinationFilePath)
    Logger.successCheck(`File copied: ${destinationFilePath}`)
  } catch (error) {
    console.error('Error copying file:', error)
  }
}
