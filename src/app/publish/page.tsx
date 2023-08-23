'use client'
import AudioRecorder from "~/ui/Recorder";

export default function Home() {

  const onFinish = () => {}

  return (
    <main className="h-full lex flex-col items-center justify-between px-24">
      <div className='text-center font-bold w-48 bg-white shadow rounded'>Title</div>
      <AudioRecorder onFinish={onFinish}/>
    </main>
  )
}
