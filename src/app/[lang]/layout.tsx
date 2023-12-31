'use client'
import './globals.css'
import 'uno.css'
import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import BottomNavBar from '~/ui/BottomNavBar'
import { languages } from '~/i18n/setting'
import { Metadata } from 'next/types'
import { usePathname } from 'next/navigation'
import { SessionProvider } from "next-auth/react"
import { Providers } from '~/context/RainbowProvider'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

// const APP_NAME = 'PWA App'
// const APP_DESCRIPTION = 'This pwa app'
// export const metadata: Metadata = {
//   applicationName: APP_NAME,
//   title: {
//     default: APP_NAME,
//     template: "%s - PWA App",
//   },
//   description: APP_DESCRIPTION,
//   manifest: "/manifest.json",
//   themeColor: "#FFFFFF",
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "default",
//     title: APP_NAME,
//   },
//   formatDetection: {
//     telephone: false,
//   },
//   icons: {
//     shortcut: "/favicon.ico",
//     apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
//   },
// };

export default function RootLayout({
  children,
  params: {
    lang
  },
}: {
  children: React.ReactNode,
  params: { lang: string, },
}) {
  const pathname = usePathname()
  const urls = ['/publish', '/person', '/home']
  
  return (
    <html lang={lang} dir={dir(lang)}>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        <link rel="manifest" href="/site.webmanifest"></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body className={`${inter.className} h-screen min-h-screen max-h-screen w-full fcc-between`}>
        <div className='flex-1 w-full overflow-y-scroll'>
          <Providers>{children}</Providers>
        </div>
        {!!urls.find(item => pathname?.includes(item)) && <div className='flex-0 w-full bg-white shadow self-end'>
          <BottomNavBar />
        </div>}
      </body>
    </html >
  )
}
