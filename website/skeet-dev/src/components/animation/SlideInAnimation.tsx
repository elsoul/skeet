import React, { ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'

type Props = {
  children: ReactNode
  direction?: 'left' | 'right'
}

export default function SlideInAnimation({
  children,
  direction = 'left',
}: Props) {
  const slideInProps = useSpring({
    from: {
      transform:
        direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
    },
    to: { transform: 'translateX(0%)' },
    config: { tension: 170, friction: 20 },
  })

  return <animated.div style={slideInProps}>{children}</animated.div>
}
