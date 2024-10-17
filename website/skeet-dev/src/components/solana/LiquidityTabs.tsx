'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import BlinksWalletIndicator from './BlinksWalletIndicator'
import BlinksComponent from './BlinksComponent'
import { VALIDATORS_BLINKS_BASE_URL } from '@/constants/links'

export default function LiquidityTabs() {
  const t = useTranslations()
  const { publicKey } = useWallet()
  const [tabValue, setTabValue] = useState('SOL')

  return (
    <>
      <div className="grid gap-6">
        <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
          <TabsList className="mb-7 grid w-full grid-cols-4">
            <TabsTrigger value="SOL">SOL</TabsTrigger>
            <TabsTrigger value="USDC">USDC</TabsTrigger>
            <TabsTrigger value="EPCT">EPCT</TabsTrigger>
            <TabsTrigger value="closeOrca">
              {t('common.InstantLiquidityRow.closeOrca')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="SOL">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/whirlpool?symbol=SOL`}
            />
          </TabsContent>
          <TabsContent value="USDC">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/whirlpool?symbol=USDC`}
            />
          </TabsContent>
          <TabsContent value="EPCT">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/whirlpool?symbol=EPCT`}
            />
          </TabsContent>
          <TabsContent value="closeOrca">
            <BlinksComponent
              actionUrl={`${VALIDATORS_BLINKS_BASE_URL}/v1/whirlpool/close?pubkey=${publicKey}`}
            />
          </TabsContent>
        </Tabs>
        <BlinksWalletIndicator />
      </div>
    </>
  )
}
