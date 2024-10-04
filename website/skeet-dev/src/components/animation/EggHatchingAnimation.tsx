import { useState, useEffect, ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'

type Props = {
  children: ReactNode
  msInterval?: number
}

export default function EggHatchingAnimation({
  children,
  msInterval = 6400,
}: Props) {
  const [hatch, setHatch] = useState(false)

  const hatchingProps = useSpring({
    to: {
      transform: hatch ? 'rotate(3deg)' : 'rotate(-3deg)',
    },
    from: {
      transform: 'rotate(0deg)',
    },
    config: { tension: 300, friction: 5 },
    reset: hatch,
    onRest: () => setHatch(false),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setHatch(true)
    }, msInterval)

    return () => clearInterval(interval)
  }, [msInterval])

  return <animated.div style={hatchingProps}>{children}</animated.div>
}
