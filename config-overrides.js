const { override, fixBabelImports, addDecoratorsLegacy } = require("customize-cra");

// override生成webpack配置对象
module.exports = override(
  fixBabelImports("import", { // antd按需加载
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addDecoratorsLegacy() // 配置装饰器
);