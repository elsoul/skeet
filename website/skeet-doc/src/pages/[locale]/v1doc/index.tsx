import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import type { ReactElement } from 'react'
import DocLayout from '@/layouts/v1doc/DocLayout'
import { getStaticPaths } from '@/lib/getStatic'
import { getI18nProps } from '@/lib/getStatic'
import DocIndex from '@/components/articles/v1doc/DocIndex'

const articleDirName = 'v1doc'

const seo = {
  pathname: `/${articleDirName}`,
  title: {
    ja: 'Skeet v1 ドキュメント トップページ',
    en: 'Skeet v1 Docs Top Page',
  },
  description: {
    ja: 'Skeet v1 ドキュメントトップページ',
    en: 'Skeet v1 Docs top page',
  },
  img: null,
}

export default function DocIndexPage() {
  return (
    <>
      <DocIndex />
    </>
  )
}

DocIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <DocLayout>{page}</DocLayout>
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx, ['common', articleDirName], seo)),
    },
  }
}

export { getStaticPaths }
