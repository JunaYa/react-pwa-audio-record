'use client'
import { List } from 'antd-mobile'
import pkg from '../../../../package.json'
import { useTranslation } from '~/i18n/client'
import { useRouter } from 'next/navigation'
const PersonPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang, 'person')
  const router = useRouter()
  return (
    <main>
      <div>{pkg.name}</div>
      <div>{pkg.version}</div>
      <List>
        <List.Item clickable onClick={() => router.push('/setting')}>
          {t('button.setting')}
        </List.Item>
        <List.Item clickable onClick={() => router.push('/about')}>
          {t('button.about')}
        </List.Item>
      </List>
    </main>
  )
}

export default PersonPage