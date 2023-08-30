'use client'
import { List, NavBar } from 'antd-mobile'
import pkg from '../../../../package.json'
import { useTranslation } from '~/i18n/client'
import { useRouter } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const PersonPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang, 'person')
  const router = useRouter()
  return (
    <main>
      <NavBar back={null} >{t('title')}</NavBar>
      <List>
        <List.Item clickable={false} extra={pkg.name}>
          {t('button.name')}
        </List.Item>
        <List.Item clickable={false} extra={pkg.version}>
          {t('button.version')}
        </List.Item>
        <List.Item clickable onClick={() => router.push('/setting')}>
          {t('button.setting')}
        </List.Item>
        <List.Item clickable onClick={() => router.push('/about')}>
          {t('button.about')}
        </List.Item>
      </List>
      <ConnectButton></ConnectButton>
    </main>
  )
}

export default PersonPage