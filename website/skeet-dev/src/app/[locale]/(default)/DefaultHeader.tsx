'use client'

import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import appInfo from '@appInfo'
import DefaultModalNav from './DefaultModalNav'
import { defaultHeaderNav } from './defaultNavs'
import { Link, usePathname } from '@/navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useShowHeader } from '@/hooks/utils/useShowHeader'
import { Button } from '@/components/ui/button'
import {
  DiscordIconLink,
  GithubIconLink,
  TwitterIconLink,
} from '@/components/common/icons'

export default function DefaultHeader() {
  const t = useTranslations()
  const pathname = usePathname()
  const isActivePath = (path: string) => pathname.includes(path)
  const showHeader = useShowHeader()

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-10 flex w-full flex-col gap-10 bg-white bg-opacity-80 px-6 py-4 backdrop-blur-xl transition-transform duration-300 ease-in-out dark:bg-zinc-950 dark:bg-opacity-20',
          showHeader ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-row items-center gap-2 md:gap-20">
          <LogoHorizontalLink className="w-20 sm:w-24" />
          <div className="hidden gap-8 md:flex md:flex-row">
            {defaultHeaderNav.map((navItem) => (
              <Link
                href={navItem.path}
                key={navItem.label}
                className={cn(
                  isActivePath(navItem.path)
                    ? 'text-blue-500 dark:text-blue-300'
                    : 'text-zinc-500 dark:text-zinc-300',
                  'flex items-center gap-4 text-sm hover:opacity-70',
                )}
              >
                {t(navItem.label)}
              </Link>
            ))}
          </div>
          <div className="flex flex-grow" />
          <div className="flex flex-row items-start justify-center gap-3">
            <DefaultModalNav />
            <div className="hidden items-center gap-4 md:flex md:flex-row">
              <GithubIconLink />
              <TwitterIconLink />
              <DiscordIconLink />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
