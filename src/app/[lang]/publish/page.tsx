'use client'
import AudioRecorder from "~/ui/AudioRecorder";

export default function PublishPage() {

  return (
    <main className="lex h-full flex-col items-center justify-between px-24">
      <div className='w-48 rounded bg-white text-center font-bold shadow'>Title</div>
      <AudioRecorder />
    </main>
  )
}
