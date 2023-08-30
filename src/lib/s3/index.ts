import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

const AWS_REGION = "us-east-1"
const IDENTITY_POOL_ID = "us-east-1:7d1d2487-6957-4c8a-a000-e64971c6e65c"
const BUCKET_NAME = "deschooldev"
// const BUCKET_INPUT_PREFIX="courseVideos"

// Initialize the Amazon Cognito credentials provider
const s3 = new S3Client({
  region: AWS_REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: AWS_REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
})

const putDelete = async (albumName: string, filename: string): Promise<{success: boolean, message: string}> => {
  let success = false
  let message = ''
  try {
    const albumPhotosKey = `${albumName}/${filename}`
    const resourceKey = albumPhotosKey
    const params = { Key: resourceKey, Bucket: BUCKET_NAME }
    const result = await s3.send(new DeleteObjectCommand(params))
    message = 'Successfully deleted photo.'
    success = true
  } catch (err) {
    if (err instanceof Error) {
      message = err.message
    } else {
      message = 'There was an error deleting your photo'
    }
    success = false
  }
  return {
    success,
    message,
  }
}

type UploadPictureParams = {
  file: File
  albumName: string
  start?: () => void
  success?: (urls: string) => void
  fail?: (err: Error) => void
  complete?: () => void
}

const putUpload = async (params: UploadPictureParams): Promise<{success: boolean, message: string, url: string}> => {
  const { file, albumName } = params
  let success = false
  let message = ''
  let url = ''
  try {
    const extentions = file?.name?.split('.')?.pop()
    const uuid = `${uuidv4()}.${extentions}`
    const albumPhotosKey = `${albumName}/${uuid}`
    const resourceKey = albumPhotosKey
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: resourceKey,
      Body: file,
      ContentType: file?.type,
    }
    // 开始上传
    if (params.start) {
      params.start()
    }
    const result = await s3.send(new PutObjectCommand(uploadParams))
    if (result['$metadata'].httpStatusCode === 200) {
      success = true
      message = 'Successfully upload photo.'
      url = `https://${BUCKET_NAME}.s3.amazonaws.com/${resourceKey}`
      // 上传成功
      if (params.success) {
        params.success(url)
      }
    } else {
      success = false
      message = 'There was an error upload your photo'
      url = `https://${BUCKET_NAME}.s3.amazonaws.com/${resourceKey}`
    }
  } catch (err) {
    success = false
    url = ''
    // 未选择文件
    if (!file) {
      message = 'Choose a file to upload first.'
    }
    // 上传失败
    else if (err instanceof Error) {
      message = err.message
    }
    // 其他错误
    else {
      message = 'There was an error upload your photo'
    }
    if (params.fail) {
      params.fail(new Error(message))
    }
  } finally {
    // 上传完成
    if (params.complete) {
      params.complete()
    }
  }
  return {
    success,
    message,
    url,
  }
}

export { putDelete, putUpload }
