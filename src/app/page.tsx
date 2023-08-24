'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import useIsMounted from '~/hooks/useIsMounted';
import AudioRecorder from "~/ui/AudioRecorderWrapper";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default function Home() {
  const router = useRouter()
  const isMounted = useIsMounted()
  // router.prefetch('/home')
  // router.prefetch('/publish')
  // router.prefetch('/person')

  useEffect(() => {
    void delay(1000).then(() => {
      navigator.setAppBadge(125);
    })
  }, [isMounted])

  console.log('isMounted', isMounted)

  return (
    <main className="h-full lex flex-col items-center justify-between px-24">
      Main page
      {/* <AudioRecorder /> */}
    </main>
  )
}
