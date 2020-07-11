const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: `./src/main/main.js`,
    // точка входа главной страницы
    personal: `./src/personal/personal`,
    //точка входа страницы с сохраненными статьями
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // сборка будет осуществляться в папке dist
    filename:
      isDev
        ?  '[name]/[name].[chunkhash].js'
        :  '[name]/[name].js',
    // выходной js файл будет располагаться в папке с тем же названием, что и точка входа, и будет называться так же как  имя точки входа //////////////
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
        // все js файлы, за исключением находящихся в node modules обрабатываются бабелем
        // настройки см в babel.config
      },
      {
        test: /\.css$/i,
        use: [
          isDev
            ? 'style-loader'
            : {loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
          'css-loader',
          'postcss-loader',
        ],
        // все css файлы обрабатываются:
        //    1)  postcss-loader : предварительная обработка CSS, настраивается в postcss.config
        //    2)  css-loader : обрабатывает импорты, достаточно настроек по умолчанию
        //    3a) при сборке MiniCssExtractPlugin :  создает файл CSS для каждого файла JS, который содержит CSS
        //                                           согласно настройкам плагина
        //    3b) при запуске dev сервера используем style-loader для работы со стилями
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          {
            loader:'file-loader',
            options: {
              name:
                isDev
                  ?  './images/[name].[hash].[ext]'
                  :  './images/[name].[ext]',
            }
          },
          // добавляем изображения в папку images
          {
            loader: 'image-webpack-loader',
            // и оптимизируем их
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader:'file-loader',
        options: {
          name: './vendor/fonts/[name].[ext]',
        }
              // добавляем шрифты
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:
        isDev
          ?  '[name]/[name].[contenthash].css'
          :  '[name]/[name].css',
      // задаем именование выходных css файлов
    }),
    new OptimizeCssAssetsPlugin({
      // оптимизация и минификация css
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject :false,
      // отключаем автоматическую вставку ресурсов
      template: './src/main/main.html',
      // обрабатываемый файл
      filename: 'index.html',
      // имя сгенерированного файла
      chunks: ['main']
      // собираем main
    }),
    new HtmlWebpackPlugin({
      inject :false,
      template: './src/personal/personal.html',
      filename: './personal/index.html',
      chunks: ['personal']
    }),
    new WebpackMd5Hash(),
    // создаем хэши
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      // работаем  с глобальными переменными
    }),
  ],
};
