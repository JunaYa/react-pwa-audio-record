import Modal from 'antd/es/modal'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getUserContext, useAccount } from '~/context/account'
import { useLayout } from '~/context/layout'
import { useAccount as useAccountRainbow, useDisconnect } from 'wagmi'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import { onAccountchanged, onDisconnect } from '~/auth/metamask'
import { deleteJwtByUserAddress } from '~/api/go/user'
import { routeWithLng } from '~/utils/route'
import { useNavigate } from 'react-router-dom'

const SwitchChain = () => {
  const [isSwitchingUser, setIsSwitchingUser] = useState(false)
  const [open, setOpen] = useState(false)
  const user = useAccount()
  const userContext = getUserContext()
  const { t } = useTranslation()
  const { connectWalletLogin } = useLayout()
  const { address } = useAccountRainbow()
  const { disconnectAsync } = useDisconnect()
  const navigate = useNavigate()

  // 同意切换账户
  const handleOk = async () => {
    setIsSwitchingUser(true)
    try {
      if (!user?.address) {
        connectWalletLogin()
      } else if (address !== user.address) {
        // 如果当前在 courseLearning 页面则跳转到 home 页面
        const cachedToken = await userContext.fetchUserInfo(address as string)
        if (cachedToken == null) {
          connectWalletLogin()
        }
        window.location.reload()
      }
    } finally {
      setIsSwitchingUser(false)
      setOpen(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  // 退出登录
  const disconnect = async () => {
    try {
      const res: any = await deleteJwtByUserAddress()
      if (res?.success) {
        disconnectAsync()
        userContext.disconnect()
        navigate(routeWithLng('/learn'))
        window.location.reload()
      }
    } catch (error: any) {
      console.log('disconnect error', error)
    }
  }
  useEffect(() => {
    const d1 = onAccountchanged(() => {
      setOpen(true)
    })
    const d2 = onDisconnect(() => disconnect)
    // const d3 = onChainChange(c => console.log('onChainChanged'))
    return () => {
      d1()
      d2()
      // d3()
    }
  }, [])

  return (
    <Modal
      title={<h1>{t('system.notify_title')}</h1>}
      closable={false}
      open={open}
      onCancel={handleCancel}
      destroyOnClose
      centered
      footer={
        <div className="flex flex-row justify-start items-center">
          <button
            type="button"
            className=" text-center py-1 px-2 mr-2 inline-flex purple-button"
            onClick={() => {
              handleOk()
            }}
          >
            {isSwitchingUser ? <LoadingOutlined className="mr-2" /> : t('confirm.sure')}
          </button>
          <button
            type="button"
            className=" text-center p-2 mr-2 inline-flex items-center text-#774FF8 hover:text-purple-500 hover:cursor-pointer "
            onClick={() => {
              handleCancel()
            }}
          >
            {t('cancel')}
          </button>
        </div>
      }
    >
      <p>{t('system.notify_account')}</p>
    </Modal>
  )
}

export default SwitchChain
