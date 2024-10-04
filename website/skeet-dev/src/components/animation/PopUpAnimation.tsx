import { ReactNode } from 'react'
import { useSpring, animated } from '@react-spring/web'

type Props = {
  children: ReactNode
}

export default function PopUpAnimation({ children }: Props) {
  const popUpProps = useSpring({
    from: { transform: 'translateY(30vh)' },
    to: async (next) => {
      await next({ transform: 'translateY(-1vh)' })
      await next({ transform: 'translateY(0)' })
    },
    config: { tension: 500, friction: 42 },
  })

  return <animated.div style={popUpProps}>{children}</animated.div>
}
