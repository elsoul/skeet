import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { logoHorizontal, logoHorizontalInvert } from '@/assets/img'
import { blurDataURL, cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

type Props = {
  className?: string
  href?: string
  onClick?: () => void
}

export default function LogoHorizontalLink({
  className,
  href = '/',
  ...rest
}: Props) {
  const t = useTranslations()
  return (
    <>
      <Link href={href} {...rest} aria-label={t('metadata.appTitle')}>
        <Image
          src={logoHorizontal}
          alt={t('metadata.appTitle')}
          className={cn('hover:opacity-80 dark:hidden', className)}
          unoptimized
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        <Image
          src={logoHorizontalInvert}
          alt={t('metadata.appTitle')}
          className={cn('hidden hover:opacity-80 dark:block', className)}
          unoptimized
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </Link>
    </>
  )
}
