import { setRequestLocale } from 'next-intl/server'
import { getDataForPageByGroupDir, PageProps } from '@/lib/pages'

import CTARow from '@/components/rows/CTARow'
import ProductsSlideRow from '@/components/rows/ProductsSlideRow'
import Why1SOLnot1elSOLRow from './Why1SOLnot1elSOLRow'
import HavingLiquidityRow from './HavingLiquidityRow'
import StakingHeroRow from './StakingHeroRow'
import ElsolMetricsRow from '@/components/rows/ElsolMetricsRow'
import InstantLiquidityRow from '@/components/rows/InstantLiquidityRow'
import DirectStakingRow from './DirectStakingRow'
import VLDAirdropRow from '@/components/rows/VLDAirdropRow'

const groupDir = 'staking'
const { generateMetadata } = getDataForPageByGroupDir(groupDir)
export { generateMetadata }

export default async function BlinksPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <DirectStakingRow />
      <StakingHeroRow />
      <ElsolMetricsRow />
      <Why1SOLnot1elSOLRow />
      <InstantLiquidityRow />
      <HavingLiquidityRow />
      <VLDAirdropRow />
      <CTARow />
      <ProductsSlideRow />
    </>
  )
}
