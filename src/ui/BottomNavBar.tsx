
'use client'
import { Badge, TabBar } from 'antd-mobile'
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BottomNavBar = () => {
  const router = useRouter()

  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: 'publish',
      title: '发布',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: 'person',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  const [activeKey, setActiveKey] = useState('home')

  const onChange = (key: string) => {
    setActiveKey(key)
    router.push(`/${key}`)
  }

  return (
    <TabBar safeArea activeKey={activeKey} onChange={onChange}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

export default BottomNavBar