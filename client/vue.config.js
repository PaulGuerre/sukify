const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // Allows every hosts to connect -- Docker only
  devServer: {
    allowedHosts: 'all'
  }
})
