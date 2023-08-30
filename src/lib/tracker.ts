export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  // params add address
  // const user = session.getSession('userbar')
  // const accounts = user?.accounts
  const accounts = ''
  if (!params) {
    params = { address: '--' }
  }
  /* eslint-disable */
  if (accounts?.length > 0 && !!accounts[0]) {
    params.address = `-${accounts[0]}-`
  }
  /* eslint-enable */
  window.gtag('event', eventName, {
    ...params,
  })
}

export function trackPageView() {}
