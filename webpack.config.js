const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    return {
        mode: env.mode || 'production',
        devServer: {
            static: {
                directory: path.join(__dirname, './dist'),
            },
            port: 8080,
            compress: true,
            historyApiFallback: true
        },

        performance: {
            hints: false,
        },

        entry: {
            main: path.resolve(__dirname, './src/app.js')
        },

        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: '/',
        },

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },

        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader',
                        'postcss-loader'
                    ]
                }
            ]
        },

        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                title: 'Twitch',
                inject: 'body',
                template: 'public/index.html'
            })
        ],

        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ],
        },
    }
};
