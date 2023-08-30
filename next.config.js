/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})
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
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    // config.module.optimization = {
    //   realContentHash: true,
    // }
    // Important: return the modified config
    return config
  },
}

module.exports = withPWA(nextConfig)
