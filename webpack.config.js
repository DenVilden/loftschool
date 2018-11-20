const rules = require('./webpack.config.rules');
const fs = require('fs');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

const root = path.resolve('src');
const files = fs.readdirSync(root).reduce(
    (all, current) => {
        const ext = path.extname(current);
        const name = path.basename(current, ext);
        const absPath = path.join(root, current);

        if (!all.hasOwnProperty(ext)) {
            all[ext] = [];
        }

        all[ext].push({ name, absPath });

        return all;
    },
    { '.js': [], '.hbs': [] }
);
const entries = files['.js'].reduce((all, { name, absPath }) => {
    all[name] = absPath;

    return all;
}, {});
const html = files['.hbs']
    .filter(file => entries.hasOwnProperty(file.name))
    .map(
        file => new HtmlPlugin({
            title: file.name,
            template: file.absPath,
            filename: `${file.name}.html`,
            chunks: [file.name]
        })
    );

if (!html.length || !files['.hbs'].find(file => file.name === 'index')) {
    html.push(
        new HtmlPlugin({
            title: './index.hbs',
            template: 'index.hbs'
        })
    );
}

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    return {
        entry: entries,
        output: {
            filename: 'bundle.js',
            path: path.resolve('dist')
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        module: {
            rules: [
                ...rules,
                {
                    test: /\.(css|scss)$/,
                    use: isProduction
                        ? [
                            MiniCssExtractPlugin.loader,
                            { loader: 'css-loader', options: { sourceMap: true } },
                            {
                                loader: 'postcss-loader',
                                options: { plugins: [autoprefixer()], sourceMap: true }
                            },
                            { loader: 'sass-loader', options: { sourceMap: true } }
                        ]
                        : ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        },
        plugins: isProduction
            ? [
                new MiniCssExtractPlugin({
                    filename: 'styles.css'
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: true
                        }
                    }
                }),
                ...html,
                new CleanWebpackPlugin(['dist'])
            ]
            : [...html]
    };
};
