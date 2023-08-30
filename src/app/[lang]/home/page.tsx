'use client'

import { NavBar } from "antd-mobile"
import { useTranslation } from "~/i18n/client"

export default function Home({ params: { lang } }: { params: { lang: string } }) {
  const { t } = useTranslation(lang, 'home')
  return (
    <main className="lex h-full flex-col items-center justify-between px-24">
      Home page
      <NavBar back={null} >{t('title')}</NavBar>
    </main>
  )
}
