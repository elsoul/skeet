'use client'
import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useNextTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return { theme, setTheme, mounted }
}
