'use client';

import { List } from "antd-mobile";
import ActionSheet, { Action } from "antd-mobile/es/components/action-sheet";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SwitchLanguage({t, lang, path}: {t: any, lang: string, path: string}) {
  const actions: Action[] = [
    { text: 'English', key: 'en' },
    { text: '中文', key: 'zh' },
  ]
  const [visible, setVisible] = useState<boolean>(false)
  const router = useRouter()
  const language = actions.find(item => item.key === lang)?.text
  return (
    <>
      <List.Item extra={language} clickable onClick={() => setVisible(true)}>
        {t('switchLanguage')}
      </List.Item>
      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        onAction={action => {
          router.push(`/${action.key}/${path}`)
        }}
        afterClose={() => {
          // Toast.show('动作面板已关闭')
        }}
      />
    </>
  );
}