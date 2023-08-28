'use client'

import { useTranslation } from "~/i18n/client"

const AboutPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang, 'about')
  return (
    <div>
      abount page
      <p>
        {t('version', {version: '1.0.0'})}
      </p>
    </div>
  )
}

export default AboutPage