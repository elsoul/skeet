import { ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'

type Props = {
  children: ReactNode
}

export default function FallingAnimation({ children }: Props) {
  const fallingProps = useSpring({
    from: { transform: 'translateY(-100vh)' },
    to: { transform: 'translateY(0)' },
    config: { tension: 500, friction: 36 },
  })

  return <animated.div style={fallingProps}>{children}</animated.div>
}
