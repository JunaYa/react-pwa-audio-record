'use client'
import './AudioRecorder.module.css'
import React, { useState } from "react";
import { Player } from '@lottiefiles/react-lottie-player';

interface IProps {
  onFinish: ({ id, audio }: { id: string; audio: Blob }) => void;
}

const AudioRecorder: React.FC<IProps> = ({ onFinish }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [voiceRecorder, setVoiceRecorder] = useState<MediaRecorder | null>(null);
  const [content, setContent] = useState<Blob | null>(null);
  
  const player = React.useRef<any>(null);

  const onAudioClick = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(audioStream);

      setStream(audioStream);
      setVoiceRecorder(mediaRecorder);
      setIsRecording(true);
      player.current.play();
    } catch (e) {
      console.log("User didn't allowed us to access the microphone.");
    }
  };

  const onStopRecording = () => {
    if (!isRecording || !stream || !voiceRecorder) return;

    const tracks = stream.getAudioTracks();

    for (const track of tracks) {
      track.stop();
    }

    voiceRecorder.stop();

    setVoiceRecorder(null);
    setIsRecording(false);
    player.current.stop();
  };

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        // setPermission(true);
        setStream(streamData);
      } catch (err: any) {
          alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
};

  /**
   * This hook is triggered when we start the recording
   */
  React.useEffect(() => {
    if (!isRecording || !voiceRecorder) return;

    voiceRecorder.start();

    voiceRecorder.ondataavailable = ({ data }) => setContent(data);
  }, [isRecording, voiceRecorder]);

  /**
   * This hook will call our callback after finishing the record
   */
  React.useEffect(() => {
    if (isRecording || !content || !stream) return;

    onFinish({ id: stream.id, audio: content });

    setStream(null);
    setContent(null);
  }, [isRecording, content]);

  return (
   <div className='fcc-center'>
    {/* <div className="request-loader my-8 frc-center w-24 h-24 rounded-full bg-white">
      <div className='w-12 h-12 rounded-full frc-center'>audio</div>
    </div> */}

    <Player
      ref={player}
      loop
      autoplay={false}
      controls={true}
      speed={0.6}
      src="https://lottie.host/f6449572-524b-4122-afe1-6b4d084b81c0/CpdBSeXDDG.json"
      style={{ height: '300px', width: '300px' }}
    >
    </Player>
     <div
      onClick={!isRecording ? onAudioClick : onStopRecording}
      className="text-white"
    >
      {!isRecording ? "长按开始" : "松开结束录制"}
    </div>
   </div>
  );
};

export default AudioRecorder;