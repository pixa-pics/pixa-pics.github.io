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
                            'Object',
                            'canvas',
                            'getUint8',
                            'setUint8',
                            'getUint16',
                            'setUint16',
                            'getUint32',
                            'setUint32',
                            'getFloat32',
                            'setFloat32',
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
                            'Map',
                            'WeakSet',
                            'WeakMap',
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
                        passes: 3,
                    },
                    output: {
                        comments: false,
                        beautify: false,
                        webkit: true
                    }
                }
            })
        ],
        chunkIds: 'named',
        splitChunks: {
            chunks: 'async',
            minSize: 384 * 1024,
            maxSize: 960 * 1024,
            minChunks: 2,
            maxAsyncRequests: 12,
            maxInitialRequests: 4,
            automaticNameDelimiter: '_',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    maxAsyncRequests: 12,
                    maxInitialRequests: 4,
                    priority: -20,
                    reuseExistingChunk: false
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
                                        "android": "54",
                                        "chrome": "54",
                                        "edge": "5",
                                        "firefox": "49",
                                        "ios": "10",
                                        "safari": "10"
                                    },
                                    forceAllTransforms: true,
                                    shippedProposals: true,
                                    bugfixes: true,
                                    useBuiltIns: "usage"
                                }],
                                'stage-0'
                            ]
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'client'),
        filename: "chunk_norris.min.js",
        chunkFilename: "chunk_[id].min.js",
    },
    resolve: {
        alias: {
            'bn.js': path.join(__dirname, 'node_modules/bn.js/lib/bn.js'),
            'process': path.join(__dirname, 'node_modules/process'),
            'readable-stream': path.join(__dirname, 'node_modules/readable-stream/lib/ours/browser.js'),
            "buffer": path.join(__dirname, 'node_modules/buffer'),
        }
    },
    plugins: process.env.NODE_ENV === "development" ? [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        }),
        new BundleAnalyzerPlugin()
    ]: [
        new BundleAnalyzerPlugin()
    ],
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
