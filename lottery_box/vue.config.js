const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "aic-tailwind-scss/variables"; // default variables
          `,
      },
    }
  },
})
