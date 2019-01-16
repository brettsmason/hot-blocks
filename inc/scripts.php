<?php
/**
 * Register scripts in development and production.
 */
namespace Hot_Blocks\Scripts;

use Hot_Blocks\Asset_Loader;

function setup() {
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );
	add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\block_assets' );
}

/**
 * Enqueue editor assets based on the generated `asset-manifest.json` file.
 */
function enqueue_block_editor_assets() {
	$plugin_path  = trailingslashit( plugin_dir_path( dirname( __FILE__ ) ) );
	$plugin_url   = trailingslashit( plugin_dir_url( dirname( __FILE__ ) ) );
	$dev_manifest = $plugin_path . 'assets/dist/asset-manifest.json';

	$opts = [
		'handle' => 'hot-blocks',
		'scripts' => [
			'wp-blocks',
			'wp-data',
			'wp-element',
			'wp-i18n',
		],
	];

	$loaded_dev_assets = Asset_Loader\enqueue_assets( $dev_manifest, $opts );

	if ( ! $loaded_dev_assets ) {
		// Production mode. Manually enqueue script bundles.
		if ( file_exists( $plugin_path . 'assets/dist/editor.js' ) ) {
			wp_enqueue_script(
				$opts['handle'],
				$plugin_url . 'assets/dist/editor.js',
				$opts['scripts'],
				filemtime( $plugin_path . 'assets/dist/editor.js' ),
				true
			);
		}
		// TODO: Error if file is not found.

		if ( file_exists( $plugin_path . 'assets/dist/editor.css' ) ) {
			wp_enqueue_style(
				$opts['handle'],
				$plugin_url . 'assets/dist/editor.css',
				null,
				filemtime( $plugin_path . 'assets/dist/editor.css' )
			);
		}
	}
}

/**
 * Enqueue front end assets based on the generated `asset-manifest.json` file.
 */
function block_assets() {
	$plugin_path  = trailingslashit( plugin_dir_path( dirname( __FILE__ ) ) );
	$plugin_url   = trailingslashit( plugin_dir_url( dirname( __FILE__ ) ) );
	$dev_manifest = $plugin_path . 'assets/dist/asset-manifest.json';

	$loaded_dev_assets = Asset_Loader\enqueue_assets( $dev_manifest, $opts );

	if ( file_exists( $plugin_path . 'assets/dist/style.css' ) ) {
		wp_enqueue_style(
			'hot-blocks-style',
			$plugin_url . 'assets/dist/style.css',
			null,
			filemtime( $plugin_path . 'assets/dist/style.css' )
		);
	}
}
