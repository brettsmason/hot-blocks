/**
 * This file defines the configuration that is used for the production build.
 */
const { join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const externals = require('./externals');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const editorStyles = new ExtractTextPlugin('editor.css');
const frontendStyles = new ExtractTextPlugin('style.css');

/**
 * Theme production build configuration.
 */
module.exports = {
	mode: 'production',
	context: process.cwd(),

	// Clean up build output
	stats: {
		all: false,
		assets: true,
		colors: true,
		errors: true,
		performance: true,
		timings: true,
		warnings: true
	},

	// Permit importing @wordpress/* packages.
	externals,

	// Optimize output bundle.
	optimization: {
		minimize: true,
		noEmitOnErrors: true,
	},

	// Specify where the code comes from.
	entry: {
		editor: join(process.cwd(), 'assets/src', 'index.js')
	},
	output: {
		pathinfo: false,
		path: join(process.cwd(), 'assets/dist'),
		filename: '[name].js'
	},

	module: {
		rules: [
			{
				// Process JS with Babel.
				test: /\.js$/,
				include: [join(process.cwd(), 'assets/src')],
				loader: require.resolve('babel-loader')
			},
			{
				test: /editor\.scss$/,
				use: editorStyles.extract([
					{ loader: 'css-loader' },
                    { loader: 'sass-loader' },
				])
			},
			{
				test: /style\.scss$/,
				use: frontendStyles.extract([
					{ loader: 'css-loader' },
                    { loader: 'sass-loader' },
				])
			}
		]
	},
	plugins: [
		// Generate editor stylesheet.
		editorStyles,
		// Generate front end stylesheet.
		frontendStyles,
		// Optimise CSS astylesheets.
		new OptimizeCssAssetsPlugin()
	]
};
