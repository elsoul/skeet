import { closeSync, openSync, readSync, statSync } from 'fs'

const CHUNK_SIZE = 1024 // 1KB

export const getLastNLines = (filePath: string, n = 5) => {
  const stats = statSync(filePath)
  let start = Math.max(0, stats.size - CHUNK_SIZE)
  let lines: any = []

  while (lines.length < n && start > 0) {
    const buffer = Buffer.alloc(CHUNK_SIZE)
    const fd = openSync(filePath, 'r')

    readSync(fd, buffer, 0, CHUNK_SIZE, start)
    closeSync(fd)

    lines = buffer.toString('utf-8').split('\n').reverse().concat(lines)
    start = Math.max(0, start - CHUNK_SIZE)
  }

  return lines.slice(0, n).reverse()
}
