import { useSpring, animated } from '@react-spring/web'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function SpinningAnimation({ children }: Props) {
  const spinningProps = useSpring({
    loop: true,
    from: { transform: 'scale(1) rotate(0deg)' },
    to: [
      { transform: 'scale(1.5) rotate(360deg)', config: { duration: 500 } },
      { transform: 'scale(1) rotate(720deg)', config: { duration: 500 } },
    ],
  })

  return <animated.div style={spinningProps}>{children}</animated.div>
}
