const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './script/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceType: 'unambiguous',
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][hash][ext][query]' // atur output gambar
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './pages/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './pages/register/register.html',
      filename: 'register/register.html'
    }),
    new HtmlWebpackPlugin({
      template: './pages/login/login.html',
      filename: 'login/login.html'
    }),
    new HtmlWebpackPlugin({
      template: './pages/home/homepage.html',
      filename: 'home/homepage.html'
    }),
    new HtmlWebpackPlugin({
      template: './pages/journaling/journaling.html',
      filename: 'journaling/journaling.html'
    }),
    new HtmlWebpackPlugin({
      template: './pages/statistic/statistic.html',
      filename: 'statistic/statistic.html'
    }),
    new HtmlWebpackPlugin({
      template: './pages/history/history.html',
      filename: 'history/history.html'
    }),
    new HtmlWebpackPlugin({
      template: './pages/profile/profile.html',
      filename: 'profile/profile.html'
    })
  ]
};
