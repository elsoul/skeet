import { ReactElement } from 'react'
import DefaultLayout from '@/layouts/default/DefaultLayout'
import siteConfig from '@/config/site'
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import InformationRow from '@/components/pages/company/InformationRow'
import TeamRow from '@/components/pages/company/TeamRow'
import ContactRow from '@/components/pages/common/ContactRow'
import MissionRow from '@/components/pages/company/MissionRow'
import OurWorksRow from '@/components/pages/common/OurWorksRow'

const seo = {
  pathname: '/company',
  title: {
    ja: '会社概要',
    en: 'Company',
  },
  description: {
    ja: siteConfig.descriptionJA,
    en: siteConfig.descriptionEN,
  },
  img: null,
}

const getStaticProps = makeStaticProps(['common', 'company'], seo)
export { getStaticPaths, getStaticProps }

export default function Company() {
  return (
    <>
      <MissionRow />
      <InformationRow />
      <TeamRow />
      <OurWorksRow />
      <ContactRow />
    </>
  )
}

Company.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>
}
