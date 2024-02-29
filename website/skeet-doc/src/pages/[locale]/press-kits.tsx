import { ReactElement } from 'react'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import DownloadPressKitsRow from '@/components/pages/press-kits/DownloadPressKitsRow'
import ContactRow from '@/components/pages/common/ContactRow'

const seo = {
  pathname: '/press-kits',
  title: {
    ja: 'プレスキット',
    en: 'Press Kits',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'press-kits'], seo)
export { getStaticPaths, getStaticProps }

export default function PressKits() {
  return (
    <>
      <DownloadPressKitsRow />
      <ContactRow />
    </>
  )
}

PressKits.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
