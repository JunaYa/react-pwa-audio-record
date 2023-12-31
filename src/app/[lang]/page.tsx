import { useTranslation } from '~/i18n';
import { fallbackLang, languages } from '~/i18n/setting';
import ClientComponent from '~/ui/ClientComponnet';
import UploadImage from '~/ui/upload/Image';

// export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
//   const { t } = await useTranslation(lang)
//   return { title: t('h1') }
// }

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  if (languages.indexOf(lang) < 0) lang = fallbackLang
  const { t } = await useTranslation(lang, 'common')

  // router.prefetch('/home')
  // router.prefetch('/publish')
  // router.prefetch('/person')

  return (
    <main className="lex h-full flex-col items-center justify-between px-24">
      Main page
      <div>{t('welcome')}</div>
      <ClientComponent />
      <UploadImage />
    </main>
  )
}
