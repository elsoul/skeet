import appInfo from '@appInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faDiscord,
  faGithub,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

export function GithubIconLink() {
  return (
    <a
      href={`https://github.com/${appInfo.githubRepo}`}
      className="hover:opacity-80"
      rel="noopener noreferrer"
      target="_blank"
    >
      {
        //@ts-ignore
        <FontAwesomeIcon
          icon={faGithub}
          className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
        />
      }
    </a>
  )
}

export function TwitterIconLink() {
  return (
    <a
      href={`https://x.com/${appInfo.twitterId}`}
      className="hover:opacity-80"
      rel="noopener noreferrer"
      target="_blank"
    >
      {
        //@ts-ignore
        <FontAwesomeIcon
          icon={faXTwitter}
          className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
        />
      }
    </a>
  )
}

export function DiscordIconLink() {
  return (
    <a
      href={`${appInfo.discordInviteURL}`}
      className="hover:opacity-80"
      rel="noopener noreferrer"
      target="_blank"
    >
      {
        // @ts-ignore
        <FontAwesomeIcon
          icon={faDiscord}
          className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
        />
      }
    </a>
  )
}
