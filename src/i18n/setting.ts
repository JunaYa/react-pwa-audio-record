export const fallbackLang = 'en'
export const languages = [fallbackLang, 'zh', 'it']
export const defaultNS = 'common'

export function getOptions (lng = fallbackLang, ns = defaultNS) {
  return {
    debug: process.env.NODE_ENV === 'development',
    supportedLngs: languages,
    preload: languages,
    fallbackLang,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    // backend: {
    //   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
    // }
  }
}