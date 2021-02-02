const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const { token } = require('./imi_data.js');
//configurable build params
const WP_COPY_PATHS = [
    { from: 'audio/*', to: 'audio/[name].[ext]' },
    { from: 'fonts/*', to: 'fonts/[name].[ext]' },
    { from: 'images/*', to: 'images/[name].[ext]' },
    { from: 'animations/*', to: 'animations/[name].[ext]' }
]

const OBF_OPTIONS = {
    optionsPreset: 'default',
    disableConsoleOutput:true,
    compact: true,
    stringArray: true,
    rotateStringArray: true,
    shuffleStringArray: true,
    stringArrayIndexShift: true,
    splitStrings: true,
    identifierNamesGenerator: 'hexadecimal',
    debugProtection: true,
    selfDefending: true,
    stringArrayWrappersCount: 5,
    stringArrayWrappersChainedCalls: true,
    transformObjectKeys: true
}
//LIVE
var production_build_config = {
    mode: 'production',
    entry: './js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
          }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin(WP_COPY_PATHS),
        new webpack.DefinePlugin({
            HOST : define_value("https://api.imigames.io"),
            PRODUCTION : define_value(true)
        })
    ],
    module:
    {
        rules: [
            {
                test: /\.js$/,
                exclude: [ 
                    /node_modules/, path.resolve(__dirname, 'bundle.js') 
                ],
                enforce: 'post',
                use: { 
                    loader: WebpackObfuscator.loader, 
                    options: OBF_OPTIONS
                }
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
var production_with_server_config = {
    mode: 'production',
    entry: './js/main.js',
    watch: true,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true,
        contentBase: path.join(__dirname, 'dist'),
        openPage: '?user='+token
    },
    plugins: [
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
          }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin(WP_COPY_PATHS),
        new webpack.DefinePlugin({
            HOST : define_value("https://api.staging.imigames.io"),
            PRODUCTION : define_value(true)
        })
    ],
    module:
    {
        rules: [
            {
                test: /\.js$/,
                exclude: [ 
                    /node_modules/, path.resolve(__dirname, 'bundle.js') 
                ],
                enforce: 'post',
                use: { 
                    loader: WebpackObfuscator.loader, 
                    options: OBF_OPTIONS
                }
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};

//STAGING
var staging_build_config = {
    mode: 'development',
    entry: './js/main.js',
    optimization: {
        usedExports: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'EntryPoint'
    },
    devServer:{
        contentBase: path.join(__dirname, 'dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
          }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin(WP_COPY_PATHS),
        new webpack.DefinePlugin({
            HOST : define_value("https://api.staging.imigames.io"),
            PRODUCTION : define_value(false)
        })
    ],
    module: 
    {
        rules:[
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    }
};
var staging_with_server_config = {
    mode: 'development',
    entry: './js/main.js',
    watch:true,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'EntryPoint'
    },
    devServer:{
        open:true,
        contentBase: path.join(__dirname, 'dist'),
        openPage: '?user='+token
    },
    plugins: [
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
          }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyWebpackPlugin(WP_COPY_PATHS),
        new webpack.DefinePlugin({
            HOST : define_value("https://api.staging.imigames.io"),
            PRODUCTION : define_value(false)
        })
    ],
    module: 
    {
        rules:[
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    }
};


module.exports = function (env) {
    var config;
    switch (env) {
        case 'production_build':
            config =  production_build_config;
            break;
        case 'production_server':
            config =  production_with_server_config;
            break;
        case 'staging_build':
            config = staging_build_config;
            break;
        case 'staging_server':
            config = staging_with_server_config;
            break;
    }
    return config;
}

function define_value(buildstat) {
    return JSON.stringify(buildstat);
}