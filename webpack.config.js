const path = require('path'); // CommonJS

module.exports = {
    mode: 'production',
    entry: './frontend/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            type: 'javascript/auto',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env'],
                    sourceType: 'module'
                }
            }
        }]
    },
    devtool: 'source-map'
};

