const defaultLocale = "en-US";

interface locale {
  id: string;
  dir: string;
  language: string;
  region: string;
  label: Record<string, string>;
}

const locales: Record<string, locale> = {
  "en-US": {
    id: "en-US",
    dir: "ltr",
    language: "en",
    region: "us",
    label: {
      "en-US": "English (US)",
      "zh-CN": "中国",
      "zh-TW": "中国（台湾）",
      "ja-JP": "英語 (米国)",
    },
  },

  "zh-CN": {
    id: "zh-CH",
    dir: "rtl",
    language: "zh",
    region: "cn",
    label: {
      "en-US": "Persian (IR)",
      "zh-CN": "中国",
      "zh-TW": "中国（台湾）",
      "ja-JP": "ペルシア語（イラン）",
    },
  },

  "zh-TW": {
    id: "zh-TW",
    dir: "rtl",
    language: "zh",
    region: "tw",
    label: {
      "en-US": "Persian (IR)",
      "zh-CN": "中国",
      "zh-TW": "中国（台湾）",
      "ja-JP": "ペルシア語（イラン）",
    },
  },


  "ja-JP": {
    id: "ja-JP",
    dir: "ltr",
    language: "ja",
    region: "jp",
    label: {
      "en-US": "Japanese (JP)",
      "zh-CN": "中国",
      "zh-TW": "中国（台湾）",
      "ja-JP": "日本語（日本）",
    },
  },
};

const localeArray = Object.keys(locales);

const langs = [{ lang: 'en-US' }, { lang: 'zh_CN' }, { lang: 'zh_TW' }, { lang: 'ja-JP'}]

export { defaultLocale, localeArray, langs };
export default locales;
