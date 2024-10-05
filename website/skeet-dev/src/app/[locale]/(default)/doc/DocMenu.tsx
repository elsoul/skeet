'use client'
import { useState } from 'react'
import { Link, usePathname } from '@/navigation'
import { docMenuData } from './docNavs'
import { Item, Section } from '@/lib/articles'
import { ChevronRightIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

const DocMenu = () => {
  return (
    <div className="w-full p-3">
      {docMenuData.map((section) => (
        <DocMenuSection key={section.title} section={section} />
      ))}
    </div>
  )
}

type DocMenuSectionProps = {
  section: Section
}

const DocMenuSection = ({ section }: DocMenuSectionProps) => {
  const t = useTranslations()
  const pathname = usePathname()
  const isActivePath = (path: string) => pathname.includes(path)

  return (
    <div className="w-full p-2">
      <div className="flex cursor-pointer items-center justify-between hover:opacity-70">
        <Link href={section.route} className="w-full">
          <span
            className={cn(
              isActivePath(section.route) && 'text-blue-500 dark:text-blue-300',
              'flex-1 text-sm font-bold',
            )}
          >
            {t(section.title)}
          </span>
        </Link>
      </div>
      {section.items && (
        <ul className="my-2 w-full">
          {section.items.map((item) => (
            <DocMenuItem key={item.title} item={item} />
          ))}
        </ul>
      )}
    </div>
  )
}

type DocMenuItemProps = {
  item: Item
}

const DocMenuItem = ({ item }: DocMenuItemProps) => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isActivePath = (path: string) => pathname.includes(path)

  return (
    <li className="mt-4 w-full">
      <div
        className="flex cursor-pointer items-center justify-between gap-2 py-0.5 hover:opacity-70"
        onClick={() => setIsOpen(!item.subItems ? false : !isOpen)}
      >
        {item.subItems ? (
          <>
            <span className="flex-1 text-sm text-zinc-600 dark:text-zinc-200">
              {t(item.title)}
            </span>
            {isOpen ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </>
        ) : (
          <>
            <Link href={item.route as string} className="w-full">
              <span
                className={cn(
                  isActivePath(item.route as string)
                    ? 'text-blue-500 dark:text-blue-300'
                    : 'text-zinc-500 dark:text-zinc-300',
                  'flex-1 text-sm',
                )}
              >
                {t(item.title)}
              </span>
            </Link>
          </>
        )}
      </div>
      {isOpen && item.subItems && (
        <ul className="my-2 ml-1 w-full border-l border-zinc-300 pl-4 dark:border-zinc-500">
          {item.subItems.map((subItem) => (
            <li key={subItem.title} className="mb-1 w-full">
              <Link href={subItem.route} className="w-full">
                <p
                  className={cn(
                    isActivePath(subItem.route)
                      ? 'text-blue-500 dark:text-blue-300'
                      : 'text-zinc-400 dark:text-zinc-400',
                    'w-full py-2 text-sm hover:opacity-70',
                  )}
                >
                  {t(subItem.title)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default DocMenu
