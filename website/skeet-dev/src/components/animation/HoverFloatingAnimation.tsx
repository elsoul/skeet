import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'

type HoverProps = {
  children: React.ReactNode
}

export default function HoverFloatingAnimation({ children }: HoverProps) {
  const [isHovered, setIsHovered] = useState(false)

  const floatingProps = useSpring({
    transform: isHovered ? 'translateY(-10px)' : 'translateY(0px)',
    config: {
      tension: 280,
      friction: 20,
    },
  })

  return (
    <animated.div
      style={{
        ...floatingProps,
        display: 'inline-block',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </animated.div>
  )
}
