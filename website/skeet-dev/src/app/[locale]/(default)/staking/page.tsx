import { unstable_setRequestLocale } from 'next-intl/server'
import { getDataForPageByFilename, PageProps } from '@/lib/pages'

import { useTranslations } from 'next-intl'
import CTARow from '@/components/rows/CTARow'
import ProductsSlideRow from '@/components/rows/ProductsSlideRow'
import Why1SOLnot1elSOLRow from './Why1SOLnot1elSOLRow'
import HavingLiquidityRow from './HavingLiquidityRow'
import StakingHeroRow from './StakingHeroRow'
import ElsolMetricsRow from '@/components/rows/ElsolMetricsRow'
import InstantLiquidityRow from '@/components/rows/InstantLiquidityRow'
import DirectStakingRow from './DirectStakingRow'
import VLDAirdropRow from '@/components/rows/VLDAirdropRow'

const { generateMetadata } = getDataForPageByFilename(__filename)
export { generateMetadata }

export default function BlinksPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

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
