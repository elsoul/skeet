import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const blurDataURL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23f8f8f8'/%3E%3C/svg%3E"

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const getGroupDir = (fileName: string) => {
  const parts = fileName.split('/')
  const lastPart = parts[parts.length - 1]
  if (lastPart.includes('.')) {
    parts.pop()
  }
  let groupDir = parts.pop() ?? '(default)'

  if (groupDir.startsWith('[') && groupDir.endsWith(']')) {
    groupDir = parts.pop() ?? '(default)'
  }
  return groupDir
}

export const uniqueArray = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr.map((item) => JSON.stringify(item)))).map(
    (item) => JSON.parse(item) as T,
  )
}

export function truncateContent(
  content: string | string[],
  maxLength: number,
): string {
  let text = ''

  if (Array.isArray(content)) {
    text = content.join(' ')
  } else {
    text = content
  }

  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...'
  }

  return text
}

export const isYouTubeUrl = (url: string) => {
  return (
    /https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(url) ||
    /https?:\/\/youtu\.be\//.test(url)
  )
}

export const getYouTubeVideoId = (url: string) => {
  let videoId: string | null = ''

  if (/https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(url)) {
    videoId = new URL(url).searchParams.get('v')
  } else if (/https?:\/\/youtu\.be\//.test(url)) {
    videoId = url.split('youtu.be/')[1]
  }

  return videoId
}
