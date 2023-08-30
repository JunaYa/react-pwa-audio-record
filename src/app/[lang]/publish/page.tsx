'use client'
import AudioRecorder from "~/ui/AudioRecorder";
import { useTranslation } from "~/i18n/client"
import { NavBar } from "antd-mobile";

export default function PublishPage({ params: { lang } }: { params: { lang: string } }) {
  const { t } = useTranslation(lang, 'publish')
  return (
    <main className="h-full flex-col items-center justify-between">
      <NavBar back={null} >{t('title')}</NavBar>
      <AudioRecorder autoAuth/>
    </main>
  )
}
