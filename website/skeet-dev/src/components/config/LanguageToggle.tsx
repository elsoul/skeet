'use client'

import { GlobeIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter, usePathname } from '@/navigation'

export function LanguageToggle() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Language">
          <GlobeIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.replace(pathname, { locale: 'en' })}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.replace(pathname, { locale: 'ja' })}
        >
          日本語
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
