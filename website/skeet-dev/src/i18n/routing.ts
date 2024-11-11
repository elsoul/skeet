import { createNavigation } from 'next-intl/navigation'
import { locales, defaultLocale } from '@/app/config'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: { mode: 'always' }
})

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
