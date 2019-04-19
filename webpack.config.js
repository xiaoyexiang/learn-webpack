const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入插件

const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将 css 单独打包成文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩 css

// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
// __dirname: 当前模块的文件夹名称。

// console.log('__dirname: ', __dirname);
// console.log('path.resolve: ', path.resolve(__dirname, 'dist'));

module.exports = {
    entry: {
        page: './src/app.js'
    }, // 入口文件
    output: {
        publicPath: './', // js 引用的路径或者 CDN 地址
        path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
        filename: '[name].bundle.js', // 代码打包后的文件名
        chunkFilename: '[name].js' // 代码拆分后的文件名
    },
    plugins: [
        new CleanWebpackPlugin(), // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
        new HtmlWebpackPlugin({
            // 打包输出HTML
            title: '自动生成 HTML',
            minify: {
                // 压缩 HTML 文件
                removeComments: true, // 移除 HTML 中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联 css
            },
            filename: 'index.html', // 生成后的文件名
            template: 'index.html' // 根据此模版生成 HTML 文件
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'), //用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
            cssProcessorOptions: {
                safe: true,
                discardComments: {
                    removeAll: true
                }
            }, //传递给 cssProcessor 的选项，默认为{}
            canPrint: true //布尔值，指示插件是否可以将消息打印到控制台，默认为 true
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                lodash: {
                    name: 'chunk-lodash', // 单独将 lodash 拆包
                    priority: 10, // 优先级要大于 commons 不然会被打包进 commons
                    test: /[\\/]node_modules[\\/]lodash[\\/]/
                },
                commons: {
                    name: 'chunk-commons',
                    minSize: 1, //表示在压缩前的最小模块大小,默认值是 30kb
                    minChunks: 2, // 最小公用次数
                    priority: 5, // 优先级
                    reuseExistingChunk: true // 公共模块必开启
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.css$/, // 针对 .css 后缀的文件设置 loader
            use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader'
            ]
        }, {
            test: /\.styl$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'postcss-loader',
                'stylus-loader', 
            ],
        }]
    }
};