---
'@skeet-framework/utils': patch
---

Update - sendGet/sendPost, Add - execSync/existsSync

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
