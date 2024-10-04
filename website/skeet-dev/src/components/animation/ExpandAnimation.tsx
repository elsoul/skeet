import React, { ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'

type Props = {
  children: ReactNode
}

export default function ExpandAnimation({ children }: Props) {
  const expandProps = useSpring({
    from: { transform: 'scale(0)' },
    to: [
      { transform: 'scale(1.2)', config: { tension: 500 } },
      { transform: 'scale(1)', config: { tension: 300 } },
    ],
  })

  return <animated.div style={expandProps}>{children}</animated.div>
}
