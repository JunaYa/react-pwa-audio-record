'use client'

import React, { FC, ReactNode, useState } from 'react'
import { Toast, Dialog, Button, SpinLoading } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { putDelete, putUpload } from '~/lib/s3'

const ALBUM_NAME = 'audios'

type Props = {
  file: File
  maxCount?: number,
  size?: number,
  children?: ReactNode
}
const UploadAudio: FC<Props> = (props) => {
  const { file, maxCount = 1, size = 10, children } = props 
  const [loading, setLoading] = useState<boolean>(false)

  const beforeUpload = () => {
    if (!file) {
      return null
    }
    if (file.size > 1024 * 1024 * size) {
      Toast.show(`请选择小于 ${size}M 的w文件`)
      return null
    }
    return file
  }

  const onCountExceed = (exceed: number) => {
    Toast.show(`最多选择 ${maxCount} 个文件，你多选了 ${exceed} 个`)
  }

  const handleUpload = async () => {
    const check = await beforeUpload()
    if (!check) return
    
    setLoading(true)
    const result = await putUpload({
      file,
      albumName: ALBUM_NAME,
    })
    Toast.show(result.message)
    setLoading(false)
  }

  const onDelete = async (item: ImageUploadItem) => {
    const isOK: boolean = await Dialog.confirm({ content: '是否确认删除' })

    if (!isOK) return true

    const id = item.url.split(`${ALBUM_NAME}/`)[1]
    const result = await putDelete(ALBUM_NAME, id)
    return result.success
  }

  return (
    <Button
      loading={loading}
      loadingIcon={<SpinLoading color='red' style={{width: '1rem', height: '1rem'}}/>}
      loadingText='上传中'
      onClick={handleUpload}
      className='frc-center gap-4'
    >
      {children ? children : '上传'}
    </Button>
  )
}

export default UploadAudio