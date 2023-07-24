const withAntdLess = require('next-plugin-antd-less')

module.exports = withAntdLess({
  images: {
    domains: ['media.kitsu.io'],
  },
  webpack(config) {
    return config
  },
})
