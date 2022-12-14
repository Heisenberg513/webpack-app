module.exports = {
  plugins: [
    process.env.NODE_ENV === 'development' && require.resolve('react-refresh/babel'),
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ].filter(Boolean),
  // 预设执行顺序由右往左,所以先处理ts,再处理tsx
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3 // 配置使用core-js低版本
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
}
