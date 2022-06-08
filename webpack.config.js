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
                            'Uint8ClampedArray',
                            'Uint32Array',
                            'Int32Array',
                            'Uint16Array',
                            'Int16Array',
                            'Uint8Array',
                            'Int8Array',
                            'tempI64',
                            'tempDouble',
                            'ArrayBuffer',
                            'Array',
                            'h32',
                            'h32Raw',
                            'h32ToString',
                            'create32',
                            'h64',
                            'h64Raw',
                            'h64ToString',
                            'create64',
                            'buf32',
                            'buf16',
                            'buf8',
                            'BrowserBuffer',
                            'Buffer',
                            'buffer',
                            'Set',
                            'TextEncoder',
                            'RangeCoder',
                            'BigInteger',
                            'BigInt',
                            'Point',
                            'ECPubKey',
                            'ECKey',
                            'sha512_asm',
                            'asm',
                            'ECPair',
                            'HDNode',
                            'SharedArrayBuffer',
                            'Stream',
                            'BufferStream',
                            'BitStream',
                            'INT32',
                            'UINT32',
                            'INT64',
                            'UINT64',
                            'UINT',
                        ]
                    },
                    compress: {
                        toplevel: true,
                        drop_console: true,
                        join_vars: true,
                        conditionals: true,
                        unused: true,
                        strings: true,
                        sequences: true,
                        merge_vars: true,
                        switches: true,
                        dead_code: true,
                        if_return: true,
                        inline: true,
                        reduce_vars: true,
                        collapse_vars: true,
                        passes: 5,
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
            minSize: 240 * 1024,
            maxSize: 384 * 1024,
            minChunks: 6,
            maxAsyncRequests: 10,
            maxInitialRequests: 10,
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
                                        "android": "67",
                                        "chrome": "67",
                                        "edge": "17",
                                        "firefox": "61",
                                        "ios": "11",
                                        "safari": "11"
                                    },
                                    //ignoreBrowserslistConfig: true,
                                    forceAllTransforms: true, //true,
                                    shippedProposals: true,
                                    bugfixes: true,
                                    useBuiltIns: "usage" //"entry"
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
