'use client'
import { List, NavBar, Space, Switch } from "antd-mobile"
import { PayCircleOutline, SetOutline, UnorderedListOutline } from "antd-mobile-icons"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "~/i18n/client"
import { SwitchLanguage } from "~/ui/SwitchLanguage"

const SettingPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang, 'setting')
  const router = useRouter()
  
  return (
    <main className="w-full bg-white">
      <NavBar onBack={() => router.back()}>{t('title')}</NavBar>
      <Space />
      <List>
        <SwitchLanguage t={t} lang={lang} path="setting"/>
      </List>
    </main>
  )
}

export default SettingPage