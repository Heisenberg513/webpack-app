// webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
  // 入口文件
  entry: path.join(__dirname, '../src/index.tsx'),
  // 打包文件出口
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),
    new webpack.DefinePlugin({
      BASE_URL: isDev ? '"./"' : '"/"' //添加全局变量
    }),
    new webpack.ProgressPlugin({
      activeModules: true, // 默认false，显示活动模块计数和一个活动模块正在进行消息。
      entries: true, // 默认true，显示正在进行的条目计数消息。
      modules: false, // 默认true，显示正在进行的模块计数消息。
      modulesCount: 5000, // 默认5000，开始时的最小模块数。PS:modules启用属性时生效。
      profile: false, // 默认false，告诉ProgressPlugin为进度步骤收集配置文件数据。
      dependencies: false, // 默认true，显示正在进行的依赖项计数消息。
      dependenciesCount: 10000 // 默认10000，开始时的最小依赖项计数。PS:dependencies启用属性时生效。
    })
  ],
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')],
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: ['thread-loader', 'babel-loader']
      },
      {
        include: [path.resolve(__dirname, '../src')],
        test: /.css$/, // 匹配.css, less文件
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-loader,打包模式抽离css
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        include: [path.resolve(__dirname, '../src')],
        test: /.less$/, // 匹配.css, less文件
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-loader,打包模式抽离css
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]' // 文件输出目录和命名
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.join(__dirname, '../src')
    },
    modules: [path.resolve(__dirname, '../node_modules'), 'node_modules'] // 查找第三方模块只在本项目的node_modules中查找
  },
  cache: {
    type: 'filesystem' // 使用文件缓存
  }
}
