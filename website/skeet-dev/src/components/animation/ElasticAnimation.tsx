import { useState, useEffect, ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'

type Props = {
  children: ReactNode
  msInterval?: number
}

export default function ElasticAnimation({
  children,
  msInterval = 10000,
}: Props) {
  const [trigger, setTrigger] = useState(false)

  const elasticProps = useSpring({
    to: trigger
      ? [
          { transform: 'scale(1.5)', config: { tension: 300, friction: 5 } },
          { transform: 'scale(1)', config: { tension: 200, friction: 15 } },
        ]
      : { transform: 'scale(1)' },
    from: { transform: 'scale(1)' },
    onRest: () => setTrigger(false),
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTrigger(true)
    }, msInterval)

    return () => clearInterval(interval)
  }, [msInterval])

  return <animated.div style={elasticProps}>{children}</animated.div>
}
