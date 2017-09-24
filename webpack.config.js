const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSSFromSASS = new ExtractTextPlugin('index.css')
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
    publicPath: '/',//必不可少
    //对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。
    //该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，此选项的值都会以/结束。
    //<link href="/assets/spinner.gif" />最前面的/，没有这个多级目录的时候就找不到了
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
    extractCSSFromSASS,
    new HtmlWebpackPlugin({
      favicon:path.join(__dirname,'src/assets/img/favicon.ico'),
      title: 'LG-Blog',
      template: path.join(__dirname,'src/index.html'),  //模板文件
      inject:true,
      hash:false,    //为静态资源生成hash值
      minify:{    //压缩HTML文件
        removeComments:false,    //移除HTML中的注释
        collapseWhitespace:true    //删除空白符与换行符
      },
      chunksSortMode: 'dependency'
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loader: extractCSSFromSASS.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }]
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