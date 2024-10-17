import {
  OPOSDeveloperToolkit,
  SolanaLogoHorizontal,
  SolanaLogoInvertHorizontal
} from '@/assets/img'
import { Card } from '@/components/ui/card'
import { mainShardGradation } from '@/lib/decoration'
import { cn } from '@/lib/utils'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useTranslations } from 'next-intl'
import { useTheme } from '@/hooks/utils/useTheme'
import Image from 'next/image'

export default function ConnectYourWalletCard() {
  const t = useTranslations()
  const { theme, mounted } = useTheme()
  if (!mounted) return null
  return (
    <>
      <Card className="grid w-full gap-5 p-4">
        <div className="grid gap-4">
          <p
            className={cn(
              'pt-6 text-center text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl',
              mainShardGradation
            )}
          >
            {t('common.connectYourWallet')}
          </p>
          <Image
            src={
              theme === 'light'
                ? SolanaLogoHorizontal
                : SolanaLogoInvertHorizontal
            }
            alt="Wallet"
            className="mx-auto w-32"
            unoptimized
            width={256}
            height={256}
          />
        </div>
        <div className="w-full">
          <Image
            src={OPOSDeveloperToolkit}
            alt="Wallet"
            className="mx-auto h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48"
            unoptimized
            width={256}
            height={256}
          />
        </div>
        <div className="flex w-full flex-row items-center justify-center pb-4">
          <WalletMultiButton className="mx-auto" />
        </div>
      </Card>
    </>
  )
}
