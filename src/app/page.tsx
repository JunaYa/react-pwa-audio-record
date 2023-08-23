import AudioRecorder from "~/ui/AudioRecorder";

export default function Home() {

  return (
    <main className="bg-#333 flex min-h-screen flex-col items-center justify-between p-24">
      <div className='text-center font-bold w-48 bg-white shadow rounded'>Title</div>
      <AudioRecorder autoAuth />
    </main>
  )
}
