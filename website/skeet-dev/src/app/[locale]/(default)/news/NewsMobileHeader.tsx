'use client'
import { cn } from '@/lib/utils'
import { useShowHeader } from '@/hooks/utils/useShowHeader'

import TocMenuModalNav from '@/components/articles/TocMenuModalNav'

type Props = {
  articleTitle: string
  articleContent: string
}

export default function NewsMobileHeader({
  articleTitle,
  articleContent,
}: Props) {
  const showHeader = useShowHeader({ defaultShowHeader: false })

  return (
    <>
      <div
        className={cn(
          'sticky top-16 z-10 -mt-8 mb-8 flex w-full flex-row items-center gap-2 border-b border-t border-zinc-200 bg-white bg-opacity-60 px-6 py-2 backdrop-blur-xl transition-transform duration-300 ease-in-out dark:border-zinc-500 dark:bg-zinc-950 dark:bg-opacity-20 lg:hidden',
          showHeader ? 'translate-y-0' : '-translate-y-96',
        )}
      >
        <div>
          <p className="w-full break-words text-xs">{articleTitle}</p>
        </div>
        <div className="flex flex-grow" />
        <div className="flex-shrink-0 md:hidden">
          <TocMenuModalNav articleContent={articleContent} />
        </div>
      </div>
    </>
  )
}
