# webpack5 & react18

**tips**: use pnpm

## use

`pnpm install`

### dev mode

`pnpm start:dev|test|pre|prod`

### prod mode

`pnpm build:dev|test|pre|prod`

## dirs

```text
├── .husky
|   ├── commit-msg # 提交规范
│   └── pre-commit # 提交检验
├── public
|   ├── favicon.ico #网页图标
│   └── index.html # html模板
├── src
|   ├── App.tsx
│   └── index.tsx # react应用入口页面
├── webpack
|   ├── webpack.base.js # 公共配置
|   ├── webpack.dev.js # 开发环境配置
|   ├── webpack.prod.js  # 打包环境配置
|   └── webpack.analy.js # 构建分析
├── .browserslistrc  # 兼容清单 postcss-loader加浏览器前缀
├── .editorconfig  # 统一vscode工作台的配置
├── .eslintrc.js  # 配置eslint规范 使用 `pnpm init @eslint/conifg` 创建
├── .prettierrc.js  # 统一代码格式
├── babel.config.js  # 抽离出来的babel配置
├── commitlint.config.js  # 提交规范
├── postcss.config.js  # 抽离出来的postcss配置
├── tsconfig.json  # ts配置
└── package.json
```
