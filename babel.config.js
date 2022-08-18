module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    ["import", { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }] // `style: true` 会加载 less 文件
  ]
}
