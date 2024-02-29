import Link from '@/components/routing/Link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

export default function GoToQuickstartRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="py-24">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-40 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl dark:bg-gray-950 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.5"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="bg-gradient-to-b from-white via-gray-200 to-gray-300 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl">
                {t('home:GoToQuickstartRow.title1')}
                <br />
                {t('home:GoToQuickstartRow.title2')}
              </h2>
              <p className="mt-6 text-sm leading-8 text-gray-300 sm:text-lg">
                {t('home:GoToQuickstartRow.description')}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link
                  href="/doc/skeet-firestore/quickstart"
                  className="bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </Link>
                <a
                  href="https://github.com/elsoul/skeet-cli"
                  className="text-sm font-semibold leading-6 text-white hover:text-gray-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <Image
                className="absolute left-0 top-0 w-[42rem] max-w-none bg-white/5"
                src="https://storage.googleapis.com/skeet-assets/animation/skeet-chat-latest.gif"
                alt="Skeet App"
                width={1824}
                height={1080}
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
