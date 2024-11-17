'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import BlinksWalletIndicator from '@/components/solana/BlinksWalletIndicator'
import BlinksComponent from '@/components/solana/BlinksComponent'
import { VALIDATORS_BLINKS_BASE_URL } from '@/constants/links'

export default function StakingTabs() {
  const t = useTranslations()
  const { publicKey } = useWallet()

  const [tabValue, setTabValue] = useState('staking')

  return (
    <>
      <div className="grid gap-6">
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="mb-7 grid w-full grid-cols-3">
            <TabsTrigger value="staking">{t('staking.staking')}</TabsTrigger>
            <TabsTrigger value="unstaking">
              {t('staking.unstaking')}
            </TabsTrigger>
            <TabsTrigger value="swap">{t('staking.swap')}</TabsTrigger>
          </TabsList>
          <TabsContent value="staking">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/stake?pubkey=${publicKey}`}
            />
            {publicKey && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                <div className="w-full">
                  <p className="text-xs text-green-600 dark:text-green-200">
                    {t('staking.stakingInfo')}
                  </p>
                </div>
                <div className="flex w-full flex-row items-center justify-center sm:justify-end md:justify-center lg:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTabValue('stakingFromAccount')
                    }}
                  >
                    {t('staking.stakingFromAccount')}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="stakingFromAccount">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/stake/active?pubkey=${publicKey}`}
            />
            {publicKey && (
              <div className="mt-5 grid gap-4">
                <div className="flex w-full flex-row items-center justify-center sm:justify-end md:justify-center lg:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTabValue('staking')
                    }}
                  >
                    {t('staking.stakeSOL')}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="unstaking">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/unstake?pubkey=${publicKey}`}
            />
            {publicKey && (
              <div className="mt-5 grid gap-4 sm:grid-cols-7">
                <div className="w-full sm:col-span-5">
                  <p className="text-xs text-zinc-500 dark:text-zinc-200">
                    {t('staking.unstakingCaution')}
                  </p>
                  <div className="my-4 flex flex-row items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTabValue('deactivate')
                      }}
                    >
                      {t('staking.deactivate')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTabValue('withdraw')
                      }}
                    >
                      {t('staking.withdraw')}
                    </Button>
                  </div>
                </div>
                <div className="flex w-full flex-col items-center justify-start sm:col-span-2">
                  <p className="px-1 pb-2 text-center text-xs text-zinc-500 dark:text-zinc-200">
                    {t('staking.instantUnstaking')}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTabValue('swap')
                    }}
                  >
                    {t('staking.swap')}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="deactivate">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/unstake/deactivate?pubkey=${publicKey}`}
            />
            {publicKey && (
              <div className="mt-5 grid gap-4 sm:grid-cols-7">
                <div className="w-full sm:col-span-5">
                  <p className="text-xs text-zinc-500 dark:text-zinc-200">
                    {t('staking.canWithdrawNextEpoch')}
                  </p>
                </div>
                <div className="flex w-full flex-col items-center justify-center sm:col-span-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTabValue('withdraw')
                    }}
                  >
                    {t('staking.withdraw')}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="withdraw">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/unstake/withdraw?pubkey=${publicKey}`}
            />
          </TabsContent>
          <TabsContent value="swap">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/swap?pubkey=${publicKey}`}
            />
            {publicKey && (
              <div className="mt-5 grid gap-4">
                <div className="flex w-full flex-row items-center justify-center sm:justify-end md:justify-center lg:justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTabValue('unstaking')
                    }}
                  >
                    {t('staking.unstakingToAccount')}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        <BlinksWalletIndicator />
      </div>
    </>
  )
}
