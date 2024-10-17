'use client'

import '@solana/wallet-adapter-react-ui/styles.css'
import { ReactNode, useMemo, useCallback } from 'react'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletError, WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

import type { Adapter } from '@solana/wallet-adapter-base'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  children: ReactNode
}

export const solanaNetwork = WalletAdapterNetwork.Mainnet
export const solanaEndpoint =
  process.env.NEXT_PUBLIC_SOLANA_ENDPOINT ||
  'https://api.mainnet-beta.solana.com'

export default function SolanaWalletProvider({ children }: Props) {
  const wallets = useMemo(() => [], [])
  const { toast } = useToast()

  const onError = useCallback(
    (error: WalletError) => {
      if (
        !error.message.includes('user rejected the request.') &&
        !error.message.includes('User rejected the request.')
      ) {
        toast({
          title: error.name,
          description: error.message,
        })
        console.error(error)
      }
    },
    [toast],
  )

  const autoConnect = useCallback(
    async (adapter: Adapter) => {
      adapter.autoConnect().catch(async (e) => {
        if (e instanceof Error) {
          if (
            !e.message.includes('user rejected the request.') &&
            !e.message.includes('User rejected the request.')
          ) {
            toast({
              title: e.name,
              description: e.message,
            })
          }
        }
      })
      return false
    },
    [toast],
  )

  return (
    <>
      <ConnectionProvider
        endpoint={solanaEndpoint}
        config={{ commitment: 'finalized' }}
      >
        <WalletProvider
          wallets={wallets}
          onError={onError}
          autoConnect={autoConnect}
        >
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  )
}
