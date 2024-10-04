import { useState, useEffect, ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'

type Props = {
  children: ReactNode
  msInterval?: number
}

export default function JumpingAnimation({
  children,
  msInterval = 7200,
}: Props) {
  const [jump, setJump] = useState(false)

  const jumpingProps = useSpring({
    to: {
      transform: jump ? 'translateY(-4px)' : 'translateY(0px)',
    },
    from: {
      transform: 'translateY(0px)',
    },
    config: { tension: 300, friction: 5 },
    onRest: () => setJump(false),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setJump(true)
      setTimeout(() => setJump(false), 200)
    }, msInterval)

    return () => clearInterval(interval)
  }, [msInterval])

  return <animated.div style={jumpingProps}>{children}</animated.div>
}
