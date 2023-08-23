'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Recorder from 'recorder-core'
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'
import 'recorder-core/src/extensions/waveview'

import pauseSVG from '~/assets/icons/pause.svg';
import resumeSVG from '~/assets/icons/play.svg';
import saveSVG from '~/assets/icons/save.svg';
import discardSVG from '~/assets/icons/stop.svg';
import { formatMs } from '~/utils/fomat'
import { createObjectURL, revokeObjectURL } from '~/utils/media'

type Props = {
  autoAuth?: boolean
}

type Status = 'idle' | 'recording' | 'paused' | 'stop'
enum StatusEnum {
  IDLE = 'idle',
  RECOERDING = 'recording',
  PAUSED = 'paused',
  STOP = 'stop',
}

const AudioRecorder: React.FC<Props> = (props) => {
  const { autoAuth } = props
  const [status, setStatus] = useState<Status>(StatusEnum.IDLE)
  const [duration, setDuration] = useState<string>('')
  const audioRef = useRef(null)
  const [instance, setInstance] = useState<any>()
  const [recBlob, setRecBlob] = useState<any>()
  // const [wave, setWave] = useState<any>()
  let wave: any = null

  const resetData = () => {
    setInstance(null)
    // setWave(null)
    setRecBlob(null)
    // recBlob = null;
    wave = null;
  }

  /**
   * 调用 open 打开录音请求好录音权限
   */
  const handleRecordAuthOpen = useCallback(() => {

    if (instance) {
      return
    }

    resetData()

    const onProcess = (buffers: any, powerLevel: any, bufferDuration: any, bufferSampleRate: any, newBufferIdx: any, asyncEnd: any) => {
      //录音实时回调，大约1秒调用12次本回调
      setDuration(formatMs(bufferDuration, 1))
      //可视化图形绘制
      wave?.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate);
    }
    const newRec = Recorder({
      type: 'mp3',
      sampleRate: 16000,
      bitRate: 16, //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
      onProcess
    })
    //我们可以选择性的弹一个对话框：为了防止移动端浏览器存在第三种情况：用户忽略，并且（或者国产系统UC系）浏览器没有任何回调，此处demo省略了弹窗的代码
    // createDelayDialog();
    newRec.open(() => {//打开麦克风授权获得相关资源
      // dialogCancel(); //如果开启了弹框，此处需要取消

      setInstance(newRec)

      //此处创建这些音频可视化图形绘制浏览器支持妥妥的
      // wave = Recorder.WaveView({ elem: '.recwave' });

      console.log('已打开录音，可以点击录制开始录音了');
    }, (msg: any, isUserNotAllow: any) => {//用户拒绝未授权或不支持
      // dialogCancel(); //如果开启了弹框，此处需要取消
      console.log((isUserNotAllow ? 'UserNotAllow，' : '') + '打开录音失败：' + msg, 1);
    });
  }, [])

  /**
   * 关闭录音，释放资源
   */
  const handleRecordAuthClose = useCallback(() => {
    if (instance) {
      instance.close();
    }
  }, [])

  /**
   * 开始录音
   */
  const handleRecordStart = () => {
    console
    if (instance && Recorder.IsOpen()) {
      setRecBlob(null)
      instance.start();
      setStatus(StatusEnum.RECOERDING)
    } else {
      console.log('未打开录音', instance)
      // 未打开录音
    };
  }

  /**
   * 停止录音
   */
  const handleRecordStop = () => {
    if (!(instance && Recorder.IsOpen())) {
      // 未打开录音
      return;
    };
    instance.stop((blob: any, duration: any) => {
      console.log(blob, createObjectURL(blob), '时长:' + duration + 'ms');
      setRecBlob(blob)
      console.log('已录制mp3：' + formatMs(duration) + 'ms ' + blob.size + '字节，可以点击播放、上传了');
      setStatus(StatusEnum.STOP)
    }, (msg: any) => {
      console.log('录音失败:', msg)
    });
  }

  /**
   * 暂停录音
   */
  const handleRecordPause = () => {
    if (instance && Recorder.IsOpen()) {
      instance.pause();
      setStatus(StatusEnum.PAUSED)
    } else {
      // 未打开录音
    };
  }

  /**
   * 恢复录音
   */
  const handleRecordResume = () => {
    if (instance && Recorder.IsOpen()) {
      instance.resume();
      setStatus(StatusEnum.RECOERDING)
    } else {
      // 未打开录音
    };
  }

  /**
   * 音频播放
   */
  const handleAudioPlay = () => {
    if (!recBlob) {
      console.log('请先录音，然后停止后再播放');
      return;
    };
    console.log('播放中');
    //简单利用URL生成播放地址，注意不用了时需要revokeObjectURL，否则霸占内存
    const url = createObjectURL(recBlob)
    
    const audioElement: any = document.querySelector("audio");
    audioElement.src = url
    audioElement.play()
    setTimeout(function () {
      revokeObjectURL(url);
    }, 5000);
  }

  // useEffect(() => {
  //   if (autoAuth) {
  //     handleRecordAuthOpen()
  //   }
  //   return () => {
  //     handleRecordAuthClose()
  //   }
  // }, [autoAuth])

  return (
    <>
      <div className='flex flex-row items-center justify-center gap-8'>
        <div>
          <button onClick={handleRecordAuthOpen} >打开录音,请求权限</button>
          <button onClick={handleRecordAuthClose} >关闭录音,释放资源</button>
        </div>

        <div className='bg-white shadow'>
          <button className='p-4 bg-red' type='button' onClick={handleRecordStop} >停止</button>
          <button className='p-4' onClick={handleRecordPause}>暂停</button>
        </div>
        <button className='p-4 bg-green' type='button' onClick={handleRecordStart}>录制</button>
        {status === StatusEnum.PAUSED && <button onClick={handleRecordResume}>继续</button>}
        <span >
          <button onClick={handleAudioPlay}>播放</button>
        </span>
      </div>
      <div className='inline-block border-#ccc vertical-bottom'>
        <div className="recwave h-100px w-300px" />
      </div >
      <audio id="audio" crossOrigin="anonymous"></audio>
    </>

  )
}
export default AudioRecorder
