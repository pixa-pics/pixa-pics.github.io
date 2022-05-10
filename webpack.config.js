var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? "inline-source-map": false,
    entry: path.join(__dirname, "src/js/client.js"),
    mode: process.env.NODE_ENV,
    optimization: process.env.NODE_ENV === 'production' ? {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    toplevel: true,
                    extractComments: false,
                    mangle: {
                        toplevel: true,
                        eval: true,
                        reserved: [
                            'tempI64',
                            'tempDouble',
                            'Buffer',
                            'BigInteger',
                            'Point',
                            'ECPubKey',
                            'ECKey',
                            'sha512_asm',
                            'asm',
                            'ECPair',
                            'HDNode',
                            'SharedArrayBuffer',
                        ]
                    },
                    compress: {
                        drop_console: true,
                        passes: 3,
                    },
                    output: {
                        comments: false,
                        beautify: false,
                    },
                }
            })
        ],
        chunkIds: 'named',
        splitChunks: {
            chunks: 'async',
            minSize: 192 * 1024,
            maxSize: 320 * 1024,
            minChunks: 6,
            maxAsyncRequests: 16,
            maxInitialRequests: 16,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 6,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }: {minimize: false, minimizer: []},
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.(js||jsx)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: [
                                'react',
                                ["env", {
                                    targets: {
                                        edge: "17",
                                        firefox: "60",
                                        chrome: "67",
                                        safari: "11.1"
                                    },
                                    useBuiltIns: "usage",
                                    forceAllTransforms: true,
                                }],
                                'stage-0'
                            ]
                        }
                    }
                ]
            },
            {
              test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
        ]
    },
    output: {
        path: path.join(__dirname),
        filename: "father-chunk.norris.min.js",
        chunkFilename: "child-chunk.[id].min.js",
    },
    resolve: {
        alias: {
            'bn.js': path.join(__dirname, 'node_modules/bn.js/lib/bn.js'),
        }
    },
    plugins: process.env.NODE_ENV === "development" ? [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        }),
        new BundleAnalyzerPlugin()
    ]: [new BundleAnalyzerPlugin()],
    devServer: {
        static: {
            directory: path.join(__dirname, "/"),
        },
        client: {
            reconnect: false,
        },
        hot: false,
        liveReload: false,
    },
};
