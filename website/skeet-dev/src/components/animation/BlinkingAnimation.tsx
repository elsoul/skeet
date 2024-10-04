import { useState, useEffect, ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'

type Props = {
  children: ReactNode
}

export default function BlinkingAnimation({ children }: Props) {
  const [isBlinking, setIsBlinking] = useState(false)

  const blinkingProps = useSpring({
    from: { opacity: 0.2 },
    to: [{ opacity: 1 }, { opacity: 0.2 }],
    loop: true,
    config: { duration: 1600, tension: 170, friction: 12 },
    pause: !isBlinking,
  })

  useEffect(() => {
    setIsBlinking(true)
  }, [])

  return <animated.div style={blinkingProps}>{children}</animated.div>
}
