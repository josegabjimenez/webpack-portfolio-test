const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/** @type {import('webpack').Configuration} */
module.exports = {
	// Where is the core of our application
	entry: './src/index.js',
	// The output of the bundle
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
	},
	mode: 'development',
	devtool: 'source-map',
	// watch: true,
	// The extensions we are using
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@templates': path.resolve(__dirname, 'src/templates/'),
			'@styles': path.resolve(__dirname, 'src/styles/'),
			'@images': path.resolve(__dirname, 'src/assets/images'),
		},
	},
	// Here we set the loaders (what kind of files we are going to use)
	module: {
		rules: [
			{
				test: /\.m?js$/, // Regex to find all the files with a specified extension
				exclude: /node_modules/, // Exclude node_modules
				use: {
					loader: 'babel-loader', // The loader we use
				},
			},
			{
				test: /\.css|.scss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|jpeg)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'static/images/[hash][ext][query]',
				},
			},
			{
				test: /\.(woff|woff2)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/fonts/[name].[contenthash].[ext]',
				},
			},
		],
	},
	// Here we put plugins that can allow us have more features
	plugins: [
		// Serve html
		new HtmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html',
		}),
		// Compiles all the css files in our project into a single one file
		new MiniCssExtractPlugin({
			filename: './static/style/[name].[contenthash].css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets/images'),
					to: 'assets/images',
				},
			],
		}),
		new Dotenv(),
		new BundleAnalyzerPlugin(),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
			watch: true,
		},
		watchFiles: path.join(__dirname, './**'), //watch for files changed and refresh the browser.
		compress: true,
		historyApiFallback: true,
		port: 3000,
		open: true,
	},
};
