/// <reference types="react-javascript" />

export {}

declare global {
  interface Window {
    ethereum: any
    screenWidth: number
    screenHeight: number
    gtag: any
    WebKitMutationObserver: MutationObserver
    MozMutationObserver: MutationObserver
  }
}
