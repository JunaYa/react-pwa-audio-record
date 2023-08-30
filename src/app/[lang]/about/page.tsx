'use client'

import { NavBar } from "antd-mobile"
import { useRouter } from "next/navigation"
import { useTranslation } from "~/i18n/client"
import pkg from '../../../../package.json'

const AboutPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang, 'about')
  const router = useRouter()
  return (
    <div>
      <NavBar onBack={() => router.back()}>{t('title')}</NavBar>
      <p>
        {t('version', {version: pkg.version})}
      </p>
    </div>
  )
}

export default AboutPage