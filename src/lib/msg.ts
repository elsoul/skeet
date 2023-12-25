import { LOG } from '@/config/log'
import i18n from 'i18n'

i18n.configure({
  locales: ['en', 'ja'],
  directory: __dirname + '/lib/locales',
})

export function msg(logEnum: LOG, lang: string = 'en') {
  i18n.setLocale(lang)
  return i18n.__(logEnum)
}
