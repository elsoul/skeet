# @skeet-framework/utils

## 1.3.5

### Patch Changes

- [#298](https://github.com/elsoul/skeet/pull/298) [`27bd640`](https://github.com/elsoul/skeet/commit/27bd64022d84b40a69c223a2c84e257fb75d6433) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - sendGet/sendPost, Add - execSync/existsSync

  - execSync

  ```
  // Example of executing a shell command
  async function runCommand() {
    const command = 'ls -l'
    const cwd = '/usr'
    const isLog = true

    const { stdout, stderr } = await execSync(command, cwd, isLog)
    // Outputs are logged based on the isLog parameter
  }

  runCommand().catch(error => {
    console.error('Failed to execute command:', error)
  })
  ```

  - existsSync

  ```
  // Example of how to use existsSync to check if a file and a directory exist
  const filePath = './path/to/your/file.txt'
  const dirPath = './path/to/your/directory'

  async function checkExists() {
    const fileExists = await existsSync(filePath)
    console.log(fileExists ? 'File exists.' : 'File does not exist.')

    const dirExists = await existsSync(dirPath)
    console.log(dirExists ? 'Directory exists.' : 'Directory does not exist.')
  }

  checkExists().catch(error => {
    console.error('An error occurred:', error)
  })
  ```

## 1.3.4

### Patch Changes

- [#283](https://github.com/elsoul/skeet/pull/283) [`c78d703`](https://github.com/elsoul/skeet/commit/c78d703df629649ac8d125b4c56ddb9c89f2592e) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Migrate to esm

## 1.3.3

### Patch Changes

- [`6cfcac7`](https://github.com/elsoul/skeet/commit/6cfcac72a5af8641234dfc35c4c5ea546dc54c6b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - change node-fetch version

## 1.3.2

### Patch Changes

- [`ce72bf5`](https://github.com/elsoul/skeet/commit/ce72bf536cf32fe02bd33b9abbf5d28148a8417c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update workflow

## 1.3.1

### Patch Changes

- [`1bf5431`](https://github.com/elsoul/skeet/commit/1bf5431e4ec44de7750309376caefade39cc4bb0) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update build

## 1.3.0

### Minor Changes

- [`97534cc`](https://github.com/elsoul/skeet/commit/97534cc8bc043b76bd9d4708a5c1cb1af5f90811) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update workflow
