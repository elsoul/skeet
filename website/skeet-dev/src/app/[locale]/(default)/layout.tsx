import { unstable_setRequestLocale } from 'next-intl/server'
import DefaultHeader from './DefaultHeader'
import DefaultFooter from './DefaultFooter'

type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default async function DefaultLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <div className="flex flex-col">
        <DefaultHeader />
        <main className="min-h-screen">{children}</main>
        <DefaultFooter />
      </div>
    </>
  )
}
