export type Paths = {
  mdFiles: string[]
  jsonFiles: string[]
}

export const organizeFilesByExtension = (paths: string[]): Paths => {
  const mdFiles: string[] = []
  const jsonFiles: string[] = []

  for (const path of paths) {
    if (path.endsWith('.md')) {
      mdFiles.push(path)
    } else if (path.endsWith('.json')) {
      jsonFiles.push(path)
    }
  }

  return {
    mdFiles,
    jsonFiles,
  }
}
