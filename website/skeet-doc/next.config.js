/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: { unoptimized: true },
}

const intercept = require('intercept-stdout')

// safely ignore recoil warning messages in dev (triggered by HMR)
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

if (process.env.NODE_ENV === 'development') {
  intercept(interceptStdout)
}

module.exports = nextConfig
