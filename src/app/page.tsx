'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import useIsMounted from '~/hooks/useIsMounted';
import AudioRecorder from "~/ui/AudioRecorderWrapper";
import ClientComponent from '~/ui/ClientComponnet';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default function Home() {
  const router = useRouter()
  const isMounted = useIsMounted()
  const [start, setStart] = useState(false)
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
    <main className="lex h-full flex-col items-center justify-between px-24">
      Main page
      <button onClick={() => setStart(true)}>start</button>
      {/* {start && <AudioRecorder />} */}
      <ClientComponent />
    </main>
  )
}
