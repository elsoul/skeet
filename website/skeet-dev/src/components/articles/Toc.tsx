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
          <div className="p-4 lg:ml-4">
            <p className="text-base font-semibold tracking-tight">
              {t('common.tableOfContents')}
            </p>
          </div>
          <div className="border-l p-4 lg:ml-4">
            <nav className="space-y-1" aria-label="Sidebar">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={clsx(
                    activeItemIds.includes(item.id)
                      ? 'text-blue-500 dark:text-blue-300'
                      : 'text-zinc-500 dark:text-zinc-300',
                    `block py-1.5 text-sm hover:opacity-70 ml-${
                      item.depth > 2 ? 3 : 0
                    }`,
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
