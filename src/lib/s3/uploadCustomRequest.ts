import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import { Upload } from '@aws-sdk/lib-storage'
import type { Progress } from '@aws-sdk/lib-storage/dist-types'

const AWS_REGION = "us-east-1"
const IDENTITY_POOL_ID = "us-east-1:7d1d2487-6957-4c8a-a000-e64971c6e65c"
const BUCKET_NAME = "deschooldev"
const BUCKET_INPUT_PREFIX="courseVideos"

type Params = {
  file: File
  onBeforeUpload?: () => void
  onProgress?: (percent: number) => void
  onSuccess?: (data: string) => void
  onError?: (error: Error) => void
  onCompleted?: () => void
}

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: AWS_REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
})

export async function uploadCustomRequest({ file, onBeforeUpload, onProgress, onSuccess, onError, onCompleted }: Params) {
  const extentions = file?.name?.split('.')?.pop()
  const folderName = uuidv4()
  const fileName = folderName.split('-').pop()
  const resourceKey = `${BUCKET_INPUT_PREFIX}/${uuidv4()}/${fileName}.${extentions}`
  let percent = 0 // upload percent
  let intervalId: any = null // interval id
  try {
    if (onBeforeUpload) {
      onBeforeUpload()
    }
    const upload = new Upload({
      client: s3,
      params: {
        Bucket: BUCKET_NAME,
        Key: resourceKey,
        Body: file,
        ContentType: file.type,
      },
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      // leavePartsOnError: false, // optional manually handle dropped parts
    })
    upload.on('httpUploadProgress', (progress: Progress) => {
      // Note, this event will be emitted much more frequently when using the XhrHttpHandler.
      // Your application should be ready to throttle the event listener if it is
      // computationally expensive.

      // The default FetchHttpHandler only emits this event upon the completion of each
      // part, a minimum of 5 MB. Using XHR will emit this event continuously, including
      // for files smaller than the chunk size, which use single-part upload.
      // console.log(
      //   progress.loaded, // Bytes uploaded so far.
      //   progress.total, // Total bytes. Divide these two for progress percentage.
      // )
      // calculate progress percent
      const loaded = progress.loaded !== undefined ? progress.loaded : 0
      const total = progress.total !== undefined ? progress.total : 0
      percent = Math.min(Math.round((loaded / total) * 100), 100)
    })
    intervalId = setInterval(() => {
      // callback progress
      if (onProgress) {
        onProgress(percent)
      }
      if (percent === 100 && intervalId !== null) {
        clearInterval(intervalId)
      }
    }, 1200)
    const res = await upload.done()

    if (res?.$metadata?.httpStatusCode === 200) {
      // callback progress
      if (onProgress) {
        onProgress(percent)
      }
      // callback success
      if (onSuccess) {
        // onSuccess(`https://s3.us-east-1.amazonaws.com/${BUCKET_NAME}/${resourceKey}`)
        onSuccess(`https://${BUCKET_NAME}.s3.amazonaws.com/${resourceKey}`)
      }
    }
  } catch (error: Error | unknown) {
    console.log('error', error) // eslint-disable-line no-console
    let err: Error = new Error('')
    if (error instanceof Error) {
      // s3 lib-storage inner will throw an error
      if (error.message === 'eventEmitter.off is not a function') {
        return
      }
      err = new Error(`上传失败：${error.message}`)
    } else {
      err = new Error(`上传失败：请检查网络情况再次尝试`)
    }
    if (onError) {
      onError(err)
    }
  } finally {
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
    if (onCompleted) {
      onCompleted()
    }
  }
}

/**
 * delete file from s3
 * @param fileUrl string
 * @returns
 */
export async function removeCustomRequest(fileUrl: string): Promise<boolean> {
  const filename = fileUrl.split(`${BUCKET_INPUT_PREFIX}/`)[1]
  const res = await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: filename,
    }),
  )
  // delte result status code is 204
  return res?.$metadata?.httpStatusCode === 204
}
