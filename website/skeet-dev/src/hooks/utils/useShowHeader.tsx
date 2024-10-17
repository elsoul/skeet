'use client'

import { useEffect, useState } from 'react'

type Props = {
  defaultShowHeader?: boolean
}

export function useShowHeader({ defaultShowHeader = true }: Props = {}) {
  const [showHeader, setShowHeader] = useState(defaultShowHeader)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 80 || currentScrollY < lastScrollY) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return showHeader
}
