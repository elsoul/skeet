import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import useI18nRouter from '@/hooks/useI18nRouter'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type Props = {
  version: 'Ver.1' | 'Ver.2'
}

export default function DocsVersionChanger({ version }: Props) {
  const { routerPush } = useI18nRouter()

  return (
    <>
      <Menu as="div">
        <Menu.Button
          className={clsx(
            'text-gray-600 dark:text-gray-200',
            'group inline-flex items-center justify-center border border-gray-600 px-3 py-1 text-base font-medium hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-200'
          )}
        >
          <span
            className={clsx(
              'ml-1 mt-1.5 h-1.5 w-1.5 translate-x-[-100%] translate-y-[-50%] transform rounded-full',
              version === 'Ver.2' ? 'bg-green-600' : 'bg-gray-400'
            )}
          />
          <span className="ml-1 text-sm group-hover:opacity-80">{version}</span>
          <ChevronDownIcon className="-mr-1 ml-1 h-3 w-3" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Menu.Items className="fixed z-20 mt-3 h-auto w-32 transform px-2">
            <div className="shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white">
              <Menu.Item>
                {({ close }) => (
                  <>
                    <div
                      className="group relative z-50 inline-flex w-full items-center bg-white px-5 py-6 text-gray-900 hover:cursor-pointer dark:bg-gray-800 dark:text-white"
                      role="button"
                      onClick={async () => {
                        await routerPush('/doc/')
                        close()
                      }}
                    >
                      <span className="ml-2 mt-1.5 h-1.5 w-1.5 translate-x-[-100%] translate-y-[-50%] transform rounded-full bg-green-600 group-hover:opacity-60"></span>
                      <span className="ml-2 text-sm group-hover:opacity-60">
                        Ver.2
                      </span>
                    </div>
                  </>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ close }) => (
                  <>
                    <div
                      className="group relative z-50 inline-flex w-full items-center bg-white px-5 py-6 text-gray-900 hover:cursor-pointer dark:bg-gray-800 dark:text-white"
                      role="button"
                      onClick={async () => {
                        await routerPush('/v1doc/')
                        close()
                      }}
                    >
                      <span className="ml-2 mt-1.5 h-1.5 w-1.5 translate-x-[-100%] translate-y-[-50%] transform rounded-full bg-gray-400 group-hover:opacity-60"></span>
                      <span className="ml-2 text-sm group-hover:opacity-60">
                        Ver.1
                      </span>
                    </div>
                  </>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
