import { cn } from '@/lib/utils'
import { unstable_setRequestLocale } from 'next-intl/server'
import DocMenu from './DocMenu'

type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default async function DocLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <div className="mx-auto max-w-7xl lg:py-8">
        <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-9">
          <div className="max-h-full lg:col-span-2">
            <div
              className={cn(
                'scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-950 dark:scrollbar-thumb-zinc-600',
                'hidden max-h-[calc(100vh-10rem)] lg:sticky lg:top-32 lg:block',
              )}
            >
              <DocMenu />
            </div>
          </div>
          <div className="lg:col-span-7">{children}</div>
        </div>
      </div>
    </>
  )
}
