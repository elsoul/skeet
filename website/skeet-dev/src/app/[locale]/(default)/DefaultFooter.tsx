'use client'

import appInfo from '@appInfo'
import LogoHorizontalLink from '@/components/common/LogoHorizontalLink'
import {
  DiscordIconLink,
  GithubIconLink,
  TwitterIconLink,
} from '@/components/common/icons'

import { LanguageToggle } from '@/components/config/LanguageToggle'
import { ModeToggle } from '@/components/config/ModeToggle'
import { defaultFooterNav } from './defaultNavs'
import { Link, usePathname } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import GreenHostingBadge from '@/components/common/GreenHostingBadge'

export default function DefaultFooter() {
  const t = useTranslations()
  const pathname = usePathname()
  const isActivePath = (path: string) => pathname.includes(path)

  return (
    <>
      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-10 border-t border-zinc-200 px-6 pb-8 pt-10 dark:border-zinc-500">
        <div className="flex w-full flex-col items-stretch justify-between gap-8 sm:flex-row">
          <div className="flex w-full justify-between sm:flex-col">
            <LogoHorizontalLink className="w-24" />
            <div className="flex flex-row items-center gap-4">
              <GithubIconLink />
              <TwitterIconLink />
              <DiscordIconLink />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            {defaultFooterNav.map((navItem) => (
              <Link
                href={navItem.path}
                key={navItem.label}
                className={cn(
                  isActivePath(navItem.path)
                    ? 'text-blue-500 dark:text-blue-300'
                    : 'text-zinc-500 dark:text-zinc-300',
                  'flex items-center gap-4 py-2 text-sm hover:opacity-70',
                )}
              >
                {t(navItem.label)}
              </Link>
            ))}
          </div>
          <div className="flex w-full flex-col">
            <Link
              href={appInfo.demoURL}
              className={cn(
                'text-zinc-500 dark:text-zinc-300',
                'flex items-center gap-4 py-2 text-sm hover:opacity-70',
              )}
              target="_blank"
            >
              {t('common.demo')}
            </Link>
          </div>
          <div className="flex w-full flex-col">
            <div className="max-w-40 sm:ml-auto">
              <GreenHostingBadge />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center">
          <p className="text-sm tracking-tight text-zinc-400 dark:text-zinc-300">
            © {new Date().getFullYear()} {appInfo.copyright}
          </p>
          <div className="flex flex-grow" />
          <div className="flex flex-row items-start justify-center gap-3">
            <LanguageToggle />
            <ModeToggle />
          </div>
        </div>
      </footer>
    </>
  )
}
