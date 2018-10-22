// loaders will allow us to use: css, jsx, image imports, es6 etc.

// node import style
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// sourcemaps allow us to easily debug our code
	devtool: 'cheap-module-eval-source-map',
	// where our bundle starts from
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '',
		// for lazy-loading
		chunkFilename: '[id].js'
	},
	// allows us to use .js and .jsx imports without extensions
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				// dont transform node_modules imports 
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				// for multiple loaders or loaders with config use 'use'
				use: [
				// the order matters (webpack parses these loaders in reverse order)
					{ 
						loader: 'style-loader'
					},
					{ 
						loader: 'css-loader', 
						// for css modules
						options: {
							// since we run one additional loader before css loader we need to include inportLoaders: 1,
							importLoaders: 1,
							modules: true,
							localIdentName: '[name]__[local]__[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							// for autoprefixing
							plugins: () => [
								autoprefixer({
									browsers: [
										"> 1%",
										"last 2 versions"
									]
								})
							]
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loader: 'url-loader?limit=8000&name=images/[name].[ext]'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + '/src/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	]
};