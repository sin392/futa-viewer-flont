/** @type {import('next').NextConfig} */

// const regexEqual = (x, y) => {
//   return (
//     x instanceof RegExp &&
//     y instanceof RegExp &&
//     x.source === y.source &&
//     x.global === y.global &&
//     x.ignoreCase === y.ignoreCase &&
//     x.multiline === y.multiline
//   )
// }

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.2chan.net', '*.2chan.net'],
  },
  // cssLoaderOptions: {
  //   url: false,
  // },
  // *.module.css内に:globalなどを書いてもエラーを出さないようにする設定
  // ref: https://github.com/vercel/next.js/issues/10142#issuecomment-648974042
  // webpack: (config) => {
  //   const oneOf = config.module.rules.find((rule) => typeof rule.oneOf === 'object')

  //   if (oneOf) {
  //     const moduleCssRule = oneOf.oneOf.find(
  //       (rule) => regexEqual(rule.test, /\.module\.css$/),
  //       // regexEqual(rule.test, /\.module\.(scss|sass)$/)
  //     )

  //     if (moduleCssRule) {
  //       const cssLoader = moduleCssRule.use.find(({ loader }) => loader.includes('css-loader'))
  //       if (cssLoader) {
  //         cssLoader.options.modules.mode = 'local'
  //       }
  //     }
  //   }

  //   return config
  // },
}

module.exports = nextConfig
