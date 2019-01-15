/**
 * This file defines the configuration that is used for the production build.
 */
const { join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');
const externals = require('./externals');

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
		splitChunks: {
			cacheGroups: {
				style: {
					name: 'style',
					test: /style\.scss$/,
					chunks: 'all',
					enforce: true
				},
				editor: {
					name: 'editor',
					test: /editor\.scss$/,
					chunks: 'all',
					enforce: true,
				},
			}
		}
	},

	// Specify where the code comes from.
	entry: {
		editor: join(process.cwd(), 'src', 'index.js')
	},
	output: {
		pathinfo: false,
		path: join(process.cwd(), 'build'),
		filename: '[name].js'
	},

	module: {
		strictExportPresence: true,
		rules: [
			{
				// Process JS with Babel.
				test: /\.js$/,
				include: [join(process.cwd(), 'src')],
				loader: require.resolve('babel-loader')
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: { importLoaders: 2 } },
                    { loader: 'sass-loader' },
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].css'
		}),

		// Remove empty JS files for CSS files.
		// Should be fixed in Webpack 5.
		new ExtraneousFileCleanupPlugin({
			extensions: ['.js']
		})
	]
};
