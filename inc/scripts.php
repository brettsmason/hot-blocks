<?php
/**
 * Register scripts in development and production.
 */
namespace Hot_Blocks\Scripts;

use Hot_Blocks\Asset_Loader;

function setup() {

	// Load plugin translations.
	add_action( 'init', __NAMESPACE__ . '\\load_textdomain' );

	// Add block assets.
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );

	// Enqueue front end assets.
	add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\block_assets' );
}

/**
 * Load all translations for our plugin from the MO file.
*/
function load_textdomain() {
	load_plugin_textdomain( 'hot-blocks', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Enqueue editor assets based on the generated `asset-manifest.json` file.
 */
function enqueue_block_editor_assets() {
	$plugin_path  = trailingslashit( plugin_dir_path( dirname( __FILE__ ) ) );
	$plugin_url   = trailingslashit( plugin_dir_url( dirname( __FILE__ ) ) );
	$dev_manifest = $plugin_path . 'assets/dist/asset-manifest.json';

	$opts = [
		'handle'  => 'hot-blocks',
		'scripts' => [
			'wp-i18n',
			'wp-blocks',
			'wp-components',
			'wp-editor',
			'wp-plugins',
			'wp-edit-post',
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

			// Sets translated strings.
			wp_set_script_translations( $opts['handle'], 'hot-blocks' );
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

	$opts = [
		'handle'  => 'hot-blocks-style',
		'styles'  => null,
	];

	$loaded_dev_assets = Asset_Loader\enqueue_assets( $dev_manifest, $opts );

	if ( file_exists( $plugin_path . 'assets/dist/style.css' ) ) {
		wp_enqueue_style(
			$opts['handle'],
			$plugin_url . 'assets/dist/style.css',
			$opts['styles'],
			filemtime( $plugin_path . 'assets/dist/style.css' )
		);
	}
}
