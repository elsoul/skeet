import { getArticleBySlug } from '@/lib/articles'

type Props = {
  slug: string[]
  locale: string
  groupDir: string
  articlePaths: string[]
}

export function getPagerData({ slug, groupDir, locale, articlePaths }: Props) {
  const articleLength = articlePaths.length
  const currentPath = `/${slug.join('/')}`
  const currentIndex = articlePaths.indexOf(currentPath)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === articleLength - 1

  if (isFirst && isLast) {
    return {
      nextRoute: null,
      previousRoute: null
    }
  }

  if (isFirst) {
    const nextRoutePath = articlePaths[currentIndex + 1]
    const nextRouteSlug = nextRoutePath.split('/').slice(1)
    const nextRouteTitle = getArticleBySlug(
      nextRouteSlug,
      ['title'],
      groupDir,
      locale
    )
    return {
      nextRoute: {
        path: `/${groupDir}/${nextRoutePath}`,
        title: nextRouteTitle.title as string
      },
      previousRoute: null
    }
  }

  if (isLast) {
    const previousRoutePath = articlePaths[currentIndex - 1]
    const previousRouteSlug = previousRoutePath.split('/').slice(1)
    const previousRouteTitle = getArticleBySlug(
      previousRouteSlug,
      ['title'],
      groupDir,
      locale
    )
    return {
      nextRoute: null,
      previousRoute: {
        path: `/${groupDir}/${previousRoutePath}`,
        title: previousRouteTitle.title as string
      }
    }
  }

  const nextRoutePath = articlePaths[currentIndex + 1]
  const nextRouteSlug = nextRoutePath.split('/').slice(1)
  const nextRouteTitle = getArticleBySlug(
    nextRouteSlug,
    ['title'],
    groupDir,
    locale
  )
  const previousRoutePath = articlePaths[currentIndex - 1]
  const previousRouteSlug = previousRoutePath.split('/').slice(1)
  const previousRouteTitle = getArticleBySlug(
    previousRouteSlug,
    ['title'],
    groupDir,
    locale
  )

  return {
    nextRoute: {
      path: `/${groupDir}/${nextRoutePath}`,
      title: nextRouteTitle.title as string
    },
    previousRoute: {
      path: `/${groupDir}/${previousRoutePath}`,
      title: previousRouteTitle.title as string
    }
  }
}
