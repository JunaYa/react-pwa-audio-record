
'use client'
import { Badge, TabBar } from 'antd-mobile'
import {
  AppOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

function getDefaultTab(path: string) {
  if (path.includes('/publish')) {
    return 'publish'
  }
  if (path.includes('/person')) {
    return 'person'
  }
  return 'home'
}

const BottomNavBar = () => {
  const router = useRouter()
  const pathname = usePathname()

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
  const defaultTab = getDefaultTab(pathname)
  const [activeKey, setActiveKey] = useState(defaultTab)

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