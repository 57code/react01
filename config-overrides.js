const { override, fixBabelImports, addDecoratorsLegacy } = require("customize-cra");

// override返回一个函数，该函数返回对象将作为webpack的配置对象
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addDecoratorsLegacy()
);