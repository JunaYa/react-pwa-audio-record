'use-client' 
import AudioRecorder from "~/ui/AudioRecorder";
const AudioRecorderWrapper = () => {
  if ((typeof window !== 'undefined')) {
    return null
  }
  return <AudioRecorder />
}
export default AudioRecorderWrapper