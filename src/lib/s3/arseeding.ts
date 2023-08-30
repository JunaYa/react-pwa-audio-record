import { InjectedEthereumSigner, genAPI, getTokenTagByEver } from 'arseeding-js'
import { createAndSubmitItem } from 'arseeding-js/esm/submitOrder'
import type { Config } from 'arseeding-js/esm/types'
import { Buffer } from 'buffer'
import { ethers } from 'ethers'

declare global {
  interface Window{
    ethereum?: any
  }
}

function getBuffer(file: File): Promise<any> {
  return new Promise(resolve => {
    const reader = new FileReader()

    // 注册onload事件处理程序
    reader.onload = function (event: any) {
      const buffer = Buffer.from(event.target.result)
      resolve(buffer)
    }

    // 读取文件内容
    reader.readAsArrayBuffer(file)
  })
}

type ArseedingResult = {
  everHash?: string
  order?: {
    itemId: string
    size: number
    bundler: string
    currency: string
    decimals: number
    fee: string
    paymentExpiredTime: number
    expectedBlock: number
    tag: string
  }
}

type Params = {
  file: File
  paySymbol: string // usdc、eth
  onBeforeUpload?: () => void | boolean
  onProgress?: (percent: number) => void
  onSuccess?: (data: ArseedingResult) => void
  onError?: (error: Error) => void
  onCompleted?: () => void
}

/**
 * 上传数据并支付存储费用。
 * @param file File
 * @returns
 */
export const arweaveUpload = async (file: File, paySymbol: string): Promise<ArseedingResult> => {
  // ethereum wallet
  const instance = await genAPI(window.ethereum)
  // arweave wallet
  // const instance = await genArweaveAPI(window.arweaveWallet)

  const arseedUrl = 'https://arseed.web3infra.dev'
  const data = await getBuffer(file)
  // 需要支付的 symbol, usdc, eth 等。
  const currency = paySymbol || 'eth'
  // everPay 支持的 token tag (chainType-symbol-id)
  const tokenTags = await getTokenTagByEver(currency)
  const payCurrencyTag = tokenTags[0]
  const options = {
    tags: [
      { name: 'FileName', value: file.name },
      { name: 'Content-Type', value: file?.type },
    ],
  }
  const res: ArseedingResult = await instance.sendAndPay(arseedUrl, data, payCurrencyTag, options)

  // If you need upload orders by sequence, you can configure the needSeq parameter to true
  // const res = await instance.sendAndPay(arseedUrl, data, tag, options, true)

  console.log(res)
  return res
}

/**
 * 仅上传
 * @param file File
 */
export const pureUpload = async (file: File) => {
  const data = await getBuffer(file)
  // ethereum
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = new InjectedEthereumSigner(provider)
  await signer.sign(data)
  const options = {
    tags: [
      { name: 'key01', value: 'val01' },
      { name: 'Content-Type', value: 'data type' }, // you should set the data type tag
    ],
  }
  const arseedingUrl = 'https://arseed.web3infra.dev'
  // 需要支付的 symbol, usdc, eth 等。
  const currency = 'eth'
  // everPay 支持的 token tag (chainType-symbol-id)
  const tokenTags = await getTokenTagByEver(currency)
  const payCurrencyTag = tokenTags[0]
  const config: Config = {
    signer,
    path: '',
    arseedUrl: arseedingUrl,
    tag: payCurrencyTag,
  }
  const order = await createAndSubmitItem(data, options, config)
  console.log(order)
}

export async function uploadCustomRequest({ file, onBeforeUpload, paySymbol, onProgress, onSuccess, onError, onCompleted }: Params) {
  try {
    if (onBeforeUpload) {
      const check = onBeforeUpload()
      if (!check) {
        return
      }
    }
    const res = await arweaveUpload(file, paySymbol)

    if (res?.everHash) {
      // callback progress
      if (onProgress) {
        onProgress(100)
      }
      // callback success
      if (onSuccess) {
        onSuccess(res)
      }
    }
  } catch (error: Error | unknown) {
    console.log('error', error) // eslint-disable-line no-console
    let err = new Error(`Upload Error: Please check the network status and try again`)
    if (error instanceof Error) {
      if (error?.message === 'err_insufficient_balance') {
        err = new Error('Upload Error: Insufficient balance')
      }
    }
    if (onError) {
      onError(err)
    }
  } finally {
    if (onCompleted) {
      onCompleted()
    }
  }
}
