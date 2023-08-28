import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLang, languages } from '~/i18n/setting'
import type { NextRequest } from 'next/server'
acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lang*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

const cookieName = 'i18next'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) return NextResponse.next()
  let lang
  if (req.cookies.has(cookieName)) {
    lang = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  }
  if (!lang) lang = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lang) lang = fallbackLang

  // Redirect if lang in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lang}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const response = NextResponse.next()
    const referer = req.headers.get('referer')
    if (referer) {
      const refererUrl = new URL(referer)
      const langInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
      if (langInReferer) response.cookies.set(cookieName, langInReferer)
    }
    return response
  }

  return NextResponse.next()
}