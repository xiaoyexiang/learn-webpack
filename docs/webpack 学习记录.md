# webpack 学习记录

## 一、搭建项目并打包 JS 文件

创建空文件夹，通过运行以下命令初始化 package.json

```
npm init -y
```

> npm init  用来初始化生成一个新的  package.json  文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，一路回车就可以了。
如果使用了 -y（代表 yes），则跳过提问阶段，直接生成一个新的  package.json  文件。

引入 webpack4：

```
npm i webpack --save-dev
```
还需要 webpack-cli ，作为一个单独的包引入，如果不装 webpack-cli 是无法在命令行里使用 webpack 的

```
npm i webpack-cli --save-dev
```

## 二、生产和开发模式

webpack4 引入了 production(生产) 和 development(开发) 模式。

1. 打开 package.json 并填充 script 部分，如下所示：

```
"dev": "webpack --mode development",
"build": "webpack --mode production"
```

2. 分别运行
 ```npm run dev``` 没有压缩！
  ```npm run build``` production mode(生产模式) 可以开箱即用地进行各种优化。 包括压缩，作用域提升，tree-shaking 等。
  
  ## 三、覆盖默认 entry/output
  webpack.config.js 是 webpack 默认的配置文件名，在根目录下创建
  
  ```
 const path = require('path')

console.log('__dirname: ', __dirname)  // 
console.log('path.resolve: ', path.resolve(__dirname, 'dist')) 

module.exports = {
  entry: {
    app: './app.js' // 需要打包的文件入口
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: 'bundle.js' // 打包后生产的 js 文件
  }
}
```

```__dirname```: 当前模块的文件夹名称。

```path.resolve()``` 方法会把一个路径或路径片段的序列解析为一个绝对路径。

多次打包后会发现dist 中有多个文件，因为没有先删除 dist 文件，再打包，我们需要使用一个插件来帮我们实现，GitHub 链接：[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)

> 使用插件[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)来自动删除 webpack output.path目录中的所有文件。

1. 安装插件

```
npm install clean-webpack-plugin --save-dev
```

2. 修改 webpack 配置文件

```
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './app.js' // 需要打包的文件入口
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: 'bundle.js' // 打包后生产的 js 文件
  },
  plugins: [
    new CleanWebpackPlugin() // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
  ]
}
```

## 四、用 Babel 7 转译 ES6

#### (一) 了解 Babel 及生态

要开始使用 loader ，我们需要安装一堆依赖项，以下已 Babel7 为主,
相关列表：

* @babel/core
* @babel/preset-env: 包含 ES6、7 等版本的语法转化规则
* @babel/plugin-transform-runtime: 避免 polyfill 污染全局变量，减小打包体积
* @babel/polyfill: ES6 内置方法和函数转化
* babel-loader: 负责 ES6 语法转化

> 使用 @babel/polyfill 的原因：Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API，比如 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。必须使用 @babel/polyfill，为当前环境提供一个垫片。

#### (二) 安装依赖并配置

1. 安装依赖

```
npm i @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime --save-dev
```

```
npm i @babel/polyfill @babel/runtime
```

2. 在项目的根目录中创建名为 .babelrc 的新文件来配置 Babel:

``` 
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

3. webpack 配置 loader(加载器)

``` 
module: {
  rules: [
    {
      test: /\.js$/, // 使用正则来匹配 js 文件
      exclude: /nodes_modules/, // 排除依赖包文件夹
      use: {
        loader: 'babel-loader' // 使用 babel-loader
      }
    }
  ]
}

```



























