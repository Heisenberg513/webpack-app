// webpack.dev.js
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ESlintPlugin = require('eslint-webpack-plugin')

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
    new ESlintPlugin({
      // eslint检验
      extensions: ['ts', 'tsx', 'js', 'jsx']
    })
  ],
  devtool: 'eval-cheap-module-source-map', // 源码调试模式,后面会讲
  stats: {
    //控制台显示
    preset: 'minimal',
    errors: true, // 是否展示错误
    warnings: true, // 是否展示告警
    warningsCount: true, //警告信息数
    timings: true, //添加时间信息
    errorsCount: true, //错误信息数
    moduleTrace: true, // 展示依赖和告警/错误的来源
    modules: false, //关闭modules信息
    assets: false //资源信息
  },
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    open: false,
    static: {
      directory: path.join(__dirname, '../public') //托管静态资源public文件夹
    }
  }
})
