const { join, resolve } = require('path')
const webpack = require("webpack");
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const chunk_names = {}
glob.sync('./src/pages/**/app.js').forEach(path => {   // build out a chunk for
  let chunk = path.split("/")[3]                       // each folder (page) under
  chunk_names[chunk] = path                            // the pages directory
})

// don't directly assign to module.exports yet, as a plugin per
// page will be added to the config later
config = {
  entry: chunk_names,                                  // use the entry name
  output: {
    path: resolve(__dirname, 'dist/'),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {                                           // allow components to be imported as
      components: join(__dirname, '/src/components'),  // import SiteHeader from 'components/site_header'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'                         // basic Vue loader
        }
      }
    ]
  },
  plugins: []                                          // create empty array for next step
}

// create a HtmlWebpackPlugin instance per page
Object.keys(chunk_names).forEach(chunk => {
  const filename = chunk + '.html'
  const htmlConf = {
    filename: filename,
    template: 'templates/app.html',
    inject: 'body',
    hash: process.env.NODE_ENV === 'production',
    chunks: ['vendors', chunk]
  }
  config.plugins.push(new HtmlWebpackPlugin(htmlConf)) // new plugin config per file
})

// finally, assign to module.exports
module.exports = config
