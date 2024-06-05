var webpack = require('webpack');
var path = require('path');
var TerserPlugin = require('terser-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? false: false,
    entry: path.join(__dirname, "src/js/client.js"),
    mode: process.env.NODE_ENV,
    optimization: process.env.NODE_ENV === 'production' ? {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parallel: true,
                    minify: true,
                    minifyWhitespace: true,
                    minifyIdentifiers: true,
                    minifySyntax: true,
                    ecma: 6,
                    parse: {},
                    module: false,
                    toplevel: true,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: false,
                    keep_fnames: false,
                    safari10: true,
                    enclose: true,
                    extractComments: false,
                    format: {
                        comments: false,
                        ecma: 5,
                        spidermonkey: true,
                        webkit: true,
                        wrap_iife: true,
                        wrap_func_args: true
                    },
                    mangle: {
                        toplevel: true,
                        module: true,
                        eval: true
                    },
                    properties: {
                        reserved: [
                            'Object',
                            'Colors',
                            'Color',
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
                            'ref',
                            'refs',
                            'Ref',
                            'Refs',
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
                            'UINT'
                        ]
                    },
                    compress: {
                        toplevel: true,
                        unsafe: true,
                        drop_console: false,
                        drop_debugger: false,
                        evaluate: "eager",
                        hoist_funs: true,
                        hoist_vars: true,
                        passes: 10,
                    },
                    v8: true,
                    ie: false,
                    webkit: true,
                    output: {
                        comments: false,
                        beautify: false,
                        code: true
                    },
                }
            })
        ],
        chunkIds: 'named',
        splitChunks: {
            chunks: 'async',
            minSize: 192 * 1024,
            maxSize: 384 * 1024,
            minChunks: 5,
            maxAsyncRequests: 12,
            maxInitialRequests: 7,
            automaticNameDelimiter: '_',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 5,
                    maxAsyncRequests: 20,
                    maxInitialRequests: 10,
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
                                        "chrome": "69",
                                        "firefox": "69",
                                        "safari": "11"
                                    },
                                    forceAllTransforms: false,
                                    shippedProposals: true,
                                    bugfixes: true,
                                    useBuiltIns: "entry"
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
        publicPath: "client/",
        filename: "chunk_norris.min.js",
        chunkFilename: "chunk_[id].min.js",
    },
    resolve: {
        alias: {
            'bn.js': path.join(__dirname, 'node_modules/bn.js/lib/bn.js'),
            'process': path.join(__dirname, 'node_modules/process'),
            'readable-stream': path.join(__dirname, 'node_modules/readable-stream/lib/ours/browser.js'),
            'readable-stream@4.1.0': path.join(__dirname, 'node_modules/readable-stream/lib/ours/browser.js'),
            "buffer": path.join(__dirname, 'node_modules/buffer'),
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
            "react/jsx-runtime": "preact/jsx-runtime"
        }
    },
    plugins: process.env.NODE_ENV === "development" ? [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            publicPath: "/client",
            inject: true,
            cache: false,
        }),
        new BundleAnalyzerPlugin()
    ]: [
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        devMiddleware: {
            publicPath: "/client"
        },
        static: {
            directory: path.join(__dirname, "/"),
        },
        client: {
            reconnect: true,
        },
        hot: false,
        liveReload: false,
    },
};
