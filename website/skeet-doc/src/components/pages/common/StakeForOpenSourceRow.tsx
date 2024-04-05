import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import SolanaMainnetValidatorImage from '@/assets/img/work/ELSOULLABOSolanaMainnetValidator.jpg'
import NoLossDonationStakingMechanismJA from '@/assets/img/work/NoLossDonationStakingMechanismJA.jpg'
import NoLossDonationStakingMechanismEN from '@/assets/img/work/NoLossDonationStakingMechanismEN.jpg'
import { useMemo } from 'react'

const features = [
  {
    name: 'common:StakeForOpenSourceRow.feature1.title',
    description: 'common:StakeForOpenSourceRow.feature1.description',
    imageSrc: (_isJapanese: boolean) => SolanaMainnetValidatorImage,
    imageAlt: 'ELSOUL LABO Solana Mainnet Validator',
    imageLink: (_isJapanese: boolean) =>
      'https://www.validators.app/validators/Fumin2Kx6BjkbUGMi4E7ZkRQg4KmgDv2j5xJBi98nUAD?locale=en&network=mainnet',
    button: 'common:StakeForOpenSourceRow.feature1.button',
  },
  {
    name: 'common:StakeForOpenSourceRow.feature2.title',
    description: 'common:StakeForOpenSourceRow.feature2.description',
    imageSrc: (isJapanese: boolean) =>
      isJapanese
        ? NoLossDonationStakingMechanismJA
        : NoLossDonationStakingMechanismEN,
    imageAlt: 'Epics Platform Buidlers Collective (BDLC) NFT Staking',
    imageLink: (_isJapanese: boolean) =>
      'https://magiceden.io/marketplace/buidlersc',
    button: 'common:StakeForOpenSourceRow.feature2.button',
  },
]

export default function StakeForOpenSourceRow() {
  const { t, i18n } = useTranslation()
  const isJapanese = useMemo(() => i18n.language === 'ja', [i18n])
  return (
    <div className="pb-64 pt-16 sm:pb-80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center lg:text-center">
          <h2 className="bg-gradient-to-tr from-purple-400 via-blue-400 to-green-400 bg-clip-text text-lg font-semibold leading-7 tracking-tight text-transparent">
            {t('common:StakeForOpenSourceRow.subtitle')}
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
            {t('common:StakeForOpenSourceRow.title')}
          </p>
          <p className="text-md mt-6 max-w-3xl text-center text-gray-600 dark:text-gray-200">
            {t('common:StakeForOpenSourceRow.description')}
          </p>
        </div>
        <div className="mx-auto mt-12">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex w-full flex-col">
                <a
                  href={feature.imageLink(isJapanese)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <Image
                    src={feature.imageSrc(isJapanese)}
                    width="1600"
                    height="900"
                    alt={feature.imageAlt}
                    className="h-full w-full rounded-md"
                    unoptimized
                  />
                </a>
                <dt className="mt-7 flex items-center text-xl font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">
                  {t(feature.name)}
                </dt>
                <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-200">
                  <p className="flex-auto">{t(feature.description)}</p>
                </dd>
                <a
                  href={feature.imageLink(isJapanese)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 hover:opacity-80"
                >
                  <button className="rounded-md bg-gray-900 px-3 py-1.5 font-medium text-white dark:bg-white dark:text-gray-900">
                    {t(feature.button)}
                  </button>
                </a>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
