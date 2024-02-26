import * as pjson from './package.json'
import * as fsPromise from 'fs/promises'

console.log(`updated version to ${pjson.version}`)

const versionString = `export const VERSION = '${pjson.version}'`

const fileWrite = async () => {
  await fsPromise.writeFile('./src/lib/version.ts', versionString, {
    flag: 'w',
  })
}

fileWrite()
