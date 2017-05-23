var webpack = require('webpack');

module.exports = {
    // 页面入口文件配置
    entry: {
        'view/main/index': './js/view/main/index.js'
    },
    // 入口文件输出配置
    output: {
        path: __dirname + '/output/js/',
        filename: '[name].bundle.js'
    },
    module: {
        // 加载器配置
        loaders: [
            [
                { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015', 'react'] } },
                //exclude是排除的目录或文件，使用正则
                //使用babel做jsx打包，需加上babel-preset-react和babel-preset-es2015这2个npm包，并加上loader参数presets: ['es2015', 'react']

                { test: /\.less/, loader: 'style-loader!css-loader!less-loader' },
                { test: /\.css$/, loader: "style-loader!css-loader" }
            ]
            // { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            // { test: /\.css$/, loader: "style!css" },
            // { test: /\.less/, loader: 'style-loader!css-loader!less-loader'}
            // {
            //     test: /\.js$/,
            //     loader:'babel-loader!jsx-loader?harmony'
            // },
            // {
            //     test: /\.css$/,
            //     loader:'style-loader!css-loader'
            // }
        ]
    },
    // 其他解决方案配置
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.jsx', '.css', '.json'],
    },
    // 插件项
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
}