const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

const env = process.env.NODE_ENV || 'development'
const debug = env !== 'production'

let config = {
  devtool: debug ? 'cheap-module-source-map' : 'hidden-source-map',
  entry: {
    vendor: ['vue','vuex','vue-router'],
    bundle: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: debug? '[name].js':'[hash:8].[name].js',
    //publicPath: '/',
    chunkFilename: debug? '[name].js':'[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity //Infinity
    }),
    new ExtractTextPlugin({ 
      filename: debug?'[name].style.css':'[hash:8].style.css', 
      disable: false,
      allChunks: true 
    }),
    new HtmlWebpackPlugin({
      favicon:path.join(__dirname,'src/favicon.ico'),
      title: 'LG-Blog',
      template: path.join(__dirname,'./index.html'),  //模板文件
      inject:'body',
      hash:false,    //为静态资源生成hash值
      minify:{    //压缩HTML文件
        removeComments:false,    //移除HTML中的注释
        collapseWhitespace:true    //删除空白符与换行符
      }
    }),
  ],
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, use: ['eslint-loader'] },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}


if (debug) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  config.devServer = {
    //contentBase: path.join(__dirname, 'src'),
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    inline: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
} else {
  config.plugins.push(  
    new UglifyJSPlugin()
  )
}

module.exports = config