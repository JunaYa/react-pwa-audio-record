/** @type {import('next').NextConfig} */
const UnoCSS = require('@unocss/webpack').default
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ['antd-mobile'],
  webpack: (
    config,
    options,
  ) => {
    config.plugins = [...config.plugins, UnoCSS()]
    // config.module.optimization = {
    //   realContentHash: true,
    // }
    // Important: return the modified config
    return config
  },
}

module.exports = nextConfig
