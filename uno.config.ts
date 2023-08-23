import { 
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'


export default defineConfig({
  rules: [
    [
      "p-safe",
      {
        padding:
          "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
      },
    ],
    ["pt-safe", { "padding-top": "env(safe-area-inset-top)" }],
    ["pb-safe", { "padding-bottom": "env(safe-area-inset-bottom)" }],
    ["pl-safe", { "padding-left": "env(safe-area-inset-left)" }],
    ["pr-safe", { "padding-right": "env(safe-area-inset-right)" }],
  ],
  theme: {
    screens: {
      ssm: { max: '375px' },
      sm: { min: '376px', max: '768px' },
      md: { min: '769px', max: '1024px' },
      lg: { min: '1024px', max: '1280px' },
      xl: { min: '1281px', max: '1440px' },
      '2xl': { min: '1441px', max: '1680px' },
      '3xl': { min: '1681px', max: '1920px' },
      '4xl': { min: '1921px' },
    },
    breakpoints: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1680px',
      '4xl': '1920px',
    },
  },
  shortcuts: [
    ['frc-start', 'flex flex-row items-center justify-start'],
    ['frc-end', 'flex flex-row items-center justify-end'],
    ['frc-around', 'flex flex-row items-center justify-around'],
    ['frc-between', 'flex flex-row items-center justify-between'],
    ['frs-between', 'flex flex-row items-start justify-between'],
    ['fre-between', 'flex flex-row items-end justify-between'],
    ['frc-center', 'flex flex-row items-center justify-center'],
    ['fcc-start', 'flex flex-col items-center justify-start'],
    ['fcs-start', 'flex flex-col items-start justify-start'],
    ['fcs-between', 'flex flex-col items-start justify-between'],
    ['fcc-around', 'flex flex-col items-center justify-around'],
    ['fcc-between', 'flex flex-col items-center justify-between'],
    ['fcc-center', 'flex flex-col items-center justify-center'],
    ['fcs-center', 'flex flex-col items-start justify-center'],
    ['fce-center', 'flex flex-col items-end justify-center'],
    ['frs-center', 'flex flex-row items-start justify-center'],
    ['purple-button', 'inline-flex items-center bg-#774FF8 text-white hover:cursor-pointer hover:bg-purple-500'],
    ['purple-text-button', 'inline-flex items-center text-#774FF8 hover:cursor-pointer hover:text-purple-500'],
    [
      'purple-border-button',
      'inline-flex items-center border border-#6525FF rounded-xl text-#6525FF hover:cursor-pointer hover:text-purple-500',
    ],
    ['board-landing', 'sm:px-1/20 md:px-20 lg:px-1/18 xl:px-1/16 2xl:px-1/14 3xl:px-1/12'],
  ],
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  include: ["**.ts", "**.tsx"],
})
