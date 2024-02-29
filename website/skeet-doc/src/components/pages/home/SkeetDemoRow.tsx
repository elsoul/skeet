import { useTranslation } from 'next-i18next'

export default function SkeetDemoRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="relative isolate">
        <svg
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)] dark:stroke-gray-600"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg
            x="50%"
            y={-1}
            className="overflow-visible fill-gray-50 dark:fill-gray-600"
          >
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          />
        </svg>
        <div className="mx-auto max-w-7xl px-6 py-64 sm:py-96 lg:px-8">
          <p className="mb-8 text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-4xl">
            {t('home:SkeetDemoRow.title1')}
          </p>
          <p className="text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white sm:text-5xl">
            {t('home:SkeetDemoRow.title2')}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="https://skeeter.dev/"
              className="bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:bg-white dark:text-gray-900"
              rel="noreferrer"
              target="_blank"
            >
              {t('home:SkeetDemoRow.button')}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
