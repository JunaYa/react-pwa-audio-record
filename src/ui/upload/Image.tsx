'use client'

import React, { FC, ReactNode, useState } from 'react'
import { ImageUploader, Toast, Dialog } from 'antd-mobile'
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { PictureOutline } from 'antd-mobile-icons'
import { delay } from '~/lib/delay'

type Props = {
  maxCount?: number
  children?: ReactNode
}
const UploadImage: FC<Props> = (props) => {
  const { maxCount = 1, children } = props 
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])

  const beforeUpload = (file: File) => {
    if (file.size > 1024 * 1024) {
      Toast.show('请选择小于 1M 的图片')
      return null
    }
    return file
  }

  const onCountExceed = (exceed: number) => {
    Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
  }

  const handleUpload = async (file: File) => {
    await delay(3000)
    return {
      url: URL.createObjectURL(file),
    }

    // mock upload error status
    // throw new Error('Fail to upload')
  }

  const onDelete = () => {
    return Dialog.confirm({
      content: '是否确认删除',
    })
  }

  return (
    <ImageUploader
      value={fileList}
      onChange={setFileList}
      upload={handleUpload}
      beforeUpload={beforeUpload}
      multiple={maxCount > 1}
      maxCount={maxCount}
      showUpload={fileList.length < maxCount}
      onCountExceed={onCountExceed}
      onDelete={onDelete}
    >
      {children
        ? 
        children 
        : 
        <div className='w-32 h-32 rounded-2 bg-#f5f5f5 text-#999999 frc-center'>
          <PictureOutline style={{ fontSize: 32 }} />
        </div>
      }
    </ImageUploader>
  )
}

export default UploadImage