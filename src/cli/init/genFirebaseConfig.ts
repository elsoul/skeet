import { Logger } from '@/lib/logger'
import fs from 'fs'
import { firebaseSdkConfig } from './firebaseSdkConfig'

export const genFirebaseConfig = async () => {
  try {
    let sourceFilePath = './firebaseConfig.js'
    const targetFilePath = './lib/firebaseConfig.ts'

    if (fs.existsSync(sourceFilePath)) {
      fs.rmSync(sourceFilePath)
    }
    console.log(`Generating '${fs.existsSync(targetFilePath)}'`)
    if (!fs.existsSync(targetFilePath)) {
      fs.mkdirSync('lib')
    }
    await firebaseSdkConfig()

    fs.readFile(sourceFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the file:', err)
        return
      }

      const modifiedData = data.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // コメントを除外する正規表現

      const match = modifiedData.match(
        /firebase\.initializeApp\(({[\s\S]+?})\);/
      )
      if (!match) {
        console.error('Firebase initialization code not found in the file.')
        return
      }

      const config = match[1]
      const parsedConfig = JSON.parse(config)
      const formattedConfig = Object.entries(parsedConfig)
        .map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`)
        .join('\n')

      const finalData = `const firebaseConfig = {\n${formattedConfig}\n}\nexport default firebaseConfig;`

      fs.writeFile(targetFilePath, finalData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing the file:', err)
          return
        }
        Logger.successCheck(
          `File '${targetFilePath}' has been created successfully`
        )
      })
    })
    fs.rmSync('firebaseConfig.js')
    return true
  } catch (error) {
    throw new Error(`genFirebaseConfig: ${error}`)
  }
}
