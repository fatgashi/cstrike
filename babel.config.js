module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
      targets: {
        esmodules: true // ✅ targets modern browsers only
      },
      useBuiltIns: false
    }]
  ]
}