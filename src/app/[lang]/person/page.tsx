'use client'
import { Button, List, NavBar } from 'antd-mobile'
import pkg from '../../../../package.json'
import { useTranslation } from '~/i18n/client'
import { useRouter } from 'next/navigation'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { signIn, signOut } from "next-auth/react"
import { getServerSession } from "next-auth/next"

const PersonPage = ({ params: { lang } }: { params: { lang: string } }) => {
  const { t } = useTranslation(lang, 'person')
  const router = useRouter()
  const session = getServerSession()
  console.log('session', session)
  
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
      <Button block color='primary' onClick={() => signIn()}>SignIn</Button>
      <Button block onClick={() => signOut()}>SignOut</Button>
    </main>
  )
}

export default PersonPage