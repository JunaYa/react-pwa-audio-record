'use client'
import AudioRecorder from "~/ui/Recorder";

export default function Home() {

  const onFinish = () => {}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='text-center font-bold w-48 bg-white shadow rounded'>Title</div>
      <AudioRecorder onFinish={onFinish}/>
    </main>
  )
}
