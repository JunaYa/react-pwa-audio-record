import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '~/lib/tracker'
import { isMobile } from 'react-device-detect'
import React, { useState } from 'react'
import MetaMaskImage from '~/assets/icons/mask.png'
import UnipassLogo from '~/assets/icons/unipass.svg'
import { Button, Popup, SpinLoading } from 'antd-mobile'
import Image from 'next/image'

type ConnectButtonProps = {
  onClose?: () => void
}
const ConnectButtonRainbow: React.FC<ConnectButtonProps> = props => {
  const { onClose } = props
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [verifyLoad, setVerifyLoad] = useState(false)
  const [currentConnector, setCurrentConnector] = useState<any>()
  const [open, setOpen] = useState(false)
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const userInfo = {}

  enum WalletType {
    None = '_',
    MetaMask = 'MetaMask',
    UniPass = 'UniPass',
  }

  const signLoginMessage = async (nonce: string, walletType: WalletType) => {
    const FIX_FORMAT_MESSAGE = `DeSchool is kindly requesting to Sign in with ${walletType} securely, with nonce: ${nonce}. Sign and login now, begin your journey to DeSchool!`
    try {
      const sign = await signMessageAsync({ message: FIX_FORMAT_MESSAGE })
      return sign
    } catch (e: any) {
      console.log('signMessage', e)
    }
  }

  const handleConnect = async (address: string, sig: string, walletType: WalletType) => {
    
  }

  const handleLoginByAddress = async (address: `0x${string}` | undefined, walletType: WalletType) => {
    
  }

  const { address } = useAccount({
    onConnect: async data => {
      setLoading(true)
      setCurrentConnector(data?.connector)
      if (!userInfo) {
        setOpen(true)
      } else {
        setLoading(false)
      }
    },
    onDisconnect: () => {
      setLoading(false)
    },
  })

  const handleDisconnect = () => {
    disconnect()
    // removeToken()
    // session.sessionClear('token')
  }

  return (
    <>
      <ConnectButton.Custom>
        {({ chain, openChainModal, openConnectModal }) => (
          <div>
            {(() => {
              if (chain?.unsupported) {
                return (
                  <Button onClick={openChainModal} >
                    Wrong network
                  </Button>
                )
              }
              return (
                <Button
                  onClick={() => {
                    trackEvent('menu_click_connect')
                    handleDisconnect()
                    openConnectModal()
                    onClose?.()
                  }}
                  className={
                    isMobile ? 'w-10rem md:w-14.375rem aspect-[230/58]' : 'text-sm md:text-xl min-w-100px min-h-24px md:w-200px md:h-48px'
                  }
                >
                  {loading && <SpinLoading color="#FFFFFF" style={{ width: 20, height: 20, fontSize: 20 }} className="ml-3" />}
                  <div className="mx-3 py-2 text-18px md:text-20px whitespace-nowrap">{t('connectWallet')}</div>
                </Button>
              )
            })()}
          </div>
        )}
      </ConnectButton.Custom>
      <Popup
        visible={open}
        destroyOnClose
        onClose={() => {
          setOpen(false)
          handleDisconnect()
        }}
      >
        <div className="relative bg-white fcc-center w-full rounded-lg py-10">
          {['MetaMask', 'WalletConnect', 'WalletConnectLegacy'].includes(currentConnector?.name) && (
            <div key="MetaMask" className="w-full frc-center gap-2">
              <Button
                className="h-24 fcc-center w-full rounded-md"
                disabled={verifyLoad}
                onClick={() => {
                  handleLoginByAddress(address, WalletType.MetaMask)
                }}
              >
                <div className="mb-0 text-#774FF8 text-lg w-full frc-between">
                  <div className="frc-start gap-2">
                    <span>{t('signToLogin')}</span>
                    {verifyLoad && <SpinLoading color="#774FF8" style={{ width: 20, height: 20, fontSize: 20 }} />}
                  </div>
                  <Image
                    src={MetaMaskImage}
                    alt="mask"
                    width={25}
                    height={25}
                  />
                </div>
                <div className="w-full whitespace-break-spaces overflow-hidden text-left mt-2 text-md text-black">{address}</div>
              </Button>
            </div>
          )}
          {currentConnector?.name === 'UniPass' && (
            <div key="MetaMask" className="w-full frc-center gap-2">
              <Button
                className="h-24 fcc-center w-full rounded-md"
                disabled={verifyLoad}
                onClick={() => {
                  handleLoginByAddress(address, WalletType.UniPass)
                }}
              >
                <div className="mb-0 text-#774FF8 text-lg w-full frc-between">
                  <div className="frc-start gap-2">
                    <span>{t('signToLogin')}</span>
                    {verifyLoad && <SpinLoading color="#774FF8" style={{ width: 20, height: 20, fontSize: 20 }} />}
                  </div>
                  <Image
                    src={UnipassLogo}
                    alt="unipass"
                    width={25}
                    height={25}
                    // width={500} automatically provided
                    // height={500} automatically provided
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                  />
                </div>
                <div
                  className="w-full whitespace-break-spaces overflow-hidden text-left mt-2 text-md text-black"
                  style={{ letterSpacing: '0.02em' }}
                >
                  {address}
                </div>
              </Button>
            </div>
          )}
        </div>
      </Popup>
    </>
  )
}

export default ConnectButtonRainbow
