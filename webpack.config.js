const webpack = require("webpack");
const { join, resolve } = require('path')
const glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const entries = {}
glob.sync('./src/pages/**/app.js').forEach(path => {
  let chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  entries[chunk] = path
})

config = {
  entry: entries,
  output: {
    path: resolve(__dirname, 'dist/'),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      components: join(__dirname, '/src/components'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  plugins: []
}

glob.sync('./src/pages/**/*.js').forEach(path => {
  const chunk = path.split("/")[3]
  console.log(chunk)
  const filename = chunk + '.html'
  const htmlConf = {
    filename: filename,
    template: 'templates/app.html',
    inject: 'body',
    hash: process.env.NODE_ENV === 'production',
    chunks: ['vendors', chunk],
    debug: true
  }
  config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = config
