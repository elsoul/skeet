'use client'

import { useTranslations } from 'next-intl'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import Image from 'next/image'
import { OPOSDeveloperToolkit } from '@/assets/img'
import { cn } from '@/lib/utils'
import { mainShardGradation } from '@/lib/decoration'
import { useAtom } from 'jotai'
import { solanaBalanceAtom } from '@/store/solana'
import { useEffect } from 'react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { ELSOL_TOKEN_MINT } from '@/constants/address'
import { UpdateIcon } from '@radix-ui/react-icons'

export default function BlinksWalletIndicator() {
  const t = useTranslations()
  const { publicKey } = useWallet()
  const { connection } = useConnection()

  const [solanaBalance, setSolanaBalance] = useAtom(solanaBalanceAtom)

  const fetchBalance = async () => {
    if (solanaBalance.isUpdating || solanaBalance.isDisabled) {
      return
    }

    setSolanaBalance((prev) => ({
      ...prev,
      isUpdating: true,
      isDisabled: true
    }))

    try {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey)
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { mint: new PublicKey(ELSOL_TOKEN_MINT) }
        )
        let tokenBalance = 0
        tokenAccounts.value.forEach((tokenAccount) => {
          const balance =
            tokenAccount.account.data.parsed.info.tokenAmount.uiAmount
          tokenBalance += balance
        })

        setSolanaBalance((prev) => ({
          ...prev,
          sol: balance / LAMPORTS_PER_SOL,
          elsol: tokenBalance,
          updated: prev.updated + 1,
          isUpdating: false
        }))

        const messageId = window.setTimeout(() => {
          setSolanaBalance((prev) => ({
            ...prev,
            messageTimeoutId: null
          }))
        }, 2000)

        setSolanaBalance((prev) => ({
          ...prev,
          messageTimeoutId: messageId
        }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      const id = window.setTimeout(() => {
        setSolanaBalance((prev) => ({
          ...prev,
          isDisabled: false,
          timeoutId: null
        }))
      }, 10000)

      setSolanaBalance((prev) => ({
        ...prev,
        isUpdating: false,
        timeoutId: id
      }))
    }
  }

  useEffect(() => {
    if (publicKey) {
      void fetchBalance()
    }
    return () => {
      if (solanaBalance.timeoutId !== null) {
        window.clearTimeout(solanaBalance.timeoutId)
      }
      if (solanaBalance.messageTimeoutId !== null) {
        window.clearTimeout(solanaBalance.messageTimeoutId)
      }
    }
  }, [publicKey])

  return (
    <>
      {publicKey && (
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-center gap-0.5">
              <Image
                src={OPOSDeveloperToolkit}
                alt="Wallet"
                className="h-8 w-8"
                unoptimized
                width={32}
                height={32}
              />
              <p className="text-xs font-light">{t('common.balance')}</p>
            </div>
            <div className="grid">
              <p className={cn('font-bold', mainShardGradation)}>
                {solanaBalance.sol.toLocaleString()} SOL
              </p>
              <p className={cn('font-bold', mainShardGradation)}>
                {solanaBalance.elsol.toLocaleString()} elSOL
              </p>
            </div>
            <div className="grid">
              <button
                onClick={fetchBalance}
                disabled={solanaBalance.isUpdating || solanaBalance.isDisabled}
                className={cn(
                  'p-1',
                  solanaBalance.isUpdating ? 'animate-spin' : '',
                  solanaBalance.isDisabled
                    ? 'cursor-not-allowed text-gray-400'
                    : 'hover:opacity-70'
                )}
              >
                <UpdateIcon className="h-5 w-5" />
              </button>
            </div>
            {solanaBalance.messageTimeoutId && (
              <p className={cn(mainShardGradation, 'text-xs font-light')}>
                {t('common.updated')}
              </p>
            )}
          </div>
          <WalletMultiButton />
        </div>
      )}
    </>
  )
}
