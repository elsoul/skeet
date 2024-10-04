import fs from 'fs'
import { glob } from 'glob'
import { join } from 'path'
import matter from 'gray-matter'
import { getGroupDir, uniqueArray, truncateContent } from './utils'
import { locales } from '@/app/config'

type Items = {
  [key: string]: string | string[]
}

export const getArticleBySlug = (
  slugArray: string[],
  fields: string[] = [],
  articleDirPrefix: string,
  locale: string,
) => {
  const articlesDirectory = join(
    process.cwd(),
    `articles/${articleDirPrefix}/${locale}`,
  )
  const matchedSlug = slugArray.join('/')
  const realSlug = matchedSlug.replace(/\.md$/, '')
  const fullPath = join(articlesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'content') {
      items[field] = content
    }

    if (field === 'date') {
      const date = slugArray[0] + '.' + slugArray[1] + '.' + slugArray[2]
      items[field] = date
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export const getAllArticles = (articleDirPrefix: string) => {
  const entries = glob.sync(`articles/${articleDirPrefix}/**/*.md`)

  const slugs = entries
    .map((file) => file.split(articleDirPrefix).pop())
    .map((slug) => {
      const parts = (slug as string).replace(/\.md$/, '').split('/')
      parts.shift()
      parts.shift()
      return parts
    })
    .filter((slug) => slug.length > 0)

  return uniqueArray(slugs)
}

export type ArticlePageProps = {
  params: {
    locale: string
    slug: string[]
  }
}

export const getDataForArticlePageByFilename = (filename: string) => {
  const groupDir = getGroupDir(filename)
  return {
    groupDir,
    generateMetadata: ({ params: { locale, slug } }: ArticlePageProps) => {
      const metadata = getArticleBySlug(
        slug,
        ['title', 'thumbnail', 'content'],
        groupDir,
        locale,
      )

      const description = truncateContent(metadata.content, 160)

      return {
        title: metadata.title,
        description,
        openGraph: {
          images: [metadata.thumbnail],
        },
        twitter: {
          images: [metadata.thumbnail],
        },
      }
    },
    generateStaticParams: () => {
      const paths = locales.flatMap((locale) => {
        const articles = getAllArticles(groupDir)

        return articles.map((slug) => ({
          locale,
          slug,
        }))
      })
      return paths
    },
    getArticlePaths: () => {
      const articles = getAllArticles(groupDir)
      return articles.map((slug) => `/${slug.join('/')}`)
    },
  }
}

export type ArticleData = { article: Items; url: string }

export const getArticleForIndex = (
  groupDir: string,
  matterArray: string[],
  locale: string,
): ArticleData[] => {
  const slugs: string[][] = getAllArticles(groupDir)

  const articles = slugs.map((slug) =>
    getArticleBySlug(slug, matterArray, groupDir, locale),
  )

  const urls = slugs.map((slug) => `/${groupDir}/${slug.join('/')}`)

  return articles.map((article, index) => ({
    article,
    url: urls[index],
  }))
}

export type SubItem = {
  title: string
  route: string
}

export type Item = {
  title: string
  route?: string
  subItems?: SubItem[]
}

export type Section = {
  title: string
  route: string
  items?: Item[]
}

export const getAllRoutes = (menuData: Section[]) => {
  const routes: string[] = []

  const collectRoutes = (items: any[]) => {
    items.forEach((item) => {
      if (item.route) {
        routes.push(item.route)
      }
      if (item.items) {
        collectRoutes(item.items)
      }
      if (item.subItems) {
        collectRoutes(item.subItems)
      }
    })
  }

  collectRoutes(menuData)

  return routes
}
