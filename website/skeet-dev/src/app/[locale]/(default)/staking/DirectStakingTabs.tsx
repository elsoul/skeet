'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import BlinksWalletIndicator from '@/components/solana/BlinksWalletIndicator'
import BlinksComponent from '@/components/solana/BlinksComponent'
import { VALIDATORS_BLINKS_BASE_URL } from '@/constants/links'
import { useWallet } from '@solana/wallet-adapter-react'
import { Button } from '@/components/ui/button'

export default function DirectStakingTabs() {
  const t = useTranslations()
  const { publicKey } = useWallet()
  const [tabValue, setTabValue] = useState('labo')

  return (
    <>
      <div className="grid gap-6">
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="mb-7 grid w-full grid-cols-3">
            <TabsTrigger value="labo">ELSOUL</TabsTrigger>
            <TabsTrigger value="epics">Epics DAO</TabsTrigger>
            <TabsTrigger value="unstake">{t('staking.unstaking')}</TabsTrigger>
          </TabsList>
          <TabsContent value="labo">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/stake/delegate?validator=labo`}
            />
          </TabsContent>
          <TabsContent value="epics">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/stake/delegate?validator=epics`}
            />
          </TabsContent>
          <TabsContent value="unstake">
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
        </Tabs>
        <BlinksWalletIndicator />
      </div>
    </>
  )
}
