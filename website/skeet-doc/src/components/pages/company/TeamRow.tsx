import { useTranslation } from 'next-i18next'
import fumitakeKawasaki from '@/assets/img/team/FumitakeKawasaki.jpg'
import shotaKishi from '@/assets/img/team/ShotaKishi.jpg'
import jamesNeveYasui from '@/assets/img/team/JamesNeveYasui.jpg'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

const people = [
  {
    name: 'FumitakeKawasaki',
    image: fumitakeKawasaki,
    twitterUrl: 'https://twitter.com/kawasaki4SOL',
    linkedinUrl: 'https://www.linkedin.com/in/fumitake-kawasaki/',
    githubUrl: 'https://github.com/POPPIN-FUMI',
  },
  {
    name: 'ShotaKishi',
    image: shotaKishi,
    twitterUrl: 'https://twitter.com/kishi4SOL',
    linkedinUrl: 'https://www.linkedin.com/in/kishithemechanic/',
    githubUrl: 'https://github.com/KishiTheMechanic',
  },
  {
    name: 'JamesNeveYasui',
    image: jamesNeveYasui,
    twitterUrl: 'https://twitter.com/James__SOULs',
    linkedinUrl: 'https://www.linkedin.com/in/james-neve-phd-77b68914/',
    githubUrl: 'https://github.com/jamesneve',
  },
]

export default function TeamRow() {
  const { t } = useTranslation()
  return (
    <>
      <div className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-5">
          <div className="max-w-2xl xl:col-span-2">
            <h2 className="text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-gray-50 sm:text-5xl">
              {t('company:TeamRow.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              {t('company:TeamRow.body')}
            </p>
          </div>
          <ul
            role="list"
            className="-mt-12 space-y-12 divide-y divide-gray-200 xl:col-span-3"
          >
            {people.map((person) => (
              <li
                key={person.name}
                className="flex flex-col gap-10 pt-12 sm:flex-row"
              >
                <Image
                  className="aspect-[4/5] w-52 flex-none rounded-md object-cover"
                  src={person.image}
                  alt={t(`company:TeamRow.${person.name}.name`)}
                  unoptimized
                />
                <div className="max-w-xl flex-auto">
                  <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-50">
                    {t(`company:TeamRow.${person.name}.name`)}
                  </h3>
                  <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                    {t(`company:TeamRow.${person.name}.role`)}
                  </p>
                  <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {t(`company:TeamRow.${person.name}.bio`)}
                  </p>
                  <ul role="list" className="mt-6 flex gap-x-6">
                    <li>
                      <a
                        href={person.twitterUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Twitter</span>
                        <FontAwesomeIcon
                          icon={faTwitter}
                          size="lg"
                          aria-label="Twitter"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={person.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          size="lg"
                          aria-label="LinkedIn"
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href={person.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <FontAwesomeIcon
                          icon={faGithub}
                          size="lg"
                          aria-label="GitHub"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
