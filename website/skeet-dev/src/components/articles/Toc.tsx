import clsx from 'clsx'
import { useTranslations } from 'next-intl'

type Props = {
  toc: {
    id: string
    depth: number
    value: string
  }[]
  activeItemIds: string[]
  modalFunction?: (open: boolean) => void
}

const OFFSET_HEIGHT = 128

const scrollToHash = (hash: string) => {
  const element = document.getElementById(hash)
  if (element) {
    const yOffset = -OFFSET_HEIGHT
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

export default function Toc({ toc, activeItemIds, modalFunction }: Props) {
  const t = useTranslations()

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault()
    if (modalFunction) {
      modalFunction(false)
      setTimeout(() => {
        scrollToHash(id)
        history.pushState(null, '', `#${id}`)
      }, 200)
    } else {
      scrollToHash(id)
      history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <>
      {toc.length > 0 && (
        <>
          <div className="p-4 lg:ml-6">
            <p className="text-base font-semibold tracking-tight">
              {t('common.tableOfContents')}
            </p>
          </div>
          <div className="border-l px-4 py-1 lg:ml-6">
            <nav className="space-y-1" aria-label="Sidebar">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={clsx(
                    activeItemIds.includes(item.id)
                      ? 'text-blue-500 dark:text-blue-300'
                      : 'text-zinc-500 dark:text-zinc-300 md:text-zinc-400 md:dark:text-zinc-400',
                    `block py-2 text-sm hover:opacity-70 ml-${item.depth * 4}`,
                  )}
                  aria-current={
                    activeItemIds.includes(item.id) ? 'location' : undefined
                  }
                >
                  <span className="break-words">{item.value}</span>
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
