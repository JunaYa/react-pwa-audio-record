'use client'
import { useRouter } from 'next/navigation'
import AudioRecorder from "~/ui/Recorder";

export default function Home() {
  const router = useRouter()
  // router.prefetch('/home')
  // router.prefetch('/publish')
  // router.prefetch('/person')

  return (
    <main className="h-full lex flex-col items-center justify-between px-24">
      Main page
    </main>
  )
}
