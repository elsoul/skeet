import Image from 'next/image'
import GoogleCloudSkeet from '@/assets/img/work/GoogleCloudSkeet.png'
import ValidatorListSkeet from '@/assets/img/work/SkeetSolanaValidator.png'
import WBSO2023 from '@/assets/img/work/WBSO2023.png'
import { useTranslation } from 'next-i18next'
import GoogleCloudWeb3Startups from '@/assets/img/work/GoogleCloudWeb3Startups.png'
import ENASE2024 from '@/assets/img/work/ENASE2024Accepted.jpg'

const works = [
  {
    title: 'OurWorksRow.GoogleCloudPartner.title',
    imageUrl: GoogleCloudSkeet,
    description: 'OurWorksRow.GoogleCloudPartner.description',
  },
  {
    title: 'OurWorksRow.WBSO.title',
    imageUrl: WBSO2023,
    description: 'OurWorksRow.WBSO.description',
  },
  {
    title: 'OurWorksRow.SolanaValidator.title',
    imageUrl: ValidatorListSkeet,
    description: 'OurWorksRow.SolanaValidator.description',
  },
  {
    title: 'OurWorksRow.GoogleWeb3.title',
    imageUrl: GoogleCloudWeb3Startups,
    description: 'OurWorksRow.GoogleWeb3.description',
  },
  {
    title: 'OurWorksRow.ENASE2024.title',
    imageUrl: ENASE2024,
    description: 'OurWorksRow.ENASE2024.description',
  },
]

export default function OurWorksRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <ul
            role="list"
            className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:col-span-2"
          >
            {works.map((work) => (
              <li key={work.title}>
                <Image
                  className="aspect-[16/9] w-full rounded-md object-cover"
                  src={work.imageUrl}
                  alt={work.title}
                  unoptimized
                />
                <h3 className="mt-6 text-lg font-bold leading-8 tracking-tight text-gray-900 dark:text-white">
                  {t(work.title)}
                </h3>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-200">
                  {t(work.description)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
