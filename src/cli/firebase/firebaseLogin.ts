import { spawn } from 'child_process'

export const firebaseLogin = async () => {
  try {
    const child = spawn('firebase', ['login', '--reauth'], { stdio: 'inherit' })

    child.on('error', (error) => {
      throw new Error(`firebase login failed - ${error}`)
    })

    child.on('exit', (code) => {
      if (code !== 0) {
        throw new Error(`firebase login process exited with code ${code}`)
      }
    })

    return new Promise<void>((resolve, reject) => {
      child.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`firebase login process exited with code ${code}`))
        } else {
          resolve()
        }
      })
    })
  } catch (error) {
    throw error
  }
}
